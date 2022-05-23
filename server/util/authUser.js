import cookie from "js-cookie";
import Router from "next/router";

// export const baseURL = `http://localhost:${process.env.PORT || 3000}`;

export const baseURL = `https://west-mec-law-and-public-safety.herokuapp.com`;

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
