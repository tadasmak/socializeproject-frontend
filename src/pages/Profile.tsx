import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { apiFetch } from '../utils/apiClient';
import { ParticipantProfileType } from '../types/participantTypes';
import ActivityCard from '../components/Activity/ActivityCard';
import ParticipantProfileCard from '../components/ParticipantProfileCard';

const Profile = () => {
    const [profile, setProfile] = useState<ParticipantProfileType | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        apiFetch(`/current_user`)
            .then(response => response.json())
            .then(data => {
                setProfile(data);
            })
            .catch(error => console.error('Error fetching user:', error))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>User not found</p>;

    const totalParticipatingActivities = profile.created_activities.length + profile.joined_activities.length;

    return (
        // TODO: merge Profile and Participant into one component
        <div className="max-w-xl w-full mx-auto px-2 md:px-6 text-white">
            <div className="flex justify-between mb-4">
                <a className="text-sm text-coral-light cursor-pointer hover:underline" onClick={() => navigate(-1)}>← Back to Activity</a>
                <Link to="/participants/me/edit" className="text-sm text-gray-300 mr-2 cursor-pointer hover:text-white hover:underline">✏️ Edit</Link>
            </div>

            <ParticipantProfileCard profile={profile} />

            {profile.created_activities.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Created activities</h2>
                    <div className="grid grid-cols-1 gap-2 mt-4">
                        {profile.created_activities.map((activity) => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </div>
            )}

            {profile.joined_activities.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Joined activities</h2>
                    <div className="grid grid-cols-1 gap-2 mt-4">
                        {profile.joined_activities.map((activity) => (
                            <ActivityCard key={activity.id} {...activity} />
                        ))}
                    </div>
                </div>
            )}

            {totalParticipatingActivities > 0 && <p className="text-center mt-3"><span className="font-bold">{totalParticipatingActivities} / 3</span> participating activities {totalParticipatingActivities == 3 && '(limit reached)'}</p>}
        </div>
    );
};

export default Profile;