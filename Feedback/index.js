const ratingEls = document.querySelectorAll(".rating");

const btnEl = document.getElementById("btn");
const containerEl = document.getElementById("container");

let selectedRating = "";

ratingEls.forEach(ratingEl => {
    ratingEl.addEventListener("click", (e) => {
        // console.log(e.target.innerText || e.target.parentNode.innerText);
        removeActive();
        selectedRating = e.target.innerText || e.target.parentNode.innerText;
        e.target.classList.add("active");
        e.target.parentNode.classList.add("active");
    });
});

function removeActive() {
    ratingEls.forEach(ratingEl => {
        ratingEl.classList.remove("active");
    })
}

btnEl.addEventListener("click", (e) => {
    if(selectedRating !== "") {
        containerEl.innerHTML = `
        <strong>Thank you!</strong>
        <br><br>
        <strong>Feedback: ${selectedRating}</strong>
        <br>
        <p>We'll use your feedback for our customer support.</p>
        `
    }
});