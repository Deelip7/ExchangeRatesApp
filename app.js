import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

let currenyOne = document.querySelector("#country1");
let currenyTwo = document.querySelector("#country2");

currenyOne.addEventListener("change", (e) => {
  console.log(currenyOne.options[currenyOne.selectedIndex].text);
});

currenyTwo.addEventListener("change", (e) => {
  console.log(currenyTwo.options[currenyTwo.selectedIndex].text);
});
