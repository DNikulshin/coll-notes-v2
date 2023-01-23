import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import directives from "@/directives";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./main.css";

const app = createApp(App);
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount("#app");
