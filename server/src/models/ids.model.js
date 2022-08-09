const idsModel = require("./ids.mongo");

const findPharmacistId = async (id) => {
  const foundId = idsModel.findOne({ pharmacistId: id }, { __v: 0, _id: 0 });
  return foundId
};

module.exports = {
  findPharmacistId,
};
