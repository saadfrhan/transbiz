"use server";

import dbConnect from '@/lib/db';
import client, { IClient } from '@/lib/models/client';
import { revalidatePath } from 'next/cache';

export async function updateClient(id: string, data: IClient) {
	try {
		await dbConnect();
		await client.updateOne({ _id: id }, data);
		revalidatePath('/');
	} catch (error) {
		console.log(error);
		throw new Error("Error in updating client.")
	}
}