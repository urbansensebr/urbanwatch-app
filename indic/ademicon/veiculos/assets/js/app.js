(() => {
  "use strict";

  const config = window.UW_VEICULOS_CONFIG;
  const screens = [...document.querySelectorAll(".screen")];
  const toast = document.getElementById("toast");

  const translations = {
    "pt-BR": {
      campaignCta: "Quero conhecer esta oportunidade",
      backCentral: "Voltar à Central",
      back: "Voltar",
      personalized: "ATENDIMENTO PERSONALIZADO",
      chooseSpecialist: "Quem deseja que conduza seu atendimento?",
      chooseSpecialistLead: "Escolha um dos especialistas para receber uma orientação personalizada.",
      specialistRole: "Especialista em Consórcios",
      select: "Selecionar",
      objective: "SEU OBJETIVO",
      vehicleQuestion: "Qual tipo de veículo você procura?",
      vehicleLead: "Essa informação será enviada ao especialista escolhido.",
      car: "Carro",
      motorcycle: "Moto",
      suv: "SUV / Pickup",
      utility: "Utilitário",
      researching: "Ainda estou pesquisando",
      confirmation: "CONFIRMAÇÃO",
      ready: "Seu pré-atendimento está pronto.",
      review: "Confira os dados antes de seguir para o WhatsApp.",
      specialist: "Especialista",
      interest: "Interesse",
      serviceCode: "Código de atendimento",
      origin: "Origem",
      talk: "Conversar com o especialista",
      restart: "Recomeçar",
      configure: "Configure o WhatsApp de",
      message: {
        hello: "Olá",
        found: "Encontrei sua consultoria através de uma campanha da UrbanWatch.app.",
        origin: "Origem",
        code: "Código de atendimento:",
        interest: "Tenho interesse em conhecer as opções de consórcio para veículo.",
        type: "Tipo de veículo procurado",
        guidance: "Gostaria de uma orientação personalizada.",
        close: "Podemos conversar?"
      }
    },
    "en": {
      campaignCta: "I want to learn about this opportunity",
      backCentral: "Back to Central",
      back: "Back",
      personalized: "PERSONALIZED SERVICE",
      chooseSpecialist: "Who would you like to handle your service?",
      chooseSpecialistLead: "Choose one of the specialists for personalized guidance.",
      specialistRole: "Consortium Specialist",
      select: "Select",
      objective: "YOUR GOAL",
      vehicleQuestion: "What type of vehicle are you looking for?",
      vehicleLead: "This information will be sent to your chosen specialist.",
      car: "Car",
      motorcycle: "Motorcycle",
      suv: "SUV / Pickup",
      utility: "Commercial vehicle",
      researching: "I am still researching",
      confirmation: "CONFIRMATION",
      ready: "Your pre-service request is ready.",
      review: "Review the details before continuing to WhatsApp.",
      specialist: "Specialist",
      interest: "Interest",
      serviceCode: "Service code",
      origin: "Source",
      talk: "Talk to the specialist",
      restart: "Start over",
      configure: "Configure the WhatsApp number for",
      message: {
        hello: "Hello",
        found: "I found your consultancy through an UrbanWatch.app campaign.",
        origin: "Source",
        code: "Service code:",
        interest: "I am interested in learning about vehicle consortium options.",
        type: "Type of vehicle",
        guidance: "I would like personalized guidance.",
        close: "Can we talk?"
      }
    },
    "zh-CN": {
      campaignCta: "了解这个机会",
      backCentral: "返回服务中心",
      back: "返回",
      personalized: "个性化服务",
      chooseSpecialist: "您希望由哪位顾问为您服务？",
      chooseSpecialistLead: "请选择一位专业顾问，为您提供个性化指导。",
      specialistRole: "联合购车计划顾问",
      select: "选择",
      objective: "您的目标",
      vehicleQuestion: "您正在寻找哪种类型的车辆？",
      vehicleLead: "此信息将发送给您选择的顾问。",
      car: "轿车",
      motorcycle: "摩托车",
      suv: "SUV / 皮卡",
      utility: "商用车",
      researching: "我还在了解中",
      confirmation: "确认",
      ready: "您的预先咨询已准备好。",
      review: "前往 WhatsApp 前，请确认以下信息。",
      specialist: "顾问",
      interest: "需求",
      serviceCode: "服务编号",
      origin: "来源",
      talk: "联系顾问",
      restart: "重新开始",
      configure: "请配置 WhatsApp 号码：",
      message: {
        hello: "您好",
        found: "我通过 UrbanWatch.app 的推广活动了解到您的咨询服务。",
        origin: "来源",
        code: "服务编号：",
        interest: "我想了解车辆联合购车计划的相关选项。",
        type: "车辆类型",
        guidance: "希望获得个性化指导。",
        close: "我们可以聊聊吗？"
      }
    }
  };

  const state = {
    screen: 0,
    consultantKey: "",
    vehicle: "",
    code: "",
    lang: localStorage.getItem("uw_language") || "pt-BR"
  };

  const t = (key) => translations[state.lang]?.[key] ?? translations["pt-BR"][key] ?? key;

  const applyLanguage = (lang) => {
    if (!translations[lang]) lang = "pt-BR";
    state.lang = lang;
    localStorage.setItem("uw_language", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t(el.dataset.i18n);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = t(el.dataset.i18nAria);
      if (typeof value === "string") el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (state.vehicle) updateSummary();
  };

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

  const vehicleLabel = () => t(state.vehicle);

  const updateSummary = () => {
    const consultant = config.consultants[state.consultantKey];
    document.getElementById("summary-consultant").textContent = consultant?.fullName || "—";
    document.getElementById("summary-vehicle").textContent = state.vehicle ? vehicleLabel() : "—";
    document.getElementById("summary-code").textContent = ensureCode();
  };

  const buildMessage = () => {
    const consultant = config.consultants[state.consultantKey];
    const m = translations[state.lang].message;
    return [
      `${m.hello}, ${consultant.name}!`,
      "",
      m.found,
      "",
      `${m.origin}: ${config.origin}`,
      "",
      m.code,
      state.code,
      "",
      m.interest,
      "",
      `${m.type}: ${vehicleLabel()}`,
      "",
      m.guidance,
      "",
      m.close
    ].join("\n");
  };

  const sendWhatsApp = () => {
    const consultant = config.consultants[state.consultantKey];
    const phone = (consultant.whatsapp || "").replace(/\D/g, "");

    if (phone.length < 12) {
      notify(`${t("configure")} ${consultant.fullName}`);
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  document.addEventListener("click", (event) => {
    const langEl = event.target.closest("[data-lang]");
    if (langEl) {
      applyLanguage(langEl.dataset.lang);
      return;
    }

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

  const campaignImage = document.getElementById("campaign-image");
  campaignImage.src = config.campaign.image;
  campaignImage.alt = config.campaign.title;

  applyLanguage(state.lang);
})();
