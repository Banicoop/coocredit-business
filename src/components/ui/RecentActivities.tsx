'use client';

import Typography from "../primitives/Typography";
import { ActivityCard } from "./cards";
import { FlexCol } from "./ui-layout";

interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    icon?: React.ReactNode;
}

interface RecentActivitiesProps {
    activities: Activity[];
    onViewAll?: () => void;
    title?: string;
}

export const RecentActivities = ({
    activities,
    onViewAll,
    title = 'Recent Activity'
}: RecentActivitiesProps) => (
    <FlexCol className="bg-tertiary border p-6 rounded-lg gap-4">
        <Typography variant="h4" color="primary2">
            {title}
        </Typography>

        {activities.map((activity) => (
            <ActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                icon={activity.icon}
            />
        ))}

        <Typography
            color="active"
            className="text-center font-bold border-t pt-4 cursor-pointer"
            onClick={onViewAll}
        >
            View All Logs
        </Typography>
    </FlexCol>
);

