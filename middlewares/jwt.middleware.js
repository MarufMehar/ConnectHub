const jwt = require("jsonwebtoken");
function verifyjwt(req, res, next) {
  try {
    console.log("request recives");
    
    const token = req.headers?.authorization;
console.log("token",token);

    if (!token) {
      return res.status(401).json({
        status: 0,
        msg: "Token not provided"
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.data = decoded;
    next();

  } catch (err) {

    return res.status(401).json({
      status: 0,
      msg: "Invalid or expired token"
    });

  }

}

module.exports = {verifyjwt};