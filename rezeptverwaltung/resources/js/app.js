import Alpine from 'alpinejs';
import { parsePositive, format, scaleLine } from './quantity.js';

const csrf = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

async function postJson(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf() },
        body: JSON.stringify(data),
        credentials: 'same-origin',
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
}

function readJson(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try {
        return JSON.parse(el.textContent);
    } catch {
        return null;
    }
}

async function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
}

/* ---------------------------------------------------------------- Mengenanpassung */
Alpine.data('scaler', (dataId) => {
    const d = readJson(dataId) || { original: 1, lines: {}, nutrition: null };
    return {
        original: d.original,
        unit: d.unit,
        lines: d.lines,
        nutrition: d.nutrition,
        targetInput: format(d.initial ?? d.original),
        target: d.initial ?? d.original,
        error: '',
        get factor() {
            return this.target / this.original;
        },
        get isScaled() {
            return Math.abs(this.factor - 1) > 1e-9;
        },
        get targetQuery() {
            return format(this.target).replace(/\./g, '');
        },
        apply() {
            const v = parsePositive(this.targetInput);
            if (v === null) {
                this.error = 'Bitte eine Zahl größer als 0 eingeben (z. B. 1,5 oder 1/2).';
                return;
            }
            this.error = '';
            this.target = v;
            this.syncUrl();
        },
        step(dir) {
            const stepSize = this.original >= 1 && Number.isInteger(this.original) && this.target >= 2 ? 1 : 0.5;
            let v = Math.round((this.target + dir * stepSize) / stepSize) * stepSize;
            if (v <= 0) v = stepSize;
            this.setTarget(v);
        },
        times(f) {
            this.setTarget(this.original * f);
        },
        setTarget(v) {
            this.target = v;
            this.targetInput = format(v);
            this.error = '';
            this.syncUrl();
        },
        reset() {
            this.setTarget(this.original);
        },
        syncUrl() {
            const url = new URL(window.location.href);
            if (this.isScaled) url.searchParams.set('menge', this.targetQuery);
            else url.searchParams.delete('menge');
            window.history.replaceState({}, '', url);
        },
        qty(id) {
            const line = this.lines[id];
            return line ? scaleLine(line, this.factor) : '';
        },
        nutri(key) {
            if (!this.nutrition) return '';
            const row = this.nutrition.rows.find((r) => r.key === key);
            if (!row) return '';
            const f = this.nutrition.basis === 'recipe' ? this.factor : 1;
            return format(row.raw * f);
        },
    };
});

/* ---------------------------------------------------------------- Bildschirm anlassen */
Alpine.data('wakeLock', () => ({
    supported: 'wakeLock' in navigator,
    active: false,
    lock: null,
    async toggle() {
        try {
            if (this.active) {
                await this.lock?.release();
                this.active = false;
            } else {
                this.lock = await navigator.wakeLock.request('screen');
                this.active = true;
                this.lock.addEventListener('release', () => (this.active = false));
            }
        } catch {
            this.active = false;
        }
    },
}));

/* ---------------------------------------------------------------- Markdown-Feld mit Vorschau */
Alpine.data('markdownField', (initial = '') => ({
    text: initial,
    preview: false,
    html: '',
    loading: false,
    async showPreview() {
        this.preview = true;
        this.loading = true;
        try {
            const r = await postJson(window.APP_ROUTES.markdown, { text: this.text });
            this.html = r.html || '<p class="text-stone-500">(leer)</p>';
        } catch {
            this.html = '<p class="text-red-700">Vorschau konnte nicht geladen werden.</p>';
        }
        this.loading = false;
    },
}));

/* ---------------------------------------------------------------- Rezeptformular */
let uid = 0;
const key = () => 'k' + ++uid;
const emptyItem = () => ({ _k: key(), quantity: '', unit: '', name: '', note: '', scalable: true, original_text: '', uncertain: false });

