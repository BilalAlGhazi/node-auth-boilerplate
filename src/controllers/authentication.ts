import { JWT_SECRET } from './../config/constants';
import { User, UserDocument } from './../models/user';
import express from 'express';
import jwt from 'jwt-simple';

const tokenForUser = (user: UserDocument) => {
  const timeStamp = new Date().getTime();

  return jwt.encode({ sub: user._id, iat: timeStamp }, JWT_SECRET);
};

export const signup = async (req: express.Request, res: express.Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.json({ success: false, err: 'MISSING_DATA' });
  }

  // Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // User already registered
    return res.json({ success: false, err: 'USER_ALREADY_EXISTS' });
  } else {
    // New user
    const newUser = new User({
      email,
      password,
    });

    const result = await newUser.save();
    res.json({ success: true, token: tokenForUser(result as UserDocument) });
  }
};

export const signin = async (req: express.Request, res: express.Response) => {
  res.json({ success: true, token: tokenForUser(req.user as UserDocument) });
};
