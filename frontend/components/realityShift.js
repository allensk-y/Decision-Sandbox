export function renderReality(root, t, onSelect) {
  const block = document.createElement("section");
  block.className = "card";
  block.style.animationDelay = "0.2s";

  block.innerHTML = `
    <div class="card__title">${t("realityTitle")}</div>
    <div class="card__desc">${t("realityDesc")}</div>
    <div class="mode-grid">
      <button class="mode" data="start">
        <div class="mode__title">${t("modeStartTitle")}</div>
        <div class="mode__desc">${t("modeStartDesc")}</div>
      </button>
      <button class="mode" data="delay">
        <div class="mode__title">${t("modeDelayTitle")}</div>
        <div class="mode__desc">${t("modeDelayDesc")}</div>
      </button>
      <button class="mode" data="safe">
        <div class="mode__title">${t("modeSafeTitle")}</div>
        <div class="mode__desc">${t("modeSafeDesc")}</div>
      </button>
    </div>
  `;

  block.querySelectorAll("button[data]").forEach((btn) => {
    btn.onclick = () => {
      block.style.transition = "all 0.4s ease";
      block.style.opacity = "0";
      block.style.transform = "translateY(-20px)";

      setTimeout(() => {
        onSelect(btn.getAttribute("data"));
      }, 400);
    };
  });

  root.appendChild(block);
}
