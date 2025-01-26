const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');
const passport = require('passport');

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("Authentication attempt for username:", username);
    try {
        const user = await Person.findOne({ username: username });
        if (!user) {
            console.log("User not found:", username);
            return done(null, false, { message: 'Incorrect Username' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            console.log("Incorrect password for user:", username);
            return done(null, false, { message: 'Incorrect Password' });
        }

        console.log("User authenticated successfully:", username);
        return done(null, user);
    } catch (err) {
        console.error("Error during authentication:", err);
        return done(err);
    }
}));

module.exports = passport; // Export the passport instance