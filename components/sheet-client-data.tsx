"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IClient } from "@/lib/models/client"
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

export function SheetClientData({
  children,
  client
}: {
  children: React.ReactNode
  client: IClient
}) {

  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(client.name);
  const [createdAt, setCreatedAt] = useState(new Date(client.createdAt));
  const [amount, setAmount] = useState(client.amount);
  const [loading, setLoading] = useState(client.location.loading);
  const [drop, setDrop] = useState(client.location.drop);
  const [consignments, setConsignments] = useState(client.consignments);
  const [error, setError] = useState<
    string | null
  >(null);

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    console.log({
      name,
      createdAt,
      amount,
      loading,
      drop,
      consignments
    });
    try {
      await updateClient(
        client._id!, {
        name,
        createdAt,
        amount,
        location: {
          loading,
          drop,
        },
        consignments: consignments.filter((consignment) => consignment !== "")
      });
      setIsUpdating(false);
      toast.success("Client updated successfully");
    } catch (error) {
      setError(
        JSON.stringify((error as Error), null, 2)
      );
    }

  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        {error && <ErrorThrower error={error} />}

        <SheetHeader className="text-left">
          <SheetTitle className="flex gap-4 items-center">
            {isUpdating && <Button size="icon" onClick={() => setIsUpdating(false)}>
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>}
            {!isUpdating ? client.name : 'Update the client'}</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {!isUpdating && <div
          className="py-4 flex flex-col gap-y-2"
        >
          <div className="grid grid-cols-2">
            <p>
              Created at
            </p>
            <p className="text-muted-foreground">
              {new Date(client.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p>
              Amount
            </p>
            <p className="text-muted-foreground">
              Rs. {new Intl.NumberFormat('en-PK').format(client.amount)}
            </p>
          </div>
          <div
            className="space-y-2"
          >
            <P className="text-xl font-semibold">
              Location
            </P>
            <div className="grid grid-cols-2">
              <p>
                Loading location
              </p>
              <p className="text-muted-foreground">
                {client.location.loading}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>
                Drop location
              </p>
              <p className="text-muted-foreground">
                {client.location.drop}
              </p>
            </div>
          </div>
          <div
            className="space-y-2"
          >
            <P
              className="text-xl font-semibold"
            >
              Consignments
            </P>
            {client.consignments.map((consignment, index) => (
              <p key={index}>
                {index + 1}. {consignment}
              </p>
            ))}
          </div>
        </div>}
        {isUpdating && <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 w-[280px]">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              className="bg-muted"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[280px]">
            <Label htmlFor="createdAt">Date</Label>
            <DatePicker

              date={createdAt}
              setDate={setCreatedAt}
            />
          </div>
          <div className="flex flex-col gap-2 w-[280px]">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              className="bg-muted"
              type="number"
              value={
                amount === 0 ? "" : amount
              }
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="loading">Loading location</Label>
            <Input
              className="bg-muted w-[280px]"

              id="loading"
              name="loading"
              type="text"
              value={loading}
              onChange={(e) => setLoading(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="drop">Drop location</Label>
            <Input
              id="drop"
              name="drop"
              type="text"
              value={drop}
              className="bg-muted w-[280px]"

              onChange={(e) => setDrop(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[280px]">
            <Label htmlFor="consignments">Consignments</Label>
            <div
              className="
              flex flex-col
            "
            >
              <div
                className="
              flex flex-col gap-2
            "
              >
                {
                  consignments.map((consignment, index) => (
                    <div
                      className="flex items-center gap-5 w-fit"
                      key={index}
                    >
                      <div
                        className="flex flex-col gap-2"
                      >
                        <div
                          className="flex items-center gap-4"
                        >
                          <P>{index + 1}.</P>

                          <Input
                            key={index}
                            className="bg-muted"

                            id={`consignments-${index}`}
                            name={`consignments-${index}`}
                            type="text"
                            value={consignment}
                            onChange={(e) => {
                              const newConsignments = [...consignments]
                              newConsignments[index] = e.target.value
                              setConsignments(newConsignments)
                            }}
                          />
                        </div>
                        <p
                          className="text-sm text-red-500 cursor-pointer"
                          onClick={() => {
                            const newConsignments = [...consignments]
                            newConsignments.splice(index, 1)
                            setConsignments(newConsignments)
                          }}
                        >
                          remove
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Button
                variant="link"
                className="text-sm w-fit p-0"
                type="button"
                onClick={() => {
                  setConsignments([...consignments, ""])
                }
                }
              >
                Add consignment
              </Button>
            </div>
          </div>
            <Button
              type="submit"
              className="w-full"
            >
              Update
            </Button>
        </form>}
        <Separator className="mb-4" />
        {!isUpdating && <div className="space-y-2">
          <SheetClose asChild>
            <DeleteButton id={client._id!} />
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
