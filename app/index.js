import App from "./App";

import "./assets/scss/index.scss";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const app = new App();

const start = () => {
    // simulate loading..
    setTimeout(() => {
        app.init();
    }, 1000);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}
