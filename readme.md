## Table of Content
1. [Persyaratan Dasar](#persyaratan-dasar)
1. [Intro](#intro)
1. [JWT What Is](#jwt-what-is)
1. [Let's Demo](#lets-demo)
1. [Referensi](#referensi)

## Persyaratan Dasar
- Sudah memasang nodejs
- Mengerti penggunaan Express
- Mengerti penggunaan REST API

## Intro

## JWT What Is

## Let's Demo

### Inisialisasi Project
Pada tahap ini kita akan melakukan inisialisasi project

Langkah-langkah:
1. Bukalah terminal
1. Buatlah sebuah folder untuk project demo ini
1. Inisialisasi project dengan `npm init -y`
1. Install package yang diperlukan untuk template dasar dengan `npm install express pg sequelize cors bcrypt`
1. Install package dev yang diperlukan untuk template dasar dengan `npm install -D sequelize-cli nodemon`

Sampai di sini tahap inisialisasi project selesai, selanjutnya kita akan menginisialisasi database yang digunakan.

Pada pembelajaran ini kita menggunakan PostgreSQL sebagai databasenya, namun bisa diganti dengan database apapun (yang disupport oleh sequelize)

### Inisialisasi Database
Pada bagian ini kita akan membuat sebuah tabel pada database yang digunakan dengan nama `Users` yang memiliki kolom sebagai berikut:
- `name` dengan tipe varchar
- `password` dengan tipe varchar dan akan disimpan dengan cara bcrypt

Langkah-langkah:
1. Inisialisasi sequelize dengan `npx sequelize init`
1. Mengubah konfigurasi database pada file `config/config.json` (pada pembelajaran ini kita hanya menggunakan `development` saja)
1. Membuat model dan migration untuk tabel `Users` dengan `npx sequelize model:create --name User --attributes name:string,password:string`
1. Buat database dengan menggunakan `npx sequelize db:create`
1. Buat tabel pada database dengan menggunakan `npx sequelize db:migrate`

Sampai di sini tahap inisialisasi database selesai, selanjutnya kita akan mulai untuk menginisialisasi aplikasi yang akan dibuat

### Inisialisasi Aplikasi
Pada bagian ini kita akan mulai membuat aplikasi dengan menyediakan 2 endpoint yang digunakan pada aplikasi:

`POST /register`
- Digunakan untuk melakukan registrasi user, mengembalikan informasi berupa user berhasil dibuat apabila registrasi berhasil, dan mengembalikan error yang ada apabila terjadi error pada saat registrasi
- Pada saat register dilakukan password sudah harus dihash sebelum dimasukkan ke dalam tabel `Users`

`POST /login`
- Digunakan untuk melakukan login user, mengembalikan informasi berupa "access token" apabila user behasil login, dan mengembalikan error yang ada apabila terjadi error pada saat login

Langkah-langkah:
1. Membuat sebuah file dengan nama `app.js`
1. Menuliskan kode untuk `app.js` yang berbasis *express* sebagai berikut:
```js
// File: app.js
// module
const cors = require("cors");
const express = require("express");

// custom
const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Membuat endpoint yang dibutuhkan
app.post("/register", async (req, res) => {
  res.status(200).json({ msg: "Not implemented yet" });
});

app.post("/login", async (req, res) => {
  res.status(200).json({ msg: "Not implemented yet" });
});

// menjalankan express
app.listen(port, (_) => console.log(`Apps is working at port ${port}`));
```

Sampai dengan tahap ini tahap inisialisasi aplikasi sudah selesai, selanjutnya kita akan mencoba untuk menyelesaikan endpoint ini satu per satu

### Menyelesaikan Endpoint POST /register
Pada endpoint `POST /register` ini, pengguna dapat melakukan registrasi, dimana pengguna akan diminta untuk memasukkan nama dari user beserta passwordnya. password ini nantinya akan langsung di-hash, kemudian dimasukkan ke dalam tabel `Users`

Sebelum kita mengimplementasikan `POST /register` ini, kita harus mengimplementasikan hash passwordnya terlebih dahulu. Pada pembelajaran ini kita akan menggunakan sequelize `hooks` dan menggunakan `bcrypt` sebagai hash-nya.

Langkah-langkah:
1. Membuat folder `helpers`
1. Membuat file `helpers/bcrypt.js`
1. Menambahkan kode pada `helpers/bcrypt.js`, yaitu fungsi untuk membuat `hash` dan memeriksa `hash`
```js
// File: helpers/bcrypt.js
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
```

Selanjutnya kita akan membuat sequelize `hooks` supaya dapat melakukan auto hash password

Langkah-langkah:
1. Membuka file `models/user.js`
1. Memodifikasi kode pada file `models/user.js` sebagai berikut
```js
// File: models/user.js
"use strict";
const { Model } = require("sequelize");
// Jangan lupa untuk mengimpor helper bcrypt di sini
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // Menambahkan hook beforeCreate di sini
  User.beforeCreate((instanceUser, options) => {
    // mengganti password dengan yang sudah dihash
    instanceUser.password = hashPassword(instanceUser.password);
  });
  return User;
};
```

Selanjutnya kita akan memodifikasi file `app.js` dan menyelesaikan endpoint `POST /register`

Langkah-langkah:
1. Buka file `app.js`
1. Memodifikasi kode pada file `app.js`, pada endpoint `POST /register`:
```js
// File: app.js
...

// Import model User
const { User } = require('./models/index.js');

// Membuat endpoint yang dibutuhkan
app.post("/register", async (req, res) => {
  // res.status(200).json({ msg: "Not implemented yet" });

  // Bungkus dalam try catch block untuk bisa handle error dari
  // async await
  try {
    // Menerima name dan password dari client
    const { name, password } = req.body;

    // Membuat object User yang akan dimasukkan ke dalam tabel
    const objUser = {
      name,
      password,
    };

    // Membuat user baru
    const response = await User.create(objUser);

    // Apabila terjadi error
    if (!response) {
      throw new Error("USER_CREATE_FAILED");
    }

    // Apabila beres kembalikan status yang benar
    res
      .status(201)
      .json({ msg: `User with id ${response.id} successfully created !` });
  } catch (err) {
    // Handle error di sini
    let code = 500;
    let msg = "Internal Server Error";

    if (err.message === "USER_CREATE_FAILED") {
      code = 400;
      msg = "Bad Request";
    }
    // Jangan lupa untuk handle Sequelize Error yang ada !

    // Kembalikan status code dan pesan error
    res.status(code).json({ error: msg });
  }
});

```

### Menyelesaikan Endpoint POST /login

## Prerequisites
