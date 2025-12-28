import { useParams, Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useActivityEdit } from '../hooks/useActivityEdit';
import { ActivityFormType } from '../types/activityTypes';

import ActivityForm from '../components/ActivityForm/ActivityForm';

const defaultActivity: ActivityFormType = {
    title: '',
    description: '',
    location: '',
    start_time: new Date(),
    max_participants: 4,
    minimum_age: 18,
    maximum_age: 26,
    activity_type_name: 'Other'
}

const ActivityEdit = () => {
    const { user } = useAuth();
    const { id } = useParams();

    const {
        activity,
        loadingFetch,
        loadingSubmit,
        generatingDescription,
        handleChange,
        generateDescription,
        handleSubmit,
    } = useActivityEdit(defaultActivity, user);

    if (loadingFetch) return <p>Loading...</p>;
    if (!user) return <p>Authenticated user not found.</p>;
    if (!activity) return <p>No activity data available.</p>;

    return (
        <div className="w-full max-w-2xl mx-auto text-white">
            <div className="flex justify-between mb-4">
                <Link to={`/activities/${id}`} className="text-sm text-coral-light hover:underline cursor-pointer">← Back to Activity</Link>
            </div>

            <div className="px-8 md:px-16 py-8 bg-[#292929] ring-1 ring-black ring-opacity-5 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Update Activity</h1>

                <ActivityForm
                    activity={activity}
                    loadingSubmit={loadingSubmit}
                    generatingDescription={generatingDescription}
                    onChange={handleChange}
                    generateDescription={generateDescription}
                    onSubmit={handleSubmit}
                    action='edit'
                />
            </div>
        </div>
    );
};

export default ActivityEdit;