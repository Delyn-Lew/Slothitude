const debug = require("debug")("slothitude:controllers:api:usersController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
// const { getUser } = require("../../config/checkToken");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });

const create = async (req, res) => {
  debug("body: %o", req.body);
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    debug("user: %o", user);
    const token = createJWT(user);
    res.status(201).json({ token, role: user.role }); // return token and user's role
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = createJWT(user);
      res.json({ token, role: user.role });
    } else {
      res.status(401).json({ msg: "Password incorrect" });
    }
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error });
  }
};

// const checkToken = (req, res) => {
//   const user = getUser(req, res); //res.locals.user;
//   res.json({ user });
// };

const index = async (req, res) => {
  const users = await User.find();
  debug("users %o:", users);
  res.status(200).json(users);
};

module.exports = {
  create,
  login,
  // checkToken,
  index,
};
