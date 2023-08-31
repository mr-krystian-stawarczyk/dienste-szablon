import React, { useEffect } from "react";
import { PageTransition } from "next-page-transitions";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import { SSRProvider } from "react-bootstrap";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import Script from "next/script";
import { useRouter } from "next/router";
import { StateContext } from "@/context/StateContext";

function App(props) {
	const { Component, pageProps, router } = props;
	const reactRouter = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {};

		reactRouter.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			reactRouter.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [reactRouter.events]);

	return (
		<SSRProvider>
			<StateContext>
				<ThemeProvider defaultTheme="dark">
					<Layout>
						<Head>
							<title>E Commerce </title>
							<meta name="" content="" />
							<link rel="manifest" href="/manifest.json" />
						</Head>
						<PageTransition
							timeout={300}
							classNames="page-transition"
							loadingDelay={500}
							loadingClassNames="loading"
							loadingTimeout={{
								enter: 400,
								exit: 0,
							}}
							skipInitialTransition={false}
						>
							<Component {...pageProps} key={router.route} />
						</PageTransition>
					</Layout>
				</ThemeProvider>
			</StateContext>
		</SSRProvider>
	);
}

export default App;
