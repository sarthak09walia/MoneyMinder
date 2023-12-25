const Finance = require("../Database/models/finance");

const addFinanceInformation = (req, res) => {
  const financeData = req.body;
  Finance.create({ ...financeData, user: req.user })
    .then((finance) => {
      res.json(finance);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const getFinanceInformation = (req, res) => {
  Finance.find({ user: req.user })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const patchFinanceInformation = async (req, res) => {
  const financeData = req.body;
  await Finance.updateOne({ _id: financeData._id, user: req.user }, financeData)
    .then((data) => {
      if (data.nModified === 0) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      res.json({ data: data });
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const deleteFinanceInformation = async (req, res) => {
  const financeData = req.body;
  await Finance.deleteOne({ _id: financeData._id, user: req.user })
    .then((data) => {
      if (data.nModified === 0) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      res.json({ message: "success" });
    })
    .catch((err) => {
      console.log("Error", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = {
  addFinanceInformation,
  getFinanceInformation,
  patchFinanceInformation,
  deleteFinanceInformation
};
