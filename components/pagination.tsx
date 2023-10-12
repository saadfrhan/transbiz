"use client";

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { ChevronsLeftIcon as DoubleArrowLeftIcon, ChevronsRightIcon as DoubleArrowRightIcon } from 'lucide-react';


export default function Pagination(
	{ totalPageCount, currentPage = 1 }: { totalPageCount: number, currentPage: number }
) {

	const { push, refresh } = useRouter()

	return (<>
		<div className='flex w-full items-center gap-2 justify-end'>
			<p>Page {currentPage} – {totalPageCount}</p>
			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={currentPage === 1} onClick={() => {
					currentPage = 1
					push(`/dashboard/journal-vouchers/?page=${currentPage}`)
					refresh()
				}
				}>
				<DoubleArrowLeftIcon className="h-4 w-4" />
			</Button>
			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={currentPage === 1} onClick={() => {
					currentPage = currentPage - 1
					push(`/dashboard/journal-vouchers/?page=${currentPage}`)
					refresh()
				}}>
				<ChevronLeftIcon className="h-4 w-4" />
			</Button>

			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={currentPage === totalPageCount} onClick={() => {
					currentPage = currentPage + 1
					push(`/dashboard/journal-vouchers/?page=${currentPage}`)
					refresh()
				}}>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>

			<Button variant="outline" size="icon"
				className="h-8 w-8 p-0" disabled={currentPage === totalPageCount} onClick={() => {
					currentPage = totalPageCount
					push(`/dashboard/journal-vouchers/?page=${currentPage}`)
					refresh()
				}
				}>
				<DoubleArrowRightIcon className="h-4 w-4" />
			</Button>

		</div>
	</>)
}