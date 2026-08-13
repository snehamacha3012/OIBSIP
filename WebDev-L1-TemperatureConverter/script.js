const tempInput   = document.getElementById('tempInput');
const unitSelect  = document.getElementById('unitSelect');
const convertBtn  = document.getElementById('convertBtn');
const errorMsg    = document.getElementById('errorMsg');

const valueC = document.getElementById('valueC');
const valueF = document.getElementById('valueF');
const valueK = document.getElementById('valueK');
const fillC  = document.getElementById('fillC');
const fillF  = document.getElementById('fillF');
const fillK  = document.getElementById('fillK');

const ABSOLUTE_ZERO_C = -273.15;
// Visualization range for the thermometer fill, mapped from a fixed Celsius scale
const VIS_MIN_C = -273.15;
const VIS_MAX_C = 150;

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add('show');
}

function clearError() {
  errorMsg.textContent = '';
  errorMsg.classList.remove('show');
}

function resetDisplay() {
  valueC.textContent = '— °C';
  valueF.textContent = '— °F';
  valueK.textContent = '— K';
  fillC.style.height = '0%';
  fillF.style.height = '0%';
  fillK.style.height = '0%';
}

function toCelsius(value, unit) {
  if (unit === 'C') return value;
  if (unit === 'F') return (value - 32) * 5 / 9;
  if (unit === 'K') return value - 273.15;
}

function setFill(el, celsiusValue) {
  const clamped = Math.max(VIS_MIN_C, Math.min(VIS_MAX_C, celsiusValue));
  const pct = ((clamped - VIS_MIN_C) / (VIS_MAX_C - VIS_MIN_C)) * 100;
  el.style.height = pct + '%';
}

convertBtn.addEventListener('click', () => {
  clearError();
  const raw = tempInput.value.trim();

  // Reject empty or non-numeric input
  if (raw === '' || isNaN(raw)) {
    showError('Please enter a valid number (e.g. 25 or -10.5).');
    resetDisplay();
    return;
  }

  const value = parseFloat(raw);
  const unit = unitSelect.value;
  const celsius = toCelsius(value, unit);

  // Absolute zero edge case handling
  if (celsius < ABSOLUTE_ZERO_C - 0.001) {
    showError('That\'s below absolute zero (−273.15°C) — no known temperature can go lower.');
    resetDisplay();
    return;
  }

  const fahrenheit = celsius * 9 / 5 + 32;
  const kelvin = celsius + 273.15;

  valueC.textContent = celsius.toFixed(2) + ' °C';
  valueF.textContent = fahrenheit.toFixed(2) + ' °F';
  valueK.textContent = kelvin.toFixed(2) + ' K';

  setFill(fillC, celsius);
  setFill(fillF, celsius);
  setFill(fillK, celsius);
});

// Allow Enter key to trigger conversion
tempInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') convertBtn.click();
});

resetDisplay();
