import { configurePassport } from './../services/passport';
import express, { Express } from 'express';
import passport from 'passport';
import * as AuthenticationController from '../controllers/authentication';

configurePassport();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

export const setupRouter = (app: Express) => {
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Router configured');
  });

  app.get('/protected', requireAuth, (req, res) => {
    res.send('Hi there');
  });

  app.post('/signin', requireSignIn, AuthenticationController.signin);

  app.post('/signup', AuthenticationController.signup);
};
