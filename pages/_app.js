import "../proton/styles.scss";
import "../styles/globals.scss";
import HeadTags from "../components/HeadTags";
import Loading from "../components/Loading";
import { Router } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	Router.events.on("routeChangeStart", () => {
		setLoading(true);
	});
	Router.events.on("routeChangeComplete", () => {
		setLoading(false);
	});
	Router.events.on("routeChangeError", () => {
		setLoading(false);
	});

	return (
		<>
			<HeadTags />
			<Navbar />
			<Component {...pageProps} />
			{loading && <Loading />}
		</>
	);
}

export default MyApp;
