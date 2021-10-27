const db = require("../models");

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();
    res.send(allUsers);
  } catch (err) {
    res.send({ error: "Something went wrong" });
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await db.User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
module.exports.updateUser = async (req, res) => {
  const email = req.body.email;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;

  let updatedInfo = {};
  if (email) {
    updatedInfo.email = email;
  }
  if (lastName) {
    updatedInfo.lastName = lastName;
  }
  if (firstName) {
    updatedInfo.firstName = firstName;
  }
  try {
    db.User.update(updatedInfo, {
      where: {
        id: req.params.id,
      },
    });
    const user = await db.User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    await db.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Great success");
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
module.exports.createUser = async (req, res) => {
  const { email, lastName, firstName } = req.body;

  try {
    const newUser = await db.User.create({
      email,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.send(newUser);
  } catch (error) {
    res.send("Something went wrong");
  }
};
