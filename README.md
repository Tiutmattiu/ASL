# ASL research booking

Mobile booking page for the study **Consistency of arterial spin labelling imaging across field strengths**.

## Setup

Google Sheet: `1vFz76kLDM2uFeVgIUkN9cHv6cwQ1e_DJnvVDzhOr0qw` (`Sheet1`)
Apps Script project: `1WmEw8vYHLvqwQoZKdmq3vjwwZOt0IHKBgsb-FxuZkRSeY-m1X7NXpPeW`

1. Open the Apps Script project and copy in [`apps-script/Code.gs`](apps-script/Code.gs) and [`apps-script/appsscript.json`](apps-script/appsscript.json), or run `clasp push` inside `apps-script` if already signed in.
2. Run `setupBookingSheet()` once. It preserves participant rows and adds the booking/incentive headers through column T. Correct any existing `#ERROR!` phone cells manually because their original digits cannot be recovered safely.
3. Run `addTestParticipant()` once to add the safe `00000000 / test` row, then optionally run `sanityCheck()`.
4. Select **Deploy → Manage deployments**, edit the existing Web app, choose **New version**, and deploy. Execute as **Me** and allow access to **Anyone**.
5. Keep the existing `/exec` Web App URL in [`config.js`](config.js). Add the two official contact numbers there when available.
6. Set the Apps Script project and spreadsheet timezone to `Asia/Hong_Kong`.
7. In GitHub, open **Settings → Pages**, deploy from the `main` branch and root folder.

The public repository contains no participant list. Names and phone numbers remain in the private Google Sheet.

Staff-only Apps Script helpers include `resetTestParticipant()`, `markScanCompleted(phone, site)`, `markIncentivePaid(phone)`, and `getReminderText(phone, hours, language)`. They are not exposed by the public web endpoint.
