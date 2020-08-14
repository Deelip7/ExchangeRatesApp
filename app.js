// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   Get two Select option 
/
*/
const currenyOne = document.querySelector("#country1");
const currenyTwo = document.querySelector("#country2");
// document.addEventListener("change", (e) => {
//   if (e.target.id === "country1") {
//     console.log(currenyOne.options[currenyOne.selectedIndex].text);
//   } else {
//     console.log(currenyTwo.options[currenyTwo.selectedIndex].text);
//   }
// });

(function loadSelections() {
  fetch("https://api.exchangeratesapi.io/latest?base=USD")
    .then((res) => res.json())
    .then((data) => {
      const dataKeys = Object.keys(data.rates);
      dataKeys.forEach((element) => {
        currenyOne.add(new Option(element));
        currenyTwo.add(new Option(element));
      });
    });
})();
