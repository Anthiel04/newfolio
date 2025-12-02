"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const t = useTranslations("contact");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative p-2 flex flex-col items-center justify-center w-full min-h-screen py-20 bg-bg text-primary dark:bg-bg-dark dark:text-text-dark"
    >
      <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>

      {/* Social Links */}
      <div className="flex gap-6 mb-12 text-3xl">
        <a
          href="https://github.com/Anthiel04"
          target="_blank"
          aria-label="GitHub"
          className="hover:text-accent transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/richard-william-moreira-hernández-9141b52ab "
          target="_blank"
          aria-label="LinkedIn"
          className="hover:text-accent transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://t.me/reinstalador"
          target="_blank"
          aria-label="Telegram"
          className="hover:text-accent transition-colors"
        >
          <FaTelegram />
        </a>
      </div>

      {/* Telegram Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder={t("name")}
          required
          className="px-4 py-2 border border-muted rounded-md bg-bg text-primary dark:bg-bg-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <textarea
          name="message"
          placeholder={t("message")}
          required
          rows={5}
          className="px-4 py-2 border border-muted rounded-md bg-bg text-primary dark:bg-bg-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <h3 className="text-center">PD: Email | Social</h3>
        <button
          type="submit"
          className="px-12 py-2 m-auto bg-overlay text-bg rounded-md font-medium hover:opacity-90 hover:scale-105 active:scale-90 transition"
          disabled={status === "sending"}
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>
        {status === "sent" && (
          <p className="text-sm text-accent mt-2">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500 mt-2">{t("error")}</p>
        )}
      </form>
    </section>
  );
};
