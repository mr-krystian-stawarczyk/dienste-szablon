import React, { useEffect, useState } from "react";
import { Container, Row, Button, ButtonGroup, Col } from "react-bootstrap";
import { client } from "../lib/client";
import Product from "./Products";

const Produkty1 = () => {
	const [initialProducts, setInitialProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [sortOrder, setSortOrder] = useState("asc");
	const [searchTerm, setSearchTerm] = useState("");
	const [sortByDate, setSortByDate] = useState("newest");
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [visibleProducts, setVisibleProducts] = useState(3);
	const [showMore, setShowMore] = useState(false);
	const [sortOrderPrice, setSortOrderPrice] = useState("asc");
	useEffect(() => {
		fetchData();
	}, [selectedCategory, sortOrder, searchTerm]);

	const fetchData = async () => {
		try {
			let query = `*[_type == "product"]`;
			if (selectedCategory) {
				query = `*[_type == "product" && category->name == $selectedCategory]`;
			}

			const data = await client.fetch(query, { selectedCategory });

			// Filtracja po nazwie produktu na podstawie searchTerm
			const filteredData = data.filter((product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			if (filteredData) {
				const sortedData = [...filteredData];
				sortedData.sort((a, b) => {
					const priceComparison = a.price - b.price;
					if (priceComparison !== 0) {
						return priceComparison;
					}
					return new Date(b._createdAt) - new Date(a._createdAt);
				});

				setInitialProducts(sortedData); // Set initialProducts with sorted filtered data
				setProducts(sortedData); // Set products with sorted filtered data
			}
		} catch (error) {
			console.error("Error fetching data from Sanity:", error);
		}
	};
	const sortByDateAdded = () => {
		const sortedProducts = [...products];
		sortedProducts.sort((a, b) => {
			if (sortByDate === "newest") {
				return new Date(b._createdAt) - new Date(a._createdAt);
			} else {
				return new Date(a._createdAt) - new Date(b._createdAt);
			}
		});
		setProducts(sortedProducts);
		setSortByDate(sortByDate === "newest" ? "oldest" : "newest");
	};

	const handleShowMore = () => {
		// Jeśli showMore jest false, zwiększ liczbę widocznych produktów o 20
		if (!showMore) {
			setVisibleProducts(visibleProducts + 20);
		}
		setShowMore(true);
	};

	const sortByPrice = () => {
		const sortedProducts = [...initialProducts]; // Use initialProducts instead of products
		sortedProducts.sort((a, b) => {
			if (sortOrderPrice === "asc") {
				return a.price - b.price;
			} else {
				return b.price - a.price;
			}
		});
		setProducts(sortedProducts);
		setSortOrderPrice(sortOrderPrice === "asc" ? "desc" : "asc");
	};

	return (
		<Container fluid className="py-5 bg-white  ">
			<Row className="text-center align-items-center justify-content-center pt-5">
				{" "}
				<h1 className="text-dark my-5">Sprawdź Nasz Asortyment</h1>
				<ButtonGroup className=" button-group-container overflow-hidden">
					<Button
						onClick={sortByPrice}
						className="mx-auto rounded my-2 btn-dark"
					>
						Sortuj po cenie {sortOrderPrice === "asc"}
					</Button>{" "}
					<input
						type="text"
						placeholder="Wyszukaj po nazwie"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="bg-light mx-auto text-dark my-2"
					/>
					<Button
						onClick={sortByDateAdded}
						className="mx-auto rounded my-2 btn-dark"
					>
						Sortuj po dacie
						{sortByDate === "newest"}
					</Button>
				</ButtonGroup>
			</Row>

			<Row className="justify-content-center align-items-center text-center">
				{products.slice(0, visibleProducts).map((product) => (
					<Product key={product._id} product={product} />
				))}
			</Row>
			<Row className="text-center">
				<Col md={12}>
					{!showMore && products.length > visibleProducts && (
						<Button onClick={handleShowMore} className="mt-3 btn-dark">
							Pokaż więcej
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default Produkty1;
