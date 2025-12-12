import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import { SearchIcon, ArrowLeftIcon, PlusIcon } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

import ProfileDropdown from './ProfileDropdown';
import ConfirmModal from '../ConfirmModal';

import logoImage from '../../assets/branding/logo.png';

const navigationItems = [
    { name: 'Activities', href: '/activities', current: true },
]

export default function Navigation() {
    const { user, logout } = useAuth();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const queryParam = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(queryParam);

    const [showSearch, setShowSearch] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        if (queryParam !== searchQuery) setSearchQuery(queryParam);

        const handler = () => {
            if (window.innerWidth >= 768) setShowSearch(false);
        };

        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [queryParam]);

    function applySearch(e: React.FormEvent) {
        e.preventDefault();

        const query = searchQuery.trim();

        if (query) navigate(`/activities?q=${encodeURIComponent(query)}`);
        else navigate('/activities');
    }

    return (
        <>
            <nav className="bg-gradient">
                <div className="flex items-center max-w-7xl h-16 px-4 lg:px-8 mx-auto">
                    <div className="flex justify-between w-full h-full">
                        {!showSearch && (
                            <div>
                                <div className="flex items-center h-full">
                                    <Link to="/" className="flex flex-1 justify-center items-stretch mr-6">
                                        <img alt="Social Eyes" src={logoImage} className="h-10 w-auto" />
                                        <div className="text-xl/10 font-bold ml-2 hidden md:block">Social Eyes</div>
                                    </Link>
                                    {navigationItems.map((item) => (
                                        <Link to={item.href} key={item.name} className={`flex h-full items-center px-2 md:px-4 text-md text-white font-medium ${item.current ? 'border-b-3 border-solid border-coral' : 'hover:bg-slate-700'}`}>{item.name}</Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-end">
                            <form
                                role="search"
                                onSubmit={(e) => applySearch(e)}
                                className="hidden md:flex items-center w-48 xl:w-64 mr-4 bg-[#2e2e2e] rounded-md border border-slate-600 focus-within:ring-2 focus-within:ring-coral"
                            >
                                <SearchIcon className="text-slate-300 w-5 h-5 mx-3" />
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search activities..."
                                    aria-label="Search activities"
                                    className="w-full py-2 pr-2 text-sm bg-transparent text-white placeholder:text-slate-400 focus:outline-none"
                                />
                            </form>

                            {!showSearch && (
                                <>
                                    <button
                                        onClick={() => setShowSearch(true)}
                                        className="md:hidden p-2.5 text-slate-200 rounded-md mr-2 cursor-pointer hover:bg-black/30 focus:outline-none"
                                    >
                                        <SearchIcon className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center">
                                        {user ? (
                                            <>
                                                <Link to="/activities/new" className="inline-flex items-center text-sm font-medium rounded-md p-2.5 mr-2 md:px-4 bg-coral hover:bg-coral-darker duration-100">
                                                    <PlusIcon className="h-5 md:mr-2" />
                                                    <span className="hidden md:inline">New Activity</span>
                                                </Link>
                                                <ProfileDropdown onLogout={() => setShowConfirmModal(true)} />
                                            </>
                                        ) : (
                                            <>
                                                <div className="hidden md:flex">
                                                    <Link to="/participants/login" className="text-sm font-medium text-white px-4 py-2 mr-2 hover:underline">Sign in</Link>
                                                    <Link to="/participants/register" className="bg-coral hover:bg-coral-darker duration-100 text-white text-sm font-medium rounded-md px-4 py-2">Sign up</Link>
                                                </div>

                                                <div className="md:hidden">
                                                    <ProfileDropdown onLogout={() => setShowConfirmModal(true)} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex absolute md:hidden w-full left-0 px-4">
                        {showSearch && (
                            <form
                                onSubmit={(e) => applySearch(e)}
                                className="flex flex-1 items-center rounded-md border border-none"
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowSearch(false)}
                                    className="p-2 text-slate-200 cursor-pointer rounded-md hover:bg-black/30 focus:outline-none"
                                >
                                    <ArrowLeftIcon className="w-6 h-6" />
                                </button>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search activities..."
                                    className="flex-1 p-2 mx-2 text-sm bg-transparent text-white border-b-1 border-slate-400 placeholder:text-slate-400 focus:outline-none"
                                />
                                <div onClick={(e) => applySearch(e)} className="p-2 cursor-pointer rounded-md hover:bg-black/30 focus:outline-none">
                                    <SearchIcon className="text-slate-300 w-5 h-5" />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </nav>

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Ready to leave?"
                description="You can always log back in at any time."
                onConfirm={logout}
                confirmText="Yes, log out"
                cancelText="Cancel"
            />
        </>
    )
}