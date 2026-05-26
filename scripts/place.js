const date = document.getElementById("lastModified");
date.innerHTML = `Last Modification: ${document.lastModified}`;

const year = document.querySelector("#currentyear");
year.innerHTML = new Date().getFullYear();

function calculateWindChill(temp, wind) {
    return Math.round((35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16)) * 10) / 10;
}

const temperature = 28;
const windSpeed = 12;
const tempF = (temperature * 9/5) + 32;
const windMph = windSpeed * 0.621371;

if (tempF <= 50 && windMph > 3) {
    const windChill = calculateWindChill(tempF, windMph);
    const windChillElement = document.querySelector("dd:nth-of-type(4)");
    if (windChillElement) {
        windChillElement.textContent = windChill + "°F";
    }
}
z