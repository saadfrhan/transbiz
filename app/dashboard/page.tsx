import RecentActivityItem from "@/components/recent-activity-item";
import dbConnect from "@/lib/db"
import RecentActivityModel from "@/lib/models/recent-activity";
import { getGreeting } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs"

import DeleteAllRecentActivity from "@/components/delete-all-recent-activity";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
    title: 'Dashboard'
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
            >{getGreeting()} {user?.firstName}!</p>

            <div className="mt-2 mb-4 flex justify-between">
                <p
                    className="text-xl font-medium"
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
