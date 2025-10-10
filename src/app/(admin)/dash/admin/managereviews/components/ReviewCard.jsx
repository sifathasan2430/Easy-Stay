// app/reviews/components/ReviewCard.jsx
'use client';

import { useState } from 'react';
import {
    Star,
    User,
    Mail,
    MapPin,
    Calendar,
    CheckCircle,
    XCircle,
    MessageCircle,
    Image
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function ReviewCard({ review, onReviewUpdate, onReviewDelete }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [adminReply, setAdminReply] = useState(review.adminReply || '');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
        ));
    };

    const handleVerificationUpdate = async (verified) => {
        try {
            setIsLoading(true);

            Swal.fire({
                title: 'Updating Review...',
                text: 'Please wait while we update the review status',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                background: '#1f2937',
                color: '#f9fafb'
            });

            const response = await fetch(`/api/reviews/${review._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    verified: verified,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const updatedReview = await response.json();

            Swal.close();

            await Swal.fire({
                title: 'Review Updated!',
                text: `Review has been ${verified ? 'verified' : 'unverified'} successfully.`,
                icon: 'success',
                confirmButtonColor: '#10b981',
                background: '#1f2937',
                color: '#f9fafb',
                timer: 2000,
                showConfirmButton: false
            });

            onReviewUpdate(updatedReview);

        } catch (error) {
            console.error('Error updating review:', error);
            Swal.close();

            await Swal.fire({
                title: 'Update Failed!',
                text: `Failed to update review: ${error.message}`,
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: '#1f2937',
                color: '#f9fafb'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdminReply = async () => {
        try {
            setIsLoading(true);

            Swal.fire({
                title: 'Sending Reply...',
                text: 'Please wait while we send your reply',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                background: '#1f2937',
                color: '#f9fafb'
            });

            const response = await fetch(`/api/reviews/${review._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    adminReply: adminReply,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const updatedReview = await response.json();

            Swal.close();

            await Swal.fire({
                title: 'Reply Sent!',
                text: 'Your reply has been sent successfully.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                background: '#1f2937',
                color: '#f9fafb',
                timer: 2000,
                showConfirmButton: false
            });

            onReviewUpdate(updatedReview);
            setShowReplyForm(false);

        } catch (error) {
            console.error('Error sending reply:', error);
            Swal.close();

            await Swal.fire({
                title: 'Failed to Send Reply!',
                text: `Error: ${error.message}`,
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: '#1f2937',
                color: '#f9fafb'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = () => {
        Swal.fire({
            title: 'Verify Review?',
            text: 'Are you sure you want to verify this review?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Verify!',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#f9fafb'
        }).then((result) => {
            if (result.isConfirmed) {
                handleVerificationUpdate(true);
            }
        });
    };



    const handleDelete = () => {
        Swal.fire({
            title: 'Delete Review?',
            text: 'Are you sure you want to delete this review? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#f9fafb'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true);

                    const response = await fetch(`/api/reviews/${review._id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to delete review');
                    }

                    await Swal.fire({
                        title: 'Deleted!',
                        text: 'Review has been deleted successfully.',
                        icon: 'success',
                        confirmButtonColor: '#10b981',
                        background: '#1f2937',
                        color: '#f9fafb',
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Refresh the list by calling parent to remove this review
                    onReviewUpdate({ ...review, _deleted: true });
                    onReviewDelete(review._id);


                } catch (error) {
                    console.error('Error deleting review:', error);
                    await Swal.fire({
                        title: 'Delete Failed!',
                        text: `Failed to delete review: ${error.message}`,
                        icon: 'error',
                        confirmButtonColor: '#ef4444',
                        background: '#1f2937',
                        color: '#f9fafb'
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold">{review.property?.title || 'Unknown Property'}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-blue-100 text-sm ml-1">({review.rating})</span>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${review.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {review.verified ? 'VERIFIED' : 'PENDING'}
                    </span>
                </div>
            </div>

            {/* Review Content */}
            <div className="p-6 space-y-4">
                {/* User Info */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <User size={18} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">User</p>
                            <p className="text-sm">{review.userName || 'Anonymous'}</p>
                        </div>
                    </div>

                    {review.email && (
                        <div className="flex items-center space-x-3 text-gray-700">
                            <Mail size={18} className="text-gray-400" />
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm">{review.email}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">Reviewed</p>
                            <p className="text-sm">{formatDate(review.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Comment */}
                <div className="pt-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <MessageCircle size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Review</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                        {review.comment}
                    </p>
                </div>

                {/* Photos */}
                {review.photos && review.photos.length > 0 && review.photos[0] !== '""' && (
                    <div className="pt-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <Image size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">Photos</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {review.photos.map((photo, index) => (
                                photo && photo !== '""' && (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Review photo ${index + 1}`}
                                        className="w-full h-20 object-cover rounded-lg"
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Admin Reply */}
                {review.adminReply && (
                    <div className="pt-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <MessageCircle size={16} className="text-green-500" />
                            <span className="text-sm font-medium text-green-700">Admin Reply</span>
                        </div>
                        <p className="text-sm text-green-600 leading-relaxed bg-green-50 p-3 rounded-lg border border-green-200">
                            {review.adminReply}
                        </p>
                    </div>
                )}

                {/* Reply Form */}
                {showReplyForm && (
                    <div className="pt-2">
                        <textarea
                            value={adminReply}
                            onChange={(e) => setAdminReply(e.target.value)}
                            placeholder="Type your reply here..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            rows="3"
                        />
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
                {/* Verification Actions */}
                {!review.verified && (
                    <div className="flex space-x-3">
                        <button
                            onClick={handleApprove}
                            disabled={isLoading}
                            className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <CheckCircle size={16} />
                                    <span>Approve</span>
                                </>
                            )}
                        </button>

                    </div>
                )}

                {/* Reply Actions */}
                <div className="flex space-x-3">
                    {!showReplyForm ? (
                        <button
                            onClick={() => setShowReplyForm(true)}
                            disabled={isLoading}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <MessageCircle size={16} />
                            <span>{review.adminReply ? 'Edit Reply' : 'Reply'}</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleAdminReply}
                                disabled={isLoading || !adminReply.trim()}
                                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-green-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle size={16} />
                                        <span>Send Reply</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setShowReplyForm(false);
                                    setAdminReply(review.adminReply || '');
                                }}
                                disabled={isLoading}
                                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-gray-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <XCircle size={16} />
                                <span>Cancel</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    <XCircle size={16} />
                    <span>Delete Review</span>
                </button>
            </div>
        </div>
    );
}