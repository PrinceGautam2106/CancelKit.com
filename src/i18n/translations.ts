export const locales = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'it'] as const;
export type Locale = (typeof locales)[number];

type Translation = {
	// ── Meta / SEO ──
	meta_title: string;
	meta_description: string;
	meta_keywords: string;
	// ── Hero ──
	hero_eyebrow: string;
	hero_headline_1: string;
	hero_headline_2: string;
	hero_headline_3: string;
	hero_sub: string;
	cta_button: string;
	email_placeholder: string;
	reassurance: string;
	hero_stat_wasted: string;
	hero_stat_guides: string;
	hero_stat_scan: string;
	// ── Features ──
	features_eyebrow: string;
	features_title: string;
	features_lede: string;
	feature_smart_scan_title: string;
	feature_smart_scan_desc: string;
	feature_one_click_title: string;
	feature_one_click_desc: string;
	feature_renewal_title: string;
	feature_renewal_desc: string;
	feature_savings_title: string;
	feature_savings_desc: string;
	feature_privacy_title: string;
	feature_privacy_desc: string;
	feature_multi_title: string;
	feature_multi_desc: string;
	// ── How it works ──
	how_eyebrow: string;
	how_title: string;
	step1_title: string;
	step1_desc: string;
	step2_title: string;
	step2_desc: string;
	step3_title: string;
	step3_desc: string;
	// ── Pricing ──
	pricing_eyebrow: string;
	pricing_title: string;
	pricing_subtitle: string;
	pricing_fine: string;
	price_label: string;
	// ── CTA Band ──
	cta_title: string;
	cta_subtitle: string;
	cta_button_text: string;
	cta_fine: string;
	// ── FAQ headings ──
	faq_label: string;
	faq_heading: string;
	faq_subtitle: string;
	faq_contact: string;
	faq_still: string;
	faq_talk: string;
	// ── Nav ──
	nav_how: string;
	nav_pricing: string;
	nav_signin: string;
	nav_start: string;
};

