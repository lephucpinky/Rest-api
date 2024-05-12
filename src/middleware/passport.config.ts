import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UserModel } from "../models/user.model";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_secret!,
}

export default new Strategy(opts, async (payload,done) => {
  try {
    const user = await UserModel.findById(payload.id);
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log(error);
  }
})