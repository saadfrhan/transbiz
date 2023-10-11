'use server';

import dbConnect from '@/lib/db';
import JournalVoucher from '@/lib/models/journal-voucher';
import RecentActivityModel from '@/lib/models/recent-activity';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function deleteJV(id: string) {
  try {
    await dbConnect();
    await JournalVoucher.deleteOne({
      _id: id,
    });
    const user = await currentUser();
    await RecentActivityModel.create({
      action: 'Deleted',
      objectName: 'JV',
      objectId: id,
      timestamp: new Date(),
      user: {
        name: user?.firstName + ' ' + user?.lastName,
        email: user?.emailAddresses[0].emailAddress,
        image: user?.imageUrl,
      },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}
