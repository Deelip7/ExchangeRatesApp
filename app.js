// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   Populate <select> options with countries fatched from api
/   IIFE to Update UI.
*/
const currenyOne = document.querySelector("#country1");
const currenyTwo = document.querySelector("#country2");
const displayResults = document.querySelector(".displayResults");

(function loadSelections() {
  fetch("https://api.exchangeratesapi.io/latest?")
    .then((res) => res.json())
    .then((data) => {
      const dataKeys = Object.keys(data.rates);
      dataKeys.forEach((element) => {
        currenyOne.add(new Option(element)); // Add to options
        currenyTwo.add(new Option(element));
        currenyOne.selectedIndex = "26"; // default currency on load
        currenyTwo.selectedIndex = "15";
      });
    })
    .catch((err) => console.log("Please try again", err));
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
  const amount = document.querySelector("#dollarAmount").value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`) //Rates are quoted against ${from}.Request specific exchange rates by setting the symbols parameter.
    .then((res) => res.json())
    .then((data) => {
      const finalValues = Object.values(data.rates); // Exchange rate

      document.querySelector(".display").classList.add("display__show");
      displayResults.innerHTML = `
      <div class="card shadow-lg rounded-0"> 
        <div class="card-body">
        <div class="card-text h4">
            <img src="https://www.countryflags.io/${from.slice(0, -1)}/flat/64.png" / > - 
            ${new Intl.NumberFormat("USD", { style: "currency", currency: from }).format(amount).replace(/^(\D+)/, "$1 ")}
        </div>
        <div class="card-text h4 text-center"> </div>
        <div class="card-text h4 ">
            <img src="https://www.countryflags.io/${to.slice(0, -1)}/flat/64.png"/> - ${new Intl.NumberFormat("USD", {
        style: "currency",
        currency: to,
      })
        .format((finalValues[0] * amount).toFixed(2))
        .replace(/^(\D+)/, "$1 ")}
        </div>
        </div>    
      
      </div>
      <div class="card-footer bg-light w-100"> Date: ${data.date}</div>`;
    })
    .catch((err) => console.log("Something went wrong", err));
});

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   when <select> options is "click" -> pass itto addFlags functions (country name , e.target.id)
/   
*/
document.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "option") {
    addFlags(e.target.value, e.target.parentElement.previousSibling.previousSibling.children[0].id);
  }
});

function addFlags(flagName, targetID) {
  const countryOneTitle = document.querySelector(`#${targetID}`);
  countryOneTitle.innerHTML = `<img src="https://www.countryflags.io/${flagName.slice(0, -1)}/flat/64.png"/" alt="" width="30px" height="30px" />`;
}
