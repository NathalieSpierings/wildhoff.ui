import React from "react";
import { matchPath } from "react-router";
import { proxyPrefix } from "../config";

import HomePage from "./HomePage";
import DemoPage from "./DemoPage";
import DropdownPage from "./Demos/DropdownPage";
import DataTablePage from "./Demos/DataTablePage";


export const getInitialMenuItem = (pathname: string) => {
	if (matchPath(proxyPrefix + "/", pathname)) {
		return "home";
	}
	
	if (matchPath(proxyPrefix + "/demo/*", pathname)) {
		return "demo";
	}

	return undefined;
};

export const routes = [
	{
		path: "/",
		element: <HomePage />
	},
	{
		path: "/demo",
		element: <DemoPage />
	},
	/* Demo's*/
	{
		path: "/demo/dropdown",
		element: <DropdownPage />
	},
	{
		path: "/demo/datatable",
		element: <DataTablePage />
	},
];
