const { validateEmail, generatePasswordHash } = require("../../util/util");
const db = require("../../sequelize");
const { QueryTypes } = require("sequelize");

const validateUserDetails = (res, { firstName, email, password }) => {
  if (firstName.length === 0) {
    res.status(422).send({ error: "First Name cannot be empty" });
    return false;
  }
  if (!validateEmail(email)) {
    res.status(422).send({ error: "Invalid email" });
    return false;
  }
  if (password.length < 6) {
    res.status(422).send({ error: "Password must be atleast 6 characters" });
    return false;
  }

  return true;
};

const registerUserInDB = async ({
  firstName,
  lastName,
  email,
  passwordHash,
}) => {
  const res = await db.query(
    "INSERT into users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
    {
      type: QueryTypes.INSERT,
      replacements: [firstName, lastName, email, passwordHash],
    }
  );
  return Boolean(res);
};

const registerUser = async (req, res) => {
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  } = req.body;

  if (!validateUserDetails(req, { firstName, email, password })) {
    return;
  }

  const passwordHash = await generatePasswordHash(password);
  const result = registerUserInDB({ firstName, lastName, email, passwordHash });
  if (result) {
    res.send({ message: "Registered user successfully" });
  } else {
    res.status(500).send({ error: "Error creating new user" });
  }
};

module.exports = {
  registerUser,
};
