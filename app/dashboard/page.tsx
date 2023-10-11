import RecentActivityItem from "@/components/recent-activity-item";
import dbConnect from "@/lib/db"
import RecentActivityModel from "@/lib/models/recent-activity";
import { currentUser } from "@clerk/nextjs"

import DeleteAllRecentActivity from "@/components/delete-all-recent-activity";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
    title: 'Home'
}

async function getRecentActivity() {
    try {
        await dbConnect();
        return await RecentActivityModel.find({}).sort({ timestamp: -1 })
    } catch (error) {

        console.error(error);

    }
}

export default async function Page() {
    const user = await currentUser();

    const activities = await getRecentActivity();
    return (
        <div className="lg:container lg:p-5 max-lg:p-2 h-min-screen">
            <p
                className="text-2xl font-bold"
            >Greetings, {user?.firstName}!</p>

            <div className="my-3 flex justify-between items-center">
                <p
                    className="text-xl font-medium leading-none"
                >
                    Activity log
                </p>

                {activities && activities?.length > 0 && <DeleteAllRecentActivity />}
            </div>
            {activities && activities?.length > 0 ? <div>
                <div
                    className="space-y-4"
                >
                    {activities.map((activity, index) => (
                        <RecentActivityItem key={index} activity={activity} />
                    ))}
                </div>
            </div> : (
                <Card>
                    <CardContent className="p-4 bg-muted">
                        <p className="text-muted-foreground">No recent activity found.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
