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

  // Apply filters whenever filters or listings change
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-destructive">{error}</div>;

  return (
    <div className="max-w-11/12 mx-auto md:pt-16 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Property Listings
      </h1>

      {/* Filters */}
      <div className="mb-8 p-6 bg-background border border-border rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-foreground">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Search City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Type a city..."
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Price Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
            >
              <option value="">All Room Types</option>
              {roomTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-foreground">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenities.map((a) => (
                <label
                  key={a}
                  className={`px-3 py-1 border rounded-full cursor-pointer text-sm ${
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
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Availability
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
              />
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-ring bg-input text-foreground border-border"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={clearFilters}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:scale-105 duration-200 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">
          Click on a pin to select a city as a filter
        </h2>
        <Map
          listings={listings}
          onCityClick={handleCityClick}
          selectedCity={filters.city}
        />
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length > 0 ? (
          filteredListings.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="text-center col-span-full text-foreground">
            No listings match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stays;
