const Q = "room-climate-card", kt = "room-climate-card-editor", Mr = "Room Climate Card", Cr = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", Tr = "2.16.3";
const Wt = globalThis, xe = Wt.ShadowRoot && (Wt.ShadyCSS === void 0 || Wt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Se = /* @__PURE__ */ Symbol(), ri = /* @__PURE__ */ new WeakMap();
let Ui = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (xe && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ri.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ri.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Er = (r) => new Ui(typeof r == "string" ? r : r + "", void 0, Se), Ae = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ui(e, r, Se);
}, Hr = (r, t) => {
  if (xe) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = Wt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, ni = xe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Er(e);
})(r) : r;
const { is: Dr, defineProperty: Rr, getOwnPropertyDescriptor: Or, getOwnPropertyNames: Nr, getOwnPropertySymbols: Lr, getPrototypeOf: Fr } = Object, Xt = globalThis, si = Xt.trustedTypes, zr = si ? si.emptyScript : "", Br = Xt.reactiveElementPolyfillSupport, $t = (r, t) => r, be = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? zr : null;
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
} }, Vi = (r, t) => !Dr(r, t), ai = { attribute: !0, type: String, converter: be, reflect: !1, useDefault: !1, hasChanged: Vi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Xt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ai) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Rr(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: s } = Or(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const o = n?.call(this);
      s?.call(this, a), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ai;
  }
  static _$Ei() {
    if (this.hasOwnProperty($t("elementProperties"))) return;
    const t = Fr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($t("properties"))) {
      const e = this.properties, i = [...Nr(e), ...Lr(e)];
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
      for (const n of i) e.unshift(ni(n));
    } else t !== void 0 && e.push(ni(t));
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
    return Hr(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : be).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : be;
      this._$Em = n;
      const o = a.fromAttribute(e, s.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Vi)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
        const { wrapped: a } = s, o = this[n];
        a !== !0 || this._$AL.has(n) || o === void 0 || this.C(n, void 0, s, o);
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
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[$t("elementProperties")] = /* @__PURE__ */ new Map(), pt[$t("finalized")] = /* @__PURE__ */ new Map(), Br?.({ ReactiveElement: pt }), (Xt.reactiveElementVersions ??= []).push("2.1.2");
const ke = globalThis, oi = (r) => r, jt = ke.trustedTypes, li = jt ? jt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Gi = "$lit$", nt = `lit$${Math.random().toFixed(9).slice(2)}$`, Wi = "?" + nt, Ir = `<${Wi}>`, mt = document, Mt = () => mt.createComment(""), Ct = (r) => r === null || typeof r != "object" && typeof r != "function", Me = Array.isArray, Pr = (r) => Me(r) || typeof r?.[Symbol.iterator] == "function", oe = `[ 	
\f\r]`, _t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hi = /-->/g, ci = />/g, ct = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), di = /'/g, ui = /"/g, Ki = /^(?:script|style|textarea|title)$/i, ji = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), b = ji(1), v = ji(2), yt = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), mi = /* @__PURE__ */ new WeakMap(), dt = mt.createTreeWalker(mt, 129);
function Zi(r, t) {
  if (!Me(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return li !== void 0 ? li.createHTML(t) : t;
}
const Ur = (r, t) => {
  const e = r.length - 1, i = [];
  let n, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = _t;
  for (let o = 0; o < e; o++) {
    const l = r[o];
    let h, c, d = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, c = a.exec(l), c !== null); ) m = a.lastIndex, a === _t ? c[1] === "!--" ? a = hi : c[1] !== void 0 ? a = ci : c[2] !== void 0 ? (Ki.test(c[2]) && (n = RegExp("</" + c[2], "g")), a = ct) : c[3] !== void 0 && (a = ct) : a === ct ? c[0] === ">" ? (a = n ?? _t, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, h = c[1], a = c[3] === void 0 ? ct : c[3] === '"' ? ui : di) : a === ui || a === di ? a = ct : a === hi || a === ci ? a = _t : (a = ct, n = void 0);
    const y = a === ct && r[o + 1].startsWith("/>") ? " " : "";
    s += a === _t ? l + Ir : d >= 0 ? (i.push(h), l.slice(0, d) + Gi + l.slice(d) + nt + y) : l + nt + (d === -2 ? o : y);
  }
  return [Zi(r, s + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Tt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const o = t.length - 1, l = this.parts, [h, c] = Ur(t, e);
    if (this.el = Tt.createElement(h, i), dt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = dt.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Gi)) {
          const m = c[a++], y = n.getAttribute(d).split(nt), p = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: p[2], strings: y, ctor: p[1] === "." ? Gr : p[1] === "?" ? Wr : p[1] === "@" ? Kr : qt }), n.removeAttribute(d);
        } else d.startsWith(nt) && (l.push({ type: 6, index: s }), n.removeAttribute(d));
        if (Ki.test(n.tagName)) {
          const d = n.textContent.split(nt), m = d.length - 1;
          if (m > 0) {
            n.textContent = jt ? jt.emptyScript : "";
            for (let y = 0; y < m; y++) n.append(d[y], Mt()), dt.nextNode(), l.push({ type: 2, index: ++s });
            n.append(d[m], Mt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Wi) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(nt, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += nt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = mt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function gt(r, t, e = r, i) {
  if (t === yt) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = Ct(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = gt(r, n._$AS(r, t.values), n, i)), t;
}
class Vr {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? mt).importNode(e, !0);
    dt.currentNode = n;
    let s = dt.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new Et(s, s.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (h = new jr(s, this, t)), this._$AV.push(h), l = i[++o];
      }
      a !== l?.index && (s = dt.nextNode(), a++);
    }
    return dt.currentNode = mt, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = gt(this, t, e), Ct(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== yt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Pr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Ct(this._$AH) ? this._$AA.nextSibling.data = t : this.T(mt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Tt.createElement(Zi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const s = new Vr(n, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = mi.get(t.strings);
    return e === void 0 && mi.set(t.strings, e = new Tt(t)), e;
  }
  k(t) {
    Me(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const s of t) n === e.length ? e.push(i = new Et(this.O(Mt()), this.O(Mt()), this, this.options)) : i = e[n], i._$AI(s), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = oi(t).nextSibling;
      oi(t).remove(), t = i;
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
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = gt(this, t, e, 0), a = !Ct(t) || t !== this._$AH && t !== yt, a && (this._$AH = t);
    else {
      const o = t;
      let l, h;
      for (t = s[0], l = 0; l < s.length - 1; l++) h = gt(this, o[i + l], e, l), h === yt && (h = this._$AH[l]), a ||= !Ct(h) || h !== this._$AH[l], h === f ? t = f : t !== f && (t += (h ?? "") + s[l + 1]), this._$AH[l] = h;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gr extends qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Wr extends qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Kr extends qt {
  constructor(t, e, i, n, s) {
    super(t, e, i, n, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = gt(this, t, e, 0) ?? f) === yt) return;
    const i = this._$AH, n = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== f && (i === f || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jr {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gt(this, t);
  }
}
const Zr = ke.litHtmlPolyfillSupport;
Zr?.(Tt, Et), (ke.litHtmlVersions ??= []).push("3.3.3");
const Yr = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = n = new Et(t.insertBefore(Mt(), s), s, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
const Ce = globalThis;
let ut = class extends pt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Yr(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return yt;
  }
};
ut._$litElement$ = !0, ut.finalized = !0, Ce.litElementHydrateSupport?.({ LitElement: ut });
const Xr = Ce.litElementPolyfillSupport;
Xr?.({ LitElement: ut });
(Ce.litElementVersions ??= []).push("4.2.2");
const A = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function Pt(r, t) {
  const [e, i] = r, [n, s] = t, a = i - e;
  if (!Number.isFinite(a) || a === 0) {
    const o = (n + s) / 2;
    return () => o;
  }
  return (o) => n + (o - e) / a * (s - n);
}
function pi(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function fi(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = e;
  let s = r, a = t;
  if (a - s < i) {
    const l = (a + s) / 2;
    s = l - i / 2, a = l + i / 2;
  }
  const o = (a - s) * n;
  return [s - o, a + o];
}
function Yi(r) {
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
function qr(r, t, e = {}) {
  const i = Yi(r), n = i > 0 ? i * 2.5 : 0, s = e.minMs ?? Math.max(t / 40, 300 * 1e3), a = e.maxMs ?? Math.max(s, t / 3);
  return Math.min(a, Math.max(n, s));
}
const Jr = 1e3, Qr = 8;
function tn(r, t, e, i) {
  const n = e.t - t.t, s = t.v, a = e.v, o = Math.min(
    Qr,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let l = 1; l < o; l++) {
    const h = l / o;
    r.samples.push({
      t: Math.round(t.t + n * h),
      v: s + (a - s) * h
    }), r.bridged.push(!0);
  }
}
function yi(r, t) {
  const { rangeMs: e, start: i, end: n } = t, s = t.gapMode ?? "connect", a = qr(r, e), o = t.maxGapMs ?? e / 4, l = [];
  let h = null, c = null, d = null, m = !1, y = !1;
  const p = () => {
    h && h.samples.length && l.push(h), h = null, c = null, d = null;
  }, S = (x) => {
    if (!h || !c || x === null || x <= c.t) return;
    const D = { t: x, v: c.v };
    h.samples.push(D), h.bridged.push(!1), c = D;
  };
  for (const x of r) {
    if (x.v === null || !Number.isFinite(x.v)) {
      c || (m = !0), d = d ?? x.t, y = !0;
      continue;
    }
    if (y = !1, !c || !h) {
      h = { samples: [x], bridged: [] }, c = x, d = null;
      continue;
    }
    const D = x.t - c.t;
    if (D <= a && d === null) {
      h.samples.push(x), h.bridged.push(!1), c = x;
      continue;
    }
    if (!(d !== null)) {
      const Ht = Math.min(Jr, D / 2);
      h.samples.push({ t: x.t - Ht, v: c.v }), h.bridged.push(!1), h.samples.push(x), h.bridged.push(!1), c = x;
      continue;
    }
    const O = Math.max(c.t, d), j = x.t - O;
    if (s === "connect" && j <= o) {
      O > c.t && (h.samples.push({ t: O, v: c.v }), h.bridged.push(!1), c = { t: O, v: c.v }), tn(h, c, x, a), h.samples.push(x), h.bridged.push(!0), c = x, d = null;
      continue;
    }
    S(d), p(), h = { samples: [x], bridged: [] }, c = x;
  }
  if (y && S(d), p(), !l.length) return l;
  const C = l[0];
  if (!m && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), y)
    return l;
  const T = l[l.length - 1], U = T.samples[T.samples.length - 1];
  return n !== void 0 && U.t < n && (T.samples.push({ t: n, v: U.v }), T.bridged.push(!1)), l;
}
function gi(r, t, e) {
  if (!r || !r.length) return [];
  const i = [...r].sort((a, o) => a.t - o.t), n = [];
  let s = null;
  for (const a of i) {
    if (!Number.isFinite(a.t) || e !== void 0 && a.t > e) continue;
    const o = a.v === null || !Number.isFinite(a.v) ? null : a.v;
    if (t !== void 0 && a.t < t) {
      s = { t, v: o };
      continue;
    }
    const l = n[n.length - 1];
    if (l && l.t === a.t) {
      n[n.length - 1] = { t: a.t, v: o };
      continue;
    }
    n.push({ t: a.t, v: o });
  }
  return s && t !== void 0 && (!n.length || n[0].t > t) && n.unshift(s), n;
}
function en(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function rn(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function Xi(r) {
  if (!r.length) return "";
  let t = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${A(r[e].x)} ${A(r[e].y)}`;
  return t;
}
const bi = 1, nn = 1;
function sn(r, t, e, i, n) {
  if (!(n > 0) || r === t && e === 0 && i === 0) return 0;
  const s = Math.min(r, t), a = Math.max(r, t);
  let o = 0;
  const l = 16;
  for (let h = 1; h < l; h++) {
    const c = h / l, d = 1 - c, m = r + e * n / 3, y = t - i * n / 3, p = d * d * d * r + 3 * d * d * c * m + 3 * d * c * c * y + c * c * c * t;
    o = Math.max(o, s - p, p - a);
  }
  return o;
}
function qi(r) {
  const t = r.length, e = [], i = [];
  for (let o = 0; o < t - 1; o++)
    e[o] = r[o + 1].x - r[o].x, i[o] = e[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / e[o];
  const n = new Array(t).fill(0);
  n[0] = i[0], n[t - 1] = i[t - 2];
  for (let o = 1; o < t - 1; o++) {
    const l = i[o - 1], h = i[o];
    n[o] = l * h <= 0 ? (l + h) / 2 * nn : (l + h) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < t - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(t).fill(1);
  for (let o = 0; o < 3; o++) {
    const l = new Array(t).fill(1);
    let h = !1;
    for (let c = 0; c < t - 1; c++) {
      if (e[c] === 0) continue;
      const d = sn(
        r[c].y,
        r[c + 1].y,
        n[c] * a[c],
        n[c + 1] * a[c + 1],
        e[c]
      );
      if (d > bi) {
        const m = bi / d;
        l[c] = Math.min(l[c], m), l[c + 1] = Math.min(l[c + 1], m), h = !0;
      }
    }
    if (!h) break;
    for (let c = 0; c < t; c++) a[c] *= l[c];
  }
  for (let o = 0; o < t; o++) n[o] *= a[o];
  return { dx: e, tangents: n };
}
function an(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${A(r[0].x)} ${A(r[0].y)}`;
  if (r.length === 2) return Xi(r);
  const t = r.length, { dx: e, tangents: i } = qi(r);
  let n = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let s = 0; s < t - 1; s++) {
    const a = r[s].x + e[s] / 3, o = r[s].y + i[s] * e[s] / 3, l = r[s + 1].x - e[s] / 3, h = r[s + 1].y - i[s + 1] * e[s] / 3;
    n += ` C ${A(a)} ${A(o)}, ${A(l)} ${A(h)}, ${A(
      r[s + 1].x
    )} ${A(r[s + 1].y)}`;
  }
  return n;
}
function Ji(r, t) {
  return t ? an(r) : Xi(r);
}
function on(r, t) {
  if (r.length < 2) return [];
  const e = [];
  if (!t || r.length === 2) {
    for (let s = 1; s < r.length; s++) {
      const a = r[s - 1], o = r[s];
      e.push({
        from: a,
        to: o,
        command: `L ${A(o.x)} ${A(o.y)}`
      });
    }
    return e;
  }
  const { dx: i, tangents: n } = qi(r);
  for (let s = 0; s < r.length - 1; s++) {
    const a = r[s], o = r[s + 1], l = a.x + i[s] / 3, h = a.y + n[s] * i[s] / 3, c = o.x - i[s] / 3, d = o.y - n[s + 1] * i[s] / 3;
    e.push({
      from: a,
      to: o,
      command: `C ${A(l)} ${A(h)}, ${A(c)} ${A(d)}, ${A(
        o.x
      )} ${A(o.y)}`
    });
  }
  return e;
}
function ln(r, t, e) {
  if (!r.length) return "";
  const i = Ji(r, e), n = r[0], s = r[r.length - 1];
  return `${i} L ${A(s.x)} ${A(t)} L ${A(n.x)} ${A(t)} Z`;
}
function hn(r, t, e = {}) {
  const i = Math.max(1, Math.round(t));
  if (i < 3 || r.length < 3) return r.map((o) => ({ ...o }));
  const n = Math.floor(i / 2), s = e.maxDeltaMs ?? 1 / 0, a = 2;
  return r.map((o, l) => {
    if (o.v === null) return { ...o };
    let h = 0, c = 0;
    for (let d = -n; d <= n; d++) {
      const m = r[l + d];
      !m || m.v === null || d !== 0 && Math.abs(m.t - o.t) > s || (h += m.v, c += 1);
    }
    return c ? { t: o.t, v: un(h / c, a) } : { ...o };
  });
}
const cn = [
  "none",
  "light",
  "medium",
  "strong"
], we = "light", wi = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60
}, dn = 121;
function un(r, t) {
  const e = 10 ** t;
  return Math.round(r * e) / e;
}
function mn(r, t = we) {
  const e = wi[t] ?? wi[we];
  if (!(e > 0) || !Number.isFinite(r) || r <= 0) return 1;
  const i = Math.max(1, Math.round(e * 6e4 / r));
  return Math.min(dn, i * 2 + 1);
}
function pn(r, t) {
  if (!Number.isFinite(t) || t <= 0) return 1 / 0;
  const e = Math.floor(Math.max(1, r) / 2) * t * 2;
  return Math.min(90 * 6e4, Math.max(2 * 6e4, e));
}
function fn(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let n = 0; n < e; n++)
    i.push(r + (t - r) * n / (e - 1));
  return i;
}
function yn(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function gn(r, t) {
  const e = r.length;
  if (e <= t || t < 3) return r.map((a, o) => o);
  const i = Math.max(1, Math.floor((t - 2) / 2)), n = /* @__PURE__ */ new Set([0, e - 1]), s = e / i;
  for (let a = 0; a < i; a++) {
    const o = Math.floor(a * s), l = Math.min(e - 1, Math.floor((a + 1) * s) - 1);
    let h = -1, c = -1, d = 1 / 0, m = -1 / 0;
    for (let y = o; y <= l; y++) {
      const p = r[y].v;
      p === null || !Number.isFinite(p) || (p < d && (d = p, h = y), p > m && (m = p, c = y));
    }
    if (h === -1) {
      n.add(o);
      continue;
    }
    n.add(h), n.add(c);
  }
  return [...n].sort((a, o) => a - o);
}
function Ut(r, t) {
  const e = r.length;
  if (!e || !Number.isFinite(t)) return null;
  let i = 0, n = e - 1, s = e;
  for (; i <= n; ) {
    const c = i + n >> 1;
    r[c].t >= t ? (s = c, n = c - 1) : i = c + 1;
  }
  let a = s - 1, o = s, l = null, h = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      l = r[a];
      break;
    }
    a--;
  }
  for (; o < e; ) {
    if (r[o].v !== null) {
      h = r[o];
      break;
    }
    o++;
  }
  return l ? h ? Math.abs(l.t - t) <= Math.abs(h.t - t) ? l : h : l : h;
}
function _i(r) {
  let t = null, e = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!t || t.v > n) && (t = i), (!e || e.v < n) && (e = i));
  }
  return t && e ? { min: t, max: e } : null;
}
const le = "#7FA6D9", he = "#EFB35F", ce = "#D16A62", Kt = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, Zt = 1, Qi = 100;
function de(r, t) {
  return typeof r == "number" && Number.isFinite(r) ? r : t;
}
function bn(r, t, e, i = Kt) {
  const n = [
    de(r, i.coldBelow),
    de(t, i.warmAbove),
    de(e, i.hotAbove)
  ].sort((l, h) => l - h), s = n[0], a = Math.max(n[1], s + Zt), o = Math.max(n[2], a + Zt);
  return { coldBelow: s, warmAbove: a, hotAbove: o };
}
function vi(r, t, e) {
  return Number.isFinite(r) ? r < t.coldBelow ? e.cold : r < t.warmAbove ? e.normal : r < t.hotAbove ? e.warm : e.hot : e.normal;
}
function wn(r, t, e, i = Qi) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: e.normal }];
  const o = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), l = Math.max(t.warmAbove - t.coldBelow, Zt), h = Math.max(t.hotAbove - t.warmAbove, Zt), c = o * l / 2, d = o * h / 2, m = (S) => S < t.coldBelow ? e.cold : S < t.warmAbove ? e.normal : S < t.hotAbove ? e.warm : e.hot, y = [
    { value: t.coldBelow, color: e.cold },
    { value: t.coldBelow + c, color: e.normal },
    { value: t.warmAbove - c, color: e.normal },
    { value: t.warmAbove + d, color: e.warm },
    { value: t.hotAbove - d, color: e.warm },
    { value: t.hotAbove, color: e.hot }
  ].filter((S) => S.value > n && S.value < s).concat([
    { value: n, color: m(n) },
    { value: s, color: m(s) }
  ]).sort((S, C) => S.value - C.value), p = [];
  for (const S of y) {
    const C = Number(((s - S.value) / a).toFixed(4)), T = p[p.length - 1];
    T && Math.abs(T.offset - C) < 5e-4 && T.color === S.color || p.push({ offset: C, color: S.color });
  }
  return p.reverse(), p.length === 1 && p.push({ offset: 1, color: p[0].color }), p[0].offset = 0, p[p.length - 1].offset = 1, p;
}
const $i = 32;
function xi(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  const e = t[1], i = e.length === 3 ? e.split("").map((n) => n + n).join("") : e;
  return [
    parseInt(i.slice(0, 2), 16),
    parseInt(i.slice(2, 4), 16),
    parseInt(i.slice(4, 6), 16)
  ];
}
function _n(r) {
  return `#${r.map((t) => Math.max(0, Math.min(255, Math.round(t))).toString(16).padStart(2, "0")).join("")}`;
}
function tr(r, t) {
  if (!r.length) return "#ffffff";
  const e = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0));
  let i = r[0], n = r[r.length - 1];
  for (let h = 0; h < r.length; h++)
    if (r[h].offset <= e && (i = r[h]), r[h].offset >= e) {
      n = r[h];
      break;
    }
  const s = xi(i.color), a = xi(n.color);
  if (!s || !a) return i.color;
  const o = n.offset - i.offset, l = o <= 0 ? 0 : (e - i.offset) / o;
  return _n([
    s[0] + (a[0] - s[0]) * l,
    s[1] + (a[1] - s[1]) * l,
    s[2] + (a[2] - s[2]) * l
  ]);
}
function vn(r, t, e, i) {
  const n = on([...r], t), s = [];
  let a = null;
  const o = (h, c, d) => {
    const m = c.x - h.x, y = c.y - h.y, p = Math.hypot(m, y);
    return p > 0 ? ue({ x: h.x + m / p * d, y: h.y + y / p * d }) : ue(h);
  }, l = (h) => {
    const c = h.pieces[0], d = h.pieces[h.pieces.length - 1], m = o(c.from, c.to, -0.8), y = o(d.to, d.from, -0.8), p = h.pieces.map((S) => S.command).join(" ");
    s.push({
      d: `M ${m} L ${ue(c.from)} ${p} L ${y}`,
      color: tr(e, h.level / $i)
    });
  };
  for (const h of n) {
    const c = (h.from.y + h.to.y) / 2, d = Math.round(Math.min(1, Math.max(0, i(c))) * $i);
    if (a && a.level === d) {
      a.pieces.push(h);
      continue;
    }
    a && l(a), a = { pieces: [h], level: d };
  }
  return a && l(a), s;
}
function ue(r) {
  const t = (e) => Number.isFinite(e) ? (Math.round(e * 100) / 100).toString() : "0";
  return `${t(r.x)} ${t(r.y)}`;
}
const $n = 10, Si = { min: 0, max: 32 }, xn = ["on", "open", "opening", "tilted", "gekippt"], Sn = ["off", "closed", "closing"], ft = {
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
}, Ai = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, ki = { min: 14, max: 96 }, An = /^[a-z0-9_]+\.[a-z0-9_]+$/, kn = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Mn(r) {
  return typeof r == "object" && r !== null;
}
function q(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return An.test(t) ? t : void 0;
}
function bt(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function H(r, t, e, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(e, Math.max(t, n)) : i;
}
function M(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function vt(r, t) {
  const e = bt(r);
  return e && e.length <= 64 ? e : t;
}
function Mi(r) {
  const t = bt(r);
  if (!(!t || t.length > 120) && kn.test(t))
    return t;
}
function Ci(r, t) {
  return Math.round(
    H(r, ki.min, ki.max, t)
  );
}
function Cn(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
const Tn = [
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
], Ti = /* @__PURE__ */ new Set();
function En(r) {
  for (const t of Object.keys(r))
    Tn.includes(t) || Ti.has(t) || (Ti.add(t), console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${t}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`
    ));
}
function Hn(r) {
  const t = Mn(r) ? r : {};
  En(t);
  const e = q(t.temperature_entity), i = q(t.humidity_entity), n = q(t.window_entity), s = q(t.motion_entity), a = q(t.climate_entity), o = q(t.name_entity), l = Cn(t.window_open_states), h = M(t.show_window) ?? !!n, c = M(t.show_motion) ?? !!s, d = M(t.show_thermostat) ?? !!a, m = M(t.show_temperature_chart) ?? !!e, y = M(t.show_humidity_chart) ?? !!i, p = t.height, S = p === "auto" || p === void 0 || p === null || p === 0 ? null : H(p, 120, 2e3, 0) || null, C = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", T = t.chart_curve === "linear" ? "linear" : "smooth", U = cn.includes(t.chart_smoothing) ? t.chart_smoothing : we, x = t.chart_gap_mode === "break" ? "break" : "connect", D = t.chart_gap_style === "dashed" ? "dashed" : "solid", R = t.chart_humidity_line_style === "dotted" ? "dotted" : "solid", O = vt(
    t.accent_color ?? t.temperature_comfort_color,
    ft.accent
  );
  return {
    raw: t,
    name: bt(t.name),
    nameEntity: o,
    icon: bt(t.icon) ?? "mdi:home-thermometer-outline",
    height: S,
    borderRadius: H(t.border_radius, 0, 40, 26),
    padding: Math.round(
      H(
        t.card_padding,
        Si.min,
        Si.max,
        $n
      )
    ),
    theme: C,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(H(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(H(t.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: Ci(
          t.temperature_font_size,
          Ai.temperature
        ),
        fontFamily: Mi(t.temperature_font_family)
      },
      humidity: {
        fontSize: Ci(t.humidity_font_size, Ai.humidity),
        fontFamily: Mi(t.humidity_font_family)
      }
    },
    showSeriesLabels: M(t.show_series_labels) ?? !0,
    accentColor: O,
    humidity: {
      color: vt(t.humidity_color, ft.humidity)
    },
    window: {
      enabled: h && !!n,
      entity: n,
      openStates: l.length ? l : [...xn]
    },
    motion: {
      enabled: c && !!s,
      entity: s,
      showLastChanged: M(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: d && !!a,
      entity: a,
      showRow: M(t.show_climate_row) ?? !0,
      showSetpoint: M(t.show_setpoint) ?? !0,
      showStatus: M(t.show_hvac_status) ?? !0,
      showMode: M(t.show_hvac_mode) ?? !1,
      heatingColor: vt(t.heating_color, ft.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: vt(t.heating_idle_color, O),
      offColor: vt(t.heating_off_color, ft.off)
    },
    chart: {
      showTemperature: m && !!e,
      showHumidity: y && !!i,
      hours: Math.round(H(t.chart_hours, 1, 168, 6)),
      height: Math.round(H(t.chart_height, 30, 400, 112)),
      curve: T,
      smoothing: U,
      gapMode: x,
      maxGapMinutes: Math.round(H(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: D,
      humidityLineStyle: R,
      showPoints: M(t.chart_show_points) ?? !1,
      showTooltip: M(t.chart_show_tooltip) ?? !0,
      showExtremes: M(t.chart_show_extremes) ?? !0,
      showAxis: M(t.chart_show_axis) ?? !0,
      fullBleed: M(t.chart_full_bleed) ?? !0,
      showChartSetpoint: M(t.chart_show_setpoint) ?? !0,
      showTemperatureGradient: M(t.chart_temperature_gradient) ?? !0,
      showHumidityGradient: M(t.chart_humidity_gradient) ?? !0,
      temperatureAreaOpacity: Math.round(H(t.chart_temperature_area_opacity, 10, 300, 100)) / 100,
      humidityAreaOpacity: Math.round(H(t.chart_humidity_area_opacity, 10, 300, 100)) / 100,
      opacity: Math.round(H(t.chart_opacity, 15, 100, 100)) / 100,
      temperatureBands: (M(t.chart_temperature_bands) ?? !1) && m,
      // Thresholds are sorted in `orderBandLimits`: a user may type 24 / 18 / 27.
      bandLimits: bn(
        H(t.chart_band_cold_below, -30, 60, Kt.coldBelow),
        H(t.chart_band_warm_above, -30, 60, Kt.warmAbove),
        H(t.chart_band_hot_above, -30, 60, Kt.hotAbove)
      ),
      bandTransition: Math.round(
        H(t.chart_band_transition, 0, 100, Qi)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: M(t.chart_show_grid) ?? !1
    },
    tapAction: t.tap_action === "none" ? "none" : "more-info"
  };
}
function Dn(r) {
  return r.chart.fullBleed ? -r.padding : 0;
}
function Rn(r) {
  const t = !r.chart.showAxis;
  return r.chart.fullBleed && t ? -r.padding : 0;
}
function On(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function er(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function ir(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function me(r) {
  if (r.height) return r.height;
  const t = r.typography.temperature.fontSize, e = er(r) ? r.chart.height : 0, i = ir(r) ? 20 : 0, n = 28, s = r.showSeriesLabels ? 20 : 0;
  return r.padding * 2 + n + 12 + s + t + 8 + i + 12 + e;
}
function Ei(r, t) {
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
const Nn = {
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
}, Ln = {
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
}, Fn = Nn;
function _e(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function zn(r) {
  const t = _e(r) === "de" ? Fn : Ln;
  return {
    language: _e(r),
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
function xt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const Hi = /* @__PURE__ */ new Map();
function Bn(r, t) {
  const e = `${r}|${t}`;
  let i = Hi.get(e);
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
    Hi.set(e, i);
  }
  return i;
}
function st(r, t, e) {
  return Number.isFinite(r) ? Bn(t || "en", xt(Math.round(e), 0, 3)).format(r) : "–";
}
function Jt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function In(r, t, e) {
  const i = Math.max(0, t - r), n = Math.floor(i / 6e4);
  if (n < 1) return e.justNow;
  if (n < 60) return `${n} ${e.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${e.hours}` : `${Math.floor(s / 24)} ${e.days}`;
}
function Di(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function ve(r) {
  const t = r?.trim().toLowerCase();
  return t ? t.includes("°f") || t === "f" || t.startsWith("fahrenheit") ? "F" : t.includes("°c") || t === "c" || t.startsWith("celsius") ? "C" : null : null;
}
function Ri(r, t, e) {
  if (!Number.isFinite(r)) return null;
  const i = ve(t), n = ve(e);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function $e(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function Pn(r) {
  return `#${r.map((t) => xt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Vt(r, t) {
  const e = $e(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${xt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${xt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(xt(t, 0, 1) * 100)}%, transparent)`;
}
function Qt(r) {
  return r === "unavailable" || r === "unknown";
}
function Oi(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const n = r?.states[t];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (Qt(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = Jt(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function Un(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (Qt(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return t.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : Sn.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Vn = ["on", "detected", "motion", "occupied", "active"];
function Gn(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (Qt(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (Vn.includes(a))
    return { status: "active", entity: i, rawState: n };
  const o = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (o.sinceMs = s), o;
}
const Wn = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Ni(r, t, e) {
  const i = t.thermostat.entity, n = Di(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), s = r?.states[i ?? ""]?.attributes?.unit_of_measurement, a = Di(typeof s == "string" ? s : n);
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const l = o.state?.toLowerCase(), h = o.attributes?.hvac_action, c = typeof h == "string" ? h.toLowerCase() : void 0, d = o.attributes?.temperature, m = typeof d == "number" ? d : typeof d == "string" ? Jt(d) : null, y = {
    entity: o,
    action: c,
    setpoint: m,
    unit: a,
    mode: l,
    modeLabel: l ? e.mode(l) : void 0
  };
  return Qt(o.state ?? "") ? { ...y, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...y, status: "off", label: e.t("off"), colorKey: "off" } : c === "heating" ? { ...y, status: "heating", label: e.t("heating"), colorKey: "heating" } : c === "idle" ? { ...y, status: "idle", label: e.t("idle"), colorKey: "idle" } : c === "off" ? { ...y, status: "off", label: e.t("off"), colorKey: "off" } : c && !Wn.includes(c) ? { ...y, status: "action", label: e.action(c), colorKey: "idle" } : c ? { ...y, status: "action", label: e.action(c), colorKey: "idle" } : { ...y, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Kn(r, t) {
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
function St(r) {
  return typeof r == "object" && r !== null;
}
function jn(r) {
  if (!St(r)) return;
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
function Zn(r) {
  if (St(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Li(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const n = jn(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = Zn(i), a = Jt(s);
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
function Fi(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = St(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in e)) continue;
      const a = Li(i);
      e[s] = Yn(e[s], a);
    }
    return e;
  }
  if (St(r))
    for (const i of t) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : St(n) && Array.isArray(n.data) ? n.data : n;
      e[i] = Li(s);
    }
  return e;
}
function Yn(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((n, s) => n.t - s.t), i = [];
  for (const n of e) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Xn(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), n = new Date(e.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const l = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = Fi(l, t);
      return Object.values(h).some((c) => c.length > 0), h;
    } catch (l) {
      if (!r.callApi) throw l;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((l) => encodeURIComponent(l)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, o = await r.callApi("GET", a);
  return Fi(o, t);
}
function qn(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class Jn {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, n = Date.now()) {
    const s = qn(e, i), a = this.cache.get(s);
    if (a && n - a.fetchedAt < 12e4)
      return a.data;
    const o = this.inflight.get(s);
    if (o) return o;
    const l = Xn(t, e, {
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
const B = (r) => v`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, Z = {
  thermometer: () => B(v`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => B(v`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => B(
    v`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => B(
    v`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => B(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => B(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => B(
    v`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => B(
    v`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => B(v`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => B(
    v`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => B(v`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => B(v`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => B(v`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => B(
    v`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const Qn = (r) => r.strings === void 0;
const ts = { CHILD: 2 }, es = (r) => (...t) => ({ _$litDirective$: r, values: t });
class is {
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
const At = (r, t) => {
  const e = r._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), At(i, t);
  return !0;
}, Yt = (r) => {
  let t, e;
  do {
    if ((t = r._$AM) === void 0) break;
    e = t._$AN, e.delete(r), r = t;
  } while (e?.size === 0);
}, rr = (r) => {
  for (let t; t = r._$AM; r = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(r)) break;
    e.add(r), ss(t);
  }
};
function rs(r) {
  this._$AN !== void 0 ? (Yt(this), this._$AM = r, rr(this)) : this._$AM = r;
}
function ns(r, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let s = e; s < i.length; s++) At(i[s], !1), Yt(i[s]);
  else i != null && (At(i, !1), Yt(i));
  else At(this, r);
}
const ss = (r) => {
  r.type == ts.CHILD && (r._$AP ??= ns, r._$AQ ??= rs);
};
class as extends is {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), rr(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (At(this, t), Yt(this));
  }
  setValue(t) {
    if (Qn(this._$Ct)) this._$Ct._$AI(t, this);
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
const Y = () => new os();
class os {
}
const pe = /* @__PURE__ */ new WeakMap(), X = es(class extends as {
  render(r) {
    return f;
  }
  update(r, [t]) {
    const e = t !== this.G;
    return e && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = r.options?.host, this.rt(this.ct = r.element)), f;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = pe.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), pe.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? pe.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function ls(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const n = gn(e, t), s = n.map((o) => e[o]), a = [];
  for (let o = 1; o < n.length; o++)
    a.push(i.slice(n[o - 1] + 1, n[o] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const hs = 320, cs = 112, ds = 4e3, us = 150, ms = 14, ps = 2.8, Gt = 6, zi = /* @__PURE__ */ new Set();
function fs(r, t) {
  const e = `${r}|${t}`;
  zi.has(e) || (zi.add(e), console.info(
    `[room-climate-card] Minimum/Maximum der ${t} ausgeblendet: ${r}. Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.`
  ));
}
const ys = 0.3, gs = 0.44, bs = { minSpan: 0.4, padding: 0.15 }, ws = { minSpan: 3, padding: 0.15 };
let _s = 0;
class vs extends ut {
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
    }, this.uid = `rcc-chart-${++_s}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = Y(), this.crosshairRef = Y(), this.temperatureDotRef = Y(), this.humidityDotRef = Y(), this.tooltipRef = Y(), this.tooltipTimeRef = Y(), this.tooltipTemperatureRef = Y(), this.tooltipHumidityRef = Y(), this.tooltipTemperatureRowRef = Y(), this.tooltipHumidityRowRef = Y(), this.onPointerDown = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerMove = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerUp = (t) => {
      (t.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), ds));
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
    this.styles = Ae`
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
      width: this.width > 20 ? this.width : hs,
      height: this.height > 20 ? this.height : cs
    };
  }
  stateView(t, e, i) {
    return b`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? b`<span class="state-hint">${i}</span>` : f}
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
    if (t < 40 || e < 34) return f;
    const i = v`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = v`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(t, e);
    return this.hoverGeometry = a, b`<div class="wrap">${s}${this.renderOverlay(a)}</div>`;
  }
  renderChart(t, e) {
    const i = e, n = this.showAxis && i >= 62, s = n ? 20 : 0.5, a = 6, o = i - s, l = Math.max(6, o - a), h = 0, c = t - 1 - ps, d = t, m = 3, y = Math.max(1, this.end - this.start), p = Pt([this.start, this.end], [h, c]), S = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, C = Pt(
      [this.start, this.end],
      [h + S, d - S]
    ), T = i - 6, U = this.temperature !== void 0, x = this.humidity !== void 0, D = U !== x, R = a, O = D ? o : a + l * ys, j = D ? a : a + l * gs, tt = o, Ht = this.temperatureVisible ? this.temperature ?? [] : [], Te = this.humidityVisible ? this.humidity ?? [] : [], Ee = Ht.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), sr = Te.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), et = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, ar = et !== null ? [...Ee, et] : Ee, te = pi(ar), ee = pi(sr), at = te ? fi(te[0], te[1], bs) : null, wt = ee ? fi(ee[0], ee[1], ws) : null, N = at ? Pt(at, [tt, j]) : null, ot = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), it = this.temperatureBands && at ? wn(
      at,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: le, normal: this.accentColor, warm: he, hot: ce },
      this.bandTransition
    ) : null, He = (u) => tt === j ? 0 : (u - j) / (tt - j), De = ot < 1 ? `;stroke-opacity:${ot}` : "", Re = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * ot), Oe = Re(this.temperatureAreaOpacity), Ne = Re(this.humidityAreaOpacity), Le = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * Oe).toFixed(3)
      )
    ), or = it ? it.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: Le(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: Le(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * Oe).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], lr = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * Ne).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * Ne).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], V = wt ? Pt(wt, [O, R]) : null, lt = gi(Ht, this.start, this.end), Dt = gi(Te, this.start, this.end), Fe = {
      rangeMs: y,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Rt = this.curve === "smooth", ze = (u) => {
      if (!Rt || u.length < 5) return u;
      const g = Yi(u), $ = Math.min(
        mn(g, this.smoothing),
        u.length % 2 ? u.length : u.length - 1
      );
      return $ < 3 ? u : hn(u, $, {
        maxDeltaMs: pn($, g)
      });
    }, hr = ze(lt), cr = ze(Dt), Be = at ? yi(hr, Fe) : [], Ie = wt ? yi(cr, Fe) : [], dr = Math.max(1, Be.length + Ie.length), ur = Math.max(60, Math.floor(1200 / dr)), Pe = (u) => u.map((g) => ls(g, ur)), Ot = Pe(Be), Nt = Pe(Ie), Ue = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const g = a + l * u / 3;
        Ue.push(v`<line class="grid-line" x1=${h} x2=${d} y1=${g} y2=${g} />`);
      }
    const Ve = n ? Math.min(3, yn(t)) : 0, Ge = Ve >= 2 ? fn(this.start, this.end, Math.max(2, Ve)) : [], mr = Ge.map((u, g) => {
      const $ = g === Ge.length - 1, _ = g === 0 ? "start" : $ ? "end" : "middle";
      return v`<text class="axis-label" x=${C(u)} y=${T} text-anchor=${_}>
        ${this.formatAxisLabel(u, $)}
      </text>`;
    }), pr = (u) => {
      if (u.length < 2) return u;
      const g = u[u.length - 1];
      return g.x < c - 0.75 ? u : [...u, { x: d, y: g.y }];
    }, We = (u, g) => pr(rn(u, p, g)), fr = (u, g, $) => (this.gapStyle === "dashed" ? en(u) : [u.samples]).filter((k) => k.length > 1).flatMap((k) => {
      const G = We(k, g);
      return !$ || !it ? [{ d: Ji(G, Rt).concat() }] : vn(G, Rt, it, He);
    }).filter((k) => k.d.length > 0), Ke = (u, g, $, _ = {}) => {
      const k = fr(u, g, _.banded === !0), G = ot < 1 ? `opacity:${ot}` : "", W = k.map(({ d: L, color: F }, z) => {
        const se = _.banded && k.length > 1 ? `stroke-linecap:${z === 0 || z === k.length - 1 ? "round" : "butt"};` : "", zt = [
          `stroke:${F ?? _.color ?? $}`,
          se,
          _.width ? `stroke-width:${_.width}` : "",
          _.dashed ? "stroke-dasharray:0.1 5.5" : "",
          _.banded ? "" : De.replace(/^;/, "")
        ].filter(Boolean).join(";");
        return v`<path class="series-line" d=${L} style=${zt}></path>`;
      });
      return !_.banded || k.length < 2 ? W : [v`<g class="series-runs" style=${G}>${W}</g>`];
    }, yr = Ot.flatMap(
      (u) => Ke(u, N, this.accentColor, {
        color: this.accentColor,
        banded: it !== null
      })
    ), je = (u, g, $) => u.filter((_) => _.samples.length > 1).map((_) => ln(We(_.samples, g), $, Rt)).join(" "), Ze = N && this.showTemperatureArea ? je(Ot, N, o) : "", gr = Ze ? [v`<path class="series-area" d=${Ze} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Ye = V && this.showHumidityArea ? je(Nt, V, O) : "", br = Ye ? [
      v`<path class="series-area" d=${Ye} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], Xe = this.humidityLineStyle === "dotted", wr = Nt.flatMap(
      (u) => Ke(u, V, this.humidityColor, {
        color: this.humidityColor,
        dashed: Xe,
        width: Xe ? 2.2 : 1.9
      })
    ), qe = [];
    if (this.showPoints) {
      const u = (g, $, _) => {
        const k = g.filter((L) => L.v !== null);
        if (!k.length) return;
        const W = Math.max(1, Math.ceil(k.length / 24));
        k.forEach((L, F) => {
          if (F % W !== 0 && F !== k.length - 1) return;
          const z = L.v;
          qe.push(
            v`<circle class="point" r="1.7" cx=${p(L.t)} cy=${$(z)} style="stroke:${_}${De}" />`
          );
        });
      };
      N && Ot.forEach((g) => u(g.samples, N, this.accentColor)), V && Nt.forEach(
        (g) => u(g.samples, V, this.humidityColor)
      );
    }
    const I = et !== null && N ? N(et) : null, Lt = this.showSetpoint && I !== null && Number.isFinite(I) && I >= j - 0.5 && I <= tt + 0.5, _r = lt.find((u) => u.v !== null)?.v ?? null, vr = [...lt].reverse().find((u) => u.v !== null)?.v ?? null, Je = (u) => u === null || et === null ? 0 : Math.abs(u - et), ie = Je(vr) >= Je(_r), Qe = (u) => {
      for (let g = u.length - 1; g >= 0; g -= 1) {
        const $ = u[g].samples;
        for (let _ = $.length - 1; _ >= 0; _ -= 1)
          if ($[_].v !== null) return $[_];
      }
    }, Ft = Qe(Ot), re = Qe(Nt), $r = Lt && et !== null ? `${this.labels.setpoint} ${st(et, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", ti = (u, g, $, _) => {
      const k = _i(g);
      if (!k || k.min.v === k.max.v) return "";
      const G = st(k.min.v, this.language, _), W = st(k.max.v, this.language, _);
      return `${u} ${G}–${W}${$ ? ` ${$}` : ""}`;
    }, xr = this.temperatureUnit || this.setpointUnit, Sr = (() => {
      if (!it || !N) return "";
      const u = lt.map((z) => z.v).filter((z) => z !== null && Number.isFinite(z));
      if (!u.length) return "";
      const g = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, $ = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, _ = { cold: le, normal: this.accentColor, warm: he, hot: ce }, k = vi(Math.min(...u), g, _), G = vi(Math.max(...u), g, _), W = (z) => z === le ? $.cold : z === he ? $.warm : z === ce ? $.hot : $.normal, L = W(k), F = W(G);
      return L === F ? `(${L})` : `(${L} – ${F})`;
    })(), Ar = [
      this.labels.aria,
      $r,
      N ? ti(this.labels.temperature, lt, xr, this.temperatureDecimals) : "",
      V ? ti(this.labels.humidity, Dt, this.humidityUnit, this.humidityDecimals) : "",
      Sr
    ].filter(Boolean).join(". "), ne = [], ei = (u, g, $, _, k, G, W) => {
      if (!this.showExtremes) return;
      const L = (w) => fs(w, W);
      if (t < us) return L("schmale Karte");
      if (_ - $ < ms) return L("flaches Band");
      const F = _i(u);
      if (!F) return L("keine Messwerte");
      if (u.filter((w) => w.v !== null).length < 3) return L("zu wenige Messwerte");
      const se = (F.min.v === F.max.v ? [{ sample: F.max, isMax: !0 }] : [
        { sample: F.max, isMax: !0 },
        { sample: F.min, isMax: !1 }
      ]).map(({ sample: w, isMax: K }) => {
        const Bt = p(w.t), E = g(w.v), P = E - 11 >= $, It = E + 17 <= _, ht = P ? E - 9 : $ + 8, rt = It ? E + 15 : _ - 1;
        let ae = K ? P ? ht : rt : It ? rt : ht;
        if (Lt && I !== null && Math.abs(ae - I) < 9) {
          const ii = K ? rt : ht;
          Math.abs(ii - I) >= 9 && (ae = ii);
        }
        return { sample: w, cx: Bt, cy: E, labelY: ae, isMax: K };
      }).filter((w) => Number.isFinite(w.cx) && Number.isFinite(w.cy)).filter((w) => w.cy >= $ - 1 && w.cy <= _ + 1), zt = (w, K) => Math.abs(w.labelY - K.labelY) < 9 && Math.abs(w.cx - K.cx) < 34;
      let J = [...se];
      if (J.length === 2 && zt(J[0], J[1])) {
        for (const w of J)
          w.labelY = w.isMax ? $ + 8 : _ - 1;
        zt(J[0], J[1]) && (J = J.filter((w) => w.isMax));
      }
      for (const w of J) {
        if (!w) continue;
        const K = 26, Bt = w.cx < (h + c) / 2;
        let E = Bt ? w.cx + 6 : w.cx - 6, P = Bt ? "start" : "end";
        P === "start" && E + K > d - Gt ? (E = w.cx - 6, P = "end") : P === "end" && E - K < h + Gt && (E = w.cx + 6, P = "start");
        const It = ie ? d - m : h + m, ht = (rt) => Lt && I !== null && Math.abs(w.labelY - (I - 5)) < 9 && Math.abs(rt - It) < 40;
        if (ht(E)) {
          const rt = P === "start" ? w.cx - 6 : w.cx + 6;
          ht(rt) || (E = rt, P = P === "start" ? "end" : "start");
        }
        E = P === "start" ? Math.min(E, d - Gt - K) : Math.max(E, h + Gt + K), ne.push(
          v`<circle
            class="extreme-dot"
            r="1.8"
            cx=${w.cx}
            cy=${w.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${k};stroke-width:1.2`}
          />`
        ), ht(E) || ne.push(
          v`<text class="extreme-label" x=${E} y=${w.labelY} text-anchor=${P}>${st(
            w.sample.v,
            this.language,
            G
          )}</text>`
        );
      }
    };
    N && ei(
      lt,
      N,
      j,
      tt,
      this.accentColor,
      this.temperatureDecimals,
      "Temperatur"
    ), V && ei(
      Dt,
      V,
      R,
      O,
      this.humidityColor,
      this.humidityDecimals,
      "Luftfeuchte"
    );
    const kr = {
      width: t,
      height: i,
      left: h,
      right: c,
      plotTop: a,
      plotBottom: o,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: N && at ? { samples: lt, domain: at, top: j, bottom: tt } : null,
      humidity: V && wt ? { samples: Dt, domain: wt, top: R, bottom: O } : null
    };
    return { chart: v`<svg
      width=${t}
      height=${i}
      viewBox="0 0 ${t} ${i}"
      role="img"
      aria-label=${Ar}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${j} x2="0" y2=${tt} gradientUnits="userSpaceOnUse">
          ${or.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${R} x2="0" y2=${O} gradientUnits="userSpaceOnUse">
          ${lr.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Ue}
      ${br}
      ${gr}
      ${Lt ? v`<line
            class="setpoint-line"
            x1=${h}
            x2=${c}
            y1=${I}
            y2=${I}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${ie ? d - m : h + m}
            y=${I - 5}
            text-anchor=${ie ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : f}
      ${/*
    * With the time row the baseline separates plot and labels. Without it
    * the plot ends on the card's own edge – a second line there read as a
    * thicker border than the sides.
    */
    n ? v`<line class="baseline" x1=${h} x2=${d} y1=${o} y2=${o} />` : f}
      ${wr} ${yr} ${qe}
      ${re && V ? v`<circle
            class="end-dot"
            r="2.6"
            cx=${p(re.t)}
            cy=${V(re.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${ot}`}
          />` : f}
      ${Ft && N ? v`<circle
            class="end-dot"
            r="2.8"
            cx=${p(Ft.t)}
            cy=${N(Ft.v)}
            style=${`fill:${it ? tr(it, He(N(Ft.v))) : this.accentColor};fill-opacity:${ot}`}
          />` : f}
      ${ne}
      ${mr}
    </svg>`, geometry: kr };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(t) {
    if (!this.showTooltip || !t.temperature && !t.humidity) return f;
    const e = Math.round(t.plotTop), i = Math.max(1, Math.round(t.plotBottom - t.plotTop));
    return b`<div
        class="overlay"
        style=${`top:${e}px;height:${i}px`}
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
          style=${`top:${e}px;height:${i}px`}
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
  updateHoverAt(t) {
    const e = this.hoverGeometry;
    if (!e) return;
    const n = t.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : e.width;
    if (!s) return;
    const a = n ? n.left : 0, o = Math.min(1, Math.max(0, (t.clientX - a) / s)), l = e.start + o * (e.end - e.start);
    this.showHoverAt(l);
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
    const n = st(t, this.language, i);
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
    const n = e.temperature ? Ut(e.temperature.samples, t) : null, s = e.humidity ? Ut(e.humidity.samples, t) : null;
    let a = n ?? s;
    if (n && s && (a = Math.abs(n.t - t) <= Math.abs(s.t - t) ? n : s), !a) {
      this.hideHover();
      return;
    }
    const o = a.t, l = this.crosshairRef.value, h = this.xForTime(o, e);
    l && (l.style.left = `${h}px`);
    const c = e.temperature ? Ut(e.temperature.samples, o) : null, d = e.humidity ? Ut(e.humidity.samples, o) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      e.temperature,
      c,
      h
    ), this.placeDot(this.humidityDotRef.value, e.humidity, d, h);
    const m = this.tooltipRef.value, y = this.tooltipTimeRef.value, p = this.tooltipTemperatureRowRef.value, S = this.tooltipHumidityRowRef.value, C = this.tooltipTemperatureRef.value, T = this.tooltipHumidityRef.value, U = this.temperatureUnit || this.setpointUnit;
    if (y && (y.textContent = this.formatDayTime(o)), p && (p.hidden = !c), S && (S.hidden = !d), C && c && (C.textContent = this.tooltipValue(
      c.v,
      U,
      this.temperatureDecimals
    )), T && d && (T.textContent = this.tooltipValue(
      d.v,
      this.humidityUnit,
      this.humidityDecimals
    )), m) {
      m.dataset.time = String(o);
      const x = m.offsetWidth || 84, D = m.offsetHeight || 38;
      let R = h + 10;
      R + x > e.width - 4 && (R = h - 10 - x), R = Math.max(4, Math.min(R, Math.max(4, e.width - x - 4)));
      const O = Math.max(2, Math.min(e.plotTop + 2, e.height - D - 2));
      m.style.left = `${R}px`, m.style.top = `${O}px`;
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
    let a, o;
    try {
      a = new Intl.DateTimeFormat(i, { weekday: "short", ...n }).format(e).replace(/[.,]/g, "").trim(), o = new Intl.DateTimeFormat(i, { ...s, ...n }).format(e);
    } catch {
      a = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][e.getDay()], o = `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
    }
    return a ? `${a} ${o}` : o;
  }
}
const Bi = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Bi) && customElements.define(Bi, vs);
const fe = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, $s = {
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
    nameEntity: "Take name from entity",
    nameEntityHelper: "Optional: this entity’s friendly name is used as the room name.",
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
function xs(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const t = r.trim().replace(",", ".");
    if (!t || t === "-" || t === ".") return null;
    const e = Number(t);
    return Number.isFinite(e) ? e : null;
  }
  return null;
}
class nr extends ut {
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
  setConfig(t) {
    this._drafts = {}, this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${Q}` } : { type: `custom:${Q}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = _e(this.hass?.locale?.language ?? this.hass?.language);
    return $s[t];
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
    e.type = this._config.type ?? `custom:${Q}`, this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(t) {
    return M(this._config[t]);
  }
  showFlag(t, e) {
    return this.rawBoolean(t) ?? !!q(this._config[e]);
  }
  /**
   * Height to use when "automatic height" is switched off again: the value the
   * user last entered, or the stored manual height, or a sensible default.
   */
  manualHeight() {
    const t = this._config.height, e = typeof t == "number" ? t : Number(t);
    return Number.isFinite(e) && e > 0 && (this.lastManualHeight = e), this.lastManualHeight;
  }
  /** True while the configured inset is too small for readable text edges. */
  paddingIsTight() {
    return this.numberValue("card_padding", 10) < 8;
  }
  numberValue(t, e) {
    const i = this._config[t], n = typeof i == "number" ? i : Number(i);
    return Number.isFinite(n) ? n : e;
  }
  stringValue(t, e = "") {
    return bt(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = bt(this._config[t]) ?? e;
    return $e(i) ?? $e(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: Pn(e) });
      }
    });
  }
  renderField(t) {
    return b`<div
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
      ${t.helper ? b`<span class="helper">${t.helper}</span>` : f}
      ${t.warning ? b`<span class="helper warning">${t.warning}</span>` : f}
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
      warning: t.warning,
      revertOnLeave: !0,
      onChange: (e) => {
        const i = xs(e);
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
    return b`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(t, s)}>
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
      return b`<div class="loading">${this.text.loading}</div>`;
    const t = this.text;
    return b`<div class="editor">
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
    return b`<div class="hint">${t.generalHelper}</div>
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
      // Live warning: below 8 px the text touches the card's edge.
      warning: this.paddingIsTight() ? t.paddingWarning : void 0,
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
    return b`${this.renderField({
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
    return b`<div class="hint">${t.readingSizeHelper}</div>
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
    return b`<div class="hint">${t.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: t.accentColor,
      fallback: ft.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: t.secondaryColor,
      fallback: ft.humidity
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = q(this._config.window_entity);
    return b`${this.renderSwitch({
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
    return b`${this.renderSwitch({
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
      warning: e && !q(this._config.motion_entity) ? t.missingEntity : void 0
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
    return b`${this.renderSwitch({
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
      warning: e && !q(this._config.climate_entity) ? t.missingEntity : void 0
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
      fallback: fe.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: fe.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: fe.off,
      disabled: !e
    })}`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = e || i, s = e && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48].map((o) => ({ value: String(o), label: `${o} h` }));
    return b`${this.renderSwitch({
      key: "show_temperature_chart",
      label: t.showTemperatureChart,
      value: e,
      onChange: (o) => this.patch({ show_temperature_chart: o })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: t.showHumidityChart,
      value: i,
      onChange: (o) => this.patch({ show_humidity_chart: o })
    })}
      ${this.renderSwitch({
      key: "chart_full_bleed",
      label: t.fullBleed,
      value: this.rawBoolean("chart_full_bleed") ?? !0,
      helper: t.fullBleedHelper,
      disabled: !n,
      onChange: (o) => this.patch({ chart_full_bleed: o })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: t.hours,
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
      onChange: (o) => this.patch({ chart_smoothing: String(o) })
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
      onChange: (o) => this.patch({ chart_temperature_bands: o ? !0 : void 0 })
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
      onChange: (o) => this.patch({ chart_humidity_line_style: String(o) })
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
      onChange: (o) => this.patch({ chart_gap_mode: String(o) })
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
    this.styles = Ae`
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
typeof customElements < "u" && !customElements.get(kt) && customElements.define(kt, nr);
const ye = "#fbbf24", ge = "#34d399", Ii = "var(--rcc-neutral)", Ss = 15 * 1e3, As = 300 * 1e3;
class ks extends ut {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new Jn(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
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
    const e = Hn(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(kt);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), n = (d) => i.find(d)?.entity_id, s = n(
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
    return this._config ? Math.min(12, Math.max(2, Math.round(me(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? me(this._config) : 230;
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
    return zn(t);
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
    const a = Date.now(), o = a - i.chart.hours * 60 * 60 * 1e3;
    try {
      const l = await this.repository.load(n, s, i.chart.hours, a);
      if (this.historyKey !== t) return;
      this._history = l, this._historyWindow = { start: o, end: a }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, e && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== t) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Ss), As), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const a = t[t.length - 1], o = Math.min(s, i);
    if (o <= a.t) return t;
    const l = Jt(n.state);
    return a.v === l ? t : [...t, { t: o, v: l }];
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? me(this._config) : 0;
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
      const i = this._config ? On(this._config) : [];
      return i.length ? i.some((n) => e.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return b`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
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
    ].filter(Boolean).join(";"), o = this.tapTarget, l = this.renderClimateRow(t, e), h = !!o && l === f;
    return b`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"} ${o ? "is-tappable" : ""}"
      style="${a}"
      role=${h ? "button" : "group"}
      tabindex=${h ? "0" : f}
      aria-label=${h ? `${this.cellAriaLabel(t, e)} – ${e.t("openThermostat")}` : this.cellAriaLabel(t, e)}
      @click=${this.handleCardClick}
      @keydown=${h ? this.handleCardKeydown : f}
    >
      ${this.renderHeader(t, e)} ${this.renderReadings(t, e)}
      ${l} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? f : this.renderEmpty(e)}
    </div>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${Ei(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return b`<div class="empty-state" role="status">
      ${Z.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = Ei(t, this.hass), n = Gn(this.hass, t), s = Un(this.hass, t), a = t.motion.enabled && t.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return b`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? b`<div class="subtle">
              ${e.t("quietSince")}
              ${In(n.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : f}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(n, e) : f}
        ${t.window.enabled ? this.renderWindowBadge(s, e) : f}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? b`<ha-icon .icon=${t.icon}></ha-icon>` : Z.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", n = i ? ge : Ii, s = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return b`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${Vt(
      i ? ge : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Vt(i ? ge : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${Z.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", n = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return b`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? ye : Ii};--badge-bg:${Vt(
      i ? ye : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Vt(i ? ye : "#64748b", i ? 0.5 : 0.22)}"
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
  renderReadings(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return f;
    const i = this.language(), n = Oi(this.hass, t.temperatureEntity, "temperature"), s = Oi(this.hass, t.humidityEntity, "humidity"), a = !!t.temperatureEntity, o = !!t.humidityEntity, l = t.showSeriesLabels;
    return b`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? b`<div class="reading-labels" aria-hidden="true">
        ${a ? b`<span class="series-label"
              ><span class="series-dot" style="background:${t.accentColor}"></span
              >${e.t("temperature")}</span
            >` : f}
        ${o ? b`<span class="series-label"
              ><span class="series-dot" style="background:${t.humidity.color}"></span
              >${e.t("humidity")}</span
            >` : f}
        </div>` : f}
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
    }) : f}
        ${o ? this.renderReading({
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
    }) : f}
      </div>
    </div>`;
  }
  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  renderReading(t) {
    const e = t.value !== null ? st(t.value, t.language, t.decimals) : "–";
    return b`<span class="reading ${t.className}" style="--series-color:${t.color}">
      <span class="reading-number" role="text" aria-label="${t.ariaLabel}"
        ><span class="reading-value">${e}</span
        ><span class="reading-unit">${t.unit}</span></span
      >
    </span>`;
  }
  sensorAria(t, e, i, n) {
    return t.value === null ? n.t("unavailable") : `${st(t.value, e, i)} ${t.unit}`;
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
    if (!ir(t)) return f;
    const i = Ni(this.hass, t, e), n = t.thermostat.showSetpoint && i.setpoint !== null, s = t.thermostat.showStatus, a = t.thermostat.showMode && !!i.modeLabel;
    if (!n && !s && !a) return f;
    const o = Kn(i, t), l = this.language(), h = i.setpoint !== null ? `${st(i.setpoint, l, t.temperatureDecimals)} ${i.unit}` : "", c = this.tapTarget, d = b`${s ? b`<span class="flame status-${i.status}" style="color:${o}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : f}
      <span class="climate-state" role=${c ? "status" : f}
        >${a ? i.modeLabel : i.label}</span
      >
      ${n ? b`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${e.t("setpoint")}</span> ${h}</span
            >` : f}`;
    return c ? b`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${e.t("openThermostat")}"
      title="${e.t("openThermostat")}"
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
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
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
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!er(t)) return f;
    const i = Date.now(), n = i - t.chart.hours * 60 * 60 * 1e3, s = t.chart.showTemperature && t.temperatureEntity ? this.withLiveState(
      this._history[t.temperatureEntity],
      t.temperatureEntity,
      i
    ) : void 0, a = t.chart.showHumidity && t.humidityEntity ? this.withLiveState(this._history[t.humidityEntity], t.humidityEntity, i) : void 0, o = this.language(), l = this.chartClock(), h = t.humidityEntity ? this.hass?.states?.[t.humidityEntity]?.attributes?.unit_of_measurement : void 0, c = t.thermostat.enabled ? Ni(this.hass, t, e) : void 0, d = (t.temperatureEntity ? this.hass?.states?.[t.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = c?.setpoint ?? null, p = (m === null || !c ? null : Ri(m, c.unit, d)) ?? (c?.unit === d ? m : null), S = (D, R) => Ri(D, "°C", R) ?? D, C = {
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
    }, T = !!this.tapTarget && !t.chart.showTooltip, U = Dn(t), x = Rn(t);
    return b`<div
      class="chart-slot ${T ? "is-tappable" : ""}"
      style="margin-left:${U}px;margin-right:${U}px;margin-bottom:${x}px"
    >
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${t.accentColor}
        .humidityColor=${t.humidity.color}
        .setpoint=${p}
        .setpointUnit=${d}
        .start=${n}
        .end=${i}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .showTooltip=${t.chart.showTooltip}
        .showExtremes=${t.chart.showExtremes}
        .temperatureUnit=${d}
        .humidityUnit=${h ?? "%"}
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
        .temperatureScale=${ve(d) ?? "C"}
        .cornerRadius=${t.borderRadius}
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
    this.styles = Ae`
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
  `%c ROOM-CLIMATE-CARD %c v${Tr} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(Q) || customElements.define(Q, ks);
customElements.get(kt) || customElements.define(kt, nr);
const Pi = window.customCards = window.customCards ?? [];
Pi.some((r) => r.type === Q) || Pi.push({
  type: Q,
  name: Mr,
  description: Cr,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  Q as CARD_TAG,
  Tr as CARD_VERSION,
  ks as RoomClimateCard,
  nr as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
