import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_BASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, payload } = req.body;

    if (!email || !payload) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const answeredAt = new Date(payload.answeredAt).toLocaleString("ja-JP");

    await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `心の三層構造インテグラル <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "心の三層構造インテグラル｜診断結果",
      text: `
診断結果をお届けします。

回答日時：${answeredAt}
      `,
      html: `
        <h2>心の三層構造インテグラル｜診断結果</h2>
        <p>回答日時：${answeredAt}</p>
        <p>このメールは診断完了時に自動送信されています。</p>
        <hr />
        <pre style="font-size:12px; white-space:pre-wrap;">
${JSON.stringify(payload.answers, null, 2)}
        </pre>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Mailgun send error:", e);
    return res.status(500).json({ error: "Send failed" });
  }
}
