'use server';

import dbConnect from '@/lib/db';
import JournalVoucher, { IJournalVoucher } from '@/lib/models/journal-voucher';
import RecentActivityModel from '@/lib/models/recent-activity';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function createJV(data: IJournalVoucher) {
  try {
    await dbConnect();
    const doc = await JournalVoucher.create(data);
    const user = await currentUser();
    await RecentActivityModel.create({
      action: 'Created',
      objectName: 'JV',
      objectId: doc._id,
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
