import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
  },
  password: {
    type: String,
    // required: [true, 'Please provide password']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email'],
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
  },

 
  fullName: {
    type: String,
    default: '',
  },
  profilePhoto: {
    type: String, // store image URL or path
    default: '',
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // optional
  },
  preferredLanguage: {
    type: String,
    default: 'en',
  },
  currentCity: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
},
{ timestamps: true } // adds createdAt and updatedAt
);
const User=mongoose.models.User || mongoose.model('User',userSchema)
export default User