const httpGethome = (req, res) => {
  res.send("Home Page");
};

const httpGetDashboard = (req, res) => {
  res.send("Dashboard Page");
};

const httpGetAdmin = (req, res) => {
  res.send("Admin Page");
};

module.exports = { httpGethome, httpGetDashboard, httpGetAdmin };
