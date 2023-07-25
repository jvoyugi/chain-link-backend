const BusinessModel = require('./model');

exports.getAll = async (req, res) => {
  BusinessSchema
    .find()
    .then(businesses => res.status(200).json(businesses))
    .catch(err => {
      res.status(404).json({ error: "No businesses found" });
    });
};

exports.getById = async (req, res) => {
  UserModel
    .findById(req.params.id)
    .then(business => res.status(200).json(business))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createBusiness = async (req, res) => {
  let business = req.body;
  let BusinessModel = new UserModel(business);
  BusinessModel.save()
    .then((business) => {
      res.status(201).json(business);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteBusiness = async (req, res) => {
  BusinessModel
    .findByIdAndDelete(req.params.id)
    .then(business => res.status(200).json(business))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.updateBusiness = async (req, res) => {
  let business = req.body;
  TransactionModel.findByIdAndUpdate(req.params.id, business, { new: true })
    .then(updatedBusiness => res.status(200).json(updatedBusiness))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};