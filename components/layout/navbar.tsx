import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HeartHandshake, Home, Menu } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import Link from "next/link"

export default function Navbar() {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-sm:w-screen space-y-4">
                <SheetHeader className="text-left mb-7">
                    <SheetTitle
                        className="text-sm text-muted-foreground"
                    >MENU</SheetTitle>
                </SheetHeader>
                <SheetClose asChild className="flex flex-col gap-y-2">
                    <Link href="/">
                        <Card className="hover:bg-muted w-full">
                            <CardContent
                                className="p-3 flex gap-2"
                            >
                                <Home /> Home
                            </CardContent>
                        </Card>
                    </Link>
                </SheetClose>
                <SheetClose asChild className="flex flex-col gap-y-2">
                    <Link href="/">
                        <Card className="hover:bg-muted w-full">
                            <CardContent
                                className="p-3 flex gap-2"
                            >
                                <HeartHandshake /> JV
                            </CardContent>
                        </Card>
                    </Link>
                </SheetClose>
            </SheetContent>
        </Sheet>
    )
}
