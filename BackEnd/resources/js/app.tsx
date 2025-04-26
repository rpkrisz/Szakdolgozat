import "../css/app.css";
import "./bootstrap";

import {createInertiaApp, usePage} from "@inertiajs/react";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {createRoot} from "react-dom/client";
import {ReactElement} from "react";
import Guest from "./Layouts/GuestLayout";
import Authenticated from "./Layouts/AuthenticatedLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    const pages = import.meta.glob("./Pages/**/*.tsx", {eager: true});
    let page = pages[`./Pages/${name}.tsx`];
    page.default.layout = page.default.layout || (page => <Authenticated children={page} />);
    return page;
  },
  setup({el, App, props}) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
});
