import { Resend } from "resend";
var resend = new Resend("re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
var EMAIL_DEFAULTS = {
	from: "CancelKits <hello@cancelkits.com>",
	replyTo: "support@cancelkits.com"
};
//#endregion
//#region src/lib/emails/layout.ts
var SITE_URL = "https://cancelkits.com";
function emailLayout(body, options = {}) {
	const { preheader = "", userId, email } = options;
	const unsubLink = `${SITE_URL}/unsubscribe?token=${userId || encodeURIComponent(email || "")}`;
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>CancelKits</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ffffff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <!-- Preheader (hidden inbox preview text) -->
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}${"&nbsp;".repeat(80)}</div>` : ""}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding:40px 16px 24px;">

        <!-- Logo -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:32px;">
              <a href="${SITE_URL}" style="text-decoration:none;display:inline-flex;align-items:center;">
                <span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;border-radius:7px;background-color:#00ff88;color:#000000;font-family:'Geist',sans-serif;font-size:13px;font-weight:700;">C</span>
                <span style="margin-left:8px;font-family:'Geist',sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.04em;color:#ffffff;">Cancel<span style="color:#00ff88;">Kits</span></span>
              </a>
            </td>
          </tr>
        </table>

        <!-- Content Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;">
          <tr>
            <td style="padding:36px 32px 40px;">
              ${body}
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td style="padding:28px 0 0;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#555555;">
                CancelKits · Cancel subscriptions you forgot about
              </p>
              <p style="margin:0 0 6px;font-size:12px;color:#555555;">
                <a href="${SITE_URL}/dashboard" style="color:#888888;text-decoration:underline;">Dashboard</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}/account" style="color:#888888;text-decoration:underline;">Account</a>
                &nbsp;·&nbsp;
                <a href="${unsubLink}" style="color:#888888;text-decoration:underline;">Unsubscribe</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#444444;">
                © ${year} CancelKits. You received this email because you have a CancelKits account.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
var styles = {
	h1: "margin:0 0 8px;font-family:\"Geist\",\"Inter\",sans-serif;font-size:28px;font-weight:700;letter-spacing:-0.03em;line-height:1.2;color:#ffffff;",
	h2: "margin:0 0 6px;font-family:\"Geist\",\"Inter\",sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.02em;line-height:1.3;color:#ffffff;",
	body: "margin:0 0 16px;font-size:15px;line-height:1.6;color:#cccccc;",
	muted: "margin:0 0 16px;font-size:14px;line-height:1.5;color:#888888;",
	small: "margin:0;font-size:12px;line-height:1.4;color:#666666;",
	accent: "color:#00ff88;",
	danger: "color:#ff4444;",
	ctaButton: "display:inline-block;padding:14px 28px;border-radius:100px;background-color:#00ff88;color:#000000;font-size:15px;font-weight:700;text-decoration:none;text-align:center;",
	ctaButtonOutline: "display:inline-block;padding:12px 24px;border-radius:100px;border:1px solid #2a2a2a;background-color:#111111;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;text-align:center;",
	card: "padding:20px 24px;border-radius:12px;border:1px solid #1a1a1a;background-color:#111111;",
	divider: "border:none;border-top:1px solid #1a1a1a;margin:24px 0;",
	badge: "display:inline-block;padding:4px 10px;border-radius:100px;font-size:12px;font-weight:600;",
	badgeAccent: "display:inline-block;padding:4px 10px;border-radius:100px;font-size:12px;font-weight:600;background-color:rgba(0,255,136,0.15);color:#00ff88;border:1px solid rgba(0,255,136,0.3);",
	badgeDanger: "display:inline-block;padding:4px 10px;border-radius:100px;font-size:12px;font-weight:600;background-color:rgba(255,68,68,0.15);color:#ff4444;border:1px solid rgba(255,68,68,0.3);"
};
var SITE = SITE_URL;
//#endregion
export { resend as a, EMAIL_DEFAULTS as i, emailLayout as n, styles as r, SITE as t };
