import api from "../axios";

export const obtenerCategoria = async () => {
	const { data } = await api.get("/categorias");
	return data;
};