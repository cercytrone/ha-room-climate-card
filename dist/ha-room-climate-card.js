const q = "room-climate-card", Se = "room-climate-card-editor", dr = "Room Climate Card", ur = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", mr = "2.9.0";
const Be = globalThis, wt = Be.ShadowRoot && (Be.ShadyCSS === void 0 || Be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vt = /* @__PURE__ */ Symbol(), qt = /* @__PURE__ */ new WeakMap();
let Ei = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== vt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (wt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = qt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && qt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const pr = (r) => new Ei(typeof r == "string" ? r : r + "", void 0, vt), _t = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ei(t, r, vt);
}, fr = (r, e) => {
  if (wt) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Be.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, Xt = wt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return pr(t);
})(r) : r;
const { is: yr, defineProperty: gr, getOwnPropertyDescriptor: br, getOwnPropertyNames: wr, getOwnPropertySymbols: vr, getPrototypeOf: _r } = Object, Ge = globalThis, Jt = Ge.trustedTypes, $r = Jt ? Jt.emptyScript : "", xr = Ge.reactiveElementPolyfillSupport, ve = (r, e) => r, mt = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? $r : null;
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
} }, Hi = (r, e) => !yr(r, e), Qt = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: Hi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ge.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Qt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && gr(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = br(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: n, set(a) {
      const l = n?.call(this);
      s?.call(this, a), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Qt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ve("elementProperties"))) return;
    const e = _r(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ve("properties"))) {
      const t = this.properties, i = [...wr(t), ...vr(t)];
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
      for (const n of i) t.unshift(Xt(n));
    } else e !== void 0 && t.push(Xt(e));
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
    return fr(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : mt).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : mt;
      this._$Em = n;
      const l = a.fromAttribute(t, s.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? Hi)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
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
        const { wrapped: a } = s, l = this[n];
        a !== !0 || this._$AL.has(n) || l === void 0 || this.C(n, void 0, s, l);
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
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[ve("elementProperties")] = /* @__PURE__ */ new Map(), ce[ve("finalized")] = /* @__PURE__ */ new Map(), xr?.({ ReactiveElement: ce }), (Ge.reactiveElementVersions ??= []).push("2.1.2");
const $t = globalThis, ei = (r) => r, Ue = $t.trustedTypes, ti = Ue ? Ue.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Di = "$lit$", te = `lit$${Math.random().toFixed(9).slice(2)}$`, Ri = "?" + te, Sr = `<${Ri}>`, he = document, Ae = () => he.createComment(""), ke = (r) => r === null || typeof r != "object" && typeof r != "function", xt = Array.isArray, Ar = (r) => xt(r) || typeof r?.[Symbol.iterator] == "function", st = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ii = /-->/g, ri = />/g, ae = RegExp(`>|${st}(?:([^\\s"'>=/]+)(${st}*=${st}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ni = /'/g, si = /"/g, Oi = /^(?:script|style|textarea|title)$/i, Ni = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), g = Ni(1), v = Ni(2), ue = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ai = /* @__PURE__ */ new WeakMap(), oe = he.createTreeWalker(he, 129);
function Fi(r, e) {
  if (!xt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ti !== void 0 ? ti.createHTML(e) : e;
}
const kr = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = be;
  for (let l = 0; l < t; l++) {
    const o = r[l];
    let d, h, c = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, h = a.exec(o), h !== null); ) m = a.lastIndex, a === be ? h[1] === "!--" ? a = ii : h[1] !== void 0 ? a = ri : h[2] !== void 0 ? (Oi.test(h[2]) && (n = RegExp("</" + h[2], "g")), a = ae) : h[3] !== void 0 && (a = ae) : a === ae ? h[0] === ">" ? (a = n ?? be, c = -1) : h[1] === void 0 ? c = -2 : (c = a.lastIndex - h[2].length, d = h[1], a = h[3] === void 0 ? ae : h[3] === '"' ? si : ni) : a === si || a === ni ? a = ae : a === ii || a === ri ? a = be : (a = ae, n = void 0);
    const f = a === ae && r[l + 1].startsWith("/>") ? " " : "";
    s += a === be ? o + Sr : c >= 0 ? (i.push(d), o.slice(0, c) + Di + o.slice(c) + te + f) : o + te + (c === -2 ? l : f);
  }
  return [Fi(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Me {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const l = e.length - 1, o = this.parts, [d, h] = kr(e, t);
    if (this.el = Me.createElement(d, i), oe.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = oe.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Di)) {
          const m = h[a++], f = n.getAttribute(c).split(te), y = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: s, name: y[2], strings: f, ctor: y[1] === "." ? Cr : y[1] === "?" ? Tr : y[1] === "@" ? Er : Ke }), n.removeAttribute(c);
        } else c.startsWith(te) && (o.push({ type: 6, index: s }), n.removeAttribute(c));
        if (Oi.test(n.tagName)) {
          const c = n.textContent.split(te), m = c.length - 1;
          if (m > 0) {
            n.textContent = Ue ? Ue.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(c[f], Ae()), oe.nextNode(), o.push({ type: 2, index: ++s });
            n.append(c[m], Ae());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ri) o.push({ type: 2, index: s });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(te, c + 1)) !== -1; ) o.push({ type: 7, index: s }), c += te.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = he.createElement("template");
    return i.innerHTML = e, i;
  }
}
function me(r, e, t = r, i) {
  if (e === ue) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = ke(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = me(r, n._$AS(r, e.values), n, i)), e;
}
class Mr {
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
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? he).importNode(t, !0);
    oe.currentNode = n;
    let s = oe.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new Ce(s, s.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(s, o.name, o.strings, this, e) : o.type === 6 && (d = new Hr(s, this, e)), this._$AV.push(d), o = i[++l];
      }
      a !== o?.index && (s = oe.nextNode(), a++);
    }
    return oe.currentNode = he, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Ce {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = me(this, e, t), ke(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ar(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && ke(this._$AH) ? this._$AA.nextSibling.data = e : this.T(he.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Me.createElement(Fi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const s = new Mr(n, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ai.get(e.strings);
    return t === void 0 && ai.set(e.strings, t = new Me(e)), t;
  }
  k(e) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new Ce(this.O(Ae()), this.O(Ae()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = ei(e).nextSibling;
      ei(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ke {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = me(this, e, t, 0), a = !ke(e) || e !== this._$AH && e !== ue, a && (this._$AH = e);
    else {
      const l = e;
      let o, d;
      for (e = s[0], o = 0; o < s.length - 1; o++) d = me(this, l[i + o], t, o), d === ue && (d = this._$AH[o]), a ||= !ke(d) || d !== this._$AH[o], d === p ? e = p : e !== p && (e += (d ?? "") + s[o + 1]), this._$AH[o] = d;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Cr extends Ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Tr extends Ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Er extends Ke {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = me(this, e, t, 0) ?? p) === ue) return;
    const i = this._$AH, n = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== p && (i === p || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Hr {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    me(this, e);
  }
}
const Dr = $t.litHtmlPolyfillSupport;
Dr?.(Me, Ce), ($t.litHtmlVersions ??= []).push("3.3.3");
const Rr = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = n = new Ce(e.insertBefore(Ae(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
const St = globalThis;
let le = class extends ce {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Rr(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ue;
  }
};
le._$litElement$ = !0, le.finalized = !0, St.litElementHydrateSupport?.({ LitElement: le });
const Or = St.litElementPolyfillSupport;
Or?.({ LitElement: le });
(St.litElementVersions ??= []).push("4.2.2");
const T = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function Re(r, e) {
  const [t, i] = r, [n, s] = e, a = i - t;
  if (!Number.isFinite(a) || a === 0) {
    const l = (n + s) / 2;
    return () => l;
  }
  return (l) => n + (l - t) / a * (s - n);
}
function oi(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function li(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = t;
  let s = r, a = e;
  if (a - s < i) {
    const o = (a + s) / 2;
    s = o - i / 2, a = o + i / 2;
  }
  const l = (a - s) * n;
  return [s - l, a + l];
}
function Li(r) {
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
function Nr(r, e, t = {}) {
  const i = Li(r), n = i > 0 ? i * 2.5 : 0, s = t.minMs ?? Math.max(e / 40, 300 * 1e3), a = t.maxMs ?? Math.max(s, e / 3);
  return Math.min(a, Math.max(n, s));
}
const Fr = 1e3, Lr = 8;
function zr(r, e, t, i) {
  const n = t.t - e.t, s = e.v, a = t.v, l = Math.min(
    Lr,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let o = 1; o < l; o++) {
    const d = o / l;
    r.samples.push({
      t: Math.round(e.t + n * d),
      v: s + (a - s) * d
    }), r.bridged.push(!0);
  }
}
function hi(r, e) {
  const { rangeMs: t, start: i, end: n } = e, s = e.gapMode ?? "connect", a = Nr(r, t), l = e.maxGapMs ?? t / 4, o = [];
  let d = null, h = null, c = null, m = !1, f = !1;
  const y = () => {
    d && d.samples.length && o.push(d), d = null, h = null, c = null;
  }, x = (b) => {
    if (!d || !h || b === null || b <= h.t) return;
    const L = { t: b, v: h.v };
    d.samples.push(L), d.bridged.push(!1), h = L;
  };
  for (const b of r) {
    if (b.v === null || !Number.isFinite(b.v)) {
      h || (m = !0), c = c ?? b.t, f = !0;
      continue;
    }
    if (f = !1, !h || !d) {
      d = { samples: [b], bridged: [] }, h = b, c = null;
      continue;
    }
    const L = b.t - h.t;
    if (L <= a && c === null) {
      d.samples.push(b), d.bridged.push(!1), h = b;
      continue;
    }
    if (!(c !== null)) {
      const Ze = Math.min(Fr, L / 2);
      d.samples.push({ t: b.t - Ze, v: h.v }), d.bridged.push(!1), d.samples.push(b), d.bridged.push(!1), h = b;
      continue;
    }
    const z = Math.max(h.t, c), Ye = b.t - z;
    if (s === "connect" && Ye <= l) {
      z > h.t && (d.samples.push({ t: z, v: h.v }), d.bridged.push(!1), h = { t: z, v: h.v }), zr(d, h, b, a), d.samples.push(b), d.bridged.push(!0), h = b, c = null;
      continue;
    }
    x(c), y(), d = { samples: [b], bridged: [] }, h = b;
  }
  if (f && x(c), y(), !o.length) return o;
  const k = o[0];
  if (!m && i !== void 0 && k.samples[0].t > i && (k.samples.unshift({ t: i, v: k.samples[0].v }), k.bridged.unshift(!1)), f)
    return o;
  const A = o[o.length - 1], E = A.samples[A.samples.length - 1];
  return n !== void 0 && E.t < n && (A.samples.push({ t: n, v: E.v }), A.bridged.push(!1)), o;
}
function ci(r, e, t) {
  if (!r || !r.length) return [];
  const i = [...r].sort((a, l) => a.t - l.t), n = [];
  let s = null;
  for (const a of i) {
    if (!Number.isFinite(a.t) || t !== void 0 && a.t > t) continue;
    const l = a.v === null || !Number.isFinite(a.v) ? null : a.v;
    if (e !== void 0 && a.t < e) {
      s = { t: e, v: l };
      continue;
    }
    const o = n[n.length - 1];
    if (o && o.t === a.t) {
      n[n.length - 1] = { t: a.t, v: l };
      continue;
    }
    n.push({ t: a.t, v: l });
  }
  return s && e !== void 0 && (!n.length || n[0].t > e) && n.unshift(s), n;
}
function Br(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function Ir(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function zi(r) {
  if (!r.length) return "";
  let e = `M ${T(r[0].x)} ${T(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${T(r[t].x)} ${T(r[t].y)}`;
  return e;
}
const di = 1, Ur = 1;
function Pr(r, e, t, i, n) {
  if (!(n > 0) || r === e && t === 0 && i === 0) return 0;
  const s = Math.min(r, e), a = Math.max(r, e);
  let l = 0;
  const o = 16;
  for (let d = 1; d < o; d++) {
    const h = d / o, c = 1 - h, m = r + t * n / 3, f = e - i * n / 3, y = c * c * c * r + 3 * c * c * h * m + 3 * c * h * h * f + h * h * h * e;
    l = Math.max(l, s - y, y - a);
  }
  return l;
}
function Vr(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${T(r[0].x)} ${T(r[0].y)}`;
  if (r.length === 2) return zi(r);
  const e = r.length, t = [], i = [];
  for (let o = 0; o < e - 1; o++)
    t[o] = r[o + 1].x - r[o].x, i[o] = t[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / t[o];
  const n = new Array(e).fill(0);
  n[0] = i[0], n[e - 1] = i[e - 2];
  for (let o = 1; o < e - 1; o++) {
    const d = i[o - 1], h = i[o];
    n[o] = d * h <= 0 ? (d + h) / 2 * Ur : (d + h) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < e - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(e).fill(1);
  for (let o = 0; o < 3; o++) {
    const d = new Array(e).fill(1);
    let h = !1;
    for (let c = 0; c < e - 1; c++) {
      if (t[c] === 0) continue;
      const m = Pr(
        r[c].y,
        r[c + 1].y,
        n[c] * a[c],
        n[c + 1] * a[c + 1],
        t[c]
      );
      if (m > di) {
        const f = di / m;
        d[c] = Math.min(d[c], f), d[c + 1] = Math.min(d[c + 1], f), h = !0;
      }
    }
    if (!h) break;
    for (let c = 0; c < e; c++) a[c] *= d[c];
  }
  for (let o = 0; o < e; o++) n[o] *= a[o];
  let l = `M ${T(r[0].x)} ${T(r[0].y)}`;
  for (let o = 0; o < e - 1; o++) {
    const d = r[o].x + t[o] / 3, h = r[o].y + n[o] * t[o] / 3, c = r[o + 1].x - t[o] / 3, m = r[o + 1].y - n[o + 1] * t[o] / 3;
    l += ` C ${T(d)} ${T(h)}, ${T(c)} ${T(m)}, ${T(
      r[o + 1].x
    )} ${T(r[o + 1].y)}`;
  }
  return l;
}
function Bi(r, e) {
  return e ? Vr(r) : zi(r);
}
function Gr(r, e, t) {
  if (!r.length) return "";
  const i = Bi(r, t), n = r[0], s = r[r.length - 1];
  return `${i} L ${T(s.x)} ${T(e)} L ${T(n.x)} ${T(e)} Z`;
}
function Kr(r, e, t = {}) {
  const i = Math.max(1, Math.round(e));
  if (i < 3 || r.length < 3) return r.map((l) => ({ ...l }));
  const n = Math.floor(i / 2), s = t.maxDeltaMs ?? 1 / 0, a = Math.min(
    2,
    Math.max(1, r.reduce((l, o) => Math.max(l, jr(o.v)), 0))
  );
  return r.map((l, o) => {
    if (l.v === null) return { ...l };
    let d = 0, h = 0;
    for (let c = -n; c <= n; c++) {
      const m = r[o + c];
      !m || m.v === null || c !== 0 && Math.abs(m.t - l.t) > s || (d += m.v, h += 1);
    }
    return h ? { t: l.t, v: Yr(d / h, a) } : { ...l };
  });
}
const Wr = [
  "none",
  "light",
  "medium",
  "strong"
], pt = "light", ui = {
  none: [1, 1],
  light: [3, 5],
  medium: [5, 9],
  strong: [9, 15]
};
function jr(r) {
  if (r === null || !Number.isFinite(r)) return 0;
  const e = String(r), t = e.indexOf(".");
  return t === -1 ? 0 : Math.min(2, e.length - t - 1);
}
function Yr(r, e) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function Zr(r, e = pt) {
  if (r < 5) return 1;
  const [t, i] = ui[e] ?? ui[pt];
  return r < 60 ? t : i;
}
function qr(r, e, t) {
  if (!(e > r) || t < 2) return [];
  const i = [];
  for (let n = 0; n < t; n++)
    i.push(r + (e - r) * n / (t - 1));
  return i;
}
function Xr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function Jr(r, e) {
  const t = r.length;
  if (t <= e || e < 3) return r.map((a, l) => l);
  const i = Math.max(1, Math.floor((e - 2) / 2)), n = /* @__PURE__ */ new Set([0, t - 1]), s = t / i;
  for (let a = 0; a < i; a++) {
    const l = Math.floor(a * s), o = Math.min(t - 1, Math.floor((a + 1) * s) - 1);
    let d = -1, h = -1, c = 1 / 0, m = -1 / 0;
    for (let f = l; f <= o; f++) {
      const y = r[f].v;
      y === null || !Number.isFinite(y) || (y < c && (c = y, d = f), y > m && (m = y, h = f));
    }
    if (d === -1) {
      n.add(l);
      continue;
    }
    n.add(d), n.add(h);
  }
  return [...n].sort((a, l) => a - l);
}
function Oe(r, e) {
  const t = r.length;
  if (!t || !Number.isFinite(e)) return null;
  let i = 0, n = t - 1, s = t;
  for (; i <= n; ) {
    const h = i + n >> 1;
    r[h].t >= e ? (s = h, n = h - 1) : i = h + 1;
  }
  let a = s - 1, l = s, o = null, d = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      o = r[a];
      break;
    }
    a--;
  }
  for (; l < t; ) {
    if (r[l].v !== null) {
      d = r[l];
      break;
    }
    l++;
  }
  return o ? d ? Math.abs(o.t - e) <= Math.abs(d.t - e) ? o : d : o : d;
}
function mi(r) {
  let e = null, t = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!e || e.v > n) && (e = i), (!t || t.v < n) && (t = i));
  }
  return e && t ? { min: e, max: t } : null;
}
const Ne = "#7FA6D9", Fe = "#EFB35F", Le = "#D16A62", Ie = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, Pe = 1, Ii = 100;
function at(r, e) {
  return typeof r == "number" && Number.isFinite(r) ? r : e;
}
function Qr(r, e, t, i = Ie) {
  const n = [
    at(r, i.coldBelow),
    at(e, i.warmAbove),
    at(t, i.hotAbove)
  ].sort((o, d) => o - d), s = n[0], a = Math.max(n[1], s + Pe), l = Math.max(n[2], a + Pe);
  return { coldBelow: s, warmAbove: a, hotAbove: l };
}
function ot(r, e, t) {
  return Number.isFinite(r) ? r < e.coldBelow ? t.cold : r < e.warmAbove ? t.normal : r < e.hotAbove ? t.warm : t.hot : t.normal;
}
function en(r, e, t, i = Ii) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: t.normal }];
  const l = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), o = Math.max(e.warmAbove - e.coldBelow, Pe), d = Math.max(e.hotAbove - e.warmAbove, Pe), h = l * o / 2, c = l * d / 2, m = (x) => x < e.coldBelow ? t.cold : x < e.warmAbove ? t.normal : x < e.hotAbove ? t.warm : t.hot, f = [
    { value: e.coldBelow, color: t.cold },
    { value: e.coldBelow + h, color: t.normal },
    { value: e.warmAbove - h, color: t.normal },
    { value: e.warmAbove + c, color: t.warm },
    { value: e.hotAbove - c, color: t.warm },
    { value: e.hotAbove, color: t.hot }
  ].filter((x) => x.value > n && x.value < s).concat([
    { value: n, color: m(n) },
    { value: s, color: m(s) }
  ]).sort((x, k) => x.value - k.value), y = [];
  for (const x of f) {
    const k = Number(((s - x.value) / a).toFixed(4)), A = y[y.length - 1];
    A && Math.abs(A.offset - k) < 5e-4 && A.color === x.color || y.push({ offset: k, color: x.color });
  }
  return y.reverse(), y.length === 1 && y.push({ offset: 1, color: y[0].color }), y[0].offset = 0, y[y.length - 1].offset = 1, y;
}
const tn = ["on", "open", "opening", "tilted", "gekippt"], rn = ["off", "closed", "closing"], de = {
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
}, pi = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, fi = { min: 14, max: 96 }, nn = /^[a-z0-9_]+\.[a-z0-9_]+$/, sn = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function an(r) {
  return typeof r == "object" && r !== null;
}
function j(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return nn.test(e) ? e : void 0;
}
function pe(r) {
  if (typeof r != "string") return;
  const e = r.trim();
  return e.length ? e : void 0;
}
function D(r, e, t, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(t, Math.max(e, n)) : i;
}
function C(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function we(r, e) {
  const t = pe(r);
  return t && t.length <= 64 ? t : e;
}
function yi(r) {
  const e = pe(r);
  if (!(!e || e.length > 120) && sn.test(e))
    return e;
}
function gi(r, e) {
  return Math.round(
    D(r, fi.min, fi.max, e)
  );
}
function on(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
const ln = [
  "type",
  "name",
  "name_entity",
  "icon",
  "height",
  "border_radius",
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
], bi = /* @__PURE__ */ new Set();
function hn(r) {
  for (const e of Object.keys(r))
    ln.includes(e) || bi.has(e) || (bi.add(e), console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${e}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`
    ));
}
function cn(r) {
  const e = an(r) ? r : {};
  hn(e);
  const t = j(e.temperature_entity), i = j(e.humidity_entity), n = j(e.window_entity), s = j(e.motion_entity), a = j(e.climate_entity), l = j(e.name_entity), o = on(e.window_open_states), d = C(e.show_window) ?? !!n, h = C(e.show_motion) ?? !!s, c = C(e.show_thermostat) ?? !!a, m = C(e.show_temperature_chart) ?? !!t, f = C(e.show_humidity_chart) ?? !!i, y = e.height, x = y === "auto" || y === void 0 || y === null || y === 0 ? null : D(y, 120, 2e3, 0) || null, k = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", A = e.chart_curve === "linear" ? "linear" : "smooth", E = Wr.includes(e.chart_smoothing) ? e.chart_smoothing : pt, b = e.chart_gap_mode === "break" ? "break" : "connect", L = e.chart_gap_style === "dashed" ? "dashed" : "solid", I = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid", z = we(
    e.accent_color ?? e.temperature_comfort_color,
    de.accent
  );
  return {
    raw: e,
    name: pe(e.name),
    nameEntity: l,
    icon: pe(e.icon) ?? "mdi:home-thermometer-outline",
    height: x,
    borderRadius: D(e.border_radius, 0, 40, 26),
    theme: k,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(D(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(D(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: gi(
          e.temperature_font_size,
          pi.temperature
        ),
        fontFamily: yi(e.temperature_font_family)
      },
      humidity: {
        fontSize: gi(e.humidity_font_size, pi.humidity),
        fontFamily: yi(e.humidity_font_family)
      }
    },
    showSeriesLabels: C(e.show_series_labels) ?? !0,
    accentColor: z,
    humidity: {
      color: we(e.humidity_color, de.humidity)
    },
    window: {
      enabled: d && !!n,
      entity: n,
      openStates: o.length ? o : [...tn]
    },
    motion: {
      enabled: h && !!s,
      entity: s,
      showLastChanged: C(e.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: c && !!a,
      entity: a,
      showRow: C(e.show_climate_row) ?? !0,
      showSetpoint: C(e.show_setpoint) ?? !0,
      showStatus: C(e.show_hvac_status) ?? !0,
      showMode: C(e.show_hvac_mode) ?? !1,
      heatingColor: we(e.heating_color, de.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: we(e.heating_idle_color, z),
      offColor: we(e.heating_off_color, de.off)
    },
    chart: {
      showTemperature: m && !!t,
      showHumidity: f && !!i,
      hours: Math.round(D(e.chart_hours, 1, 168, 6)),
      height: Math.round(D(e.chart_height, 30, 400, 112)),
      curve: A,
      smoothing: E,
      gapMode: b,
      maxGapMinutes: Math.round(D(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: L,
      humidityLineStyle: I,
      showPoints: C(e.chart_show_points) ?? !1,
      showTooltip: C(e.chart_show_tooltip) ?? !0,
      showExtremes: C(e.chart_show_extremes) ?? !0,
      showTemperatureGradient: C(e.chart_temperature_gradient) ?? !0,
      showHumidityGradient: C(e.chart_humidity_gradient) ?? !0,
      temperatureAreaOpacity: Math.round(D(e.chart_temperature_area_opacity, 10, 300, 100)) / 100,
      humidityAreaOpacity: Math.round(D(e.chart_humidity_area_opacity, 10, 300, 100)) / 100,
      opacity: Math.round(D(e.chart_opacity, 15, 100, 100)) / 100,
      temperatureBands: (C(e.chart_temperature_bands) ?? !1) && m,
      // Thresholds are sorted in `orderBandLimits`: a user may type 24 / 18 / 27.
      bandLimits: Qr(
        D(e.chart_band_cold_below, -30, 60, Ie.coldBelow),
        D(e.chart_band_warm_above, -30, 60, Ie.warmAbove),
        D(e.chart_band_hot_above, -30, 60, Ie.hotAbove)
      ),
      bandTransition: Math.round(
        D(e.chart_band_transition, 0, 100, Ii)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: C(e.chart_show_grid) ?? !1
    },
    tapAction: e.tap_action === "none" ? "none" : "more-info"
  };
}
function dn(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function Ui(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function ft(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function lt(r) {
  if (r.height) return r.height;
  const e = r.typography.temperature.fontSize, t = Ui(r) ? r.chart.height : 0, i = ft(r) ? 20 : 0, n = 28, s = r.showSeriesLabels ? 20 : 0;
  return 20 + n + 12 + s + e + 8 + i + 12 + t + 20;
}
function wi(r, e) {
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
const un = {
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
  seriesShown: "Serie eingeblendet",
  seriesHidden: "Serie ausgeblendet",
  showSeries: "Serie einblenden",
  hideSeries: "Serie ausblenden",
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
}, mn = {
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
  seriesShown: "Series shown",
  seriesHidden: "Series hidden",
  showSeries: "Show series",
  hideSeries: "Hide series",
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
}, pn = un;
function yt(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function fn(r) {
  const e = yt(r) === "de" ? pn : mn;
  return {
    language: yt(r),
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
function _e(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
const vi = /* @__PURE__ */ new Map();
function yn(r, e) {
  const t = `${r}|${e}`;
  let i = vi.get(t);
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
    vi.set(t, i);
  }
  return i;
}
function ie(r, e, t) {
  return Number.isFinite(r) ? yn(e || "en", _e(Math.round(t), 0, 3)).format(r) : "–";
}
function We(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function gn(r, e, t) {
  const i = Math.max(0, e - r), n = Math.floor(i / 6e4);
  if (n < 1) return t.justNow;
  if (n < 60) return `${n} ${t.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${t.hours}` : `${Math.floor(s / 24)} ${t.days}`;
}
function _i(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function gt(r) {
  const e = r?.trim().toLowerCase();
  return e ? e.includes("°f") || e === "f" || e.startsWith("fahrenheit") ? "F" : e.includes("°c") || e === "c" || e.startsWith("celsius") ? "C" : null : null;
}
function $i(r, e, t) {
  if (!Number.isFinite(r)) return null;
  const i = gt(e), n = gt(t);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function bt(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function bn(r) {
  return `#${r.map((e) => _e(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function ze(r, e) {
  const t = bt(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${_e(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${_e(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(_e(e, 0, 1) * 100)}%, transparent)`;
}
function je(r) {
  return r === "unavailable" || r === "unknown";
}
function xi(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const n = r?.states[e];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (je(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = We(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function wn(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (je(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return e.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : rn.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const vn = ["on", "detected", "motion", "occupied", "active"];
function _n(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (je(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (vn.includes(a))
    return { status: "active", entity: i, rawState: n };
  const l = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (l.sinceMs = s), l;
}
const $n = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Si(r, e, t) {
  const i = e.thermostat.entity, n = _i(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), s = r?.states[i ?? ""]?.attributes?.unit_of_measurement, a = _i(typeof s == "string" ? s : n);
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const l = r?.states[i];
  if (!l)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: a };
  const o = l.state?.toLowerCase(), d = l.attributes?.hvac_action, h = typeof d == "string" ? d.toLowerCase() : void 0, c = l.attributes?.temperature, m = typeof c == "number" ? c : typeof c == "string" ? We(c) : null, f = {
    entity: l,
    action: h,
    setpoint: m,
    unit: a,
    mode: o,
    modeLabel: o ? t.mode(o) : void 0
  };
  return je(l.state ?? "") ? { ...f, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : o === "off" ? { ...f, status: "off", label: t.t("off"), colorKey: "off" } : h === "heating" ? { ...f, status: "heating", label: t.t("heating"), colorKey: "heating" } : h === "idle" ? { ...f, status: "idle", label: t.t("idle"), colorKey: "idle" } : h === "off" ? { ...f, status: "off", label: t.t("off"), colorKey: "off" } : h && !$n.includes(h) ? { ...f, status: "action", label: t.action(h), colorKey: "idle" } : h ? { ...f, status: "action", label: t.action(h), colorKey: "idle" } : { ...f, status: "unknown", label: t.t("statusUnknown"), colorKey: "unknown" };
}
function xn(r, e) {
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
function $e(r) {
  return typeof r == "object" && r !== null;
}
function Sn(r) {
  if (!$e(r)) return;
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
function An(r) {
  if ($e(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Ai(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const n = Sn(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = An(i), a = We(s);
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
function ki(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = $e(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in t)) continue;
      const a = Ai(i);
      t[s] = kn(t[s], a);
    }
    return t;
  }
  if ($e(r))
    for (const i of e) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : $e(n) && Array.isArray(n.data) ? n.data : n;
      t[i] = Ai(s);
    }
  return t;
}
function kn(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((n, s) => n.t - s.t), i = [];
  for (const n of t) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Mn(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), n = new Date(t.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const o = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), d = ki(o, e);
      return Object.values(d).some((h) => h.length > 0), d;
    } catch (o) {
      if (!r.callApi) throw o;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((o) => encodeURIComponent(o)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, l = await r.callApi("GET", a);
  return ki(l, e);
}
function Cn(r, e) {
  return `${[...r].sort().join("|")}@${e}`;
}
class Tn {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, n = Date.now()) {
    const s = Cn(t, i), a = this.cache.get(s);
    if (a && n - a.fetchedAt < 12e4)
      return a.data;
    const l = this.inflight.get(s);
    if (l) return l;
    const o = Mn(e, t, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((d) => {
      if (this.cache.set(s, { fetchedAt: Date.now(), data: d }), this.cache.size > 24) {
        const h = this.cache.keys().next();
        h.done || this.cache.delete(h.value);
      }
      return d;
    }).finally(() => {
      this.inflight.delete(s);
    });
    return this.inflight.set(s, o), o;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const En = "room-climate-card:hidden-series:", Pi = ["temperature", "humidity"];
function Hn(r, e) {
  return `${En}${r ?? ""}|${e ?? ""}`;
}
function Vi() {
  try {
    return typeof window > "u" || !window.localStorage ? null : window.localStorage;
  } catch {
    return null;
  }
}
function Dn(r) {
  const e = Vi();
  if (!e) return [];
  try {
    const t = e.getItem(r);
    if (!t) return [];
    const i = JSON.parse(t);
    return Array.isArray(i) ? i.filter(
      (n) => typeof n == "string" && Pi.includes(n)
    ) : [];
  } catch {
    return [];
  }
}
function Rn(r, e) {
  const t = Vi();
  if (t)
    try {
      e.length === 0 ? t.removeItem(r) : t.setItem(r, JSON.stringify(Pi.filter((i) => e.includes(i))));
    } catch {
    }
}
const F = (r) => v`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, G = {
  thermometer: () => F(v`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => F(v`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => F(
    v`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => F(
    v`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => F(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => F(
    v`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => F(
    v`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => F(
    v`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => F(v`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => F(
    v`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => F(v`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => F(v`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => F(v`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => F(
    v`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const On = (r) => r.strings === void 0;
const Nn = { CHILD: 2 }, Fn = (r) => (...e) => ({ _$litDirective$: r, values: e });
class Ln {
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
const xe = (r, e) => {
  const t = r._$AN;
  if (t === void 0) return !1;
  for (const i of t) i._$AO?.(e, !1), xe(i, e);
  return !0;
}, Ve = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while (t?.size === 0);
}, Gi = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), In(e);
  }
};
function zn(r) {
  this._$AN !== void 0 ? (Ve(this), this._$AM = r, Gi(this)) : this._$AM = r;
}
function Bn(r, e = !1, t = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(i)) for (let s = t; s < i.length; s++) xe(i[s], !1), Ve(i[s]);
  else i != null && (xe(i, !1), Ve(i));
  else xe(this, r);
}
const In = (r) => {
  r.type == Nn.CHILD && (r._$AP ??= Bn, r._$AQ ??= zn);
};
class Un extends Ln {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, i) {
    super._$AT(e, t, i), Gi(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (xe(this, e), Ve(this));
  }
  setValue(e) {
    if (On(this._$Ct)) this._$Ct._$AI(e, this);
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
const K = () => new Pn();
class Pn {
}
const ht = /* @__PURE__ */ new WeakMap(), W = Fn(class extends Un {
  render(r) {
    return p;
  }
  update(r, [e]) {
    const t = e !== this.G;
    return t && this.rt(void 0), (t || this.lt !== this.ct) && (this.G = e, this.ht = r.options?.host, this.rt(this.ct = r.element)), p;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const e = this.ht ?? globalThis;
      let t = ht.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), ht.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? ht.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function Vn(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const n = Jr(t, e), s = n.map((l) => t[l]), a = [];
  for (let l = 1; l < n.length; l++)
    a.push(i.slice(n[l - 1] + 1, n[l] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const Gn = 320, Kn = 112, Wn = 4e3, jn = 0.3, Yn = 0.44, Zn = { minSpan: 0.4, padding: 0.15 }, qn = { minSpan: 3, padding: 0.15 };
let Xn = 0;
class Jn extends le {
  constructor() {
    super(...arguments), this.accentColor = "#4FD1A5", this.humidityColor = "#8B86D6", this.setpoint = null, this.setpointUnit = "°C", this.hiddenSeries = [], this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showPoints = !1, this.showGrid = !1, this.curve = "smooth", this.smoothing = "light", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.showTemperatureArea = !0, this.showHumidityArea = !0, this.chartOpacity = 100, this.temperatureAreaOpacity = 1, this.humidityAreaOpacity = 1, this.temperatureBands = !1, this.bandCold = 18, this.bandWarm = 24, this.bandHot = 27, this.bandTransition = 100, this.temperatureScale = "C", this.cornerRadius = 26, this.showTooltip = !0, this.showExtremes = !0, this.temperatureDecimals = 1, this.humidityDecimals = 1, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte",
      now: "Jetzt",
      setpoint: "Soll"
    }, this.uid = `rcc-chart-${++Xn}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = K(), this.crosshairRef = K(), this.temperatureDotRef = K(), this.humidityDotRef = K(), this.tooltipRef = K(), this.tooltipTimeRef = K(), this.tooltipTemperatureRef = K(), this.tooltipHumidityRef = K(), this.tooltipTemperatureRowRef = K(), this.tooltipHumidityRowRef = K(), this.onPointerDown = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerMove = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerUp = (e) => {
      (e.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), Wn));
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
      hiddenSeries: { attribute: !1 },
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
    this.styles = _t`
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
      font-size: 9px;
      font-weight: 500;
      fill: var(--rcc-text);
      fill-opacity: 0.55;
      letter-spacing: 0.02em;
      font-variant-numeric: tabular-nums;
      paint-order: stroke;
      stroke: var(--rcc-chart-point-fill);
      stroke-width: 1.4;
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
      width: this.width > 20 ? this.width : Gn,
      height: this.height > 20 ? this.height : Kn
    };
  }
  stateView(e, t, i) {
    return g`<div class="wrap">
      <div class="state" role="status">
        ${e}
        <span class="state-title">${t}</span>
        ${i ? g`<span class="state-hint">${i}</span>` : p}
      </div>
    </div>`;
  }
  isVisible(e) {
    return !(this.hiddenSeries ?? []).includes(e);
  }
  get temperatureVisible() {
    return this.isVisible("temperature") && !!this.temperature?.some((e) => e.v !== null);
  }
  get humidityVisible() {
    return this.isVisible("humidity") && !!this.humidity?.some((e) => e.v !== null);
  }
  get hasData() {
    return !!(this.temperature?.some((e) => e.v !== null) || this.humidity?.some((e) => e.v !== null));
  }
  render() {
    const { width: e, height: t } = this.chartSize;
    if (e < 40 || t < 34) return p;
    const i = v`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = v`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(e, t);
    return this.hoverGeometry = a, g`<div class="wrap">${s}${this.renderOverlay(a)}</div>`;
  }
  renderChart(e, t) {
    const i = t, n = i >= 62, s = n ? 20 : 2, a = 6, l = i - s, o = Math.max(6, l - a), d = 1, h = e - 1, c = Math.max(1, this.end - this.start), m = Re([this.start, this.end], [d, h]), f = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, y = Re([this.start, this.end], [d + f, h - f]), x = i - 6, k = a, A = a + o * jn, E = a + o * Yn, b = l, L = this.temperatureVisible ? this.temperature ?? [] : [], I = this.humidityVisible ? this.humidity ?? [] : [], z = L.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), Ye = I.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), Y = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, Ze = Y !== null ? [...z, Y] : z, qe = oi(Ze), Xe = oi(Ye), re = qe ? li(qe[0], qe[1], Zn) : null, fe = Xe ? li(Xe[0], Xe[1], qn) : null, R = re ? Re(re, [b, E]) : null, ye = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), ne = this.temperatureBands && re ? en(
      re,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: Ne, normal: this.accentColor, warm: Fe, hot: Le },
      this.bandTransition
    ) : null, At = ne ? `url(#${this.uid}-temp-stroke)` : this.accentColor, kt = ye < 1 ? `;stroke-opacity:${ye}` : "", Mt = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * ye), Ct = Mt(this.temperatureAreaOpacity), Tt = Mt(this.humidityAreaOpacity), Et = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * Ct).toFixed(3)
      )
    ), Wi = ne ? ne.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: Et(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: Et(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * Ct).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], ji = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * Tt).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * Tt).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], U = fe ? Re(fe, [A, k]) : null, X = ci(L, this.start, this.end), ge = ci(I, this.start, this.end), Ht = {
      rangeMs: c,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Je = this.curve === "smooth", Dt = (u) => {
      if (!Je || u.length < 5) return u;
      const _ = Zr(u.length, this.smoothing);
      if (_ < 3) return u;
      const S = Li(u);
      return Kr(u, _, {
        maxDeltaMs: Math.max(6e4, S * 3)
      });
    }, Yi = Dt(X), Zi = Dt(ge), Rt = re ? hi(Yi, Ht) : [], Ot = fe ? hi(Zi, Ht) : [], qi = Math.max(1, Rt.length + Ot.length), Xi = Math.max(60, Math.floor(1200 / qi)), Nt = (u) => u.map((_) => Vn(_, Xi)), Qe = Nt(Rt), et = Nt(Ot), Ft = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const _ = a + o * u / 3;
        Ft.push(v`<line class="grid-line" x1=${d} x2=${h} y1=${_} y2=${_} />`);
      }
    const Lt = n ? Math.min(3, Xr(e)) : 0, zt = Lt >= 2 ? qr(this.start, this.end, Math.max(2, Lt)) : [], Ji = zt.map((u, _) => {
      const S = _ === zt.length - 1, $ = _ === 0 ? "start" : S ? "end" : "middle";
      return v`<text class="axis-label" x=${y(u)} y=${x} text-anchor=${$}>
        ${this.formatAxisLabel(u, S)}
      </text>`;
    }), Bt = (u, _) => Ir(u, m, _), Qi = (u, _) => (this.gapStyle === "dashed" ? Br(u) : [u.samples]).filter(($) => $.length > 1).map(($) => Bi(Bt($, _), Je)).filter(($) => $.length > 0), It = (u, _, S, $ = {}) => Qi(u, _).map((J) => {
      const O = [
        $.color ? `stroke:${$.color}` : `stroke:${S}`,
        $.width ? `stroke-width:${$.width}` : "",
        $.dashed ? "stroke-dasharray:0.1 5.5" : "",
        kt.replace(/^;/, "")
      ].filter(Boolean).join(";");
      return v`<path class="series-line" d=${J} style=${O}></path>`;
    }), er = Qe.flatMap(
      (u) => It(u, R, At, { color: At })
    ), Ut = (u, _, S) => u.filter(($) => $.samples.length > 1).map(($) => Gr(Bt($.samples, _), S, Je)).join(" "), Pt = R && this.showTemperatureArea ? Ut(Qe, R, l) : "", tr = Pt ? [v`<path class="series-area" d=${Pt} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Vt = U && this.showHumidityArea ? Ut(et, U, A) : "", ir = Vt ? [
      v`<path class="series-area" d=${Vt} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], Gt = this.humidityLineStyle === "dotted", rr = et.flatMap(
      (u) => It(u, U, this.humidityColor, {
        color: this.humidityColor,
        dashed: Gt,
        width: Gt ? 2.2 : 1.9
      })
    ), Kt = [];
    if (this.showPoints) {
      const u = (_, S, $) => {
        const H = _.filter((V) => V.v !== null);
        if (!H.length) return;
        const O = Math.max(1, Math.ceil(H.length / 24));
        H.forEach((V, Q) => {
          if (Q % O !== 0 && Q !== H.length - 1) return;
          const M = V.v;
          Kt.push(
            v`<circle class="point" r="1.7" cx=${m(V.t)} cy=${S(M)} style="stroke:${$}${kt}" />`
          );
        });
      };
      R && Qe.forEach((_) => u(_.samples, R, this.accentColor)), U && et.forEach(
        (_) => u(_.samples, U, this.humidityColor)
      );
    }
    const B = Y !== null && R ? R(Y) : null, Te = B !== null && Number.isFinite(B) && B >= E - 0.5 && B <= b + 0.5, nr = X.find((u) => u.v !== null)?.v ?? null, sr = [...X].reverse().find((u) => u.v !== null)?.v ?? null, Wt = (u) => u === null || Y === null ? 0 : Math.abs(u - Y), tt = Wt(sr) >= Wt(nr), Ee = [...X].reverse().find((u) => u.v !== null), it = [...ge].reverse().find((u) => u.v !== null), ar = Te && Y !== null ? `${this.labels.setpoint} ${ie(Y, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", jt = (u, _, S, $) => {
      const H = mi(_);
      if (!H || H.min.v === H.max.v) return "";
      const J = ie(H.min.v, this.language, $), O = ie(H.max.v, this.language, $);
      return `${u} ${J}–${O}${S ? ` ${S}` : ""}`;
    }, or = this.temperatureUnit || this.setpointUnit, lr = (() => {
      if (!ne || !R) return "";
      const u = X.map((M) => M.v).filter((M) => M !== null && Number.isFinite(M));
      if (!u.length) return "";
      const _ = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, S = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, $ = { cold: Ne, normal: this.accentColor, warm: Fe, hot: Le }, H = ot(Math.min(...u), _, $), J = ot(Math.max(...u), _, $), O = (M) => M === Ne ? S.cold : M === Fe ? S.warm : M === Le ? S.hot : S.normal, V = O(H), Q = O(J);
      return V === Q ? `(${V})` : `(${V} – ${Q})`;
    })(), hr = [
      this.labels.aria,
      ar,
      R ? jt(this.labels.temperature, X, or, this.temperatureDecimals) : "",
      U ? jt(this.labels.humidity, ge, this.humidityUnit, this.humidityDecimals) : "",
      lr
    ].filter(Boolean).join(". "), rt = [], Yt = (u, _, S, $, H, J) => {
      if (!this.showExtremes || e < 200 || $ - S < 18) return;
      const O = mi(u);
      if (!O || O.min.v === O.max.v || u.filter((w) => w.v !== null).length < 3) return;
      const V = [
        { sample: O.max, isMax: !0 },
        { sample: O.min, isMax: !1 }
      ].map(({ sample: w, isMax: Z }) => {
        const He = m(w.t), N = _(w.v), P = N - 11 >= S, De = N + 17 <= $, se = P ? N - 9 : S + 8, ee = De ? N + 15 : $ - 1;
        let nt = Z ? P ? se : ee : De ? ee : se;
        if (Te && B !== null && Math.abs(nt - B) < 9) {
          const Zt = Z ? ee : se;
          Math.abs(Zt - B) >= 9 && (nt = Zt);
        }
        return { sample: w, cx: He, cy: N, labelY: nt, isMax: Z };
      }).filter((w) => Number.isFinite(w.cx) && Number.isFinite(w.cy)).filter((w) => w.cy >= S - 1 && w.cy <= $ + 1), Q = (w, Z) => Math.abs(w.labelY - Z.labelY) < 9 && Math.abs(w.cx - Z.cx) < 34;
      let M = [...V];
      if (M.length === 2 && Q(M[0], M[1])) {
        for (const w of M)
          w.labelY = w.isMax ? S + 8 : $ - 1;
        Q(M[0], M[1]) && (M = M.filter((w) => w.isMax));
      }
      for (const w of M) {
        if (!w) continue;
        const Z = 26, He = w.cx < (d + h) / 2;
        let N = He ? w.cx + 6 : w.cx - 6, P = He ? "start" : "end";
        P === "start" && N + Z > h - 2 ? (N = w.cx - 6, P = "end") : P === "end" && N - Z < d + 2 && (N = w.cx + 6, P = "start");
        const De = tt ? h : d, se = (ee) => Te && B !== null && Math.abs(w.labelY - (B - 5)) < 9 && Math.abs(ee - De) < 40;
        if (se(N)) {
          const ee = P === "start" ? w.cx - 6 : w.cx + 6;
          se(ee) || (N = ee, P = P === "start" ? "end" : "start");
        }
        rt.push(
          v`<circle
            class="extreme-dot"
            r="1.8"
            cx=${w.cx}
            cy=${w.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${H};stroke-width:1.2`}
          />`
        ), se(N) || rt.push(
          v`<text class="extreme-label" x=${N} y=${w.labelY} text-anchor=${P}>${ie(
            w.sample.v,
            this.language,
            J
          )}</text>`
        );
      }
    };
    R && Yt(
      X,
      R,
      E,
      b,
      this.accentColor,
      this.temperatureDecimals
    ), U && Yt(
      ge,
      U,
      k,
      A,
      this.humidityColor,
      this.humidityDecimals
    );
    const cr = {
      width: e,
      height: i,
      left: d,
      right: h,
      plotTop: a,
      plotBottom: l,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: R && re ? { samples: X, domain: re, top: E, bottom: b } : null,
      humidity: U && fe ? { samples: ge, domain: fe, top: k, bottom: A } : null
    };
    return { chart: v`<svg
      width=${e}
      height=${i}
      viewBox="0 0 ${e} ${i}"
      role="img"
      aria-label=${hr}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${E} x2="0" y2=${b} gradientUnits="userSpaceOnUse">
          ${Wi.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        ${ne ? v`<linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${E} x2="0" y2=${b} gradientUnits="userSpaceOnUse">
                ${ne.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} />`
    )}
              </linearGradient>` : p}
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${k} x2="0" y2=${A} gradientUnits="userSpaceOnUse">
          ${ji.map(
      (u) => v`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${Ft}
      ${ir}
      ${tr}
      ${Te ? v`<line
            class="setpoint-line"
            x1=${d}
            x2=${h}
            y1=${B}
            y2=${B}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${tt ? h : d}
            y=${B - 5}
            text-anchor=${tt ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : p}
      <line class="baseline" x1=${d} x2=${h} y1=${l} y2=${l} />
      ${rr} ${er} ${Kt}
      ${it && U ? v`<circle
            class="end-dot"
            r="2.6"
            cx=${m(it.t)}
            cy=${U(it.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${ye}`}
          />` : p}
      ${Ee && R ? v`<circle
            class="end-dot"
            r="2.8"
            cx=${m(Ee.t)}
            cy=${R(Ee.v)}
            style=${`fill:${ne ? ot(
      Ee.v,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: Ne, normal: this.accentColor, warm: Fe, hot: Le }
    ) : this.accentColor};fill-opacity:${ye}`}
          />` : p}
      ${rt}
      ${Ji}
    </svg>`, geometry: cr };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(e) {
    if (!this.showTooltip || !e.temperature && !e.humidity) return p;
    const t = Math.round(e.plotTop), i = Math.max(1, Math.round(e.plotBottom - e.plotTop));
    return g`<div
        class="overlay"
        style=${`top:${t}px;height:${i}px`}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
      ></div>
      <div class="hover" ${W(this.hoverRef)} hidden aria-hidden="true">
        <div
          class="crosshair"
          ${W(this.crosshairRef)}
          style=${`top:${t}px;height:${i}px`}
        ></div>
        <div
          class="hover-dot"
          ${W(this.temperatureDotRef)}
          style=${`background:${this.accentColor}`}
          hidden
        ></div>
        <div
          class="hover-dot"
          ${W(this.humidityDotRef)}
          style=${`background:${this.humidityColor}`}
          hidden
        ></div>
        <div class="tooltip" ${W(this.tooltipRef)}>
          <span class="tooltip-time" ${W(this.tooltipTimeRef)}></span>
          <span class="tooltip-row" ${W(this.tooltipTemperatureRowRef)}>
            <i style=${`background:${this.accentColor}`}></i>
            <span ${W(this.tooltipTemperatureRef)}></span>
          </span>
          <span class="tooltip-row" ${W(this.tooltipHumidityRowRef)}>
            <i style=${`background:${this.humidityColor}`}></i>
            <span ${W(this.tooltipHumidityRef)}></span>
          </span>
        </div>
      </div>`;
  }
  updateHoverAt(e) {
    const t = this.hoverGeometry;
    if (!t) return;
    const n = e.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : t.width;
    if (!s) return;
    const a = n ? n.left : 0, l = Math.min(1, Math.max(0, (e.clientX - a) / s)), o = t.start + l * (t.end - t.start);
    this.showHoverAt(o);
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
    const n = ie(e, this.language, i);
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
    const n = t.temperature ? Oe(t.temperature.samples, e) : null, s = t.humidity ? Oe(t.humidity.samples, e) : null;
    let a = n ?? s;
    if (n && s && (a = Math.abs(n.t - e) <= Math.abs(s.t - e) ? n : s), !a) {
      this.hideHover();
      return;
    }
    const l = a.t, o = this.crosshairRef.value, d = this.xForTime(l, t);
    o && (o.style.left = `${d}px`);
    const h = t.temperature ? Oe(t.temperature.samples, l) : null, c = t.humidity ? Oe(t.humidity.samples, l) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      t.temperature,
      h,
      d
    ), this.placeDot(this.humidityDotRef.value, t.humidity, c, d);
    const m = this.tooltipRef.value, f = this.tooltipTimeRef.value, y = this.tooltipTemperatureRowRef.value, x = this.tooltipHumidityRowRef.value, k = this.tooltipTemperatureRef.value, A = this.tooltipHumidityRef.value, E = this.temperatureUnit || this.setpointUnit;
    if (f && (f.textContent = this.formatDayTime(l)), y && (y.hidden = !h), x && (x.hidden = !c), k && h && (k.textContent = this.tooltipValue(
      h.v,
      E,
      this.temperatureDecimals
    )), A && c && (A.textContent = this.tooltipValue(
      c.v,
      this.humidityUnit,
      this.humidityDecimals
    )), m) {
      m.dataset.time = String(l);
      const b = m.offsetWidth || 84, L = m.offsetHeight || 38;
      let I = d + 10;
      I + b > t.width - 4 && (I = d - 10 - b), I = Math.max(4, Math.min(I, Math.max(4, t.width - b - 4)));
      const z = Math.max(2, Math.min(t.plotTop + 2, t.height - L - 2));
      m.style.left = `${I}px`, m.style.top = `${z}px`;
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
    let a, l;
    try {
      a = new Intl.DateTimeFormat(i, { weekday: "short", ...n }).format(t).replace(/[.,]/g, "").trim(), l = new Intl.DateTimeFormat(i, { ...s, ...n }).format(t);
    } catch {
      a = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][t.getDay()], l = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    }
    return a ? `${a} ${l}` : l;
  }
}
const Mi = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Mi) && customElements.define(Mi, Jn);
const ct = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Qn = {
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
    smoothingHelper: "Je ruhiger die Stufe, desto flacher wirkt der Verlauf. „Aus“ zeigt jede gemessene Bewegung, „Leicht“ nimmt nur das Sensor-Zittern, „Mittel“ und „Stark“ bügeln bewusst mehr aus.",
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
    smoothingHelper: "The calmer the level, the flatter the curve looks. “Off” shows every measured move, “Light” only removes the sensor jitter, “Medium” and “Strong” deliberately iron out more.",
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
    points: "Data points",
    tooltip: "Values on hover",
    extremes: "Show minimum/maximum in the chart",
    comfortHelper: "Pointing at the curve shows the time and the actual measurements. Minimum and maximum stay visible next to the curve.",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
function es(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class Ki extends le {
  constructor() {
    super(...arguments), this._config = { type: `custom:${q}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = e && typeof e == "object" ? { ...e, type: e.type ?? `custom:${q}` } : { type: `custom:${q}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const e = yt(this.hass?.locale?.language ?? this.hass?.language);
    return Qn[e];
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
    t.type = this._config.type ?? `custom:${q}`, this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(e) {
    return C(this._config[e]);
  }
  showFlag(e, t) {
    return this.rawBoolean(e) ?? !!j(this._config[t]);
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
    return pe(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = pe(this._config[e]) ?? t;
    return bt(i) ?? bt(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: bn(t) });
      }
    });
  }
  renderField(e) {
    return g`<div
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
      ${e.helper ? g`<span class="helper">${e.helper}</span>` : p}
      ${e.warning ? g`<span class="helper warning">${e.warning}</span>` : p}
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
      revertOnLeave: !0,
      onChange: (t) => {
        const i = es(t);
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
    return g`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(e, s)}>
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
      return g`<div class="loading">${this.text.loading}</div>`;
    const e = this.text;
    return g`<div class="editor">
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
    return g`<div class="hint">${e.generalHelper}</div>
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
      fallback: 26
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
    return g`${this.renderField({
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
    return g`<div class="hint">${e.readingSizeHelper}</div>
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
    return g`<div class="hint">${e.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: e.accentColor,
      fallback: de.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: e.secondaryColor,
      fallback: de.humidity
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = j(this._config.window_entity);
    return g`${this.renderSwitch({
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
    return g`${this.renderSwitch({
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
      warning: t && !j(this._config.motion_entity) ? e.missingEntity : void 0
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
    return g`${this.renderSwitch({
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
      warning: t && !j(this._config.climate_entity) ? e.missingEntity : void 0
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
      fallback: ct.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: ct.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: ct.off,
      disabled: !t
    })}`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = t || i, s = t && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48].map((l) => ({ value: String(l), label: `${l} h` }));
    return g`${this.renderSwitch({
      key: "show_temperature_chart",
      label: e.showTemperatureChart,
      value: t,
      onChange: (l) => this.patch({ show_temperature_chart: l })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: e.showHumidityChart,
      value: i,
      onChange: (l) => this.patch({ show_humidity_chart: l })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: e.hours,
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
      onChange: (l) => this.patch({ chart_smoothing: String(l) })
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
      onChange: (l) => this.patch({ chart_temperature_bands: l ? !0 : void 0 })
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
      onChange: (l) => this.patch({ chart_humidity_line_style: String(l) })
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
      onChange: (l) => this.patch({ chart_gap_mode: String(l) })
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
    this.styles = _t`
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
typeof customElements < "u" && !customElements.get(Se) && customElements.define(Se, Ki);
const dt = "#fbbf24", ut = "#34d399", Ci = "var(--rcc-neutral)", ts = 15 * 1e3, is = 300 * 1e3;
class rs extends le {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._hiddenSeries = [], this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new Tn(), this.historyKey = "", this.hiddenSeriesKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.handleCardClick = (e) => {
      const t = this.tapTarget;
      !t || e.target?.closest("button, a, input, select, textarea, .chart-slot, room-climate-chart") || this.openMoreInfo(t);
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
      _haIconReady: { state: !0 },
      _hiddenSeries: { state: !0 }
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
    const t = cn(e);
    this._config = t;
    const i = Hn(
      t.temperatureEntity,
      t.humidityEntity
    );
    i !== this.hiddenSeriesKey && (this.hiddenSeriesKey = i, this._hiddenSeries = Dn(i)), this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(Se);
  }
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), n = (c) => i.find(c)?.entity_id, s = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), a = n(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), o = n(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), d = n((c) => c.entity_id.startsWith("climate.")), h = { type: `custom:${q}` };
    return s && (h.temperature_entity = s), a && (h.humidity_entity = a), l && (h.window_entity = l), o && (h.motion_entity = o), d && (h.climate_entity = d), h;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(lt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? lt(this._config) : 230;
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
    return fn(e);
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
    const a = Date.now(), l = a - i.chart.hours * 60 * 60 * 1e3;
    try {
      const o = await this.repository.load(n, s, i.chart.hours, a);
      if (this.historyKey !== e) return;
      this._history = o, this._historyWindow = { start: l, end: a }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, t && this.requestUpdate();
    } catch (o) {
      if (this.historyKey !== e) return;
      this._historyError = o instanceof Error ? o.message : String(o), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, ts), is), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const a = e[e.length - 1], l = Math.min(s, i);
    if (l <= a.t) return e;
    const o = We(n.state);
    return a.v === o ? e : [...e, { t: l, v: o }];
  }
  updateDensity(e) {
    const t = e > 0 ? e : this._config ? this._config.height ?? lt(this._config) : 0;
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
      const i = this._config ? dn(this._config) : [];
      return i.length ? i.some((n) => t.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return g`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: n, humidity: s } = e.typography, a = [
      `--rcc-radius:${e.borderRadius}px`,
      e.height ? `--rcc-height:${e.height}px` : "",
      `--rcc-chart-height:${e.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${s.fontSize}px`,
      `--rcc-accent:${e.accentColor}`,
      `--rcc-secondary:${e.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return g`<div
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"} ${this.tapTarget ? "is-tappable" : ""}"
      style="${a}"
      role="group"
      aria-label="${this.cellAriaLabel(e, t)}"
      @click=${this.handleCardClick}
    >
      ${this.renderHeader(e, t)} ${this.renderReadings(e, t)}
      ${this.renderClimateRow(e, t)} ${this.renderChart(e, t)}
      ${this.hasAnyEntity(e) ? p : this.renderEmpty(t)}
    </div>`;
  }
  hasAnyEntity(e) {
    return !!(e.temperatureEntity || e.humidityEntity);
  }
  cellAriaLabel(e, t) {
    return `${wi(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return g`<div class="empty-state" role="status">
      ${G.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = wi(e, this.hass), n = _n(this.hass, e), s = wn(this.hass, e), a = e.motion.enabled && e.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return g`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? g`<div class="subtle">
              ${t.t("quietSince")}
              ${gn(n.sinceMs, this._now, {
      justNow: t.t("justNow"),
      minutes: t.t("minutesShort"),
      hours: t.t("hoursShort"),
      days: t.t("daysShort")
    })}
            </div>` : p}
      </div>
      <div class="badges">
        ${e.motion.enabled ? this.renderMotionBadge(n, t) : p}
        ${e.window.enabled ? this.renderWindowBadge(s, t) : p}
      </div>
    </div>`;
  }
  renderRoomIcon(e) {
    return this._haIconReady ? g`<ha-icon .icon=${e.icon}></ha-icon>` : G.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", n = i ? ut : Ci, s = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return g`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${ze(
      i ? ut : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${ze(i ? ut : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${G.motion()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", n = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return g`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? dt : Ci};--badge-bg:${ze(
      i ? dt : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${ze(i ? dt : "#64748b", i ? 0.5 : 0.22)}"
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
  renderReadings(e, t) {
    if (!e.temperatureEntity && !e.humidityEntity) return p;
    const i = this.language(), n = xi(this.hass, e.temperatureEntity, "temperature"), s = xi(this.hass, e.humidityEntity, "humidity"), a = !!e.temperatureEntity, l = !!e.humidityEntity, o = e.showSeriesLabels;
    return g`<div class="readings ${o ? "" : "no-labels"}">
      ${o ? g`<div class="reading-labels" aria-hidden="true">
        ${a ? g`<span
              class="series-label ${this._hiddenSeries.includes("temperature") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.accentColor}"></span
              >${t.t("temperature")}</span
            >` : p}
        ${l ? g`<span
              class="series-label ${this._hiddenSeries.includes("humidity") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.humidity.color}"></span
              >${t.t("humidity")}</span
            >` : p}
        </div>` : p}
      <div class="reading-values">
        ${a ? this.renderReading({
      key: "temperature",
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
      color: e.accentColor,
      toggleable: e.chart.showTemperature,
      t
    }) : p}
        ${l ? this.renderReading({
      key: "humidity",
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
      color: e.humidity.color,
      toggleable: e.chart.showHumidity,
      t
    }) : p}
      </div>
    </div>`;
  }
  /** One measured value; the accent dot of the caption row marks its series. */
  renderReading(e) {
    const t = this._hiddenSeries.includes(e.key), i = e.t, n = e.value !== null ? ie(e.value, e.language, e.decimals) : "–", s = g`<span class="reading-value">${n}</span
      ><span class="reading-unit">${e.unit}</span>`;
    return e.toggleable ? g`<button
      type="button"
      class="reading ${e.className} ${t ? "is-hidden" : ""}"
      style="--series-color:${e.color}"
      aria-pressed=${!t}
      aria-label="${e.ariaLabel} – ${t ? i.t("seriesHidden") : i.t("seriesShown")}"
      title="${t ? i.t("showSeries") : i.t("hideSeries")}"
      @click=${() => this.toggleSeries(e.key)}
    >
      <span class="reading-number">${s}</span>
    </button>` : g`<span class="reading ${e.className}" style="--series-color:${e.color}">
        <span class="reading-number" role="text" aria-label="${e.ariaLabel}">${s}</span>
      </span>`;
  }
  toggleSeries(e) {
    this._hiddenSeries = this._hiddenSeries.includes(e) ? this._hiddenSeries.filter((t) => t !== e) : [...this._hiddenSeries, e], this.hiddenSeriesKey && Rn(this.hiddenSeriesKey, this._hiddenSeries);
  }
  sensorAria(e, t, i, n) {
    return e.value === null ? n.t("unavailable") : `${ie(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Entity a tap on the card opens. Only offered while the status row is
   * visible, because that row is the keyboard path to the same action – a
   * pointer-only target would be a trap.
   */
  get tapTarget() {
    const e = this._config;
    if (!(!e || e.tapAction === "none") && ft(e))
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
    if (!ft(e)) return p;
    const i = Si(this.hass, e, t), n = e.thermostat.showSetpoint && i.setpoint !== null, s = e.thermostat.showStatus, a = e.thermostat.showMode && !!i.modeLabel;
    if (!n && !s && !a) return p;
    const l = xn(i, e), o = this.language(), d = i.setpoint !== null ? `${ie(i.setpoint, o, e.temperatureDecimals)} ${i.unit}` : "", h = this.tapTarget, c = g`${s ? g`<span class="flame status-${i.status}" style="color:${l}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : p}
      <span class="climate-state" role=${h ? "status" : p}
        >${a ? i.modeLabel : i.label}</span
      >
      ${n ? g`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t("setpoint")}</span> ${d}</span
            >` : p}`;
    return h ? g`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${t.t("openThermostat")}"
      title="${t.t("openThermostat")}"
      @click=${() => this.openMoreInfo(h)}
    >
      ${c}
    </button>` : g`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(i)}"
      >
        ${c}
      </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(e) {
    if (e.status === "action")
      switch (e.action) {
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
  thermostatAria(e) {
    return e.label;
  }
  renderChart(e, t) {
    if (!Ui(e)) return p;
    const i = Date.now(), n = i - e.chart.hours * 60 * 60 * 1e3, s = e.chart.showTemperature && e.temperatureEntity ? this.withLiveState(
      this._history[e.temperatureEntity],
      e.temperatureEntity,
      i
    ) : void 0, a = e.chart.showHumidity && e.humidityEntity ? this.withLiveState(this._history[e.humidityEntity], e.humidityEntity, i) : void 0, l = this.language(), o = this.chartClock(), d = e.humidityEntity ? this.hass?.states?.[e.humidityEntity]?.attributes?.unit_of_measurement : void 0, h = e.thermostat.enabled ? Si(this.hass, e, t) : void 0, c = (e.temperatureEntity ? this.hass?.states?.[e.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = h?.setpoint ?? null, y = (m === null || !h ? null : $i(m, h.unit, c)) ?? (h?.unit === c ? m : null), x = (A, E) => $i(A, "°C", E) ?? A, k = {
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
    };
    return g`<div class="chart-slot">
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${e.accentColor}
        .humidityColor=${e.humidity.color}
        .setpoint=${y}
        .setpointUnit=${c}
        .hiddenSeries=${this._hiddenSeries}
        .start=${n}
        .end=${i}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .showTooltip=${e.chart.showTooltip}
        .showExtremes=${e.chart.showExtremes}
        .temperatureUnit=${c}
        .humidityUnit=${d ?? "%"}
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
        .temperatureAreaOpacity=${e.chart.temperatureAreaOpacity}
        .humidityAreaOpacity=${e.chart.humidityAreaOpacity}
        .temperatureBands=${e.chart.temperatureBands}
        .bandCold=${x(e.chart.bandLimits.coldBelow, c)}
        .bandWarm=${x(e.chart.bandLimits.warmAbove, c)}
        .bandHot=${x(e.chart.bandLimits.hotAbove, c)}
        .bandTransition=${Math.round(e.chart.bandTransition * 100)}
        .temperatureScale=${gt(c) ?? "C"}
        .cornerRadius=${e.borderRadius}
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
    this.styles = _t`
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
      padding: var(--rcc-space-5);
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
    .series-label.is-hidden {
      color: var(--rcc-tertiary);
    }
    .series-label.is-hidden .series-dot {
      opacity: 0.3;
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
      border: 0;
      background: none;
      /* 8 px of symmetric padding lifts the 20 px humidity value to a 36 px
         tap target; the negative margin cancels it visually, so the shared
         baseline of both values is untouched. */
      padding: 8px 0;
      margin: -8px 0;
      color: inherit;
      font: inherit;
      border-radius: 8px;
    }
    button.reading {
      cursor: pointer;
      transition: opacity 0.18s ease;
    }
    button.reading:focus-visible {
      outline: 2px solid var(--rcc-accent);
      outline-offset: 2px;
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
    .reading.is-hidden .reading-number,
    .reading.is-hidden .reading-unit {
      color: var(--rcc-tertiary);
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
      padding: var(--rcc-space-5);
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
  `%c ROOM-CLIMATE-CARD %c v${mr} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(q) || customElements.define(q, rs);
customElements.get(Se) || customElements.define(Se, Ki);
const Ti = window.customCards = window.customCards ?? [];
Ti.some((r) => r.type === q) || Ti.push({
  type: q,
  name: dr,
  description: ur,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  q as CARD_TAG,
  mr as CARD_VERSION,
  rs as RoomClimateCard,
  Ki as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
