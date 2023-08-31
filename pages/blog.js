import Blog1 from "@/components/Blog1";

import Blog2 from "@/components/Blog2";

import React from "react";
import Head from "next/head";

function blog() {
	return (
		<div className="">
			<Head>
				<title>
					Tipps, Blog, Webseite Erstellen in Nettetal | Pixel Genie Webagentur
				</title>
				<meta
					name="description"
					content="Pixel-Genie: Unser Blog für Webdesign, Webseite Erstellen, Webentwicklung, Online-Marketing und mehr. Lesen Sie unsere neuesten Artikel und erfahren Sie mehr über die neuesten Trends und Entwicklungen in der Online-Welt."
				/>
				<meta name="robots" content="index, follow" />
			</Head>
			<Blog1 />
			<Blog2 />
		</div>
	);
}

export default blog;
