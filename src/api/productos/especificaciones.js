import api from "../axios";

// ================== LISTAR ESPECIFICACIONES DE UN PRODUCTO ==================
export const obtenerEspecificaciones = async (idProducto) => {
	const { data } = await api.get(`/especificaciones/${idProducto}`);
	return data;
};

// ================== CREAR ESPECIFICACIÓN ==================
export const crearEspecificacion = async (idProducto, especificacion) => {
	const { data } = await api.post(`/especificaciones/${idProducto}`, especificacion);

	return data;
};

// ================== ACTUALIZAR ESPECIFICACIÓN ==================
export const actualizarEspecificacion = async (idEspecificacion, especificacion) => {
	const { data } = await api.put(`/especificaciones/${idEspecificacion}`, especificacion);

	return data;
};

// ================== ELIMINAR ESPECIFICACIÓN ==================
export const eliminarEspecificacion = async (idEspecificacion) => {
	const { data } = await api.delete(`/especificaciones/${idEspecificacion}`);

	return data;
};
