const countryInput=document.querySelector("#country-input");
const result=document.querySelector(".result");
const form = document.forms.search;
const searchBtn=document.querySelector("#search-btn");
const searchResults = [];
searchBtn.addEventListener("click",handleSearch);
form.addEventListener("submit",handleSearch);


function handleSearch(event){
    event.preventDefault();
    searchResults.forEach((entry) => entry.remove());
    result.innerHTML="";

    let countryName=countryInput.value;
    // console.log(countryName);
    const fetchPromise=`https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(fetchPromise)
    .then((response)=>{
    return response.json();
    })
    .then((data)=>{
        console.log(data);
        const div = document.createElement('div');
        div.innerHTML= `
        <div class="card-container">
            <div class="card-image">
                <img src="${data[0].flags.svg}"/>
            </div>
            <div class="content">
                <h1>Official: ${data[0].name.official}</h1>
                <h2>Continent: ${data[0].continents[0]} </h2>
                <h2>Subregion: ${data[0].subregion} </h2>
                <h2>Capital: ${data[0].capital[0]} </h2>
                <h2>Population: ${data[0].population} </h2>
                <h2>Area: ${data[0].area}</h2>
                <h2>Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</h2>
                <h2>Common Languages: ${Object.values(data[0].languages).toString().split(",").join(", ")} </h2>
            </div>
        </div>
        `
        result.appendChild(div);
        searchResults.push(div);
    })
    .catch(()=>{
        if (countryName.length == 0) {
            result.innerHTML = `
            <div class= "error">
                <h4>4 <i class="fa-regular fa-circle-question"></i> 4</h4>
                <h5>Page Not Found!</h5>
                <h3>The input field can't be empty</h3>
            </div>
            `;
        } else {
            result.innerHTML = `
            <div class= "error">
                <h4>4 <i class="fa-regular fa-circle-question"></i> 4</h4>
                <h5>Page Not Found!</h5>
                <h3>Please enter a valid country name</h3>
            </div>
            `;

        }
    })

}


