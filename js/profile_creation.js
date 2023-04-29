const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "password";
const prisma = new PrismaClient();

async function create_new_profile() {
 
  bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      try {
       
      await prisma.user.create({
        data: {
          name: "name",
          email: "email",
          passphrase: hash,
        },
      });
    } catch (error) {
      alert(error);
    }
  });
}


const create_button = document.getElementById("create");

create_button.addEventListener("click", create_new_profile);
