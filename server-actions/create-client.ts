"use server";

import dbConnect from "@/lib/db";
import client, { IClient } from "@/lib/models/client";
import { revalidatePath } from "next/cache";

export async function createClient(
  data: IClient,
) {
  try {
		await dbConnect();
		const isClientExist = await client.findOne({name: data.name});
		if (isClientExist) {
			throw new Error("Client already exist with this name.");
		}
		await client.create(data);
		revalidatePath('/');
	} catch (error) {
		console.log(error)
	}
}