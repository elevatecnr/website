// Submits any <form data-form="<type>"> to the Apps Script web app as JSON.
// Content-Type text/plain avoids a CORS preflight, which Apps Script cannot answer.
import { site } from '../config';

const MAX_FILE_BYTES = 5 * 1024 * 1024;

function readFile(file: File): Promise<{ name: string; type: string; data: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, data: String(reader.result).split(',')[1] });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function setStatus(form: HTMLFormElement, kind: 'ok' | 'error' | 'info', text: string) {
  const el = form.querySelector<HTMLElement>('[data-status]')!;
  el.textContent = text;
  el.className = 'rounded-lg px-4 py-3 text-sm ' + {
    ok: 'bg-emerald-50 text-emerald-800',
    error: 'bg-red-50 text-red-700',
    info: 'bg-slate-100 text-slate-700',
  }[kind];
}

document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!site.appsScriptUrl) {
      setStatus(form, 'error', `Online submissions are not set up yet. Please call or WhatsApp us on ${site.phone}.`);
      return;
    }

    const payload: Record<string, unknown> = { type: form.dataset.form };
    for (const [key, value] of new FormData(form)) {
      if (value instanceof File) {
        if (!value.size) continue;
        if (value.size > MAX_FILE_BYTES) {
          setStatus(form, 'error', 'Please upload a file smaller than 5 MB.');
          return;
        }
        payload[key] = await readFile(value);
      } else {
        payload[key] = value;
      }
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    button.disabled = true;
    setStatus(form, 'info', 'Sending…');
    try {
      const res = await fetch(site.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error);
      form.reset();
      setStatus(form, 'ok', form.dataset.success || 'Thank you! We will get back to you shortly.');
    } catch {
      setStatus(form, 'error', `Something went wrong. Please try again, or call us on ${site.phone}.`);
    } finally {
      button.disabled = false;
    }
  });
});
