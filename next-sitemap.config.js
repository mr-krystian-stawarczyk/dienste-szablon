/** @type {import('next-sitemap').IConfig} */

const config = {
	siteUrl: "https://pixel-genie.de" || process.env.NEXT_PUBLIC_SITE_URL,
	generateRobotsTxt: true, // (optional)
	// ...other options
	targetDirectory: "public",
};

module.exports = { ...config };
