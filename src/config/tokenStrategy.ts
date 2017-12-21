import * as passportBearer from 'passport-http-bearer';
import User, { IUser } from '../models/User';
import AccessToken, { IAccessToken } from '../models/AccessToken';

const tokenStrategy = new passportBearer.Strategy(
  function (token, done) {
    console.log('Bearer token', token);
    return done(null, false);
    // AccessToken.findOne({ id: token }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   return done(null, user);
    // });
  }
);

export { tokenStrategy };

