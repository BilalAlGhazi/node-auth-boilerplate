import { JWT_SECRET } from './../config/constants';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/user';
import { Strategy as LocalStrategy } from 'passport-local';

export const configurePassport = () => {
  // Configure local strategy
  const localLogin = new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        // Compare passwords
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (e) {
        return done(e);
      }
    }
  );

  // Setup JWT options
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET,
  };

  // Create JWT Strategy
  const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
    try {
      const userObj = await User.findById(payload.sub);

      if (userObj) {
        done(null, userObj);
      } else {
        done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  });

  // Assign JWT Strategy to passport
  passport.use(jwtLogin);
  passport.use(localLogin);
};
