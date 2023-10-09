import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import JVForm from "@/components/jv-form";

export const metadata = {
    title: 'Add JV'
}

export default function Page() {
    return (
        <div className="container px-3 py-16 space-y-4">
            <H2>Add a new journal voucher</H2>
            <P>Please fill out the form below to add a new journal voucher.</P>
            <JVForm actionOnSubmit="create" />
        </div>
    )
}
