import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: function(this: any) { return this.authProvider === 'email'; },
    sparse: true, // Allows multiple documents to have a null value for a unique field
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function(this: any) { return this.authProvider === 'email'; },
    minlength: 6,
    select: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  appleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  authProvider: {
    type: String,
    required: true,
    enum: ['email', 'google', 'apple'],
    default: 'email',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  verificationCodeExpires: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
