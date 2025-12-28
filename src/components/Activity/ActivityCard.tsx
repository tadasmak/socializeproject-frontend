import React from 'react';
import { Link } from 'react-router-dom';

import { MapPinIcon, UsersRoundIcon, CakeIcon, Calendar1Icon } from 'lucide-react';

import cyclingImage from '../../assets/activities/cycling.jpg';

type ActivityCardProps = {
    id: number;
    title: string;
    description: string;
    location: string;
    start_time: Date;
    participants_count: number;
    max_participants: number;
    minimum_age: number;
    maximum_age: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    id,
    title,
    description,
    location,
    start_time,
    participants_count,
    max_participants,
    minimum_age,
    maximum_age
}) => {
    return (
        <Link to={`/activities/${id}`} key={id} className="bg-[#292929] ring-1 ring-black ring-opacity-5 shadow-lg flex rounded-lg p-3">
            <div className="flex items-center min-w-28 w-28 md:min-w-45 md:w-45 aspect-square mr-4">
                <img src={cyclingImage} alt="Activity Icon" className="w-full object-cover rounded-lg" />
            </div>
            <div className="px-2 flex flex-col justify-center flex-grow overflow-hidden">
                <h2 className="font-semibold truncate text-2xl mb-1">{title}</h2>
                <p className="truncate text-stone-400 mb-2">{description}</p>
                <div className="flex items-center gap-1 truncate">
                    <span className="text-coral-light hidden sm:inline">Location:</span>
                    <MapPinIcon className="sm:hidden inline-block text-coral-light" height={18} />
                    {location}
                </div>
                <div className="flex items-center gap-1 truncate">
                    <span className="text-coral-light hidden sm:inline">Participants:</span>
                    <UsersRoundIcon className="sm:hidden inline-block text-coral-light" height={18} />
                    {participants_count}/{max_participants}
                </div>
                <div className="flex items-center gap-1 truncate">
                    <span className="text-coral-light hidden sm:inline">Age Range:</span>
                    <CakeIcon className="sm:hidden inline-block text-coral-light" height={18} />
                    {minimum_age} - {maximum_age}
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-coral-light hidden sm:inline">Start time:</span>
                    <Calendar1Icon className="sm:hidden inline-block text-coral-light" height={18} />
                    <span className="truncate">{new Date(start_time).toLocaleString()}</span>
                </div>
            </div>
        </Link>
    )
}

export default ActivityCard;