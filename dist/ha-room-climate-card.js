const T = "room-climate-card", j = "room-climate-card-editor", li = "Room Climate Card", hi = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", ci = "2.2.0";
const me = globalThis, Fe = me.ShadowRoot && (me.ShadyCSS === void 0 || me.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Oe = /* @__PURE__ */ Symbol(), lt = /* @__PURE__ */ new WeakMap();
let Ft = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Fe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = lt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && lt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const di = (r) => new Ft(typeof r == "string" ? r : r + "", void 0, Oe), Ne = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[a + 1], r[0]);
  return new Ft(t, r, Oe);
}, ui = (r, e) => {
  if (Fe) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = me.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, ht = Fe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return di(t);
})(r) : r;
const { is: mi, defineProperty: pi, getOwnPropertyDescriptor: fi, getOwnPropertyNames: yi, getOwnPropertySymbols: gi, getPrototypeOf: bi } = Object, fe = globalThis, ct = fe.trustedTypes, wi = ct ? ct.emptyScript : "", _i = fe.reactiveElementPolyfillSupport, ee = (r, e) => r, Re = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? wi : null;
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
} }, Ot = (r, e) => !mi(r, e), dt = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: Ot };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), fe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let G = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = dt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && pi(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: a } = fi(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const l = s?.call(this);
      a?.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = bi(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const t = this.properties, i = [...yi(t), ...gi(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(ht(s));
    } else e !== void 0 && t.push(ht(e));
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
    return ui(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Re).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = i.getPropertyOptions(s), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Re;
      this._$Em = s;
      const l = n.fromAttribute(t, a.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (a = this[e]), i ??= n.getPropertyOptions(e), !((i.hasChanged ?? Ot)(a, t) || i.useDefault && i.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: a }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, a] of i) {
        const { wrapped: n } = a, l = this[s];
        n !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
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
G.elementStyles = [], G.shadowRootOptions = { mode: "open" }, G[ee("elementProperties")] = /* @__PURE__ */ new Map(), G[ee("finalized")] = /* @__PURE__ */ new Map(), _i?.({ ReactiveElement: G }), (fe.reactiveElementVersions ??= []).push("2.1.2");
const Be = globalThis, ut = (r) => r, pe = Be.trustedTypes, mt = pe ? pe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Nt = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + L, vi = `<${Bt}>`, P = document, re = () => P.createComment(""), se = (r) => r === null || typeof r != "object" && typeof r != "function", Ie = Array.isArray, $i = (r) => Ie(r) || typeof r?.[Symbol.iterator] == "function", Ce = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, ft = />/g, N = RegExp(`>|${Ce}(?:([^\\s"'>=/]+)(${Ce}*=${Ce}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yt = /'/g, gt = /"/g, It = /^(?:script|style|textarea|title)$/i, Pt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = Pt(1), f = Pt(2), W = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), bt = /* @__PURE__ */ new WeakMap(), B = P.createTreeWalker(P, 129);
function Ut(r, e) {
  if (!Ie(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return mt !== void 0 ? mt.createHTML(e) : e;
}
const xi = (r, e) => {
  const t = r.length - 1, i = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = J;
  for (let l = 0; l < t; l++) {
    const o = r[l];
    let h, d, c = -1, b = 0;
    for (; b < o.length && (n.lastIndex = b, d = n.exec(o), d !== null); ) b = n.lastIndex, n === J ? d[1] === "!--" ? n = pt : d[1] !== void 0 ? n = ft : d[2] !== void 0 ? (It.test(d[2]) && (s = RegExp("</" + d[2], "g")), n = N) : d[3] !== void 0 && (n = N) : n === N ? d[0] === ">" ? (n = s ?? J, c = -1) : d[1] === void 0 ? c = -2 : (c = n.lastIndex - d[2].length, h = d[1], n = d[3] === void 0 ? N : d[3] === '"' ? gt : yt) : n === gt || n === yt ? n = N : n === pt || n === ft ? n = J : (n = N, s = void 0);
    const v = n === N && r[l + 1].startsWith("/>") ? " " : "";
    a += n === J ? o + vi : c >= 0 ? (i.push(h), o.slice(0, c) + Nt + o.slice(c) + L + v) : o + L + (c === -2 ? l : v);
  }
  return [Ut(r, a + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ne {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, o = this.parts, [h, d] = xi(e, t);
    if (this.el = ne.createElement(h, i), B.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = B.nextNode()) !== null && o.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Nt)) {
          const b = d[n++], v = s.getAttribute(c).split(L), x = /([.?@])?(.*)/.exec(b);
          o.push({ type: 1, index: a, name: x[2], strings: v, ctor: x[1] === "." ? ki : x[1] === "?" ? Ai : x[1] === "@" ? Ci : ye }), s.removeAttribute(c);
        } else c.startsWith(L) && (o.push({ type: 6, index: a }), s.removeAttribute(c));
        if (It.test(s.tagName)) {
          const c = s.textContent.split(L), b = c.length - 1;
          if (b > 0) {
            s.textContent = pe ? pe.emptyScript : "";
            for (let v = 0; v < b; v++) s.append(c[v], re()), B.nextNode(), o.push({ type: 2, index: ++a });
            s.append(c[b], re());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Bt) o.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(L, c + 1)) !== -1; ) o.push({ type: 7, index: a }), c += L.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = P.createElement("template");
    return i.innerHTML = e, i;
  }
}
function q(r, e, t = r, i) {
  if (e === W) return e;
  let s = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const a = se(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = s : t._$Cl = s), s !== void 0 && (e = q(r, s._$AS(r, e.values), s, i)), e;
}
class Si {
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
    const { el: { content: t }, parts: i } = this._$AD, s = (e?.creationScope ?? P).importNode(t, !0);
    B.currentNode = s;
    let a = B.nextNode(), n = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (n === o.index) {
        let h;
        o.type === 2 ? h = new ae(a, a.nextSibling, this, e) : o.type === 1 ? h = new o.ctor(a, o.name, o.strings, this, e) : o.type === 6 && (h = new Ei(a, this, e)), this._$AV.push(h), o = i[++l];
      }
      n !== o?.index && (a = B.nextNode(), n++);
    }
    return B.currentNode = P, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class ae {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = q(this, e, t), se(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $i(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && se(this._$AH) ? this._$AA.nextSibling.data = e : this.T(P.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ne.createElement(Ut(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const a = new Si(s, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = bt.get(e.strings);
    return t === void 0 && bt.set(e.strings, t = new ne(e)), t;
  }
  k(e) {
    Ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const a of e) s === t.length ? t.push(i = new ae(this.O(re()), this.O(re()), this, this.options)) : i = t[s], i._$AI(a), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = ut(e).nextSibling;
      ut(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, a) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, s) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = q(this, e, t, 0), n = !se(e) || e !== this._$AH && e !== W, n && (this._$AH = e);
    else {
      const l = e;
      let o, h;
      for (e = a[0], o = 0; o < a.length - 1; o++) h = q(this, l[i + o], t, o), h === W && (h = this._$AH[o]), n ||= !se(h) || h !== this._$AH[o], h === m ? e = m : e !== m && (e += (h ?? "") + a[o + 1]), this._$AH[o] = h;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ki extends ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Ai extends ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Ci extends ye {
  constructor(e, t, i, s, a) {
    super(e, t, i, s, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = q(this, e, t, 0) ?? m) === W) return;
    const i = this._$AH, s = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ei {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    q(this, e);
  }
}
const Mi = Be.litHtmlPolyfillSupport;
Mi?.(ne, ae), (Be.litHtmlVersions ??= []).push("3.3.3");
const Hi = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const a = t?.renderBefore ?? null;
    i._$litPart$ = s = new ae(e.insertBefore(re(), a), a, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
const Pe = globalThis;
class I extends G {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Hi(t, this.renderRoot, this.renderOptions);
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
I._$litElement$ = !0, I.finalized = !0, Pe.litElementHydrateSupport?.({ LitElement: I });
const Ti = Pe.litElementPolyfillSupport;
Ti?.({ LitElement: I });
(Pe.litElementVersions ??= []).push("4.2.2");
const Di = ["on", "open", "opening", "tilted", "gekippt"], Ri = ["off", "closed", "closing"], K = {
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
}, wt = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, _t = { min: 14, max: 96 }, zi = /^[a-z0-9_]+\.[a-z0-9_]+$/, Li = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function Fi(r) {
  return typeof r == "object" && r !== null;
}
function E(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return zi.test(e) ? e : void 0;
}
function Z(r) {
  if (typeof r != "string") return;
  const e = r.trim();
  return e.length ? e : void 0;
}
function z(r, e, t, i) {
  const s = typeof r == "number" ? r : Number(r);
  return Number.isFinite(s) ? Math.min(t, Math.max(e, s)) : i;
}
function $(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function Q(r, e) {
  const t = Z(r);
  return t && t.length <= 64 ? t : e;
}
function vt(r) {
  const e = Z(r);
  if (!(!e || e.length > 120) && Li.test(e))
    return e;
}
function $t(r, e) {
  return Math.round(
    z(r, _t.min, _t.max, e)
  );
}
function Oi(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
function Ni(r) {
  const e = Fi(r) ? r : {}, t = E(e.temperature_entity), i = E(e.humidity_entity), s = E(e.window_entity), a = E(e.motion_entity), n = E(e.climate_entity), l = E(e.name_entity), o = Oi(e.window_open_states), h = $(e.show_window) ?? !!s, d = $(e.show_motion) ?? !!a, c = $(e.show_thermostat) ?? !!n, b = $(e.show_temperature_chart) ?? !!t, v = $(e.show_humidity_chart) ?? !!i, x = e.height, D = x === "auto" || x === void 0 || x === null || x === 0 ? null : z(x, 120, 2e3, 0) || null, M = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", R = e.chart_curve === "linear" ? "linear" : "smooth", g = e.chart_gap_mode === "break" ? "break" : "connect", H = e.chart_gap_style === "dashed" ? "dashed" : "solid", Y = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid", U = Q(
    e.accent_color ?? e.temperature_comfort_color,
    K.accent
  );
  return {
    raw: e,
    name: Z(e.name),
    nameEntity: l,
    icon: Z(e.icon) ?? "mdi:home-thermometer-outline",
    height: D,
    borderRadius: z(e.border_radius, 0, 40, 26),
    theme: M,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(z(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(z(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: $t(
          e.temperature_font_size,
          wt.temperature
        ),
        fontFamily: vt(e.temperature_font_family)
      },
      humidity: {
        fontSize: $t(e.humidity_font_size, wt.humidity),
        fontFamily: vt(e.humidity_font_family)
      }
    },
    showSeriesLabels: $(e.show_series_labels) ?? !0,
    accentColor: U,
    humidity: {
      color: Q(e.humidity_color, K.humidity)
    },
    window: {
      enabled: h && !!s,
      entity: s,
      openStates: o.length ? o : [...Di]
    },
    motion: {
      enabled: d && !!a,
      entity: a,
      showLastChanged: $(e.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: c && !!n,
      entity: n,
      showRow: $(e.show_climate_row) ?? !0,
      showSetpoint: $(e.show_setpoint) ?? !0,
      showStatus: $(e.show_hvac_status) ?? !0,
      showMode: $(e.show_hvac_mode) ?? !1,
      heatingColor: Q(e.heating_color, K.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: Q(e.heating_idle_color, U),
      offColor: Q(e.heating_off_color, K.off)
    },
    chart: {
      showTemperature: b && !!t,
      showHumidity: v && !!i,
      hours: Math.round(z(e.chart_hours, 1, 168, 6)),
      height: Math.round(z(e.chart_height, 30, 400, 112)),
      curve: R,
      gapMode: g,
      maxGapMinutes: Math.round(z(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: H,
      humidityLineStyle: Y,
      showPoints: $(e.chart_show_points) ?? !1,
      showTemperatureGradient: $(e.chart_temperature_gradient) ?? !0,
      showHumidityGradient: $(e.chart_humidity_gradient) ?? !0,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: $(e.chart_show_grid) ?? !1
    }
  };
}
function Bi(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function Vt(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function Gt(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function Ee(r) {
  if (r.height) return r.height;
  const e = r.typography.temperature.fontSize, t = Vt(r) ? r.chart.height : 0, i = Gt(r) ? 20 : 0, s = 28, a = r.showSeriesLabels ? 20 : 0;
  return 20 + s + 12 + a + e + 8 + i + 12 + t + 20;
}
function xt(r, e) {
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
const Ii = {
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
}, Pi = {
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
}, Ui = Ii;
function ze(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function Vi(r) {
  const e = ze(r) === "de" ? Ui : Pi;
  return {
    language: ze(r),
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
function te(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
const St = /* @__PURE__ */ new Map();
function Gi(r, e) {
  const t = `${r}|${e}`;
  let i = St.get(t);
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
    St.set(t, i);
  }
  return i;
}
function Me(r, e, t) {
  return Number.isFinite(r) ? Gi(e || "en", te(Math.round(t), 0, 3)).format(r) : "–";
}
function Ue(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function Ki(r, e, t) {
  const i = Math.max(0, e - r), s = Math.floor(i / 6e4);
  if (s < 1) return t.justNow;
  if (s < 60) return `${s} ${t.minutes}`;
  const a = Math.floor(s / 60);
  return a < 24 ? `${a} ${t.hours}` : `${Math.floor(a / 24)} ${t.days}`;
}
function ji(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Le(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function Wi(r) {
  return `#${r.map((e) => te(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function de(r, e) {
  const t = Le(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${te(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${te(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(te(e, 0, 1) * 100)}%, transparent)`;
}
function ge(r) {
  return r === "unavailable" || r === "unknown";
}
function kt(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const s = r?.states[e];
  if (!s) return { value: null, status: "missing", unit: i };
  const a = s.attributes?.unit_of_measurement ?? i;
  if (ge(s.state))
    return { entity: s, value: null, status: "unavailable", unit: a };
  const n = Ue(s.state);
  return n === null ? { entity: s, value: null, status: "invalid", unit: a } : { entity: s, value: n, status: "ok", unit: a };
}
function qi(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const s = i.state;
  if (ge(s)) return { status: "unavailable", entity: i, rawState: s };
  const a = s.trim().toLowerCase();
  return e.window.openStates.includes(a) ? { status: "open", entity: i, rawState: s } : Ri.includes(a) ? { status: "closed", entity: i, rawState: s } : { status: "unknown", entity: i, rawState: s };
}
const Zi = ["on", "detected", "motion", "occupied", "active"];
function Yi(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const s = i.state, a = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (ge(s)) return { status: "unavailable", entity: i, rawState: s };
  const n = s.trim().toLowerCase();
  if (Zi.includes(n))
    return { status: "active", entity: i, rawState: s };
  const l = { status: "idle", entity: i, rawState: s };
  return Number.isFinite(a) && (l.sinceMs = a), l;
}
const Xi = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function At(r, e, t) {
  const i = e.thermostat.entity, s = ji(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const a = r?.states[i];
  if (!a)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const n = a.state?.toLowerCase(), l = a.attributes?.hvac_action, o = typeof l == "string" ? l.toLowerCase() : void 0, h = a.attributes?.temperature, d = typeof h == "number" ? h : typeof h == "string" ? Ue(h) : null, c = {
    entity: a,
    action: o,
    setpoint: d,
    unit: s,
    mode: n,
    modeLabel: n ? t.mode(n) : void 0
  };
  return ge(a.state ?? "") ? { ...c, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : n === "off" ? { ...c, status: "off", label: t.t("off"), colorKey: "off" } : o === "heating" ? { ...c, status: "heating", label: t.t("heating"), colorKey: "heating" } : o === "idle" ? { ...c, status: "idle", label: t.t("idle"), colorKey: "idle" } : o === "off" ? { ...c, status: "off", label: t.t("off"), colorKey: "off" } : o && !Xi.includes(o) ? { ...c, status: "action", label: t.action(o), colorKey: "idle" } : o ? { ...c, status: "action", label: t.action(o), colorKey: "idle" } : { ...c, status: "unknown", label: t.t("statusUnknown"), colorKey: "unknown" };
}
function Ji(r, e) {
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
function ie(r) {
  return typeof r == "object" && r !== null;
}
function Qi(r) {
  if (!ie(r)) return;
  const e = r.lu;
  if (typeof e == "number" && Number.isFinite(e))
    return e > 1e12 ? e : e * 1e3;
  for (const t of ["last_changed", "last_updated", "lc"]) {
    const i = r[t];
    if (typeof i == "number" && Number.isFinite(i))
      return i > 1e12 ? i : i * 1e3;
    if (typeof i == "string") {
      const s = Date.parse(i);
      if (Number.isFinite(s)) return s;
    }
  }
}
function er(r) {
  if (ie(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Ct(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const s = Qi(i);
    if (s === void 0 || !Number.isFinite(s)) continue;
    const a = er(i), n = Ue(a);
    e.push({ t: s, v: n });
  }
  if (!e.length) return [];
  e.sort((i, s) => i.t - s.t);
  const t = [];
  for (const i of e) {
    const s = t[t.length - 1];
    s && s.t === i.t ? t[t.length - 1] = i : t.push(i);
  }
  return t;
}
function Et(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const s = i[0], a = ie(s) && typeof s.entity_id == "string" ? s.entity_id : void 0;
      if (!a || !(a in t)) continue;
      const n = Ct(i);
      t[a] = tr(t[a], n);
    }
    return t;
  }
  if (ie(r))
    for (const i of e) {
      const s = r[i];
      if (s === void 0) continue;
      const a = Array.isArray(s) ? s : ie(s) && Array.isArray(s.data) ? s.data : s;
      t[i] = Ct(a);
    }
  return t;
}
function tr(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((s, a) => s.t - a.t), i = [];
  for (const s of t) {
    const a = i[i.length - 1];
    a && a.t === s.t ? i[i.length - 1] = s : i.push(s);
  }
  return i;
}
async function ir(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), s = new Date(t.end).toISOString(), a = r.connection;
  if (a && typeof a.sendMessagePromise == "function")
    try {
      const o = await a.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: s,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = Et(o, e);
      return Object.values(h).some((d) => d.length > 0), h;
    } catch (o) {
      if (!r.callApi) throw o;
    }
  if (typeof r.callApi != "function") return {};
  const n = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((o) => encodeURIComponent(o)).join(",")}&end_time=${encodeURIComponent(s)}&minimal_response&no_attributes`, l = await r.callApi("GET", n);
  return Et(l, e);
}
function rr(r, e) {
  return `${[...r].sort().join("|")}@${e}`;
}
class sr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, s = Date.now()) {
    const a = rr(t, i), n = this.cache.get(a);
    if (n && s - n.fetchedAt < 12e4)
      return n.data;
    const l = this.inflight.get(a);
    if (l) return l;
    const o = ir(e, t, {
      start: s - i * 60 * 60 * 1e3,
      end: s
    }).then((h) => {
      if (this.cache.set(a, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const d = this.cache.keys().next();
        d.done || this.cache.delete(d.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(a);
    });
    return this.inflight.set(a, o), o;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const S = (r) => f`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, C = {
  thermometer: () => S(f`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => S(f`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => S(
    f`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => S(
    f`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => S(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => S(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => S(
    f`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => S(
    f`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => S(f`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => S(
    f`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => S(f`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => S(f`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => S(f`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => S(
    f`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
}, _ = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function ue(r, e) {
  const [t, i] = r, [s, a] = e, n = i - t;
  if (!Number.isFinite(n) || n === 0) {
    const l = (s + a) / 2;
    return () => l;
  }
  return (l) => s + (l - t) / n * (a - s);
}
function Mt(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function Ht(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: s = 0.12 } = t;
  let a = r, n = e;
  if (n - a < i) {
    const o = (n + a) / 2;
    a = o - i / 2, n = o + i / 2;
  }
  const l = (n - a) * s;
  return [a - l, n + l];
}
function nr(r) {
  const e = [];
  for (let i = 1; i < r.length; i++) {
    const s = r[i].t - r[i - 1].t;
    s > 0 && e.push(s);
  }
  if (!e.length) return 0;
  e.sort((i, s) => i - s);
  const t = Math.floor(e.length / 2);
  return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2;
}
function ar(r, e, t = {}) {
  const i = nr(r), s = i > 0 ? i * 2.5 : 0, a = t.minMs ?? Math.max(e / 40, 300 * 1e3), n = t.maxMs ?? Math.max(a, e / 3);
  return Math.min(n, Math.max(s, a));
}
const or = 8;
function lr(r, e, t, i) {
  const s = t.t - e.t, a = e.v, n = t.v, l = Math.min(
    or,
    Math.max(1, Math.round(s / Math.max(i / 2, 6e4)))
  );
  for (let o = 1; o < l; o++) {
    const h = o / l;
    r.samples.push({
      t: Math.round(e.t + s * h),
      v: a + (n - a) * h
    }), r.bridged.push(!0);
  }
}
function Tt(r, e) {
  const { rangeMs: t, start: i, end: s } = e, a = e.gapMode ?? "connect", n = ar(r, t), l = e.maxGapMs ?? t / 4, o = [];
  let h = null, d = null, c = null, b = !1, v = !1;
  const x = () => {
    h && h.samples.length && o.push(h), h = null, d = null, c = null;
  };
  for (const g of r) {
    if (g.v === null || !Number.isFinite(g.v)) {
      d || (b = !0), c = c ?? g.t, v = !0;
      continue;
    }
    if (v = !1, !d || !h) {
      h = { samples: [g], bridged: [] }, d = g, c = null;
      continue;
    }
    const H = g.t - d.t;
    if (H <= n && c === null) {
      h.samples.push(g), h.bridged.push(!1), d = g;
      continue;
    }
    if (a === "connect" && (!(c !== null) || H <= l)) {
      lr(h, d, g, n), h.samples.push(g), h.bridged.push(!0), d = g, c = null;
      continue;
    }
    x(), h = { samples: [g], bridged: [] }, d = g;
  }
  if (x(), !o.length) return o;
  const D = o[0];
  if (!b && i !== void 0 && D.samples[0].t > i && (D.samples.unshift({ t: i, v: D.samples[0].v }), D.bridged.unshift(!1)), v)
    return o;
  const M = o[o.length - 1], R = M.samples[M.samples.length - 1];
  return s !== void 0 && R.t < s && (M.samples.push({ t: s, v: R.v }), M.bridged.push(!1)), o;
}
function Dt(r, e, t) {
  if (!r || !r.length) return [];
  const i = [...r].sort((a, n) => a.t - n.t), s = [];
  for (const a of i) {
    if (!Number.isFinite(a.t) || e !== void 0 && a.t < e || t !== void 0 && a.t > t) continue;
    const n = a.v === null || !Number.isFinite(a.v) ? null : a.v, l = s[s.length - 1];
    if (l && l.t === a.t) {
      s[s.length - 1] = { t: a.t, v: n };
      continue;
    }
    s.push({ t: a.t, v: n });
  }
  return s;
}
function hr(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function cr(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function Kt(r) {
  if (!r.length) return "";
  let e = `M ${_(r[0].x)} ${_(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${_(r[t].x)} ${_(r[t].y)}`;
  return e;
}
function dr(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${_(r[0].x)} ${_(r[0].y)}`;
  if (r.length === 2) return Kt(r);
  const e = r.length, t = [], i = [];
  for (let n = 0; n < e - 1; n++)
    t[n] = r[n + 1].x - r[n].x, i[n] = t[n] === 0 ? 0 : (r[n + 1].y - r[n].y) / t[n];
  const s = new Array(e).fill(0);
  s[0] = i[0], s[e - 1] = i[e - 2];
  for (let n = 1; n < e - 1; n++)
    i[n - 1] * i[n] <= 0 ? s[n] = 0 : s[n] = (i[n - 1] + i[n]) / 2;
  for (let n = 0; n < e - 1; n++) {
    if (i[n] === 0) {
      s[n] = 0, s[n + 1] = 0;
      continue;
    }
    const l = s[n] / i[n], o = s[n + 1] / i[n], h = l * l + o * o;
    if (h > 9) {
      const d = 3 / Math.sqrt(h);
      s[n] = d * l * i[n], s[n + 1] = d * o * i[n];
    }
  }
  let a = `M ${_(r[0].x)} ${_(r[0].y)}`;
  for (let n = 0; n < e - 1; n++) {
    const l = r[n].x + t[n] / 3, o = r[n].y + s[n] * t[n] / 3, h = r[n + 1].x - t[n] / 3, d = r[n + 1].y - s[n + 1] * t[n] / 3;
    a += ` C ${_(l)} ${_(o)}, ${_(h)} ${_(d)}, ${_(
      r[n + 1].x
    )} ${_(r[n + 1].y)}`;
  }
  return a;
}
function jt(r, e) {
  return e ? dr(r) : Kt(r);
}
function ur(r, e, t) {
  if (!r.length) return "";
  const i = jt(r, t), s = r[0], a = r[r.length - 1];
  return `${i} L ${_(a.x)} ${_(e)} L ${_(s.x)} ${_(e)} Z`;
}
function mr(r, e) {
  const t = Math.max(1, Math.round(e));
  if (t < 3 || r.length < 3) return r.map((s) => ({ ...s }));
  const i = Math.floor(t / 2);
  return r.map((s, a) => {
    if (s.v === null) return { ...s };
    let n = 0, l = 0;
    for (let o = -i; o <= i; o++) {
      const h = r[a + o];
      !h || h.v === null || (n += h.v, l += 1);
    }
    return l ? { t: s.t, v: Math.round(n / l * 10) / 10 } : { ...s };
  });
}
function pr(r) {
  return r < 5 ? 1 : r < 60 ? 3 : 5;
}
function fr(r, e, t) {
  if (!(e > r) || t < 2) return [];
  const i = [];
  for (let s = 0; s < t; s++)
    i.push(r + (e - r) * s / (t - 1));
  return i;
}
function yr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function gr(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const s = Math.ceil(t.length / e), a = [], n = [];
  let l = 0;
  for (let h = 0; h < t.length; h += s) {
    if (!a.length) {
      a.push(t[h]), l = h;
      continue;
    }
    a.push(t[h]), n.push(i.slice(l + 1, h + 1).some(Boolean)), l = h;
  }
  const o = t.length - 1;
  return l !== o && (a.push(t[o]), n.push(i.slice(l + 1, o + 1).some(Boolean))), { samples: a, bridged: n };
}
const br = 320, wr = 112, _r = 0.3, vr = 0.44;
let $r = 0;
class xr extends I {
  constructor() {
    super(...arguments), this.accentColor = "#4FD1A5", this.humidityColor = "#8B86D6", this.setpoint = null, this.setpointUnit = "°C", this.hiddenSeries = [], this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showPoints = !1, this.showGrid = !1, this.curve = "smooth", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.showTemperatureArea = !0, this.showHumidityArea = !0, this.cornerRadius = 26, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte",
      now: "Jetzt",
      setpoint: "Soll"
    }, this.uid = `rcc-chart-${++$r}`, this.width = 0, this.height = 0;
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
      gapMode: { attribute: !1 },
      maxGapMinutes: { attribute: !1 },
      gapStyle: { attribute: !1 },
      humidityLineStyle: { attribute: !1 },
      showTemperatureArea: { attribute: !1 },
      showHumidityArea: { attribute: !1 },
      cornerRadius: { attribute: !1 },
      language: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = Ne`
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
    const i = Math.round(e), s = Math.round(t);
    i === this.width && s === this.height || (this.width = i, this.height = s, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(e, t) {
    this.applySize(e, t);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : br,
      height: this.height > 20 ? this.height : wr
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
    if (e < 40 || t < 34) return m;
    const i = f`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, s = f`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.hasData ? p`<div class="wrap">${this.renderChart(e, t)}</div>` : this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(s, this.labels.loading) : this.stateView(s, this.labels.empty, this.labels.emptyHint);
  }
  renderChart(e, t) {
    const i = t, s = i >= 62, a = s ? 20 : 2, n = 6, l = i - a, o = Math.max(6, l - n), h = 1, d = e - 1, c = Math.max(1, this.end - this.start), b = ue([this.start, this.end], [h, d]), v = s ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, x = ue([this.start, this.end], [h + v, d - v]), D = i - 6, M = n, R = n + o * _r, g = n + o * vr, H = l, Y = this.temperatureVisible ? this.temperature ?? [] : [], U = this.humidityVisible ? this.humidity ?? [] : [], Ve = Y.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), qt = U.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), V = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, Zt = V !== null ? [...Ve, V] : Ve, be = Mt(Zt), we = Mt(qt), _e = be ? Ht(be[0], be[1], { minSpan: 0.8, padding: 0.18 }) : null, ve = we ? Ht(we[0], we[1], { minSpan: 6, padding: 0.2 }) : null, A = _e ? ue(_e, [H, g]) : null, F = ve ? ue(ve, [R, M]) : null, oe = Dt(Y, this.start, this.end), Ge = Dt(U, this.start, this.end), Ke = {
      rangeMs: c,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, je = _e ? Tt(oe, Ke) : [], We = ve ? Tt(Ge, Ke) : [], Yt = Math.max(1, je.length + We.length), Xt = Math.max(60, Math.floor(1200 / Yt)), le = this.curve === "smooth", qe = (u) => u.map((y) => {
      const k = le ? mr(y.samples, pr(y.samples.length)) : y.samples;
      return gr({ samples: k, bridged: y.bridged }, Xt);
    }), he = qe(je), $e = qe(We), Ze = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const y = n + o * u / 3;
        Ze.push(f`<line class="grid-line" x1=${h} x2=${d} y1=${y} y2=${y} />`);
      }
    const Ye = s ? Math.min(3, yr(e)) : 0, Xe = Ye >= 2 ? fr(this.start, this.end, Math.max(2, Ye)) : [], Jt = Xe.map((u, y) => {
      const k = y === Xe.length - 1, w = y === 0 ? "start" : k ? "end" : "middle";
      return f`<text class="axis-label" x=${x(u)} y=${D} text-anchor=${w}>
        ${this.formatAxisLabel(u, k)}
      </text>`;
    }), Je = (u, y) => cr(u, b, y), Qt = (u, y) => (this.gapStyle === "dashed" ? hr(u) : [u.samples]).filter((w) => w.length > 1).map((w) => jt(Je(w, y), le)).filter((w) => w.length > 0), xe = (u, y, k, w = {}) => Qt(u, y).map((at) => {
      const Ae = [
        w.color ? `stroke:${w.color}` : `stroke:${k}`,
        w.width ? `stroke-width:${w.width}` : "",
        w.dashed ? "stroke-dasharray:0.1 5.5" : ""
      ].filter(Boolean).join(";");
      return f`<path class="series-line" d=${at} style=${Ae}></path>`;
    }), ei = le ? he.flatMap(
      (u) => xe(u, A, `url(#${this.uid}-temp-stroke)`)
    ) : he.flatMap(
      (u) => xe(u, A, this.accentColor, { color: this.accentColor })
    ), Qe = (u, y, k) => u.filter((w) => w.samples.length > 1).map((w) => ur(Je(w.samples, y), k, le)).join(" "), et = A && this.showTemperatureArea ? Qe(he, A, l) : "", ti = et ? [f`<path class="series-area" d=${et} style="fill:url(#${this.uid}-temp-fill)" />`] : [], tt = F && this.showHumidityArea ? Qe($e, F, R) : "", ii = tt ? [
      f`<path class="series-area" d=${tt} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], it = this.humidityLineStyle === "dotted", ri = $e.flatMap(
      (u) => xe(u, F, this.humidityColor, {
        color: this.humidityColor,
        dashed: it,
        width: it ? 2.2 : 1.9
      })
    ), rt = [];
    if (this.showPoints) {
      const u = (y, k, w) => {
        const X = y.filter((ce) => ce.v !== null);
        if (!X.length) return;
        const Ae = Math.max(1, Math.ceil(X.length / 24));
        X.forEach((ce, ot) => {
          if (ot % Ae !== 0 && ot !== X.length - 1) return;
          const oi = ce.v;
          rt.push(
            f`<circle class="point" r="1.7" cx=${b(ce.t)} cy=${k(oi)} style="stroke:${w}" />`
          );
        });
      };
      A && he.forEach((y) => u(y.samples, A, this.accentColor)), F && $e.forEach(
        (y) => u(y.samples, F, this.humidityColor)
      );
    }
    const O = V !== null && A ? A(V) : null, si = O !== null && Number.isFinite(O) && O >= g - 0.5 && O <= H + 0.5, ni = oe.find((u) => u.v !== null)?.v ?? null, ai = [...oe].reverse().find((u) => u.v !== null)?.v ?? null, st = (u) => u === null || V === null ? 0 : Math.abs(u - V), nt = st(ai) >= st(ni), Se = [...oe].reverse().find((u) => u.v !== null), ke = [...Ge].reverse().find((u) => u.v !== null);
    return f`<svg
      width=${e}
      height=${i}
      viewBox="0 0 ${e} ${i}"
      role="img"
      aria-label=${this.labels.aria}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-stroke`} x1="0" y1=${g} x2="0" y2=${H} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.accentColor} stop-opacity="1" />
          <stop offset="1" stop-color=${this.accentColor} stop-opacity="1" />
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${g} x2="0" y2=${H} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.accentColor} stop-opacity="0.22" />
          <stop offset="0.55" stop-color=${this.accentColor} stop-opacity="0.08" />
          <stop offset="1" stop-color=${this.accentColor} stop-opacity="0" />
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${M} x2="0" y2=${R} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.humidityColor} stop-opacity="0.2" />
          <stop offset="0.6" stop-color=${this.humidityColor} stop-opacity="0.07" />
          <stop offset="1" stop-color=${this.humidityColor} stop-opacity="0" />
        </linearGradient>
      </defs>
      ${Ze}
      ${ii}
      ${ti}
      ${si ? f`<line
            class="setpoint-line"
            x1=${h}
            x2=${d}
            y1=${O}
            y2=${O}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${nt ? d : h}
            y=${O - 5}
            text-anchor=${nt ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : m}
      <line class="baseline" x1=${h} x2=${d} y1=${l} y2=${l} />
      ${ri} ${ei} ${rt}
      ${ke && F ? f`<circle
            class="end-dot"
            r="2.6"
            cx=${b(ke.t)}
            cy=${F(ke.v)}
            style="fill:${this.humidityColor}"
          />` : m}
      ${Se && A ? f`<circle
            class="end-dot"
            r="2.8"
            cx=${b(Se.t)}
            cy=${A(Se.v)}
            style="fill:${this.accentColor}"
          />` : m}
      ${Jt}
    </svg>`;
  }
  /**
   * Axis caption: weekday plus time for the first ticks, plain "now" for the
   * right-most one. "Sa 05:40" is readable at a glance; "05:40" alone is not.
   */
  formatAxisLabel(e, t) {
    return t ? this.labels.now : this.formatDayTime(e);
  }
  formatDayTime(e) {
    const t = new Date(e), i = this.language || "en";
    let s, a;
    try {
      s = new Intl.DateTimeFormat(i, { weekday: "short" }).format(t).replace(/[.,]/g, "").trim(), a = new Intl.DateTimeFormat(i, {
        hour: "2-digit",
        minute: "2-digit"
      }).format(t);
    } catch {
      s = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][t.getDay()], a = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    }
    return s ? `${s} ${a}` : a;
  }
}
const Rt = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Rt) && customElements.define(Rt, xr);
const He = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Sr = {
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
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
function kr(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class Wt extends I {
  constructor() {
    super(...arguments), this._config = { type: `custom:${T}` }, this._selectorsReady = !1, this._drafts = {}, this.openSections = /* @__PURE__ */ new Set(["general", "sensors"]), this.lastManualHeight = 240;
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
    this._drafts = {}, this._config = e && typeof e == "object" ? { ...e, type: e.type ?? `custom:${T}` } : { type: `custom:${T}` };
  }
  get config() {
    return this._config;
  }
  get text() {
    const e = ze(this.hass?.locale?.language ?? this.hass?.language);
    return Sr[e];
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
    t.type = this._config.type ?? `custom:${T}`, this._config = t, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
  rawBoolean(e) {
    return $(this._config[e]);
  }
  showFlag(e, t) {
    return this.rawBoolean(e) ?? !!E(this._config[t]);
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
    const i = this._config[e], s = typeof i == "number" ? i : Number(i);
    return Number.isFinite(s) ? s : t;
  }
  stringValue(e, t = "") {
    return Z(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = Z(this._config[e]) ?? t;
    return Le(i) ?? Le(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: Wi(t) });
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
        const i = kr(t);
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
    const s = this.openSections.has(e);
    return p`<details class="section" ?open=${s} @toggle=${(a) => this.onToggle(e, a)}>
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
    return p`<div class="hint">${e.colorsHelper}</div>
      ${this.renderColor({
      key: "accent_color",
      label: e.accentColor,
      fallback: K.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: e.secondaryColor,
      fallback: K.humidity
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = E(this._config.window_entity);
    return p`${this.renderSwitch({
      key: "show_window",
      label: e.showWindow,
      value: t,
      onChange: (s) => this.patch({ show_window: s, ...s ? {} : { window_entity: void 0 } })
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
      onChange: (s) => {
        const a = String(s ?? "").split(",").map((n) => n.trim().toLowerCase()).filter(Boolean);
        this.patch({ window_open_states: a.length ? a : void 0 });
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
      warning: t && !E(this._config.motion_entity) ? e.missingEntity : void 0
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
      warning: t && !E(this._config.climate_entity) ? e.missingEntity : void 0
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
      fallback: He.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: He.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: He.off,
      disabled: !t
    })}`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), s = t || i, a = [3, 6, 12, 24, 48].map((n) => ({ value: String(n), label: `${n} h` }));
    return p`${this.renderSwitch({
      key: "show_temperature_chart",
      label: e.showTemperatureChart,
      value: t,
      onChange: (n) => this.patch({ show_temperature_chart: n })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: e.showHumidityChart,
      value: i,
      onChange: (n) => this.patch({ show_humidity_chart: n })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: e.hours,
      selector: { select: { mode: "dropdown", options: a } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !s,
      onChange: (n) => {
        const l = Number(n);
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
      disabled: !s
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
      disabled: !s
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
      onChange: (n) => this.patch({ chart_humidity_line_style: String(n) })
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
      disabled: !s,
      helper: e.gapHelper,
      onChange: (n) => this.patch({ chart_gap_mode: String(n) })
    })}
      ${this.renderNumber({
      key: "chart_max_gap_minutes",
      label: e.maxGap,
      min: 5,
      max: 720,
      step: 5,
      unit: "min",
      fallback: 120,
      disabled: !s || this.stringValue("chart_gap_mode", "connect") === "break"
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
      disabled: !s || this.stringValue("chart_gap_mode", "connect") === "break"
    })}
      ${this.renderSwitch({
      key: "chart_show_grid",
      label: e.grid,
      value: this.rawBoolean("chart_show_grid") ?? !1,
      disabled: !s
    })}
      ${this.renderSwitch({
      key: "chart_show_points",
      label: e.points,
      value: this.rawBoolean("chart_show_points") ?? !1,
      disabled: !s
    })}`;
  }
  static {
    this.styles = Ne`
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
typeof customElements < "u" && !customElements.get(j) && customElements.define(j, Wt);
const Te = "#fbbf24", De = "#34d399", zt = "var(--rcc-neutral)";
class Ar extends I {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._hiddenSeries = [], this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new sr(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    const t = Ni(e);
    this._config = t, this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
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
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), s = (c) => i.find(c)?.entity_id, a = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "temperature"
    ), n = s(
      (c) => c.entity_id.startsWith("sensor.") && c.attributes?.device_class === "humidity"
    ), l = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(c.attributes?.device_class))
    ), o = s(
      (c) => c.entity_id.startsWith("binary_sensor.") && c.attributes?.device_class === "motion"
    ), h = s((c) => c.entity_id.startsWith("climate.")), d = { type: `custom:${T}` };
    return a && (d.temperature_entity = a), n && (d.humidity_entity = n), l && (d.window_entity = l), o && (d.motion_entity = o), h && (d.climate_entity = h), d;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(Ee(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? Ee(this._config) : 230;
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
    return Vi(e);
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
    const i = this._config, s = this.hass;
    if (!i || !s || !e) return;
    const a = this.historyEntityIds(i);
    if (!a.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const n = Date.now(), l = n - i.chart.hours * 60 * 60 * 1e3;
    try {
      const o = await this.repository.load(s, a, i.chart.hours, n);
      if (this.historyKey !== e) return;
      this._history = o, this._historyWindow = { start: l, end: n }, this.historyFetchedAt = Date.now(), t && this.requestUpdate();
    } catch (o) {
      if (this.historyKey !== e) return;
      this._historyError = o instanceof Error ? o.message : String(o), this._history = {};
    } finally {
      this.historyKey === e && (this._historyLoading = !1);
    }
  }
  updateDensity(e) {
    const t = e > 0 ? e : this._config ? this._config.height ?? Ee(this._config) : 0;
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
      const i = this._config ? Bi(this._config) : [];
      return i.length ? i.some((s) => t.states[s] !== this.hass?.states[s]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return p`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: s, humidity: a } = e.typography, n = [
      `--rcc-radius:${e.borderRadius}px`,
      e.height ? `--rcc-height:${e.height}px` : "",
      `--rcc-chart-height:${e.chart.height}px`,
      `--rcc-temp-size:${s.fontSize}px`,
      `--rcc-hum-size:${a.fontSize}px`,
      `--rcc-accent:${e.accentColor}`,
      `--rcc-secondary:${e.humidity.color}`,
      s.fontFamily ? `--rcc-temp-font:${s.fontFamily}` : "",
      a.fontFamily ? `--rcc-hum-font:${a.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return p`<div
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"}"
      style="${n}"
      role="group"
      aria-label="${this.cellAriaLabel(e, t)}"
    >
      ${this.renderHeader(e, t)} ${this.renderReadings(e, t)}
      ${this.renderClimateRow(e, t)} ${this.renderChart(e, t)}
      ${this.hasAnyEntity(e) ? m : this.renderEmpty(t)}
    </div>`;
  }
  hasAnyEntity(e) {
    return !!(e.temperatureEntity || e.humidityEntity);
  }
  cellAriaLabel(e, t) {
    return `${xt(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return p`<div class="empty-state" role="status">
      ${C.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = xt(e, this.hass), s = Yi(this.hass, e), a = qi(this.hass, e), n = e.motion.enabled && e.motion.showLastChanged && s.status !== "active" && s.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${n ? p`<div class="subtle">
              ${t.t("quietSince")}
              ${Ki(s.sinceMs, this._now, {
      justNow: t.t("justNow"),
      minutes: t.t("minutesShort"),
      hours: t.t("hoursShort"),
      days: t.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${e.motion.enabled ? this.renderMotionBadge(s, t) : m}
        ${e.window.enabled ? this.renderWindowBadge(a, t) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(e) {
    return this._haIconReady ? p`<ha-icon .icon=${e.icon}></ha-icon>` : C.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", s = i ? De : zt, a = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${s};--badge-bg:${de(
      i ? De : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${de(i ? De : "#64748b", i ? 0.45 : 0.22)}"
      title="${a}"
      aria-label="${a}"
      role="img"
      >${C.motion()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", s = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? Te : zt};--badge-bg:${de(
      i ? Te : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${de(i ? Te : "#64748b", i ? 0.5 : 0.22)}"
      title="${s}"
      aria-label="${s}"
      role="img"
      >${i ? C.windowOpen() : C.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(e, t) {
    if (!e.temperatureEntity && !e.humidityEntity) return m;
    const i = this.language(), s = kt(this.hass, e.temperatureEntity, "temperature"), a = kt(this.hass, e.humidityEntity, "humidity"), n = !!e.temperatureEntity, l = !!e.humidityEntity, o = e.showSeriesLabels;
    return p`<div class="readings ${o ? "" : "no-labels"}">
      ${o ? p`<div class="reading-labels" aria-hidden="true">
        ${n ? p`<span
              class="series-label ${this._hiddenSeries.includes("temperature") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.accentColor}"></span
              >${t.t("temperature")}</span
            >` : m}
        ${l ? p`<span
              class="series-label ${this._hiddenSeries.includes("humidity") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.humidity.color}"></span
              >${t.t("humidity")}</span
            >` : m}
        </div>` : m}
      <div class="reading-values">
        ${n ? this.renderReading({
      key: "temperature",
      className: "temperature",
      value: s.value,
      unit: s.unit,
      decimals: e.temperatureDecimals,
      language: i,
      ariaLabel: `${t.t("temperature")}: ${this.sensorAria(
        s,
        i,
        e.temperatureDecimals,
        t
      )}`,
      color: e.accentColor,
      toggleable: e.chart.showTemperature
    }) : m}
        ${l ? this.renderReading({
      key: "humidity",
      className: "humidity",
      value: a.value,
      unit: a.unit,
      decimals: e.humidityDecimals,
      language: i,
      ariaLabel: `${t.t("humidity")}: ${this.sensorAria(
        a,
        i,
        e.humidityDecimals,
        t
      )}`,
      color: e.humidity.color,
      toggleable: e.chart.showHumidity
    }) : m}
      </div>
    </div>`;
  }
  /** One measured value; the accent dot of the caption row marks its series. */
  renderReading(e) {
    const t = this._hiddenSeries.includes(e.key), i = e.value !== null ? Me(e.value, e.language, e.decimals) : "–", s = p`<span class="reading-value">${i}</span
      ><span class="reading-unit">${e.unit}</span>`;
    return e.toggleable ? p`<button
      type="button"
      class="reading ${e.className} ${t ? "is-hidden" : ""}"
      style="--series-color:${e.color}"
      aria-pressed=${!t}
      aria-label="${e.ariaLabel} – ${t ? "Serie eingeblendet" : "Serie ausgeblendet"}"
      title="${t ? "Serie einblenden" : "Serie ausblenden"}"
      @click=${() => this.toggleSeries(e.key)}
    >
      <span class="reading-number">${s}</span>
    </button>` : p`<span class="reading ${e.className}" style="--series-color:${e.color}">
        <span class="reading-number" role="text" aria-label="${e.ariaLabel}">${s}</span>
      </span>`;
  }
  toggleSeries(e) {
    this._hiddenSeries = this._hiddenSeries.includes(e) ? this._hiddenSeries.filter((t) => t !== e) : [...this._hiddenSeries, e];
  }
  sensorAria(e, t, i, s) {
    return e.value === null ? s.t("unavailable") : `${Me(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  renderClimateRow(e, t) {
    if (!Gt(e)) return m;
    const i = At(this.hass, e, t), s = e.thermostat.showSetpoint && i.setpoint !== null, a = e.thermostat.showStatus, n = e.thermostat.showMode && !!i.modeLabel;
    if (!s && !a && !n) return m;
    const l = Ji(i, e), o = this.language(), h = i.setpoint !== null ? `${Me(i.setpoint, o, e.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="climate-row" role="status" aria-label="${this.thermostatAria(i)}">
      ${a ? p`<span class="flame status-${i.status}" style="color:${l}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : m}
      <span class="climate-state">${n ? i.modeLabel : i.label}</span>
      ${s ? p`<span class="climate-sep" aria-hidden="true">·</span>
            <span class="climate-setpoint"
              ><span class="climate-setpoint-label">${t.t("setpoint")}</span> ${h}</span
            >` : m}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(e) {
    if (e.status === "action")
      switch (e.action) {
        case "cooling":
          return C.snowflake();
        case "fan":
          return C.fan();
        case "drying":
          return C.water();
        default:
          return C.flame();
      }
    return C.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(e) {
    return e.label;
  }
  renderChart(e, t) {
    if (!Vt(e)) return m;
    const i = e.chart.showTemperature && e.temperatureEntity ? this._history[e.temperatureEntity] : void 0, s = e.chart.showHumidity && e.humidityEntity ? this._history[e.humidityEntity] : void 0, a = this.language(), n = e.thermostat.enabled ? At(this.hass, e, t) : void 0, l = {
      empty: t.t("noHistory"),
      emptyHint: t.t("noHistoryHint"),
      loading: t.t("loadingHistory"),
      error: t.t("historyError"),
      aria: t.chartAria(e.chart.hours),
      temperature: t.t("temperature"),
      humidity: t.t("humidity"),
      now: t.t("now"),
      setpoint: t.t("setpoint")
    };
    return p`<div class="chart-slot">
      <room-climate-chart
        .temperature=${i}
        .humidity=${s}
        .accentColor=${e.accentColor}
        .humidityColor=${e.humidity.color}
        .setpoint=${n?.setpoint ?? null}
        .setpointUnit=${n?.unit ?? "°C"}
        .hiddenSeries=${this._hiddenSeries}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .curve=${e.chart.curve}
        .gapMode=${e.chart.gapMode}
        .maxGapMinutes=${e.chart.maxGapMinutes}
        .gapStyle=${e.chart.gapStyle}
        .humidityLineStyle=${e.chart.humidityLineStyle}
        .showTemperatureArea=${e.chart.showTemperatureGradient}
        .showHumidityArea=${e.chart.showHumidityGradient}
        .cornerRadius=${e.borderRadius}
        .language=${a}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${l}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Ne`
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
  `%c ROOM-CLIMATE-CARD %c v${ci} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(T) || customElements.define(T, Ar);
customElements.get(j) || customElements.define(j, Wt);
const Lt = window.customCards = window.customCards ?? [];
Lt.some((r) => r.type === T) || Lt.push({
  type: T,
  name: li,
  description: hi,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  T as CARD_TAG,
  ci as CARD_VERSION,
  Ar as RoomClimateCard,
  Wt as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
