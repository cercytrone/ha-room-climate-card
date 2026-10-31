const Y = "room-climate-card", $t = "room-climate-card-editor", Gi = "Room Climate Card", Ki = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", Wi = "2.7.0";
const Dt = globalThis, he = Dt.ShadowRoot && (Dt.ShadyCSS === void 0 || Dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ce = /* @__PURE__ */ Symbol(), Le = /* @__PURE__ */ new WeakMap();
let mi = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (he && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Le.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Le.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ji = (r) => new mi(typeof r == "string" ? r : r + "", void 0, ce), ue = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new mi(e, r, ce);
}, Yi = (r, t) => {
  if (he) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = Dt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, r.appendChild(i);
  }
}, Oe = he ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ji(e);
})(r) : r;
const { is: Zi, defineProperty: qi, getOwnPropertyDescriptor: Xi, getOwnPropertyNames: Ji, getOwnPropertySymbols: Qi, getPrototypeOf: tr } = Object, zt = globalThis, ze = zt.trustedTypes, er = ze ? ze.emptyScript : "", ir = zt.reactiveElementPolyfillSupport, bt = (r, t) => r, se = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? er : null;
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
} }, pi = (r, t) => !Zi(r, t), Fe = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: pi };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let at = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Fe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && qi(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Xi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: s, set(n) {
      const a = s?.call(this);
      o?.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bt("elementProperties"))) return;
    const t = tr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bt("properties"))) {
      const e = this.properties, i = [...Ji(e), ...Qi(e)];
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
      for (const s of i) e.unshift(Oe(s));
    } else t !== void 0 && e.push(Oe(t));
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
    return Yi(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : se).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : se;
      this._$Em = s;
      const a = n.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (s === !1 && (o = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? pi)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
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
        const { wrapped: n } = o, a = this[s];
        n !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, at[bt("elementProperties")] = /* @__PURE__ */ new Map(), at[bt("finalized")] = /* @__PURE__ */ new Map(), ir?.({ ReactiveElement: at }), (zt.reactiveElementVersions ??= []).push("2.1.2");
const de = globalThis, Ne = (r) => r, Lt = de.trustedTypes, Ie = Lt ? Lt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, fi = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, yi = "?" + X, rr = `<${yi}>`, st = document, xt = () => st.createComment(""), St = (r) => r === null || typeof r != "object" && typeof r != "function", me = Array.isArray, sr = (r) => me(r) || typeof r?.[Symbol.iterator] == "function", Jt = `[ 	
\f\r]`, yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ue = /-->/g, Pe = />/g, et = RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Be = /'/g, Ve = /"/g, gi = /^(?:script|style|textarea|title)$/i, bi = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = bi(1), w = bi(2), ht = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Ge = /* @__PURE__ */ new WeakMap(), it = st.createTreeWalker(st, 129);
function wi(r, t) {
  if (!me(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ie !== void 0 ? Ie.createHTML(t) : t;
}
const nr = (r, t) => {
  const e = r.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = yt;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let c, h, u = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, h = n.exec(l), h !== null); ) p = n.lastIndex, n === yt ? h[1] === "!--" ? n = Ue : h[1] !== void 0 ? n = Pe : h[2] !== void 0 ? (gi.test(h[2]) && (s = RegExp("</" + h[2], "g")), n = et) : h[3] !== void 0 && (n = et) : n === et ? h[0] === ">" ? (n = s ?? yt, u = -1) : h[1] === void 0 ? u = -2 : (u = n.lastIndex - h[2].length, c = h[1], n = h[3] === void 0 ? et : h[3] === '"' ? Ve : Be) : n === Ve || n === Be ? n = et : n === Ue || n === Pe ? n = yt : (n = et, s = void 0);
    const y = n === et && r[a + 1].startsWith("/>") ? " " : "";
    o += n === yt ? l + rr : u >= 0 ? (i.push(c), l.slice(0, u) + fi + l.slice(u) + X + y) : l + X + (u === -2 ? a : y);
  }
  return [wi(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class kt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, l = this.parts, [c, h] = nr(t, e);
    if (this.el = kt.createElement(c, i), it.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = it.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(fi)) {
          const p = h[n++], y = s.getAttribute(u).split(X), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: $[2], strings: y, ctor: $[1] === "." ? ar : $[1] === "?" ? lr : $[1] === "@" ? hr : Ft }), s.removeAttribute(u);
        } else u.startsWith(X) && (l.push({ type: 6, index: o }), s.removeAttribute(u));
        if (gi.test(s.tagName)) {
          const u = s.textContent.split(X), p = u.length - 1;
          if (p > 0) {
            s.textContent = Lt ? Lt.emptyScript : "";
            for (let y = 0; y < p; y++) s.append(u[y], xt()), it.nextNode(), l.push({ type: 2, index: ++o });
            s.append(u[p], xt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === yi) l.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(X, u + 1)) !== -1; ) l.push({ type: 7, index: o }), u += X.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = st.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ct(r, t, e = r, i) {
  if (t === ht) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = St(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = ct(r, s._$AS(r, t.values), s, i)), t;
}
class or {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? st).importNode(e, !0);
    it.currentNode = s;
    let o = it.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new At(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new cr(o, this, t)), this._$AV.push(c), l = i[++a];
      }
      n !== l?.index && (o = it.nextNode(), n++);
    }
    return it.currentNode = st, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class At {
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
    t = ct(this, t, e), St(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : sr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && St(this._$AH) ? this._$AA.nextSibling.data = t : this.T(st.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = kt.createElement(wi(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new or(s, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ge.get(t.strings);
    return e === void 0 && Ge.set(t.strings, e = new kt(t)), e;
  }
  k(t) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new At(this.O(xt()), this.O(xt()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Ne(t).nextSibling;
      Ne(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ft {
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
    if (o === void 0) t = ct(this, t, e, 0), n = !St(t) || t !== this._$AH && t !== ht, n && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = ct(this, a[i + l], e, l), c === ht && (c = this._$AH[l]), n ||= !St(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ar extends Ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class lr extends Ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class hr extends Ft {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ct(this, t, e, 0) ?? m) === ht) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class cr {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ct(this, t);
  }
}
const ur = de.litHtmlPolyfillSupport;
ur?.(kt, At), (de.litHtmlVersions ??= []).push("3.3.3");
const dr = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new At(t.insertBefore(xt(), o), o, void 0, e ?? {});
  }
  return s._$AI(r), s;
};
const pe = globalThis;
let rt = class extends at {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = dr(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ht;
  }
};
rt._$litElement$ = !0, rt.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: rt });
const mr = pe.litElementPolyfillSupport;
mr?.({ LitElement: rt });
(pe.litElementVersions ??= []).push("4.2.2");
const k = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function Tt(r, t) {
  const [e, i] = r, [s, o] = t, n = i - e;
  if (!Number.isFinite(n) || n === 0) {
    const a = (s + o) / 2;
    return () => a;
  }
  return (a) => s + (a - e) / n * (o - s);
}
function Ke(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function We(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: s = 0.12 } = e;
  let o = r, n = t;
  if (n - o < i) {
    const l = (n + o) / 2;
    o = l - i / 2, n = l + i / 2;
  }
  const a = (n - o) * s;
  return [o - a, n + a];
}
function vi(r) {
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
function pr(r, t, e = {}) {
  const i = vi(r), s = i > 0 ? i * 2.5 : 0, o = e.minMs ?? Math.max(t / 40, 300 * 1e3), n = e.maxMs ?? Math.max(o, t / 3);
  return Math.min(n, Math.max(s, o));
}
const fr = 1e3, yr = 8;
function gr(r, t, e, i) {
  const s = e.t - t.t, o = t.v, n = e.v, a = Math.min(
    yr,
    Math.max(1, Math.round(s / Math.max(i / 2, 6e4)))
  );
  for (let l = 1; l < a; l++) {
    const c = l / a;
    r.samples.push({
      t: Math.round(t.t + s * c),
      v: o + (n - o) * c
    }), r.bridged.push(!0);
  }
}
function je(r, t) {
  const { rangeMs: e, start: i, end: s } = t, o = t.gapMode ?? "connect", n = pr(r, e), a = t.maxGapMs ?? e / 4, l = [];
  let c = null, h = null, u = null, p = !1, y = !1;
  const $ = () => {
    c && c.samples.length && l.push(c), c = null, h = null, u = null;
  }, z = (g) => {
    if (!c || !h || g === null || g <= h.t) return;
    const D = { t: g, v: h.v };
    c.samples.push(D), c.bridged.push(!1), h = D;
  };
  for (const g of r) {
    if (g.v === null || !Number.isFinite(g.v)) {
      h || (p = !0), u = u ?? g.t, y = !0;
      continue;
    }
    if (y = !1, !h || !c) {
      c = { samples: [g], bridged: [] }, h = g, u = null;
      continue;
    }
    const D = g.t - h.t;
    if (D <= n && u === null) {
      c.samples.push(g), c.bridged.push(!1), h = g;
      continue;
    }
    if (!(u !== null)) {
      const Pt = Math.min(fr, D / 2);
      c.samples.push({ t: g.t - Pt, v: h.v }), c.bridged.push(!1), c.samples.push(g), c.bridged.push(!1), h = g;
      continue;
    }
    const L = Math.max(h.t, u), Ut = g.t - L;
    if (o === "connect" && Ut <= a) {
      L > h.t && (c.samples.push({ t: L, v: h.v }), c.bridged.push(!1), h = { t: L, v: h.v }), gr(c, h, g, n), c.samples.push(g), c.bridged.push(!0), h = g, u = null;
      continue;
    }
    z(u), $(), c = { samples: [g], bridged: [] }, h = g;
  }
  if (y && z(u), $(), !l.length) return l;
  const C = l[0];
  if (!p && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), y)
    return l;
  const A = l[l.length - 1], R = A.samples[A.samples.length - 1];
  return s !== void 0 && R.t < s && (A.samples.push({ t: s, v: R.v }), A.bridged.push(!1)), l;
}
function Ye(r, t, e) {
  if (!r || !r.length) return [];
  const i = [...r].sort((n, a) => n.t - a.t), s = [];
  let o = null;
  for (const n of i) {
    if (!Number.isFinite(n.t) || e !== void 0 && n.t > e) continue;
    const a = n.v === null || !Number.isFinite(n.v) ? null : n.v;
    if (t !== void 0 && n.t < t) {
      o = { t, v: a };
      continue;
    }
    const l = s[s.length - 1];
    if (l && l.t === n.t) {
      s[s.length - 1] = { t: n.t, v: a };
      continue;
    }
    s.push({ t: n.t, v: a });
  }
  return o && t !== void 0 && (!s.length || s[0].t > t) && s.unshift(o), s;
}
function br(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const t = [];
  let e = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    e.push(r.samples[i]), r.bridged[i] && (t.push(e), e = [r.samples[i]]);
  return e.length > 1 && t.push(e), t;
}
function wr(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function _i(r) {
  if (!r.length) return "";
  let t = `M ${k(r[0].x)} ${k(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${k(r[e].x)} ${k(r[e].y)}`;
  return t;
}
function vr(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${k(r[0].x)} ${k(r[0].y)}`;
  if (r.length === 2) return _i(r);
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
    const a = s[n] / i[n], l = s[n + 1] / i[n], c = a * a + l * l;
    if (c > 9) {
      const h = 3 / Math.sqrt(c);
      s[n] = h * a * i[n], s[n + 1] = h * l * i[n];
    }
  }
  let o = `M ${k(r[0].x)} ${k(r[0].y)}`;
  for (let n = 0; n < t - 1; n++) {
    const a = r[n].x + e[n] / 3, l = r[n].y + s[n] * e[n] / 3, c = r[n + 1].x - e[n] / 3, h = r[n + 1].y - s[n + 1] * e[n] / 3;
    o += ` C ${k(a)} ${k(l)}, ${k(c)} ${k(h)}, ${k(
      r[n + 1].x
    )} ${k(r[n + 1].y)}`;
  }
  return o;
}
function $i(r, t) {
  return t ? vr(r) : _i(r);
}
function _r(r, t, e) {
  if (!r.length) return "";
  const i = $i(r, e), s = r[0], o = r[r.length - 1];
  return `${i} L ${k(o.x)} ${k(t)} L ${k(s.x)} ${k(t)} Z`;
}
function $r(r, t, e = {}) {
  const i = Math.max(1, Math.round(t));
  if (i < 3 || r.length < 3) return r.map((a) => ({ ...a }));
  const s = Math.floor(i / 2), o = e.maxDeltaMs ?? 1 / 0, n = Math.min(
    2,
    Math.max(1, r.reduce((a, l) => Math.max(a, Sr(l.v)), 0))
  );
  return r.map((a, l) => {
    if (a.v === null) return { ...a };
    let c = 0, h = 0;
    for (let u = -s; u <= s; u++) {
      const p = r[l + u];
      !p || p.v === null || u !== 0 && Math.abs(p.t - a.t) > o || (c += p.v, h += 1);
    }
    return h ? { t: a.t, v: kr(c / h, n) } : { ...a };
  });
}
const xr = [
  "none",
  "light",
  "medium",
  "strong"
], ne = "light", Ze = {
  none: [1, 1],
  light: [3, 5],
  medium: [5, 9],
  strong: [9, 15]
};
function Sr(r) {
  if (r === null || !Number.isFinite(r)) return 0;
  const t = String(r), e = t.indexOf(".");
  return e === -1 ? 0 : Math.min(2, t.length - e - 1);
}
function kr(r, t) {
  const e = 10 ** t;
  return Math.round(r * e) / e;
}
function Ar(r, t = ne) {
  if (r < 5) return 1;
  const [e, i] = Ze[t] ?? Ze[ne];
  return r < 60 ? e : i;
}
function Cr(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let s = 0; s < e; s++)
    i.push(r + (t - r) * s / (e - 1));
  return i;
}
function Mr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function Er(r, t) {
  const e = r.length;
  if (e <= t || t < 3) return r.map((n, a) => a);
  const i = Math.max(1, Math.floor((t - 2) / 2)), s = /* @__PURE__ */ new Set([0, e - 1]), o = e / i;
  for (let n = 0; n < i; n++) {
    const a = Math.floor(n * o), l = Math.min(e - 1, Math.floor((n + 1) * o) - 1);
    let c = -1, h = -1, u = 1 / 0, p = -1 / 0;
    for (let y = a; y <= l; y++) {
      const $ = r[y].v;
      $ === null || !Number.isFinite($) || ($ < u && (u = $, c = y), $ > p && (p = $, h = y));
    }
    if (c === -1) {
      s.add(a);
      continue;
    }
    s.add(c), s.add(h);
  }
  return [...s].sort((n, a) => n - a);
}
function Ht(r, t) {
  const e = r.length;
  if (!e || !Number.isFinite(t)) return null;
  let i = 0, s = e - 1, o = e;
  for (; i <= s; ) {
    const h = i + s >> 1;
    r[h].t >= t ? (o = h, s = h - 1) : i = h + 1;
  }
  let n = o - 1, a = o, l = null, c = null;
  for (; n >= 0; ) {
    if (r[n].v !== null) {
      l = r[n];
      break;
    }
    n--;
  }
  for (; a < e; ) {
    if (r[a].v !== null) {
      c = r[a];
      break;
    }
    a++;
  }
  return l ? c ? Math.abs(l.t - t) <= Math.abs(c.t - t) ? l : c : l : c;
}
function qe(r) {
  let t = null, e = null;
  for (const i of r) {
    const s = i.v;
    s === null || !Number.isFinite(s) || ((!t || t.v > s) && (t = i), (!e || e.v < s) && (e = i));
  }
  return t && e ? { min: t, max: e } : null;
}
const Tr = ["on", "open", "opening", "tilted", "gekippt"], Hr = ["off", "closed", "closing"], lt = {
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
}, Xe = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, Je = { min: 14, max: 96 }, Rr = /^[a-z0-9_]+\.[a-z0-9_]+$/, Dr = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Lr(r) {
  return typeof r == "object" && r !== null;
}
function K(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return Rr.test(t) ? t : void 0;
}
function ut(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function q(r, t, e, i) {
  const s = typeof r == "number" ? r : Number(r);
  return Number.isFinite(s) ? Math.min(e, Math.max(t, s)) : i;
}
function S(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function gt(r, t) {
  const e = ut(r);
  return e && e.length <= 64 ? e : t;
}
function Qe(r) {
  const t = ut(r);
  if (!(!t || t.length > 120) && Dr.test(t))
    return t;
}
function ti(r, t) {
  return Math.round(
    q(r, Je.min, Je.max, t)
  );
}
function Or(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
const zr = [
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
  "chart_humidity_gradient"
], ei = /* @__PURE__ */ new Set();
function Fr(r) {
  for (const t of Object.keys(r))
    zr.includes(t) || ei.has(t) || (ei.add(t), console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${t}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`
    ));
}
function Nr(r) {
  const t = Lr(r) ? r : {};
  Fr(t);
  const e = K(t.temperature_entity), i = K(t.humidity_entity), s = K(t.window_entity), o = K(t.motion_entity), n = K(t.climate_entity), a = K(t.name_entity), l = Or(t.window_open_states), c = S(t.show_window) ?? !!s, h = S(t.show_motion) ?? !!o, u = S(t.show_thermostat) ?? !!n, p = S(t.show_temperature_chart) ?? !!e, y = S(t.show_humidity_chart) ?? !!i, $ = t.height, z = $ === "auto" || $ === void 0 || $ === null || $ === 0 ? null : q($, 120, 2e3, 0) || null, C = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", A = t.chart_curve === "linear" ? "linear" : "smooth", R = xr.includes(t.chart_smoothing) ? t.chart_smoothing : ne, g = t.chart_gap_mode === "break" ? "break" : "connect", D = t.chart_gap_style === "dashed" ? "dashed" : "solid", F = t.chart_humidity_line_style === "dotted" ? "dotted" : "solid", L = gt(
    t.accent_color ?? t.temperature_comfort_color,
    lt.accent
  );
  return {
    raw: t,
    name: ut(t.name),
    nameEntity: a,
    icon: ut(t.icon) ?? "mdi:home-thermometer-outline",
    height: z,
    borderRadius: q(t.border_radius, 0, 40, 26),
    theme: C,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(q(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(q(t.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: ti(
          t.temperature_font_size,
          Xe.temperature
        ),
        fontFamily: Qe(t.temperature_font_family)
      },
      humidity: {
        fontSize: ti(t.humidity_font_size, Xe.humidity),
        fontFamily: Qe(t.humidity_font_family)
      }
    },
    showSeriesLabels: S(t.show_series_labels) ?? !0,
    accentColor: L,
    humidity: {
      color: gt(t.humidity_color, lt.humidity)
    },
    window: {
      enabled: c && !!s,
      entity: s,
      openStates: l.length ? l : [...Tr]
    },
    motion: {
      enabled: h && !!o,
      entity: o,
      showLastChanged: S(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: u && !!n,
      entity: n,
      showRow: S(t.show_climate_row) ?? !0,
      showSetpoint: S(t.show_setpoint) ?? !0,
      showStatus: S(t.show_hvac_status) ?? !0,
      showMode: S(t.show_hvac_mode) ?? !1,
      heatingColor: gt(t.heating_color, lt.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: gt(t.heating_idle_color, L),
      offColor: gt(t.heating_off_color, lt.off)
    },
    chart: {
      showTemperature: p && !!e,
      showHumidity: y && !!i,
      hours: Math.round(q(t.chart_hours, 1, 168, 6)),
      height: Math.round(q(t.chart_height, 30, 400, 112)),
      curve: A,
      smoothing: R,
      gapMode: g,
      maxGapMinutes: Math.round(q(t.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: D,
      humidityLineStyle: F,
      showPoints: S(t.chart_show_points) ?? !1,
      showTooltip: S(t.chart_show_tooltip) ?? !0,
      showExtremes: S(t.chart_show_extremes) ?? !0,
      showTemperatureGradient: S(t.chart_temperature_gradient) ?? !0,
      showHumidityGradient: S(t.chart_humidity_gradient) ?? !0,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: S(t.chart_show_grid) ?? !1
    },
    tapAction: t.tap_action === "none" ? "none" : "more-info"
  };
}
function Ir(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function xi(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function oe(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function Qt(r) {
  if (r.height) return r.height;
  const t = r.typography.temperature.fontSize, e = xi(r) ? r.chart.height : 0, i = oe(r) ? 20 : 0, s = 28, o = r.showSeriesLabels ? 20 : 0;
  return 20 + s + 12 + o + t + 8 + i + 12 + e + 20;
}
function ii(r, t) {
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
const Ur = {
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
}, Pr = {
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
}, Br = Ur;
function ae(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Vr(r) {
  const t = ae(r) === "de" ? Br : Pr;
  return {
    language: ae(r),
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
function wt(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const ri = /* @__PURE__ */ new Map();
function Gr(r, t) {
  const e = `${r}|${t}`;
  let i = ri.get(e);
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
    ri.set(e, i);
  }
  return i;
}
function J(r, t, e) {
  return Number.isFinite(r) ? Gr(t || "en", wt(Math.round(e), 0, 3)).format(r) : "–";
}
function Nt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function Kr(r, t, e) {
  const i = Math.max(0, t - r), s = Math.floor(i / 6e4);
  if (s < 1) return e.justNow;
  if (s < 60) return `${s} ${e.minutes}`;
  const o = Math.floor(s / 60);
  return o < 24 ? `${o} ${e.hours}` : `${Math.floor(o / 24)} ${e.days}`;
}
function si(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function ni(r) {
  const t = r?.trim().toLowerCase();
  return t ? t.includes("°f") || t === "f" || t.startsWith("fahrenheit") ? "F" : t.includes("°c") || t === "c" || t.startsWith("celsius") ? "C" : null : null;
}
function Wr(r, t, e) {
  if (!Number.isFinite(r)) return null;
  const i = ni(t), s = ni(e);
  return !i || !s ? null : i === s ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function le(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function jr(r) {
  return `#${r.map((t) => wt(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Rt(r, t) {
  const e = le(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${wt(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${wt(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(wt(t, 0, 1) * 100)}%, transparent)`;
}
function It(r) {
  return r === "unavailable" || r === "unknown";
}
function oi(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const s = r?.states[t];
  if (!s) return { value: null, status: "missing", unit: i };
  const o = s.attributes?.unit_of_measurement ?? i;
  if (It(s.state))
    return { entity: s, value: null, status: "unavailable", unit: o };
  const n = Nt(s.state);
  return n === null ? { entity: s, value: null, status: "invalid", unit: o } : { entity: s, value: n, status: "ok", unit: o };
}
function Yr(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state;
  if (It(s)) return { status: "unavailable", entity: i, rawState: s };
  const o = s.trim().toLowerCase();
  return t.window.openStates.includes(o) ? { status: "open", entity: i, rawState: s } : Hr.includes(o) ? { status: "closed", entity: i, rawState: s } : { status: "unknown", entity: i, rawState: s };
}
const Zr = ["on", "detected", "motion", "occupied", "active"];
function qr(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const s = i.state, o = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (It(s)) return { status: "unavailable", entity: i, rawState: s };
  const n = s.trim().toLowerCase();
  if (Zr.includes(n))
    return { status: "active", entity: i, rawState: s };
  const a = { status: "idle", entity: i, rawState: s };
  return Number.isFinite(o) && (a.sinceMs = o), a;
}
const Xr = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function ai(r, t, e) {
  const i = t.thermostat.entity, s = si(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), o = r?.states[i ?? ""]?.attributes?.unit_of_measurement, n = si(typeof o == "string" ? o : s);
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const a = r?.states[i];
  if (!a)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const l = a.state?.toLowerCase(), c = a.attributes?.hvac_action, h = typeof c == "string" ? c.toLowerCase() : void 0, u = a.attributes?.temperature, p = typeof u == "number" ? u : typeof u == "string" ? Nt(u) : null, y = {
    entity: a,
    action: h,
    setpoint: p,
    unit: n,
    mode: l,
    modeLabel: l ? e.mode(l) : void 0
  };
  return It(a.state ?? "") ? { ...y, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...y, status: "off", label: e.t("off"), colorKey: "off" } : h === "heating" ? { ...y, status: "heating", label: e.t("heating"), colorKey: "heating" } : h === "idle" ? { ...y, status: "idle", label: e.t("idle"), colorKey: "idle" } : h === "off" ? { ...y, status: "off", label: e.t("off"), colorKey: "off" } : h && !Xr.includes(h) ? { ...y, status: "action", label: e.action(h), colorKey: "idle" } : h ? { ...y, status: "action", label: e.action(h), colorKey: "idle" } : { ...y, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Jr(r, t) {
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
function vt(r) {
  return typeof r == "object" && r !== null;
}
function Qr(r) {
  if (!vt(r)) return;
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
function ts(r) {
  if (vt(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function li(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const s = Qr(i);
    if (s === void 0 || !Number.isFinite(s)) continue;
    const o = ts(i), n = Nt(o);
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
function hi(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const s = i[0], o = vt(s) && typeof s.entity_id == "string" ? s.entity_id : void 0;
      if (!o || !(o in e)) continue;
      const n = li(i);
      e[o] = es(e[o], n);
    }
    return e;
  }
  if (vt(r))
    for (const i of t) {
      const s = r[i];
      if (s === void 0) continue;
      const o = Array.isArray(s) ? s : vt(s) && Array.isArray(s.data) ? s.data : s;
      e[i] = li(o);
    }
  return e;
}
function es(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((s, o) => s.t - o.t), i = [];
  for (const s of e) {
    const o = i[i.length - 1];
    o && o.t === s.t ? i[i.length - 1] = s : i.push(s);
  }
  return i;
}
async function is(r, t, e) {
  if (!t.length) return {};
  const i = new Date(e.start).toISOString(), s = new Date(e.end).toISOString(), o = r.connection;
  if (o && typeof o.sendMessagePromise == "function")
    try {
      const l = await o.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: s,
        entity_ids: t,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), c = hi(l, t);
      return Object.values(c).some((h) => h.length > 0), c;
    } catch (l) {
      if (!r.callApi) throw l;
    }
  if (typeof r.callApi != "function") return {};
  const n = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((l) => encodeURIComponent(l)).join(",")}&end_time=${encodeURIComponent(s)}&minimal_response&no_attributes`, a = await r.callApi("GET", n);
  return hi(a, t);
}
function rs(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class ss {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, s = Date.now()) {
    const o = rs(e, i), n = this.cache.get(o);
    if (n && s - n.fetchedAt < 12e4)
      return n.data;
    const a = this.inflight.get(o);
    if (a) return a;
    const l = is(t, e, {
      start: s - i * 60 * 60 * 1e3,
      end: s
    }).then((c) => {
      if (this.cache.set(o, { fetchedAt: Date.now(), data: c }), this.cache.size > 24) {
        const h = this.cache.keys().next();
        h.done || this.cache.delete(h.value);
      }
      return c;
    }).finally(() => {
      this.inflight.delete(o);
    });
    return this.inflight.set(o, l), l;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const ns = "room-climate-card:hidden-series:", Si = ["temperature", "humidity"];
function os(r, t) {
  return `${ns}${r ?? ""}|${t ?? ""}`;
}
function ki() {
  try {
    return typeof window > "u" || !window.localStorage ? null : window.localStorage;
  } catch {
    return null;
  }
}
function as(r) {
  const t = ki();
  if (!t) return [];
  try {
    const e = t.getItem(r);
    if (!e) return [];
    const i = JSON.parse(e);
    return Array.isArray(i) ? i.filter(
      (s) => typeof s == "string" && Si.includes(s)
    ) : [];
  } catch {
    return [];
  }
}
function ls(r, t) {
  const e = ki();
  if (e)
    try {
      t.length === 0 ? e.removeItem(r) : e.setItem(r, JSON.stringify(Si.filter((i) => t.includes(i))));
    } catch {
    }
}
const E = (r) => w`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, B = {
  thermometer: () => E(w`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => E(w`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => E(
    w`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => E(
    w`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => E(
    w`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => E(
    w`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => E(
    w`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => E(
    w`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => E(w`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => E(
    w`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => E(w`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => E(w`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => E(w`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => E(
    w`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const hs = (r) => r.strings === void 0;
const cs = { CHILD: 2 }, us = (r) => (...t) => ({ _$litDirective$: r, values: t });
class ds {
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
const _t = (r, t) => {
  const e = r._$AN;
  if (e === void 0) return !1;
  for (const i of e) i._$AO?.(t, !1), _t(i, t);
  return !0;
}, Ot = (r) => {
  let t, e;
  do {
    if ((t = r._$AM) === void 0) break;
    e = t._$AN, e.delete(r), r = t;
  } while (e?.size === 0);
}, Ai = (r) => {
  for (let t; t = r._$AM; r = t) {
    let e = t._$AN;
    if (e === void 0) t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(r)) break;
    e.add(r), fs(t);
  }
};
function ms(r) {
  this._$AN !== void 0 ? (Ot(this), this._$AM = r, Ai(this)) : this._$AM = r;
}
function ps(r, t = !1, e = 0) {
  const i = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(i)) for (let o = e; o < i.length; o++) _t(i[o], !1), Ot(i[o]);
  else i != null && (_t(i, !1), Ot(i));
  else _t(this, r);
}
const fs = (r) => {
  r.type == cs.CHILD && (r._$AP ??= ps, r._$AQ ??= ms);
};
class ys extends ds {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), Ai(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), e && (_t(this, t), Ot(this));
  }
  setValue(t) {
    if (hs(this._$Ct)) this._$Ct._$AI(t, this);
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
const V = () => new gs();
class gs {
}
const te = /* @__PURE__ */ new WeakMap(), G = us(class extends ys {
  render(r) {
    return m;
  }
  update(r, [t]) {
    const e = t !== this.G;
    return e && this.rt(void 0), (e || this.lt !== this.ct) && (this.G = t, this.ht = r.options?.host, this.rt(this.ct = r.element)), m;
  }
  rt(r) {
    if (this.G !== void 0) if (this.isConnected || (r = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let e = te.get(t);
      e === void 0 && (e = /* @__PURE__ */ new WeakMap(), te.set(t, e)), e.get(this.G) !== void 0 && this.G.call(this.ht, void 0), e.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? te.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function bs(r, t) {
  const { samples: e, bridged: i } = r;
  if (e.length <= t || t < 3) return r;
  const s = Er(e, t), o = s.map((a) => e[a]), n = [];
  for (let a = 1; a < s.length; a++)
    n.push(i.slice(s[a - 1] + 1, s[a] + 1).some(Boolean));
  return { samples: o, bridged: n };
}
const ws = 320, vs = 112, _s = 4e3, $s = 0.3, xs = 0.44, Ss = { minSpan: 0.4, padding: 0.15 }, ks = { minSpan: 3, padding: 0.15 };
let As = 0;
class Cs extends rt {
  constructor() {
    super(...arguments), this.accentColor = "#4FD1A5", this.humidityColor = "#8B86D6", this.setpoint = null, this.setpointUnit = "°C", this.hiddenSeries = [], this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showPoints = !1, this.showGrid = !1, this.curve = "smooth", this.smoothing = "light", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.showTemperatureArea = !0, this.showHumidityArea = !0, this.cornerRadius = 26, this.showTooltip = !0, this.showExtremes = !0, this.temperatureDecimals = 1, this.humidityDecimals = 1, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte",
      now: "Jetzt",
      setpoint: "Soll"
    }, this.uid = `rcc-chart-${++As}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = V(), this.crosshairRef = V(), this.temperatureDotRef = V(), this.humidityDotRef = V(), this.tooltipRef = V(), this.tooltipTimeRef = V(), this.tooltipTemperatureRef = V(), this.tooltipHumidityRef = V(), this.tooltipTemperatureRowRef = V(), this.tooltipHumidityRowRef = V(), this.onPointerDown = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerMove = (t) => {
      this.showTooltip && (this.lastPointerType = t.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(t));
    }, this.onPointerUp = (t) => {
      (t.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), _s));
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
    this.styles = ue`
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
    const i = Math.round(t), s = Math.round(e);
    i === this.width && s === this.height || (this.width = i, this.height = s, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(t, e) {
    this.applySize(t, e);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : ws,
      height: this.height > 20 ? this.height : vs
    };
  }
  stateView(t, e, i) {
    return f`<div class="wrap">
      <div class="state" role="status">
        ${t}
        <span class="state-title">${e}</span>
        ${i ? f`<span class="state-hint">${i}</span>` : m}
      </div>
    </div>`;
  }
  isVisible(t) {
    return !(this.hiddenSeries ?? []).includes(t);
  }
  get temperatureVisible() {
    return this.isVisible("temperature") && !!this.temperature?.some((t) => t.v !== null);
  }
  get humidityVisible() {
    return this.isVisible("humidity") && !!this.humidity?.some((t) => t.v !== null);
  }
  get hasData() {
    return !!(this.temperature?.some((t) => t.v !== null) || this.humidity?.some((t) => t.v !== null));
  }
  render() {
    const { width: t, height: e } = this.chartSize;
    if (t < 40 || e < 34) return m;
    const i = w`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, s = w`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(s, this.labels.loading) : this.stateView(s, this.labels.empty, this.labels.emptyHint);
    const { chart: o, geometry: n } = this.renderChart(t, e);
    return this.hoverGeometry = n, f`<div class="wrap">${o}${this.renderOverlay(n)}</div>`;
  }
  renderChart(t, e) {
    const i = e, s = i >= 62, o = s ? 20 : 2, n = 6, a = i - o, l = Math.max(6, a - n), c = 1, h = t - 1, u = Math.max(1, this.end - this.start), p = Tt([this.start, this.end], [c, h]), y = s ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, $ = Tt([this.start, this.end], [c + y, h - y]), z = i - 6, C = n, A = n + l * $s, R = n + l * xs, g = a, D = this.temperatureVisible ? this.temperature ?? [] : [], F = this.humidityVisible ? this.humidity ?? [] : [], L = D.map((d) => d.v).filter((d) => d !== null && Number.isFinite(d)), Ut = F.map((d) => d.v).filter((d) => d !== null && Number.isFinite(d)), W = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, Pt = W !== null ? [...L, W] : L, Bt = Ke(Pt), Vt = Ke(Ut), dt = Bt ? We(Bt[0], Bt[1], Ss) : null, mt = Vt ? We(Vt[0], Vt[1], ks) : null, T = dt ? Tt(dt, [g, R]) : null, N = mt ? Tt(mt, [A, C]) : null, Q = Ye(D, this.start, this.end), pt = Ye(F, this.start, this.end), fe = {
      rangeMs: u,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Gt = this.curve === "smooth", ye = (d) => {
      if (!Gt || d.length < 5) return d;
      const v = Ar(d.length, this.smoothing);
      if (v < 3) return d;
      const x = vi(d);
      return $r(d, v, {
        maxDeltaMs: Math.max(6e4, x * 3)
      });
    }, Mi = ye(Q), Ei = ye(pt), ge = dt ? je(Mi, fe) : [], be = mt ? je(Ei, fe) : [], Ti = Math.max(1, ge.length + be.length), Hi = Math.max(60, Math.floor(1200 / Ti)), we = (d) => d.map((v) => bs(v, Hi)), Kt = we(ge), Wt = we(be), ve = [];
    if (this.showGrid)
      for (let d = 1; d < 3; d++) {
        const v = n + l * d / 3;
        ve.push(w`<line class="grid-line" x1=${c} x2=${h} y1=${v} y2=${v} />`);
      }
    const _e = s ? Math.min(3, Mr(t)) : 0, $e = _e >= 2 ? Cr(this.start, this.end, Math.max(2, _e)) : [], Ri = $e.map((d, v) => {
      const x = v === $e.length - 1, _ = v === 0 ? "start" : x ? "end" : "middle";
      return w`<text class="axis-label" x=${$(d)} y=${z} text-anchor=${_}>
        ${this.formatAxisLabel(d, x)}
      </text>`;
    }), xe = (d, v) => wr(d, p, v), Di = (d, v) => (this.gapStyle === "dashed" ? br(d) : [d.samples]).filter((_) => _.length > 1).map((_) => $i(xe(_, v), Gt)).filter((_) => _.length > 0), Se = (d, v, x, _ = {}) => Di(d, v).map((nt) => {
      const I = [
        _.color ? `stroke:${_.color}` : `stroke:${x}`,
        _.width ? `stroke-width:${_.width}` : "",
        _.dashed ? "stroke-dasharray:0.1 5.5" : ""
      ].filter(Boolean).join(";");
      return w`<path class="series-line" d=${nt} style=${I}></path>`;
    }), Li = Kt.flatMap(
      (d) => Se(d, T, this.accentColor, { color: this.accentColor })
    ), ke = (d, v, x) => d.filter((_) => _.samples.length > 1).map((_) => _r(xe(_.samples, v), x, Gt)).join(" "), Ae = T && this.showTemperatureArea ? ke(Kt, T, a) : "", Oi = Ae ? [w`<path class="series-area" d=${Ae} style="fill:url(#${this.uid}-temp-fill)" />`] : [], Ce = N && this.showHumidityArea ? ke(Wt, N, A) : "", zi = Ce ? [
      w`<path class="series-area" d=${Ce} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], Me = this.humidityLineStyle === "dotted", Fi = Wt.flatMap(
      (d) => Se(d, N, this.humidityColor, {
        color: this.humidityColor,
        dashed: Me,
        width: Me ? 2.2 : 1.9
      })
    ), Ee = [];
    if (this.showPoints) {
      const d = (v, x, _) => {
        const H = v.filter((ot) => ot.v !== null);
        if (!H.length) return;
        const I = Math.max(1, Math.ceil(H.length / 24));
        H.forEach((ot, ft) => {
          if (ft % I !== 0 && ft !== H.length - 1) return;
          const U = ot.v;
          Ee.push(
            w`<circle class="point" r="1.7" cx=${p(ot.t)} cy=${x(U)} style="stroke:${_}" />`
          );
        });
      };
      T && Kt.forEach((v) => d(v.samples, T, this.accentColor)), N && Wt.forEach(
        (v) => d(v.samples, N, this.humidityColor)
      );
    }
    const O = W !== null && T ? T(W) : null, Ct = O !== null && Number.isFinite(O) && O >= R - 0.5 && O <= g + 0.5, Ni = Q.find((d) => d.v !== null)?.v ?? null, Ii = [...Q].reverse().find((d) => d.v !== null)?.v ?? null, Te = (d) => d === null || W === null ? 0 : Math.abs(d - W), jt = Te(Ii) >= Te(Ni), Yt = [...Q].reverse().find((d) => d.v !== null), Zt = [...pt].reverse().find((d) => d.v !== null), Ui = Ct && W !== null ? `${this.labels.setpoint} ${J(W, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", He = (d, v, x, _) => {
      const H = qe(v);
      if (!H || H.min.v === H.max.v) return "";
      const nt = J(H.min.v, this.language, _), I = J(H.max.v, this.language, _);
      return `${d} ${nt}–${I}${x ? ` ${x}` : ""}`;
    }, Pi = this.temperatureUnit || this.setpointUnit, Bi = [
      this.labels.aria,
      Ui,
      T ? He(this.labels.temperature, Q, Pi, this.temperatureDecimals) : "",
      N ? He(this.labels.humidity, pt, this.humidityUnit, this.humidityDecimals) : ""
    ].filter(Boolean).join(". "), qt = [], Re = (d, v, x, _, H, nt) => {
      if (!this.showExtremes || t < 200 || _ - x < 18) return;
      const I = qe(d);
      if (!I || I.min.v === I.max.v || d.filter((b) => b.v !== null).length < 3) return;
      const ot = [
        { sample: I.max, isMax: !0 },
        { sample: I.min, isMax: !1 }
      ].map(({ sample: b, isMax: j }) => {
        const Mt = p(b.t), M = v(b.v), P = M - 11 >= x, Et = M + 17 <= _, tt = P ? M - 9 : x + 8, Z = Et ? M + 15 : _ - 1;
        let Xt = j ? P ? tt : Z : Et ? Z : tt;
        if (Ct && O !== null && Math.abs(Xt - O) < 9) {
          const De = j ? Z : tt;
          Math.abs(De - O) >= 9 && (Xt = De);
        }
        return { sample: b, cx: Mt, cy: M, labelY: Xt, isMax: j };
      }).filter((b) => Number.isFinite(b.cx) && Number.isFinite(b.cy)).filter((b) => b.cy >= x - 1 && b.cy <= _ + 1), ft = (b, j) => Math.abs(b.labelY - j.labelY) < 9 && Math.abs(b.cx - j.cx) < 34;
      let U = [...ot];
      if (U.length === 2 && ft(U[0], U[1])) {
        for (const b of U)
          b.labelY = b.isMax ? x + 8 : _ - 1;
        ft(U[0], U[1]) && (U = U.filter((b) => b.isMax));
      }
      for (const b of U) {
        if (!b) continue;
        const j = 26, Mt = b.cx < (c + h) / 2;
        let M = Mt ? b.cx + 6 : b.cx - 6, P = Mt ? "start" : "end";
        P === "start" && M + j > h - 2 ? (M = b.cx - 6, P = "end") : P === "end" && M - j < c + 2 && (M = b.cx + 6, P = "start");
        const Et = jt ? h : c, tt = (Z) => Ct && O !== null && Math.abs(b.labelY - (O - 5)) < 9 && Math.abs(Z - Et) < 40;
        if (tt(M)) {
          const Z = P === "start" ? b.cx - 6 : b.cx + 6;
          tt(Z) || (M = Z, P = P === "start" ? "end" : "start");
        }
        qt.push(
          w`<circle
            class="extreme-dot"
            r="1.8"
            cx=${b.cx}
            cy=${b.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${H};stroke-width:1.2`}
          />`
        ), tt(M) || qt.push(
          w`<text class="extreme-label" x=${M} y=${b.labelY} text-anchor=${P}>${J(
            b.sample.v,
            this.language,
            nt
          )}</text>`
        );
      }
    };
    T && Re(
      Q,
      T,
      R,
      g,
      this.accentColor,
      this.temperatureDecimals
    ), N && Re(
      pt,
      N,
      C,
      A,
      this.humidityColor,
      this.humidityDecimals
    );
    const Vi = {
      width: t,
      height: i,
      left: c,
      right: h,
      plotTop: n,
      plotBottom: a,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: T && dt ? { samples: Q, domain: dt, top: R, bottom: g } : null,
      humidity: N && mt ? { samples: pt, domain: mt, top: C, bottom: A } : null
    };
    return { chart: w`<svg
      width=${t}
      height=${i}
      viewBox="0 0 ${t} ${i}"
      role="img"
      aria-label=${Bi}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${R} x2="0" y2=${g} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.accentColor} stop-opacity="0.22" />
          <stop offset="0.55" stop-color=${this.accentColor} stop-opacity="0.08" />
          <stop offset="1" stop-color=${this.accentColor} stop-opacity="0" />
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${C} x2="0" y2=${A} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.humidityColor} stop-opacity="0.2" />
          <stop offset="0.6" stop-color=${this.humidityColor} stop-opacity="0.07" />
          <stop offset="1" stop-color=${this.humidityColor} stop-opacity="0" />
        </linearGradient>
      </defs>
      ${ve}
      ${zi}
      ${Oi}
      ${Ct ? w`<line
            class="setpoint-line"
            x1=${c}
            x2=${h}
            y1=${O}
            y2=${O}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${jt ? h : c}
            y=${O - 5}
            text-anchor=${jt ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : m}
      <line class="baseline" x1=${c} x2=${h} y1=${a} y2=${a} />
      ${Fi} ${Li} ${Ee}
      ${Zt && N ? w`<circle
            class="end-dot"
            r="2.6"
            cx=${p(Zt.t)}
            cy=${N(Zt.v)}
            style="fill:${this.humidityColor}"
          />` : m}
      ${Yt && T ? w`<circle
            class="end-dot"
            r="2.8"
            cx=${p(Yt.t)}
            cy=${T(Yt.v)}
            style="fill:${this.accentColor}"
          />` : m}
      ${qt}
      ${Ri}
    </svg>`, geometry: Vi };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(t) {
    if (!this.showTooltip || !t.temperature && !t.humidity) return m;
    const e = Math.round(t.plotTop), i = Math.max(1, Math.round(t.plotBottom - t.plotTop));
    return f`<div
        class="overlay"
        style=${`top:${e}px;height:${i}px`}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @pointerleave=${this.onPointerLeave}
      ></div>
      <div class="hover" ${G(this.hoverRef)} hidden aria-hidden="true">
        <div
          class="crosshair"
          ${G(this.crosshairRef)}
          style=${`top:${e}px;height:${i}px`}
        ></div>
        <div
          class="hover-dot"
          ${G(this.temperatureDotRef)}
          style=${`background:${this.accentColor}`}
          hidden
        ></div>
        <div
          class="hover-dot"
          ${G(this.humidityDotRef)}
          style=${`background:${this.humidityColor}`}
          hidden
        ></div>
        <div class="tooltip" ${G(this.tooltipRef)}>
          <span class="tooltip-time" ${G(this.tooltipTimeRef)}></span>
          <span class="tooltip-row" ${G(this.tooltipTemperatureRowRef)}>
            <i style=${`background:${this.accentColor}`}></i>
            <span ${G(this.tooltipTemperatureRef)}></span>
          </span>
          <span class="tooltip-row" ${G(this.tooltipHumidityRowRef)}>
            <i style=${`background:${this.humidityColor}`}></i>
            <span ${G(this.tooltipHumidityRef)}></span>
          </span>
        </div>
      </div>`;
  }
  updateHoverAt(t) {
    const e = this.hoverGeometry;
    if (!e) return;
    const s = t.currentTarget?.getBoundingClientRect(), o = s && s.width > 0 ? s.width : e.width;
    if (!o) return;
    const n = s ? s.left : 0, a = Math.min(1, Math.max(0, (t.clientX - n) / o)), l = e.start + a * (e.end - e.start);
    this.showHoverAt(l);
  }
  xForTime(t, e) {
    const i = Math.max(1, e.end - e.start);
    return e.left + (t - e.start) / i * (e.right - e.left);
  }
  yForValue(t, e) {
    const [i, s] = t.domain, o = s - i || 1;
    return t.bottom - (e - i) / o * (t.bottom - t.top);
  }
  tooltipValue(t, e, i) {
    const s = J(t, this.language, i);
    return e ? `${s} ${e}` : s;
  }
  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  showHoverAt(t) {
    const e = this.hoverGeometry, i = this.hoverRef.value;
    if (!e || !i) return;
    const s = e.temperature ? Ht(e.temperature.samples, t) : null, o = e.humidity ? Ht(e.humidity.samples, t) : null;
    let n = s ?? o;
    if (s && o && (n = Math.abs(s.t - t) <= Math.abs(o.t - t) ? s : o), !n) {
      this.hideHover();
      return;
    }
    const a = n.t, l = this.crosshairRef.value, c = this.xForTime(a, e);
    l && (l.style.left = `${c}px`);
    const h = e.temperature ? Ht(e.temperature.samples, a) : null, u = e.humidity ? Ht(e.humidity.samples, a) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      e.temperature,
      h,
      c
    ), this.placeDot(this.humidityDotRef.value, e.humidity, u, c);
    const p = this.tooltipRef.value, y = this.tooltipTimeRef.value, $ = this.tooltipTemperatureRowRef.value, z = this.tooltipHumidityRowRef.value, C = this.tooltipTemperatureRef.value, A = this.tooltipHumidityRef.value, R = this.temperatureUnit || this.setpointUnit;
    if (y && (y.textContent = this.formatDayTime(a)), $ && ($.hidden = !h), z && (z.hidden = !u), C && h && (C.textContent = this.tooltipValue(
      h.v,
      R,
      this.temperatureDecimals
    )), A && u && (A.textContent = this.tooltipValue(
      u.v,
      this.humidityUnit,
      this.humidityDecimals
    )), p) {
      p.dataset.time = String(a);
      const g = p.offsetWidth || 84, D = p.offsetHeight || 38;
      let F = c + 10;
      F + g > e.width - 4 && (F = c - 10 - g), F = Math.max(4, Math.min(F, Math.max(4, e.width - g - 4)));
      const L = Math.max(2, Math.min(e.plotTop + 2, e.height - D - 2));
      p.style.left = `${F}px`, p.style.top = `${L}px`;
    }
    i.hidden = !1;
  }
  placeDot(t, e, i, s) {
    if (t) {
      if (!e || !i || i.v === null) {
        t.hidden = !0;
        return;
      }
      t.hidden = !1, t.style.left = `${s}px`, t.style.top = `${this.yForValue(e, i.v)}px`;
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
    const e = new Date(t), i = this.language || "en", s = this.timeZone ? { timeZone: this.timeZone } : {}, o = {
      hour: "2-digit",
      minute: "2-digit",
      ...typeof this.hour12 == "boolean" ? { hour12: this.hour12 } : {}
    };
    let n, a;
    try {
      n = new Intl.DateTimeFormat(i, { weekday: "short", ...s }).format(e).replace(/[.,]/g, "").trim(), a = new Intl.DateTimeFormat(i, { ...o, ...s }).format(e);
    } catch {
      n = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][e.getDay()], a = `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`;
    }
    return n ? `${n} ${a}` : a;
  }
}
const ci = "room-climate-chart";
typeof customElements < "u" && !customElements.get(ci) && customElements.define(ci, Cs);
const ee = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Ms = {
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
function Es(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const t = r.trim().replace(",", ".");
    if (!t || t === "-" || t === ".") return null;
    const e = Number(t);
    return Number.isFinite(e) ? e : null;
  }
  return null;
}
class Ci extends rt {
  constructor() {
    super(...arguments), this._config = { type: `custom:${Y}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = t && typeof t == "object" ? { ...t, type: t.type ?? `custom:${Y}` } : { type: `custom:${Y}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const t = ae(this.hass?.locale?.language ?? this.hass?.language);
    return Ms[t];
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
    e.type = this._config.type ?? `custom:${Y}`, this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(t) {
    return S(this._config[t]);
  }
  showFlag(t, e) {
    return this.rawBoolean(t) ?? !!K(this._config[e]);
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
    const i = this._config[t], s = typeof i == "number" ? i : Number(i);
    return Number.isFinite(s) ? s : e;
  }
  stringValue(t, e = "") {
    return ut(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = ut(this._config[t]) ?? e;
    return le(i) ?? le(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: jr(e) });
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
      ${t.helper ? f`<span class="helper">${t.helper}</span>` : m}
      ${t.warning ? f`<span class="helper warning">${t.warning}</span>` : m}
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
        const i = Es(e);
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
    const s = this.openSections.has(t);
    return f`<details class="section" ?open=${s} @toggle=${(o) => this.onToggle(t, o)}>
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
      fallback: 26
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
    return f`<div class="hint">${t.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: t.accentColor,
      fallback: lt.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: t.secondaryColor,
      fallback: lt.humidity
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = K(this._config.window_entity);
    return f`${this.renderSwitch({
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
      warning: e && !K(this._config.motion_entity) ? t.missingEntity : void 0
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
      warning: e && !K(this._config.climate_entity) ? t.missingEntity : void 0
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
      fallback: ee.heating,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: t.idleColor,
      fallback: ee.idle,
      disabled: !e
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: t.offColor,
      fallback: ee.off,
      disabled: !e
    })}`;
  }
  renderChart(t) {
    const e = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), s = e || i, o = [3, 6, 12, 24, 48].map((n) => ({ value: String(n), label: `${n} h` }));
    return f`${this.renderSwitch({
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
        const a = Number(n);
        this.patch({ chart_hours: Number.isFinite(a) ? a : 6 });
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
      disabled: !s || this.stringValue("chart_curve", "smooth") === "linear",
      helper: t.smoothingHelper,
      onChange: (n) => this.patch({ chart_smoothing: String(n) })
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
      onChange: (n) => this.patch({ chart_humidity_line_style: String(n) })
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
      ${this.renderNumber({
      key: "chart_max_gap_minutes",
      label: t.maxGap,
      min: 5,
      max: 720,
      step: 5,
      unit: "min",
      fallback: 120,
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
      value: this.rawBoolean("chart_show_grid") ?? !1,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: t.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_tooltip",
      label: t.tooltip,
      value: this.rawBoolean("chart_show_tooltip") ?? !0,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_extremes",
      label: t.extremes,
      value: this.rawBoolean("chart_show_extremes") ?? !0,
      disabled: !s
    })}
      <p class="helper">${t.comfortHelper}</p>`;
  }
  static {
    this.styles = ue`
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
typeof customElements < "u" && !customElements.get($t) && customElements.define($t, Ci);
const ie = "#fbbf24", re = "#34d399", ui = "var(--rcc-neutral)", Ts = 15 * 1e3, Hs = 300 * 1e3;
class Rs extends rt {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._hiddenSeries = [], this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new ss(), this.historyKey = "", this.hiddenSeriesKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.handleCardClick = (t) => {
      const e = this.tapTarget;
      !e || t.target?.closest("button, a, input, select, textarea, .chart-slot, room-climate-chart") || this.openMoreInfo(e);
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
    const e = Nr(t);
    this._config = e;
    const i = os(
      e.temperatureEntity,
      e.humidityEntity
    );
    i !== this.hiddenSeriesKey && (this.hiddenSeriesKey = i, this._hiddenSeries = as(i)), this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement($t);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), s = (u) => i.find(u)?.entity_id, o = s(
      (u) => u.entity_id.startsWith("sensor.") && u.attributes?.device_class === "temperature"
    ), n = s(
      (u) => u.entity_id.startsWith("sensor.") && u.attributes?.device_class === "humidity"
    ), a = s(
      (u) => u.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(u.attributes?.device_class))
    ), l = s(
      (u) => u.entity_id.startsWith("binary_sensor.") && u.attributes?.device_class === "motion"
    ), c = s((u) => u.entity_id.startsWith("climate.")), h = { type: `custom:${Y}` };
    return o && (h.temperature_entity = o), n && (h.humidity_entity = n), a && (h.window_entity = a), l && (h.motion_entity = l), c && (h.climate_entity = c), h;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(Qt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? Qt(this._config) : 230;
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
    return Vr(t);
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
    const i = this._config, s = this.hass;
    if (!i || !s || !t) return;
    const o = this.historyEntityIds(i);
    if (!o.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const n = Date.now(), a = n - i.chart.hours * 60 * 60 * 1e3;
    try {
      const l = await this.repository.load(s, o, i.chart.hours, n);
      if (this.historyKey !== t) return;
      this._history = l, this._historyWindow = { start: a, end: n }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, e && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== t) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Ts), Hs), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const s = this.hass?.states?.[e];
    if (!s) return t;
    const o = Date.parse(s.last_changed);
    if (!Number.isFinite(o)) return t;
    const n = t[t.length - 1], a = Math.min(o, i);
    if (a <= n.t) return t;
    const l = Nt(s.state);
    return n.v === l ? t : [...t, { t: a, v: l }];
  }
  updateDensity(t) {
    const e = t > 0 ? t : this._config ? this._config.height ?? Qt(this._config) : 0;
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
      const i = this._config ? Ir(this._config) : [];
      return i.length ? i.some((s) => e.states[s] !== this.hass?.states[s]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return f`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
    const i = t.theme === "auto" ? "theme-auto" : `theme-${t.theme}`, { temperature: s, humidity: o } = t.typography, n = [
      `--rcc-radius:${t.borderRadius}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`,
      `--rcc-temp-size:${s.fontSize}px`,
      `--rcc-hum-size:${o.fontSize}px`,
      `--rcc-accent:${t.accentColor}`,
      `--rcc-secondary:${t.humidity.color}`,
      s.fontFamily ? `--rcc-temp-font:${s.fontFamily}` : "",
      o.fontFamily ? `--rcc-hum-font:${o.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return f`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"} ${this.tapTarget ? "is-tappable" : ""}"
      style="${n}"
      role="group"
      aria-label="${this.cellAriaLabel(t, e)}"
      @click=${this.handleCardClick}
    >
      ${this.renderHeader(t, e)} ${this.renderReadings(t, e)}
      ${this.renderClimateRow(t, e)} ${this.renderChart(t, e)}
      ${this.hasAnyEntity(t) ? m : this.renderEmpty(e)}
    </div>`;
  }
  hasAnyEntity(t) {
    return !!(t.temperatureEntity || t.humidityEntity);
  }
  cellAriaLabel(t, e) {
    return `${ii(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return f`<div class="empty-state" role="status">
      ${B.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = ii(t, this.hass), s = qr(this.hass, t), o = Yr(this.hass, t), n = t.motion.enabled && t.motion.showLastChanged && s.status !== "active" && s.sinceMs !== void 0;
    return f`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${n ? f`<div class="subtle">
              ${e.t("quietSince")}
              ${Kr(s.sinceMs, this._now, {
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
    return this._haIconReady ? f`<ha-icon .icon=${t.icon}></ha-icon>` : B.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", s = i ? re : ui, o = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return f`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${s};--badge-bg:${Rt(
      i ? re : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Rt(i ? re : "#64748b", i ? 0.45 : 0.22)}"
      title="${o}"
      aria-label="${o}"
      role="img"
      >${B.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", s = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return f`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? ie : ui};--badge-bg:${Rt(
      i ? ie : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Rt(i ? ie : "#64748b", i ? 0.5 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? B.windowOpen() : B.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return m;
    const i = this.language(), s = oi(this.hass, t.temperatureEntity, "temperature"), o = oi(this.hass, t.humidityEntity, "humidity"), n = !!t.temperatureEntity, a = !!t.humidityEntity, l = t.showSeriesLabels;
    return f`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? f`<div class="reading-labels" aria-hidden="true">
        ${n ? f`<span
              class="series-label ${this._hiddenSeries.includes("temperature") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${t.accentColor}"></span
              >${e.t("temperature")}</span
            >` : m}
        ${a ? f`<span
              class="series-label ${this._hiddenSeries.includes("humidity") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${t.humidity.color}"></span
              >${e.t("humidity")}</span
            >` : m}
        </div>` : m}
      <div class="reading-values">
        ${n ? this.renderReading({
      key: "temperature",
      className: "temperature",
      value: s.value,
      unit: s.unit,
      decimals: t.temperatureDecimals,
      language: i,
      ariaLabel: `${e.t("temperature")}: ${this.sensorAria(
        s,
        i,
        t.temperatureDecimals,
        e
      )}`,
      color: t.accentColor,
      toggleable: t.chart.showTemperature,
      t: e
    }) : m}
        ${a ? this.renderReading({
      key: "humidity",
      className: "humidity",
      value: o.value,
      unit: o.unit,
      decimals: t.humidityDecimals,
      language: i,
      ariaLabel: `${e.t("humidity")}: ${this.sensorAria(
        o,
        i,
        t.humidityDecimals,
        e
      )}`,
      color: t.humidity.color,
      toggleable: t.chart.showHumidity,
      t: e
    }) : m}
      </div>
    </div>`;
  }
  /** One measured value; the accent dot of the caption row marks its series. */
  renderReading(t) {
    const e = this._hiddenSeries.includes(t.key), i = t.t, s = t.value !== null ? J(t.value, t.language, t.decimals) : "–", o = f`<span class="reading-value">${s}</span
      ><span class="reading-unit">${t.unit}</span>`;
    return t.toggleable ? f`<button
      type="button"
      class="reading ${t.className} ${e ? "is-hidden" : ""}"
      style="--series-color:${t.color}"
      aria-pressed=${!e}
      aria-label="${t.ariaLabel} – ${e ? i.t("seriesHidden") : i.t("seriesShown")}"
      title="${e ? i.t("showSeries") : i.t("hideSeries")}"
      @click=${() => this.toggleSeries(t.key)}
    >
      <span class="reading-number">${o}</span>
    </button>` : f`<span class="reading ${t.className}" style="--series-color:${t.color}">
        <span class="reading-number" role="text" aria-label="${t.ariaLabel}">${o}</span>
      </span>`;
  }
  toggleSeries(t) {
    this._hiddenSeries = this._hiddenSeries.includes(t) ? this._hiddenSeries.filter((e) => e !== t) : [...this._hiddenSeries, t], this.hiddenSeriesKey && ls(this.hiddenSeriesKey, this._hiddenSeries);
  }
  sensorAria(t, e, i, s) {
    return t.value === null ? s.t("unavailable") : `${J(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Entity a tap on the card opens. Only offered while the status row is
   * visible, because that row is the keyboard path to the same action – a
   * pointer-only target would be a trap.
   */
  get tapTarget() {
    const t = this._config;
    if (!(!t || t.tapAction === "none") && oe(t))
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
    if (!oe(t)) return m;
    const i = ai(this.hass, t, e), s = t.thermostat.showSetpoint && i.setpoint !== null, o = t.thermostat.showStatus, n = t.thermostat.showMode && !!i.modeLabel;
    if (!s && !o && !n) return m;
    const a = Jr(i, t), l = this.language(), c = i.setpoint !== null ? `${J(i.setpoint, l, t.temperatureDecimals)} ${i.unit}` : "", h = this.tapTarget, u = f`${o ? f`<span class="flame status-${i.status}" style="color:${a}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : m}
      <span class="climate-state" role=${h ? "status" : m}
        >${n ? i.modeLabel : i.label}</span
      >
      ${s ? f`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${e.t("setpoint")}</span> ${c}</span
            >` : m}`;
    return h ? f`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${e.t("openThermostat")}"
      title="${e.t("openThermostat")}"
      @click=${() => this.openMoreInfo(h)}
    >
      ${u}
    </button>` : f`<div
        class="climate-row"
        role="status"
        aria-label="${this.thermostatAria(i)}"
      >
        ${u}
      </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return B.snowflake();
        case "fan":
          return B.fan();
        case "drying":
          return B.water();
        default:
          return B.flame();
      }
    return B.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!xi(t)) return m;
    const i = Date.now(), s = i - t.chart.hours * 60 * 60 * 1e3, o = t.chart.showTemperature && t.temperatureEntity ? this.withLiveState(
      this._history[t.temperatureEntity],
      t.temperatureEntity,
      i
    ) : void 0, n = t.chart.showHumidity && t.humidityEntity ? this.withLiveState(this._history[t.humidityEntity], t.humidityEntity, i) : void 0, a = this.language(), l = this.chartClock(), c = t.humidityEntity ? this.hass?.states?.[t.humidityEntity]?.attributes?.unit_of_measurement : void 0, h = t.thermostat.enabled ? ai(this.hass, t, e) : void 0, u = (t.temperatureEntity ? this.hass?.states?.[t.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", p = h?.setpoint ?? null, $ = (p === null || !h ? null : Wr(p, h.unit, u)) ?? (h?.unit === u ? p : null), z = {
      empty: e.t("noHistory"),
      emptyHint: e.t("noHistoryHint"),
      loading: e.t("loadingHistory"),
      error: e.t("historyError"),
      aria: e.chartAria(t.chart.hours),
      temperature: e.t("temperature"),
      humidity: e.t("humidity"),
      now: e.t("now"),
      setpoint: e.t("setpoint")
    };
    return f`<div class="chart-slot">
      <room-climate-chart
        .temperature=${o}
        .humidity=${n}
        .accentColor=${t.accentColor}
        .humidityColor=${t.humidity.color}
        .setpoint=${$}
        .setpointUnit=${u}
        .hiddenSeries=${this._hiddenSeries}
        .start=${s}
        .end=${i}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .showTooltip=${t.chart.showTooltip}
        .showExtremes=${t.chart.showExtremes}
        .temperatureUnit=${u}
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
        .cornerRadius=${t.borderRadius}
        .language=${a}
        .timeZone=${l.timeZone}
        .hour12=${l.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${z}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = ue`
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
    .room-icon .icon {
      width: 14px;
      height: 14px;
    }
    .room-icon ha-icon {
      --mdc-icon-size: 14px;
      color: var(--rcc-tertiary);
      display: inline-flex;
    }
    .name {
      margin: 0;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.012em;
      color: var(--rcc-text);
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
  `%c ROOM-CLIMATE-CARD %c v${Wi} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(Y) || customElements.define(Y, Rs);
customElements.get($t) || customElements.define($t, Ci);
const di = window.customCards = window.customCards ?? [];
di.some((r) => r.type === Y) || di.push({
  type: Y,
  name: Gi,
  description: Ki,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  Y as CARD_TAG,
  Wi as CARD_VERSION,
  Rs as RoomClimateCard,
  Ci as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
