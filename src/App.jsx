import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home/home";
import ProductDetail from "./page/ProductoDetalle/ProductDetail";
import NotFound from "./page/NotFound";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detalleProducto/:id" element={<ProductDetail />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
