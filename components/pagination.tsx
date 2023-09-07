"use client";

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronsLeftIcon as DoubleArrowLeftIcon, ChevronsRightIcon as DoubleArrowRightIcon } from 'lucide-react';


export default function Pagination(
	{ totalPageCount, currentPage = 1 }: { totalPageCount: number, currentPage: number }
) {

	const [page, setPage] = useState(currentPage)
	const { push, refresh } = useRouter()

	return (<>
		<div className='flex w-full items-center gap-2 justify-end'>
			<p>Page {isNaN(page) ? 1 : page} – {totalPageCount}</p>
			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={page === 1} onClick={() => {
					setPage(1)
					push(`?page=${page}`)
					refresh()
				}
				}>
				<DoubleArrowLeftIcon className="h-4 w-4" />
			</Button>
			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={page === 1} onClick={() => {
					setPage(prev => prev - 1)
					push(`?page=${page}`)
					refresh()
				}}>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>

			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={page === totalPageCount} onClick={() => {
					setPage(prev => prev + 1)
					push(`?page=${page}`)
					refresh()
				}}>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>

			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={page === totalPageCount} onClick={() => {
					setPage(totalPageCount)
					push(`?page=${page}`)
					refresh()
				}
				}>
				<DoubleArrowRightIcon className="h-4 w-4" />
			</Button>

		</div>
	</>)
}