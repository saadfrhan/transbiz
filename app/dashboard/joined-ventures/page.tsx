import Clients from "@/components/clients";
import Pagination from "@/components/pagination";
import TableSearch from "@/components/table-search";
import { buttonVariants } from "@/components/ui/button";
import { H2 } from "@/components/ui/h2";
import dbConnect from "@/lib/db";
import client, { IClient } from "@/lib/models/client";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

async function getClients(
  page: number = 1,
  documentsPerPage: number = 10,
  search?: {
    "client.name": string;
  } | {}
): Promise<[IClient[] | undefined, number | undefined] | [string]> {
  try {
    await dbConnect();
    const clients = await client.find({}).lean().skip((page - 1) * documentsPerPage)
      .limit(documentsPerPage)
      .sort({ createdAt: -1 });
    const totalDocumentCount = await client.countDocuments({});
    const totalPageCount = Math.ceil(totalDocumentCount / documentsPerPage);
    const result = clients.map((client) => {
      return {
        ...client,
        _id: client._id.toString(),
      };
    });
    return [result, totalPageCount];
  } catch (error) {
    console.error(error);
    return [(error as Error).message];
  }
}

export const metadata = {
  title: 'Joined Ventures'
}

export default async function Page(
  { searchParams: { page, search } }: { searchParams: { page: number, search: string } }
) {
  const [result, totalPageCount] = await getClients(
    page ? Number(page) : 1,
    10,
    search ? {
      "client.name": {
        $regex: search,
      }
    } : {}
  )
  return (
    <div className="lg:container lg:p-5 max-lg:p-2 h-min-screen">
      <div
        className="flex w-full justify-between pt-5 max-lg:pt-2.5 pr-2.5"
      >
        <H2 className="mx-2">Joined Ventures</H2>
        <Link href="/add" className={buttonVariants({
          size: 'icon'
        })}>
          <PlusIcon className="h-4 w-4" />
        </Link>
      </div>
      {
        result && typeof result !== 'string' && result.length > 0
          ? <>
            <TableSearch />
            <Clients clients={result} />
            <Pagination totalPageCount={totalPageCount ?? 0} currentPage={page} />
          </>
          : <div
            className="flex flex-col items-center justify-center lg:min-h-[35vw] max-lg:min-h-[100vw]"
          >
            <div
              className="flex flex-col justify-center items-center gap-4"
            >
              <Link href="/add">
                <PlusCircleIcon className="w-32 h-32 text-gray-400 cursor-pointer" />
              </Link>
              <p
                className="text-xl font-semibold"
              >
                No Clients
              </p>
            </div>
          </div>
      }
    </div>
  )
}
