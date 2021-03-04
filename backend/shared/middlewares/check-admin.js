const jwt = require("jsonwebtoken");
const LOGS = require("../logs");
const User = require("../../user/model/user.schema");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "asdsadvhbhbrejbjhb223bhblbhljbhblbcsdlhbaaakksxa;na;sdknx##1akkkaxxaxalg"
    );
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
    const email = req.userData.email;
    User.findOne({ email }).then((user) => {
      console.log(user.isAdmin);
      if (!user.isAdmin) {
        return res.status(401).json({
          message: LOGS.PERMISSIONS.DENIED,
        });
      }
    });
    next();
  } catch (error) {
    res.status(401).json({ message: LOGS.PERMISSIONS.DENIED });
  }
};
