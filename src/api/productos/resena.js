import api from "../axios";

// ================== LISTAR RESEÑAS DE UN PRODUCTO ==================
export const obtenerResenas = async (idProducto) => {
	const { data } = await api.get(`/resenas/${idProducto}`);

	return data;
};

// ================== CREAR RESEÑA ==================
export const crearResena = async (idProducto, resena) => {
	const { data } = await api.post(`/resenas/${idProducto}`, resena);

	return data;
};
