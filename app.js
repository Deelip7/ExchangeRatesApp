// Bootstrap modules
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

//Global variables | Two <select>
const currenyOne = document.querySelector("#country1");
const currenyTwo = document.querySelector("#country2");
/*
/------------------------------------------------------------
/   Classes
/------------------------------------------------------------
/   
*/
class ExchangeRate {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}

class UpdateUI {
  //Populate <select> options with countries fatched from api
  static addCountryToList() {
    UpdateUI.clearInputField();
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
  }

  //Calculate Exchange rate using API data
  static calculateRate(currency) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency.from}&symbols=${currency.to}`) //Rates are quoted against ${from}.Request specific exchange rates by setting the symbols parameter.
      .then((res) => res.json())
      .then((data) => {
        const finalValues = Object.values(data.rates); // Exchange rate
        document.querySelector(".display").classList.add("display__show");
        document.querySelector(".display").innerHTML = `
      <div class="card-text h4 ">
         <img src="https://www.countryflags.io/${currency.from.slice(0, -1)}/flat/64.png" / > -
         ${new Intl.NumberFormat("USD", { style: "currency", currency: currency.from }).format(currency.amount).replace(/^(\D+)/, "$1 ")}
      </div>
      <div class="card-text h4 ">
        <img src="https://www.countryflags.io/${currency.to.slice(0, -1)}/flat/64.png"/> - ${new Intl.NumberFormat("USD", {
          style: "currency",
          currency: currency.to,
        })
          .format((finalValues[0] * currency.amount).toFixed(2))
          .replace(/^(\D+)/, "$1 ")}
      </div>
      <div class="pt-3"> ECB Exchange rates: ${data.date}</div>
      `;
      })
      .catch((err) => console.log("Something went wrong", err));
  }

  static addFlags(targetValue, targetID) {
    const countryOneTitle = document.querySelector(`#${targetID}`);
    countryOneTitle.innerHTML = `<img src="https://www.countryflags.io/${targetValue.slice(0, -1)}/flat/64.png"/" alt="" width="30px" height="30px" />`;
  }

  // Clear input field after button click
  static clearInputField() {
    // document.querySelector("#dollarAmount").value = "";
  }
}

/*
/------------------------------------------------------------
/   Events
/------------------------------------------------------------
/   Convert button instantiate ExchangeRate and call UI class
/
*/
// User inputs and UI functions
document.addEventListener("DOMContentLoaded", UpdateUI.addCountryToList);
document.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.tagName.toLowerCase() === "option") {
    //Get <select> options value and id
    const selectValue = e.target.value; // Value
    const selectId = e.target.parentElement.previousSibling.previousSibling.children[0].id; //id
    // pass value and id to addFlags();
    UpdateUI.addFlags(selectValue, selectId);
  } else if (e.target.id === "covertBtn") {
    //If covertBtn btn is "click" => get <option> values
    const amount = document.querySelector("#dollarAmount").value;
    const from = currenyOne.options[currenyOne.selectedIndex].text;
    const to = currenyTwo.options[currenyTwo.selectedIndex].text;

    //User Input validation
    if (amount == "" || amount < "1") {
      // check is amount is less than Zero
      // if true => call bootstrap Model method
      $("#alertModal").modal("show");
    } else {
      // if false => call bootstrap Model method
      const currency = new ExchangeRate(from, to, amount);
      UpdateUI.calculateRate(currency);
    }
  }
});
