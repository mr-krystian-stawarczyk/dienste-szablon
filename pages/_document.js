import { Html, Head, Main, NextScript } from "next/document";
import dotenv from "dotenv";
dotenv.config();
export default function Document() {
	return (
		<Html lang="pl">
			<Head>
				<meta name="description" content="" />
				<meta name="keywords" content="" />
				<meta name="theme-color" content="#000000" />
				<link rel="icon" href="/assets/store.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
