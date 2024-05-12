import express from 'express';
import passport from "passport";

export default ( router: express.Router ) => {
    router.get( "/special", passport.authenticate("jwt", { session: false }),(req, res) => {
          res.send("success");
        }
    );
    
}