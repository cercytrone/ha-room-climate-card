const R = "room-climate-card", W = "room-climate-card-editor", Ve = "Room Climate Card", Ke = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", Ge = "1.1.1";
const ut = globalThis, Ht = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = /* @__PURE__ */ Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ht && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Zt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Zt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const We = (r) => new ve(typeof r == "string" ? r : r + "", void 0, Tt), Rt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new ve(e, r, Tt);
}, je = (r, t) => {
  if (Ht) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = ut.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, Yt = Ht ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return We(e);
})(r) : r;
const { is: qe, defineProperty: Ze, getOwnPropertyDescriptor: Ye, getOwnPropertyNames: Xe, getOwnPropertySymbols: Je, getPrototypeOf: Qe } = Object, pt = globalThis, Xt = pt.trustedTypes, ti = Xt ? Xt.emptyScript : "", ei = pt.reactiveElementPolyfillSupport, Q = (r, t) => r, kt = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ti : null;
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
} }, $e = (r, t) => !qe(r, t), Jt = { attribute: !0, type: String, converter: kt, reflect: !1, useDefault: !1, hasChanged: $e };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), pt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let G = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Jt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ze(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Ye(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const l = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Jt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const t = Qe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const e = this.properties, i = [...Xe(e), ...Je(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Yt(s));
    } else t !== void 0 && e.push(Yt(t));
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
    return je(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : kt).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : kt;
      this._$Em = s;
      const l = n.fromAttribute(e, o.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? $e)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: n } = o, l = this[s];
        n !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
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
G.elementStyles = [], G.shadowRootOptions = { mode: "open" }, G[Q("elementProperties")] = /* @__PURE__ */ new Map(), G[Q("finalized")] = /* @__PURE__ */ new Map(), ei?.({ ReactiveElement: G }), (pt.reactiveElementVersions ??= []).push("2.1.2");
const Lt = globalThis, Qt = (r) => r, mt = Lt.trustedTypes, te = mt ? mt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, xe = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Ce = "?" + D, ii = `<${Ce}>`, P = document, it = () => P.createComment(""), rt = (r) => r === null || typeof r != "object" && typeof r != "function", Dt = Array.isArray, ri = (r) => Dt(r) || typeof r?.[Symbol.iterator] == "function", xt = `[ 	
\f\r]`, X = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ee = /-->/g, ie = />/g, z = RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), re = /'/g, se = /"/g, Se = /^(?:script|style|textarea|title)$/i, ke = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = ke(1), f = ke(2), j = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), ne = /* @__PURE__ */ new WeakMap(), N = P.createTreeWalker(P, 129);
function Ae(r, t) {
  if (!Dt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return te !== void 0 ? te.createHTML(t) : t;
}
const si = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = X;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, d, c = -1, w = 0;
    for (; w < a.length && (n.lastIndex = w, d = n.exec(a), d !== null); ) w = n.lastIndex, n === X ? d[1] === "!--" ? n = ee : d[1] !== void 0 ? n = ie : d[2] !== void 0 ? (Se.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = z) : d[3] !== void 0 && (n = z) : n === z ? d[0] === ">" ? (n = s ?? X, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? z : d[3] === '"' ? se : re) : n === se || n === re ? n = z : n === ee || n === ie ? n = X : (n = z, s = void 0);
    const g = n === z && r[l + 1].startsWith("/>") ? " " : "";
    o += n === X ? a + ii : c >= 0 ? (i.push(h), a.slice(0, c) + xe + a.slice(c) + D + g) : a + D + (c === -2 ? l : g);
  }
  return [Ae(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class st {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [h, d] = si(t, e);
    if (this.el = st.createElement(h, i), N.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = N.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(xe)) {
          const w = d[n++], g = s.getAttribute(c).split(D), b = /([.?@])?(.*)/.exec(w);
          a.push({ type: 1, index: o, name: b[2], strings: g, ctor: b[1] === "." ? oi : b[1] === "?" ? ai : b[1] === "@" ? li : ft }), s.removeAttribute(c);
        } else c.startsWith(D) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Se.test(s.tagName)) {
          const c = s.textContent.split(D), w = c.length - 1;
          if (w > 0) {
            s.textContent = mt ? mt.emptyScript : "";
            for (let g = 0; g < w; g++) s.append(c[g], it()), N.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[w], it());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ce) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(D, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += D.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function q(r, t, e = r, i) {
  if (t === j) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = rt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = q(r, s._$AS(r, t.values), s, i)), t;
}
class ni {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? P).importNode(e, !0);
    N.currentNode = s;
    let o = N.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let h;
        a.type === 2 ? h = new ot(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new hi(o, this, t)), this._$AV.push(h), a = i[++l];
      }
      n !== a?.index && (o = N.nextNode(), n++);
    }
    return N.currentNode = P, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = q(this, t, e), rt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ri(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && rt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = st.createElement(Ae(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new ni(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ne.get(t.strings);
    return e === void 0 && ne.set(t.strings, e = new st(t)), e;
  }
  k(t) {
    Dt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new ot(this.O(it()), this.O(it()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Qt(t).nextSibling;
      Qt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = q(this, t, e, 0), n = !rt(t) || t !== this._$AH && t !== j, n && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = q(this, l[i + a], e, a), h === j && (h = this._$AH[a]), n ||= !rt(h) || h !== this._$AH[a], h === m ? t = m : t !== m && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class oi extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ai extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class li extends ft {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = q(this, t, e, 0) ?? m) === j) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class hi {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    q(this, t);
  }
}
const ci = Lt.litHtmlPolyfillSupport;
ci?.(st, ot), (Lt.litHtmlVersions ??= []).push("3.3.3");
const di = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new ot(t.insertBefore(it(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const Ot = globalThis;
class I extends G {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = di(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return j;
  }
}
I._$litElement$ = !0, I.finalized = !0, Ot.litElementHydrateSupport?.({ LitElement: I });
const ui = Ot.litElementPolyfillSupport;
ui?.({ LitElement: I });
(Ot.litElementVersions ??= []).push("4.2.2");
const mi = ["on", "open", "opening", "tilted", "gekippt"], pi = ["off", "closed", "closing"], v = {
  cool: "#38bdf8",
  comfort: "#34d399",
  warm: "#fbbf24",
  hot: "#f43f5e",
  humidity: "#a78bfa",
  humidityLow: "#38bdf8",
  humidityHigh: "#e879f9",
  /** Red = heating, green = idle, grey = off (colour-coded HVAC icon). */
  heating: "#ef4444",
  idle: "#34d399",
  off: "#64748b"
}, fi = /^[a-z0-9_]+\.[a-z0-9_]+$/;
function gi(r) {
  return typeof r == "object" && r !== null;
}
function T(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return fi.test(t) ? t : void 0;
}
function nt(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function E(r, t, e, i) {
  const s = typeof r == "number" ? r : Number(r);
  return Number.isFinite(s) ? Math.min(e, Math.max(t, s)) : i;
}
function A(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function H(r, t) {
  const e = nt(r);
  return e && e.length <= 64 ? e : t;
}
function yi(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
function bi(r) {
  const t = gi(r) ? r : {}, e = T(t.temperature_entity), i = T(t.humidity_entity), s = T(t.window_entity), o = T(t.motion_entity), n = T(t.climate_entity), l = T(t.name_entity), a = wi(t), h = yi(t.window_open_states), d = A(t.show_window) ?? !!s, c = A(t.show_motion) ?? !!o, w = A(t.show_thermostat) ?? !!n, g = A(t.show_temperature_chart) ?? !!e, b = A(t.show_humidity_chart) ?? !!i, C = t.height, y = C === "auto" || C === void 0 || C === null || C === 0 ? null : E(C, 120, 2e3, 0) || null, S = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", _ = t.chart_curve === "linear" ? "linear" : "smooth", L = t.chart_gap_mode === "break" ? "break" : "connect", U = t.chart_gap_style === "dashed" ? "dashed" : "solid";
  return {
    raw: t,
    name: nt(t.name),
    nameEntity: l,
    icon: nt(t.icon) ?? "mdi:home-thermometer-outline",
    height: y,
    borderRadius: E(t.border_radius, 0, 40, 18),
    theme: S,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(E(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(E(t.humidity_decimals, 0, 3, 0)),
    bands: a,
    bandColors: {
      cool: H(t.temperature_cool_color, v.cool),
      comfort: H(t.temperature_comfort_color, v.comfort),
      warm: H(t.temperature_warm_color, v.warm),
      hot: H(t.temperature_hot_color, v.hot)
    },
    humidity: {
      color: H(t.humidity_color, v.humidity),
      lowThreshold: E(t.humidity_low_threshold, 0, 100, 35),
      highThreshold: E(t.humidity_high_threshold, 0, 100, 65),
      lowColor: H(t.humidity_low_color, v.humidityLow),
      highColor: H(t.humidity_high_color, v.humidityHigh)
    },
    window: {
      enabled: d && !!s,
      entity: s,
      openStates: h.length ? h : [...mi]
    },
    motion: {
      enabled: c && !!o,
      entity: o,
      showLastChanged: A(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: w && !!n,
      entity: n,
      showSetpoint: A(t.show_setpoint) ?? !0,
      showStatus: A(t.show_hvac_status) ?? !0,
      showMode: A(t.show_hvac_mode) ?? !1,
      heatingColor: H(t.heating_color, v.heating),
      idleColor: H(t.heating_idle_color, v.idle),
      offColor: H(t.heating_off_color, v.off)
    },
    chart: {
      showTemperature: g && !!e,
      showHumidity: b && !!i,
      hours: Math.round(E(t.chart_hours, 1, 168, 6)),
      height: Math.round(E(t.chart_height, 30, 400, 84)),
      curve: _,
      gapMode: L,
      maxGapMinutes: Math.round(E(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: U,
      showLegend: A(t.chart_show_legend) ?? !1,
      showPoints: A(t.chart_show_points) ?? !1,
      showGrid: A(t.chart_show_grid) ?? !0
    }
  };
}
function wi(r) {
  const t = [
    E(r.temperature_cool_below, -50, 80, 19),
    E(r.temperature_warm_above, -50, 80, 25),
    E(r.temperature_hot_above, -50, 80, 28)
  ].sort((e, i) => e - i);
  return { cool: t[0], warm: t[1], hot: t[2] };
}
function _i(r, t) {
  return r < t.cool ? "cool" : r < t.warm ? "comfort" : r < t.hot ? "warm" : "hot";
}
function vi(r, t) {
  return t.bandColors[_i(r, t.bands)];
}
function $i(r, t) {
  const { lowThreshold: e, highThreshold: i } = t.humidity;
  return e > 0 && r < e ? "low" : i > 0 && r > i ? "high" : "normal";
}
function xi(r, t) {
  switch ($i(r, t)) {
    case "low":
      return t.humidity.lowColor;
    case "high":
      return t.humidity.highColor;
    default:
      return t.humidity.color;
  }
}
function Ci(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function Ee(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Me(r) {
  return r.thermostat.enabled;
}
function Ct(r) {
  if (r.height) return r.height;
  const t = Ee(r) ? r.chart.height + 26 : 0, e = Me(r) ? 26 : 0;
  return 96 + t + e;
}
function oe(r, t) {
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
const Si = {
  roomClimate: "Raumklima",
  noEntities: "Keine Sensoren konfiguriert",
  noEntitiesHint: "Über den Karteneditor Temperatur- und Luftfeuchtesensor auswählen.",
  temperature: "Temperatur",
  humidity: "Luftfeuchte",
  windowOpen: "Fenster offen",
  windowClosed: "Fenster geschlossen",
  windowUnknown: "Fensterstatus unbekannt",
  motionDetected: "Bewegung erkannt",
  motionIdle: "Keine Bewegung",
  motionUnknown: "Bewegungsstatus unbekannt",
  quietSince: "Ruhe seit",
  justNow: "gerade eben",
  heating: "Heizt",
  idle: "Ruht",
  off: "Aus",
  statusUnknown: "Status unbekannt",
  unavailable: "Nicht verfügbar",
  unknown: "Unbekannt",
  setpoint: "Soll",
  mode: "Modus",
  noHistory: "Keine Verlaufsdaten",
  noHistoryHint: "Für den gewählten Zeitraum liegen keine Messwerte vor.",
  loadingHistory: "Verlauf wird geladen …",
  historyError: "Verlauf konnte nicht geladen werden",
  legendTemperature: "Temperatur",
  legendHumidity: "Luftfeuchte",
  celsius: "°C",
  minutesShort: "Min.",
  hoursShort: "Std.",
  daysShort: "Tg.",
  hoursRange: (r) => `letzte ${r} Std.`,
  chartAria: (r) => `Verlaufsdiagramm der letzten ${r} Stunden`,
  hvacAction: {
    heating: "Heizt",
    idle: "Ruht",
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
}, ki = {
  roomClimate: "Room climate",
  noEntities: "No sensors configured",
  noEntitiesHint: "Choose a temperature and humidity sensor in the card editor.",
  temperature: "Temperature",
  humidity: "Humidity",
  windowOpen: "Window open",
  windowClosed: "Window closed",
  windowUnknown: "Window state unknown",
  motionDetected: "Motion detected",
  motionIdle: "No motion",
  motionUnknown: "Motion state unknown",
  quietSince: "Quiet for",
  justNow: "just now",
  heating: "Heating",
  idle: "Idle",
  off: "Off",
  statusUnknown: "Status unknown",
  unavailable: "Unavailable",
  unknown: "Unknown",
  setpoint: "Set",
  mode: "Mode",
  noHistory: "No history data",
  noHistoryHint: "There are no measurements for the selected period.",
  loadingHistory: "Loading history …",
  historyError: "History could not be loaded",
  legendTemperature: "Temperature",
  legendHumidity: "Humidity",
  celsius: "°C",
  minutesShort: "min",
  hoursShort: "h",
  daysShort: "d",
  hoursRange: (r) => `last ${r} h`,
  chartAria: (r) => `History chart of the last ${r} hours`,
  hvacAction: {
    heating: "Heating",
    idle: "Idle",
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
}, Ai = Si;
function At(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Ei(r) {
  const t = At(r) === "de" ? Ai : ki;
  return {
    language: At(r),
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
function tt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const ae = /* @__PURE__ */ new Map();
function Mi(r, t) {
  const e = `${r}|${t}`;
  let i = ae.get(e);
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
    ae.set(e, i);
  }
  return i;
}
function B(r, t, e) {
  return Number.isFinite(r) ? Mi(t || "en", tt(Math.round(e), 0, 3)).format(r) : "–";
}
function Ft(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function Hi(r, t, e) {
  const i = Math.max(0, t - r), s = Math.floor(i / 6e4);
  if (s < 1) return e.justNow;
  if (s < 60) return `${s} ${e.minutes}`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} ${e.hours}` : `${Math.floor(o / 24)} ${e.days}`;
}
function Ti(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Et(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function Ri(r) {
  return `#${r.map((t) => tt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function ct(r, t) {
  const e = Et(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${tt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${tt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(tt(t, 0, 1) * 100)}%, transparent)`;
}
function gt(r) {
  return r === "unavailable" || r === "unknown";
}
function dt(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const s = r?.states[t];
  if (!s) return { value: null, status: "missing", unit: i };
  const o = s.attributes?.unit_of_measurement ?? i;
  if (gt(s.state))
    return { entity: s, value: null, status: "unavailable", unit: o };
  const n = Ft(s.state);
  return n === null ? { entity: s, value: null, status: "invalid", unit: o } : { entity: s, value: n, status: "ok", unit: o };
}
function Li(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state;
  if (gt(s)) return { status: "unavailable", entity: i, rawState: s };
  const o = s.trim().toLowerCase();
  return t.window.openStates.includes(o) ? { status: "open", entity: i, rawState: s } : pi.includes(o) ? { status: "closed", entity: i, rawState: s } : { status: "unknown", entity: i, rawState: s };
}
const Di = ["on", "detected", "motion", "occupied", "active"];
function Oi(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state, o = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (gt(s)) return { status: "unavailable", entity: i, rawState: s };
  const n = s.trim().toLowerCase();
  if (Di.includes(n))
    return { status: "active", entity: i, rawState: s };
  const l = { status: "idle", entity: i, rawState: s };
  return Number.isFinite(o) && (l.sinceMs = o), l;
}
const Fi = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function zi(r, t, e) {
  const i = t.thermostat.entity, s = Ti(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const n = o.state?.toLowerCase(), l = o.attributes?.hvac_action, a = typeof l == "string" ? l.toLowerCase() : void 0, h = o.attributes?.temperature, d = typeof h == "number" ? h : typeof h == "string" ? Ft(h) : null, c = {
    entity: o,
    action: a,
    setpoint: d,
    unit: s,
    mode: n,
    modeLabel: n ? e.mode(n) : void 0
  };
  return gt(o.state ?? "") ? { ...c, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : n === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a === "heating" ? { ...c, status: "heating", label: e.t("heating"), colorKey: "heating" } : a === "idle" ? { ...c, status: "idle", label: e.t("idle"), colorKey: "idle" } : a === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a && !Fi.includes(a) ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : a ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : { ...c, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Bi(r, t) {
  switch (r.colorKey) {
    case "heating":
      return t.thermostat.heatingColor;
    case "idle":
      return t.thermostat.idleColor;
    case "off":
      return t.thermostat.offColor;
    default:
      return "var(--rcc-neutral, #94a3b8)";
  }
}
function et(r) {
  return typeof r == "object" && r !== null;
}
function Ni(r) {
  if (!et(r)) return;
  const t = r.lu;
  if (typeof t == "number" && Number.isFinite(t))
    return t > 1e12 ? t : t * 1e3;
  for (const e of ["last_changed", "last_updated", "lc"]) {
    const i = r[e];
    if (typeof i == "number" && Number.isFinite(i))
      return i > 1e12 ? i : i * 1e3;
    if (typeof i == "string") {
      const s = Date.parse(i);
      if (Number.isFinite(s)) return s;
    }
  }
}
function Ii(r) {
  if (et(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function le(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const s = Ni(i);
    if (s === void 0 || !Number.isFinite(s)) continue;
    const o = Ii(i), n = Ft(o);
    t.push({ t: s, v: n });
  }
  if (!t.length) return [];
  t.sort((i, s) => i.t - s.t);
  const e = [];
  for (const i of t) {
    const s = e[e.length - 1];
    s && s.t === i.t ? e[e.length - 1] = i : e.push(i);
  }
  return e;
}
function he(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const s = i[0], o = et(s) && typeof s.entity_id == "string" ? s.entity_id : void 0;
      if (!o || !(o in e)) continue;
      const n = le(i);
      e[o] = Pi(e[o], n);
    }
    return e;
  }
  if (et(r))
    for (const i of t) {
      const s = r[i];
      if (s === void 0) continue;
      const o = Array.isArray(s) ? s : et(s) && Array.isArray(s.data) ? s.data : s;
      e[i] = le(o);
    }
  return e;
}
function Pi(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((s, o) => s.t - o.t), i = [];
  for (const s of e) {
    const o = i[i.length - 1];
    o && o.t === s.t ? i[i.length - 1] = s : i.push(s);
  }
  return i;
}
async function Ui(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), s = new Date(e.end).toISOString(), o = r.connection;
  if (o && typeof o.sendMessagePromise == "function")
    try {
      const a = await o.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: s,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = he(a, t);
      return Object.values(h).some((d) => d.length > 0), h;
    } catch (a) {
      if (!r.callApi) throw a;
    }
  if (typeof r.callApi != "function") return {};
  const n = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((a) => encodeURIComponent(a)).join(",")}&end_time=${encodeURIComponent(s)}&minimal_response&no_attributes`, l = await r.callApi("GET", n);
  return he(l, t);
}
function Vi(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class Ki {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, s = Date.now()) {
    const o = Vi(e, i), n = this.cache.get(o);
    if (n && s - n.fetchedAt < 12e4)
      return n.data;
    const l = this.inflight.get(o);
    if (l) return l;
    const a = Ui(t, e, {
      start: s - i * 60 * 60 * 1e3,
      end: s
    }).then((h) => {
      if (this.cache.set(o, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const d = this.cache.keys().next();
        d.done || this.cache.delete(d.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(o);
    });
    return this.inflight.set(o, a), a;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const k = (r) => f`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, M = {
  thermometer: () => k(f`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => k(f`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => k(
    f`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => k(
    f`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => k(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => k(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => k(
    f`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => k(
    f`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => k(f`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => k(
    f`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => k(f`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => k(f`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => k(f`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => k(
    f`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
}, $ = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function J(r, t) {
  const [e, i] = r, [s, o] = t, n = i - e;
  if (!Number.isFinite(n) || n === 0) {
    const l = (s + o) / 2;
    return () => l;
  }
  return (l) => s + (l - e) / n * (o - s);
}
function ce(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function de(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: s = 0.12 } = e;
  let o = r, n = t;
  if (n - o < i) {
    const a = (n + o) / 2;
    o = a - i / 2, n = a + i / 2;
  }
  const l = (n - o) * s;
  return [o - l, n + l];
}
function Gi(r) {
  const t = [];
  for (let i = 1; i < r.length; i++) {
    const s = r[i].t - r[i - 1].t;
    s > 0 && t.push(s);
  }
  if (!t.length) return 0;
  t.sort((i, s) => i - s);
  const e = Math.floor(t.length / 2);
  return t.length % 2 ? t[e] : (t[e - 1] + t[e]) / 2;
}
function Wi(r, t, e = {}) {
  const i = Gi(r), s = i > 0 ? i * 2.5 : 0, o = e.minMs ?? Math.max(t / 40, 300 * 1e3), n = e.maxMs ?? Math.max(o, t / 3);
  return Math.min(n, Math.max(s, o));
}
const ji = 8;
function qi(r, t, e, i) {
  const s = e.t - t.t, o = t.v, n = e.v, l = Math.min(
    ji,
    Math.max(1, Math.round(s / Math.max(i / 2, 6e4)))
  );
  for (let a = 1; a < l; a++) {
    const h = a / l;
    r.samples.push({
      t: Math.round(t.t + s * h),
      v: o + (n - o) * h
    }), r.bridged.push(!0);
  }
}
function ue(r, t) {
  const { rangeMs: e, start: i, end: s } = t, o = t.gapMode ?? "connect", n = Wi(r, e), l = t.maxGapMs ?? e / 4, a = [];
  let h = null, d = null, c = null, w = !1, g = !1;
  const b = () => {
    h && h.samples.length && a.push(h), h = null, d = null;
  };
  for (const _ of r) {
    if (_.v === null || !Number.isFinite(_.v)) {
      d || (w = !0), c = c ?? _.t, g = !0;
      continue;
    }
    if (g = !1, !d || !h) {
      h = { samples: [_], bridged: [] }, d = _, c = null;
      continue;
    }
    const L = _.t - d.t;
    if (L <= n && c === null) {
      h.samples.push(_), h.bridged.push(!1), d = _;
      continue;
    }
    if (o === "connect" && L <= l) {
      qi(h, d, _, n), h.samples.push(_), h.bridged.push(!0), d = _, c = null;
      continue;
    }
    b(), h = { samples: [_], bridged: [] }, d = _, c = null;
  }
  if (b(), !a.length) return a;
  const C = a[0];
  if (!w && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), g)
    return a;
  const y = a[a.length - 1], S = y.samples[y.samples.length - 1];
  return s !== void 0 && S.t < s && (y.samples.push({ t: s, v: S.v }), y.bridged.push(!1)), a;
}
function Zi(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function St(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function He(r) {
  if (!r.length) return "";
  let t = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${$(r[e].x)} ${$(r[e].y)}`;
  return t;
}
function Yi(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${$(r[0].x)} ${$(r[0].y)}`;
  if (r.length === 2) return He(r);
  const t = r.length, e = [], i = [];
  for (let n = 0; n < t - 1; n++)
    e[n] = r[n + 1].x - r[n].x, i[n] = e[n] === 0 ? 0 : (r[n + 1].y - r[n].y) / e[n];
  const s = new Array(t).fill(0);
  s[0] = i[0], s[t - 1] = i[t - 2];
  for (let n = 1; n < t - 1; n++)
    i[n - 1] * i[n] <= 0 ? s[n] = 0 : s[n] = (i[n - 1] + i[n]) / 2;
  for (let n = 0; n < t - 1; n++) {
    if (i[n] === 0) {
      s[n] = 0, s[n + 1] = 0;
      continue;
    }
    const l = s[n] / i[n], a = s[n + 1] / i[n], h = l * l + a * a;
    if (h > 9) {
      const d = 3 / Math.sqrt(h);
      s[n] = d * l * i[n], s[n + 1] = d * a * i[n];
    }
  }
  let o = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let n = 0; n < t - 1; n++) {
    const l = r[n].x + e[n] / 3, a = r[n].y + s[n] * e[n] / 3, h = r[n + 1].x - e[n] / 3, d = r[n + 1].y - s[n + 1] * e[n] / 3;
    o += ` C ${$(l)} ${$(a)}, ${$(h)} ${$(d)}, ${$(
      r[n + 1].x
    )} ${$(r[n + 1].y)}`;
  }
  return o;
}
function Te(r, t) {
  return t ? Yi(r) : He(r);
}
function me(r, t, e) {
  if (!r.length) return "";
  const i = Te(r, e), s = r[0], o = r[r.length - 1];
  return `${i} L ${$(o.x)} ${$(t)} L ${$(s.x)} ${$(t)} Z`;
}
function Mt(r, t, e) {
  return r < t.cool ? e.cool : r < t.warm ? e.comfort : r < t.hot ? e.warm : e.hot;
}
function pe(r) {
  const { top: t, bottom: e, domain: i, thresholds: s, colors: o } = r, n = r.opacityTop ?? 1, l = r.opacityBottom ?? n, a = r.blendPx ?? 3, h = Math.max(1, e - t), d = J(i, [e, t]), c = (y) => Math.min(1, Math.max(0, (y - t) / h)), w = (y) => {
    const S = Math.min(1, Math.max(0, (y - t) / h));
    return n + (l - n) * S;
  }, g = (y) => Mt(y, s, o), b = [
    { offset: 0, color: g(i[1]), opacity: w(t) }
  ];
  let C = g(i[1]);
  for (const y of [s.hot, s.warm, s.cool]) {
    const S = d(y);
    if (!Number.isFinite(S) || S <= t || S >= e) continue;
    const _ = g(y - 1e-6);
    _ !== C && (b.push({
      offset: c(Math.max(t, S - a / 2)),
      color: C,
      opacity: w(S - a / 2)
    }), b.push({
      offset: c(Math.min(e, S + a / 2)),
      color: _,
      opacity: w(S + a / 2)
    }), C = _);
  }
  b.push({ offset: 1, color: g(i[0]), opacity: w(e) });
  for (let y = 1; y < b.length; y++)
    b[y].offset <= b[y - 1].offset && (b[y].offset = Math.min(1, b[y - 1].offset + 1e-3));
  return b;
}
function Xi(r, t, e) {
  return [
    { offset: 0, color: r, opacity: t },
    { offset: 1, color: r, opacity: e }
  ];
}
function Ji(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let s = 0; s < e; s++)
    i.push(r + (t - r) * s / (e - 1));
  return i;
}
function Qi(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function fe(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const s = Math.ceil(e.length / t), o = [], n = [];
  let l = 0;
  for (let h = 0; h < e.length; h += s) {
    if (!o.length) {
      o.push(e[h]), l = h;
      continue;
    }
    o.push(e[h]), n.push(i.slice(l + 1, h + 1).some(Boolean)), l = h;
  }
  const a = e.length - 1;
  return l !== a && (o.push(e[a]), n.push(i.slice(l + 1, a + 1).some(Boolean))), { samples: o, bridged: n };
}
const tr = 320, er = 84;
let ir = 0;
class rr extends I {
  constructor() {
    super(...arguments), this.bandColors = {
      cool: "#38bdf8",
      comfort: "#34d399",
      warm: "#fbbf24",
      hot: "#f43f5e"
    }, this.bands = { cool: 19, warm: 25, hot: 28 }, this.humidityColor = "#34d399", this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showLegend = !1, this.showPoints = !1, this.showGrid = !0, this.curve = "smooth", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.cornerRadius = 18, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte"
    }, this.uid = `rcc-chart-${++ir}`, this.width = 0, this.height = 0;
  }
  static {
    this.properties = {
      temperature: { attribute: !1 },
      humidity: { attribute: !1 },
      temperatureValue: { attribute: !1 },
      humidityValue: { attribute: !1 },
      bandColors: { attribute: !1 },
      bands: { attribute: !1 },
      humidityColor: { attribute: !1 },
      start: { attribute: !1 },
      end: { attribute: !1 },
      showLegend: { attribute: !1 },
      showPoints: { attribute: !1 },
      showGrid: { attribute: !1 },
      curve: { attribute: !1 },
      gapMode: { attribute: !1 },
      maxGapMinutes: { attribute: !1 },
      gapStyle: { attribute: !1 },
      cornerRadius: { attribute: !1 },
      language: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = Rt`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      position: relative;
      --rcc-chart-label: var(--rcc-muted, #94a3b8);
      --rcc-chart-grid: var(--rcc-text, #e2e8f0);
      --rcc-chart-point-fill: var(--rcc-bg, #162032);
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
    .legend {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      padding: 0 14px 2px;
      font-size: 10px;
      line-height: 1.2;
      color: var(--rcc-chart-label);
      letter-spacing: 0.01em;
    }
    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .legend-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex: none;
    }
    .legend-value {
      color: var(--rcc-text, inherit);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
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
      padding: 6px 16px 10px;
      color: var(--rcc-chart-label);
      text-align: center;
    }
    .state-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--rcc-text);
      opacity: 0.85;
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
    .axis-label {
      font-size: 9.5px;
      fill: var(--rcc-chart-label);
      font-variant-numeric: tabular-nums;
    }
    .grid-line {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.1;
      stroke-width: 1;
      stroke-dasharray: 2 4;
    }
    .baseline {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.16;
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
      stroke-width: 1.2;
      fill: var(--rcc-chart-point-fill);
    }
    .end-dot {
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.5;
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
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0;
  }
  measure() {
    const t = this.getBoundingClientRect();
    this.applySize(t.width, t.height);
  }
  applySize(t, e) {
    const i = Math.round(t), s = Math.round(e);
    i === this.width && s === this.height || (this.width = i, this.height = s, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(t, e) {
    this.applySize(t, e);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : tr,
      height: this.height > 20 ? this.height : er
    };
  }
  stateView(t, e, i) {
    return p`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? p`<span class="state-hint">${i}</span>` : m}
      </div>
    </div>`;
  }
  get hasData() {
    return !!(this.temperature?.some((t) => t.v !== null) || this.humidity?.some((t) => t.v !== null));
  }
  render() {
    const { width: t, height: e } = this.chartSize;
    if (t < 40 || e < 34) return m;
    const i = f`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, s = f`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.error && !this.hasData ? this.stateView(i, this.labels.error) : this.hasData ? p`<div class="wrap">${this.renderLegend(e)}${this.renderChart(t, e)}</div>` : this.loading ? this.stateView(s, this.labels.loading) : this.stateView(s, this.labels.empty, this.labels.emptyHint);
  }
  renderLegend(t) {
    if (!this.showLegend || t < 96) return m;
    const e = this.chartSize.width < 210, i = [];
    return this.temperature?.length && i.push(
      p`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.bandColors.comfort}"></span
          >${this.labels.temperature}${!e && this.temperatureValue ? p`<span class="legend-value">· ${this.temperatureValue}</span>` : m}</span
        >`
    ), this.humidity?.length && i.push(
      p`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.humidityColor}"></span
          >${this.labels.humidity}${!e && this.humidityValue ? p`<span class="legend-value">· ${this.humidityValue}</span>` : m}</span
        >`
    ), p`<div class="legend">${i}</div>`;
  }
  renderChart(t, e) {
    const i = this.showLegend && e >= 96 ? 14 : 0, s = Math.max(20, e - i), o = s >= 62, n = o ? 16 : 2, l = 5, a = s - n, h = Math.max(6, a - l), d = 1, c = t - 1, w = Math.max(1, this.end - this.start), g = J([this.start, this.end], [d, c]), b = o ? Math.min(Math.max(this.cornerRadius, 0), 24) + 2 : 0, C = J([this.start, this.end], [d + b, c - b]), y = s - 5, S = (this.temperature ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), _ = (this.humidity ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), L = ce(S), U = ce(_), O = L ? de(L[0], L[1], { minSpan: 0.8, padding: 0.14 }) : null, yt = U ? de(U[0], U[1], { minSpan: 6, padding: 0.16 }) : null, V = O ? J(O, [a, l]) : null, K = yt ? J(yt, [a, l]) : null, zt = this.temperature ?? [], Bt = this.humidity ?? [], Nt = {
      rangeMs: w,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, It = O ? ue(zt, Nt) : [], Pt = yt ? ue(Bt, Nt) : [], Le = Math.max(1, It.length + Pt.length), Ut = Math.max(60, Math.floor(1200 / Le)), bt = It.map((u) => fe(u, Ut)), wt = Pt.map(
      (u) => fe(u, Ut)
    ), De = O ? pe({
      top: l,
      bottom: a,
      domain: O,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 1,
      opacityBottom: 1
    }) : [], Oe = O ? pe({
      top: l,
      bottom: a,
      domain: O,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 0.3,
      opacityBottom: 0.02
    }) : [], Fe = Xi(this.humidityColor, 0.28, 0.02), Vt = [];
    if (this.showGrid)
      for (let u = 0; u < 3; u++) {
        const x = l + h * u / 2;
        Vt.push(f`<line class="grid-line" x1=${d} x2=${c} y1=${x} y2=${x} />`);
      }
    const Kt = o ? Ji(this.start, this.end, Qi(t)) : [], ze = Kt.map((u, x) => {
      const F = this.formatTime(u), Z = x === 0 ? "start" : x === Kt.length - 1 ? "end" : "middle";
      return f`<text class="axis-label" x=${C(u)} y=${y} text-anchor=${Z}>
        ${F}
      </text>`;
    }), _t = this.curve === "smooth", Be = this.gapStyle === "dashed", Gt = (u, x, F, Z = 1.9) => (Be ? Zi(u) : [u.samples]).filter((lt) => lt.length > 1).map((lt) => {
      const $t = St(lt, g, x);
      return f`<path
            class="series-line"
            d=${Te($t, _t)}
            style="stroke:${F};stroke-width:${Z}"
          />`;
    }), Ne = bt.flatMap(
      (u) => Gt(u, V, `url(#${this.uid}-temp-stroke)`)
    ), Ie = bt.filter((u) => u.samples.length > 1).map((u) => {
      const x = St(u.samples, g, V);
      return f`<path d=${me(x, a, _t)} style="fill:url(#${this.uid}-temp-fill)" />`;
    }), Pe = wt.flatMap(
      (u) => Gt(u, K, this.humidityColor, 1.6)
    ), Ue = wt.filter((u) => u.samples.length > 1).map((u) => {
      const x = St(u.samples, g, K);
      return f`<path d=${me(x, a, _t)} style="fill:url(#${this.uid}-humidity-fill)" />`;
    }), Wt = [];
    if (this.showPoints) {
      const u = (x, F, Z) => {
        const Y = x.filter((ht) => ht.v !== null);
        if (!Y.length) return;
        const $t = Math.max(1, Math.ceil(Y.length / 24));
        Y.forEach((ht, jt) => {
          if (jt % $t !== 0 && jt !== Y.length - 1) return;
          const qt = ht.v;
          Wt.push(
            f`<circle class="point" r="1.9" cx=${g(ht.t)} cy=${F(qt)} style="stroke:${Z(qt)}" />`
          );
        });
      };
      V && bt.forEach(
        (x) => u(
          x.samples,
          V,
          (F) => Mt(F, this.bands, this.bandColors)
        )
      ), K && wt.forEach(
        (x) => u(x.samples, K, () => this.humidityColor)
      );
    }
    const at = [...zt].reverse().find((u) => u.v !== null), vt = [...Bt].reverse().find((u) => u.v !== null);
    return f`<svg
      width=${t}
      height=${s}
      viewBox="0 0 ${t} ${s}"
      role="img"
      aria-label=${this.labels.aria}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${De.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Oe.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Fe.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Vt}
      <line class="baseline" x1=${d} x2=${c} y1=${a} y2=${a} />
      ${Ue} ${Ie} ${Pe} ${Ne} ${Wt}
      ${vt && K ? f`<circle class="end-dot" r="2.6" cx=${g(vt.t)} cy=${K(vt.v)} style="fill:${this.humidityColor}" />` : m}
      ${at && V ? f`<circle
            class="end-dot"
            r="2.8"
            cx=${g(at.t)}
            cy=${V(at.v)}
            style="fill:${Mt(at.v, this.bands, this.bandColors)}"
          />` : m}
      ${ze}
    </svg>`;
  }
  formatTime(t) {
    try {
      return new Intl.DateTimeFormat(this.language || "en", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(t));
    } catch {
      const e = new Date(t);
      return `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
    }
  }
}
const ge = "room-climate-chart";
typeof customElements < "u" && !customElements.get(ge) && customElements.define(ge, rr);
const sr = {
  de: {
    general: "Allgemein",
    sensors: "Sensoren",
    colors: "Farben & Grenzwerte",
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
    theme: "Darstellung",
    themeAuto: "Automatisch (Home-Assistant-Theme)",
    themeDark: "Dunkel",
    themeLight: "Hell",
    temperatureEntity: "Temperatursensor",
    humidityEntity: "Luftfeuchtesensor",
    temperatureDecimals: "Dezimalstellen Temperatur",
    humidityDecimals: "Dezimalstellen Luftfeuchte",
    coolBelow: "Kühl unter",
    warmAbove: "Warm ab",
    hotAbove: "Heiß ab",
    coolColor: "Farbe kühl",
    comfortColor: "Farbe angenehm",
    warmColor: "Farbe warm",
    hotColor: "Farbe heiß",
    humidityColor: "Farbe Luftfeuchte",
    humidityLow: "Trocken unter (%)",
    humidityHigh: "Feucht über (%)",
    humidityLowColor: "Farbe trocken",
    humidityHighColor: "Farbe feucht",
    showWindow: "Fensterstatus anzeigen",
    windowEntity: "Fensterkontakt",
    windowOpenStates: "Zustände für „offen“",
    windowOpenStatesHelper: "Mehrfachauswahl. Übliche Zustände: on, open, tilted.",
    showMotion: "Bewegung anzeigen",
    motionEntity: "Bewegungsmelder",
    motionLastChanged: "Ruhe-Dauer anzeigen",
    showThermostat: "Thermostat anzeigen",
    climateEntity: "Thermostat-Entität",
    showSetpoint: "Solltemperatur anzeigen (über Istwert)",
    showHvacStatus: "Heizstatus-Icon anzeigen",
    showHvacMode: "Betriebsmodus anzeigen",
    heatingColor: "Icon-Farbe Heizen (z. B. Rot)",
    idleColor: "Icon-Farbe Ruhe (z. B. Grün)",
    offColor: "Icon-Farbe ausgeschaltet (z. B. Grau)",
    showTemperatureChart: "Temperaturverlauf anzeigen",
    showHumidityChart: "Luftfeuchteverlauf anzeigen",
    hours: "Zeitraum",
    chartHeight: "Chart-Höhe",
    curve: "Kurvenverlauf",
    curveSmooth: "Geglättet",
    curveLinear: "Direkt verbunden",
    gapMode: "Datenlücken",
    gapConnect: "Durchgehend interpolieren",
    gapBreak: "Unterbrochen darstellen",
    gapHelper: "Home Assistant speichert nur Änderungen – Lücken entstehen auch bei konstanten Werten.",
    maxGap: "Maximal interpolierte Lücke",
    gapStyle: "Darstellung interpolierter Abschnitte",
    gapStyleSolid: "Durchgezogen (empfohlen)",
    gapStyleDashed: "Gestrichelt",
    grid: "Gitternetz",
    legend: "Legende",
    points: "Datenpunkte",
    missingEntity: "Bitte eine Entität auswählen.",
    loading: "Editor wird geladen …",
    generalHelper: "Alle Werte sind optional – die Karte funktioniert auch mit Teilkonfiguration."
  },
  en: {
    general: "General",
    sensors: "Sensors",
    colors: "Colours & thresholds",
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
    theme: "Appearance",
    themeAuto: "Automatic (Home Assistant theme)",
    themeDark: "Dark",
    themeLight: "Light",
    temperatureEntity: "Temperature sensor",
    humidityEntity: "Humidity sensor",
    temperatureDecimals: "Temperature decimals",
    humidityDecimals: "Humidity decimals",
    coolBelow: "Cool below",
    warmAbove: "Warm above",
    hotAbove: "Hot above",
    coolColor: "Cool colour",
    comfortColor: "Comfort colour",
    warmColor: "Warm colour",
    hotColor: "Hot colour",
    humidityColor: "Humidity colour",
    humidityLow: "Dry below (%)",
    humidityHigh: "Humid above (%)",
    humidityLowColor: "Dry colour",
    humidityHighColor: "Humid colour",
    showWindow: "Show window status",
    windowEntity: "Window contact",
    windowOpenStates: "States considered open",
    windowOpenStatesHelper: "Multiple selection. Common states: on, open, tilted.",
    showMotion: "Show motion",
    motionEntity: "Motion sensor",
    motionLastChanged: "Show quiet duration",
    showThermostat: "Show thermostat",
    climateEntity: "Climate entity",
    showSetpoint: "Show target temperature (above current)",
    showHvacStatus: "Show heating status icon",
    showHvacMode: "Show HVAC mode",
    heatingColor: "Heating icon colour (e.g. red)",
    idleColor: "Idle icon colour (e.g. green)",
    offColor: "Off icon colour (e.g. grey)",
    showTemperatureChart: "Show temperature history",
    showHumidityChart: "Show humidity history",
    hours: "Period",
    chartHeight: "Chart height",
    curve: "Curve",
    curveSmooth: "Smoothed",
    curveLinear: "Straight",
    gapMode: "Data gaps",
    gapConnect: "Interpolate continuously",
    gapBreak: "Show as broken",
    gapHelper: "Home Assistant only stores changes – gaps also appear while values stay constant.",
    maxGap: "Largest interpolated gap",
    gapStyle: "Style of interpolated parts",
    gapStyleSolid: "Solid (recommended)",
    gapStyleDashed: "Dashed",
    grid: "Grid lines",
    legend: "Legend",
    points: "Data points",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
class Re extends I {
  constructor() {
    super(...arguments), this._config = { type: `custom:${R}` }, this._selectorsReady = !1, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]);
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _selectorsReady: { state: !0 }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._selectorsReady = typeof customElements < "u" && !!customElements.get("ha-selector"), !this._selectorsReady && typeof customElements < "u" && customElements.whenDefined("ha-selector").then(() => {
      this._selectorsReady = !0;
    }).catch(() => {
    });
  }
  setConfig(t) {
    this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${R}` } : { type: `custom:${R}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = At(this.hass?.locale?.language ?? this.hass?.language);
    return sr[t];
  }
  patch(t) {
    const e = { ...this._config, ...t };
    for (const i of Object.keys(e))
      e[i] === void 0 && delete e[i];
    e.type = this._config.type ?? `custom:${R}`, this._config = e, this.dispatchEvent(
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
    return this.rawBoolean(t) ?? !!T(this._config[e]);
  }
  numberValue(t, e) {
    const i = this._config[t], s = typeof i == "number" ? i : Number(i);
    return Number.isFinite(s) ? s : e;
  }
  stringValue(t, e = "") {
    return nt(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = nt(this._config[t]) ?? e;
    return Et(i) ?? Et(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: Ri(e) });
      }
    });
  }
  renderField(t) {
    return p`<div class="field ${t.disabled ? "is-disabled" : ""}">
      <ha-selector
        .hass=${this.hass}
        .selector=${t.selector}
        .label=${t.label}
        .value=${t.value}
        .disabled=${!!t.disabled}
        @value-changed=${(e) => {
      e.stopPropagation(), !t.disabled && (t.onChange ? t.onChange(e.detail.value) : this.patch({ [t.key]: e.detail.value }));
    }}
      ></ha-selector>
      ${t.helper ? p`<span class="helper">${t.helper}</span>` : m}
      ${t.warning ? p`<span class="helper warning">${t.warning}</span>` : m}
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
  renderSection(t, e, i) {
    const s = this.openSections.has(t);
    return p`<details class="section" ?open=${s} @toggle=${(o) => this.onToggle(t, o)}>
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
      return p`<div class="loading">${this.text.loading}</div>`;
    const t = this.text;
    return p`<div class="editor">
      ${this.renderSection("general", t.general, this.renderGeneral(t))}
      ${this.renderSection("sensors", t.sensors, this.renderSensors(t))}
      ${this.renderSection("colors", t.colors, this.renderColors(t))}
      ${this.renderSection("window", t.window, this.renderWindow(t))}
      ${this.renderSection("motion", t.motion, this.renderMotion(t))}
      ${this.renderSection("thermostat", t.thermostat, this.renderThermostat(t))}
      ${this.renderSection("chart", t.chart, this.renderChart(t))}
    </div>`;
  }
  renderGeneral(t) {
    const e = !this._config.height || this._config.height === "auto";
    return p`<div class="hint">${t.generalHelper}</div>
      ${this.renderField({
      key: "name",
      label: t.name,
      selector: { text: {} },
      value: this.stringValue("name"),
      helper: t.nameHelper
    })}
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
      onChange: (i) => this.patch({ height: i ? "auto" : 240 })
    })}
      ${this.renderField({
      key: "height",
      label: t.height,
      selector: { number: { min: 140, max: 900, step: 4, mode: "box", unit_of_measurement: "px" } },
      value: this.numberValue("height", 240),
      disabled: e,
      helper: t.heightHelper
    })}
      ${this.renderField({
      key: "border_radius",
      label: t.radius,
      selector: { number: { min: 0, max: 40, step: 1, mode: "box", unit_of_measurement: "px" } },
      value: this.numberValue("border_radius", 18)
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
    return p`${this.renderField({
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
      ${this.renderField({
      key: "temperature_decimals",
      label: t.temperatureDecimals,
      selector: { number: { min: 0, max: 3, step: 1, mode: "box" } },
      value: this.numberValue("temperature_decimals", 1)
    })}
      ${this.renderField({
      key: "humidity_decimals",
      label: t.humidityDecimals,
      selector: { number: { min: 0, max: 3, step: 1, mode: "box" } },
      value: this.numberValue("humidity_decimals", 0)
    })}`;
  }
  renderColors(t) {
    return p`${this.renderField({
      key: "temperature_cool_below",
      label: t.coolBelow,
      selector: { number: { min: -30, max: 50, step: 0.5, mode: "box", unit_of_measurement: "°C" } },
      value: this.numberValue("temperature_cool_below", 19)
    })}
      ${this.renderField({
      key: "temperature_warm_above",
      label: t.warmAbove,
      selector: { number: { min: -20, max: 60, step: 0.5, mode: "box", unit_of_measurement: "°C" } },
      value: this.numberValue("temperature_warm_above", 25)
    })}
      ${this.renderField({
      key: "temperature_hot_above",
      label: t.hotAbove,
      selector: { number: { min: -10, max: 70, step: 0.5, mode: "box", unit_of_measurement: "°C" } },
      value: this.numberValue("temperature_hot_above", 28)
    })}
      ${this.renderColor({ key: "temperature_cool_color", label: t.coolColor, fallback: v.cool })}
      ${this.renderColor({
      key: "temperature_comfort_color",
      label: t.comfortColor,
      fallback: v.comfort
    })}
      ${this.renderColor({ key: "temperature_warm_color", label: t.warmColor, fallback: v.warm })}
      ${this.renderColor({ key: "temperature_hot_color", label: t.hotColor, fallback: v.hot })}
      ${this.renderColor({ key: "humidity_color", label: t.humidityColor, fallback: v.humidity })}
      ${this.renderField({
      key: "humidity_low_threshold",
      label: t.humidityLow,
      selector: { number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" } },
      value: this.numberValue("humidity_low_threshold", 35)
    })}
      ${this.renderField({
      key: "humidity_high_threshold",
      label: t.humidityHigh,
      selector: { number: { min: 0, max: 100, step: 1, mode: "box", unit_of_measurement: "%" } },
      value: this.numberValue("humidity_high_threshold", 65)
    })}
      ${this.renderColor({
      key: "humidity_low_color",
      label: t.humidityLowColor,
      fallback: v.humidityLow
    })}
      ${this.renderColor({
      key: "humidity_high_color",
      label: t.humidityHighColor,
      fallback: v.humidityHigh
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = T(this._config.window_entity);
    return p`${this.renderSwitch({
      key: "show_window",
      label: t.showWindow,
      value: e,
      onChange: (s) => this.patch({ show_window: s, ...s ? {} : { window_entity: void 0 } })
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
      onChange: (s) => {
        const o = String(s ?? "").split(",").map((n) => n.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: o.length ? o : void 0 });
      }
    })}`;
  }
  renderMotion(t) {
    const e = this.showFlag("show_motion", "motion_entity");
    return p`${this.renderSwitch({
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
      warning: e && !T(this._config.motion_entity) ? t.missingEntity : void 0
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
    return p`${this.renderSwitch({
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
      warning: e && !T(this._config.climate_entity) ? t.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "show_setpoint",
      label: t.showSetpoint,
      value: this.rawBoolean("show_setpoint") ?? !0,
      disabled: !e
    })}
      ${this.renderSwitch({
      key: "show_hvac_status",
      label: t.showHvacStatus,
      value: this.rawBoolean("show_hvac_status") ?? !0,
      disabled: !e
    })}
      ${this.renderSwitch({
      key: "show_hvac_mode",
      label: t.showHvacMode,
      value: this.rawBoolean("show_hvac_mode") ?? !1,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_color",
      label: t.heatingColor,
      fallback: v.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: v.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: v.off,
      disabled: !e
    })}`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), s = e || i, o = [3, 6, 12, 24, 48].map((n) => ({ value: String(n), label: `${n} h` }));
    return p`${this.renderSwitch({
      key: "show_temperature_chart",
      label: t.showTemperatureChart,
      value: e,
      onChange: (n) => this.patch({ show_temperature_chart: n })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: t.showHumidityChart,
      value: i,
      onChange: (n) => this.patch({ show_humidity_chart: n })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: t.hours,
      selector: { select: { mode: "dropdown", options: o } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !s,
      onChange: (n) => {
        const l = Number(n);
        this.patch({ chart_hours: Number.isFinite(l) ? l : 6 });
      }
    })}
      ${this.renderField({
      key: "chart_height",
      label: t.chartHeight,
      selector: { number: { min: 40, max: 240, step: 4, mode: "box", unit_of_measurement: "px" } },
      value: this.numberValue("chart_height", 84),
      disabled: !s
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
      disabled: !s
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
      disabled: !s,
      helper: t.gapHelper,
      onChange: (n) => this.patch({ chart_gap_mode: String(n) })
    })}
      ${this.renderField({
      key: "chart_max_gap_minutes",
      label: t.maxGap,
      selector: { number: { min: 5, max: 720, step: 5, mode: "box", unit_of_measurement: "min" } },
      value: this.numberValue("chart_max_gap_minutes", 120),
      disabled: !s || this.stringValue("chart_gap_mode", "connect") === "break"
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
      disabled: !s || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderSwitch({
      key: "chart_show_grid",
      label: t.grid,
      value: this.rawBoolean("chart_show_grid") ?? !0,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_legend",
      label: t.legend,
      value: this.rawBoolean("chart_show_legend") ?? !1,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: t.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !s
    })}`;
  }
  static {
    this.styles = Rt`
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
typeof customElements < "u" && !customElements.get(W) && customElements.define(W, Re);
const ye = "#fbbf24", be = "#34d399", we = "var(--rcc-neutral)";
class nr extends I {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new Ki(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    }), this.resizeObserver.observe(this)), this.ensureHistory(), !this._haIconReady && typeof customElements < "u" && customElements.whenDefined("ha-icon").then(() => {
      this._haIconReady = !0;
    }).catch(() => {
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.refreshTimer && clearInterval(this.refreshTimer), this.tickTimer && clearInterval(this.tickTimer), this.pendingLoad && clearTimeout(this.pendingLoad), this.refreshTimer = void 0, this.tickTimer = void 0, this.pendingLoad = void 0, this.resizeObserver?.disconnect(), this.resizeObserver = void 0;
  }
  startTimers() {
    this.refreshTimer || (this.refreshTimer = setInterval(() => {
      this.isConnected && this.loadHistory(this.historyKey, !0);
    }, 3e5)), this.tickTimer || (this.tickTimer = setInterval(() => {
      !this.isConnected || !this._config || this._config.motion.enabled && this._config.motion.showLastChanged && (this._now = Date.now());
    }, 3e4));
  }
  // ------------------------------------------------------------------ options
  setConfig(t) {
    const e = bi(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(W);
  }
  getConfigElement() {
    return document.createElement(W);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), s = (c) => i.find(c)?.entity_id, o = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), n = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), a = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), h = s((c) => c.entity_id.startsWith("climate.")), d = { type: `custom:${R}` };
    return o && (d.temperature_entity = o), n && (d.humidity_entity = n), l && (d.window_entity = l), a && (d.motion_entity = a), h && (d.climate_entity = h), d;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(Ct(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? Ct(this._config) : 230;
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
    return Ei(t);
  }
  language() {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
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
    e === this.historyKey && this.historyFetchedAt > 0 || (this.historyKey = e, this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
      this.pendingLoad = void 0, this.loadHistory(e);
    }, 60));
  }
  async loadHistory(t, e = !1) {
    const i = this._config, s = this.hass;
    if (!i || !s || !t) return;
    const o = this.historyEntityIds(i);
    if (!o.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const n = Date.now(), l = n - i.chart.hours * 60 * 60 * 1e3;
    try {
      const a = await this.repository.load(s, o, i.chart.hours, n);
      if (this.historyKey !== t) return;
      this._history = a, this._historyWindow = { start: l, end: n }, this.historyFetchedAt = Date.now(), e && this.requestUpdate();
    } catch (a) {
      if (this.historyKey !== t) return;
      this._historyError = a instanceof Error ? a.message : String(a), this._history = {};
    } finally {
      this.historyKey === t && (this._historyLoading = !1);
    }
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? Ct(this._config) : 0;
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
      if (!e || !this.hass || e.connected !== this.hass.connected || e.locale?.language !== this.hass.locale?.language || e.locale?.number_format !== this.hass.locale?.number_format || e.locale?.time_format !== this.hass.locale?.time_format || e.themes?.darkMode !== this.hass.themes?.darkMode || e.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? Ci(this._config) : [];
      return i.length ? i.some((s) => e.states[s] !== this.hass?.states[s]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return p`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
    const i = t.theme === "auto" ? "theme-auto" : `theme-${t.theme}`, s = [
      `--rcc-radius:${t.borderRadius}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`
    ].filter(Boolean).join(";");
    return p`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"}"
      style="${s}"
      role="group"
      aria-label="${this.cellAriaLabel(t, e)}"
    >
      ${this.renderHeader(t, e)} ${this.renderSetpointRow(t, e)}
      ${this.renderMetrics(t, e)} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? m : this.renderEmpty(e)}
    </div>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${oe(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return p`<div class="empty-state" role="status">
      ${M.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = oe(t, this.hass), s = Oi(this.hass, t), o = Li(this.hass, t), n = t.motion.enabled && t.motion.showLastChanged && s.status !== "active" && s.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${n ? p`<div class="subtle">
              ${e.t("quietSince")}
              ${Hi(s.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(s, e) : m}
        ${t.window.enabled ? this.renderWindowBadge(o, e) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? p`<ha-icon .icon=${t.icon}></ha-icon>` : M.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", s = i ? be : we, o = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${s};--badge-bg:${ct(i ? be : "#64748b", 0.14)}"
      title="${o}"
      aria-label="${o}"
      role="img"
      >${M.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", s = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? ye : we};--badge-bg:${ct(i ? ye : "#64748b", i ? 0.16 : 0.12)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? M.windowOpen() : M.windowClosed()}</span
    >`;
  }
  renderMetrics(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return m;
    const i = this.language(), s = dt(this.hass, t.temperatureEntity, "temperature"), o = dt(this.hass, t.humidityEntity, "humidity");
    return p`<div class="metrics">
      ${t.temperatureEntity ? p`<div
            class="metric temperature"
            role="group"
            aria-label="${e.t("temperature")}: ${this.sensorAria(s, i, t.temperatureDecimals, e)}"
          >
            <span
              class="value"
              style="color:${s.value !== null ? vi(s.value, t) : "var(--rcc-muted)"}"
              >${s.value !== null ? B(s.value, i, t.temperatureDecimals) : "–"}</span
            ><span class="unit">${s.unit}</span>
          </div>` : m}
      ${t.humidityEntity ? p`<div
            class="metric humidity"
            role="group"
            aria-label="${e.t("humidity")}: ${this.sensorAria(o, i, t.humidityDecimals, e)}"
          >
            <span class="drop-icon" aria-hidden="true">${M.water()}</span>
            <span
              class="humidity-value"
              style="color:${o.value !== null ? xi(o.value, t) : "var(--rcc-muted)"}"
              >${o.value !== null ? B(o.value, i, t.humidityDecimals) : "–"}</span
            ><span class="humidity-unit">${o.unit}</span>
          </div>` : m}
    </div>`;
  }
  sensorAria(t, e, i, s) {
    return t.value === null ? s.t("unavailable") : `${B(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Target temperature above the actual temperature. The heating state is
   * conveyed only by the colour of the icon in front of it (red = heating,
   * green = idle, grey = off), never by an extra text label.
   */
  renderSetpointRow(t, e) {
    if (!Me(t)) return m;
    const i = zi(this.hass, t, e), s = t.thermostat.showSetpoint && i.setpoint !== null, o = t.thermostat.showStatus, n = t.thermostat.showMode && !!i.modeLabel;
    if (!s && !o && !n) return m;
    const l = Bi(i, t), a = this.thermostatAria(i), h = this.language(), d = i.setpoint !== null ? `${B(i.setpoint, h, t.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="setpoint-row">
      ${o ? p`<span
            class="hvac-icon is-${i.colorKey} status-${i.status}"
            style="--hvac-color:${l};--hvac-tint:${ct(l, 0.14)};--hvac-ring:${ct(
      l,
      0.32
    )}"
            role="img"
            aria-label="${a}"
            title="${a}"
            >${this.heatingIcon(i)}</span
          >` : m}
      ${s ? p`<span class="setpoint" title="${e.t("setpoint")} ${d}">
            <span class="setpoint-label">${e.t("setpoint")}</span>
            <span class="setpoint-value"
              >${B(i.setpoint, h, t.temperatureDecimals)}</span
            ><span class="setpoint-unit">${i.unit}</span>
          </span>` : m}
      ${n ? p`<span class="mode-label">${i.modeLabel}</span>` : m}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return M.snowflake();
        case "fan":
          return M.fan();
        case "drying":
          return M.water();
        default:
          return M.flame();
      }
    return M.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!Ee(t)) return m;
    const i = t.chart.showTemperature && t.temperatureEntity ? this._history[t.temperatureEntity] : void 0, s = t.chart.showHumidity && t.humidityEntity ? this._history[t.humidityEntity] : void 0, o = this.language(), n = dt(this.hass, t.temperatureEntity, "temperature"), l = dt(this.hass, t.humidityEntity, "humidity"), a = {
      empty: e.t("noHistory"),
      emptyHint: e.t("noHistoryHint"),
      loading: e.t("loadingHistory"),
      error: e.t("historyError"),
      aria: e.chartAria(t.chart.hours),
      temperature: e.t("legendTemperature"),
      humidity: e.t("legendHumidity")
    };
    return p`<div class="chart-slot">
      <room-climate-chart
        .temperature=${i}
        .humidity=${s}
        .temperatureValue=${n.value !== null ? `${B(n.value, o, t.temperatureDecimals)} ${n.unit}` : void 0}
        .humidityValue=${l.value !== null ? `${B(l.value, o, t.humidityDecimals)} ${l.unit}` : void 0}
        .bandColors=${t.bandColors}
        .bands=${t.bands}
        .humidityColor=${t.humidity.color}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showLegend=${t.chart.showLegend}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .curve=${t.chart.curve}
        .gapMode=${t.chart.gapMode}
        .maxGapMinutes=${t.chart.maxGapMinutes}
        .gapStyle=${t.chart.gapStyle}
        .cornerRadius=${t.borderRadius}
        .language=${o}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${a}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Rt`
    :host {
      display: block;
      --rcc-bg: var(--ha-card-background, var(--card-background-color, #162032));
      --rcc-text: var(--primary-text-color, #e7edf8);
      --rcc-muted: var(--secondary-text-color, #93a4bd);
      --rcc-border: var(--ha-card-border-color, var(--divider-color, rgba(148, 163, 184, 0.25)));
      --rcc-shadow: var(--ha-card-box-shadow, 0 4px 18px rgba(2, 6, 23, 0.22));
      --rcc-neutral: #94a3b8;
      --rcc-radius: 18px;
      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, auto);
      min-height: 0;
      padding: 11px 14px 2px;
      overflow: hidden;
      background: var(--rcc-bg);
      border: 1px solid var(--rcc-border);
      border-radius: var(--rcc-radius);
      box-shadow: var(--rcc-shadow);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark {
      --rcc-bg: #162032;
      --rcc-text: #eaf0fb;
      --rcc-muted: #93a4bd;
      --rcc-border: rgba(148, 163, 184, 0.22);
      --rcc-shadow: 0 10px 30px rgba(2, 6, 23, 0.45);
      --rcc-neutral: #94a3b8;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-text: #0f172a;
      --rcc-muted: #64748b;
      --rcc-border: rgba(15, 23, 42, 0.1);
      --rcc-shadow: 0 8px 24px rgba(15, 23, 42, 0.09);
      --rcc-neutral: #94a3b8;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      min-height: 0;
    }
    .titles {
      min-width: 0;
      flex: 1 1 auto;
    }
    .name-row {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .room-icon {
      display: inline-flex;
      flex: none;
      color: var(--rcc-muted);
      opacity: 0.9;
    }
    .room-icon .icon {
      width: 15px;
      height: 15px;
    }
    .room-icon ha-icon {
      --mdc-icon-size: 15px;
      color: var(--rcc-muted);
    }
    .name {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: -0.01em;
      color: var(--rcc-text);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: 1px;
      font-size: 10px;
      line-height: 1.3;
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badges {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: none;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 9px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, transparent);
      border: 1px solid var(--rcc-border);
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;
    }
    .badge.window.is-open,
    .badge.motion.is-active {
      border-color: var(--badge-color);
    }
    .badge .icon {
      width: 15px;
      height: 15px;
    }

    .metrics {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 8px;
      margin-top: 6px;
      min-height: 0;
    }
    .metric {
      display: flex;
      align-items: baseline;
      min-width: 0;
    }
    .temperature .value {
      font-size: 1.85rem;
      font-weight: 300;
      line-height: 0.95;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      transition: color 0.2s ease;
    }
    .temperature .unit {
      margin-left: 2px;
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--rcc-muted);
    }
    .humidity {
      gap: 4px;
      align-items: baseline;
    }
    .drop-icon {
      display: inline-flex;
      align-self: center;
      color: var(--rcc-muted);
      opacity: 0.85;
    }
    .drop-icon .icon {
      width: 14px;
      height: 14px;
    }
    .humidity-value {
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.02em;
      font-feature-settings: 'tnum' 1;
    }
    .humidity-unit {
      font-size: 0.75rem;
      font-weight: 400;
      color: var(--rcc-muted);
      margin-left: -2px;
    }

    .setpoint-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 5px;
      min-height: 18px;
    }
    .hvac-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      width: 19px;
      height: 19px;
      border-radius: 6px;
      color: var(--hvac-color, var(--rcc-muted));
      background: var(--hvac-tint, transparent);
      border: 1px solid var(--hvac-ring, transparent);
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease;
    }
    .hvac-icon .icon {
      width: 12px;
      height: 12px;
    }
    .hvac-icon.is-heating {
      filter: drop-shadow(0 0 4px var(--hvac-ring, transparent));
    }
    /* Unknown / unavailable: never look like a confident state. */
    .hvac-icon.is-unknown,
    .hvac-icon.status-unavailable,
    .hvac-icon.status-missing {
      background: transparent;
      border-style: dashed;
      border-color: var(--rcc-border);
      opacity: 0.8;
    }
    .hvac-icon.is-unknown .icon,
    .hvac-icon.status-unavailable .icon,
    .hvac-icon.status-missing .icon {
      opacity: 0.7;
    }
    .setpoint {
      display: inline-flex;
      align-items: baseline;
      gap: 3px;
      min-width: 0;
      font-variant-numeric: tabular-nums;
      color: var(--rcc-muted);
    }
    .setpoint-label {
      font-size: 9.5px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      opacity: 0.85;
    }
    .setpoint-value {
      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1;
      color: var(--rcc-text);
      letter-spacing: -0.01em;
    }
    .setpoint-unit {
      font-size: 0.68rem;
      font-weight: 400;
    }
    .mode-label {
      font-size: 9.5px;
      line-height: 1.2;
      padding: 1px 6px;
      border-radius: 999px;
      color: var(--rcc-muted);
      border: 1px solid var(--rcc-border);
      white-space: nowrap;
    }

    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 5px -14px 0;
      min-height: 0;
    }
    .chart-slot > room-climate-chart {
      flex: 1 1 auto;
      min-height: 0;
    }
    .auto-height .chart-slot {
      flex: none;
      height: var(--rcc-chart-height, 84px);
    }
    .fixed-height .chart-slot {
      flex: 1 1 auto;
      min-height: 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px 0 12px;
      text-align: center;
      color: var(--rcc-muted);
    }
    .empty-state .icon {
      width: 18px;
      height: 18px;
      opacity: 0.65;
    }
    .empty-title {
      font-size: 11px;
      font-weight: 600;
      color: var(--rcc-text);
      opacity: 0.85;
    }
    .empty-hint {
      font-size: 10px;
      max-width: 32ch;
      line-height: 1.35;
      opacity: 0.75;
    }
    .empty {
      padding: 16px;
      font-size: 12px;
      color: var(--rcc-muted);
    }

    .density-xs .metrics {
      margin-top: 3px;
    }
    .density-xs .temperature .value {
      font-size: 1.4rem;
    }
    .density-xs .setpoint-row {
      margin-top: 3px;
      gap: 5px;
    }
    .density-xs .hvac-icon {
      width: 17px;
      height: 17px;
    }
    .density-xs .hvac-icon .icon {
      width: 11px;
      height: 11px;
    }
    .density-xs .setpoint-value {
      font-size: 0.85rem;
    }
    .density-xs .humidity-value {
      font-size: 1.05rem;
    }
    .density-xs .drop-icon .icon {
      width: 12px;
      height: 12px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .temperature .value {
      font-size: 1.6rem;
    }
    .density-sm .humidity-value {
      font-size: 1.18rem;
    }
    .density-xs .badge {
      width: 22px;
      height: 22px;
      border-radius: 7px;
    }
    .density-xs .badge .icon {
      width: 13px;
      height: 13px;
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
  `%c ROOM-CLIMATE-CARD %c v${Ge} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(R) || customElements.define(R, nr);
customElements.get(W) || customElements.define(W, Re);
const _e = window.customCards = window.customCards ?? [];
_e.some((r) => r.type === R) || _e.push({
  type: R,
  name: Ve,
  description: Ke,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  R as CARD_TAG,
  Ge as CARD_VERSION,
  nr as RoomClimateCard,
  Re as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
