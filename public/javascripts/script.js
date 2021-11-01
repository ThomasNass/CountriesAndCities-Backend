const countryInput = document.querySelector("#country");
const cityInput = document.querySelector("#city");
const submitCountry = document.querySelector("#submitCountry");
const submitCity = document.querySelector("#submitCity");
const selector = document.querySelector("#selector");
const population = document.querySelector("#population");

//Getting the country json from backend
const fetchCountry = async () => {
    //http://localhost:5000/country for local use
    const countries = await fetch("/country");
    const data = await countries.json();
    return data;
}
//Getting the city json from backend
const fetchCity = async () => {
    //http://localhost:5000/city for local use
    const cities = await fetch("/city");
    const data = await cities.json();
    return data;
}
//A function to empty the contents of an element
const eraser = (x) => {
    while (x.firstChild) {
        x.firstChild.remove();
    }
}
//Function to fill the select with countries from the json after emptying it first
const populateSelect = async () => {
    const data = await fetchCountry();
    eraser(selector);
    //making it so that a country has to be selected actively
    const option = document.createElement("option");
    option.textContent = "Pick the country that the city belongs to";
    option.value = null;
    selector.appendChild(option);
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].countryname;
        option.textContent = data[i].countryname;
        selector.appendChild(option);
    }
}

populateSelect();

//Function to add countries to the json at the backend
const addCountry = async () => {
    const forId = await fetchCountry();
    for (let i = 0; i < forId.length; i++) {
        if (forId[i].countryname == countryInput.value) {
            alert("country already exists!");
            return;
        }
    }
    //Formatting the object to match the json-file
    const countryFormatted = { id: forId.length + 1, countryname: countryInput.value }

    //http://localhost:5000/country for local use
    const countries = await fetch("/country", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(countryFormatted),
    });
    const data = await countries.json();
    populateSelect();
    return data;
}

//Function to add cities to the json file at the backend
//Almost identical to the addCountries function
const addCity = async (countryId) => {
    const forId = await fetchCity();
    for (let i = 0; i < forId.length; i++) {
        if (forId[i].cityname == cityInput.value) {
            alert("city already exists!");
            return;
        }
    }
    const cityFormatted = { id: forId.length + 1, cityname: cityInput.value, countryid: countryId, population: parseInt(population.value) }

    //http://localhost:5000/city for local use
    const cities = await fetch("/city", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(cityFormatted),
    });
    const data = await cities.json();
    return data;
}

submitCountry.addEventListener("click", () => {
    addCountry();
})

//Getting the country from the select
let choice;
selector.addEventListener("change", (event) => {
    choice = event.target.value;
});

//making sure the user provides a country and a population when adding a city
//getting the ID from the country json so that i can be matched and added with the city json
submitCity.addEventListener("click", async () => {
    if (population.value > 0 && choice != null) {
        const forCountryId = await fetchCountry();
        for (let i = 0; i < forCountryId.length; i++) {
            if (forCountryId[i].countryname == choice) {
                const countryId = forCountryId[i].id;
                addCity(countryId);
            }
        }
    }

});

