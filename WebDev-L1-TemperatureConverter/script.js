const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convert-btn");
const errorMessage = document.getElementById("error-message");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

convertButton.addEventListener("click", function () {
    const inputValue = temperatureInput.value.trim();
    const selectedUnit = unitSelect.value;

    errorMessage.textContent = "";

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
        celsius = temperature;

        if (celsius < -273.15) {
            showError("Temperature cannot be below absolute zero (-273.15°C).");
            resetResults();
            return;
        }

    } else if (selectedUnit === "fahrenheit") {
        if (temperature < -459.67) {
            showError("Temperature cannot be below absolute zero (-459.67°F).");
            resetResults();
            return;
        }

        celsius = (temperature - 32) * 5 / 9;

    } else if (selectedUnit === "kelvin") {
        if (temperature < 0) {
            showError("Temperature cannot be below absolute zero (0 K).");
            resetResults();
            return;
        }

        celsius = temperature - 273.15;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = `${celsius.toFixed(2)} °C`;
    fahrenheitResult.textContent = `${fahrenheit.toFixed(2)} °F`;
    kelvinResult.textContent = `${kelvin.toFixed(2)} K`;
});

function showError(message) {
    errorMessage.textContent = message;
}

function resetResults() {
    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";
}
