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
import DeleteButton from "./delete-button"
import { ArrowLeftIcon, Pencil } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import JVForm from "./jv-form";

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
      <SheetContent className="overflow-auto max-sm:w-screen">

        <SheetHeader className="text-left">
          <SheetTitle className="flex gap-4 items-center">
            {isUpdating && <Button size="icon" onClick={() => setIsUpdating(false)}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>}

            {isUpdating ? "Update JV" : "Details"}

          </SheetTitle>
        </SheetHeader>
        {!isUpdating && <div
          className="flex flex-col gap-y-2 py-6"
        >
          <div className="border p-4 rounded-lg shadow-md">
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





        {isUpdating && <div className="py-3">
          <JVForm actionOnSubmit="update" defaultData={jv} />
        </div>}
        <Separator className="mb-4" />
        {!isUpdating && <div className="flex gap-2">
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
