import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	useEffect(() => {
		// Retrieve cart data from local storage on component mount
		const storedCartItems = localStorage.getItem("cartItems");
		const storedTotalPrice = localStorage.getItem("totalPrice");
		const storedTotalQuantities = localStorage.getItem("totalQuantities");

		if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
		if (storedTotalPrice) setTotalPrice(parseFloat(storedTotalPrice));
		if (storedTotalQuantities)
			setTotalQuantities(parseInt(storedTotalQuantities));
	}, []);

	useEffect(() => {
		// Store cart data in local storage whenever it changes
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
		localStorage.setItem("totalPrice", totalPrice.toString());
		localStorage.setItem("totalQuantities", totalQuantities.toString());
	}, [cartItems, totalPrice, totalQuantities]);

	const isProductInCart = (product, cartItems) => {
		return cartItems.some((item) => item._id === product._id);
	};

	const onAdd = (product, quantity) => {
		const isProductAlreadyInCart = isProductInCart(product, cartItems);
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
				return cartProduct; // Dodaj to, aby zachować elementy, które nie spełniają warunku
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		return (
			// Dodaj return dla zwracania JSX
			<h4>{`${qty} ${product.name} added to the cart.`}</h4>
		);
	};
	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);

		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	const toggleCartItemQuanitity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "inc") {
			setCartItems([
				...newCartItems,
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
			]);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				setCartItems([
					...newCartItems,
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
				]);
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
		}
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuanitity,
				onRemove,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
