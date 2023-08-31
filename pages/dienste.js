import React from "react";
import Head from "next/head";
import Dienste1 from "@/components/Dienste1";
import Dienste2 from "@/components/Dienste2";
import Header9 from "@/components/Header9";

function dienste() {
	return (
		<div className="">
			<Head>
				<title>Dienste</title>
				<meta name="" content="" />
				<meta name="robots" content="index, follow" />
			</Head>
			<Dienste1 />
			<Header9 />
			<Dienste2 />
		</div>
	);
}

export default dienste;
