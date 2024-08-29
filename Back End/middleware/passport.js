const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const initialize = function(){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = jwtSecret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        if(jwt_payload){
            return done(null, jwt_payload);
        }
        else {
            return done(false, null);
        }
    }));
}

module.exports.initialize = initialize;