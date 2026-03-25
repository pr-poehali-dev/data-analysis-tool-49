"""Подписка на дропы SAR SWAGGIN WEAR — сохраняет email в БД и отправляет уведомление на почту."""
import json
import os
import smtplib
import psycopg2
from email.mime.text import MIMEText

OWNER_EMAIL = "pinkyfantasma@yandex.ru"
SMTP_HOST = "smtp.yandex.ru"
SMTP_PORT = 465


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    body = json.loads(event.get("body") or "{}")
    email = body.get("email", "").strip().lower()

    if not email or "@" not in email:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Некорректный email"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id FROM subscribers WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "already": True})}

    cur.execute("INSERT INTO subscribers (email) VALUES (%s)", (email,))
    conn.commit()
    cur.close()
    conn.close()

    try:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(OWNER_EMAIL, os.environ["SMTP_PASSWORD"])

            # Уведомление владельцу
            owner_msg = MIMEText(f"Новый подписчик на дропы SSW:\n{email}", "plain", "utf-8")
            owner_msg["Subject"] = "SSW — новый подписчик"
            owner_msg["From"] = OWNER_EMAIL
            owner_msg["To"] = OWNER_EMAIL
            server.sendmail(OWNER_EMAIL, OWNER_EMAIL, owner_msg.as_string())

            # Приветственное письмо подписчику
            welcome_html = """
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #222;">
          <tr>
            <td style="background:#cc0000;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:48px;font-weight:900;color:#fff;letter-spacing:-2px;">SSW<span style="color:#ff4444;">.</span></h1>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:4px;color:rgba(255,255,255,0.7);text-transform:uppercase;">SAR SWAGGIN WEAR &times; САРАТОВ</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="font-size:15px;line-height:1.8;color:#ccc;margin:0;">Уважаемый покупатель!</p>
              <br/>
              <p style="font-size:15px;line-height:1.8;color:#ccc;margin:0;">Вас приветствует саратовский бренд одежды <strong style="color:#fff;">SAR SWAGGIN WEAR</strong>.</p>
              <br/>
              <p style="font-size:15px;line-height:1.8;color:#ccc;margin:0;">Мы очень рады, что Вы выбрали именно нашу одежду, и мы сделаем всё, чтобы наша одежда была для Вас удобной, красивой и родной!</p>
              <br/>
              <p style="font-size:13px;color:#666;margin:0;">Теперь Вы первым узнаете о новых дропах и коллекциях.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #222;text-align:center;">
              <p style="margin:0;font-size:11px;color:#444;letter-spacing:2px;text-transform:uppercase;">2025 &copy; SAR SWAGGIN WEAR &mdash; Саратов</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""
            welcome_msg = MIMEText(welcome_html, "html", "utf-8")
            welcome_msg["Subject"] = "Добро пожаловать в SAR SWAGGIN WEAR!"
            welcome_msg["From"] = OWNER_EMAIL
            welcome_msg["To"] = email
            server.sendmail(OWNER_EMAIL, email, welcome_msg.as_string())
    except Exception:
        pass

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}