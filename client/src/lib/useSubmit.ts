import { useState } from "react";
import type { ApiResult } from "./api";

export type SubmitStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; message: string }
  | { kind: "error"; message: string };

/** Tracks a form submission's status and per-field errors returned by the API. */
export function useSubmit<T>(send: (input: T) => Promise<ApiResult>) {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(input: T) {
    setStatus({ kind: "sending" });
    setFieldErrors({});
    const result = await send(input);
    if (result.ok) {
      setStatus({ kind: "done", message: result.message ?? "Thank you!" });
    } else {
      setFieldErrors(result.fields ?? {});
      setStatus({ kind: "error", message: result.error ?? "Something went wrong. Please try again." });
    }
  }

  return { status, fieldErrors, submit, reset: () => setStatus({ kind: "idle" }) };
}
