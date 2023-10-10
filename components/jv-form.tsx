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
import { IJournalVoucher } from "@/lib/models/journal-voucher";
import toast from "react-hot-toast";
import { updateClient } from "@/server-actions/update-client";

export default function JVForm({
    defaultData,
    actionOnSubmit
}: {
    actionOnSubmit: 'create' | 'update'
    defaultData?: IJournalVoucher & {
        id?: string
    }
}) {

    const [party, setParty] = useState({
        name: defaultData?.party.name ?? '',
        billing_amount: defaultData?.party.billing_amount ?? 0
    });
    const [sender, setSender] = useState(
        defaultData?.sender ?? ''
    )
    const [createdAt, setCreatedAt] = useState(
        defaultData?.createdAt ?? new Date()
    );
    const [broker, setBroker] = useState(
        {
            name: defaultData?.broker.name ?? '',
            vehicle_number: defaultData?.broker.vehicle_number ?? 0,
            funds_transfer: defaultData?.broker.funds_transfer ?? 0,
            withdrawal: defaultData?.broker.withdrawal ?? 0
        }
    );
    const [expenses, setExpenses] = useState(
        {
            gate_pass: defaultData?.expenses.gate_pass ?? '',
            go_down: defaultData?.expenses.go_down ?? 0,
            labour: defaultData?.expenses.labour ?? 0,
            local: defaultData?.expenses.local ?? 0,
            other_expenses: defaultData?.expenses.other_expenses ?? 0
        }
    )
    const [consignments, setConsignments] = useState(
        defaultData?.consignments ?? []
    );
    const [customEntries, setCustomEntries] = useState(
        defaultData?.moreEntries ?? [] as {
            [key: string]: string
        }[]
    );
    const [grossProfit, setGrossProfit] = useState(
        defaultData?.grossProfit ?? 0
    );

    const [error, setError] = useState('');

    async function onSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        try {
            if (actionOnSubmit === 'create') {
                await createJV({
                    party,
                    sender,
                    createdAt,
                    broker,
                    expenses,
                    consignments,
                    moreEntries: customEntries,
                    grossProfit
                });
            } else {
                if (!defaultData?._id) {
                    throw new Error("No id found")
                }
                await updateClient(
                    defaultData?._id,
                    {
                        party,
                        sender,
                        createdAt,
                        broker,
                        expenses,
                        consignments,
                        moreEntries: customEntries,
                        grossProfit
                    }
                )
            }
            toast.success(`Journal voucher ${actionOnSubmit === 'create' ? 'created' : 'updated'}`);
            redirect('/');
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            {error && <ErrorThrower error={error} />}
            <div className="border-b space-y-4 pb-8">
                <p className="text-sm text-muted-foreground font-semibold">PARTY</p>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        value={party.name}
                        required
                        onChange={(e) => {
                            setParty((p) => ({
                                ...p,
                                name: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Billing Amount</Label>
                    <Input
                        type="number"
                        value={party.billing_amount}

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
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Date</Label>
                    <DatePicker
                        className={`${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}
                        date={createdAt}
                        setDate={setCreatedAt}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Sender</Label>
                    <Input
                        required
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                    />
                </div>
            </div>
            <div className="border-b space-y-4 pb-8">
                <p className="text-sm text-muted-foreground font-semibold">BROKER</p>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Name</Label>
                    <Input
                        required
                        value={broker.name}
                        onChange={(e) => setBroker((b) => ({
                            ...b,
                            name: e.target.value
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Vehicle Number</Label>
                    <Input
                        required
                        type="number"
                        value={broker.vehicle_number}
                        onChange={(e) => setBroker((b) => ({
                            ...b,
                            vehicle_number: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Funds Transfer</Label>
                    <Input
                        type="number"
                        required
                        value={broker.funds_transfer}
                        onChange={(e) => setBroker((b) => ({
                            ...b,
                            funds_transfer: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Withdrawal</Label>
                    <Input
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

                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Gate Pass</Label>
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
                            <SelectItem value="Self">Self</SelectItem>
                            <SelectItem value="Market">Market</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Go Down</Label>
                    <Input
                        type="number"
                        required
                        value={expenses.go_down}
                        onChange={(e) => setExpenses((prev) => ({
                            ...prev,
                            go_down: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Labour</Label>
                    <Input

                        type="number"
                        required
                        value={expenses.labour}
                        onChange={(e) => setExpenses((prev) => ({
                            ...prev,
                            labour: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Local</Label>
                    <Input

                        type="number"
                        required
                        value={expenses.local}
                        onChange={(e) => setExpenses((prev) => ({
                            ...prev,
                            local: Number(e.target.value)
                        }))}
                    />
                </div>
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Other expenses</Label>
                    <Input

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
                <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                    <Label>Consignments</Label>
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-2">
                            {
                                consignments.map((consignment, index) => (
                                    <div
                                        className="flex items-center gap-5 w-full"
                                        key={index}
                                    >
                                        <div
                                            className="flex flex-col gap-2"
                                        >
                                            <div
                                                className="flex items-center gap-4 w-full"
                                            >
                                                <P>{index + 1}.</P>

                                                <Input
                                                    key={index}
                                                    required
                                                    className="w-full"
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
                            className="text-sm w-fit p-0 h-10"
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
                <p className="text-sm leading-none font-semibold">Custom entries</p>

                {customEntries.length > 0 && <div className="flex flex-col gap-2">
                    {
                        customEntries.map((customEntry, index) => (
                            <div
                                className="flex items-center gap-5 w-fit"
                                key={index}
                            >
                                <div
                                    className="flex flex-col gap-2"
                                >
                                    <div
                                        className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}
                                    >
                                        <Label>{
                                            customEntries[index] && Object.keys(customEntries[index])[0]
                                        }</Label>

                                        <Input
                                            key={index}

                                            required

                                            type="text"
                                            value={customEntries[index][Object.keys(customEntries[index])[0]]}
                                            onChange={(e) => {
                                                const _customEntries = [...customEntries]
                                                _customEntries[index][Object.keys(customEntries[index])[0]] = e.target.value
                                                setCustomEntries(_customEntries)
                                            }}
                                        />
                                    </div>
                                    <p
                                        className="text-sm text-red-500 cursor-pointer"
                                        onClick={() => {
                                            const _customEntries = [...customEntries]
                                            _customEntries.splice(index, 1)
                                            setCustomEntries(_customEntries)
                                        }}
                                    >
                                        remove
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>}
                <Button
                    variant="link"
                    className="text-sm w-fit p-0 h-5"
                    type="button"
                    onClick={() => {
                        const customEntry = prompt("Enter the name of the custom entry:")
                        if (customEntry) {
                            setCustomEntries([...customEntries, { [customEntry]: "" }])
                        }
                    }
                    }
                >
                    Add custom entry
                </Button>
            </div>
            <div className={`flex flex-col gap-2 ${actionOnSubmit === "update" ? 'w-full' : 'w-[280px]'}`}>
                <Label>Gross Profit</Label>
                <Input

                    type="number"
                    required
                    value={grossProfit}
                    onChange={(e) => setGrossProfit(Number(e.target.value))}
                />
            </div>
            <Button
                type="submit"
                className={`${actionOnSubmit === "update" ? 'w-full' : 'w-fit'}`}
            >
                {actionOnSubmit === "create" ? "Create" : "Update"}
            </Button>
        </form>
    )
}
