import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import { client, urlFor } from "../lib/client";
import ImageModal from "./ImageModal"; // Import komponentu ImageModal

const Werk2 = () => {
	const [werkData, setWerkData] = useState([]);
	const [productsPerSlide, setProductsPerSlide] = useState(3);
	const [showModal, setShowModal] = useState(false); // Dodaj stan do kontrolowania widoczności modala
	const [modalImageUrl, setModalImageUrl] = useState(""); // Stan do przechowywania adresu URL obrazu

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "werk2"]`);
				if (data) {
					setWerkData(data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	const updateProductsPerSlide = () => {
		if (window.innerWidth <= 768) {
			setProductsPerSlide(1);
		} else if (window.innerWidth <= 992) {
			setProductsPerSlide(2);
		} else {
			setProductsPerSlide(3);
		}
	};

	useEffect(() => {
		// Wywołaj funkcję na starcie i przy zmianie szerokości ekranu
		updateProductsPerSlide();
		window.addEventListener("resize", updateProductsPerSlide);
		return () => {
			window.removeEventListener("resize", updateProductsPerSlide);
		};
	}, []);

	// Funkcja do obsługi kliknięcia na obraz
	const handleImageClick = (imageUrl) => {
		setModalImageUrl(imageUrl);
		setShowModal(true);
	};

	// Funkcja do zamykania modala
	const handleCloseModal = () => {
		setShowModal(false);
		setModalImageUrl("");
	};

	// Funkcja do dzielenia produktów na slajdy
	const splitProductsIntoSlides = () => {
		const slides = [];
		for (let i = 0; i < werkData.length; i += productsPerSlide) {
			slides.push(werkData.slice(i, i + productsPerSlide));
		}
		return slides;
	};

	return (
		<Container fluid className=" bg-light py-5">
			<Row className="justify-content-center align-items-center text-center text-dark py-5">
				<h1>Unsere Letzte Werk</h1>
			</Row>
			<Row className="justify-content-center align-items-center text-center">
				<Col>
					<Carousel indicators={false} variant="dark">
						{splitProductsIntoSlides().map((slide, slideIndex) => (
							<Carousel.Item key={slideIndex} interval={3000}>
								<Row className="justify-content-center align-items-center text-center">
									{slide.map((item, index) => (
										<Col key={index} className="d-flex justify-content-center ">
											<Card style={{ minWidth: "18rem" }}>
												{/* Dodaj obsługę kliknięcia na obraz */}
												<img
													width={250}
													height={250}
													className="d-block w-100"
													src={urlFor(item.image)}
													alt="Product"
													onClick={() => handleImageClick(urlFor(item.image))}
													style={{ cursor: "pointer" }}
												/>
											</Card>{" "}
										</Col>
									))}
								</Row>
							</Carousel.Item>
						))}
					</Carousel>
				</Col>
			</Row>
			<Row className="text-center  justify-content-center my-2">
				<Col md={4} className="py-5">
					<Button className="btn-dark" href="werk">
						Werk
					</Button>
				</Col>
			</Row>
			{/* Dodaj komponent ImageModal */}
			<ImageModal
				show={showModal}
				handleClose={handleCloseModal}
				imageUrl={modalImageUrl}
			/>
		</Container>
	);
};

export default Werk2;
