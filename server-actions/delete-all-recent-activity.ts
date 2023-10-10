'use server';

import dbConnect from '@/lib/db';
import RecentActivityModel from '@/lib/models/recent-activity';
import { revalidatePath } from 'next/cache';

export default async function deleteAllRecentActivity() {
  try {
    await dbConnect();
    await RecentActivityModel.deleteMany({});
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
  }
}
