import { createApp } from "vue";
import Blynck from "./Blynck.vue";
import router from "./router";
import store from "./store";

createApp(Blynck).use(store).use(router).mount("#app");
