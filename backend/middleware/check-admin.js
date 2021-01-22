const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "asdsadvhbhbrejbjhb223bhblbhljbhblbcsdlhbaaakksxa;na;sdknx##1akkkaxxaxalg"
      );
      req.userData = { email: decodedToken.email, userId: decodedToken.userId };
      console.log(req.userData.email);
      console.log(req.userData.userId);
    Admin.findOne({ email:  req.userData.email, userId:  req.userData.userId })
      .then((user) => {
        if (!user) {
          console.log('NU am gasit user!')
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        next();
      })
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
