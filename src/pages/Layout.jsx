import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
	return (
		<>
			<Navbar />
			<ScrollToTop>
				<Outlet />
			</ScrollToTop>
			<Footer />
		</>
	);
};