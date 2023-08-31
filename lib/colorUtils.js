// Function to calculate brightness from HEX color (0-255)
export const getBrightness = (hex) => {
	const c = hex.substring(1); // Remove '#' from HEX code
	const rgb = parseInt(c, 16); // Convert HEX to a number
	const r = (rgb >> 16) & 0xff; // Extract R, G, and B color components
	const g = (rgb >> 8) & 0xff;
	const b = rgb & 0xff;
	// Calculate brightness (average of color components)
	return (r + g + b) / 3;
};
