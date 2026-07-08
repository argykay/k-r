# RSVP setup (Google Sheets)

The RSVP form POSTs to a Google Apps Script web app. You run no backend — Google hosts the script and stores rows in a spreadsheet.

## Sheet columns

Row 1 headers:

| Column | Source field |
|--------|----------------|
| Timestamp | Set by script |
| Full Name | `full_name` |
| Email | `email` |
| Attending | `Yes` / `No` |
| Plus One | `Yes` / `No` |
| Plus One Name | If plus one |
| Guest Meal | Guest dietary preference (free text) |
| Plus One Meal | Plus one's dietary preference (free text), if plus one |
| Children | `Yes` / `No` |
| Children Count | Number, if children |
| Kids Meal | `Yes` / `No`, if children |
| Housewarming | `Yes` / `No` — attending path only |
| Wedding Bus | `Yes` / `No` — attending path only (`Yes` = taking the bus, `No` = by car) |
| Locale | `en` / `el` / `lv` — UI language the guest used |

`Attending`, `Plus One`, `Children`, `Kids Meal`, `Housewarming`, and `Wedding Bus` use English `Yes` / `No` in the sheet. Dietary preference fields store free text as entered.

If you already have a sheet from an earlier version:

- **Remove Well Wishes** (formerly after Attending) if present, then redeploy the Apps Script web app.
- Or insert **Housewarming** before **Wedding Bus** and/or **Wedding Bus** before **Locale** as needed for older layouts.

## Deploy Apps Script

1. Create a new Google Sheet and add the header row above.
2. **Extensions → Apps Script** — paste [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment URL.

## Configure the React app

Set the web app URL in environment variables (not committed):

```bash
# .env.development.local
REACT_APP_RSVP_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

For production / GitHub Pages, set the same variable before `npm run build` (e.g. in CI secrets or `.env.production.local`).

## Verify

1. `npm start` → open [http://localhost:3000/rsvp](http://localhost:3000/rsvp)
2. Complete the form (try both attending Yes and No paths).
3. Confirm a new row appears in the sheet.

## Locale URLs

| Language | RSVP URL |
|----------|----------|
| English | `/rsvp` or `/en/rsvp` |
| Greek | `/el/rsvp` |
| Latvian | `/lv/rsvp` |

On GitHub Pages, paths are prefixed with `/k-r/` (see [github-pages.md](./github-pages.md)).
