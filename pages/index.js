import { useTheme } from "next-themes";
import Head from "next/head";
import React from "react";

import Header1 from "@/components/Header1";
{
	/* 	import TechBar from "@/components/TechBar";  */
}
import Header2 from "@/components/Header2";
import Header3 from "@/components/Header3";
import Header4 from "@/components/Header4";
import Header5 from "@/components/Header5";
import Header6 from "@/components/Header6";
import Werk2 from "@/components/Werk2";

import Header10 from "@/components/Header10";

export default function Home() {
	const { theme } = useTheme();
	return (
		<>
			<Head>
				<title>E-Commerce</title>
				<meta name="" content="" />
				<meta name="robots" content="index, follow" />
			</Head>

			<Header1 />

			<Header10 />

			<Header2 />
			<Header3 />
			<Header4 />
			<Header5 />
			<Werk2 />
			<Header6 />
		</>
	);
}
