"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { H2 } from "@/components/ui/h2";
import { DatePicker } from "@/components/ui/date-picker";
import { P } from "@/components/ui/p";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { createJV } from "@/server-actions/create-jv";
import ErrorThrower from "@/components/error-thrower";
import { redirect } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Page() {

    const [party, setParty] = useState({
        name: '',
        billing_amount: 0
    });
    const [sender, setSender] = useState('')
    const [createdAt, setCreatedAt] = useState(new Date());
    const [broker, setBroker] = useState({
        name: '',
        vehicle_number: 0,
        funds_transfer: 0,
        withdrawal: 0
    });
    const [expenses, setExpenses] = useState({
        labour: 0,
        local: 0,
        gate_pass: '',
        go_down: 0,
        other_expenses: 0
    })
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
        try {
            // await createJV({
            //     name,
            //     createdAt,
            //     amount,
            //     location: {
            //         loading,
            //         drop,
            //     },
            //     consignments
            // });
            redirect('/');
        } catch (error) {
            setError(
                JSON.stringify((error as Error), null, 2)
            );
        }

    }
    return (
        <div
            className="container px-3 py-16 space-y-4"
        >
            {error && <ErrorThrower error={error} />}
            <H2>Add a new journal voucher</H2>
            <P>Please fill out the form below to add a new journal voucher.</P>
            <form className="space-y-4" onSubmit={onSubmit}>
                <div className="border-b space-y-4 pb-8">
                    <p className="text-sm text-muted-foreground font-semibold">PARTY</p>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={party.name}
                            className="bg-muted"
                            required
                            onChange={(e) => {
                                setParty((p) => ({
                                    ...p,
                                    name: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="name">Billing Amount</Label>
                        <Input
                            id="name"
                            name="name"
                            type="number"
                            value={party.billing_amount}
                            className="bg-muted"
                            required
                            onChange={(e) => {
                                setParty((p) => ({
                                    ...p,
                                    billing_amount: Number(e.target.value)
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className="border-b space-y-4 pb-8">
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="createdAt">Date</Label>
                        <DatePicker
                            date={createdAt}
                            setDate={setCreatedAt}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Sender</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                        />
                    </div>
                </div>
                <div className="border-b space-y-4 pb-8">
                    <p className="text-sm text-muted-foreground font-semibold">BROKER</p>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Name</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            required
                            value={broker.name}
                            onChange={(e) => setBroker((b) => ({
                                ...b,
                                name: e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Vehicle Number</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            required
                            type="number"
                            value={broker.vehicle_number}
                            onChange={(e) => setBroker((b) => ({
                                ...b,
                                vehicle_number: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Funds Transfer</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={broker.funds_transfer}
                            onChange={(e) => setBroker((b) => ({
                                ...b,
                                funds_transfer: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Withdrawal</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={broker.withdrawal}
                            onChange={(e) => setBroker((b) => ({
                                ...b,
                                withdrawal: Number(e.target.value)
                            }))}
                        />
                    </div>
                </div>
                <div className="border-b space-y-4 pb-8">
                    <p className="text-sm text-muted-foreground font-semibold">EXPENSES</p>

                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Gate Pass</Label>
                        <Select onValueChange={(value) => {
                            setExpenses((prev) => ({
                                ...prev,
                                gate_pass: value
                            }))
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dark">Self</SelectItem>
                                <SelectItem value="system">Market</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Go Down</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={expenses.go_down}
                            onChange={(e) => setExpenses((prev) => ({
                                ...prev,
                                go_down: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Labour</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={expenses.labour}
                            onChange={(e) => setExpenses((prev) => ({
                                ...prev,
                                labour: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Local</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={expenses.local}
                            onChange={(e) => setExpenses((prev) => ({
                                ...prev,
                                local: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[280px]">
                        <Label htmlFor="amount">Other expenses</Label>
                        <Input
                            id="amount"
                            name="amount"
                            className="bg-muted"
                            type="number"
                            required
                            value={expenses.other_expenses}
                            onChange={(e) => setExpenses((prev) => ({
                                ...prev,
                                other_expenses: Number(e.target.value)
                            }))}
                        />
                    </div>
                </div>
                <div className="border-b space-y-4 pb-8">
                    <p className="text-sm text-muted-foreground font-semibold">CONTAINER/CARGO</p>
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
                                                    required

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
    )
}
