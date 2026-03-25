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
        msg = MIMEText(f"Новый подписчик на дропы SSW:\n{email}", "plain", "utf-8")
        msg["Subject"] = "SSW — новый подписчик"
        msg["From"] = OWNER_EMAIL
        msg["To"] = OWNER_EMAIL

        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
            server.login(OWNER_EMAIL, os.environ["SMTP_PASSWORD"])
            server.sendmail(OWNER_EMAIL, OWNER_EMAIL, msg.as_string())
    except Exception:
        pass

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}
