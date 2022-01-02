// module
const bcrypt = require(`bcrypt`);

// fungsi untuk membuat hash
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 8);
};

// fungsi untuk membandingkan password dengan hash
const compareHash = (plaintext, hash) => {
  return bcrypt.compareSync(plaintext, hash);
};

// export supaya dapat digunakan pada file lainnya
module.exports = {
  hashPassword,
  compareHash,
};
