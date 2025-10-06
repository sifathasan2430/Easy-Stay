
"use client"
import React, { useState, useMemo } from 'react';
import {
  Star,
  Share2,
  Heart,
  User,
  Bed,
  Bath,
  Wifi,
  ChefHat, // Corrected import: Replaced Kitchen with ChefHat
  ParkingSquare,
  AirVent,
  Tv,
  Microwave,
  Utensils,
  MessageSquareText,
  Check,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  UserCheck,
} from 'lucide-react';

// --- DUMMY DATA ---
const LISTING_DATA = {
  id: '973934339954558939',
  title: "Charming City Apartment with Rooftop Access",
  location: "Sirajganj, Rajshahi Division, Bangladesh",
  stats: { guests: 4, bedrooms: 2, beds: 2, baths: 1 },
  price: 150, // per night
  serviceFee: 20,
  taxes: 15,
  rating: 4.98,
  reviewCount: 250,
  host: {
    name: "Jannat",
    isSuperhost: true,
    avatarUrl: "https://placehold.co/80x80/4F46E5/ffffff?text=J",
    joined: "Joined in 2023",
    description: "Passionate traveler and host. I love making guests feel at home and sharing my city's best spots. Available 24/7.",
    responseRate: 100,
    responseTime: "within an hour",
    reviews: 120,
    verified: true,
  },
  amenities: [
    { icon: Wifi, name: "Wifi" },
    { icon: ChefHat, name: "Kitchen" }, // Corrected usage
    { icon: ParkingSquare, name: "Free parking on premises" },
    { icon: AirVent, name: "Air conditioning" },
    { icon: Tv, name: "HD TV with standard cable" },
    { icon: Microwave, name: "Microwave" },
    { icon: Utensils, name: "Cooking basics" },
    { icon: Briefcase, name: "Dedicated workspace" },
  ],
  reviews: [
    { name: "John", date: "October 2024", text: "Amazing stay! The host was incredibly responsive and the apartment was spotless. Highly recommend the rooftop view." },
    { name: "Alice", date: "September 2024", text: "Perfect location and beautifully decorated. It truly felt like a home away from home." },
    { name: "Sarah", date: "September 2024", text: "The views from the apartment were breathtaking. A lovely, clean, and comfortable space." },
    { name: "David", date: "August 2024", text: "Excellent communication and seamless check-in. Exactly as advertised." },
  ],
  reviewStats: {
    cleanliness: 5.0,
    accuracy: 4.9,
    checkIn: 5.0,
    communication: 5.0,
    location: 4.8,
    value: 4.9,
  }
};

// --- SHADCN-LIKE COMPONENTS (Simplified) ---

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2';
  
  if (variant === 'default') {
    baseClasses += ' bg-rose-500 text-white hover:bg-rose-600';
  } else if (variant === 'ghost') {
    baseClasses += ' hover:bg-gray-100';
  } else if (variant === 'outline') {
    baseClasses += ' border border-gray-300 bg-white hover:bg-gray-50';
  } else if (variant === 'link') {
    baseClasses += ' text-gray-900 underline-offset-4 hover:underline h-auto px-0 py-0';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Separator = ({ className = '' }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} />
);

// --- HELPER COMPONENTS ---

