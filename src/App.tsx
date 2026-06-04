import { BrowserRouter, Routes, Route } from "react-router-dom"

import { HomePage } from "./Pages/Home/HomePage"
import { CategoryPage } from "./Pages/Category/CategoryPage"
import { ProductPage } from "./Pages/Product/ProductPage"
import { CartPage } from "./Pages/Cart/CartPage"
import { AboutPage } from "./Pages/About/AboutPage"
import { AdminPage } from "./Pages/Admin/AdminPage"
import { EditorPage } from "./Pages/Admin/EditorPage"

import PublicLayout from "./layouts/PublicLayout"
import PrivateLayout from "./layouts/PrivateLayout"


export default function App() {

	return (
		<BrowserRouter>
			<Routes>

				<Route element={<PrivateLayout />}>
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/admin/p/:id" element={<EditorPage />} />
				</Route>

				<Route element={<PublicLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/c/:slug" element={<CategoryPage />} />
					<Route path="/p/:id" element={<ProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/about" element={<AboutPage />} />
				</Route>

			</Routes>
		</BrowserRouter>
	)

}