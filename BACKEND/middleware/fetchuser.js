var jwt = require("jsonwebtoken");
const JWT_SECRET = "kavitaisagoodgirl";

const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add id to req objevt
  const token = req.header('auth-token');
  if (!token) {
     return res.status(401).send({ error: "Please Authenticate a valid detail", status : 401 });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data)
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate a valid detail", status : 401 });
  }
};
module.exports = fetchuser;
