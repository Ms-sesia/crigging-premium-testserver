import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const prisma = new PrismaClient();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  // console.log(
  //   await prisma.user.findUnique({
  //     where: { id: Number(payload) },
  //   })
  // );
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(payload) } });
    // console.log(user);
    if (user !== null) return done(null, user);
    else done(null, false);
  } catch (e) {
    return done(e, false);
  }
};

export const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
};

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );
// app.post("/profile", passport.authenticate("jwt", { session: false }), function (req, res) {
//   res.send(req.user.profile);
// });
