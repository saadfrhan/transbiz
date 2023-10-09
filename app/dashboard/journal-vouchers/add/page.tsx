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
import toast from "react-hot-toast";
import JVForm from "@/components/jv-form";

export default function Page() {


    return (
        <div
            className="container px-3 py-16 space-y-4"
        >

            <H2>Add a new journal voucher</H2>
            <P>Please fill out the form below to add a new journal voucher.</P>
            <JVForm actionOnSubmit="create" />
        </div>
    )
}
