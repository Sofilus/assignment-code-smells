import { Student } from "./models/student";
import { Temp } from "./models/temperature";

/* 
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function totalJumpLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar: number, currentJump: number) => {
    return jumpDistanceSoFar + currentJump;
  });
};

/* 
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

  function getStudentStatus(student: Student): string {
    if((student.name == "Sebastian") && (student.handedInOnTime)){
        return "VG";
    }
    return "IG";
  };

/* 
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

function averageWeeklyTemperature(weeklyTemperature: Temp[]) {
  const milliSecondsInAWeek: number = 604800000;
  const daysInAWeek: number = 7;

  return weeklyTemperature.reduce((previous: number, current: Temp) => {
    if ((current.city === "Stockholm") && (current.dateToday.getTime() > Date.now() - milliSecondsInAWeek)) {
        return previous + current.temperature;
    }
    return previous;
  }, 0
  ) / daysInAWeek;
};

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

interface Product{
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
};

function showProduct(products: Product) {
  let container = document.createElement("div");

  let title = createHeaderElement(products.name);
  container.appendChild(title);

  let image = createImgElement(products.image);
  container.appendChild(image);
 
  let price = createStrongElement(products.price);
  container.appendChild(price);
  
  products.parent.appendChild(container);
};

function createHeaderElement (name: string){
  let headingTitle = document.createElement("h4");
  headingTitle.innerHTML = name;
  return headingTitle;
};

function createImgElement (image: string){
  let imageTag = document.createElement("img");
  imageTag.src = image;
  return imageTag;
};

function createStrongElement (price: number){
  let strongElement = document.createElement("strong");
  strongElement.innerHTML = price.toString();
  return strongElement;
};

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
      let container = document.createElement("div");

      let checkbox = createInputElement(student.handedInOnTime);
      
      container.appendChild(checkbox);

      let listOfStudents = student.handedInOnTime
      ? document.querySelector("ul#passedstudents")
      : document.querySelector("ul#failedstudents");

      listOfStudents?.appendChild(container);
  }
};

function createInputElement(checkboxChecked: boolean){
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checkboxChecked;

  return checkbox;
};

/* 
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings() {
const texts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];

return texts.join("");
};

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

interface User {
    name: string,
    birthday: Date,
    email: string,
    password: string
};

function createUser(users: User) {
  const beginningOfUnix: number = 1970;
  const requiredAge: number = 20;

  // Validation
  let ageDiff = Date.now() - users.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - beginningOfUnix);

  console.log(userAge);

  if (userAge > requiredAge) { 
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
};