"use client";

import { useState, useEffect } from "react";
import PropertyCard from "../Components/PropertyCard";
import Map from "../Components/Map/Map";

const Stays = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    priceMin: "",
    priceMax: "",
    amenities: [],
    roomType: "",
    dateFrom: "",
    dateTo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/listings.json");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
        setFilteredListings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...listings];

    if (filters.city)
      filtered = filtered.filter((l) =>
        l.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    if (filters.priceMin)
      filtered = filtered.filter(
        (l) => l.price_per_night >= Number(filters.priceMin)
      );
    if (filters.priceMax)
      filtered = filtered.filter(
        (l) => l.price_per_night <= Number(filters.priceMax)
      );
    if (filters.amenities.length > 0)
      filtered = filtered.filter((l) =>
        filters.amenities.every((a) => l.amenities.includes(a))
      );
    if (filters.roomType)
      filtered = filtered.filter((l) => l.room_type === filters.roomType);
    if (filters.dateFrom)
      filtered = filtered.filter(
        (l) => new Date(l.available_from) <= new Date(filters.dateFrom)
      );
    if (filters.dateTo)
      filtered = filtered.filter(
        (l) => new Date(l.available_to) >= new Date(filters.dateTo)
      );

    setFilteredListings(filtered);
  }, [filters, listings]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCityClick = (city) => {
    setFilters((prev) => ({ ...prev, city }));
  };

  const clearFilters = () => {
    setFilters({
      city: "",
      priceMin: "",
      priceMax: "",
      amenities: [],
      roomType: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const roomTypes = [...new Set(listings.map((l) => l.room_type))];
  const amenities = [...new Set(listings.flatMap((l) => l.amenities))];

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-destructive">{error}</div>;

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:pt-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600 text-center md:text-left">
        🏠 Property Listings
      </h1>

      {/* Filters */}
      <div className="mb-10 p-5 md:p-6 bg-background border border-border rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-5 text-foreground">
          🔍 Filters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Search city..."
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Price Range (per night)
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Room Type
            </label>
            <select
              name="roomType"
              value={filters.roomType}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
            >
              <option value="">All</option>
              {roomTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium mb-2 text-foreground">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => (
                <label
                  key={a}
                  className={`px-3 py-1 text-sm rounded-full border cursor-pointer ${
                    filters.amenities.includes(a)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={a}
                    checked={filters.amenities.includes(a)}
                    onChange={handleFilterChange}
                    className="hidden"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium mb-2 text-foreground">
              Availability
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-full sm:w-1/2 p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
              />
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-full sm:w-1/2 p-2 border rounded-lg bg-input text-foreground border-border focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={clearFilters}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3 text-center md:text-left">
          🗺️ Click a pin to filter by city
        </h2>
        <div className="rounded-xl overflow-hidden shadow-md">
          <Map
            listings={listings}
            onCityClick={handleCityClick}
            selectedCity={filters.city}
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-muted-foreground">
            No listings match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stays;
