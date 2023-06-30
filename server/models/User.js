import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2, // Minimum of 2 length
			max: 50, // Maximum of 50 length
		},
		lastName: {
			type: String,
			required: true,
			min: 2, // Minimum of 2 length
			max: 50, // Maximum of 50 length
		},
		email: {
			type: String,
			required: true,
			max: 50, // Maximum of 50 length
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 50, // Maximum of 50 length
		},
		picturePath: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		viewedProfile: Number,
		impressions: Number,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export default User;
