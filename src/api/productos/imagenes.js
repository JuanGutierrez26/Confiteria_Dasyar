import api from "../axios";

// ================== LISTAR IMÁGENES DE UN PRODUCTO ==================
export const obtenerImagenes = async (idProducto) => {
	const { data } = await api.get(`/imagenes/${idProducto}`);

	return data;
};

// ================== CREAR IMAGEN ==================
export const crearImagen = async (idProducto, imagen) => {
	const { data } = await api.post(`/imagenes/${idProducto}`, imagen);

	return data;
};

// ================== ACTUALIZAR IMAGEN ==================
export const actualizarImagen = async (idImagen, imagen) => {
	const { data } = await api.put(`/imagenes/${idImagen}`, imagen);

	return data;
};

// ================== ELIMINAR IMAGEN ==================
export const eliminarImagen = async (idImagen) => {
	const { data } = await api.delete(`/imagenes/${idImagen}`);

	return data;
};
