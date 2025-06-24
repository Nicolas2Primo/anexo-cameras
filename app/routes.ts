import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("", "routes/layout.tsx", [
    route("cameras", "routes/cameras.tsx"),
])] satisfies RouteConfig;