// ────────────────────────────────────────────────────────────────────────────
// 🇺🇸 English
// ────────────────────────────────────────────────────────────────────────────
const en: Translation = {
	meta_title: 'CancelKits — Cancel Subscriptions & Stop Recurring Charges Instantly',
	meta_description: 'CancelKits finds every subscription draining your money and cancels them in one click. Stop forgotten recurring charges. Free to start.',
	meta_keywords: 'cancel subscriptions, subscription cancellation, stop recurring charges, cancel subscriptions online, subscription tracker, find forgotten subscriptions, cancel all subscriptions, subscription manager, cancel membership online',
	hero_eyebrow: 'CANCEL SUBSCRIPTIONS · STOP RECURRING CHARGES',
	hero_headline_1: 'Cancel any subscription instantly',
	hero_headline_2: "find what's draining you",
	hero_headline_3: '',
	hero_sub: 'The average American wastes $219/month on forgotten subscriptions. CancelKits finds them. CancelKits helps you cancel them.',
	cta_button: 'Find my subscriptions →',
	email_placeholder: 'you@example.com',
	reassurance: 'No credit card. Free subscription audit in 30 seconds.',
	hero_stat_wasted: 'avg. wasted on forgotten subscriptions',
	hero_stat_guides: 'verified cancel guides',
	hero_stat_scan: 'free subscription scan',
	features_eyebrow: 'FEATURES',
	features_title: 'The subscription manager that actually cancels',
	features_lede: "CancelKits gives you full visibility into every recurring charge — and the tools to cancel subscriptions you don't need.",
	feature_smart_scan_title: 'Smart Scan',
	feature_smart_scan_desc: 'Automatically finds every recurring charge hiding in your inbox. No manual entry needed.',
	feature_one_click_title: 'One-Click Cancel',
	feature_one_click_desc: 'Cancel unwanted subscriptions with a single click. We handle the cancellation process for you.',
	feature_renewal_title: 'Renewal Alerts',
	feature_renewal_desc: 'Get notified 7 days before any subscription renews so you can cancel before the charge hits.',
	feature_savings_title: 'Savings Dashboard',
	feature_savings_desc: 'Track exactly how much you save month over month with visual reports and savings trends.',
	feature_privacy_title: 'Privacy First',
	feature_privacy_desc: 'Read-only email access. Bank-level 256-bit encryption. We never store your password.',
	feature_multi_title: 'Multi-Account',
	feature_multi_desc: 'Connect Gmail, Outlook, and more. See all your subscriptions from every account in one place.',
	how_eyebrow: 'HOW TO CANCEL SUBSCRIPTIONS',
	how_title: 'How CancelKits finds and cancels your subscriptions',
	step1_title: 'Connect your email in 30 seconds',
	step1_desc: 'CancelKits scans your inbox for subscription receipts. Read-only access — we never send emails or change anything.',
	step2_title: 'See every recurring charge in one dashboard',
	step2_desc: 'Your full subscription map appears in seconds — every charge, renewal date, and total monthly burn.',
	step3_title: 'Cancel subscriptions with one click',
	step3_desc: "Hit cancel on anything you don't need. We help complete the cancellation. You get confirmation.",
	pricing_eyebrow: 'PRICING',
	pricing_title: 'Simple, honest pricing.',
	pricing_subtitle: 'One plan. No surprise fees. Cancel anytime.',
	pricing_fine: 'No credit card required for your trial.',
	price_label: 'per month',
	cta_title: 'Stop paying for subscriptions you forgot about.',
	cta_subtitle: 'Join 47,000+ people who already stopped the bleed.',
	cta_button_text: 'Start free — find my subscriptions →',
	cta_fine: 'No credit card required. Scans in 30 seconds.',
	faq_label: 'FAQ',
	faq_heading: 'Frequently Asked Questions About Cancelling Subscriptions',
	faq_subtitle: 'Everything you need to know about CancelKits and how to stop recurring charges.',
	faq_contact: 'Contact us →',
	faq_still: 'Still have a question?',
	faq_talk: 'Talk to us →',
	nav_how: 'How it works',
	nav_pricing: 'Pricing',
	nav_signin: 'Sign in',
	nav_start: 'Start free',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇪🇸 Español
// ────────────────────────────────────────────────────────────────────────────
const es: Translation = {
	meta_title: 'CancelKits — Cancela suscripciones y para cargos recurrentes',
	meta_description: 'CancelKits encuentra cada suscripción que te drena dinero y te ayuda a cancelarla. Empieza gratis, sin tarjeta.',
	meta_keywords: 'cancelar suscripciones, cómo cancelar suscripciones, cancelar suscripción, parar cargos recurrentes, anular suscripciones, encontrar suscripciones olvidadas, gestor de suscripciones, dar de baja suscripción, cancelar membresía en línea',
	hero_eyebrow: 'CANCELAR SUSCRIPCIONES · PARAR CARGOS RECURRENTES',
	hero_headline_1: 'Cancela cualquier suscripción —',
	hero_headline_2: 'descubre qué te está drenando',
	hero_headline_3: '',
	hero_sub: 'El estadounidense promedio desperdicia $219/mes en suscripciones olvidadas. CancelKits las encuentra y te ayuda a cancelarlas.',
	cta_button: 'Encontrar mis suscripciones →',
	email_placeholder: 'tu@correo.com',
	reassurance: 'Sin tarjeta. Auditoría gratis en 30 segundos.',
	hero_stat_wasted: 'promedio desperdiciado en suscripciones olvidadas',
	hero_stat_guides: 'guías de cancelación verificadas',
	hero_stat_scan: 'escaneo gratuito de suscripciones',
	features_eyebrow: 'FUNCIONES',
	features_title: 'El gestor de suscripciones que realmente cancela',
	features_lede: 'CancelKits te da visibilidad total sobre cada cargo recurrente y las herramientas para cancelar las suscripciones que no necesitas.',
	feature_smart_scan_title: 'Escaneo inteligente',
	feature_smart_scan_desc: 'Encuentra automáticamente cada cargo recurrente oculto en tu bandeja de entrada. Sin entrada manual.',
	feature_one_click_title: 'Cancelación con un clic',
	feature_one_click_desc: 'Cancela suscripciones no deseadas con un solo clic. Nos encargamos del proceso de cancelación.',
	feature_renewal_title: 'Alertas de renovación',
	feature_renewal_desc: 'Recibe una notificación 7 días antes de que cualquier suscripción se renueve.',
	feature_savings_title: 'Panel de ahorro',
	feature_savings_desc: 'Rastrea exactamente cuánto ahorras mes a mes con informes visuales y tendencias de ahorro.',
	feature_privacy_title: 'Privacidad primero',
	feature_privacy_desc: 'Acceso de solo lectura al correo. Cifrado de 256 bits. Nunca almacenamos tu contraseña.',
	feature_multi_title: 'Multicuenta',
	feature_multi_desc: 'Conecta Gmail, Outlook y más. Ve todas tus suscripciones de cada cuenta en un solo lugar.',
	how_eyebrow: 'CÓMO CANCELAR SUSCRIPCIONES',
	how_title: 'Cómo CancelKits encuentra y cancela tus suscripciones',
	step1_title: 'Conecta tu correo en 30 segundos',
	step1_desc: 'CancelKits analiza tu bandeja de entrada en busca de recibos de suscripciones. Acceso de solo lectura: nunca enviamos correos ni modificamos nada.',
	step2_title: 'Mira cada cargo recurrente en un solo panel',
	step2_desc: 'Tu mapa completo de suscripciones aparece en segundos: cada cobro, fechas de renovación y gasto mensual total.',
	step3_title: 'Cancela suscripciones con un solo clic',
	step3_desc: 'Haz clic en cancelar en lo que no necesites. Te ayudamos a completar la cancelación y recibes confirmación.',
	pricing_eyebrow: 'PRECIOS',
	pricing_title: 'Precios simples y honestos.',
	pricing_subtitle: 'Un solo plan. Sin cargos sorpresa. Cancela cuando quieras.',
	pricing_fine: 'Sin tarjeta de crédito para tu prueba.',
	price_label: 'al mes',
	cta_title: 'Deja de pagar por suscripciones que olvidaste.',
	cta_subtitle: 'Únete a más de 47.000 personas que ya pararon la fuga.',
	cta_button_text: 'Empieza gratis — encuentra mis suscripciones →',
	cta_fine: 'Sin tarjeta de crédito. Escaneo en 30 segundos.',
	faq_label: 'FAQ',
	faq_heading: 'Preguntas frecuentes sobre cancelar suscripciones',
	faq_subtitle: 'Todo lo que necesitas saber sobre CancelKits y cómo parar cargos recurrentes.',
	faq_contact: 'Contáctanos →',
	faq_still: '¿Todavía tienes una pregunta?',
	faq_talk: 'Habla con nosotros →',
	nav_how: 'Cómo funciona',
	nav_pricing: 'Precios',
	nav_signin: 'Iniciar sesión',
	nav_start: 'Empezar gratis',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇫🇷 Français
// ────────────────────────────────────────────────────────────────────────────
const fr: Translation = {
	meta_title: 'CancelKits — Résiliez abonnements et arrêtez les prélèvements',
	meta_description: 'CancelKits trouve chaque abonnement qui vide votre compte et vous aide à le résilier. Gratuit pour commencer.',
	meta_keywords: 'résilier abonnements, comment résilier un abonnement, annuler abonnement, arrêter prélèvements récurrents, trouver abonnements oubliés, gestionnaire abonnements, se désabonner, stopper prélèvement automatique, résiliation abonnement',
	hero_eyebrow: 'RÉSILIER ABONNEMENTS · ARRÊTER LES PRÉLÈVEMENTS',
	hero_headline_1: 'Résiliez tout abonnement —',
	hero_headline_2: 'voyez ce qui vous draine',
	hero_headline_3: '',
	hero_sub: "L'Américain moyen gaspille 219 $/mois en abonnements oubliés. CancelKits les trouve et vous aide à les résilier.",
	cta_button: 'Trouver mes abonnements →',
	email_placeholder: 'vous@exemple.com',
	reassurance: 'Aucune carte. Audit gratuit en 30 secondes.',
	hero_stat_wasted: 'gaspillés en abonnements oubliés',
	hero_stat_guides: 'guides de résiliation vérifiés',
	hero_stat_scan: "audit d'abonnements gratuit",
	features_eyebrow: 'FONCTIONNALITÉS',
	features_title: 'Le gestionnaire qui résilie vraiment vos abonnements',
	features_lede: "CancelKits offre une visibilité complète sur chaque prélèvement récurrent et les outils pour résilier ce que vous n'utilisez plus.",
	feature_smart_scan_title: 'Scan intelligent',
	feature_smart_scan_desc: 'Détecte automatiquement chaque prélèvement récurrent caché dans votre boîte mail. Aucune saisie manuelle.',
	feature_one_click_title: 'Résiliation en un clic',
	feature_one_click_desc: "Résiliez les abonnements non désirés d'un seul clic. Nous gérons le processus pour vous.",
	feature_renewal_title: 'Alertes de renouvellement',
	feature_renewal_desc: 'Soyez prévenu 7 jours avant le renouvellement de chaque abonnement.',
	feature_savings_title: "Tableau de bord d'économies",
	feature_savings_desc: 'Suivez précisément vos économies mensuelles avec des rapports visuels et des tendances.',
	feature_privacy_title: 'Confidentialité avant tout',
	feature_privacy_desc: 'Accès e-mail en lecture seule. Chiffrement 256 bits. Nous ne stockons jamais votre mot de passe.',
	feature_multi_title: 'Multi-comptes',
	feature_multi_desc: 'Connectez Gmail, Outlook et plus. Voyez tous vos abonnements de chaque compte en un seul endroit.',
	how_eyebrow: 'COMMENT RÉSILIER VOS ABONNEMENTS',
	how_title: 'Comment CancelKits trouve et résilie vos abonnements',
	step1_title: 'Connectez votre e-mail en 30 secondes',
	step1_desc: "CancelKits recherche vos reçus d'abonnements. Accès en lecture seule — nous n'envoyons aucun e-mail et ne modifions rien.",
	step2_title: 'Visualisez tous vos prélèvements récurrents',
	step2_desc: "Le récapitulatif de vos abonnements s'affiche en quelques secondes : chaque service, dates de renouvellement et coût mensuel.",
	step3_title: 'Résiliez vos abonnements en un clic',
	step3_desc: "Cliquez pour annuler ce dont vous n'avez plus besoin. Nous vous accompagnons pour finaliser la résiliation avec confirmation.",
	pricing_eyebrow: 'TARIFS',
	pricing_title: 'Des tarifs simples et honnêtes.',
	pricing_subtitle: 'Une formule unique. Aucun frais caché. Résiliez à tout moment.',
	pricing_fine: 'Aucune carte requise pour votre essai.',
	price_label: 'par mois',
	cta_title: 'Arrêtez de payer pour des abonnements que vous avez oubliés.',
	cta_subtitle: 'Rejoignez plus de 47 000 personnes qui ont déjà stoppé la fuite.',
	cta_button_text: 'Essai gratuit — trouver mes abonnements →',
	cta_fine: 'Aucune carte requise. Scan en 30 secondes.',
	faq_label: 'FAQ',
	faq_heading: "Questions fréquentes sur la résiliation d'abonnements",
	faq_subtitle: 'Tout ce que vous devez savoir sur CancelKits et comment arrêter les prélèvements récurrents.',
	faq_contact: 'Contactez-nous →',
	faq_still: 'Vous avez encore une question ?',
	faq_talk: 'Parlez-nous →',
	nav_how: 'Comment ça marche',
	nav_pricing: 'Tarifs',
	nav_signin: 'Se connecter',
	nav_start: 'Essayer gratuitement',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇩🇪 Deutsch
// ────────────────────────────────────────────────────────────────────────────
const de: Translation = {
	meta_title: 'CancelKits — Abos kündigen & wiederkehrende Kosten stoppen',
	meta_description: 'CancelKits findet jedes Abo, das dich Geld kostet, und hilft beim Kündigen. Kostenlos starten — ohne Kreditkarte.',
	meta_keywords: 'Abos kündigen, wie kündige ich Abonnements, wiederkehrende Kosten stoppen, vergessene Abos finden, Abo Tracker, Abo Manager, Mitgliedschaft kündigen, Dauerauftrag kündigen, Abonnements verwalten',
	hero_eyebrow: 'ABOS KÜNDIGEN · WIEDERKEHRENDE KOSTEN STOPPEN',
	hero_headline_1: 'Jedes Abo sofort kündigen —',
	hero_headline_2: 'finde, was dich ausblutet',
	hero_headline_3: '',
	hero_sub: 'Der durchschnittliche Amerikaner verschwendet 219 $/Monat für vergessene Abos. CancelKits findet sie und hilft beim Kündigen.',
	cta_button: 'Meine Abos finden →',
	email_placeholder: 'du@beispiel.de',
	reassurance: 'Keine Kreditkarte. Kostenloser Check in 30 Sekunden.',
	hero_stat_wasted: 'durchschnittlich verschwendet für vergessene Abos',
	hero_stat_guides: 'verifizierte Kündigungsanleitungen',
	hero_stat_scan: 'kostenloser Abo-Scan',
	features_eyebrow: 'FUNKTIONEN',
	features_title: 'Der Abo-Manager, der wirklich kündigt',
	features_lede: 'CancelKits gibt dir volle Transparenz über jede wiederkehrende Belastung — und die Werkzeuge, um unnötige Abos zu kündigen.',
	feature_smart_scan_title: 'Smart Scan',
	feature_smart_scan_desc: 'Findet automatisch jede versteckte wiederkehrende Belastung in deinem Postfach. Kein manuelles Eingeben nötig.',
	feature_one_click_title: 'Ein-Klick-Kündigung',
	feature_one_click_desc: 'Kündige ungewollte Abos mit einem einzigen Klick. Wir übernehmen den Kündigungsprozess für dich.',
	feature_renewal_title: 'Verlängerungsalarm',
	feature_renewal_desc: 'Werde 7 Tage vor jeder Abo-Verlängerung benachrichtigt.',
	feature_savings_title: 'Spar-Dashboard',
	feature_savings_desc: 'Verfolge genau, wie viel du Monat für Monat sparst — mit visuellen Berichten und Spartrends.',
	feature_privacy_title: 'Datenschutz zuerst',
	feature_privacy_desc: 'Reiner Lesezugriff auf E-Mails. 256-Bit-Verschlüsselung. Wir speichern niemals dein Passwort.',
	feature_multi_title: 'Multi-Konto',
	feature_multi_desc: 'Verbinde Gmail, Outlook und mehr. Sieh alle Abos aus jedem Konto an einem Ort.',
	how_eyebrow: 'SO KÜNDIGST DU ABOS',
	how_title: 'So findet und kündigt CancelKits deine Abos',
	step1_title: 'E-Mail in 30 Sekunden verbinden',
	step1_desc: 'CancelKits scannt dein Postfach nach Abo-Rechnungen. Reiner Lesezugriff — wir versenden keine E-Mails und ändern nichts.',
	step2_title: 'Alle wiederkehrenden Kosten auf einen Blick',
	step2_desc: 'Deine komplette Abo-Übersicht in Sekundenschnelle — alle Kosten, Verlängerungsdaten und monatliche Gesamtausgaben.',
	step3_title: 'Abos mit einem Klick kündigen',
	step3_desc: 'Kündige ungenutzte Abos mit einem Klick. Wir unterstützen dich bei der Kündigung bis zur Bestätigung.',
	pricing_eyebrow: 'PREISE',
	pricing_title: 'Einfach. Ehrlich. Transparent.',
	pricing_subtitle: 'Ein Tarif. Keine versteckten Kosten. Jederzeit kündbar.',
	pricing_fine: 'Keine Kreditkarte für den Test erforderlich.',
	price_label: 'pro Monat',
	cta_title: 'Hör auf, für vergessene Abos zu zahlen.',
	cta_subtitle: 'Schließ dich 47.000+ Menschen an, die den Geldabfluss gestoppt haben.',
	cta_button_text: 'Kostenlos starten — meine Abos finden →',
	cta_fine: 'Keine Kreditkarte nötig. Scan in 30 Sekunden.',
	faq_label: 'FAQ',
	faq_heading: 'Häufige Fragen zum Kündigen von Abonnements',
	faq_subtitle: 'Alles, was du über CancelKits und das Stoppen wiederkehrender Kosten wissen musst.',
	faq_contact: 'Kontaktiere uns →',
	faq_still: 'Noch eine Frage?',
	faq_talk: 'Sprich mit uns →',
	nav_how: "So funktioniert's",
	nav_pricing: 'Preise',
	nav_signin: 'Anmelden',
	nav_start: 'Kostenlos starten',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇧🇷 Português
// ────────────────────────────────────────────────────────────────────────────
const pt: Translation = {
	meta_title: 'CancelKits — Cancele assinaturas e pare cobranças recorrentes',
	meta_description: 'CancelKits encontra cada assinatura que drena seu dinheiro e ajuda a cancelar. Comece grátis, sem cartão.',
	meta_keywords: 'cancelar assinaturas, como cancelar assinaturas, cancelar assinatura, parar cobranças recorrentes, encontrar assinaturas esquecidas, gerenciador de assinaturas, cancelar planos, cancelar mensalidade, rastreador de assinaturas',
	hero_eyebrow: 'CANCELAR ASSINATURAS · PARAR COBRANÇAS RECORRENTES',
	hero_headline_1: 'Cancele qualquer assinatura —',
	hero_headline_2: 'veja o que está drenando você',
	hero_headline_3: '',
	hero_sub: 'O americano médio desperdiça US$219/mês em assinaturas esquecidas. CancelKits encontra e ajuda a cancelar.',
	cta_button: 'Encontrar minhas assinaturas →',
	email_placeholder: 'voce@exemplo.com',
	reassurance: 'Sem cartão. Auditoria grátis em 30 segundos.',
	hero_stat_wasted: 'desperdiçado em assinaturas esquecidas',
	hero_stat_guides: 'guias de cancelamento verificados',
	hero_stat_scan: 'auditoria gratuita de assinaturas',
	features_eyebrow: 'RECURSOS',
	features_title: 'O gerenciador de assinaturas que realmente cancela',
	features_lede: 'CancelKits dá visibilidade total sobre cada cobrança recorrente — e as ferramentas para cancelar o que não precisa.',
	feature_smart_scan_title: 'Scan inteligente',
	feature_smart_scan_desc: 'Encontra automaticamente cada cobrança recorrente escondida na sua caixa de entrada. Sem entrada manual.',
	feature_one_click_title: 'Cancelamento em um clique',
	feature_one_click_desc: 'Cancele assinaturas indesejadas com um único clique. Cuidamos do processo de cancelamento.',
	feature_renewal_title: 'Alertas de renovação',
	feature_renewal_desc: 'Receba notificação 7 dias antes de qualquer assinatura ser renovada.',
	feature_savings_title: 'Painel de economia',
	feature_savings_desc: 'Acompanhe exatamente quanto você economiza mês a mês com relatórios visuais e tendências.',
	feature_privacy_title: 'Privacidade em primeiro lugar',
	feature_privacy_desc: 'Acesso somente leitura. Criptografia de 256 bits. Nunca armazenamos sua senha.',
	feature_multi_title: 'Multiconta',
	feature_multi_desc: 'Conecte Gmail, Outlook e mais. Veja todas as suas assinaturas de cada conta em um só lugar.',
	how_eyebrow: 'COMO CANCELAR ASSINATURAS',
	how_title: 'Como o CancelKits encontra e cancela suas assinaturas',
	step1_title: 'Conecte seu e-mail em 30 segundos',
	step1_desc: 'O CancelKits analisa sua caixa de entrada em busca de recibos de assinaturas. Acesso somente leitura — nunca enviamos e-mails nem alteramos nada.',
	step2_title: 'Veja cada cobrança recorrente em um só painel',
	step2_desc: 'O mapeamento completo de suas assinaturas em segundos — cada cobrança, datas de renovação e gasto mensal total.',
	step3_title: 'Cancele assinaturas com um clique',
	step3_desc: 'Cancele tudo o que você não usa mais. Ajudamos a concluir o cancelamento com confirmação garantida.',
	pricing_eyebrow: 'PREÇOS',
	pricing_title: 'Preços simples e honestos.',
	pricing_subtitle: 'Um único plano. Sem cobranças surpresa. Cancele quando quiser.',
	pricing_fine: 'Sem cartão de crédito para seu teste.',
	price_label: 'por mês',
	cta_title: 'Pare de pagar por assinaturas que você esqueceu.',
	cta_subtitle: 'Junte-se a mais de 47.000 pessoas que já pararam o desperdício.',
	cta_button_text: 'Comece grátis — encontrar minhas assinaturas →',
	cta_fine: 'Sem cartão de crédito. Scan em 30 segundos.',
	faq_label: 'FAQ',
	faq_heading: 'Perguntas frequentes sobre cancelar assinaturas',
	faq_subtitle: 'Tudo o que você precisa saber sobre o CancelKits e como parar cobranças recorrentes.',
	faq_contact: 'Fale conosco →',
	faq_still: 'Ainda tem uma dúvida?',
	faq_talk: 'Fale conosco →',
	nav_how: 'Como funciona',
	nav_pricing: 'Preços',
	nav_signin: 'Entrar',
	nav_start: 'Começar grátis',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇯🇵 日本語
// ────────────────────────────────────────────────────────────────────────────
const ja: Translation = {
	meta_title: 'CancelKits — サブスクリプションを解約して定期課金を今すぐ停止',
	meta_description: 'CancelKitsはお金を吸い取っているすべてのサブスクを見つけ、ワンクリックで解約をサポート。無料で開始、クレジットカード不要。',
	meta_keywords: 'サブスク解約, サブスクリプション解約, 定期課金停止, サブスク管理, サブスクリプションキャンセル, 忘れたサブスク, サブスク一覧, 解約方法, 自動更新停止',
	hero_eyebrow: 'サブスク解約 · 定期課金を停止',
	hero_headline_1: 'どんなサブスクも即座に解約 —',
	hero_headline_2: '無駄な出費を見つけよう',
	hero_headline_3: '',
	hero_sub: '平均的なアメリカ人は月219ドルを忘れたサブスクに浪費しています。CancelKitsがそれらを見つけて解約をサポートします。',
	cta_button: 'サブスクを見つける →',
	email_placeholder: 'you@example.com',
	reassurance: 'クレジットカード不要。30秒で無料サブスク診断。',
	hero_stat_wasted: '忘れたサブスクの平均浪費額',
	hero_stat_guides: '認証済み解約ガイド',
	hero_stat_scan: '無料サブスクスキャン',
	features_eyebrow: '機能',
	features_title: '実際に解約までサポートするサブスク管理ツール',
	features_lede: 'CancelKitsはすべての定期課金を可視化し、不要なサブスクリプションを解約するツールを提供します。',
	feature_smart_scan_title: 'スマートスキャン',
	feature_smart_scan_desc: '受信トレイに隠れているすべての定期課金を自動検出。手入力は不要です。',
	feature_one_click_title: 'ワンクリック解約',
	feature_one_click_desc: '不要なサブスクをワンクリックで解約。解約プロセスを代行します。',
	feature_renewal_title: '更新アラート',
	feature_renewal_desc: 'サブスクの更新7日前に通知を受け取れます。',
	feature_savings_title: '節約ダッシュボード',
	feature_savings_desc: '月ごとの節約額をビジュアルレポートとトレンドで正確に追跡。',
	feature_privacy_title: 'プライバシーファースト',
	feature_privacy_desc: 'メールは読み取り専用アクセス。256ビット暗号化。パスワードは保存しません。',
	feature_multi_title: 'マルチアカウント',
	feature_multi_desc: 'Gmail、Outlookなどを接続。すべてのアカウントのサブスクを一元管理。',
	how_eyebrow: 'サブスクの解約方法',
	how_title: 'CancelKitsがサブスクを見つけて解約する方法',
	step1_title: '30秒でメールを接続',
	step1_desc: 'CancelKitsが受信トレイからサブスクの領収書をスキャン。読み取り専用 — メール送信や変更は一切しません。',
	step2_title: 'すべての定期課金を一つのダッシュボードで確認',
	step2_desc: 'サブスクの全体像が数秒で表示 — すべての課金額、更新日、月額合計。',
	step3_title: 'ワンクリックでサブスクを解約',
	step3_desc: '不要なものは解約ボタンをクリック。解約完了までサポートし、確認通知をお届けします。',
	pricing_eyebrow: '料金',
	pricing_title: 'シンプルで正直な料金設定。',
	pricing_subtitle: '1プランのみ。隠れた料金なし。いつでも解約可能。',
	pricing_fine: 'トライアルにクレジットカードは不要です。',
	price_label: '月額',
	cta_title: '忘れたサブスクへの支払いをやめましょう。',
	cta_subtitle: '47,000人以上がすでに無駄な出費を止めています。',
	cta_button_text: '無料で始める — サブスクを見つける →',
	cta_fine: 'クレジットカード不要。30秒でスキャン。',
	faq_label: 'FAQ',
	faq_heading: 'サブスク解約に関するよくある質問',
	faq_subtitle: 'CancelKitsと定期課金の停止方法について知っておくべきこと。',
	faq_contact: 'お問い合わせ →',
	faq_still: 'まだ質問がありますか？',
	faq_talk: 'お気軽にご連絡ください →',
	nav_how: '使い方',
	nav_pricing: '料金',
	nav_signin: 'ログイン',
	nav_start: '無料で始める',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇰🇷 한국어
// ────────────────────────────────────────────────────────────────────────────
const ko: Translation = {
	meta_title: 'CancelKits — 구독을 취소하고 정기 결제를 즉시 중단하세요',
	meta_description: 'CancelKits는 돈을 빼가고 있는 모든 구독을 찾아 원클릭으로 해지를 도와줍니다. 무료로 시작, 신용카드 불필요.',
	meta_keywords: '구독 해지, 구독 취소, 정기 결제 중단, 구독 관리, 잊은 구독 찾기, 구독 추적기, 자동 결제 취소, 멤버십 해지, 구독 매니저',
	hero_eyebrow: '구독 해지 · 정기 결제 중단',
	hero_headline_1: '어떤 구독이든 즉시 해지 —',
	hero_headline_2: '당신의 돈을 빼가는 것을 찾으세요',
	hero_headline_3: '',
	hero_sub: '평균적인 미국인은 잊어버린 구독에 월 $219를 낭비합니다. CancelKits가 찾아서 해지를 도와드립니다.',
	cta_button: '내 구독 찾기 →',
	email_placeholder: 'you@example.com',
	reassurance: '신용카드 불필요. 30초 무료 구독 진단.',
	hero_stat_wasted: '잊은 구독에 낭비되는 평균 금액',
	hero_stat_guides: '검증된 해지 가이드',
	hero_stat_scan: '무료 구독 스캔',
	features_eyebrow: '기능',
	features_title: '실제로 해지까지 해주는 구독 관리 도구',
	features_lede: 'CancelKits는 모든 정기 결제를 한눈에 보여주고, 불필요한 구독을 해지할 수 있는 도구를 제공합니다.',
	feature_smart_scan_title: '스마트 스캔',
	feature_smart_scan_desc: '받은편지함에 숨어있는 모든 정기 결제를 자동으로 찾습니다. 수동 입력이 필요 없습니다.',
	feature_one_click_title: '원클릭 해지',
	feature_one_click_desc: '불필요한 구독을 클릭 한 번으로 해지하세요. 해지 과정을 대행합니다.',
	feature_renewal_title: '갱신 알림',
	feature_renewal_desc: '구독 갱신 7일 전에 알림을 받으세요.',
	feature_savings_title: '절약 대시보드',
	feature_savings_desc: '매달 얼마나 절약하고 있는지 시각적 보고서와 트렌드로 정확하게 추적하세요.',
	feature_privacy_title: '개인정보 보호 우선',
	feature_privacy_desc: '이메일 읽기 전용 접근. 256비트 암호화. 비밀번호를 저장하지 않습니다.',
	feature_multi_title: '멀티 계정',
	feature_multi_desc: 'Gmail, Outlook 등을 연결하세요. 모든 계정의 구독을 한곳에서 확인하세요.',
	how_eyebrow: '구독 해지 방법',
	how_title: 'CancelKits가 구독을 찾고 해지하는 방법',
	step1_title: '30초 만에 이메일 연결',
	step1_desc: 'CancelKits가 받은편지함에서 구독 영수증을 스캔합니다. 읽기 전용 — 이메일을 보내거나 변경하지 않습니다.',
	step2_title: '모든 정기 결제를 하나의 대시보드에서 확인',
	step2_desc: '구독 전체 현황이 몇 초 만에 표시됩니다 — 모든 요금, 갱신일, 월별 총 지출.',
	step3_title: '원클릭으로 구독 해지',
	step3_desc: '필요 없는 것은 해지 버튼을 클릭하세요. 해지 완료까지 도와드리고 확인을 보내드립니다.',
	pricing_eyebrow: '요금',
	pricing_title: '심플하고 정직한 가격.',
	pricing_subtitle: '단일 요금제. 숨겨진 비용 없음. 언제든 해지 가능.',
	pricing_fine: '트라이얼에 신용카드가 필요하지 않습니다.',
	price_label: '월',
	cta_title: '잊어버린 구독에 돈을 쓰지 마세요.',
	cta_subtitle: '이미 47,000명 이상이 낭비를 멈췄습니다.',
	cta_button_text: '무료로 시작 — 내 구독 찾기 →',
	cta_fine: '신용카드 불필요. 30초 만에 스캔.',
	faq_label: 'FAQ',
	faq_heading: '구독 해지에 관한 자주 묻는 질문',
	faq_subtitle: 'CancelKits와 정기 결제 중단에 대해 알아야 할 모든 것.',
	faq_contact: '문의하기 →',
	faq_still: '아직 궁금한 점이 있으신가요?',
	faq_talk: '문의하기 →',
	nav_how: '사용 방법',
	nav_pricing: '요금',
	nav_signin: '로그인',
	nav_start: '무료로 시작',
};

// ────────────────────────────────────────────────────────────────────────────
// 🇮🇹 Italiano
// ────────────────────────────────────────────────────────────────────────────
const it: Translation = {
	meta_title: 'CancelKits — Cancella abbonamenti e ferma gli addebiti ricorrenti',
	meta_description: 'CancelKits trova ogni abbonamento che prosciuga il tuo denaro e ti aiuta a cancellarlo. Gratis per iniziare, senza carta di credito.',
	meta_keywords: 'cancellare abbonamenti, disdire abbonamento, come cancellare un abbonamento, fermare addebiti ricorrenti, trovare abbonamenti dimenticati, gestore abbonamenti, annullare abbonamento, disattivare abbonamento, gestione abbonamenti',
	hero_eyebrow: 'CANCELLARE ABBONAMENTI · FERMARE GLI ADDEBITI',
	hero_headline_1: 'Cancella qualsiasi abbonamento —',
	hero_headline_2: 'scopri cosa ti sta prosciugando',
	hero_headline_3: '',
	hero_sub: "L'americano medio spreca 219 $/mese in abbonamenti dimenticati. CancelKits li trova e ti aiuta a cancellarli.",
	cta_button: 'Trova i miei abbonamenti →',
	email_placeholder: 'tu@esempio.com',
	reassurance: 'Senza carta. Audit gratuito in 30 secondi.',
	hero_stat_wasted: 'sprecati in abbonamenti dimenticati',
	hero_stat_guides: 'guide di cancellazione verificate',
	hero_stat_scan: 'scansione abbonamenti gratuita',
	features_eyebrow: 'FUNZIONALITÀ',
	features_title: 'Il gestore di abbonamenti che cancella davvero',
	features_lede: "CancelKits offre visibilità completa su ogni addebito ricorrente e gli strumenti per cancellare ciò che non ti serve.",
	feature_smart_scan_title: 'Scansione intelligente',
	feature_smart_scan_desc: 'Trova automaticamente ogni addebito ricorrente nascosto nella tua casella di posta. Nessun inserimento manuale.',
	feature_one_click_title: 'Cancellazione con un clic',
	feature_one_click_desc: 'Cancella gli abbonamenti indesiderati con un solo clic. Gestiamo noi il processo di cancellazione.',
	feature_renewal_title: 'Avvisi di rinnovo',
	feature_renewal_desc: 'Ricevi una notifica 7 giorni prima del rinnovo di qualsiasi abbonamento.',
	feature_savings_title: 'Dashboard dei risparmi',
	feature_savings_desc: 'Monitora esattamente quanto risparmi mese dopo mese con report visivi e tendenze.',
	feature_privacy_title: 'Privacy al primo posto',
	feature_privacy_desc: 'Accesso email in sola lettura. Crittografia a 256 bit. Non memorizziamo mai la tua password.',
	feature_multi_title: 'Multi-account',
	feature_multi_desc: 'Collega Gmail, Outlook e altri. Vedi tutti i tuoi abbonamenti da ogni account in un unico posto.',
	how_eyebrow: 'COME CANCELLARE GLI ABBONAMENTI',
	how_title: 'Come CancelKits trova e cancella i tuoi abbonamenti',
	step1_title: 'Collega la tua email in 30 secondi',
	step1_desc: 'CancelKits scansiona la tua casella di posta per ricevute di abbonamenti. Accesso in sola lettura — non inviamo email né modifichiamo nulla.',
	step2_title: 'Vedi ogni addebito ricorrente in un\'unica dashboard',
	step2_desc: 'La mappa completa dei tuoi abbonamenti in pochi secondi: ogni costo, date di rinnovo e spesa mensile totale.',
	step3_title: 'Cancella gli abbonamenti con un clic',
	step3_desc: 'Clicca per cancellare ciò che non ti serve. Ti aiutiamo a completare la cancellazione con conferma.',
	pricing_eyebrow: 'PREZZI',
	pricing_title: 'Prezzi semplici e onesti.',
	pricing_subtitle: 'Un solo piano. Nessun costo nascosto. Cancella quando vuoi.',
	pricing_fine: 'Nessuna carta di credito richiesta per la prova.',
	price_label: 'al mese',
	cta_title: 'Smetti di pagare abbonamenti che hai dimenticato.',
	cta_subtitle: 'Unisciti a oltre 47.000 persone che hanno già fermato lo spreco.',
	cta_button_text: 'Inizia gratis — trova i miei abbonamenti →',
	cta_fine: 'Nessuna carta richiesta. Scansione in 30 secondi.',
	faq_label: 'FAQ',
	faq_heading: 'Domande frequenti sulla cancellazione degli abbonamenti',
	faq_subtitle: 'Tutto quello che devi sapere su CancelKits e come fermare gli addebiti ricorrenti.',
	faq_contact: 'Contattaci →',
	faq_still: 'Hai ancora una domanda?',
	faq_talk: 'Parlaci →',
	nav_how: 'Come funziona',
	nav_pricing: 'Prezzi',
	nav_signin: 'Accedi',
	nav_start: 'Inizia gratis',
};

// ── Export ──
export const translations: Record<Locale, Translation> = { en, es, fr, de, pt, ja, ko, it };
export type { Translation };
