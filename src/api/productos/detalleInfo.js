import api from "../axios";

// ================== LISTAR INFORMACIÓN DE UN PRODUCTO ==================
export const obtenerInformacion = async (idProducto) => {
	const { data } = await api.get(`/informacion-detalle/${idProducto}`);

	return data;
};

// ================== CREAR INFORMACIÓN ==================
export const crearInformacion = async (idProducto, informacion) => {
	const { data } = await api.post(`/informacion-detalle/${idProducto}`, informacion);

	return data;
};

// ================== ACTUALIZAR INFORMACIÓN ==================
export const actualizarInformacion = async (idInformacion, informacion) => {
	const { data } = await api.put(`/informacion-detalle/${idInformacion}`, informacion);

	return data;
};

// ================== ELIMINAR INFORMACIÓN ==================
export const eliminarInformacion = async (idInformacion) => {
	const { data } = await api.delete(`/informacion-detalle/${idInformacion}`);

	return data;
};
