const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const backend_url = process.env.BACKEND_URL;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${backend_url}/users/auth/google/callback`,
    proxy: true
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // 查找或创建用户
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // 检查是否存在使用相同邮箱的用户
                const existingUser = await User.findOne({ email: profile.emails[0].value });

                if (existingUser) {
                    // 如果存在，更新用户的 Google ID
                    existingUser.googleId = profile.id;
                    user = await existingUser.save();
                } else {
                    // 创建新用户
                    user = await User.create({
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        profilePicture: profile.photos[0].value
                    });
                }
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

module.exports = passport;
