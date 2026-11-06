const it = "room-climate-card", It = "room-climate-card-editor", Sn = "Room Climate Card", An = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", kn = "2.20.0";
const ne = globalThis, Ge = ne.ShadowRoot && (ne.ShadyCSS === void 0 || ne.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ke = /* @__PURE__ */ Symbol(), Hi = /* @__PURE__ */ new WeakMap();
let Sr = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ke) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ge && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Hi.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Hi.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Mn = (r) => new Sr(typeof r == "string" ? r : r + "", void 0, Ke), je = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Sr(e, r, Ke);
}, Tn = (r, t) => {
  if (Ge) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = ne.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, Ei = Ge ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Mn(e);
})(r) : r;
const { is: Cn, defineProperty: Hn, getOwnPropertyDescriptor: En, getOwnPropertyNames: Dn, getOwnPropertySymbols: Rn, getPrototypeOf: zn } = Object, de = globalThis, Di = de.trustedTypes, On = Di ? Di.emptyScript : "", Nn = de.reactiveElementPolyfillSupport, Ft = (r, t) => r, Be = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? On : null;
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
} }, Ar = (r, t) => !Cn(r, t), Ri = { attribute: !0, type: String, converter: Be, reflect: !1, useDefault: !1, hasChanged: Ar };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), de.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let xt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ri) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Hn(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: s } = En(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ri;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ft("elementProperties"))) return;
    const t = zn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ft("properties"))) {
      const e = this.properties, i = [...Dn(e), ...Rn(e)];
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
      for (const n of i) e.unshift(Ei(n));
    } else t !== void 0 && e.push(Ei(t));
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
    return Tn(t, this.constructor.elementStyles), t;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Be).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Be;
      this._$Em = n;
      const o = a.fromAttribute(e, s.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Ar)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
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
xt.elementStyles = [], xt.shadowRootOptions = { mode: "open" }, xt[Ft("elementProperties")] = /* @__PURE__ */ new Map(), xt[Ft("finalized")] = /* @__PURE__ */ new Map(), Nn?.({ ReactiveElement: xt }), (de.reactiveElementVersions ??= []).push("2.1.2");
const Ye = globalThis, zi = (r) => r, oe = Ye.trustedTypes, Oi = oe ? oe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, kr = "$lit$", at = `lit$${Math.random().toFixed(9).slice(2)}$`, Mr = "?" + at, Fn = `<${Mr}>`, wt = document, Pt = () => wt.createComment(""), Ut = (r) => r === null || typeof r != "object" && typeof r != "function", Ze = Array.isArray, Ln = (r) => Ze(r) || typeof r?.[Symbol.iterator] == "function", Ae = `[ 	
\f\r]`, zt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ni = /-->/g, Fi = />/g, ft = RegExp(`>|${Ae}(?:([^\\s"'>=/]+)(${Ae}*=${Ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Li = /'/g, Bi = /"/g, Tr = /^(?:script|style|textarea|title)$/i, Cr = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), b = Cr(1), w = Cr(2), At = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), Ii = /* @__PURE__ */ new WeakMap(), yt = wt.createTreeWalker(wt, 129);
function Hr(r, t) {
  if (!Ze(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oi !== void 0 ? Oi.createHTML(t) : t;
}
const Bn = (r, t) => {
  const e = r.length - 1, i = [];
  let n, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = zt;
  for (let o = 0; o < e; o++) {
    const h = r[o];
    let l, c, d = -1, m = 0;
    for (; m < h.length && (a.lastIndex = m, c = a.exec(h), c !== null); ) m = a.lastIndex, a === zt ? c[1] === "!--" ? a = Ni : c[1] !== void 0 ? a = Fi : c[2] !== void 0 ? (Tr.test(c[2]) && (n = RegExp("</" + c[2], "g")), a = ft) : c[3] !== void 0 && (a = ft) : a === ft ? c[0] === ">" ? (a = n ?? zt, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, l = c[1], a = c[3] === void 0 ? ft : c[3] === '"' ? Bi : Li) : a === Bi || a === Li ? a = ft : a === Ni || a === Fi ? a = zt : (a = ft, n = void 0);
    const f = a === ft && r[o + 1].startsWith("/>") ? " " : "";
    s += a === zt ? h + Fn : d >= 0 ? (i.push(l), h.slice(0, d) + kr + h.slice(d) + at + f) : h + at + (d === -2 ? o : f);
  }
  return [Hr(r, s + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Wt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const o = t.length - 1, h = this.parts, [l, c] = Bn(t, e);
    if (this.el = Wt.createElement(l, i), yt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = yt.nextNode()) !== null && h.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(kr)) {
          const m = c[a++], f = n.getAttribute(d).split(at), p = /([.?@])?(.*)/.exec(m);
          h.push({ type: 1, index: s, name: p[2], strings: f, ctor: p[1] === "." ? Pn : p[1] === "?" ? Un : p[1] === "@" ? Wn : ue }), n.removeAttribute(d);
        } else d.startsWith(at) && (h.push({ type: 6, index: s }), n.removeAttribute(d));
        if (Tr.test(n.tagName)) {
          const d = n.textContent.split(at), m = d.length - 1;
          if (m > 0) {
            n.textContent = oe ? oe.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(d[f], Pt()), yt.nextNode(), h.push({ type: 2, index: ++s });
            n.append(d[m], Pt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Mr) h.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(at, d + 1)) !== -1; ) h.push({ type: 7, index: s }), d += at.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = wt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function kt(r, t, e = r, i) {
  if (t === At) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = Ut(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = kt(r, n._$AS(r, t.values), n, i)), t;
}
class In {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? wt).importNode(e, !0);
    yt.currentNode = n;
    let s = yt.nextNode(), a = 0, o = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let l;
        h.type === 2 ? l = new Gt(s, s.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(s, h.name, h.strings, this, t) : h.type === 6 && (l = new Vn(s, this, t)), this._$AV.push(l), h = i[++o];
      }
      a !== h?.index && (s = yt.nextNode(), a++);
    }
    return yt.currentNode = wt, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Gt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = kt(this, t, e), Ut(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== At && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ln(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && Ut(this._$AH) ? this._$AA.nextSibling.data = t : this.T(wt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Wt.createElement(Hr(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const s = new In(n, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Ii.get(t.strings);
    return e === void 0 && Ii.set(t.strings, e = new Wt(t)), e;
  }
  k(t) {
    Ze(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const s of t) n === e.length ? e.push(i = new Gt(this.O(Pt()), this.O(Pt()), this, this.options)) : i = e[n], i._$AI(s), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = zi(t).nextSibling;
      zi(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, s) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(t, e = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = kt(this, t, e, 0), a = !Ut(t) || t !== this._$AH && t !== At, a && (this._$AH = t);
    else {
      const o = t;
      let h, l;
      for (t = s[0], h = 0; h < s.length - 1; h++) l = kt(this, o[i + h], e, h), l === At && (l = this._$AH[h]), a ||= !Ut(l) || l !== this._$AH[h], l === g ? t = g : t !== g && (t += (l ?? "") + s[h + 1]), this._$AH[h] = l;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pn extends ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Un extends ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class Wn extends ue {
  constructor(t, e, i, n, s) {
    super(t, e, i, n, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = kt(this, t, e, 0) ?? g) === At) return;
    const i = this._$AH, n = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== g && (i === g || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vn {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    kt(this, t);
  }
}
const Gn = Ye.litHtmlPolyfillSupport;
Gn?.(Wt, Gt), (Ye.litHtmlVersions ??= []).push("3.3.3");
const Kn = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = n = new Gt(t.insertBefore(Pt(), s), s, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
const Xe = globalThis;
let bt = class extends xt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Kn(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return At;
  }
};
bt._$litElement$ = !0, bt.finalized = !0, Xe.litElementHydrateSupport?.({ LitElement: bt });
const jn = Xe.litElementPolyfillSupport;
jn?.({ LitElement: bt });
(Xe.litElementVersions ??= []).push("4.2.2");
const Yn = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "toggle",
  "none"
];
function Ot(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r);
}
function gt(r) {
  return typeof r == "string" && r.trim().length ? r.trim() : void 0;
}
function ke(r, t) {
  if (r == null || r === "") return t;
  const e = Ot(r) ? r : { action: r };
  let i = gt(e.action)?.toLowerCase();
  if (i === "call-service" && (i = "perform-action"), !i || !Yn.includes(i)) return t;
  const n = { action: i }, s = gt(e.entity);
  switch (s && (n.entity = s), n.action) {
    case "navigate": {
      const a = gt(e.navigation_path);
      if (!a) return t;
      n.navigation_path = a, e.navigation_replace === !0 && (n.navigation_replace = !0);
      break;
    }
    case "url": {
      const a = gt(e.url_path);
      if (!a) return t;
      n.url_path = a;
      break;
    }
    case "perform-action": {
      const a = gt(e.perform_action) ?? gt(e.service);
      if (!a || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(a)) return t;
      n.perform_action = a;
      const o = Ot(e.data) ? e.data : Ot(e.service_data) ? e.service_data : void 0;
      o && (n.data = { ...o }), Ot(e.target) && (n.target = { ...e.target });
      break;
    }
  }
  if (e.confirmation === !0) n.confirmation = !0;
  else if (Ot(e.confirmation)) {
    const a = gt(e.confirmation.text);
    n.confirmation = a ? { text: a } : !0;
  }
  return n;
}
function Zn(r) {
  return {
    tap: ke(r.tap_action, { action: "more-info" }) ?? { action: "more-info" },
    hold: ke(r.hold_action, null),
    doubleTap: ke(r.double_tap_action, null)
  };
}
function Ie(r, t) {
  return r.entity ?? t;
}
function Pe(r, t) {
  return !r || r.action === "none" ? !1 : r.action === "more-info" || r.action === "toggle" ? !!Ie(r, t) : !0;
}
function Xn(r, t, e, i, n) {
  if (!Pe(e, i) || !e) return !1;
  if (e.confirmation) {
    const a = typeof e.confirmation == "object" && e.confirmation.text ? e.confirmation.text : n.confirmText;
    if (!(n.confirm ?? ((h) => window.confirm(h)))(a)) return !1;
  }
  const s = (a, o) => {
    r.dispatchEvent(new CustomEvent(a, { detail: o, bubbles: !0, composed: !0 }));
  };
  switch (e.action) {
    case "more-info":
      return s("hass-more-info", { entityId: Ie(e, i) }), !0;
    case "navigate": {
      const a = e.navigation_path;
      return e.navigation_replace ? window.history.replaceState(null, "", a) : window.history.pushState(null, "", a), window.dispatchEvent(
        new CustomEvent("location-changed", { detail: { replace: !!e.navigation_replace } })
      ), !0;
    }
    case "url":
      return window.open(e.url_path, "_blank", "noopener"), !0;
    case "toggle":
      return t ? (Promise.resolve(
        t.callService("homeassistant", "toggle", { entity_id: Ie(e, i) })
      ).catch(() => {
      }), !0) : !1;
    case "perform-action": {
      if (!t) return !1;
      const [a, o] = e.perform_action.split(".", 2);
      return Promise.resolve(
        t.callService(a, o, e.data ?? {}, e.target)
      ).catch(() => {
      }), !0;
    }
    default:
      return !1;
  }
}
const A = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function te(r, t) {
  const [e, i] = r, [n, s] = t, a = i - e;
  if (!Number.isFinite(a) || a === 0) {
    const o = (n + s) / 2;
    return () => o;
  }
  return (o) => n + (o - e) / a * (s - n);
}
function Pi(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function Ui(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = e;
  let s = r, a = t;
  if (a - s < i) {
    const h = (a + s) / 2;
    s = h - i / 2, a = h + i / 2;
  }
  const o = (a - s) * n;
  return [s - o, a + o];
}
function Er(r) {
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
function qn(r, t, e = {}) {
  const i = Er(r), n = i > 0 ? i * 2.5 : 0, s = e.minMs ?? Math.max(t / 40, 300 * 1e3), a = e.maxMs ?? Math.max(s, t / 3);
  return Math.min(a, Math.max(n, s));
}
const Jn = 1e3, Qn = 8;
function ts(r, t, e, i) {
  const n = e.t - t.t, s = t.v, a = e.v, o = Math.min(
    Qn,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let h = 1; h < o; h++) {
    const l = h / o;
    r.samples.push({
      t: Math.round(t.t + n * l),
      v: s + (a - s) * l
    }), r.bridged.push(!0);
  }
}
function Wi(r, t) {
  const { rangeMs: e, start: i, end: n } = t, s = t.gapMode ?? "connect", a = qn(r, e), o = t.maxGapMs ?? e / 4, h = [];
  let l = null, c = null, d = null, m = !1, f = !1;
  const p = () => {
    l && l.samples.length && h.push(l), l = null, c = null, d = null;
  }, S = (x) => {
    if (!l || !c || x === null || x <= c.t) return;
    const z = { t: x, v: c.v };
    l.samples.push(z), l.bridged.push(!1), c = z;
  };
  for (const x of r) {
    if (x.v === null || !Number.isFinite(x.v)) {
      c || (m = !0), d = d ?? x.t, f = !0;
      continue;
    }
    if (f = !1, !c || !l) {
      l = { samples: [x], bridged: [] }, c = x, d = null;
      continue;
    }
    const z = x.t - c.t;
    if (z <= a && d === null) {
      l.samples.push(x), l.bridged.push(!1), c = x;
      continue;
    }
    if (!(d !== null)) {
      const jt = Math.min(Jn, z / 2);
      l.samples.push({ t: x.t - jt, v: c.v }), l.bridged.push(!1), l.samples.push(x), l.bridged.push(!1), c = x;
      continue;
    }
    const L = Math.max(c.t, d), R = x.t - L;
    if (s === "connect" && R <= o) {
      L > c.t && (l.samples.push({ t: L, v: c.v }), l.bridged.push(!1), c = { t: L, v: c.v }), ts(l, c, x, a), l.samples.push(x), l.bridged.push(!0), c = x, d = null;
      continue;
    }
    S(d), p(), l = { samples: [x], bridged: [] }, c = x;
  }
  if (f && S(d), p(), !h.length) return h;
  const C = h[0];
  if (!m && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), f)
    return h;
  const H = h[h.length - 1], U = H.samples[H.samples.length - 1];
  return n !== void 0 && U.t < n && (H.samples.push({ t: n, v: U.v }), H.bridged.push(!1)), h;
}
function Vi(r, t, e) {
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
    const h = n[n.length - 1];
    if (h && h.t === a.t) {
      n[n.length - 1] = { t: a.t, v: o };
      continue;
    }
    n.push({ t: a.t, v: o });
  }
  return s && t !== void 0 && (!n.length || n[0].t > t) && n.unshift(s), n;
}
function es(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function is(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function Dr(r) {
  if (!r.length) return "";
  let t = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${A(r[e].x)} ${A(r[e].y)}`;
  return t;
}
const Gi = 1, rs = 1;
function ns(r, t, e, i, n) {
  if (!(n > 0) || r === t && e === 0 && i === 0) return 0;
  const s = Math.min(r, t), a = Math.max(r, t);
  let o = 0;
  const h = 16;
  for (let l = 1; l < h; l++) {
    const c = l / h, d = 1 - c, m = r + e * n / 3, f = t - i * n / 3, p = d * d * d * r + 3 * d * d * c * m + 3 * d * c * c * f + c * c * c * t;
    o = Math.max(o, s - p, p - a);
  }
  return o;
}
function Rr(r) {
  const t = r.length, e = [], i = [];
  for (let o = 0; o < t - 1; o++)
    e[o] = r[o + 1].x - r[o].x, i[o] = e[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / e[o];
  const n = new Array(t).fill(0);
  n[0] = i[0], n[t - 1] = i[t - 2];
  for (let o = 1; o < t - 1; o++) {
    const h = i[o - 1], l = i[o];
    n[o] = h * l <= 0 ? (h + l) / 2 * rs : (h + l) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < t - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(t).fill(1);
  for (let o = 0; o < 3; o++) {
    const h = new Array(t).fill(1);
    let l = !1;
    for (let c = 0; c < t - 1; c++) {
      if (e[c] === 0) continue;
      const d = ns(
        r[c].y,
        r[c + 1].y,
        n[c] * a[c],
        n[c + 1] * a[c + 1],
        e[c]
      );
      if (d > Gi) {
        const m = Gi / d;
        h[c] = Math.min(h[c], m), h[c + 1] = Math.min(h[c + 1], m), l = !0;
      }
    }
    if (!l) break;
    for (let c = 0; c < t; c++) a[c] *= h[c];
  }
  for (let o = 0; o < t; o++) n[o] *= a[o];
  return { dx: e, tangents: n };
}
function ss(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${A(r[0].x)} ${A(r[0].y)}`;
  if (r.length === 2) return Dr(r);
  const t = r.length, { dx: e, tangents: i } = Rr(r);
  let n = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let s = 0; s < t - 1; s++) {
    const a = r[s].x + e[s] / 3, o = r[s].y + i[s] * e[s] / 3, h = r[s + 1].x - e[s] / 3, l = r[s + 1].y - i[s + 1] * e[s] / 3;
    n += ` C ${A(a)} ${A(o)}, ${A(h)} ${A(l)}, ${A(
      r[s + 1].x
    )} ${A(r[s + 1].y)}`;
  }
  return n;
}
function zr(r, t) {
  return t ? ss(r) : Dr(r);
}
function as(r, t) {
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
  const { dx: i, tangents: n } = Rr(r);
  for (let s = 0; s < r.length - 1; s++) {
    const a = r[s], o = r[s + 1], h = a.x + i[s] / 3, l = a.y + n[s] * i[s] / 3, c = o.x - i[s] / 3, d = o.y - n[s + 1] * i[s] / 3;
    e.push({
      from: a,
      to: o,
      command: `C ${A(h)} ${A(l)}, ${A(c)} ${A(d)}, ${A(
        o.x
      )} ${A(o.y)}`
    });
  }
  return e;
}
function os(r, t, e) {
  if (!r.length) return "";
  const i = zr(r, e), n = r[0], s = r[r.length - 1];
  return `${i} L ${A(s.x)} ${A(t)} L ${A(n.x)} ${A(t)} Z`;
}
function ls(r, t, e = {}) {
  const i = Math.max(1, Math.round(t));
  if (i < 3 || r.length < 3) return r.map((o) => ({ ...o }));
  const n = Math.floor(i / 2), s = e.maxDeltaMs ?? 1 / 0, a = 2;
  return r.map((o, h) => {
    if (o.v === null) return { ...o };
    let l = 0, c = 0;
    for (let d = -n; d <= n; d++) {
      const m = r[h + d];
      !m || m.v === null || d !== 0 && Math.abs(m.t - o.t) > s || (l += m.v, c += 1);
    }
    return c ? { t: o.t, v: ds(l / c, a) } : { ...o };
  });
}
const hs = [
  "none",
  "light",
  "medium",
  "strong"
], Ue = "light", Ki = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60
}, cs = 121;
function ds(r, t) {
  const e = 10 ** t;
  return Math.round(r * e) / e;
}
function us(r, t = Ue) {
  const e = Ki[t] ?? Ki[Ue];
  if (!(e > 0) || !Number.isFinite(r) || r <= 0) return 1;
  const i = Math.max(1, Math.round(e * 6e4 / r));
  return Math.min(cs, i * 2 + 1);
}
function ms(r, t) {
  if (!Number.isFinite(t) || t <= 0) return 1 / 0;
  const e = Math.floor(Math.max(1, r) / 2) * t * 2;
  return Math.min(90 * 6e4, Math.max(2 * 6e4, e));
}
function ps(r, t) {
  const e = r.length;
  if (e <= t || t < 3) return r.map((a, o) => o);
  const i = Math.max(1, Math.floor((t - 2) / 2)), n = /* @__PURE__ */ new Set([0, e - 1]), s = e / i;
  for (let a = 0; a < i; a++) {
    const o = Math.floor(a * s), h = Math.min(e - 1, Math.floor((a + 1) * s) - 1);
    let l = -1, c = -1, d = 1 / 0, m = -1 / 0;
    for (let f = o; f <= h; f++) {
      const p = r[f].v;
      p === null || !Number.isFinite(p) || (p < d && (d = p, l = f), p > m && (m = p, c = f));
    }
    if (l === -1) {
      n.add(o);
      continue;
    }
    n.add(l), n.add(c);
  }
  return [...n].sort((a, o) => a - o);
}
function ee(r, t) {
  const e = r.length;
  if (!e || !Number.isFinite(t)) return null;
  let i = 0, n = e - 1, s = e;
  for (; i <= n; ) {
    const c = i + n >> 1;
    r[c].t >= t ? (s = c, n = c - 1) : i = c + 1;
  }
  let a = s - 1, o = s, h = null, l = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      h = r[a];
      break;
    }
    a--;
  }
  for (; o < e; ) {
    if (r[o].v !== null) {
      l = r[o];
      break;
    }
    o++;
  }
  return h ? l ? Math.abs(h.t - t) <= Math.abs(l.t - t) ? h : l : h : l;
}
function ji(r) {
  let t = null, e = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!t || t.v > n) && (t = i), (!e || e.v < n) && (e = i));
  }
  return t && e ? { min: t, max: e } : null;
}
const Or = 60 * 1e3, tt = 60 * Or, fs = [
  30 * Or,
  tt,
  2 * tt,
  3 * tt,
  4 * tt,
  6 * tt,
  12 * tt,
  24 * tt,
  // Week views: every second or third midnight.
  48 * tt,
  72 * tt
];
function gs(r, t, e) {
  if (!(t > r) || e.maxTicks < 1) return [];
  const i = e.offsetAt ?? (() => 0), n = t - Math.max(0, e.endClearanceMs);
  for (const s of fs) {
    if (s < e.minSpacingMs) continue;
    const a = [], o = i(r);
    let h = Math.ceil((r + o) / s) * s;
    for (let l = 0; l < 400; l += 1) {
      const c = h - i(h - o);
      if (c > n) break;
      c >= r && a.push(c), h += s;
    }
    if (a.length >= 1 && a.length <= e.maxTicks) return a;
  }
  return [r];
}
function ys(r, t) {
  if (!r.length || t < r[0].x || t > r[r.length - 1].x) return null;
  for (let e = 1; e < r.length; e += 1) {
    const i = r[e - 1], n = r[e];
    if (t <= n.x)
      return n.x === i.x ? Math.min(i.y, n.y) : i.y + (t - i.x) / (n.x - i.x) * (n.y - i.y);
  }
  return r[r.length - 1].y;
}
function bs(r, t, e) {
  if (!(e > t)) return [];
  const i = [...r].filter((o) => Number.isFinite(o.t)).sort((o, h) => o.t - h.t), n = [];
  let s = [];
  const a = () => {
    s.length && n.push(s), s = [];
  };
  for (let o = 0; o < i.length; o += 1) {
    const h = i[o], l = i[o + 1], c = Math.max(h.t, t), d = Math.min(l ? l.t : e, e);
    if (d <= c) continue;
    const m = h.v;
    if (m === null || !Number.isFinite(m)) {
      a();
      continue;
    }
    const f = s[s.length - 1];
    f && f.v === m && f.to === c ? f.to = d : (f && f.to !== c && a(), s.push({ from: c, to: d, v: m }));
  }
  return a(), n;
}
function ws(r, t, e) {
  const i = (n) => Math.round(n * 100) / 100;
  return r.map(
    (n) => n.map((s, a) => {
      const o = i(t(s.from)), h = i(t(s.to)), l = i(e(s.v));
      return a === 0 ? `M ${o} ${l} H ${h}` : `V ${l} H ${h}`;
    }).join(" ")
  ).join(" ");
}
const Yi = 3, Nr = 4;
function _s(r) {
  const t = r.preferredSide === "right" ? "left" : "right", e = [
    { side: r.preferredSide, above: !0 },
    { side: t, above: !0 },
    { side: r.preferredSide, above: !1 },
    { side: t, above: !1 }
  ];
  let i = null;
  for (const n of e) {
    const s = r.lineYBySide ? r.lineYBySide[n.side] : r.lineY;
    if (s === void 0 || !Number.isFinite(s)) continue;
    const a = n.above ? s - Yi - r.height : s + Yi, o = a + r.height;
    if (a < r.top - 1 || o > r.bottom + 1) continue;
    const h = n.side === "left" ? r.left : r.right - r.width, l = h + r.width, c = vs(h, l, a, o, r), d = { ...n, clearance: c };
    if (c >= Nr) return d;
    (!i || c > i.clearance) && (i = d);
  }
  return i ?? { side: r.preferredSide, above: !0, clearance: 0 };
}
function vs(r, t, e, i, n) {
  let s = Number.POSITIVE_INFINITY;
  const a = (o) => o < e ? e - o : o > i ? o - i : 0;
  for (const o of n.curves)
    for (let h = r; h <= t + 1e-3; h += 2) {
      const l = ys(o, Math.min(h, t));
      l !== null && (s = Math.min(s, a(l)));
    }
  for (const o of n.dots ?? [])
    (o.x < r ? r - o.x : o.x > t ? o.x - t : 0) > o.r + Nr || (s = Math.min(s, Math.max(0, a(o.y) - o.r)));
  return s;
}
const Me = "#7FA6D9", Te = "#EFB35F", Ce = "#D16A62", se = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, le = 1, Fr = 100;
function He(r, t) {
  return typeof r == "number" && Number.isFinite(r) ? r : t;
}
function $s(r, t, e, i = se) {
  const n = [
    He(r, i.coldBelow),
    He(t, i.warmAbove),
    He(e, i.hotAbove)
  ].sort((h, l) => h - l), s = n[0], a = Math.max(n[1], s + le), o = Math.max(n[2], a + le);
  return { coldBelow: s, warmAbove: a, hotAbove: o };
}
function Zi(r, t, e) {
  return Number.isFinite(r) ? r < t.coldBelow ? e.cold : r < t.warmAbove ? e.normal : r < t.hotAbove ? e.warm : e.hot : e.normal;
}
function xs(r, t, e, i = Fr) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: e.normal }];
  const o = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), h = Math.max(t.warmAbove - t.coldBelow, le), l = Math.max(t.hotAbove - t.warmAbove, le), c = o * h / 2, d = o * l / 2, m = (S) => S < t.coldBelow ? e.cold : S < t.warmAbove ? e.normal : S < t.hotAbove ? e.warm : e.hot, f = [
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
  for (const S of f) {
    const C = Number(((s - S.value) / a).toFixed(4)), H = p[p.length - 1];
    H && Math.abs(H.offset - C) < 5e-4 && H.color === S.color || p.push({ offset: C, color: S.color });
  }
  return p.reverse(), p.length === 1 && p.push({ offset: 1, color: p[0].color }), p[0].offset = 0, p[p.length - 1].offset = 1, p;
}
const Xi = 32;
function qi(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  const e = t[1], i = e.length === 3 ? e.split("").map((n) => n + n).join("") : e;
  return [
    parseInt(i.slice(0, 2), 16),
    parseInt(i.slice(2, 4), 16),
    parseInt(i.slice(4, 6), 16)
  ];
}
function Ss(r) {
  return `#${r.map((t) => Math.max(0, Math.min(255, Math.round(t))).toString(16).padStart(2, "0")).join("")}`;
}
function Lr(r, t) {
  if (!r.length) return "#ffffff";
  const e = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0));
  let i = r[0], n = r[r.length - 1];
  for (let l = 0; l < r.length; l++)
    if (r[l].offset <= e && (i = r[l]), r[l].offset >= e) {
      n = r[l];
      break;
    }
  const s = qi(i.color), a = qi(n.color);
  if (!s || !a) return i.color;
  const o = n.offset - i.offset, h = o <= 0 ? 0 : (e - i.offset) / o;
  return Ss([
    s[0] + (a[0] - s[0]) * h,
    s[1] + (a[1] - s[1]) * h,
    s[2] + (a[2] - s[2]) * h
  ]);
}
function As(r, t, e, i) {
  const n = as([...r], t), s = [];
  let a = null;
  const o = (l, c, d) => {
    const m = c.x - l.x, f = c.y - l.y, p = Math.hypot(m, f);
    return p > 0 ? Ee({ x: l.x + m / p * d, y: l.y + f / p * d }) : Ee(l);
  }, h = (l) => {
    const c = l.pieces[0], d = l.pieces[l.pieces.length - 1], m = o(c.from, c.to, -0.8), f = o(d.to, d.from, -0.8), p = l.pieces.map((S) => S.command).join(" ");
    s.push({
      d: `M ${m} L ${Ee(c.from)} ${p} L ${f}`,
      color: Lr(e, l.level / Xi)
    });
  };
  for (const l of n) {
    const c = (l.from.y + l.to.y) / 2, d = Math.round(Math.min(1, Math.max(0, i(c))) * Xi);
    if (a && a.level === d) {
      a.pieces.push(l);
      continue;
    }
    a && h(a), a = { pieces: [l], level: d };
  }
  return a && h(a), s;
}
function Ee(r) {
  const t = (e) => Number.isFinite(e) ? (Math.round(e * 100) / 100).toString() : "0";
  return `${t(r.x)} ${t(r.y)}`;
}
const Ji = { dryBelow: 40, humidAbove: 60 };
function ks(r, t) {
  return r < t.dryBelow ? "dry" : r > t.humidAbove ? "humid" : "comfortable";
}
function Ms(r, t) {
  const e = Math.min(r, t), i = Math.max(r, t);
  return { dryBelow: e, humidAbove: i === e ? Math.min(100, e + 1) : i };
}
function Ts(r, t) {
  if (!Number.isFinite(r) || !Number.isFinite(t) || t <= 0 || t > 100) return null;
  const e = 17.62, i = 243.12, n = Math.log(t / 100) + e * r / (i + r);
  return i * n / (e - n);
}
const qe = 12, Cs = 10, Qi = { min: 0, max: 32 }, Hs = ["on", "open", "opening", "tilted", "gekippt"], Es = ["off", "closed", "closing"], St = {
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
}, tr = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, er = { min: 14, max: 96 }, Je = 15, he = { min: 11, max: 32 }, Ds = /^[a-z0-9_]+\.[a-z0-9_]+$/, Rs = /^[-a-zA-Z0-9#(),.%\s/]+$/, zs = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Os(r) {
  return typeof r == "object" && r !== null;
}
function q(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return Ds.test(t) ? t : void 0;
}
function Mt(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function E(r, t, e, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(e, Math.max(t, n)) : i;
}
function M(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function Nt(r, t) {
  const e = Mt(r);
  return !e || e.length > 64 || !Rs.test(e) ? t : e;
}
function Ns(r) {
  return r.thermostat.enabled && r.thermostat.entity ? r.thermostat.entity : r.temperatureEntity ?? r.humidityEntity;
}
function ir(r) {
  const t = Mt(r);
  if (!(!t || t.length > 120) && zs.test(t))
    return t;
}
function rr(r, t) {
  return Math.round(
    E(r, er.min, er.max, t)
  );
}
function Fs(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
const Ls = [
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
  "humidity_comfort",
  "humidity_dry_below",
  "humidity_humid_above",
  "show_dew_point",
  "accent_color",
  "humidity_color",
  "temperature_comfort_color",
  "show_window",
  "window_entity",
  "window_open_states",
  "show_window_warning",
  "show_motion",
  "motion_entity",
  "motion_show_last_changed",
  "show_thermostat",
  "climate_entity",
  "show_climate_row",
  "tap_action",
  "hold_action",
  "double_tap_action",
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
  "chart_band_transition",
  // Written by Home Assistant itself (sections view, visibility conditions,
  // layout-card) – part of every card's config, never a typo.
  "grid_options",
  "layout_options",
  "visibility",
  "view_layout"
], nr = /* @__PURE__ */ new Set(), Bs = {
  name_entity: "Der Raumname kommt nur noch aus `name` (Editor: Allgemein → Raumname); ohne Eintrag gilt der Name des Temperatursensors."
};
function Is(r) {
  for (const t of Object.keys(r)) {
    if (Ls.includes(t) || nr.has(t)) continue;
    nr.add(t);
    const e = Bs[t], i = e ? `"${t}" wird nicht mehr unterstützt. ${e}` : `Unbekannter Konfigurationsschlüssel "${t}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`;
    console.warn(`[room-climate-card] ${i}`);
  }
}
function Ps(r) {
  const t = Os(r) ? r : {};
  Is(t);
  const e = q(t.temperature_entity), i = q(t.humidity_entity), n = q(t.window_entity), s = q(t.motion_entity), a = q(t.climate_entity), o = Fs(t.window_open_states), h = M(t.show_window) ?? !!n, l = M(t.show_motion) ?? !!s, c = M(t.show_thermostat) ?? !!a, d = M(t.show_temperature_chart) ?? !!e, m = M(t.show_humidity_chart) ?? !!i, f = t.height, p = f === "auto" || f === void 0 || f === null || f === 0 ? null : E(f, 120, 2e3, 0) || null, S = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", C = t.chart_curve === "linear" ? "linear" : "smooth", H = hs.includes(t.chart_smoothing) ? t.chart_smoothing : Ue, U = t.chart_gap_mode === "break" ? "break" : "connect", x = t.chart_gap_style === "dashed" ? "dashed" : "solid", z = t.chart_humidity_line_style === "dotted" ? "dotted" : "solid", O = Nt(
    t.accent_color ?? t.temperature_comfort_color,
    St.accent
  );
  return {
    raw: t,
    name: Mt(t.name),
    nameFontSize: Qe(t.name_font_size),
    icon: Mt(t.icon) ?? "mdi:home-thermometer-outline",
    height: p,
    borderRadius: t.border_radius === void 0 || t.border_radius === null || t.border_radius === "" ? null : E(t.border_radius, 0, 40, qe),
    padding: Math.round(
      E(
        t.card_padding,
        Qi.min,
        Qi.max,
        Cs
      )
    ),
    theme: S,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(E(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(E(t.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: rr(
          t.temperature_font_size,
          tr.temperature
        ),
        fontFamily: ir(t.temperature_font_family)
      },
      humidity: {
        fontSize: rr(t.humidity_font_size, tr.humidity),
        fontFamily: ir(t.humidity_font_family)
      }
    },
    showSeriesLabels: M(t.show_series_labels) ?? !0,
    accentColor: O,
    humidity: {
      color: Nt(t.humidity_color, St.humidity),
      comfort: (M(t.humidity_comfort) ?? !1) && i ? Ms(
        E(t.humidity_dry_below, 0, 100, Ji.dryBelow),
        E(t.humidity_humid_above, 0, 100, Ji.humidAbove)
      ) : null,
      showDewPoint: (M(t.show_dew_point) ?? !1) && !!(e && i)
    },
    window: {
      enabled: h && !!n,
      entity: n,
      openStates: o.length ? o : [...Hs],
      warnWhileHeating: M(t.show_window_warning) ?? !0
    },
    motion: {
      enabled: l && !!s,
      entity: s,
      showLastChanged: M(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: c && !!a,
      entity: a,
      showRow: M(t.show_climate_row) ?? !0,
      showSetpoint: M(t.show_setpoint) ?? !0,
      showStatus: M(t.show_hvac_status) ?? !0,
      showMode: M(t.show_hvac_mode) ?? !1,
      heatingColor: Nt(t.heating_color, St.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: Nt(t.heating_idle_color, O),
      offColor: Nt(t.heating_off_color, St.off)
    },
    chart: {
      showTemperature: d && !!e,
      showHumidity: m && !!i,
      hours: Math.round(E(t.chart_hours, 1, 168, 6)),
      height: Math.round(E(t.chart_height, 30, 400, 112)),
      curve: C,
      smoothing: H,
      gapMode: U,
      maxGapMinutes: Math.round(E(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: x,
      humidityLineStyle: z,
      showPoints: M(t.chart_show_points) ?? !1,
      showTooltip: M(t.chart_show_tooltip) ?? !0,
      showExtremes: M(t.chart_show_extremes) ?? !0,
      showAxis: M(t.chart_show_axis) ?? !0,
      fullBleed: M(t.chart_full_bleed) ?? !0,
      showChartSetpoint: M(t.chart_show_setpoint) ?? !0,
      showTemperatureGradient: M(t.chart_temperature_gradient) ?? !0,
      showHumidityGradient: M(t.chart_humidity_gradient) ?? !0,
      temperatureAreaOpacity: Math.round(E(t.chart_temperature_area_opacity, 10, 300, 100)) / 100,
      humidityAreaOpacity: Math.round(E(t.chart_humidity_area_opacity, 10, 300, 100)) / 100,
      opacity: Math.round(E(t.chart_opacity, 15, 100, 100)) / 100,
      temperatureBands: (M(t.chart_temperature_bands) ?? !1) && d,
      // Thresholds are sorted in `orderBandLimits`: a user may type 24 / 18 / 27.
      bandLimits: $s(
        E(t.chart_band_cold_below, -30, 60, se.coldBelow),
        E(t.chart_band_warm_above, -30, 60, se.warmAbove),
        E(t.chart_band_hot_above, -30, 60, se.hotAbove)
      ),
      bandTransition: Math.round(
        E(t.chart_band_transition, 0, 100, Fr)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: M(t.chart_show_grid) ?? !1
    },
    actions: Zn(t)
  };
}
function Us(r) {
  return r.chart.fullBleed ? -r.padding : 0;
}
function Ws(r) {
  const t = !r.chart.showAxis;
  return r.chart.fullBleed && t ? -r.padding : 0;
}
function Vs(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function Br(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Ir(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function Pr(r) {
  const t = Qe(r);
  return Math.round(t * 4 / 3);
}
function Gs(r) {
  const t = Qe(r);
  return Math.min(36, Math.round(t * 16 / Je));
}
function Qe(r) {
  return Math.round(
    E(r, he.min, he.max, Je)
  );
}
function De(r) {
  if (r.height) return r.height;
  const t = r.typography.temperature.fontSize, e = Br(r) ? r.chart.height : 0, i = Ir(r) ? 20 : 0, n = Math.max(28, Pr(r.nameFontSize) + 8), s = r.showSeriesLabels ? 20 : 0, a = Ur(r) ? 20 : 0;
  return r.padding * 2 + n + 12 + s + t + a + 8 + i + 12 + e;
}
function Ur(r) {
  return r.humidity.comfort !== null || r.humidity.showDewPoint;
}
function sr(r, t) {
  if (r.name) return r.name;
  for (const e of [r.temperatureEntity, r.humidityEntity]) {
    if (!e) continue;
    const i = t?.states[e]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  return "Raumklima";
}
const Ks = {
  roomClimate: "Raumklima",
  noEntities: "Keine Sensoren konfiguriert",
  noEntitiesHint: "Über den Karteneditor Temperatur- und Luftfeuchtesensor auswählen.",
  temperature: "Temperatur",
  humidity: "Luftfeuchte",
  humidityDry: "trocken",
  humidityComfortable: "angenehm",
  humidityHumid: "feucht – lüften",
  dewPoint: "Taupunkt",
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
  openDetails: "Details öffnen",
  runAction: "Aktion ausführen",
  confirmAction: "Wirklich ausführen?",
  windowHeatingWarning: "Fenster offen – Heizung läuft",
  chartExplore: "Verlauf: Pfeiltasten wählen einen Messwert",
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
}, js = {
  roomClimate: "Room climate",
  noEntities: "No sensors configured",
  noEntitiesHint: "Choose a temperature and humidity sensor in the card editor.",
  temperature: "Temperature",
  humidity: "Humidity",
  humidityDry: "dry",
  humidityComfortable: "comfortable",
  humidityHumid: "humid – ventilate",
  dewPoint: "Dew point",
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
  openDetails: "Show details",
  runAction: "Run action",
  confirmAction: "Are you sure?",
  windowHeatingWarning: "Window open – heating is on",
  chartExplore: "History: arrow keys step through the measurements",
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
}, Ys = Ks;
function We(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Zs(r) {
  const t = We(r) === "de" ? Ys : js;
  return {
    language: We(r),
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
function Lt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const ar = /* @__PURE__ */ new Map();
function Xs(r, t) {
  const e = `${r}|${t}`;
  let i = ar.get(e);
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
    ar.set(e, i);
  }
  return i;
}
function et(r, t, e) {
  return Number.isFinite(r) ? Xs(t || "en", Lt(Math.round(e), 0, 3)).format(r) : "–";
}
function Kt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function qs(r, t, e) {
  const i = Math.max(0, t - r), n = Math.floor(i / 6e4);
  if (n < 1) return e.justNow;
  if (n < 60) return `${n} ${e.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${e.hours}` : `${Math.floor(s / 24)} ${e.days}`;
}
function or(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Vt(r) {
  const t = r?.trim().toLowerCase();
  return t ? t.includes("°f") || t === "f" || t.startsWith("fahrenheit") ? "F" : t.includes("°c") || t === "c" || t.startsWith("celsius") ? "C" : null : null;
}
function Re(r, t, e) {
  if (!Number.isFinite(r)) return null;
  const i = Vt(t), n = Vt(e);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function Ve(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function Js(r) {
  return `#${r.map((t) => Lt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function ie(r, t) {
  const e = Ve(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${Lt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${Lt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(Lt(t, 0, 1) * 100)}%, transparent)`;
}
function me(r) {
  return r === "unavailable" || r === "unknown";
}
function lr(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const n = r?.states[t];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (me(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = Kt(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function hr(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (me(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return t.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : Es.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Qs = ["on", "detected", "motion", "occupied", "active"];
function ta(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (me(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (Qs.includes(a))
    return { status: "active", entity: i, rawState: n };
  const o = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (o.sinceMs = s), o;
}
const ea = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function ze(r, t, e) {
  const i = t.thermostat.entity, n = r?.config?.unit_system?.temperature, s = or(
    typeof n == "string" && Vt(n) ? n : void 0
  ), a = r?.states[i ?? ""]?.attributes?.unit_of_measurement, o = or(typeof a == "string" ? a : s);
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: o };
  const h = r?.states[i];
  if (!h)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: o };
  const l = h.state?.toLowerCase(), c = h.attributes?.hvac_action, d = typeof c == "string" ? c.toLowerCase() : void 0, m = h.attributes?.temperature, f = typeof m == "number" ? m : typeof m == "string" ? Kt(m) : null, p = {
    entity: h,
    action: d,
    setpoint: f,
    unit: o,
    mode: l,
    modeLabel: l ? e.mode(l) : void 0
  };
  return me(h.state ?? "") ? { ...p, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...p, status: "off", label: e.t("off"), colorKey: "off" } : d === "heating" ? { ...p, status: "heating", label: e.t("heating"), colorKey: "heating" } : d === "idle" ? { ...p, status: "idle", label: e.t("idle"), colorKey: "idle" } : d === "off" ? { ...p, status: "off", label: e.t("off"), colorKey: "off" } : d && !ea.includes(d) ? { ...p, status: "action", label: e.action(d), colorKey: "idle" } : d ? { ...p, status: "action", label: e.action(d), colorKey: "idle" } : {
    ...p,
    status: "unknown",
    label: p.modeLabel ?? e.t("statusUnknown"),
    colorKey: "unknown"
  };
}
function ia(r, t) {
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
function W(r) {
  return typeof r == "object" && r !== null;
}
function Wr(r) {
  if (!W(r)) return;
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
function ra(r) {
  if (W(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function cr(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const n = Wr(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = ra(i), a = Kt(s);
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
function dr(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = W(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in e)) continue;
      const a = cr(i);
      e[s] = aa(e[s], a);
    }
    return e;
  }
  if (W(r))
    for (const i of t) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : W(n) && Array.isArray(n.data) ? n.data : n;
      e[i] = cr(s);
    }
  return e;
}
function na(r, t) {
  if (!W(r)) return null;
  const i = (W(r.a) ? r.a : W(r.attributes) ? r.attributes : void 0)?.[t];
  return typeof i == "number" ? Number.isFinite(i) ? i : null : typeof i == "string" ? Kt(i) : null;
}
function ur(r, t) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const n of r) {
    const s = Wr(n);
    s === void 0 || !Number.isFinite(s) || e.push({ t: s, v: na(n, t) });
  }
  e.sort((n, s) => n.t - s.t);
  const i = [];
  for (const n of e) {
    const s = i[i.length - 1];
    s && s.t === n.t ? (i[i.length - 1] = n, i.length > 1 && i[i.length - 2].v === n.v && i.pop()) : (!s || s.v !== n.v) && i.push(n);
  }
  return i;
}
async function sa(r, t, e, i) {
  const n = new Date(i.start).toISOString(), s = new Date(i.end).toISOString(), a = r.connection;
  if (a && typeof a.sendMessagePromise == "function")
    try {
      const l = await a.sendMessagePromise({
        type: "history/history_during_period",
        start_time: n,
        end_time: s,
        entity_ids: [t],
        minimal_response: !1,
        no_attributes: !1,
        significant_changes_only: !1,
        include_start_time_state: !0
      });
      return ur(mr(l, t), e);
    } catch (l) {
      if (typeof r.callApi != "function") throw l;
    }
  if (typeof r.callApi != "function") return [];
  const o = `history/period/${encodeURIComponent(n)}?filter_entity_id=${encodeURIComponent(t)}&end_time=${encodeURIComponent(s)}`, h = await r.callApi("GET", o);
  return ur(mr(h, t), e);
}
function mr(r, t) {
  if (Array.isArray(r)) {
    for (const e of r) {
      if (!Array.isArray(e) || !e.length) continue;
      const i = e[0];
      if (W(i) && i.entity_id === t) return e;
    }
    return [];
  }
  if (W(r)) {
    const e = r[t];
    if (Array.isArray(e)) return e;
    if (W(e) && Array.isArray(e.data)) return e.data;
  }
  return [];
}
function aa(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((n, s) => n.t - s.t), i = [];
  for (const n of e) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function ae(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), n = new Date(e.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const h = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), l = dr(h, t);
      return Object.values(l).some((c) => c.length > 0), l;
    } catch (h) {
      if (!r.callApi) throw h;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((h) => encodeURIComponent(h)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, o = await r.callApi("GET", a);
  return dr(o, t);
}
function oa(r, t, e = "history") {
  const i = `${[...r].sort().join("|")}@${t}`;
  return e === "statistics" ? `${i}#stats` : i;
}
const la = 48;
function ha(r) {
  return r > la ? "statistics" : "history";
}
function pr(r) {
  if (typeof r == "number" && Number.isFinite(r)) return r > 1e12 ? r : r * 1e3;
  if (typeof r == "string") {
    const t = Date.parse(r);
    return Number.isFinite(t) ? t : void 0;
  }
}
function ca(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (!W(r)) return e;
  for (const i of t) {
    const n = r[i];
    if (!Array.isArray(n)) continue;
    const s = [];
    for (const a of n) {
      if (!W(a)) continue;
      const o = pr(a.start);
      if (o === void 0) continue;
      const h = pr(a.end) ?? o + 300 * 1e3, l = typeof a.mean == "number" && Number.isFinite(a.mean) ? a.mean : null;
      s.push({ t: Math.round((o + h) / 2), v: l });
    }
    s.sort((a, o) => a.t - o.t), e[i] = s;
  }
  return e;
}
async function da(r, t, e) {
  if (!t.length) return {};
  const i = r.connection;
  if (!i || typeof i.sendMessagePromise != "function")
    return ae(r, t, e);
  let n;
  try {
    const a = await i.sendMessagePromise({
      type: "recorder/statistics_during_period",
      start_time: new Date(e.start).toISOString(),
      end_time: new Date(e.end).toISOString(),
      statistic_ids: t,
      period: "5minute",
      types: ["mean"]
    });
    n = ca(a, t);
  } catch {
    return ae(r, t, e);
  }
  const s = t.filter((a) => !n[a]?.some((o) => o.v !== null));
  if (s.length) {
    const a = await ae(r, s, e);
    for (const o of s) n[o] = a[o] ?? [];
  }
  return n;
}
class Vr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map(), this.attributeCache = /* @__PURE__ */ new Map(), this.attributeInflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, n = Date.now(), s = {}) {
    const a = s.source ?? "history", o = oa(e, i, a), h = Math.max(0, s.maxAgeMs ?? 12e4), l = this.cache.get(o);
    if (l && h > 0 && n - l.fetchedAt < h)
      return l.data;
    const c = this.inflight.get(o);
    if (c) return c;
    const d = { start: n - i * 60 * 60 * 1e3, end: n }, m = (a === "statistics" ? da(t, e, d) : ae(t, e, d)).then((f) => {
      if (this.cache.set(o, { fetchedAt: Date.now(), data: f }), this.cache.size > 24) {
        const p = this.cache.keys().next();
        p.done || this.cache.delete(p.value);
      }
      return f;
    }).finally(() => {
      this.inflight.delete(o);
    });
    return this.inflight.set(o, m), m;
  }
  /**
   * Step series of one attribute (the thermostat target), cached like the
   * sensor curves. Kept apart from {@link load}: it needs full rows with
   * attributes, which would make the sensor request needlessly heavy.
   */
  async loadAttribute(t, e, i, n, s = Date.now(), a = {}) {
    const o = `${e}@${n}#attr:${i}`, h = Math.max(0, a.maxAgeMs ?? 12e4), l = this.attributeCache.get(o);
    if (l && h > 0 && s - l.fetchedAt < h) return l.data;
    const c = this.attributeInflight.get(o);
    if (c) return c;
    const d = { start: s - n * 60 * 60 * 1e3, end: s }, m = sa(t, e, i, d).then((f) => {
      if (this.attributeCache.set(o, { fetchedAt: Date.now(), data: f }), this.attributeCache.size > 24) {
        const p = this.attributeCache.keys().next();
        p.done || this.attributeCache.delete(p.value);
      }
      return f;
    }).finally(() => {
      this.attributeInflight.delete(o);
    });
    return this.attributeInflight.set(o, m), m;
  }
  clear() {
    this.cache.clear(), this.inflight.clear(), this.attributeCache.clear(), this.attributeInflight.clear();
  }
}
const fr = /* @__PURE__ */ new WeakMap();
function ua(r) {
  const t = r.connection;
  if (!t || typeof t != "object") return;
  let e = fr.get(t);
  return e || (e = new Vr(), fr.set(t, e)), e;
}
const P = (r) => w`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, G = {
  thermometer: () => P(w`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => P(w`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => P(
    w`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => P(
    w`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => P(
    w`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  /**
   * Standing figure: "nobody is moving" must not depend on colour alone, so
   * the idle badge gets its own shape next to the running figure above.
   */
  motionOff: () => P(
    w`<circle cx="12" cy="4.4" r="1.9" /><path d="M12 8.2v6.3M12 14.5 9.8 21M12 14.5l2.2 6.5M8.4 10.6h7.2" />`
  ),
  flame: () => P(
    w`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => P(
    w`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => P(w`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => P(
    w`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => P(w`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => P(w`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => P(w`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => P(
    w`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const ma = (r) => r.strings === void 0;
const pa = { CHILD: 2 }, fa = (r) => (...t) => ({ _$litDirective$: r, values: t });
class ga {
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
const Bt = (r, t) => {
  const e = r._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), Bt(i, t);
  return !0;
}, ce = (r) => {
  let t, e;
  do {
    if ((t = r._$AM) === void 0) break;
    e = t._$AN, e.delete(r), r = t;
  } while (e?.size === 0);
}, Gr = (r) => {
  for (let t; t = r._$AM; r = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(r)) break;
    e.add(r), wa(t);
  }
};
function ya(r) {
  this._$AN !== void 0 ? (ce(this), this._$AM = r, Gr(this)) : this._$AM = r;
}
function ba(r, t = !1, e = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (t) if (Array.isArray(i)) for (let s = e; s < i.length; s++) Bt(i[s], !1), ce(i[s]);
  else i != null && (Bt(i, !1), ce(i));
  else Bt(this, r);
}
const wa = (r) => {
  r.type == pa.CHILD && (r._$AP ??= ba, r._$AQ ??= ya);
};
class _a extends ga {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Gr(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (Bt(this, t), ce(this));
  }
  setValue(t) {
    if (ma(this._$Ct)) this._$Ct._$AI(t, this);
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
const Z = () => new va();
class va {
}
const Oe = /* @__PURE__ */ new WeakMap(), X = fa(class extends _a {
  render(r) {
    return g;
  }
  update(r, [t]) {
    const e = t !== this.G;
    return e && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = r.options?.host, this.rt(this.ct = r.element)), g;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = Oe.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), Oe.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? Oe.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function $a(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const n = ps(e, t), s = n.map((o) => e[o]), a = [];
  for (let o = 1; o < n.length; o++)
    a.push(i.slice(n[o - 1] + 1, n[o] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const xa = 320, Sa = 112, Aa = 4e3, ka = 150, Ma = 14, Ta = 2.8, re = 6, gr = 24 * 3600 * 1e3, Ca = 70, Ha = 72, Ea = 26, Da = 6.6, yr = 9, br = 3, wr = /* @__PURE__ */ new Set();
function Ra(r, t) {
  const e = `${r}|${t}`;
  wr.has(e) || (wr.add(e), console.info(
    `[room-climate-card] Minimum/Maximum der ${t} ausgeblendet: ${r}. Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.`
  ));
}
const za = 0.3, Oa = 0.44, Na = { minSpan: 0.4, padding: 0.15 }, Fa = { minSpan: 3, padding: 0.15 };
let La = 0;
class Ba extends bt {
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
    }, this.uid = `rcc-chart-${++La}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = Z(), this.crosshairRef = Z(), this.temperatureDotRef = Z(), this.humidityDotRef = Z(), this.tooltipRef = Z(), this.tooltipTimeRef = Z(), this.tooltipTemperatureRef = Z(), this.tooltipHumidityRef = Z(), this.tooltipTemperatureRowRef = Z(), this.tooltipHumidityRowRef = Z(), this.liveRef = Z(), this.onFocus = () => {
      if (this.hoverTime !== void 0) return;
      const t = this.keyboardTimes();
      t.length && this.showHoverAt(t[t.length - 1], !0);
    }, this.onBlur = () => {
      this.hideHover();
    }, this.onKeyDown = (t) => {
      if (!this.showTooltip) return;
      const e = this.keyboardTimes();
      if (!e.length) return;
      const i = this.hoverTime ?? e[e.length - 1];
      let n = e.findIndex((o) => o >= i);
      n < 0 && (n = e.length - 1);
      const s = e[n] === i;
      let a;
      switch (t.key) {
        case "ArrowLeft":
        case "ArrowDown":
          a = e[Math.max(0, n - 1)];
          break;
        case "ArrowRight":
        case "ArrowUp":
          a = e[Math.min(e.length - 1, s ? n + 1 : n)];
          break;
        case "PageDown":
          a = e[Math.max(0, n - 10)];
          break;
        case "PageUp":
          a = e[Math.min(e.length - 1, n + 10)];
          break;
        case "Home":
          a = e[0];
          break;
        case "End":
          a = e[e.length - 1];
          break;
        case "Escape":
          this.hideHover(), t.preventDefault();
          return;
        default:
          return;
      }
      t.preventDefault(), this.lastPointerType = "keyboard", this.clearHoverTimer(), a !== void 0 && this.showHoverAt(a, !0);
    }, this.onPointerDown = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerMove = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerUp = (t) => {
      (t.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), Aa));
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
      setpointHistory: { attribute: !1 },
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
    this.styles = je`
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
    /* Quiet corner mark: the curve shown is the last good one, not live. */
    .stale {
      position: absolute;
      top: 4px;
      right: 6px;
      display: inline-flex;
      color: var(--rcc-muted, rgba(255, 255, 255, 0.5));
      pointer-events: auto;
    }
    .stale svg {
      width: 12px;
      height: 12px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
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
    .overlay:focus {
      outline: none;
    }
    .overlay:focus-visible {
      outline: 2px solid var(--rcc-focus, currentColor);
      outline-offset: -2px;
      border-radius: 4px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
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
      width: this.width > 20 ? this.width : xa,
      height: this.height > 20 ? this.height : Sa
    };
  }
  stateView(t, e, i) {
    return b`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? b`<span class="state-hint">${i}</span>` : g}
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
    if (t < 40 || e < 34) return g;
    const i = w`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(t, e);
    return this.hoverGeometry = a, b`<div class="wrap">
      ${s}${this.renderOverlay(a)}${this.renderStaleMark(i)}
    </div>`;
  }
  /**
   * The last good curve stays visible when a refresh fails – but it must not
   * pass for live data. A small mark in the corner says so; hover or a screen
   * reader gets the reason.
   */
  renderStaleMark(t) {
    return this.error ? b`<span
      class="stale"
      role="status"
      title=${this.labels.error}
      aria-label=${this.labels.error}
      >${t}</span
    >` : g;
  }
  renderChart(t, e) {
    const i = e, n = this.showAxis && i >= 62, s = n ? 20 : 0.5, a = 6, o = i - s, h = Math.max(6, o - a), l = 0, c = t - 1 - Ta, d = t, m = 3, f = Math.max(1, this.end - this.start), p = te([this.start, this.end], [l, c]), S = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, C = te(
      [this.start, this.end],
      [l + S, d - S]
    ), H = i - 6, U = this.temperature !== void 0, x = this.humidity !== void 0, z = U !== x, O = a, L = z ? o : a + h * za, R = z ? a : a + h * Oa, J = o, jt = this.temperatureVisible ? this.temperature ?? [] : [], ti = this.humidityVisible ? this.humidity ?? [] : [], pe = jt.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), jr = ti.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), rt = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, ot = this.setpointHistory && this.setpointHistory.length ? bs(this.setpointHistory, this.start, this.end) : [], lt = ot.length > 0, Yr = lt ? [...pe, ...ot.flat().map((u) => u.v)] : rt !== null ? [...pe, rt] : pe, fe = Pi(Yr), ge = Pi(jr), ht = fe ? Ui(fe[0], fe[1], Na) : null, Tt = ge ? Ui(ge[0], ge[1], Fa) : null, T = ht ? te(ht, [J, R]) : null, ct = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), nt = this.temperatureBands && ht ? xs(
      ht,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: Me, normal: this.accentColor, warm: Te, hot: Ce },
      this.bandTransition
    ) : null, ei = (u) => J === R ? 0 : (u - R) / (J - R), ii = ct < 1 ? `;stroke-opacity:${ct}` : "", ri = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * ct), ni = ri(this.temperatureAreaOpacity), si = ri(this.humidityAreaOpacity), ai = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * ni).toFixed(3)
      )
    ), Zr = nt ? nt.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: ai(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: ai(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * ni).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], Xr = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * si).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * si).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], N = Tt ? te(Tt, [L, O]) : null, dt = Vi(jt, this.start, this.end), Yt = Vi(ti, this.start, this.end), oi = {
      rangeMs: f,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Zt = this.curve === "smooth", li = (u) => {
      if (!Zt || u.length < 5) return u;
      const y = Er(u), v = Math.min(
        us(y, this.smoothing),
        u.length % 2 ? u.length : u.length - 1
      );
      return v < 3 ? u : ls(u, v, {
        maxDeltaMs: ms(v, y)
      });
    }, qr = li(dt), Jr = li(Yt), hi = ht ? Wi(qr, oi) : [], ci = Tt ? Wi(Jr, oi) : [], Qr = Math.max(1, hi.length + ci.length), tn = Math.max(60, Math.floor(1200 / Qr)), di = (u) => u.map((y) => $a(y, tn)), Ct = di(hi), Ht = di(ci), ui = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const y = a + h * u / 3;
        ui.push(w`<line class="grid-line" x1=${l} x2=${d} y1=${y} y2=${y} />`);
      }
    const en = Math.max(1, d - l - 2 * S), mi = f / en, rn = t < 200 ? 1 : t < 300 ? 2 : 3, nn = n ? gs(this.start, this.end, {
      maxTicks: rn,
      endClearanceMs: Ca * mi,
      minSpacingMs: Ha * mi,
      offsetAt: (u) => this.zoneOffset(u)
    }) : [], pi = l + S, sn = n ? [
      ...nn.map((u) => {
        const y = C(u), v = y - Ea < pi ? "start" : "middle";
        return w`<text class="axis-label" x=${Math.max(y, pi)} y=${H} text-anchor=${v}>
              ${this.formatAxisLabel(u, !1, f > gr)}
            </text>`;
      }),
      w`<text class="axis-label" x=${C(this.end)} y=${H} text-anchor="end">
            ${this.formatAxisLabel(this.end, !0)}
          </text>`
    ] : [], an = (u) => {
      if (u.length < 2) return u;
      const y = u[u.length - 1];
      return y.x < c - 0.75 ? u : [...u, { x: d, y: y.y }];
    }, Xt = (u, y) => an(is(u, p, y)), on = (u, y, v) => (this.gapStyle === "dashed" ? es(u) : [u.samples]).filter((k) => k.length > 1).flatMap((k) => {
      const K = Xt(k, y);
      return !v || !nt ? [{ d: zr(K, Zt).concat() }] : As(K, Zt, nt, ei);
    }).filter((k) => k.d.length > 0), fi = (u, y, v, $ = {}) => {
      const k = on(u, y, $.banded === !0), K = ct < 1 ? `opacity:${ct}` : "", j = k.map(({ d: F, color: B }, I) => {
        const $e = $.banded && k.length > 1 ? `stroke-linecap:${I === 0 || I === k.length - 1 ? "round" : "butt"};` : "", qt = [
          `stroke:${B ?? $.color ?? v}`,
          $e,
          $.width ? `stroke-width:${$.width}` : "",
          $.dashed ? "stroke-dasharray:0.1 5.5" : "",
          $.banded ? "" : ii.replace(/^;/, "")
        ].filter(Boolean).join(";");
        return w`<path class="series-line" d=${F} style=${qt}></path>`;
      });
      return !$.banded || k.length < 2 ? j : [w`<g class="series-runs" style=${K}>${j}</g>`];
    }, ln = Ct.flatMap(
      (u) => fi(u, T, this.accentColor, {
        color: this.accentColor,
        banded: nt !== null
      })
    ), gi = (u, y, v) => u.filter(($) => $.samples.length > 1).map(($) => os(Xt($.samples, y), v, Zt)).join(" "), yi = T && this.showTemperatureArea ? gi(Ct, T, o) : "", hn = yi ? [w`<path class="series-area" d=${yi} style="fill:url(#${this.uid}-temp-fill)" />`] : [], bi = N && this.showHumidityArea ? gi(Ht, N, L) : "", cn = bi ? [
      w`<path class="series-area" d=${bi} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], wi = this.humidityLineStyle === "dotted", dn = Ht.flatMap(
      (u) => fi(u, N, this.humidityColor, {
        color: this.humidityColor,
        dashed: wi,
        width: wi ? 2.2 : 1.9
      })
    ), _i = [];
    if (this.showPoints) {
      const u = (y, v, $) => {
        const k = y.filter((F) => F.v !== null);
        if (!k.length) return;
        const j = Math.max(1, Math.ceil(k.length / 24));
        k.forEach((F, B) => {
          if (B % j !== 0 && B !== k.length - 1) return;
          const I = F.v;
          _i.push(
            w`<circle class="point" r="1.7" cx=${p(F.t)} cy=${v(I)} style="stroke:${$}${ii}" />`
          );
        });
      };
      T && Ct.forEach((y) => u(y.samples, T, this.accentColor)), N && Ht.forEach(
        (y) => u(y.samples, N, this.humidityColor)
      );
    }
    const ye = ot[0]?.[0], vi = ot[ot.length - 1], be = vi?.[vi.length - 1], Et = lt ? {
      left: ye && ye.from <= this.start ? ye.v : null,
      right: be && be.to >= this.end ? be.v : null
    } : { left: rt, right: rt }, un = (u) => {
      if (!lt) return rt;
      for (const y of ot)
        for (const v of y) if (u >= v.from && u <= v.to) return v.v;
      return null;
    }, we = (u) => u !== null && T ? T(u) : null, mn = (u) => we(un(u)), _t = lt ? null : we(rt), vt = this.showSetpoint && T !== null && (lt || _t !== null && Number.isFinite(_t) && _t >= R - 0.5 && _t <= J + 0.5), pn = vt && lt && T ? ws(ot, p, T) : "", fn = dt.find((u) => u.v !== null)?.v ?? null, gn = [...dt].reverse().find((u) => u.v !== null)?.v ?? null, $i = (u, y) => u === null || y === null ? 0 : Math.abs(u - y), xi = Et.right === null && Et.left !== null ? "left" : $i(gn, Et.right) >= $i(fn, Et.left) ? "right" : "left", ut = {};
    for (const u of ["left", "right"]) {
      const y = we(Et[u]);
      y !== null && Number.isFinite(y) && (ut[u] = y);
    }
    const yn = Object.keys(ut).length > 0, Si = (u) => {
      for (let y = u.length - 1; y >= 0; y -= 1) {
        const v = u[y].samples;
        for (let $ = v.length - 1; $ >= 0; $ -= 1)
          if (v[$].v !== null) return v[$];
      }
    }, mt = Si(Ct), $t = Si(Ht), bn = this.labels.setpoint.length * Da + 2, Dt = vt && yn ? _s({
      lineY: ut[xi] ?? 0,
      lineYBySide: ut,
      left: l + m,
      right: d - m,
      width: bn,
      height: yr,
      top: a,
      bottom: o,
      curves: [
        ...T ? Ct.filter((u) => u.samples.length > 1).map((u) => Xt(u.samples, T)) : [],
        ...N ? Ht.filter((u) => u.samples.length > 1).map((u) => Xt(u.samples, N)) : []
      ],
      dots: [
        ...mt && T ? [{ x: p(mt.t), y: T(mt.v), r: 2.8 }] : [],
        ...$t && N ? [{ x: p($t.t), y: N($t.v), r: 2.6 }] : []
      ],
      preferredSide: xi
    }) : null, Ai = Dt && ut[Dt.side] !== void 0 ? Dt.side : ut.right !== void 0 ? "right" : "left", _e = Ai === "right", Rt = vt ? ut[Ai] ?? null : null, ki = Rt === null ? 0 : Dt && !Dt.above ? Rt + br + yr - 1 : Rt - br - 1, wn = vt && rt !== null ? `${this.labels.setpoint} ${et(rt, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", Mi = (u, y, v, $) => {
      const k = ji(y);
      if (!k || k.min.v === k.max.v) return "";
      const K = et(k.min.v, this.language, $), j = et(k.max.v, this.language, $);
      return `${u} ${K}–${j}${v ? ` ${v}` : ""}`;
    }, _n = this.temperatureUnit || this.setpointUnit, vn = (() => {
      if (!nt || !T) return "";
      const u = dt.map((I) => I.v).filter((I) => I !== null && Number.isFinite(I));
      if (!u.length) return "";
      const y = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, v = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, $ = { cold: Me, normal: this.accentColor, warm: Te, hot: Ce }, k = Zi(Math.min(...u), y, $), K = Zi(Math.max(...u), y, $), j = (I) => I === Me ? v.cold : I === Te ? v.warm : I === Ce ? v.hot : v.normal, F = j(k), B = j(K);
      return F === B ? `(${F})` : `(${F} – ${B})`;
    })(), $n = [
      this.labels.aria,
      wn,
      T ? Mi(this.labels.temperature, dt, _n, this.temperatureDecimals) : "",
      N ? Mi(this.labels.humidity, Yt, this.humidityUnit, this.humidityDecimals) : "",
      vn
    ].filter(Boolean).join(". "), ve = [], Ti = (u, y, v, $, k, K, j) => {
      if (!this.showExtremes) return;
      const F = (_) => Ra(_, j);
      if (t < ka) return F("schmale Karte");
      if ($ - v < Ma) return F("flaches Band");
      const B = ji(u);
      if (!B) return F("keine Messwerte");
      if (u.filter((_) => _.v !== null).length < 3) return F("zu wenige Messwerte");
      const $e = (B.min.v === B.max.v ? [{ sample: B.max, isMax: !0 }] : [
        { sample: B.max, isMax: !0 },
        { sample: B.min, isMax: !1 }
      ]).map(({ sample: _, isMax: Y }) => {
        const Jt = p(_.t), D = y(_.v), V = D - 11 >= v, Qt = D + 17 <= $, pt = V ? D - 9 : v + 8, st = Qt ? D + 15 : $ - 1;
        let xe = Y ? V ? pt : st : Qt ? st : pt;
        const Se = vt ? mn(_.t) : null;
        if (Se !== null && Math.abs(xe - Se) < 9) {
          const Ci = Y ? st : pt;
          Math.abs(Ci - Se) >= 9 && (xe = Ci);
        }
        return { sample: _, cx: Jt, cy: D, labelY: xe, isMax: Y };
      }).filter((_) => Number.isFinite(_.cx) && Number.isFinite(_.cy)).filter((_) => _.cy >= v - 1 && _.cy <= $ + 1), qt = (_, Y) => Math.abs(_.labelY - Y.labelY) < 9 && Math.abs(_.cx - Y.cx) < 34;
      let Q = [...$e];
      if (Q.length === 2 && qt(Q[0], Q[1])) {
        for (const _ of Q)
          _.labelY = _.isMax ? v + 8 : $ - 1;
        qt(Q[0], Q[1]) && (Q = Q.filter((_) => _.isMax));
      }
      for (const _ of Q) {
        if (!_) continue;
        const Y = 26, Jt = _.cx < (l + c) / 2;
        let D = Jt ? _.cx + 6 : _.cx - 6, V = Jt ? "start" : "end";
        V === "start" && D + Y > d - re ? (D = _.cx - 6, V = "end") : V === "end" && D - Y < l + re && (D = _.cx + 6, V = "start");
        const Qt = _e ? d - m : l + m, pt = (st) => Rt !== null && Math.abs(_.labelY - ki) < 9 && Math.abs(st - Qt) < 40;
        if (pt(D)) {
          const st = V === "start" ? _.cx - 6 : _.cx + 6;
          pt(st) || (D = st, V = V === "start" ? "end" : "start");
        }
        D = V === "start" ? Math.min(D, d - re - Y) : Math.max(D, l + re + Y), ve.push(
          w`<circle
            class="extreme-dot"
            r="1.8"
            cx=${_.cx}
            cy=${_.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${k};stroke-width:1.2`}
          />`
        ), pt(D) || ve.push(
          w`<text class="extreme-label" x=${D} y=${_.labelY} text-anchor=${V}>${et(
            _.sample.v,
            this.language,
            K
          )}</text>`
        );
      }
    };
    T && Ti(
      dt,
      T,
      R,
      J,
      this.accentColor,
      this.temperatureDecimals,
      "Temperatur"
    ), N && Ti(
      Yt,
      N,
      O,
      L,
      this.humidityColor,
      this.humidityDecimals,
      "Luftfeuchte"
    );
    const xn = {
      width: t,
      height: i,
      left: l,
      right: c,
      plotTop: a,
      plotBottom: o,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: T && ht ? { samples: dt, domain: ht, top: R, bottom: J } : null,
      humidity: N && Tt ? { samples: Yt, domain: Tt, top: O, bottom: L } : null
    };
    return { chart: w`<svg
      width=${t}
      height=${i}
      viewBox="0 0 ${t} ${i}"
      role="img"
      aria-label=${$n}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${R} x2="0" y2=${J} gradientUnits="userSpaceOnUse">
          ${Zr.map(
      (u) => w`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${O} x2="0" y2=${L} gradientUnits="userSpaceOnUse">
          ${Xr.map(
      (u) => w`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${ui}
      ${cn}
      ${hn}
      ${vt ? w`${lt ? w`<path
                class="setpoint-line is-stepped"
                d=${pn}
                fill="none"
                style="stroke:${this.accentColor};stroke-opacity:0.42"
              ></path>` : w`<line
                class="setpoint-line"
                x1=${l}
                x2=${c}
                y1=${_t}
                y2=${_t}
                style="stroke:${this.accentColor};stroke-opacity:0.42"
              ></line>`}
          ${Rt === null ? g : w`<text
            class="setpoint-caption"
            x=${_e ? d - m : l + m}
            y=${ki}
            text-anchor=${_e ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>`}` : g}
      ${/*
    * With the time row the baseline separates plot and labels. Without it
    * the plot ends on the card's own edge – a second line there read as a
    * thicker border than the sides.
    */
    n ? w`<line class="baseline" x1=${l} x2=${d} y1=${o} y2=${o} />` : g}
      ${dn} ${ln} ${_i}
      ${$t && N ? w`<circle
            class="end-dot"
            r="2.6"
            cx=${p($t.t)}
            cy=${N($t.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${ct}`}
          />` : g}
      ${mt && T ? w`<circle
            class="end-dot"
            r="2.8"
            cx=${p(mt.t)}
            cy=${T(mt.v)}
            style=${`fill:${nt ? Lr(nt, ei(T(mt.v))) : this.accentColor};fill-opacity:${ct}`}
          />` : g}
      ${ve}
      ${sn}
    </svg>`, geometry: xn };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(t) {
    if (!this.showTooltip || !t.temperature && !t.humidity) return g;
    const e = Math.round(t.plotTop), i = Math.max(1, Math.round(t.plotBottom - t.plotTop));
    return b`<div
        class="overlay"
        style=${`top:${e}px;height:${i}px;--rcc-focus:${this.accentColor}`}
        tabindex="0"
        role="group"
        aria-label=${this.labels.explore ?? this.labels.aria}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
        @keydown=${this.onKeyDown}
        @focus=${this.onFocus}
        @blur=${this.onBlur}
      ></div>
      <span class="sr-only" aria-live="polite" ${X(this.liveRef)}></span>
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
  /** Measured instants of both series, ascending – the stops of the arrow keys. */
  keyboardTimes() {
    const t = this.hoverGeometry;
    if (!t) return [];
    const e = /* @__PURE__ */ new Set();
    for (const i of [t.temperature, t.humidity])
      for (const n of i?.samples ?? [])
        n.v !== null && n.t >= t.start && n.t <= t.end && e.add(n.t);
    return [...e].sort((i, n) => i - n);
  }
  updateHoverAt(t) {
    const e = this.hoverGeometry;
    if (!e) return;
    const n = t.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : e.width;
    if (!s) return;
    const a = n ? n.left : 0, o = Math.min(1, Math.max(0, (t.clientX - a) / s)), h = e.start + o * (e.end - e.start);
    this.showHoverAt(h);
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
    const n = et(t, this.language, i);
    return e ? `${n} ${e}` : n;
  }
  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  showHoverAt(t, e = !1) {
    const i = this.hoverGeometry, n = this.hoverRef.value;
    if (!i || !n) return;
    const s = i.temperature ? ee(i.temperature.samples, t) : null, a = i.humidity ? ee(i.humidity.samples, t) : null;
    let o = s ?? a;
    if (s && a && (o = Math.abs(s.t - t) <= Math.abs(a.t - t) ? s : a), !o) {
      this.hideHover();
      return;
    }
    const h = o.t, l = this.crosshairRef.value, c = this.xForTime(h, i);
    l && (l.style.left = `${c}px`);
    const d = i.temperature ? ee(i.temperature.samples, h) : null, m = i.humidity ? ee(i.humidity.samples, h) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      i.temperature,
      d,
      c
    ), this.placeDot(this.humidityDotRef.value, i.humidity, m, c);
    const f = this.tooltipRef.value, p = this.tooltipTimeRef.value, S = this.tooltipTemperatureRowRef.value, C = this.tooltipHumidityRowRef.value, H = this.tooltipTemperatureRef.value, U = this.tooltipHumidityRef.value, x = this.temperatureUnit || this.setpointUnit;
    if (p && (p.textContent = this.formatDayTime(h)), S && (S.hidden = !d), C && (C.hidden = !m), H && d && (H.textContent = this.tooltipValue(
      d.v,
      x,
      this.temperatureDecimals
    )), U && m && (U.textContent = this.tooltipValue(
      m.v,
      this.humidityUnit,
      this.humidityDecimals
    )), f) {
      f.dataset.time = String(h);
      const O = f.offsetWidth || 84, L = f.offsetHeight || 38;
      let R = c + 10;
      R + O > i.width - 4 && (R = c - 10 - O), R = Math.max(4, Math.min(R, Math.max(4, i.width - O - 4)));
      const J = Math.max(2, Math.min(i.plotTop + 2, i.height - L - 2));
      f.style.left = `${R}px`, f.style.top = `${J}px`;
    }
    n.hidden = !1, this.hoverTime = h;
    const z = this.liveRef.value;
    z && e && (z.textContent = [
      p?.textContent ?? "",
      d && H ? `${this.labels.temperature} ${H.textContent}` : "",
      m && U ? `${this.labels.humidity} ${U.textContent}` : ""
    ].filter(Boolean).join(", "));
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
    this.clearHoverTimer(), this.hoverTime = void 0;
    const t = this.hoverRef.value;
    t && (t.hidden = !0);
  }
  clearHoverTimer() {
    this.hoverHideTimer && clearTimeout(this.hoverHideTimer), this.hoverHideTimer = void 0;
  }
  /**
   * Offset of the displayed zone at `time` in ms (local = utc + offset), so the
   * axis can put its ticks on full local hours. Browser zone without a zone set;
   * an invalid zone falls back to it as well, like the labels do.
   */
  zoneOffset(t) {
    const e = -new Date(t).getTimezoneOffset() * 6e4, i = this.timeZone;
    if (!i) return e;
    try {
      this.offsetFormatter?.zone !== i && (this.offsetFormatter = {
        zone: i,
        format: new Intl.DateTimeFormat("en-US", {
          timeZone: i,
          hourCycle: "h23",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      });
      const n = {};
      for (const a of this.offsetFormatter.format.formatToParts(new Date(t)))
        a.type !== "literal" && (n[a.type] = Number(a.value));
      return Date.UTC(
        n.year,
        n.month - 1,
        n.day,
        n.hour % 24,
        n.minute,
        n.second
      ) - Math.floor(t / 1e3) * 1e3;
    } catch {
      return e;
    }
  }
  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  formatAxisLabel(t, e, i = !1) {
    return e ? this.labels.now : i && Math.round((t + this.zoneOffset(t)) % gr) === 0 ? this.formatWeekday(t) : this.formatDayTime(t);
  }
  formatWeekday(t) {
    try {
      return new Intl.DateTimeFormat(this.language || "en", {
        weekday: "short",
        ...this.timeZone ? { timeZone: this.timeZone } : {}
      }).format(new Date(t)).replace(/[.,]/g, "").trim();
    } catch {
      return this.formatDayTime(t);
    }
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
const _r = "room-climate-chart";
typeof customElements < "u" && !customElements.get(_r) && customElements.define(_r, Ba);
const Ne = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Ia = {
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
    radiusHelper: "Ohne Eintrag gilt der Radius des Home-Assistant-Themes (wie bei allen anderen Karten). „Abschnitt zurücksetzen“ kehrt dorthin zurück.",
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
    humidityComfort: "Luftfeuchte bewerten",
    humidityComfortHelper: "Zeigt unter dem Wert „trocken“, „angenehm“ oder „feucht – lüften“. Über der oberen Grenze steigt das Schimmelrisiko.",
    humidityDryBelow: "Trocken unter",
    humidityHumidAbove: "Feucht über",
    dewPoint: "Taupunkt anzeigen",
    dewPointHelper: "Berechnet aus Temperatur und Luftfeuchte (Magnus-Formel). Kühlt eine Wand oder ein Fenster unter diesen Wert, schlägt sich dort Feuchtigkeit nieder.",
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
    actions: "Aktionen",
    tapAction: "Tippen",
    holdAction: "Gedrückt halten",
    doubleTapAction: "Doppelt tippen",
    tapHelper: "Standard: Tippen öffnet den Dialog des Thermostats (Solltemperatur, Modus), ohne Thermostat den des Temperatursensors. Halten und doppelt Tippen tun nichts, bis hier eine Aktion gewählt ist. Der Verlauf behält seine Tipps, solange er die Werte anzeigt.",
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
    setpointLineHelper: "Die gestrichelte Linie der Solltemperatur samt „Soll“-Beschriftung. Sie folgt dem Verlauf: zu jedem Zeitpunkt der damals eingestellte Wert. Aus: der Verlauf zeigt nur die Messwerte, die Solltemperatur steht weiterhin in der Statuszeile.",
    axis: "Zeitangaben unter dem Verlauf",
    axisHelper: "Die unterste Zeile mit Startzeit, Mitte und „Jetzt“. Ohne sie gehört der Platz den Kurven; die Zeit steht weiterhin im Tooltip und in der Beschreibung für Screenreader.",
    points: "Datenpunkte",
    tooltip: "Werte beim Überfahren",
    extremes: "Minimum/Maximum im Chart anzeigen",
    comfortHelper: "Beim Zeigen auf die Kurve erscheinen Uhrzeit und die echten Messwerte. Minimum und Maximum stehen dauerhaft an der Kurve.",
    missingEntity: "Bitte eine Entität auswählen.",
    loading: "Editor wird geladen …",
    generalHelper: "Alle Werte sind optional – die Karte funktioniert auch mit Teilkonfiguration.",
    windowWarning: "Warnen, wenn das Fenster offen ist und geheizt wird",
    windowWarningHelper: "Zeigt „Fenster offen – Heizung läuft“, solange beides zutrifft. Braucht Fenstersensor und Thermostat.",
    presets: "Vorlage",
    presetsHelper: "Setzt Schriftgrößen, Abstände und Verlauf auf eine passende Kombination. Sensoren, Farben und Aktionen bleiben, wie sie sind.",
    presetStandard: "Standard",
    presetCompact: "Kompakt",
    presetWall: "Wandtablet",
    presetMinimal: "Minimal",
    resetSection: "Abschnitt auf Standard zurücksetzen"
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
    radiusHelper: "Without a value the card uses the Home Assistant theme radius, like every other card. “Reset this section” returns to it.",
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
    humidityComfort: "Rate the humidity",
    humidityComfortHelper: "Shows “dry”, “comfortable” or “humid – ventilate” below the value. Above the upper limit the risk of mould rises.",
    humidityDryBelow: "Dry below",
    humidityHumidAbove: "Humid above",
    dewPoint: "Show dew point",
    dewPointHelper: "Computed from temperature and humidity (Magnus formula). Where a wall or window is colder than this, moisture condenses.",
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
    actions: "Actions",
    tapAction: "Tap",
    holdAction: "Hold",
    doubleTapAction: "Double tap",
    tapHelper: "Default: a tap opens the thermostat dialog (target temperature, mode), without a thermostat the temperature sensor’s. Hold and double tap do nothing until an action is chosen here. The chart keeps its taps while it shows the values.",
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
    setpointLineHelper: "The dashed line of the thermostat’s target, including the “target” caption. It follows the history: at each moment the value set back then. Off: the chart shows only the measurements, the target temperature stays in the status row.",
    axis: "Time labels below the chart",
    axisHelper: "The bottom row with the start time, the middle and “now”. Without it the space belongs to the curves; the time is still in the tooltip and in the screen-reader description.",
    points: "Data points",
    tooltip: "Values on hover",
    extremes: "Show minimum/maximum in the chart",
    comfortHelper: "Pointing at the curve shows the time and the actual measurements. Minimum and maximum stay visible next to the curve.",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration.",
    windowWarning: "Warn while the window is open and the heating runs",
    windowWarningHelper: "Shows “Window open – heating is on” while both are true. Needs a window sensor and a thermostat.",
    presets: "Preset",
    presetsHelper: "Sets font sizes, spacing and the chart to a matching combination. Sensors, colours and actions stay as they are.",
    presetStandard: "Default",
    presetCompact: "Compact",
    presetWall: "Wall tablet",
    presetMinimal: "Minimal",
    resetSection: "Reset this section to defaults"
  }
}, Pa = {
  general: ["name", "name_font_size", "icon", "height", "border_radius", "card_padding", "theme"],
  sensors: [
    "temperature_decimals",
    "humidity_decimals",
    "humidity_comfort",
    "humidity_dry_below",
    "humidity_humid_above",
    "show_dew_point"
  ],
  typography: [
    "temperature_font_size",
    "temperature_font_family",
    "humidity_font_size",
    "humidity_font_family",
    "show_series_labels"
  ],
  colors: ["accent_color", "humidity_color", "temperature_comfort_color"],
  window: ["show_window", "window_open_states", "show_window_warning"],
  motion: ["show_motion", "motion_show_last_changed"],
  thermostat: [
    "show_thermostat",
    "show_climate_row",
    "show_setpoint",
    "show_hvac_status",
    "show_hvac_mode",
    "heating_color",
    "heating_idle_color",
    "heating_off_color"
  ],
  chart: [
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
  ],
  actions: ["tap_action", "hold_action", "double_tap_action"]
}, Ua = [
  "height",
  "card_padding",
  "name_font_size",
  "temperature_font_size",
  "humidity_font_size",
  "show_series_labels",
  "show_temperature_chart",
  "show_humidity_chart",
  "chart_hours",
  "chart_height",
  "chart_show_axis",
  "chart_show_extremes"
], Wa = {
  /** The card's own defaults. */
  standard: {},
  /** Dense dashboards: smaller values, a slim chart without labels. */
  compact: {
    card_padding: 8,
    temperature_font_size: 32,
    humidity_font_size: 18,
    show_series_labels: !1,
    chart_height: 72,
    chart_show_axis: !1,
    chart_show_extremes: !1
  },
  /** Read from across the room: big values, a day of history. */
  wall: {
    card_padding: 16,
    name_font_size: 20,
    temperature_font_size: 64,
    humidity_font_size: 28,
    chart_height: 160,
    chart_hours: 24
  },
  /** Just the values and the badges. */
  minimal: {
    show_series_labels: !1,
    show_temperature_chart: !1,
    show_humidity_chart: !1
  }
};
function Va(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const t = r.trim().replace(",", ".");
    if (!t || t === "-" || t === ".") return null;
    const e = Number(t);
    return Number.isFinite(e) ? e : null;
  }
  return null;
}
class Kr extends bt {
  constructor() {
    super(...arguments), this._config = { type: `custom:${it}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${it}` } : { type: `custom:${it}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = We(this.hass?.locale?.language ?? this.hass?.language);
    return Ia[t];
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
    e.type = this._config.type ?? `custom:${it}`, this._config = e, this.dispatchEvent(
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
    return Mt(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = Mt(this._config[t]) ?? e;
    return Ve(i) ?? Ve(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: Js(e) });
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
      ${t.helper ? b`<span class="helper">${t.helper}</span>` : g}
      ${t.warning ? b`<span class="helper warning">${t.warning}</span>` : g}
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
        const i = Va(e);
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
      <div class="fields">
        ${i}
        <button type="button" class="reset" @click=${() => this.resetSection(t)}>
          ${this.text.resetSection}
        </button>
      </div>
    </details>`;
  }
  /** Clears every key of a section, so the card's defaults apply again. */
  resetSection(t) {
    this._drafts = {}, this.patch(Object.fromEntries(Pa[t].map((e) => [e, void 0])));
  }
  /** Applies a preset: its own values, and defaults for the other preset keys. */
  applyPreset(t) {
    const e = Wa[t];
    this._drafts = {}, this.patch(Object.fromEntries(Ua.map((i) => [i, e[i]])));
  }
  renderPresets(t) {
    const e = [
      ["standard", t.presetStandard],
      ["compact", t.presetCompact],
      ["wall", t.presetWall],
      ["minimal", t.presetMinimal]
    ];
    return b`<div class="presets" role="group" aria-label=${t.presets}>
      <span class="presets-title">${t.presets}</span>
      <div class="preset-buttons">
        ${e.map(
      ([i, n]) => b`<button type="button" class="preset" data-preset=${i} @click=${() => this.applyPreset(i)}>
              ${n}
            </button>`
    )}
      </div>
      <span class="helper">${t.presetsHelper}</span>
    </div>`;
  }
  onToggle(t, e) {
    e.currentTarget.open ? this.openSections.add(t) : this.openSections.delete(t);
  }
  render() {
    if (!this._selectorsReady)
      return b`<div class="loading">${this.text.loading}</div>`;
    const t = this.text;
    return b`<div class="editor">
      ${this.renderPresets(t)}
      ${this.renderSection("general", t.general, this.renderGeneral(t))}
      ${this.renderSection("sensors", t.sensors, this.renderSensors(t))}
      ${this.renderSection("typography", t.typography, this.renderTypography(t))}
      ${this.renderSection("colors", t.colors, this.renderColors(t))}
      ${this.renderSection("window", t.window, this.renderWindow(t))}
      ${this.renderSection("motion", t.motion, this.renderMotion(t))}
      ${this.renderSection("thermostat", t.thermostat, this.renderThermostat(t))}
      ${this.renderSection("chart", t.chart, this.renderChart(t))}
      ${this.renderSection("actions", t.actions, this.renderActions(t))}
    </div>`;
  }
  renderGeneral(t) {
    const e = !this._config.height || this._config.height === "auto";
    return b`<div class="hint">${t.generalHelper}</div>
      ${this.renderText({ key: "name", label: t.name, helper: t.nameHelper })}
      ${this.renderNumber({
      key: "name_font_size",
      label: t.nameSize,
      helper: t.nameSizeHelper,
      min: he.min,
      max: he.max,
      step: 1,
      unit: "px",
      fallback: Je
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
      helper: t.radiusHelper,
      min: 0,
      max: 40,
      step: 1,
      unit: "px",
      fallback: qe
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
    })}
      ${this.renderHumidityRating(t)}`;
  }
  /** Humidity rating and dew point: both read the sensors chosen above. */
  renderHumidityRating(t) {
    const e = !!q(this._config.humidity_entity), i = e && !!q(this._config.temperature_entity), n = e && (this.rawBoolean("humidity_comfort") ?? !1);
    return b`${this.renderSwitch({
      key: "humidity_comfort",
      label: t.humidityComfort,
      value: this.rawBoolean("humidity_comfort") ?? !1,
      disabled: !e,
      helper: t.humidityComfortHelper
    })}
      ${this.renderNumber({
      key: "humidity_dry_below",
      label: t.humidityDryBelow,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 40,
      disabled: !n
    })}
      ${this.renderNumber({
      key: "humidity_humid_above",
      label: t.humidityHumidAbove,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 60,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "show_dew_point",
      label: t.dewPoint,
      value: this.rawBoolean("show_dew_point") ?? !1,
      disabled: !i,
      helper: t.dewPointHelper
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
      fallback: St.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: t.secondaryColor,
      fallback: St.humidity
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
    })}
      ${this.renderSwitch({
      key: "show_window_warning",
      label: t.windowWarning,
      value: this.rawBoolean("show_window_warning") ?? !0,
      disabled: !e,
      helper: t.windowWarningHelper
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
      fallback: Ne.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: Ne.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: Ne.off,
      disabled: !e
    })}`;
  }
  /**
   * Home Assistant's own action picker (`ui_action`): more-info, navigate, URL,
   * perform action, toggle, none – the same fields every built-in card offers.
   * The old short form `tap_action: none` is shown as `{ action: none }`.
   */
  actionValue(t) {
    const e = this._config[t];
    return typeof e == "string" ? { action: e } : e;
  }
  renderActions(t) {
    const e = (i, n, s) => this.renderField({
      key: i,
      label: n,
      selector: { ui_action: { default_action: s } },
      value: this.actionValue(i),
      onChange: (a) => this.patch({
        [i]: a && typeof a == "object" && Object.keys(a).length ? a : void 0
      })
    });
    return b`${e("tap_action", t.tapAction, "more-info")}
      ${e("hold_action", t.holdAction, "none")}
      ${e("double_tap_action", t.doubleTapAction, "none")}
      <p class="helper">${t.tapHelper}</p>`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = e || i, s = e && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48, 72, 168].map((o) => ({
      value: String(o),
      label: o === 168 ? "7 d" : `${o} h`
    }));
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
        const h = Number(o);
        this.patch({ chart_hours: Number.isFinite(h) ? h : 6 });
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
    this.styles = je`
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
    .presets {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 2px 2px 6px;
    }
    .presets-title {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .preset-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .preset,
    .reset {
      appearance: none;
      font: inherit;
      font-size: 12.5px;
      line-height: 1;
      padding: 7px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color, rgba(148, 163, 184, 0.4));
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .preset:hover,
    .reset:hover {
      background: color-mix(in srgb, var(--primary-color, #38bdf8) 10%, transparent);
    }
    .preset:focus-visible,
    .reset:focus-visible {
      outline: 2px solid var(--primary-color, #38bdf8);
      outline-offset: 2px;
    }
    .reset {
      align-self: flex-start;
      margin-top: 2px;
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
typeof customElements < "u" && !customElements.get(It) && customElements.define(It, Kr);
function Ga(r) {
  const t = r?.locale, e = t?.time_zone, i = r?.config?.time_zone || void 0;
  let n;
  e === "local" ? n = void 0 : e === "server" || !e ? n = i : n = Ka(e) ? e : i;
  const s = t?.time_format;
  return { timeZone: n, hour12: s === "12" || s === "am_pm" ? !0 : s === "24" ? !1 : void 0 };
}
function Ka(r) {
  try {
    return new Intl.DateTimeFormat("en", { timeZone: r }), !0;
  } catch {
    return !1;
  }
}
const Fe = "#fbbf24", Le = "#34d399", vr = "var(--rcc-neutral)", ja = 500, $r = 10, Ya = 250, Za = 15 * 1e3, Xa = 300 * 1e3;
class qa extends bt {
  constructor() {
    super(...arguments), this._history = {}, this._setpointHistory = [], this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.ownRepository = new Vr(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.holdFired = !1, this.onPressStart = (t) => {
      this.holdFired = !1, !(!this.hasGesture("hold") || this.chartOwns(t.target)) && (t.button !== void 0 && t.button > 0 || (this.pressOrigin = { x: t.clientX, y: t.clientY }, this.clearHold(), this.holdTimer = setTimeout(() => {
        this.holdTimer = void 0, this.holdFired = !0, this.run(this._config?.actions.hold ?? null);
      }, ja)));
    }, this.onPressMove = (t) => {
      if (!this.holdTimer || !this.pressOrigin) return;
      const e = t.clientX - this.pressOrigin.x, i = t.clientY - this.pressOrigin.y;
      e * e + i * i > $r * $r && this.clearHold();
    }, this.onPressEnd = () => {
      this.clearHold();
    }, this.handleCardClick = (t) => {
      const e = t.target;
      this.chartOwns(e) || e?.closest("button, a, input, select, textarea") || this.handleTap();
    }, this.handleCardKeydown = (t) => {
      t.target === t.currentTarget && (t.key !== "Enter" && t.key !== " " || this.tapEnabled && (t.preventDefault(), this.run(this._config?.actions.tap ?? null)));
    };
  }
  static {
    this.properties = {
      hass: { attribute: !1 },
      _config: { state: !0 },
      _history: { state: !0 },
      _setpointHistory: { state: !0 },
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
    super.disconnectedCallback(), typeof document < "u" && document.removeEventListener("visibilitychange", this.onVisibilityChange), this.intersectionObserver?.disconnect(), this.intersectionObserver = void 0, this.visible = !0, this.refreshTimer && clearInterval(this.refreshTimer), this.tickTimer && clearInterval(this.tickTimer), this.pendingLoad && clearTimeout(this.pendingLoad), this.clearHold(), this.tapTimer && clearTimeout(this.tapTimer), this.tapTimer = void 0, this.refreshTimer = void 0, this.tickTimer = void 0, this.pendingLoad = void 0, this.resizeObserver?.disconnect(), this.resizeObserver = void 0;
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
    const e = Ps(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(It);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), n = (d) => i.find(d)?.entity_id, s = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "temperature"
    ), a = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "humidity"
    ), o = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(d.attributes?.device_class))
    ), h = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && d.attributes?.device_class === "motion"
    ), l = n((d) => d.entity_id.startsWith("climate.")), c = { type: `custom:${it}` };
    return s && (c.temperature_entity = s), a && (c.humidity_entity = a), o && (c.window_entity = o), h && (c.motion_entity = h), l && (c.climate_entity = l), c;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(De(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? De(this._config) : 230;
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
    return Zs(t);
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
    return Ga(this.hass);
  }
  historyEntityIds(t) {
    const e = [];
    return t.chart.showTemperature && t.temperatureEntity && e.push(t.temperatureEntity), t.chart.showHumidity && t.humidityEntity && e.push(t.humidityEntity), e;
  }
  /** Thermostat whose target is drawn as a curve, if the chart shows one. */
  setpointEntityId(t) {
    if (!(!t.thermostat.enabled || !t.chart.showChartSetpoint) && !(!t.chart.showTemperature || !t.temperatureEntity))
      return t.thermostat.entity;
  }
  historyKeyFor(t) {
    const e = this.historyEntityIds(t);
    if (!e.length) return "";
    const i = this.setpointEntityId(t);
    return `${e.sort().join("|")}@${t.chart.hours}${i ? `#sp:${i}` : ""}`;
  }
  ensureHistory() {
    if (!this.isConnected) return;
    const t = this._config;
    if (!t || !this.hass) return;
    const e = this.historyKeyFor(t);
    if (!e) {
      this.historyKey && (this.historyKey = "", this._history = {}, this._setpointHistory = [], this._historyLoading = !1, this._historyError = void 0);
      return;
    }
    e === this.historyKey && (this.historyFetchedAt > 0 || this.retryDelay > 0) || (this.historyKey = e, this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
      this.pendingLoad = void 0, this.loadHistory(e);
    }, 60));
  }
  /**
   * @param force  re-render even if the data object did not change.
   * @param fresh  bypass the shared cache (after a reconnect the cached curve
   *               may predate the outage).
   */
  async loadHistory(t, e = !1, i = !1) {
    const n = this._config, s = this.hass;
    if (!n || !s || !t) return;
    const a = this.historyEntityIds(n);
    if (!a.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const o = Date.now(), h = o - n.chart.hours * 60 * 60 * 1e3;
    try {
      const l = ua(s) ?? this.ownRepository, c = this.setpointEntityId(n), d = c ? l.loadAttribute(s, c, "temperature", n.chart.hours, o, {
        ...i ? { maxAgeMs: 0 } : {}
      }).catch(() => []) : Promise.resolve([]), m = await l.load(
        s,
        a,
        n.chart.hours,
        o,
        {
          ...i ? { maxAgeMs: 0 } : {},
          source: ha(n.chart.hours)
        }
      ), f = await d;
      if (this.historyKey !== t) return;
      this._history = m, this._setpointHistory = f, this._historyWindow = { start: h, end: o }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, e && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== t) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Za), Xa), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const h = Kt(n.state);
    return a.v === h ? t : [...t, { t: o, v: h }];
  }
  /**
   * The target history, closed with the current target (like
   * {@link withLiveState}) and converted to the scale of the temperature
   * sensor. Climate entities change `last_updated`, not `last_changed`, when
   * only an attribute such as the target moves.
   */
  setpointSeries(t, e, i, n) {
    const s = this._config, a = s ? this.setpointEntityId(s) : void 0;
    if (!a || !this._setpointHistory.length) return;
    let o = this._setpointHistory;
    const h = this.hass?.states?.[a], l = h ? Date.parse(h.last_updated ?? h.last_changed) : NaN, c = o[o.length - 1];
    if (Number.isFinite(l) && c.v !== t) {
      const m = Math.max(Math.min(l, n), c.t + 1);
      o = [...o, { t: m, v: t }];
    }
    const d = (m) => m === null ? null : e === i ? m : Re(m, e, i);
    return o.map((m) => ({ t: m.t, v: d(m.v) }));
  }
  updateDensity(t) {
    if (!this._config?.height) {
      this._density !== "md" && (this._density = "md");
      return;
    }
    const e = t > 0 ? t : this._config ? this._config.height ?? De(this._config) : 0;
    let i = "md";
    e > 0 && e < 168 ? i = "xs" : e > 0 && e < 232 && (i = "sm"), i !== this._density && (this._density = i);
  }
  // ------------------------------------------------------------------ updates
  willUpdate(t) {
    if (t.has("hass")) {
      const e = this.hass?.connected !== !1;
      e && !this.lastConnected && (this.historyFetchedAt = 0, this.loadHistory(this.historyKey, !0, !0)), this.lastConnected = e, this.ensureHistory();
    }
    t.has("_config") && this._config && this.ensureHistory();
  }
  shouldUpdate(t) {
    if (t.has("hass")) {
      const e = t.get("hass");
      if (!e || !this.hass || e.connected !== this.hass.connected || e.locale?.language !== this.hass.locale?.language || e.locale?.number_format !== this.hass.locale?.number_format || e.locale?.time_format !== this.hass.locale?.time_format || e.locale?.time_zone !== this.hass.locale?.time_zone || e.config?.time_zone !== this.hass.config?.time_zone || e.themes?.darkMode !== this.hass.themes?.darkMode || e.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? Vs(this._config) : [];
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
      // Without an own radius the card keeps the theme's (`--ha-card-border-radius`).
      t.borderRadius !== null ? `--rcc-radius:${t.borderRadius}px` : "",
      `--rcc-inset:${t.padding}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${s.fontSize}px`,
      /*
       * Title size and the icon that belongs to it: both are written here (not
       * in the stylesheet) so the line height and the icon box stay in step with
       * whatever the user picked in the editor.
       */
      `--rcc-name-size:${t.nameFontSize}px`,
      `--rcc-name-line:${Pr(t.nameFontSize)}px`,
      `--rcc-name-icon:${Gs(t.nameFontSize)}px`,
      `--rcc-accent:${t.accentColor}`,
      `--rcc-secondary:${t.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";"), o = this.tapEnabled, h = o || this.hasGesture("hold") || this.hasGesture("doubleTap"), l = this.renderClimateRow(t, e), c = o && l === g;
    return b`<ha-card
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"} ${h ? "is-tappable" : ""}"
      style="${a}"
      role=${c ? "button" : "group"}
      tabindex=${c ? "0" : g}
      aria-label=${c ? `${this.cellAriaLabel(t, e)} – ${this.tapLabel(e)}` : this.cellAriaLabel(t, e)}
      @click=${this.handleCardClick}
      @keydown=${c ? this.handleCardKeydown : g}
      @pointerdown=${this.onPressStart}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
    >
      ${this.renderHeader(t, e)} ${this.renderReadings(t, e)}
      ${l} ${this.renderWindowWarning(t, e)} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? g : this.renderEmpty(e)}
    </ha-card>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${sr(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return b`<div class="empty-state" role="status">
      ${G.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = sr(t, this.hass), n = ta(this.hass, t), s = hr(this.hass, t), a = t.motion.enabled && t.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return b`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? b`<div class="subtle">
              ${e.t("quietSince")}
              ${qs(n.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : g}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(n, e) : g}
        ${t.window.enabled ? this.renderWindowBadge(s, e) : g}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? b`<ha-icon .icon=${t.icon}></ha-icon>` : G.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", n = i ? Le : vr, s = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return b`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${ie(
      i ? Le : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${ie(i ? Le : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? G.motion() : G.motionOff()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", n = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return b`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? Fe : vr};--badge-bg:${ie(
      i ? Fe : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${ie(i ? Fe : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? G.windowOpen() : G.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return g;
    const i = this.language(), n = lr(this.hass, t.temperatureEntity, "temperature"), s = lr(this.hass, t.humidityEntity, "humidity"), a = !!t.temperatureEntity, o = !!t.humidityEntity, h = o && !a, l = t.showSeriesLabels;
    return b`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? b`<div class="reading-labels" aria-hidden="true">
        ${a ? b`<span class="series-label"
              ><span class="series-dot" style="background:${t.accentColor}"></span
              >${e.t("temperature")}</span
            >` : g}
        ${o ? b`<span class="series-label"
              ><span class="series-dot" style="background:${t.humidity.color}"></span
              >${e.t("humidity")}</span
            >` : g}
        </div>` : g}
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
    }) : g}
        ${o ? this.renderReading({
      className: h ? "humidity hero" : "humidity",
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
    }) : g}
      </div>
      ${this.renderReadingMeta(t, e, n, s, h)}
    </div>`;
  }
  /**
   * Quiet line under the values: the dew point below the temperature and the
   * humidity rating below the humidity. The line keeps its height while a
   * sensor is unavailable, so the card does not jump.
   */
  renderReadingMeta(t, e, i, n, s) {
    if (!Ur(t)) return g;
    const a = this.language();
    let o = g;
    if (t.humidity.showDewPoint && i.value !== null && n.value !== null) {
      const l = Vt(i.unit) === "F", c = l ? (i.value - 32) / 1.8 : i.value, d = Ts(c, n.value);
      if (d !== null) {
        const m = l ? d * 1.8 + 32 : d;
        o = b`<span class="meta-dew"
          >${e.t("dewPoint")}
          ${et(m, a, t.temperatureDecimals)} ${i.unit}</span
        >`;
      }
    }
    let h = g;
    if (t.humidity.comfort && n.value !== null) {
      const l = ks(n.value, t.humidity.comfort), c = l === "dry" ? e.t("humidityDry") : l === "humid" ? e.t("humidityHumid") : e.t("humidityComfortable");
      h = b`<span class="meta-humidity level-${l}"
        ><span class="meta-dot" aria-hidden="true"></span>${c}</span
      >`;
    }
    return b`<div class="reading-meta ${s ? "humidity-first" : ""}">
      ${o}${h}
    </div>`;
  }
  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  renderReading(t) {
    const e = t.value !== null ? et(t.value, t.language, t.decimals) : "–";
    return b`<span class="reading ${t.className}" style="--series-color:${t.color}">
      <span class="reading-number" role="text" aria-label="${t.ariaLabel}"
        ><span class="reading-value">${e}</span
        ><span class="reading-unit">${t.unit}</span></span
      >
    </span>`;
  }
  sensorAria(t, e, i, n) {
    return t.value === null ? n.t("unavailable") : `${et(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Entity a more-info or toggle action works on when it names none: the
   * thermostat, else the temperature sensor, else the humidity sensor. Without
   * a thermostat a tap therefore opens the sensor's history instead of doing
   * nothing.
   */
  get mainEntity() {
    return this._config ? Ns(this._config) : void 0;
  }
  /** Whether a tap does something – the card is then a button. */
  get tapEnabled() {
    return !!this._config && Pe(this._config.actions.tap, this.mainEntity);
  }
  hasGesture(t) {
    const e = this._config?.actions[t] ?? null;
    return Pe(e, this.mainEntity);
  }
  /** Words for the accessible name of the tap ("Thermostat öffnen", …). */
  tapLabel(t) {
    const e = this._config?.actions.tap;
    return e?.action === "more-info" ? (e.entity ?? this.mainEntity)?.startsWith("climate.") ? t.t("openThermostat") : t.t("openDetails") : t.t("runAction");
  }
  run(t) {
    Xn(this, this.hass, t, this.mainEntity, {
      confirmText: this.translator().t("confirmAction")
    });
  }
  /** Taps inside the chart belong to the chart while it shows its readout. */
  chartOwns(t) {
    return !!t?.closest?.(".chart-slot, room-climate-chart") && !!this._config?.chart.showTooltip;
  }
  clearHold() {
    this.holdTimer && clearTimeout(this.holdTimer), this.holdTimer = void 0;
  }
  /**
   * One tap: runs `tap_action`, unless the press just ran `hold_action`. With a
   * `double_tap_action` the first tap waits DOUBLE_TAP_MS for a second one;
   * without it nothing waits.
   */
  handleTap() {
    if (this.holdFired) {
      this.holdFired = !1;
      return;
    }
    const t = this._config?.actions;
    if (t) {
      if (this.hasGesture("doubleTap")) {
        if (this.tapTimer) {
          clearTimeout(this.tapTimer), this.tapTimer = void 0, this.run(t.doubleTap);
          return;
        }
        this.tapTimer = setTimeout(() => {
          this.tapTimer = void 0, this.run(t.tap);
        }, Ya);
        return;
      }
      this.run(t.tap);
    }
  }
  /**
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  renderClimateRow(t, e) {
    if (!Ir(t)) return g;
    const i = ze(this.hass, t, e), n = t.thermostat.showSetpoint && i.setpoint !== null, s = t.thermostat.showStatus, a = t.thermostat.showMode && !!i.modeLabel, o = a && i.modeLabel && i.status !== "unknown" && i.modeLabel !== i.label ? `${i.modeLabel} · ${i.label}` : a && i.status === "unknown" ? i.modeLabel ?? i.label : i.label;
    if (!n && !s && !a) return g;
    const h = ia(i, t), l = this.language(), c = i.setpoint !== null ? `${et(i.setpoint, l, t.temperatureDecimals)} ${i.unit}` : "", d = this.tapEnabled, m = b`${s ? b`<span class="flame status-${i.status}" style="color:${h}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : g}
      <span class="climate-state" role=${d ? "status" : g}
        >${o}</span
      >
      ${n ? b`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${e.t("setpoint")}</span> ${c}</span
            >` : g}`;
    return d ? b`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${this.tapLabel(e)}"
      title="${this.tapLabel(e)}"
      @click=${(f) => {
      f.stopPropagation(), this.handleTap();
    }}
    >
      ${m}
    </button>` : b`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(i)}"
      >
        ${m}
      </div>`;
  }
  /**
   * "Fenster offen – Heizung läuft": both facts are on the card already, but
   * only together are they worth acting on. Shown while the window counts as
   * open and the thermostat reports `hvac_action: heating`.
   */
  renderWindowWarning(t, e) {
    return !t.window.enabled || !t.window.warnWhileHeating || !t.thermostat.enabled || hr(this.hass, t).status !== "open" || ze(this.hass, t, e).status !== "heating" ? g : b`<div class="climate-warning" role="alert">
      <span class="climate-warning-icon" aria-hidden="true">${G.windowOpen()}</span>
      <span>${e.t("windowHeatingWarning")}</span>
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return G.snowflake();
        case "fan":
          return G.fan();
        case "drying":
          return G.water();
        default:
          return G.flame();
      }
    return G.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!Br(t)) return g;
    const i = Date.now(), n = i - t.chart.hours * 60 * 60 * 1e3, s = t.chart.showTemperature && t.temperatureEntity ? this.withLiveState(
      this._history[t.temperatureEntity],
      t.temperatureEntity,
      i
    ) : void 0, a = t.chart.showHumidity && t.humidityEntity ? this.withLiveState(this._history[t.humidityEntity], t.humidityEntity, i) : void 0, o = this.language(), h = this.chartClock(), l = t.humidityEntity ? this.hass?.states?.[t.humidityEntity]?.attributes?.unit_of_measurement : void 0, c = t.thermostat.enabled ? ze(this.hass, t, e) : void 0, d = (t.temperatureEntity ? this.hass?.states?.[t.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = c?.setpoint ?? null, p = (m === null || !c ? null : Re(m, c.unit, d)) ?? (c?.unit === d ? m : null), S = c ? this.setpointSeries(m, c.unit, d, i) : void 0, C = (O, L) => Re(O, "°C", L) ?? O, H = {
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
    }, U = this.tapEnabled && !t.chart.showTooltip, x = Us(t), z = Ws(t);
    return b`<div
      class="chart-slot ${U ? "is-tappable" : ""}"
      style="margin-left:${x}px;margin-right:${x}px;margin-bottom:${z}px"
    >
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${t.accentColor}
        .humidityColor=${t.humidity.color}
        .setpoint=${p}
        .setpointHistory=${S}
        .setpointUnit=${d}
        .start=${n}
        .end=${i}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .showTooltip=${t.chart.showTooltip}
        .showExtremes=${t.chart.showExtremes}
        .temperatureUnit=${d}
        .humidityUnit=${l ?? "%"}
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
        .bandCold=${C(t.chart.bandLimits.coldBelow, d)}
        .bandWarm=${C(t.chart.bandLimits.warmAbove, d)}
        .bandHot=${C(t.chart.bandLimits.hotAbove, d)}
        .bandTransition=${Math.round(t.chart.bandTransition * 100)}
        .temperatureScale=${Vt(d) ?? "C"}
        .cornerRadius=${t.borderRadius ?? qe}
        .language=${o}
        .timeZone=${h.timeZone}
        .hour12=${h.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${H}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = je`
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
      /* Fills its cell in the sections grid; auto everywhere else. */
      height: 100%;
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
      /* Amber of the open-window badge; darker on light cards for contrast. */
      --rcc-warning: var(--warning-color, #f59e0b);
      --rcc-accent: #4fd1a5;
      --rcc-secondary: #8b86d6;

      --rcc-temp-size: 42px;
      --rcc-hum-size: 20px;
      --rcc-temp-font: inherit;
      --rcc-hum-font: inherit;

      color: var(--rcc-text);
      font-family: var(--ha-font-family-body, inherit);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    /*
     * The frame belongs to ha-card and the theme (background, border, shadow,
     * radius). Only an explicit dark or light theme, or an own radius, paints
     * over it.
     */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: var(--rcc-height, 100%);
      min-height: 0;
      /* One inset for everything: title, values and chart share the same edge. */
      padding: var(--rcc-inset, 10px);
      overflow: hidden;
      color: var(--rcc-text);
      border-radius: var(--rcc-radius, var(--ha-card-border-radius, 12px));
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }
    .card.theme-dark,
    .card.theme-light {
      background-color: var(--rcc-bg);
      background-image: var(--rcc-surface);
      border: 1px solid var(--rcc-hairline);
      box-shadow: 0 8px 24px -22px rgba(0, 0, 0, 0.9);
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
      --rcc-warning: #fbbf24;
    }
    .card.theme-light {
      --rcc-bg: #ffffff;
      --rcc-surface: linear-gradient(160deg, #ffffff 0%, #f7f8fa 100%);
      --rcc-hairline: rgba(15, 23, 42, 0.07);
      --rcc-text: rgba(15, 23, 42, 0.92);
      --rcc-muted: rgba(15, 23, 42, 0.52);
      --rcc-tertiary: rgba(15, 23, 42, 0.34);
      --rcc-warning: #b45309;
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
    /* Dew point (left) and humidity rating (right) under the values. */
    .reading-meta {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-2);
      min-height: 16px;
      font-size: 11px;
      line-height: 16px;
      color: var(--rcc-muted);
      font-variant-numeric: tabular-nums;
      font-feature-settings: 'tnum' 1;
      white-space: nowrap;
    }
    .meta-dew {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .meta-humidity {
      display: inline-flex;
      align-items: center;
      gap: var(--rcc-space-1);
      margin-left: auto;
    }
    .reading-meta.humidity-first .meta-humidity {
      margin-left: 0;
    }
    .meta-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--rcc-accent);
    }
    .meta-humidity.level-dry .meta-dot {
      background: var(--info-color, #60a5fa);
    }
    .meta-humidity.level-humid {
      color: var(--rcc-warning);
    }
    .meta-humidity.level-humid .meta-dot {
      background: var(--rcc-warning);
    }
    /* Humidity-only card: the value is the hero, on the left, at hero size. */
    .reading.humidity.hero {
      margin-left: 0;
      font-size: var(--rcc-temp-size);
    }
    .reading.humidity.hero .reading-number {
      letter-spacing: -0.035em;
    }
    .reading.humidity.hero .reading-unit {
      font-size: 0.34em;
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
    /* Text colour at low strength: visible on dark and light themes alike. */
    button.climate-row:hover {
      background: rgba(127, 127, 127, 0.08);
      background: color-mix(in srgb, var(--rcc-text) 6%, transparent);
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
    /* Window open while heating: the one line on the card that asks for action. */
    .climate-warning {
      display: flex;
      align-items: center;
      gap: var(--rcc-space-1);
      margin-top: var(--rcc-space-1);
      min-height: 16px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      color: var(--rcc-warning);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .climate-warning-icon {
      display: inline-flex;
      flex: none;
    }
    .climate-warning-icon .icon {
      width: 14px;
      height: 14px;
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
    /*
     * Configured chart height is the minimum; inside a taller sections-grid cell
     * the chart takes the remaining space instead of leaving a gap below.
     */
    .auto-height .chart-slot {
      flex: 1 0 auto;
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

    /* The humidity hero shrinks like the temperature it stands in for. */
    .density-xs .reading.humidity.hero {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.6);
    }
    .density-sm .reading.humidity.hero {
      font-size: calc(var(--rcc-temp-size, 42px) * 0.82);
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
  `%c ROOM-CLIMATE-CARD %c v${kn} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(it) || customElements.define(it, qa);
customElements.get(It) || customElements.define(It, Kr);
const xr = window.customCards = window.customCards ?? [];
xr.some((r) => r.type === it) || xr.push({
  type: it,
  name: Sn,
  description: An,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  it as CARD_TAG,
  kn as CARD_VERSION,
  qa as RoomClimateCard,
  Kr as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
