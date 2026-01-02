const steps = document.querySelectorAll(".form-step");
let currentStep = 0;

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

const serviceSelect = document.getElementById("service");
const webStep = document.getElementById("webStep");
const videoStep = document.getElementById("videoStep");

function showStep(index) {
  steps.forEach(step => step.classList.remove("active"));
  steps[index].classList.add("active");

  prevBtn.style.display = index === 0 ? "none" : "inline-block";

  if (index === steps.length - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  } else {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

nextBtn.onclick = () => {
  if (!steps[currentStep].querySelector("select, input")?.checkValidity()) {
    steps[currentStep].querySelector("select, input")?.reportValidity();
    return;
  }
  currentStep++;
  showStep(currentStep);
};

prevBtn.onclick = () => {
  currentStep--;
  showStep(currentStep);
};

serviceSelect.onchange = () => {
  webStep.classList.add("hidden");
  videoStep.classList.add("hidden");

  if (serviceSelect.value === "web") webStep.classList.remove("hidden");
  if (serviceSelect.value === "video") videoStep.classList.remove("hidden");
};

document.getElementById("projectForm").onsubmit = e => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());

  console.log("Project Submitted:", data);

  alert("✅ Project submitted successfully! We’ll contact you shortly.");

  e.target.reset();
  currentStep = 0;
  showStep(currentStep);
};

showStep(currentStep);
