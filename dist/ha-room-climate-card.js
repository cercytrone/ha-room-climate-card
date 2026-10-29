const R = "room-climate-card", Z = "room-climate-card-editor", Jt = "Room Climate Card", Qt = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", ei = "1.2.3";
const ue = globalThis, Ee = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Me = /* @__PURE__ */ Symbol(), Je = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Me) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ee && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = Je.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Je.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ti = (r) => new Et(typeof r == "string" ? r : r + "", void 0, Me), He = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Et(t, r, Me);
}, ii = (r, e) => {
  if (Ee) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = ue.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, Qe = Ee ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ti(t);
})(r) : r;
const { is: ri, defineProperty: ni, getOwnPropertyDescriptor: si, getOwnPropertyNames: oi, getOwnPropertySymbols: ai, getPrototypeOf: li } = Object, fe = globalThis, et = fe.trustedTypes, hi = et ? et.emptyScript : "", ci = fe.reactiveElementPolyfillSupport, se = (r, e) => r, Ce = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? hi : null;
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
} }, Mt = (r, e) => !ri(r, e), tt = { attribute: !0, type: String, converter: Ce, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), fe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let q = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = tt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && ni(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = si(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: n, set(o) {
      const l = n?.call(this);
      s?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(se("elementProperties"))) return;
    const e = li(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(se("properties"))) {
      const t = this.properties, i = [...oi(t), ...ai(t)];
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
      for (const n of i) t.unshift(Qe(n));
    } else e !== void 0 && t.push(Qe(e));
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
    return ii(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Ce).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ce;
      this._$Em = n;
      const l = o.fromAttribute(t, s.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (s = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Mt)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: o } = s, l = this[n];
        o !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
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
q.elementStyles = [], q.shadowRootOptions = { mode: "open" }, q[se("elementProperties")] = /* @__PURE__ */ new Map(), q[se("finalized")] = /* @__PURE__ */ new Map(), ci?.({ ReactiveElement: q }), (fe.reactiveElementVersions ??= []).push("2.1.2");
const Te = globalThis, it = (r) => r, pe = Te.trustedTypes, rt = pe ? pe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ht = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + F, di = `<${Tt}>`, V = document, le = () => V.createComment(""), he = (r) => r === null || typeof r != "object" && typeof r != "function", ze = Array.isArray, ui = (r) => ze(r) || typeof r?.[Symbol.iterator] == "function", ve = `[ 	
\f\r]`, ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, nt = /-->/g, st = />/g, I = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, at = /"/g, zt = /^(?:script|style|textarea|title)$/i, Lt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = Lt(1), f = Lt(2), Y = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), lt = /* @__PURE__ */ new WeakMap(), P = V.createTreeWalker(V, 129);
function Rt(r, e) {
  if (!ze(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(e) : e;
}
const mi = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ie;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let h, d, c = -1, w = 0;
    for (; w < a.length && (o.lastIndex = w, d = o.exec(a), d !== null); ) w = o.lastIndex, o === ie ? d[1] === "!--" ? o = nt : d[1] !== void 0 ? o = st : d[2] !== void 0 ? (zt.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = I) : d[3] !== void 0 && (o = I) : o === I ? d[0] === ">" ? (o = n ?? ie, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? I : d[3] === '"' ? at : ot) : o === at || o === ot ? o = I : o === nt || o === st ? o = ie : (o = I, n = void 0);
    const g = o === I && r[l + 1].startsWith("/>") ? " " : "";
    s += o === ie ? a + di : c >= 0 ? (i.push(h), a.slice(0, c) + Ht + a.slice(c) + F + g) : a + F + (c === -2 ? l : g);
  }
  return [Rt(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ce {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [h, d] = mi(e, t);
    if (this.el = ce.createElement(h, i), P.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = P.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Ht)) {
          const w = d[o++], g = n.getAttribute(c).split(F), b = /([.?@])?(.*)/.exec(w);
          a.push({ type: 1, index: s, name: b[2], strings: g, ctor: b[1] === "." ? fi : b[1] === "?" ? gi : b[1] === "@" ? yi : ge }), n.removeAttribute(c);
        } else c.startsWith(F) && (a.push({ type: 6, index: s }), n.removeAttribute(c));
        if (zt.test(n.tagName)) {
          const c = n.textContent.split(F), w = c.length - 1;
          if (w > 0) {
            n.textContent = pe ? pe.emptyScript : "";
            for (let g = 0; g < w; g++) n.append(c[g], le()), P.nextNode(), a.push({ type: 2, index: ++s });
            n.append(c[w], le());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Tt) a.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(F, c + 1)) !== -1; ) a.push({ type: 7, index: s }), c += F.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = V.createElement("template");
    return i.innerHTML = e, i;
  }
}
function X(r, e, t = r, i) {
  if (e === Y) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = he(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = X(r, n._$AS(r, e.values), n, i)), e;
}
class pi {
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
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? V).importNode(t, !0);
    P.currentNode = n;
    let s = P.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new de(s, s.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (h = new bi(s, this, e)), this._$AV.push(h), a = i[++l];
      }
      o !== a?.index && (s = P.nextNode(), o++);
    }
    return P.currentNode = V, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class de {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = X(this, e, t), he(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== Y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ui(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && he(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ce.createElement(Rt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const s = new pi(n, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = lt.get(e.strings);
    return t === void 0 && lt.set(e.strings, t = new ce(e)), t;
  }
  k(e) {
    ze(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new de(this.O(le()), this.O(le()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = it(e).nextSibling;
      it(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ge {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = X(this, e, t, 0), o = !he(e) || e !== this._$AH && e !== Y, o && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = s[0], a = 0; a < s.length - 1; a++) h = X(this, l[i + a], t, a), h === Y && (h = this._$AH[a]), o ||= !he(h) || h !== this._$AH[a], h === m ? e = m : e !== m && (e += (h ?? "") + s[a + 1]), this._$AH[a] = h;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class fi extends ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class gi extends ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class yi extends ge {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = X(this, e, t, 0) ?? m) === Y) return;
    const i = this._$AH, n = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class bi {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    X(this, e);
  }
}
const wi = Te.litHtmlPolyfillSupport;
wi?.(ce, de), (Te.litHtmlVersions ??= []).push("3.3.3");
const _i = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = n = new de(e.insertBefore(le(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
const Le = globalThis;
class U extends q {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _i(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Y;
  }
}
U._$litElement$ = !0, U.finalized = !0, Le.litElementHydrateSupport?.({ LitElement: U });
const vi = Le.litElementPolyfillSupport;
vi?.({ LitElement: U });
(Le.litElementVersions ??= []).push("4.2.2");
const $i = ["on", "open", "opening", "tilted", "gekippt"], xi = ["off", "closed", "closing"], v = {
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
}, ht = {
  temperature: 42,
  humidity: 28
}, ct = { min: 14, max: 96 }, Si = /^[a-z0-9_]+\.[a-z0-9_]+$/, Ci = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function ki(r) {
  return typeof r == "object" && r !== null;
}
function L(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return Si.test(e) ? e : void 0;
}
function J(r) {
  if (typeof r != "string") return;
  const e = r.trim();
  return e.length ? e : void 0;
}
function E(r, e, t, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(t, Math.max(e, n)) : i;
}
function A(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function z(r, e) {
  const t = J(r);
  return t && t.length <= 64 ? t : e;
}
function dt(r) {
  const e = J(r);
  if (!(!e || e.length > 120) && Ci.test(e))
    return e;
}
function ut(r, e) {
  return Math.round(
    E(r, ct.min, ct.max, e)
  );
}
function Ai(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
function Ei(r) {
  const e = ki(r) ? r : {}, t = L(e.temperature_entity), i = L(e.humidity_entity), n = L(e.window_entity), s = L(e.motion_entity), o = L(e.climate_entity), l = L(e.name_entity), a = Mi(e), h = Ai(e.window_open_states), d = A(e.show_window) ?? !!n, c = A(e.show_motion) ?? !!s, w = A(e.show_thermostat) ?? !!o, g = A(e.show_temperature_chart) ?? !!t, b = A(e.show_humidity_chart) ?? !!i, x = e.height, y = x === "auto" || x === void 0 || x === null || x === 0 ? null : E(x, 120, 2e3, 0) || null, S = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", _ = e.chart_curve === "linear" ? "linear" : "smooth", D = e.chart_gap_mode === "break" ? "break" : "connect", K = e.chart_gap_style === "dashed" ? "dashed" : "solid", T = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid";
  return {
    raw: e,
    name: J(e.name),
    nameEntity: l,
    icon: J(e.icon) ?? "mdi:home-thermometer-outline",
    height: y,
    borderRadius: E(e.border_radius, 0, 40, 18),
    theme: S,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(E(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(E(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: ut(
          e.temperature_font_size,
          ht.temperature
        ),
        fontFamily: dt(e.temperature_font_family)
      },
      humidity: {
        fontSize: ut(e.humidity_font_size, ht.humidity),
        fontFamily: dt(e.humidity_font_family)
      }
    },
    bands: a,
    bandColors: {
      cool: z(e.temperature_cool_color, v.cool),
      comfort: z(e.temperature_comfort_color, v.comfort),
      warm: z(e.temperature_warm_color, v.warm),
      hot: z(e.temperature_hot_color, v.hot)
    },
    humidity: {
      color: z(e.humidity_color, v.humidity),
      lowThreshold: E(e.humidity_low_threshold, 0, 100, 35),
      highThreshold: E(e.humidity_high_threshold, 0, 100, 65),
      lowColor: z(e.humidity_low_color, v.humidityLow),
      highColor: z(e.humidity_high_color, v.humidityHigh)
    },
    window: {
      enabled: d && !!n,
      entity: n,
      openStates: h.length ? h : [...$i]
    },
    motion: {
      enabled: c && !!s,
      entity: s,
      showLastChanged: A(e.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: w && !!o,
      entity: o,
      showSetpoint: A(e.show_setpoint) ?? !0,
      showStatus: A(e.show_hvac_status) ?? !0,
      showMode: A(e.show_hvac_mode) ?? !1,
      heatingColor: z(e.heating_color, v.heating),
      idleColor: z(e.heating_idle_color, v.idle),
      offColor: z(e.heating_off_color, v.off)
    },
    chart: {
      showTemperature: g && !!t,
      showHumidity: b && !!i,
      hours: Math.round(E(e.chart_hours, 1, 168, 6)),
      height: Math.round(E(e.chart_height, 30, 400, 84)),
      curve: _,
      gapMode: D,
      maxGapMinutes: Math.round(E(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: K,
      humidityLineStyle: T,
      showLegend: A(e.chart_show_legend) ?? !1,
      showPoints: A(e.chart_show_points) ?? !1,
      showGrid: A(e.chart_show_grid) ?? !0
    }
  };
}
function Mi(r) {
  const e = [
    E(r.temperature_cool_below, -50, 80, 19),
    E(r.temperature_warm_above, -50, 80, 25),
    E(r.temperature_hot_above, -50, 80, 28)
  ].sort((t, i) => t - i);
  return { cool: e[0], warm: e[1], hot: e[2] };
}
function Hi(r, e) {
  return r < e.cool ? "cool" : r < e.warm ? "comfort" : r < e.hot ? "warm" : "hot";
}
function Ti(r, e) {
  return e.bandColors[Hi(r, e.bands)];
}
function zi(r, e) {
  const { lowThreshold: t, highThreshold: i } = e.humidity;
  return t > 0 && r < t ? "low" : i > 0 && r > i ? "high" : "normal";
}
function Li(r, e) {
  switch (zi(r, e)) {
    case "low":
      return e.humidity.lowColor;
    case "high":
      return e.humidity.highColor;
    default:
      return e.humidity.color;
  }
}
function Ri(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function Dt(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Ft(r) {
  return r.thermostat.enabled;
}
function $e(r) {
  if (r.height) return r.height;
  const e = Dt(r) ? r.chart.height + 26 : 0, t = Ft(r) ? 38 : 0, i = Math.max(r.typography.temperature.fontSize, r.typography.humidity.fontSize);
  return 62 + Math.round(i * 0.98) + e + t;
}
function mt(r, e) {
  if (r.name) return r.name;
  if (r.nameEntity) {
    const i = e?.states[r.nameEntity]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  if (r.temperatureEntity) {
    const i = e?.states[r.temperatureEntity]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  return "Raumklima";
}
const Di = {
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
}, Fi = {
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
}, Oi = Di;
function ke(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Ni(r) {
  const e = ke(r) === "de" ? Oi : Fi;
  return {
    language: ke(r),
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
function oe(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
const pt = /* @__PURE__ */ new Map();
function Bi(r, e) {
  const t = `${r}|${e}`;
  let i = pt.get(t);
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
    pt.set(t, i);
  }
  return i;
}
function re(r, e, t) {
  return Number.isFinite(r) ? Bi(e || "en", oe(Math.round(t), 0, 3)).format(r) : "–";
}
function Re(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function Ii(r, e, t) {
  const i = Math.max(0, e - r), n = Math.floor(i / 6e4);
  if (n < 1) return t.justNow;
  if (n < 60) return `${n} ${t.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${t.hours}` : `${Math.floor(s / 24)} ${t.days}`;
}
function Pi(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Ae(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function Ui(r) {
  return `#${r.map((e) => oe(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function W(r, e) {
  const t = Ae(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${oe(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${oe(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(oe(e, 0, 1) * 100)}%, transparent)`;
}
function ye(r) {
  return r === "unavailable" || r === "unknown";
}
function ft(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const n = r?.states[e];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (ye(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const o = Re(n.state);
  return o === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: o, status: "ok", unit: s };
}
function Vi(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (ye(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return e.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : xi.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Ki = ["on", "detected", "motion", "occupied", "active"];
function Gi(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (ye(n)) return { status: "unavailable", entity: i, rawState: n };
  const o = n.trim().toLowerCase();
  if (Ki.includes(o))
    return { status: "active", entity: i, rawState: n };
  const l = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (l.sinceMs = s), l;
}
const ji = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Wi(r, e, t) {
  const i = e.thermostat.entity, n = Pi(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const s = r?.states[i];
  if (!s)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const o = s.state?.toLowerCase(), l = s.attributes?.hvac_action, a = typeof l == "string" ? l.toLowerCase() : void 0, h = s.attributes?.temperature, d = typeof h == "number" ? h : typeof h == "string" ? Re(h) : null, c = {
    entity: s,
    action: a,
    setpoint: d,
    unit: n,
    mode: o,
    modeLabel: o ? t.mode(o) : void 0
  };
  return ye(s.state ?? "") ? { ...c, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : o === "off" ? { ...c, status: "off", label: t.t("off"), colorKey: "off" } : a === "heating" ? { ...c, status: "heating", label: t.t("heating"), colorKey: "heating" } : a === "idle" ? { ...c, status: "idle", label: t.t("idle"), colorKey: "idle" } : a === "off" ? { ...c, status: "off", label: t.t("off"), colorKey: "off" } : a && !ji.includes(a) ? { ...c, status: "action", label: t.action(a), colorKey: "idle" } : a ? { ...c, status: "action", label: t.action(a), colorKey: "idle" } : { ...c, status: "unknown", label: t.t("statusUnknown"), colorKey: "unknown" };
}
function qi(r, e) {
  switch (r.colorKey) {
    case "heating":
      return e.thermostat.heatingColor;
    case "idle":
      return e.thermostat.idleColor;
    case "off":
      return e.thermostat.offColor;
    default:
      return "var(--rcc-neutral, #94a3b8)";
  }
}
function ae(r) {
  return typeof r == "object" && r !== null;
}
function Zi(r) {
  if (!ae(r)) return;
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
function Yi(r) {
  if (ae(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function gt(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const n = Zi(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = Yi(i), o = Re(s);
    e.push({ t: n, v: o });
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
function yt(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = ae(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in t)) continue;
      const o = gt(i);
      t[s] = Xi(t[s], o);
    }
    return t;
  }
  if (ae(r))
    for (const i of e) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : ae(n) && Array.isArray(n.data) ? n.data : n;
      t[i] = gt(s);
    }
  return t;
}
function Xi(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((n, s) => n.t - s.t), i = [];
  for (const n of t) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Ji(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), n = new Date(t.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const a = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = yt(a, e);
      return Object.values(h).some((d) => d.length > 0), h;
    } catch (a) {
      if (!r.callApi) throw a;
    }
  if (typeof r.callApi != "function") return {};
  const o = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((a) => encodeURIComponent(a)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, l = await r.callApi("GET", o);
  return yt(l, e);
}
function Qi(r, e) {
  return `${[...r].sort().join("|")}@${e}`;
}
class er {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, n = Date.now()) {
    const s = Qi(t, i), o = this.cache.get(s);
    if (o && n - o.fetchedAt < 12e4)
      return o.data;
    const l = this.inflight.get(s);
    if (l) return l;
    const a = Ji(e, t, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((h) => {
      if (this.cache.set(s, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const d = this.cache.keys().next();
        d.done || this.cache.delete(d.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(s);
    });
    return this.inflight.set(s, a), a;
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
function ne(r, e) {
  const [t, i] = r, [n, s] = e, o = i - t;
  if (!Number.isFinite(o) || o === 0) {
    const l = (n + s) / 2;
    return () => l;
  }
  return (l) => n + (l - t) / o * (s - n);
}
function bt(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function wt(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = t;
  let s = r, o = e;
  if (o - s < i) {
    const a = (o + s) / 2;
    s = a - i / 2, o = a + i / 2;
  }
  const l = (o - s) * n;
  return [s - l, o + l];
}
function tr(r) {
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
function ir(r, e, t = {}) {
  const i = tr(r), n = i > 0 ? i * 2.5 : 0, s = t.minMs ?? Math.max(e / 40, 300 * 1e3), o = t.maxMs ?? Math.max(s, e / 3);
  return Math.min(o, Math.max(n, s));
}
const rr = 8;
function nr(r, e, t, i) {
  const n = t.t - e.t, s = e.v, o = t.v, l = Math.min(
    rr,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let a = 1; a < l; a++) {
    const h = a / l;
    r.samples.push({
      t: Math.round(e.t + n * h),
      v: s + (o - s) * h
    }), r.bridged.push(!0);
  }
}
function _t(r, e) {
  const { rangeMs: t, start: i, end: n } = e, s = e.gapMode ?? "connect", o = ir(r, t), l = e.maxGapMs ?? t / 4, a = [];
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
    if (s === "connect" && (!(c !== null) || D <= l)) {
      nr(h, d, _, o), h.samples.push(_), h.bridged.push(!0), d = _, c = null;
      continue;
    }
    b(), h = { samples: [_], bridged: [] }, d = _;
  }
  if (b(), !a.length) return a;
  const x = a[0];
  if (!w && i !== void 0 && x.samples[0].t > i && (x.samples.unshift({ t: i, v: x.samples[0].v }), x.bridged.unshift(!1)), g)
    return a;
  const y = a[a.length - 1], S = y.samples[y.samples.length - 1];
  return n !== void 0 && S.t < n && (y.samples.push({ t: n, v: S.v }), y.bridged.push(!1)), a;
}
function vt(r, e, t) {
  if (!r || !r.length) return [];
  const i = [...r].sort((s, o) => s.t - o.t), n = [];
  for (const s of i) {
    if (!Number.isFinite(s.t) || e !== void 0 && s.t < e || t !== void 0 && s.t > t) continue;
    const o = s.v === null || !Number.isFinite(s.v) ? null : s.v, l = n[n.length - 1];
    if (l && l.t === s.t) {
      n[n.length - 1] = { t: s.t, v: o };
      continue;
    }
    n.push({ t: s.t, v: o });
  }
  return n;
}
function sr(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function $t(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function Ot(r) {
  if (!r.length) return "";
  let e = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${$(r[t].x)} ${$(r[t].y)}`;
  return e;
}
function or(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${$(r[0].x)} ${$(r[0].y)}`;
  if (r.length === 2) return Ot(r);
  const e = r.length, t = [], i = [];
  for (let o = 0; o < e - 1; o++)
    t[o] = r[o + 1].x - r[o].x, i[o] = t[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / t[o];
  const n = new Array(e).fill(0);
  n[0] = i[0], n[e - 1] = i[e - 2];
  for (let o = 1; o < e - 1; o++)
    i[o - 1] * i[o] <= 0 ? n[o] = 0 : n[o] = (i[o - 1] + i[o]) / 2;
  for (let o = 0; o < e - 1; o++) {
    if (i[o] === 0) {
      n[o] = 0, n[o + 1] = 0;
      continue;
    }
    const l = n[o] / i[o], a = n[o + 1] / i[o], h = l * l + a * a;
    if (h > 9) {
      const d = 3 / Math.sqrt(h);
      n[o] = d * l * i[o], n[o + 1] = d * a * i[o];
    }
  }
  let s = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let o = 0; o < e - 1; o++) {
    const l = r[o].x + t[o] / 3, a = r[o].y + n[o] * t[o] / 3, h = r[o + 1].x - t[o] / 3, d = r[o + 1].y - n[o + 1] * t[o] / 3;
    s += ` C ${$(l)} ${$(a)}, ${$(h)} ${$(d)}, ${$(
      r[o + 1].x
    )} ${$(r[o + 1].y)}`;
  }
  return s;
}
function Nt(r, e) {
  return e ? or(r) : Ot(r);
}
function ar(r, e, t) {
  if (!r.length) return "";
  const i = Nt(r, t), n = r[0], s = r[r.length - 1];
  return `${i} L ${$(s.x)} ${$(e)} L ${$(n.x)} ${$(e)} Z`;
}
function me(r, e, t) {
  return r < e.cool ? t.cool : r < e.warm ? t.comfort : r < e.hot ? t.warm : t.hot;
}
function xt(r) {
  const { top: e, bottom: t, domain: i, thresholds: n, colors: s } = r, o = r.opacityTop ?? 1, l = r.opacityBottom ?? o, a = r.blendPx ?? 3, h = Math.max(1, t - e), d = ne(i, [t, e]), c = (y) => Math.min(1, Math.max(0, (y - e) / h)), w = (y) => {
    const S = Math.min(1, Math.max(0, (y - e) / h));
    return o + (l - o) * S;
  }, g = (y) => me(y, n, s), b = [
    { offset: 0, color: g(i[1]), opacity: w(e) }
  ];
  let x = g(i[1]);
  for (const y of [n.hot, n.warm, n.cool]) {
    const S = d(y);
    if (!Number.isFinite(S) || S <= e || S >= t) continue;
    const _ = g(y - 1e-6);
    _ !== x && (b.push({
      offset: c(Math.max(e, S - a / 2)),
      color: x,
      opacity: w(S - a / 2)
    }), b.push({
      offset: c(Math.min(t, S + a / 2)),
      color: _,
      opacity: w(S + a / 2)
    }), x = _);
  }
  b.push({ offset: 1, color: g(i[0]), opacity: w(t) });
  for (let y = 1; y < b.length; y++)
    b[y].offset <= b[y - 1].offset && (b[y].offset = Math.min(1, b[y - 1].offset + 1e-3));
  return b;
}
function lr(r, e, t) {
  return [
    { offset: 0, color: r, opacity: e },
    { offset: 1, color: r, opacity: t }
  ];
}
function hr(r, e, t) {
  if (!(e > r) || t < 2) return [];
  const i = [];
  for (let n = 0; n < t; n++)
    i.push(r + (e - r) * n / (t - 1));
  return i;
}
function cr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function St(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const n = Math.ceil(t.length / e), s = [], o = [];
  let l = 0;
  for (let h = 0; h < t.length; h += n) {
    if (!s.length) {
      s.push(t[h]), l = h;
      continue;
    }
    s.push(t[h]), o.push(i.slice(l + 1, h + 1).some(Boolean)), l = h;
  }
  const a = t.length - 1;
  return l !== a && (s.push(t[a]), o.push(i.slice(l + 1, a + 1).some(Boolean))), { samples: s, bridged: o };
}
const dr = 320, ur = 84;
let mr = 0;
class pr extends U {
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
    }, this.uid = `rcc-chart-${++mr}`, this.width = 0, this.height = 0;
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
    this.styles = He`
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
    super.connectedCallback(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver((e) => {
      const t = e[0];
      if (!t) return;
      const i = t.contentRect;
      this.applySize(i.width, i.height);
    }), this.resizeObserver.observe(this)), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => this.measure()) : this.measure();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0;
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
      width: this.width > 20 ? this.width : dr,
      height: this.height > 20 ? this.height : ur
    };
  }
  stateView(e, t, i) {
    return p`<div class="wrap">
      <div class="state" role="status">
        ${e}
        <span class="state-title">${t}</span>
        ${i ? p`<span class="state-hint">${i}</span>` : m}
      </div>
    </div>`;
  }
  get hasData() {
    return !!(this.temperature?.some((e) => e.v !== null) || this.humidity?.some((e) => e.v !== null));
  }
  render() {
    const { width: e, height: t } = this.chartSize;
    if (e < 40 || t < 34) return m;
    const i = f`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = f`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.error && !this.hasData ? this.stateView(i, this.labels.error) : this.hasData ? p`<div class="wrap">${this.renderLegend(t)}${this.renderChart(e, t)}</div>` : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
  }
  /**
   * Legend with series names only – the current values are already the two big
   * readings above the chart, so repeating them here was redundant.
   */
  renderLegend(e) {
    if (!this.showLegend || e < 96) return m;
    const t = [];
    return this.temperature?.length && t.push(
      p`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.bandColors.comfort}"></span
          >${this.labels.temperature}</span
        >`
    ), this.humidity?.length && t.push(
      p`<span class="legend-item"
          ><span class="legend-dot" style="background:${this.humidityColor}"></span
          >${this.labels.humidity}</span
        >`
    ), p`<div class="legend">${t}</div>`;
  }
  renderChart(e, t) {
    const i = this.showLegend && t >= 96 ? 14 : 0, n = Math.max(20, t - i), s = n >= 62, o = s ? 16 : 2, l = 5, a = n - o, h = Math.max(6, a - l), d = 1, c = e - 1, w = Math.max(1, this.end - this.start), g = ne([this.start, this.end], [d, c]), b = s ? Math.min(Math.max(this.cornerRadius, 0), 24) + 2 : 0, x = ne([this.start, this.end], [d + b, c - b]), y = n - 5, S = (this.temperature ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), _ = (this.humidity ?? []).map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), D = bt(S), K = bt(_), T = D ? wt(D[0], D[1], { minSpan: 0.8, padding: 0.14 }) : null, be = K ? wt(K[0], K[1], { minSpan: 6, padding: 0.16 }) : null, O = T ? ne(T, [a, l]) : null, N = be ? ne(be, [a, l]) : null, De = vt(this.temperature, this.start, this.end), Fe = vt(this.humidity, this.start, this.end), Oe = {
      rangeMs: w,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Ne = T ? _t(De, Oe) : [], Be = be ? _t(Fe, Oe) : [], It = Math.max(1, Ne.length + Be.length), Ie = Math.max(60, Math.floor(1200 / It)), we = Ne.map((u) => St(u, Ie)), _e = Be.map(
      (u) => St(u, Ie)
    ), Pt = T ? xt({
      top: l,
      bottom: a,
      domain: T,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 1,
      opacityBottom: 1
    }) : [], Ut = T ? xt({
      top: l,
      bottom: a,
      domain: T,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 0.34,
      opacityBottom: 0.01
    }) : [], Vt = lr(this.humidityColor, 0.3, 0.01), Pe = [];
    if (this.showGrid)
      for (let u = 0; u < 3; u++) {
        const C = l + h * u / 2;
        Pe.push(f`<line class="grid-line" x1=${d} x2=${c} y1=${C} y2=${C} />`);
      }
    const Ue = s ? hr(this.start, this.end, cr(e)) : [], Kt = Ue.map((u, C) => {
      const M = this.formatTime(u), ee = C === 0 ? "start" : C === Ue.length - 1 ? "end" : "middle";
      return f`<text class="axis-label" x=${x(u)} y=${y} text-anchor=${ee}>
        ${M}
      </text>`;
    }), Ve = this.curve === "smooth", Gt = this.gapStyle === "dashed", jt = "0.1 5.5", Ke = (u, C, M, ee = 2.1, G = !1) => (Gt ? sr(u) : [u.samples]).filter((te) => te.length > 1).map((te) => {
      const j = $t(te, g, C);
      return f`<path
            class="series-line"
            d=${Nt(j, Ve)}
            style="stroke:${M};stroke-width:${ee}${G ? `;stroke-dasharray:${jt}` : ""}"
          />`;
    }), Wt = we.flatMap(
      (u) => Ke(u, O, `url(#${this.uid}-temp-stroke)`)
    ), Ge = (u, C) => u.filter((M) => M.samples.length > 1).map((M) => ar($t(M.samples, g, C), a, Ve)).join(" "), je = Ge(we, O), qt = je ? [f`<path d=${je} style="fill:url(#${this.uid}-temp-fill)" />`] : [], We = this.humidityLineStyle === "dotted", Zt = _e.flatMap(
      (u) => Ke(
        u,
        N,
        this.humidityColor,
        // Dots read better slightly thicker than an uninterrupted line.
        We ? 2.4 : 1.8,
        We
      )
    ), qe = Ge(_e, N), Yt = qe ? [f`<path d=${qe} style="fill:url(#${this.uid}-humidity-fill)" />`] : [], Ze = [];
    if (this.showPoints) {
      const u = (C, M, ee) => {
        const G = C.filter((j) => j.v !== null);
        if (!G.length) return;
        const te = Math.max(1, Math.ceil(G.length / 24));
        G.forEach((j, Ye) => {
          if (Ye % te !== 0 && Ye !== G.length - 1) return;
          const Xe = j.v;
          Ze.push(
            f`<circle class="point" r="1.9" cx=${g(j.t)} cy=${M(Xe)} style="stroke:${ee(Xe)}" />`
          );
        });
      };
      O && we.forEach(
        (C) => u(
          C.samples,
          O,
          (M) => me(M, this.bands, this.bandColors)
        )
      ), N && _e.forEach(
        (C) => u(C.samples, N, () => this.humidityColor)
      );
    }
    const B = [...De].reverse().find((u) => u.v !== null), Q = [...Fe].reverse().find((u) => u.v !== null);
    return f`<svg
      width=${e}
      height=${n}
      viewBox="0 0 ${e} ${n}"
      role="img"
      aria-label=${this.labels.aria}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Pt.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Ut.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Vt.map(
      (u) => f`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Pe}
      <line class="baseline" x1=${d} x2=${c} y1=${a} y2=${a} />
      ${Yt} ${qt} ${Zt} ${Wt} ${Ze}
      ${Q && N ? f`<circle
            class="end-halo"
            r="7"
            cx=${g(Q.t)}
            cy=${N(Q.v)}
            style="fill:${this.humidityColor}"
          />
          <circle
            class="end-dot"
            r="3"
            cx=${g(Q.t)}
            cy=${N(Q.v)}
            style="fill:${this.humidityColor}"
          />` : m}
      ${B && O ? f`<circle
            class="end-halo"
            r="7.5"
            cx=${g(B.t)}
            cy=${O(B.v)}
            style="fill:${me(B.v, this.bands, this.bandColors)}"
          />
          <circle
            class="end-dot"
            r="3.1"
            cx=${g(B.t)}
            cy=${O(B.v)}
            style="fill:${me(B.v, this.bands, this.bandColors)}"
          />` : m}
      ${Kt}
    </svg>`;
  }
  formatTime(e) {
    try {
      return new Intl.DateTimeFormat(this.language || "en", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(e));
    } catch {
      const t = new Date(e);
      return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    }
  }
}
const Ct = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Ct) && customElements.define(Ct, pr);
const fr = {
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
function gr(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class Bt extends U {
  constructor() {
    super(...arguments), this._config = { type: `custom:${R}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = e && typeof e == "object" ? { ...e, type: e.type ?? `custom:${R}` } : { type: `custom:${R}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const e = ke(this.hass?.locale?.language ?? this.hass?.language);
    return fr[e];
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
    t.type = this._config.type ?? `custom:${R}`, this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(e) {
    return A(this._config[e]);
  }
  showFlag(e, t) {
    return this.rawBoolean(e) ?? !!L(this._config[t]);
  }
  /**
   * Height to use when "automatic height" is switched off again: the value the
   * user last entered, or the stored manual height, or a sensible default.
   */
  manualHeight() {
    const e = this._config.height, t = typeof e == "number" ? e : Number(e);
    return Number.isFinite(t) && t > 0 && (this.lastManualHeight = t), this.lastManualHeight;
  }
  numberValue(e, t) {
    const i = this._config[e], n = typeof i == "number" ? i : Number(i);
    return Number.isFinite(n) ? n : t;
  }
  stringValue(e, t = "") {
    return J(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = J(this._config[e]) ?? t;
    return Ae(i) ?? Ae(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: Ui(t) });
      }
    });
  }
  renderField(e) {
    return p`<div
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
      ${e.helper ? p`<span class="helper">${e.helper}</span>` : m}
      ${e.warning ? p`<span class="helper warning">${e.warning}</span>` : m}
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
          mode: "box",
          ...e.unit ? { unit_of_measurement: e.unit } : {}
        }
      },
      value: this.numberValue(e.key, e.fallback),
      disabled: e.disabled,
      helper: e.helper,
      revertOnLeave: !0,
      onChange: (t) => {
        const i = gr(t);
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
  renderSection(e, t, i) {
    const n = this.openSections.has(e);
    return p`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(e, s)}>
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
      return p`<div class="loading">${this.text.loading}</div>`;
    const e = this.text;
    return p`<div class="editor">
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
    return p`<div class="hint">${e.generalHelper}</div>
      ${this.renderText({ key: "name", label: e.name, helper: e.nameHelper })}
      ${this.renderField({
      key: "name_entity",
      label: e.nameEntity,
      selector: { entity: { multiple: !1 } },
      value: this.stringValue("name_entity"),
      helper: e.nameEntityHelper
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
      fallback: 18
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
    return p`${this.renderField({
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
    return p`<div class="hint">${e.readingSizeHelper}</div>
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
      fallback: 28
    })}
      ${this.renderText({
      key: "humidity_font_family",
      label: e.humidityFont,
      helper: e.readingFontHelper
    })}`;
  }
  renderColors(e) {
    return p`${this.renderNumber({
      key: "temperature_cool_below",
      label: e.coolBelow,
      min: -30,
      max: 50,
      step: 0.5,
      unit: "°C",
      fallback: 19
    })}
      ${this.renderNumber({
      key: "temperature_warm_above",
      label: e.warmAbove,
      min: -20,
      max: 60,
      step: 0.5,
      unit: "°C",
      fallback: 25
    })}
      ${this.renderNumber({
      key: "temperature_hot_above",
      label: e.hotAbove,
      min: -10,
      max: 70,
      step: 0.5,
      unit: "°C",
      fallback: 28
    })}
      ${this.renderColor({ key: "temperature_cool_color", label: e.coolColor, fallback: v.cool })}
      ${this.renderColor({
      key: "temperature_comfort_color",
      label: e.comfortColor,
      fallback: v.comfort
    })}
      ${this.renderColor({ key: "temperature_warm_color", label: e.warmColor, fallback: v.warm })}
      ${this.renderColor({ key: "temperature_hot_color", label: e.hotColor, fallback: v.hot })}
      ${this.renderColor({ key: "humidity_color", label: e.humidityColor, fallback: v.humidity })}
      ${this.renderNumber({
      key: "humidity_low_threshold",
      label: e.humidityLow,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 35
    })}
      ${this.renderNumber({
      key: "humidity_high_threshold",
      label: e.humidityHigh,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 65
    })}
      ${this.renderColor({
      key: "humidity_low_color",
      label: e.humidityLowColor,
      fallback: v.humidityLow
    })}
      ${this.renderColor({
      key: "humidity_high_color",
      label: e.humidityHighColor,
      fallback: v.humidityHigh
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = L(this._config.window_entity);
    return p`${this.renderSwitch({
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
        const s = String(n ?? "").split(",").map((o) => o.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: s.length ? s : void 0 });
      }
    })}`;
  }
  renderMotion(e) {
    const t = this.showFlag("show_motion", "motion_entity");
    return p`${this.renderSwitch({
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
      warning: t && !L(this._config.motion_entity) ? e.missingEntity : void 0
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
    return p`${this.renderSwitch({
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
      warning: t && !L(this._config.climate_entity) ? e.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "show_setpoint",
      label: e.showSetpoint,
      value: this.rawBoolean("show_setpoint") ?? !0,
      disabled: !t
    })}
      ${this.renderSwitch({
      key: "show_hvac_status",
      label: e.showHvacStatus,
      value: this.rawBoolean("show_hvac_status") ?? !0,
      disabled: !t
    })}
      ${this.renderSwitch({
      key: "show_hvac_mode",
      label: e.showHvacMode,
      value: this.rawBoolean("show_hvac_mode") ?? !1,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_color",
      label: e.heatingColor,
      fallback: v.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: v.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: v.off,
      disabled: !t
    })}`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = t || i, s = [3, 6, 12, 24, 48].map((o) => ({ value: String(o), label: `${o} h` }));
    return p`${this.renderSwitch({
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
      ${this.renderField({
      key: "chart_hours",
      label: e.hours,
      selector: { select: { mode: "dropdown", options: s } },
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
      value: this.rawBoolean("chart_show_grid") ?? !0,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_legend",
      label: e.legend,
      value: this.rawBoolean("chart_show_legend") ?? !1,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: e.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !n
    })}`;
  }
  static {
    this.styles = He`
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
typeof customElements < "u" && !customElements.get(Z) && customElements.define(Z, Bt);
const xe = "#fbbf24", Se = "#34d399", kt = "var(--rcc-neutral)";
class yr extends U {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new er(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
  setConfig(e) {
    const t = Ei(e);
    this._config = t, this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(Z);
  }
  getConfigElement() {
    return document.createElement(Z);
  }
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), n = (c) => i.find(c)?.entity_id, s = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), o = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), a = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), h = n((c) => c.entity_id.startsWith("climate.")), d = { type: `custom:${R}` };
    return s && (d.temperature_entity = s), o && (d.humidity_entity = o), l && (d.window_entity = l), a && (d.motion_entity = a), h && (d.climate_entity = h), d;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round($e(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? $e(this._config) : 230;
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
    return Ni(e);
  }
  language() {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
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
    t === this.historyKey && this.historyFetchedAt > 0 || (this.historyKey = t, this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
      this.pendingLoad = void 0, this.loadHistory(t);
    }, 60));
  }
  async loadHistory(e, t = !1) {
    const i = this._config, n = this.hass;
    if (!i || !n || !e) return;
    const s = this.historyEntityIds(i);
    if (!s.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const o = Date.now(), l = o - i.chart.hours * 60 * 60 * 1e3;
    try {
      const a = await this.repository.load(n, s, i.chart.hours, o);
      if (this.historyKey !== e) return;
      this._history = a, this._historyWindow = { start: l, end: o }, this.historyFetchedAt = Date.now(), t && this.requestUpdate();
    } catch (a) {
      if (this.historyKey !== e) return;
      this._historyError = a instanceof Error ? a.message : String(a), this._history = {};
    } finally {
      this.historyKey === e && (this._historyLoading = !1);
    }
  }
  updateDensity(e) {
    const t = e > 0 ? e : this._config ? this._config.height ?? $e(this._config) : 0;
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
      if (!t || !this.hass || t.connected !== this.hass.connected || t.locale?.language !== this.hass.locale?.language || t.locale?.number_format !== this.hass.locale?.number_format || t.locale?.time_format !== this.hass.locale?.time_format || t.themes?.darkMode !== this.hass.themes?.darkMode || t.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? Ri(this._config) : [];
      return i.length ? i.some((n) => t.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return p`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: n, humidity: s } = e.typography, o = [
      `--rcc-radius:${e.borderRadius}px`,
      e.height ? `--rcc-height:${e.height}px` : "",
      `--rcc-chart-height:${e.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${s.fontSize}px`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return p`<div
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"}"
      style="${o}"
      role="group"
      aria-label="${this.cellAriaLabel(e, t)}"
    >
      ${this.renderHeader(e, t)} ${this.renderSetpointRow(e, t)}
      ${this.renderMetrics(e, t)} ${this.renderChart(e, t)}
      ${this.hasAnyEntity(e) ? m : this.renderEmpty(t)}
    </div>`;
  }
  hasAnyEntity(e) {
    return !!(e.temperatureEntity || e.humidityEntity);
  }
  cellAriaLabel(e, t) {
    return `${mt(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return p`<div class="empty-state" role="status">
      ${H.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = mt(e, this.hass), n = Gi(this.hass, e), s = Vi(this.hass, e), o = e.motion.enabled && e.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${o ? p`<div class="subtle">
              ${t.t("quietSince")}
              ${Ii(n.sinceMs, this._now, {
      justNow: t.t("justNow"),
      minutes: t.t("minutesShort"),
      hours: t.t("hoursShort"),
      days: t.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${e.motion.enabled ? this.renderMotionBadge(n, t) : m}
        ${e.window.enabled ? this.renderWindowBadge(s, t) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(e) {
    return this._haIconReady ? p`<ha-icon .icon=${e.icon}></ha-icon>` : H.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", n = i ? Se : kt, s = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${W(
      i ? Se : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${W(i ? Se : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${H.motion()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", n = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? xe : kt};--badge-bg:${W(
      i ? xe : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${W(i ? xe : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? H.windowOpen() : H.windowClosed()}</span
    >`;
  }
  renderMetrics(e, t) {
    if (!e.temperatureEntity && !e.humidityEntity) return m;
    const i = this.language(), n = ft(this.hass, e.temperatureEntity, "temperature"), s = ft(this.hass, e.humidityEntity, "humidity");
    return p`<div class="metrics">
      ${e.temperatureEntity ? p`<div
            class="metric temperature"
            role="group"
            aria-label="${t.t("temperature")}: ${this.sensorAria(n, i, e.temperatureDecimals, t)}"
          >
            <span
              class="value"
              style="color:${n.value !== null ? Ti(n.value, e) : "var(--rcc-muted)"}"
              >${n.value !== null ? re(n.value, i, e.temperatureDecimals) : "–"}</span
            ><span class="unit">${n.unit}</span>
          </div>` : m}
      ${e.humidityEntity ? p`<div
            class="metric humidity"
            role="group"
            aria-label="${t.t("humidity")}: ${this.sensorAria(s, i, e.humidityDecimals, t)}"
          >
            <span class="drop-icon" aria-hidden="true">${H.water()}</span>
            <span
              class="humidity-value"
              style="color:${s.value !== null ? Li(s.value, e) : "var(--rcc-muted)"}"
              >${s.value !== null ? re(s.value, i, e.humidityDecimals) : "–"}</span
            ><span class="humidity-unit">${s.unit}</span>
          </div>` : m}
    </div>`;
  }
  sensorAria(e, t, i, n) {
    return e.value === null ? n.t("unavailable") : `${re(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Target temperature above the actual temperature. The heating state is
   * conveyed only by the colour of the icon in front of it (red = heating,
   * green = idle, grey = off), never by an extra text label.
   */
  renderSetpointRow(e, t) {
    if (!Ft(e)) return m;
    const i = Wi(this.hass, e, t), n = e.thermostat.showSetpoint && i.setpoint !== null, s = e.thermostat.showStatus, o = e.thermostat.showMode && !!i.modeLabel;
    if (!n && !s && !o) return m;
    const l = qi(i, e), a = this.thermostatAria(i), h = this.language(), d = i.setpoint !== null ? `${re(i.setpoint, h, e.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="setpoint-row">
      ${s ? p`<span
            class="badge hvac-icon is-${i.colorKey} status-${i.status}"
            style="--badge-color:${l};--badge-bg:${W(l, 0.14)};--badge-border:${W(
      l,
      0.34
    )}"
            role="img"
            aria-label="${a}"
            title="${a}"
            >${this.heatingIcon(i)}</span
          >` : m}
      ${n ? p`<span class="badge setpoint" title="${t.t("setpoint")} ${d}">
            <span class="setpoint-label">${t.t("setpoint")}</span>
            <span class="setpoint-reading"
              ><span class="setpoint-value"
                >${re(
      i.setpoint,
      h,
      e.temperatureDecimals
    )}</span
              ><span class="setpoint-unit">${i.unit}</span></span
            >
          </span>` : m}
      ${o ? p`<span class="mode-label">${i.modeLabel}</span>` : m}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(e) {
    if (e.status === "action")
      switch (e.action) {
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
  thermostatAria(e) {
    return e.label;
  }
  renderChart(e, t) {
    if (!Dt(e)) return m;
    const i = e.chart.showTemperature && e.temperatureEntity ? this._history[e.temperatureEntity] : void 0, n = e.chart.showHumidity && e.humidityEntity ? this._history[e.humidityEntity] : void 0, s = this.language(), o = {
      empty: t.t("noHistory"),
      emptyHint: t.t("noHistoryHint"),
      loading: t.t("loadingHistory"),
      error: t.t("historyError"),
      aria: t.chartAria(e.chart.hours),
      temperature: t.t("legendTemperature"),
      humidity: t.t("legendHumidity")
    };
    return p`<div class="chart-slot">
      <room-climate-chart
        .temperature=${i}
        .humidity=${n}
        .bandColors=${e.bandColors}
        .bands=${e.bands}
        .humidityColor=${e.humidity.color}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showLegend=${e.chart.showLegend}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .curve=${e.chart.curve}
        .gapMode=${e.chart.gapMode}
        .maxGapMinutes=${e.chart.maxGapMinutes}
        .gapStyle=${e.chart.gapStyle}
        .humidityLineStyle=${e.chart.humidityLineStyle}
        .cornerRadius=${e.borderRadius}
        .language=${s}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${o}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = He`
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
  `%c ROOM-CLIMATE-CARD %c v${ei} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(R) || customElements.define(R, yr);
customElements.get(Z) || customElements.define(Z, Bt);
const At = window.customCards = window.customCards ?? [];
At.some((r) => r.type === R) || At.push({
  type: R,
  name: Jt,
  description: Qt,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  R as CARD_TAG,
  ei as CARD_VERSION,
  yr as RoomClimateCard,
  Bt as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
