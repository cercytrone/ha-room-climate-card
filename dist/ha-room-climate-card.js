const Q = "room-climate-card", ke = "room-climate-card-editor", Hr = "Room Climate Card", Dr = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", Rr = "2.17.0";
const Ke = globalThis, St = Ke.ShadowRoot && (Ke.ShadyCSS === void 0 || Ke.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = /* @__PURE__ */ Symbol(), ai = /* @__PURE__ */ new WeakMap();
let Ki = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (St && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ai.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ai.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Or = (r) => new Ki(typeof r == "string" ? r : r + "", void 0, At), kt = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ki(t, r, At);
}, zr = (r, e) => {
  if (St) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Ke.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, oi = St ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Or(t);
})(r) : r;
const { is: Nr, defineProperty: Fr, getOwnPropertyDescriptor: Lr, getOwnPropertyNames: Br, getOwnPropertySymbols: Ir, getPrototypeOf: Pr } = Object, qe = globalThis, li = qe.trustedTypes, Ur = li ? li.emptyScript : "", Vr = qe.reactiveElementPolyfillSupport, $e = (r, e) => r, wt = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Ur : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Wi = (r, e) => !Nr(r, e), hi = { attribute: !0, type: String, converter: wt, reflect: !1, useDefault: !1, hasChanged: Wi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), qe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = hi) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Fr(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = Lr(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: n, set(a) {
      const o = n?.call(this);
      s?.call(this, a), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? hi;
  }
  static _$Ei() {
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const e = Pr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const t = this.properties, i = [...Br(t), ...Ir(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(oi(n));
    } else e !== void 0 && t.push(oi(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return zr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : wt).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : wt;
      this._$Em = n;
      const o = a.fromAttribute(t, s.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? Wi)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, s] of i) {
        const { wrapped: a } = s, o = this[n];
        a !== !0 || this._$AL.has(n) || o === void 0 || this.C(n, void 0, s, o);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[$e("elementProperties")] = /* @__PURE__ */ new Map(), pe[$e("finalized")] = /* @__PURE__ */ new Map(), Vr?.({ ReactiveElement: pe }), (qe.reactiveElementVersions ??= []).push("2.1.2");
const Mt = globalThis, ci = (r) => r, je = Mt.trustedTypes, di = je ? je.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ji = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, Zi = "?" + ne, Gr = `<${Zi}>`, me = document, Me = () => me.createComment(""), Ce = (r) => r === null || typeof r != "object" && typeof r != "function", Ct = Array.isArray, Kr = (r) => Ct(r) || typeof r?.[Symbol.iterator] == "function", lt = `[ 	
\f\r]`, _e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ui = /-->/g, mi = />/g, ce = RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pi = /'/g, fi = /"/g, Yi = /^(?:script|style|textarea|title)$/i, Xi = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), b = Xi(1), v = Xi(2), ge = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), gi = /* @__PURE__ */ new WeakMap(), de = me.createTreeWalker(me, 129);
function qi(r, e) {
  if (!Ct(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return di !== void 0 ? di.createHTML(e) : e;
}
const Wr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = _e;
  for (let o = 0; o < t; o++) {
    const l = r[o];
    let h, c, d = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, c = a.exec(l), c !== null); ) m = a.lastIndex, a === _e ? c[1] === "!--" ? a = ui : c[1] !== void 0 ? a = mi : c[2] !== void 0 ? (Yi.test(c[2]) && (n = RegExp("</" + c[2], "g")), a = ce) : c[3] !== void 0 && (a = ce) : a === ce ? c[0] === ">" ? (a = n ?? _e, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, h = c[1], a = c[3] === void 0 ? ce : c[3] === '"' ? fi : pi) : a === fi || a === pi ? a = ce : a === ui || a === mi ? a = _e : (a = ce, n = void 0);
    const p = a === ce && r[o + 1].startsWith("/>") ? " " : "";
    s += a === _e ? l + Gr : d >= 0 ? (i.push(h), l.slice(0, d) + ji + l.slice(d) + ne + p) : l + ne + (d === -2 ? o : p);
  }
  return [qi(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Te {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [h, c] = Wr(e, t);
    if (this.el = Te.createElement(h, i), de.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = de.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ji)) {
          const m = c[a++], p = n.getAttribute(d).split(ne), g = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: g[2], strings: p, ctor: g[1] === "." ? Zr : g[1] === "?" ? Yr : g[1] === "@" ? Xr : Je }), n.removeAttribute(d);
        } else d.startsWith(ne) && (l.push({ type: 6, index: s }), n.removeAttribute(d));
        if (Yi.test(n.tagName)) {
          const d = n.textContent.split(ne), m = d.length - 1;
          if (m > 0) {
            n.textContent = je ? je.emptyScript : "";
            for (let p = 0; p < m; p++) n.append(d[p], Me()), de.nextNode(), l.push({ type: 2, index: ++s });
            n.append(d[m], Me());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Zi) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(ne, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += ne.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = me.createElement("template");
    return i.innerHTML = e, i;
  }
}
function ye(r, e, t = r, i) {
  if (e === ge) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = Ce(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = ye(r, n._$AS(r, e.values), n, i)), e;
}
class jr {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? me).importNode(t, !0);
    de.currentNode = n;
    let s = de.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new Ee(s, s.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (h = new qr(s, this, e)), this._$AV.push(h), l = i[++o];
      }
      a !== l?.index && (s = de.nextNode(), a++);
    }
    return de.currentNode = me, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Ee {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ye(this, e, t), Ce(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Kr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && Ce(this._$AH) ? this._$AA.nextSibling.data = e : this.T(me.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Te.createElement(qi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const s = new jr(n, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = gi.get(e.strings);
    return t === void 0 && gi.set(e.strings, t = new Te(e)), t;
  }
  k(e) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new Ee(this.O(Me()), this.O(Me()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = ci(e).nextSibling;
      ci(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Je {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = ye(this, e, t, 0), a = !Ce(e) || e !== this._$AH && e !== ge, a && (this._$AH = e);
    else {
      const o = e;
      let l, h;
      for (e = s[0], l = 0; l < s.length - 1; l++) h = ye(this, o[i + l], t, l), h === ge && (h = this._$AH[l]), a ||= !Ce(h) || h !== this._$AH[l], h === f ? e = f : e !== f && (e += (h ?? "") + s[l + 1]), this._$AH[l] = h;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Zr extends Je {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Yr extends Je {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class Xr extends Je {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ye(this, e, t, 0) ?? f) === ge) return;
    const i = this._$AH, n = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== f && (i === f || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class qr {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ye(this, e);
  }
}
const Jr = Mt.litHtmlPolyfillSupport;
Jr?.(Te, Ee), (Mt.litHtmlVersions ??= []).push("3.3.3");
const Qr = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = n = new Ee(e.insertBefore(Me(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
const Tt = globalThis;
let ue = class extends pe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Qr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ge;
  }
};
ue._$litElement$ = !0, ue.finalized = !0, Tt.litElementHydrateSupport?.({ LitElement: ue });
const en = Tt.litElementPolyfillSupport;
en?.({ LitElement: ue });
(Tt.litElementVersions ??= []).push("4.2.2");
const A = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function Pe(r, e) {
  const [t, i] = r, [n, s] = e, a = i - t;
  if (!Number.isFinite(a) || a === 0) {
    const o = (n + s) / 2;
    return () => o;
  }
  return (o) => n + (o - t) / a * (s - n);
}
function yi(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function bi(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = t;
  let s = r, a = e;
  if (a - s < i) {
    const l = (a + s) / 2;
    s = l - i / 2, a = l + i / 2;
  }
  const o = (a - s) * n;
  return [s - o, a + o];
}
function Ji(r) {
  const e = [];
  for (let i = 1; i < r.length; i++) {
    const n = r[i].t - r[i - 1].t;
    n > 0 && e.push(n);
  }
  if (!e.length) return 0;
  e.sort((i, n) => i - n);
  const t = Math.floor(e.length / 2);
  return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2;
}
function tn(r, e, t = {}) {
  const i = Ji(r), n = i > 0 ? i * 2.5 : 0, s = t.minMs ?? Math.max(e / 40, 300 * 1e3), a = t.maxMs ?? Math.max(s, e / 3);
  return Math.min(a, Math.max(n, s));
}
const rn = 1e3, nn = 8;
function sn(r, e, t, i) {
  const n = t.t - e.t, s = e.v, a = t.v, o = Math.min(
    nn,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let l = 1; l < o; l++) {
    const h = l / o;
    r.samples.push({
      t: Math.round(e.t + n * h),
      v: s + (a - s) * h
    }), r.bridged.push(!0);
  }
}
function wi(r, e) {
  const { rangeMs: t, start: i, end: n } = e, s = e.gapMode ?? "connect", a = tn(r, t), o = e.maxGapMs ?? t / 4, l = [];
  let h = null, c = null, d = null, m = !1, p = !1;
  const g = () => {
    h && h.samples.length && l.push(h), h = null, c = null, d = null;
  }, S = (x) => {
    if (!h || !c || x === null || x <= c.t) return;
    const R = { t: x, v: c.v };
    h.samples.push(R), h.bridged.push(!1), c = R;
  };
  for (const x of r) {
    if (x.v === null || !Number.isFinite(x.v)) {
      c || (m = !0), d = d ?? x.t, p = !0;
      continue;
    }
    if (p = !1, !c || !h) {
      h = { samples: [x], bridged: [] }, c = x, d = null;
      continue;
    }
    const R = x.t - c.t;
    if (R <= a && d === null) {
      h.samples.push(x), h.bridged.push(!1), c = x;
      continue;
    }
    if (!(d !== null)) {
      const He = Math.min(rn, R / 2);
      h.samples.push({ t: x.t - He, v: c.v }), h.bridged.push(!1), h.samples.push(x), h.bridged.push(!1), c = x;
      continue;
    }
    const B = Math.max(c.t, d), j = x.t - B;
    if (s === "connect" && j <= o) {
      B > c.t && (h.samples.push({ t: B, v: c.v }), h.bridged.push(!1), c = { t: B, v: c.v }), sn(h, c, x, a), h.samples.push(x), h.bridged.push(!0), c = x, d = null;
      continue;
    }
    S(d), g(), h = { samples: [x], bridged: [] }, c = x;
  }
  if (p && S(d), g(), !l.length) return l;
  const C = l[0];
  if (!m && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), p)
    return l;
  const T = l[l.length - 1], U = T.samples[T.samples.length - 1];
  return n !== void 0 && U.t < n && (T.samples.push({ t: n, v: U.v }), T.bridged.push(!1)), l;
}
function _i(r, e, t) {
  if (!r || !r.length) return [];
  const i = [...r].sort((a, o) => a.t - o.t), n = [];
  let s = null;
  for (const a of i) {
    if (!Number.isFinite(a.t) || t !== void 0 && a.t > t) continue;
    const o = a.v === null || !Number.isFinite(a.v) ? null : a.v;
    if (e !== void 0 && a.t < e) {
      s = { t: e, v: o };
      continue;
    }
    const l = n[n.length - 1];
    if (l && l.t === a.t) {
      n[n.length - 1] = { t: a.t, v: o };
      continue;
    }
    n.push({ t: a.t, v: o });
  }
  return s && e !== void 0 && (!n.length || n[0].t > e) && n.unshift(s), n;
}
function an(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function on(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function Qi(r) {
  if (!r.length) return "";
  let e = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${A(r[t].x)} ${A(r[t].y)}`;
  return e;
}
const vi = 1, ln = 1;
function hn(r, e, t, i, n) {
  if (!(n > 0) || r === e && t === 0 && i === 0) return 0;
  const s = Math.min(r, e), a = Math.max(r, e);
  let o = 0;
  const l = 16;
  for (let h = 1; h < l; h++) {
    const c = h / l, d = 1 - c, m = r + t * n / 3, p = e - i * n / 3, g = d * d * d * r + 3 * d * d * c * m + 3 * d * c * c * p + c * c * c * e;
    o = Math.max(o, s - g, g - a);
  }
  return o;
}
function er(r) {
  const e = r.length, t = [], i = [];
  for (let o = 0; o < e - 1; o++)
    t[o] = r[o + 1].x - r[o].x, i[o] = t[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / t[o];
  const n = new Array(e).fill(0);
  n[0] = i[0], n[e - 1] = i[e - 2];
  for (let o = 1; o < e - 1; o++) {
    const l = i[o - 1], h = i[o];
    n[o] = l * h <= 0 ? (l + h) / 2 * ln : (l + h) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < e - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(e).fill(1);
  for (let o = 0; o < 3; o++) {
    const l = new Array(e).fill(1);
    let h = !1;
    for (let c = 0; c < e - 1; c++) {
      if (t[c] === 0) continue;
      const d = hn(
        r[c].y,
        r[c + 1].y,
        n[c] * a[c],
        n[c + 1] * a[c + 1],
        t[c]
      );
      if (d > vi) {
        const m = vi / d;
        l[c] = Math.min(l[c], m), l[c + 1] = Math.min(l[c + 1], m), h = !0;
      }
    }
    if (!h) break;
    for (let c = 0; c < e; c++) a[c] *= l[c];
  }
  for (let o = 0; o < e; o++) n[o] *= a[o];
  return { dx: t, tangents: n };
}
function cn(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${A(r[0].x)} ${A(r[0].y)}`;
  if (r.length === 2) return Qi(r);
  const e = r.length, { dx: t, tangents: i } = er(r);
  let n = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let s = 0; s < e - 1; s++) {
    const a = r[s].x + t[s] / 3, o = r[s].y + i[s] * t[s] / 3, l = r[s + 1].x - t[s] / 3, h = r[s + 1].y - i[s + 1] * t[s] / 3;
    n += ` C ${A(a)} ${A(o)}, ${A(l)} ${A(h)}, ${A(
      r[s + 1].x
    )} ${A(r[s + 1].y)}`;
  }
  return n;
}
function tr(r, e) {
  return e ? cn(r) : Qi(r);
}
function dn(r, e) {
  if (r.length < 2) return [];
  const t = [];
  if (!e || r.length === 2) {
    for (let s = 1; s < r.length; s++) {
      const a = r[s - 1], o = r[s];
      t.push({
        from: a,
        to: o,
        command: `L ${A(o.x)} ${A(o.y)}`
      });
    }
    return t;
  }
  const { dx: i, tangents: n } = er(r);
  for (let s = 0; s < r.length - 1; s++) {
    const a = r[s], o = r[s + 1], l = a.x + i[s] / 3, h = a.y + n[s] * i[s] / 3, c = o.x - i[s] / 3, d = o.y - n[s + 1] * i[s] / 3;
    t.push({
      from: a,
      to: o,
      command: `C ${A(l)} ${A(h)}, ${A(c)} ${A(d)}, ${A(
        o.x
      )} ${A(o.y)}`
    });
  }
  return t;
}
function un(r, e, t) {
  if (!r.length) return "";
  const i = tr(r, t), n = r[0], s = r[r.length - 1];
  return `${i} L ${A(s.x)} ${A(e)} L ${A(n.x)} ${A(e)} Z`;
}
function mn(r, e, t = {}) {
  const i = Math.max(1, Math.round(e));
  if (i < 3 || r.length < 3) return r.map((o) => ({ ...o }));
  const n = Math.floor(i / 2), s = t.maxDeltaMs ?? 1 / 0, a = 2;
  return r.map((o, l) => {
    if (o.v === null) return { ...o };
    let h = 0, c = 0;
    for (let d = -n; d <= n; d++) {
      const m = r[l + d];
      !m || m.v === null || d !== 0 && Math.abs(m.t - o.t) > s || (h += m.v, c += 1);
    }
    return c ? { t: o.t, v: gn(h / c, a) } : { ...o };
  });
}
const pn = [
  "none",
  "light",
  "medium",
  "strong"
], _t = "light", $i = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60
}, fn = 121;
function gn(r, e) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function yn(r, e = _t) {
  const t = $i[e] ?? $i[_t];
  if (!(t > 0) || !Number.isFinite(r) || r <= 0) return 1;
  const i = Math.max(1, Math.round(t * 6e4 / r));
  return Math.min(fn, i * 2 + 1);
}
function bn(r, e) {
  if (!Number.isFinite(e) || e <= 0) return 1 / 0;
  const t = Math.floor(Math.max(1, r) / 2) * e * 2;
  return Math.min(90 * 6e4, Math.max(2 * 6e4, t));
}
function wn(r, e, t) {
  if (!(e > r) || t < 2) return [];
  const i = [];
  for (let n = 0; n < t; n++)
    i.push(r + (e - r) * n / (t - 1));
  return i;
}
function _n(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function vn(r, e) {
  const t = r.length;
  if (t <= e || e < 3) return r.map((a, o) => o);
  const i = Math.max(1, Math.floor((e - 2) / 2)), n = /* @__PURE__ */ new Set([0, t - 1]), s = t / i;
  for (let a = 0; a < i; a++) {
    const o = Math.floor(a * s), l = Math.min(t - 1, Math.floor((a + 1) * s) - 1);
    let h = -1, c = -1, d = 1 / 0, m = -1 / 0;
    for (let p = o; p <= l; p++) {
      const g = r[p].v;
      g === null || !Number.isFinite(g) || (g < d && (d = g, h = p), g > m && (m = g, c = p));
    }
    if (h === -1) {
      n.add(o);
      continue;
    }
    n.add(h), n.add(c);
  }
  return [...n].sort((a, o) => a - o);
}
function Ue(r, e) {
  const t = r.length;
  if (!t || !Number.isFinite(e)) return null;
  let i = 0, n = t - 1, s = t;
  for (; i <= n; ) {
    const c = i + n >> 1;
    r[c].t >= e ? (s = c, n = c - 1) : i = c + 1;
  }
  let a = s - 1, o = s, l = null, h = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      l = r[a];
      break;
    }
    a--;
  }
  for (; o < t; ) {
    if (r[o].v !== null) {
      h = r[o];
      break;
    }
    o++;
  }
  return l ? h ? Math.abs(l.t - e) <= Math.abs(h.t - e) ? l : h : l : h;
}
function xi(r) {
  let e = null, t = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!e || e.v > n) && (e = i), (!t || t.v < n) && (t = i));
  }
  return e && t ? { min: e, max: t } : null;
}
const ht = "#7FA6D9", ct = "#EFB35F", dt = "#D16A62", We = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, Ze = 1, ir = 100;
function ut(r, e) {
  return typeof r == "number" && Number.isFinite(r) ? r : e;
}
function $n(r, e, t, i = We) {
  const n = [
    ut(r, i.coldBelow),
    ut(e, i.warmAbove),
    ut(t, i.hotAbove)
  ].sort((l, h) => l - h), s = n[0], a = Math.max(n[1], s + Ze), o = Math.max(n[2], a + Ze);
  return { coldBelow: s, warmAbove: a, hotAbove: o };
}
function Si(r, e, t) {
  return Number.isFinite(r) ? r < e.coldBelow ? t.cold : r < e.warmAbove ? t.normal : r < e.hotAbove ? t.warm : t.hot : t.normal;
}
function xn(r, e, t, i = ir) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: t.normal }];
  const o = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), l = Math.max(e.warmAbove - e.coldBelow, Ze), h = Math.max(e.hotAbove - e.warmAbove, Ze), c = o * l / 2, d = o * h / 2, m = (S) => S < e.coldBelow ? t.cold : S < e.warmAbove ? t.normal : S < e.hotAbove ? t.warm : t.hot, p = [
    { value: e.coldBelow, color: t.cold },
    { value: e.coldBelow + c, color: t.normal },
    { value: e.warmAbove - c, color: t.normal },
    { value: e.warmAbove + d, color: t.warm },
    { value: e.hotAbove - d, color: t.warm },
    { value: e.hotAbove, color: t.hot }
  ].filter((S) => S.value > n && S.value < s).concat([
    { value: n, color: m(n) },
    { value: s, color: m(s) }
  ]).sort((S, C) => S.value - C.value), g = [];
  for (const S of p) {
    const C = Number(((s - S.value) / a).toFixed(4)), T = g[g.length - 1];
    T && Math.abs(T.offset - C) < 5e-4 && T.color === S.color || g.push({ offset: C, color: S.color });
  }
  return g.reverse(), g.length === 1 && g.push({ offset: 1, color: g[0].color }), g[0].offset = 0, g[g.length - 1].offset = 1, g;
}
const Ai = 32;
function ki(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  const t = e[1], i = t.length === 3 ? t.split("").map((n) => n + n).join("") : t;
  return [
    parseInt(i.slice(0, 2), 16),
    parseInt(i.slice(2, 4), 16),
    parseInt(i.slice(4, 6), 16)
  ];
}
function Sn(r) {
  return `#${r.map((e) => Math.max(0, Math.min(255, Math.round(e))).toString(16).padStart(2, "0")).join("")}`;
}
function rr(r, e) {
  if (!r.length) return "#ffffff";
  const t = Math.min(1, Math.max(0, Number.isFinite(e) ? e : 0));
  let i = r[0], n = r[r.length - 1];
  for (let h = 0; h < r.length; h++)
    if (r[h].offset <= t && (i = r[h]), r[h].offset >= t) {
      n = r[h];
      break;
    }
  const s = ki(i.color), a = ki(n.color);
  if (!s || !a) return i.color;
  const o = n.offset - i.offset, l = o <= 0 ? 0 : (t - i.offset) / o;
  return Sn([
    s[0] + (a[0] - s[0]) * l,
    s[1] + (a[1] - s[1]) * l,
    s[2] + (a[2] - s[2]) * l
  ]);
}
function An(r, e, t, i) {
  const n = dn([...r], e), s = [];
  let a = null;
  const o = (h, c, d) => {
    const m = c.x - h.x, p = c.y - h.y, g = Math.hypot(m, p);
    return g > 0 ? mt({ x: h.x + m / g * d, y: h.y + p / g * d }) : mt(h);
  }, l = (h) => {
    const c = h.pieces[0], d = h.pieces[h.pieces.length - 1], m = o(c.from, c.to, -0.8), p = o(d.to, d.from, -0.8), g = h.pieces.map((S) => S.command).join(" ");
    s.push({
      d: `M ${m} L ${mt(c.from)} ${g} L ${p}`,
      color: rr(t, h.level / Ai)
    });
  };
  for (const h of n) {
    const c = (h.from.y + h.to.y) / 2, d = Math.round(Math.min(1, Math.max(0, i(c))) * Ai);
    if (a && a.level === d) {
      a.pieces.push(h);
      continue;
    }
    a && l(a), a = { pieces: [h], level: d };
  }
  return a && l(a), s;
}
function mt(r) {
  const e = (t) => Number.isFinite(t) ? (Math.round(t * 100) / 100).toString() : "0";
  return `${e(r.x)} ${e(r.y)}`;
}
const kn = 10, Mi = { min: 0, max: 32 }, Mn = ["on", "open", "opening", "tilted", "gekippt"], Cn = ["off", "closed", "closing"], fe = {
  /** The only accent of the card: mint. */
  accent: "#4FD1A5",
  /** Deliberately dim indigo – only the dot and the curve use it. */
  humidity: "#8B86D6",
  /**
   * Heating = damped red. The flame is the only coloured element left in the
   * status row, so it whispers instead of shouting – and it only turns red while
   * the thermostat is actually heating.
   */
  heating: "#d16a62",
  /**
   * Off / inactive = exactly the muted tone of the „Soll“ wording next to it, so
   * the row reads as one quiet line.
   */
  off: "var(--rcc-muted)"
  // There is deliberately no idle entry: waiting borrows `accent`, i.e. the green
  // of the chart, so the flame never introduces a hue the card does not use.
}, Ci = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, Ti = { min: 14, max: 96 }, Et = 15, Ye = { min: 11, max: 32 }, Tn = /^[a-z0-9_]+\.[a-z0-9_]+$/, En = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Hn(r) {
  return typeof r == "object" && r !== null;
}
function J(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return Tn.test(e) ? e : void 0;
}
function be(r) {
  if (typeof r != "string") return;
  const e = r.trim();
  return e.length ? e : void 0;
}
function H(r, e, t, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(t, Math.max(e, n)) : i;
}
function M(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function ve(r, e) {
  const t = be(r);
  return t && t.length <= 64 ? t : e;
}
function Ei(r) {
  const e = be(r);
  if (!(!e || e.length > 120) && En.test(e))
    return e;
}
function Hi(r, e) {
  return Math.round(
    H(r, Ti.min, Ti.max, e)
  );
}
function Dn(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
const Rn = [
  "type",
  "name",
  "name_font_size",
  "icon",
  "height",
  "border_radius",
  "card_padding",
  "theme",
  "temperature_entity",
  "humidity_entity",
  "temperature_decimals",
  "humidity_decimals",
  "temperature_font_size",
  "temperature_font_family",
  "humidity_font_size",
  "humidity_font_family",
  "show_series_labels",
  "accent_color",
  "humidity_color",
  "temperature_comfort_color",
  "show_window",
  "window_entity",
  "window_open_states",
  "show_motion",
  "motion_entity",
  "motion_show_last_changed",
  "show_thermostat",
  "climate_entity",
  "show_climate_row",
  "tap_action",
  "show_setpoint",
  "show_hvac_status",
  "show_hvac_mode",
  "heating_color",
  "heating_idle_color",
  "heating_off_color",
  "show_temperature_chart",
  "show_humidity_chart",
  "chart_hours",
  "chart_height",
  "chart_curve",
  "chart_smoothing",
  "chart_gap_mode",
  "chart_max_gap_minutes",
  "chart_gap_style",
  "chart_humidity_line_style",
  "chart_show_points",
  "chart_show_grid",
  "chart_show_axis",
  "chart_full_bleed",
  "chart_show_setpoint",
  "chart_show_tooltip",
  "chart_show_extremes",
  "chart_temperature_gradient",
  "chart_humidity_gradient",
  "chart_temperature_area_opacity",
  "chart_humidity_area_opacity",
  "chart_opacity",
  "chart_temperature_bands",
  "chart_band_cold_below",
  "chart_band_warm_above",
  "chart_band_hot_above",
  "chart_band_transition"
], Di = /* @__PURE__ */ new Set(), On = {
  name_entity: "Der Raumname kommt nur noch aus `name` (Editor: Allgemein → Raumname); ohne Eintrag gilt der Name des Temperatursensors."
};
function zn(r) {
  for (const e of Object.keys(r)) {
    if (Rn.includes(e) || Di.has(e)) continue;
    Di.add(e);
    const t = On[e], i = t ? `"${e}" wird nicht mehr unterstützt. ${t}` : `Unbekannter Konfigurationsschlüssel "${e}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`;
    console.warn(`[room-climate-card] ${i}`);
  }
}
function Nn(r) {
  const e = Hn(r) ? r : {};
  zn(e);
  const t = J(e.temperature_entity), i = J(e.humidity_entity), n = J(e.window_entity), s = J(e.motion_entity), a = J(e.climate_entity), o = Dn(e.window_open_states), l = M(e.show_window) ?? !!n, h = M(e.show_motion) ?? !!s, c = M(e.show_thermostat) ?? !!a, d = M(e.show_temperature_chart) ?? !!t, m = M(e.show_humidity_chart) ?? !!i, p = e.height, g = p === "auto" || p === void 0 || p === null || p === 0 ? null : H(p, 120, 2e3, 0) || null, S = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", C = e.chart_curve === "linear" ? "linear" : "smooth", T = pn.includes(e.chart_smoothing) ? e.chart_smoothing : _t, U = e.chart_gap_mode === "break" ? "break" : "connect", x = e.chart_gap_style === "dashed" ? "dashed" : "solid", R = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid", D = ve(
    e.accent_color ?? e.temperature_comfort_color,
    fe.accent
  );
  return {
    raw: e,
    name: be(e.name),
    nameFontSize: Ht(e.name_font_size),
    icon: be(e.icon) ?? "mdi:home-thermometer-outline",
    height: g,
    borderRadius: H(e.border_radius, 0, 40, 26),
    padding: Math.round(
      H(
        e.card_padding,
        Mi.min,
        Mi.max,
        kn
      )
    ),
    theme: S,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(H(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(H(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: Hi(
          e.temperature_font_size,
          Ci.temperature
        ),
        fontFamily: Ei(e.temperature_font_family)
      },
      humidity: {
        fontSize: Hi(e.humidity_font_size, Ci.humidity),
        fontFamily: Ei(e.humidity_font_family)
      }
    },
    showSeriesLabels: M(e.show_series_labels) ?? !0,
    accentColor: D,
    humidity: {
      color: ve(e.humidity_color, fe.humidity)
    },
    window: {
      enabled: l && !!n,
      entity: n,
      openStates: o.length ? o : [...Mn]
    },
    motion: {
      enabled: h && !!s,
      entity: s,
      showLastChanged: M(e.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: c && !!a,
      entity: a,
      showRow: M(e.show_climate_row) ?? !0,
      showSetpoint: M(e.show_setpoint) ?? !0,
      showStatus: M(e.show_hvac_status) ?? !0,
      showMode: M(e.show_hvac_mode) ?? !1,
      heatingColor: ve(e.heating_color, fe.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: ve(e.heating_idle_color, D),
      offColor: ve(e.heating_off_color, fe.off)
    },
    chart: {
      showTemperature: d && !!t,
      showHumidity: m && !!i,
      hours: Math.round(H(e.chart_hours, 1, 168, 6)),
      height: Math.round(H(e.chart_height, 30, 400, 112)),
      curve: C,
      smoothing: T,
      gapMode: U,
      maxGapMinutes: Math.round(H(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: x,
      humidityLineStyle: R,
      showPoints: M(e.chart_show_points) ?? !1,
      showTooltip: M(e.chart_show_tooltip) ?? !0,
      showExtremes: M(e.chart_show_extremes) ?? !0,
      showAxis: M(e.chart_show_axis) ?? !0,
      fullBleed: M(e.chart_full_bleed) ?? !0,
      showChartSetpoint: M(e.chart_show_setpoint) ?? !0,
      showTemperatureGradient: M(e.chart_temperature_gradient) ?? !0,
      showHumidityGradient: M(e.chart_humidity_gradient) ?? !0,
      temperatureAreaOpacity: Math.round(H(e.chart_temperature_area_opacity, 10, 300, 100)) / 100,
      humidityAreaOpacity: Math.round(H(e.chart_humidity_area_opacity, 10, 300, 100)) / 100,
      opacity: Math.round(H(e.chart_opacity, 15, 100, 100)) / 100,
      temperatureBands: (M(e.chart_temperature_bands) ?? !1) && d,
      // Thresholds are sorted in `orderBandLimits`: a user may type 24 / 18 / 27.
      bandLimits: $n(
        H(e.chart_band_cold_below, -30, 60, We.coldBelow),
        H(e.chart_band_warm_above, -30, 60, We.warmAbove),
        H(e.chart_band_hot_above, -30, 60, We.hotAbove)
      ),
      bandTransition: Math.round(
        H(e.chart_band_transition, 0, 100, ir)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: M(e.chart_show_grid) ?? !1
    },
    tapAction: e.tap_action === "none" ? "none" : "more-info"
  };
}
function Fn(r) {
  return r.chart.fullBleed ? -r.padding : 0;
}
function Ln(r) {
  const e = !r.chart.showAxis;
  return r.chart.fullBleed && e ? -r.padding : 0;
}
function Bn(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function nr(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function sr(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function ar(r) {
  const e = Ht(r);
  return Math.round(e * 4 / 3);
}
function In(r) {
  const e = Ht(r);
  return Math.min(36, Math.round(e * 16 / Et));
}
function Ht(r) {
  return Math.round(
    H(r, Ye.min, Ye.max, Et)
  );
}
function pt(r) {
  if (r.height) return r.height;
  const e = r.typography.temperature.fontSize, t = nr(r) ? r.chart.height : 0, i = sr(r) ? 20 : 0, n = Math.max(28, ar(r.nameFontSize) + 8), s = r.showSeriesLabels ? 20 : 0;
  return r.padding * 2 + n + 12 + s + e + 8 + i + 12 + t;
}
function Ri(r, e) {
  if (r.name) return r.name;
  if (r.temperatureEntity) {
    const i = e?.states[r.temperatureEntity]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  return "Raumklima";
}
const Pn = {
  roomClimate: "Raumklima",
  noEntities: "Keine Sensoren konfiguriert",
  noEntitiesHint: "Über den Karteneditor Temperatur- und Luftfeuchtesensor auswählen.",
  temperature: "Temperatur",
  humidity: "Luftfeuchte",
  windowOpen: "Fenster offen",
  bandCold: "kalt",
  bandNormal: "normal",
  bandWarm: "warm",
  bandHot: "heiß",
  windowClosed: "Fenster geschlossen",
  windowUnknown: "Fensterstatus unbekannt",
  motionDetected: "Bewegung erkannt",
  motionIdle: "Keine Bewegung",
  motionUnknown: "Bewegungsstatus unbekannt",
  quietSince: "Ruhe seit",
  justNow: "gerade eben",
  heating: "Heizt",
  idle: "Bereit",
  off: "Aus",
  statusUnknown: "Status unbekannt",
  unavailable: "Nicht verfügbar",
  unknown: "Unbekannt",
  setpoint: "Soll",
  mode: "Modus",
  openThermostat: "Thermostat öffnen",
  noHistory: "Keine Verlaufsdaten",
  noHistoryHint: "Für den gewählten Zeitraum liegen keine Messwerte vor.",
  loadingHistory: "Verlauf wird geladen …",
  historyError: "Verlauf konnte nicht geladen werden",
  celsius: "°C",
  now: "Jetzt",
  minutesShort: "Min.",
  hoursShort: "Std.",
  daysShort: "Tg.",
  hoursRange: (r) => `letzte ${r} Std.`,
  chartAria: (r) => `Verlaufsdiagramm der letzten ${r} Stunden`,
  hvacAction: {
    heating: "Heizt",
    idle: "Bereit",
    off: "Aus",
    cooling: "Kühlt",
    fan: "Lüftet",
    drying: "Trocknet",
    preheating: "Vorheizen",
    defrosting: "Abtau",
    idle_unknown: "Status unbekannt"
  },
  hvacMode: {
    off: "Aus",
    heat: "Heizen",
    cool: "Kühlen",
    auto: "Automatik",
    heat_cool: "Automatik",
    dry: "Trocknen",
    fan_only: "Lüften"
  }
}, Un = {
  roomClimate: "Room climate",
  noEntities: "No sensors configured",
  noEntitiesHint: "Choose a temperature and humidity sensor in the card editor.",
  temperature: "Temperature",
  humidity: "Humidity",
  windowOpen: "Window open",
  bandCold: "cold",
  bandNormal: "normal",
  bandWarm: "warm",
  bandHot: "hot",
  windowClosed: "Window closed",
  windowUnknown: "Window state unknown",
  motionDetected: "Motion detected",
  motionIdle: "No motion",
  motionUnknown: "Motion state unknown",
  quietSince: "Quiet for",
  justNow: "just now",
  heating: "Heating",
  idle: "Ready",
  off: "Off",
  statusUnknown: "Status unknown",
  unavailable: "Unavailable",
  unknown: "Unknown",
  setpoint: "Set",
  mode: "Mode",
  openThermostat: "Open thermostat",
  noHistory: "No history data",
  noHistoryHint: "There are no measurements for the selected period.",
  loadingHistory: "Loading history …",
  historyError: "History could not be loaded",
  celsius: "°C",
  now: "Now",
  minutesShort: "min",
  hoursShort: "h",
  daysShort: "d",
  hoursRange: (r) => `last ${r} h`,
  chartAria: (r) => `History chart of the last ${r} hours`,
  hvacAction: {
    heating: "Heating",
    idle: "Ready",
    off: "Off",
    cooling: "Cooling",
    fan: "Fan",
    drying: "Drying",
    preheating: "Preheating",
    defrosting: "Defrosting",
    idle_unknown: "Status unknown"
  },
  hvacMode: {
    off: "Off",
    heat: "Heat",
    cool: "Cool",
    auto: "Auto",
    heat_cool: "Auto",
    dry: "Dry",
    fan_only: "Fan only"
  }
}, Vn = Pn;
function vt(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Gn(r) {
  const e = vt(r) === "de" ? Vn : Un;
  return {
    language: vt(r),
    t(t) {
      return e[t];
    },
    hoursRange: (t) => e.hoursRange(t),
    chartAria: (t) => e.chartAria(t),
    action: (t) => {
      const i = e.hvacAction;
      return i[t] ?? i.idle_unknown ?? t;
    },
    mode: (t) => e.hvacMode[t] ?? t
  };
}
function xe(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
const Oi = /* @__PURE__ */ new Map();
function Kn(r, e) {
  const t = `${r}|${e}`;
  let i = Oi.get(t);
  if (!i) {
    try {
      i = new Intl.NumberFormat(r, {
        minimumFractionDigits: e,
        maximumFractionDigits: e
      });
    } catch {
      i = new Intl.NumberFormat("en", {
        minimumFractionDigits: e,
        maximumFractionDigits: e
      });
    }
    Oi.set(t, i);
  }
  return i;
}
function se(r, e, t) {
  return Number.isFinite(r) ? Kn(e || "en", xe(Math.round(t), 0, 3)).format(r) : "–";
}
function Qe(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function Wn(r, e, t) {
  const i = Math.max(0, e - r), n = Math.floor(i / 6e4);
  if (n < 1) return t.justNow;
  if (n < 60) return `${n} ${t.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${t.hours}` : `${Math.floor(s / 24)} ${t.days}`;
}
function zi(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function $t(r) {
  const e = r?.trim().toLowerCase();
  return e ? e.includes("°f") || e === "f" || e.startsWith("fahrenheit") ? "F" : e.includes("°c") || e === "c" || e.startsWith("celsius") ? "C" : null : null;
}
function Ni(r, e, t) {
  if (!Number.isFinite(r)) return null;
  const i = $t(e), n = $t(t);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function xt(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function jn(r) {
  return `#${r.map((e) => xe(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Ve(r, e) {
  const t = xt(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${xe(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${xe(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(xe(e, 0, 1) * 100)}%, transparent)`;
}
function et(r) {
  return r === "unavailable" || r === "unknown";
}
function Fi(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const n = r?.states[e];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (et(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = Qe(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function Zn(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (et(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return e.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : Cn.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Yn = ["on", "detected", "motion", "occupied", "active"];
function Xn(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (et(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (Yn.includes(a))
    return { status: "active", entity: i, rawState: n };
  const o = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (o.sinceMs = s), o;
}
const qn = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Li(r, e, t) {
  const i = e.thermostat.entity, n = zi(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), s = r?.states[i ?? ""]?.attributes?.unit_of_measurement, a = zi(typeof s == "string" ? s : n);
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const l = o.state?.toLowerCase(), h = o.attributes?.hvac_action, c = typeof h == "string" ? h.toLowerCase() : void 0, d = o.attributes?.temperature, m = typeof d == "number" ? d : typeof d == "string" ? Qe(d) : null, p = {
    entity: o,
    action: c,
    setpoint: m,
    unit: a,
    mode: l,
    modeLabel: l ? t.mode(l) : void 0
  };
  return et(o.state ?? "") ? { ...p, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...p, status: "off", label: t.t("off"), colorKey: "off" } : c === "heating" ? { ...p, status: "heating", label: t.t("heating"), colorKey: "heating" } : c === "idle" ? { ...p, status: "idle", label: t.t("idle"), colorKey: "idle" } : c === "off" ? { ...p, status: "off", label: t.t("off"), colorKey: "off" } : c && !qn.includes(c) ? { ...p, status: "action", label: t.action(c), colorKey: "idle" } : c ? { ...p, status: "action", label: t.action(c), colorKey: "idle" } : { ...p, status: "unknown", label: t.t("statusUnknown"), colorKey: "unknown" };
}
function Jn(r, e) {
  switch (r.colorKey) {
    case "heating":
      return e.thermostat.heatingColor;
    case "idle":
      return e.thermostat.idleColor;
    case "off":
      return e.thermostat.offColor;
    default:
      return "var(--rcc-muted)";
  }
}
function Se(r) {
  return typeof r == "object" && r !== null;
}
function Qn(r) {
  if (!Se(r)) return;
  const e = r.lu;
  if (typeof e == "number" && Number.isFinite(e))
    return e > 1e12 ? e : e * 1e3;
  for (const t of ["last_changed", "last_updated", "lc"]) {
    const i = r[t];
    if (typeof i == "number" && Number.isFinite(i))
      return i > 1e12 ? i : i * 1e3;
    if (typeof i == "string") {
      const n = Date.parse(i);
      if (Number.isFinite(n)) return n;
    }
  }
}
function es(r) {
  if (Se(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Bi(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const n = Qn(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = es(i), a = Qe(s);
    e.push({ t: n, v: a });
  }
  if (!e.length) return [];
  e.sort((i, n) => i.t - n.t);
  const t = [];
  for (const i of e) {
    const n = t[t.length - 1];
    n && n.t === i.t ? t[t.length - 1] = i : t.push(i);
  }
  return t;
}
function Ii(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = Se(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in t)) continue;
      const a = Bi(i);
      t[s] = ts(t[s], a);
    }
    return t;
  }
  if (Se(r))
    for (const i of e) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : Se(n) && Array.isArray(n.data) ? n.data : n;
      t[i] = Bi(s);
    }
  return t;
}
function ts(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((n, s) => n.t - s.t), i = [];
  for (const n of t) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function is(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), n = new Date(t.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const l = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = Ii(l, e);
      return Object.values(h).some((c) => c.length > 0), h;
    } catch (l) {
      if (!r.callApi) throw l;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((l) => encodeURIComponent(l)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, o = await r.callApi("GET", a);
  return Ii(o, e);
}
function rs(r, e) {
  return `${[...r].sort().join("|")}@${e}`;
}
class ns {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, n = Date.now()) {
    const s = rs(t, i), a = this.cache.get(s);
    if (a && n - a.fetchedAt < 12e4)
      return a.data;
    const o = this.inflight.get(s);
    if (o) return o;
    const l = is(e, t, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((h) => {
      if (this.cache.set(s, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const c = this.cache.keys().next();
        c.done || this.cache.delete(c.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(s);
    });
    return this.inflight.set(s, l), l;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const L = (r) => v`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, Z = {
  thermometer: () => L(v`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => L(v`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => L(
    v`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => L(
    v`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => L(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => L(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => L(
    v`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => L(
    v`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => L(v`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => L(
    v`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => L(v`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => L(v`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => L(v`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => L(
    v`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const ss = (r) => r.strings === void 0;
const as = { CHILD: 2 }, os = (r) => (...e) => ({ _$litDirective$: r, values: e });
class ls {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
const Ae = (r, e) => {
  const t = r._$AN;
  if (t === void 0) return !1;
  for (const i of t) i._$AO?.(e, !1), Ae(i, e);
  return !0;
}, Xe = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while (t?.size === 0);
}, or = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), ds(e);
  }
};
function hs(r) {
  this._$AN !== void 0 ? (Xe(this), this._$AM = r, or(this)) : this._$AM = r;
}
function cs(r, e = !1, t = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(i)) for (let s = t; s < i.length; s++) Ae(i[s], !1), Xe(i[s]);
  else i != null && (Ae(i, !1), Xe(i));
  else Ae(this, r);
}
const ds = (r) => {
  r.type == as.CHILD && (r._$AP ??= cs, r._$AQ ??= hs);
};
class us extends ls {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, i) {
    super._$AT(e, t, i), or(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (Ae(this, e), Xe(this));
  }
  setValue(e) {
    if (ss(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const t = [...this._$Ct._$AH];
      t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const Y = () => new ms();
class ms {
}
const ft = /* @__PURE__ */ new WeakMap(), X = os(class extends us {
  render(r) {
    return f;
  }
  update(r, [e]) {
    const t = e !== this.G;
    return t && this.rt(void 0), (t || this.lt !== this.ct) && (this.G = e, this.ht = r.options?.host, this.rt(this.ct = r.element)), f;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let t = ft.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), ft.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? ft.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function ps(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const n = vn(t, e), s = n.map((o) => t[o]), a = [];
  for (let o = 1; o < n.length; o++)
    a.push(i.slice(n[o - 1] + 1, n[o] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const fs = 320, gs = 112, ys = 4e3, bs = 150, ws = 14, _s = 2.8, Ge = 6, Pi = /* @__PURE__ */ new Set();
function vs(r, e) {
  const t = `${r}|${e}`;
  Pi.has(t) || (Pi.add(t), console.info(
    `[room-climate-card] Minimum/Maximum der ${e} ausgeblendet: ${r}. Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.`
  ));
}
const $s = 0.3, xs = 0.44, Ss = { minSpan: 0.4, padding: 0.15 }, As = { minSpan: 3, padding: 0.15 };
let ks = 0;
class Ms extends ue {
  constructor() {
    super(...arguments), this.accentColor = "#4FD1A5", this.humidityColor = "#8B86D6", this.setpoint = null, this.setpointUnit = "°C", this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showPoints = !1, this.showGrid = !1, this.curve = "smooth", this.smoothing = "light", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.showTemperatureArea = !0, this.showHumidityArea = !0, this.chartOpacity = 100, this.temperatureAreaOpacity = 1, this.humidityAreaOpacity = 1, this.temperatureBands = !1, this.bandCold = 18, this.bandWarm = 24, this.bandHot = 27, this.bandTransition = 100, this.temperatureScale = "C", this.showAxis = !0, this.showSetpoint = !0, this.cornerRadius = 26, this.showTooltip = !0, this.showExtremes = !0, this.temperatureDecimals = 1, this.humidityDecimals = 1, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte",
      now: "Jetzt",
      setpoint: "Soll"
    }, this.uid = `rcc-chart-${++ks}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = Y(), this.crosshairRef = Y(), this.temperatureDotRef = Y(), this.humidityDotRef = Y(), this.tooltipRef = Y(), this.tooltipTimeRef = Y(), this.tooltipTemperatureRef = Y(), this.tooltipHumidityRef = Y(), this.tooltipTemperatureRowRef = Y(), this.tooltipHumidityRowRef = Y(), this.onPointerDown = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerMove = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerUp = (e) => {
      (e.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), ys));
    }, this.onPointerLeave = (e) => {
      (e.pointerType || this.lastPointerType) === "mouse" && this.hideHover();
    };
  }
  static {
    this.properties = {
      temperature: { attribute: !1 },
      humidity: { attribute: !1 },
      accentColor: { attribute: !1 },
      humidityColor: { attribute: !1 },
      setpoint: { attribute: !1 },
      setpointUnit: { attribute: !1 },
      start: { attribute: !1 },
      end: { attribute: !1 },
      showPoints: { attribute: !1 },
      showGrid: { attribute: !1 },
      curve: { attribute: !1 },
      smoothing: { attribute: !1 },
      gapMode: { attribute: !1 },
      maxGapMinutes: { attribute: !1 },
      gapStyle: { attribute: !1 },
      humidityLineStyle: { attribute: !1 },
      showTemperatureArea: { attribute: !1 },
      showHumidityArea: { attribute: !1 },
      chartOpacity: { attribute: !1 },
      temperatureAreaOpacity: { attribute: !1 },
      humidityAreaOpacity: { attribute: !1 },
      temperatureBands: { attribute: !1 },
      bandCold: { attribute: !1 },
      bandWarm: { attribute: !1 },
      bandHot: { attribute: !1 },
      bandTransition: { attribute: !1 },
      temperatureScale: { attribute: !1 },
      showAxis: { attribute: !1 },
      showSetpoint: { attribute: !1 },
      cornerRadius: { attribute: !1 },
      showTooltip: { attribute: !1 },
      showExtremes: { attribute: !1 },
      temperatureUnit: { attribute: !1 },
      humidityUnit: { attribute: !1 },
      temperatureDecimals: { attribute: !1 },
      humidityDecimals: { attribute: !1 },
      language: { attribute: !1 },
      timeZone: { attribute: !1 },
      hour12: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = kt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      position: relative;
      --rcc-chart-label: var(--rcc-tertiary, rgba(255, 255, 255, 0.32));
      --rcc-chart-rule: var(--rcc-text, #ffffff);
      --rcc-chart-point-fill: var(--rcc-bg, #0e1013);
    }
    :host([hidden]) {
      display: none;
    }
    .wrap {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    svg {
      display: block;
      flex: 0 0 auto;
      overflow: visible;
    }
    .state {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 4px 0 8px;
      color: var(--rcc-chart-label);
      text-align: center;
    }
    .state-title {
      font-size: 11px;
      font-weight: 500;
      color: var(--rcc-text);
      opacity: 0.6;
    }
    .state-hint {
      font-size: 10px;
      line-height: 1.3;
      max-width: 34ch;
      opacity: 0.75;
    }
    .state svg {
      width: 18px;
      height: 18px;
      flex: none;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.6;
      opacity: 0.7;
      margin-bottom: 2px;
    }
    /* Reduced axis: 10.5 px at 32 % – present, never loud. */
    .axis-label {
      font-size: 10.5px;
      font-weight: 400;
      fill: var(--rcc-chart-label);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      letter-spacing: 0.01em;
    }
    .grid-line {
      stroke: var(--rcc-chart-rule);
      stroke-opacity: 0.06;
      stroke-width: 1;
      stroke-dasharray: 2 6;
    }
    /* One hairline instead of a grey bar. */
    .baseline {
      stroke: var(--rcc-chart-rule);
      stroke-opacity: 0.1;
      stroke-width: 1;
    }
    .series-line {
      fill: none;
      stroke-width: 1.9;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    .point {
      stroke-width: 1.4;
    }
    .end-dot {
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.4;
    }
    .setpoint-line {
      stroke-width: 1;
      stroke-dasharray: 3 4;
      vector-effect: non-scaling-stroke;
    }
    .setpoint-caption {
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 0.09em;
      fill: var(--rcc-chart-label);
      text-transform: uppercase;
    }
    /*
     * Pointer layer. The pan-y touch action is the important part: a vertical swipe still
     * scrolls the dashboard, only horizontal exploration belongs to the chart.
     * Without it the chart would swallow every touch on a wall tablet.
     */
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      touch-action: pan-y;
      cursor: crosshair;
    }
    .hover {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hover[hidden] {
      display: none;
    }
    .crosshair {
      position: absolute;
      width: 1px;
      background: var(--rcc-chart-rule);
      opacity: 0.16;
    }
    .hover-dot {
      position: absolute;
      width: 7px;
      height: 7px;
      margin: -3.5px 0 0 -3.5px;
      border-radius: 50%;
      box-shadow: 0 0 0 1.5px var(--rcc-chart-point-fill);
    }
    .hover-dot[hidden] {
      display: none;
    }
    .tooltip {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 1px;
      padding: 4px 7px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--rcc-bg, #0e1013) 88%, transparent);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.07), 0 6px 16px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(6px);
      font-size: 10px;
      line-height: 1.35;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      color: var(--rcc-text);
      white-space: nowrap;
    }
    .tooltip-time {
      font-size: 9px;
      letter-spacing: 0.02em;
      opacity: 0.5;
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 5px;
      opacity: 0.92;
    }
    .tooltip-row[hidden] {
      display: none;
    }
    .tooltip-row i {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex: none;
    }
    /*
     * The number sits next to the curve, so it needs a halo in the card colour
     * – otherwise the line strikes through it.
     */
    .extreme-label {
      font-size: 10px;
      font-weight: 500;
      fill: var(--rcc-text);
      /*
       * 9 px at 55 % read as "nothing" on a dark card, especially on a screen
       * that is not perfectly calibrated. The number is orientation, not
       * decoration – it has to be legible, so it gets real contrast and a
       * slightly wider halo in the card colour.
       */
      fill-opacity: 0.8;
      letter-spacing: 0.02em;
      font-variant-numeric: tabular-nums;
      paint-order: stroke;
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 2;
      stroke-linejoin: round;
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver((e) => {
      const t = e[0];
      if (!t) return;
      const i = t.contentRect;
      this.applySize(i.width, i.height);
    }), this.resizeObserver.observe(this)), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => this.measure()) : this.measure();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.clearHoverTimer();
  }
  measure() {
    const e = this.getBoundingClientRect();
    this.applySize(e.width, e.height);
  }
  applySize(e, t) {
    const i = Math.round(e), n = Math.round(t);
    i === this.width && n === this.height || (this.width = i, this.height = n, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(e, t) {
    this.applySize(e, t);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : fs,
      height: this.height > 20 ? this.height : gs
    };
  }
  stateView(e, t, i) {
    return b`<div class="wrap">
      <div class="state" role="status">
        ${e}
        <span class="state-title">${t}</span>
        ${i ? b`<span class="state-hint">${i}</span>` : f}
      </div>
    </div>`;
  }
  get temperatureVisible() {
    return !!this.temperature?.some((e) => e.v !== null);
  }
  get humidityVisible() {
    return !!this.humidity?.some((e) => e.v !== null);
  }
  get hasData() {
    return !!(this.temperature?.some((e) => e.v !== null) || this.humidity?.some((e) => e.v !== null));
  }
  render() {
    const { width: e, height: t } = this.chartSize;
    if (e < 40 || t < 34) return f;
    const i = v`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = v`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(e, t);
    return this.hoverGeometry = a, b`<div class="wrap">${s}${this.renderOverlay(a)}</div>`;
  }
  renderChart(e, t) {
    const i = t, n = this.showAxis && i >= 62, s = n ? 20 : 0.5, a = 6, o = i - s, l = Math.max(6, o - a), h = 0, c = e - 1 - _s, d = e, m = 3, p = Math.max(1, this.end - this.start), g = Pe([this.start, this.end], [h, c]), S = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, C = Pe(
      [this.start, this.end],
      [h + S, d - S]
    ), T = i - 6, U = this.temperature !== void 0, x = this.humidity !== void 0, R = U !== x, D = a, B = R ? o : a + l * $s, j = R ? a : a + l * xs, ee = o, He = this.temperatureVisible ? this.temperature ?? [] : [], Dt = this.humidityVisible ? this.humidity ?? [] : [], Rt = He.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), hr = Dt.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), te = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, cr = te !== null ? [...Rt, te] : Rt, tt = yi(cr), it = yi(hr), ae = tt ? bi(tt[0], tt[1], Ss) : null, we = it ? bi(it[0], it[1], As) : null, O = ae ? Pe(ae, [ee, j]) : null, oe = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), ie = this.temperatureBands && ae ? xn(
      ae,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: ht, normal: this.accentColor, warm: ct, hot: dt },
      this.bandTransition
    ) : null, Ot = (u) => ee === j ? 0 : (u - j) / (ee - j), zt = oe < 1 ? `;stroke-opacity:${oe}` : "", Nt = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * oe), Ft = Nt(this.temperatureAreaOpacity), Lt = Nt(this.humidityAreaOpacity), Bt = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * Ft).toFixed(3)
      )
    ), dr = ie ? ie.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: Bt(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: Bt(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * Ft).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], ur = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * Lt).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * Lt).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], V = we ? Pe(we, [B, D]) : null, le = _i(He, this.start, this.end), De = _i(Dt, this.start, this.end), It = {
      rangeMs: p,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Re = this.curve === "smooth", Pt = (u) => {
      if (!Re || u.length < 5) return u;
      const y = Ji(u), $ = Math.min(
        yn(y, this.smoothing),
        u.length % 2 ? u.length : u.length - 1
      );
      return $ < 3 ? u : mn(u, $, {
        maxDeltaMs: bn($, y)
      });
    }, mr = Pt(le), pr = Pt(De), Ut = ae ? wi(mr, It) : [], Vt = we ? wi(pr, It) : [], fr = Math.max(1, Ut.length + Vt.length), gr = Math.max(60, Math.floor(1200 / fr)), Gt = (u) => u.map((y) => ps(y, gr)), Oe = Gt(Ut), ze = Gt(Vt), Kt = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const y = a + l * u / 3;
        Kt.push(v`<line class="grid-line" x1=${h} x2=${d} y1=${y} y2=${y} />`);
      }
    const Wt = n ? Math.min(3, _n(e)) : 0, jt = Wt >= 2 ? wn(this.start, this.end, Math.max(2, Wt)) : [], yr = jt.map((u, y) => {
      const $ = y === jt.length - 1, _ = y === 0 ? "start" : $ ? "end" : "middle";
      return v`<text class="axis-label" x=${C(u)} y=${T} text-anchor=${_}>
        ${this.formatAxisLabel(u, $)}
      </text>`;
    }), br = (u) => {
      if (u.length < 2) return u;
      const y = u[u.length - 1];
      return y.x < c - 0.75 ? u : [...u, { x: d, y: y.y }];
    }, Zt = (u, y) => br(on(u, g, y)), wr = (u, y, $) => (this.gapStyle === "dashed" ? an(u) : [u.samples]).filter((k) => k.length > 1).flatMap((k) => {
      const G = Zt(k, y);
      return !$ || !ie ? [{ d: tr(G, Re).concat() }] : An(G, Re, ie, Ot);
    }).filter((k) => k.d.length > 0), Yt = (u, y, $, _ = {}) => {
      const k = wr(u, y, _.banded === !0), G = oe < 1 ? `opacity:${oe}` : "", K = k.map(({ d: z, color: N }, F) => {
        const at = _.banded && k.length > 1 ? `stroke-linecap:${F === 0 || F === k.length - 1 ? "round" : "butt"};` : "", Le = [
          `stroke:${N ?? _.color ?? $}`,
          at,
          _.width ? `stroke-width:${_.width}` : "",
          _.dashed ? "stroke-dasharray:0.1 5.5" : "",
          _.banded ? "" : zt.replace(/^;/, "")
        ].filter(Boolean).join(";");
        return v`<path class="series-line" d=${z} style=${Le}></path>`;
      });
      return !_.banded || k.length < 2 ? K : [v`<g class="series-runs" style=${G}>${K}</g>`];
    }, _r = Oe.flatMap(
      (u) => Yt(u, O, this.accentColor, {
        color: this.accentColor,
        banded: ie !== null
      })
    ), Xt = (u, y, $) => u.filter((_) => _.samples.length > 1).map((_) => un(Zt(_.samples, y), $, Re)).join(" "), qt = O && this.showTemperatureArea ? Xt(Oe, O, o) : "", vr = qt ? [v`<path class="series-area" d=${qt} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Jt = V && this.showHumidityArea ? Xt(ze, V, B) : "", $r = Jt ? [
      v`<path class="series-area" d=${Jt} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], Qt = this.humidityLineStyle === "dotted", xr = ze.flatMap(
      (u) => Yt(u, V, this.humidityColor, {
        color: this.humidityColor,
        dashed: Qt,
        width: Qt ? 2.2 : 1.9
      })
    ), ei = [];
    if (this.showPoints) {
      const u = (y, $, _) => {
        const k = y.filter((z) => z.v !== null);
        if (!k.length) return;
        const K = Math.max(1, Math.ceil(k.length / 24));
        k.forEach((z, N) => {
          if (N % K !== 0 && N !== k.length - 1) return;
          const F = z.v;
          ei.push(
            v`<circle class="point" r="1.7" cx=${g(z.t)} cy=${$(F)} style="stroke:${_}${zt}" />`
          );
        });
      };
      O && Oe.forEach((y) => u(y.samples, O, this.accentColor)), V && ze.forEach(
        (y) => u(y.samples, V, this.humidityColor)
      );
    }
    const I = te !== null && O ? O(te) : null, Ne = this.showSetpoint && I !== null && Number.isFinite(I) && I >= j - 0.5 && I <= ee + 0.5, Sr = le.find((u) => u.v !== null)?.v ?? null, Ar = [...le].reverse().find((u) => u.v !== null)?.v ?? null, ti = (u) => u === null || te === null ? 0 : Math.abs(u - te), rt = ti(Ar) >= ti(Sr), ii = (u) => {
      for (let y = u.length - 1; y >= 0; y -= 1) {
        const $ = u[y].samples;
        for (let _ = $.length - 1; _ >= 0; _ -= 1)
          if ($[_].v !== null) return $[_];
      }
    }, Fe = ii(Oe), nt = ii(ze), kr = Ne && te !== null ? `${this.labels.setpoint} ${se(te, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", ri = (u, y, $, _) => {
      const k = xi(y);
      if (!k || k.min.v === k.max.v) return "";
      const G = se(k.min.v, this.language, _), K = se(k.max.v, this.language, _);
      return `${u} ${G}–${K}${$ ? ` ${$}` : ""}`;
    }, Mr = this.temperatureUnit || this.setpointUnit, Cr = (() => {
      if (!ie || !O) return "";
      const u = le.map((F) => F.v).filter((F) => F !== null && Number.isFinite(F));
      if (!u.length) return "";
      const y = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, $ = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, _ = { cold: ht, normal: this.accentColor, warm: ct, hot: dt }, k = Si(Math.min(...u), y, _), G = Si(Math.max(...u), y, _), K = (F) => F === ht ? $.cold : F === ct ? $.warm : F === dt ? $.hot : $.normal, z = K(k), N = K(G);
      return z === N ? `(${z})` : `(${z} – ${N})`;
    })(), Tr = [
      this.labels.aria,
      kr,
      O ? ri(this.labels.temperature, le, Mr, this.temperatureDecimals) : "",
      V ? ri(this.labels.humidity, De, this.humidityUnit, this.humidityDecimals) : "",
      Cr
    ].filter(Boolean).join(". "), st = [], ni = (u, y, $, _, k, G, K) => {
      if (!this.showExtremes) return;
      const z = (w) => vs(w, K);
      if (e < bs) return z("schmale Karte");
      if (_ - $ < ws) return z("flaches Band");
      const N = xi(u);
      if (!N) return z("keine Messwerte");
      if (u.filter((w) => w.v !== null).length < 3) return z("zu wenige Messwerte");
      const at = (N.min.v === N.max.v ? [{ sample: N.max, isMax: !0 }] : [
        { sample: N.max, isMax: !0 },
        { sample: N.min, isMax: !1 }
      ]).map(({ sample: w, isMax: W }) => {
        const Be = g(w.t), E = y(w.v), P = E - 11 >= $, Ie = E + 17 <= _, he = P ? E - 9 : $ + 8, re = Ie ? E + 15 : _ - 1;
        let ot = W ? P ? he : re : Ie ? re : he;
        if (Ne && I !== null && Math.abs(ot - I) < 9) {
          const si = W ? re : he;
          Math.abs(si - I) >= 9 && (ot = si);
        }
        return { sample: w, cx: Be, cy: E, labelY: ot, isMax: W };
      }).filter((w) => Number.isFinite(w.cx) && Number.isFinite(w.cy)).filter((w) => w.cy >= $ - 1 && w.cy <= _ + 1), Le = (w, W) => Math.abs(w.labelY - W.labelY) < 9 && Math.abs(w.cx - W.cx) < 34;
      let q = [...at];
      if (q.length === 2 && Le(q[0], q[1])) {
        for (const w of q)
          w.labelY = w.isMax ? $ + 8 : _ - 1;
        Le(q[0], q[1]) && (q = q.filter((w) => w.isMax));
      }
      for (const w of q) {
        if (!w) continue;
        const W = 26, Be = w.cx < (h + c) / 2;
        let E = Be ? w.cx + 6 : w.cx - 6, P = Be ? "start" : "end";
        P === "start" && E + W > d - Ge ? (E = w.cx - 6, P = "end") : P === "end" && E - W < h + Ge && (E = w.cx + 6, P = "start");
        const Ie = rt ? d - m : h + m, he = (re) => Ne && I !== null && Math.abs(w.labelY - (I - 5)) < 9 && Math.abs(re - Ie) < 40;
        if (he(E)) {
          const re = P === "start" ? w.cx - 6 : w.cx + 6;
          he(re) || (E = re, P = P === "start" ? "end" : "start");
        }
        E = P === "start" ? Math.min(E, d - Ge - W) : Math.max(E, h + Ge + W), st.push(
          v`<circle
            class="extreme-dot"
            r="1.8"
            cx=${w.cx}
            cy=${w.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${k};stroke-width:1.2`}
          />`
        ), he(E) || st.push(
          v`<text class="extreme-label" x=${E} y=${w.labelY} text-anchor=${P}>${se(
            w.sample.v,
            this.language,
            G
          )}</text>`
        );
      }
    };
    O && ni(
      le,
      O,
      j,
      ee,
      this.accentColor,
      this.temperatureDecimals,
      "Temperatur"
    ), V && ni(
      De,
      V,
      D,
      B,
      this.humidityColor,
      this.humidityDecimals,
      "Luftfeuchte"
    );
    const Er = {
      width: e,
      height: i,
      left: h,
      right: c,
      plotTop: a,
      plotBottom: o,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: O && ae ? { samples: le, domain: ae, top: j, bottom: ee } : null,
      humidity: V && we ? { samples: De, domain: we, top: D, bottom: B } : null
    };
    return { chart: v`<svg
      width=${e}
      height=${i}
      viewBox="0 0 ${e} ${i}"
      role="img"
      aria-label=${Tr}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${j} x2="0" y2=${ee} gradientUnits="userSpaceOnUse">
          ${dr.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${D} x2="0" y2=${B} gradientUnits="userSpaceOnUse">
          ${ur.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Kt}
      ${$r}
      ${vr}
      ${Ne ? v`<line
            class="setpoint-line"
            x1=${h}
            x2=${c}
            y1=${I}
            y2=${I}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${rt ? d - m : h + m}
            y=${I - 5}
            text-anchor=${rt ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : f}
      ${/*
    * With the time row the baseline separates plot and labels. Without it
    * the plot ends on the card's own edge – a second line there read as a
    * thicker border than the sides.
    */
    n ? v`<line class="baseline" x1=${h} x2=${d} y1=${o} y2=${o} />` : f}
      ${xr} ${_r} ${ei}
      ${nt && V ? v`<circle
            class="end-dot"
            r="2.6"
            cx=${g(nt.t)}
            cy=${V(nt.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${oe}`}
          />` : f}
      ${Fe && O ? v`<circle
            class="end-dot"
            r="2.8"
            cx=${g(Fe.t)}
            cy=${O(Fe.v)}
            style=${`fill:${ie ? rr(ie, Ot(O(Fe.v))) : this.accentColor};fill-opacity:${oe}`}
          />` : f}
      ${st}
      ${yr}
    </svg>`, geometry: Er };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(e) {
    if (!this.showTooltip || !e.temperature && !e.humidity) return f;
    const t = Math.round(e.plotTop), i = Math.max(1, Math.round(e.plotBottom - e.plotTop));
    return b`<div
        class="overlay"
        style=${`top:${t}px;height:${i}px`}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
      ></div>
      <div class="hover" ${X(this.hoverRef)} hidden aria-hidden="true">
        <div
          class="crosshair"
          ${X(this.crosshairRef)}
          style=${`top:${t}px;height:${i}px`}
        ></div>
        <div
          class="hover-dot"
          ${X(this.temperatureDotRef)}
          style=${`background:${this.accentColor}`}
          hidden
        ></div>
        <div
          class="hover-dot"
          ${X(this.humidityDotRef)}
          style=${`background:${this.humidityColor}`}
          hidden
        ></div>
        <div class="tooltip" ${X(this.tooltipRef)}>
          <span class="tooltip-time" ${X(this.tooltipTimeRef)}></span>
          <span class="tooltip-row" ${X(this.tooltipTemperatureRowRef)}>
            <i style=${`background:${this.accentColor}`}></i>
            <span ${X(this.tooltipTemperatureRef)}></span>
          </span>
          <span class="tooltip-row" ${X(this.tooltipHumidityRowRef)}>
            <i style=${`background:${this.humidityColor}`}></i>
            <span ${X(this.tooltipHumidityRef)}></span>
          </span>
        </div>
      </div>`;
  }
  updateHoverAt(e) {
    const t = this.hoverGeometry;
    if (!t) return;
    const n = e.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : t.width;
    if (!s) return;
    const a = n ? n.left : 0, o = Math.min(1, Math.max(0, (e.clientX - a) / s)), l = t.start + o * (t.end - t.start);
    this.showHoverAt(l);
  }
  xForTime(e, t) {
    const i = Math.max(1, t.end - t.start);
    return t.left + (e - t.start) / i * (t.right - t.left);
  }
  yForValue(e, t) {
    const [i, n] = e.domain, s = n - i || 1;
    return e.bottom - (t - i) / s * (e.bottom - e.top);
  }
  tooltipValue(e, t, i) {
    const n = se(e, this.language, i);
    return t ? `${n} ${t}` : n;
  }
  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  showHoverAt(e) {
    const t = this.hoverGeometry, i = this.hoverRef.value;
    if (!t || !i) return;
    const n = t.temperature ? Ue(t.temperature.samples, e) : null, s = t.humidity ? Ue(t.humidity.samples, e) : null;
    let a = n ?? s;
    if (n && s && (a = Math.abs(n.t - e) <= Math.abs(s.t - e) ? n : s), !a) {
      this.hideHover();
      return;
    }
    const o = a.t, l = this.crosshairRef.value, h = this.xForTime(o, t);
    l && (l.style.left = `${h}px`);
    const c = t.temperature ? Ue(t.temperature.samples, o) : null, d = t.humidity ? Ue(t.humidity.samples, o) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      t.temperature,
      c,
      h
    ), this.placeDot(this.humidityDotRef.value, t.humidity, d, h);
    const m = this.tooltipRef.value, p = this.tooltipTimeRef.value, g = this.tooltipTemperatureRowRef.value, S = this.tooltipHumidityRowRef.value, C = this.tooltipTemperatureRef.value, T = this.tooltipHumidityRef.value, U = this.temperatureUnit || this.setpointUnit;
    if (p && (p.textContent = this.formatDayTime(o)), g && (g.hidden = !c), S && (S.hidden = !d), C && c && (C.textContent = this.tooltipValue(
      c.v,
      U,
      this.temperatureDecimals
    )), T && d && (T.textContent = this.tooltipValue(
      d.v,
      this.humidityUnit,
      this.humidityDecimals
    )), m) {
      m.dataset.time = String(o);
      const x = m.offsetWidth || 84, R = m.offsetHeight || 38;
      let D = h + 10;
      D + x > t.width - 4 && (D = h - 10 - x), D = Math.max(4, Math.min(D, Math.max(4, t.width - x - 4)));
      const B = Math.max(2, Math.min(t.plotTop + 2, t.height - R - 2));
      m.style.left = `${D}px`, m.style.top = `${B}px`;
    }
    i.hidden = !1;
  }
  placeDot(e, t, i, n) {
    if (e) {
      if (!t || !i || i.v === null) {
        e.hidden = !0;
        return;
      }
      e.hidden = !1, e.style.left = `${n}px`, e.style.top = `${this.yForValue(t, i.v)}px`;
    }
  }
  hideHover() {
    this.clearHoverTimer();
    const e = this.hoverRef.value;
    e && (e.hidden = !0);
  }
  clearHoverTimer() {
    this.hoverHideTimer && clearTimeout(this.hoverHideTimer), this.hoverHideTimer = void 0;
  }
  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  formatAxisLabel(e, t) {
    return t ? this.labels.now : this.formatDayTime(e);
  }
  formatDayTime(e) {
    const t = new Date(e), i = this.language || "en", n = this.timeZone ? { timeZone: this.timeZone } : {}, s = {
      hour: "2-digit",
      minute: "2-digit",
      ...typeof this.hour12 == "boolean" ? { hour12: this.hour12 } : {}
    };
    let a, o;
    try {
      a = new Intl.DateTimeFormat(i, { weekday: "short", ...n }).format(t).replace(/[.,]/g, "").trim(), o = new Intl.DateTimeFormat(i, { ...s, ...n }).format(t);
    } catch {
      a = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][t.getDay()], o = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    }
    return a ? `${a} ${o}` : o;
  }
}
const Ui = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Ui) && customElements.define(Ui, Ms);
const gt = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Cs = {
  de: {
    general: "Allgemein",
    sensors: "Sensoren",
    typography: "Messwerte (Schrift)",
    colors: "Farben",
    window: "Fenster",
    motion: "Bewegung",
    thermostat: "Thermostat",
    chart: "Verlauf",
    name: "Raumname",
    nameHelper: "Leer lassen, um den Namen der Temperatur-Entität zu verwenden.",
    nameSize: "Schriftgröße Raumname",
    nameSizeHelper: "11–32 px (Standard 15). Das Raumicon wächst mit, die Zeilenhöhe bleibt im Verhältnis.",
    icon: "Raumicon",
    autoHeight: "Höhe automatisch (Inhalt)",
    height: "Kartenhöhe",
    heightHelper: "Feste Höhe in Pixeln. Die Karte komprimiert ihren Inhalt automatisch.",
    radius: "Eckenradius",
    padding: "Innenabstand",
    paddingHelper: "Abstand zwischen Inhalt und Außenkante in Pixeln (0–32). Gilt für Titel, Messwerte und Heizzeile; der Verlauf kann bündig laufen.",
    paddingWarning: "Unter 8 px klebt der Text an der Kante – Titel, Messwerte und Heizzeile brauchen Luft.",
    fullBleed: "Verlauf bündig zur Kartenkante",
    fullBleedHelper: "An (Standard): Kurven und Flächen laufen bis an die Außenkante, die Rundung beschneidet sie. Aus: der Verlauf endet auf derselben Kante wie der Text.",
    theme: "Darstellung",
    themeAuto: "Automatisch (Home-Assistant-Theme)",
    themeDark: "Dunkel",
    themeLight: "Hell",
    temperatureEntity: "Temperatursensor",
    humidityEntity: "Luftfeuchtesensor",
    temperatureDecimals: "Dezimalstellen Temperatur",
    humidityDecimals: "Dezimalstellen Luftfeuchte",
    temperatureSize: "Schriftgröße Temperatur",
    temperatureFont: "Schriftart Temperatur",
    humiditySize: "Schriftgröße Luftfeuchte",
    humidityFont: "Schriftart Luftfeuchte",
    readingSizeHelper: "Wirkt nur auf diesen Messwert. Bei sehr kleinen Kartenhöhen wird die Größe automatisch mitskaliert.",
    showSeriesLabels: "Beschriftung über den Werten (TEMPERATUR / LUFTFEUCHTE) anzeigen",
    readingFontHelper: "Leer lassen für die Schrift des Home-Assistant-Themes. Beispiele: Inter, „Roboto, sans-serif“, var(--ha-font-family-body).",
    accentColor: "Akzentfarbe (Temperatur)",
    secondaryColor: "Sekundärfarbe (Luftfeuchte)",
    colorsHelper: "Die Akzentfarbe markiert nur den Primärwert: Punkt am Messwert und Temperaturkurve. Die Sekundärfarbe erscheint ausschließlich am Feuchtepunkt und an der Feuchtekurve.",
    showWindow: "Fensterstatus anzeigen",
    windowEntity: "Fensterkontakt",
    windowOpenStates: "Zustände für „offen“",
    windowOpenStatesHelper: "Mehrfachauswahl. Übliche Zustände: on, open, tilted.",
    showMotion: "Bewegung anzeigen",
    motionEntity: "Bewegungsmelder",
    motionLastChanged: "Ruhe-Dauer anzeigen",
    showThermostat: "Thermostat anzeigen",
    climateEntity: "Thermostat-Entität",
    showClimateRow: "Statuszeile unter dem Messwert (Heizstatus & Solltemperatur) anzeigen",
    showSetpoint: "Solltemperatur in der Statuszeile anzeigen",
    tapAction: "Tippen auf die Karte",
    tapMoreInfo: "Thermostat öffnen",
    tapNone: "Nichts",
    tapHelper: "Öffnet den Dialog der Climate-Entität von Home Assistant – dort lassen sich Solltemperatur und Modus einstellen. Die Statuszeile ist derselbe Knopf für die Tastatur; Messwerte und Chart behalten ihre eigene Funktion.",
    showHvacStatus: "Heizstatus (Flamme + Statuswort) anzeigen",
    showHvacMode: "Betriebsmodus anzeigen",
    heatingColor: "Icon-Farbe Heizen (nur bei aktiver Heizanforderung)",
    idleColor: "Icon-Farbe Ruhe/Warten (Standard: Grün des Verlaufs)",
    offColor: "Icon-Farbe aus/unterbrochen (Standard: Farbe des Soll-Werts)",
    showTemperatureChart: "Temperaturverlauf anzeigen",
    showHumidityChart: "Luftfeuchteverlauf anzeigen",
    hours: "Zeitraum",
    chartHeight: "Chart-Höhe",
    curve: "Kurvenverlauf",
    curveSmooth: "Geglättet",
    curveLinear: "Direkt verbunden",
    smoothing: "Glättung der Kurven",
    smoothingNone: "Aus – jeder Messwert",
    smoothingLight: "Leicht (Standard)",
    smoothingMedium: "Mittel",
    smoothingStrong: "Stark – für sehr unruhige Sensoren",
    smoothingHelper: "Gemittelt wird über einen Zeitraum, nicht über eine Punktzahl: „Leicht“ über rund ±10 Minuten, „Mittel“ über ±30, „Stark“ über ±60. „Aus“ zeigt jede gemessene Bewegung; lange Pausen ohne Messwert werden nie überbrückt.",
    gapMode: "Datenlücken",
    gapConnect: "Kurze Ausfälle überbrücken",
    gapBreak: "Ausfälle sichtbar unterbrechen",
    gapHelper: "Konstante Phasen zeichnet die Karte immer durchgehend. Diese Option betrifft nur echte Ausfälle (unavailable/unknown).",
    maxGap: "Maximal überbrückte Ausfallzeit",
    gapStyle: "Darstellung überbrückter Abschnitte",
    gapStyleSolid: "Durchgezogen (empfohlen)",
    gapStyleDashed: "Gestrichelt",
    humidityLine: "Linienart Luftfeuchte",
    humidityLineSolid: "Durchgezogen",
    humidityLineDotted: "Gepunktet",
    humidityLineHelper: "Nur die Feuchtekurve. Die Temperaturkurve bleibt unverändert; Fläche, Endpunkt und Farben gelten weiter.",
    temperatureGradient: "Farbverlauf unter der Temperaturkurve",
    humidityGradient: "Farbverlauf unter der Feuchtekurve",
    gradientHelper: "Der dezente Flächenverlauf unter der Kurve. Aus bleibt die Kurve allein stehen – ideal für sehr flache Karten.",
    temperatureAreaOpacity: "Stärke des Flächenverlaufs (Temperatur)",
    humidityAreaOpacity: "Stärke des Flächenverlaufs (Luftfeuchte)",
    areaOpacityHelper: "100 % ist der eingebaute Verlauf. Höhere Werte machen die Fläche unter der Kurve kräftiger (bis 300 %), niedrigere lassen sie fast verschwinden. Die Deckkraft der Kurven wirkt zusätzlich.",
    chartOpacity: "Deckkraft der Kurven",
    chartOpacityHelper: "Gilt für Linien, Flächen und Datenpunkte. 100 % ist die volle Darstellung; darunter tritt der Verlauf ruhiger hinter die Messwerte zurück.",
    temperatureBands: "Temperaturkurve nach Bereich einfärben (kalt / normal / warm / heiß)",
    temperatureBandsHelper: "Die Kurve bekommt einen sehr weichen Farbverlauf: Blau unter „kalt“, Mint im Normalbereich, Amber ab „warm“, das gedämpfte Rot ab „heiß“. Die Übergänge sind fließend, keine harten Kanten.",
    bandCold: "Kalt unter",
    bandWarm: "Warm ab",
    bandHot: "Heiß ab",
    bandHelper: "Grenzen in °C. Sie werden automatisch sortiert, falls „warm“ unter „kalt“ liegt – die Reihenfolge kalt → normal → warm → heiß bleibt immer erhalten.",
    bandTransition: "Übergang zwischen den Bereichen",
    bandTransitionHelper: "0 % = harte Stufen genau an den Grenzen, 100 % = die Farbe fließt über den ganzen Abstand zwischen zwei Grenzen. Dazwischen liegt jeder Zwischenwert.",
    grid: "Gitternetz",
    setpointLine: "Soll-Linie im Verlauf",
    setpointLineHelper: "Die gestrichelte Referenz auf die Solltemperatur des Thermostats samt „Soll“-Beschriftung. Aus: der Verlauf zeigt nur die Messwerte, die Solltemperatur steht weiterhin in der Statuszeile.",
    axis: "Zeitangaben unter dem Verlauf",
    axisHelper: "Die unterste Zeile mit Startzeit, Mitte und „Jetzt“. Ohne sie gehört der Platz den Kurven; die Zeit steht weiterhin im Tooltip und in der Beschreibung für Screenreader.",
    points: "Datenpunkte",
    tooltip: "Werte beim Überfahren",
    extremes: "Minimum/Maximum im Chart anzeigen",
    comfortHelper: "Beim Zeigen auf die Kurve erscheinen Uhrzeit und die echten Messwerte. Minimum und Maximum stehen dauerhaft an der Kurve.",
    missingEntity: "Bitte eine Entität auswählen.",
    loading: "Editor wird geladen …",
    generalHelper: "Alle Werte sind optional – die Karte funktioniert auch mit Teilkonfiguration."
  },
  en: {
    general: "General",
    sensors: "Sensors",
    typography: "Readings (font)",
    colors: "Colours",
    window: "Window",
    motion: "Motion",
    thermostat: "Thermostat",
    chart: "History",
    name: "Room name",
    nameHelper: "Leave empty to use the temperature entity name.",
    nameSize: "Room name font size",
    nameSizeHelper: "11–32 px (default 15). The room icon grows with it and the line height keeps its ratio.",
    icon: "Room icon",
    autoHeight: "Automatic height (content)",
    height: "Card height",
    heightHelper: "Fixed height in pixels. The card compresses itself automatically.",
    radius: "Corner radius",
    padding: "Card padding",
    paddingHelper: "Space between the content and the card edge in pixels (0–32). Applies to title, readings and status row; the chart may run flush.",
    paddingWarning: "Below 8 px the text sits on the edge – title, readings and status row need room to breathe.",
    fullBleed: "Chart flush with the card edge",
    fullBleedHelper: "On (default): curves and fills run to the outer edge and are clipped by the corner. Off: the chart ends on the same edge as the text.",
    theme: "Appearance",
    themeAuto: "Automatic (Home Assistant theme)",
    themeDark: "Dark",
    themeLight: "Light",
    temperatureEntity: "Temperature sensor",
    humidityEntity: "Humidity sensor",
    temperatureDecimals: "Temperature decimals",
    humidityDecimals: "Humidity decimals",
    temperatureSize: "Temperature font size",
    temperatureFont: "Temperature font family",
    humiditySize: "Humidity font size",
    humidityFont: "Humidity font family",
    readingSizeHelper: "Applies to this reading only. Very small card heights scale the size down automatically.",
    showSeriesLabels: "Show captions above the values (TEMPERATURE / HUMIDITY)",
    readingFontHelper: 'Leave empty to use the Home Assistant theme font. Examples: Inter, "Roboto, sans-serif", var(--ha-font-family-body).',
    accentColor: "Accent colour (temperature)",
    secondaryColor: "Secondary colour (humidity)",
    colorsHelper: "The accent marks the primary value only: the dot next to it and the temperature curve. The secondary colour is used exclusively for the humidity dot and curve.",
    showWindow: "Show window status",
    windowEntity: "Window contact",
    windowOpenStates: "States considered open",
    windowOpenStatesHelper: "Multiple selection. Common states: on, open, tilted.",
    showMotion: "Show motion",
    motionEntity: "Motion sensor",
    motionLastChanged: "Show quiet duration",
    showThermostat: "Show thermostat",
    climateEntity: "Climate entity",
    showClimateRow: "Show the status row (heating state & target temperature)",
    showSetpoint: "Show target temperature in the status row",
    tapAction: "Tap on the card",
    tapMoreInfo: "Open thermostat",
    tapNone: "Nothing",
    tapHelper: "Opens Home Assistant's dialog for the climate entity, where target temperature and mode are set. The status row is the same button for keyboards; readings and chart keep their own behaviour.",
    showHvacStatus: "Show heating state (flame + wording)",
    showHvacMode: "Show HVAC mode",
    heatingColor: "Heating icon colour (active heating demand only)",
    idleColor: "Idle/waiting icon colour (default: the chart green)",
    offColor: "Off/unavailable icon colour (default: the target value colour)",
    showTemperatureChart: "Show temperature history",
    showHumidityChart: "Show humidity history",
    hours: "Period",
    chartHeight: "Chart height",
    curve: "Curve",
    curveSmooth: "Smoothed",
    curveLinear: "Straight",
    smoothing: "Curve smoothing",
    smoothingNone: "Off – every reading",
    smoothingLight: "Light (default)",
    smoothingMedium: "Medium",
    smoothingStrong: "Strong – for very noisy sensors",
    smoothingHelper: "Averaging works over a time span, not a point count: “Light” over roughly ±10 minutes, “Medium” over ±30, “Strong” over ±60. “Off” shows every measured move; long pauses without a reading are never bridged.",
    gapMode: "Data gaps",
    gapConnect: "Bridge short outages",
    gapBreak: "Show outages as broken",
    gapHelper: "Constant phases are always drawn continuously. This option only affects real outages (unavailable/unknown).",
    maxGap: "Largest bridged outage",
    gapStyle: "Style of bridged parts",
    gapStyleSolid: "Solid (recommended)",
    gapStyleDashed: "Dashed",
    humidityLine: "Humidity line style",
    humidityLineSolid: "Solid",
    humidityLineDotted: "Dotted",
    humidityLineHelper: "Humidity curve only. The temperature curve is unchanged; area, end marker and colours still apply.",
    temperatureGradient: "Gradient under the temperature curve",
    humidityGradient: "Gradient under the humidity curve",
    gradientHelper: "The soft area fill below the curve. Off leaves the line on its own – useful for very flat cards.",
    temperatureAreaOpacity: "Area fill strength (temperature)",
    humidityAreaOpacity: "Area fill strength (humidity)",
    areaOpacityHelper: "100 % is the built-in gradient. Higher values make the area under the curve stronger (up to 300 %), lower ones let it almost vanish. The curve opacity applies on top.",
    chartOpacity: "Curve opacity",
    chartOpacityHelper: "Applies to lines, areas and data points. 100 % is the full rendering; below that the history steps back behind the readings.",
    temperatureBands: "Colour the temperature curve by band (cold / normal / warm / hot)",
    temperatureBandsHelper: "Adds a very soft gradient: blue below “cold”, mint in the normal range, amber from “warm” and the damped red from “hot”. Transitions are continuous, never hard edges.",
    bandCold: "Cold below",
    bandWarm: "Warm from",
    bandHot: "Hot from",
    bandHelper: "Limits in °C. They are sorted automatically if “warm” sits below “cold” – the order cold → normal → warm → hot is always kept.",
    bandTransition: "Transition between the bands",
    bandTransitionHelper: "0 % = hard steps exactly at the limits, 100 % = the colour flows across the whole gap between two limits. Anything in between is a valid setting.",
    grid: "Grid lines",
    setpointLine: "Target line in the chart",
    setpointLineHelper: "The dashed reference at the thermostat’s target, including the “target” caption. Off: the chart shows only the measurements, the target temperature stays in the status row.",
    axis: "Time labels below the chart",
    axisHelper: "The bottom row with the start time, the middle and “now”. Without it the space belongs to the curves; the time is still in the tooltip and in the screen-reader description.",
    points: "Data points",
    tooltip: "Values on hover",
    extremes: "Show minimum/maximum in the chart",
    comfortHelper: "Pointing at the curve shows the time and the actual measurements. Minimum and maximum stay visible next to the curve.",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
function Ts(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class lr extends ue {
  constructor() {
    super(...arguments), this._config = { type: `custom:${Q}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _selectorsReady: { state: !0 },
      _drafts: { state: !0 }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._selectorsReady = typeof customElements < "u" && !!customElements.get("ha-selector"), !this._selectorsReady && typeof customElements < "u" && customElements.whenDefined("ha-selector").then(() => {
      this._selectorsReady = !0;
    }).catch(() => {
    });
  }
  setConfig(e) {
    this._drafts = {}, this._config = e && typeof e == "object" ? { ...e, type: e.type ?? `custom:${Q}` } : { type: `custom:${Q}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const e = vt(this.hass?.locale?.language ?? this.hass?.language);
    return Cs[e];
  }
  /** Value shown in a field: the draft while editing, otherwise the config. */
  shownValue(e, t) {
    return Object.prototype.hasOwnProperty.call(this._drafts, e) ? this._drafts[e] : t;
  }
  setDraft(e, t) {
    Object.prototype.hasOwnProperty.call(this._drafts, e) && this._drafts[e] === t || (this._drafts = { ...this._drafts, [e]: t });
  }
  clearDraft(e) {
    if (!Object.prototype.hasOwnProperty.call(this._drafts, e)) return;
    const t = { ...this._drafts };
    delete t[e], this._drafts = t;
  }
  patch(e) {
    const t = { ...this._config, ...e };
    for (const i of Object.keys(t))
      t[i] === void 0 && delete t[i];
    t.type = this._config.type ?? `custom:${Q}`, this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(e) {
    return M(this._config[e]);
  }
  showFlag(e, t) {
    return this.rawBoolean(e) ?? !!J(this._config[t]);
  }
  /**
   * Height to use when "automatic height" is switched off again: the value the
   * user last entered, or the stored manual height, or a sensible default.
   */
  manualHeight() {
    const e = this._config.height, t = typeof e == "number" ? e : Number(e);
    return Number.isFinite(t) && t > 0 && (this.lastManualHeight = t), this.lastManualHeight;
  }
  /** True while the configured inset is too small for readable text edges. */
  paddingIsTight() {
    return this.numberValue("card_padding", 10) < 8;
  }
  numberValue(e, t) {
    const i = this._config[e], n = typeof i == "number" ? i : Number(i);
    return Number.isFinite(n) ? n : t;
  }
  stringValue(e, t = "") {
    return be(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = be(this._config[e]) ?? t;
    return xt(i) ?? xt(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: jn(t) });
      }
    });
  }
  renderField(e) {
    return b`<div
      class="field ${e.disabled ? "is-disabled" : ""}"
      @focusout=${() => {
      e.revertOnLeave && this.clearDraft(e.key);
    }}
    >
      <ha-selector
        .hass=${this.hass}
        .selector=${e.selector}
        .label=${e.label}
        .value=${this.shownValue(e.key, e.value)}
        .disabled=${!!e.disabled}
        @value-changed=${(t) => {
      t.stopPropagation(), !e.disabled && (e.onChange ? e.onChange(t.detail.value) : this.patch({ [e.key]: t.detail.value }));
    }}
      ></ha-selector>
      ${e.helper ? b`<span class="helper">${e.helper}</span>` : f}
      ${e.warning ? b`<span class="helper warning">${e.warning}</span>` : f}
    </div>`;
  }
  renderSwitch(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { boolean: {} },
      value: e.value,
      disabled: e.disabled,
      helper: e.helper,
      onChange: (t) => {
        e.onChange ? e.onChange(!!t) : this.patch({ [e.key]: !!t });
      }
    });
  }
  /**
   * Numeric field. Intermediate states stay local (`_drafts`) instead of being
   * written to the configuration:
   *
   * - clearing the field keeps the stored value and never flips a related switch
   * - typing "2" on the way to "260" does not commit an out-of-range value
   * - only a complete, in-range number is committed
   */
  renderNumber(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: {
        number: {
          min: e.min,
          max: e.max,
          step: e.step,
          mode: e.mode ?? "box",
          ...e.unit ? { unit_of_measurement: e.unit } : {}
        }
      },
      value: this.numberValue(e.key, e.fallback),
      disabled: e.disabled,
      helper: e.helper,
      warning: e.warning,
      revertOnLeave: !0,
      onChange: (t) => {
        const i = Ts(t);
        if (i === null) {
          this.setDraft(e.key, t ?? "");
          return;
        }
        if (i < e.min || i > e.max) {
          this.setDraft(e.key, t);
          return;
        }
        this.clearDraft(e.key), e.onChange ? e.onChange(i) : this.patch({ [e.key]: i });
      }
    });
  }
  /** Text field. Clearing it removes the key so the card default applies. */
  renderText(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { text: {} },
      value: this.stringValue(e.key, e.fallback ?? ""),
      disabled: e.disabled,
      helper: e.helper,
      onChange: (t) => {
        const i = typeof t == "string" ? t : "";
        i.trim().length ? (this.clearDraft(e.key), this.patch({ [e.key]: i })) : (this.setDraft(e.key, ""), this.patch({ [e.key]: void 0 }));
      }
    });
  }
  /** The area strength only means something while its fill is switched on. */
  temperatureGradientOn() {
    return this.rawBoolean("chart_temperature_gradient") ?? !0;
  }
  humidityGradientOn() {
    return this.rawBoolean("chart_humidity_gradient") ?? !0;
  }
  renderSection(e, t, i) {
    const n = this.openSections.has(e);
    return b`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(e, s)}>
      <summary>
        <span class="section-title">${t}</span>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="fields">${i}</div>
    </details>`;
  }
  onToggle(e, t) {
    t.currentTarget.open ? this.openSections.add(e) : this.openSections.delete(e);
  }
  render() {
    if (!this._selectorsReady)
      return b`<div class="loading">${this.text.loading}</div>`;
    const e = this.text;
    return b`<div class="editor">
      ${this.renderSection("general", e.general, this.renderGeneral(e))}
      ${this.renderSection("sensors", e.sensors, this.renderSensors(e))}
      ${this.renderSection("typography", e.typography, this.renderTypography(e))}
      ${this.renderSection("colors", e.colors, this.renderColors(e))}
      ${this.renderSection("window", e.window, this.renderWindow(e))}
      ${this.renderSection("motion", e.motion, this.renderMotion(e))}
      ${this.renderSection("thermostat", e.thermostat, this.renderThermostat(e))}
      ${this.renderSection("chart", e.chart, this.renderChart(e))}
    </div>`;
  }
  renderGeneral(e) {
    const t = !this._config.height || this._config.height === "auto";
    return b`<div class="hint">${e.generalHelper}</div>
      ${this.renderText({ key: "name", label: e.name, helper: e.nameHelper })}
      ${this.renderNumber({
      key: "name_font_size",
      label: e.nameSize,
      helper: e.nameSizeHelper,
      min: Ye.min,
      max: Ye.max,
      step: 1,
      unit: "px",
      fallback: Et
    })}
      ${this.renderField({
      key: "icon",
      label: e.icon,
      selector: { icon: {} },
      value: this.stringValue("icon", "mdi:home-thermometer-outline")
    })}
      ${this.renderSwitch({
      key: "auto_height",
      label: e.autoHeight,
      value: t,
      onChange: (i) => {
        this.clearDraft("height"), this.patch({ height: i ? "auto" : this.manualHeight() });
      }
    })}
      ${this.renderNumber({
      key: "height",
      label: e.height,
      min: 140,
      max: 900,
      step: 4,
      unit: "px",
      fallback: 240,
      disabled: t,
      helper: e.heightHelper,
      onChange: (i) => {
        this.lastManualHeight = i, this.patch({ height: i });
      }
    })}
      ${this.renderNumber({
      key: "border_radius",
      label: e.radius,
      min: 0,
      max: 40,
      step: 1,
      unit: "px",
      fallback: 26
    })}
      ${this.renderNumber({
      key: "card_padding",
      label: e.padding,
      helper: e.paddingHelper,
      // Live warning: below 8 px the text touches the card's edge.
      warning: this.paddingIsTight() ? e.paddingWarning : void 0,
      min: 0,
      max: 32,
      step: 1,
      unit: "px",
      fallback: 10
    })}
      ${this.renderField({
      key: "theme",
      label: e.theme,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "auto", label: e.themeAuto },
            { value: "dark", label: e.themeDark },
            { value: "light", label: e.themeLight }
          ]
        }
      },
      value: this.stringValue("theme", "auto")
    })}`;
  }
  renderSensors(e) {
    return b`${this.renderField({
      key: "temperature_entity",
      label: e.temperatureEntity,
      selector: { entity: { domain: "sensor", multiple: !1 } },
      value: this.stringValue("temperature_entity")
    })}
      ${this.renderField({
      key: "humidity_entity",
      label: e.humidityEntity,
      selector: { entity: { domain: "sensor", multiple: !1 } },
      value: this.stringValue("humidity_entity")
    })}
      ${this.renderNumber({
      key: "temperature_decimals",
      label: e.temperatureDecimals,
      min: 0,
      max: 3,
      step: 1,
      fallback: 1
    })}
      ${this.renderNumber({
      key: "humidity_decimals",
      label: e.humidityDecimals,
      min: 0,
      max: 3,
      step: 1,
      fallback: 0
    })}`;
  }
  /**
   * Independent typography for temperature and humidity – the two values are
   * the visual anchor of the card, so font family and size are separate.
   */
  renderTypography(e) {
    return b`<div class="hint">${e.readingSizeHelper}</div>
      ${this.renderSwitch({
      key: "show_series_labels",
      label: e.showSeriesLabels,
      value: this.rawBoolean("show_series_labels") ?? !0
    })}
      ${this.renderNumber({
      key: "temperature_font_size",
      label: e.temperatureSize,
      min: 14,
      max: 96,
      step: 1,
      unit: "px",
      fallback: 42
    })}
      ${this.renderText({
      key: "temperature_font_family",
      label: e.temperatureFont,
      helper: e.readingFontHelper
    })}
      ${this.renderNumber({
      key: "humidity_font_size",
      label: e.humiditySize,
      min: 14,
      max: 96,
      step: 1,
      unit: "px",
      fallback: 20
    })}
      ${this.renderText({
      key: "humidity_font_family",
      label: e.humidityFont,
      helper: e.readingFontHelper
    })}`;
  }
  /** Two colours, one job each: accent for the hero, secondary for humidity. */
  /** The row switch disables everything that only lives inside that row. */
  get rowVisible() {
    return this.rawBoolean("show_climate_row") ?? !0;
  }
  renderColors(e) {
    return b`<div class="hint">${e.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: e.accentColor,
      fallback: fe.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: e.secondaryColor,
      fallback: fe.humidity
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = J(this._config.window_entity);
    return b`${this.renderSwitch({
      key: "show_window",
      label: e.showWindow,
      value: t,
      onChange: (n) => this.patch({ show_window: n, ...n ? {} : { window_entity: void 0 } })
    })}
      ${this.renderField({
      key: "window_entity",
      label: e.windowEntity,
      selector: { entity: { domain: ["binary_sensor", "input_boolean", "sensor"], multiple: !1 } },
      value: i ?? "",
      disabled: !t,
      warning: t && !i ? e.missingEntity : void 0
    })}
      ${i ? this.renderField({
      key: "window_open_states",
      label: e.windowOpenStates,
      selector: { state: { entity_id: i, multiple: !0 } },
      value: this._config.window_open_states ?? [],
      disabled: !t,
      helper: e.windowOpenStatesHelper
    }) : this.renderField({
      key: "window_open_states",
      label: e.windowOpenStates,
      selector: { text: {} },
      value: (this._config.window_open_states ?? []).join(", "),
      disabled: !t,
      helper: e.windowOpenStatesHelper,
      onChange: (n) => {
        const s = String(n ?? "").split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: s.length ? s : void 0 });
      }
    })}`;
  }
  renderMotion(e) {
    const t = this.showFlag("show_motion", "motion_entity");
    return b`${this.renderSwitch({
      key: "show_motion",
      label: e.showMotion,
      value: t,
      onChange: (i) => this.patch({ show_motion: i, ...i ? {} : { motion_entity: void 0 } })
    })}
      ${this.renderField({
      key: "motion_entity",
      label: e.motionEntity,
      selector: { entity: { domain: ["binary_sensor", "input_boolean", "sensor"], multiple: !1 } },
      value: this.stringValue("motion_entity"),
      disabled: !t,
      warning: t && !J(this._config.motion_entity) ? e.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "motion_show_last_changed",
      label: e.motionLastChanged,
      value: this.rawBoolean("motion_show_last_changed") ?? !0,
      disabled: !t
    })}`;
  }
  renderThermostat(e) {
    const t = this.showFlag("show_thermostat", "climate_entity");
    return b`${this.renderSwitch({
      key: "show_thermostat",
      label: e.showThermostat,
      value: t,
      onChange: (i) => this.patch({ show_thermostat: i, ...i ? {} : { climate_entity: void 0 } })
    })}
      ${this.renderField({
      key: "climate_entity",
      label: e.climateEntity,
      selector: { entity: { domain: "climate", multiple: !1 } },
      value: this.stringValue("climate_entity"),
      disabled: !t,
      warning: t && !J(this._config.climate_entity) ? e.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "show_climate_row",
      label: e.showClimateRow,
      value: this.rawBoolean("show_climate_row") ?? !0,
      disabled: !t
    })}
      ${this.renderField({
      key: "tap_action",
      label: e.tapAction,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "more-info", label: e.tapMoreInfo },
            { value: "none", label: e.tapNone }
          ]
        }
      },
      value: this.stringValue("tap_action", "more-info"),
      disabled: !t || !this.rowVisible,
      helper: e.tapHelper
    })}
      ${this.renderSwitch({
      key: "show_setpoint",
      label: e.showSetpoint,
      value: this.rawBoolean("show_setpoint") ?? !0,
      disabled: !t || !this.rowVisible
    })}
      ${this.renderSwitch({
      key: "show_hvac_status",
      label: e.showHvacStatus,
      value: this.rawBoolean("show_hvac_status") ?? !0,
      disabled: !t || !this.rowVisible
    })}
      ${this.renderSwitch({
      key: "show_hvac_mode",
      label: e.showHvacMode,
      value: this.rawBoolean("show_hvac_mode") ?? !1,
      disabled: !t || !this.rowVisible
    })}
      ${this.renderColor({
      key: "heating_color",
      label: e.heatingColor,
      fallback: gt.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: gt.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: gt.off,
      disabled: !t
    })}`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = t || i, s = t && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48].map((o) => ({ value: String(o), label: `${o} h` }));
    return b`${this.renderSwitch({
      key: "show_temperature_chart",
      label: e.showTemperatureChart,
      value: t,
      onChange: (o) => this.patch({ show_temperature_chart: o })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: e.showHumidityChart,
      value: i,
      onChange: (o) => this.patch({ show_humidity_chart: o })
    })}
      ${this.renderSwitch({
      key: "chart_full_bleed",
      label: e.fullBleed,
      value: this.rawBoolean("chart_full_bleed") ?? !0,
      helper: e.fullBleedHelper,
      disabled: !n,
      onChange: (o) => this.patch({ chart_full_bleed: o })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: e.hours,
      selector: { select: { mode: "dropdown", options: a } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !n,
      onChange: (o) => {
        const l = Number(o);
        this.patch({ chart_hours: Number.isFinite(l) ? l : 6 });
      }
    })}
      ${this.renderNumber({
      key: "chart_height",
      label: e.chartHeight,
      min: 40,
      max: 240,
      step: 4,
      unit: "px",
      fallback: 84,
      disabled: !n
    })}
      ${this.renderField({
      key: "chart_curve",
      label: e.curve,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "smooth", label: e.curveSmooth },
            { value: "linear", label: e.curveLinear }
          ]
        }
      },
      value: this.stringValue("chart_curve", "smooth"),
      disabled: !n
    })}
      ${this.renderField({
      key: "chart_smoothing",
      label: e.smoothing,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "none", label: e.smoothingNone },
            { value: "light", label: e.smoothingLight },
            { value: "medium", label: e.smoothingMedium },
            { value: "strong", label: e.smoothingStrong }
          ]
        }
      },
      value: this.stringValue("chart_smoothing", "light"),
      disabled: !n || this.stringValue("chart_curve", "smooth") === "linear",
      helper: e.smoothingHelper,
      onChange: (o) => this.patch({ chart_smoothing: String(o) })
    })}
      ${this.renderSwitch({
      key: "chart_temperature_gradient",
      label: e.temperatureGradient,
      value: this.rawBoolean("chart_temperature_gradient") ?? !0,
      disabled: !t
    })}
      ${this.renderSwitch({
      key: "chart_humidity_gradient",
      label: e.humidityGradient,
      value: this.rawBoolean("chart_humidity_gradient") ?? !0,
      disabled: !i,
      helper: e.gradientHelper
    })}
      ${this.renderNumber({
      key: "chart_temperature_area_opacity",
      label: e.temperatureAreaOpacity,
      min: 10,
      max: 300,
      step: 10,
      unit: "%",
      fallback: 100,
      disabled: !t || !this.temperatureGradientOn(),
      helper: e.areaOpacityHelper
    })}
      ${this.renderNumber({
      key: "chart_humidity_area_opacity",
      label: e.humidityAreaOpacity,
      min: 10,
      max: 300,
      step: 10,
      unit: "%",
      fallback: 100,
      disabled: !i || !this.humidityGradientOn()
    })}
      ${this.renderNumber({
      key: "chart_opacity",
      label: e.chartOpacity,
      min: 15,
      max: 100,
      step: 5,
      unit: "%",
      fallback: 100,
      disabled: !n,
      helper: e.chartOpacityHelper
    })}
      ${this.renderSwitch({
      key: "chart_temperature_bands",
      label: e.temperatureBands,
      value: this.rawBoolean("chart_temperature_bands") ?? !1,
      disabled: !t,
      helper: e.temperatureBandsHelper,
      onChange: (o) => this.patch({ chart_temperature_bands: o ? !0 : void 0 })
    })}
      ${this.renderNumber({
      key: "chart_band_cold_below",
      label: e.bandCold,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 18,
      disabled: !t || !s
    })}
      ${this.renderNumber({
      key: "chart_band_warm_above",
      label: e.bandWarm,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 24,
      disabled: !t || !s
    })}
      ${this.renderNumber({
      key: "chart_band_hot_above",
      label: e.bandHot,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 27,
      disabled: !t || !s,
      helper: e.bandHelper
    })}
      ${this.renderNumber({
      key: "chart_band_transition",
      label: e.bandTransition,
      min: 0,
      max: 100,
      step: 5,
      unit: "%",
      fallback: 100,
      mode: "slider",
      disabled: !t || !s,
      helper: e.bandTransitionHelper
    })}
      ${this.renderField({
      key: "chart_humidity_line_style",
      label: e.humidityLine,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "solid", label: e.humidityLineSolid },
            { value: "dotted", label: e.humidityLineDotted }
          ]
        }
      },
      value: this.stringValue("chart_humidity_line_style", "solid"),
      disabled: !i,
      helper: e.humidityLineHelper,
      onChange: (o) => this.patch({ chart_humidity_line_style: String(o) })
    })}
      ${this.renderField({
      key: "chart_gap_mode",
      label: e.gapMode,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "connect", label: e.gapConnect },
            { value: "break", label: e.gapBreak }
          ]
        }
      },
      value: this.stringValue("chart_gap_mode", "connect"),
      disabled: !n,
      helper: e.gapHelper,
      onChange: (o) => this.patch({ chart_gap_mode: String(o) })
    })}
      ${this.renderNumber({
      key: "chart_max_gap_minutes",
      label: e.maxGap,
      min: 5,
      max: 720,
      step: 5,
      unit: "min",
      fallback: 120,
      disabled: !n || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderField({
      key: "chart_gap_style",
      label: e.gapStyle,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "solid", label: e.gapStyleSolid },
            { value: "dashed", label: e.gapStyleDashed }
          ]
        }
      },
      value: this.stringValue("chart_gap_style", "solid"),
      disabled: !n || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderSwitch({
      key: "chart_show_grid",
      label: e.grid,
      value: this.rawBoolean("chart_show_grid") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_setpoint",
      label: e.setpointLine,
      value: this.rawBoolean("chart_show_setpoint") ?? !0,
      disabled: !t,
      helper: e.setpointLineHelper
    })}
      ${this.renderSwitch({
      key: "chart_show_axis",
      label: e.axis,
      value: this.rawBoolean("chart_show_axis") ?? !0,
      disabled: !n,
      helper: e.axisHelper
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: e.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_tooltip",
      label: e.tooltip,
      value: this.rawBoolean("chart_show_tooltip") ?? !0,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_extremes",
      label: e.extremes,
      value: this.rawBoolean("chart_show_extremes") ?? !0,
      disabled: !n
    })}
      <p class="helper">${e.comfortHelper}</p>`;
  }
  static {
    this.styles = kt`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--ha-font-family-body, inherit);
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 2px 0 16px;
    }
    .section {
      border: 1px solid var(--divider-color, rgba(148, 163, 184, 0.28));
      border-radius: 12px;
      background: var(--card-background-color, transparent);
      overflow: hidden;
    }
    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 11px 13px;
      cursor: pointer;
      list-style: none;
      font-size: 0.9rem;
      font-weight: 600;
      user-select: none;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary:focus-visible {
      outline: 2px solid var(--primary-color, #38bdf8);
      outline-offset: -2px;
    }
    .chevron {
      width: 7px;
      height: 7px;
      border-right: 2px solid var(--secondary-text-color);
      border-bottom: 2px solid var(--secondary-text-color);
      transform: rotate(45deg);
      transition: transform 0.18s ease;
      flex: none;
      margin-top: -3px;
    }
    .section[open] .chevron {
      transform: rotate(-135deg);
      margin-top: 3px;
    }
    .fields {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 13px 14px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .field.is-disabled {
      opacity: 0.55;
    }
    .helper {
      font-size: 11px;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }
    .helper.warning {
      color: var(--warning-color, #f59e0b);
    }
    .hint {
      font-size: 11.5px;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }
    .loading {
      padding: 16px 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    @media (prefers-reduced-motion: reduce) {
      .chevron {
        transition: none;
      }
    }
  `;
  }
}
typeof customElements < "u" && !customElements.get(ke) && customElements.define(ke, lr);
const yt = "#fbbf24", bt = "#34d399", Vi = "var(--rcc-neutral)", Es = 15 * 1e3, Hs = 300 * 1e3;
class Ds extends ue {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new ns(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.handleCardClick = (e) => {
      const t = this.tapTarget;
      if (!t) return;
      const i = e.target;
      if (!!i?.closest(".chart-slot, room-climate-chart")) {
        if (this._config?.chart.showTooltip) return;
      } else if (i?.closest("button, a, input, select, textarea"))
        return;
      this.openMoreInfo(t);
    }, this.handleCardKeydown = (e) => {
      if (e.target !== e.currentTarget || e.key !== "Enter" && e.key !== " ") return;
      const t = this.tapTarget;
      t && (e.preventDefault(), this.openMoreInfo(t));
    };
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _history: { state: !0 },
      _historyLoading: { state: !0 },
      _historyError: { state: !0 },
      _density: { state: !0 },
      _now: { state: !0 },
      _historyWindow: { state: !0 },
      _haIconReady: { state: !0 }
    };
  }
  // ---------------------------------------------------------------- lifecycle
  connectedCallback() {
    super.connectedCallback(), this.startTimers(), typeof ResizeObserver < "u" && !this.resizeObserver && (this.resizeObserver = new ResizeObserver((e) => {
      const t = e[0];
      t && this.updateDensity(t.contentRect.height);
    }), this.resizeObserver.observe(this)), typeof document < "u" && document.addEventListener("visibilitychange", this.onVisibilityChange), typeof IntersectionObserver < "u" && !this.intersectionObserver && (this.intersectionObserver = new IntersectionObserver((e) => {
      const t = e[0];
      if (!t) return;
      const i = this.visible;
      this.visible = t.isIntersecting, !i && this.visible && this.isConnected && Date.now() - this.historyFetchedAt > 3e5 && this.loadHistory(this.historyKey, !0);
    }), this.intersectionObserver.observe(this)), this.ensureHistory(), !this._haIconReady && typeof customElements < "u" && customElements.whenDefined("ha-icon").then(() => {
      this._haIconReady = !0;
    }).catch(() => {
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), typeof document < "u" && document.removeEventListener("visibilitychange", this.onVisibilityChange), this.intersectionObserver?.disconnect(), this.intersectionObserver = void 0, this.visible = !0, this.refreshTimer && clearInterval(this.refreshTimer), this.tickTimer && clearInterval(this.tickTimer), this.pendingLoad && clearTimeout(this.pendingLoad), this.refreshTimer = void 0, this.tickTimer = void 0, this.pendingLoad = void 0, this.resizeObserver?.disconnect(), this.resizeObserver = void 0;
  }
  startTimers() {
    this.refreshTimer || (this.refreshTimer = setInterval(() => {
      !this.isConnected || !this.visible || this.loadHistory(this.historyKey, !0);
    }, 3e5)), this.tickTimer || (this.tickTimer = setInterval(() => {
      !this.isConnected || !this._config || this._config.motion.enabled && this._config.motion.showLastChanged && (this._now = Date.now());
    }, 3e4));
  }
  // ------------------------------------------------------------------ options
  setConfig(e) {
    const t = Nn(e);
    this._config = t, this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(ke);
  }
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), n = (d) => i.find(d)?.entity_id, s = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "temperature"
    ), a = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "humidity"
    ), o = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(d.attributes?.device_class))
    ), l = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && d.attributes?.device_class === "motion"
    ), h = n((d) => d.entity_id.startsWith("climate.")), c = { type: `custom:${Q}` };
    return s && (c.temperature_entity = s), a && (c.humidity_entity = a), o && (c.window_entity = o), l && (c.motion_entity = l), h && (c.climate_entity = h), c;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(pt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? pt(this._config) : 230;
    return {
      columns: 6,
      min_columns: 4,
      rows: Math.min(12, Math.max(2, Math.round(e / 66))),
      min_rows: 2
    };
  }
  // ------------------------------------------------------------------- history
  translator() {
    const e = this.hass?.locale?.language ?? this.hass?.language ?? "en";
    return Gn(e);
  }
  language() {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
  }
  /**
   * Time zone and clock format of the Home Assistant instance. Without this the
   * axis would show the browser zone (wrong on a remote dashboard) and always
   * the locale default instead of the user's 12/24-hour preference.
   */
  chartClock() {
    const e = this.hass?.locale, t = e?.time_zone || this.hass?.config?.time_zone || void 0, i = e?.time_format;
    return { timeZone: t, hour12: i === "am_pm" ? !0 : i === "24" ? !1 : void 0 };
  }
  historyEntityIds(e) {
    const t = [];
    return e.chart.showTemperature && e.temperatureEntity && t.push(e.temperatureEntity), e.chart.showHumidity && e.humidityEntity && t.push(e.humidityEntity), t;
  }
  historyKeyFor(e) {
    const t = this.historyEntityIds(e);
    return t.length ? `${t.sort().join("|")}@${e.chart.hours}` : "";
  }
  ensureHistory() {
    if (!this.isConnected) return;
    const e = this._config;
    if (!e || !this.hass) return;
    const t = this.historyKeyFor(e);
    if (!t) {
      this.historyKey && (this.historyKey = "", this._history = {}, this._historyLoading = !1, this._historyError = void 0);
      return;
    }
    t === this.historyKey && (this.historyFetchedAt > 0 || this.retryDelay > 0) || (this.historyKey = t, this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
      this.pendingLoad = void 0, this.loadHistory(t);
    }, 60));
  }
  async loadHistory(e, t = !1) {
    const i = this._config, n = this.hass;
    if (!i || !n || !e) return;
    const s = this.historyEntityIds(i);
    if (!s.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const a = Date.now(), o = a - i.chart.hours * 60 * 60 * 1e3;
    try {
      const l = await this.repository.load(n, s, i.chart.hours, a);
      if (this.historyKey !== e) return;
      this._history = l, this._historyWindow = { start: o, end: a }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, t && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== e) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Es), Hs), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
        this.pendingLoad = void 0, this.isConnected && this.loadHistory(e, !0);
      }, this.retryDelay);
    } finally {
      this.historyKey === e && (this._historyLoading = !1);
    }
  }
  /**
   * Appends the current state when it is newer than the fetched history, so the
   * curve ends exactly at the value shown in the big reading – including a
   * sensor that just became unavailable.
   */
  withLiveState(e, t, i) {
    if (!e || !e.length) return e;
    const n = this.hass?.states?.[t];
    if (!n) return e;
    const s = Date.parse(n.last_changed);
    if (!Number.isFinite(s)) return e;
    const a = e[e.length - 1], o = Math.min(s, i);
    if (o <= a.t) return e;
    const l = Qe(n.state);
    return a.v === l ? e : [...e, { t: o, v: l }];
  }
  updateDensity(e) {
    const t = e > 0 ? e : this._config ? this._config.height ?? pt(this._config) : 0;
    let i = "md";
    t > 0 && t < 168 ? i = "xs" : t > 0 && t < 232 && (i = "sm"), i !== this._density && (this._density = i);
  }
  // ------------------------------------------------------------------ updates
  willUpdate(e) {
    if (e.has("hass")) {
      const t = this.hass?.connected !== !1;
      t && !this.lastConnected && (this.historyFetchedAt = 0, this.loadHistory(this.historyKey, !0)), this.lastConnected = t, this.ensureHistory();
    }
    e.has("_config") && this._config && this.ensureHistory();
  }
  shouldUpdate(e) {
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass || t.connected !== this.hass.connected || t.locale?.language !== this.hass.locale?.language || t.locale?.number_format !== this.hass.locale?.number_format || t.locale?.time_format !== this.hass.locale?.time_format || t.locale?.time_zone !== this.hass.locale?.time_zone || t.config?.time_zone !== this.hass.config?.time_zone || t.themes?.darkMode !== this.hass.themes?.darkMode || t.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? Bn(this._config) : [];
      return i.length ? i.some((n) => t.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return b`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: n, humidity: s } = e.typography, a = [
      `--rcc-radius:${e.borderRadius}px`,
      `--rcc-inset:${e.padding}px`,
      e.height ? `--rcc-height:${e.height}px` : "",
      `--rcc-chart-height:${e.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${s.fontSize}px`,
      /*
       * Title size and the icon that belongs to it: both are written here (not
       * in the stylesheet) so the line height and the icon box stay in step with
       * whatever the user picked in the editor.
       */
      `--rcc-name-size:${e.nameFontSize}px`,
      `--rcc-name-line:${ar(e.nameFontSize)}px`,
      `--rcc-name-icon:${In(e.nameFontSize)}px`,
      `--rcc-accent:${e.accentColor}`,
      `--rcc-secondary:${e.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";"), o = this.tapTarget, l = this.renderClimateRow(e, t), h = !!o && l === f;
    return b`<div
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"} ${o ? "is-tappable" : ""}"
      style="${a}"
      role=${h ? "button" : "group"}
      tabindex=${h ? "0" : f}
      aria-label=${h ? `${this.cellAriaLabel(e, t)} – ${t.t("openThermostat")}` : this.cellAriaLabel(e, t)}
      @click=${this.handleCardClick}
      @keydown=${h ? this.handleCardKeydown : f}
    >
      ${this.renderHeader(e, t)} ${this.renderReadings(e, t)}
      ${l} ${this.renderChart(e, t)}
      ${this.hasAnyEntity(e) ? f : this.renderEmpty(t)}
    </div>`;
  }
  hasAnyEntity(e) {
    return !!(e.temperatureEntity || e.humidityEntity);
  }
  cellAriaLabel(e, t) {
    return `${Ri(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return b`<div class="empty-state" role="status">
      ${Z.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = Ri(e, this.hass), n = Xn(this.hass, e), s = Zn(this.hass, e), a = e.motion.enabled && e.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return b`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? b`<div class="subtle">
              ${t.t("quietSince")}
              ${Wn(n.sinceMs, this._now, {
      justNow: t.t("justNow"),
      minutes: t.t("minutesShort"),
      hours: t.t("hoursShort"),
      days: t.t("daysShort")
    })}
            </div>` : f}
      </div>
      <div class="badges">
        ${e.motion.enabled ? this.renderMotionBadge(n, t) : f}
        ${e.window.enabled ? this.renderWindowBadge(s, t) : f}
      </div>
    </div>`;
  }
  renderRoomIcon(e) {
    return this._haIconReady ? b`<ha-icon .icon=${e.icon}></ha-icon>` : Z.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", n = i ? bt : Vi, s = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return b`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${Ve(
      i ? bt : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Ve(i ? bt : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${Z.motion()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", n = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return b`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? yt : Vi};--badge-bg:${Ve(
      i ? yt : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Ve(i ? yt : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? Z.windowOpen() : Z.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(e, t) {
    if (!e.temperatureEntity && !e.humidityEntity) return f;
    const i = this.language(), n = Fi(this.hass, e.temperatureEntity, "temperature"), s = Fi(this.hass, e.humidityEntity, "humidity"), a = !!e.temperatureEntity, o = !!e.humidityEntity, l = e.showSeriesLabels;
    return b`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? b`<div class="reading-labels" aria-hidden="true">
        ${a ? b`<span class="series-label"
              ><span class="series-dot" style="background:${e.accentColor}"></span
              >${t.t("temperature")}</span
            >` : f}
        ${o ? b`<span class="series-label"
              ><span class="series-dot" style="background:${e.humidity.color}"></span
              >${t.t("humidity")}</span
            >` : f}
        </div>` : f}
      <div class="reading-values">
        ${a ? this.renderReading({
      className: "temperature",
      value: n.value,
      unit: n.unit,
      decimals: e.temperatureDecimals,
      language: i,
      ariaLabel: `${t.t("temperature")}: ${this.sensorAria(
        n,
        i,
        e.temperatureDecimals,
        t
      )}`,
      color: e.accentColor
    }) : f}
        ${o ? this.renderReading({
      className: "humidity",
      value: s.value,
      unit: s.unit,
      decimals: e.humidityDecimals,
      language: i,
      ariaLabel: `${t.t("humidity")}: ${this.sensorAria(
        s,
        i,
        e.humidityDecimals,
        t
      )}`,
      color: e.humidity.color
    }) : f}
      </div>
    </div>`;
  }
  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  renderReading(e) {
    const t = e.value !== null ? se(e.value, e.language, e.decimals) : "–";
    return b`<span class="reading ${e.className}" style="--series-color:${e.color}">
      <span class="reading-number" role="text" aria-label="${e.ariaLabel}"
        ><span class="reading-value">${t}</span
        ><span class="reading-unit">${e.unit}</span></span
      >
    </span>`;
  }
  sensorAria(e, t, i, n) {
    return e.value === null ? n.t("unavailable") : `${se(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Entity a tap on the card opens. Offered whenever a thermostat row is
   * configured – independently of whether that row is displayed, because
   * hiding the row is a visual choice and must not silently kill the tap. The
   * keyboard path is the row while it is visible and the card itself while it
   * is not (see `render()`), so the action is never pointer-only.
   */
  get tapTarget() {
    const e = this._config;
    if (!(!e || e.tapAction === "none") && e.thermostat.enabled)
      return e.thermostat.entity;
  }
  /**
   * Opens Home Assistant's more-info dialog. `hass-more-info` is the event the
   * frontend's own tiles dispatch; the dialog (with the climate controls)
   * belongs to Home Assistant, so there is nothing to rebuild or navigate to.
   */
  openMoreInfo(e) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  renderClimateRow(e, t) {
    if (!sr(e)) return f;
    const i = Li(this.hass, e, t), n = e.thermostat.showSetpoint && i.setpoint !== null, s = e.thermostat.showStatus, a = e.thermostat.showMode && !!i.modeLabel;
    if (!n && !s && !a) return f;
    const o = Jn(i, e), l = this.language(), h = i.setpoint !== null ? `${se(i.setpoint, l, e.temperatureDecimals)} ${i.unit}` : "", c = this.tapTarget, d = b`${s ? b`<span class="flame status-${i.status}" style="color:${o}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : f}
      <span class="climate-state" role=${c ? "status" : f}
        >${a ? i.modeLabel : i.label}</span
      >
      ${n ? b`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t("setpoint")}</span> ${h}</span
            >` : f}`;
    return c ? b`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${t.t("openThermostat")}"
      title="${t.t("openThermostat")}"
      @click=${() => this.openMoreInfo(c)}
    >
      ${d}
    </button>` : b`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(i)}"
      >
        ${d}
      </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(e) {
    if (e.status === "action")
      switch (e.action) {
        case "cooling":
          return Z.snowflake();
        case "fan":
          return Z.fan();
        case "drying":
          return Z.water();
        default:
          return Z.flame();
      }
    return Z.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(e) {
    return e.label;
  }
  renderChart(e, t) {
    if (!nr(e)) return f;
    const i = Date.now(), n = i - e.chart.hours * 60 * 60 * 1e3, s = e.chart.showTemperature && e.temperatureEntity ? this.withLiveState(
      this._history[e.temperatureEntity],
      e.temperatureEntity,
      i
    ) : void 0, a = e.chart.showHumidity && e.humidityEntity ? this.withLiveState(this._history[e.humidityEntity], e.humidityEntity, i) : void 0, o = this.language(), l = this.chartClock(), h = e.humidityEntity ? this.hass?.states?.[e.humidityEntity]?.attributes?.unit_of_measurement : void 0, c = e.thermostat.enabled ? Li(this.hass, e, t) : void 0, d = (e.temperatureEntity ? this.hass?.states?.[e.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = c?.setpoint ?? null, g = (m === null || !c ? null : Ni(m, c.unit, d)) ?? (c?.unit === d ? m : null), S = (R, D) => Ni(R, "°C", D) ?? R, C = {
      empty: t.t("noHistory"),
      emptyHint: t.t("noHistoryHint"),
      loading: t.t("loadingHistory"),
      error: t.t("historyError"),
      aria: t.chartAria(e.chart.hours),
      temperature: t.t("temperature"),
      humidity: t.t("humidity"),
      now: t.t("now"),
      setpoint: t.t("setpoint"),
      bandColdText: t.t("bandCold"),
      bandNormalText: t.t("bandNormal"),
      bandWarmText: t.t("bandWarm"),
      bandHotText: t.t("bandHot")
    }, T = !!this.tapTarget && !e.chart.showTooltip, U = Fn(e), x = Ln(e);
    return b`<div
      class="chart-slot ${T ? "is-tappable" : ""}"
      style="margin-left:${U}px;margin-right:${U}px;margin-bottom:${x}px"
    >
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${e.accentColor}
        .humidityColor=${e.humidity.color}
        .setpoint=${g}
        .setpointUnit=${d}
        .start=${n}
        .end=${i}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .showTooltip=${e.chart.showTooltip}
        .showExtremes=${e.chart.showExtremes}
        .temperatureUnit=${d}
        .humidityUnit=${h ?? "%"}
        .temperatureDecimals=${e.temperatureDecimals}
        .humidityDecimals=${e.humidityDecimals}
        .curve=${e.chart.curve}
        .smoothing=${e.chart.smoothing}
        .gapMode=${e.chart.gapMode}
        .maxGapMinutes=${e.chart.maxGapMinutes}
        .gapStyle=${e.chart.gapStyle}
        .humidityLineStyle=${e.chart.humidityLineStyle}
        .showTemperatureArea=${e.chart.showTemperatureGradient}
        .showHumidityArea=${e.chart.showHumidityGradient}
        .chartOpacity=${Math.round(e.chart.opacity * 100)}
        .showAxis=${e.chart.showAxis}
        .showSetpoint=${e.chart.showChartSetpoint}
        .temperatureAreaOpacity=${e.chart.temperatureAreaOpacity}
        .humidityAreaOpacity=${e.chart.humidityAreaOpacity}
        .temperatureBands=${e.chart.temperatureBands}
        .bandCold=${S(e.chart.bandLimits.coldBelow, d)}
        .bandWarm=${S(e.chart.bandLimits.warmAbove, d)}
        .bandHot=${S(e.chart.bandLimits.hotAbove, d)}
        .bandTransition=${Math.round(e.chart.bandTransition * 100)}
        .temperatureScale=${$t(d) ?? "C"}
        .cornerRadius=${e.borderRadius}
        .language=${o}
        .timeZone=${l.timeZone}
        .hour12=${l.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${C}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = kt`
    /*
     * Design tokens. Everything below is built from these values so the whole
     * card stays on one 4 px grid and one colour set:
     *
     *   surface   #0E1013 (OLED friendly, never pure black)
     *   hairline  rgba(255,255,255,0.07) – replaces hard borders
     *   text      0.92 / 0.50 / 0.32 opacity, never pure white
     *   accent    #4FD1A5 – the only signal, primary value + temperature curve
     *   secondary #8B86D6 – dot and curve of the humidity, nothing else
     */
    :host {
      display: block;
      --rcc-space-1: 4px;
      --rcc-space-2: 8px;
      --rcc-space-3: 12px;
      --rcc-space-5: 20px;
      --rcc-inset: 10px;

      --rcc-bg: var(--ha-card-background, var(--card-background-color, #0e1013));
      --rcc-surface: none;
      /* Plain values first, then a theme-aware mix, so the auto theme works
         on light and dark dashboards without any JS. */
      --rcc-hairline: rgba(255, 255, 255, 0.07);
      --rcc-hairline: color-mix(in srgb, var(--primary-text-color, #ffffff) 7%, transparent);
      --rcc-text: var(--primary-text-color, rgba(255, 255, 255, 0.92));
      --rcc-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
      --rcc-tertiary: rgba(255, 255, 255, 0.32);
      --rcc-tertiary: color-mix(in srgb, var(--primary-text-color, #ffffff) 32%, transparent);
      --rcc-neutral: #94a3b8;
      --rcc-accent: #4fd1a5;
      --rcc-secondary: #8b86d6;
      --rcc-radius: 26px;

      --rcc-temp-size: 42px;
      --rcc-hum-size: 20px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;

      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, auto);
      min-height: 0;
      /* One inset for everything: title, values and chart share the same edge. */
      padding: var(--rcc-inset, 10px);
      overflow: hidden;
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-hairline);
      border-radius: var(--rcc-radius);
      box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.9);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    /* Depth instead of a frame: a hairline plus a barely visible light gradient. */
    .card.theme-dark {
      --rcc-bg: #0e1013;
      --rcc-surface: radial-gradient(
        140% 120% at 0% 0%,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0) 54%
      );
      --rcc-hairline: rgba(255, 255, 255, 0.07);
      --rcc-text: rgba(255, 255, 255, 0.92);
      --rcc-muted: rgba(255, 255, 255, 0.5);
      --rcc-tertiary: rgba(255, 255, 255, 0.32);
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface: linear-gradient(160deg, #ffffff 0%, #f7f8fa 100%);
      --rcc-hairline: rgba(15, 23, 42, 0.07);
      --rcc-text: rgba(15, 23, 42, 0.92);
      --rcc-muted: rgba(15, 23, 42, 0.52);
      --rcc-tertiary: rgba(15, 23, 42, 0.34);
    }

    /* ------------------------------------------------------------- header */
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--rcc-space-2);
      min-height: 0;
    }
    .titles {
      min-width: 0;
      flex: 1 1 auto;
    }
    .name-row {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      min-width: 0;
      min-height: 28px;
    }
    .room-icon {
      display: inline-flex;
      flex: none;
      color: var(--rcc-tertiary);
    }
    /*
     * Icon height follows the capital letter of the title, not the line box.
     * The capitals of the 15 px title are ~11 px; a 16 px icon box ends up at
     * ~12.5–13 px of visible glyph (the paths do not fill their 24 px viewBox
     * completely), so the icon overshoots by about a pixel top and bottom.
     * 16 px also covers Material icons, which fill their viewBox more fully.
     * The value is a token (nameIconSize()): 16 px at the default 15 px title,
     * 26 px next to a 24 px one – the icon scales with the name instead of
     * looking lost beside it, and never grows past the line box.
     */
    .room-icon .icon {
      width: var(--rcc-name-icon, 16px);
      height: var(--rcc-name-icon, 16px);
    }
    .room-icon ha-icon {
      --mdc-icon-size: var(--rcc-name-icon, 16px);
      color: var(--rcc-tertiary);
      display: inline-flex;
    }
    /* The title is a caption, not a headline: same tone as the series labels. */
    .name {
      margin: 0;
      /* Room name size from the editor; 4/3 line height keeps the proportions. */
      font-size: var(--rcc-name-size, 15px);
      font-weight: 500;
      line-height: var(--rcc-name-line, 20px);
      letter-spacing: -0.012em;
      color: var(--rcc-muted);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: var(--rcc-space-1);
      font-size: 10.5px;
      line-height: 16px;
      color: var(--rcc-tertiary);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badges {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      flex: none;
    }
    /*
     * Shared badge surface. Square badges (window, motion) keep the same radius,
     * hairline and tint so they read as one family.
     */
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--rcc-space-1);
      box-sizing: border-box;
      height: 28px;
      min-width: 28px;
      border-radius: 10px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, rgba(148, 163, 184, 0.1));
      border: 1px solid var(--badge-border, var(--rcc-hairline));
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;
    }
    .badge.window,
    .badge.motion {
      width: 28px;
      padding: 0;
    }
    .badge .icon {
      width: 15px;
      height: 15px;
    }

    /* ----------------------------------------------------------- readings */
    .readings {
      display: flex;
      flex-direction: column;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-3);
      min-width: 0;
    }
    .readings.no-labels {
      /* Without the caption row the values carry their own top gap. */
      margin-top: var(--rcc-space-2);
    }
    .reading-labels {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--rcc-space-2);
      min-height: 16px;
    }
    /* Labels in versals with 0.09 em tracking – quiet, but unmistakable. */
    /*
     * Captions stay deliberately small: they declare the series, they are not
     * content. Tracking compensates for the low size so the versals stay legible.
     */
    .series-label {
      display: inline-flex;
      align-items: center;
      gap: var(--rcc-space-1);
      font-size: 9.5px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--rcc-muted);
      white-space: nowrap;
    }
    .series-label svg,
    .series-label .icon {
      width: 10px;
      height: 10px;
      opacity: 0.7;
    }
    .series-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex: none;
      transition: opacity 0.18s ease;
    }

    .reading-values {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--rcc-space-3);
      min-width: 0;
    }
    .reading {
      display: inline-flex;
      align-items: baseline;
      min-width: 0;
      color: inherit;
      font: inherit;
    }
    .reading.temperature {
      font-size: var(--rcc-temp-size);
      font-family: var(--rcc-temp-font);
    }
    .reading.humidity {
      margin-left: auto;
      font-size: var(--rcc-hum-size);
      font-family: var(--rcc-hum-font);
    }
    /* Hero: tabular figures and tight tracking, so updates never shift. */
    .reading-number {
      font-size: 1em;
      font-weight: 500;
      line-height: 1;
      letter-spacing: -0.035em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      color: var(--rcc-text);
      white-space: nowrap;
    }
    .reading.humidity .reading-number {
      letter-spacing: -0.02em;
    }
    /* Units are their own, smaller secondary type – they never compete. */
    .reading-unit {
      margin-left: 0.12em;
      font-size: 0.34em;
      font-weight: 400;
      letter-spacing: 0;
      color: var(--rcc-muted);
    }
    .reading.humidity .reading-unit {
      font-size: 0.5em;
    }

    /* --------------------------------------------------------- heating row */
    .climate-row {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-2);
      min-height: 20px;
      min-width: 0;
      font-size: 12px;
      line-height: 16px;
      color: var(--rcc-muted);
      white-space: nowrap;
    }
    /* The row is a button when the card has somewhere to go on tap. */
    button.climate-row {
      appearance: none;
      border: 0;
      background: none;
      padding: 0;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
    }
    /* A 20 px line is no touch target: grow the hit area, not the layout. */
    button.climate-row::after {
      content: '';
      position: absolute;
      inset: -6px -4px;
    }
    button.climate-row:hover {
      background: rgba(255, 255, 255, 0.04);
    }
    button.climate-row:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
    }
    /* Whole-card tap target, minus the parts that act on their own. */
    .card.is-tappable {
      cursor: pointer;
    }
    .card.is-tappable .chart-slot {
      cursor: default;
    }
    /* The chart only keeps its own cursor while it owns the tap (readout). */
    .card.is-tappable .chart-slot.is-tappable {
      cursor: pointer;
    }
    .card[role='button']:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
    }
    .flame {
      display: inline-flex;
      flex: none;
      align-items: center;
    }
    .flame .icon {
      width: 14px;
      height: 14px;
    }
    /*
     * Unknown / unavailable already use the muted text tone; dimming them a
     * second time made the tiny glyph disappear in the dark theme.
     */
    .flame.status-unknown,
    .flame.status-unavailable,
    .flame.status-missing {
      opacity: 0.9;
    }
    /*
     * State and target share one colour: the row is a single piece of context,
     * only the flame carries the accent.
     */
    .climate-state {
      color: var(--rcc-muted);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-sep {
      color: var(--rcc-tertiary);
    }
    .climate-setpoint {
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-setpoint-label {
      color: var(--rcc-tertiary);
    }

    /* -------------------------------------------------------------- chart */
    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin-top: var(--rcc-space-3);
      min-height: 0;
    }
    .chart-slot > room-climate-chart {
      flex: 1 1 auto;
      min-height: 0;
    }
    .auto-height .chart-slot {
      flex: none;
      height: var(--rcc-chart-height, 112px);
    }
    .fixed-height .chart-slot {
      flex: 1 1 auto;
      min-height: 0;
    }

    /* -------------------------------------------------------- empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--rcc-space-1);
      padding: var(--rcc-space-2) 0 var(--rcc-space-3);
      text-align: center;
      color: var(--rcc-muted);
    }
    .empty-state .icon {
      width: 18px;
      height: 18px;
      opacity: 0.5;
    }
    .empty-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--rcc-text);
      opacity: 0.8;
    }
    .empty-hint {
      font-size: 10.5px;
      line-height: 16px;
      max-width: 32ch;
      opacity: 0.7;
    }
    .empty {
      padding: var(--rcc-inset, 10px);
      font-size: 12px;
      color: var(--rcc-muted);
    }

    /* ----------------------------------------------------------- density */
    /* Dense variant: tighten the vertical rhythm, keep the grid intact. */
    .density-xs {
      --rcc-space-3: 8px;
    }
    .density-xs .reading.temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-xs .reading.humidity {
      font-size: calc(var(--rcc-hum-size, 20px) * 0.9);
    }
    .density-xs .badge {
      height: 24px;
      min-width: 24px;
      border-radius: 8px;
    }
    .density-xs .badge.window,
    .density-xs .badge.motion {
      width: 24px;
    }
    .density-xs .badge .icon,
    .density-xs .flame .icon {
      width: 12px;
      height: 12px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .reading.temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
    }
    .density-sm .reading.humidity {
      font-size: calc(var(--rcc-hum-size, 20px) * 0.95);
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
      }
    }
  `;
  }
}
console.info(
  `%c ROOM-CLIMATE-CARD %c v${Rr} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(Q) || customElements.define(Q, Ds);
customElements.get(ke) || customElements.define(ke, lr);
const Gi = window.customCards = window.customCards ?? [];
Gi.some((r) => r.type === Q) || Gi.push({
  type: Q,
  name: Hr,
  description: Dr,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  Q as CARD_TAG,
  Rr as CARD_VERSION,
  Ds as RoomClimateCard,
  lr as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
