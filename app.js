// Bootstrap modules
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

//Global variables | Two <select>
const currenyOne = document.getElementById("country1");
const currenyTwo = document.getElementById("country2");
const API_URL = "https://api.exchangeratesapi.io/latest?";
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
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const dataKeys = Object.keys(data.rates);
        dataKeys.forEach((element) => {
          currenyOne.add(new Option(element)); // Add to options
          currenyTwo.add(new Option(element));
          currenyOne.selectedIndex = "26"; // default currency on DOM load
          currenyTwo.selectedIndex = "15";
        });
      })
      .catch((err) => console.log("Please try again", err));
  }
  //Calculate Exchange rate using API data
  static calculateRate(currency) {
    fetch(`${API_URL}base=${currency.from}&symbols=${currency.to}`) //Rates are quoted against ${from}.Request specific exchange rates by setting the symbols parameter.
      .then((res) => res.json())
      .then((data) => {
        const finalValues = Object.values(data.rates); // Exchange rate
        document.querySelector(".display").classList.add("display__show");
        document.querySelector(".display").innerHTML = `
      <div class="card-text h4 ">
         <img src="https://www.countryflags.io/${currency.from.slice(0, -1)}/flat/64.png"/> -
         ${new Intl.NumberFormat("USD", { style: "currency", currency: currency.from }).format(currency.amount).replace(/^(\D+)/, "$1 ")}
      </div>
      <div class="card-text h4 mt-2">
        <img src="https://www.countryflags.io/${currency.to.slice(0, -1)}/flat/64.png"/> - ${new Intl.NumberFormat("USD", {
          style: "currency",
          currency: currency.to,
        })
          .format((finalValues[0] * currency.amount).toFixed(2))
          .replace(/^(\D+)/, "$1 ")}
      </div>
      <div class="d-flex align-items-end justify-content-center pt-5 shadow-none"> ECB Exchange rates: ${data.date}</div>
      `;
      })
      .catch((err) => console.log("Something went wrong", err));
  }

  // <select> lable changes base on user input. Add flag images.
  static addFlags(targetValue, targetID) {
    const lableInner = targetID.parentElement.children[0].children[0];
    lableInner.innerHTML = `<img src="https://www.countryflags.io/${targetValue.slice(0, -1)}/flat/64.png" alt="" width="30px" height="30px" />`; //Insert Flags img
  }
  // Clear input field after button click
  static clearInputField() {
    document.getElementById("dollarAmount").value = "";
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
  if (e.target.id === "covertBtn") {
    //If covertBtn btn is "click" => get <option> values
    const amount = document.getElementById("dollarAmount").value;
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

// <Select> lable changes flags based on user seletions.
let elements = document.getElementsByTagName("select");
Object.keys(elements).forEach((e) => {
  elements[e].addEventListener("change", function () {
    //Get <select> options value and id
    if (e === "0") {
      const selectedValue = country1.options[country1.selectedIndex].value; // select option Value
      UpdateUI.addFlags(selectedValue, country1);
    } else {
      const selectedValue = country2.options[country2.selectedIndex].value;
      UpdateUI.addFlags(selectedValue, country2); // pass value and id to addFlags();
    }
  });
});
