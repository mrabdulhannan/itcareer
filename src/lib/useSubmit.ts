import { useState, type FormEvent } from "react";
import { enquiryLink, type Channel, type Enquiry } from "./send";
import type { FieldErrors } from "./validate";

export type SubmitStatus = { kind: "idle" } | { kind: "done"; channel: Channel; href: string } | { kind: "error"; message: string };

/** The channel picked by the button that submitted the form (`name="channel"`), defaulting to WhatsApp. */
export function submittedChannel(event: FormEvent<HTMLFormElement>): Channel {
  const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
  return submitter?.value === "email" ? "email" : "whatsapp";
}

/** Validates a form and, when it's valid, opens WhatsApp or the email app with the details filled in. */
export function useEnquiryForm() {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function submit(errors: FieldErrors, enquiry: Enquiry, channel: Channel) {
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      return;
    }
    const href = enquiryLink(enquiry, channel);
    if (channel === "email") window.location.href = href;
    else window.open(href, "_blank", "noopener");
    setStatus({ kind: "done", channel, href });
  }

  return { status, fieldErrors, submit, reset: () => setStatus({ kind: "idle" }) };
}
