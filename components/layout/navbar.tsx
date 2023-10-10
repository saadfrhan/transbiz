import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Folders, Grid, LayoutDashboard, LucideIcon, Menu, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { TooltipComponent } from "../tooltip-component";

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
        { href: "/dashboard/journal-vouchers", Icon: Folders, label: "View JVs" },
        { href: "/dashboard/journal-vouchers/add", Icon: Plus, label: "Add a JV" },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-sm:w-screen">
                <SheetHeader className="text-left mb-7">
                    <SheetTitle className="text-sm text-muted-foreground">MENU</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    <SheetClose asChild className="flex flex-col gap-y-2">
                        <NavItem href="/dashboard" Icon={LayoutDashboard} label="Dashboard" />
                    </SheetClose>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-muted-foreground font-semibold">JOURNAL VOUCHER</p>
                        {jvItems.map((item, index) => (
                            <SheetClose key={index} asChild className="flex flex-col gap-y-2">
                                <NavItem {...item} />
                            </SheetClose>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
