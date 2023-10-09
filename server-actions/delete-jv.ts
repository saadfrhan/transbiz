"use server";

import dbConnect from "@/lib/db";
import JournalVoucher from "@/lib/models/journal-voucher";
import { revalidatePath } from "next/cache";

export async function deleteClient(
  id: string
) {
  try {
		await dbConnect();
		await JournalVoucher.deleteOne({
      _id: id
    });
		revalidatePath('/');
	} catch (error) {
		console.log(error)
	}
}