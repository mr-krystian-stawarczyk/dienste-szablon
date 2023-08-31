import React, { useEffect, useState } from "react";
import { Container, Row, Card, Col } from "react-bootstrap";
import { client } from "../lib/client";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer"; // Importuj hook useInView

const Header10 = () => {
	const [textDuzy, setTextDuzy] = useState("");
	const [textMaly1, setTextMaly1] = useState("");
	const [resetAnim, setResetAnim] = useState(false);
	const [ref, inView] = useInView(); // Użyj hooka useInView

	const animatedPropsDuzy = useSpring({
		reset: resetAnim,
		to: { number: parseFloat(textDuzy) || 0 },
		from: { number: 0 },
		config: { duration: 3000 }, // Zmieniamy czas trwania animacji na 2000 ms (2 sekundy)
	});

	const animatedPropsMaly1 = useSpring({
		reset: resetAnim,
		to: { number: parseFloat(textMaly1) || 0 },
		from: { number: 0 },
		config: { duration: 3000 }, // Zmieniamy czas trwania animacji na 2000 ms (2 sekundy)
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch('*[_type == "dienste3"]');
				if (data && data.length > 0) {
					setTextDuzy(data[0].title || "");
					setTextMaly1(data[0].paragraph1 || "");
					setResetAnim(true); // Ustaw resetAnim na true
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		if (inView) {
			fetchData();
		}
	}, [inView]); // Uruchom efekt tylko gdy inView zmieni się

	return (
		<Container fluid className="">
			<Row className="justify-content-center text-center">
				<Col md={4} className="mx-auto">
					<Card
						ref={ref} // Przypisz ref do elementu, który ma być obserwowany
						className="bg-dark m-5 mx-auto bg-transparent"
						style={{ width: "18rem" }}
					>
						<h3>Werden Sie einer unserer zufriedenen Kunden ! </h3>
					</Card>
				</Col>{" "}
				<Col md={4} className="mx-auto">
					<Card
						ref={ref} // Przypisz ref do elementu, który ma być obserwowany
						className="bg-dark m-5 mx-auto bg-transparent"
						style={{ width: "18rem" }}
					>
						<Card.Body>
							<h4>Zufriedener Kunden: </h4>
							<h3>
								<animated.span>
									{animatedPropsDuzy.number.to((number) => number.toFixed(0))}
								</animated.span>
							</h3>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4} className="mx-auto">
					<Card
						ref={ref} // Przypisz ref do elementu, który ma być obserwowany
						className="bg-dark m-5 mx-auto bg-transparent"
						style={{ width: "18rem" }}
					>
						<Card.Body>
							<h4>Realisierungen: </h4>
							<h3>
								<animated.span>
									{animatedPropsMaly1.number.to((number) => number.toFixed(0))}
								</animated.span>
							</h3>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Header10;
