import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";

export const baseURL = window.location.hostname || process.env.BASE_URL;

export const logoutUser = () => {
	cookie.remove("token");
	Router.reload();
};

export const setToken = (token) => {
	cookie.set("token", token);
	Router.push("/");
};

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
};
