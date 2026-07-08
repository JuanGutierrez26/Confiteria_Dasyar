import api from "../axios";

export const obtenerProductos = async (search = "", categoria = "") => {
	const params = {};
	if (search) params.search = search;
	if (categoria) params.categoria = categoria;

	const { data } = await api.get("/productos", {
		params,
	});
	return data;
};

export const obtenerProducto = async (id) => {
	const { data } = await api.get(`/productos/${id}`);
	return data;
};

export const crearProducto = async (producto) => {
	const { data } = await api.post("/productos", producto);
	return data;
};

export const actualizarProducto = async (id, producto) => {
	const { data } = await api.put(`/productos/${id}`, producto);
	return data;
};

export const eliminarProducto = async (id) => {
	const { data } = await api.delete(`/productos/${id}`);
	return data;
};
