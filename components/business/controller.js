const BusinessModel = require('./model');

exports.getAll = async (req, res) => {
  BusinessModel
    .find({addedBy:req.session.userId})
    .then(businesses => res.status(200).json(businesses))
    .catch(err => {
      res.status(404).json([]);
    });
};

exports.getById = async (req, res) => {
  BusinessModel
    .findById(req.params.id)
    .then(business => res.status(200).json(business))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};

exports.createBusiness = async (req, res) => {
  let businessModel = new BusinessModel(req.body);
  businessModel.dateAdded = new Date();
  businessModel.dateEdited = new Date();
  businessModel.addedBy=req.session.userId;
  businessModel.save()
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
  business.dateEdited=new Date();
  BusinessModel.findByIdAndUpdate(req.params.id, business, { new: true })
    .then(updatedBusiness => res.status(200).json(updatedBusiness))
    .catch(err => res.status(404).json({ error: "Not Found" }));
};