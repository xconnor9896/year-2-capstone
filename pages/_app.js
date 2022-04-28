import "../proton/styles.scss";
import "../styles/globals.scss";
import HeadTags from "../components/HeadTags";
import Loading from "../components/Loading";
import { Router } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser } from "./util/authUser";

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

MyApp.getInitialProps = async ({ ctx, Component }) => {
	const { token } = parseCookies(ctx);
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const protectedRoutes = ["/dashboard", "/reports", "/profile", "/report"];
	const isProtectedRoute = protectedRoutes.includes(ctx.pathname);

	if (!token) {
		isProtectedRoute && redirectUser(ctx, "/");
	} else {
		// try {
		// 	const res = await axios.get(`localhost:3000/api/v1/auth`, {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	});
		// 	const { user, followData } = res.data;
		// 	if (user) !isProtectedRoute && redirectUser(ctx, "/");
		// 	pageProps.user = user;
		// 	pageProps.followData = followData;
		// } catch (err) {
		// 	destroyCookie(ctx, "token");
		// 	redirectUser(ctx, "/");
		// }
	}

	return { pageProps };
};

export default MyApp;
