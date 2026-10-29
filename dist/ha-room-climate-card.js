const L = "room-climate-card", j = "room-climate-card-editor", je = "Room Climate Card", We = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", qe = "1.1.2";
const ut = globalThis, Et = ut.ShadowRoot && (ut.ShadyCSS === void 0 || ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Mt = /* @__PURE__ */ Symbol(), Xt = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Mt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Et && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ze = (r) => new Ce(typeof r == "string" ? r : r + "", void 0, Mt), Ht = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[n + 1], r[0]);
  return new Ce(e, r, Mt);
}, Ye = (r, t) => {
  if (Et) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = ut.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, Jt = Et ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ze(e);
})(r) : r;
const { is: Xe, defineProperty: Je, getOwnPropertyDescriptor: Qe, getOwnPropertyNames: ti, getOwnPropertySymbols: ei, getPrototypeOf: ii } = Object, pt = globalThis, Qt = pt.trustedTypes, ri = Qt ? Qt.emptyScript : "", si = pt.reactiveElementPolyfillSupport, Q = (r, t) => r, Ct = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ri : null;
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
} }, Se = (r, t) => !Xe(r, t), te = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: Se };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), pt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let G = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = te) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Je(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = Qe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const l = s?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Q("elementProperties"))) return;
    const t = ii(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Q("properties"))) {
      const e = this.properties, i = [...ti(e), ...ei(e)];
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
      for (const s of i) e.unshift(Jt(s));
    } else t !== void 0 && e.push(Jt(t));
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
    return Ye(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ct;
      this._$Em = s;
      const l = o.fromAttribute(e, n.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? Se)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: o } = n, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
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
G.elementStyles = [], G.shadowRootOptions = { mode: "open" }, G[Q("elementProperties")] = /* @__PURE__ */ new Map(), G[Q("finalized")] = /* @__PURE__ */ new Map(), si?.({ ReactiveElement: G }), (pt.reactiveElementVersions ??= []).push("2.1.2");
const Tt = globalThis, ee = (r) => r, mt = Tt.trustedTypes, ie = mt ? mt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ke = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + F, ni = `<${Ae}>`, P = document, it = () => P.createComment(""), rt = (r) => r === null || typeof r != "object" && typeof r != "function", Rt = Array.isArray, oi = (r) => Rt(r) || typeof r?.[Symbol.iterator] == "function", $t = `[ 	
\f\r]`, X = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, re = /-->/g, se = />/g, z = RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ne = /'/g, oe = /"/g, Ee = /^(?:script|style|textarea|title)$/i, Me = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Me(1), f = Me(2), W = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), ae = /* @__PURE__ */ new WeakMap(), N = P.createTreeWalker(P, 129);
function He(r, t) {
  if (!Rt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(t) : t;
}
const ai = (r, t) => {
  const e = r.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = X;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, d, c = -1, w = 0;
    for (; w < a.length && (o.lastIndex = w, d = o.exec(a), d !== null); ) w = o.lastIndex, o === X ? d[1] === "!--" ? o = re : d[1] !== void 0 ? o = se : d[2] !== void 0 ? (Ee.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = z) : d[3] !== void 0 && (o = z) : o === z ? d[0] === ">" ? (o = s ?? X, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? z : d[3] === '"' ? oe : ne) : o === oe || o === ne ? o = z : o === re || o === se ? o = X : (o = z, s = void 0);
    const g = o === z && r[l + 1].startsWith("/>") ? " " : "";
    n += o === X ? a + ni : c >= 0 ? (i.push(h), a.slice(0, c) + ke + a.slice(c) + F + g) : a + F + (c === -2 ? l : g);
  }
  return [He(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class st {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, d] = ai(t, e);
    if (this.el = st.createElement(h, i), N.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = N.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(ke)) {
          const w = d[o++], g = s.getAttribute(c).split(F), b = /([.?@])?(.*)/.exec(w);
          a.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? hi : b[1] === "?" ? ci : b[1] === "@" ? di : ft }), s.removeAttribute(c);
        } else c.startsWith(F) && (a.push({ type: 6, index: n }), s.removeAttribute(c));
        if (Ee.test(s.tagName)) {
          const c = s.textContent.split(F), w = c.length - 1;
          if (w > 0) {
            s.textContent = mt ? mt.emptyScript : "";
            for (let g = 0; g < w; g++) s.append(c[g], it()), N.nextNode(), a.push({ type: 2, index: ++n });
            s.append(c[w], it());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ae) a.push({ type: 2, index: n });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(F, c + 1)) !== -1; ) a.push({ type: 7, index: n }), c += F.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = P.createElement("template");
    return i.innerHTML = t, i;
  }
}
function q(r, t, e = r, i) {
  if (t === W) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = rt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = q(r, s._$AS(r, t.values), s, i)), t;
}
class li {
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
    let n = N.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new ot(n, n.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (h = new ui(n, this, t)), this._$AV.push(h), a = i[++l];
      }
      o !== a?.index && (n = N.nextNode(), o++);
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
    t = q(this, t, e), rt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : oi(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = st.createElement(He(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new li(s, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ae.get(t.strings);
    return e === void 0 && ae.set(t.strings, e = new st(t)), e;
  }
  k(t) {
    Rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new ot(this.O(it()), this.O(it()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ee(t).nextSibling;
      ee(t).remove(), t = i;
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
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = q(this, t, e, 0), o = !rt(t) || t !== this._$AH && t !== W, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = n[0], a = 0; a < n.length - 1; a++) h = q(this, l[i + a], e, a), h === W && (h = this._$AH[a]), o ||= !rt(h) || h !== this._$AH[a], h === m ? t = m : t !== m && (t += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class hi extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ci extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class di extends ft {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = q(this, t, e, 0) ?? m) === W) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ui {
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
const mi = Tt.litHtmlPolyfillSupport;
mi?.(st, ot), (Tt.litHtmlVersions ??= []).push("3.3.3");
const pi = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new ot(t.insertBefore(it(), n), n, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const Lt = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = pi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return W;
  }
}
I._$litElement$ = !0, I.finalized = !0, Lt.litElementHydrateSupport?.({ LitElement: I });
const fi = Lt.litElementPolyfillSupport;
fi?.({ LitElement: I });
(Lt.litElementVersions ??= []).push("4.2.2");
const gi = ["on", "open", "opening", "tilted", "gekippt"], yi = ["off", "closed", "closing"], v = {
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
}, bi = /^[a-z0-9_]+\.[a-z0-9_]+$/;
function wi(r) {
  return typeof r == "object" && r !== null;
}
function R(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return bi.test(t) ? t : void 0;
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
function T(r, t) {
  const e = nt(r);
  return e && e.length <= 64 ? e : t;
}
function _i(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
function vi(r) {
  const t = wi(r) ? r : {}, e = R(t.temperature_entity), i = R(t.humidity_entity), s = R(t.window_entity), n = R(t.motion_entity), o = R(t.climate_entity), l = R(t.name_entity), a = $i(t), h = _i(t.window_open_states), d = A(t.show_window) ?? !!s, c = A(t.show_motion) ?? !!n, w = A(t.show_thermostat) ?? !!o, g = A(t.show_temperature_chart) ?? !!e, b = A(t.show_humidity_chart) ?? !!i, x = t.height, y = x === "auto" || x === void 0 || x === null || x === 0 ? null : E(x, 120, 2e3, 0) || null, C = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", _ = t.chart_curve === "linear" ? "linear" : "smooth", D = t.chart_gap_mode === "break" ? "break" : "connect", V = t.chart_gap_style === "dashed" ? "dashed" : "solid";
  return {
    raw: t,
    name: nt(t.name),
    nameEntity: l,
    icon: nt(t.icon) ?? "mdi:home-thermometer-outline",
    height: y,
    borderRadius: E(t.border_radius, 0, 40, 18),
    theme: C,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(E(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(E(t.humidity_decimals, 0, 3, 0)),
    bands: a,
    bandColors: {
      cool: T(t.temperature_cool_color, v.cool),
      comfort: T(t.temperature_comfort_color, v.comfort),
      warm: T(t.temperature_warm_color, v.warm),
      hot: T(t.temperature_hot_color, v.hot)
    },
    humidity: {
      color: T(t.humidity_color, v.humidity),
      lowThreshold: E(t.humidity_low_threshold, 0, 100, 35),
      highThreshold: E(t.humidity_high_threshold, 0, 100, 65),
      lowColor: T(t.humidity_low_color, v.humidityLow),
      highColor: T(t.humidity_high_color, v.humidityHigh)
    },
    window: {
      enabled: d && !!s,
      entity: s,
      openStates: h.length ? h : [...gi]
    },
    motion: {
      enabled: c && !!n,
      entity: n,
      showLastChanged: A(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: w && !!o,
      entity: o,
      showSetpoint: A(t.show_setpoint) ?? !0,
      showStatus: A(t.show_hvac_status) ?? !0,
      showMode: A(t.show_hvac_mode) ?? !1,
      heatingColor: T(t.heating_color, v.heating),
      idleColor: T(t.heating_idle_color, v.idle),
      offColor: T(t.heating_off_color, v.off)
    },
    chart: {
      showTemperature: g && !!e,
      showHumidity: b && !!i,
      hours: Math.round(E(t.chart_hours, 1, 168, 6)),
      height: Math.round(E(t.chart_height, 30, 400, 84)),
      curve: _,
      gapMode: D,
      maxGapMinutes: Math.round(E(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: V,
      showLegend: A(t.chart_show_legend) ?? !1,
      showPoints: A(t.chart_show_points) ?? !1,
      showGrid: A(t.chart_show_grid) ?? !0
    }
  };
}
function $i(r) {
  const t = [
    E(r.temperature_cool_below, -50, 80, 19),
    E(r.temperature_warm_above, -50, 80, 25),
    E(r.temperature_hot_above, -50, 80, 28)
  ].sort((e, i) => e - i);
  return { cool: t[0], warm: t[1], hot: t[2] };
}
function xi(r, t) {
  return r < t.cool ? "cool" : r < t.warm ? "comfort" : r < t.hot ? "warm" : "hot";
}
function Ci(r, t) {
  return t.bandColors[xi(r, t.bands)];
}
function Si(r, t) {
  const { lowThreshold: e, highThreshold: i } = t.humidity;
  return e > 0 && r < e ? "low" : i > 0 && r > i ? "high" : "normal";
}
function ki(r, t) {
  switch (Si(r, t)) {
    case "low":
      return t.humidity.lowColor;
    case "high":
      return t.humidity.highColor;
    default:
      return t.humidity.color;
  }
}
function Ai(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function Te(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Re(r) {
  return r.thermostat.enabled;
}
function xt(r) {
  if (r.height) return r.height;
  const t = Te(r) ? r.chart.height + 26 : 0, e = Re(r) ? 26 : 0;
  return 96 + t + e;
}
function le(r, t) {
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
const Ei = {
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
}, Mi = {
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
}, Hi = Ei;
function St(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Ti(r) {
  const t = St(r) === "de" ? Hi : Mi;
  return {
    language: St(r),
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
const he = /* @__PURE__ */ new Map();
function Ri(r, t) {
  const e = `${r}|${t}`;
  let i = he.get(e);
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
    he.set(e, i);
  }
  return i;
}
function B(r, t, e) {
  return Number.isFinite(r) ? Ri(t || "en", tt(Math.round(e), 0, 3)).format(r) : "–";
}
function Dt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function Li(r, t, e) {
  const i = Math.max(0, t - r), s = Math.floor(i / 6e4);
  if (s < 1) return e.justNow;
  if (s < 60) return `${s} ${e.minutes}`;
  const n = Math.floor(s / 60);
  return n < 24 ? `${n} ${e.hours}` : `${Math.floor(n / 24)} ${e.days}`;
}
function Di(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function kt(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function Oi(r) {
  return `#${r.map((t) => tt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function ct(r, t) {
  const e = kt(r);
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
  const n = s.attributes?.unit_of_measurement ?? i;
  if (gt(s.state))
    return { entity: s, value: null, status: "unavailable", unit: n };
  const o = Dt(s.state);
  return o === null ? { entity: s, value: null, status: "invalid", unit: n } : { entity: s, value: o, status: "ok", unit: n };
}
function Fi(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state;
  if (gt(s)) return { status: "unavailable", entity: i, rawState: s };
  const n = s.trim().toLowerCase();
  return t.window.openStates.includes(n) ? { status: "open", entity: i, rawState: s } : yi.includes(n) ? { status: "closed", entity: i, rawState: s } : { status: "unknown", entity: i, rawState: s };
}
const zi = ["on", "detected", "motion", "occupied", "active"];
function Bi(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state, n = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (gt(s)) return { status: "unavailable", entity: i, rawState: s };
  const o = s.trim().toLowerCase();
  if (zi.includes(o))
    return { status: "active", entity: i, rawState: s };
  const l = { status: "idle", entity: i, rawState: s };
  return Number.isFinite(n) && (l.sinceMs = n), l;
}
const Ni = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Ii(r, t, e) {
  const i = t.thermostat.entity, s = Di(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const n = r?.states[i];
  if (!n)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const o = n.state?.toLowerCase(), l = n.attributes?.hvac_action, a = typeof l == "string" ? l.toLowerCase() : void 0, h = n.attributes?.temperature, d = typeof h == "number" ? h : typeof h == "string" ? Dt(h) : null, c = {
    entity: n,
    action: a,
    setpoint: d,
    unit: s,
    mode: o,
    modeLabel: o ? e.mode(o) : void 0
  };
  return gt(n.state ?? "") ? { ...c, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : o === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a === "heating" ? { ...c, status: "heating", label: e.t("heating"), colorKey: "heating" } : a === "idle" ? { ...c, status: "idle", label: e.t("idle"), colorKey: "idle" } : a === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a && !Ni.includes(a) ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : a ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : { ...c, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Pi(r, t) {
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
function Vi(r) {
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
function Ui(r) {
  if (et(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function ce(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const s = Vi(i);
    if (s === void 0 || !Number.isFinite(s)) continue;
    const n = Ui(i), o = Dt(n);
    t.push({ t: s, v: o });
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
function de(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const s = i[0], n = et(s) && typeof s.entity_id == "string" ? s.entity_id : void 0;
      if (!n || !(n in e)) continue;
      const o = ce(i);
      e[n] = Ki(e[n], o);
    }
    return e;
  }
  if (et(r))
    for (const i of t) {
      const s = r[i];
      if (s === void 0) continue;
      const n = Array.isArray(s) ? s : et(s) && Array.isArray(s.data) ? s.data : s;
      e[i] = ce(n);
    }
  return e;
}
function Ki(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((s, n) => s.t - n.t), i = [];
  for (const s of e) {
    const n = i[i.length - 1];
    n && n.t === s.t ? i[i.length - 1] = s : i.push(s);
  }
  return i;
}
async function Gi(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), s = new Date(e.end).toISOString(), n = r.connection;
  if (n && typeof n.sendMessagePromise == "function")
    try {
      const a = await n.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: s,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = de(a, t);
      return Object.values(h).some((d) => d.length > 0), h;
    } catch (a) {
      if (!r.callApi) throw a;
    }
  if (typeof r.callApi != "function") return {};
  const o = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((a) => encodeURIComponent(a)).join(",")}&end_time=${encodeURIComponent(s)}&minimal_response&no_attributes`, l = await r.callApi("GET", o);
  return de(l, t);
}
function ji(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class Wi {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, s = Date.now()) {
    const n = ji(e, i), o = this.cache.get(n);
    if (o && s - o.fetchedAt < 12e4)
      return o.data;
    const l = this.inflight.get(n);
    if (l) return l;
    const a = Gi(t, e, {
      start: s - i * 60 * 60 * 1e3,
      end: s
    }).then((h) => {
      if (this.cache.set(n, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const d = this.cache.keys().next();
        d.done || this.cache.delete(d.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(n);
    });
    return this.inflight.set(n, a), a;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const k = (r) => f`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, H = {
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
  const [e, i] = r, [s, n] = t, o = i - e;
  if (!Number.isFinite(o) || o === 0) {
    const l = (s + n) / 2;
    return () => l;
  }
  return (l) => s + (l - e) / o * (n - s);
}
function ue(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function me(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: s = 0.12 } = e;
  let n = r, o = t;
  if (o - n < i) {
    const a = (o + n) / 2;
    n = a - i / 2, o = a + i / 2;
  }
  const l = (o - n) * s;
  return [n - l, o + l];
}
function qi(r) {
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
function Zi(r, t, e = {}) {
  const i = qi(r), s = i > 0 ? i * 2.5 : 0, n = e.minMs ?? Math.max(t / 40, 300 * 1e3), o = e.maxMs ?? Math.max(n, t / 3);
  return Math.min(o, Math.max(s, n));
}
const Yi = 8;
function Xi(r, t, e, i) {
  const s = e.t - t.t, n = t.v, o = e.v, l = Math.min(
    Yi,
    Math.max(1, Math.round(s / Math.max(i / 2, 6e4)))
  );
  for (let a = 1; a < l; a++) {
    const h = a / l;
    r.samples.push({
      t: Math.round(t.t + s * h),
      v: n + (o - n) * h
    }), r.bridged.push(!0);
  }
}
function pe(r, t) {
  const { rangeMs: e, start: i, end: s } = t, n = t.gapMode ?? "connect", o = Zi(r, e), l = t.maxGapMs ?? e / 4, a = [];
  let h = null, d = null, c = null, w = !1, g = !1;
  const b = () => {
    h && h.samples.length && a.push(h), h = null, d = null, c = null;
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
    const D = _.t - d.t;
    if (D <= o && c === null) {
      h.samples.push(_), h.bridged.push(!1), d = _;
      continue;
    }
    if (n === "connect" && (!(c !== null) || D <= l)) {
      Xi(h, d, _, o), h.samples.push(_), h.bridged.push(!0), d = _, c = null;
      continue;
    }
    b(), h = { samples: [_], bridged: [] }, d = _;
  }
  if (b(), !a.length) return a;
  const x = a[0];
  if (!w && i !== void 0 && x.samples[0].t > i && (x.samples.unshift({ t: i, v: x.samples[0].v }), x.bridged.unshift(!1)), g)
    return a;
  const y = a[a.length - 1], C = y.samples[y.samples.length - 1];
  return s !== void 0 && C.t < s && (y.samples.push({ t: s, v: C.v }), y.bridged.push(!1)), a;
}
function fe(r, t, e) {
  if (!r || !r.length) return [];
  const i = [...r].sort((n, o) => n.t - o.t), s = [];
  for (const n of i) {
    if (!Number.isFinite(n.t) || t !== void 0 && n.t < t || e !== void 0 && n.t > e) continue;
    const o = n.v === null || !Number.isFinite(n.v) ? null : n.v, l = s[s.length - 1];
    if (l && l.t === n.t) {
      s[s.length - 1] = { t: n.t, v: o };
      continue;
    }
    s.push({ t: n.t, v: o });
  }
  return s;
}
function Ji(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function ge(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function Le(r) {
  if (!r.length) return "";
  let t = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${$(r[e].x)} ${$(r[e].y)}`;
  return t;
}
function Qi(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${$(r[0].x)} ${$(r[0].y)}`;
  if (r.length === 2) return Le(r);
  const t = r.length, e = [], i = [];
  for (let o = 0; o < t - 1; o++)
    e[o] = r[o + 1].x - r[o].x, i[o] = e[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / e[o];
  const s = new Array(t).fill(0);
  s[0] = i[0], s[t - 1] = i[t - 2];
  for (let o = 1; o < t - 1; o++)
    i[o - 1] * i[o] <= 0 ? s[o] = 0 : s[o] = (i[o - 1] + i[o]) / 2;
  for (let o = 0; o < t - 1; o++) {
    if (i[o] === 0) {
      s[o] = 0, s[o + 1] = 0;
      continue;
    }
    const l = s[o] / i[o], a = s[o + 1] / i[o], h = l * l + a * a;
    if (h > 9) {
      const d = 3 / Math.sqrt(h);
      s[o] = d * l * i[o], s[o + 1] = d * a * i[o];
    }
  }
  let n = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let o = 0; o < t - 1; o++) {
    const l = r[o].x + e[o] / 3, a = r[o].y + s[o] * e[o] / 3, h = r[o + 1].x - e[o] / 3, d = r[o + 1].y - s[o + 1] * e[o] / 3;
    n += ` C ${$(l)} ${$(a)}, ${$(h)} ${$(d)}, ${$(
      r[o + 1].x
    )} ${$(r[o + 1].y)}`;
  }
  return n;
}
function De(r, t) {
  return t ? Qi(r) : Le(r);
}
function tr(r, t, e) {
  if (!r.length) return "";
  const i = De(r, e), s = r[0], n = r[r.length - 1];
  return `${i} L ${$(n.x)} ${$(t)} L ${$(s.x)} ${$(t)} Z`;
}
function At(r, t, e) {
  return r < t.cool ? e.cool : r < t.warm ? e.comfort : r < t.hot ? e.warm : e.hot;
}
function ye(r) {
  const { top: t, bottom: e, domain: i, thresholds: s, colors: n } = r, o = r.opacityTop ?? 1, l = r.opacityBottom ?? o, a = r.blendPx ?? 3, h = Math.max(1, e - t), d = J(i, [e, t]), c = (y) => Math.min(1, Math.max(0, (y - t) / h)), w = (y) => {
    const C = Math.min(1, Math.max(0, (y - t) / h));
    return o + (l - o) * C;
  }, g = (y) => At(y, s, n), b = [
    { offset: 0, color: g(i[1]), opacity: w(t) }
  ];
  let x = g(i[1]);
  for (const y of [s.hot, s.warm, s.cool]) {
    const C = d(y);
    if (!Number.isFinite(C) || C <= t || C >= e) continue;
    const _ = g(y - 1e-6);
    _ !== x && (b.push({
      offset: c(Math.max(t, C - a / 2)),
      color: x,
      opacity: w(C - a / 2)
    }), b.push({
      offset: c(Math.min(e, C + a / 2)),
      color: _,
      opacity: w(C + a / 2)
    }), x = _);
  }
  b.push({ offset: 1, color: g(i[0]), opacity: w(e) });
  for (let y = 1; y < b.length; y++)
    b[y].offset <= b[y - 1].offset && (b[y].offset = Math.min(1, b[y - 1].offset + 1e-3));
  return b;
}
function er(r, t, e) {
  return [
    { offset: 0, color: r, opacity: t },
    { offset: 1, color: r, opacity: e }
  ];
}
function ir(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let s = 0; s < e; s++)
    i.push(r + (t - r) * s / (e - 1));
  return i;
}
function rr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function be(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const s = Math.ceil(e.length / t), n = [], o = [];
  let l = 0;
  for (let h = 0; h < e.length; h += s) {
    if (!n.length) {
      n.push(e[h]), l = h;
      continue;
    }
    n.push(e[h]), o.push(i.slice(l + 1, h + 1).some(Boolean)), l = h;
  }
  const a = e.length - 1;
  return l !== a && (n.push(e[a]), o.push(i.slice(l + 1, a + 1).some(Boolean))), { samples: n, bridged: o };
}
const sr = 320, nr = 84;
let or = 0;
class ar extends I {
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
    }, this.uid = `rcc-chart-${++or}`, this.width = 0, this.height = 0;
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
    this.styles = Ht`
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
      width: this.width > 20 ? this.width : sr,
      height: this.height > 20 ? this.height : nr
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
    const i = this.showLegend && e >= 96 ? 14 : 0, s = Math.max(20, e - i), n = s >= 62, o = n ? 16 : 2, l = 5, a = s - o, h = Math.max(6, a - l), d = 1, c = t - 1, w = Math.max(1, this.end - this.start), g = J([this.start, this.end], [d, c]), b = n ? Math.min(Math.max(this.cornerRadius, 0), 24) + 2 : 0, x = J([this.start, this.end], [d + b, c - b]), y = s - 5, C = (this.temperature ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), _ = (this.humidity ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), D = ue(C), V = ue(_), O = D ? me(D[0], D[1], { minSpan: 0.8, padding: 0.14 }) : null, yt = V ? me(V[0], V[1], { minSpan: 6, padding: 0.16 }) : null, U = O ? J(O, [a, l]) : null, K = yt ? J(yt, [a, l]) : null, Ot = fe(this.temperature, this.start, this.end), Ft = fe(this.humidity, this.start, this.end), zt = {
      rangeMs: w,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Bt = O ? pe(Ot, zt) : [], Nt = yt ? pe(Ft, zt) : [], Fe = Math.max(1, Bt.length + Nt.length), It = Math.max(60, Math.floor(1200 / Fe)), bt = Bt.map((u) => be(u, It)), wt = Nt.map(
      (u) => be(u, It)
    ), ze = O ? ye({
      top: l,
      bottom: a,
      domain: O,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 1,
      opacityBottom: 1
    }) : [], Be = O ? ye({
      top: l,
      bottom: a,
      domain: O,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 0.3,
      opacityBottom: 0.02
    }) : [], Ne = er(this.humidityColor, 0.28, 0.02), Pt = [];
    if (this.showGrid)
      for (let u = 0; u < 3; u++) {
        const S = l + h * u / 2;
        Pt.push(f`<line class="grid-line" x1=${d} x2=${c} y1=${S} y2=${S} />`);
      }
    const Vt = n ? ir(this.start, this.end, rr(t)) : [], Ie = Vt.map((u, S) => {
      const M = this.formatTime(u), Z = S === 0 ? "start" : S === Vt.length - 1 ? "end" : "middle";
      return f`<text class="axis-label" x=${x(u)} y=${y} text-anchor=${Z}>
        ${M}
      </text>`;
    }), Ut = this.curve === "smooth", Pe = this.gapStyle === "dashed", Kt = (u, S, M, Z = 1.9) => (Pe ? Ji(u) : [u.samples]).filter((lt) => lt.length > 1).map((lt) => {
      const vt = ge(lt, g, S);
      return f`<path
            class="series-line"
            d=${De(vt, Ut)}
            style="stroke:${M};stroke-width:${Z}"
          />`;
    }), Ve = bt.flatMap(
      (u) => Kt(u, U, `url(#${this.uid}-temp-stroke)`)
    ), Gt = (u, S) => u.filter((M) => M.samples.length > 1).map((M) => tr(ge(M.samples, g, S), a, Ut)).join(" "), jt = Gt(bt, U), Ue = jt ? [f`<path d=${jt} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Ke = wt.flatMap(
      (u) => Kt(u, K, this.humidityColor, 1.6)
    ), Wt = Gt(wt, K), Ge = Wt ? [f`<path d=${Wt} style="fill:url(#${this.uid}-humidity-fill)" />`] : [], qt = [];
    if (this.showPoints) {
      const u = (S, M, Z) => {
        const Y = S.filter((ht) => ht.v !== null);
        if (!Y.length) return;
        const vt = Math.max(1, Math.ceil(Y.length / 24));
        Y.forEach((ht, Zt) => {
          if (Zt % vt !== 0 && Zt !== Y.length - 1) return;
          const Yt = ht.v;
          qt.push(
            f`<circle class="point" r="1.9" cx=${g(ht.t)} cy=${M(Yt)} style="stroke:${Z(Yt)}" />`
          );
        });
      };
      U && bt.forEach(
        (S) => u(
          S.samples,
          U,
          (M) => At(M, this.bands, this.bandColors)
        )
      ), K && wt.forEach(
        (S) => u(S.samples, K, () => this.humidityColor)
      );
    }
    const at = [...Ot].reverse().find((u) => u.v !== null), _t = [...Ft].reverse().find((u) => u.v !== null);
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
          ${ze.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Be.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Ne.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Pt}
      <line class="baseline" x1=${d} x2=${c} y1=${a} y2=${a} />
      ${Ge} ${Ue} ${Ke} ${Ve} ${qt}
      ${_t && K ? f`<circle class="end-dot" r="2.6" cx=${g(_t.t)} cy=${K(_t.v)} style="fill:${this.humidityColor}" />` : m}
      ${at && U ? f`<circle
            class="end-dot"
            r="2.8"
            cx=${g(at.t)}
            cy=${U(at.v)}
            style="fill:${At(at.v, this.bands, this.bandColors)}"
          />` : m}
      ${Ie}
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
const we = "room-climate-chart";
typeof customElements < "u" && !customElements.get(we) && customElements.define(we, ar);
const lr = {
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
    gapConnect: "Kurze Ausfälle überbrücken",
    gapBreak: "Ausfälle sichtbar unterbrechen",
    gapHelper: "Konstante Phasen zeichnet die Karte immer durchgehend. Diese Option betrifft nur echte Ausfälle (unavailable/unknown).",
    maxGap: "Maximal überbrückte Ausfallzeit",
    gapStyle: "Darstellung überbrückter Abschnitte",
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
    gapConnect: "Bridge short outages",
    gapBreak: "Show outages as broken",
    gapHelper: "Constant phases are always drawn continuously. This option only affects real outages (unavailable/unknown).",
    maxGap: "Largest bridged outage",
    gapStyle: "Style of bridged parts",
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
class Oe extends I {
  constructor() {
    super(...arguments), this._config = { type: `custom:${L}` }, this._selectorsReady = !1, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]);
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
    this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${L}` } : { type: `custom:${L}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = St(this.hass?.locale?.language ?? this.hass?.language);
    return lr[t];
  }
  patch(t) {
    const e = { ...this._config, ...t };
    for (const i of Object.keys(e))
      e[i] === void 0 && delete e[i];
    e.type = this._config.type ?? `custom:${L}`, this._config = e, this.dispatchEvent(
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
    return this.rawBoolean(t) ?? !!R(this._config[e]);
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
    return kt(i) ?? kt(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: Oi(e) });
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
    return p`<details class="section" ?open=${s} @toggle=${(n) => this.onToggle(t, n)}>
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
    const e = this.showFlag("show_window", "window_entity"), i = R(this._config.window_entity);
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
        const n = String(s ?? "").split(",").map((o) => o.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: n.length ? n : void 0 });
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
      warning: e && !R(this._config.motion_entity) ? t.missingEntity : void 0
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
      warning: e && !R(this._config.climate_entity) ? t.missingEntity : void 0
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
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), s = e || i, n = [3, 6, 12, 24, 48].map((o) => ({ value: String(o), label: `${o} h` }));
    return p`${this.renderSwitch({
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
      ${this.renderField({
      key: "chart_hours",
      label: t.hours,
      selector: { select: { mode: "dropdown", options: n } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !s,
      onChange: (o) => {
        const l = Number(o);
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
      onChange: (o) => this.patch({ chart_gap_mode: String(o) })
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
    this.styles = Ht`
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
typeof customElements < "u" && !customElements.get(j) && customElements.define(j, Oe);
const _e = "#fbbf24", ve = "#34d399", $e = "var(--rcc-neutral)";
class hr extends I {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new Wi(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    const e = vi(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(j);
  }
  getConfigElement() {
    return document.createElement(j);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), s = (c) => i.find(c)?.entity_id, n = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), o = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), a = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), h = s((c) => c.entity_id.startsWith("climate.")), d = { type: `custom:${L}` };
    return n && (d.temperature_entity = n), o && (d.humidity_entity = o), l && (d.window_entity = l), a && (d.motion_entity = a), h && (d.climate_entity = h), d;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(xt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? xt(this._config) : 230;
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
    return Ti(t);
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
    const n = this.historyEntityIds(i);
    if (!n.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const o = Date.now(), l = o - i.chart.hours * 60 * 60 * 1e3;
    try {
      const a = await this.repository.load(s, n, i.chart.hours, o);
      if (this.historyKey !== t) return;
      this._history = a, this._historyWindow = { start: l, end: o }, this.historyFetchedAt = Date.now(), e && this.requestUpdate();
    } catch (a) {
      if (this.historyKey !== t) return;
      this._historyError = a instanceof Error ? a.message : String(a), this._history = {};
    } finally {
      this.historyKey === t && (this._historyLoading = !1);
    }
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? xt(this._config) : 0;
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
      const i = this._config ? Ai(this._config) : [];
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
    return `${le(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return p`<div class="empty-state" role="status">
      ${H.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = le(t, this.hass), s = Bi(this.hass, t), n = Fi(this.hass, t), o = t.motion.enabled && t.motion.showLastChanged && s.status !== "active" && s.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${o ? p`<div class="subtle">
              ${e.t("quietSince")}
              ${Li(s.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(s, e) : m}
        ${t.window.enabled ? this.renderWindowBadge(n, e) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? p`<ha-icon .icon=${t.icon}></ha-icon>` : H.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", s = i ? ve : $e, n = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${s};--badge-bg:${ct(i ? ve : "#64748b", 0.14)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${H.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", s = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? _e : $e};--badge-bg:${ct(i ? _e : "#64748b", i ? 0.16 : 0.12)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? H.windowOpen() : H.windowClosed()}</span
    >`;
  }
  renderMetrics(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return m;
    const i = this.language(), s = dt(this.hass, t.temperatureEntity, "temperature"), n = dt(this.hass, t.humidityEntity, "humidity");
    return p`<div class="metrics">
      ${t.temperatureEntity ? p`<div
            class="metric temperature"
            role="group"
            aria-label="${e.t("temperature")}: ${this.sensorAria(s, i, t.temperatureDecimals, e)}"
          >
            <span
              class="value"
              style="color:${s.value !== null ? Ci(s.value, t) : "var(--rcc-muted)"}"
              >${s.value !== null ? B(s.value, i, t.temperatureDecimals) : "–"}</span
            ><span class="unit">${s.unit}</span>
          </div>` : m}
      ${t.humidityEntity ? p`<div
            class="metric humidity"
            role="group"
            aria-label="${e.t("humidity")}: ${this.sensorAria(n, i, t.humidityDecimals, e)}"
          >
            <span class="drop-icon" aria-hidden="true">${H.water()}</span>
            <span
              class="humidity-value"
              style="color:${n.value !== null ? ki(n.value, t) : "var(--rcc-muted)"}"
              >${n.value !== null ? B(n.value, i, t.humidityDecimals) : "–"}</span
            ><span class="humidity-unit">${n.unit}</span>
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
    if (!Re(t)) return m;
    const i = Ii(this.hass, t, e), s = t.thermostat.showSetpoint && i.setpoint !== null, n = t.thermostat.showStatus, o = t.thermostat.showMode && !!i.modeLabel;
    if (!s && !n && !o) return m;
    const l = Pi(i, t), a = this.thermostatAria(i), h = this.language(), d = i.setpoint !== null ? `${B(i.setpoint, h, t.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="setpoint-row">
      ${n ? p`<span
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
      ${o ? p`<span class="mode-label">${i.modeLabel}</span>` : m}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return H.snowflake();
        case "fan":
          return H.fan();
        case "drying":
          return H.water();
        default:
          return H.flame();
      }
    return H.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!Te(t)) return m;
    const i = t.chart.showTemperature && t.temperatureEntity ? this._history[t.temperatureEntity] : void 0, s = t.chart.showHumidity && t.humidityEntity ? this._history[t.humidityEntity] : void 0, n = this.language(), o = dt(this.hass, t.temperatureEntity, "temperature"), l = dt(this.hass, t.humidityEntity, "humidity"), a = {
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
        .temperatureValue=${o.value !== null ? `${B(o.value, n, t.temperatureDecimals)} ${o.unit}` : void 0}
        .humidityValue=${l.value !== null ? `${B(l.value, n, t.humidityDecimals)} ${l.unit}` : void 0}
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
        .language=${n}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${a}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Ht`
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
  `%c ROOM-CLIMATE-CARD %c v${qe} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(L) || customElements.define(L, hr);
customElements.get(j) || customElements.define(j, Oe);
const xe = window.customCards = window.customCards ?? [];
xe.some((r) => r.type === L) || xe.push({
  type: L,
  name: je,
  description: We,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  L as CARD_TAG,
  qe as CARD_VERSION,
  hr as RoomClimateCard,
  Oe as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
