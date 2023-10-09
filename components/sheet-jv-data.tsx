"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IJournalVoucher } from "@/lib/models/journal-voucher"
import { Separator } from "./ui/separator"
import { P } from "./ui/p"
import DeleteButton from "./delete-button"
import { ArrowLeftIcon, Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/date-picker";
import ErrorThrower from "./error-thrower";
import { updateClient } from "@/server-actions/update-client";
import { toast } from "react-hot-toast";
import JVForm from "./jv-form";

// export interface IJournalVoucher {
//   _id?: string;
//   party: IParty;
//   createdAt: Date;
//   updatedAt?: Date;
//   sender: string;
//   broker: IBroker;
//   expenses: IExpenses;
//   consignments: string[];
//   moreEntries?: {
//     [x: string]: any;
//   }[]; // Adjust the type as needed for moreEntries
//   grossProfit: number;
// }

export function SheetJVData({
  children,
  jv
}: {
  children: React.ReactNode
  jv: IJournalVoucher
}) {

  const [isUpdating, setIsUpdating] = useState(false);

  const {
    broker,
    createdAt,
    party,
    sender,
    consignments,
    moreEntries,
    grossProfit,
    expenses: {
      gate_pass,
      go_down,
      labour,
      local,
      other_expenses
    },
  } = jv;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="overflow-auto space-y-7">

        {isUpdating && <SheetHeader className="text-left">
          <SheetTitle className="flex gap-4 items-center border-b-0">
            <Button size="icon" onClick={() => setIsUpdating(false)}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>}
        {isUpdating && <Separator className="my-4" />}
        {!isUpdating && <div
          className="py-4 flex flex-col gap-y-2"
        >
          <div className="border p-4 rounded-lg shadow-md mt-12">
            <h2 className="text-xl font-semibold mb-2">Journal Voucher Details</h2>
            <div className="border-b pb-4">
              <p className="text-sm text-muted-foreground font-semibold">PARTY</p>
              <p>
                <strong>Name:</strong> {party.name}
              </p>
              <p>
                <strong>Billing Amount</strong> {party.billing_amount}
              </p>
            </div>
            <div className="border-b py-4">
              <p>
                <strong>Created At:</strong> {new Date(createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Sender:</strong> {sender}
              </p>
            </div>
            <div className="py-4 border-b">
              <p className="text-sm text-muted-foreground font-semibold">BROKER</p>
              <p>
                <strong>Broker Name:</strong> {broker.name}
              </p>
              {/* Render other properties of broker */}
              <p>
                <strong>Vehicle Number:</strong> {broker.vehicle_number}
              </p>
              <p>
                <strong>Funds Transfer:</strong> {broker.funds_transfer}
              </p>
              <p>
                <strong>Withdrawal:</strong> {broker.withdrawal}
              </p>
            </div>
            <div className="border-b py-4">
              <p className="text-sm text-muted-foreground font-semibold">EXPENSES</p>

              <p>
                <strong>Gate Pass:</strong> {gate_pass}
              </p>

              <p>
                <strong>Go Down:</strong> {go_down}
              </p>

              <p>
                <strong>Labour:</strong> {labour}

              </p>

              <p>
                <strong>Local:</strong> {local}
              </p>

              <p>
                <strong>Other Expenses:</strong> {other_expenses}
              </p>

            </div>

            <div className="py-4">
              <p className="text-sm text-muted-foreground font-semibold">CONTAINER/CARGO</p>
              <div>
                <strong>Gross Profit:</strong> {grossProfit}
              </div>
              <div>
                <strong className="text-xs">Consignments:</strong>
                {consignments.map((consignment, index) => (
                  <p key={index}>- {consignment}</p>
                ))}
              </div>
              <div>
                <strong className="text-xs">Custom entries:</strong>
                {moreEntries && moreEntries.length > 0 && (
                  <div>
                    {moreEntries.map((entry, index) => (
                      <div key={index}>
                        {Object.entries(entry).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key}:</strong> {value}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>}





        {isUpdating && <JVForm actionOnSubmit="update" defaultData={jv} />}
        <Separator className="mb-4" />
        {!isUpdating && <div className="space-y-2">
          <SheetClose asChild>
            <DeleteButton id={jv._id!} />
          </SheetClose>
          <Button className='w-full'
            onClick={() => setIsUpdating(true)}

          >
            <Pencil
              className="w-4 h-4 mr-2"
            />
            Update
          </Button>
        </div>}
      </SheetContent>
    </Sheet>
  )
}
