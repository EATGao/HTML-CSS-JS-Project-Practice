const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");

// API ninjas
const apiKey = "Your API KEY";
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

const options = {
    method: "GET",
    headers: {
        "X-Api-Key": apiKey,
    }
};

async function getJoke() {

    try {
        jokeEl.innerText = "...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading...";
        const response = await fetch(apiURL, options); // await only can be used in async functions
        const data = await response.json();

        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke";
        jokeEl.innerText = data[0].joke;
    } catch (error) {
        jokeEl.innerText = "An error happened, try it again later.";
        btnEl.innerText = "Tell me a joke";
        console.log(error);
    }
}

btnEl.addEventListener("click", getJoke);

