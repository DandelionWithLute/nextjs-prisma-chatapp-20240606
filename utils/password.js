// This file is for authjs
// https://www.npmjs.com/package/bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "userInputToGet";

// Technique 1 (generate a salt and hash on separate function calls):
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// Technique 2 (auto-gen a salt and hash):
let hashedPassword = bcrypt.hash(myPlaintextPassword, saltRounds);

console.log(hashedPassword);
export default hashedPassword;
