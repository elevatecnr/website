# ELEVATE website backend (Google Apps Script)

Stores form submissions in a Google Sheet, saves resumes to Google Drive, emails a notification for each submission, and serves the job listings shown on the Careers page.

Do this **in Elevate's Google account**, so that the data and resumes belong to the client.

## One-time setup

1. Create a new Google Sheet called **ELEVATE Website**.
2. **Extensions → Apps Script**. Replace the contents of `Code.gs` with [`Code.gs`](Code.gs) from this folder.
3. Set `NOTIFY_EMAIL` at the top of the file to the address that should receive notifications.
4. In the function dropdown, choose **`setup`** and click **Run**. Approve the permissions (Sheets, Drive, Gmail). This creates the tabs `Enquiries`, `Applications`, `Employer Requirements` and `Jobs`, plus a Drive folder called **ELEVATE Resumes**.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the web app URL (`https://script.google.com/macros/s/.../exec`) into `appsScriptUrl` in `website/src/config.ts`, then rebuild and redeploy the site.

After editing `Code.gs` later: **Deploy → Manage deployments → Edit → Version: New version**. Doing it this way keeps the same URL.

## Managing job listings (for the client)

Open the **Jobs** tab and add one row per opening:

| Title | Location | Type | Experience | Salary | Description | Status |
|---|---|---|---|---|---|---|
| Sales Executive | Siliguri | Full-time | 0–2 years | ₹2.4–3 LPA | Short description… | Open |

- Only rows with Status **Open** appear on the website. Set a job to **Closed** to hide it.
- Changes show up on the website straight away. No rebuild is needed.

## Limits

- Free Gmail accounts can send about 100 notification emails a day. That's plenty for this site.
- Resumes: PDF/DOC/DOCX only, 5 MB max (checked in both the browser and the script).
