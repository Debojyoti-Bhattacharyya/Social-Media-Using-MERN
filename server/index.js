import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
/* CONFIGURATIONS */

// Following two lines are required when you use type = module in index.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // We invoke this so that we can use dotenv files
const app = express(); // We invoke express app so that we can use our middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // This will invoke cross origin resource sharing policies
// The following line set up the dirname so that the assets can be stored locally, for production apps
// is should store them in cloud like AWS S3
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */

// All of these configurations are from Github repo of multer
// If someone uploads a photo into your website then it will be saved in the destination folder called public/assets
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

/* ROUTE WITH FILES */
app.post("auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single(picture), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const port = process.env.PORT || 6001;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server Port: ${port}`);

			/* ADD data one time */
			User.insertMany(users);
			Post.insertMany(posts);
		});
	})
	.catch((error) => console.log(`${error} did not connect`));
