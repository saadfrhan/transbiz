import { IRecentActivity } from '@/lib/models/recent-activity';
import { formatDistance } from 'date-fns';
import { Clock, Pencil, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent } from './ui/card';

const RecentActivityItem = ({ activity }: { activity: IRecentActivity }) => {
    const { action, objectName, timestamp, user } = activity;

    const getAction = () => {
        switch (action) {
            case 'Created':
                return <p
                    className="text-green-500"
                >
                    Created
                </p>;
            case 'Updated':
                return <p className="text-blue-500">Updated</p>;
            case 'Deleted':
                return <p className="text-red-500">Deleted</p>;
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
                <div className="flex items-center mt-2 sm:mt-0 gap-1">
                    <div className="text-sm text-gray-500">{getAction()}</div>
                    <div className="text-sm text-gray-500">a {objectName}</div>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2 max-sm:pt-1">
                    <Clock size={16} />
                    <p>
                        {formatDistance(new Date(timestamp), new Date(), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentActivityItem;
