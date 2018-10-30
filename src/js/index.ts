import axios, { AxiosResponse, AxiosError } from "../../node_modules/axios/index";

interface iCar{
  make: string;
  type: string;
  price: number;
  id: number;
}

const uri: string = "https://restservicet3st.azurewebsites.net/api/car/";

let getAllCarsButton: HTMLButtonElement = document.getElementById("getAllCars") as HTMLButtonElement
getAllCarsButton.addEventListener("click", getAllCars)

let field1: HTMLParagraphElement = document.getElementById("field1") as HTMLParagraphElement



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