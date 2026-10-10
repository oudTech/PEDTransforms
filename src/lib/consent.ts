"use client";

import { useSyncExternalStore } from "react";

export type ConsentChoice = "accepted" | "rejected";

/** Strictly necessary cookie that records the visitor's choice. */
export const CONSENT_COOKIE = "ped_cookie_consent";
/** Bump when the cookie policy changes materially, so visitors are asked again. */
const CONSENT_VERSION = "1";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
const CHANGE_EVENT = "ped:consent-change";
const OPEN_EVENT = "ped:consent-open";

function readConsent(): ConsentChoice | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!match) return null;
  const [version, choice] = decodeURIComponent(match[1]).split(".");
  if (version !== CONSENT_VERSION) return null;
  return choice === "accepted" || choice === "rejected" ? choice : null;
}

export function setConsent(choice: ConsentChoice) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${CONSENT_VERSION}.${choice}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  // Rejecting through the banner or Cookie settings also withdraws chat-only consent.
  if (choice === "rejected") sessionStorage.removeItem(CHAT_CONSENT_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Consent given only for live chat, by choosing "Start chat" in the chat prompt.
 * Kept for the browser session so the conversation survives page reloads.
 */
const CHAT_CONSENT_KEY = "ped_chat_consent";

function readChatConsent() {
  return sessionStorage.getItem(CHAT_CONSENT_KEY) === CONSENT_VERSION;
}

export function grantChatConsent() {
  sessionStorage.setItem(CHAT_CONSENT_KEY, CONSENT_VERSION);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** `undefined` during server render and hydration. */
export function useChatConsent(): boolean | undefined {
  return useSyncExternalStore(subscribe, readChatConsent, () => undefined);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

/**
 * The visitor's stored choice. `undefined` during server render and hydration,
 * `null` when no valid choice has been made yet.
 */
export function useConsent(): ConsentChoice | null | undefined {
  return useSyncExternalStore(subscribe, readConsent, () => undefined);
}
