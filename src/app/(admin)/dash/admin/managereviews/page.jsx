// app/reviews/page.jsx
'use client';

import { useState, useEffect } from 'react';
import ReviewCard from './components/ReviewCard';
import { Search, Filter, Star, MessageCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewUpdate = (updatedReview) => {
    setReviews(reviews.map(review =>
      review._id === updatedReview._id ? updatedReview : review
    ));
  };

  const handleReviewDelete = (deletedReviewId) => {
    setReviews(reviews.filter(review => review._id !== deletedReviewId));
  };


  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVerification = verificationFilter === 'all' ||
      (verificationFilter === 'verified' && review.verified) ||
      (verificationFilter === 'unverified' && !review.verified);

    const matchesRating = ratingFilter === 'all' ||
      review.rating?.toString() === ratingFilter;

    return matchesSearch && matchesVerification && matchesRating;
  });

  // Count reviews by status
  const reviewCounts = {
    total: reviews.length,
    verified: reviews.filter(r => r.verified).length,
    unverified: reviews.filter(r => !r.verified).length,
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
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
            onClick={fetchReviews}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage and verify property reviews</h1>
        </div>

        {/* Stats and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Stats with Icons */}
            {/* Total Reviews */}
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg min-w-[140px]">
              <MessageCircle className="text-blue-500 flex-shrink-0" size={18} />
              <div className="min-w-0">
                <p className="text-lg text-blue-600 font-bold">Total <span className='text-blue-700'>{reviewCounts.total}</span></p>
              </div>
            </div>

            {/* Verified */}
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg min-w-[140px]">
              <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
              <div className="min-w-0">
                <p className="text-lg text-green-600 font-bold">Verified <span className='text-green-700'>{reviewCounts.verified}</span></p>
              </div>
            </div>

            {/* Unverified */}
            <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg min-w-[140px]">
              <XCircle className="text-yellow-500 flex-shrink-0" size={18} />
              <div className="min-w-0">
                <p className="text-lg text-yellow-600 font-bold">Unverified <span className='text-yellow-700'>{reviewCounts.unverified}</span></p>
              </div>
            </div>


            {/* Search and Filters */}
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            {/* Verification Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="pl-10  pr-8 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full "
              >
                <option value="all">All Reviews</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReviews.map(review => (
            <ReviewCard
              key={review._id}
              review={review}
              onReviewUpdate={handleReviewUpdate}
              onReviewDelete={handleReviewDelete}

            />
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews found</h3>
            <p className="text-gray-500">
              {searchTerm || verificationFilter !== 'all' || ratingFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No reviews in the system yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}