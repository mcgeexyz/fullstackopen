const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Create
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response.status(400).send({ error: "missing username" });
  }

  if (!password) {
    return response.status(400).send({ error: "missing password" });
  }

  if (username.length <= 3) {
    return response
      .status(400)
      .send({ error: "username must be at least 3 characters" });
  }

  if (password.length <= 3) {
    return response
      .status(400)
      .send({ error: "password must be at least 3 characters" });
  }

  // Check that username does not already exist
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  // Could also check that:
  // - username is min length
  // - username is permitted chars only
  // - password is strong enough

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// Read All
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(users);
});

module.exports = usersRouter;
