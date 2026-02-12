export function renderCard(title, body) {
  return `
    <section class="card">
      <div class="card__title">${title}</div>
      <div class="card__body">${body}</div>
    </section>
  `;
}
