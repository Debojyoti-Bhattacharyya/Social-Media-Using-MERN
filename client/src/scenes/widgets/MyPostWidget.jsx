import React from "react";
import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
	Palette,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import widgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [post, setPost] = useState("");
	const { palette } = useTheme();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const isNonMobileScreen = useMediaQuery("(mid-width: 1000px)");
	const mediumMain = palette.neutral.mediumMain;
	const medium = Palette.neutral.medium;

	const handlePost = async () => {
		const formData = new formData();
		formData.append("userId", _id);
		formData.append("description", post);
		if (image) {
			formData.append("picture", image);
			formData.append("picturePath", image.name);
		}

		const response = await fetch(`http://localhost:3000/posts`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: formData,
		});
		const posts = await response.json();
		dispatch(setPosts({ posts }));
		setImage(null);
		setPost("");
	};
};
export default MyPostWidget;
