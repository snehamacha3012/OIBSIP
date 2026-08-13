const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convert-btn");
const inputSymbol = document.getElementById("input-symbol");
const errorMessage = document.getElementById("error-message");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");
const rankineResult = document.getElementById("rankine-result");
const reaumurResult = document.getElementById("reaumur-result");

const celsiusLiquid = document.getElementById("celsius-liquid");
const fahrenheitLiquid = document.getElementById("fahrenheit-liquid");
const kelvinLiquid = document.getElementById("kelvin-liquid");
const rankineLiquid = document.getElementById("rankine-liquid");
const reaumurLiquid = document.getElementById("reaumur-liquid");


/* CHANGE INPUT SYMBOL */

unitSelect.addEventListener("change", function () {

    if (unitSelect.value === "celsius") {
        inputSymbol.textContent = "°C";
    }

    else if (unitSelect.value === "fahrenheit") {
        inputSymbol.textContent = "°F";
    }

    else {
        inputSymbol.textContent = "K";
    }

});


/* CONVERT BUTTON */

convertButton.addEventListener("click", convertTemperature);


/* ENTER KEY */

temperatureInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        convertTemperature();
    }

});


function convertTemperature() {

    const inputValue = temperatureInput.value.trim();
    const selectedUnit = unitSelect.value;

    errorMessage.textContent = "";


    /* EMPTY VALIDATION */

    if (inputValue === "") {
        showError("Please enter a temperature value.");
        return;
    }


    /* NUMERIC VALIDATION */

    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid numeric value.");
        return;
    }


    let celsius;


    /* CELSIUS INPUT */

    if (selectedUnit === "celsius") {

        if (temperature < -273.15) {
            showError("Temperature cannot be below absolute zero (-273.15°C).");
            return;
        }

        celsius = temperature;
    }


    /* FAHRENHEIT INPUT */

    else if (selectedUnit === "fahrenheit") {

        if (temperature < -459.67) {
            showError("Temperature cannot be below absolute zero (-459.67°F).");
            return;
        }

        celsius = (temperature - 32) * 5 / 9;
    }


    /* KELVIN INPUT */

    else {

        if (temperature < 0) {
            showError("Temperature cannot be below absolute zero (0 K).");
            return;
        }

        celsius = temperature - 273.15;
    }


    /* ALL CONVERSIONS */

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    const rankine = fahrenheit + 459.67;
    const reaumur = celsius * 4 / 5;


    /* DISPLAY RESULTS */

    celsiusResult.textContent = celsius.toFixed(2);
    fahrenheitResult.textContent = fahrenheit.toFixed(2);
    kelvinResult.textContent = kelvin.toFixed(2);
    rankineResult.textContent = rankine.toFixed(2);
    reaumurResult.textContent = reaumur.toFixed(2);


    /* ANIMATE THERMOMETERS */

    celsiusLiquid.style.height =
        getPercentage(celsius, -273.15, 100) + "%";

    fahrenheitLiquid.style.height =
        getPercentage(fahrenheit, -459.67, 212) + "%";

    kelvinLiquid.style.height =
        getPercentage(kelvin, 0, 373.15) + "%";

    rankineLiquid.style.height =
        getPercentage(rankine, 0, 671.67) + "%";

    reaumurLiquid.style.height =
        getPercentage(reaumur, -218.52, 80) + "%";
}


/* ERROR FUNCTION */

function showError(message) {
    errorMessage.textContent = message;
}


/* THERMOMETER HEIGHT */

function getPercentage(value, minimum, maximum) {

    let percentage =
        ((value - minimum) / (maximum - minimum)) * 100;


    /* KEEP LIQUID VISIBLE */

    if (percentage < 3) {
        percentage = 3;
    }


    /* PREVENT OVERFLOW */

    if (percentage > 96) {
        percentage = 96;
    }


    return percentage;
}
