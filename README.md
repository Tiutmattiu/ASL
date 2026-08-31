# ASL research booking

Mobile booking page for the study **Consistency of arterial spin labelling imaging across field strengths**.

## Setup

Google Sheet: `1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw` (`Sheet1`)
Apps Script project: `1WmEw8vYHLvqwQoZKdmq3vjwwZOt0IHKBgsb-FxuZkRSeY-m1X7NXpPeW`

1. Open the Apps Script project and copy in [`apps-script/Code.gs`](apps-script/Code.gs) and [`apps-script/appsscript.json`](apps-script/appsscript.json), or run `clasp push` inside `apps-script` if already signed in.
2. Run `setupBookingSheet()` once. Correct any existing `#ERROR!` phone cells manually because their original digits cannot be recovered safely.
3. Optionally run `sanityCheck()`; it should report 28 unique slots.
4. Select **Deploy → New deployment → Web app**. Execute as **Me** and allow access to **Anyone**.
5. Copy the `/exec` Web App URL into `WEB_APP_URL` in [`config.js`](config.js). Add the two official contact numbers there when available.
6. Set the Apps Script project and spreadsheet timezone to `Asia/Hong_Kong`.
7. In GitHub, open **Settings → Pages**, deploy from the `main` branch and root folder.

The public repository contains no participant list. Names and phone numbers remain in the private Google Sheet.
