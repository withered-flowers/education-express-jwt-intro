// module
const cors = require("cors");
const express = require("express");

// custom
const app = express();
const port = 3000;

const routes = require("./routes/index.js");

// Import fungsi createToken
const { createToken } = require("./helpers/jwt.js");
// Import fungsi compareHash
const { compareHash } = require("./helpers/bcrypt.js");
// Import model User
const { User } = require("./models/index.js");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/login", async (req, res) => {
	// res.status(200).json({ msg: "Not implemented yet" });

	// Bungkus dalam try catch block untuk bisa handle error dari async await
	try {
		// Menerima name dan password dari client
		const { name, password } = req.body;

		// Check username dan password
		const foundUser = await User.findOne({
			where: {
				name,
			},
		});

		// Bila user tidak ditemukan
		if (!foundUser) {
			throw new Error("INVALID_USERNAME_OR_PASSWORD");
		}

		if (!compareHash(password, foundUser.password)) {
			throw new Error("INVALID_USERNAME_OR_PASSWORD");
		}

		// Buat payload-nya
		// payload = data yang akan dimasukkan ke dalam token
		const payload = {
			// misalnya di sini kita hanya membuat token dari id saja
			id: foundUser.id,
		};

		// Buat tokennya
		const token = createToken(payload);

		// Kembalikan responsenya
		res.status(200).json({ access_token: token });
	} catch (err) {
		// Handle error di sini
		let code = 500;
		let msg = "Internal Server Error";

		if (err.message === "INVALID_USERNAME_OR_PASSWORD") {
			code = 400;
			msg = "Invalid name / password";
		}

		// Kembalikan status code dan pesan error
		res.status(code).json({ error: msg });
	}
});

app.use(routes);

// menjalankan express
app.listen(port, (_) => console.log(`Apps is working at port ${port}`));
