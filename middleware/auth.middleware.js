export const ensureAuthenticated = (req, res, next) => {
    console.log("checking in middleware");
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(400).json({error: "You do not have access"})
    }
  };