const HeaderSection = ({ data }) => (
  <header className="py-6">
    <h1 className="text-3xl font-semibold mb-2">{data.title}</h1>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div className="flex items-center text-sm font-medium text-gray-600 space-x-2">
        <Star className="w-4 h-4 text-gray-800 fill-gray-800" />
        <span className="font-semibold text-gray-900">{data.rating}</span>
        <span>·</span>
        <a href="#reviews" className="underline hover:text-gray-800">{data.reviewCount} reviews</a>
        <span>·</span>
        <MapPin className="w-4 h-4 inline mr-1" />
        <span className="underline hover:text-gray-800">{data.location}</span>
      </div>
      <div className="flex space-x-4 mt-2 sm:mt-0">
        <Button variant="ghost" className="text-sm font-semibold hover:bg-gray-100 p-2">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
        <Button variant="ghost" className="text-sm font-semibold hover:bg-gray-100 p-2">
          <Heart className="w-4 h-4 mr-2" /> Save
        </Button>
      </div>
    </div>
    {/* Placeholder for Image Gallery/Carousel */}
    <div className="mt-6 h-96 bg-gray-100 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-2">
      <div className="lg:col-span-2 lg:row-span-2 bg-gray-200/80 hover:opacity-90 transition-opacity flex items-center justify-center text-gray-500 font-bold text-xl">Main Image</div>
      <div className="hidden lg:flex items-center justify-center bg-gray-200/80 hover:opacity-90 transition-opacity text-gray-500">Image 2</div>
      <div className="hidden lg:flex items-center justify-center bg-gray-200/80 hover:opacity-90 transition-opacity text-gray-500">Image 3</div>
      <div className="hidden lg:flex items-center justify-center bg-gray-200/80 hover:opacity-90 transition-opacity text-gray-500">Image 4</div>
      <div className="hidden lg:flex items-center justify-center bg-gray-200/80 hover:opacity-90 transition-opacity text-gray-500">Image 5</div>
    </div>
  </header>
);

const HostSummary = ({ host, stats }) => (
  <div className="flex items-center py-8">
    <div className="flex-1">
      <h2 className="text-xl font-semibold">
        Entire apartment hosted by {host.name}
      </h2>
      <div className="text-base text-gray-600">
        {stats.guests} guests · {stats.bedrooms} bedrooms · {stats.beds} beds · {stats.baths} bath
      </div>
    </div>
    <div className="w-16 h-16 rounded-full overflow-hidden">
      <img src={host.avatarUrl} alt={host.name} className="object-cover w-full h-full" />
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="py-8 space-y-6">
    <div className="flex items-start space-x-4">
      <UserCheck className="w-6 h-6 mt-1 text-gray-900" />
      <div>
        <h3 className="font-semibold text-lg">Self check-in</h3>
        <p className="text-gray-600 text-sm">Check yourself in with the smart lock.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <Briefcase className="w-6 h-6 mt-1 text-gray-900" />
      <div>
        <h3 className="font-semibold text-lg">Dedicated workspace</h3>
        <p className="text-gray-600 text-sm">A room with Wi-Fi that’s well-suited for working.</p>
      </div>
    </div>
    <div className="flex items-start space-x-4">
      <Calendar className="w-6 h-6 mt-1 text-gray-900" />
      <div>
        <h3 className="font-semibold text-lg">Free cancellation for 48 hours</h3>
      </div>
    </div>
  </div>
);

const AmenitiesSection = ({ amenities }) => (
  <div id="amenities" className="py-8">
    <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
      {amenities.slice(0, 5).map((amenity, index) => (
        <div key={index} className="flex items-center space-x-4 text-gray-800">
          {/* Ensure the icon component is correctly passed and rendered */}
          {/* {React.cloneElement(amenity.icon({ className: "w-6 h-6 text-gray-800" }))} */}
          <span className="text-base">{amenity.name}</span>
        </div>
      ))}
    </div>
    <Button variant="outline" className="mt-8 text-base px-6 font-semibold">
      Show all 32 amenities
    </Button>
  </div>
);

