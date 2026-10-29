const N = "room-climate-card", X = "room-climate-card-editor", ni = "Room Climate Card", si = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", oi = "1.3.0";
const bt = globalThis, Ft = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ot = /* @__PURE__ */ Symbol(), ee = /* @__PURE__ */ new WeakMap();
let Re = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ft && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ee.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ee.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ai = (r) => new Re(typeof r == "string" ? r : r + "", void 0, Ot), Nt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[o + 1], r[0]);
  return new Re(e, r, Ot);
}, li = (r, t) => {
  if (Ft) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = bt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, ie = Ft ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ai(e);
})(r) : r;
const { is: hi, defineProperty: ci, getOwnPropertyDescriptor: di, getOwnPropertyNames: ui, getOwnPropertySymbols: mi, getPrototypeOf: pi } = Object, vt = globalThis, re = vt.trustedTypes, fi = re ? re.emptyScript : "", yi = vt.reactiveElementPolyfillSupport, ct = (r, t) => r, zt = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? fi : null;
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
} }, De = (r, t) => !hi(r, t), ne = { attribute: !0, type: String, converter: zt, reflect: !1, useDefault: !1, hasChanged: De };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ne) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && ci(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = di(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: n, set(s) {
      const l = n?.call(this);
      o?.call(this, s), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = pi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const e = this.properties, i = [...ui(e), ...mi(e)];
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
      for (const n of i) e.unshift(ie(n));
    } else t !== void 0 && e.push(ie(t));
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
    return li(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : zt).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : zt;
      this._$Em = n;
      const l = s.fromAttribute(e, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const s = this.constructor;
      if (n === !1 && (o = this[t]), i ??= s.getPropertyOptions(t), !((i.hasChanged ?? De)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: o }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: s } = o, l = this[n];
        s !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, o, l);
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
Y.elementStyles = [], Y.shadowRootOptions = { mode: "open" }, Y[ct("elementProperties")] = /* @__PURE__ */ new Map(), Y[ct("finalized")] = /* @__PURE__ */ new Map(), yi?.({ ReactiveElement: Y }), (vt.reactiveElementVersions ??= []).push("2.1.2");
const It = globalThis, se = (r) => r, _t = It.trustedTypes, oe = _t ? _t.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Fe = "$lit$", I = `lit$${Math.random().toFixed(9).slice(2)}$`, Oe = "?" + I, gi = `<${Oe}>`, G = document, mt = () => G.createComment(""), pt = (r) => r === null || typeof r != "object" && typeof r != "function", Bt = Array.isArray, bi = (r) => Bt(r) || typeof r?.[Symbol.iterator] == "function", Et = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ae = /-->/g, le = />/g, U = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ce = /"/g, Ne = /^(?:script|style|textarea|title)$/i, Ie = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = Ie(1), y = Ie(2), J = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), de = /* @__PURE__ */ new WeakMap(), V = G.createTreeWalker(G, 129);
function Be(r, t) {
  if (!Bt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return oe !== void 0 ? oe.createHTML(t) : t;
}
const wi = (r, t) => {
  const e = r.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = at;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let h, d, c = -1, b = 0;
    for (; b < a.length && (s.lastIndex = b, d = s.exec(a), d !== null); ) b = s.lastIndex, s === at ? d[1] === "!--" ? s = ae : d[1] !== void 0 ? s = le : d[2] !== void 0 ? (Ne.test(d[2]) && (n = RegExp("</" + d[2], "g")), s = U) : d[3] !== void 0 && (s = U) : s === U ? d[0] === ">" ? (s = n ?? at, c = -1) : d[1] === void 0 ? c = -2 : (c = s.lastIndex - d[2].length, h = d[1], s = d[3] === void 0 ? U : d[3] === '"' ? ce : he) : s === ce || s === he ? s = U : s === ae || s === le ? s = at : (s = U, n = void 0);
    const g = s === U && r[l + 1].startsWith("/>") ? " " : "";
    o += s === at ? a + gi : c >= 0 ? (i.push(h), a.slice(0, c) + Fe + a.slice(c) + I + g) : a + I + (c === -2 ? l : g);
  }
  return [Be(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ft {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = t.length - 1, a = this.parts, [h, d] = wi(t, e);
    if (this.el = ft.createElement(h, i), V.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = V.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Fe)) {
          const b = d[s++], g = n.getAttribute(c).split(I), C = /([.?@])?(.*)/.exec(b);
          a.push({ type: 1, index: o, name: C[2], strings: g, ctor: C[1] === "." ? vi : C[1] === "?" ? $i : C[1] === "@" ? xi : $t }), n.removeAttribute(c);
        } else c.startsWith(I) && (a.push({ type: 6, index: o }), n.removeAttribute(c));
        if (Ne.test(n.tagName)) {
          const c = n.textContent.split(I), b = c.length - 1;
          if (b > 0) {
            n.textContent = _t ? _t.emptyScript : "";
            for (let g = 0; g < b; g++) n.append(c[g], mt()), V.nextNode(), a.push({ type: 2, index: ++o });
            n.append(c[b], mt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Oe) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(I, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += I.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = G.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Q(r, t, e = r, i) {
  if (t === J) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = pt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = Q(r, n._$AS(r, t.values), n, i)), t;
}
class _i {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? G).importNode(e, !0);
    V.currentNode = n;
    let o = V.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let h;
        a.type === 2 ? h = new yt(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new Si(o, this, t)), this._$AV.push(h), a = i[++l];
      }
      s !== a?.index && (o = V.nextNode(), s++);
    }
    return V.currentNode = G, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class yt {
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
    t = Q(this, t, e), pt(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== J && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && pt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(G.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ft.createElement(Be(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new _i(n, this), s = o.u(this.options);
      o.p(e), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = de.get(t.strings);
    return e === void 0 && de.set(t.strings, e = new ft(t)), e;
  }
  k(t) {
    Bt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new yt(this.O(mt()), this.O(mt()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = se(t).nextSibling;
      se(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = Q(this, t, e, 0), s = !pt(t) || t !== this._$AH && t !== J, s && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++) h = Q(this, l[i + a], e, a), h === J && (h = this._$AH[a]), s ||= !pt(h) || h !== this._$AH[a], h === p ? t = p : t !== p && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class vi extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class $i extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class xi extends $t {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Q(this, t, e, 0) ?? p) === J) return;
    const i = this._$AH, n = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Si {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Q(this, t);
  }
}
const Ci = It.litHtmlPolyfillSupport;
Ci?.(ft, yt), (It.litHtmlVersions ??= []).push("3.3.3");
const ki = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new yt(t.insertBefore(mt(), o), o, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
const Pt = globalThis;
class K extends Y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ki(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return J;
  }
}
K._$litElement$ = !0, K.finalized = !0, Pt.litElementHydrateSupport?.({ LitElement: K });
const Ai = Pt.litElementPolyfillSupport;
Ai?.({ LitElement: K });
(Pt.litElementVersions ??= []).push("4.2.2");
const Ei = ["on", "open", "opening", "tilted", "gekippt"], Mi = ["off", "closed", "closing"], w = {
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
}, ue = {
  temperature: 42,
  humidity: 28
}, me = { min: 14, max: 96 }, Hi = /^[a-z0-9_]+\.[a-z0-9_]+$/, Ti = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Li(r) {
  return typeof r == "object" && r !== null;
}
function O(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return Hi.test(t) ? t : void 0;
}
function tt(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function M(r, t, e, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(e, Math.max(t, n)) : i;
}
function E(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function F(r, t) {
  const e = tt(r);
  return e && e.length <= 64 ? e : t;
}
function pe(r) {
  const t = tt(r);
  if (!(!t || t.length > 120) && Ti.test(t))
    return t;
}
function fe(r, t) {
  return Math.round(
    M(r, me.min, me.max, t)
  );
}
function zi(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
function Ri(r) {
  const t = Li(r) ? r : {}, e = O(t.temperature_entity), i = O(t.humidity_entity), n = O(t.window_entity), o = O(t.motion_entity), s = O(t.climate_entity), l = O(t.name_entity), a = Di(t), h = zi(t.window_open_states), d = E(t.show_window) ?? !!n, c = E(t.show_motion) ?? !!o, b = E(t.show_thermostat) ?? !!s, g = E(t.show_temperature_chart) ?? !!e, C = E(t.show_humidity_chart) ?? !!i, $ = t.height, _ = $ === "auto" || $ === void 0 || $ === null || $ === 0 ? null : M($, 120, 2e3, 0) || null, H = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", m = t.chart_curve === "linear" ? "linear" : "smooth", x = t.chart_gap_mode === "break" ? "break" : "connect", T = t.chart_gap_style === "dashed" ? "dashed" : "solid", L = t.chart_humidity_line_style === "dotted" ? "dotted" : "solid";
  return {
    raw: t,
    name: tt(t.name),
    nameEntity: l,
    icon: tt(t.icon) ?? "mdi:home-thermometer-outline",
    height: _,
    borderRadius: M(t.border_radius, 0, 40, 18),
    theme: H,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(M(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(M(t.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: fe(
          t.temperature_font_size,
          ue.temperature
        ),
        fontFamily: pe(t.temperature_font_family)
      },
      humidity: {
        fontSize: fe(t.humidity_font_size, ue.humidity),
        fontFamily: pe(t.humidity_font_family)
      }
    },
    bands: a,
    bandColors: {
      cool: F(t.temperature_cool_color, w.cool),
      comfort: F(t.temperature_comfort_color, w.comfort),
      warm: F(t.temperature_warm_color, w.warm),
      hot: F(t.temperature_hot_color, w.hot)
    },
    humidity: {
      color: F(t.humidity_color, w.humidity),
      lowThreshold: M(t.humidity_low_threshold, 0, 100, 35),
      highThreshold: M(t.humidity_high_threshold, 0, 100, 65),
      lowColor: F(t.humidity_low_color, w.humidityLow),
      highColor: F(t.humidity_high_color, w.humidityHigh)
    },
    window: {
      enabled: d && !!n,
      entity: n,
      openStates: h.length ? h : [...Ei]
    },
    motion: {
      enabled: c && !!o,
      entity: o,
      showLastChanged: E(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: b && !!s,
      entity: s,
      showSetpoint: E(t.show_setpoint) ?? !0,
      showStatus: E(t.show_hvac_status) ?? !0,
      showMode: E(t.show_hvac_mode) ?? !1,
      heatingColor: F(t.heating_color, w.heating),
      idleColor: F(t.heating_idle_color, w.idle),
      offColor: F(t.heating_off_color, w.off)
    },
    chart: {
      showTemperature: g && !!e,
      showHumidity: C && !!i,
      hours: Math.round(M(t.chart_hours, 1, 168, 6)),
      height: Math.round(M(t.chart_height, 30, 400, 84)),
      curve: m,
      gapMode: x,
      maxGapMinutes: Math.round(M(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: T,
      humidityLineStyle: L,
      showLegend: E(t.chart_show_legend) ?? !1,
      showPoints: E(t.chart_show_points) ?? !1,
      showGrid: E(t.chart_show_grid) ?? !0
    }
  };
}
function Di(r) {
  const t = [
    M(r.temperature_cool_below, -50, 80, 19),
    M(r.temperature_warm_above, -50, 80, 25),
    M(r.temperature_hot_above, -50, 80, 28)
  ].sort((e, i) => e - i);
  return { cool: t[0], warm: t[1], hot: t[2] };
}
function Fi(r, t) {
  return r < t.cool ? "cool" : r < t.warm ? "comfort" : r < t.hot ? "warm" : "hot";
}
function Oi(r, t) {
  return t.bandColors[Fi(r, t.bands)];
}
function Ni(r, t) {
  const { lowThreshold: e, highThreshold: i } = t.humidity;
  return e > 0 && r < e ? "low" : i > 0 && r > i ? "high" : "normal";
}
function Ii(r, t) {
  switch (Ni(r, t)) {
    case "low":
      return t.humidity.lowColor;
    case "high":
      return t.humidity.highColor;
    default:
      return t.humidity.color;
  }
}
function Bi(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function Pe(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Ue(r) {
  return r.thermostat.enabled;
}
function Mt(r) {
  if (r.height) return r.height;
  const t = Pe(r) ? r.chart.height + 26 : 0, e = Ue(r) ? 38 : 0, i = Math.max(r.typography.temperature.fontSize, r.typography.humidity.fontSize);
  return 62 + Math.round(i * 0.98) + t + e;
}
function ye(r, t) {
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
const Pi = {
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
}, Ui = {
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
}, Vi = Pi;
function Rt(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Ki(r) {
  const t = Rt(r) === "de" ? Vi : Ui;
  return {
    language: Rt(r),
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
function dt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const ge = /* @__PURE__ */ new Map();
function Gi(r, t) {
  const e = `${r}|${t}`;
  let i = ge.get(e);
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
    ge.set(e, i);
  }
  return i;
}
function lt(r, t, e) {
  return Number.isFinite(r) ? Gi(t || "en", dt(Math.round(e), 0, 3)).format(r) : "–";
}
function Ut(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function ji(r, t, e) {
  const i = Math.max(0, t - r), n = Math.floor(i / 6e4);
  if (n < 1) return e.justNow;
  if (n < 60) return `${n} ${e.minutes}`;
  const o = Math.floor(n / 60);
  return o < 24 ? `${o} ${e.hours}` : `${Math.floor(o / 24)} ${e.days}`;
}
function Wi(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Dt(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function qi(r) {
  return `#${r.map((t) => dt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Z(r, t) {
  const e = Dt(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${dt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${dt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(dt(t, 0, 1) * 100)}%, transparent)`;
}
function xt(r) {
  return r === "unavailable" || r === "unknown";
}
function be(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const n = r?.states[t];
  if (!n) return { value: null, status: "missing", unit: i };
  const o = n.attributes?.unit_of_measurement ?? i;
  if (xt(n.state))
    return { entity: n, value: null, status: "unavailable", unit: o };
  const s = Ut(n.state);
  return s === null ? { entity: n, value: null, status: "invalid", unit: o } : { entity: n, value: s, status: "ok", unit: o };
}
function Zi(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (xt(n)) return { status: "unavailable", entity: i, rawState: n };
  const o = n.trim().toLowerCase();
  return t.window.openStates.includes(o) ? { status: "open", entity: i, rawState: n } : Mi.includes(o) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Yi = ["on", "detected", "motion", "occupied", "active"];
function Xi(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state, o = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (xt(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  if (Yi.includes(s))
    return { status: "active", entity: i, rawState: n };
  const l = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(o) && (l.sinceMs = o), l;
}
const Ji = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Qi(r, t, e) {
  const i = t.thermostat.entity, n = Wi(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const s = o.state?.toLowerCase(), l = o.attributes?.hvac_action, a = typeof l == "string" ? l.toLowerCase() : void 0, h = o.attributes?.temperature, d = typeof h == "number" ? h : typeof h == "string" ? Ut(h) : null, c = {
    entity: o,
    action: a,
    setpoint: d,
    unit: n,
    mode: s,
    modeLabel: s ? e.mode(s) : void 0
  };
  return xt(o.state ?? "") ? { ...c, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : s === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a === "heating" ? { ...c, status: "heating", label: e.t("heating"), colorKey: "heating" } : a === "idle" ? { ...c, status: "idle", label: e.t("idle"), colorKey: "idle" } : a === "off" ? { ...c, status: "off", label: e.t("off"), colorKey: "off" } : a && !Ji.includes(a) ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : a ? { ...c, status: "action", label: e.action(a), colorKey: "idle" } : { ...c, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function tr(r, t) {
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
function ut(r) {
  return typeof r == "object" && r !== null;
}
function er(r) {
  if (!ut(r)) return;
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
function ir(r) {
  if (ut(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function we(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const n = er(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const o = ir(i), s = Ut(o);
    t.push({ t: n, v: s });
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
function _e(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], o = ut(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!o || !(o in e)) continue;
      const s = we(i);
      e[o] = rr(e[o], s);
    }
    return e;
  }
  if (ut(r))
    for (const i of t) {
      const n = r[i];
      if (n === void 0) continue;
      const o = Array.isArray(n) ? n : ut(n) && Array.isArray(n.data) ? n.data : n;
      e[i] = we(o);
    }
  return e;
}
function rr(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((n, o) => n.t - o.t), i = [];
  for (const n of e) {
    const o = i[i.length - 1];
    o && o.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function nr(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), n = new Date(e.end).toISOString(), o = r.connection;
  if (o && typeof o.sendMessagePromise == "function")
    try {
      const a = await o.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = _e(a, t);
      return Object.values(h).some((d) => d.length > 0), h;
    } catch (a) {
      if (!r.callApi) throw a;
    }
  if (typeof r.callApi != "function") return {};
  const s = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((a) => encodeURIComponent(a)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, l = await r.callApi("GET", s);
  return _e(l, t);
}
function sr(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class or {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, n = Date.now()) {
    const o = sr(e, i), s = this.cache.get(o);
    if (s && n - s.fetchedAt < 12e4)
      return s.data;
    const l = this.inflight.get(o);
    if (l) return l;
    const a = nr(t, e, {
      start: n - i * 60 * 60 * 1e3,
      end: n
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
const k = (r) => y`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, R = {
  thermometer: () => k(y`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => k(y`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => k(
    y`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => k(
    y`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => k(
    y`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => k(
    y`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => k(
    y`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => k(
    y`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => k(y`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => k(
    y`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => k(y`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => k(y`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => k(y`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => k(
    y`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
}, v = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function ht(r, t) {
  const [e, i] = r, [n, o] = t, s = i - e;
  if (!Number.isFinite(s) || s === 0) {
    const l = (n + o) / 2;
    return () => l;
  }
  return (l) => n + (l - e) / s * (o - n);
}
function ve(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function $e(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = e;
  let o = r, s = t;
  if (s - o < i) {
    const a = (s + o) / 2;
    o = a - i / 2, s = a + i / 2;
  }
  const l = (s - o) * n;
  return [o - l, s + l];
}
function ar(r) {
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
function lr(r, t, e = {}) {
  const i = ar(r), n = i > 0 ? i * 2.5 : 0, o = e.minMs ?? Math.max(t / 40, 300 * 1e3), s = e.maxMs ?? Math.max(o, t / 3);
  return Math.min(s, Math.max(n, o));
}
const hr = 8;
function cr(r, t, e, i) {
  const n = e.t - t.t, o = t.v, s = e.v, l = Math.min(
    hr,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let a = 1; a < l; a++) {
    const h = a / l;
    r.samples.push({
      t: Math.round(t.t + n * h),
      v: o + (s - o) * h
    }), r.bridged.push(!0);
  }
}
function xe(r, t) {
  const { rangeMs: e, start: i, end: n } = t, o = t.gapMode ?? "connect", s = lr(r, e), l = t.maxGapMs ?? e / 4, a = [];
  let h = null, d = null, c = null, b = !1, g = !1;
  const C = () => {
    h && h.samples.length && a.push(h), h = null, d = null, c = null;
  };
  for (const m of r) {
    if (m.v === null || !Number.isFinite(m.v)) {
      d || (b = !0), c = c ?? m.t, g = !0;
      continue;
    }
    if (g = !1, !d || !h) {
      h = { samples: [m], bridged: [] }, d = m, c = null;
      continue;
    }
    const x = m.t - d.t;
    if (x <= s && c === null) {
      h.samples.push(m), h.bridged.push(!1), d = m;
      continue;
    }
    if (o === "connect" && (!(c !== null) || x <= l)) {
      cr(h, d, m, s), h.samples.push(m), h.bridged.push(!0), d = m, c = null;
      continue;
    }
    C(), h = { samples: [m], bridged: [] }, d = m;
  }
  if (C(), !a.length) return a;
  const $ = a[0];
  if (!b && i !== void 0 && $.samples[0].t > i && ($.samples.unshift({ t: i, v: $.samples[0].v }), $.bridged.unshift(!1)), g)
    return a;
  const _ = a[a.length - 1], H = _.samples[_.samples.length - 1];
  return n !== void 0 && H.t < n && (_.samples.push({ t: n, v: H.v }), _.bridged.push(!1)), a;
}
function Se(r, t, e) {
  if (!r || !r.length) return [];
  const i = [...r].sort((o, s) => o.t - s.t), n = [];
  for (const o of i) {
    if (!Number.isFinite(o.t) || t !== void 0 && o.t < t || e !== void 0 && o.t > e) continue;
    const s = o.v === null || !Number.isFinite(o.v) ? null : o.v, l = n[n.length - 1];
    if (l && l.t === o.t) {
      n[n.length - 1] = { t: o.t, v: s };
      continue;
    }
    n.push({ t: o.t, v: s });
  }
  return n;
}
function dr(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function Ce(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function Ve(r) {
  if (!r.length) return "";
  let t = `M ${v(r[0].x)} ${v(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${v(r[e].x)} ${v(r[e].y)}`;
  return t;
}
function ur(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${v(r[0].x)} ${v(r[0].y)}`;
  if (r.length === 2) return Ve(r);
  const t = r.length, e = [], i = [];
  for (let s = 0; s < t - 1; s++)
    e[s] = r[s + 1].x - r[s].x, i[s] = e[s] === 0 ? 0 : (r[s + 1].y - r[s].y) / e[s];
  const n = new Array(t).fill(0);
  n[0] = i[0], n[t - 1] = i[t - 2];
  for (let s = 1; s < t - 1; s++)
    i[s - 1] * i[s] <= 0 ? n[s] = 0 : n[s] = (i[s - 1] + i[s]) / 2;
  for (let s = 0; s < t - 1; s++) {
    if (i[s] === 0) {
      n[s] = 0, n[s + 1] = 0;
      continue;
    }
    const l = n[s] / i[s], a = n[s + 1] / i[s], h = l * l + a * a;
    if (h > 9) {
      const d = 3 / Math.sqrt(h);
      n[s] = d * l * i[s], n[s + 1] = d * a * i[s];
    }
  }
  let o = `M ${v(r[0].x)} ${v(r[0].y)}`;
  for (let s = 0; s < t - 1; s++) {
    const l = r[s].x + e[s] / 3, a = r[s].y + n[s] * e[s] / 3, h = r[s + 1].x - e[s] / 3, d = r[s + 1].y - n[s + 1] * e[s] / 3;
    o += ` C ${v(l)} ${v(a)}, ${v(h)} ${v(d)}, ${v(
      r[s + 1].x
    )} ${v(r[s + 1].y)}`;
  }
  return o;
}
function Ke(r, t) {
  return t ? ur(r) : Ve(r);
}
function mr(r, t, e) {
  if (!r.length) return "";
  const i = Ke(r, e), n = r[0], o = r[r.length - 1];
  return `${i} L ${v(o.x)} ${v(t)} L ${v(n.x)} ${v(t)} Z`;
}
const St = (r) => Math.min(1, Math.max(0, r));
function ke(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16) / 255,
    parseInt(e.slice(2, 4), 16) / 255,
    parseInt(e.slice(4, 6), 16) / 255
  ];
}
function pr(r) {
  return `#${r.map((t) => Math.round(St(t) * 255).toString(16).padStart(2, "0")).join("")}`;
}
const fr = (r) => r <= 0.04045 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4, Ht = (r) => r <= 31308e-7 ? r * 12.92 : 1.055 * r ** (1 / 2.4) - 0.055;
function Ae(r) {
  const [t, e, i] = r.map(fr), n = Math.cbrt(0.4122214708 * t + 0.5363325363 * e + 0.0514459929 * i), o = Math.cbrt(0.2119034982 * t + 0.6806995451 * e + 0.1073969566 * i), s = Math.cbrt(0.0883024619 * t + 0.2817188376 * e + 0.6299787005 * i);
  return [
    0.2104542553 * n + 0.793617785 * o - 0.0040720468 * s,
    1.9779984951 * n - 2.428592205 * o + 0.4505937099 * s,
    0.0259040371 * n + 0.7827717662 * o - 0.808675766 * s
  ];
}
function yr(r) {
  const [t, e, i] = r, n = (t + 0.3963377774 * e + 0.2158037573 * i) ** 3, o = (t - 0.1055613458 * e - 0.0638541728 * i) ** 3, s = (t - 0.0894841775 * e - 1.291485548 * i) ** 3;
  return [
    Ht(4.0767416621 * n - 3.3077115913 * o + 0.2309699292 * s),
    Ht(-1.2684380046 * n + 2.6097574011 * o - 0.3413193965 * s),
    Ht(-0.0041960863 * n - 0.7034186147 * o + 1.707614701 * s)
  ];
}
function Ee(r, t, e) {
  const i = ke(r), n = ke(t);
  if (!i || !n) return null;
  const o = St(e), s = Ae(i), l = Ae(n), a = [
    s[0] + (l[0] - s[0]) * o,
    s[1] + (l[1] - s[1]) * o,
    s[2] + (l[2] - s[2]) * o
  ];
  return pr(yr(a));
}
const Ge = (r) => {
  const t = St(r);
  return t * t * (3 - 2 * t);
};
function wt(r, t, e) {
  return r < t.cool ? e.cool : r < t.warm ? e.comfort : r < t.hot ? e.warm : e.hot;
}
function Me(r) {
  const { top: t, bottom: e, domain: i, thresholds: n, colors: o } = r, s = r.opacityTop ?? 1, l = r.opacityBottom ?? s, a = Math.max(1, e - t), h = ht(i, [e, t]), d = (m) => St((m - t) / a), c = (m) => s + (l - s) * d(m), b = (m) => wt(m, n, o), g = [n.hot, n.warm, n.cool].map((m) => ({ value: m, y: h(m) })).filter((m) => Number.isFinite(m.y) && m.y > t && m.y < e).sort((m, x) => m.y - x.y), C = r.blendPx ?? Math.min(46, Math.max(14, a * 0.34)), $ = Math.max(2, r.blendSteps ?? 8), _ = [
    { offset: 0, color: b(i[1]), opacity: c(t) }
  ];
  let H = b(i[1]);
  g.forEach((m, x) => {
    const T = b(m.value - 1e-6);
    if (T === H) return;
    const L = x === 0 ? t : g[x - 1].y, et = x === g.length - 1 ? e : g[x + 1].y, D = Math.min(
      C / 2,
      Math.max(0, m.y - L) * 0.45,
      Math.max(0, et - m.y) * 0.45
    ), A = Math.max(t, m.y - D), B = Math.min(e, m.y + D);
    if (_.push({ offset: d(A), color: H, opacity: c(A) }), Ee(H, T, 0.5) !== null && B - A > 1)
      for (let j = 1; j < $; j++) {
        const it = j / $, rt = A + (B - A) * it, gt = Ee(H, T, Ge(it));
        if (!gt) break;
        _.push({ offset: d(rt), color: gt, opacity: c(rt) });
      }
    _.push({ offset: d(B), color: T, opacity: c(B) }), H = T;
  }), _.push({ offset: 1, color: b(i[0]), opacity: c(e) });
  for (let m = 1; m < _.length; m++)
    _[m].offset <= _[m - 1].offset && (_[m].offset = Math.min(1, _[m - 1].offset + 1e-3));
  return _;
}
function gr(r, t, e, i = 2) {
  if (i <= 2)
    return [
      { offset: 0, color: r, opacity: t },
      { offset: 1, color: r, opacity: e }
    ];
  const n = Math.max(2, Math.round(i)), o = [];
  for (let s = 0; s < n; s++) {
    const l = s / (n - 1);
    o.push({
      offset: l,
      color: r,
      opacity: t + (e - t) * Ge(l)
    });
  }
  return o;
}
function br(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let n = 0; n < e; n++)
    i.push(r + (t - r) * n / (e - 1));
  return i;
}
function wr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function He(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const n = Math.ceil(e.length / t), o = [], s = [];
  let l = 0;
  for (let h = 0; h < e.length; h += n) {
    if (!o.length) {
      o.push(e[h]), l = h;
      continue;
    }
    o.push(e[h]), s.push(i.slice(l + 1, h + 1).some(Boolean)), l = h;
  }
  const a = e.length - 1;
  return l !== a && (o.push(e[a]), s.push(i.slice(l + 1, a + 1).some(Boolean))), { samples: o, bridged: s };
}
const _r = 320, vr = 84;
let $r = 0;
class xr extends K {
  constructor() {
    super(...arguments), this.bandColors = {
      cool: "#38bdf8",
      comfort: "#34d399",
      warm: "#fbbf24",
      hot: "#f43f5e"
    }, this.bands = { cool: 19, warm: 25, hot: 28 }, this.humidityColor = "#34d399", this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showLegend = !1, this.showPoints = !1, this.showGrid = !0, this.curve = "smooth", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.cornerRadius = 18, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte"
    }, this.uid = `rcc-chart-${++$r}`, this.width = 0, this.height = 0;
  }
  static {
    this.properties = {
      temperature: { attribute: !1 },
      humidity: { attribute: !1 },
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
      humidityLineStyle: { attribute: !1 },
      cornerRadius: { attribute: !1 },
      language: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = Nt`
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
      letter-spacing: 0.03em;
    }
    .grid-line {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.08;
      stroke-width: 1;
      stroke-dasharray: 2 5;
    }
    .baseline {
      stroke: var(--rcc-chart-grid);
      stroke-opacity: 0.16;
      stroke-width: 1;
    }
    .series-line {
      fill: none;
      stroke-width: 2.1;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    .point {
      stroke-width: 1.5;
      fill: var(--rcc-chart-point-fill);
    }
    .end-dot {
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.6;
    }
    /* Soft glow behind the latest value – the modern-layout accent. */
    .end-halo {
      opacity: 0.2;
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
    const i = Math.round(t), n = Math.round(e);
    i === this.width && n === this.height || (this.width = i, this.height = n, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(t, e) {
    this.applySize(t, e);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : _r,
      height: this.height > 20 ? this.height : vr
    };
  }
  stateView(t, e, i) {
    return f`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? f`<span class="state-hint">${i}</span>` : p}
      </div>
    </div>`;
  }
  get hasData() {
    return !!(this.temperature?.some((t) => t.v !== null) || this.humidity?.some((t) => t.v !== null));
  }
  render() {
    const { width: t, height: e } = this.chartSize;
    if (t < 40 || e < 34) return p;
    const i = y`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = y`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.error && !this.hasData ? this.stateView(i, this.labels.error) : this.hasData ? f`<div class="wrap">${this.renderLegend(e)}${this.renderChart(t, e)}</div>` : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
  }
  /**
   * Legend with series names only – the current values are already the two big
   * readings above the chart, so repeating them here was redundant.
   */
  renderLegend(t) {
    if (!this.showLegend || t < 96) return p;
    const e = [];
    return this.temperature?.length && e.push(
      f`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.bandColors.comfort}"></span
          >${this.labels.temperature}</span
        >`
    ), this.humidity?.length && e.push(
      f`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.humidityColor}"></span
          >${this.labels.humidity}</span
        >`
    ), f`<div class="legend">${e}</div>`;
  }
  renderChart(t, e) {
    const i = this.showLegend && e >= 96 ? 14 : 0, n = Math.max(20, e - i), o = n >= 62, s = o ? 16 : 2, l = 5, a = n - s, h = Math.max(6, a - l), d = 1, c = t - 1, b = Math.max(1, this.end - this.start), g = ht([this.start, this.end], [d, c]), C = o ? Math.min(Math.max(this.cornerRadius, 0), 24) + 2 : 0, $ = ht([this.start, this.end], [d + C, c - C]), _ = n - 5, H = (this.temperature ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), m = (this.humidity ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), x = ve(H), T = ve(m), L = x ? $e(x[0], x[1], { minSpan: 0.8, padding: 0.14 }) : null, et = T ? $e(T[0], T[1], { minSpan: 6, padding: 0.16 }) : null, D = L ? ht(L, [a, l]) : null, A = et ? ht(et, [a, l]) : null, B = Se(this.temperature, this.start, this.end), Ct = Se(this.humidity, this.start, this.end), j = {
      rangeMs: b,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, it = L ? xe(B, j) : [], rt = et ? xe(Ct, j) : [], gt = Math.max(1, it.length + rt.length), Vt = Math.max(60, Math.floor(1200 / gt)), kt = it.map((u) => He(u, Vt)), At = rt.map(
      (u) => He(u, Vt)
    ), We = L ? Me({
      top: l,
      bottom: a,
      domain: L,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 1,
      opacityBottom: 1
    }) : [], qe = L ? Me({
      top: l,
      bottom: a,
      domain: L,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 0.34,
      opacityBottom: 0.01
    }) : [], Ze = gr(this.humidityColor, 0.3, 0.012, 7), Kt = [];
    if (this.showGrid)
      for (let u = 0; u < 3; u++) {
        const S = l + h * u / 2;
        Kt.push(y`<line class="grid-line" x1=${d} x2=${c} y1=${S} y2=${S} />`);
      }
    const Gt = o ? br(this.start, this.end, wr(t)) : [], Ye = Gt.map((u, S) => {
      const z = this.formatTime(u), st = S === 0 ? "start" : S === Gt.length - 1 ? "end" : "middle";
      return y`<text class="axis-label" x=${$(u)} y=${_} text-anchor=${st}>
        ${z}
      </text>`;
    }), jt = this.curve === "smooth", Xe = this.gapStyle === "dashed", Je = "0.1 5.5", Wt = (u, S, z, st = 2.1, W = !1) => (Xe ? dr(u) : [u.samples]).filter((ot) => ot.length > 1).map((ot) => {
      const q = Ce(ot, g, S);
      return y`<path
            class="series-line"
            d=${Ke(q, jt)}
            style="stroke:${z};stroke-width:${st}${W ? `;stroke-dasharray:${Je}` : ""}"
          />`;
    }), Qe = kt.flatMap(
      (u) => Wt(u, D, `url(#${this.uid}-temp-stroke)`)
    ), qt = (u, S) => u.filter((z) => z.samples.length > 1).map((z) => mr(Ce(z.samples, g, S), a, jt)).join(" "), Zt = qt(kt, D), ti = Zt ? [y`<path d=${Zt} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Yt = this.humidityLineStyle === "dotted", ei = At.flatMap(
      (u) => Wt(
        u,
        A,
        this.humidityColor,
        // Dots read better slightly thicker than an uninterrupted line.
        Yt ? 2.4 : 1.8,
        Yt
      )
    ), Xt = qt(At, A), ii = Xt ? [y`<path d=${Xt} style="fill:url(#${this.uid}-humidity-fill)" />`] : [], Jt = [];
    if (this.showPoints) {
      const u = (S, z, st) => {
        const W = S.filter((q) => q.v !== null);
        if (!W.length) return;
        const ot = Math.max(1, Math.ceil(W.length / 24));
        W.forEach((q, Qt) => {
          if (Qt % ot !== 0 && Qt !== W.length - 1) return;
          const te = q.v;
          Jt.push(
            y`<circle class="point" r="1.9" cx=${g(q.t)} cy=${z(te)} style="stroke:${st(te)}" />`
          );
        });
      };
      D && kt.forEach(
        (S) => u(
          S.samples,
          D,
          (z) => wt(z, this.bands, this.bandColors)
        )
      ), A && At.forEach(
        (S) => u(S.samples, A, () => this.humidityColor)
      );
    }
    const P = [...B].reverse().find((u) => u.v !== null), nt = [...Ct].reverse().find((u) => u.v !== null);
    return y`<svg
      width=${t}
      height=${n}
      viewBox="0 0 ${t} ${n}"
      role="img"
      aria-label=${this.labels.aria}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${We.map(
      (u) => y`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${qe.map(
      (u) => y`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Ze.map(
      (u) => y`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Kt}
      <line class="baseline" x1=${d} x2=${c} y1=${a} y2=${a} />
      ${ii} ${ti} ${ei} ${Qe} ${Jt}
      ${nt && A ? y`<circle
            class="end-halo"
            r="7"
            cx=${g(nt.t)}
            cy=${A(nt.v)}
            style="fill:${this.humidityColor}"
          />
          <circle
            class="end-dot"
            r="3"
            cx=${g(nt.t)}
            cy=${A(nt.v)}
            style="fill:${this.humidityColor}"
          />` : p}
      ${P && D ? y`<circle
            class="end-halo"
            r="7.5"
            cx=${g(P.t)}
            cy=${D(P.v)}
            style="fill:${wt(P.v, this.bands, this.bandColors)}"
          />
          <circle
            class="end-dot"
            r="3.1"
            cx=${g(P.t)}
            cy=${D(P.v)}
            style="fill:${wt(P.v, this.bands, this.bandColors)}"
          />` : p}
      ${Ye}
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
const Te = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Te) && customElements.define(Te, xr);
const Sr = {
  de: {
    general: "Allgemein",
    sensors: "Sensoren",
    typography: "Messwerte (Schrift)",
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
    temperatureSize: "Schriftgröße Temperatur",
    temperatureFont: "Schriftart Temperatur",
    humiditySize: "Schriftgröße Luftfeuchte",
    humidityFont: "Schriftart Luftfeuchte",
    readingSizeHelper: "Wirkt nur auf diesen Messwert. Bei sehr kleinen Kartenhöhen wird die Größe automatisch mitskaliert.",
    readingFontHelper: "Leer lassen für die Schrift des Home-Assistant-Themes. Beispiele: Inter, „Roboto, sans-serif“, var(--ha-font-family-body).",
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
    humidityLine: "Linienart Luftfeuchte",
    humidityLineSolid: "Durchgezogen",
    humidityLineDotted: "Gepunktet",
    humidityLineHelper: "Nur die Feuchtekurve. Die Temperaturkurve bleibt unverändert; Fläche, Endpunkt und Farben gelten weiter.",
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
    typography: "Readings (font)",
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
    temperatureSize: "Temperature font size",
    temperatureFont: "Temperature font family",
    humiditySize: "Humidity font size",
    humidityFont: "Humidity font family",
    readingSizeHelper: "Applies to this reading only. Very small card heights scale the size down automatically.",
    readingFontHelper: 'Leave empty to use the Home Assistant theme font. Examples: Inter, "Roboto, sans-serif", var(--ha-font-family-body).',
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
    humidityLine: "Humidity line style",
    humidityLineSolid: "Solid",
    humidityLineDotted: "Dotted",
    humidityLineHelper: "Humidity curve only. The temperature curve is unchanged; area, end marker and colours still apply.",
    grid: "Grid lines",
    legend: "Legend",
    points: "Data points",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
function Cr(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const t = r.trim().replace(",", ".");
    if (!t || t === "-" || t === ".") return null;
    const e = Number(t);
    return Number.isFinite(e) ? e : null;
  }
  return null;
}
class je extends K {
  constructor() {
    super(...arguments), this._config = { type: `custom:${N}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${N}` } : { type: `custom:${N}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = Rt(this.hass?.locale?.language ?? this.hass?.language);
    return Sr[t];
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
    e.type = this._config.type ?? `custom:${N}`, this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(t) {
    return E(this._config[t]);
  }
  showFlag(t, e) {
    return this.rawBoolean(t) ?? !!O(this._config[e]);
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
    return tt(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = tt(this._config[t]) ?? e;
    return Dt(i) ?? Dt(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: qi(e) });
      }
    });
  }
  renderField(t) {
    return f`<div
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
      ${t.helper ? f`<span class="helper">${t.helper}</span>` : p}
      ${t.warning ? f`<span class="helper warning">${t.warning}</span>` : p}
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
          mode: "box",
          ...t.unit ? { unit_of_measurement: t.unit } : {}
        }
      },
      value: this.numberValue(t.key, t.fallback),
      disabled: t.disabled,
      helper: t.helper,
      revertOnLeave: !0,
      onChange: (e) => {
        const i = Cr(e);
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
  renderSection(t, e, i) {
    const n = this.openSections.has(t);
    return f`<details class="section" ?open=${n} @toggle=${(o) => this.onToggle(t, o)}>
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
      return f`<div class="loading">${this.text.loading}</div>`;
    const t = this.text;
    return f`<div class="editor">
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
    return f`<div class="hint">${t.generalHelper}</div>
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
      fallback: 18
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
    return f`${this.renderField({
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
    return f`<div class="hint">${t.readingSizeHelper}</div>
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
      fallback: 28
    })}
      ${this.renderText({
      key: "humidity_font_family",
      label: t.humidityFont,
      helper: t.readingFontHelper
    })}`;
  }
  renderColors(t) {
    return f`${this.renderNumber({
      key: "temperature_cool_below",
      label: t.coolBelow,
      min: -30,
      max: 50,
      step: 0.5,
      unit: "°C",
      fallback: 19
    })}
      ${this.renderNumber({
      key: "temperature_warm_above",
      label: t.warmAbove,
      min: -20,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 25
    })}
      ${this.renderNumber({
      key: "temperature_hot_above",
      label: t.hotAbove,
      min: -10,
      max: 70,
      step: 0.5,
      unit: "°C",
      fallback: 28
    })}
      ${this.renderColor({ key: "temperature_cool_color", label: t.coolColor, fallback: w.cool })}
      ${this.renderColor({
      key: "temperature_comfort_color",
      label: t.comfortColor,
      fallback: w.comfort
    })}
      ${this.renderColor({ key: "temperature_warm_color", label: t.warmColor, fallback: w.warm })}
      ${this.renderColor({ key: "temperature_hot_color", label: t.hotColor, fallback: w.hot })}
      ${this.renderColor({ key: "humidity_color", label: t.humidityColor, fallback: w.humidity })}
      ${this.renderNumber({
      key: "humidity_low_threshold",
      label: t.humidityLow,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 35
    })}
      ${this.renderNumber({
      key: "humidity_high_threshold",
      label: t.humidityHigh,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 65
    })}
      ${this.renderColor({
      key: "humidity_low_color",
      label: t.humidityLowColor,
      fallback: w.humidityLow
    })}
      ${this.renderColor({
      key: "humidity_high_color",
      label: t.humidityHighColor,
      fallback: w.humidityHigh
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = O(this._config.window_entity);
    return f`${this.renderSwitch({
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
        const o = String(n ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: o.length ? o : void 0 });
      }
    })}`;
  }
  renderMotion(t) {
    const e = this.showFlag("show_motion", "motion_entity");
    return f`${this.renderSwitch({
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
      warning: e && !O(this._config.motion_entity) ? t.missingEntity : void 0
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
    return f`${this.renderSwitch({
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
      warning: e && !O(this._config.climate_entity) ? t.missingEntity : void 0
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
      fallback: w.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: w.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: w.off,
      disabled: !e
    })}`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = e || i, o = [3, 6, 12, 24, 48].map((s) => ({ value: String(s), label: `${s} h` }));
    return f`${this.renderSwitch({
      key: "show_temperature_chart",
      label: t.showTemperatureChart,
      value: e,
      onChange: (s) => this.patch({ show_temperature_chart: s })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: t.showHumidityChart,
      value: i,
      onChange: (s) => this.patch({ show_humidity_chart: s })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: t.hours,
      selector: { select: { mode: "dropdown", options: o } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !n,
      onChange: (s) => {
        const l = Number(s);
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
      onChange: (s) => this.patch({ chart_humidity_line_style: String(s) })
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
      onChange: (s) => this.patch({ chart_gap_mode: String(s) })
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
      value: this.rawBoolean("chart_show_grid") ?? !0,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_legend",
      label: t.legend,
      value: this.rawBoolean("chart_show_legend") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: t.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !n
    })}`;
  }
  static {
    this.styles = Nt`
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
typeof customElements < "u" && !customElements.get(X) && customElements.define(X, je);
const Tt = "#fbbf24", Lt = "#34d399", Le = "var(--rcc-neutral)";
class kr extends K {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new or(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    const e = Ri(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(X);
  }
  getConfigElement() {
    return document.createElement(X);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), n = (c) => i.find(c)?.entity_id, o = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), s = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), a = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), h = n((c) => c.entity_id.startsWith("climate.")), d = { type: `custom:${N}` };
    return o && (d.temperature_entity = o), s && (d.humidity_entity = s), l && (d.window_entity = l), a && (d.motion_entity = a), h && (d.climate_entity = h), d;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(Mt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? Mt(this._config) : 230;
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
    return Ki(t);
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
    const i = this._config, n = this.hass;
    if (!i || !n || !t) return;
    const o = this.historyEntityIds(i);
    if (!o.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const s = Date.now(), l = s - i.chart.hours * 60 * 60 * 1e3;
    try {
      const a = await this.repository.load(n, o, i.chart.hours, s);
      if (this.historyKey !== t) return;
      this._history = a, this._historyWindow = { start: l, end: s }, this.historyFetchedAt = Date.now(), e && this.requestUpdate();
    } catch (a) {
      if (this.historyKey !== t) return;
      this._historyError = a instanceof Error ? a.message : String(a), this._history = {};
    } finally {
      this.historyKey === t && (this._historyLoading = !1);
    }
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? Mt(this._config) : 0;
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
      const i = this._config ? Bi(this._config) : [];
      return i.length ? i.some((n) => e.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return f`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
    const i = t.theme === "auto" ? "theme-auto" : `theme-${t.theme}`, { temperature: n, humidity: o } = t.typography, s = [
      `--rcc-radius:${t.borderRadius}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${o.fontSize}px`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      o.fontFamily ? `--rcc-hum-font:${o.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return f`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"}"
      style="${s}"
      role="group"
      aria-label="${this.cellAriaLabel(t, e)}"
    >
      ${this.renderHeader(t, e)} ${this.renderSetpointRow(t, e)}
      ${this.renderMetrics(t, e)} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? p : this.renderEmpty(e)}
    </div>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${ye(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return f`<div class="empty-state" role="status">
      ${R.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = ye(t, this.hass), n = Xi(this.hass, t), o = Zi(this.hass, t), s = t.motion.enabled && t.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return f`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${s ? f`<div class="subtle">
              ${e.t("quietSince")}
              ${ji(n.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : p}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(n, e) : p}
        ${t.window.enabled ? this.renderWindowBadge(o, e) : p}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? f`<ha-icon .icon=${t.icon}></ha-icon>` : R.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", n = i ? Lt : Le, o = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return f`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${Z(
      i ? Lt : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Z(i ? Lt : "#64748b", i ? 0.45 : 0.22)}"
      title="${o}"
      aria-label="${o}"
      role="img"
      >${R.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", n = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return f`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? Tt : Le};--badge-bg:${Z(
      i ? Tt : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Z(i ? Tt : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? R.windowOpen() : R.windowClosed()}</span
    >`;
  }
  renderMetrics(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return p;
    const i = this.language(), n = be(this.hass, t.temperatureEntity, "temperature"), o = be(this.hass, t.humidityEntity, "humidity");
    return f`<div class="metrics">
      ${t.temperatureEntity ? f`<div
            class="metric temperature"
            role="group"
            aria-label="${e.t("temperature")}: ${this.sensorAria(n, i, t.temperatureDecimals, e)}"
          >
            <span
              class="value"
              style="color:${n.value !== null ? Oi(n.value, t) : "var(--rcc-muted)"}"
              >${n.value !== null ? lt(n.value, i, t.temperatureDecimals) : "–"}</span
            ><span class="unit">${n.unit}</span>
          </div>` : p}
      ${t.humidityEntity ? f`<div
            class="metric humidity"
            role="group"
            aria-label="${e.t("humidity")}: ${this.sensorAria(o, i, t.humidityDecimals, e)}"
          >
            <span class="drop-icon" aria-hidden="true">${R.water()}</span>
            <span
              class="humidity-value"
              style="color:${o.value !== null ? Ii(o.value, t) : "var(--rcc-muted)"}"
              >${o.value !== null ? lt(o.value, i, t.humidityDecimals) : "–"}</span
            ><span class="humidity-unit">${o.unit}</span>
          </div>` : p}
    </div>`;
  }
  sensorAria(t, e, i, n) {
    return t.value === null ? n.t("unavailable") : `${lt(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Target temperature above the actual temperature. The heating state is
   * conveyed only by the colour of the icon in front of it (red = heating,
   * green = idle, grey = off), never by an extra text label.
   */
  renderSetpointRow(t, e) {
    if (!Ue(t)) return p;
    const i = Qi(this.hass, t, e), n = t.thermostat.showSetpoint && i.setpoint !== null, o = t.thermostat.showStatus, s = t.thermostat.showMode && !!i.modeLabel;
    if (!n && !o && !s) return p;
    const l = tr(i, t), a = this.thermostatAria(i), h = this.language(), d = i.setpoint !== null ? `${lt(i.setpoint, h, t.temperatureDecimals)} ${i.unit}` : "";
    return f`<div class="setpoint-row">
      ${o ? f`<span
            class="badge hvac-icon is-${i.colorKey} status-${i.status}"
            style="--badge-color:${l};--badge-bg:${Z(l, 0.14)};--badge-border:${Z(
      l,
      0.34
    )}"
            role="img"
            aria-label="${a}"
            title="${a}"
            >${this.heatingIcon(i)}</span
          >` : p}
      ${n ? f`<span class="badge setpoint" title="${e.t("setpoint")} ${d}">
            <span class="setpoint-label">${e.t("setpoint")}</span>
            <span class="setpoint-reading"
              ><span class="setpoint-value"
                >${lt(
      i.setpoint,
      h,
      t.temperatureDecimals
    )}</span
              ><span class="setpoint-unit">${i.unit}</span></span
            >
          </span>` : p}
      ${s ? f`<span class="mode-label">${i.modeLabel}</span>` : p}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return R.snowflake();
        case "fan":
          return R.fan();
        case "drying":
          return R.water();
        default:
          return R.flame();
      }
    return R.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!Pe(t)) return p;
    const i = t.chart.showTemperature && t.temperatureEntity ? this._history[t.temperatureEntity] : void 0, n = t.chart.showHumidity && t.humidityEntity ? this._history[t.humidityEntity] : void 0, o = this.language(), s = {
      empty: e.t("noHistory"),
      emptyHint: e.t("noHistoryHint"),
      loading: e.t("loadingHistory"),
      error: e.t("historyError"),
      aria: e.chartAria(t.chart.hours),
      temperature: e.t("legendTemperature"),
      humidity: e.t("legendHumidity")
    };
    return f`<div class="chart-slot">
      <room-climate-chart
        .temperature=${i}
        .humidity=${n}
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
        .humidityLineStyle=${t.chart.humidityLineStyle}
        .cornerRadius=${t.borderRadius}
        .language=${o}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${s}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Nt`
    :host {
      display: block;
      --rcc-bg: var(--ha-card-background, var(--card-background-color, #162032));
      --rcc-text: var(--primary-text-color, #e7edf8);
      --rcc-muted: var(--secondary-text-color, #93a4bd);
      --rcc-border: var(--ha-card-border-color, var(--divider-color, rgba(148, 163, 184, 0.25)));
      --rcc-shadow: var(--ha-card-box-shadow, 0 4px 18px rgba(2, 6, 23, 0.22));
      --rcc-neutral: #94a3b8;
      --rcc-radius: 18px;
      /* Modern layered surface: the gradient sits *behind* the theme colour. */
      --rcc-surface: none;
      --rcc-hairline: var(--divider-color, rgba(148, 197, 255, 0.16));
      --rcc-temp-size: 42px;
      --rcc-hum-size: 28px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;
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
      padding: 13px 16px 3px;
      overflow: hidden;
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-border);
      border-radius: var(--rcc-radius);
      box-shadow: var(--rcc-shadow);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark {
      --rcc-bg: #101b2c;
      --rcc-surface:
        radial-gradient(120% 92% at 0% 0%, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 58%),
        radial-gradient(110% 85% at 100% 0%, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0) 62%),
        linear-gradient(158deg, #1c2d49 0%, #152238 52%, #0e1828 100%);
      --rcc-text: #eaf0fb;
      --rcc-muted: #93a7c2;
      --rcc-border: rgba(148, 197, 255, 0.16);
      --rcc-hairline: rgba(148, 197, 255, 0.14);
      --rcc-shadow:
        0 22px 46px -26px rgba(2, 6, 23, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      --rcc-neutral: #94a3b8;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface:
        radial-gradient(120% 90% at 0% 0%, rgba(56, 189, 248, 0.1) 0%, rgba(56, 189, 248, 0) 56%),
        linear-gradient(162deg, #ffffff 0%, #f8fafc 58%, #eef3fa 100%);
      --rcc-text: #0f172a;
      --rcc-muted: #64748b;
      --rcc-border: rgba(15, 23, 42, 0.08);
      --rcc-hairline: rgba(15, 23, 42, 0.08);
      --rcc-shadow: 0 18px 38px -26px rgba(15, 23, 42, 0.38), inset 0 1px 0 #ffffff;
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
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1.25;
      letter-spacing: -0.015em;
      color: var(--rcc-text);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-wrap: anywhere;
    }
    .subtle {
      margin-top: 2px;
      font-size: 10.5px;
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
      gap: 6px;
      flex: none;
    }
    /*
     * Shared badge surface. Square badges (window, motion, heating mode) and the
     * wider setpoint badge use the same radius, fill, ring and inner highlight.
     */
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      box-sizing: border-box;
      height: 30px;
      min-width: 30px;
      border-radius: 11px;
      color: var(--badge-color, var(--rcc-neutral));
      background: var(--badge-bg, rgba(100, 116, 139, 0.12));
      border: 1px solid var(--badge-border, var(--rcc-border));
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      transition:
        color 0.18s ease,
        background-color 0.18s ease,
        border-color 0.18s ease,
        box-shadow 0.18s ease;
    }
    .badge.window,
    .badge.motion,
    .badge.hvac-icon {
      width: 30px;
      padding: 0;
    }
    .badge.window.is-open,
    .badge.motion.is-active,
    .badge.hvac-icon.is-heating {
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 8px 18px -12px var(--badge-color);
    }
    .badge .icon {
      width: 17px;
      height: 17px;
    }

    .metrics {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      margin-top: 8px;
      min-height: 0;
    }
    .metric {
      display: flex;
      align-items: baseline;
      min-width: 0;
    }
    /*
     * Temperature and humidity are sized independently. Unit and drop icon use
     * em units, so they always scale with their own value.
     */
    .temperature {
      font-size: var(--rcc-temp-size, 42px);
      font-family: var(--rcc-temp-font, inherit);
    }
    .temperature .value {
      font-size: 1em;
      font-weight: 600;
      line-height: 0.94;
      letter-spacing: -0.035em;
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      transition: color 0.2s ease;
    }
    .temperature .unit {
      margin-left: 0.16em;
      font-size: 0.34em;
      font-weight: 400;
      letter-spacing: 0;
      color: var(--rcc-muted);
    }
    .humidity {
      gap: 0.28em;
      align-items: baseline;
      font-size: var(--rcc-hum-size, 28px);
      font-family: var(--rcc-hum-font, inherit);
    }
    .drop-icon {
      display: inline-flex;
      align-self: center;
      color: var(--rcc-muted);
      opacity: 0.8;
    }
    .drop-icon .icon {
      width: 0.66em;
      height: 0.66em;
    }
    .humidity-value {
      font-size: 1em;
      font-weight: 500;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.025em;
      font-feature-settings: 'tnum' 1;
    }
    .humidity-unit {
      font-size: 0.46em;
      font-weight: 400;
      color: var(--rcc-muted);
      margin-left: -0.1em;
    }

    .setpoint-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
      min-height: 30px;
    }
    .hvac-icon {
      flex: none;
    }
    .hvac-icon .icon {
      width: 17px;
      height: 17px;
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
    /*
     * Everything inside the setpoint badge is centred on the badge's vertical
     * axis: label, value and unit share one optical line. Baseline alignment on
     * the badge itself would push the flex line to the top edge of the fixed
     * 30 px box, which made the value sit right under the upper border.
     */
    .setpoint {
      padding: 0 11px;
      align-items: center;
      min-width: 0;
      font-variant-numeric: tabular-nums;
      color: var(--rcc-muted);
    }
    .setpoint-label {
      font-size: 9.5px;
      font-weight: 600;
      line-height: 1;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      opacity: 0.85;
    }
    /*
     * Value and unit are centred on their own optical middle instead of sharing
     * a baseline. On a shared baseline the small degree-Celsius unit (10.9 px)
     * sits about 2 px lower than the 17 px number, which reads as slipped down.
     */
    .setpoint-reading {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      min-width: 0;
    }
    .setpoint-value {
      font-size: 1.0625rem;
      font-weight: 500;
      line-height: 1;
      color: var(--rcc-text);
      letter-spacing: -0.01em;
    }
    .setpoint-unit {
      font-size: 0.68rem;
      font-weight: 400;
      line-height: 1;
    }
    .mode-label {
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      height: 30px;
      padding: 0 10px;
      border-radius: 11px;
      font-size: 10px;
      color: var(--rcc-muted);
      background: rgba(100, 116, 139, 0.1);
      border: 1px solid var(--rcc-border);
      white-space: nowrap;
    }

    .chart-slot {
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 9px -16px 0;
      min-height: 0;
    }
    /* Hairline divider like the reference dashboard card (inset, not full width). */
    .chart-slot::before {
      content: '';
      position: absolute;
      top: 0;
      left: 16px;
      right: 16px;
      height: 1px;
      background: var(--rcc-hairline);
      pointer-events: none;
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
      margin-top: 4px;
    }
    .density-xs .temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-xs .humidity {
      font-size: calc(var(--rcc-hum-size, 28px) * 0.72);
    }
    .density-xs .setpoint-row {
      margin-top: 5px;
      gap: 5px;
      min-height: 24px;
    }
    .density-xs .badge {
      height: 24px;
      min-width: 24px;
      border-radius: 9px;
    }
    .density-xs .badge.window,
    .density-xs .badge.motion,
    .density-xs .badge.hvac-icon {
      width: 24px;
    }
    .density-xs .badge .icon,
    .density-xs .hvac-icon .icon {
      width: 14px;
      height: 14px;
    }
    .density-xs .setpoint {
      padding: 0 9px;
    }
    .density-xs .setpoint-label {
      font-size: 9px;
    }
    .density-xs .setpoint-value {
      font-size: 0.9rem;
    }
    .density-xs .mode-label {
      height: 24px;
      padding: 0 8px;
      border-radius: 9px;
    }
    .density-xs .subtle {
      display: none;
    }
    .density-sm .temperature {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
    }
    .density-sm .humidity {
      font-size: calc(var(--rcc-hum-size, 28px) * 0.88);
    }
    .density-xs .badge {
      width: 24px;
      height: 24px;
      border-radius: 8px;
    }
    .density-xs .badge .icon {
      width: 14px;
      height: 14px;
    }
    .density-xs .name {
      font-size: 0.95rem;
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
  `%c ROOM-CLIMATE-CARD %c v${oi} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(N) || customElements.define(N, kr);
customElements.get(X) || customElements.define(X, je);
const ze = window.customCards = window.customCards ?? [];
ze.some((r) => r.type === N) || ze.push({
  type: N,
  name: ni,
  description: si,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  N as CARD_TAG,
  oi as CARD_VERSION,
  kr as RoomClimateCard,
  je as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
