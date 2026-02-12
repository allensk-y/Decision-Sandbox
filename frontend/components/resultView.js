function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function renderList(items, mapper, t) {
  const list = document.createElement("div");
  list.className = "list";
  const normalized = toArray(items);

  if (!normalized.length) {
    const emptyState = document.createElement("div");
    emptyState.style.cssText = `
      text-align: center;
      padding: 24px;
      color: var(--color-text-muted);
      font-style: italic;
      font-size: 14px;
    `;
    emptyState.textContent = t("noData");
    list.appendChild(emptyState);
    return list;
  }

  normalized.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "list__item";
    row.style.animationDelay = `${index * 0.05}s`;
    row.appendChild(mapper(item));
    list.appendChild(row);
  });

  return list;
}

export function renderResult(root, t, data) {
  const block = document.createElement("section");
  block.className = "card";
  block.style.animationDelay = "0.2s";

  block.innerHTML = `
    <div class="card__title">${t("outputTitle")}</div>
    <div class="card__desc">${t("outputDesc")}</div>
  `;

  const meta = document.createElement("div");
  meta.className = "meta";

  const difficultyColors = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#ef4444"
  };

  const difficulty = data?.difficulty || t("unknown");
  const duration = data?.duration || t("unknown");
  const difficultyColor = difficultyColors[difficulty] || "#64748b";

  meta.innerHTML = `
    <div class="pill" style="border-color: ${difficultyColor}33; background: ${difficultyColor}22; color: ${difficultyColor};">
      ${t("difficulty")}: ${difficulty}
    </div>
    <div class="pill">
      ${t("duration")}: ${duration}
    </div>
  `;
  block.appendChild(meta);

  const risks = document.createElement("div");
  risks.className = "section";
  risks.innerHTML = `<div class="section__title">${t("riskTitle")}</div>`;
  risks.appendChild(
    renderList(
      data?.risks,
      (item) => {
        const line = document.createElement("div");
        if (typeof item === "string") {
          line.textContent = item;
        } else {
          const name = item?.name || item?.risk || "Risk";
          const level = item?.level || item?.severity || t("unknown");
          line.textContent = `${name} (${level})`;
        }
        return line;
      },
      t
    )
  );
  block.appendChild(risks);

  const outcomes = document.createElement("div");
  outcomes.className = "section";
  outcomes.innerHTML = `<div class="section__title">${t("outcomesTitle")}</div>`;
  outcomes.appendChild(
    renderList(
      data?.outcomes,
      (item) => {
        const line = document.createElement("div");
        if (typeof item === "string") {
          line.textContent = item;
        } else {
          const title = item?.title || item?.name || "Future";
          const summary = item?.summary || item?.desc || "";
          line.textContent = summary ? `${title}: ${summary}` : title;
        }
        return line;
      },
      t
    )
  );
  block.appendChild(outcomes);

  const questions = document.createElement("div");
  questions.className = "section";
  questions.innerHTML = `<div class="section__title">${t("questionsTitle")}</div>`;
  questions.appendChild(
    renderList(
      data?.questions,
      (item) => {
        const line = document.createElement("div");
        line.textContent = typeof item === "string" ? item : item?.text || t("unknown");
        return line;
      },
      t
    )
  );
  block.appendChild(questions);

  root.appendChild(block);
}
