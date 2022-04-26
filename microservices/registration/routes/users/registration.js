const { validateEmail, generatePasswordHash } = require("../../util/util");
const db = require("../../sequelize");
const { QueryTypes } = require("sequelize");

const validateUserDetails = (res, { email, univ_id, password }) => {
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
  email, univ_id, passwordHash,
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
    email,
    univ_id,
    password,
  } = req.body;

  if (!validateUserDetails(req, { email, univ_id, password })) {
    return;
  }

  const passwordHash = await generatePasswordHash(password);
  const result = registerUserInDB({ email, univ_id, passwordHash });
  if (result) {
    res.send({ message: "Registered user successfully" });
  } else {
    res.status(500).send({ error: "Error creating new user" });
  }
};

module.exports = {
  registerUser,
};
