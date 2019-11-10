import { axiosInstance } from "./api";
import { Health } from "../types/api";

const elem = document.getElementById("ping");
if (elem) {
  elem.addEventListener("click", () => {
    axiosInstance.get<Health>("/ping").then(({ data }) => {
      const counter = document.getElementById("count")!;
      counter.innerHTML = `${data.count}`;
    });
  });
}

if (module.hot) {
  module.hot.accept();
}
