export function renderInput(root, t, onNext) {
  const section = document.createElement("section");
  section.className = "card";
  section.style.animationDelay = "0.4s";

  section.innerHTML = `
    <div class="card__title">${t("intentTitle")}</div>
    <div class="card__desc">${t("intentDesc")}</div>
    <textarea
      id="idea"
      class="input"
      placeholder="${t("intentPlaceholder")}"
      rows="5"
    ></textarea>
    <button id="go" class="btn btn--primary" disabled>
      <span>${t("startSimulation")}</span>
    </button>
  `;

  root.appendChild(section);

  const textarea = document.getElementById("idea");
  const button = document.getElementById("go");

  textarea.addEventListener("input", () => {
    const value = textarea.value.trim();
    button.disabled = !value;
    button.style.opacity = value ? "1" : "0.5";
    button.style.cursor = value ? "pointer" : "not-allowed";
  });

  setTimeout(() => {
    textarea.focus();
    textarea.style.transition = "all 0.3s ease";
  }, 600);

  button.onclick = () => {
    const value = textarea.value.trim();
    if (!value) return;

    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "";
    }, 150);

    section.style.transition = "all 0.4s ease";
    section.style.opacity = "0";
    section.style.transform = "translateY(-20px)";

    setTimeout(() => {
      onNext(value);
    }, 400);
  };

  button.style.opacity = "0.5";
  button.style.cursor = "not-allowed";
  button.style.transition = "all 0.25s ease";
}
