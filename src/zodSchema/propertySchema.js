import { z } from "zod";

const propertySchema = z.object({
  hostId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ObjectId for hostId",
  }),
  title: z.string().trim().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().trim().max(1000),
  address: z.string().trim().max(200),
  city: z.string().trim().max(100),
  state: z.string().trim().max(100).optional(),
  country: z.string().trim().max(100).default("USA"),

  location: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2), // [longitude, latitude]
  }),

  pricePerNight: z
    .coerce.number()
    .nonnegative({ message: "Price cannot be negative" }),

  roomType: z.enum(["entire_place", "private_room", "shared_room"]),

  maxGuests: z
    .coerce.number()
    .min(1, { message: "At least 1 guest required" })
    .default(1),

  bedrooms: z
    .coerce.number()
    .min(0, { message: "Bedrooms cannot be negative" })
    .default(1),

  beds: z
    .coerce.number()
    .min(0, { message: "Beds cannot be negative" })
    .default(1),

  bathrooms: z
     .coerce.number()
    
    .min(0, { message: "Bathrooms cannot be negative" })
    .default(1),

  checkInTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:mm)" })
    .default("14:00"),

  checkOutTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:mm)" })
    .default("11:00"),

  isActive: z.boolean().default(true),

  amenities: z
    .array(
      z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "Invalid ObjectId for amenity",
      })
    )
    .optional(),

  images: z
    .array(
      z.object({
        url: z.string().trim(),
        isPrimary: z.boolean().default(false),
      })
    )
    .optional(),

  averageRating: z
    .number()
    .min(0, { message: "Rating cannot be negative" })
    .max(5, { message: "Rating must be 0–5" })
    .default(0),

  reviewCount: z
    .number()
    .min(0, { message: "Review count cannot be negative" })
    .default(0),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export default propertySchema;