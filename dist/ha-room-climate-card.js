const ie = "room-climate-card", ze = "room-climate-card-editor", an = "Room Climate Card", on = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", ln = "2.19.0";
const Je = globalThis, zt = Je.ShadowRoot && (Je.ShadyCSS === void 0 || Je.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ot = /* @__PURE__ */ Symbol(), yi = /* @__PURE__ */ new WeakMap();
let cr = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (zt && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = yi.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && yi.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const hn = (r) => new cr(typeof r == "string" ? r : r + "", void 0, Ot), Ft = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new cr(t, r, Ot);
}, cn = (r, e) => {
  if (zt) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Je.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, bi = zt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return hn(t);
})(r) : r;
const { is: dn, defineProperty: un, getOwnPropertyDescriptor: mn, getOwnPropertyNames: pn, getOwnPropertySymbols: fn, getPrototypeOf: gn } = Object, st = globalThis, wi = st.trustedTypes, yn = wi ? wi.emptyScript : "", bn = st.reactiveElementPolyfillSupport, He = (r, e) => r, Tt = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? yn : null;
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
} }, dr = (r, e) => !dn(r, e), _i = { attribute: !0, type: String, converter: Tt, reflect: !1, useDefault: !1, hasChanged: dr };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), st.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let we = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _i) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && un(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = mn(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? _i;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const e = gn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const t = this.properties, i = [...pn(t), ...fn(t)];
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
      for (const n of i) t.unshift(bi(n));
    } else e !== void 0 && t.push(bi(e));
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
    return cn(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Tt).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Tt;
      this._$Em = n;
      const o = a.fromAttribute(t, s.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[e]), i ??= a.getPropertyOptions(e), !((i.hasChanged ?? dr)(s, t) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, i)))) return;
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
we.elementStyles = [], we.shadowRootOptions = { mode: "open" }, we[He("elementProperties")] = /* @__PURE__ */ new Map(), we[He("finalized")] = /* @__PURE__ */ new Map(), bn?.({ ReactiveElement: we }), (st.reactiveElementVersions ??= []).push("2.1.2");
const Nt = globalThis, vi = (r) => r, tt = Nt.trustedTypes, $i = tt ? tt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ur = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, mr = "?" + ae, wn = `<${mr}>`, ye = document, Oe = () => ye.createComment(""), Fe = (r) => r === null || typeof r != "object" && typeof r != "function", Lt = Array.isArray, _n = (r) => Lt(r) || typeof r?.[Symbol.iterator] == "function", ft = `[ 	
\f\r]`, Te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xi = /-->/g, Si = />/g, ue = RegExp(`>|${ft}(?:([^\\s"'>=/]+)(${ft}*=${ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ai = /'/g, ki = /"/g, pr = /^(?:script|style|textarea|title)$/i, fr = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), y = fr(1), _ = fr(2), ve = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), Mi = /* @__PURE__ */ new WeakMap(), pe = ye.createTreeWalker(ye, 129);
function gr(r, e) {
  if (!Lt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $i !== void 0 ? $i.createHTML(e) : e;
}
const vn = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Te;
  for (let o = 0; o < t; o++) {
    const h = r[o];
    let l, c, d = -1, m = 0;
    for (; m < h.length && (a.lastIndex = m, c = a.exec(h), c !== null); ) m = a.lastIndex, a === Te ? c[1] === "!--" ? a = xi : c[1] !== void 0 ? a = Si : c[2] !== void 0 ? (pr.test(c[2]) && (n = RegExp("</" + c[2], "g")), a = ue) : c[3] !== void 0 && (a = ue) : a === ue ? c[0] === ">" ? (a = n ?? Te, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, l = c[1], a = c[3] === void 0 ? ue : c[3] === '"' ? ki : Ai) : a === ki || a === Ai ? a = ue : a === xi || a === Si ? a = Te : (a = ue, n = void 0);
    const g = a === ue && r[o + 1].startsWith("/>") ? " " : "";
    s += a === Te ? h + wn : d >= 0 ? (i.push(l), h.slice(0, d) + ur + h.slice(d) + ae + g) : h + ae + (d === -2 ? o : g);
  }
  return [gr(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Ne {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, h = this.parts, [l, c] = vn(e, t);
    if (this.el = Ne.createElement(l, i), pe.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = pe.nextNode()) !== null && h.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ur)) {
          const m = c[a++], g = n.getAttribute(d).split(ae), p = /([.?@])?(.*)/.exec(m);
          h.push({ type: 1, index: s, name: p[2], strings: g, ctor: p[1] === "." ? xn : p[1] === "?" ? Sn : p[1] === "@" ? An : at }), n.removeAttribute(d);
        } else d.startsWith(ae) && (h.push({ type: 6, index: s }), n.removeAttribute(d));
        if (pr.test(n.tagName)) {
          const d = n.textContent.split(ae), m = d.length - 1;
          if (m > 0) {
            n.textContent = tt ? tt.emptyScript : "";
            for (let g = 0; g < m; g++) n.append(d[g], Oe()), pe.nextNode(), h.push({ type: 2, index: ++s });
            n.append(d[m], Oe());
          }
        }
      } else if (n.nodeType === 8) if (n.data === mr) h.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(ae, d + 1)) !== -1; ) h.push({ type: 7, index: s }), d += ae.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = ye.createElement("template");
    return i.innerHTML = e, i;
  }
}
function $e(r, e, t = r, i) {
  if (e === ve) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const s = Fe(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = $e(r, n._$AS(r, e.values), n, i)), e;
}
class $n {
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
    const { el: { content: t }, parts: i } = this._$AD, n = (e?.creationScope ?? ye).importNode(t, !0);
    pe.currentNode = n;
    let s = pe.nextNode(), a = 0, o = 0, h = i[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let l;
        h.type === 2 ? l = new Be(s, s.nextSibling, this, e) : h.type === 1 ? l = new h.ctor(s, h.name, h.strings, this, e) : h.type === 6 && (l = new kn(s, this, e)), this._$AV.push(l), h = i[++o];
      }
      a !== h?.index && (s = pe.nextNode(), a++);
    }
    return pe.currentNode = ye, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Be {
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
    e = $e(this, e, t), Fe(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== ve && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : _n(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && Fe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ye.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Ne.createElement(gr(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const s = new $n(n, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Mi.get(e.strings);
    return t === void 0 && Mi.set(e.strings, t = new Ne(e)), t;
  }
  k(e) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new Be(this.O(Oe()), this.O(Oe()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = vi(e).nextSibling;
      vi(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class at {
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
    if (s === void 0) e = $e(this, e, t, 0), a = !Fe(e) || e !== this._$AH && e !== ve, a && (this._$AH = e);
    else {
      const o = e;
      let h, l;
      for (e = s[0], h = 0; h < s.length - 1; h++) l = $e(this, o[i + h], t, h), l === ve && (l = this._$AH[h]), a ||= !Fe(l) || l !== this._$AH[h], l === f ? e = f : e !== f && (e += (l ?? "") + s[h + 1]), this._$AH[h] = l;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class xn extends at {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class Sn extends at {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class An extends at {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = $e(this, e, t, 0) ?? f) === ve) return;
    const i = this._$AH, n = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== f && (i === f || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class kn {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $e(this, e);
  }
}
const Mn = Nt.litHtmlPolyfillSupport;
Mn?.(Ne, Be), (Nt.litHtmlVersions ??= []).push("3.3.3");
const Tn = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = t?.renderBefore ?? null;
    i._$litPart$ = n = new Be(e.insertBefore(Oe(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
const Bt = globalThis;
let fe = class extends we {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Tn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ve;
  }
};
fe._$litElement$ = !0, fe.finalized = !0, Bt.litElementHydrateSupport?.({ LitElement: fe });
const Cn = Bt.litElementPolyfillSupport;
Cn?.({ LitElement: fe });
(Bt.litElementVersions ??= []).push("4.2.2");
const En = [
  "more-info",
  "navigate",
  "url",
  "perform-action",
  "toggle",
  "none"
];
function Ce(r) {
  return typeof r == "object" && r !== null && !Array.isArray(r);
}
function me(r) {
  return typeof r == "string" && r.trim().length ? r.trim() : void 0;
}
function gt(r, e) {
  if (r == null || r === "") return e;
  const t = Ce(r) ? r : { action: r };
  let i = me(t.action)?.toLowerCase();
  if (i === "call-service" && (i = "perform-action"), !i || !En.includes(i)) return e;
  const n = { action: i }, s = me(t.entity);
  switch (s && (n.entity = s), n.action) {
    case "navigate": {
      const a = me(t.navigation_path);
      if (!a) return e;
      n.navigation_path = a, t.navigation_replace === !0 && (n.navigation_replace = !0);
      break;
    }
    case "url": {
      const a = me(t.url_path);
      if (!a) return e;
      n.url_path = a;
      break;
    }
    case "perform-action": {
      const a = me(t.perform_action) ?? me(t.service);
      if (!a || !/^[a-z0-9_]+\.[a-z0-9_]+$/.test(a)) return e;
      n.perform_action = a;
      const o = Ce(t.data) ? t.data : Ce(t.service_data) ? t.service_data : void 0;
      o && (n.data = { ...o }), Ce(t.target) && (n.target = { ...t.target });
      break;
    }
  }
  if (t.confirmation === !0) n.confirmation = !0;
  else if (Ce(t.confirmation)) {
    const a = me(t.confirmation.text);
    n.confirmation = a ? { text: a } : !0;
  }
  return n;
}
function Hn(r) {
  return {
    tap: gt(r.tap_action, { action: "more-info" }) ?? { action: "more-info" },
    hold: gt(r.hold_action, null),
    doubleTap: gt(r.double_tap_action, null)
  };
}
function Ct(r, e) {
  return r.entity ?? e;
}
function Et(r, e) {
  return !r || r.action === "none" ? !1 : r.action === "more-info" || r.action === "toggle" ? !!Ct(r, e) : !0;
}
function Dn(r, e, t, i, n) {
  if (!Et(t, i) || !t) return !1;
  if (t.confirmation) {
    const a = typeof t.confirmation == "object" && t.confirmation.text ? t.confirmation.text : n.confirmText;
    if (!(n.confirm ?? ((h) => window.confirm(h)))(a)) return !1;
  }
  const s = (a, o) => {
    r.dispatchEvent(new CustomEvent(a, { detail: o, bubbles: !0, composed: !0 }));
  };
  switch (t.action) {
    case "more-info":
      return s("hass-more-info", { entityId: Ct(t, i) }), !0;
    case "navigate": {
      const a = t.navigation_path;
      return t.navigation_replace ? window.history.replaceState(null, "", a) : window.history.pushState(null, "", a), window.dispatchEvent(
        new CustomEvent("location-changed", { detail: { replace: !!t.navigation_replace } })
      ), !0;
    }
    case "url":
      return window.open(t.url_path, "_blank", "noopener"), !0;
    case "toggle":
      return e ? (Promise.resolve(
        e.callService("homeassistant", "toggle", { entity_id: Ct(t, i) })
      ).catch(() => {
      }), !0) : !1;
    case "perform-action": {
      if (!e) return !1;
      const [a, o] = t.perform_action.split(".", 2);
      return Promise.resolve(
        e.callService(a, o, t.data ?? {}, t.target)
      ).catch(() => {
      }), !0;
    }
    default:
      return !1;
  }
}
const A = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function Ze(r, e) {
  const [t, i] = r, [n, s] = e, a = i - t;
  if (!Number.isFinite(a) || a === 0) {
    const o = (n + s) / 2;
    return () => o;
  }
  return (o) => n + (o - t) / a * (s - n);
}
function Ti(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function Ci(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = t;
  let s = r, a = e;
  if (a - s < i) {
    const h = (a + s) / 2;
    s = h - i / 2, a = h + i / 2;
  }
  const o = (a - s) * n;
  return [s - o, a + o];
}
function yr(r) {
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
function Rn(r, e, t = {}) {
  const i = yr(r), n = i > 0 ? i * 2.5 : 0, s = t.minMs ?? Math.max(e / 40, 300 * 1e3), a = t.maxMs ?? Math.max(s, e / 3);
  return Math.min(a, Math.max(n, s));
}
const zn = 1e3, On = 8;
function Fn(r, e, t, i) {
  const n = t.t - e.t, s = e.v, a = t.v, o = Math.min(
    On,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let h = 1; h < o; h++) {
    const l = h / o;
    r.samples.push({
      t: Math.round(e.t + n * l),
      v: s + (a - s) * l
    }), r.bridged.push(!0);
  }
}
function Ei(r, e) {
  const { rangeMs: t, start: i, end: n } = e, s = e.gapMode ?? "connect", a = Rn(r, t), o = e.maxGapMs ?? t / 4, h = [];
  let l = null, c = null, d = null, m = !1, g = !1;
  const p = () => {
    l && l.samples.length && h.push(l), l = null, c = null, d = null;
  }, $ = (S) => {
    if (!l || !c || S === null || S <= c.t) return;
    const R = { t: S, v: c.v };
    l.samples.push(R), l.bridged.push(!1), c = R;
  };
  for (const S of r) {
    if (S.v === null || !Number.isFinite(S.v)) {
      c || (m = !0), d = d ?? S.t, g = !0;
      continue;
    }
    if (g = !1, !c || !l) {
      l = { samples: [S], bridged: [] }, c = S, d = null;
      continue;
    }
    const R = S.t - c.t;
    if (R <= a && d === null) {
      l.samples.push(S), l.bridged.push(!1), c = S;
      continue;
    }
    if (!(d !== null)) {
      const Ie = Math.min(zn, R / 2);
      l.samples.push({ t: S.t - Ie, v: c.v }), l.bridged.push(!1), l.samples.push(S), l.bridged.push(!1), c = S;
      continue;
    }
    const W = Math.max(c.t, d), z = S.t - W;
    if (s === "connect" && z <= o) {
      W > c.t && (l.samples.push({ t: W, v: c.v }), l.bridged.push(!1), c = { t: W, v: c.v }), Fn(l, c, S, a), l.samples.push(S), l.bridged.push(!0), c = S, d = null;
      continue;
    }
    $(d), p(), l = { samples: [S], bridged: [] }, c = S;
  }
  if (g && $(d), p(), !h.length) return h;
  const C = h[0];
  if (!m && i !== void 0 && C.samples[0].t > i && (C.samples.unshift({ t: i, v: C.samples[0].v }), C.bridged.unshift(!1)), g)
    return h;
  const T = h[h.length - 1], L = T.samples[T.samples.length - 1];
  return n !== void 0 && L.t < n && (T.samples.push({ t: n, v: L.v }), T.bridged.push(!1)), h;
}
function Hi(r, e, t) {
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
    const h = n[n.length - 1];
    if (h && h.t === a.t) {
      n[n.length - 1] = { t: a.t, v: o };
      continue;
    }
    n.push({ t: a.t, v: o });
  }
  return s && e !== void 0 && (!n.length || n[0].t > e) && n.unshift(s), n;
}
function Nn(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function Ln(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function br(r) {
  if (!r.length) return "";
  let e = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${A(r[t].x)} ${A(r[t].y)}`;
  return e;
}
const Di = 1, Bn = 1;
function In(r, e, t, i, n) {
  if (!(n > 0) || r === e && t === 0 && i === 0) return 0;
  const s = Math.min(r, e), a = Math.max(r, e);
  let o = 0;
  const h = 16;
  for (let l = 1; l < h; l++) {
    const c = l / h, d = 1 - c, m = r + t * n / 3, g = e - i * n / 3, p = d * d * d * r + 3 * d * d * c * m + 3 * d * c * c * g + c * c * c * e;
    o = Math.max(o, s - p, p - a);
  }
  return o;
}
function wr(r) {
  const e = r.length, t = [], i = [];
  for (let o = 0; o < e - 1; o++)
    t[o] = r[o + 1].x - r[o].x, i[o] = t[o] === 0 ? 0 : (r[o + 1].y - r[o].y) / t[o];
  const n = new Array(e).fill(0);
  n[0] = i[0], n[e - 1] = i[e - 2];
  for (let o = 1; o < e - 1; o++) {
    const h = i[o - 1], l = i[o];
    n[o] = h * l <= 0 ? (h + l) / 2 * Bn : (h + l) / 2;
  }
  const s = n.slice();
  for (let o = 1; o < e - 1; o++)
    n[o] = 0.25 * s[o - 1] + 0.5 * s[o] + 0.25 * s[o + 1];
  const a = new Array(e).fill(1);
  for (let o = 0; o < 3; o++) {
    const h = new Array(e).fill(1);
    let l = !1;
    for (let c = 0; c < e - 1; c++) {
      if (t[c] === 0) continue;
      const d = In(
        r[c].y,
        r[c + 1].y,
        n[c] * a[c],
        n[c + 1] * a[c + 1],
        t[c]
      );
      if (d > Di) {
        const m = Di / d;
        h[c] = Math.min(h[c], m), h[c + 1] = Math.min(h[c + 1], m), l = !0;
      }
    }
    if (!l) break;
    for (let c = 0; c < e; c++) a[c] *= h[c];
  }
  for (let o = 0; o < e; o++) n[o] *= a[o];
  return { dx: t, tangents: n };
}
function Pn(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${A(r[0].x)} ${A(r[0].y)}`;
  if (r.length === 2) return br(r);
  const e = r.length, { dx: t, tangents: i } = wr(r);
  let n = `M ${A(r[0].x)} ${A(r[0].y)}`;
  for (let s = 0; s < e - 1; s++) {
    const a = r[s].x + t[s] / 3, o = r[s].y + i[s] * t[s] / 3, h = r[s + 1].x - t[s] / 3, l = r[s + 1].y - i[s + 1] * t[s] / 3;
    n += ` C ${A(a)} ${A(o)}, ${A(h)} ${A(l)}, ${A(
      r[s + 1].x
    )} ${A(r[s + 1].y)}`;
  }
  return n;
}
function _r(r, e) {
  return e ? Pn(r) : br(r);
}
function Un(r, e) {
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
  const { dx: i, tangents: n } = wr(r);
  for (let s = 0; s < r.length - 1; s++) {
    const a = r[s], o = r[s + 1], h = a.x + i[s] / 3, l = a.y + n[s] * i[s] / 3, c = o.x - i[s] / 3, d = o.y - n[s + 1] * i[s] / 3;
    t.push({
      from: a,
      to: o,
      command: `C ${A(h)} ${A(l)}, ${A(c)} ${A(d)}, ${A(
        o.x
      )} ${A(o.y)}`
    });
  }
  return t;
}
function Wn(r, e, t) {
  if (!r.length) return "";
  const i = _r(r, t), n = r[0], s = r[r.length - 1];
  return `${i} L ${A(s.x)} ${A(e)} L ${A(n.x)} ${A(e)} Z`;
}
function Vn(r, e, t = {}) {
  const i = Math.max(1, Math.round(e));
  if (i < 3 || r.length < 3) return r.map((o) => ({ ...o }));
  const n = Math.floor(i / 2), s = t.maxDeltaMs ?? 1 / 0, a = 2;
  return r.map((o, h) => {
    if (o.v === null) return { ...o };
    let l = 0, c = 0;
    for (let d = -n; d <= n; d++) {
      const m = r[h + d];
      !m || m.v === null || d !== 0 && Math.abs(m.t - o.t) > s || (l += m.v, c += 1);
    }
    return c ? { t: o.t, v: jn(l / c, a) } : { ...o };
  });
}
const Gn = [
  "none",
  "light",
  "medium",
  "strong"
], Ht = "light", Ri = {
  none: 0,
  light: 10,
  medium: 30,
  strong: 60
}, Kn = 121;
function jn(r, e) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function Zn(r, e = Ht) {
  const t = Ri[e] ?? Ri[Ht];
  if (!(t > 0) || !Number.isFinite(r) || r <= 0) return 1;
  const i = Math.max(1, Math.round(t * 6e4 / r));
  return Math.min(Kn, i * 2 + 1);
}
function Yn(r, e) {
  if (!Number.isFinite(e) || e <= 0) return 1 / 0;
  const t = Math.floor(Math.max(1, r) / 2) * e * 2;
  return Math.min(90 * 6e4, Math.max(2 * 6e4, t));
}
function Xn(r, e) {
  const t = r.length;
  if (t <= e || e < 3) return r.map((a, o) => o);
  const i = Math.max(1, Math.floor((e - 2) / 2)), n = /* @__PURE__ */ new Set([0, t - 1]), s = t / i;
  for (let a = 0; a < i; a++) {
    const o = Math.floor(a * s), h = Math.min(t - 1, Math.floor((a + 1) * s) - 1);
    let l = -1, c = -1, d = 1 / 0, m = -1 / 0;
    for (let g = o; g <= h; g++) {
      const p = r[g].v;
      p === null || !Number.isFinite(p) || (p < d && (d = p, l = g), p > m && (m = p, c = g));
    }
    if (l === -1) {
      n.add(o);
      continue;
    }
    n.add(l), n.add(c);
  }
  return [...n].sort((a, o) => a - o);
}
function Ye(r, e) {
  const t = r.length;
  if (!t || !Number.isFinite(e)) return null;
  let i = 0, n = t - 1, s = t;
  for (; i <= n; ) {
    const c = i + n >> 1;
    r[c].t >= e ? (s = c, n = c - 1) : i = c + 1;
  }
  let a = s - 1, o = s, h = null, l = null;
  for (; a >= 0; ) {
    if (r[a].v !== null) {
      h = r[a];
      break;
    }
    a--;
  }
  for (; o < t; ) {
    if (r[o].v !== null) {
      l = r[o];
      break;
    }
    o++;
  }
  return h ? l ? Math.abs(h.t - e) <= Math.abs(l.t - e) ? h : l : h : l;
}
function zi(r) {
  let e = null, t = null;
  for (const i of r) {
    const n = i.v;
    n === null || !Number.isFinite(n) || ((!e || e.v > n) && (e = i), (!t || t.v < n) && (t = i));
  }
  return e && t ? { min: e, max: t } : null;
}
const vr = 60 * 1e3, ee = 60 * vr, qn = [
  30 * vr,
  ee,
  2 * ee,
  3 * ee,
  4 * ee,
  6 * ee,
  12 * ee,
  24 * ee,
  // Week views: every second or third midnight.
  48 * ee,
  72 * ee
];
function Jn(r, e, t) {
  if (!(e > r) || t.maxTicks < 1) return [];
  const i = t.offsetAt ?? (() => 0), n = e - Math.max(0, t.endClearanceMs);
  for (const s of qn) {
    if (s < t.minSpacingMs) continue;
    const a = [], o = i(r);
    let h = Math.ceil((r + o) / s) * s;
    for (let l = 0; l < 400; l += 1) {
      const c = h - i(h - o);
      if (c > n) break;
      c >= r && a.push(c), h += s;
    }
    if (a.length >= 1 && a.length <= t.maxTicks) return a;
  }
  return [r];
}
function Qn(r, e) {
  if (!r.length || e < r[0].x || e > r[r.length - 1].x) return null;
  for (let t = 1; t < r.length; t += 1) {
    const i = r[t - 1], n = r[t];
    if (e <= n.x)
      return n.x === i.x ? Math.min(i.y, n.y) : i.y + (e - i.x) / (n.x - i.x) * (n.y - i.y);
  }
  return r[r.length - 1].y;
}
const Oi = 3, $r = 4;
function es(r) {
  const e = r.preferredSide === "right" ? "left" : "right", t = [
    { side: r.preferredSide, above: !0 },
    { side: e, above: !0 },
    { side: r.preferredSide, above: !1 },
    { side: e, above: !1 }
  ];
  let i = null;
  for (const n of t) {
    const s = n.above ? r.lineY - Oi - r.height : r.lineY + Oi, a = s + r.height;
    if (s < r.top - 1 || a > r.bottom + 1) continue;
    const o = n.side === "left" ? r.left : r.right - r.width, h = o + r.width, l = ts(o, h, s, a, r), c = { ...n, clearance: l };
    if (l >= $r) return c;
    (!i || l > i.clearance) && (i = c);
  }
  return i ?? { side: r.preferredSide, above: !0, clearance: 0 };
}
function ts(r, e, t, i, n) {
  let s = Number.POSITIVE_INFINITY;
  const a = (o) => o < t ? t - o : o > i ? o - i : 0;
  for (const o of n.curves)
    for (let h = r; h <= e + 1e-3; h += 2) {
      const l = Qn(o, Math.min(h, e));
      l !== null && (s = Math.min(s, a(l)));
    }
  for (const o of n.dots ?? [])
    (o.x < r ? r - o.x : o.x > e ? o.x - e : 0) > o.r + $r || (s = Math.min(s, Math.max(0, a(o.y) - o.r)));
  return s;
}
const yt = "#7FA6D9", bt = "#EFB35F", wt = "#D16A62", Qe = {
  coldBelow: 18,
  warmAbove: 24,
  hotAbove: 27
}, it = 1, xr = 100;
function _t(r, e) {
  return typeof r == "number" && Number.isFinite(r) ? r : e;
}
function is(r, e, t, i = Qe) {
  const n = [
    _t(r, i.coldBelow),
    _t(e, i.warmAbove),
    _t(t, i.hotAbove)
  ].sort((h, l) => h - l), s = n[0], a = Math.max(n[1], s + it), o = Math.max(n[2], a + it);
  return { coldBelow: s, warmAbove: a, hotAbove: o };
}
function Fi(r, e, t) {
  return Number.isFinite(r) ? r < e.coldBelow ? t.cold : r < e.warmAbove ? t.normal : r < e.hotAbove ? t.warm : t.hot : t.normal;
}
function rs(r, e, t, i = xr) {
  const [n, s] = r, a = s - n;
  if (!(a > 0) || !Number.isFinite(a)) return [{ offset: 0, color: t.normal }];
  const o = Math.min(1, Math.max(0, (Number.isFinite(i) ? i : 100) / 100)), h = Math.max(e.warmAbove - e.coldBelow, it), l = Math.max(e.hotAbove - e.warmAbove, it), c = o * h / 2, d = o * l / 2, m = ($) => $ < e.coldBelow ? t.cold : $ < e.warmAbove ? t.normal : $ < e.hotAbove ? t.warm : t.hot, g = [
    { value: e.coldBelow, color: t.cold },
    { value: e.coldBelow + c, color: t.normal },
    { value: e.warmAbove - c, color: t.normal },
    { value: e.warmAbove + d, color: t.warm },
    { value: e.hotAbove - d, color: t.warm },
    { value: e.hotAbove, color: t.hot }
  ].filter(($) => $.value > n && $.value < s).concat([
    { value: n, color: m(n) },
    { value: s, color: m(s) }
  ]).sort(($, C) => $.value - C.value), p = [];
  for (const $ of g) {
    const C = Number(((s - $.value) / a).toFixed(4)), T = p[p.length - 1];
    T && Math.abs(T.offset - C) < 5e-4 && T.color === $.color || p.push({ offset: C, color: $.color });
  }
  return p.reverse(), p.length === 1 && p.push({ offset: 1, color: p[0].color }), p[0].offset = 0, p[p.length - 1].offset = 1, p;
}
const Ni = 32;
function Li(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  const t = e[1], i = t.length === 3 ? t.split("").map((n) => n + n).join("") : t;
  return [
    parseInt(i.slice(0, 2), 16),
    parseInt(i.slice(2, 4), 16),
    parseInt(i.slice(4, 6), 16)
  ];
}
function ns(r) {
  return `#${r.map((e) => Math.max(0, Math.min(255, Math.round(e))).toString(16).padStart(2, "0")).join("")}`;
}
function Sr(r, e) {
  if (!r.length) return "#ffffff";
  const t = Math.min(1, Math.max(0, Number.isFinite(e) ? e : 0));
  let i = r[0], n = r[r.length - 1];
  for (let l = 0; l < r.length; l++)
    if (r[l].offset <= t && (i = r[l]), r[l].offset >= t) {
      n = r[l];
      break;
    }
  const s = Li(i.color), a = Li(n.color);
  if (!s || !a) return i.color;
  const o = n.offset - i.offset, h = o <= 0 ? 0 : (t - i.offset) / o;
  return ns([
    s[0] + (a[0] - s[0]) * h,
    s[1] + (a[1] - s[1]) * h,
    s[2] + (a[2] - s[2]) * h
  ]);
}
function ss(r, e, t, i) {
  const n = Un([...r], e), s = [];
  let a = null;
  const o = (l, c, d) => {
    const m = c.x - l.x, g = c.y - l.y, p = Math.hypot(m, g);
    return p > 0 ? vt({ x: l.x + m / p * d, y: l.y + g / p * d }) : vt(l);
  }, h = (l) => {
    const c = l.pieces[0], d = l.pieces[l.pieces.length - 1], m = o(c.from, c.to, -0.8), g = o(d.to, d.from, -0.8), p = l.pieces.map(($) => $.command).join(" ");
    s.push({
      d: `M ${m} L ${vt(c.from)} ${p} L ${g}`,
      color: Sr(t, l.level / Ni)
    });
  };
  for (const l of n) {
    const c = (l.from.y + l.to.y) / 2, d = Math.round(Math.min(1, Math.max(0, i(c))) * Ni);
    if (a && a.level === d) {
      a.pieces.push(l);
      continue;
    }
    a && h(a), a = { pieces: [l], level: d };
  }
  return a && h(a), s;
}
function vt(r) {
  const e = (t) => Number.isFinite(t) ? (Math.round(t * 100) / 100).toString() : "0";
  return `${e(r.x)} ${e(r.y)}`;
}
const Bi = { dryBelow: 40, humidAbove: 60 };
function as(r, e) {
  return r < e.dryBelow ? "dry" : r > e.humidAbove ? "humid" : "comfortable";
}
function os(r, e) {
  const t = Math.min(r, e), i = Math.max(r, e);
  return { dryBelow: t, humidAbove: i === t ? Math.min(100, t + 1) : i };
}
function ls(r, e) {
  if (!Number.isFinite(r) || !Number.isFinite(e) || e <= 0 || e > 100) return null;
  const t = 17.62, i = 243.12, n = Math.log(e / 100) + t * r / (i + r);
  return i * n / (t - n);
}
const It = 12, hs = 10, Ii = { min: 0, max: 32 }, cs = ["on", "open", "opening", "tilted", "gekippt"], ds = ["off", "closed", "closing"], _e = {
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
}, Pi = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, Ui = { min: 14, max: 96 }, Pt = 15, rt = { min: 11, max: 32 }, us = /^[a-z0-9_]+\.[a-z0-9_]+$/, ms = /^[-a-zA-Z0-9#(),.%\s/]+$/, ps = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function fs(r) {
  return typeof r == "object" && r !== null;
}
function q(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return us.test(e) ? e : void 0;
}
function xe(r) {
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
function Ee(r, e) {
  const t = xe(r);
  return !t || t.length > 64 || !ms.test(t) ? e : t;
}
function gs(r) {
  return r.thermostat.enabled && r.thermostat.entity ? r.thermostat.entity : r.temperatureEntity ?? r.humidityEntity;
}
function Wi(r) {
  const e = xe(r);
  if (!(!e || e.length > 120) && ps.test(e))
    return e;
}
function Vi(r, e) {
  return Math.round(
    H(r, Ui.min, Ui.max, e)
  );
}
function ys(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
const bs = [
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
], Gi = /* @__PURE__ */ new Set(), ws = {
  name_entity: "Der Raumname kommt nur noch aus `name` (Editor: Allgemein → Raumname); ohne Eintrag gilt der Name des Temperatursensors."
};
function _s(r) {
  for (const e of Object.keys(r)) {
    if (bs.includes(e) || Gi.has(e)) continue;
    Gi.add(e);
    const t = ws[e], i = t ? `"${e}" wird nicht mehr unterstützt. ${t}` : `Unbekannter Konfigurationsschlüssel "${e}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`;
    console.warn(`[room-climate-card] ${i}`);
  }
}
function vs(r) {
  const e = fs(r) ? r : {};
  _s(e);
  const t = q(e.temperature_entity), i = q(e.humidity_entity), n = q(e.window_entity), s = q(e.motion_entity), a = q(e.climate_entity), o = ys(e.window_open_states), h = M(e.show_window) ?? !!n, l = M(e.show_motion) ?? !!s, c = M(e.show_thermostat) ?? !!a, d = M(e.show_temperature_chart) ?? !!t, m = M(e.show_humidity_chart) ?? !!i, g = e.height, p = g === "auto" || g === void 0 || g === null || g === 0 ? null : H(g, 120, 2e3, 0) || null, $ = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", C = e.chart_curve === "linear" ? "linear" : "smooth", T = Gn.includes(e.chart_smoothing) ? e.chart_smoothing : Ht, L = e.chart_gap_mode === "break" ? "break" : "connect", S = e.chart_gap_style === "dashed" ? "dashed" : "solid", R = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid", B = Ee(
    e.accent_color ?? e.temperature_comfort_color,
    _e.accent
  );
  return {
    raw: e,
    name: xe(e.name),
    nameFontSize: Ut(e.name_font_size),
    icon: xe(e.icon) ?? "mdi:home-thermometer-outline",
    height: p,
    borderRadius: e.border_radius === void 0 || e.border_radius === null || e.border_radius === "" ? null : H(e.border_radius, 0, 40, It),
    padding: Math.round(
      H(
        e.card_padding,
        Ii.min,
        Ii.max,
        hs
      )
    ),
    theme: $,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(H(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(H(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: Vi(
          e.temperature_font_size,
          Pi.temperature
        ),
        fontFamily: Wi(e.temperature_font_family)
      },
      humidity: {
        fontSize: Vi(e.humidity_font_size, Pi.humidity),
        fontFamily: Wi(e.humidity_font_family)
      }
    },
    showSeriesLabels: M(e.show_series_labels) ?? !0,
    accentColor: B,
    humidity: {
      color: Ee(e.humidity_color, _e.humidity),
      comfort: (M(e.humidity_comfort) ?? !1) && i ? os(
        H(e.humidity_dry_below, 0, 100, Bi.dryBelow),
        H(e.humidity_humid_above, 0, 100, Bi.humidAbove)
      ) : null,
      showDewPoint: (M(e.show_dew_point) ?? !1) && !!(t && i)
    },
    window: {
      enabled: h && !!n,
      entity: n,
      openStates: o.length ? o : [...cs],
      warnWhileHeating: M(e.show_window_warning) ?? !0
    },
    motion: {
      enabled: l && !!s,
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
      heatingColor: Ee(e.heating_color, _e.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: Ee(e.heating_idle_color, B),
      offColor: Ee(e.heating_off_color, _e.off)
    },
    chart: {
      showTemperature: d && !!t,
      showHumidity: m && !!i,
      hours: Math.round(H(e.chart_hours, 1, 168, 6)),
      height: Math.round(H(e.chart_height, 30, 400, 112)),
      curve: C,
      smoothing: T,
      gapMode: L,
      maxGapMinutes: Math.round(H(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: S,
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
      bandLimits: is(
        H(e.chart_band_cold_below, -30, 60, Qe.coldBelow),
        H(e.chart_band_warm_above, -30, 60, Qe.warmAbove),
        H(e.chart_band_hot_above, -30, 60, Qe.hotAbove)
      ),
      bandTransition: Math.round(
        H(e.chart_band_transition, 0, 100, xr)
      ) / 100,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: M(e.chart_show_grid) ?? !1
    },
    actions: Hn(e)
  };
}
function $s(r) {
  return r.chart.fullBleed ? -r.padding : 0;
}
function xs(r) {
  const e = !r.chart.showAxis;
  return r.chart.fullBleed && e ? -r.padding : 0;
}
function Ss(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function Ar(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function kr(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function Mr(r) {
  const e = Ut(r);
  return Math.round(e * 4 / 3);
}
function As(r) {
  const e = Ut(r);
  return Math.min(36, Math.round(e * 16 / Pt));
}
function Ut(r) {
  return Math.round(
    H(r, rt.min, rt.max, Pt)
  );
}
function $t(r) {
  if (r.height) return r.height;
  const e = r.typography.temperature.fontSize, t = Ar(r) ? r.chart.height : 0, i = kr(r) ? 20 : 0, n = Math.max(28, Mr(r.nameFontSize) + 8), s = r.showSeriesLabels ? 20 : 0, a = Tr(r) ? 20 : 0;
  return r.padding * 2 + n + 12 + s + e + a + 8 + i + 12 + t;
}
function Tr(r) {
  return r.humidity.comfort !== null || r.humidity.showDewPoint;
}
function Ki(r, e) {
  if (r.name) return r.name;
  for (const t of [r.temperatureEntity, r.humidityEntity]) {
    if (!t) continue;
    const i = e?.states[t]?.attributes?.friendly_name;
    if (typeof i == "string" && i.trim().length) return i;
  }
  return "Raumklima";
}
const ks = {
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
}, Ms = {
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
}, Ts = ks;
function Dt(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Cs(r) {
  const e = Dt(r) === "de" ? Ts : Ms;
  return {
    language: Dt(r),
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
function De(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
const ji = /* @__PURE__ */ new Map();
function Es(r, e) {
  const t = `${r}|${e}`;
  let i = ji.get(t);
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
    ji.set(t, i);
  }
  return i;
}
function te(r, e, t) {
  return Number.isFinite(r) ? Es(e || "en", De(Math.round(t), 0, 3)).format(r) : "–";
}
function ot(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function Hs(r, e, t) {
  const i = Math.max(0, e - r), n = Math.floor(i / 6e4);
  if (n < 1) return t.justNow;
  if (n < 60) return `${n} ${t.minutes}`;
  const s = Math.floor(n / 60);
  return s < 24 ? `${s} ${t.hours}` : `${Math.floor(s / 24)} ${t.days}`;
}
function Zi(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Le(r) {
  const e = r?.trim().toLowerCase();
  return e ? e.includes("°f") || e === "f" || e.startsWith("fahrenheit") ? "F" : e.includes("°c") || e === "c" || e.startsWith("celsius") ? "C" : null : null;
}
function Yi(r, e, t) {
  if (!Number.isFinite(r)) return null;
  const i = Le(e), n = Le(t);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function Rt(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function Ds(r) {
  return `#${r.map((e) => De(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function Xe(r, e) {
  const t = Rt(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${De(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${De(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(De(e, 0, 1) * 100)}%, transparent)`;
}
function lt(r) {
  return r === "unavailable" || r === "unknown";
}
function Xi(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const n = r?.states[e];
  if (!n) return { value: null, status: "missing", unit: i };
  const s = n.attributes?.unit_of_measurement ?? i;
  if (lt(n.state))
    return { entity: n, value: null, status: "unavailable", unit: s };
  const a = ot(n.state);
  return a === null ? { entity: n, value: null, status: "invalid", unit: s } : { entity: n, value: a, status: "ok", unit: s };
}
function qi(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (lt(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  return e.window.openStates.includes(s) ? { status: "open", entity: i, rawState: n } : ds.includes(s) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Rs = ["on", "detected", "motion", "occupied", "active"];
function zs(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state, s = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (lt(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  if (Rs.includes(a))
    return { status: "active", entity: i, rawState: n };
  const o = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(s) && (o.sinceMs = s), o;
}
const Os = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function xt(r, e, t) {
  const i = e.thermostat.entity, n = r?.config?.unit_system?.temperature, s = Zi(
    typeof n == "string" && Le(n) ? n : void 0
  ), a = r?.states[i ?? ""]?.attributes?.unit_of_measurement, o = Zi(typeof a == "string" ? a : s);
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: o };
  const h = r?.states[i];
  if (!h)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: o };
  const l = h.state?.toLowerCase(), c = h.attributes?.hvac_action, d = typeof c == "string" ? c.toLowerCase() : void 0, m = h.attributes?.temperature, g = typeof m == "number" ? m : typeof m == "string" ? ot(m) : null, p = {
    entity: h,
    action: d,
    setpoint: g,
    unit: o,
    mode: l,
    modeLabel: l ? t.mode(l) : void 0
  };
  return lt(h.state ?? "") ? { ...p, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...p, status: "off", label: t.t("off"), colorKey: "off" } : d === "heating" ? { ...p, status: "heating", label: t.t("heating"), colorKey: "heating" } : d === "idle" ? { ...p, status: "idle", label: t.t("idle"), colorKey: "idle" } : d === "off" ? { ...p, status: "off", label: t.t("off"), colorKey: "off" } : d && !Os.includes(d) ? { ...p, status: "action", label: t.action(d), colorKey: "idle" } : d ? { ...p, status: "action", label: t.action(d), colorKey: "idle" } : {
    ...p,
    status: "unknown",
    label: p.modeLabel ?? t.t("statusUnknown"),
    colorKey: "unknown"
  };
}
function Fs(r, e) {
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
function ge(r) {
  return typeof r == "object" && r !== null;
}
function Ns(r) {
  if (!ge(r)) return;
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
function Ls(r) {
  if (ge(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Ji(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const n = Ns(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const s = Ls(i), a = ot(s);
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
function Qi(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], s = ge(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!s || !(s in t)) continue;
      const a = Ji(i);
      t[s] = Bs(t[s], a);
    }
    return t;
  }
  if (ge(r))
    for (const i of e) {
      const n = r[i];
      if (n === void 0) continue;
      const s = Array.isArray(n) ? n : ge(n) && Array.isArray(n.data) ? n.data : n;
      t[i] = Ji(s);
    }
  return t;
}
function Bs(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((n, s) => n.t - s.t), i = [];
  for (const n of t) {
    const s = i[i.length - 1];
    s && s.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function et(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), n = new Date(t.end).toISOString(), s = r.connection;
  if (s && typeof s.sendMessagePromise == "function")
    try {
      const h = await s.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), l = Qi(h, e);
      return Object.values(l).some((c) => c.length > 0), l;
    } catch (h) {
      if (!r.callApi) throw h;
    }
  if (typeof r.callApi != "function") return {};
  const a = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((h) => encodeURIComponent(h)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, o = await r.callApi("GET", a);
  return Qi(o, e);
}
function Is(r, e, t = "history") {
  const i = `${[...r].sort().join("|")}@${e}`;
  return t === "statistics" ? `${i}#stats` : i;
}
const Ps = 48;
function Us(r) {
  return r > Ps ? "statistics" : "history";
}
function er(r) {
  if (typeof r == "number" && Number.isFinite(r)) return r > 1e12 ? r : r * 1e3;
  if (typeof r == "string") {
    const e = Date.parse(r);
    return Number.isFinite(e) ? e : void 0;
  }
}
function Ws(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (!ge(r)) return t;
  for (const i of e) {
    const n = r[i];
    if (!Array.isArray(n)) continue;
    const s = [];
    for (const a of n) {
      if (!ge(a)) continue;
      const o = er(a.start);
      if (o === void 0) continue;
      const h = er(a.end) ?? o + 300 * 1e3, l = typeof a.mean == "number" && Number.isFinite(a.mean) ? a.mean : null;
      s.push({ t: Math.round((o + h) / 2), v: l });
    }
    s.sort((a, o) => a.t - o.t), t[i] = s;
  }
  return t;
}
async function Vs(r, e, t) {
  if (!e.length) return {};
  const i = r.connection;
  if (!i || typeof i.sendMessagePromise != "function")
    return et(r, e, t);
  let n;
  try {
    const a = await i.sendMessagePromise({
      type: "recorder/statistics_during_period",
      start_time: new Date(t.start).toISOString(),
      end_time: new Date(t.end).toISOString(),
      statistic_ids: e,
      period: "5minute",
      types: ["mean"]
    });
    n = Ws(a, e);
  } catch {
    return et(r, e, t);
  }
  const s = e.filter((a) => !n[a]?.some((o) => o.v !== null));
  if (s.length) {
    const a = await et(r, s, t);
    for (const o of s) n[o] = a[o] ?? [];
  }
  return n;
}
class Cr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, n = Date.now(), s = {}) {
    const a = s.source ?? "history", o = Is(t, i, a), h = Math.max(0, s.maxAgeMs ?? 12e4), l = this.cache.get(o);
    if (l && h > 0 && n - l.fetchedAt < h)
      return l.data;
    const c = this.inflight.get(o);
    if (c) return c;
    const d = { start: n - i * 60 * 60 * 1e3, end: n }, m = (a === "statistics" ? Vs(e, t, d) : et(e, t, d)).then((g) => {
      if (this.cache.set(o, { fetchedAt: Date.now(), data: g }), this.cache.size > 24) {
        const p = this.cache.keys().next();
        p.done || this.cache.delete(p.value);
      }
      return g;
    }).finally(() => {
      this.inflight.delete(o);
    });
    return this.inflight.set(o, m), m;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const tr = /* @__PURE__ */ new WeakMap();
function Gs(r) {
  const e = r.connection;
  if (!e || typeof e != "object") return;
  let t = tr.get(e);
  return t || (t = new Cr(), tr.set(e, t)), t;
}
const U = (r) => _`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, G = {
  thermometer: () => U(_`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => U(_`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => U(
    _`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => U(
    _`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => U(
    _`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  /**
   * Standing figure: "nobody is moving" must not depend on colour alone, so
   * the idle badge gets its own shape next to the running figure above.
   */
  motionOff: () => U(
    _`<circle cx="12" cy="4.4" r="1.9" /><path d="M12 8.2v6.3M12 14.5 9.8 21M12 14.5l2.2 6.5M8.4 10.6h7.2" />`
  ),
  flame: () => U(
    _`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => U(
    _`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => U(_`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => U(
    _`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => U(_`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => U(_`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => U(_`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => U(
    _`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
const Ks = (r) => r.strings === void 0;
const js = { CHILD: 2 }, Zs = (r) => (...e) => ({ _$litDirective$: r, values: e });
class Ys {
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
const Re = (r, e) => {
  const t = r._$AN;
  if (t === void 0) return !1;
  for (const i of t) i._$AO?.(e, !1), Re(i, e);
  return !0;
}, nt = (r) => {
  let e, t;
  do {
    if ((e = r._$AM) === void 0) break;
    t = e._$AN, t.delete(r), r = e;
  } while (t?.size === 0);
}, Er = (r) => {
  for (let e; e = r._$AM; r = e) {
    let t = e._$AN;
    if (t === void 0) e._$AN = t = /* @__PURE__ */ new Set();
    else if (t.has(r)) break;
    t.add(r), Js(e);
  }
};
function Xs(r) {
  this._$AN !== void 0 ? (nt(this), this._$AM = r, Er(this)) : this._$AM = r;
}
function qs(r, e = !1, t = 0) {
  const i = this._$AH, n = this._$AN;
  if (n !== void 0 && n.size !== 0) if (e) if (Array.isArray(i)) for (let s = t; s < i.length; s++) Re(i[s], !1), nt(i[s]);
  else i != null && (Re(i, !1), nt(i));
  else Re(this, r);
}
const Js = (r) => {
  r.type == js.CHILD && (r._$AP ??= qs, r._$AQ ??= Xs);
};
class Qs extends Ys {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, t, i) {
    super._$AT(e, t, i), Er(this), this.isConnected = e._$AU;
  }
  _$AO(e, t = !0) {
    e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (Re(this, e), nt(this));
  }
  setValue(e) {
    if (Ks(this._$Ct)) this._$Ct._$AI(e, this);
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
const Y = () => new ea();
class ea {
}
const St = /* @__PURE__ */ new WeakMap(), X = Zs(class extends Qs {
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
      let t = St.get(e);
      t === void 0 && (t = /* @__PURE__ */ new WeakMap(), St.set(e, t)), t.get(this.G) !== void 0 && this.G.call(this.ht, void 0), t.set(this.G, r), r !== void 0 && this.G.call(this.ht, r);
    } else this.G.value = r;
  }
  get lt() {
    return typeof this.G == "function" ? St.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
function ta(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const n = Xn(t, e), s = n.map((o) => t[o]), a = [];
  for (let o = 1; o < n.length; o++)
    a.push(i.slice(n[o - 1] + 1, n[o] + 1).some(Boolean));
  return { samples: s, bridged: a };
}
const ia = 320, ra = 112, na = 4e3, sa = 150, aa = 14, oa = 2.8, qe = 6, ir = 24 * 3600 * 1e3, la = 70, ha = 72, ca = 26, da = 6.6, rr = 9, nr = 3, sr = /* @__PURE__ */ new Set();
function ua(r, e) {
  const t = `${r}|${e}`;
  sr.has(t) || (sr.add(t), console.info(
    `[room-climate-card] Minimum/Maximum der ${e} ausgeblendet: ${r}. Die Zahlen brauchen Platz im Chart – eine höhere Chart-Höhe oder eine breitere Karte schafft ihn.`
  ));
}
const ma = 0.3, pa = 0.44, fa = { minSpan: 0.4, padding: 0.15 }, ga = { minSpan: 3, padding: 0.15 };
let ya = 0;
class ba extends fe {
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
    }, this.uid = `rcc-chart-${++ya}`, this.width = 0, this.height = 0, this.lastPointerType = "mouse", this.hoverRef = Y(), this.crosshairRef = Y(), this.temperatureDotRef = Y(), this.humidityDotRef = Y(), this.tooltipRef = Y(), this.tooltipTimeRef = Y(), this.tooltipTemperatureRef = Y(), this.tooltipHumidityRef = Y(), this.tooltipTemperatureRowRef = Y(), this.tooltipHumidityRowRef = Y(), this.liveRef = Y(), this.onFocus = () => {
      if (this.hoverTime !== void 0) return;
      const e = this.keyboardTimes();
      e.length && this.showHoverAt(e[e.length - 1], !0);
    }, this.onBlur = () => {
      this.hideHover();
    }, this.onKeyDown = (e) => {
      if (!this.showTooltip) return;
      const t = this.keyboardTimes();
      if (!t.length) return;
      const i = this.hoverTime ?? t[t.length - 1];
      let n = t.findIndex((o) => o >= i);
      n < 0 && (n = t.length - 1);
      const s = t[n] === i;
      let a;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          a = t[Math.max(0, n - 1)];
          break;
        case "ArrowRight":
        case "ArrowUp":
          a = t[Math.min(t.length - 1, s ? n + 1 : n)];
          break;
        case "PageDown":
          a = t[Math.max(0, n - 10)];
          break;
        case "PageUp":
          a = t[Math.min(t.length - 1, n + 10)];
          break;
        case "Home":
          a = t[0];
          break;
        case "End":
          a = t[t.length - 1];
          break;
        case "Escape":
          this.hideHover(), e.preventDefault();
          return;
        default:
          return;
      }
      e.preventDefault(), this.lastPointerType = "keyboard", this.clearHoverTimer(), a !== void 0 && this.showHoverAt(a, !0);
    }, this.onPointerDown = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerMove = (e) => {
      this.showTooltip && (this.lastPointerType = e.pointerType || "mouse", this.clearHoverTimer(), this.updateHoverAt(e));
    }, this.onPointerUp = (e) => {
      (e.pointerType || this.lastPointerType) !== "mouse" && (this.clearHoverTimer(), this.hoverHideTimer = setTimeout(() => this.hideHover(), na));
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
    this.styles = Ft`
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
      width: this.width > 20 ? this.width : ia,
      height: this.height > 20 ? this.height : ra
    };
  }
  stateView(e, t, i) {
    return y`<div class="wrap">
      <div class="state" role="status">
        ${e}
        <span class="state-title">${t}</span>
        ${i ? y`<span class="state-hint">${i}</span>` : f}
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
    const i = _`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = _`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    if (!this.hasData)
      return this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
    const { chart: s, geometry: a } = this.renderChart(e, t);
    return this.hoverGeometry = a, y`<div class="wrap">
      ${s}${this.renderOverlay(a)}${this.renderStaleMark(i)}
    </div>`;
  }
  /**
   * The last good curve stays visible when a refresh fails – but it must not
   * pass for live data. A small mark in the corner says so; hover or a screen
   * reader gets the reason.
   */
  renderStaleMark(e) {
    return this.error ? y`<span
      class="stale"
      role="status"
      title=${this.labels.error}
      aria-label=${this.labels.error}
      >${e}</span
    >` : f;
  }
  renderChart(e, t) {
    const i = t, n = this.showAxis && i >= 62, s = n ? 20 : 0.5, a = 6, o = i - s, h = Math.max(6, o - a), l = 0, c = e - 1 - oa, d = e, m = 3, g = Math.max(1, this.end - this.start), p = Ze([this.start, this.end], [l, c]), $ = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, C = Ze(
      [this.start, this.end],
      [l + $, d - $]
    ), T = i - 6, L = this.temperature !== void 0, S = this.humidity !== void 0, R = L !== S, B = a, W = R ? o : a + h * ma, z = R ? a : a + h * pa, J = o, Ie = this.temperatureVisible ? this.temperature ?? [] : [], Wt = this.humidityVisible ? this.humidity ?? [] : [], Vt = Ie.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), Dr = Wt.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), re = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, Rr = re !== null ? [...Vt, re] : Vt, ht = Ti(Rr), ct = Ti(Dr), oe = ht ? Ci(ht[0], ht[1], fa) : null, Se = ct ? Ci(ct[0], ct[1], ga) : null, E = oe ? Ze(oe, [J, z]) : null, le = Math.min(1, Math.max(0.15, (this.chartOpacity ?? 100) / 100)), ne = this.temperatureBands && oe ? rs(
      oe,
      { coldBelow: this.bandCold, warmAbove: this.bandWarm, hotAbove: this.bandHot },
      { cold: yt, normal: this.accentColor, warm: bt, hot: wt },
      this.bandTransition
    ) : null, Gt = (u) => J === z ? 0 : (u - z) / (J - z), Kt = le < 1 ? `;stroke-opacity:${le}` : "", jt = (u) => Math.max(0.01, (Number.isFinite(u) ? u : 1) * le), Zt = jt(this.temperatureAreaOpacity), Yt = jt(this.humidityAreaOpacity), Xt = (u) => Math.min(
      1,
      Number(
        (0.22 * Math.pow(1 - Math.min(1, Math.max(0, u)), 1.45) * Zt).toFixed(3)
      )
    ), zr = ne ? ne.map((u) => ({
      offset: u.offset,
      color: u.color,
      opacity: Xt(u.offset)
    })) : [
      { offset: 0, color: this.accentColor, opacity: Xt(0) },
      {
        offset: 0.55,
        color: this.accentColor,
        // Same 0.08 falloff as before, scaled by strength and opacity.
        opacity: Number((0.08 * Zt).toFixed(3))
      },
      { offset: 1, color: this.accentColor, opacity: 0 }
    ], Or = [
      { offset: 0, color: this.humidityColor, opacity: Number(Math.min(1, 0.2 * Yt).toFixed(3)) },
      { offset: 0.6, color: this.humidityColor, opacity: Number(Math.min(1, 0.07 * Yt).toFixed(3)) },
      { offset: 1, color: this.humidityColor, opacity: 0 }
    ], O = Se ? Ze(Se, [W, B]) : null, he = Hi(Ie, this.start, this.end), Pe = Hi(Wt, this.start, this.end), qt = {
      rangeMs: g,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, Ue = this.curve === "smooth", Jt = (u) => {
      if (!Ue || u.length < 5) return u;
      const b = yr(u), x = Math.min(
        Zn(b, this.smoothing),
        u.length % 2 ? u.length : u.length - 1
      );
      return x < 3 ? u : Vn(u, x, {
        maxDeltaMs: Yn(x, b)
      });
    }, Fr = Jt(he), Nr = Jt(Pe), Qt = oe ? Ei(Fr, qt) : [], ei = Se ? Ei(Nr, qt) : [], Lr = Math.max(1, Qt.length + ei.length), Br = Math.max(60, Math.floor(1200 / Lr)), ti = (u) => u.map((b) => ta(b, Br)), Ae = ti(Qt), ke = ti(ei), ii = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const b = a + h * u / 3;
        ii.push(_`<line class="grid-line" x1=${l} x2=${d} y1=${b} y2=${b} />`);
      }
    const Ir = Math.max(1, d - l - 2 * $), ri = g / Ir, Pr = e < 200 ? 1 : e < 300 ? 2 : 3, Ur = n ? Jn(this.start, this.end, {
      maxTicks: Pr,
      endClearanceMs: la * ri,
      minSpacingMs: ha * ri,
      offsetAt: (u) => this.zoneOffset(u)
    }) : [], ni = l + $, Wr = n ? [
      ...Ur.map((u) => {
        const b = C(u), x = b - ca < ni ? "start" : "middle";
        return _`<text class="axis-label" x=${Math.max(b, ni)} y=${T} text-anchor=${x}>
              ${this.formatAxisLabel(u, !1, g > ir)}
            </text>`;
      }),
      _`<text class="axis-label" x=${C(this.end)} y=${T} text-anchor="end">
            ${this.formatAxisLabel(this.end, !0)}
          </text>`
    ] : [], Vr = (u) => {
      if (u.length < 2) return u;
      const b = u[u.length - 1];
      return b.x < c - 0.75 ? u : [...u, { x: d, y: b.y }];
    }, We = (u, b) => Vr(Ln(u, p, b)), Gr = (u, b, x) => (this.gapStyle === "dashed" ? Nn(u) : [u.samples]).filter((k) => k.length > 1).flatMap((k) => {
      const K = We(k, b);
      return !x || !ne ? [{ d: _r(K, Ue).concat() }] : ss(K, Ue, ne, Gt);
    }).filter((k) => k.d.length > 0), si = (u, b, x, v = {}) => {
      const k = Gr(u, b, v.banded === !0), K = le < 1 ? `opacity:${le}` : "", j = k.map(({ d: N, color: I }, P) => {
        const mt = v.banded && k.length > 1 ? `stroke-linecap:${P === 0 || P === k.length - 1 ? "round" : "butt"};` : "", Ge = [
          `stroke:${I ?? v.color ?? x}`,
          mt,
          v.width ? `stroke-width:${v.width}` : "",
          v.dashed ? "stroke-dasharray:0.1 5.5" : "",
          v.banded ? "" : Kt.replace(/^;/, "")
        ].filter(Boolean).join(";");
        return _`<path class="series-line" d=${N} style=${Ge}></path>`;
      });
      return !v.banded || k.length < 2 ? j : [_`<g class="series-runs" style=${K}>${j}</g>`];
    }, Kr = Ae.flatMap(
      (u) => si(u, E, this.accentColor, {
        color: this.accentColor,
        banded: ne !== null
      })
    ), ai = (u, b, x) => u.filter((v) => v.samples.length > 1).map((v) => Wn(We(v.samples, b), x, Ue)).join(" "), oi = E && this.showTemperatureArea ? ai(Ae, E, o) : "", jr = oi ? [_`<path class="series-area" d=${oi} style="fill:url(#${this.uid}-temp-fill)" />`] : [], li = O && this.showHumidityArea ? ai(ke, O, W) : "", Zr = li ? [
      _`<path class="series-area" d=${li} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], hi = this.humidityLineStyle === "dotted", Yr = ke.flatMap(
      (u) => si(u, O, this.humidityColor, {
        color: this.humidityColor,
        dashed: hi,
        width: hi ? 2.2 : 1.9
      })
    ), ci = [];
    if (this.showPoints) {
      const u = (b, x, v) => {
        const k = b.filter((N) => N.v !== null);
        if (!k.length) return;
        const j = Math.max(1, Math.ceil(k.length / 24));
        k.forEach((N, I) => {
          if (I % j !== 0 && I !== k.length - 1) return;
          const P = N.v;
          ci.push(
            _`<circle class="point" r="1.7" cx=${p(N.t)} cy=${x(P)} style="stroke:${v}${Kt}" />`
          );
        });
      };
      E && Ae.forEach((b) => u(b.samples, E, this.accentColor)), O && ke.forEach(
        (b) => u(b.samples, O, this.humidityColor)
      );
    }
    const F = re !== null && E ? E(re) : null, Me = this.showSetpoint && F !== null && Number.isFinite(F) && F >= z - 0.5 && F <= J + 0.5, Xr = he.find((u) => u.v !== null)?.v ?? null, qr = [...he].reverse().find((u) => u.v !== null)?.v ?? null, di = (u) => u === null || re === null ? 0 : Math.abs(u - re), Jr = di(qr) >= di(Xr) ? "right" : "left", ui = (u) => {
      for (let b = u.length - 1; b >= 0; b -= 1) {
        const x = u[b].samples;
        for (let v = x.length - 1; v >= 0; v -= 1)
          if (x[v].v !== null) return x[v];
      }
    }, ce = ui(Ae), be = ui(ke), Qr = this.labels.setpoint.length * da + 2, Ve = Me && F !== null ? es({
      lineY: F,
      left: l + m,
      right: d - m,
      width: Qr,
      height: rr,
      top: a,
      bottom: o,
      curves: [
        ...E ? Ae.filter((u) => u.samples.length > 1).map((u) => We(u.samples, E)) : [],
        ...O ? ke.filter((u) => u.samples.length > 1).map((u) => We(u.samples, O)) : []
      ],
      dots: [
        ...ce && E ? [{ x: p(ce.t), y: E(ce.v), r: 2.8 }] : [],
        ...be && O ? [{ x: p(be.t), y: O(be.v), r: 2.6 }] : []
      ],
      preferredSide: Jr
    }) : null, dt = Ve ? Ve.side === "right" : !0, mi = F === null ? 0 : Ve && !Ve.above ? F + nr + rr - 1 : F - nr - 1, en = Me && re !== null ? `${this.labels.setpoint} ${te(re, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", pi = (u, b, x, v) => {
      const k = zi(b);
      if (!k || k.min.v === k.max.v) return "";
      const K = te(k.min.v, this.language, v), j = te(k.max.v, this.language, v);
      return `${u} ${K}–${j}${x ? ` ${x}` : ""}`;
    }, tn = this.temperatureUnit || this.setpointUnit, rn = (() => {
      if (!ne || !E) return "";
      const u = he.map((P) => P.v).filter((P) => P !== null && Number.isFinite(P));
      if (!u.length) return "";
      const b = {
        coldBelow: this.bandCold,
        warmAbove: this.bandWarm,
        hotAbove: this.bandHot
      }, x = {
        cold: this.labels.bandColdText ?? "kalt",
        normal: this.labels.bandNormalText ?? "normal",
        warm: this.labels.bandWarmText ?? "warm",
        hot: this.labels.bandHotText ?? "heiß"
      }, v = { cold: yt, normal: this.accentColor, warm: bt, hot: wt }, k = Fi(Math.min(...u), b, v), K = Fi(Math.max(...u), b, v), j = (P) => P === yt ? x.cold : P === bt ? x.warm : P === wt ? x.hot : x.normal, N = j(k), I = j(K);
      return N === I ? `(${N})` : `(${N} – ${I})`;
    })(), nn = [
      this.labels.aria,
      en,
      E ? pi(this.labels.temperature, he, tn, this.temperatureDecimals) : "",
      O ? pi(this.labels.humidity, Pe, this.humidityUnit, this.humidityDecimals) : "",
      rn
    ].filter(Boolean).join(". "), ut = [], fi = (u, b, x, v, k, K, j) => {
      if (!this.showExtremes) return;
      const N = (w) => ua(w, j);
      if (e < sa) return N("schmale Karte");
      if (v - x < aa) return N("flaches Band");
      const I = zi(u);
      if (!I) return N("keine Messwerte");
      if (u.filter((w) => w.v !== null).length < 3) return N("zu wenige Messwerte");
      const mt = (I.min.v === I.max.v ? [{ sample: I.max, isMax: !0 }] : [
        { sample: I.max, isMax: !0 },
        { sample: I.min, isMax: !1 }
      ]).map(({ sample: w, isMax: Z }) => {
        const Ke = p(w.t), D = b(w.v), V = D - 11 >= x, je = D + 17 <= v, de = V ? D - 9 : x + 8, se = je ? D + 15 : v - 1;
        let pt = Z ? V ? de : se : je ? se : de;
        if (Me && F !== null && Math.abs(pt - F) < 9) {
          const gi = Z ? se : de;
          Math.abs(gi - F) >= 9 && (pt = gi);
        }
        return { sample: w, cx: Ke, cy: D, labelY: pt, isMax: Z };
      }).filter((w) => Number.isFinite(w.cx) && Number.isFinite(w.cy)).filter((w) => w.cy >= x - 1 && w.cy <= v + 1), Ge = (w, Z) => Math.abs(w.labelY - Z.labelY) < 9 && Math.abs(w.cx - Z.cx) < 34;
      let Q = [...mt];
      if (Q.length === 2 && Ge(Q[0], Q[1])) {
        for (const w of Q)
          w.labelY = w.isMax ? x + 8 : v - 1;
        Ge(Q[0], Q[1]) && (Q = Q.filter((w) => w.isMax));
      }
      for (const w of Q) {
        if (!w) continue;
        const Z = 26, Ke = w.cx < (l + c) / 2;
        let D = Ke ? w.cx + 6 : w.cx - 6, V = Ke ? "start" : "end";
        V === "start" && D + Z > d - qe ? (D = w.cx - 6, V = "end") : V === "end" && D - Z < l + qe && (D = w.cx + 6, V = "start");
        const je = dt ? d - m : l + m, de = (se) => Me && F !== null && Math.abs(w.labelY - mi) < 9 && Math.abs(se - je) < 40;
        if (de(D)) {
          const se = V === "start" ? w.cx - 6 : w.cx + 6;
          de(se) || (D = se, V = V === "start" ? "end" : "start");
        }
        D = V === "start" ? Math.min(D, d - qe - Z) : Math.max(D, l + qe + Z), ut.push(
          _`<circle
            class="extreme-dot"
            r="1.8"
            cx=${w.cx}
            cy=${w.cy}
            style=${`fill:var(--rcc-chart-point-fill);stroke:${k};stroke-width:1.2`}
          />`
        ), de(D) || ut.push(
          _`<text class="extreme-label" x=${D} y=${w.labelY} text-anchor=${V}>${te(
            w.sample.v,
            this.language,
            K
          )}</text>`
        );
      }
    };
    E && fi(
      he,
      E,
      z,
      J,
      this.accentColor,
      this.temperatureDecimals,
      "Temperatur"
    ), O && fi(
      Pe,
      O,
      B,
      W,
      this.humidityColor,
      this.humidityDecimals,
      "Luftfeuchte"
    );
    const sn = {
      width: e,
      height: i,
      left: l,
      right: c,
      plotTop: a,
      plotBottom: o,
      start: this.start,
      end: this.end,
      // The *measured* series, not the smoothed or bridged one: hit-testing and
      // the readout must never report an invented value.
      temperature: E && oe ? { samples: he, domain: oe, top: z, bottom: J } : null,
      humidity: O && Se ? { samples: Pe, domain: Se, top: B, bottom: W } : null
    };
    return { chart: _`<svg
      width=${e}
      height=${i}
      viewBox="0 0 ${e} ${i}"
      role="img"
      aria-label=${nn}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${z} x2="0" y2=${J} gradientUnits="userSpaceOnUse">
          ${zr.map(
      (u) => _`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${B} x2="0" y2=${W} gradientUnits="userSpaceOnUse">
          ${Or.map(
      (u) => _`<stop offset=${u.offset} stop-color=${u.color} stop-opacity=${u.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${ii}
      ${Zr}
      ${jr}
      ${Me ? _`<line
            class="setpoint-line"
            x1=${l}
            x2=${c}
            y1=${F}
            y2=${F}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${dt ? d - m : l + m}
            y=${mi}
            text-anchor=${dt ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : f}
      ${/*
    * With the time row the baseline separates plot and labels. Without it
    * the plot ends on the card's own edge – a second line there read as a
    * thicker border than the sides.
    */
    n ? _`<line class="baseline" x1=${l} x2=${d} y1=${o} y2=${o} />` : f}
      ${Yr} ${Kr} ${ci}
      ${be && O ? _`<circle
            class="end-dot"
            r="2.6"
            cx=${p(be.t)}
            cy=${O(be.v)}
            style=${`fill:${this.humidityColor};fill-opacity:${le}`}
          />` : f}
      ${ce && E ? _`<circle
            class="end-dot"
            r="2.8"
            cx=${p(ce.t)}
            cy=${E(ce.v)}
            style=${`fill:${ne ? Sr(ne, Gt(E(ce.v))) : this.accentColor};fill-opacity:${le}`}
          />` : f}
      ${ut}
      ${Wr}
    </svg>`, geometry: sn };
  }
  /**
   * Pointer layer over the plot plus the readout it drives. Everything below is
   * plain DOM: the SVG is expensive to rebuild (paths, decimation), and moving
   * the crosshair 60 times a second must not rebuild it.
   */
  renderOverlay(e) {
    if (!this.showTooltip || !e.temperature && !e.humidity) return f;
    const t = Math.round(e.plotTop), i = Math.max(1, Math.round(e.plotBottom - e.plotTop));
    return y`<div
        class="overlay"
        style=${`top:${t}px;height:${i}px;--rcc-focus:${this.accentColor}`}
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
  /** Measured instants of both series, ascending – the stops of the arrow keys. */
  keyboardTimes() {
    const e = this.hoverGeometry;
    if (!e) return [];
    const t = /* @__PURE__ */ new Set();
    for (const i of [e.temperature, e.humidity])
      for (const n of i?.samples ?? [])
        n.v !== null && n.t >= e.start && n.t <= e.end && t.add(n.t);
    return [...t].sort((i, n) => i - n);
  }
  updateHoverAt(e) {
    const t = this.hoverGeometry;
    if (!t) return;
    const n = e.currentTarget?.getBoundingClientRect(), s = n && n.width > 0 ? n.width : t.width;
    if (!s) return;
    const a = n ? n.left : 0, o = Math.min(1, Math.max(0, (e.clientX - a) / s)), h = t.start + o * (t.end - t.start);
    this.showHoverAt(h);
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
    const n = te(e, this.language, i);
    return t ? `${n} ${t}` : n;
  }
  /**
   * Snaps to the nearest *measured* sample and reports its value. The drawn
   * curve is smoothed, decimated and may contain interpolated bridge points –
   * none of those are measurements, so none of them may be shown here.
   */
  showHoverAt(e, t = !1) {
    const i = this.hoverGeometry, n = this.hoverRef.value;
    if (!i || !n) return;
    const s = i.temperature ? Ye(i.temperature.samples, e) : null, a = i.humidity ? Ye(i.humidity.samples, e) : null;
    let o = s ?? a;
    if (s && a && (o = Math.abs(s.t - e) <= Math.abs(a.t - e) ? s : a), !o) {
      this.hideHover();
      return;
    }
    const h = o.t, l = this.crosshairRef.value, c = this.xForTime(h, i);
    l && (l.style.left = `${c}px`);
    const d = i.temperature ? Ye(i.temperature.samples, h) : null, m = i.humidity ? Ye(i.humidity.samples, h) : null;
    this.placeDot(
      this.temperatureDotRef.value,
      i.temperature,
      d,
      c
    ), this.placeDot(this.humidityDotRef.value, i.humidity, m, c);
    const g = this.tooltipRef.value, p = this.tooltipTimeRef.value, $ = this.tooltipTemperatureRowRef.value, C = this.tooltipHumidityRowRef.value, T = this.tooltipTemperatureRef.value, L = this.tooltipHumidityRef.value, S = this.temperatureUnit || this.setpointUnit;
    if (p && (p.textContent = this.formatDayTime(h)), $ && ($.hidden = !d), C && (C.hidden = !m), T && d && (T.textContent = this.tooltipValue(
      d.v,
      S,
      this.temperatureDecimals
    )), L && m && (L.textContent = this.tooltipValue(
      m.v,
      this.humidityUnit,
      this.humidityDecimals
    )), g) {
      g.dataset.time = String(h);
      const B = g.offsetWidth || 84, W = g.offsetHeight || 38;
      let z = c + 10;
      z + B > i.width - 4 && (z = c - 10 - B), z = Math.max(4, Math.min(z, Math.max(4, i.width - B - 4)));
      const J = Math.max(2, Math.min(i.plotTop + 2, i.height - W - 2));
      g.style.left = `${z}px`, g.style.top = `${J}px`;
    }
    n.hidden = !1, this.hoverTime = h;
    const R = this.liveRef.value;
    R && t && (R.textContent = [
      p?.textContent ?? "",
      d && T ? `${this.labels.temperature} ${T.textContent}` : "",
      m && L ? `${this.labels.humidity} ${L.textContent}` : ""
    ].filter(Boolean).join(", "));
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
    this.clearHoverTimer(), this.hoverTime = void 0;
    const e = this.hoverRef.value;
    e && (e.hidden = !0);
  }
  clearHoverTimer() {
    this.hoverHideTimer && clearTimeout(this.hoverHideTimer), this.hoverHideTimer = void 0;
  }
  /**
   * Offset of the displayed zone at `time` in ms (local = utc + offset), so the
   * axis can put its ticks on full local hours. Browser zone without a zone set;
   * an invalid zone falls back to it as well, like the labels do.
   */
  zoneOffset(e) {
    const t = -new Date(e).getTimezoneOffset() * 6e4, i = this.timeZone;
    if (!i) return t;
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
      for (const a of this.offsetFormatter.format.formatToParts(new Date(e)))
        a.type !== "literal" && (n[a.type] = Number(a.value));
      return Date.UTC(
        n.year,
        n.month - 1,
        n.day,
        n.hour % 24,
        n.minute,
        n.second
      ) - Math.floor(e / 1e3) * 1e3;
    } catch {
      return t;
    }
  }
  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  formatAxisLabel(e, t, i = !1) {
    return t ? this.labels.now : i && Math.round((e + this.zoneOffset(e)) % ir) === 0 ? this.formatWeekday(e) : this.formatDayTime(e);
  }
  formatWeekday(e) {
    try {
      return new Intl.DateTimeFormat(this.language || "en", {
        weekday: "short",
        ...this.timeZone ? { timeZone: this.timeZone } : {}
      }).format(new Date(e)).replace(/[.,]/g, "").trim();
    } catch {
      return this.formatDayTime(e);
    }
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
const ar = "room-climate-chart";
typeof customElements < "u" && !customElements.get(ar) && customElements.define(ar, ba);
const At = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, wa = {
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
    setpointLineHelper: "Die gestrichelte Referenz auf die Solltemperatur des Thermostats samt „Soll“-Beschriftung. Aus: der Verlauf zeigt nur die Messwerte, die Solltemperatur steht weiterhin in der Statuszeile.",
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
    setpointLineHelper: "The dashed reference at the thermostat’s target, including the “target” caption. Off: the chart shows only the measurements, the target temperature stays in the status row.",
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
}, _a = {
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
}, va = [
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
], $a = {
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
function xa(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class Hr extends fe {
  constructor() {
    super(...arguments), this._config = { type: `custom:${ie}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = e && typeof e == "object" ? { ...e, type: e.type ?? `custom:${ie}` } : { type: `custom:${ie}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const e = Dt(this.hass?.locale?.language ?? this.hass?.language);
    return wa[e];
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
    t.type = this._config.type ?? `custom:${ie}`, this._config = t, this.dispatchEvent(
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
    return this.rawBoolean(e) ?? !!q(this._config[t]);
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
    return xe(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = xe(this._config[e]) ?? t;
    return Rt(i) ?? Rt(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: Ds(t) });
      }
    });
  }
  renderField(e) {
    return y`<div
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
      ${e.helper ? y`<span class="helper">${e.helper}</span>` : f}
      ${e.warning ? y`<span class="helper warning">${e.warning}</span>` : f}
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
        const i = xa(t);
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
    return y`<details class="section" ?open=${n} @toggle=${(s) => this.onToggle(e, s)}>
      <summary>
        <span class="section-title">${t}</span>
        <span class="chevron" aria-hidden="true"></span>
      </summary>
      <div class="fields">
        ${i}
        <button type="button" class="reset" @click=${() => this.resetSection(e)}>
          ${this.text.resetSection}
        </button>
      </div>
    </details>`;
  }
  /** Clears every key of a section, so the card's defaults apply again. */
  resetSection(e) {
    this._drafts = {}, this.patch(Object.fromEntries(_a[e].map((t) => [t, void 0])));
  }
  /** Applies a preset: its own values, and defaults for the other preset keys. */
  applyPreset(e) {
    const t = $a[e];
    this._drafts = {}, this.patch(Object.fromEntries(va.map((i) => [i, t[i]])));
  }
  renderPresets(e) {
    const t = [
      ["standard", e.presetStandard],
      ["compact", e.presetCompact],
      ["wall", e.presetWall],
      ["minimal", e.presetMinimal]
    ];
    return y`<div class="presets" role="group" aria-label=${e.presets}>
      <span class="presets-title">${e.presets}</span>
      <div class="preset-buttons">
        ${t.map(
      ([i, n]) => y`<button type="button" class="preset" data-preset=${i} @click=${() => this.applyPreset(i)}>
              ${n}
            </button>`
    )}
      </div>
      <span class="helper">${e.presetsHelper}</span>
    </div>`;
  }
  onToggle(e, t) {
    t.currentTarget.open ? this.openSections.add(e) : this.openSections.delete(e);
  }
  render() {
    if (!this._selectorsReady)
      return y`<div class="loading">${this.text.loading}</div>`;
    const e = this.text;
    return y`<div class="editor">
      ${this.renderPresets(e)}
      ${this.renderSection("general", e.general, this.renderGeneral(e))}
      ${this.renderSection("sensors", e.sensors, this.renderSensors(e))}
      ${this.renderSection("typography", e.typography, this.renderTypography(e))}
      ${this.renderSection("colors", e.colors, this.renderColors(e))}
      ${this.renderSection("window", e.window, this.renderWindow(e))}
      ${this.renderSection("motion", e.motion, this.renderMotion(e))}
      ${this.renderSection("thermostat", e.thermostat, this.renderThermostat(e))}
      ${this.renderSection("chart", e.chart, this.renderChart(e))}
      ${this.renderSection("actions", e.actions, this.renderActions(e))}
    </div>`;
  }
  renderGeneral(e) {
    const t = !this._config.height || this._config.height === "auto";
    return y`<div class="hint">${e.generalHelper}</div>
      ${this.renderText({ key: "name", label: e.name, helper: e.nameHelper })}
      ${this.renderNumber({
      key: "name_font_size",
      label: e.nameSize,
      helper: e.nameSizeHelper,
      min: rt.min,
      max: rt.max,
      step: 1,
      unit: "px",
      fallback: Pt
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
      helper: e.radiusHelper,
      min: 0,
      max: 40,
      step: 1,
      unit: "px",
      fallback: It
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
    return y`${this.renderField({
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
    })}
      ${this.renderHumidityRating(e)}`;
  }
  /** Humidity rating and dew point: both read the sensors chosen above. */
  renderHumidityRating(e) {
    const t = !!q(this._config.humidity_entity), i = t && !!q(this._config.temperature_entity), n = t && (this.rawBoolean("humidity_comfort") ?? !1);
    return y`${this.renderSwitch({
      key: "humidity_comfort",
      label: e.humidityComfort,
      value: this.rawBoolean("humidity_comfort") ?? !1,
      disabled: !t,
      helper: e.humidityComfortHelper
    })}
      ${this.renderNumber({
      key: "humidity_dry_below",
      label: e.humidityDryBelow,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 40,
      disabled: !n
    })}
      ${this.renderNumber({
      key: "humidity_humid_above",
      label: e.humidityHumidAbove,
      min: 0,
      max: 100,
      step: 1,
      unit: "%",
      fallback: 60,
      disabled: !n
    })}
      ${this.renderSwitch({
      key: "show_dew_point",
      label: e.dewPoint,
      value: this.rawBoolean("show_dew_point") ?? !1,
      disabled: !i,
      helper: e.dewPointHelper
    })}`;
  }
  /**
   * Independent typography for temperature and humidity – the two values are
   * the visual anchor of the card, so font family and size are separate.
   */
  renderTypography(e) {
    return y`<div class="hint">${e.readingSizeHelper}</div>
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
    return y`<div class="hint">${e.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: e.accentColor,
      fallback: _e.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: e.secondaryColor,
      fallback: _e.humidity
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = q(this._config.window_entity);
    return y`${this.renderSwitch({
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
    })}
      ${this.renderSwitch({
      key: "show_window_warning",
      label: e.windowWarning,
      value: this.rawBoolean("show_window_warning") ?? !0,
      disabled: !t,
      helper: e.windowWarningHelper
    })}`;
  }
  renderMotion(e) {
    const t = this.showFlag("show_motion", "motion_entity");
    return y`${this.renderSwitch({
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
      warning: t && !q(this._config.motion_entity) ? e.missingEntity : void 0
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
    return y`${this.renderSwitch({
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
      warning: t && !q(this._config.climate_entity) ? e.missingEntity : void 0
    })}
      ${this.renderSwitch({
      key: "show_climate_row",
      label: e.showClimateRow,
      value: this.rawBoolean("show_climate_row") ?? !0,
      disabled: !t
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
      fallback: At.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: At.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: At.off,
      disabled: !t
    })}`;
  }
  /**
   * Home Assistant's own action picker (`ui_action`): more-info, navigate, URL,
   * perform action, toggle, none – the same fields every built-in card offers.
   * The old short form `tap_action: none` is shown as `{ action: none }`.
   */
  actionValue(e) {
    const t = this._config[e];
    return typeof t == "string" ? { action: t } : t;
  }
  renderActions(e) {
    const t = (i, n, s) => this.renderField({
      key: i,
      label: n,
      selector: { ui_action: { default_action: s } },
      value: this.actionValue(i),
      onChange: (a) => this.patch({
        [i]: a && typeof a == "object" && Object.keys(a).length ? a : void 0
      })
    });
    return y`${t("tap_action", e.tapAction, "more-info")}
      ${t("hold_action", e.holdAction, "none")}
      ${t("double_tap_action", e.doubleTapAction, "none")}
      <p class="helper">${e.tapHelper}</p>`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = t || i, s = t && (this.rawBoolean("chart_temperature_bands") ?? !1), a = [3, 6, 12, 24, 48, 72, 168].map((o) => ({
      value: String(o),
      label: o === 168 ? "7 d" : `${o} h`
    }));
    return y`${this.renderSwitch({
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
        const h = Number(o);
        this.patch({ chart_hours: Number.isFinite(h) ? h : 6 });
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
    this.styles = Ft`
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
typeof customElements < "u" && !customElements.get(ze) && customElements.define(ze, Hr);
function Sa(r) {
  const e = r?.locale, t = e?.time_zone, i = r?.config?.time_zone || void 0;
  let n;
  t === "local" ? n = void 0 : t === "server" || !t ? n = i : n = Aa(t) ? t : i;
  const s = e?.time_format;
  return { timeZone: n, hour12: s === "12" || s === "am_pm" ? !0 : s === "24" ? !1 : void 0 };
}
function Aa(r) {
  try {
    return new Intl.DateTimeFormat("en", { timeZone: r }), !0;
  } catch {
    return !1;
  }
}
const kt = "#fbbf24", Mt = "#34d399", or = "var(--rcc-neutral)", ka = 500, lr = 10, Ma = 250, Ta = 15 * 1e3, Ca = 300 * 1e3;
class Ea extends fe {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.ownRepository = new Cr(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon"), this.holdFired = !1, this.onPressStart = (e) => {
      this.holdFired = !1, !(!this.hasGesture("hold") || this.chartOwns(e.target)) && (e.button !== void 0 && e.button > 0 || (this.pressOrigin = { x: e.clientX, y: e.clientY }, this.clearHold(), this.holdTimer = setTimeout(() => {
        this.holdTimer = void 0, this.holdFired = !0, this.run(this._config?.actions.hold ?? null);
      }, ka)));
    }, this.onPressMove = (e) => {
      if (!this.holdTimer || !this.pressOrigin) return;
      const t = e.clientX - this.pressOrigin.x, i = e.clientY - this.pressOrigin.y;
      t * t + i * i > lr * lr && this.clearHold();
    }, this.onPressEnd = () => {
      this.clearHold();
    }, this.handleCardClick = (e) => {
      const t = e.target;
      this.chartOwns(t) || t?.closest("button, a, input, select, textarea") || this.handleTap();
    }, this.handleCardKeydown = (e) => {
      e.target === e.currentTarget && (e.key !== "Enter" && e.key !== " " || this.tapEnabled && (e.preventDefault(), this.run(this._config?.actions.tap ?? null)));
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
  setConfig(e) {
    const t = vs(e);
    this._config = t, this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(ze);
  }
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), n = (d) => i.find(d)?.entity_id, s = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "temperature"
    ), a = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "humidity"
    ), o = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(d.attributes?.device_class))
    ), h = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && d.attributes?.device_class === "motion"
    ), l = n((d) => d.entity_id.startsWith("climate.")), c = { type: `custom:${ie}` };
    return s && (c.temperature_entity = s), a && (c.humidity_entity = a), o && (c.window_entity = o), h && (c.motion_entity = h), l && (c.climate_entity = l), c;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round($t(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? $t(this._config) : 230;
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
    return Cs(e);
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
    return Sa(this.hass);
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
  /**
   * @param force  re-render even if the data object did not change.
   * @param fresh  bypass the shared cache (after a reconnect the cached curve
   *               may predate the outage).
   */
  async loadHistory(e, t = !1, i = !1) {
    const n = this._config, s = this.hass;
    if (!n || !s || !e) return;
    const a = this.historyEntityIds(n);
    if (!a.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const o = Date.now(), h = o - n.chart.hours * 60 * 60 * 1e3;
    try {
      const c = await (Gs(s) ?? this.ownRepository).load(
        s,
        a,
        n.chart.hours,
        o,
        {
          ...i ? { maxAgeMs: 0 } : {},
          source: Us(n.chart.hours)
        }
      );
      if (this.historyKey !== e) return;
      this._history = c, this._historyWindow = { start: h, end: o }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, t && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== e) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Ta), Ca), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const h = ot(n.state);
    return a.v === h ? e : [...e, { t: o, v: h }];
  }
  updateDensity(e) {
    if (!this._config?.height) {
      this._density !== "md" && (this._density = "md");
      return;
    }
    const t = e > 0 ? e : this._config ? this._config.height ?? $t(this._config) : 0;
    let i = "md";
    t > 0 && t < 168 ? i = "xs" : t > 0 && t < 232 && (i = "sm"), i !== this._density && (this._density = i);
  }
  // ------------------------------------------------------------------ updates
  willUpdate(e) {
    if (e.has("hass")) {
      const t = this.hass?.connected !== !1;
      t && !this.lastConnected && (this.historyFetchedAt = 0, this.loadHistory(this.historyKey, !0, !0)), this.lastConnected = t, this.ensureHistory();
    }
    e.has("_config") && this._config && this.ensureHistory();
  }
  shouldUpdate(e) {
    if (e.has("hass")) {
      const t = e.get("hass");
      if (!t || !this.hass || t.connected !== this.hass.connected || t.locale?.language !== this.hass.locale?.language || t.locale?.number_format !== this.hass.locale?.number_format || t.locale?.time_format !== this.hass.locale?.time_format || t.locale?.time_zone !== this.hass.locale?.time_zone || t.config?.time_zone !== this.hass.config?.time_zone || t.themes?.darkMode !== this.hass.themes?.darkMode || t.themes?.theme !== this.hass.themes?.theme)
        return !0;
      const i = this._config ? Ss(this._config) : [];
      return i.length ? i.some((n) => t.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return y`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: n, humidity: s } = e.typography, a = [
      // Without an own radius the card keeps the theme's (`--ha-card-border-radius`).
      e.borderRadius !== null ? `--rcc-radius:${e.borderRadius}px` : "",
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
      `--rcc-name-line:${Mr(e.nameFontSize)}px`,
      `--rcc-name-icon:${As(e.nameFontSize)}px`,
      `--rcc-accent:${e.accentColor}`,
      `--rcc-secondary:${e.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      s.fontFamily ? `--rcc-hum-font:${s.fontFamily}` : ""
    ].filter(Boolean).join(";"), o = this.tapEnabled, h = o || this.hasGesture("hold") || this.hasGesture("doubleTap"), l = this.renderClimateRow(e, t), c = o && l === f;
    return y`<ha-card
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"} ${h ? "is-tappable" : ""}"
      style="${a}"
      role=${c ? "button" : "group"}
      tabindex=${c ? "0" : f}
      aria-label=${c ? `${this.cellAriaLabel(e, t)} – ${this.tapLabel(t)}` : this.cellAriaLabel(e, t)}
      @click=${this.handleCardClick}
      @keydown=${c ? this.handleCardKeydown : f}
      @pointerdown=${this.onPressStart}
      @pointermove=${this.onPressMove}
      @pointerup=${this.onPressEnd}
      @pointercancel=${this.onPressEnd}
      @pointerleave=${this.onPressEnd}
    >
      ${this.renderHeader(e, t)} ${this.renderReadings(e, t)}
      ${l} ${this.renderWindowWarning(e, t)} ${this.renderChart(e, t)}
      ${this.hasAnyEntity(e) ? f : this.renderEmpty(t)}
    </ha-card>`;
  }
  hasAnyEntity(e) {
    return !!(e.temperatureEntity || e.humidityEntity);
  }
  cellAriaLabel(e, t) {
    return `${Ki(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return y`<div class="empty-state" role="status">
      ${G.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = Ki(e, this.hass), n = zs(this.hass, e), s = qi(this.hass, e), a = e.motion.enabled && e.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return y`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${a ? y`<div class="subtle">
              ${t.t("quietSince")}
              ${Hs(n.sinceMs, this._now, {
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
    return this._haIconReady ? y`<ha-icon .icon=${e.icon}></ha-icon>` : G.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", n = i ? Mt : or, s = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return y`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${Xe(
      i ? Mt : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${Xe(i ? Mt : "#64748b", i ? 0.45 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? G.motion() : G.motionOff()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", n = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return y`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? kt : or};--badge-bg:${Xe(
      i ? kt : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${Xe(i ? kt : "#64748b", i ? 0.5 : 0.22)}"
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
    if (!e.temperatureEntity && !e.humidityEntity) return f;
    const i = this.language(), n = Xi(this.hass, e.temperatureEntity, "temperature"), s = Xi(this.hass, e.humidityEntity, "humidity"), a = !!e.temperatureEntity, o = !!e.humidityEntity, h = o && !a, l = e.showSeriesLabels;
    return y`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? y`<div class="reading-labels" aria-hidden="true">
        ${a ? y`<span class="series-label"
              ><span class="series-dot" style="background:${e.accentColor}"></span
              >${t.t("temperature")}</span
            >` : f}
        ${o ? y`<span class="series-label"
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
      className: h ? "humidity hero" : "humidity",
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
      ${this.renderReadingMeta(e, t, n, s, h)}
    </div>`;
  }
  /**
   * Quiet line under the values: the dew point below the temperature and the
   * humidity rating below the humidity. The line keeps its height while a
   * sensor is unavailable, so the card does not jump.
   */
  renderReadingMeta(e, t, i, n, s) {
    if (!Tr(e)) return f;
    const a = this.language();
    let o = f;
    if (e.humidity.showDewPoint && i.value !== null && n.value !== null) {
      const l = Le(i.unit) === "F", c = l ? (i.value - 32) / 1.8 : i.value, d = ls(c, n.value);
      if (d !== null) {
        const m = l ? d * 1.8 + 32 : d;
        o = y`<span class="meta-dew"
          >${t.t("dewPoint")}
          ${te(m, a, e.temperatureDecimals)} ${i.unit}</span
        >`;
      }
    }
    let h = f;
    if (e.humidity.comfort && n.value !== null) {
      const l = as(n.value, e.humidity.comfort), c = l === "dry" ? t.t("humidityDry") : l === "humid" ? t.t("humidityHumid") : t.t("humidityComfortable");
      h = y`<span class="meta-humidity level-${l}"
        ><span class="meta-dot" aria-hidden="true"></span>${c}</span
      >`;
    }
    return y`<div class="reading-meta ${s ? "humidity-first" : ""}">
      ${o}${h}
    </div>`;
  }
  /**
   * One measured value; the accent dot of the caption row marks its series.
   * Deliberately not a button: a tap on the value belongs to the card, which
   * opens the thermostat dialog.
   */
  renderReading(e) {
    const t = e.value !== null ? te(e.value, e.language, e.decimals) : "–";
    return y`<span class="reading ${e.className}" style="--series-color:${e.color}">
      <span class="reading-number" role="text" aria-label="${e.ariaLabel}"
        ><span class="reading-value">${t}</span
        ><span class="reading-unit">${e.unit}</span></span
      >
    </span>`;
  }
  sensorAria(e, t, i, n) {
    return e.value === null ? n.t("unavailable") : `${te(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Entity a more-info or toggle action works on when it names none: the
   * thermostat, else the temperature sensor, else the humidity sensor. Without
   * a thermostat a tap therefore opens the sensor's history instead of doing
   * nothing.
   */
  get mainEntity() {
    return this._config ? gs(this._config) : void 0;
  }
  /** Whether a tap does something – the card is then a button. */
  get tapEnabled() {
    return !!this._config && Et(this._config.actions.tap, this.mainEntity);
  }
  hasGesture(e) {
    const t = this._config?.actions[e] ?? null;
    return Et(t, this.mainEntity);
  }
  /** Words for the accessible name of the tap ("Thermostat öffnen", …). */
  tapLabel(e) {
    const t = this._config?.actions.tap;
    return t?.action === "more-info" ? (t.entity ?? this.mainEntity)?.startsWith("climate.") ? e.t("openThermostat") : e.t("openDetails") : e.t("runAction");
  }
  run(e) {
    Dn(this, this.hass, e, this.mainEntity, {
      confirmText: this.translator().t("confirmAction")
    });
  }
  /** Taps inside the chart belong to the chart while it shows its readout. */
  chartOwns(e) {
    return !!e?.closest?.(".chart-slot, room-climate-chart") && !!this._config?.chart.showTooltip;
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
    const e = this._config?.actions;
    if (e) {
      if (this.hasGesture("doubleTap")) {
        if (this.tapTimer) {
          clearTimeout(this.tapTimer), this.tapTimer = void 0, this.run(e.doubleTap);
          return;
        }
        this.tapTimer = setTimeout(() => {
          this.tapTimer = void 0, this.run(e.tap);
        }, Ma);
        return;
      }
      this.run(e.tap);
    }
  }
  /**
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  renderClimateRow(e, t) {
    if (!kr(e)) return f;
    const i = xt(this.hass, e, t), n = e.thermostat.showSetpoint && i.setpoint !== null, s = e.thermostat.showStatus, a = e.thermostat.showMode && !!i.modeLabel, o = a && i.modeLabel && i.status !== "unknown" && i.modeLabel !== i.label ? `${i.modeLabel} · ${i.label}` : a && i.status === "unknown" ? i.modeLabel ?? i.label : i.label;
    if (!n && !s && !a) return f;
    const h = Fs(i, e), l = this.language(), c = i.setpoint !== null ? `${te(i.setpoint, l, e.temperatureDecimals)} ${i.unit}` : "", d = this.tapEnabled, m = y`${s ? y`<span class="flame status-${i.status}" style="color:${h}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : f}
      <span class="climate-state" role=${d ? "status" : f}
        >${o}</span
      >
      ${n ? y`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t("setpoint")}</span> ${c}</span
            >` : f}`;
    return d ? y`<button
      type="button"
      class="climate-row is-tappable"
      aria-label="${this.thermostatAria(i)} – ${this.tapLabel(t)}"
      title="${this.tapLabel(t)}"
      @click=${(g) => {
      g.stopPropagation(), this.handleTap();
    }}
    >
      ${m}
    </button>` : y`<div
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
  renderWindowWarning(e, t) {
    return !e.window.enabled || !e.window.warnWhileHeating || !e.thermostat.enabled || qi(this.hass, e).status !== "open" || xt(this.hass, e, t).status !== "heating" ? f : y`<div class="climate-warning" role="alert">
      <span class="climate-warning-icon" aria-hidden="true">${G.windowOpen()}</span>
      <span>${t.t("windowHeatingWarning")}</span>
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
    if (!Ar(e)) return f;
    const i = Date.now(), n = i - e.chart.hours * 60 * 60 * 1e3, s = e.chart.showTemperature && e.temperatureEntity ? this.withLiveState(
      this._history[e.temperatureEntity],
      e.temperatureEntity,
      i
    ) : void 0, a = e.chart.showHumidity && e.humidityEntity ? this.withLiveState(this._history[e.humidityEntity], e.humidityEntity, i) : void 0, o = this.language(), h = this.chartClock(), l = e.humidityEntity ? this.hass?.states?.[e.humidityEntity]?.attributes?.unit_of_measurement : void 0, c = e.thermostat.enabled ? xt(this.hass, e, t) : void 0, d = (e.temperatureEntity ? this.hass?.states?.[e.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", m = c?.setpoint ?? null, p = (m === null || !c ? null : Yi(m, c.unit, d)) ?? (c?.unit === d ? m : null), $ = (R, B) => Yi(R, "°C", B) ?? R, C = {
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
    }, T = this.tapEnabled && !e.chart.showTooltip, L = $s(e), S = xs(e);
    return y`<div
      class="chart-slot ${T ? "is-tappable" : ""}"
      style="margin-left:${L}px;margin-right:${L}px;margin-bottom:${S}px"
    >
      <room-climate-chart
        .temperature=${s}
        .humidity=${a}
        .accentColor=${e.accentColor}
        .humidityColor=${e.humidity.color}
        .setpoint=${p}
        .setpointUnit=${d}
        .start=${n}
        .end=${i}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .showTooltip=${e.chart.showTooltip}
        .showExtremes=${e.chart.showExtremes}
        .temperatureUnit=${d}
        .humidityUnit=${l ?? "%"}
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
        .bandCold=${$(e.chart.bandLimits.coldBelow, d)}
        .bandWarm=${$(e.chart.bandLimits.warmAbove, d)}
        .bandHot=${$(e.chart.bandLimits.hotAbove, d)}
        .bandTransition=${Math.round(e.chart.bandTransition * 100)}
        .temperatureScale=${Le(d) ?? "C"}
        .cornerRadius=${e.borderRadius ?? It}
        .language=${o}
        .timeZone=${h.timeZone}
        .hour12=${h.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${C}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Ft`
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
  `%c ROOM-CLIMATE-CARD %c v${ln} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(ie) || customElements.define(ie, Ea);
customElements.get(ze) || customElements.define(ze, Hr);
const hr = window.customCards = window.customCards ?? [];
hr.some((r) => r.type === ie) || hr.push({
  type: ie,
  name: an,
  description: on,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  ie as CARD_TAG,
  ln as CARD_VERSION,
  Ea as RoomClimateCard,
  Hr as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
