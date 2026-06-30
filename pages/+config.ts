import type { Config } from "vike/types";
import vikeReact from "vike-react/config";
import vikeReactRedux from "vike-react-redux/config"
import Layout from "../layout/Layout";

export default {
  Layout,
  title: "Yugioh Manga",
  description: "prideship real",
  extends: [vikeReact, vikeReactRedux],
  redirects: {
    "/": "/original",
  },
  prerender: false
} satisfies Config;
