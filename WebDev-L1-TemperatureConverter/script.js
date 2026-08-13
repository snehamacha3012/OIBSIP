const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convert-btn");
const errorMessage = document.getElementById("error-message");
const inputSymbol = document.getElementById("input-symbol");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

const celsiusMercury = document.getElementById("celsius-mercury");
const fahrenheitMercury = document.getElementById("fahrenheit-mercury");
const kelvinMercury = document.getElementById("kelvin-mercury");


unitSelect.addEventListener("change", updateInputSymbol);

function updateInputSymbol() {
    if (unitSelect.value === "celsius") {
        inputSymbol.textContent = "°C";
    } else if (unitSelect.value === "fahrenheit") {
        inputSymbol.textContent = "°F";
    } else {
        inputSymbol.textContent = "K";
    }
}


convertButton.addEventListener("click", convertTemperature);


function convertTemperature() {
    const inputValue = temperatureInput.value.trim();
    const selectedUnit = unitSelect.value;

    clearError();

    if (inputValue === "") {
        showError("Please enter a temperature value.");
        resetResults();
        return;
    }

    const temperature = Number(inputValue);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid numeric temperature.");
        resetResults();
        return;
    }

    let celsius;

    if (selectedUnit === "celsius") {
        if (temperature < -273.15) {
            showError("Temperature cannot be below absolute zero (-273.15°C).");
            resetResults();
            return;
        }

        celsius = temperature;
    }

    else if (selectedUnit === "fahrenheit") {
        if (temperature < -459.67) {
            showError("Temperature cannot be below absolute zero (-459.67°F).");
            resetResults();
            return;
        }

        celsius = (temperature - 32) * 5 / 9;
    }

    else {
        if (temperature < 0) {
            showError("Temperature cannot be below absolute zero (0 K).");
            resetResults();
            return;
        }

        celsius = temperature - 273.15;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    displayResults(celsius, fahrenheit, kelvin);
}


function displayResults(celsius, fahrenheit, kelvin) {
    celsiusResult.textContent = celsius.toFixed(2);
    fahrenheitResult.textContent = fahrenheit.toFixed(2);
    kelvinResult.textContent = kelvin.toFixed(2);

    animateThermometers(celsius, fahrenheit, kelvin);
}


function animateThermometers(celsius, fahrenheit, kelvin) {
    const celsiusPercent = getPercentage(celsius, -273.15, 100);
    const fahrenheitPercent = getPercentage(fahrenheit, -459.67, 212);
    const kelvinPercent = getPercentage(kelvin, 0, 373.15);

    celsiusMercury.style.height = `${celsiusPercent}%`;
    fahrenheitMercury.style.height = `${fahrenheitPercent}%`;
    kelvinMercury.style.height = `${kelvinPercent}%`;
}


function getPercentage(value, minimum, maximum) {
    let percentage = ((value - minimum) / (maximum - minimum)) * 100;

    if (percentage < 3) {
        percentage = 3;
    }

    if (percentage > 92) {
        percentage = 92;
    }

    return percentage;
}


function showError(message) {
    errorMessage.textContent = message;
}


function clearError() {
    errorMessage.textContent = "";
}


function resetResults() {
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";

    celsiusMercury.style.height = "15%";
    fahrenheitMercury.style.height = "15%";
    kelvinMercury.style.height = "15%";
}


temperatureInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});
