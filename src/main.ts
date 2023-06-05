import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// iconfont
import "./assets/css/iconfont.css";
// svg icon
import SvgIcon from "@/components/SvgIcon/index.vue";

import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.use(store);
app.use(router);

app.mount("#app");
