const QUESTIONS = {
  vi: [
    {
      id: "fear",
      text: "Điều gì đang cản bạn nhiều nhất?",
      options: ["Sợ thất bại", "Sợ tốn thời gian", "Thiếu thông tin"]
    },
    {
      id: "support",
      text: "Bạn làm một mình hay có team?",
      options: ["Một mình", "Team nhỏ", "Nhóm lớn"]
    },
    {
      id: "pace",
      text: "Bạn muốn tốc độ nào?",
      options: ["Nhanh và táo bạo", "Cân bằng", "An toàn và chắc chắn"]
    }
  ],
  en: [
    {
      id: "fear",
      text: "What blocks you most right now?",
      options: ["Fear of failure", "Fear of wasting time", "Lack of information"]
    },
    {
      id: "support",
      text: "Will you do this alone or with a team?",
      options: ["Solo", "Small team", "Large group"]
    },
    {
      id: "pace",
      text: "What pace do you want?",
      options: ["Fast and bold", "Balanced", "Safe and steady"]
    }
  ]
};

export function renderSocratic(root, t, lang, onNext) {
  const block = document.createElement("section");
  block.className = "card";
  block.style.animationDelay = "0.2s";

  block.innerHTML = `
    <div class="card__title">${t("socraticTitle")}</div>
    <div class="card__desc">${t("socraticDesc")}</div>
  `;

  const form = document.createElement("div");
  form.className = "socratic";

  const answers = {};
  let answeredCount = 0;
  const list = QUESTIONS[lang] || QUESTIONS.vi;

  list.forEach((q, index) => {
    const group = document.createElement("div");
    group.className = "socratic__group";

    const title = document.createElement("div");
    title.className = "socratic__title";
    title.textContent = `${index + 1}. ${q.text}`;
    group.appendChild(title);

    const options = document.createElement("div");
    options.className = "socratic__options";

    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "btn btn--ghost";
      btn.type = "button";
      btn.textContent = opt;

      btn.onclick = () => {
        const wasActive = btn.classList.contains("is-active");
        options.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
        if (!wasActive) {
          btn.classList.add("is-active");
          if (!answers[q.id]) answeredCount += 1;
          answers[q.id] = opt;
        } else {
          delete answers[q.id];
          answeredCount -= 1;
        }
        updateContinueButton();
      };

      options.appendChild(btn);
    });

    group.appendChild(options);
    form.appendChild(group);
  });

  const next = document.createElement("button");
  next.className = "btn btn--primary";
  next.textContent = `${t("continue")} (${answeredCount}/${list.length})`;
  next.disabled = true;
  next.style.marginTop = "24px";
  next.style.opacity = "0.5";
  next.style.cursor = "not-allowed";

  function updateContinueButton() {
    next.textContent = `${t("continue")} (${answeredCount}/${list.length})`;
    if (answeredCount === list.length) {
      next.disabled = false;
      next.style.opacity = "1";
      next.style.cursor = "pointer";
      next.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.5)";
    } else {
      next.disabled = true;
      next.style.opacity = "0.5";
      next.style.cursor = "not-allowed";
      next.style.boxShadow = "";
    }
  }

  next.onclick = () => {
    if (answeredCount !== list.length) return;
    next.style.transform = "scale(0.95)";
    setTimeout(() => {
      next.style.transform = "";
    }, 150);

    block.style.transition = "all 0.4s ease";
    block.style.opacity = "0";
    block.style.transform = "translateY(-20px)";

    setTimeout(() => {
      onNext(answers);
    }, 400);
  };

  block.appendChild(form);
  block.appendChild(next);
  root.appendChild(block);
}
