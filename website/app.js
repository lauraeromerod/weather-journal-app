/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "cd2abf7f3d9b78235a470a550c43025a";
const generateButton = document.getElementById("generate");
const form = document.querySelector("form");
const iconPath = "./assets/images/";
const city = document.getElementById("city");
const feel = document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();

const getWeather = async (city) => {
  const url = `${baseURL}${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    return error;
  }
};

const postWeather = async (path, data) => {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};

const updateUI = async () => {
  const entry = document.querySelector(".holder.entry");
  const title = document.querySelector(".title");
  const dateEl = document.querySelector(".date");
  const place = document.querySelector(".place");
  const temp = document.querySelector(".temp");
  const content = document.querySelector(".content");
  const response = await fetch("/project");
  const data = await response.json();
  const { date, temperature, feel, city, icon, country, description } = data;
  entry.classList.add("active");

  if (Object.keys(data).length > 0) {
    title.innerHTML = "Hello. Hola. <span>Ciao. Hallo.</span>";
    dateEl.textContent = `${date} ${new Date().toLocaleTimeString("en-US")}`;
    place.innerHTML = `${city} <small>${country}</small>`;
    temp.innerHTML = `${temperature}<sup>°C</sup> ${description}`;
    content.innerHTML = `You're feeling... ${feel}`;
  } else {
    title.innerHTML = "Whoops!";
    dateEl.textContent = "";
    place.innerHTML = "";
    temp.innerHTML = "";
    content.textContent = "city not found";
  }
  iconSwitcher(icon);
};

const iconSwitcher = (icon) => {
  const iconPath = "./assets/images/";
  const image = document.querySelector(".icon img");

  switch (icon) {
    case "Thunderstorm":
      image.src = `${iconPath}thunderstorm.svg`;
      image.alt = "Thunderstorm";
      break;
    case "Clouds":
      image.src = `${iconPath}clouds.svg`;
      image.alt = "Clouds";
      break;
    case "Clear":
      image.src = `${iconPath}clear.svg`;
      image.alt = "Clear";
      break;
    case "Tornado":
      image.src = `${iconPath}tornado.svg`;
      image.alt = "Tornado";
      break;
    case "Squall":
      image.src = `${iconPath}squall.svg`;
      image.alt = "Squall";
      break;
    case "Ash":
      image.src = `${iconPath}ash.svg`;
      image.alt = "Ash";
      break;
    case "Dust":
      image.src = `${iconPath}dust.svg`;
      image.alt = "Dust";
      break;
    case "Sand":
      image.src = `${iconPath}sand.svg`;
      image.alt = "Sand";
      break;
    case "Fog":
      image.src = `${iconPath}fog.svg`;
      image.alt = "Fog";
      break;
    case "Haze":
      image.src = `${iconPath}haze.svg`;
      image.alt = "Haze";
      break;
    case "Smoke":
      image.src = `${iconPath}smoke.svg`;
      image.alt = "Smoke";
      break;
    case "Mist":
      image.src = `${iconPath}mist.svg`;
      image.alt = "Mist";
      break;
    case "Snow":
      image.src = `${iconPath}snow.svg`;
      image.alt = "Snow";
      break;
    case "Rain":
      image.src = `${iconPath}rain.svg`;
      image.alt = "Rain";
      break;
    case "Drizzle":
      image.src = `${iconPath}drizzle.svg`;
      image.alt = "Drizzle";
      break;
    default:
      image.src = `${iconPath}na.svg`;
      image.alt = "not found";
      break;
  }
};

generateButton.addEventListener("click", async () => {
  const weather = await getWeather(city.value);
  let data = {};
  if (weather.cod === "404") {
    data = {};
  } else {
    data = {
      temperature: Math.round(weather.main.temp),
      date: newDate,
      feel: feel.value.toLowerCase(),
      city: weather.name,
      country: weather.sys.country,
      icon: weather.weather[0].main,
      description: weather.weather[0].description,
    };
  }
  await postWeather("/project", data);
  await updateUI();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

city.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    generateButton.disabled = false;
  } else {
    generateButton.disabled = true;
  }
});
