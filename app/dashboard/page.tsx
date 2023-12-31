import RecentActivityItem from "@/components/recent-activity-item";
import dbConnect from "@/lib/db"
import RecentActivityModel from "@/lib/models/recent-activity";
import { currentUser } from "@clerk/nextjs"
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

    if (new Date().getDay() === 1) {
        await RecentActivityModel.deleteMany({})
    }

    return (
        <div className="lg:container lg:p-5 max-lg:p-2 h-min-screen space-y-4">
            <p
                className="text-2xl font-bold"
            >Greetings, {user?.firstName}!</p>

            <div className="my-3 flex justify-between items-center">
                <p
                    className="text-xl font-medium leading-none"
                >
                    Activity log
                    <span className="text-xs text-gray-500 font-medium ml-1">
                        (deletes every Monday)
                    </span>
                </p>
            </div>
            <div>
                {activities && activities?.length > 0 ?
                    <div
                        className="flex flex-col gap-2"
                    >
                        {activities.map((activity, index) => (
                            <RecentActivityItem key={index} activity={activity} />
                        ))}
                    </div>
                    : (
                        <Card>
                            <CardContent className="p-4 bg-muted">
                                <p className="text-muted-foreground">No recent activity found.</p>
                            </CardContent>
                        </Card>
                    )}
            </div>
        </div>
    )
}
