require("dotenv").config();
const { hashSync } = require("bcrypt");

const { USER_PASSWORD } = process.env;

const hashPasswordSeeds = (password) => hashSync(password, 10);

const userPassword = hashPasswordSeeds(USER_PASSWORD);

module.exports = {
  hashPasswordSeeds,
  up: (queryInterface) =>
    queryInterface.bulkInsert("Users", [
      {
        username: 'me',
        email: "habineza@gmail.com",
        password: userPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
