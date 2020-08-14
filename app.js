// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   Populate <select> options with countries fatched from api
/   IIFE to Update UI dynamically.
*/
const currenyOne = document.querySelector("#country1");
const currenyTwo = document.querySelector("#country2");
const displayResults = document.querySelector(".displayResults");
const display = document.querySelector(".display");

(function loadSelections() {
  fetch("https://api.exchangeratesapi.io/latest?")
    .then((res) => res.json())
    .then((data) => {
      const dataKeys = Object.keys(data.rates);
      dataKeys.forEach((element) => {
        currenyOne.add(new Option(element)); // Add to options
        currenyTwo.add(new Option(element));
        currenyOne.selectedIndex = "27"; // default currency on load
        currenyTwo.selectedIndex = "12";
      });
    });
})();

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   when convert btn is "click" -> Get two Select options (from , to).
/
*/
document.querySelector("#covertBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const from = currenyOne.options[currenyOne.selectedIndex].text;
  const to = currenyTwo.options[currenyTwo.selectedIndex].text;

  fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`) //Rates are quoted against ${from}.Request specific exchange rates by setting the symbols parameter.
    .then((res) => res.json())
    .then((data) => {
      const finalkeys = Object.keys(data.rates); // country name.
      const finalValues = Object.values(data.rates); // Exchange rate

      display.classList.add("display__show");
      displayResults.innerHTML = `<div class="card shadow-lg"> 
      <div class="card-body w-100">
      <div class="card-text h2"><img src="https://www.countryflags.io/${from.slice(0, -1)}/flat/64.png" / > ${from} = 1</div>
      <div class="card-text h2"><img src="https://www.countryflags.io/${to.slice(0, -1)}/flat/64.png"/ > ${finalkeys[0]} = ${finalValues[0]}</div>
      </div>
      <div class="card-footer mt-3 "> Date: ${data.date}</div>
      </div>`;
    })
    .catch(() => console.log("Please try again"));
});
