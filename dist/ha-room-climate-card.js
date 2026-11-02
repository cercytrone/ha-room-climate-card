const X = "room-climate-card", St = "room-climate-card-editor", br = "Room Climate Card", wr = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", _r = "2.14.0";
const Gt = globalThis, _e = Gt.ShadowRoot && (Gt.ShadyCSS === void 0 || Gt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ve = /* @__PURE__ */ Symbol(), Qe = /* @__PURE__ */ new WeakMap();
let Ni = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (_e && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Qe.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Qe.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vr = (r) => new Ni(typeof r == "string" ? r : r + "", void 0, ve), $e = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ni(e, r, ve);
}, $r = (r, t) => {
  if (_e) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = Gt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, ti = _e ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return vr(e);
})(r) : r;
const { is: xr, defineProperty: Sr, getOwnPropertyDescriptor: Ar, getOwnPropertyNames: kr, getOwnPropertySymbols: Mr, getPrototypeOf: Cr } = Object, Yt = globalThis, ei = Yt.trustedTypes, Tr = ei ? ei.emptyScript : "", Er = Yt.reactiveElementPolyfillSupport, _t = (r, t) => r, fe = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Tr : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Li = (r, t) => !xr(r, t), ii = { attribute: !0, type: String, converter: fe, reflect: !1, useDefault: !1, hasChanged: Li };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Yt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let dt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ii) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Sr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: s } = Ar(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const l = n?.call(this);
      s?.call(this, a), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ii;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_t("elementProperties"))) return;
    const t = Cr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_t("properties"))) {
      const e = this.properties, i = [...kr(e), ...Mr(e)];
      for (const n of i) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, n] of e) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) e.unshift(ti(n));
    } else t !== void 0 && e.push(ti(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return $r(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : fe).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : fe;
      this._$Em = n;
      const l = a.fromAttribute(e, s.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Li)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: s }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
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
        const { wrapped: a } = s, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
dt.elementStyles = [], dt.shadowRootOptions = { mode: "open" }, dt[_t("elementProperties")] = /* @__PURE__ */ new Map(), dt[_t("finalized")] = /* @__PURE__ */ new Map(), Er?.({ ReactiveElement: dt }), (Yt.reactiveElementVersions ??= []).push("2.1.2");
const xe = globalThis, ri = (r) => r, Kt = xe.trustedTypes, ni = Kt ? Kt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Fi = "$lit$", et = `lit$${Math.random().toFixed(9).slice(2)}$`, zi = "?" + et, Hr = `<${zi}>`, ct = document, At = () => ct.createComment(""), kt = (r) => r === null || typeof r != "object" && typeof r != "function", Se = Array.isArray, Dr = (r) => Se(r) || typeof r?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, bt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, si = /-->/g, ai = />/g, ot = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oi = /'/g, li = /"/g, Bi = /^(?:script|style|textarea|title)$/i, Ii = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), g = Ii(1), $ = Ii(2), mt = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), hi = /* @__PURE__ */ new WeakMap(), lt = ct.createTreeWalker(ct, 129);
function Ui(r, t) {
  if (!Se(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ni !== void 0 ? ni.createHTML(t) : t;
}
const Rr = (r, t) => {
  const e = r.length - 1, i = [];
  let n, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = bt;
  for (let l = 0; l < e; l++) {
    const o = r[l];
    let c, h, d = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, h = a.exec(o), h !== null); ) m = a.lastIndex, a === bt ? h[1] === "!--" ? a = si : h[1] !== void 0 ? a = ai : h[2] !== void 0 ? (Bi.test(h[2]) && (n = RegExp("</" + h[2], "g")), a = ot) : h[3] !== void 0 && (a = ot) : a === ot ? h[0] === ">" ? (a = n ?? bt, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? ot : h[3] === '"' ? li : oi) : a === li || a === oi ? a = ot : a === si || a === ai ? a = bt : (a = ot, n = void 0);
    const f = a === ot && r[l + 1].startsWith("/>") ? " " : "";
    s += a === bt ? o + Hr : d >= 0 ? (i.push(c), o.slice(0, d) + Fi + o.slice(d) + et + f) : o + et + (d === -2 ? l : f);
  }
  return [Ui(r, s + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Mt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const l = t.length - 1, o = this.parts, [c, h] = Rr(t, e);
    if (this.el = Mt.createElement(c, i), lt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = lt.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Fi)) {
          const m = h[a++], f = n.getAttribute(d).split(et), y = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: s, name: y[2], strings: f, ctor: y[1] === "." ? Nr : y[1] === "?" ? Lr : y[1] === "@" ? Fr : qt }), n.removeAttribute(d);
        } else d.startsWith(et) && (o.push({ type: 6, index: s }), n.removeAttribute(d));
        if (Bi.test(n.tagName)) {
          const d = n.textContent.split(et), m = d.length - 1;
          if (m > 0) {
            n.textContent = Kt ? Kt.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(d[f], At()), lt.nextNode(), o.push({ type: 2, index: ++s });
            n.append(d[m], At());
          }
        }
      } else if (n.nodeType === 8) if (n.data === zi) o.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(et, d + 1)) !== -1; ) o.push({ type: 7, index: s }), d += et.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = ct.createElement("template");
    return i.innerHTML = t, i;
  }
}
function pt(r, t, e = r, i) {
  if (t === mt) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = kt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = pt(r, n._$AS(r, t.values), n, i)), t;
}
class Or {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? ct).importNode(e, !0);
    lt.currentNode = n;
    let s = lt.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let c;
        o.type === 2 ? c = new Ct(s, s.nextSibling, this, t) : o.type === 1 ? c = new o.ctor(s, o.name, o.strings, this, t) : o.type === 6 && (c = new zr(s, this, t)), this._$AV.push(c), o = i[++l];
      }
      a !== o?.index && (s = lt.nextNode(), a++);
    }
    return lt.currentNode = ct, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Ct {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = pt(this, t, e), kt(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== mt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Mt.createElement(Ui(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const s = new Or(n, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = hi.get(t.strings);
    return e === void 0 && hi.set(t.strings, e = new Mt(t)), e;
  }
  k(t) {
    Se(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const s of t) n === e.length ? e.push(i = new Ct(this.O(At()), this.O(At()), this, this.options)) : i = e[n], i._$AI(s), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ri(t).nextSibling;
      ri(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class qt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, s) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = pt(this, t, e, 0), a = !kt(t) || t !== this._$AH && t !== mt, a && (this._$AH = t);
    else {
      const l = t;
      let o, c;
      for (t = s[0], o = 0; o < s.length - 1; o++) c = pt(this, l[i + o], e, o), c === mt && (c = this._$AH[o]), a ||= !kt(c) || c !== this._$AH[o], c === p ? t = p : t !== p && (t += (c ?? "") + s[o + 1]), this._$AH[o] = c;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Nr extends qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Lr extends qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Fr extends qt {
  constructor(t, e, i, n, s) {
    super(t, e, i, n, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = pt(this, t, e, 0) ?? p) === mt) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zr {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    pt(this, t);
  }
}
const Br = xe.litHtmlPolyfillSupport;
Br?.(Mt, Ct), (xe.litHtmlVersions ??= []).push("3.3.3");
const Ir = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = n = new Ct(t.insertBefore(At(), s), s, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
const Ae = globalThis;
let ht = class extends dt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ir(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return mt;
  }
};
ht._$litElement$ = !0, ht.finalized = !0, Ae.litElementHydrateSupport?.({ LitElement: ht });
const Ur = Ae.litElementPolyfillSupport;
Ur?.({ LitElement: ht });
(Ae.litElementVersions ??= []).push("4.2.2");
const M = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function zt(r, t) {
  const [e, i] = r, [n, s] = t, a = i - e;
  if (!Number.isFinite(a) || a === 0) {
    const l = (n + s) / 2;
    return () => l;
  }
  return (l) => n + (l - e) / a * (s - n);
}
function ci(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function di(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = e;
  let s = r, a = t;
  if (a - s < i) {
    const o = (a + s) / 2;
    s = o - i / 2, a = o + i / 2;
  }
  const l = (a - s) * n;
  return [s - l, a + l];
}
function Pi(r) {
  const t = [];
  for (let i = 1; i < r.length; i++) {
    const n = r[i].t - r[i - 1].t;
    n > 0 && t.push(n);
  }
  if (!t.length) return 0;
  t.sort((i, n) => i - n);
  const e = Math.floor(t.length / 2);
  return t.length % 2 ? t[e] : (t[e - 1] + t[e]) / 2;
}
function Pr(r, t, e = {}) {
  const i = Pi(r), n = i > 0 ? i * 2.5 : 0, s = e.minMs ?? Math.max(t / 40, 300 * 1e3), a = e.maxMs ?? Math.max(s, t / 3);
  return Math.min(a, Math.max(n, s));
}
const Vr = 1e3, Gr = 8;
function Wr(r, t, e, i) {
  const n = e.t - t.t, s = t.v, a = e.v, l = Math.min(
    Gr,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let o = 1; o < l; o++) {
    const c = o / l;
    r.samples.push({
      t: Math.round(t.t + n * c),
      v: s + (a - s) * c
    }), r.bridged.push(!0);
  }
}
function ui(r, t) {
  const { rangeMs: e, start: i, end: n } = t, s = t.gapMode ?? "connect", a = Pr(r, e), l = t.maxGapMs ?? e / 4, o = [];
  let c = null, h = null, d = null, m = !1, f = !1;
  const y = () => {
    c && c.samples.length && o.push(c), c = null, h = null, d = null;
  }, S = (v) => {
    if (!c || !h || v === null || v <= h.t) return;
    const H = { t: v, v: h.v };
    c.samples.push(H), c.bridged.push(!1), h = H;
  };
  for (const v of r) {
    if (v.v === null || !Number.isFinite(v.v)) {
      h || (m = !0), d = d ?? v.t, f = !0;
      continue;
    }
    if (f = !1, !h || !c) {
      c = { samples: [v], bridged: [] }, h = v, d = null;
      continue;
    }
    const H = v.t - h.t;
    if (H <= a && d === null) {
      c.samples.push(v), c.bridged.push(!1), h = v;
      continue;
    }
    if (!(d !== null)) {
      const Et = Math.min(Vr, H / 2);
      c.samples.push({ t: v.t - Et, v: h.v }), c.bridged.push(!1), c.samples.push(v), c.bridged.push(!1), h = v;
      continue;
    }
    const T = Math.max(h.t, d), Tt = v.t - T;
    if (s === "connect" && Tt <= l) {
      T > h.t && (c.samples.push({ t: T, v: h.v }), c.bridged.push(!1), h = { t: T, v: h.v }), Wr(c, h, v, a), c.samples.push(v), c.bridged.push(!0), h = v, d = null;
      continue;
    }
    S(d), y(), c = { samples: [v], bridged: [] }, h = v;
  }
  if (f && S(d), y(), !o.length) return o;
  const k = o[0];
  if (!m && i !== void 0 && k.samples[0].t > i && (k.samples.unshift({ t: i, v: k.samples[0].v }), k.bridged.unshift(!1)), f)
    return o;
  const C = o[o.length - 1], z = C.samples[C.samples.length - 1];
  return n !== void 0 && z.t < n && (C.samples.push({ t: n, v: z.v }), C.bridged.push(!1)), o;
}
function mi(r, t, e) {
  if (!r || !r.length) return [];
  const i = [...r].sort((a, l) => a.t - l.t), n = [];
  let s = null;
  for (const a of i) {
    if (!Number.isFinite(a.t) || e !== void 0 && a.t > e) continue;
    const l = a.v === null || !Number.isFinite(a.v) ? null : a.v;
    if (t !== void 0 && a.t < t) {
      s = { t, v: l };
      continue;
    }
    const o = n[n.length - 1];
    if (o && o.t === a.t) {
      n[n.length - 1] = { t: a.t, v: l };
      continue;
    }
    n.push({ t: a.t, v: l });
  }
  return s && t !== void 0 && (!n.length || n[0].t > t) && n.unshift(s), n;
}
function Kr(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function jr(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function Vi(r) {
  if (!r.length) return "";
  let t = `M ${M(r[0].x)} ${M(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${M(r[e].x)} ${M(r[e].y)}`;
  return t;
}
const pi = 1, Zr = 1;
function Yr(r, t, e, i, n) {
  if (!(n > 0) || r === t && e === 0 && i === 0) return 0;
  const s = Math.min(r, t), a = Math.max(r, t);
  let l = 0;
  const o = 16;
  for (let c = 1; c < o; c++) {
    const h = c / o, d = 1 - h, m = r + e * n / 3, f = t - i * n / 3, y = d * d * d * r + 3 * d * d * h * m + 3 * d * h * h * f + h * h * h * t;
    l = Math.max(l, s - y, y - a);
  }
  return l;
}
function qr(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${M(r[0].x)} ${M(r[0].y)}`;
  if (r.length === 2) return Vi(r);
  const t = r.length, e = [], i = [];
  for (let o = 0; o < t - 1; o++)
    e[o] = r[o + 1].x - r[o].x, i[o] = e[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / e[o];
  const n = new Array(t).fill(0);
  n[0] = i[0], n[t - 1] = i[t - 2];
  for (let o = 1; o < t - 1; o++) {
    const c = i[o - 1], h = i[o];
    n[o] = c * h <= 0 ? (c + h) / 2 * Zr : (c + h) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < t - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(t).fill(1);
  for (let o = 0; o < 3; o++) {
    const c = new Array(t).fill(1);
    let h = !1;
    for (let d = 0; d < t - 1; d++) {
      if (e[d] === 0) continue;
      const m = Yr(
        r[d].y,
        r[d + 1].y,
        n[d] * a[d],
        n[d + 1] * a[d + 1],
        e[d]
      );
      if (m > pi) {
        const f = pi / m;
        c[d] = Math.min(c[d], f), c[d + 1] = Math.min(c[d + 1], f), h = !0;
      }
    }
    if (!h) break;
    for (let d = 0; d < t; d++) a[d] *= c[d];
  }
  for (let o = 0; o < t; o++) n[o] *= a[o];
  let l = `M ${M(r[0].x)} ${M(r[0].y)}`;
  for (let o = 0; o < t - 1; o++) {
    const c = r[o].x + e[o] / 3, h = r[o].y + n[o] * e[o] / 3, d = r[o + 1].x - e[o] / 3, m = r[o + 1].y - n[o + 1] * e[o] / 3;
    l += ` C ${M(c)} ${M(h)}, ${M(d)} ${M(m)}, ${M(
      r[o + 1].x
    )} ${M(r[o + 1].y)}`;
  }
  return l;
}
function Gi(r, t) {
  return t ? qr(r) : Vi(r);
}
function Xr(r, t, e) {
  if (!r.length) return "";
  const i = Gi(r, e), n = r[0], s = r[r.length - 1];
  return `${i} L ${M(s.x)} ${M(t)} L ${M(n.x)} ${M(t)} Z`;
}
function Jr(r, t, e = {}) {
  const i = Math.max(1, Math.round(t));
  if (i < 3 || r.length < 3) return r.map((l) => ({ ...l }));
  const n = Math.floor(i / 2), s = e.maxDeltaMs ?? 1 / 0, a = 2;
  return r.map((l, o) => {
    if (l.v === null) return { ...l };
    let c = 0, h = 0;
    for (let d = -n; d <= n; d++) {
      const m = r[o + d];
      !m || m.v === null || d !== 0 && Math.abs(m.t - l.t) > s || (c += m.v, h += 1);
    }
    return h ? { t: l.t, v: en(c / h, a) } : { ...l };
  });
}
const Qr = [
  "none",
  "light",
  "medium",
  "strong"
], ye = "light", fi = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60
}, tn = 121;
function en(r, t) {
  const e = 10 ** t;
  return Math.round(r * e) / e;
}
function rn(r, t = ye) {
  const e = fi[t] ?? fi[ye];
  if (!(e > 0) || !Number.isFinite(r) || r <= 0) return 1;
  const i = Math.max(1, Math.round(e * 6e4 / r));
  return Math.min(tn, i * 2 + 1);
}
function nn(r, t) {
  if (!Number.isFinite(t) || t <= 0) return 1 / 0;
  const e = Math.floor(Math.max(1, r) / 2) * t * 2;
  return Math.min(90 * 6e4, Math.max(2 * 6e4, e));
}
function sn(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let n = 0; n < e; n++)
    i.push(r + (t - r) * n / (e - 1));
  return i;
}
function an(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function on(r, t) {
  const e = r.length;
  if (e <= t || t < 3) return r.map((a, l) => l);
  const i = Math.max(1, Math.floor((t - 2) / 2)), n = /* @__PURE__ */ new Set([0, e - 1]), s = e / i;
  for (let a = 0; a < i; a++) {
    const l = Math.floor(a * s), o = Math.min(e - 1, Math.floor((a + 1) * s) - 1);
    let c = -1, h = -1, d = 1 / 0, m = -1 / 0;
    for (let f = l; f <= o; f++) {
      const y = r[f].v;
      y === null || !Number.isFinite(y) || (y < d && (d = y, c = f), y > m && (m = y, h = f));
    }
    if (c === -1) {
      n.add(l);
      continue;
    }
    n.add(c), n.add(h);
  }
  return [...n].sort((a, l) => a - l);
}
function Bt(r, t) {
  const e = r.length;
  if (!e || !Number.isFinite(t)) return null;
  let i = 0, n = e - 1, s = e;
  for (; i <= n; ) {
    const h = i + n >> 1;
    r[h].t >= t ? (s = h, n = h - 1) : i = h + 1;
  }
  let a = s - 1, l = s, o = null, c = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      o = r[a];
      break;
    }
    a--;
  }
  for (; l < e; ) {
    if (r[l].v !== null) {
      c = r[l];
      break;
    }
    l++;
  }
  return o ? c ? Math.abs(o.t - t) <= Math.abs(c.t - t) ? o : c : o : c;
}
function yi(r) {
  let t = null, e = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!t || t.v > n) && (t = i), (!e || e.v < n) && (e = i));
  }
  return t && e ? { min: t, max: e } : null;
}
const It = "#7FA6D9", Ut = "#EFB35F", Pt = "#D16A62", Wt = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, jt = 1, Wi = 100;
function le(r, t) {
  return typeof r == "number" && Number.isFinite(r) ? r : t;
}
function ln(r, t, e, i = Wt) {
  const n = [
    le(r, i.coldBelow),
    le(t, i.warmAbove),
    le(e, i.hotAbove)
  ].sort((o, c) => o - c), s = n[0], a = Math.max(n[1], s + jt), l = Math.max(n[2], a + jt);
  return { coldBelow: s, warmAbove: a, hotAbove: l };
}
function he(r, t, e) {
  return Number.isFinite(r) ? r < t.coldBelow ? e.cold : r < t.warmAbove ? e.normal : r < t.hotAbove ? e.warm : e.hot : e.normal;
}
function hn(r, t, e, i = Wi) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: e.normal }];
  const l = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), o = Math.max(t.warmAbove - t.coldBelow, jt), c = Math.max(t.hotAbove - t.warmAbove, jt), h = l * o / 2, d = l * c / 2, m = (S) => S < t.coldBelow ? e.cold : S < t.warmAbove ? e.normal : S < t.hotAbove ? e.warm : e.hot, f = [
    { value: t.coldBelow, color: e.cold },
    { value: t.coldBelow + h, color: e.normal },
    { value: t.warmAbove - h, color: e.normal },
    { value: t.warmAbove + d, color: e.warm },
    { value: t.hotAbove - d, color: e.warm },
    { value: t.hotAbove, color: e.hot }
  ].filter((S) => S.value > n && S.value < s).concat([
    { value: n, color: m(n) },
    { value: s, color: m(s) }
  ]).sort((S, k) => S.value - k.value), y = [];
  for (const S of f) {
    const k = Number(((s - S.value) / a).toFixed(4)), C = y[y.length - 1];
    C && Math.abs(C.offset - k) < 5e-4 && C.color === S.color || y.push({ offset: k, color: S.color });
  }
  return y.reverse(), y.length === 1 && y.push({ offset: 1, color: y[0].color }), y[0].offset = 0, y[y.length - 1].offset = 1, y;
}
const cn = 10, gi = { min: 0, max: 32 }, dn = ["on", "open", "opening", "tilted", "gekippt"], un = ["off", "closed", "closing"], ut = {
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
}, bi = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, wi = { min: 14, max: 96 }, mn = /^[a-z0-9_]+\.[a-z0-9_]+$/, pn = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function fn(r) {
  return typeof r == "object" && r !== null;
}
function Z(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return mn.test(t) ? t : void 0;
}
function ft(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function E(r, t, e, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(e, Math.max(t, n)) : i;
}
function A(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function wt(r, t) {
  const e = ft(r);
  return e && e.length <= 64 ? e : t;
}
function _i(r) {
  const t = ft(r);
  if (!(!t || t.length > 120) && pn.test(t))
    return t;
}
function vi(r, t) {
  return Math.round(
    E(r, wi.min, wi.max, t)
  );
}
function yn(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
const gn = [
  "type",
  "name",
  "name_entity",
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
], $i = /* @__PURE__ */ new Set();
function bn(r) {
  for (const t of Object.keys(r))
    gn.includes(t) || $i.has(t) || ($i.add(t), console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${t}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`
    ));
}
function wn(r) {
  const t = fn(r) ? r : {};
  bn(t);
  const e = Z(t.temperature_entity), i = Z(t.humidity_entity), n = Z(t.window_entity), s = Z(t.motion_entity), a = Z(t.climate_entity), l = Z(t.name_entity), o = yn(t.window_open_states), c = A(t.show_window) ?? !!n, h = A(t.show_motion) ?? !!s, d = A(t.show_thermostat) ?? !!a, m = A(t.show_temperature_chart) ?? !!e, f = A(t.show_humidity_chart) ?? !!i, y = t.height, S = y === "auto" || y === void 0 || y === null || y === 0 ? null : E(y, 120, 2e3, 0) || null, k = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", C = t.chart_curve === "linear" ? "linear" : "smooth", z = Qr.includes(t.chart_smoothing) ? t.chart_smoothing : ye, v = t.chart_gap_mode === "break" ? "break" : "connect", H = t.chart_gap_style === "dashed" ? "dashed" : "solid", D = t.chart_humidity_line_style === "dotted" ? "dotted" : "solid", T = wt(
    t.accent_color ?? t.temperature_comfort_color,
    ut.accent
  );
  return {
    raw: t,
    name: ft(t.name),
    nameEntity: l,
    icon: ft(t.icon) ?? "mdi:home-thermometer-outline",
    height: S,
    borderRadius: E(t.border_radius, 0, 40, 26),
    padding: Math.round(
      E(
        t.card_padding,
        gi.min,
        gi.max,
        cn
      )
    ),
    theme: k,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(E(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(E(t.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: vi(
          t.temperature_font_size,
          bi.temperature
        ),
        fontFamily: _i(t.temperature_font_family)
      },
      humidity: {
        fontSize: vi(t.humidity_font_size, bi.humidity),
        fontFamily: _i(t.humidity_font_family)
      }
    },
    showSeriesLabels: A(t.show_series_labels) ?? !0,
    accentColor: T,
    humidity: {
      color: wt(t.humidity_color, ut.humidity)
    },
    window: {
      enabled: c && !!n,
      entity: n,
      openStates: o.length ? o : [...dn]
    },
    motion: {
      enabled: h && !!s,
      entity: s,
      showLastChanged: A(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: d && !!a,
      entity: a,
      showRow: A(t.show_climate_row) ?? !0,
      showSetpoint: A(t.show_setpoint) ?? !0,
      showStatus: A(t.show_hvac_status) ?? !0,
      showMode: A(t.show_hvac_mode) ?? !1,
      heatingColor: wt(t.heating_color, ut.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: wt(t.heating_idle_color, T),
      offColor: wt(t.heating_off_color, ut.off)
    },
    chart: {
      showTemperature: m && !!e,
      showHumidity: f && !!i,
      hours: Math.round(E(t.chart_hours, 1, 168, 6)),
      height: Math.round(E(t.chart_height, 30, 400, 112)),
      curve: C,
      smoothing: z,
      gapMode: v,
      maxGapMinutes: Math.round(E(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: H,
      humidityLineStyle: D,
      showPoints: A(t.chart_show_points) ?? !1,
      showTooltip: A(t.chart_show_tooltip) ?? !0,
      showExtremes: A(t.chart_show_extremes) ?? !0,
      showAxis: A(t.chart_show_axis) ?? !0,
      showChartSetpoint: A(t.chart_show_setpoint) ?? !0,
      showTemperatureGradient: A(t.chart_temperature_gradient) ?? !0,
      showHumidityGradient: A(t.chart_humidity_gradient) ?? !0,
      temperatureAreaOpacity: Math.round(E(t.chart_temperature_area_opacity, 10, 300, 100)) / 100,
      humidityAreaOpacity: Math.round(E(t.chart_humidity_area_opacity, 10, 300, 100)) / 100,
      opacity: Math.round(E(t.chart_opacity, 15, 100, 100)) / 100,
      temperatureBands: (A(t.chart_temperature_bands) ?? !1) && m,
      // Thresholds are sorted in `orderBandLimits`: a user may type 24 / 18 / 27.
      bandLimits: ln(
        E(t.chart_band_cold_below, -30, 60, Wt.coldBelow),
        E(t.chart_band_warm_above, -30, 60, Wt.warmAbove),
        E(t.chart_band_hot_above, -30, 60, Wt.hotAbove)
      ),
      bandTransition: Math.round(
        E(t.chart_band_transition, 0, 100, Wi)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: A(t.chart_show_grid) ?? !1
    },
    tapAction: t.tap_action === "none" ? "none" : "more-info"
  };
}
function _n(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function Ki(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function ji(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function ce(r) {
  if (r.height) return r.height;
  const t = r.typography.temperature.fontSize, e = Ki(r) ? r.chart.height : 0, i = ji(r) ? 20 : 0, n = 28, s = r.showSeriesLabels ? 20 : 0;
  return r.padding * 2 + n + 12 + s + t + 8 + i + 12 + e;
}
function xi(r, t) {
  if (r.name) return r.name;
  if (r.nameEntity) {
    const i = t?.states[r.nameEntity]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  if (r.temperatureEntity) {
    const i = t?.states[r.temperatureEntity]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  return "Raumklima";
}
const vn = {
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
}, $n = {
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
}, xn = vn;
function ge(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Sn(r) {
  const t = ge(r) === "de" ? xn : $n;
  return {
    language: ge(r),
    t(e) {
      return t[e];
    },
    hoursRange: (e) => t.hoursRange(e),
    chartAria: (e) => t.chartAria(e),
    action: (e) => {
      const i = t.hvacAction;
      return i[e] ?? i.idle_unknown ?? e;
    },
    mode: (e) => t.hvacMode[e] ?? e
  };
}
function vt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const Si = /* @__PURE__ */ new Map();
function An(r, t) {
  const e = `${r}|${t}`;
  let i = Si.get(e);
  if (!i) {
    try {
      i = new Intl.NumberFormat(r, {
        minimumFractionDigits: t,
        maximumFractionDigits: t
      });
    } catch {
      i = new Intl.NumberFormat("en", {
        minimumFractionDigits: t,
        maximumFractionDigits: t
      });
    }
    Si.set(e, i);
  }
  return i;
}
function it(r, t, e) {
  return Number.isFinite(r) ? An(t || "en", vt(Math.round(e), 0, 3)).format(r) : "–";
}
function Xt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function kn(r, t, e) {
  const i = Math.max(0, t - r), n = Math.floor(i / 6e4);
  if (n < 1) return e.justNow;
  if (n < 60) return `${n} ${e.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${e.hours}` : `${Math.floor(s / 24)} ${e.days}`;
}
function Ai(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function be(r) {
  const t = r?.trim().toLowerCase();
  return t ? t.includes("°f") || t === "f" || t.startsWith("fahrenheit") ? "F" : t.includes("°c") || t === "c" || t.startsWith("celsius") ? "C" : null : null;
}
function ki(r, t, e) {
  if (!Number.isFinite(r)) return null;
  const i = be(t), n = be(e);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function we(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function Mn(r) {
  return `#${r.map((t) => vt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Vt(r, t) {
  const e = we(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${vt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${vt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(vt(t, 0, 1) * 100)}%, transparent)`;
}
function Jt(r) {
  return r === "unavailable" || r === "unknown";
}
function Mi(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const n = r?.states[t];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (Jt(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = Xt(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function Cn(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (Jt(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return t.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : un.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Tn = ["on", "detected", "motion", "occupied", "active"];
function En(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (Jt(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (Tn.includes(a))
    return { status: "active", entity: i, rawState: n };
  const l = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (l.sinceMs = s), l;
}
const Hn = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Ci(r, t, e) {
  const i = t.thermostat.entity, n = Ai(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), s = r?.states[i ?? ""]?.attributes?.unit_of_measurement, a = Ai(typeof s == "string" ? s : n);
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const l = r?.states[i];
  if (!l)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const o = l.state?.toLowerCase(), c = l.attributes?.hvac_action, h = typeof c == "string" ? c.toLowerCase() : void 0, d = l.attributes?.temperature, m = typeof d == "number" ? d : typeof d == "string" ? Xt(d) : null, f = {
    entity: l,
    action: h,
    setpoint: m,
    unit: a,
    mode: o,
    modeLabel: o ? e.mode(o) : void 0
  };
  return Jt(l.state ?? "") ? { ...f, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : o === "off" ? { ...f, status: "off", label: e.t("off"), colorKey: "off" } : h === "heating" ? { ...f, status: "heating", label: e.t("heating"), colorKey: "heating" } : h === "idle" ? { ...f, status: "idle", label: e.t("idle"), colorKey: "idle" } : h === "off" ? { ...f, status: "off", label: e.t("off"), colorKey: "off" } : h && !Hn.includes(h) ? { ...f, status: "action", label: e.action(h), colorKey: "idle" } : h ? { ...f, status: "action", label: e.action(h), colorKey: "idle" } : { ...f, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Dn(r, t) {
  switch (r.colorKey) {
    case "heating":
      return t.thermostat.heatingColor;
    case "idle":
      return t.thermostat.idleColor;
    case "off":
      return t.thermostat.offColor;
    default:
      return "var(--rcc-muted)";
  }
}
function $t(r) {
  return typeof r == "object" && r !== null;
}
function Rn(r) {
  if (!$t(r)) return;
  const t = r.lu;
  if (typeof t == "number" && Number.isFinite(t))
    return t > 1e12 ? t : t * 1e3;
  for (const e of ["last_changed", "last_updated", "lc"]) {
    const i = r[e];
    if (typeof i == "number" && Number.isFinite(i))
      return i > 1e12 ? i : i * 1e3;
    if (typeof i == "string") {
      const n = Date.parse(i);
      if (Number.isFinite(n)) return n;
    }
  }
}
function On(r) {
  if ($t(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Ti(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const n = Rn(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = On(i), a = Xt(s);
    t.push({ t: n, v: a });
  }
  if (!t.length) return [];
  t.sort((i, n) => i.t - n.t);
  const e = [];
  for (const i of t) {
    const n = e[e.length - 1];
    n && n.t === i.t ? e[e.length - 1] = i : e.push(i);
  }
  return e;
}
function Ei(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = $t(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in e)) continue;
      const a = Ti(i);
      e[s] = Nn(e[s], a);
    }
    return e;
  }
  if ($t(r))
    for (const i of t) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : $t(n) && Array.isArray(n.data) ? n.data : n;
      e[i] = Ti(s);
    }
  return e;
}
function Nn(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((n, s) => n.t - s.t), i = [];
  for (const n of e) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Ln(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), n = new Date(e.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const o = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), c = Ei(o, t);
      return Object.values(c).some((h) => h.length > 0), c;
    } catch (o) {
      if (!r.callApi) throw o;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((o) => encodeURIComponent(o)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, l = await r.callApi("GET", a);
  return Ei(l, t);
}
function Fn(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class zn {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, n = Date.now()) {
    const s = Fn(e, i), a = this.cache.get(s);
    if (a && n - a.fetchedAt < 12e4)
      return a.data;
    const l = this.inflight.get(s);
    if (l) return l;
    const o = Ln(t, e, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((c) => {
      if (this.cache.set(s, { fetchedAt: Date.now(), data: c }), this.cache.size > 24) {
        const h = this.cache.keys().next();
        h.done || this.cache.delete(h.value);
      }
      return c;
    }).finally(() => {
      this.inflight.delete(s);
    });
    return this.inflight.set(s, o), o;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const L = (r) => $`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, W = {
  thermometer: () => L($`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => L($`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => L(
    $`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => L(
    $`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => L(
    $`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => L(
    $`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => L(
    $`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => L(
    $`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => L($`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => L(
    $`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => L($`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => L($`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => L($`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => L(
    $`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const Bn = (r) => r.strings === void 0;
const In = { CHILD: 2 }, Un = (r) => (...t) => ({ _$litDirective$: r, values: t });
class Pn {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
const xt = (r, t) => {
  const e = r._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), xt(i, t);
  return !0;
}, Zt = (r) => {
  let t, e;
  do {
    if ((t = r._$AM) === void 0) break;
    e = t._$AN, e.delete(r), r = t;
  } while (e?.size === 0);
}, Zi = (r) => {
  for (let t; t = r._$AM; r = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(r)) break;
    e.add(r), Wn(t);
  }
};
function Vn(r) {
  this._$AN !== void 0 ? (Zt(this), this._$AM = r, Zi(this)) : this._$AM = r;
}
function Gn(r, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let s = e; s < i.length; s++) xt(i[s], !1), Zt(i[s]);
  else i != null && (xt(i, !1), Zt(i));
  else xt(this, r);
}
const Wn = (r) => {
  r.type == In.CHILD && (r._$AP ??= Gn, r._$AQ ??= Vn);
};
class Kn extends Pn {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Zi(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (xt(this, t), Zt(this));
  }
  setValue(t) {
    if (Bn(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const K = () => new jn();
class jn {
}
const de = /* @__PURE__ */ new WeakMap(), j = Un(class extends Kn {
  render(r) {
    return p;
  }
  update(r, [t]) {
    const e = t !== this.G;
    return e && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = r.options?.host, this.rt(this.ct = r.element)), p;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = de.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), de.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? de.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function Zn(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const n = on(e, t), s = n.map((l) => e[l]), a = [];
  for (let l = 1; l < n.length; l++)
    a.push(i.slice(n[l - 1] + 1, n[l] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const Yn = 320, qn = 112, Xn = 4e3, Jn = 150, Qn = 14, Hi = /* @__PURE__ */ new Set();
function ts(r, t) {
  const e = `${r}|${t}`;
  Hi.has(e) || (Hi.add(e), console.info(
    `[room-climate-card] Minimum/Maximum der ${t} ausgeblendet: ${r}. Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.`
  ));
}
const es = 0.3, is = 0.44, rs = { minSpan: 0.4, padding: 0.15 }, ns = { minSpan: 3, padding: 0.15 };
let ss = 0;
class as extends ht {
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
    }, this.uid = `rcc-chart-${++ss}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = K(), this.crosshairRef = K(), this.temperatureDotRef = K(), this.humidityDotRef = K(), this.tooltipRef = K(), this.tooltipTimeRef = K(), this.tooltipTemperatureRef = K(), this.tooltipHumidityRef = K(), this.tooltipTemperatureRowRef = K(), this.tooltipHumidityRowRef = K(), this.onPointerDown = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerMove = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerUp = (t) => {
      (t.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), Xn));
    }, this.onPointerLeave = (t) => {
      (t.pointerType || this.lastPointerType) === "mouse" && this.hideHover();
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
    this.styles = $e`
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
    super.connectedCallback(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver((t) => {
      const e = t[0];
      if (!e) return;
      const i = e.contentRect;
      this.applySize(i.width, i.height);
    }), this.resizeObserver.observe(this)), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => this.measure()) : this.measure();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.clearHoverTimer();
  }
  measure() {
    const t = this.getBoundingClientRect();
    this.applySize(t.width, t.height);
  }
  applySize(t, e) {
    const i = Math.round(t), n = Math.round(e);
    i === this.width && n === this.height || (this.width = i, this.height = n, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(t, e) {
    this.applySize(t, e);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : Yn,
      height: this.height > 20 ? this.height : qn
    };
  }
  stateView(t, e, i) {
    return g`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? g`<span class="state-hint">${i}</span>` : p}
      </div>
    </div>`;
  }
  get temperatureVisible() {
    return !!this.temperature?.some((t) => t.v !== null);
  }
  get humidityVisible() {
    return !!this.humidity?.some((t) => t.v !== null);
  }
  get hasData() {
    return !!(this.temperature?.some((t) => t.v !== null) || this.humidity?.some((t) => t.v !== null));
  }
  render() {
    const { width: t, height: e } = this.chartSize;
    if (t < 40 || e < 34) return p;
    const i = $`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = $`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(t, e);
    return this.hoverGeometry = a, g`<div class="wrap">${s}${this.renderOverlay(a)}</div>`;
  }
  renderChart(t, e) {
    const i = e, n = this.showAxis && i >= 62, s = n ? 20 : 2, a = 6, l = i - s, o = Math.max(6, l - a), c = 1, h = t - 1, d = Math.max(1, this.end - this.start), m = zt([this.start, this.end], [c, h]), f = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, y = zt([this.start, this.end], [c + f, h - f]), S = i - 6, k = this.temperature !== void 0, C = this.humidity !== void 0, z = k !== C, v = a, H = z ? l : a + o * es, D = z ? a : a + o * is, T = l, Tt = this.temperatureVisible ? this.temperature ?? [] : [], Qt = this.humidityVisible ? this.humidity ?? [] : [], Et = Tt.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), qi = Qt.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), J = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, Xi = J !== null ? [...Et, J] : Et, te = ci(Xi), ee = ci(qi), rt = te ? di(te[0], te[1], rs) : null, yt = ee ? di(ee[0], ee[1], ns) : null, O = rt ? zt(rt, [T, D]) : null, gt = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), nt = this.temperatureBands && rt ? hn(
      rt,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: It, normal: this.accentColor, warm: Ut, hot: Pt },
      this.bandTransition
    ) : null, ke = nt ? `url(#${this.uid}-temp-stroke)` : this.accentColor, Me = gt < 1 ? `;stroke-opacity:${gt}` : "", Ce = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * gt), Te = Ce(this.temperatureAreaOpacity), Ee = Ce(this.humidityAreaOpacity), He = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * Te).toFixed(3)
      )
    ), Ji = nt ? nt.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: He(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: He(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * Te).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], Qi = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * Ee).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * Ee).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], U = yt ? zt(yt, [H, v]) : null, st = mi(Tt, this.start, this.end), Ht = mi(Qt, this.start, this.end), De = {
      rangeMs: d,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, ie = this.curve === "smooth", Re = (u) => {
      if (!ie || u.length < 5) return u;
      const w = Pi(u), x = Math.min(
        rn(w, this.smoothing),
        u.length % 2 ? u.length : u.length - 1
      );
      return x < 3 ? u : Jr(u, x, {
        maxDeltaMs: nn(x, w)
      });
    }, tr = Re(st), er = Re(Ht), Oe = rt ? ui(tr, De) : [], Ne = yt ? ui(er, De) : [], ir = Math.max(1, Oe.length + Ne.length), rr = Math.max(60, Math.floor(1200 / ir)), Le = (u) => u.map((w) => Zn(w, rr)), Dt = Le(Oe), Rt = Le(Ne), Fe = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const w = a + o * u / 3;
        Fe.push($`<line class="grid-line" x1=${c} x2=${h} y1=${w} y2=${w} />`);
      }
    const ze = n ? Math.min(3, an(t)) : 0, Be = ze >= 2 ? sn(this.start, this.end, Math.max(2, ze)) : [], nr = Be.map((u, w) => {
      const x = w === Be.length - 1, b = w === 0 ? "start" : x ? "end" : "middle";
      return $`<text class="axis-label" x=${y(u)} y=${S} text-anchor=${b}>
        ${this.formatAxisLabel(u, x)}
      </text>`;
    }), Ie = (u, w) => jr(u, m, w), sr = (u, w) => (this.gapStyle === "dashed" ? Kr(u) : [u.samples]).filter((b) => b.length > 1).map((b) => Gi(Ie(b, w), ie)).filter((b) => b.length > 0), Ue = (u, w, x, b = {}) => sr(u, w).map((Q) => {
      const G = [
        b.color ? `stroke:${b.color}` : `stroke:${x}`,
        b.width ? `stroke-width:${b.width}` : "",
        b.dashed ? "stroke-dasharray:0.1 5.5" : "",
        Me.replace(/^;/, "")
      ].filter(Boolean).join(";");
      return $`<path class="series-line" d=${Q} style=${G}></path>`;
    }), ar = Dt.flatMap(
      (u) => Ue(u, O, ke, { color: ke })
    ), Pe = (u, w, x) => u.filter((b) => b.samples.length > 1).map((b) => Xr(Ie(b.samples, w), x, ie)).join(" "), Ve = O && this.showTemperatureArea ? Pe(Dt, O, l) : "", or = Ve ? [$`<path class="series-area" d=${Ve} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Ge = U && this.showHumidityArea ? Pe(Rt, U, H) : "", lr = Ge ? [
      $`<path class="series-area" d=${Ge} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], We = this.humidityLineStyle === "dotted", hr = Rt.flatMap(
      (u) => Ue(u, U, this.humidityColor, {
        color: this.humidityColor,
        dashed: We,
        width: We ? 2.2 : 1.9
      })
    ), Ke = [];
    if (this.showPoints) {
      const u = (w, x, b) => {
        const R = w.filter((F) => F.v !== null);
        if (!R.length) return;
        const G = Math.max(1, Math.ceil(R.length / 24));
        R.forEach((F, I) => {
          if (I % G !== 0 && I !== R.length - 1) return;
          const P = F.v;
          Ke.push(
            $`<circle class="point" r="1.7" cx=${m(F.t)} cy=${x(P)} style="stroke:${b}${Me}" />`
          );
        });
      };
      O && Dt.forEach((w) => u(w.samples, O, this.accentColor)), U && Rt.forEach(
        (w) => u(w.samples, U, this.humidityColor)
      );
    }
    const B = J !== null && O ? O(J) : null, Ot = this.showSetpoint && B !== null && Number.isFinite(B) && B >= D - 0.5 && B <= T + 0.5, cr = st.find((u) => u.v !== null)?.v ?? null, dr = [...st].reverse().find((u) => u.v !== null)?.v ?? null, je = (u) => u === null || J === null ? 0 : Math.abs(u - J), re = je(dr) >= je(cr), Ze = (u) => {
      for (let w = u.length - 1; w >= 0; w -= 1) {
        const x = u[w].samples;
        for (let b = x.length - 1; b >= 0; b -= 1)
          if (x[b].v !== null) return x[b];
      }
    }, Nt = Ze(Dt), ne = Ze(Rt), ur = Ot && J !== null ? `${this.labels.setpoint} ${it(J, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", Ye = (u, w, x, b) => {
      const R = yi(w);
      if (!R || R.min.v === R.max.v) return "";
      const Q = it(R.min.v, this.language, b), G = it(R.max.v, this.language, b);
      return `${u} ${Q}–${G}${x ? ` ${x}` : ""}`;
    }, mr = this.temperatureUnit || this.setpointUnit, pr = (() => {
      if (!nt || !O) return "";
      const u = st.map((P) => P.v).filter((P) => P !== null && Number.isFinite(P));
      if (!u.length) return "";
      const w = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, x = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, b = { cold: It, normal: this.accentColor, warm: Ut, hot: Pt }, R = he(Math.min(...u), w, b), Q = he(Math.max(...u), w, b), G = (P) => P === It ? x.cold : P === Ut ? x.warm : P === Pt ? x.hot : x.normal, F = G(R), I = G(Q);
      return F === I ? `(${F})` : `(${F} – ${I})`;
    })(), fr = [
      this.labels.aria,
      ur,
      O ? Ye(this.labels.temperature, st, mr, this.temperatureDecimals) : "",
      U ? Ye(this.labels.humidity, Ht, this.humidityUnit, this.humidityDecimals) : "",
      pr
    ].filter(Boolean).join(". "), se = [], qe = (u, w, x, b, R, Q, G) => {
      if (!this.showExtremes) return;
      const F = (_) => ts(_, G);
      if (t < Jn) return F("schmale Karte");
      if (b - x < Qn) return F("flaches Band");
      const I = yi(u);
      if (!I) return F("keine Messwerte");
      if (u.filter((_) => _.v !== null).length < 3) return F("zu wenige Messwerte");
      const gr = (I.min.v === I.max.v ? [{ sample: I.max, isMax: !0 }] : [
        { sample: I.max, isMax: !0 },
        { sample: I.min, isMax: !1 }
      ]).map(({ sample: _, isMax: q }) => {
        const Lt = m(_.t), N = w(_.v), V = N - 11 >= x, Ft = N + 17 <= b, at = V ? N - 9 : x + 8, tt = Ft ? N + 15 : b - 1;
        let ae = q ? V ? at : tt : Ft ? tt : at;
        if (Ot && B !== null && Math.abs(ae - B) < 9) {
          const Je = q ? tt : at;
          Math.abs(Je - B) >= 9 && (ae = Je);
        }
        return { sample: _, cx: Lt, cy: N, labelY: ae, isMax: q };
      }).filter((_) => Number.isFinite(_.cx) && Number.isFinite(_.cy)).filter((_) => _.cy >= x - 1 && _.cy <= b + 1), Xe = (_, q) => Math.abs(_.labelY - q.labelY) < 9 && Math.abs(_.cx - q.cx) < 34;
      let Y = [...gr];
      if (Y.length === 2 && Xe(Y[0], Y[1])) {
        for (const _ of Y)
          _.labelY = _.isMax ? x + 8 : b - 1;
        Xe(Y[0], Y[1]) && (Y = Y.filter((_) => _.isMax));
      }
      for (const _ of Y) {
        if (!_) continue;
        const q = 26, Lt = _.cx < (c + h) / 2;
        let N = Lt ? _.cx + 6 : _.cx - 6, V = Lt ? "start" : "end";
        V === "start" && N + q > h - 2 ? (N = _.cx - 6, V = "end") : V === "end" && N - q < c + 2 && (N = _.cx + 6, V = "start");
        const Ft = re ? h : c, at = (tt) => Ot && B !== null && Math.abs(_.labelY - (B - 5)) < 9 && Math.abs(tt - Ft) < 40;
        if (at(N)) {
          const tt = V === "start" ? _.cx - 6 : _.cx + 6;
          at(tt) || (N = tt, V = V === "start" ? "end" : "start");
        }
        se.push(
          $`<circle
            class="extreme-dot"
            r="1.8"
            cx=${_.cx}
            cy=${_.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${R};stroke-width:1.2`}
          />`
        ), at(N) || se.push(
          $`<text class="extreme-label" x=${N} y=${_.labelY} text-anchor=${V}>${it(
            _.sample.v,
            this.language,
            Q
          )}</text>`
        );
      }
    };
    O && qe(
      st,
      O,
      D,
      T,
      this.accentColor,
      this.temperatureDecimals,
      "Temperatur"
    ), U && qe(
      Ht,
      U,
      v,
      H,
      this.humidityColor,
      this.humidityDecimals,
      "Luftfeuchte"
    );
    const yr = {
      width: t,
      height: i,
      left: c,
      right: h,
      plotTop: a,
      plotBottom: l,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: O && rt ? { samples: st, domain: rt, top: D, bottom: T } : null,
      humidity: U && yt ? { samples: Ht, domain: yt, top: v, bottom: H } : null
    };
    return { chart: $`<svg
      width=${t}
      height=${i}
      viewBox="0 0 ${t} ${i}"
      role="img"
      aria-label=${fr}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${D} x2="0" y2=${T} gradientUnits="userSpaceOnUse">
          ${Ji.map(
      (u) => $`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        ${nt ? $`<linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${D} x2="0" y2=${T} gradientUnits="userSpaceOnUse">
                ${nt.map(
      (u) => $`<stop offset=${u.offset} stop-color=${u.color} />`
    )}
              </linearGradient>` : p}
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${v} x2="0" y2=${H} gradientUnits="userSpaceOnUse">
          ${Qi.map(
      (u) => $`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Fe}
      ${lr}
      ${or}
      ${Ot ? $`<line
            class="setpoint-line"
            x1=${c}
            x2=${h}
            y1=${B}
            y2=${B}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${re ? h : c}
            y=${B - 5}
            text-anchor=${re ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : p}
      <line class="baseline" x1=${c} x2=${h} y1=${l} y2=${l} />
      ${hr} ${ar} ${Ke}
      ${ne && U ? $`<circle
            class="end-dot"
            r="2.6"
            cx=${m(ne.t)}
            cy=${U(ne.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${gt}`}
          />` : p}
      ${Nt && O ? $`<circle
            class="end-dot"
            r="2.8"
            cx=${m(Nt.t)}
            cy=${O(Nt.v)}
            style=${`fill:${nt ? he(
      Nt.v,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: It, normal: this.accentColor, warm: Ut, hot: Pt }
    ) : this.accentColor};fill-opacity:${gt}`}
          />` : p}
      ${se}
      ${nr}
    </svg>`, geometry: yr };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(t) {
    if (!this.showTooltip || !t.temperature && !t.humidity) return p;
    const e = Math.round(t.plotTop), i = Math.max(1, Math.round(t.plotBottom - t.plotTop));
    return g`<div
        class="overlay"
        style=${`top:${e}px;height:${i}px`}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
      ></div>
      <div class="hover" ${j(this.hoverRef)} hidden aria-hidden="true">
        <div
          class="crosshair"
          ${j(this.crosshairRef)}
          style=${`top:${e}px;height:${i}px`}
        ></div>
        <div
          class="hover-dot"
          ${j(this.temperatureDotRef)}
          style=${`background:${this.accentColor}`}
          hidden
        ></div>
        <div
          class="hover-dot"
          ${j(this.humidityDotRef)}
          style=${`background:${this.humidityColor}`}
          hidden
        ></div>
        <div class="tooltip" ${j(this.tooltipRef)}>
          <span class="tooltip-time" ${j(this.tooltipTimeRef)}></span>
          <span class="tooltip-row" ${j(this.tooltipTemperatureRowRef)}>
            <i style=${`background:${this.accentColor}`}></i>
            <span ${j(this.tooltipTemperatureRef)}></span>
          </span>
          <span class="tooltip-row" ${j(this.tooltipHumidityRowRef)}>
            <i style=${`background:${this.humidityColor}`}></i>
            <span ${j(this.tooltipHumidityRef)}></span>
          </span>
        </div>
      </div>`;
  }
  updateHoverAt(t) {
    const e = this.hoverGeometry;
    if (!e) return;
    const n = t.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : e.width;
    if (!s) return;
    const a = n ? n.left : 0, l = Math.min(1, Math.max(0, (t.clientX - a) / s)), o = e.start + l * (e.end - e.start);
    this.showHoverAt(o);
  }
  xForTime(t, e) {
    const i = Math.max(1, e.end - e.start);
    return e.left + (t - e.start) / i * (e.right - e.left);
  }
  yForValue(t, e) {
    const [i, n] = t.domain, s = n - i || 1;
    return t.bottom - (e - i) / s * (t.bottom - t.top);
  }
  tooltipValue(t, e, i) {
    const n = it(t, this.language, i);
    return e ? `${n} ${e}` : n;
  }
  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  showHoverAt(t) {
    const e = this.hoverGeometry, i = this.hoverRef.value;
    if (!e || !i) return;
    const n = e.temperature ? Bt(e.temperature.samples, t) : null, s = e.humidity ? Bt(e.humidity.samples, t) : null;
    let a = n ?? s;
    if (n && s && (a = Math.abs(n.t - t) <= Math.abs(s.t - t) ? n : s), !a) {
      this.hideHover();
      return;
    }
    const l = a.t, o = this.crosshairRef.value, c = this.xForTime(l, e);
    o && (o.style.left = `${c}px`);
    const h = e.temperature ? Bt(e.temperature.samples, l) : null, d = e.humidity ? Bt(e.humidity.samples, l) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      e.temperature,
      h,
      c
    ), this.placeDot(this.humidityDotRef.value, e.humidity, d, c);
    const m = this.tooltipRef.value, f = this.tooltipTimeRef.value, y = this.tooltipTemperatureRowRef.value, S = this.tooltipHumidityRowRef.value, k = this.tooltipTemperatureRef.value, C = this.tooltipHumidityRef.value, z = this.temperatureUnit || this.setpointUnit;
    if (f && (f.textContent = this.formatDayTime(l)), y && (y.hidden = !h), S && (S.hidden = !d), k && h && (k.textContent = this.tooltipValue(
      h.v,
      z,
      this.temperatureDecimals
    )), C && d && (C.textContent = this.tooltipValue(
      d.v,
      this.humidityUnit,
      this.humidityDecimals
    )), m) {
      m.dataset.time = String(l);
      const v = m.offsetWidth || 84, H = m.offsetHeight || 38;
      let D = c + 10;
      D + v > e.width - 4 && (D = c - 10 - v), D = Math.max(4, Math.min(D, Math.max(4, e.width - v - 4)));
      const T = Math.max(2, Math.min(e.plotTop + 2, e.height - H - 2));
      m.style.left = `${D}px`, m.style.top = `${T}px`;
    }
    i.hidden = !1;
  }
  placeDot(t, e, i, n) {
    if (t) {
      if (!e || !i || i.v === null) {
        t.hidden = !0;
        return;
      }
      t.hidden = !1, t.style.left = `${n}px`, t.style.top = `${this.yForValue(e, i.v)}px`;
    }
  }
  hideHover() {
    this.clearHoverTimer();
    const t = this.hoverRef.value;
    t && (t.hidden = !0);
  }
  clearHoverTimer() {
    this.hoverHideTimer && clearTimeout(this.hoverHideTimer), this.hoverHideTimer = void 0;
  }
  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  formatAxisLabel(t, e) {
    return e ? this.labels.now : this.formatDayTime(t);
  }
  formatDayTime(t) {
    const e = new Date(t), i = this.language || "en", n = this.timeZone ? { timeZone: this.timeZone } : {}, s = {
      hour: "2-digit",
      minute: "2-digit",
      ...typeof this.hour12 == "boolean" ? { hour12: this.hour12 } : {}
    };
    let a, l;
    try {
      a = new Intl.DateTimeFormat(i, { weekday: "short", ...n }).format(e).replace(/[.,]/g, "").trim(), l = new Intl.DateTimeFormat(i, { ...s, ...n }).format(e);
    } catch {
      a = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][e.getDay()], l = `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
    }
    return a ? `${a} ${l}` : l;
  }
}
const Di = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Di) && customElements.define(Di, as);
const ue = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, os = {
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
    nameEntity: "Name aus Entität übernehmen",
    nameEntityHelper: "Optional: Der Anzeigename dieser Entität wird als Raumname verwendet.",
    icon: "Raumicon",
    autoHeight: "Höhe automatisch (Inhalt)",
    height: "Kartenhöhe",
    heightHelper: "Feste Höhe in Pixeln. Die Karte komprimiert ihren Inhalt automatisch.",
    radius: "Eckenradius",
    padding: "Innenabstand",
    paddingHelper: "Abstand zwischen Inhalt und Außenkante in Pixeln (0–32). Gilt für alle vier Seiten; Titel, Messwerte und Verlauf teilen diese Kante.",
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
    nameEntity: "Take name from entity",
    nameEntityHelper: "Optional: this entity’s friendly name is used as the room name.",
    icon: "Room icon",
    autoHeight: "Automatic height (content)",
    height: "Card height",
    heightHelper: "Fixed height in pixels. The card compresses itself automatically.",
    radius: "Corner radius",
    padding: "Card padding",
    paddingHelper: "Space between the content and the card edge in pixels (0–32). Applies to all four sides; title, readings and chart share this edge.",
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
function ls(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const t = r.trim().replace(",", ".");
    if (!t || t === "-" || t === ".") return null;
    const e = Number(t);
    return Number.isFinite(e) ? e : null;
  }
  return null;
}
class Yi extends ht {
  constructor() {
    super(...arguments), this._config = { type: `custom:${X}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
  setConfig(t) {
    this._drafts = {}, this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${X}` } : { type: `custom:${X}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = ge(this.hass?.locale?.language ?? this.hass?.language);
    return os[t];
  }
  /** Value shown in a field: the draft while editing, otherwise the config. */
  shownValue(t, e) {
    return Object.prototype.hasOwnProperty.call(this._drafts, t) ? this._drafts[t] : e;
  }
  setDraft(t, e) {
    Object.prototype.hasOwnProperty.call(this._drafts, t) && this._drafts[t] === e || (this._drafts = { ...this._drafts, [t]: e });
  }
  clearDraft(t) {
    if (!Object.prototype.hasOwnProperty.call(this._drafts, t)) return;
    const e = { ...this._drafts };
    delete e[t], this._drafts = e;
  }
  patch(t) {
    const e = { ...this._config, ...t };
    for (const i of Object.keys(e))
      e[i] === void 0 && delete e[i];
    e.type = this._config.type ?? `custom:${X}`, this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(t) {
    return A(this._config[t]);
  }
  showFlag(t, e) {
    return this.rawBoolean(t) ?? !!Z(this._config[e]);
  }
  /**
   * Height to use when "automatic height" is switched off again: the value the
   * user last entered, or the stored manual height, or a sensible default.
   */
  manualHeight() {
    const t = this._config.height, e = typeof t == "number" ? t : Number(t);
    return Number.isFinite(e) && e > 0 && (this.lastManualHeight = e), this.lastManualHeight;
  }
  numberValue(t, e) {
    const i = this._config[t], n = typeof i == "number" ? i : Number(i);
    return Number.isFinite(n) ? n : e;
  }
  stringValue(t, e = "") {
    return ft(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = ft(this._config[t]) ?? e;
    return we(i) ?? we(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: Mn(e) });
      }
    });
  }
  renderField(t) {
    return g`<div
      class="field ${t.disabled ? "is-disabled" : ""}"
      @focusout=${() => {
      t.revertOnLeave && this.clearDraft(t.key);
    }}
    >
      <ha-selector
        .hass=${this.hass}
        .selector=${t.selector}
        .label=${t.label}
        .value=${this.shownValue(t.key, t.value)}
        .disabled=${!!t.disabled}
        @value-changed=${(e) => {
      e.stopPropagation(), !t.disabled && (t.onChange ? t.onChange(e.detail.value) : this.patch({ [t.key]: e.detail.value }));
    }}
      ></ha-selector>
      ${t.helper ? g`<span class="helper">${t.helper}</span>` : p}
      ${t.warning ? g`<span class="helper warning">${t.warning}</span>` : p}
    </div>`;
  }
  renderSwitch(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { boolean: {} },
      value: t.value,
      disabled: t.disabled,
      helper: t.helper,
      onChange: (e) => {
        t.onChange ? t.onChange(!!e) : this.patch({ [t.key]: !!e });
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
  renderNumber(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: {
        number: {
          min: t.min,
          max: t.max,
          step: t.step,
          mode: t.mode ?? "box",
          ...t.unit ? { unit_of_measurement: t.unit } : {}
        }
      },
      value: this.numberValue(t.key, t.fallback),
      disabled: t.disabled,
      helper: t.helper,
      revertOnLeave: !0,
      onChange: (e) => {
        const i = ls(e);
        if (i === null) {
          this.setDraft(t.key, e ?? "");
          return;
        }
        if (i < t.min || i > t.max) {
          this.setDraft(t.key, e);
          return;
        }
        this.clearDraft(t.key), t.onChange ? t.onChange(i) : this.patch({ [t.key]: i });
      }
    });
  }
  /** Text field. Clearing it removes the key so the card default applies. */
  renderText(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { text: {} },
      value: this.stringValue(t.key, t.fallback ?? ""),
      disabled: t.disabled,
      helper: t.helper,
      onChange: (e) => {
        const i = typeof e == "string" ? e : "";
        i.trim().length ? (this.clearDraft(t.key), this.patch({ [t.key]: i })) : (this.setDraft(t.key, ""), this.patch({ [t.key]: void 0 }));
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
  renderSection(t, e, i) {
    const n = this.openSections.has(t);
    return g`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(t, s)}>
      <summary>
        <span class="section-title">${e}</span>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="fields">${i}</div>
    </details>`;
  }
  onToggle(t, e) {
    e.currentTarget.open ? this.openSections.add(t) : this.openSections.delete(t);
  }
  render() {
    if (!this._selectorsReady)
      return g`<div class="loading">${this.text.loading}</div>`;
    const t = this.text;
    return g`<div class="editor">
      ${this.renderSection("general", t.general, this.renderGeneral(t))}
      ${this.renderSection("sensors", t.sensors, this.renderSensors(t))}
      ${this.renderSection("typography", t.typography, this.renderTypography(t))}
      ${this.renderSection("colors", t.colors, this.renderColors(t))}
      ${this.renderSection("window", t.window, this.renderWindow(t))}
      ${this.renderSection("motion", t.motion, this.renderMotion(t))}
      ${this.renderSection("thermostat", t.thermostat, this.renderThermostat(t))}
      ${this.renderSection("chart", t.chart, this.renderChart(t))}
    </div>`;
  }
  renderGeneral(t) {
    const e = !this._config.height || this._config.height === "auto";
    return g`<div class="hint">${t.generalHelper}</div>
      ${this.renderText({ key: "name", label: t.name, helper: t.nameHelper })}
      ${this.renderField({
      key: "name_entity",
      label: t.nameEntity,
      selector: { entity: { multiple: !1 } },
      value: this.stringValue("name_entity"),
      helper: t.nameEntityHelper
    })}
      ${this.renderField({
      key: "icon",
      label: t.icon,
      selector: { icon: {} },
      value: this.stringValue("icon", "mdi:home-thermometer-outline")
    })}
      ${this.renderSwitch({
      key: "auto_height",
      label: t.autoHeight,
      value: e,
      onChange: (i) => {
        this.clearDraft("height"), this.patch({ height: i ? "auto" : this.manualHeight() });
      }
    })}
      ${this.renderNumber({
      key: "height",
      label: t.height,
      min: 140,
      max: 900,
      step: 4,
      unit: "px",
      fallback: 240,
      disabled: e,
      helper: t.heightHelper,
      onChange: (i) => {
        this.lastManualHeight = i, this.patch({ height: i });
      }
    })}
      ${this.renderNumber({
      key: "border_radius",
      label: t.radius,
      min: 0,
      max: 40,
      step: 1,
      unit: "px",
      fallback: 26
    })}
      ${this.renderNumber({
      key: "card_padding",
      label: t.padding,
      helper: t.paddingHelper,
      min: 0,
      max: 32,
      step: 1,
      unit: "px",
      fallback: 10
    })}
      ${this.renderField({
      key: "theme",
      label: t.theme,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "auto", label: t.themeAuto },
            { value: "dark", label: t.themeDark },
            { value: "light", label: t.themeLight }
          ]
        }
      },
      value: this.stringValue("theme", "auto")
    })}`;
  }
  renderSensors(t) {
    return g`${this.renderField({
      key: "temperature_entity",
      label: t.temperatureEntity,
      selector: { entity: { domain: "sensor", multiple: !1 } },
      value: this.stringValue("temperature_entity")
    })}
      ${this.renderField({
      key: "humidity_entity",
      label: t.humidityEntity,
      selector: { entity: { domain: "sensor", multiple: !1 } },
      value: this.stringValue("humidity_entity")
    })}
      ${this.renderNumber({
      key: "temperature_decimals",
      label: t.temperatureDecimals,
      min: 0,
      max: 3,
      step: 1,
      fallback: 1
    })}
      ${this.renderNumber({
      key: "humidity_decimals",
      label: t.humidityDecimals,
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
  renderTypography(t) {
    return g`<div class="hint">${t.readingSizeHelper}</div>
      ${this.renderSwitch({
      key: "show_series_labels",
      label: t.showSeriesLabels,
      value: this.rawBoolean("show_series_labels") ?? !0
    })}
      ${this.renderNumber({
      key: "temperature_font_size",
      label: t.temperatureSize,
      min: 14,
      max: 96,
      step: 1,
      unit: "px",
      fallback: 42
    })}
      ${this.renderText({
      key: "temperature_font_family",
      label: t.temperatureFont,
      helper: t.readingFontHelper
    })}
      ${this.renderNumber({
      key: "humidity_font_size",
      label: t.humiditySize,
      min: 14,
      max: 96,
      step: 1,
      unit: "px",
      fallback: 20
    })}
      ${this.renderText({
      key: "humidity_font_family",
      label: t.humidityFont,
      helper: t.readingFontHelper
    })}`;
  }
  /** Two colours, one job each: accent for the hero, secondary for humidity. */
  /** The row switch disables everything that only lives inside that row. */
  get rowVisible() {
    return this.rawBoolean("show_climate_row") ?? !0;
  }
  renderColors(t) {
    return g`<div class="hint">${t.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: t.accentColor,
      fallback: ut.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: t.secondaryColor,
      fallback: ut.humidity
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = Z(this._config.window_entity);
    return g`${this.renderSwitch({
      key: "show_window",
      label: t.showWindow,
      value: e,
      onChange: (n) => this.patch({ show_window: n, ...n ? {} : { window_entity: void 0 } })
    })}
      ${this.renderField({
      key: "window_entity",
      label: t.windowEntity,
      selector: { entity: { domain: ["binary_sensor", "input_boolean", "sensor"], multiple: !1 } },
      value: i ?? "",
      disabled: !e,
      warning: e && !i ? t.missingEntity : void 0
    })}
      ${i ? this.renderField({
      key: "window_open_states",
      label: t.windowOpenStates,
      selector: { state: { entity_id: i, multiple: !0 } },
      value: this._config.window_open_states ?? [],
      disabled: !e,
      helper: t.windowOpenStatesHelper
    }) : this.renderField({
      key: "window_open_states",
      label: t.windowOpenStates,
      selector: { text: {} },
      value: (this._config.window_open_states ?? []).join(", "),
      disabled: !e,
      helper: t.windowOpenStatesHelper,
      onChange: (n) => {
        const s = String(n ?? "").split(",").map((a) => a.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: s.length ? s : void 0 });
      }
    })}`;
  }
  renderMotion(t) {
    const e = this.showFlag("show_motion", "motion_entity");
    return g`${this.renderSwitch({
      key: "show_motion",
      label: t.showMotion,
      value: e,
      onChange: (i) => this.patch({ show_motion: i, ...i ? {} : { motion_entity: void 0 } })
    })}
      ${this.renderField({
      key: "motion_entity",
      label: t.motionEntity,
      selector: { entity: { domain: ["binary_sensor", "input_boolean", "sensor"], multiple: !1 } },
      value: this.stringValue("motion_entity"),
      disabled: !e,
      warning: e && !Z(this._config.motion_entity) ? t.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "motion_show_last_changed",
      label: t.motionLastChanged,
      value: this.rawBoolean("motion_show_last_changed") ?? !0,
      disabled: !e
    })}`;
  }
  renderThermostat(t) {
    const e = this.showFlag("show_thermostat", "climate_entity");
    return g`${this.renderSwitch({
      key: "show_thermostat",
      label: t.showThermostat,
      value: e,
      onChange: (i) => this.patch({ show_thermostat: i, ...i ? {} : { climate_entity: void 0 } })
    })}
      ${this.renderField({
      key: "climate_entity",
      label: t.climateEntity,
      selector: { entity: { domain: "climate", multiple: !1 } },
      value: this.stringValue("climate_entity"),
      disabled: !e,
      warning: e && !Z(this._config.climate_entity) ? t.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "show_climate_row",
      label: t.showClimateRow,
      value: this.rawBoolean("show_climate_row") ?? !0,
      disabled: !e
    })}
      ${this.renderField({
      key: "tap_action",
      label: t.tapAction,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "more-info", label: t.tapMoreInfo },
            { value: "none", label: t.tapNone }
          ]
        }
      },
      value: this.stringValue("tap_action", "more-info"),
      disabled: !e || !this.rowVisible,
      helper: t.tapHelper
    })}
      ${this.renderSwitch({
      key: "show_setpoint",
      label: t.showSetpoint,
      value: this.rawBoolean("show_setpoint") ?? !0,
      disabled: !e || !this.rowVisible
    })}
      ${this.renderSwitch({
      key: "show_hvac_status",
      label: t.showHvacStatus,
      value: this.rawBoolean("show_hvac_status") ?? !0,
      disabled: !e || !this.rowVisible
    })}
      ${this.renderSwitch({
      key: "show_hvac_mode",
      label: t.showHvacMode,
      value: this.rawBoolean("show_hvac_mode") ?? !1,
      disabled: !e || !this.rowVisible
    })}
      ${this.renderColor({
      key: "heating_color",
      label: t.heatingColor,
      fallback: ue.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: ue.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: ue.off,
      disabled: !e
    })}`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = e || i, s = e && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48].map((l) => ({ value: String(l), label: `${l} h` }));
    return g`${this.renderSwitch({
      key: "show_temperature_chart",
      label: t.showTemperatureChart,
      value: e,
      onChange: (l) => this.patch({ show_temperature_chart: l })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: t.showHumidityChart,
      value: i,
      onChange: (l) => this.patch({ show_humidity_chart: l })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: t.hours,
      selector: { select: { mode: "dropdown", options: a } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !n,
      onChange: (l) => {
        const o = Number(l);
        this.patch({ chart_hours: Number.isFinite(o) ? o : 6 });
      }
    })}
      ${this.renderNumber({
      key: "chart_height",
      label: t.chartHeight,
      min: 40,
      max: 240,
      step: 4,
      unit: "px",
      fallback: 84,
      disabled: !n
    })}
      ${this.renderField({
      key: "chart_curve",
      label: t.curve,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "smooth", label: t.curveSmooth },
            { value: "linear", label: t.curveLinear }
          ]
        }
      },
      value: this.stringValue("chart_curve", "smooth"),
      disabled: !n
    })}
      ${this.renderField({
      key: "chart_smoothing",
      label: t.smoothing,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "none", label: t.smoothingNone },
            { value: "light", label: t.smoothingLight },
            { value: "medium", label: t.smoothingMedium },
            { value: "strong", label: t.smoothingStrong }
          ]
        }
      },
      value: this.stringValue("chart_smoothing", "light"),
      disabled: !n || this.stringValue("chart_curve", "smooth") === "linear",
      helper: t.smoothingHelper,
      onChange: (l) => this.patch({ chart_smoothing: String(l) })
    })}
      ${this.renderSwitch({
      key: "chart_temperature_gradient",
      label: t.temperatureGradient,
      value: this.rawBoolean("chart_temperature_gradient") ?? !0,
      disabled: !e
    })}
      ${this.renderSwitch({
      key: "chart_humidity_gradient",
      label: t.humidityGradient,
      value: this.rawBoolean("chart_humidity_gradient") ?? !0,
      disabled: !i,
      helper: t.gradientHelper
    })}
      ${this.renderNumber({
      key: "chart_temperature_area_opacity",
      label: t.temperatureAreaOpacity,
      min: 10,
      max: 300,
      step: 10,
      unit: "%",
      fallback: 100,
      disabled: !e || !this.temperatureGradientOn(),
      helper: t.areaOpacityHelper
    })}
      ${this.renderNumber({
      key: "chart_humidity_area_opacity",
      label: t.humidityAreaOpacity,
      min: 10,
      max: 300,
      step: 10,
      unit: "%",
      fallback: 100,
      disabled: !i || !this.humidityGradientOn()
    })}
      ${this.renderNumber({
      key: "chart_opacity",
      label: t.chartOpacity,
      min: 15,
      max: 100,
      step: 5,
      unit: "%",
      fallback: 100,
      disabled: !n,
      helper: t.chartOpacityHelper
    })}
      ${this.renderSwitch({
      key: "chart_temperature_bands",
      label: t.temperatureBands,
      value: this.rawBoolean("chart_temperature_bands") ?? !1,
      disabled: !e,
      helper: t.temperatureBandsHelper,
      onChange: (l) => this.patch({ chart_temperature_bands: l ? !0 : void 0 })
    })}
      ${this.renderNumber({
      key: "chart_band_cold_below",
      label: t.bandCold,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 18,
      disabled: !e || !s
    })}
      ${this.renderNumber({
      key: "chart_band_warm_above",
      label: t.bandWarm,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 24,
      disabled: !e || !s
    })}
      ${this.renderNumber({
      key: "chart_band_hot_above",
      label: t.bandHot,
      min: -30,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 27,
      disabled: !e || !s,
      helper: t.bandHelper
    })}
      ${this.renderNumber({
      key: "chart_band_transition",
      label: t.bandTransition,
      min: 0,
      max: 100,
      step: 5,
      unit: "%",
      fallback: 100,
      mode: "slider",
      disabled: !e || !s,
      helper: t.bandTransitionHelper
    })}
      ${this.renderField({
      key: "chart_humidity_line_style",
      label: t.humidityLine,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "solid", label: t.humidityLineSolid },
            { value: "dotted", label: t.humidityLineDotted }
          ]
        }
      },
      value: this.stringValue("chart_humidity_line_style", "solid"),
      disabled: !i,
      helper: t.humidityLineHelper,
      onChange: (l) => this.patch({ chart_humidity_line_style: String(l) })
    })}
      ${this.renderField({
      key: "chart_gap_mode",
      label: t.gapMode,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "connect", label: t.gapConnect },
            { value: "break", label: t.gapBreak }
          ]
        }
      },
      value: this.stringValue("chart_gap_mode", "connect"),
      disabled: !n,
      helper: t.gapHelper,
      onChange: (l) => this.patch({ chart_gap_mode: String(l) })
    })}
      ${this.renderNumber({
      key: "chart_max_gap_minutes",
      label: t.maxGap,
      min: 5,
      max: 720,
      step: 5,
      unit: "min",
      fallback: 120,
      disabled: !n || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderField({
      key: "chart_gap_style",
      label: t.gapStyle,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "solid", label: t.gapStyleSolid },
            { value: "dashed", label: t.gapStyleDashed }
          ]
        }
      },
      value: this.stringValue("chart_gap_style", "solid"),
      disabled: !n || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderSwitch({
      key: "chart_show_grid",
      label: t.grid,
      value: this.rawBoolean("chart_show_grid") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_setpoint",
      label: t.setpointLine,
      value: this.rawBoolean("chart_show_setpoint") ?? !0,
      disabled: !e,
      helper: t.setpointLineHelper
    })}
      ${this.renderSwitch({
      key: "chart_show_axis",
      label: t.axis,
      value: this.rawBoolean("chart_show_axis") ?? !0,
      disabled: !n,
      helper: t.axisHelper
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: t.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_tooltip",
      label: t.tooltip,
      value: this.rawBoolean("chart_show_tooltip") ?? !0,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_extremes",
      label: t.extremes,
      value: this.rawBoolean("chart_show_extremes") ?? !0,
      disabled: !n
    })}
      <p class="helper">${t.comfortHelper}</p>`;
  }
  static {
    this.styles = $e`
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
typeof customElements < "u" && !customElements.get(St) && customElements.define(St, Yi);
const me = "#fbbf24", pe = "#34d399", Ri = "var(--rcc-neutral)", hs = 15 * 1e3, cs = 300 * 1e3;
class ds extends ht {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new zn(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.handleCardClick = (t) => {
      const e = this.tapTarget;
      if (!e) return;
      const i = t.target;
      if (!!i?.closest(".chart-slot, room-climate-chart")) {
        if (this._config?.chart.showTooltip) return;
      } else if (i?.closest("button, a, input, select, textarea"))
        return;
      this.openMoreInfo(e);
    }, this.handleCardKeydown = (t) => {
      if (t.target !== t.currentTarget || t.key !== "Enter" && t.key !== " ") return;
      const e = this.tapTarget;
      e && (t.preventDefault(), this.openMoreInfo(e));
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
    super.connectedCallback(), this.startTimers(), typeof ResizeObserver < "u" && !this.resizeObserver && (this.resizeObserver = new ResizeObserver((t) => {
      const e = t[0];
      e && this.updateDensity(e.contentRect.height);
    }), this.resizeObserver.observe(this)), typeof document < "u" && document.addEventListener("visibilitychange", this.onVisibilityChange), typeof IntersectionObserver < "u" && !this.intersectionObserver && (this.intersectionObserver = new IntersectionObserver((t) => {
      const e = t[0];
      if (!e) return;
      const i = this.visible;
      this.visible = e.isIntersecting, !i && this.visible && this.isConnected && Date.now() - this.historyFetchedAt > 3e5 && this.loadHistory(this.historyKey, !0);
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
  setConfig(t) {
    const e = wn(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(St);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), n = (d) => i.find(d)?.entity_id, s = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "temperature"
    ), a = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "humidity"
    ), l = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(d.attributes?.device_class))
    ), o = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && d.attributes?.device_class === "motion"
    ), c = n((d) => d.entity_id.startsWith("climate.")), h = { type: `custom:${X}` };
    return s && (h.temperature_entity = s), a && (h.humidity_entity = a), l && (h.window_entity = l), o && (h.motion_entity = o), c && (h.climate_entity = c), h;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(ce(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? ce(this._config) : 230;
    return {
      columns: 6,
      min_columns: 4,
      rows: Math.min(12, Math.max(2, Math.round(t / 66))),
      min_rows: 2
    };
  }
  // ------------------------------------------------------------------- history
  translator() {
    const t = this.hass?.locale?.language ?? this.hass?.language ?? "en";
    return Sn(t);
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
    const t = this.hass?.locale, e = t?.time_zone || this.hass?.config?.time_zone || void 0, i = t?.time_format;
    return { timeZone: e, hour12: i === "am_pm" ? !0 : i === "24" ? !1 : void 0 };
  }
  historyEntityIds(t) {
    const e = [];
    return t.chart.showTemperature && t.temperatureEntity && e.push(t.temperatureEntity), t.chart.showHumidity && t.humidityEntity && e.push(t.humidityEntity), e;
  }
  historyKeyFor(t) {
    const e = this.historyEntityIds(t);
    return e.length ? `${e.sort().join("|")}@${t.chart.hours}` : "";
  }
  ensureHistory() {
    if (!this.isConnected) return;
    const t = this._config;
    if (!t || !this.hass) return;
    const e = this.historyKeyFor(t);
    if (!e) {
      this.historyKey && (this.historyKey = "", this._history = {}, this._historyLoading = !1, this._historyError = void 0);
      return;
    }
    e === this.historyKey && (this.historyFetchedAt > 0 || this.retryDelay > 0) || (this.historyKey = e, this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
      this.pendingLoad = void 0, this.loadHistory(e);
    }, 60));
  }
  async loadHistory(t, e = !1) {
    const i = this._config, n = this.hass;
    if (!i || !n || !t) return;
    const s = this.historyEntityIds(i);
    if (!s.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const a = Date.now(), l = a - i.chart.hours * 60 * 60 * 1e3;
    try {
      const o = await this.repository.load(n, s, i.chart.hours, a);
      if (this.historyKey !== t) return;
      this._history = o, this._historyWindow = { start: l, end: a }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, e && this.requestUpdate();
    } catch (o) {
      if (this.historyKey !== t) return;
      this._historyError = o instanceof Error ? o.message : String(o), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, hs), cs), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
        this.pendingLoad = void 0, this.isConnected && this.loadHistory(t, !0);
      }, this.retryDelay);
    } finally {
      this.historyKey === t && (this._historyLoading = !1);
    }
  }
  /**
   * Appends the current state when it is newer than the fetched history, so the
   * curve ends exactly at the value shown in the big reading – including a
   * sensor that just became unavailable.
   */
  withLiveState(t, e, i) {
    if (!t || !t.length) return t;
    const n = this.hass?.states?.[e];
    if (!n) return t;
    const s = Date.parse(n.last_changed);
    if (!Number.isFinite(s)) return t;
    const a = t[t.length - 1], l = Math.min(s, i);
    if (l <= a.t) return t;
    const o = Xt(n.state);
    return a.v === o ? t : [...t, { t: l, v: o }];
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? ce(this._config) : 0;
    let i = "md";
    e > 0 && e < 168 ? i = "xs" : e > 0 && e < 232 && (i = "sm"), i !== this._density && (this._density = i);
  }
  // ------------------------------------------------------------------ updates
  willUpdate(t) {
    if (t.has("hass")) {
      const e = this.hass?.connected !== !1;
      e && !this.lastConnected && (this.historyFetchedAt = 0, this.loadHistory(this.historyKey, !0)), this.lastConnected = e, this.ensureHistory();
    }
    t.has("_config") && this._config && this.ensureHistory();
  }
  shouldUpdate(t) {
    if (t.has("hass")) {
      const e = t.get("hass");
      if (!e || !this.hass || e.connected !== this.hass.connected || e.locale?.language !== this.hass.locale?.language || e.locale?.number_format !== this.hass.locale?.number_format || e.locale?.time_format !== this.hass.locale?.time_format || e.locale?.time_zone !== this.hass.locale?.time_zone || e.config?.time_zone !== this.hass.config?.time_zone || e.themes?.darkMode !== this.hass.themes?.darkMode || e.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? _n(this._config) : [];
      return i.length ? i.some((n) => e.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return g`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
    const i = t.theme === "auto" ? "theme-auto" : `theme-${t.theme}`, { temperature: n, humidity: s } = t.typography, a = [
      `--rcc-radius:${t.borderRadius}px`,
      `--rcc-inset:${t.padding}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${s.fontSize}px`,
      `--rcc-accent:${t.accentColor}`,
      `--rcc-secondary:${t.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";"), l = this.tapTarget, o = this.renderClimateRow(t, e), c = !!l && o === p;
    return g`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"} ${l ? "is-tappable" : ""}"
      style="${a}"
      role=${c ? "button" : "group"}
      tabindex=${c ? "0" : p}
      aria-label=${c ? `${this.cellAriaLabel(t, e)} – ${e.t("openThermostat")}` : this.cellAriaLabel(t, e)}
      @click=${this.handleCardClick}
      @keydown=${c ? this.handleCardKeydown : p}
    >
      ${this.renderHeader(t, e)} ${this.renderReadings(t, e)}
      ${o} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? p : this.renderEmpty(e)}
    </div>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${xi(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return g`<div class="empty-state" role="status">
      ${W.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = xi(t, this.hass), n = En(this.hass, t), s = Cn(this.hass, t), a = t.motion.enabled && t.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return g`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? g`<div class="subtle">
              ${e.t("quietSince")}
              ${kn(n.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : p}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(n, e) : p}
        ${t.window.enabled ? this.renderWindowBadge(s, e) : p}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? g`<ha-icon .icon=${t.icon}></ha-icon>` : W.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", n = i ? pe : Ri, s = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return g`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${Vt(
      i ? pe : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Vt(i ? pe : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${W.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", n = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return g`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? me : Ri};--badge-bg:${Vt(
      i ? me : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Vt(i ? me : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? W.windowOpen() : W.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return p;
    const i = this.language(), n = Mi(this.hass, t.temperatureEntity, "temperature"), s = Mi(this.hass, t.humidityEntity, "humidity"), a = !!t.temperatureEntity, l = !!t.humidityEntity, o = t.showSeriesLabels;
    return g`<div class="readings ${o ? "" : "no-labels"}">
      ${o ? g`<div class="reading-labels" aria-hidden="true">
        ${a ? g`<span class="series-label"
              ><span class="series-dot" style="background:${t.accentColor}"></span
              >${e.t("temperature")}</span
            >` : p}
        ${l ? g`<span class="series-label"
              ><span class="series-dot" style="background:${t.humidity.color}"></span
              >${e.t("humidity")}</span
            >` : p}
        </div>` : p}
      <div class="reading-values">
        ${a ? this.renderReading({
      className: "temperature",
      value: n.value,
      unit: n.unit,
      decimals: t.temperatureDecimals,
      language: i,
      ariaLabel: `${e.t("temperature")}: ${this.sensorAria(
        n,
        i,
        t.temperatureDecimals,
        e
      )}`,
      color: t.accentColor
    }) : p}
        ${l ? this.renderReading({
      className: "humidity",
      value: s.value,
      unit: s.unit,
      decimals: t.humidityDecimals,
      language: i,
      ariaLabel: `${e.t("humidity")}: ${this.sensorAria(
        s,
        i,
        t.humidityDecimals,
        e
      )}`,
      color: t.humidity.color
    }) : p}
      </div>
    </div>`;
  }
  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  renderReading(t) {
    const e = t.value !== null ? it(t.value, t.language, t.decimals) : "–";
    return g`<span class="reading ${t.className}" style="--series-color:${t.color}">
      <span class="reading-number" role="text" aria-label="${t.ariaLabel}"
        ><span class="reading-value">${e}</span
        ><span class="reading-unit">${t.unit}</span></span
      >
    </span>`;
  }
  sensorAria(t, e, i, n) {
    return t.value === null ? n.t("unavailable") : `${it(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Entity a tap on the card opens. Offered whenever a thermostat row is
   * configured – independently of whether that row is displayed, because
   * hiding the row is a visual choice and must not silently kill the tap. The
   * keyboard path is the row while it is visible and the card itself while it
   * is not (see `render()`), so the action is never pointer-only.
   */
  get tapTarget() {
    const t = this._config;
    if (!(!t || t.tapAction === "none") && t.thermostat.enabled)
      return t.thermostat.entity;
  }
  /**
   * Opens Home Assistant's more-info dialog. `hass-more-info` is the event the
   * frontend's own tiles dispatch; the dialog (with the climate controls)
   * belongs to Home Assistant, so there is nothing to rebuild or navigate to.
   */
  openMoreInfo(t) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: t },
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
  renderClimateRow(t, e) {
    if (!ji(t)) return p;
    const i = Ci(this.hass, t, e), n = t.thermostat.showSetpoint && i.setpoint !== null, s = t.thermostat.showStatus, a = t.thermostat.showMode && !!i.modeLabel;
    if (!n && !s && !a) return p;
    const l = Dn(i, t), o = this.language(), c = i.setpoint !== null ? `${it(i.setpoint, o, t.temperatureDecimals)} ${i.unit}` : "", h = this.tapTarget, d = g`${s ? g`<span class="flame status-${i.status}" style="color:${l}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : p}
      <span class="climate-state" role=${h ? "status" : p}
        >${a ? i.modeLabel : i.label}</span
      >
      ${n ? g`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${e.t("setpoint")}</span> ${c}</span
            >` : p}`;
    return h ? g`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${e.t("openThermostat")}"
      title="${e.t("openThermostat")}"
      @click=${() => this.openMoreInfo(h)}
    >
      ${d}
    </button>` : g`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(i)}"
      >
        ${d}
      </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return W.snowflake();
        case "fan":
          return W.fan();
        case "drying":
          return W.water();
        default:
          return W.flame();
      }
    return W.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!Ki(t)) return p;
    const i = Date.now(), n = i - t.chart.hours * 60 * 60 * 1e3, s = t.chart.showTemperature && t.temperatureEntity ? this.withLiveState(
      this._history[t.temperatureEntity],
      t.temperatureEntity,
      i
    ) : void 0, a = t.chart.showHumidity && t.humidityEntity ? this.withLiveState(this._history[t.humidityEntity], t.humidityEntity, i) : void 0, l = this.language(), o = this.chartClock(), c = t.humidityEntity ? this.hass?.states?.[t.humidityEntity]?.attributes?.unit_of_measurement : void 0, h = t.thermostat.enabled ? Ci(this.hass, t, e) : void 0, d = (t.temperatureEntity ? this.hass?.states?.[t.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = h?.setpoint ?? null, y = (m === null || !h ? null : ki(m, h.unit, d)) ?? (h?.unit === d ? m : null), S = (z, v) => ki(z, "°C", v) ?? z, k = {
      empty: e.t("noHistory"),
      emptyHint: e.t("noHistoryHint"),
      loading: e.t("loadingHistory"),
      error: e.t("historyError"),
      aria: e.chartAria(t.chart.hours),
      temperature: e.t("temperature"),
      humidity: e.t("humidity"),
      now: e.t("now"),
      setpoint: e.t("setpoint"),
      bandColdText: e.t("bandCold"),
      bandNormalText: e.t("bandNormal"),
      bandWarmText: e.t("bandWarm"),
      bandHotText: e.t("bandHot")
    }, C = !!this.tapTarget && !t.chart.showTooltip;
    return g`<div class="chart-slot ${C ? "is-tappable" : ""}">
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${t.accentColor}
        .humidityColor=${t.humidity.color}
        .setpoint=${y}
        .setpointUnit=${d}
        .start=${n}
        .end=${i}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .showTooltip=${t.chart.showTooltip}
        .showExtremes=${t.chart.showExtremes}
        .temperatureUnit=${d}
        .humidityUnit=${c ?? "%"}
        .temperatureDecimals=${t.temperatureDecimals}
        .humidityDecimals=${t.humidityDecimals}
        .curve=${t.chart.curve}
        .smoothing=${t.chart.smoothing}
        .gapMode=${t.chart.gapMode}
        .maxGapMinutes=${t.chart.maxGapMinutes}
        .gapStyle=${t.chart.gapStyle}
        .humidityLineStyle=${t.chart.humidityLineStyle}
        .showTemperatureArea=${t.chart.showTemperatureGradient}
        .showHumidityArea=${t.chart.showHumidityGradient}
        .chartOpacity=${Math.round(t.chart.opacity * 100)}
        .showAxis=${t.chart.showAxis}
        .showSetpoint=${t.chart.showChartSetpoint}
        .temperatureAreaOpacity=${t.chart.temperatureAreaOpacity}
        .humidityAreaOpacity=${t.chart.humidityAreaOpacity}
        .temperatureBands=${t.chart.temperatureBands}
        .bandCold=${S(t.chart.bandLimits.coldBelow, d)}
        .bandWarm=${S(t.chart.bandLimits.warmAbove, d)}
        .bandHot=${S(t.chart.bandLimits.hotAbove, d)}
        .bandTransition=${Math.round(t.chart.bandTransition * 100)}
        .temperatureScale=${be(d) ?? "C"}
        .cornerRadius=${t.borderRadius}
        .language=${l}
        .timeZone=${o.timeZone}
        .hour12=${o.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${k}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = $e`
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
     * It still fits the 20 px title line, so the header does not grow.
     */
    .room-icon .icon {
      width: 16px;
      height: 16px;
    }
    .room-icon ha-icon {
      --mdc-icon-size: 16px;
      color: var(--rcc-tertiary);
      display: inline-flex;
    }
    /* The title is a caption, not a headline: same tone as the series labels. */
    .name {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
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
  `%c ROOM-CLIMATE-CARD %c v${_r} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(X) || customElements.define(X, ds);
customElements.get(St) || customElements.define(St, Yi);
const Oi = window.customCards = window.customCards ?? [];
Oi.some((r) => r.type === X) || Oi.push({
  type: X,
  name: br,
  description: wr,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  X as CARD_TAG,
  _r as CARD_VERSION,
  ds as RoomClimateCard,
  Yi as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
