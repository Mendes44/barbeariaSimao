/**
 * Filtro da tabela de serviços.
 * Usa o atributo data-category para evitar duplicação de conteúdo no HTML.
 */
const filterButtons = document.querySelectorAll("[data-filter]");
const serviceItems = document.querySelectorAll(".price-list details");

// Personaliza cada CTA com o nome do serviço escolhido.
serviceItems.forEach((item) => {
  const serviceName = item.querySelector("summary span").textContent.trim();
  const bookingLink = item.querySelector("a");
  bookingLink.href = `agendamento.html?servico=${encodeURIComponent(serviceName)}`;
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    // Atualiza a aparência e o estado acessível do filtro selecionado.
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Exibe somente os itens pertencentes à categoria selecionada.
    serviceItems.forEach((item) => {
      const categories = item.dataset.category.split(" ");
      const shouldShow = selectedCategory === "todos" || categories.includes(selectedCategory);
      item.hidden = !shouldShow;
      if (!shouldShow) item.open = false;
    });
  });
});

/**
 * Links com hash vindos da página inicial já abrem o filtro correspondente.
 */
const categoryFromHash = window.location.hash.replace("#", "");
const hashButton = document.querySelector(`[data-filter="${categoryFromHash}"]`);
if (hashButton) hashButton.click();
