import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Folders, Grid, Home, LayoutDashboard, LucideIcon, Menu, Plus } from "lucide-react";
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
        <Card className="w-full transform hover:scale-105 transition-transform duration-300">
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
                <SheetHeader className="text-left">
                    <SheetTitle className="flex gap-4 items-center">
                        <h2 className="text-muted-foreground">Menu</h2>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                    <SheetClose asChild className="flex flex-col gap-y-2">
                        <NavItem href="/dashboard" Icon={Home} label="Home" />
                    </SheetClose>
                    <div className="flex flex-col gap-4">
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
