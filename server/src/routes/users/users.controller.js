const jwt = require('jsonwebtoken');

const httpAddUser = (req, res) => {
  // Validate User Here

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  // generating JWT using the secret key
  const token = jwt.sign(data, jwtSecretKey);
  console.log(token)

  res.send(token);
};

const httpGetUser = (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.
  
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
};

module.exports = { httpAddUser, httpGetUser };
