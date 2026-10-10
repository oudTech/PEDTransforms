"use client";

import Link from "next/link";
import { ChevronDown, CircleCheck } from "lucide-react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { defaultDialCode, dialCodes, flagEmoji } from "@/data/dial-codes";
import type { ServiceMenu } from "@/data/services";
import { submitContact, type ContactField, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

const fieldBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none transition placeholder:text-[#9a9a9a] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15";

export function ContactFormWithParams({ menu }: { menu: ServiceMenu }) {
  const requested = useSearchParams().get("service");
  const service =
    requested && menu.some((category) => category.services.some((item) => item.slug === requested))
      ? requested
      : "general";
  return <ContactForm menu={menu} defaultService={service} />;
}

export default function ContactForm({
  menu,
  defaultService = "general",
}: {
  menu: ServiceMenu;
  defaultService?: string;
}) {
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
      <div
        role="status"
        className="flex flex-col items-start rounded-2xl border border-black/[0.06] bg-[#fafafa] p-6 sm:p-8"
      >
        <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CircleCheck aria-hidden className="size-5" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-[#1a1a1a]">Message sent</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[#555]">{state.message}</p>
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
    className: `${fieldBase} ${errors[field] ? "border-[var(--brand)]" : "border-black/10"}`,
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
      className="space-y-5 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-5 sm:p-8"
    >
      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[var(--brand-dark)]">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        <Field id="firstName" label="First name" required error={fieldError("firstName")}>
          <input
            {...fieldProps("firstName")}
            type="text"
            autoComplete="given-name"
            required
            maxLength={60}
            placeholder="First name"
          />
        </Field>
        <Field id="lastName" label="Last name" required error={fieldError("lastName")}>
          <input
            {...fieldProps("lastName")}
            type="text"
            autoComplete="family-name"
            required
            maxLength={60}
            placeholder="Last name"
          />
        </Field>
      </div>

      <Field id="email" label="Work email" required error={fieldError("email")}>
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@company.com"
        />
      </Field>

      <Field id="phone" label="Phone number" error={fieldError("phoneCountry") ?? fieldError("phone")}>
        <PhoneInput
          key={value("phoneCountry") ?? defaultDialCode}
          country={value("phoneCountry") ?? defaultDialCode}
          inputProps={fieldProps("phone")}
          invalid={Boolean(errors.phone || errors.phoneCountry)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Organisation" error={fieldError("company")}>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            maxLength={120}
            placeholder="Company name"
          />
        </Field>
        <Field id="service" label="What can we help with?" error={fieldError("service")}>
          <div className="relative">
            <select
              {...fieldProps("service")}
              defaultValue={value("service") ?? defaultService}
              className={`${fieldProps("service").className} appearance-none pr-10`}
            >
              <option value="general">General enquiry</option>
              {menu.map((category) => (
                <optgroup key={category.id} label={category.title}>
                  {category.services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#777]"
            />
          </div>
        </Field>
      </div>

      <Field id="message" label="Message" required error={fieldError("message")}>
        <textarea
          {...fieldProps("message")}
          rows={5}
          required
          minLength={20}
          maxLength={5000}
          placeholder="Tell us what you want to achieve, your current setup and any timelines."
          className={`${fieldProps("message").className} resize-y`}
        />
      </Field>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row-reverse sm:items-center sm:justify-end sm:gap-5">
        <p className="text-xs leading-relaxed text-[#777]">
          We use your details only to respond to this enquiry. See our{" "}
          <Link href="/privacy-policy" className="font-medium text-[var(--brand)] underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(189,0,0,0.6)] transition hover:bg-[var(--brand-dark)] disabled:cursor-wait disabled:opacity-70 max-sm:w-full"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-1.5 block text-sm font-medium text-[#333]">
        {label}
        {required && <span className="text-[var(--brand)]">*</span>}
      </label>
      {children}
      {error}
    </div>
  );
}

function PhoneInput({
  country: initialCountry,
  inputProps,
  invalid,
}: {
  country: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  invalid: boolean;
}) {
  const [country, setCountry] = useState(initialCountry);
  const selected = dialCodes.find((item) => item.iso === country) ?? dialCodes[0];

  return (
    <div
      className={`flex rounded-lg border bg-white transition focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]/15 ${
        invalid ? "border-[var(--brand)]" : "border-black/10"
      }`}
    >
      <div className="relative flex shrink-0 items-center gap-1.5 border-r border-black/10 pl-3.5 pr-2.5 text-[15px] text-[#1a1a1a]">
        <span aria-hidden className="text-base leading-none">
          {flagEmoji(selected.iso)}
        </span>
        <span aria-hidden>{selected.code}</span>
        <ChevronDown aria-hidden className="size-4 text-[#777]" />
        <select
          id="contact-phoneCountry"
          name="phoneCountry"
          defaultValue={initialCountry}
          onChange={(event) => setCountry(event.target.value)}
          aria-label="Country code"
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {dialCodes.map((item) => (
            <option key={item.iso} value={item.iso}>
              {item.country} ({item.code})
            </option>
          ))}
        </select>
      </div>
      <input
        {...inputProps}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        maxLength={30}
        placeholder="706 523 9083"
        className="min-w-0 flex-1 rounded-r-lg bg-transparent px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none placeholder:text-[#9a9a9a]"
      />
    </div>
  );
}
