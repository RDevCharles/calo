const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const prisma = new PrismaClient();
let user_profiles = await prisma.user.findMany();

async function get_profiles() {
  let user_profile;
  let user_profiles = await prisma.user.findMany();
  let profile_creation = document.getElementById('profile_creation');
  
  

  //display profiles

  let user_profile_list = document.getElementById("profile_ul");
  for (user_profile of user_profiles) {
    let user_profile_a = document.createElement("a");
    user_profile_a.setAttribute("href",`${user_profile.name}`)
    let user_profile_li = document.createElement("li");
    user_profile_li.textContent = `${user_profile.name}`;
    user_profile_a.appendChild(user_profile_li);
    user_profile_a.href = `${user_profile.id}`;
    user_profile_list.appendChild(user_profile_a);
  }
}

async function request_profile_creation() {
  profile_creation.style.display = 'block';
}

if (user_profiles.length !== 0) {
  get_profiles();
} else {
  request_profile_creation()
}




const user_profile_name = document.getElementById("user_profile_name");
const user_profile_email = document.getElementById("user_profile_email");
const user_passphrase = document.getElementById("user_passphrase");

async function create_new_profile() {
  user_profile_name.innerText = user_profile_name.value;
  user_profile_email.innerText = user_profile_email.value;
  user_passphrase.innerText = user_passphrase.value;
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

  setTimeout(() => {

    location.reload();
  },1000)
}

const create_button = document.getElementById("create");

create_button.addEventListener("click", create_new_profile);
