const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { createElement } = require("react");
const saltRounds = 10;

const prisma = new PrismaClient();




async function get_profiles() {
  let user_profile;
  let user_profiles = await prisma.user.findMany();
  
  //display profiles
  
  let user_profile_list = document.getElementById("profile_ul");
  for (user_profile of user_profiles) {
    let user_profile_a = document.createElement("a");
    let user_profile_li = document.createElement("li");
    user_profile_li.textContent = `${user_profile.name}`;
    user_profile_a.appendChild(user_profile_li);
    user_profile_a.href = `${user_profile.id}`;
    user_profile_list.appendChild(user_profile_a);
  }
}

get_profiles();

const user_profile_name = document.getElementById("user_profile_name");
const user_profile_email = document.getElementById("user_profile_email");
const user_passphrase = document.getElementById("user_passphrase");


async function create_new_profile() {
  user_profile_name.innerText = user_profile_name.value
  user_profile_email.innerText = user_profile_email.value
  user_passphrase.innerText = user_passphrase.value
  bcrypt.hash(user_passphrase.value, saltRounds, async function (err, hash) {
    try {
      await prisma.user.create({
        data: {
          name: user_profile_name.value,
          email: user_profile_email.value,
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


// function test() {
//   user_profile_name.innerText = user_profile_name.value
 
//   console.log(user_profile_name.value);
// }

// user_profile_name.addEventListener("change", test)
