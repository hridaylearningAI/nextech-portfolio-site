"use client";

import { Arrow } from "./ui";
import { useFormSubmit } from "./use-form-submit";

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-text-1 transition-colors placeholder:text-text-2/70 hover:border-text-2/40 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

/** Areas we hire into. "Other" keeps the form open to anyone else. */
export const ROLES = [
  "Sales & Business Development",
  "Technical Sales Engineering",
  "Procurement & Sourcing",
  "Logistics & Warehousing",
  "Projects & Engineering",
  "Finance & Administration",
  "Internship",
  "Other",
] as const;

const TEXT_FIELDS = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
    required: true,
    wide: false,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
    required: true,
    wide: false,
  },
  {
    name: "contact",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+971 …",
    required: false,
    wide: false,
  },
  {
    name: "experience",
    label: "Years of experience",
    type: "text",
    autoComplete: "off",
    placeholder: "e.g. 6 years in valve sales",
    required: false,
    wide: false,
  },
  {
    name: "location",
    label: "Where you are based",
    type: "text",
    autoComplete: "address-level2",
    placeholder: "City, country",
    required: false,
    wide: false,
  },
  {
    name: "cv",
    label: "Link to your CV",
    type: "text",
    autoComplete: "url",
    placeholder: "Drive, Dropbox or LinkedIn link",
    required: false,
    wide: false,
  },
] as const;

export default function CareersForm() {
  const { status, error, onSubmit } = useFormSubmit("careers");

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[18px] border border-line bg-surface-2 p-8 shadow-sm"
      >
        <p className="text-lg font-semibold text-text-1">
          Thank you — your application is in.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-text-2">
          We have emailed you a confirmation. If you have not shared your CV
          yet, reply to that email with it attached and it reaches the same
          team. We read every application and usually respond within five
          working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, (fd) => ({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          contact: String(fd.get("contact") ?? ""),
          role: String(fd.get("role") ?? ""),
          experience: String(fd.get("experience") ?? ""),
          location: String(fd.get("location") ?? ""),
          cv: String(fd.get("cv") ?? ""),
          message: String(fd.get("message") ?? ""),
        }))
      }
    >
      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-text-1">
            Role you are applying for
            <span aria-hidden className="text-brand">
              {" "}
              *
            </span>
          </span>
          <select
            required
            name="role"
            defaultValue=""
            className={`${fieldClass} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 [background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2016%2016%27%20fill%3D%27none%27%20stroke%3D%27%2362666c%27%20stroke-width%3D%271.5%27%3E%3Cpath%20d%3D%27M4%206l4%204%204-4%27%2F%3E%3C%2Fsvg%3E")]`}
          >
            <option value="" disabled>
              Select an area
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {TEXT_FIELDS.map(
          ({
            name,
            label,
            type,
            autoComplete,
            placeholder,
            required,
            wide,
          }) => (
            <label
              key={name}
              className={`block ${wide ? "sm:col-span-2" : ""}`}
            >
              <span className="text-xs font-medium text-text-1">
                {label}
                {required && (
                  <span aria-hidden className="text-brand">
                    {" "}
                    *
                  </span>
                )}
              </span>
              <input
                name={name}
                type={type}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={fieldClass}
              />
            </label>
          ),
        )}

        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-text-1">
            Tell us about yourself
            <span className="text-text-2"> (optional)</span>
          </span>
          <textarea
            name="message"
            rows={5}
            placeholder="The work you have done, the sectors you know, and what you are looking for next"
            className={`${fieldClass} resize-y`}
          />
        </label>
      </div>

      {status === "error" && error && (
        <p role="alert" className="mt-5 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-text-2">
          Prefer email? Send your CV to{" "}
          <a
            href="mailto:info@nextechgt.ae"
            className="font-medium text-text-1 underline decoration-line underline-offset-2 hover:text-brand"
          >
            info@nextechgt.ae
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-3 btn bg-brand px-6 py-3.5 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit application"}
          <Arrow />
        </button>
      </div>
    </form>
  );
}
