import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { HeartHandshake, Home, LucideIcon, Menu, Plus, Table, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface NavItem {
    href: string;
    Icon: LucideIcon;
    label: string
}

const NavItem: React.FC<NavItem> = ({ href, Icon, label }) => (
    <Link href={href}>
        <Card className="hover:bg-muted w-full">
            <CardContent className="p-3 flex gap-2">
                <Icon /> {label}
            </CardContent>
        </Card>
    </Link>
);

export default function Navbar() {
    const jvItems = [
        { href: "/dashboard/joined-ventures", Icon: HeartHandshake, label: "View JVs" },
        { href: "/dashboard/joined-ventures/add", Icon: Plus, label: "Add a JV" },
    ];

    const clientItems = [
        { href: "/dashboard/clients", Icon: User, label: "View Clients" },
        { href: "/dashboard/clients/add", Icon: Plus, label: "Add a Client" },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-sm:w-screen space-y-4">
                <SheetHeader className="text-left mb-7">
                    <SheetTitle className="text-sm text-muted-foreground">MENU</SheetTitle>
                </SheetHeader>
                <p className="text-sm text-muted-foreground font-semibold">CLIENTS</p>
                {clientItems.map((item, index) => (
                    <SheetClose key={index} asChild className="flex flex-col gap-y-2">
                        <NavItem {...item} />
                    </SheetClose>
                ))}
                <p className="text-sm text-muted-foreground font-semibold">JOINED VENTURES</p>
                {jvItems.map((item, index) => (
                    <SheetClose key={index} asChild className="flex flex-col gap-y-2">
                        <NavItem {...item} />
                    </SheetClose>
                ))}
            </SheetContent>
        </Sheet>
    );
}
