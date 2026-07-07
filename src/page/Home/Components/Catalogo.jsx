import { obtenerCategoria } from "../../../api/Categoria/categoria";
import { obtenerProductos } from "../../../api/productos/producto";
import { useEffect, useState } from "react";

function Catalogo() {
	const [productos, setProductos] = useState([]);
	const [categoria, setCategoria] = useState([]);

	useEffect(() => {
		const cargarProductos = async () => {
			try {
				const data = await obtenerProductos();
				setProductos(data);
			} catch (error) {
				console.error(error);
			}
		};

		const cargarCategorias = async () => {
			try {
				const data = await obtenerCategoria();
				setCategoria(data);
			} catch (error) {
				console.error(error);
			}
		};

		cargarCategorias();
		cargarProductos();
	}, []);
	return (
		<>
			<section>gaaa</section>
		</>
	);
}

export default Catalogo;
