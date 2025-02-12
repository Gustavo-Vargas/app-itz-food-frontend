import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout showHero={true}>
						<HomePage />
					</Layout>
				}
			/>
			<Route path="/auth-callback" element={<AuthCallBackPage />} />

			{/* Rutas sin protección */}
			<Route
				path="/search/:city"
				element={
					<Layout showHero={false}>
						<SearchPage />
					</Layout>
				}
			/>

			<Route
				path="/detail/:restaurantId"
				element={
					<Layout showHero={false}>
						<DetailPage />
					</Layout>
				}
			/>

			{/* Rutas Protegidas */}
			<Route element={<ProtectedRoute />}>
				<Route
					path="/user-profile"
					element={
						<Layout>
							<UserProfilePage />
						</Layout>
					}
				/>

				<Route
					path="/manage-restaurant"
					element={
						<Layout>
							<ManageRestaurantPage />
						</Layout>
					}
				/>
			</Route>

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default AppRoutes;
