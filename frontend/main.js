import { createI18n } from "./i18n.js";
import { renderInput } from "./components/inputForm.js";
import { renderSocratic } from "./components/socraticForm.js";
import { renderReality } from "./components/realityShift.js";
import { renderTimeline } from "./components/timelineView.js";
import { renderResult } from "./components/resultView.js";

const app = document.getElementById("app");

function renderShell({ t, lang, onLangChange }) {
  app.innerHTML = `
    <div class="page">
      <header class="hero">
        <div class="hero__title">${t("appTitle")}</div>
        <div class="hero__subtitle">${t("appSubtitle")}</div>
        <div class="hero__controls">
          <label class="lang">
            <span>${t("langLabel")}</span>
            <select id="lang" class="lang__select">
              <option value="vi" ${lang === "vi" ? "selected" : ""}>Tiếng Việt</option>
              <option value="en" ${lang === "en" ? "selected" : ""}>English</option>
            </select>
          </label>
        </div>
      </header>
      <main id="stage" class="stage"></main>
      <footer class="footer">
        <div style="margin-bottom: 8px;">${t("footer")}</div>
        <div style="font-size: 11px; opacity: 0.7;">${t("outputDesc")}</div>
      </footer>
    </div>
  `;
  const select = document.getElementById("lang");
  select.onchange = () => onLangChange(select.value);
  return document.getElementById("stage");
}

async function runSimulation({ intent, answers, mode }) {
  const res = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent, answers, mode })
  });

  if (!res.ok) {
    let message = "";
    let code = "";
    try {
      const payload = await res.json();
      message = payload?.error || "";
      code = payload?.code || "";
    } catch {
      message = await res.text();
    }
    const error = new Error(message || "Simulation failed.");
    error.code = code;
    throw error;
  }

  return res.json();
}

function showLoadingCard(stage, t) {
  const loadingCard = document.createElement("div");
  loadingCard.className = "card card--loading";
  loadingCard.style.animationDelay = "0.1s";
  loadingCard.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="
        width: 40px;
        height: 40px;
        border: 3px solid rgba(59, 130, 246, 0.3);
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      "></div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">${t("simulating")}</div>
        <div style="font-size: 13px; color: var(--color-text-secondary);">
          ${t("timelineDesc")}
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById("spin-keyframes")) {
    const style = document.createElement("style");
    style.id = "spin-keyframes";
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  stage.appendChild(loadingCard);
  return loadingCard;
}

function showErrorCard(stage, message, t, code) {
  const errorCard = document.createElement("div");
  errorCard.className = "card card--error";
  const displayMessage =
    code === "QUOTA_EXCEEDED" ? t("errorQuota") : message || t("errorGeneric");
  errorCard.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <span style="font-size: 24px;">!</span>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">${t("errorTitle")}</div>
        <div style="font-size: 14px;">${displayMessage}</div>
      </div>
    </div>
  `;
  stage.appendChild(errorCard);
}

async function startFlow(lang) {
  const { t } = createI18n(lang);
  const stage = renderShell({
    t,
    lang,
    onLangChange: (next) => startFlow(next)
  });

  renderInput(stage, t, (intent) => {
    renderSocratic(stage, t, lang, (answers) => {
      renderReality(stage, t, async (mode) => {
        const loadingCard = showLoadingCard(stage, t);

        try {
          const data = await runSimulation({ intent, answers, mode });

          loadingCard.style.transition = "all 0.3s ease";
          loadingCard.style.opacity = "0";
          loadingCard.style.transform = "translateY(-10px)";

          setTimeout(() => {
            loadingCard.remove();

            if (data.timeline) {
              renderTimeline(stage, t, data.timeline);
            }

            setTimeout(() => {
              renderResult(stage, t, data);
            }, 200);
          }, 300);
        } catch (err) {
          loadingCard.remove();
          showErrorCard(stage, err.message, t, err.code);
        }
      });
    });
  });
}

startFlow("vi");
