"use server";

import dbConnect from "@/lib/db";
import client from "@/lib/models/client";
import { revalidatePath } from "next/cache";

export async function deleteClient(
  id: string
) {
  try {
		await dbConnect();
		await client.deleteOne({
      _id: id
    });
		revalidatePath('/');
	} catch (error) {
		console.log(error)
	}
}