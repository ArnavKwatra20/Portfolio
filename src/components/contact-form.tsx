"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

type ContactFormProps = {
  emailAddress?: string;
};

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: FormValues = { name: "", email: "", message: "" };

export default function ContactForm({ emailAddress }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validate = (formValues: FormValues) => {
    const nextErrors: Partial<FormValues> = {};
    if (!formValues.name.trim()) nextErrors.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (formValues.message.trim().length < 12) {
      nextErrors.message = "A little more detail would help (12 characters min).";
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setNotice("");

    if (Object.keys(nextErrors).length) {
      setSubmitted(false);
      return;
    }

    if (!emailAddress) {
      setNotice(
        "Your message is ready. Add NEXT_PUBLIC_CONTACT_EMAIL to enable delivery before publishing.",
      );
      setSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`,
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setNotice("Your email app is opening with your message ready to send.");
    setValues(initialValues);
  };

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    setNotice("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="contact-name">Your name</label>
        <input
          autoComplete="name"
          id="contact-name"
          name="name"
          onChange={(event) => updateField("name", event.target.value)}
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <span className="form-error" id="contact-name-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email address</label>
        <input
          autoComplete="email"
          id="contact-email"
          name="email"
          onChange={(event) => updateField("email", event.target.value)}
          type="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <span className="form-error" id="contact-email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">A little about your project</label>
        <textarea
          id="contact-message"
          name="message"
          onChange={(event) => updateField("message", event.target.value)}
          rows={3}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        {errors.message && (
          <span className="form-error" id="contact-message-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>
      <div className="contact-form__bottom">
        <p className="form-notice" role="status" aria-live="polite">
          {submitted && <Check size={14} aria-hidden="true" />}
          {notice}
        </p>
        <button className="button button--primary" type="submit">
          Send an enquiry
          <ArrowUpRight size={15} strokeWidth={1.6} />
        </button>
      </div>
    </form>
  );
}
