(() => {
    "use strict";

    /* ==========================================================
       CONFIGURAÇÕES E ELEMENTOS
    ========================================================== */

    const config = window.UW_VEICULOS_CONFIG;

    const screens = [
        ...document.querySelectorAll(".screen")
    ];

    const campaignGrid = document.getElementById("campaign-grid");

    const toast = document.getElementById("toast");


    /* ==========================================================
       TRADUÇÕES
    ========================================================== */

    const translations = {
        "pt-BR": {
            catalogEyebrow: "OPORTUNIDADES DISPONÍVEIS",
            catalogTitle: "Escolha uma oportunidade de consórcio veicular",
            catalogLead: "Toque em um encarte para conhecer os detalhes e iniciar seu pré-atendimento.",

            backCentral: "Voltar à Central",
            back: "Voltar",

            sharePortal: "Compartilhar",
            shareEyebrow: "COMPARTILHAMENTO INTELIGENTE",
            shareTitle: "Compartilhe este Portal",
            shareLead: "Envie o link, apresente o QR Code ou compartilhe diretamente pelo seu celular.",
            copyLink: "Copiar link",
            nativeShare: "Compartilhar",
            saveQr: "Abrir QR Code",
            installPortal: "Adicionar à tela inicial",
            shareNote: "O compartilhamento envia o endereço desta Central de Veículos.",
            linkCopied: "Link copiado.",
            shareText: "Encontrei esta oportunidade de consórcio através da Central Inteligente de Pré-Atendimento UrbanWatch.app. Confira o portal e escolha a opção que mais combina com seu objetivo.",

            selectedOpportunity: "OPORTUNIDADE SELECIONADA",
            continueService: "Continuar para o atendimento",
            chooseAnother: "Escolher outra oportunidade",

            personalized: "ATENDIMENTO PERSONALIZADO",
            chooseSpecialist: "Quem deseja que conduza seu atendimento?",
            chooseSpecialistLead: "Escolha um dos especialistas para receber uma orientação personalizada.",

            janeRole: "Consultoria Ademicon",
            janeDescription: "Especialista em investimentos e estratégia patrimonial, conectando pessoas a projetos alinhados aos seus objetivos.",
            janePoint1: "Estratégias construídas de acordo com cada perfil",
            janePoint2: "Mais de R$ 37 milhões em vendas",
            janePoint3: "Experiência, relacionamento e foco em resultados",
            janePoint4: "Estratégia patrimonial",
            janePoint5: "Soluções para transformar planejamento em realização",
            janeCommitment: "Quero ser atendido por Jane Lima.",
            chooseJane: "Escolher Jane",

            christopherRole: "Especialista em Negócios e Investimentos | Ademicon",
            christopherDescription: "Estratégias de consórcio voltadas para alavancagem financeira, construção patrimonial e realização de projetos.",
            christopherPoint1: "Mais de R$ 25 milhões em créditos comercializados",
            christopherPoint2: "Atuação em diversas frentes do consórcio",
            christopherPoint3: "Foco em resultados e relacionamento",
            christopherCommitment: "Quero ser atendido por Christopher Galvão.",
            chooseChristopher: "Escolher Christopher",

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

            campaign: "Campanha",
            credit: "Crédito",
            group: "Grupo",
            specialist: "Especialista",
            interest: "Interesse",
            serviceCode: "Código de atendimento",
            origin: "Origem",

            talk: "Conversar com o especialista",
            restart: "Recomeçar",

            configure: "Configure o WhatsApp de",
            loading: "Carregando oportunidades...",
            error: "Não foi possível carregar as campanhas.",

            message: {
                hello: "Olá",
                found: "Encontrei sua consultoria através de uma campanha da UrbanWatch.app.",
                origin: "Origem",
                campaign: "Campanha",
                credit: "Crédito",
                group: "Grupo",
                code: "Código de atendimento:",
                interest: "Tenho interesse em conhecer as opções de consórcio para veículo.",
                type: "Tipo de veículo procurado",
                guidance: "Gostaria de uma orientação personalizada.",
                close: "Podemos conversar?"
            }
        },

        "en": {
            catalogEyebrow: "AVAILABLE OPPORTUNITIES",
            catalogTitle: "Choose a vehicle consortium opportunity",
            catalogLead: "Tap a campaign to see the details and start your pre-service request.",

            backCentral: "Back to Central",
            back: "Back",

            sharePortal: "Share",
            shareEyebrow: "SMART SHARING",
            shareTitle: "Share this Portal",
            shareLead: "Send the link, show the QR Code or share directly from your phone.",
            copyLink: "Copy link",
            nativeShare: "Share",
            saveQr: "Open QR Code",
            installPortal: "Add to home screen",
            shareNote: "Sharing sends the address of this Vehicle Central.",
            linkCopied: "Link copied.",
            shareText: "I found this consortium opportunity through the UrbanWatch.app Smart Pre-Service Central. Open the portal and choose the option that best matches your goal.",

            selectedOpportunity: "SELECTED OPPORTUNITY",
            continueService: "Continue to service",
            chooseAnother: "Choose another opportunity",

            personalized: "PERSONALIZED SERVICE",
            chooseSpecialist: "Who would you like to handle your service?",
            chooseSpecialistLead: "Choose one of the specialists for personalized guidance.",

            janeRole: "Ademicon Consultant",
            janeDescription: "Specialist in investments and wealth strategy, connecting people to projects aligned with their goals.",
            janePoint1: "Strategies built according to each profile",
            janePoint2: "More than R$ 37 million in sales",
            janePoint3: "Experience, relationships and focus on results",
            janePoint4: "Wealth strategy",
            janePoint5: "Solutions that turn planning into achievement",
            janeCommitment: "I want to be assisted by Jane Lima.",
            chooseJane: "Choose Jane",

            christopherRole: "Business and Investment Specialist | Ademicon",
            christopherDescription: "Consortium strategies focused on financial leverage, wealth building and project achievement.",
            christopherPoint1: "More than R$ 25 million in credits sold",
            christopherPoint2: "Experience across different consortium segments",
            christopherPoint3: "Focus on results and relationships",
            christopherCommitment: "I want to be assisted by Christopher Galvão.",
            chooseChristopher: "Choose Christopher",

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

            campaign: "Campaign",
            credit: "Credit",
            group: "Group",
            specialist: "Specialist",
            interest: "Interest",
            serviceCode: "Service code",
            origin: "Source",

            talk: "Talk to the specialist",
            restart: "Start over",

            configure: "Configure the WhatsApp number for",
            loading: "Loading opportunities...",
            error: "The campaigns could not be loaded.",

            message: {
                hello: "Hello",
                found: "I found your consultancy through an UrbanWatch.app campaign.",
                origin: "Source",
                campaign: "Campaign",
                credit: "Credit",
                group: "Group",
                code: "Service code:",
                interest: "I am interested in learning about vehicle consortium options.",
                type: "Type of vehicle",
                guidance: "I would like personalized guidance.",
                close: "Can we talk?"
            }
        },

        "zh-CN": {
            catalogEyebrow: "可选机会",
            catalogTitle: "请选择一个车辆联合购车计划",
            catalogLead: "点击宣传图查看详情并开始预先咨询。",

            backCentral: "返回服务中心",
            back: "返回",

            sharePortal: "分享",
            shareEyebrow: "智能分享",
            shareTitle: "分享此门户",
            shareLead: "发送链接、展示二维码或直接通过手机分享。",
            copyLink: "复制链接",
            nativeShare: "分享",
            saveQr: "打开二维码",
            installPortal: "添加到主屏幕",
            shareNote: "分享内容为车辆服务中心的网址。",
            linkCopied: "链接已复制。",
            shareText: "我通过 UrbanWatch.app 智能预先咨询中心发现了这个联合购车机会。打开门户并选择最符合您目标的方案。",

            selectedOpportunity: "已选择的机会",
            continueService: "继续咨询",
            chooseAnother: "选择其他机会",

            personalized: "个性化服务",
            chooseSpecialist: "您希望由哪位顾问为您服务？",
            chooseSpecialistLead: "请选择一位专业顾问，为您提供个性化指导。",

            janeRole: "Ademicon 顾问",
            janeDescription: "投资与财富战略专家，帮助客户连接与自身目标一致的项目。",
            janePoint1: "根据每位客户的情况制定策略",
            janePoint2: "累计销售额超过 3,700 万雷亚尔",
            janePoint3: "经验、关系维护与结果导向",
            janePoint4: "财富战略规划",
            janePoint5: "将规划转化为成果的解决方案",
            janeCommitment: "我希望由 Jane Lima 为我服务。",
            chooseJane: "选择 Jane",

            christopherRole: "商业与投资专家 | Ademicon",
            christopherDescription: "专注于财务杠杆、财富建设及项目实现的联合购车计划策略。",
            christopherPoint1: "已销售超过 2,500 万雷亚尔的信贷额度",
            christopherPoint2: "覆盖联合购车计划的多个领域",
            christopherPoint3: "重视结果与客户关系",
            christopherCommitment: "我希望由 Christopher Galvão 为我服务。",
            chooseChristopher: "选择 Christopher",

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

            campaign: "推广活动",
            credit: "额度",
            group: "组别",
            specialist: "顾问",
            interest: "需求",
            serviceCode: "服务编号",
            origin: "来源",

            talk: "联系顾问",
            restart: "重新开始",

            configure: "请配置 WhatsApp 号码：",
            loading: "正在加载机会...",
            error: "无法加载推广活动。",

            message: {
                hello: "您好",
                found: "我通过 UrbanWatch.app 的推广活动了解到您的咨询服务。",
                origin: "来源",
                campaign: "推广活动",
                credit: "额度",
                group: "组别",
                code: "服务编号：",
                interest: "我想了解车辆联合购车计划的相关选项。",
                type: "车辆类型",
                guidance: "希望获得个性化指导。",
                close: "我们可以聊聊吗？"
            }
        }
    };


    /* ==========================================================
       CAMPANHAS EMBUTIDAS DE SEGURANÇA
    ========================================================== */

    const fallbackCampaigns = [
    {
        "id": "001",
        "title": "Oportunidade Exclusiva",
        "subtitle": "Crédito de R$ 60.000",
        "group": "Condição promocional",
        "image": "campanhas/001.jpg",
        "status": "Vagas limitadas",
        "active": true
    },
    {
        "id": "002",
        "title": "Grupo em andamento",
        "subtitle": "Crédito de R$ 78.907,44",
        "group": "001631",
        "image": "campanhas/002.jpg",
        "status": "Prazo restante: 59 meses",
        "active": true
    },
    {
        "id": "003",
        "title": "Conquiste seu próximo carro",
        "subtitle": "Crédito de R$ 90.000",
        "group": "Oportunidade Ademicon",
        "image": "campanhas/003.jpg",
        "status": "Parcela de R$ 1.161,99",
        "active": true
    },
    {
        "id": "004",
        "title": "Oportunidade de investimento",
        "subtitle": "Crédito de R$ 40.232",
        "group": "001674",
        "image": "campanhas/004.jpg",
        "status": "Somente 2 vagas disponíveis",
        "active": true
    }
];


    /* ==========================================================
       ESTADO DA APLICAÇÃO
    ========================================================== */

    const state = {
        screen: 0,
        campaigns: [],
        campaign: null,
        consultantKey: "",
        vehicle: "",
        code: "",
        lang: localStorage.getItem("uw_language") || "pt-BR"
    };


    /* ==========================================================
       TRADUÇÃO
    ========================================================== */

    function translate(key) {
        return (
            translations[state.lang]?.[key] ??
            translations["pt-BR"][key] ??
            key
        );
    }


    function applyLanguage(language) {
        const selectedLanguage = translations[language]
            ? language
            : "pt-BR";

        state.lang = selectedLanguage;

        localStorage.setItem(
            "uw_language",
            selectedLanguage
        );

        document.documentElement.lang = selectedLanguage;

        document
            .querySelectorAll("[data-i18n]")
            .forEach((element) => {
                const value = translate(
                    element.dataset.i18n
                );

                if (typeof value === "string") {
                    element.textContent = value;
                }
            });

        document
            .querySelectorAll("[data-i18n-aria]")
            .forEach((element) => {
                const value = translate(
                    element.dataset.i18nAria
                );

                if (typeof value === "string") {
                    element.setAttribute(
                        "aria-label",
                        value
                    );
                }
            });

        document
            .querySelectorAll("[data-lang]")
            .forEach((button) => {
                const isActive =
                    button.dataset.lang === selectedLanguage;

                button.classList.toggle(
                    "is-active",
                    isActive
                );

                button.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

        if (state.vehicle) {
            updateSummary();
        }
    }


    /* ==========================================================
       NAVEGAÇÃO
    ========================================================== */

    function showScreen(index) {
        state.screen = Math.max(
            0,
            Math.min(
                index,
                screens.length - 1
            )
        );

        screens.forEach((screen, screenIndex) => {
            const isActive =
                screenIndex === state.screen;

            screen.classList.toggle(
                "is-active",
                isActive
            );

            screen.setAttribute(
                "aria-hidden",
                String(!isActive)
            );
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* ==========================================================
       TOAST
    ========================================================== */

    function notify(message) {
        toast.textContent = message;

        toast.classList.add(
            "is-visible"
        );

        clearTimeout(
            notify.timer
        );

        notify.timer = setTimeout(() => {
            toast.classList.remove(
                "is-visible"
            );
        }, 2200);
    }


    /* ==========================================================
       CAMPANHAS
    ========================================================== */

    function renderCampaigns() {
        campaignGrid.innerHTML = "";

        state.campaigns
            .filter((campaign) => {
                return campaign.active !== false;
            })
            .forEach((campaign) => {
                const card = document.createElement(
                    "button"
                );

                card.type = "button";

                card.className = "campaign-card";

                card.dataset.campaignId = campaign.id;

                card.innerHTML = `
                    <img
                        class="campaign-thumb"
                        src="${campaign.image}"
                        alt="${campaign.title}"
                    >

                    <span class="campaign-card-copy">
                        <strong>
                            ${campaign.title}
                        </strong>

                        <span>
                            ${campaign.subtitle}
                        </span>

                        <small>
                            ${
                                campaign.group || ""
                            }${
                                campaign.status
                                    ? " • " + campaign.status
                                    : ""
                            }
                        </small>
                    </span>
                `;

                campaignGrid.appendChild(
                    card
                );
            });
    }


    async function loadCampaigns() {
        campaignGrid.innerHTML = `
            <p class="lead">
                ${translate("loading")}
            </p>
        `;

        try {
            const response = await fetch(
                config.campaignsUrl,
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "HTTP " + response.status
                );
            }

            state.campaigns =
                await response.json();

        } catch (error) {
            state.campaigns =
                fallbackCampaigns;

            console.warn(
                "Using embedded campaign fallback:",
                error
            );
        }

        renderCampaigns();
    }


    function selectCampaign(campaignId) {
        state.campaign =
            state.campaigns.find((campaign) => {
                return campaign.id === campaignId;
            });

        if (!state.campaign) {
            return;
        }

        const image =
            document.getElementById(
                "selected-campaign-image"
            );

        image.src =
            state.campaign.image;

        image.alt =
            state.campaign.title;

        document
            .getElementById(
                "selected-campaign-title"
            )
            .textContent =
                state.campaign.title;

        document
            .getElementById(
                "selected-campaign-subtitle"
            )
            .textContent =
                state.campaign.subtitle;

        document
            .getElementById(
                "selected-campaign-group"
            )
            .textContent = [
                state.campaign.group,
                state.campaign.status
            ]
                .filter(Boolean)
                .join(" • ");

        state.code = "";

        showScreen(1);
    }


    /* ==========================================================
       CÓDIGO DE ATENDIMENTO
    ========================================================== */

    function nextNumber(consultantCode) {
        const storageKey =
            "uw_ads_veiculos_" +
            consultantCode +
            "_counter";

        let current = Number.parseInt(
            localStorage.getItem(storageKey) || "0",
            10
        );

        current = Number.isFinite(current)
            ? current + 1
            : 1;

        localStorage.setItem(
            storageKey,
            String(current)
        );

        return String(current).padStart(
            4,
            "0"
        );
    }


    function ensureCode() {
        if (state.code) {
            return state.code;
        }

        const consultant =
            config.consultants[
                state.consultantKey
            ];

        state.code = [
            config.codePrefix,
            consultant.code,
            nextNumber(
                consultant.code
            )
        ].join("-");

        return state.code;
    }


    /* ==========================================================
       RESUMO
    ========================================================== */

    function vehicleLabel() {
        return translate(
            state.vehicle
        );
    }


    function updateSummary() {
        const campaign =
            state.campaign;

        const consultant =
            config.consultants[
                state.consultantKey
            ];

        document
            .getElementById(
                "summary-campaign"
            )
            .textContent =
                campaign?.title || "—";

        document
            .getElementById(
                "summary-credit"
            )
            .textContent =
                campaign?.subtitle || "—";

        document
            .getElementById(
                "summary-group"
            )
            .textContent =
                campaign?.group || "—";

        document
            .getElementById(
                "summary-consultant"
            )
            .textContent =
                consultant?.fullName || "—";

        document
            .getElementById(
                "summary-vehicle"
            )
            .textContent =
                state.vehicle
                    ? vehicleLabel()
                    : "—";

        document
            .getElementById(
                "summary-code"
            )
            .textContent =
                ensureCode();
    }


    /* ==========================================================
       WHATSAPP
    ========================================================== */

    function buildMessage() {
        const consultant =
            config.consultants[
                state.consultantKey
            ];

        const campaign =
            state.campaign;

        const message =
            translations[
                state.lang
            ].message;

        return [
            message.hello +
                ", " +
                consultant.name +
                "!",

            "",

            message.found,

            "",

            message.origin +
                ": " +
                config.origin,

            "",

            message.campaign +
                ": " +
                campaign.title,

            message.credit +
                ": " +
                campaign.subtitle,

            message.group +
                ": " +
                (
                    campaign.group ||
                    "—"
                ),

            "",

            message.code,

            state.code,

            "",

            message.interest,

            "",

            message.type +
                ": " +
                vehicleLabel(),

            "",

            message.guidance,

            "",

            message.close
        ].join("\n");
    }


    function sendWhatsApp() {
        const consultant =
            config.consultants[
                state.consultantKey
            ];

        const phone = (
            consultant.whatsapp || ""
        ).replace(
            /\D/g,
            ""
        );

        if (phone.length < 12) {
            notify(
                translate("configure") +
                " " +
                consultant.fullName
            );

            return;
        }

        const url =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(
                buildMessage()
            );

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    }


    /* ==========================================================
       COMPARTILHAMENTO INTELIGENTE
    ========================================================== */

    const shareModal =
        document.getElementById(
            "share-modal"
        );

    const openShareModalButton =
        document.getElementById(
            "open-share-modal"
        );

    const closeShareModalButton =
        document.getElementById(
            "close-share-modal"
        );

    const copyShareLinkButton =
        document.getElementById(
            "copy-share-link"
        );

    const nativeShareButton =
        document.getElementById(
            "native-share"
        );

    const saveQrButton =
        document.getElementById(
            "save-qr"
        );

    const installAppButton =
        document.getElementById(
            "install-app"
        );

    const shareQrImage =
        document.getElementById(
            "share-qr"
        );

    const shareUrlText =
        document.getElementById(
            "share-url"
        );

    const portalUrl =
        new URL(
            ".",
            window.location.href
        ).href;

    let deferredInstallPrompt = null;


    function qrUrl() {
        return (
            "https://quickchart.io/qr" +
            "?size=620" +
            "&margin=2" +
            "&text=" +
            encodeURIComponent(
                portalUrl
            )
        );
    }


    function openShareModal() {
        shareQrImage.src =
            qrUrl();

        shareUrlText.textContent =
            portalUrl;

        shareModal.classList.add(
            "is-open"
        );

        shareModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "share-modal-open"
        );

        closeShareModalButton.focus();
    }


    function closeShareModal() {
        shareModal.classList.remove(
            "is-open"
        );

        shareModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "share-modal-open"
        );

        openShareModalButton.focus();
    }


    async function copyPortalLink() {
        try {
            await navigator.clipboard.writeText(
                portalUrl
            );

            notify(
                translate("linkCopied")
            );

        } catch (error) {
            window.prompt(
                translate("copyLink"),
                portalUrl
            );
        }
    }


    async function sharePortal() {
        const payload = {
            title: document.title,
            text: translate(
                "shareText"
            ),
            url: portalUrl
        };

        if (navigator.share) {
            try {
                await navigator.share(
                    payload
                );
            } catch (error) {
                // Cancelamento do usuário.
            }

            return;
        }

        await copyPortalLink();
    }


    /* ==========================================================
       INSTALAÇÃO PWA
    ========================================================== */

    window.addEventListener(
        "beforeinstallprompt",
        (event) => {
            event.preventDefault();

            deferredInstallPrompt =
                event;

            installAppButton.hidden =
                false;
        }
    );


    installAppButton?.addEventListener(
        "click",
        async () => {
            if (!deferredInstallPrompt) {
                return;
            }

            deferredInstallPrompt.prompt();

            await deferredInstallPrompt.userChoice;

            deferredInstallPrompt = null;

            installAppButton.hidden =
                true;
        }
    );


    if ("serviceWorker" in navigator) {
        window.addEventListener(
            "load",
            () => {
                navigator.serviceWorker
                    .register(
                        "service-worker.js"
                    )
                    .catch(
                        console.warn
                    );
            }
        );
    }


    /* ==========================================================
       EVENTOS DO COMPARTILHAMENTO
    ========================================================== */

    openShareModalButton?.addEventListener(
        "click",
        openShareModal
    );

    closeShareModalButton?.addEventListener(
        "click",
        closeShareModal
    );

    copyShareLinkButton?.addEventListener(
        "click",
        copyPortalLink
    );

    nativeShareButton?.addEventListener(
        "click",
        sharePortal
    );

    saveQrButton?.addEventListener(
        "click",
        () => {
            window.open(
                qrUrl(),
                "_blank",
                "noopener,noreferrer"
            );
        }
    );

    shareModal?.addEventListener(
        "click",
        (event) => {
            if (event.target === shareModal) {
                closeShareModal();
            }
        }
    );

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                shareModal?.classList.contains(
                    "is-open"
                )
            ) {
                closeShareModal();
            }
        }
    );


    /* ==========================================================
       EVENTOS GERAIS
    ========================================================== */

    document.addEventListener(
        "click",
        (event) => {
            const languageButton =
                event.target.closest(
                    "[data-lang]"
                );

            if (languageButton) {
                applyLanguage(
                    languageButton.dataset.lang
                );

                return;
            }


            const campaignButton =
                event.target.closest(
                    "[data-campaign-id]"
                );

            if (campaignButton) {
                selectCampaign(
                    campaignButton.dataset.campaignId
                );

                return;
            }


            const actionElement =
                event.target.closest(
                    "[data-action]"
                );

            if (actionElement) {
                const action =
                    actionElement.dataset.action;

                if (action === "next") {
                    showScreen(
                        state.screen + 1
                    );
                }

                if (action === "back") {
                    showScreen(
                        state.screen - 1
                    );
                }

                if (action === "send") {
                    sendWhatsApp();
                }

                if (action === "restart") {
                    state.campaign = null;
                    state.consultantKey = "";
                    state.vehicle = "";
                    state.code = "";

                    document
                        .querySelectorAll(
                            ".is-selected"
                        )
                        .forEach((element) => {
                            element.classList.remove(
                                "is-selected"
                            );
                        });

                    showScreen(0);
                }

                return;
            }


            const consultantElement =
                event.target.closest(
                    "[data-consultant]"
                );

            if (consultantElement) {
                state.consultantKey =
                    consultantElement.dataset.consultant;

                state.code = "";

                document
                    .querySelectorAll(
                        "[data-profile]"
                    )
                    .forEach((element) => {
                        element.classList.remove(
                            "is-selected"
                        );
                    });

                const card =
                    consultantElement.closest(
                        "[data-profile]"
                    );

                if (card) {
                    card.classList.add(
                        "is-selected"
                    );
                }

                setTimeout(() => {
                    showScreen(3);
                }, 220);

                return;
            }


            const vehicleElement =
                event.target.closest(
                    "[data-vehicle]"
                );

            if (vehicleElement) {
                state.vehicle =
                    vehicleElement.dataset.vehicle;

                state.code = "";

                document
                    .querySelectorAll(
                        "[data-vehicle]"
                    )
                    .forEach((element) => {
                        element.classList.remove(
                            "is-selected"
                        );
                    });

                vehicleElement.classList.add(
                    "is-selected"
                );

                updateSummary();

                setTimeout(() => {
                    showScreen(4);
                }, 220);
            }
        }
    );


    /* ==========================================================
       INICIALIZAÇÃO
    ========================================================== */

    applyLanguage(
        state.lang
    );

    loadCampaigns();
})();
