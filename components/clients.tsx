import { IClient } from "@/lib/models/client"
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import { SheetClientData } from "./sheet-client-data";
import { Button } from "./ui/button";

export default function ClientsTable(
  {
    clients
  }:{clients: IClient[]}
) {
  return (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="sm:table-row">
            <th rowSpan={2} className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Name
            </th>
            <th rowSpan={2} className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right max-md:hidden">
              Created At
            </th>
            <th rowSpan={2} className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right max-md:hidden">
              Amount
            </th>
            <th colSpan={2} className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right max-md:hidden">
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {client.name}
              </td>
              <td className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right max-md:hidden">
                {format(new Date(client.createdAt), "dd/MM/yyyy")}
              </td>
              <td className="border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right max-md:hidden">
              Rs. {new Intl.NumberFormat('en-PK').format(client.amount)}
              </td>
              <td align="right" className="border-b px-4 py-2">
                <SheetClientData client={client}>
                <Button size="icon" variant="ghost">
                <InfoIcon className="w-4 h-4" />
                </Button>
                </SheetClientData>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
