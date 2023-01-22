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
                .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"));
                }
         }, DEBOUNCE_DELAY )
);

function renderCountrys(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 1) {
        const markup = countries
        .map((country) => {
        return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width="30">
        ${country.name.official}</li>`;
        })
        .join("");
        countryList.innerHTML = markup;
        countryInfo.innerHTML = "";
    } else {
        const markup = countries
        .map((country) => {
            let languages = Object.values(country.languages).join(", ");

            return `<h2><img src="${country.flags.svg}" alt="${country.name.official}" width="30">
            ${country.name.official}</h2>
            <p><b>Capital:</b> ${country.capital}<p>
            <p><b>Population:</b> ${country.population}<p>
            <p><b>Languages:</b> ${languages}</p>`;
        })
        .join("");
        countryInfo.innerHTML = markup;
        countryList.innerHTML = "";
    }
}

console.log();
