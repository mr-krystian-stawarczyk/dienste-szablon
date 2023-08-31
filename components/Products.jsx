import React from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
	return (
		<Col>
			<Link href={`/product/${slug.current}`} className="text-decoration-none ">
				<div>
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className="mx-auto my-5 shadow-lg"
					/>

					<h4 className="text-uppercase text-dark">{name}</h4>
					<h5 className="text-uppercase text-dark">{price} Zł</h5>
				</div>
			</Link>
		</Col>
	);
};

export default Product;
