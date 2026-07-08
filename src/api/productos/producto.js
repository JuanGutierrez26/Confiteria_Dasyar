import api from "../axios";

// ================== LISTAR PRODUCTO ==================
export const obtenerProductos = async (search = "", categoria = "") => {
	const params = {};
	if (search) params.search = search;
	if (categoria) params.categoria = categoria;

	const { data } = await api.get("/productos", {
		params,
	});
	return data;
};

export const obtenerProductosAdmin = async () => {
	const { data } = await api.get("/productos/admin");
	return data;
};

// ================== LISTAR DETALLE PRODUCTO ==================
export const obtenerProducto = async (id) => {
	const { data } = await api.get(`/productos/${id}`);
	return data;
};

// ================== CREAR PRODUCTO Y DETALLE ==================
export const crearProducto = async (producto) => {
	const { data } = await api.post("/productos", producto);
	return data;
};

// ================== ACTUALIZAR PRODUCTO Y DETALLE ==================
export const actualizarProducto = async (id, producto) => {
	const { data } = await api.put(`/productos/${id}`, producto);
	return data;
};

// ================== ELIMINAR PRODUCTO Y DETALLE ==================
export const eliminarProducto = async (id) => {
	const { data } = await api.delete(`/productos/${id}/deactivate`);
	return data;
};

// ================== RESTAURAR PRODUCTO ==================
export const restaurarProducto = async (id) => {
	const { data } = await api.put(`/productos/${id}/restaurar`);
	return data;
};
