const steps = document.querySelectorAll(".step");
let current = 0;

const service = document.getElementById("service");
const webFields = document.getElementById("webFields");
const videoFields = document.getElementById("videoFields");

function showStep(index) {
  steps.forEach(s => s.classList.remove("active"));
  steps[index].classList.add("active");
}

document.getElementById("next").onclick = () => {
  if (current < steps.length - 1) {
    current++;
    showStep(current);
  }

  if (current === steps.length - 1) {
    document.getElementById("next").classList.add("hidden");
    document.getElementById("submit").classList.remove("hidden");
  }
};

document.getElementById("prev").onclick = () => {
  if (current === 0) return;
  current--;
  showStep(current);
};

service.onchange = () => {
  webFields.classList.add("hidden");
  videoFields.classList.add("hidden");

  if (service.value === "web") webFields.classList.remove("hidden");
  if (service.value === "video") videoFields.classList.remove("hidden");
};

document.getElementById("projectForm").onsubmit = e => {
  e.preventDefault();

  const data = new FormData(e.target);
  console.log("PROJECT DATA:", Object.fromEntries(data));

  alert("Thanks! Your project request has been submitted.");
};
