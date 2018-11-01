import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index";

interface iCar{
  make: string;
  type: string;
  price: number;
  id: number;
}

const uri: string = "https://mock2service.azurewebsites.net/api/car/";

let getAllCarsButton: HTMLButtonElement = document.getElementById("getAllCars") as HTMLButtonElement
getAllCarsButton.addEventListener("click", getAllCars)

let field1: HTMLParagraphElement = document.getElementById("field1") as HTMLParagraphElement
let carByIdField: HTMLParagraphElement = document.getElementById("carByIdField") as HTMLParagraphElement

let getCarByIdButton: HTMLButtonElement = document.getElementById("getCarById") as HTMLButtonElement
getCarByIdButton.addEventListener("click", getCarById)

let createCarButton: HTMLButtonElement = document.getElementById("createCar") as HTMLButtonElement
createCarButton.addEventListener("click", createCar)

let deleteCarButton: HTMLButtonElement = document.getElementById("deleteCar") as HTMLButtonElement
deleteCarButton.addEventListener("click", deleteCar)





function getAllCars(){
    axios.get<iCar[]>(uri)
    .then(function (response: AxiosResponse<iCar[]>):void {
        let result: string = "<ul>";

        response.data.forEach((c: iCar) => {            
           result += "<li>" + "Id: " + c.id + " Mærke: " + c.make + " Model: " + c.type + " Pris: " + c.price + "</li>";             
        });

        result += "</ul>";
        field1.innerHTML = result;
    })
}

function getCarById(): void {
    let carId: HTMLInputElement = document.getElementById("carId") as HTMLInputElement
    let newUri = uri + carId.value

    axios.get<iCar>(newUri)
       .then(function(response){
        carByIdField.innerHTML = response.data.make + " " + response.data.type
      })

}

function createCar(): void {
    
let myIdElm: HTMLInputElement = document.getElementById("id") as HTMLInputElement
let myMakeElm: HTMLInputElement = document.getElementById("make") as HTMLInputElement
let myTypeElm: HTMLInputElement = document.getElementById("type") as HTMLInputElement
let myPriceElm: HTMLInputElement = document.getElementById("price") as HTMLInputElement
let statusBar: HTMLParagraphElement = document.getElementById("statusBar") as HTMLParagraphElement

let myId: number = +myIdElm.value
let myMake: string = myMakeElm.value
let myType: string = myTypeElm.value
let myPrice: number = +myPriceElm.value

axios.post<iCar>(uri, {id: myId, make: myMake, type: myType, price: myPrice})
    .then((response: AxiosResponse) => {statusBar.innerHTML = (response.status + " " + response.statusText + " Bil tilføjet")})
  
  .catch(function(error: AxiosError):void {
      statusBar.innerHTML = error.message;
  })

}
function deleteCar(): void {
    let statusBar: HTMLParagraphElement = document.getElementById("deleteStatusBar") as HTMLParagraphElement
    let carId: HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement
    let newUri = uri + carId.value
    axios.delete(newUri)
    .then((response: AxiosResponse) => {statusBar.innerHTML = (response.status + " Car deleted")})
}
