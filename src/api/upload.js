import api from "./axios";

export const uploadProductImage = async (file) => {
	const formData = new FormData();

	formData.append("image", file); // "image" debe coincidir con upload.single("image")

	const { data } = await api.post("/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
};
