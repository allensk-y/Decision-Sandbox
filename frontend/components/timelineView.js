function normalizeTimeline(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    if (typeof item === "string") return { label: item };
    if (item && typeof item === "object") {
      return {
        label: item.event || item.label || item.text || "Future event",
        time: item.time || item.phase
      };
    }
    return { label: "Future event" };
  });
}

export function renderTimeline(root, t, timeline) {
  const block = document.createElement("section");
  block.className = "card";
  block.style.animationDelay = "0.1s";

  block.innerHTML = `
    <div class="card__title">${t("timelineTitle")}</div>
    <div class="card__desc">${t("timelineDesc")}</div>
  `;

  const list = document.createElement("div");
  list.className = "timeline";

  const normalized = normalizeTimeline(timeline);

  if (!normalized.length) {
    const emptyState = document.createElement("div");
    emptyState.style.cssText = `
      text-align: center;
      padding: 40px 20px;
      color: var(--color-text-muted);
      font-style: italic;
    `;
    emptyState.textContent = t("noTimeline");
    list.appendChild(emptyState);
  } else {
    normalized.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "timeline__item";

      const marker = document.createElement("div");
      marker.className = "timeline__marker";
      marker.textContent = String(index + 1).padStart(2, "0");

      const gradients = [
        "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.2))",
        "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2))",
        "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.2))"
      ];
      marker.style.background = gradients[index % gradients.length];

      const content = document.createElement("div");
      content.className = "timeline__content";

      if (item.time) {
        const time = document.createElement("div");
        time.className = "timeline__time";
        time.textContent = item.time;
        content.appendChild(time);
      }

      const label = document.createElement("div");
      label.className = "timeline__label";
      label.textContent = item.label;
      content.appendChild(label);

      row.appendChild(marker);
      row.appendChild(content);
      list.appendChild(row);
    });
  }

  block.appendChild(list);
  root.appendChild(block);
}
