const UZBEKISTAN_TIMEZONE = "Asia/Tashkent";

const formatUzbekistanTime = () =>
  new Intl.DateTimeFormat("ru-RU", {
    timeZone: UZBEKISTAN_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

const getDeviceType = () => {
  const width = window.innerWidth;

  if (width < 768) {
    return "Телефон";
  }

  if (width < 1024) {
    return "Планшет";
  }

  return "Компьютер";
};

const getApproximateDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("iphone")) {
    return "iPhone";
  }

  if (userAgent.includes("ipad")) {
    return "iPad";
  }

  if (userAgent.includes("samsung")) {
    return "Samsung";
  }

  if (userAgent.includes("xiaomi") || userAgent.includes("redmi")) {
    return "Xiaomi / Redmi";
  }

  if (userAgent.includes("huawei")) {
    return "Huawei";
  }

  if (userAgent.includes("android")) {
    return "Android телефон";
  }

  if (userAgent.includes("windows")) {
    return "Windows компьютер";
  }

  if (userAgent.includes("macintosh") || userAgent.includes("mac os")) {
    return "Mac";
  }

  return "Не удалось точно определить";
};

const getBrowserName = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("edg/")) {
    return "Microsoft Edge";
  }

  if (userAgent.includes("opr/") || userAgent.includes("opera")) {
    return "Opera";
  }

  if (userAgent.includes("firefox")) {
    return "Firefox";
  }

  if (userAgent.includes("chrome") || userAgent.includes("crios")) {
    return "Chrome";
  }

  if (userAgent.includes("safari")) {
    return "Safari";
  }

  return "Не удалось определить";
};

const sendTelegramMessage = async (text: string) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
  } catch {
    // Уведомление не должно мешать открытию сайта.
  }
};

export const sendTelegramNotification = async () => {
  const text = `
❤️ Сайт открыт

🕐 Время (Узбекистан): ${formatUzbekistanTime()}
🌍 Часовой пояс: ${UZBEKISTAN_TIMEZONE}
🗣️ Язык устройства: ${navigator.language}
📱 Тип устройства: ${getDeviceType()}
📲 Примерное устройство: ${getApproximateDevice()}
🌐 Браузер: ${getBrowserName()}
🖼️ Экран: ${screen.width}x${screen.height}
🪟 Размер окна: ${window.innerWidth}x${window.innerHeight}
💻 Платформа: ${navigator.platform}
📶 Интернет: ${navigator.onLine ? "online" : "offline"}
🔗 Ссылка: ${window.location.href}
📍 Страница: ${window.location.pathname}
↩️ Откуда перешел: ${document.referrer || "прямой вход"}
📋 User Agent: ${navigator.userAgent}
  `.trim();

  await sendTelegramMessage(text);
};

export const sendPasswordUnlocked = async () => {
  const text = `
✅ Пароль введен правильно

🕐 Время (Узбекистан): ${formatUzbekistanTime()}
📱 Тип устройства: ${getDeviceType()}
📲 Примерное устройство: ${getApproximateDevice()}
🌐 Браузер: ${getBrowserName()}
🔗 Ссылка: ${window.location.href}
📍 Страница: ${window.location.pathname}
  `.trim();

  await sendTelegramMessage(text);
};

export const sendTelegramAnswer = async (answer: string) => {
  const text = `
💌 Ответ с сайта

🕐 Время (Узбекистан): ${formatUzbekistanTime()}
🔗 Ссылка: ${window.location.href}

Ответ:
${answer}
  `.trim();

  await sendTelegramMessage(text);
};
