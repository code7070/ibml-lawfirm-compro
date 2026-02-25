import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

interface ContactSheetsPayload {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  practice_area?: string;
  message: string;
  form_type?: "contact" | "consultation";
  consultation_channel?: "online" | "offline";
}

/**
 * Forward contact form submission to Google Apps Script (Google Sheets + Email).
 * This is a fire-and-forget proxy — the client doesn't depend on this succeeding.
 * APPS_SCRIPT_URL is kept server-side only (not exposed to browser).
 */
export async function POST(request: NextRequest) {
  try {
    // Validate env
    if (!APPS_SCRIPT_URL) {
      console.error("[contact-sheets] APPS_SCRIPT_URL is not configured");
      return NextResponse.json(
        { success: false, error: "Not configured" },
        { status: 500 },
      );
    }

    // Parse request body
    const body: ContactSheetsPayload = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: name, email, message",
        },
        { status: 400 },
      );
    }

    // Map to Apps Script expected format
    const appsScriptPayload = {
      name: body.name,
      organization: body.organization || "",
      email: body.email,
      phone: body.phone || "",
      message: body.message,
      contact_link: `${process.env.WEB_URL}/contact`,
      practice_area: "-",
      form_type: body.form_type || "contact",
      consultation_channel: body.consultation_channel || "",
    };

    // Submit to Apps Script with 1 silent retry
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appsScriptPayload),
        });

        if (response.ok) {
          return NextResponse.json({ success: true });
        }

        lastError = new Error(
          `Apps Script responded with status ${response.status}`,
        );
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
      }

      // Wait briefly before retry
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Both attempts failed — log but still return 200 to not block anything
    console.error(
      "[contact-sheets] Failed after 2 attempts:",
      lastError?.message,
    );
    return NextResponse.json(
      { success: false, error: "Apps Script submission failed" },
      { status: 200 },
    );
  } catch (err) {
    console.error("[contact-sheets] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 200 },
    );
  }
}
