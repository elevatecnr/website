/**
 * ELEVATE website backend: Google Apps Script bound to the "ELEVATE Website" Google Sheet.
 *
 * GET  ?action=jobs  -> { ok, jobs: [...] }   open rows from the "Jobs" tab
 * POST JSON body     -> { ok }                saves enquiry / application / employer forms,
 *                                              stores resumes in Drive and emails a notification.
 *
 * Setup steps are in apps-script/README.md.
 */

const NOTIFY_EMAIL = 'consult@elevatecnr.com'; // where form notifications are sent
const RESUME_FOLDER_NAME = 'ELEVATE Resumes';
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_EXTENSIONS = /\.(pdf|doc|docx)$/i; // checked by name: browsers often send an empty MIME type for Word files

// Sheet tab and accepted fields for each form type. Anything else in the payload is ignored.
const FORMS = {
  enquiry: { sheet: 'Enquiries', label: 'New enquiry', fields: ['name', 'phone', 'email', 'topic', 'message'] },
  application: { sheet: 'Applications', label: 'New job application', fields: ['name', 'phone', 'email', 'location', 'job', 'experience', 'message', 'resume'] },
  employer: { sheet: 'Employer Requirements', label: 'New hiring requirement', fields: ['company', 'name', 'email', 'phone', 'roles', 'openings', 'location', 'salary', 'details'] },
};

const JOB_COLUMNS = ['Title', 'Location', 'Type', 'Experience', 'Salary', 'Description', 'Status'];

/** Run once from the editor: creates the tabs with headers. */
function setup() {
  const ss = SpreadsheetApp.getActive();
  Object.values(FORMS).forEach((form) => ensureSheet(ss, form.sheet, ['Timestamp'].concat(form.fields)));
  const jobs = ensureSheet(ss, 'Jobs', JOB_COLUMNS);
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(['Open', 'Closed'], true).setAllowInvalid(false).build();
  jobs.getRange(2, JOB_COLUMNS.indexOf('Status') + 1, jobs.getMaxRows() - 1, 1).setDataValidation(statusRule);
  if (jobs.getLastRow() === 1) {
    jobs.appendRow(['Sample: Sales Executive', 'Siliguri', 'Full-time', '0–2 years', '₹2.4–3 LPA', 'Delete this row and add real openings. Set Status to Open to show a job on the website.', 'Closed']);
  }
  getResumeFolder();
}

function doGet(e) {
  if (e.parameter.action !== 'jobs') return json({ ok: false, error: 'Unknown action' });
  return json({ ok: true, jobs: readJobs() });
}

function readJobs() {
  const values = SpreadsheetApp.getActive().getSheetByName('Jobs').getDataRange().getDisplayValues();
  const header = values.shift();
  const col = (name) => header.indexOf(name);
  return values
    .filter((row) => String(row[col('Status')]).toLowerCase().replace(/[^a-z]/g, '') === 'open') // tolerates "Open." or " OPEN "
    .map((row) => ({
      title: row[col('Title')],
      location: row[col('Location')],
      type: row[col('Type')],
      experience: row[col('Experience')],
      salary: row[col('Salary')],
      description: row[col('Description')],
    }));
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const form = FORMS[data.type];
    if (!form) return json({ ok: false, error: 'Unknown form' });
    if (data.website) return json({ ok: true }); // honeypot filled: silently drop spam
    if (data.consent !== 'yes' || !data.name || !data.phone) return json({ ok: false, error: 'Missing required fields' });

    const values = form.fields.map((field) => {
      if (field === 'resume') return saveResume(data.resume, data.name);
      return clean(data[field]);
    });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.getActive().getSheetByName(form.sheet).appendRow([new Date()].concat(values));
    } finally {
      lock.releaseLock();
    }

    notify(form, values);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}

function saveResume(file, name) {
  if (!file || !file.data) throw new Error('Resume missing');
  if (!RESUME_EXTENSIONS.test(file.name)) throw new Error('Unsupported resume type');
  const bytes = Utilities.base64Decode(file.data);
  if (bytes.length > MAX_RESUME_BYTES) throw new Error('Resume too large');
  const stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HHmm');
  const blob = Utilities.newBlob(bytes, file.type || 'application/octet-stream',`${stamp} - ${clean(name)} - ${clean(file.name)}`);
  return getResumeFolder().createFile(blob).getUrl();
}

function getResumeFolder() {
  const folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function notify(form, values) {
  const body = form.fields.map((field, i) => `${field}: ${values[i]}`).join('\n');
  const sheetUrl = SpreadsheetApp.getActive().getUrl();
  MailApp.sendEmail(NOTIFY_EMAIL, `[ELEVATE website] ${form.label}`, `${body}\n\nAll submissions: ${sheetUrl}`);
}

function ensureSheet(ss, name, header) {
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(header);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
  }
  return sheet;
}

// Trim, cap length, and stop values like "=HYPERLINK(...)" being treated as spreadsheet formulas.
function clean(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 5000);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
