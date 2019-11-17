const passport = require("passport");
const GitHubStrategy = require("passport-github2");

export default async (req, res) => {
  let a = null;
  const p = new Promise((resolve, reject) => {
    passport.authenticate("github", { failureRedirect: "/login" }, function(req, res, troll, fell) {
      // Successful authentication, redirect home.
      console.log("yolo bitches", req, res, troll, fell);
      a = res;
      //res.redirect("/");
      resolve();
    })(req, res);
  });

  await p;

  res.end(a);
};
