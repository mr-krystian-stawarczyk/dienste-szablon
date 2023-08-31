import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { client } from "../lib/client"; // Update this import as needed

function About3() {
	const [timelineData, setTimelineData] = useState([]);
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "onas3"]`);
				if (data && data.length > 0) {
					const firstItem = data[0]; // You can choose which item to use
					setBackgroundColor(firstItem.backgroundColor || "#ffffff");
					data.sort((a, b) => (a.date > b.date ? 1 : -1));
					setTimelineData(data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const textColor = (() => {
		const r = parseInt(backgroundColor.slice(1, 3), 16);
		const g = parseInt(backgroundColor.slice(3, 5), 16);
		const b = parseInt(backgroundColor.slice(5, 7), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness > 128 ? "black" : "white";
	})();
	const backgroundStyle = { backgroundColor: backgroundColor };
	const textStyle = { color: textColor };
	return (
		<Container
			fluid
			className=" py-5 overflow-hidden"
			style={{
				...backgroundStyle,
			}}
		>
			<Row className="text-center text-dark" style={textStyle}>
				<h1 className="py-3">Entdecken Sie unsere Reise</h1>
			</Row>
			<VerticalTimeline lineColor={textColor} className="text-dark">
				{timelineData.map((item) => (
					<VerticalTimelineElement
						key={item._id}
						date={item.date}
						iconStyle={{
							background: item.iconStyleBackground || "rgb(0, 54, 129)",
							color: item.textColor || "#fff",
						}}
						contentArrowStyle={{
							borderRight: `${textColor} 7px solid`,
						}}
					>
						<h5>{item.title}</h5>
						<p>{item.content}</p>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>
		</Container>
	);
}

export default About3;
