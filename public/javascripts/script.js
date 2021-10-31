const countryInput = document.querySelector("#country");
const city = document.querySelector("#city");
const submitCountry = document.querySelector("#submitCountry");
const submitCity = document.querySelector("#submitCity");
const selector = document.querySelector("#selector");

const fetchCountry = async () => {
    const countries = await fetch("http://localhost:5000/index");
    const data = await countries.json();
    return data;
}
const eraser = (x) => {
    while (x.firstChild) {

        x.firstChild.remove();
        console.log(x.firstChild);
    }
}
const populateSelect = async () => {
    eraser(selector);
    console.log(selector);
    const data = await fetchCountry();
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].countryname;
        option.textContent = data[i].countryname;
        selector.appendChild(option);
    }
}



populateSelect();
eraser(selector);



const addCountry = async () => {
    const forId = await fetchCountry();
    for (let i = 0; i < forId.length; i++) {
        if (forId[i].countryname == countryInput.value) {
            alert("country already exists!");
            return;
        }
    }
    const countryFormatted = { id: forId.length + 1, countryname: countryInput.value }

    const countries = await fetch("http://localhost:5000/index", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(countryFormatted),
    });
    const data = await countries.json();
    return data;
}

const addCity = () => {

}

submitCountry.addEventListener("click", () => {

    addCountry();

})

submitCountry.addEventListener("click", () => {

    addCity();

})

