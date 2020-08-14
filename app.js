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
  fetch("https://api.exchangeratesapi.io/latest?")
    .then((res) => res.json())
    .then((data) => {
      const dataKeys = Object.keys(data.rates);
      dataKeys.forEach((element) => {
        currenyOne.add(new Option(element));
        currenyTwo.add(new Option(element));
        currenyOne.selectedIndex = "27";
        currenyTwo.selectedIndex = "12";
      });
    });
})();

document.querySelector("#covertBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const from = currenyOne.options[currenyOne.selectedIndex].text;
  const to = currenyTwo.options[currenyTwo.selectedIndex].text;

  fetch(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
    .then((res) => res.json())
    .then((data) => {
      const finalValues = Object.values(data.rates);
      const finalkeys = Object.keys(data.rates);

      display.innerHTML = `<div class="card shadow-sm"> 
                            <div class="card-body w-100">
                               <div class="card-text h2">${finalkeys[0]} = ${finalValues[0]}</div>
                               <div class="card-text h2"> ${from} = 1</div>
                            </div>
                            <div class="card-footer mt-3 "> Date: ${data.date}</div>
                          </div>`;
    })
    .catch(() => console.log("Please try again"));
});
