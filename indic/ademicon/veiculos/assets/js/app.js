(() => {
  "use strict";

  const config = window.UW_VEICULOS_CONFIG;
  const screens = [...document.querySelectorAll(".screen")];
  const toast = document.getElementById("toast");
  const state = { screen: 0, consultantKey: "", vehicle: "", code: "" };

  const show = (index) => {
    state.screen = Math.max(0, Math.min(index, screens.length - 1));
    screens.forEach((screen, i) => {
      const active = i === state.screen;
      screen.classList.toggle("is-active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const nextNumber = (consultantCode) => {
    const key = `uw_ads_veiculos_${consultantCode}_counter`;
    let current = Number.parseInt(localStorage.getItem(key) || "0", 10);
    current = Number.isFinite(current) ? current + 1 : 1;
    localStorage.setItem(key, String(current));
    return String(current).padStart(4, "0");
  };

  const ensureCode = () => {
    if (state.code) return state.code;
    const consultant = config.consultants[state.consultantKey];
    state.code = `${config.codePrefix}-${consultant.code}-${nextNumber(consultant.code)}`;
    return state.code;
  };

  const updateSummary = () => {
    const consultant = config.consultants[state.consultantKey];
    document.getElementById("summary-consultant").textContent = consultant?.fullName || "—";
    document.getElementById("summary-vehicle").textContent = state.vehicle || "—";
    document.getElementById("summary-code").textContent = ensureCode();
  };

  const buildMessage = () => {
    const consultant = config.consultants[state.consultantKey];
    return [
      `Olá, ${consultant.name}!`,
      "",
      "Encontrei sua consultoria através de uma campanha da UrbanWatch.app.",
      "",
      `Origem: ${config.origin}`,
      "",
      "Código de atendimento:",
      state.code,
      "",
      "Tenho interesse em conhecer as opções de consórcio para veículo.",
      "",
      `Tipo de veículo procurado: ${state.vehicle}`,
      "",
      "Gostaria de uma orientação personalizada.",
      "",
      "Podemos conversar?"
    ].join("\n");
  };

  const sendWhatsApp = () => {
    const consultant = config.consultants[state.consultantKey];
    const phone = (consultant.whatsapp || "").replace(/\D/g, "");

    if (phone.length < 12) {
      notify(`Configure o WhatsApp de ${consultant.fullName} em assets/js/config.js`);
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  document.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-action]");
    if (actionEl) {
      const action = actionEl.dataset.action;
      if (action === "next") show(state.screen + 1);
      if (action === "back") show(state.screen - 1);
      if (action === "send") sendWhatsApp();
      if (action === "restart") {
        state.consultantKey = "";
        state.vehicle = "";
        state.code = "";
        document.querySelectorAll(".is-selected").forEach(el => el.classList.remove("is-selected"));
        show(0);
      }
      return;
    }

    const consultantEl = event.target.closest("[data-consultant]");
    if (consultantEl) {
      state.consultantKey = consultantEl.dataset.consultant;
      state.code = "";
      document.querySelectorAll("[data-consultant]").forEach(el => el.classList.remove("is-selected"));
      consultantEl.classList.add("is-selected");
      setTimeout(() => show(2), 220);
      return;
    }

    const vehicleEl = event.target.closest("[data-vehicle]");
    if (vehicleEl) {
      state.vehicle = vehicleEl.dataset.vehicle;
      state.code = "";
      document.querySelectorAll("[data-vehicle]").forEach(el => el.classList.remove("is-selected"));
      vehicleEl.classList.add("is-selected");
      updateSummary();
      setTimeout(() => show(3), 220);
    }
  });

  // Campaign image is controlled by config.js, facilitating future replacements.
  const campaignImage = document.getElementById("campaign-image");
  campaignImage.src = config.campaign.image;
  campaignImage.alt = config.campaign.title;
})();
