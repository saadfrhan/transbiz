import JVs from "@/components/jvs";
import Pagination from "@/components/pagination";
import Refresh from "@/components/refresh";
import TableSearch from "@/components/table-search";
import { Button, buttonVariants } from "@/components/ui/button";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import dbConnect from "@/lib/db";
import jv, { IJournalVoucher } from "@/lib/models/journal-voucher";
import { PlusCircleIcon, PlusIcon, RefreshCw } from "lucide-react";
import Link from "next/link";

async function getjvs(
  page: number = 1,
  documentsPerPage: number = 10,
  search?: {
    "jv.name": string;
  } | {}
): Promise<[IJournalVoucher[] | undefined, number | undefined] | [string]> {
  try {
    await dbConnect();
    const jvs = await jv.find(
      search ?? {}
    ).lean().skip((page - 1) * documentsPerPage)
      .limit(documentsPerPage)
      .sort({ createdAt: -1 });
    const totalDocumentCount = await jv.countDocuments({});
    const totalPageCount = Math.ceil(totalDocumentCount / documentsPerPage);
    const result = jvs.map((jv) => {
      return {
        ...jv,
        _id: jv._id.toString(),
      };
    });
    return [result, totalPageCount];
  } catch (error) {
    console.error(error);
    return [(error as Error).message];
  }
}

export const metadata = {
  title: 'JVs'
}

export default async function Page(
  { searchParams: { page, search } }: { searchParams: { page: number, search: string } }
) {
  const [result, totalPageCount] = await getjvs(
    page ? Number(page) : 1,
    10,
    search ? {
      "party.name": {
        $regex: search,
      }
    } : {}
  )

  return (
    <div className="lg:container lg:p-5 max-lg:p-2 h-min-screen pb-5 max-lg:pb-2.5">
      <div
        className="flex w-full max-sm:flex-col justify-between pt-5 max-lg:pt-2.5 pr-2.5"
      >
        <H2 className="mx-2">Journal Vouchers</H2>
        <div className="flex gap-2 self-end py-2 items-center">
          <Link href="/dashboard/journal-vouchers/add" className={buttonVariants({
            className: 'flex gap-2 w-fit'
          })}>
            <PlusIcon className="h-4 w-4" /> Add
          </Link>
          <Refresh>
            <Button className="flex gap-2 w-fit">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </Refresh>
        </div>
      </div>
      {
        result && typeof result !== 'string' && result.length > 0
          ? <>
            <TableSearch />
            {search && <P className="pt-4">Search JVs whose party's name matches "{search}" </P>}
            <JVs jvs={result} />
            <Pagination totalPageCount={totalPageCount ?? 0} currentPage={page} />
          </>
          : <div
            className="flex flex-col items-center justify-center lg:min-h-[35vw] max-lg:min-h-[100vw]"
          >
            <div
              className="flex flex-col justify-center items-center gap-4"
            >
              <Link href="/dashboard/journal-vouchers/add">
                <PlusCircleIcon className="w-32 h-32 text-gray-400 cursor-pointer" />
              </Link>
              <p
                className="text-xl font-semibold"
              >
                No JVs
              </p>
            </div>
          </div>
      }
    </div>
  )
}
