"use server";

import dbConnect from "@/lib/db";
import JournalVoucher, { IJournalVoucher } from "@/lib/models/journal-voucher";
import { revalidatePath } from "next/cache";

export async function createJV(
  data: IJournalVoucher,
) {
  try {
		await dbConnect();
		await JournalVoucher.create(data);
		revalidatePath('/');
	} catch (error) {
		console.log(error)
	}
}