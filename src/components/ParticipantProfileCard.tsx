import { ParticipantProfileType } from '../types/participantTypes';
import profilePlaceholderIcon from '../assets/icons/profile-icon-placeholder.svg';

type Props = {
    profile: ParticipantProfileType;
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

export default function ParticipantProfileCard({ profile }: Props) {
    return (
        <div className="bg-[#292929] ring-1 ring-black ring-opacity-5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
                <img src={profilePlaceholderIcon} className="w-16 h-16 rounded-full" />
                <div className="overflow-hidden">
                    <h1 className="text-2xl truncate md:text-3xl font-semibold">@{profile.username}</h1>
                    <p className="text-gray-400">🎂 Age: {profile.age ? <span className="text-gray-300 font-semibold">{profile.age}</span> : <span>not given</span>}</p>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Personality: <span className="text-gray-400 font-normal">({personalityDescriptions[profile.personality - 1] || "unknown"})</span></h4>
                <div className="relative h-4 rounded-full bg-coral">
                    {profile.personality && <div className="absolute top-1/2 w-4 h-4 rounded-full bg-white border-2 border-coral -translate-y-1/2" style={{ left: `${((profile.personality - 1) / 6) * 100}%` }}></div>}
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-400">
                    <span>Very Extroverted</span>
                    <span>Very Introverted</span>
                </div>
            </div>
        </div>
    )

}