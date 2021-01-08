import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export interface UserDocument {
  _id: string;
}

const userSchema = new Schema({
  email: { type: String, lowercase: true, unique: true },
  mobile: { type: String, lowercase: true },
  password: String,
  emailVerification: {
    code: String,
    generatedAt: Date,
    isUsed: Boolean,
  },
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  photo: String,
  lastLogin: Date,
  lastPasswordChange: Date,
  verificationToken: String,
  isVerified: Boolean,
  isEmailVerified: Boolean,
  isMobileVerified: Boolean,
  dateCreated: mongoose.Schema.Types.Date,
  isFBAccount: Boolean,
  fbToken: String,
  fbId: String,
  isAdmin: Boolean,
  pushNotificationTokens: [String],
});

// Save hook to encrypt password
userSchema.pre('save', async function (next) {
  const user: any = this;

  const salt = await bcrypt.genSaltSync(10);
  const hashedPass = await bcrypt.hashSync(user.password, salt);

  user.password = hashedPass;
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return new Promise<boolean>((resolve, reject) => {
    const user: any = this;

    try {
      const isMatch = bcrypt.compareSync(candidatePassword, user.password);

      resolve(isMatch);
    } catch (e) {
      reject(e);
    }
  });
};

export const User = mongoose.model('user', userSchema);
