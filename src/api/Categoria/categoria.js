import api from "../axios";

// ================== LISTAR CATEGORÍA ==================
export const obtenerCategoria = async () => {
	const { data } = await api.get("/categorias");
	return data;
};

// ================== CREAR CATEGORÍA ==================
export const crearCategoria = async (categoria) => {
	const { data } = await api.post("/categorias", categoria);
	return data;
};

// ================== ACTUALIZAR CATEGORÍA ==================
export const actualizarCategoria = async (id, categoria) => {
	const { data } = await api.put(`/categorias/${id}`, categoria);
	return data;
};

// ================== ELIMINAR CATEGORÍA ==================
export const eliminarCategoria = async (id) => {
	const { data } = await api.delete(`/categorias/${id}`);
	return data;
};
