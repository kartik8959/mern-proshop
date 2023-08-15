import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Kartik jodhani",
    email: "kartik@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "kartik jodhani",
    email: "kjodhani@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default Users;
