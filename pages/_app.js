import "../proton/styles.scss";
import "../styles/globals.scss";
import HeadTags from "../components/HeadTags";
import Loading from "../components/Loading";
import { Router } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const canShowNav = () => {
		let can = true;
		switch (router.pathname) {
			case "/":
				can = false;
				break;
			case "/404":
				can = false;
				break;
			case "/500":
				can = false;
				break;
			default:
				break;
		}

		return can;
	};

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
			{canShowNav() && <Navbar />}
			<Component {...pageProps} />
			{loading && <Loading />}
		</>
	);
}

export default MyApp;
