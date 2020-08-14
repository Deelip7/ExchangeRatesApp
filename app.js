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
const display = document.querySelector(".displayResults");
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
        currenyOne.selectedIndex = "12";
        currenyTwo.selectedIndex = "27";
      });
    });
})();

document.querySelector("#covertBtn").addEventListener("click", (e) => {
  const selectionOne = currenyOne.options[currenyOne.selectedIndex].text;
  const selectionTwo = currenyTwo.options[currenyTwo.selectedIndex].text;

  fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${selectionOne},${selectionTwo}`)
    .then((res) => res.json())
    .then((data) => {
      const finalValues = Object.values(data.rates);
      const finalkeys = Object.keys(data.rates);
      console.log(data.rates);

      // console.log(selectionOne, "= ", finalValueOne[0]);
      // console.log(selectionTwo, "= ", finalValueOne[1]);

      display.innerHTML = `<div> ${finalkeys[0]} = ${finalValues[0]}</div>
                           <div> ${finalkeys[1]} = ${finalValues[1]}</div>`;
    });
});
