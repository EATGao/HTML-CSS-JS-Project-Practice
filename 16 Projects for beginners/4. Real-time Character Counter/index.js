const textareaEL = document.getElementById("textarea");
const totalCounterEl = document.getElementById("total-counter");
const remainingCounterEl = document.getElementById("remaining-counter");


textareaEL.addEventListener("keyup", () => {
    updateCOunter();
});

updateCOunter();

function updateCOunter() {
    totalCounterEl.innerHTML = textareaEL.value.length;
    remainingCounterEl.innerHTML = textareaEL.getAttribute("maxLength") - textareaEL.value.length;
}