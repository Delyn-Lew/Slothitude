const debug = require("debug")("mern:controllers:api:classesController");
const Class = require("../../models/class");

const create = async (req, res) => {
  try {
    const body = req.body;
    debug("body %o", body);
    const newClass = await Class.create(body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  create,
  getAll,
};
