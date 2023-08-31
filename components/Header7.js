import React, { useEffect, useState } from "react";
import { Container, Row, Carousel, Col, Button } from "react-bootstrap";
import { client } from "../lib/client";
import Product from "./Products";

const Header7 = () => {
	const [products, setProducts] = useState([]);
	const [productsPerSlide, setProductsPerSlide] = useState(3); // Domyślna liczba produktów na slajd

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(`*[_type == "product"]`);
				if (data) {
					setProducts(data);
				}
			} catch (error) {
				console.error("Error fetching data from Sanity:", error);
			}
		};

		fetchData();
	}, []);

	// Funkcja do ustawiania liczby produktów na slajd w zależności od szerokości ekranu
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

	// Funkcja do dzielenia produktów na slajdy
	const splitProductsIntoSlides = () => {
		const slides = [];
		for (let i = 0; i < products.length; i += productsPerSlide) {
			slides.push(products.slice(i, i + productsPerSlide));
		}
		return slides;
	};

	return (
		<Container fluid className="pt-5 bg-light">
			<Row className="text-center pt-5">
				<h1 className="text-dark">Sprawdź Nasze Produkty</h1>
			</Row>
			<Row className="justify-content-center align-items-center text-center">
				<Carousel variant="dark py-2" indicators={false}>
					{splitProductsIntoSlides().map((slideProducts, index) => (
						<Carousel.Item key={index} interval={3000}>
							<Container fluid>
								<Row>
									{slideProducts.map((product) => (
										<Col key={product._id} className="py-4">
											<Product product={product} />
										</Col>
									))}
								</Row>
							</Container>
						</Carousel.Item>
					))}
				</Carousel>
				<Col>
					<Button href="products" className="my-5 btn-dark overflow-hidden">
						Produkty
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Header7;
