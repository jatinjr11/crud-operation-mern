const passport = require("passport");
const LocalStrategy = require("passport-local"); // local means using username & password
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic here 
    try {
        console.log("Received credentials: ", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        // checking username is match or not
        if (!user)
            return done(null, false, { message: "Incorrect username" })

        // now usernma is correct now checking password
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password" });
        }
    } catch (err) {
        return done(err);
    }
}));


module.exports = passport;