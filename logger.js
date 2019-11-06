function log(req, res, next) {
  // create then req.body here
  console.log("This is the logger, logging activity.");
  // pass the req.body function to the next middleware i.e. user authentication
  next();
}
module.exports = log;
