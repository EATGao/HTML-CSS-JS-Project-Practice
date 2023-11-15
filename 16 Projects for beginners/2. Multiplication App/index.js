const num1 = Math.ceil(Math.random() * 100);
const num2 = Math.ceil(Math.random() * 100);
const result = num1 * num2;

const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const clearEl = document.getElementById("clear");

let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
    score = 0;
}
scoreEl.innerText = `score: ${score}`;

questionEl.innerText = `What is ${num1} multiply by ${num2}?`;


clearEl.addEventListener("click", () => {
    score = 0;
    localStorage.setItem("score", JSON.stringify(score));
    scoreEl.innerText = `score: ${score}`;
});


formEl.addEventListener("submit", () => {
    const userInput = +inputEl.value;
    if (userInput === result) {
        score++;
        updateLocalStorage();
    } else {
        score--;
        updateLocalStorage();
    }

    scoreEl.innerText = `score: ${score}`;
});

function updateLocalStorage() {
    localStorage.setItem("score", JSON.stringify(score));
}