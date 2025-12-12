import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiFetch } from '../utils/apiClient';
import { UserType } from '../types/userTypes';
import { ActivityFormType } from '../types/activityTypes';
import { useGenerateDescription } from './useGenerateDescription';

export function useActivityCreate(user: UserType | null) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        start_time: new Date(
            Math.round((new Date().getTime() + 14 * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)) * 60 * 60 * 1000
        ),
        max_participants: 5,
        minimum_age: 18,
        maximum_age: 26,
        activity_type_name: 'Other'
    });
    const [loading, setLoading] = useState(false);
    const { generatingDescription, generateDescription } = useGenerateDescription(setForm);

    const handleChange = <K extends keyof ActivityFormType>(
        key: K,
        value: ActivityFormType[K]
    ) => setForm(prev => prev ? ({ ...prev, [key]: value }) : prev);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            return toast.error('You must be logged in', {
                position: 'bottom-center',
                autoClose: 3000
            });
        }

        setLoading(true);

        try {
            const response = await apiFetch('/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activity: form }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data?.errors || 'Failed to create activity');
            }

            toast.success('Activity created!', {
                position: 'bottom-center',
                autoClose: 3000,
                theme: 'dark',
                className: 'bg-gradient text-white',
            });

            const { id } = await response.json();
            navigate(`/activities/${id}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || 'Something went wrong', {
                    position: 'bottom-center',
                    autoClose: 3000
                });
            } else {
                toast.error('Something went wrong', {
                    position: 'bottom-center',
                    autoClose: 3000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        loading,
        generatingDescription,
        handleChange,
        generateDescription,
        handleSubmit
    };
}