import api from "./axios";

export const guardarToken = (token) => {
	localStorage.setItem("authToken", token);
};

export const obtenerToken = () => localStorage.getItem("authToken");

export const limpiarToken = () => {
	localStorage.removeItem("authToken");
};

export const login = async (credenciales) => {
	const { data } = await api.post("/auth/login", credenciales);

	if (data?.token) {
		guardarToken(data.token);
	}

	return data;
};
