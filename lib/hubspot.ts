/**
 * HubSpot Forms Submission API (public, unauthenticated — no API key).
 * HubSpot is the source of truth for every form's field set: field `name`s
 * below must match the form definition in HubSpot exactly.
 */

export const HUBSPOT_PORTAL_ID = "22244787";
export const CONTACT_FORM_ID = "b74fe17d-ddca-4e06-ab32-7b306875db88";

export class HubspotSubmitError extends Error {
  /** HubSpot field names HubSpot itself rejected, when it said which. */
  fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "HubspotSubmitError";
    this.fieldErrors = fieldErrors;
  }
}

type HubspotError = { message?: string; errorType?: string };

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** HubSpot messages name the field as `fields.<name>`; pull that out. */
function fieldFromMessage(message: string): string | undefined {
  return message.match(/fields\.([a-z0-9_]+)/i)?.[1];
}

export async function submitHubspotForm(
  formId: string,
  fields: Record<string, string>,
): Promise<void> {
  const hutk = readCookie("hubspotutk");
  const body = {
    fields: Object.entries(fields).map(([name, value]) => ({
      objectTypeId: "0-1",
      name,
      value,
    })),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
      ...(hutk ? { hutk } : {}),
    },
  };

  let res: Response;
  try {
    res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
  } catch {
    throw new HubspotSubmitError(
      "We couldn't reach our servers. Check your connection and try again.",
    );
  }

  if (res.ok) return;

  let errors: HubspotError[] = [];
  try {
    errors = ((await res.json()) as { errors?: HubspotError[] }).errors ?? [];
  } catch {
    // Non-JSON error body — fall through to the generic message.
  }

  const fieldErrors: Record<string, string> = {};
  for (const err of errors) {
    const field = err.message ? fieldFromMessage(err.message) : undefined;
    if (!field) continue;
    fieldErrors[field] =
      err.errorType === "INVALID_EMAIL" || err.errorType === "BLOCKED_EMAIL"
        ? "Enter a valid work email address."
        : "Please check this field.";
  }

  throw new HubspotSubmitError(
    "Something went wrong sending your message. Please try again.",
    fieldErrors,
  );
}
