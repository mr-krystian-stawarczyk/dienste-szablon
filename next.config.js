const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ["cdn.sanity.io"], // Add the cdn.sanity.io domain here
	},
};

module.exports = {
	...nextConfig,
	headers() {
		return [
			{
				source: "/manifest.json",
				headers: [
					{
						key: "Content-Type",
						value: "application/manifest+json",
					},
				],
			},
		];
	},
};
