import Contact1 from "@/components/Contact1";

import React from "react";
import Head from "next/head";
import Contact2 from "@/components/Contact2";

function contact() {
	return (
		<div className="">
			<Head>
				<title>Kontakt</title>
				<meta name="" content="" />
				<meta name="robots" content="index, follow" />
			</Head>
			<Contact1 />

			<Contact2 />
		</div>
	);
}

export default contact;
