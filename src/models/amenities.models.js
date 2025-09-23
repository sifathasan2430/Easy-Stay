import mongoose from "mongoose";
import { Schema } from "mongoose";

const amenitySchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true, minlength: 2, maxlength: 50 },
  description: { type: String, trim: true, maxlength: 200 }
}, { timestamps: { createdAt: true, updatedAt: false } });

export const Amenity=mongoose.models.amenity || mongoose.model('amenity',amenitySchema)