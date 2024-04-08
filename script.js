
let button = document.querySelector("img");
let textboxes = document.querySelectorAll("input");

button.addEventListener("click", () => {
  let birthday = new Date(textboxes[2].value, textboxes[1].value - 1, textboxes[0].value);
  let currentDate = new Date();
  let differenceInMillisecond = Math.floor(currentDate - birthday);

  if (validateInput(textboxes[0], textboxes[1], textboxes[2])) { return; }

  determineAge(differenceInMillisecond);
})

textboxes.forEach((textbox) => {
  textbox.addEventListener("input", (event) => {
    let target = event.target;
    target.classList.remove("error");
    target.nextElementSibling.textContent = "";
    target.previousElementSibling.classList.remove("error");
  })
})



function determineAge(diffinmili) {
  let allDaysYouLive = Math.floor(diffinmili / (1000 * 60 * 60 * 24)) - 6;

  document.querySelector("#span-year").textContent = Math.floor(allDaysYouLive / 365);
  document.querySelector("#span-month").textContent = Math.floor(allDaysYouLive % 365 / 30);
  document.querySelector("#span-day").textContent = Math.floor(allDaysYouLive % 365 % 30);
}

function validateInput(inputDay, inputMonth, inputYear)
{
  let invalid = false;
  let numberOfDaysinAMonth = 0;

  switch(inputMonth.value - 1) {
    case 0: case 2: case 4: case 6: 
    case 7: case 9: case 11:
      numberOfDaysinAMonth = 31;
      break;
    case 1:
      numberOfDaysinAMonth = 28;
      break;
    default:
      numberOfDaysinAMonth = 30;
  }


  if (inputDay.value === "") 
  {
    invalid = true;
    inputDay.nextElementSibling.textContent = "This field is required.";
    inputDay.nextElementSibling.classList.add("error");
    inputDay.previousElementSibling.classList.add("error");
    inputDay.classList.add("error");
  }
  else if (inputDay.value > numberOfDaysinAMonth)
  {
    invalid = true;
    inputDay.nextElementSibling.textContent = "Must be a valid day.";
    inputDay.nextElementSibling.classList.add("error");
    inputDay.previousElementSibling.classList.add("error");
    inputDay.classList.add("error");
  }
  

  if (inputMonth.value === "")
  {
    invalid = true;
    inputMonth.nextElementSibling.textContent = "This field is required.";
    inputMonth.nextElementSibling.classList.add("error");
    inputMonth.previousElementSibling.classList.add("error");
    inputMonth.classList.add("error");
  }
  else if (inputMonth.value <= 0 || inputMonth.value > 12)
  {
    invalid = true;
    inputMonth.nextElementSibling.textContent = "Mustbe a valid month.";
    inputMonth.nextElementSibling.classList.add("error");
    inputMonth.previousElementSibling.classList.add("error");
    inputMonth.classList.add("error");
  }

  if (inputYear.value === "") {
    invalid = true;
    inputYear.nextElementSibling.textContent = "This field is required.";
    inputYear.nextElementSibling.classList.add("error");
    inputYear.previousElementSibling.classList.add("error");
    inputYear.classList.add("error");
  } 
  else if (inputYear.value > new Date().getFullYear()) 
  {
    invalid = true;
    inputYear.nextElementSibling.textContent = "Must be in the past.";
    inputYear.nextElementSibling.classList.add("error");
    inputYear.previousElementSibling.classList.add("error");
    inputYear.classList.add("error");
  }

  return invalid;
}