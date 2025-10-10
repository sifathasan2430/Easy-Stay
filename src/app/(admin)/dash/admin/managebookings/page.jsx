// app/bookings/page.jsx
'use client';

import { useState, useEffect } from 'react';
import BookingCard from './components/BookingCard';
import {
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  X
} from 'lucide-react';
export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data.data || data); // Handle both {data: []} and direct array
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBookingUpdate = (updatedBooking) => {
    setBookings(bookings.map(booking =>
      booking._id === updatedBooking._id ? updatedBooking : booking
    ));
  };

  // Filter bookings: only show future bookings (checkOutDate >= today)
  const futureBookings = bookings.filter(booking => {
    const checkOutDate = new Date(booking.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of today
    return checkOutDate >= today;
  });

  // Filter future bookings based on search and filters
  const filteredBookings = futureBookings.filter(booking => {
    const matchesSearch =
      booking._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || booking.payment_status === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Count bookings by status (only future bookings)
  const bookingCounts = {
    total: futureBookings.length,
    pending: futureBookings.filter(b => b.status === 'pending').length,
    approved: futureBookings.filter(b => b.status === 'approved').length,
    rejected: futureBookings.filter(b => b.status === 'rejected').length,
    completed: futureBookings.filter(b => b.status === 'completed').length,
    paid: futureBookings.filter(b => b.payment_status === 'paid').length,
    unpaid: futureBookings.filter(b => b.payment_status === 'unpaid').length,
    refunded: futureBookings.filter(b => b.payment_status === 'refunded').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500 p-8">
          <p className="text-lg font-semibold">Error: {error}</p>
          <button
            onClick={fetchBookings}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage future property bookings</h1>
        </div>

        {/* Stats and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Stats with Icons */}
            <div className="flex gap-4">
              
              {/* Pending */}
              <div className="flex items-center space-x-2 bg-yellow-50 px-1 py-1 rounded-lg min-w-[140px]">
                <Clock className="text-yellow-500 flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-lg font-bold text-yellow-800">Pending {bookingCounts.pending}</p>
                </div>
              </div>

              {/* approved */}
              <div className="flex items-center space-x-2 bg-green-50 px-1 py-1 rounded-lg min-w-[140px]">
                <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-lg font-bold text-green-800">approved {bookingCounts.approved}</p>
                </div>
              </div>

              {/* Paid */}
              <div className="flex items-center space-x-2 bg-purple-50 px-1 py-1 rounded-lg min-w-[140px]">
                <X className="text-red-500 flex-shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-lg font-bold text-red-800">Rejected {bookingCounts.rejected}</p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-48"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full sm:w-36"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Payment Filter */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full sm:w-36"
                >
                  <option value="all">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.map(booking => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onBookingUpdate={handleBookingUpdate}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No upcoming bookings found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No upcoming bookings in the system'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}