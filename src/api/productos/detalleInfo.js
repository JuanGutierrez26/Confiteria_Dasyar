import api from "../axios";

// ================== LISTAR INFORMACIÓN DE UN PRODUCTO ==================
export const obtenerInformacion = async (idProducto) => {
	const { data } = await api.get(`/informacion/${idProducto}`);

	return data;
};

// ================== CREAR INFORMACIÓN ==================
export const crearInformacion = async (idProducto, informacion) => {
	const { data } = await api.post(`/informacion/${idProducto}`, informacion);

	return data;
};

// ================== ACTUALIZAR INFORMACIÓN ==================
export const actualizarInformacion = async (idInformacion, informacion) => {
	const { data } = await api.put(`/informacion/${idInformacion}`, informacion);

	return data;
};

// ================== ELIMINAR INFORMACIÓN ==================
export const eliminarInformacion = async (idInformacion) => {
	const { data } = await api.delete(`/informacion/${idInformacion}`);

	return data;
};
