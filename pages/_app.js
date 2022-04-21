import "../proton/styles.scss";
import "../styles/globals.scss";
import HeadTags from "../components/HeadTags";
import Loading from "../components/Loading";
import { Router } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	const [canShowNav, setCanShowNav] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setCanShowNav(true);

		console.log(router.pathname);

		let noNavs = ["/", "/404", "/500", "/report/print/[id]"];

		if (noNavs.includes(router.pathname)) {
			setCanShowNav(false);
		}
	}, [router.pathname]);

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
			{canShowNav && <Navbar />}
			<Component {...pageProps} />
			{loading && <Loading />}
		</>
	);
}

export default MyApp;
