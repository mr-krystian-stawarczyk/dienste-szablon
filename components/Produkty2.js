import React, { useEffect, useState } from "react";
import {
	Container,
	Row,
	Button,
	ButtonGroup,
	Col,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";
import { client } from "../lib/client";
import Product from "./Products";

const Produkty2 = () => {
	const [initialProducts, setInitialProducts] = useState([]);
	const [products, setProducts] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [visibleProducts, setVisibleProducts] = useState(3);
	const [showMore, setShowMore] = useState(false);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoryData = await client.fetch(`*[_type == "category"]`);
				setCategories(categoryData);
			} catch (error) {
				console.error("Error fetching categories from Sanity:", error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		fetchData();
	}, [selectedCategory, sortOrder, searchTerm]);

	const handleSortByPrice = () => {
		const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newSortOrder);

		const sortedProducts = [...initialProducts].sort((a, b) => {
			if (newSortOrder === "asc") {
				return a.price - b.price;
			} else {
				return b.price - a.price;
			}
		});

		setProducts(sortedProducts);
	};

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
				if (sortOrder === "asc" || sortOrder === "desc") {
					filteredData.sort((a, b) => {
						// Sortowanie po cenie
						const priceComparison = a.price - b.price;
						if (sortOrder === "asc") {
							return priceComparison;
						} else {
							return -priceComparison;
						}
					});
				}

				setInitialProducts(filteredData);
				setProducts(filteredData);
			}
		} catch (error) {
			console.error("Error fetching data from Sanity:", error);
		}
	};

	const handleShowMore = () => {
		// Jeśli showMore jest false, zwiększ liczbę widocznych produktów o 20
		if (!showMore) {
			setVisibleProducts(visibleProducts + 20);
		}
		setShowMore(true);
	};

	return (
		<Container fluid className="py-5 bg-light  ">
			<Row className="text-center align-items-center justify-content-center pt-5">
				<h1 className="text-dark my-5">Przeglądaj Kategorie</h1>{" "}
				<ButtonGroup className="  overflow-hidden">
					<Button
						onClick={handleSortByPrice}
						className="mx-auto rounded my-2 btn-dark "
					>
						Sortuj po cenie
					</Button>{" "}
				</ButtonGroup>
			</Row>
			<Row className="text-center align-items-center justify-content-center">
				<Dropdown drop="down-centered">
					<DropdownButton
						title="Wybierz kategorię"
						variant="dark"
						onSelect={(category) => setSelectedCategory(category)}
						className="my-2 px-3 "
					>
						{categories.map((category) => (
							<Dropdown.Item key={category._id} eventKey={category.name}>
								{category.name}
							</Dropdown.Item>
						))}
					</DropdownButton>
				</Dropdown>
			</Row>
			<Row className="justify-content-center align-items-center text-center">
				{products.slice(0, visibleProducts).map((product) => (
					<Product key={product._id} product={product} />
				))}
			</Row>
			<Row className="text-center">
				<Col md={11}>
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

export default Produkty2;
