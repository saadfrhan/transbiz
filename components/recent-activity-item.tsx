import { IRecentActivity } from '@/lib/models/recent-activity';
import { formatDistance } from 'date-fns';
import { Clock, Pencil, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent } from './ui/card';

const RecentActivityItem = ({ activity }: { activity: IRecentActivity }) => {
    const { action, objectName, timestamp, user } = activity;

    const getIcon = () => {
        switch (action) {
            case 'Created':
                return <Plus size={24} className="text-green-500" />;
            case 'Updated':
                return <Pencil size={24} className="text-blue-500" />;
            case 'Deleted':
                return <Trash size={24} className="text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardContent className='px-4 pb-2 pt-2 my-2 sm:flex sm:items-center sm:justify-between'>
                <div className="flex items-center space-x-2 gap-2">
                    <div className="flex-shrink-0">
                        <Image
                            alt="User Image"
                            className="h-10 w-10 rounded-full"
                            height="40"
                            src={user?.image}
                            width="40"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                    <div className="text-sm text-gray-500 mr-2">{getIcon()}</div>
                    <div className="text-sm text-gray-500">{objectName}</div>
                </div>
                <div className="text-sm text-gray-500 flex items-center max-sm:pt-3">
                    <Clock size={16} className="mr-1 inline" />
                    {formatDistance(new Date(timestamp), new Date(), {
                        addSuffix: true,
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivityItem;
