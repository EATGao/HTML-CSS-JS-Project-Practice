const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");
const ampmEl = document.getElementById("am-pm");
const timeFormatEl = document.getElementById("time-format");

function updateClock() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    let ampm = "AM";
    if (h > 12 && timeFormatEl.innerText === "24h") {
        h = h - 12;
        ampm = "PM";
    } else if (h === 12 && timeFormatEl.innerText === "24h") {
        ampm = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hourEl.innerText = h;
    minuteEl.innerText = m;
    secondEl.innerText = s;
    ampmEl.innerText = ampm;

    setTimeout(() => {
        updateClock();
    }, 1000);
}

timeFormatEl.addEventListener('click', () => {
    let timeFormat =  timeFormatEl.innerText;
    if (timeFormat === "24h") {
        ampmEl.style.visibility = "hidden";
        timeFormatEl.innerText = "12h";
    } else if (timeFormat === "12h") {
        ampmEl.style.visibility = "visible";
        timeFormatEl.innerText = "24h";
    }
});

updateClock();