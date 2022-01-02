// module
const jwt = require("jsonwebtoken");

// secret adalah kata kunci yang SEHARUSNYA disimpan baik baik
const SECRETKEY = "ini_sangat_tidak_aman_sekali";

// fungsi untuk membuat token
const createToken = (payload) => {
  return jwt.sign(payload, SECRETKEY, {
    // token akan hangus dalam 10 menit
    expiresIn: "600s",
  });
};

// fungsi untuk membaca payload
const readPayload = (token) => {
  return jwt.verify(token, SECRETKEY);
};

// export supaya dapat digunakan pada file lainnya
module.exports = {
  createToken,
  readPayload,
};

/*
  Perhatikan pada kode di atas secret key masih disimpan di dalam
  file jwt.js ini, 

  Ini SANGAT TIDAK AMAN, umumnya menggunakan
  `Environment Variable` untuk menyimpan secret key ini
*/
