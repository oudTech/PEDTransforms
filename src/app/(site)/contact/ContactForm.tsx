"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import Turnstile, { type TurnstileHandle } from "@/components/Turnstile";
import { defaultDialCode, dialCodes, flagEmoji } from "@/data/dial-codes";
import type { ServiceMenu } from "@/data/services";
import { submitContact, type ContactField, type ContactState } from "./actions";
import SuccessDialog from "./SuccessDialog";

const initialState: ContactState = { status: "idle", message: "" };

const fields: ContactField[] = [
  "firstName",
  "lastName",
  "email",
  "company",
  "phoneCountry",
  "phone",
  "service",
  "message",
];

const fieldBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#1a1a1a] outline-none transition placeholder:text-[#9a9a9a] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/15";

type ContactFormProps = {
  menu: ServiceMenu;
  defaultService?: string;
  /** Cloudflare Turnstile site key; the bot check is skipped when absent. */
  turnstileSiteKey?: string;
};

export function ContactFormWithParams(props: Omit<ContactFormProps, "defaultService">) {
  const requested = useSearchParams().get("service");
  const service =
    requested && props.menu.some((category) => category.services.some((item) => item.slug === requested))
      ? requested
      : "general";
  return <ContactForm {...props} defaultService={service} />;
}

export default function ContactForm({ menu, defaultService = "general", turnstileSiteKey }: ContactFormProps) {
  const startedAt = useRef(0);
  const turnstile = useRef<TurnstileHandle>(null);
  const [state, formAction, pending] = useActionState(
    async (previous: ContactState, formData: FormData): Promise<ContactState> => {
      if (turnstileSiteKey && !formData.get("cf-turnstile-response")) {
        return {
          status: "error",
          message: "We're still checking that you're not a robot. Please wait a moment and send again.",
          values: Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")])),
        };
      }
      formData.set("startedAt", String(startedAt.current));
      const result = await submitContact(previous, formData);
      if (result.status === "success") startedAt.current = Date.now();
      else turnstile.current?.reset();
      return result;
    },
    initialState,
  );
  const [dismissed, setDismissed] = useState<string>();
  const submission = state.status === "success" ? state.submission : undefined;
  const closeDialog = useCallback(() => setDismissed(submission?.id), [submission?.id]);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

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
    <>
      <form
        key={submission?.id ?? "contact"}
        action={formAction}
        noValidate
        className="relative min-w-0 space-y-5 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-5 sm:p-8"
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

        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
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
                className={`${fieldProps("service").className} min-w-0 appearance-none truncate pr-10`}
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

        {turnstileSiteKey && <Turnstile ref={turnstile} siteKey={turnstileSiteKey} action="contact" />}

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
      <SuccessDialog
        open={Boolean(submission) && submission?.id !== dismissed}
        firstName={submission?.firstName}
        email={submission?.email}
        onClose={closeDialog}
      />
    </>
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
    <div className="min-w-0">
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
