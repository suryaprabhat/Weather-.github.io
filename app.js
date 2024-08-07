window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let weatherIcon = document.getElementById("weather-icon");
    let unitSelect = document.getElementById("unit-select");
    let unitSpan = document.querySelector(".unit");
    let windSpeedValue = document.querySelector(".wind-speed-value");
    let windUnitSelect = document.getElementById("wind-unit-select");
    let windUnitSpan = document.querySelector(".wind-unit");
    let pressureValue = document.querySelector(".pressure-value");
    let pressureUnitSelect = document.getElementById("pressure-unit-select");
    let pressureUnitSpan = document.querySelector(".pressure-unit");
    let lastUpdated = document.querySelector(".last-updated");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.weatherapi.com/v1/current.json?key=bfafe08794a54ae8997122704240208&q=${lat},${long}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const temperatureF = data.current.temp_f;
                    const temperatureC = data.current.temp_c;
                    const summary = data.current.condition.text;
                    const icon = data.current.condition.icon;
                    const lastUpdatedTime = data.current.last_updated;
                    const windMph = data.current.wind_mph;
                    const windKph = data.current.wind_kph;
                    const pressureMb = data.current.pressure_mb;
                    const pressureInHg = data.current.pressure_in;

                    // Set initial DOM Elements from the API
                    temperatureDegree.textContent = temperatureF;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.location.tz_id;
                    weatherIcon.src = `https:${icon}`;
                    unitSpan.textContent = "F";
                    windSpeedValue.textContent = windMph;
                    windUnitSpan.textContent = "mph";
                    pressureValue.textContent = pressureMb;
                    pressureUnitSpan.textContent = "mb";
                    lastUpdated.textContent = `Last updated: ${lastUpdatedTime}`;

                    // Update temperature when unit is changed
                    unitSelect.addEventListener('change', () => {
                        if (unitSelect.value === "celsius") {
                            temperatureDegree.textContent = temperatureC;
                            unitSpan.textContent = "C";
                        } else {
                            temperatureDegree.textContent = temperatureF;
                            unitSpan.textContent = "F";
                        }
                    });

                    // Update wind speed when unit is changed
                    windUnitSelect.addEventListener('change', () => {
                        if (windUnitSelect.value === "kph") {
                            windSpeedValue.textContent = windKph;
                            windUnitSpan.textContent = "kph";
                        } else {
                            windSpeedValue.textContent = windMph;
                            windUnitSpan.textContent = "mph";
                        }
                    });

                    // Update pressure when unit is changed
                    pressureUnitSelect.addEventListener('change', () => {
                        if (pressureUnitSelect.value === "inhg") {
                            pressureValue.textContent = pressureInHg;
                            pressureUnitSpan.textContent = "inHg";
                        } else {
                            pressureValue.textContent = pressureMb;
                            pressureUnitSpan.textContent = "mb";
                        }
                    });
                });
        });
    }
});
