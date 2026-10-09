"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { serviceCategories, servicesInCategory, subServices } from "@/data/services";
import { submitContact, type ContactField, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none transition placeholder:text-[#999] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15";

export function ContactFormWithParams() {
  const requested = useSearchParams().get("service");
  const service =
    requested && subServices.some((item) => item.slug === requested) ? requested : "general";
  return <ContactForm defaultService={service} />;
}

export default function ContactForm({ defaultService = "general" }: { defaultService?: string }) {
  const startedAt = useRef(0);
  const [state, formAction, pending] = useActionState(
    (previous: ContactState, formData: FormData) => {
      formData.set("startedAt", String(startedAt.current));
      return submitContact(previous, formData);
    },
    initialState,
  );

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <h2 className="text-xl font-semibold text-emerald-900">Message sent</h2>
        <p className="mt-2 text-emerald-800">{state.message}</p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const value = (field: ContactField) => state.values?.[field];
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    defaultValue: value(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: `${inputClass} ${errors[field] ? "border-[var(--brand)]" : "border-black/15"}`,
  });
  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-[var(--brand)]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-5 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] sm:p-8"
    >
      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[var(--brand-dark)]">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-[#333]">
            Full name <span className="text-[var(--brand)]">*</span>
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={100} />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-[#333]">
            Work email <span className="text-[var(--brand)]">*</span>
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={254} />
          {fieldError("email")}
        </div>
        <div>
          <label htmlFor="contact-company" className="text-sm font-medium text-[#333]">
            Organisation
          </label>
          <input {...fieldProps("company")} type="text" autoComplete="organization" maxLength={120} />
          {fieldError("company")}
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-[#333]">
            Phone
          </label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={30} />
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="text-sm font-medium text-[#333]">
          What can we help with?
        </label>
        <div className="relative">
          <select
            {...fieldProps("service")}
            defaultValue={value("service") ?? defaultService}
            className={`${fieldProps("service").className} appearance-none pr-10`}
          >
            <option value="general">General enquiry</option>
            {serviceCategories.map((category) => (
              <optgroup key={category.id} label={category.title}>
                {servicesInCategory(category.id).map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 mt-[3px] -translate-y-1/2 text-[#666]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        {fieldError("service")}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-[#333]">
          Your objectives or challenge <span className="text-[var(--brand)]">*</span>
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          required
          minLength={20}
          maxLength={5000}
          placeholder="Briefly describe what you want to achieve, your current setup and any timelines."
        />
        {fieldError("message")}
      </div>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[#777]">
          We use your details only to respond to this enquiry.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-[var(--brand)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
