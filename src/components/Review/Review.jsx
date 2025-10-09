"use client"
const ReviewCard = ({ review }) => {
    const review= review || {
"reviewCount": 8,
"averageRating": 4.8,
"reviews": [
{
"_id": "rev_001",
"propertyId": "demo-property-xyz",
"userName": "Emily R.",
"rating": 5,
"comment": "Absolutely perfect stay! The place was spotless, the bed was incredibly comfortable, and the communication with the host was prompt and helpful. Highly recommend!",
"createdAt": "2024-10-01T10:00:00Z",
"adminReply": ""
},
{
"_id": "rev_002",
"propertyId": "demo-property-xyz",
"userName": "David Chen",
"rating": 5,
"comment": "The location is fantastic, right near all the major attractions. Check-in was super easy. The apartment looked exactly like the photos.",
"createdAt": "2024-09-28T14:30:00Z",
"adminReply": "Thank you, David! We are thrilled you enjoyed the convenient location."
},
{
"_id": "rev_003",
"propertyId": "demo-property-xyz",
"userName": "Sarah & Tom",
"rating": 4,
"comment": "Great experience overall. The only slight issue was the noise from the street on Friday night, but otherwise, everything was lovely and well-stocked.",
"createdAt": "2024-09-25T08:15:00Z",
"adminReply": "We appreciate the feedback, Sarah and Tom. We'll look into better sound insulation for the front window."
},
{
"_id": "rev_004",
"propertyId": "demo-property-xyz",
"userName": "Anonymous Guest",
"rating": 5,
"comment": "Flawless communication and exceptional cleanliness. A true gem! Would definitely stay here again when visiting the city.",
"createdAt": "2024-09-20T17:00:00Z",
"adminReply": ""
},
{
"_id": "rev_005",
"propertyId": "demo-property-xyz",
"userName": "Michael K.",
"rating": 4,
"comment": "The amenities were exactly as described. The coffee machine was a nice touch! Had a small issue with the Wi-Fi initially, but the host fixed it within an hour.",
"createdAt": "2024-09-15T12:45:00Z",
"adminReply": "We're glad we could quickly resolve the Wi-Fi for you, Michael. Thanks for your patience!"
},
{
"_id": "rev_006",
"propertyId": "demo-property-xyz",
"userName": "Jessica H.",
"rating": 5,
"comment": "Excellent value for money. Plenty of space for our family of four. The kitchen was very well-equipped for cooking meals.",
"createdAt": "2024-09-10T09:00:00Z",
"adminReply": ""
},
{
"_id": "rev_007",
"propertyId": "demo-property-xyz",
"userName": "Ravi S.",
"rating": 5,
"comment": "The host went above and beyond to make us feel welcome. Personalized notes and local recommendations were much appreciated!",
"createdAt": "2024-09-05T19:20:00Z",
"adminReply": "It was our pleasure, Ravi. We hope to welcome you back soon!"
},
{
"_id": "rev_008",
"propertyId": "demo-property-xyz",
"userName": "Chloe L.",
"rating": 5,
"comment": "The photos don't do this place justice! It's even more beautiful in person. A very stylish and cozy retreat.",
"createdAt": "2024-09-01T11:55:00Z",
"adminReply": ""
}
]
}
  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-start mb-3">
        {/* Placeholder for user avatar/icon */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
          <User size={20} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{review.userName}</p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <StarRating rating={review.rating} size={16} />
      <p className="mt-3 text-gray-700 leading-relaxed text-sm">
        {review.comment}
      </p>
      {review.adminReply && (
        <div className="mt-3 p-3 bg-gray-50 border-l-4 border-gray-300 text-gray-600 text-xs italic rounded-r-lg">
          <span className="font-semibold block mb-1">Host Reply:</span>
          {review.adminReply}
        </div>
      )}
    </div>
  );
};