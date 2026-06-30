export const sendTelegramNotification = async () => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return;
  }

  const text = `
❤️ Romantic Website Opened

🕐 Time: ${new Date().toLocaleString()}
🌐 Language: ${navigator.language}
📱 Screen: ${screen.width}x${screen.height}
🖥️ Platform: ${navigator.platform}
🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
🔗 URL: ${window.location.href}
↩️ Referrer: ${document.referrer || "direct"}
📋 User Agent: ${navigator.userAgent}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
  } catch {
    // Notification must never block the romantic experience.
  }
};

export const sendTelegramAnswer = async (answer: string) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return;
  }

  const text = `
💌 Dinara answer

🕐 Time: ${new Date().toLocaleString()}
🔗 URL: ${window.location.href}

Answer:
${answer}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });
  } catch {
    // The form should stay gentle even if Telegram is unavailable.
  }
};
