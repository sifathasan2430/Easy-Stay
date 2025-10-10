// app/users/components/UserCard.jsx
'use client';

import { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Languages,
    Shield,
    Edit3,
    Trash2,
    Check,
    X,
    Home,
    Crown,
    Mars,
    HelpCircle,
    Venus,
    CalendarCheck,
    CalendarClock
} from 'lucide-react';

export default function UserCard({ user, onUserUpdate, onUserDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleChange = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/users/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: selectedRole }),
            });

            if (!response.ok) throw new Error('Failed to update role');

            const updatedUser = await response.json();
            onUserUpdate(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Failed to update role');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            setIsLoading(true);
            const response = await fetch(`/api/users/${user._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete user');

            onUserDelete(user._id);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Check if profile photo exists and is not empty
    const hasProfilePhoto = user.profilePhoto && user.profilePhoto.trim() !== '';

    // Role color mapping for User, Host, Admin
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'bg-red-500 text-white';
            case 'host': return 'bg-purple-500 text-white';
            case 'user': return 'bg-gray-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    // Role icon mapping
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Crown size={14} />;
            case 'host': return <Home size={14} />;
            case 'user': return <User size={14} />;
            default: return <User size={14} />;
        }
    };

    // Gender icon mapping
    const getGenderIcon = (gender) => {
        switch (gender) {
            case 'male': return <Mars size={14} className="text-blue-400" />;
            case 'female': return <Venus size={14} className="text-pink-400" />;
            case 'other': return <User size={14} className="text-purple-400" />;
            default: return <HelpCircle size={14} className="text-gray-400" />;
        }
    };

    // Gender text
    const getGenderText = (gender) => {
        switch (gender) {
            case 'male': return 'Male';
            case 'female': return 'Female';
            case 'other': return 'Other';
            default: return 'N/A';
        }
    };

    // Gender background color
    const getGenderColor = (gender) => {
        switch (gender) {
            case 'male': return 'bg-blue-100 text-blue-800';
            case 'female': return 'bg-pink-100 text-pink-800';
            case 'other': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Status color
    const getStatusColor = (verified) => {
        return verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    // Helper function to check if field is available
    const isFieldAvailable = (field) => {
        return field && field.toString().trim() !== '';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                    {hasProfilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            alt={user.fullName}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/20 flex items-center justify-center shadow-lg">
                            <User size={32} className="text-white" />
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">{user.fullName || 'No Name'}</h3>
                                <p className="text-blue-100 opacity-90">@{user.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mt-2">
                    <span className={`px-1 py-1 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span>{user.role.toUpperCase()}</span>
                    </span>
                    <span className={` py-1 px-1 rounded-full text-xs font-semibold ${getStatusColor(user.isVerified)}`}>
                        {user.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                    <span className={`px-1 py-1 rounded-full text-xs font-semibold flex items-center justify-center space-x-1 ${getGenderColor(user.gender)}`}>
                        {getGenderIcon(user.gender)}
                        <span>{getGenderText(user.gender)}</span>
                    </span>
                </div>
            </div>

            {/* User Details */}
            <div className="p-6 space-y-4">
                {/* Contact Information */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <Mail size={18} className="text-gray-400" />
                        <span className="text-sm">{user.email}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                        <Phone size={18} className="text-gray-400" />
                        <span className={`text-sm ${!isFieldAvailable(user.phoneNumber) ? 'text-gray-400 italic' : 'text-gray-800'}`}>
                            {isFieldAvailable(user.phoneNumber) ? user.phoneNumber : 'Not Available'}
                        </span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                        <MapPin size={18} className="text-gray-400" />
                        <span className={`text-sm ${!isFieldAvailable(user.currentCity) ? 'text-gray-400 italic' : 'text-gray-800'}`}>
                            {isFieldAvailable(user.currentCity) ? user.currentCity : 'Not Available'}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 text-gray-700">
                        <div className='flex space-x-3'>
                            <CalendarClock size={18} className="text-gray-400" />
                            <span className="text-sm">Joined {formatDate(user.updatedAt)}</span>
                        </div>
                        <div className='flex space-x-3'>
                            <CalendarCheck size={18} className="text-gray-400" />
                            <span className="text-sm">Updated {formatDate(user.updatedAt)}</span>
                        </div>
                    </div>
                </div>

                {/* Languages */}
                <div className="">
                    <div className="flex items-center space-x-2 mb-2">
                        <Languages size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Languages</span>
                    </div>
                    {user.preferredLanguages && user.preferredLanguages.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {user.preferredLanguages.map((lang) => (
                                <span
                                    key={lang}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                                >
                                    {lang.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic text-sm">Not Available</p>
                    )}
                </div>

                {/* Address */}
                <div className="pt-2">
                    <div className="flex items-start space-x-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                            <p className={`text-sm ${!isFieldAvailable(user.address) ? 'text-gray-400 italic' : 'text-gray-600'} leading-relaxed`}>
                                {isFieldAvailable(user.address) ? user.address : 'Not Available'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6">
                {isEditing ? (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                            <Shield size={16} className="text-blue-500" />
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="flex-1 bg-transparent border-none text-sm font-medium text-blue-700 focus:outline-none focus:ring-0"
                                disabled={isLoading}
                            >
                                <option value="user">User</option>
                                <option value="host">Host</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleRoleChange}
                                disabled={isLoading}
                                className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Check size={16} />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                disabled={isLoading}
                                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-gray-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <X size={16} />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <Edit3 size={16} />
                            <span>Edit Role</span>
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            disabled={isLoading}
                            className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}