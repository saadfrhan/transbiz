"use server";

import dbConnect from '@/lib/db';
import JournalVoucher, { IJournalVoucher } from '@/lib/models/journal-voucher';
import { revalidatePath } from 'next/cache';

export async function updateClient(id: string, data: IJournalVoucher) {
	try {
		await dbConnect();
		await JournalVoucher.updateOne({ _id: id }, data);
		revalidatePath('/');
	} catch (error) {
		console.log(error);
		throw new Error("Error in updating JournalVoucher.")
	}
}