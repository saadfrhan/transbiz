"use client";

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { H2 } from "@/components/ui/h2";
import { DatePicker } from "@/components/ui/date-picker";
import { P } from "@/components/ui/p";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/server-actions/create-client";
import ErrorThrower from "@/components/error-thrower";

export default function Page() {

  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState('');
  const [drop, setDrop] = useState('');
  const [consignments, setConsignments] = useState(['']);
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
      await createClient({
        name,
        createdAt,
        amount,
        location: {
          loading,
          drop,
        },
        consignments
      });
    } catch (error) {
      setError(
        JSON.stringify((error as Error), null, 2)
      );
    }

  }
  return (
    <div className="relative">
      <Link
        href="/"
      className={buttonVariants({
        size: "icon",
        className: "absolute top-0 left-0 mt-3 ml-3 mb-5"
      })}
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Link>
    <div
      className="container px-3 py-16 space-y-4"
    >
      {error && <ErrorThrower error={error} />}
      <H2>Add a new client</H2>
      <P>Please fill out the form below to add a new client.</P>
      <form className="space-y-4" onSubmit={onSubmit}>
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
          className="w-fit"
        >
          Add
        </Button>
      </form>      
    </div>
    </div>
  )
}