Alpine.data('recipeForm', (dataId) => {
    const d = readJson(dataId) || {};
    const groups = (d.groups && d.groups.length ? d.groups : [{ name: '', items: [] }]).map((g) => ({
        _k: key(),
        name: g.name ?? '',
        items: (g.items && g.items.length ? g.items : [emptyItem()]).map((i) => ({ ...emptyItem(), ...i, _k: key(), scalable: i.scalable !== false && i.scalable !== '0' })),
    }));
    const steps = (d.steps && d.steps.length ? d.steps : [{ body: '' }]).map((s) => ({ _k: key(), body: s.body ?? '', preview: false, html: '' }));
    return {
        groups,
        steps,
        pasteOpen: false,
        pasteText: '',
        pasteError: '',
        coverPreview: null,
        removeCover: false,
        addGroup() {
            this.groups.push({ _k: key(), name: '', items: [emptyItem()] });
        },
        removeGroup(gi) {
            const g = this.groups[gi];
            const filled = g.items.some((i) => i.name || i.quantity);
            if (filled && !confirm('Diese Gruppe mit allen Zutaten entfernen?')) return;
            this.groups.splice(gi, 1);
            if (!this.groups.length) this.addGroup();
        },
        moveGroup(gi, dir) {
            const t = gi + dir;
            if (t < 0 || t >= this.groups.length) return;
            const [g] = this.groups.splice(gi, 1);
            this.groups.splice(t, 0, g);
        },
        addItem(gi, focus = true) {
            this.groups[gi].items.push(emptyItem());
            if (focus) this.$nextTick(() => {
                const rows = this.$root.querySelectorAll(`[data-group="${gi}"] [data-item-name]`);
                rows[rows.length - 1]?.focus();
            });
        },
        removeItem(gi, ii) {
            this.groups[gi].items.splice(ii, 1);
        },
        moveItem(gi, ii, dir) {
            const items = this.groups[gi].items;
            const t = ii + dir;
            if (t >= 0 && t < items.length) {
                const [it] = items.splice(ii, 1);
                items.splice(t, 0, it);
                return;
            }
            // In benachbarte Gruppe verschieben
            const tg = gi + dir;
            if (tg < 0 || tg >= this.groups.length) return;
            const [it] = items.splice(ii, 1);
            if (dir < 0) this.groups[tg].items.push(it);
            else this.groups[tg].items.unshift(it);
        },
        async pasteIngredients() {
            this.pasteError = '';
            if (!this.pasteText.trim()) return;
            try {
                const r = await postJson(window.APP_ROUTES.ingredients, { text: this.pasteText });
                for (const g of r.groups) {
                    const items = g.items.map((i) => ({ ...emptyItem(), ...i, _k: key() }));
                    const last = this.groups[this.groups.length - 1];
                    const lastEmpty = last.items.every((i) => !i.name && !i.quantity);
                    if (!g.name && lastEmpty) {
                        last.items = items;
                    } else if (!g.name) {
                        last.items.push(...items);
                    } else if (lastEmpty && !last.name) {
                        last.name = g.name;
                        last.items = items;
                    } else {
                        this.groups.push({ _k: key(), name: g.name, items });
                    }
                }
                this.pasteText = '';
                this.pasteOpen = false;
            } catch {
                this.pasteError = 'Die Zutaten konnten nicht verarbeitet werden. Bitte erneut versuchen.';
            }
        },
        addStep() {
            this.steps.push({ _k: key(), body: '', preview: false, html: '' });
            this.$nextTick(() => {
                const areas = this.$root.querySelectorAll('[data-step-body]');
                areas[areas.length - 1]?.focus();
            });
        },
        removeStep(si) {
            if (this.steps[si].body.trim() && !confirm('Diesen Schritt entfernen?')) return;
            this.steps.splice(si, 1);
            if (!this.steps.length) this.addStep();
        },
        moveStep(si, dir) {
            const t = si + dir;
            if (t < 0 || t >= this.steps.length) return;
            const [s] = this.steps.splice(si, 1);
            this.steps.splice(t, 0, s);
        },
        async previewStep(si) {
            const s = this.steps[si];
            if (s.preview) {
                s.preview = false;
                return;
            }
            try {
                const r = await postJson(window.APP_ROUTES.markdown, { text: s.body });
                s.html = r.html || '<p class="text-stone-500">(leer)</p>';
            } catch {
                s.html = '<p class="text-red-700">Vorschau konnte nicht geladen werden.</p>';
            }
            s.preview = true;
        },
        onCover(e) {
            const f = e.target.files && e.target.files[0];
            if (this.coverPreview) URL.revokeObjectURL(this.coverPreview);
            this.coverPreview = f ? URL.createObjectURL(f) : null;
            if (f) this.removeCover = false;
        },
    };
});