const ReviewSummaryCard = ({ reviewStats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-sm">
    {Object.entries(reviewStats).map(([key, value]) => (
      <div key={key} className="flex items-center justify-between">
        <span className="capitalize text-gray-600">{key.replace(/([A-Z])/g, ' $1')}</span>
        <div className="flex items-center space-x-2 w-1/2">
          <div className="w-24 h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-gray-900 rounded-full"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
          <span className="font-semibold">{value.toFixed(1)}</span>
        </div>
      </div>
    ))}
  </div>
);

const ReviewsSection = ({ reviews, rating, reviewCount, reviewStats }) => (
  <div id="reviews" className="py-8">
    <h2 className="text-2xl font-semibold mb-6 flex items-center">
      <Star className="w-6 h-6 text-gray-900 fill-gray-900 mr-2" />
      <span className="mr-1">{rating}</span> ·
      <span className="ml-2">{reviewCount} reviews</span>
    </h2>

    <ReviewSummaryCard reviewStats={reviewStats} />
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
      {reviews.map((review, index) => (
        <div key={index}>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {review.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">{review.name}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          <p className="text-gray-800 line-clamp-4">{review.text}</p>
          <Button variant="link" className="text-sm font-semibold mt-1">
            Show more
          </Button>
        </div>
      ))}
    </div>
    <Button variant="outline" className="mt-12 text-base px-6 font-semibold">
      Show all {reviewCount} reviews
    </Button>
  </div>
);

const HostProfileSection = ({ host }) => (
  <div className="py-8">
    <Separator className="my-8" />
    <div className="flex flex-col items-center text-center p-8 border-2 border-gray-300 rounded-xl max-w-lg mx-auto">
      <div className="w-24 h-24 rounded-full overflow-hidden">
        <img src={host.avatarUrl} alt={host.name} className="object-cover w-full h-full" />
      </div>
      <p className="text-sm font-semibold mt-4 text-gray-600">{host.isSuperhost ? "Superhost" : "Host"}</p>
      <h2 className="text-3xl font-bold mt-1">Hosted by {host.name}</h2>
      <div className="flex items-center space-x-4 mt-4 text-gray-700">
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1 fill-gray-900 text-gray-900" />
          <span className="font-semibold">{host.reviews} reviews</span>
        </div>
        <div className="flex items-center">
          <Check className="w-4 h-4 mr-1 text-green-600" />
          <span className="font-semibold">Identity verified</span>
        </div>
      </div>
      <p className="text-gray-600 mt-4 max-w-sm">{host.description.substring(0, 150)}...</p>
      <div className="flex space-x-4 mt-6">
        <Button variant="default" className="text-base px-6">
          Message {host.name}
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-4">{host.joined}</p>
    </div>
  </div>
);


const ReservationCard = ({ data }) => {
  // Simple state for demonstration
  const [guestCount, setGuestCount] = useState(1);
  const [checkIn, setCheckIn] = useState("12/10/2024");
  const [checkOut, setCheckOut] = useState("16/10/2024");

  const nightlyRate = data.price;
  const nights = 4; // Simplified calculation for demo

  const subtotal = nightlyRate * nights;
  const total = subtotal + data.serviceFee + data.taxes;

  return (
    <Card className="shadow-2xl sticky top-24">
      <CardHeader>
        <div className="flex items-baseline justify-start">
          <p className="text-2xl font-bold">${data.price}</p>
          <span className="text-base text-gray-600 ml-2 font-normal">night</span>
        </div>
        <div className="flex items-center text-sm font-medium mt-1">
          <Star className="w-4 h-4 text-gray-800 fill-gray-800 mr-1" />
          <span className="font-semibold text-gray-900">{data.rating}</span>
          <span className="ml-1 text-gray-500">· {data.reviewCount} reviews</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Date Picker Input */}
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-b border-gray-300 cursor-pointer hover:bg-gray-50">
              <label className="text-xs font-bold block">CHECK-IN</label>
              <p className="text-sm text-gray-700">{checkIn}</p>
            </div>
            <div className="p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-50">
              <label className="text-xs font-bold block">CHECKOUT</label>
              <p className="text-sm text-gray-700">{checkOut}</p>
            </div>
          </div>
          {/* Guests Dropdown */}
          <div className="p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center">
            <div>
              <label className="text-xs font-bold block">GUESTS</label>
              <p className="text-sm text-gray-700">{guestCount} {guestCount > 1 ? 'guests' : 'guest'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        <Button className="w-full h-14 text-lg font-bold" variant="default">
          Reserve
        </Button>

        <p className="text-center text-sm text-gray-600">You won't be charged yet</p>

        {/* Pricing Details */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="underline">${nightlyRate} x {nights} nights</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Cleaning fee</span>
            <span>$20.00</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Service fee</span>
            <span>${data.serviceFee.toFixed(2)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between font-bold text-base text-gray-900">
            <span>Total before taxes</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MapSection = () => (
  <div className="py-8">
    <h2 className="text-2xl font-semibold mb-6">Where you'll be</h2>
    <p className="text-lg text-gray-700 mb-4">{LISTING_DATA.location}</p>
    {/* Placeholder for the Map */}
    <div className="w-full h-96 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-500 font-semibold text-xl border border-gray-300">
        <MapPin className="w-8 h-8 mr-2 text-rose-500" />
        Map Placeholder
    </div>
  </div>
);

// --- MAIN APPLICATION COMPONENT ---
const Page = () => {
  // Use a minimal dark theme for the overall page to match a common design pattern
  return (
    <div className="min-h-screen bg-white font-[Inter]">
      {/* Tailwind Config for Inter font and reset */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script>{`
        tailwind.config = {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
              },
            },
          },
        }
      `}</script>
      <style>{`
        /* Global styles for smooth scrolling and clean base */
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        /* Responsive scroll-to-top behavior for the booking card on desktop */
        @media (min-width: 1024px) {
            .sticky-lg {
                position: sticky;
                top: 24px; /* Adjust based on desired spacing from the top of the viewport */
            }
        }
      `}</style>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Main Container with max width for desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Listing Header */}
        <HeaderSection data={LISTING_DATA} />

        {/* Main Content Grid: Details on Left, Booking Widget on Right (Desktop) */}
        <div className="lg:flex lg:space-x-12 mt-8">
          
          {/* Left Column (Main Details) */}
          <div className="lg:w-7/12 xl:w-8/12 divide-y divide-gray-200">
            
            <HostSummary host={LISTING_DATA.host} stats={LISTING_DATA.stats} />
            <Separator />
            <FeaturesSection />
            <Separator />

            {/* Placeholder for Description and 'Show More' functionality */}
            <div className="py-8">
              <p className="text-gray-800 leading-relaxed">
                This beautiful apartment is located in the heart of the city, offering easy access to all major attractions. Enjoy modern amenities, high-speed Wi-Fi, and a cozy atmosphere. The highlight is the private rooftop access with stunning panoramic views, perfect for morning coffee or sunset cocktails. The space is professionally cleaned and prepared for every guest, ensuring a comfortable and safe stay.
                <br /><br />
                Guest access is simple with a keyless smart lock entry. You will have full, exclusive access to the entire apartment.
              </p>
              <Button variant="link" className="text-base font-semibold text-gray-900 mt-2">
                Show more
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <Separator />

            {/* Calendar Placeholder */}
            <div className="py-8">
              <h2 className="text-2xl font-semibold mb-6">Select check-in date</h2>
              <p className="text-gray-600">Add your travel dates for exact pricing.</p>
              {/* Simplified Calendar View */}
              <div className="w-full h-80 bg-gray-50 border border-gray-200 rounded-xl mt-4 flex items-center justify-center text-gray-500">
                <Calendar className="w-6 h-6 mr-2" />
                Monthly Calendar View Placeholder
              </div>
            </div>
            <Separator />

            <AmenitiesSection amenities={LISTING_DATA.amenities} />
            <Separator />
            
            <ReviewsSection 
              reviews={LISTING_DATA.reviews} 
              rating={LISTING_DATA.rating} 
              reviewCount={LISTING_DATA.reviewCount} 
              reviewStats={LISTING_DATA.reviewStats}
            />
            <Separator />
            
            <MapSection />
            <Separator />

            <HostProfileSection host={LISTING_DATA.host} />
          </div>

          {/* Right Column (Booking Widget) */}
          <div className="lg:w-5/12 xl:w-4/12 mt-10 lg:mt-0">
            {/* The sticky-lg class simulates the sticky behavior on desktop */}
            <div className="sticky-lg"> 
              <ReservationCard data={LISTING_DATA} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
