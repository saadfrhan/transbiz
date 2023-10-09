"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import Link from "next/link";

export default function TableSearch() {

	const [search, setSearch] = useState("")

	return (
		<div className="pt-10 gap-2 flex max-[931px]:p-2">
			<Input className='w-fit max-sm:w-full' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search by party name' />
			<Link href={`/dashboard/journal-vouchers/?search=${search}`}>
				<Button size="icon">
					<Search />
				</Button>
			</Link>
		</div>
	)
}