/* ---------------------------------------------------------------- Teilen */
Alpine.data('shareDialog', (cfg) => ({
    useTarget: false,
    image: true,
    notes: false,
    nutrition: true,
    message: '',
    busy: false,
    canNativeShare: typeof navigator.share === 'function',
    open() {
        this.$refs.dialog.showModal();
    },
    close() {
        this.$refs.dialog.close();
    },
    query(scaler) {
        const p = new URLSearchParams();
        p.set('menge', this.useTarget && scaler ? scaler.targetQuery : cfg.original);
        p.set('bild', this.image ? '1' : '0');
        p.set('notizen', this.notes ? '1' : '0');
        p.set('naehrwerte', this.nutrition ? '1' : '0');
        return p.toString();
    },
    async text(scaler) {
        const res = await fetch(cfg.textUrl + '?' + this.query(scaler), { credentials: 'same-origin' });
        if (!res.ok) throw new Error();
        return res.text();
    },
    async copy(scaler) {
        try {
            const ok = await copyToClipboard(await this.text(scaler));
            this.message = ok ? 'Rezepttext wurde in die Zwischenablage kopiert.' : 'Kopieren nicht möglich.';
        } catch {
            this.message = 'Der Text konnte nicht geladen werden.';
        }
    },
    async mail(scaler) {
        try {
            const body = await this.text(scaler);
            const subject = 'Rezept: ' + cfg.title;
            let href = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            if (href.length > 12000) {
                await copyToClipboard(body);
                href = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('(Der Rezepttext ist sehr lang und wurde in die Zwischenablage kopiert – bitte hier einfügen.)');
                this.message = 'Der Text ist für einen E-Mail-Link zu lang und wurde in die Zwischenablage kopiert.';
            }
            window.location.href = href;
        } catch {
            this.message = 'Der Text konnte nicht geladen werden.';
        }
    },
    async whatsapp(scaler) {
        try {
            const body = await this.text(scaler);
            window.open('https://wa.me/?text=' + encodeURIComponent(body), '_blank', 'noopener');
        } catch {
            this.message = 'Der Text konnte nicht geladen werden.';
        }
    },
    async nativeShare(scaler, withPdf = false) {
        this.busy = true;
        try {
            const text = await this.text(scaler);
            const data = { title: cfg.title, text };
            if (withPdf) {
                const res = await fetch(cfg.pdfUrl + '?' + this.query(scaler), { credentials: 'same-origin' });
                const blob = await res.blob();
                const file = new File([blob], cfg.pdfName, { type: 'application/pdf' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    data.files = [file];
                    delete data.text;
                } else {
                    this.message = 'Dieses Gerät kann keine Dateien teilen – es wird der Text geteilt.';
                }
            }
            await navigator.share(data);
        } catch (e) {
            if (e && e.name !== 'AbortError') this.message = 'Teilen wurde abgebrochen oder ist nicht möglich.';
        }
        this.busy = false;
    },
    pdfHref(scaler) {
        return cfg.pdfUrl + '?' + this.query(scaler);
    },
    printHref(scaler) {
        return cfg.printUrl + '?' + this.query(scaler);
    },
}));

/* ---------------------------------------------------------------- Einkaufsliste */
Alpine.data('shoppingItem', (checked, url) => ({
    checked,
    async toggle() {
        const next = !this.checked;
        this.checked = next;
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf() },
                body: JSON.stringify({ checked: next }),
                credentials: 'same-origin',
            });
            if (!res.ok) throw new Error();
        } catch {
            this.checked = !next;
            alert('Der Status konnte nicht gespeichert werden. Bitte Verbindung prüfen.');
        }
    },
}));

Alpine.data('textShare', (cfg) => ({
    message: '',
    canNativeShare: typeof navigator.share === 'function',
    async load() {
        const res = await fetch(cfg.textUrl, { credentials: 'same-origin' });
        if (!res.ok) throw new Error();
        return res.text();
    },
    async copy() {
        try {
            this.message = (await copyToClipboard(await this.load())) ? 'In die Zwischenablage kopiert.' : 'Kopieren nicht möglich.';
        } catch {
            this.message = 'Text konnte nicht geladen werden.';
        }
    },
    async mail() {
        const body = await this.load();
        window.location.href = 'mailto:?subject=' + encodeURIComponent(cfg.title) + '&body=' + encodeURIComponent(body);
    },
    async whatsapp() {
        window.open('https://wa.me/?text=' + encodeURIComponent(await this.load()), '_blank', 'noopener');
    },
    async share() {
        try {
            await navigator.share({ title: cfg.title, text: await this.load() });
        } catch {}
    },
}));

/* ---------------------------------------------------------------- Allgemein */
Alpine.data('copyField', () => ({
    copied: false,
    async copy(text) {
        this.copied = await copyToClipboard(text);
        setTimeout(() => (this.copied = false), 2500);
    },
}));

window.Alpine = Alpine;
Alpine.start();
