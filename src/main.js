import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faChevronLeft,
  faChevronRight,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faChevronDown,
  faSpinner
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
