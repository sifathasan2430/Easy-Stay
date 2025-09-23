import mongoose from "mongoose";
import { Schema } from "mongoose";
const reviewSchema = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: 'property', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'booking' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true, maxlength: 500 }
}, { timestamps:true });

export const Review=mongoose.models.review || mongoose.model('review',reviewSchema)