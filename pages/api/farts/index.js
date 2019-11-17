const passport = require("passport");
const GitHubStrategy = require("passport-github2");

export default async (req, res) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: "2027d9d04ffdc4b977a2",
        clientSecret: "a2277daebc50dc08d9d713f4de6515d0c601fb42",
        callbackURL: "http://127.0.0.1:3000/api/ghcallback"
      },
      function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //  return done(err, user);
        //});
        console.log(accessToken, refreshToken, profile);

        return done(null, { user: "na", profile });
      }
    )
  );
  passport.authenticate("github", { scope: ["user:email", "repo"] })(req, res);
  //res.status(200).json({farts:'lots'});
};
