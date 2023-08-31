import React from "react";
import Navbar from "./Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import CookieConsent from "./CookieConsent";
{
	/* 	import ContactForm from "./ContactForm";  */
}
import Footer from "./Footer";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
});

const Layout = ({ children, pageProps }) => {
	const [currentTheme, setCurrentTheme] = useState("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setCurrentTheme(savedTheme);
			document.body.classList.add(savedTheme);
		} else {
			setCurrentTheme("light");
			document.body.classList.add("light");
		}
	}, []);

	const toggleTheme = () => {
		if (currentTheme === "light") {
			setCurrentTheme("dark");
			localStorage.setItem("theme", "dark");
			document.body.classList.add("dark");
			document.body.classList.remove("light");
		} else {
			setCurrentTheme("light");
			localStorage.setItem("theme", "light");
			document.body.classList.add("light");
			document.body.classList.remove("dark");
		}
	};
	return (
		<div className="layout">
			<div className={poppins.className}>
				<header>
					<Navbar {...pageProps} toggleTheme={toggleTheme} />
					<CookieConsent />
				</header>
				<main className="main-container">{children}</main>
				<footer>
					{/* 	<ContactForm {...pageProps} /> */}
					<Footer />
				</footer>
			</div>
		</div>
	);
};
export default Layout;
