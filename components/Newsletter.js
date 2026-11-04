"use client";
import { useState } from "react";
import { GoogleG, TrustpilotStar } from "@/components/icons";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <div className="bg-navy text-white">
      <div className="mx-auto max-w-wrap px-5 py-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 flex-1">
          <h3 className="font-display font-bold text-white text-[1.3rem] flex items-center gap-2.5 shrink-0">
            <span aria-hidden>✉️</span> Moving Tips Straight to Your Inbox
          </h3>
          {done ? (
            <span className="text-white font-semibold">Thanks — you&apos;re on the list! ✓</span>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-md sm:ml-auto"
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 px-4 py-3 rounded-xl text-ink min-w-0"
              />
              <button type="submit" className="bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.trustpilot.com/review/vanhero.online"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3.5 py-2 text-[.82rem] font-bold transition"
          >
            <TrustpilotStar className="w-4 h-4" /> Trustpilot
          </a>
          <a
            href="https://www.google.com/search?q=Van+Hero+Coventry+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3.5 py-2 text-[.82rem] font-bold transition"
          >
            <GoogleG className="w-4 h-4" /> Google Reviews
          </a>
        </div>
      </div>
    </div>
  );
}
