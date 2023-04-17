/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	// images: {
	// 	remotePatterns: [
	// 		{
	// 			protocol: "https",
	// 			hostname: "images.unsplash.com",
	// 			port: "",
	// 			pathname: "/*/**",
	// 		},
	// 	],
	// },
	images: {
		domains: ['images.unsplash.com'],
	  },
};

module.exports = nextConfig;
