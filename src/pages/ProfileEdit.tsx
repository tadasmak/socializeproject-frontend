import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import Slider from 'rc-slider';

import { apiFetch } from '../utils/apiClient';
import { useAuth } from '../context/AuthContext';

interface EditProfileType {
  username: string;
  personality: number;
  age: number | null;
  birth_date: string | null;
  username_changed: boolean | null;
}

const personalityDescriptions = [
  "Very Extroverted",
  "Extroverted",
  "Somewhat Extroverted",
  "Ambiverted",
  "Somewhat Introverted",
  "Introverted",
  "Very Introverted"
]

const EditProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<EditProfileType | null>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`/current_user`)
      .then(response => response.json())
      .then(data => {
        setProfile(data);
      })
      .catch(error => console.error('Error fetching user: ', error))
      .finally(() => setLoading(false));
  }, [user])

  const handleBirthDateChange = (date: Date | null) => {
    if (!profile) return;
    setProfile({ ...profile, birth_date: date ? format(date, 'yyyy-MM-dd') : null });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      alert('Profile data is not available.');
      return;
    }
    setLoading(true);
    try {
      const response = await apiFetch('/current_user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            username: profile.username,
            birth_date: profile.birth_date,
            personality: profile.personality
          }
        })
      });

      if (!response.ok) {
        const error = (await response.json()).errors;
        throw error;
      }
      else navigate('/participants/me');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Authenticated user not found.</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <div className="max-w-xl w-full mx-auto px-2 md:px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium text-gray-300">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value } as EditProfileType))}
            value={profile.username || ""}
            disabled={profile.username_changed || false}
            className={
              `w-full px-4 py-3 rounded bg-[#222] border border-[#444] 
              ${profile.username_changed ? "text-gray-400 cursor-not-allowed" : "text-white"}`}
          />
          <p className="text-xs text-yellow-500 mt-1">Username can only be set once.</p>
        </div>
        <div>
          <label htmlFor="birth_date" className="block mb-1 font-medium text-gray-300">Birth Date</label>
          {user.age ? (
            <input
              type="text"
              id="birth_date"
              value={profile.birth_date || ""}
              readOnly
              disabled
              className="w-full px-4 py-3 rounded bg-[#222] text-gray-400 border border-[#444] cursor-not-allowed"
            />
          ) : (
            <DatePicker
              id="birth_date"
              selected={profile.birth_date ? new Date(profile.birth_date) : null}
              onChange={handleBirthDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="w-full px-4 py-3 rounded bg-[#1d1d1d] text-white border border-[#444] cursor-pointer"
              placeholderText="Select your birth date"
            />
          )}
          <p className="text-xs text-yellow-500 mt-1">Birth date can only be set once.</p>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-300">
            Personality: <span className="text-gray-400 font-normal">({personalityDescriptions[profile.personality - 1] || 'not set'})</span>
          </label>
          <Slider
            min={1}
            max={7}
            value={profile.personality || 4}
            onChange={(val: number | number[]) => setProfile({ ...profile, personality: Array.isArray(val) ? val[0] : val })}
            trackStyle={{ backgroundColor: '#f87171' }}
            handleStyle={{ backgroundColor: '#f87171', borderColor: '#f87171', opacity: 1, zIndex: 0 }}
            railStyle={{ backgroundColor: '#333' }}
          />
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>Very Extroverted</span>
            <span>Very Introverted</span>
          </div>
        </div>

        <button type="submit" disabled={loading} className="bg-coral text-white px-6 py-2 rounded hover:bg-coral-darker transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;