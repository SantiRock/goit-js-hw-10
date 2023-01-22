import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from "./fetchCountries";

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", 
    debounce(() => {
        let trim = input.value.trim();
            if (trim === "") {
                console.log("no petition")
                countryList.innerHTML = "";
                countryInfo.innerHTML = "";
            }
            else {
                fetchCountries(trim)
                .then((country) => renderCountrys(country))
                .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"),
                                countryList.innerHTML = "",
                                countryInfo.innerHTML = "");
                }
         }, DEBOUNCE_DELAY )
);

function renderCountrys(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 1) {
        const markup = countries
        .map((country) => {
        return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width="25">
        ${country.name.official}</li>`;
        })
        .join("");
        countryList.innerHTML = markup;
        countryInfo.innerHTML = "";
        let lis = document.querySelectorAll("li");
        lis.forEach(li => {
            li.style.marginBottom = "9px";
            li.style.display = "flex";
            li.style.alignContent = "center";
        });
        let imgs = document.querySelectorAll("img");
        imgs.forEach(img => {
            img.style.marginRight = "10px";
        })

    } else {
        const markup = countries
        .map((country) => {
            let languages = Object.values(country.languages).join(", ");
            return `<h1><img src="${country.flags.svg}" alt="${country.name.official}" width="30">
            ${country.name.official}</h1>
            <p><b>Capital:</b> ${country.capital}<p>
            <p><b>Population:</b> ${country.population}<p>
            <p><b>Languages:</b> ${languages}</p>`;
        })
        .join("");
        countryInfo.innerHTML = markup;
        countryList.innerHTML = "";
        countryInfo.style.paddingTop = "0";
        let h1 = document.querySelector("h1");
        h1.style.marginTop = "0";
    }
}

// Style ---
countryList.style.listStyleType = "none";
countryList.style.padding = "0";
countryList.style.margin = "0";


