/**
 * Agendamento inicial via WhatsApp.
 * O formulário não armazena dados: ele apenas monta a mensagem no dispositivo.
 */
const appointmentForm = document.querySelector("#appointmentForm");
const phoneInput = document.querySelector("#phone");
const professionalSelect = document.querySelector("#professional");
const serviceSelect = document.querySelector("#service");

// Pré-seleciona profissional ou serviço enviados pelos outros botões do site.
const query = new URLSearchParams(window.location.search);
const requestedProfessional = query.get("profissional");
const requestedService = query.get("servico");
if (requestedProfessional) professionalSelect.value = requestedProfessional;
if (requestedService) {
  // Serviços específicos da tabela são adicionados caso não estejam na lista resumida.
  if (![...serviceSelect.options].some((option) => option.value === requestedService)) {
    serviceSelect.add(new Option(requestedService, requestedService));
  }
  serviceSelect.value = requestedService;
}

// Aplica uma máscara visual simples ao celular durante a digitação.
phoneInput.addEventListener("input", () => {
  const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
  const parts = digits.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  phoneInput.value = !parts[2] ? parts[1] : `(${parts[1]}) ${parts[2]}${parts[3] ? `-${parts[3]}` : ""}`;
});

// Abre o WhatsApp somente depois que os campos obrigatórios forem validados.
appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(appointmentForm);
  const birthDate = new Date(`${data.get("birthDate")}T12:00:00`).toLocaleDateString("pt-BR");
  const message = [
    "Olá! Gostaria de solicitar um agendamento na Barbearia Simão.",
    "",
    `Nome: ${data.get("name")}`,
    `Celular: ${data.get("phone")}`,
    `Data de nascimento: ${birthDate}`,
    `Profissional: ${data.get("professional")}`,
    `Serviço: ${data.get("service")}`,
    "",
    "Podem me informar os horários disponíveis?"
  ].join("\n");

  window.location.href = `https://api.whatsapp.com/send/?phone=5531983307761&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
});
