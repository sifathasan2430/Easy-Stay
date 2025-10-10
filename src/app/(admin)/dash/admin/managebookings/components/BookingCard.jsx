// app/bookings/components/BookingCard.jsx
'use client';

import { useState } from 'react';
import {
    Calendar,
    DollarSign,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    User,
    
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function BookingCard({ booking, onBookingUpdate }) {
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Status color mapping
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Payment status color mapping - UPDATED based on your schema
    const getPaymentColor = (paymentStatus) => {
        switch (paymentStatus) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'refunded': return 'bg-blue-100 text-blue-800';
            case 'unpaid': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            setIsLoading(true);

            Swal.fire({
                title: 'Updating Booking...',
                text: 'Please wait while we update the booking status',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                background: '#1f2937',
                color: '#f9fafb'
            });

            const response = await fetch(`/api/bookings/${booking._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const updatedBooking = await response.json();

            Swal.close();

            await Swal.fire({
                title: 'Booking Updated!',
                text: `Booking status changed to ${newStatus} successfully.`,
                icon: 'success',
                confirmButtonColor: '#10b981',
                background: '#1f2937',
                color: '#f9fafb',
                timer: 2000,
                showConfirmButton: false
            });

            onBookingUpdate(updatedBooking);

        } catch (error) {
            console.error('Error updating booking:', error);
            Swal.close();

            await Swal.fire({
                title: 'Update Failed!',
                text: `Failed to update booking: ${error.message}`,
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
            title: 'Confirm Booking?',
            text: 'Are you sure you want to approve this booking?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Approve!',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#f9fafb'
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusUpdate('approved');
            }
        });
    };

    const handleReject = () => {
        Swal.fire({
            title: 'Reject Booking?',
            text: 'Are you sure you want to reject this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Reject!',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#f9fafb'
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatusUpdate('rejected');
            }
        });
    };

   
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div className='w-1/2'>
                        <h3 className="text-lg font-bold">Booking #{booking._id.slice(-8)}</h3>
                        <p className="text-blue-100 text-sm">Property: {booking.propertyId?.slice(-8)}</p>
                    </div>
                    {/* Amount Button */}
                    <button
                        className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                        onClick={() => {
                            Swal.fire({
                                title: 'Booking Amount',
                                text: `Total price for this booking:`,
                                icon: 'info',
                                html: `<div class="text-3xl font-bold text-green-600 my-4">${formatCurrency(booking.totalPrice)}</div>`,
                                confirmButtonColor: '#10b981',
                                background: '#1f2937',
                                color: '#f9fafb'
                            });
                        }}
                    >
                        <DollarSign size={20} />
                        <span>{formatCurrency(booking.totalPrice)}</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(booking.payment_status)}`}>
                        {booking.payment_status.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Booking Details */}
            <div className="p-6 space-y-4">
                {/* Dates */}
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">Check-in</p>
                            <p className="text-sm">{formatDate(booking.checkInDate)}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">Check-out</p>
                            <p className="text-sm">{formatDate(booking.checkOutDate)}</p>
                        </div>
                    </div>
                </div>

                {/* Guests and User */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Users size={20} className="text-gray-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Guests</p>
                        <p className="font-semibold text-gray-800">{booking.guests}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">User ID</p>
                        <p className="font-semibold text-gray-800 text-xs">{booking.userId?.slice(-8)}</p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="pt-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Timeline</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p>Created: {formatDate(booking.createdAt)}</p>
                        <p>Updated: {formatDate(booking.updatedAt)}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 space-y-3">
                {/* Status Management */}
                {booking.status === 'pending' && (
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
                                    <span >Approve</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleReject}
                            disabled={isLoading}
                            className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <XCircle size={16} />
                            <span>Reject</span>
                        </button>
                    </div>
                )}

                {booking.status === 'approved' && (
                    <button disabled className="w-full bg-green-500 text-white py-3 px-4 rounded-xl text-sm font-semibold  disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >Approved</button>
                )}


                

                {/* Show current status for completed/cancelled bookings */}
                {(booking.status === 'rejected') && (
                    <button disabled className="w-full bg-red-500 text-white py-3 px-4 rounded-xl text-sm font-semibold  disabled:opacity-50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >Rejected</button>
                )}
            </div>
        </div>
    );
}