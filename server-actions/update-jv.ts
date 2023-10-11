'use server';

import dbConnect from '@/lib/db';
import JournalVoucher, { IJournalVoucher } from '@/lib/models/journal-voucher';
import RecentActivityModel from '@/lib/models/recent-activity';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function updateJV(id: string, data: IJournalVoucher) {
  try {
    await dbConnect();
    await JournalVoucher.updateOne({ _id: id }, data);
    const user = await currentUser();
    await RecentActivityModel.create({
      action: 'Updated',
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
    throw new Error('Error in updating JournalVoucher.');
  }
}
