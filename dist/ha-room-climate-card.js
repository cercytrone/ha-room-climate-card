const R = "room-climate-card", re = "room-climate-card-editor", vi = "Room Climate Card", $i = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", Si = "2.5.0";
const ue = globalThis, Be = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ue = /* @__PURE__ */ Symbol(), pt = /* @__PURE__ */ new WeakMap();
let jt = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== Ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Be && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = pt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xi = (r) => new jt(typeof r == "string" ? r : r + "", void 0, Ue), Pe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, a) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new jt(t, r, Ue);
}, ki = (r, e) => {
  if (Be) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = ue.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, ft = Be ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return xi(t);
})(r) : r;
const { is: Ai, defineProperty: Ci, getOwnPropertyDescriptor: Ei, getOwnPropertyNames: Mi, getOwnPropertySymbols: Hi, getPrototypeOf: Ti } = Object, fe = globalThis, yt = fe.trustedTypes, Di = yt ? yt.emptyScript : "", Li = fe.reactiveElementPolyfillSupport, ee = (r, e) => r, Oe = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Di : null;
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
} }, Wt = (r, e) => !Ai(r, e), gt = { attribute: !0, type: String, converter: Oe, reflect: !1, useDefault: !1, hasChanged: Wt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), fe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let G = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = gt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && Ci(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: a } = Ei(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: n, set(s) {
      const o = n?.call(this);
      a?.call(this, s), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? gt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = Ti(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const t = this.properties, i = [...Mi(t), ...Hi(t)];
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
      for (const n of i) t.unshift(ft(n));
    } else e !== void 0 && t.push(ft(e));
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
    return ki(e, this.constructor.elementStyles), e;
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
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : Oe).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = i.getPropertyOptions(n), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : Oe;
      this._$Em = n;
      const o = s.fromAttribute(t, a.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, a) {
    if (e !== void 0) {
      const s = this.constructor;
      if (n === !1 && (a = this[e]), i ??= s.getPropertyOptions(e), !((i.hasChanged ?? Wt)(a, t) || i.useDefault && i.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(s._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: a }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, a] of this._$Ep) this[n] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, a] of i) {
        const { wrapped: s } = a, o = this[n];
        s !== !0 || this._$AL.has(n) || o === void 0 || this.C(n, void 0, a, o);
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
G.elementStyles = [], G.shadowRootOptions = { mode: "open" }, G[ee("elementProperties")] = /* @__PURE__ */ new Map(), G[ee("finalized")] = /* @__PURE__ */ new Map(), Li?.({ ReactiveElement: G }), (fe.reactiveElementVersions ??= []).push("2.1.2");
const Ve = globalThis, bt = (r) => r, pe = Ve.trustedTypes, wt = pe ? pe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Zt = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, Yt = "?" + F, Ri = `<${Yt}>`, V = document, ne = () => V.createComment(""), se = (r) => r === null || typeof r != "object" && typeof r != "function", Ke = Array.isArray, zi = (r) => Ke(r) || typeof r?.[Symbol.iterator] == "function", Te = `[ 	
\f\r]`, J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, vt = />/g, B = RegExp(`>|${Te}(?:([^\\s"'>=/]+)(${Te}*=${Te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $t = /'/g, St = /"/g, qt = /^(?:script|style|textarea|title)$/i, Xt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = Xt(1), b = Xt(2), W = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), xt = /* @__PURE__ */ new WeakMap(), U = V.createTreeWalker(V, 129);
function Jt(r, e) {
  if (!Ke(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wt !== void 0 ? wt.createHTML(e) : e;
}
const Oi = (r, e) => {
  const t = r.length - 1, i = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = J;
  for (let o = 0; o < t; o++) {
    const l = r[o];
    let h, c, d = -1, y = 0;
    for (; y < l.length && (s.lastIndex = y, c = s.exec(l), c !== null); ) y = s.lastIndex, s === J ? c[1] === "!--" ? s = _t : c[1] !== void 0 ? s = vt : c[2] !== void 0 ? (qt.test(c[2]) && (n = RegExp("</" + c[2], "g")), s = B) : c[3] !== void 0 && (s = B) : s === B ? c[0] === ">" ? (s = n ?? J, d = -1) : c[1] === void 0 ? d = -2 : (d = s.lastIndex - c[2].length, h = c[1], s = c[3] === void 0 ? B : c[3] === '"' ? St : $t) : s === St || s === $t ? s = B : s === _t || s === vt ? s = J : (s = B, n = void 0);
    const f = s === B && r[o + 1].startsWith("/>") ? " " : "";
    a += s === J ? l + Ri : d >= 0 ? (i.push(h), l.slice(0, d) + Zt + l.slice(d) + F + f) : l + F + (d === -2 ? o : f);
  }
  return [Jt(r, a + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class ae {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let a = 0, s = 0;
    const o = e.length - 1, l = this.parts, [h, c] = Oi(e, t);
    if (this.el = ae.createElement(h, i), U.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = U.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Zt)) {
          const y = c[s++], f = n.getAttribute(d).split(F), w = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: a, name: w[2], strings: f, ctor: w[1] === "." ? Ni : w[1] === "?" ? Ii : w[1] === "@" ? Bi : ye }), n.removeAttribute(d);
        } else d.startsWith(F) && (l.push({ type: 6, index: a }), n.removeAttribute(d));
        if (qt.test(n.tagName)) {
          const d = n.textContent.split(F), y = d.length - 1;
          if (y > 0) {
            n.textContent = pe ? pe.emptyScript : "";
            for (let f = 0; f < y; f++) n.append(d[f], ne()), U.nextNode(), l.push({ type: 2, index: ++a });
            n.append(d[y], ne());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Yt) l.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(F, d + 1)) !== -1; ) l.push({ type: 7, index: a }), d += F.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = V.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Z(r, e, t = r, i) {
  if (e === W) return e;
  let n = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const a = se(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== a && (n?._$AO?.(!1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = n : t._$Cl = n), n !== void 0 && (e = Z(r, n._$AS(r, e.values), n, i)), e;
}
class Fi {
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
    U.currentNode = n;
    let a = U.nextNode(), s = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let h;
        l.type === 2 ? h = new oe(a, a.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (h = new Ui(a, this, e)), this._$AV.push(h), l = i[++o];
      }
      s !== l?.index && (a = U.nextNode(), s++);
    }
    return U.currentNode = V, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class oe {
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
    e = Z(this, e, t), se(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== W && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : zi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && se(this._$AH) ? this._$AA.nextSibling.data = e : this.T(V.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = ae.createElement(Jt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(t);
    else {
      const a = new Fi(n, this), s = a.u(this.options);
      a.p(t), this.T(s), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = xt.get(e.strings);
    return t === void 0 && xt.set(e.strings, t = new ae(e)), t;
  }
  k(e) {
    Ke(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const a of e) n === t.length ? t.push(i = new oe(this.O(ne()), this.O(ne()), this, this.options)) : i = t[n], i._$AI(a), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = bt(e).nextSibling;
      bt(e).remove(), e = i;
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
  constructor(e, t, i, n, a) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, n) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = Z(this, e, t, 0), s = !se(e) || e !== this._$AH && e !== W, s && (this._$AH = e);
    else {
      const o = e;
      let l, h;
      for (e = a[0], l = 0; l < a.length - 1; l++) h = Z(this, o[i + l], t, l), h === W && (h = this._$AH[l]), s ||= !se(h) || h !== this._$AH[l], h === m ? e = m : e !== m && (e += (h ?? "") + a[l + 1]), this._$AH[l] = h;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ni extends ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Ii extends ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Bi extends ye {
  constructor(e, t, i, n, a) {
    super(e, t, i, n, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Z(this, e, t, 0) ?? m) === W) return;
    const i = this._$AH, n = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ui {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Z(this, e);
  }
}
const Pi = Ve.litHtmlPolyfillSupport;
Pi?.(ae, oe), (Ve.litHtmlVersions ??= []).push("3.3.3");
const Vi = (r, e, t) => {
  const i = t?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = t?.renderBefore ?? null;
    i._$litPart$ = n = new oe(e.insertBefore(ne(), a), a, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
const Ge = globalThis;
class P extends G {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Vi(t, this.renderRoot, this.renderOptions);
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
P._$litElement$ = !0, P.finalized = !0, Ge.litElementHydrateSupport?.({ LitElement: P });
const Ki = Ge.litElementPolyfillSupport;
Ki?.({ LitElement: P });
(Ge.litElementVersions ??= []).push("4.2.2");
const $ = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function ce(r, e) {
  const [t, i] = r, [n, a] = e, s = i - t;
  if (!Number.isFinite(s) || s === 0) {
    const o = (n + a) / 2;
    return () => o;
  }
  return (o) => n + (o - t) / s * (a - n);
}
function kt(r) {
  let e = 1 / 0, t = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < e && (e = i), i > t && (t = i));
  return !Number.isFinite(e) || !Number.isFinite(t) ? null : [e, t];
}
function At(r, e, t = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = t;
  let a = r, s = e;
  if (s - a < i) {
    const l = (s + a) / 2;
    a = l - i / 2, s = l + i / 2;
  }
  const o = (s - a) * n;
  return [a - o, s + o];
}
function Qt(r) {
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
function Gi(r, e, t = {}) {
  const i = Qt(r), n = i > 0 ? i * 2.5 : 0, a = t.minMs ?? Math.max(e / 40, 300 * 1e3), s = t.maxMs ?? Math.max(a, e / 3);
  return Math.min(s, Math.max(n, a));
}
const ji = 1e3, Wi = 8;
function Zi(r, e, t, i) {
  const n = t.t - e.t, a = e.v, s = t.v, o = Math.min(
    Wi,
    Math.max(1, Math.round(n / Math.max(i / 2, 6e4)))
  );
  for (let l = 1; l < o; l++) {
    const h = l / o;
    r.samples.push({
      t: Math.round(e.t + n * h),
      v: a + (s - a) * h
    }), r.bridged.push(!0);
  }
}
function Ct(r, e) {
  const { rangeMs: t, start: i, end: n } = e, a = e.gapMode ?? "connect", s = Gi(r, t), o = e.maxGapMs ?? t / 4, l = [];
  let h = null, c = null, d = null, y = !1, f = !1;
  const w = () => {
    h && h.samples.length && l.push(h), h = null, c = null, d = null;
  }, K = (g) => {
    if (!h || !c || g === null || g <= c.t) return;
    const C = { t: g, v: c.v };
    h.samples.push(C), h.bridged.push(!1), c = C;
  };
  for (const g of r) {
    if (g.v === null || !Number.isFinite(g.v)) {
      c || (y = !0), d = d ?? g.t, f = !0;
      continue;
    }
    if (f = !1, !c || !h) {
      h = { samples: [g], bridged: [] }, c = g, d = null;
      continue;
    }
    const C = g.t - c.t;
    if (C <= s && d === null) {
      h.samples.push(g), h.bridged.push(!1), c = g;
      continue;
    }
    if (!(d !== null)) {
      const _e = Math.min(ji, C / 2);
      h.samples.push({ t: g.t - _e, v: c.v }), h.bridged.push(!1), h.samples.push(g), h.bridged.push(!1), c = g;
      continue;
    }
    const E = Math.max(c.t, d), we = g.t - E;
    if (a === "connect" && we <= o) {
      E > c.t && (h.samples.push({ t: E, v: c.v }), h.bridged.push(!1), c = { t: E, v: c.v }), Zi(h, c, g, s), h.samples.push(g), h.bridged.push(!0), c = g, d = null;
      continue;
    }
    K(d), w(), h = { samples: [g], bridged: [] }, c = g;
  }
  if (f && K(d), w(), !l.length) return l;
  const T = l[0];
  if (!y && i !== void 0 && T.samples[0].t > i && (T.samples.unshift({ t: i, v: T.samples[0].v }), T.bridged.unshift(!1)), f)
    return l;
  const A = l[l.length - 1], z = A.samples[A.samples.length - 1];
  return n !== void 0 && z.t < n && (A.samples.push({ t: n, v: z.v }), A.bridged.push(!1)), l;
}
function Et(r, e, t) {
  if (!r || !r.length) return [];
  const i = [...r].sort((s, o) => s.t - o.t), n = [];
  let a = null;
  for (const s of i) {
    if (!Number.isFinite(s.t) || t !== void 0 && s.t > t) continue;
    const o = s.v === null || !Number.isFinite(s.v) ? null : s.v;
    if (e !== void 0 && s.t < e) {
      a = { t: e, v: o };
      continue;
    }
    const l = n[n.length - 1];
    if (l && l.t === s.t) {
      n[n.length - 1] = { t: s.t, v: o };
      continue;
    }
    n.push({ t: s.t, v: o });
  }
  return a && e !== void 0 && (!n.length || n[0].t > e) && n.unshift(a), n;
}
function Yi(r) {
  if (!r.bridged.some(Boolean)) return [r.samples];
  const e = [];
  let t = [r.samples[0]];
  for (let i = 1; i < r.samples.length; i++)
    t.push(r.samples[i]), r.bridged[i] && (e.push(t), t = [r.samples[i]]);
  return t.length > 1 && e.push(t), e;
}
function qi(r, e, t) {
  return r.map((i) => ({ x: e(i.t), y: t(i.v) }));
}
function ei(r) {
  if (!r.length) return "";
  let e = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let t = 1; t < r.length; t++)
    e += ` L ${$(r[t].x)} ${$(r[t].y)}`;
  return e;
}
function Xi(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${$(r[0].x)} ${$(r[0].y)}`;
  if (r.length === 2) return ei(r);
  const e = r.length, t = [], i = [];
  for (let s = 0; s < e - 1; s++)
    t[s] = r[s + 1].x - r[s].x, i[s] = t[s] === 0 ? 0 : (r[s + 1].y - r[s].y) / t[s];
  const n = new Array(e).fill(0);
  n[0] = i[0], n[e - 1] = i[e - 2];
  for (let s = 1; s < e - 1; s++)
    i[s - 1] * i[s] <= 0 ? n[s] = 0 : n[s] = (i[s - 1] + i[s]) / 2;
  for (let s = 0; s < e - 1; s++) {
    if (i[s] === 0) {
      n[s] = 0, n[s + 1] = 0;
      continue;
    }
    const o = n[s] / i[s], l = n[s + 1] / i[s], h = o * o + l * l;
    if (h > 9) {
      const c = 3 / Math.sqrt(h);
      n[s] = c * o * i[s], n[s + 1] = c * l * i[s];
    }
  }
  let a = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let s = 0; s < e - 1; s++) {
    const o = r[s].x + t[s] / 3, l = r[s].y + n[s] * t[s] / 3, h = r[s + 1].x - t[s] / 3, c = r[s + 1].y - n[s + 1] * t[s] / 3;
    a += ` C ${$(o)} ${$(l)}, ${$(h)} ${$(c)}, ${$(
      r[s + 1].x
    )} ${$(r[s + 1].y)}`;
  }
  return a;
}
function ti(r, e) {
  return e ? Xi(r) : ei(r);
}
function Ji(r, e, t) {
  if (!r.length) return "";
  const i = ti(r, t), n = r[0], a = r[r.length - 1];
  return `${i} L ${$(a.x)} ${$(e)} L ${$(n.x)} ${$(e)} Z`;
}
function Qi(r, e, t = {}) {
  const i = Math.max(1, Math.round(e));
  if (i < 3 || r.length < 3) return r.map((o) => ({ ...o }));
  const n = Math.floor(i / 2), a = t.maxDeltaMs ?? 1 / 0, s = Math.min(
    2,
    Math.max(1, r.reduce((o, l) => Math.max(o, tr(l.v)), 0))
  );
  return r.map((o, l) => {
    if (o.v === null) return { ...o };
    let h = 0, c = 0;
    for (let d = -n; d <= n; d++) {
      const y = r[l + d];
      !y || y.v === null || d !== 0 && Math.abs(y.t - o.t) > a || (h += y.v, c += 1);
    }
    return c ? { t: o.t, v: ir(h / c, s) } : { ...o };
  });
}
const er = [
  "none",
  "light",
  "medium",
  "strong"
], Fe = "light", Mt = {
  none: [1, 1],
  light: [3, 5],
  medium: [5, 9],
  strong: [9, 15]
};
function tr(r) {
  if (r === null || !Number.isFinite(r)) return 0;
  const e = String(r), t = e.indexOf(".");
  return t === -1 ? 0 : Math.min(2, e.length - t - 1);
}
function ir(r, e) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function rr(r, e = Fe) {
  if (r < 5) return 1;
  const [t, i] = Mt[e] ?? Mt[Fe];
  return r < 60 ? t : i;
}
function nr(r, e, t) {
  if (!(e > r) || t < 2) return [];
  const i = [];
  for (let n = 0; n < t; n++)
    i.push(r + (e - r) * n / (t - 1));
  return i;
}
function sr(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function ar(r, e) {
  const t = r.length;
  if (t <= e || e < 3) return r.map((s, o) => o);
  const i = Math.max(1, Math.floor((e - 2) / 2)), n = /* @__PURE__ */ new Set([0, t - 1]), a = t / i;
  for (let s = 0; s < i; s++) {
    const o = Math.floor(s * a), l = Math.min(t - 1, Math.floor((s + 1) * a) - 1);
    let h = -1, c = -1, d = 1 / 0, y = -1 / 0;
    for (let f = o; f <= l; f++) {
      const w = r[f].v;
      w === null || !Number.isFinite(w) || (w < d && (d = w, h = f), w > y && (y = w, c = f));
    }
    if (h === -1) {
      n.add(o);
      continue;
    }
    n.add(h), n.add(c);
  }
  return [...n].sort((s, o) => s - o);
}
const or = ["on", "open", "opening", "tilted", "gekippt"], lr = ["off", "closed", "closing"], j = {
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
}, Ht = {
  /** Hero of the card (design token). */
  temperature: 42,
  /** Secondary value (design token): large enough to read, too small to compete. */
  humidity: 20
}, Tt = { min: 14, max: 96 }, hr = /^[a-z0-9_]+\.[a-z0-9_]+$/, cr = /^[-a-zA-Z0-9 ,'"_.()]+$/;
function dr(r) {
  return typeof r == "object" && r !== null;
}
function H(r) {
  if (typeof r != "string") return;
  const e = r.trim().toLowerCase();
  return hr.test(e) ? e : void 0;
}
function Y(r) {
  if (typeof r != "string") return;
  const e = r.trim();
  return e.length ? e : void 0;
}
function O(r, e, t, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(t, Math.max(e, n)) : i;
}
function S(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function Q(r, e) {
  const t = Y(r);
  return t && t.length <= 64 ? t : e;
}
function Dt(r) {
  const e = Y(r);
  if (!(!e || e.length > 120) && cr.test(e))
    return e;
}
function Lt(r, e) {
  return Math.round(
    O(r, Tt.min, Tt.max, e)
  );
}
function ur(r) {
  return Array.isArray(r) ? r.map((e) => typeof e == "string" ? e.trim().toLowerCase() : "").filter((e) => e.length > 0) : typeof r == "string" ? r.split(",").map((e) => e.trim().toLowerCase()).filter((e) => e.length > 0) : [];
}
const mr = [
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
  "chart_temperature_gradient",
  "chart_humidity_gradient"
], Rt = /* @__PURE__ */ new Set();
function pr(r) {
  for (const e of Object.keys(r))
    mr.includes(e) || Rt.has(e) || (Rt.add(e), console.warn(
      `[room-climate-card] Unbekannter Konfigurationsschlüssel "${e}" – wird ignoriert. Bekannte Schlüssel stehen in der README.`
    ));
}
function fr(r) {
  const e = dr(r) ? r : {};
  pr(e);
  const t = H(e.temperature_entity), i = H(e.humidity_entity), n = H(e.window_entity), a = H(e.motion_entity), s = H(e.climate_entity), o = H(e.name_entity), l = ur(e.window_open_states), h = S(e.show_window) ?? !!n, c = S(e.show_motion) ?? !!a, d = S(e.show_thermostat) ?? !!s, y = S(e.show_temperature_chart) ?? !!t, f = S(e.show_humidity_chart) ?? !!i, w = e.height, K = w === "auto" || w === void 0 || w === null || w === 0 ? null : O(w, 120, 2e3, 0) || null, T = e.theme === "dark" || e.theme === "light" || e.theme === "auto" ? e.theme : "auto", A = e.chart_curve === "linear" ? "linear" : "smooth", z = er.includes(e.chart_smoothing) ? e.chart_smoothing : Fe, g = e.chart_gap_mode === "break" ? "break" : "connect", C = e.chart_gap_style === "dashed" ? "dashed" : "solid", q = e.chart_humidity_line_style === "dotted" ? "dotted" : "solid", E = Q(
    e.accent_color ?? e.temperature_comfort_color,
    j.accent
  );
  return {
    raw: e,
    name: Y(e.name),
    nameEntity: o,
    icon: Y(e.icon) ?? "mdi:home-thermometer-outline",
    height: K,
    borderRadius: O(e.border_radius, 0, 40, 26),
    theme: T,
    temperatureEntity: t,
    humidityEntity: i,
    temperatureDecimals: Math.round(O(e.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(O(e.humidity_decimals, 0, 3, 0)),
    typography: {
      temperature: {
        fontSize: Lt(
          e.temperature_font_size,
          Ht.temperature
        ),
        fontFamily: Dt(e.temperature_font_family)
      },
      humidity: {
        fontSize: Lt(e.humidity_font_size, Ht.humidity),
        fontFamily: Dt(e.humidity_font_family)
      }
    },
    showSeriesLabels: S(e.show_series_labels) ?? !0,
    accentColor: E,
    humidity: {
      color: Q(e.humidity_color, j.humidity)
    },
    window: {
      enabled: h && !!n,
      entity: n,
      openStates: l.length ? l : [...or]
    },
    motion: {
      enabled: c && !!a,
      entity: a,
      showLastChanged: S(e.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: d && !!s,
      entity: s,
      showRow: S(e.show_climate_row) ?? !0,
      showSetpoint: S(e.show_setpoint) ?? !0,
      showStatus: S(e.show_hvac_status) ?? !0,
      showMode: S(e.show_hvac_mode) ?? !1,
      heatingColor: Q(e.heating_color, j.heating),
      // Waiting is not a state of its own: the flame borrows the chart green.
      idleColor: Q(e.heating_idle_color, E),
      offColor: Q(e.heating_off_color, j.off)
    },
    chart: {
      showTemperature: y && !!t,
      showHumidity: f && !!i,
      hours: Math.round(O(e.chart_hours, 1, 168, 6)),
      height: Math.round(O(e.chart_height, 30, 400, 112)),
      curve: A,
      smoothing: z,
      gapMode: g,
      maxGapMinutes: Math.round(O(e.chart_max_gap_minutes, 5, 720, 120)),
      gapStyle: C,
      humidityLineStyle: q,
      showPoints: S(e.chart_show_points) ?? !1,
      showTemperatureGradient: S(e.chart_temperature_gradient) ?? !0,
      showHumidityGradient: S(e.chart_humidity_gradient) ?? !0,
      // The reference sheet reduces the axis to a hairline plus three labels;
      // the dashed helper lines are opt-in now.
      showGrid: S(e.chart_show_grid) ?? !1
    }
  };
}
function yr(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((t) => typeof t == "string" && t.length > 0);
}
function ii(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function ri(r) {
  return r.thermostat.enabled && r.thermostat.showRow;
}
function De(r) {
  if (r.height) return r.height;
  const e = r.typography.temperature.fontSize, t = ii(r) ? r.chart.height : 0, i = ri(r) ? 20 : 0, n = 28, a = r.showSeriesLabels ? 20 : 0;
  return 20 + n + 12 + a + e + 8 + i + 12 + t + 20;
}
function zt(r, e) {
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
const gr = {
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
}, br = {
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
}, wr = gr;
function Ne(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function _r(r) {
  const e = Ne(r) === "de" ? wr : br;
  return {
    language: Ne(r),
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
const Ot = /* @__PURE__ */ new Map();
function vr(r, e) {
  const t = `${r}|${e}`;
  let i = Ot.get(t);
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
    Ot.set(t, i);
  }
  return i;
}
function me(r, e, t) {
  return Number.isFinite(r) ? vr(e || "en", te(Math.round(t), 0, 3)).format(r) : "–";
}
function ge(r) {
  if (r == null) return null;
  const e = String(r).trim();
  if (!e) return null;
  const t = e.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(t)) return null;
  const i = Number(t);
  return Number.isFinite(i) ? i : null;
}
function $r(r, e, t) {
  const i = Math.max(0, e - r), n = Math.floor(i / 6e4);
  if (n < 1) return t.justNow;
  if (n < 60) return `${n} ${t.minutes}`;
  const a = Math.floor(n / 60);
  return a < 24 ? `${a} ${t.hours}` : `${Math.floor(a / 24)} ${t.days}`;
}
function Ft(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function Nt(r) {
  const e = r?.trim().toLowerCase();
  return e ? e.includes("°f") || e === "f" || e.startsWith("fahrenheit") ? "F" : e.includes("°c") || e === "c" || e.startsWith("celsius") ? "C" : null : null;
}
function Sr(r, e, t) {
  if (!Number.isFinite(r)) return null;
  const i = Nt(e), n = Nt(t);
  return !i || !n ? null : i === n ? r : i === "C" ? r * 1.8 + 32 : (r - 32) / 1.8;
}
function Ie(r) {
  const e = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!e) return null;
  let t = e[1];
  return t.length === 3 && (t = t.split("").map((i) => i + i).join("")), [
    parseInt(t.slice(0, 2), 16),
    parseInt(t.slice(2, 4), 16),
    parseInt(t.slice(4, 6), 16)
  ];
}
function xr(r) {
  return `#${r.map((e) => te(Math.round(e), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function de(r, e) {
  const t = Ie(r);
  if (t) return `rgba(${t[0]}, ${t[1]}, ${t[2]}, ${te(e, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${te(e, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(te(e, 0, 1) * 100)}%, transparent)`;
}
function be(r) {
  return r === "unavailable" || r === "unknown";
}
function It(r, e, t) {
  const i = t === "humidity" ? "%" : "°C";
  if (!e) return { value: null, status: "missing", unit: i };
  const n = r?.states[e];
  if (!n) return { value: null, status: "missing", unit: i };
  const a = n.attributes?.unit_of_measurement ?? i;
  if (be(n.state))
    return { entity: n, value: null, status: "unavailable", unit: a };
  const s = ge(n.state);
  return s === null ? { entity: n, value: null, status: "invalid", unit: a } : { entity: n, value: s, status: "ok", unit: a };
}
function kr(r, e) {
  const t = e.window.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (be(n)) return { status: "unavailable", entity: i, rawState: n };
  const a = n.trim().toLowerCase();
  return e.window.openStates.includes(a) ? { status: "open", entity: i, rawState: n } : lr.includes(a) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Ar = ["on", "detected", "motion", "occupied", "active"];
function Cr(r, e) {
  const t = e.motion.entity;
  if (!t) return { status: "missing" };
  const i = r?.states[t];
  if (!i) return { status: "missing" };
  const n = i.state, a = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (be(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  if (Ar.includes(s))
    return { status: "active", entity: i, rawState: n };
  const o = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(a) && (o.sinceMs = a), o;
}
const Er = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function Bt(r, e, t) {
  const i = e.thermostat.entity, n = Ft(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  ), a = r?.states[i ?? ""]?.attributes?.unit_of_measurement, s = Ft(typeof a == "string" ? a : n);
  if (!i)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: t.t("unavailable"), colorKey: "unknown", setpoint: null, unit: s };
  const l = o.state?.toLowerCase(), h = o.attributes?.hvac_action, c = typeof h == "string" ? h.toLowerCase() : void 0, d = o.attributes?.temperature, y = typeof d == "number" ? d : typeof d == "string" ? ge(d) : null, f = {
    entity: o,
    action: c,
    setpoint: y,
    unit: s,
    mode: l,
    modeLabel: l ? t.mode(l) : void 0
  };
  return be(o.state ?? "") ? { ...f, status: "unavailable", label: t.t("unavailable"), colorKey: "unknown" } : l === "off" ? { ...f, status: "off", label: t.t("off"), colorKey: "off" } : c === "heating" ? { ...f, status: "heating", label: t.t("heating"), colorKey: "heating" } : c === "idle" ? { ...f, status: "idle", label: t.t("idle"), colorKey: "idle" } : c === "off" ? { ...f, status: "off", label: t.t("off"), colorKey: "off" } : c && !Er.includes(c) ? { ...f, status: "action", label: t.action(c), colorKey: "idle" } : c ? { ...f, status: "action", label: t.action(c), colorKey: "idle" } : { ...f, status: "unknown", label: t.t("statusUnknown"), colorKey: "unknown" };
}
function Mr(r, e) {
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
function Hr(r) {
  if (!ie(r)) return;
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
function Tr(r) {
  if (ie(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function Ut(r) {
  if (!Array.isArray(r)) return [];
  const e = [];
  for (const i of r) {
    const n = Hr(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const a = Tr(i), s = ge(a);
    e.push({ t: n, v: s });
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
function Pt(r, e) {
  const t = {};
  for (const i of e) t[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], a = ie(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!a || !(a in t)) continue;
      const s = Ut(i);
      t[a] = Dr(t[a], s);
    }
    return t;
  }
  if (ie(r))
    for (const i of e) {
      const n = r[i];
      if (n === void 0) continue;
      const a = Array.isArray(n) ? n : ie(n) && Array.isArray(n.data) ? n.data : n;
      t[i] = Ut(a);
    }
  return t;
}
function Dr(r, e) {
  if (!r.length) return e;
  if (!e.length) return r;
  const t = [...r, ...e].sort((n, a) => n.t - a.t), i = [];
  for (const n of t) {
    const a = i[i.length - 1];
    a && a.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Lr(r, e, t) {
  if (!e.length) return {};
  const i = new Date(t.start).toISOString(), n = new Date(t.end).toISOString(), a = r.connection;
  if (a && typeof a.sendMessagePromise == "function")
    try {
      const l = await a.sendMessagePromise({
        type: "history/history_during_period",
        start_time: i,
        end_time: n,
        entity_ids: e,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1,
        include_start_time_state: !0
      }), h = Pt(l, e);
      return Object.values(h).some((c) => c.length > 0), h;
    } catch (l) {
      if (!r.callApi) throw l;
    }
  if (typeof r.callApi != "function") return {};
  const s = `history/period/${encodeURIComponent(i)}?filter_entity_id=${e.map((l) => encodeURIComponent(l)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, o = await r.callApi("GET", s);
  return Pt(o, e);
}
function Rr(r, e) {
  return `${[...r].sort().join("|")}@${e}`;
}
class zr {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(e, t, i, n = Date.now()) {
    const a = Rr(t, i), s = this.cache.get(a);
    if (s && n - s.fetchedAt < 12e4)
      return s.data;
    const o = this.inflight.get(a);
    if (o) return o;
    const l = Lr(e, t, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((h) => {
      if (this.cache.set(a, { fetchedAt: Date.now(), data: h }), this.cache.size > 24) {
        const c = this.cache.keys().next();
        c.done || this.cache.delete(c.value);
      }
      return h;
    }).finally(() => {
      this.inflight.delete(a);
    });
    return this.inflight.set(a, l), l;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const Or = "room-climate-card:hidden-series:", ni = ["temperature", "humidity"];
function Fr(r, e) {
  return `${Or}${r ?? ""}|${e ?? ""}`;
}
function si() {
  try {
    return typeof window > "u" || !window.localStorage ? null : window.localStorage;
  } catch {
    return null;
  }
}
function Nr(r) {
  const e = si();
  if (!e) return [];
  try {
    const t = e.getItem(r);
    if (!t) return [];
    const i = JSON.parse(t);
    return Array.isArray(i) ? i.filter(
      (n) => typeof n == "string" && ni.includes(n)
    ) : [];
  } catch {
    return [];
  }
}
function Ir(r, e) {
  const t = si();
  if (t)
    try {
      e.length === 0 ? t.removeItem(r) : t.setItem(r, JSON.stringify(ni.filter((i) => e.includes(i))));
    } catch {
    }
}
const x = (r) => b`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, M = {
  thermometer: () => x(b`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => x(b`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => x(
    b`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => x(
    b`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => x(
    b`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => x(
    b`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => x(
    b`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => x(
    b`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => x(b`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => x(
    b`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => x(b`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => x(b`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => x(b`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => x(
    b`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
};
function Br(r, e) {
  const { samples: t, bridged: i } = r;
  if (t.length <= e || e < 3) return r;
  const n = ar(t, e), a = n.map((o) => t[o]), s = [];
  for (let o = 1; o < n.length; o++)
    s.push(i.slice(n[o - 1] + 1, n[o] + 1).some(Boolean));
  return { samples: a, bridged: s };
}
const Ur = 320, Pr = 112, Vr = 0.3, Kr = 0.44, Gr = { minSpan: 0.4, padding: 0.15 }, jr = { minSpan: 3, padding: 0.15 };
let Wr = 0;
class Zr extends P {
  constructor() {
    super(...arguments), this.accentColor = "#4FD1A5", this.humidityColor = "#8B86D6", this.setpoint = null, this.setpointUnit = "°C", this.hiddenSeries = [], this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showPoints = !1, this.showGrid = !1, this.curve = "smooth", this.smoothing = "light", this.gapMode = "connect", this.maxGapMinutes = 120, this.gapStyle = "solid", this.humidityLineStyle = "solid", this.showTemperatureArea = !0, this.showHumidityArea = !0, this.cornerRadius = 26, this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte",
      now: "Jetzt",
      setpoint: "Soll"
    }, this.uid = `rcc-chart-${++Wr}`, this.width = 0, this.height = 0;
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
      language: { attribute: !1 },
      timeZone: { attribute: !1 },
      hour12: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = Pe`
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
    const i = Math.round(e), n = Math.round(t);
    i === this.width && n === this.height || (this.width = i, this.height = n, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(e, t) {
    this.applySize(e, t);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : Ur,
      height: this.height > 20 ? this.height : Pr
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
    const i = b`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = b`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.hasData ? p`<div class="wrap">${this.renderChart(e, t)}</div>` : this.error ? this.stateView(i, this.labels.error) : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
  }
  renderChart(e, t) {
    const i = t, n = i >= 62, a = n ? 20 : 2, s = 6, o = i - a, l = Math.max(6, o - s), h = 1, c = e - 1, d = Math.max(1, this.end - this.start), y = ce([this.start, this.end], [h, c]), f = n ? Math.min(Math.max(this.cornerRadius, 0), 30) + 2 : 0, w = ce([this.start, this.end], [h + f, c - f]), K = i - 6, T = s, A = s + l * Vr, z = s + l * Kr, g = o, C = this.temperatureVisible ? this.temperature ?? [] : [], q = this.humidityVisible ? this.humidity ?? [] : [], E = C.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), we = q.map((u) => u.v).filter((u) => u !== null && Number.isFinite(u)), D = typeof this.setpoint == "number" && Number.isFinite(this.setpoint) ? this.setpoint : null, _e = D !== null ? [...E, D] : E, ve = kt(_e), $e = kt(we), Se = ve ? At(ve[0], ve[1], Gr) : null, xe = $e ? At($e[0], $e[1], jr) : null, L = Se ? ce(Se, [g, z]) : null, N = xe ? ce(xe, [A, T]) : null, le = Et(C, this.start, this.end), je = Et(q, this.start, this.end), We = {
      rangeMs: d,
      start: this.start,
      end: this.end,
      gapMode: this.gapMode,
      maxGapMs: Math.max(5, this.maxGapMinutes) * 60 * 1e3
    }, ke = this.curve === "smooth", Ze = (u) => {
      if (!ke || u.length < 5) return u;
      const _ = rr(u.length, this.smoothing);
      if (_ < 3) return u;
      const k = Qt(u);
      return Qi(u, _, {
        maxDeltaMs: Math.max(6e4, k * 3)
      });
    }, oi = Ze(le), li = Ze(je), Ye = Se ? Ct(oi, We) : [], qe = xe ? Ct(li, We) : [], hi = Math.max(1, Ye.length + qe.length), ci = Math.max(60, Math.floor(1200 / hi)), Xe = (u) => u.map((_) => Br(_, ci)), Ae = Xe(Ye), Ce = Xe(qe), Je = [];
    if (this.showGrid)
      for (let u = 1; u < 3; u++) {
        const _ = s + l * u / 3;
        Je.push(b`<line class="grid-line" x1=${h} x2=${c} y1=${_} y2=${_} />`);
      }
    const Qe = n ? Math.min(3, sr(e)) : 0, et = Qe >= 2 ? nr(this.start, this.end, Math.max(2, Qe)) : [], di = et.map((u, _) => {
      const k = _ === et.length - 1, v = _ === 0 ? "start" : k ? "end" : "middle";
      return b`<text class="axis-label" x=${w(u)} y=${K} text-anchor=${v}>
        ${this.formatAxisLabel(u, k)}
      </text>`;
    }), tt = (u, _) => qi(u, y, _), ui = (u, _) => (this.gapStyle === "dashed" ? Yi(u) : [u.samples]).filter((v) => v.length > 1).map((v) => ti(tt(v, _), ke)).filter((v) => v.length > 0), it = (u, _, k, v = {}) => ui(u, _).map((ut) => {
      const He = [
        v.color ? `stroke:${v.color}` : `stroke:${k}`,
        v.width ? `stroke-width:${v.width}` : "",
        v.dashed ? "stroke-dasharray:0.1 5.5" : ""
      ].filter(Boolean).join(";");
      return b`<path class="series-line" d=${ut} style=${He}></path>`;
    }), mi = Ae.flatMap(
      (u) => it(u, L, this.accentColor, { color: this.accentColor })
    ), rt = (u, _, k) => u.filter((v) => v.samples.length > 1).map((v) => Ji(tt(v.samples, _), k, ke)).join(" "), nt = L && this.showTemperatureArea ? rt(Ae, L, o) : "", pi = nt ? [b`<path class="series-area" d=${nt} style="fill:url(#${this.uid}-temp-fill)" />`] : [], st = N && this.showHumidityArea ? rt(Ce, N, A) : "", fi = st ? [
      b`<path class="series-area" d=${st} style="fill:url(#${this.uid}-humidity-fill)" />`
    ] : [], at = this.humidityLineStyle === "dotted", yi = Ce.flatMap(
      (u) => it(u, N, this.humidityColor, {
        color: this.humidityColor,
        dashed: at,
        width: at ? 2.2 : 1.9
      })
    ), ot = [];
    if (this.showPoints) {
      const u = (_, k, v) => {
        const X = _.filter((he) => he.v !== null);
        if (!X.length) return;
        const He = Math.max(1, Math.ceil(X.length / 24));
        X.forEach((he, mt) => {
          if (mt % He !== 0 && mt !== X.length - 1) return;
          const _i = he.v;
          ot.push(
            b`<circle class="point" r="1.7" cx=${y(he.t)} cy=${k(_i)} style="stroke:${v}" />`
          );
        });
      };
      L && Ae.forEach((_) => u(_.samples, L, this.accentColor)), N && Ce.forEach(
        (_) => u(_.samples, N, this.humidityColor)
      );
    }
    const I = D !== null && L ? L(D) : null, lt = I !== null && Number.isFinite(I) && I >= z - 0.5 && I <= g + 0.5, gi = le.find((u) => u.v !== null)?.v ?? null, bi = [...le].reverse().find((u) => u.v !== null)?.v ?? null, ht = (u) => u === null || D === null ? 0 : Math.abs(u - D), ct = ht(bi) >= ht(gi), Ee = [...le].reverse().find((u) => u.v !== null), Me = [...je].reverse().find((u) => u.v !== null), dt = lt && D !== null ? `${this.labels.setpoint} ${me(D, this.language, 1)}${this.setpointUnit ? ` ${this.setpointUnit}` : ""}` : "", wi = dt ? `${this.labels.aria}. ${dt}` : this.labels.aria;
    return b`<svg
      width=${e}
      height=${i}
      viewBox="0 0 ${e} ${i}"
      role="img"
      aria-label=${wi}
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${z} x2="0" y2=${g} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.accentColor} stop-opacity="0.22" />
          <stop offset="0.55" stop-color=${this.accentColor} stop-opacity="0.08" />
          <stop offset="1" stop-color=${this.accentColor} stop-opacity="0" />
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${T} x2="0" y2=${A} gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color=${this.humidityColor} stop-opacity="0.2" />
          <stop offset="0.6" stop-color=${this.humidityColor} stop-opacity="0.07" />
          <stop offset="1" stop-color=${this.humidityColor} stop-opacity="0" />
        </linearGradient>
      </defs>
      ${Je}
      ${fi}
      ${pi}
      ${lt ? b`<line
            class="setpoint-line"
            x1=${h}
            x2=${c}
            y1=${I}
            y2=${I}
            style="stroke:${this.accentColor};stroke-opacity:0.42"
          ></line>
          <text
            class="setpoint-caption"
            x=${ct ? c : h}
            y=${I - 5}
            text-anchor=${ct ? "end" : "start"}
          >
            ${this.labels.setpoint}
          </text>` : m}
      <line class="baseline" x1=${h} x2=${c} y1=${o} y2=${o} />
      ${yi} ${mi} ${ot}
      ${Me && N ? b`<circle
            class="end-dot"
            r="2.6"
            cx=${y(Me.t)}
            cy=${N(Me.v)}
            style="fill:${this.humidityColor}"
          />` : m}
      ${Ee && L ? b`<circle
            class="end-dot"
            r="2.8"
            cx=${y(Ee.t)}
            cy=${L(Ee.v)}
            style="fill:${this.accentColor}"
          />` : m}
      ${di}
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
    const t = new Date(e), i = this.language || "en", n = this.timeZone ? { timeZone: this.timeZone } : {}, a = {
      hour: "2-digit",
      minute: "2-digit",
      ...typeof this.hour12 == "boolean" ? { hour12: this.hour12 } : {}
    };
    let s, o;
    try {
      s = new Intl.DateTimeFormat(i, { weekday: "short", ...n }).format(t).replace(/[.,]/g, "").trim(), o = new Intl.DateTimeFormat(i, { ...a, ...n }).format(t);
    } catch {
      s = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"][t.getDay()], o = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
    }
    return s ? `${s} ${o}` : o;
  }
}
const Vt = "room-climate-chart";
typeof customElements < "u" && !customElements.get(Vt) && customElements.define(Vt, Zr);
const Le = {
  heating: "#d16a62",
  idle: "#4FD1A5",
  off: "#94a3b8"
}, Yr = {
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
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
function qr(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string") {
    const e = r.trim().replace(",", ".");
    if (!e || e === "-" || e === ".") return null;
    const t = Number(e);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
class ai extends P {
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
    const e = Ne(this.hass?.locale?.language ?? this.hass?.language);
    return Yr[e];
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
    return S(this._config[e]);
  }
  showFlag(e, t) {
    return this.rawBoolean(e) ?? !!H(this._config[t]);
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
    return Y(this._config[e]) ?? t;
  }
  colorValue(e, t) {
    const i = Y(this._config[e]) ?? t;
    return Ie(i) ?? Ie(t) ?? [148, 163, 184];
  }
  renderColor(e) {
    return this.renderField({
      key: e.key,
      label: e.label,
      selector: { color_rgb: {} },
      value: this.colorValue(e.key, e.fallback),
      disabled: e.disabled,
      onChange: (t) => {
        Array.isArray(t) && t.length >= 3 && this.patch({ [e.key]: xr(t) });
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
        const i = qr(t);
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
    return p`<details class="section" ?open=${n} @toggle=${(a) => this.onToggle(e, a)}>
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
      fallback: j.accent
    })}
      ${this.renderColor({
      key: "humidity_color",
      label: e.secondaryColor,
      fallback: j.humidity
    })}`;
  }
  renderWindow(e) {
    const t = this.showFlag("show_window", "window_entity"), i = H(this._config.window_entity);
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
        const a = String(n ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
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
      warning: t && !H(this._config.motion_entity) ? e.missingEntity : void 0
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
      warning: t && !H(this._config.climate_entity) ? e.missingEntity : void 0
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
      fallback: Le.heating,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_idle_color",
      label: e.idleColor,
      fallback: Le.idle,
      disabled: !t
    })}
      ${this.renderColor({
      key: "heating_off_color",
      label: e.offColor,
      fallback: Le.off,
      disabled: !t
    })}`;
  }
  renderChart(e) {
    const t = this.showFlag("show_temperature_chart", "temperature_entity"), i = this.showFlag("show_humidity_chart", "humidity_entity"), n = t || i, a = [3, 6, 12, 24, 48].map((s) => ({ value: String(s), label: `${s} h` }));
    return p`${this.renderSwitch({
      key: "show_temperature_chart",
      label: e.showTemperatureChart,
      value: t,
      onChange: (s) => this.patch({ show_temperature_chart: s })
    })}
      ${this.renderSwitch({
      key: "show_humidity_chart",
      label: e.showHumidityChart,
      value: i,
      onChange: (s) => this.patch({ show_humidity_chart: s })
    })}
      ${this.renderField({
      key: "chart_hours",
      label: e.hours,
      selector: { select: { mode: "dropdown", options: a } },
      value: String(this.numberValue("chart_hours", 6)),
      disabled: !n,
      onChange: (s) => {
        const o = Number(s);
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
      onChange: (s) => this.patch({ chart_smoothing: String(s) })
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
      onChange: (s) => this.patch({ chart_humidity_line_style: String(s) })
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
      onChange: (s) => this.patch({ chart_gap_mode: String(s) })
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
    })}`;
  }
  static {
    this.styles = Pe`
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
typeof customElements < "u" && !customElements.get(re) && customElements.define(re, ai);
const Re = "#fbbf24", ze = "#34d399", Kt = "var(--rcc-neutral)", Xr = 15 * 1e3, Jr = 300 * 1e3;
class Qr extends P {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._hiddenSeries = [], this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new zr(), this.historyKey = "", this.hiddenSeriesKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this.visible = !0, this.retryDelay = 0, this.onVisibilityChange = () => {
      typeof document > "u" || document.visibilityState !== "visible" || !this.isConnected || !this._config || (this._now = Date.now(), this.loadHistory(this.historyKey, !0));
    }, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    const t = fr(e);
    this._config = t;
    const i = Fr(
      t.temperatureEntity,
      t.humidityEntity
    );
    i !== this.hiddenSeriesKey && (this.hiddenSeriesKey = i, this._hiddenSeries = Nr(i)), this.historyKeyFor(t) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), t.height ? this.updateDensity(t.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(re);
  }
  static getStubConfig(e) {
    const t = e?.states ?? {}, i = Object.values(t), n = (d) => i.find(d)?.entity_id, a = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "temperature"
    ), s = n(
      (d) => d.entity_id.startsWith("sensor.") && d.attributes?.device_class === "humidity"
    ), o = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(d.attributes?.device_class))
    ), l = n(
      (d) => d.entity_id.startsWith("binary_sensor.") && d.attributes?.device_class === "motion"
    ), h = n((d) => d.entity_id.startsWith("climate.")), c = { type: `custom:${R}` };
    return a && (c.temperature_entity = a), s && (c.humidity_entity = s), o && (c.window_entity = o), l && (c.motion_entity = l), h && (c.climate_entity = h), c;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(De(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const e = this._config ? De(this._config) : 230;
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
    return _r(e);
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
    const a = this.historyEntityIds(i);
    if (!a.length) return;
    this._historyLoading = !0, this._historyError = void 0;
    const s = Date.now(), o = s - i.chart.hours * 60 * 60 * 1e3;
    try {
      const l = await this.repository.load(n, a, i.chart.hours, s);
      if (this.historyKey !== e) return;
      this._history = l, this._historyWindow = { start: o, end: s }, this.historyFetchedAt = Date.now(), this.retryDelay = 0, t && this.requestUpdate();
    } catch (l) {
      if (this.historyKey !== e) return;
      this._historyError = l instanceof Error ? l.message : String(l), this.retryDelay = Math.min(Math.max(this.retryDelay * 2, Xr), Jr), this.pendingLoad && clearTimeout(this.pendingLoad), this.pendingLoad = setTimeout(() => {
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
    const a = Date.parse(n.last_changed);
    if (!Number.isFinite(a)) return e;
    const s = e[e.length - 1], o = Math.min(a, i);
    if (o <= s.t) return e;
    const l = ge(n.state);
    return s.v === l ? e : [...e, { t: o, v: l }];
  }
  updateDensity(e) {
    const t = e > 0 ? e : this._config ? this._config.height ?? De(this._config) : 0;
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
      const i = this._config ? yr(this._config) : [];
      return i.length ? i.some((n) => t.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const e = this._config, t = this.translator();
    if (!e)
      return p`<div class="card theme-auto"><div class="empty">${t.t("roomClimate")}</div></div>`;
    const i = e.theme === "auto" ? "theme-auto" : `theme-${e.theme}`, { temperature: n, humidity: a } = e.typography, s = [
      `--rcc-radius:${e.borderRadius}px`,
      e.height ? `--rcc-height:${e.height}px` : "",
      `--rcc-chart-height:${e.chart.height}px`,
      `--rcc-temp-size:${n.fontSize}px`,
      `--rcc-hum-size:${a.fontSize}px`,
      `--rcc-accent:${e.accentColor}`,
      `--rcc-secondary:${e.humidity.color}`,
      n.fontFamily ? `--rcc-temp-font:${n.fontFamily}` : "",
      a.fontFamily ? `--rcc-hum-font:${a.fontFamily}` : ""
    ].filter(Boolean).join(";");
    return p`<div
      class="card ${i} density-${this._density} ${e.height ? "fixed-height" : "auto-height"}"
      style="${s}"
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
    return `${zt(e, this.hass)} – ${t.t("roomClimate")}`;
  }
  renderEmpty(e) {
    return p`<div class="empty-state" role="status">
      ${M.info()}
      <span class="empty-title">${e.t("noEntities")}</span>
      <span class="empty-hint">${e.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(e, t) {
    const i = zt(e, this.hass), n = Cr(this.hass, e), a = kr(this.hass, e), s = e.motion.enabled && e.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(e)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${s ? p`<div class="subtle">
              ${t.t("quietSince")}
              ${$r(n.sinceMs, this._now, {
      justNow: t.t("justNow"),
      minutes: t.t("minutesShort"),
      hours: t.t("hoursShort"),
      days: t.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${e.motion.enabled ? this.renderMotionBadge(n, t) : m}
        ${e.window.enabled ? this.renderWindowBadge(a, t) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(e) {
    return this._haIconReady ? p`<ha-icon .icon=${e.icon}></ha-icon>` : M.home();
  }
  renderMotionBadge(e, t) {
    const i = e.status === "active", n = i ? ze : Kt, a = i ? t.t("motionDetected") : e.status === "unavailable" || e.status === "missing" ? t.t("unavailable") : t.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${de(
      i ? ze : "#64748b",
      i ? 0.16 : 0.12
    )};--badge-border:${de(i ? ze : "#64748b", i ? 0.45 : 0.22)}"
      title="${a}"
      aria-label="${a}"
      role="img"
      >${M.motion()}</span
    >`;
  }
  renderWindowBadge(e, t) {
    const i = e.status === "open", n = e.status === "open" ? t.t("windowOpen") : e.status === "closed" ? t.t("windowClosed") : e.status === "missing" || e.status === "unavailable" ? t.t("unavailable") : t.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? Re : Kt};--badge-bg:${de(
      i ? Re : "#64748b",
      i ? 0.18 : 0.12
    )};--badge-border:${de(i ? Re : "#64748b", i ? 0.5 : 0.22)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? M.windowOpen() : M.windowClosed()}</span
    >`;
  }
  /**
   * Readings block: a caption row (label + series dot) above a single baseline
   * row with both values. Temperature is the hero, humidity follows at half the
   * size – both share one baseline, so nothing floats.
   */
  renderReadings(e, t) {
    if (!e.temperatureEntity && !e.humidityEntity) return m;
    const i = this.language(), n = It(this.hass, e.temperatureEntity, "temperature"), a = It(this.hass, e.humidityEntity, "humidity"), s = !!e.temperatureEntity, o = !!e.humidityEntity, l = e.showSeriesLabels;
    return p`<div class="readings ${l ? "" : "no-labels"}">
      ${l ? p`<div class="reading-labels" aria-hidden="true">
        ${s ? p`<span
              class="series-label ${this._hiddenSeries.includes("temperature") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.accentColor}"></span
              >${t.t("temperature")}</span
            >` : m}
        ${o ? p`<span
              class="series-label ${this._hiddenSeries.includes("humidity") ? "is-hidden" : ""}"
              ><span class="series-dot" style="background:${e.humidity.color}"></span
              >${t.t("humidity")}</span
            >` : m}
        </div>` : m}
      <div class="reading-values">
        ${s ? this.renderReading({
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
    }) : m}
        ${o ? this.renderReading({
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
      toggleable: e.chart.showHumidity,
      t
    }) : m}
      </div>
    </div>`;
  }
  /** One measured value; the accent dot of the caption row marks its series. */
  renderReading(e) {
    const t = this._hiddenSeries.includes(e.key), i = e.t, n = e.value !== null ? me(e.value, e.language, e.decimals) : "–", a = p`<span class="reading-value">${n}</span
      ><span class="reading-unit">${e.unit}</span>`;
    return e.toggleable ? p`<button
      type="button"
      class="reading ${e.className} ${t ? "is-hidden" : ""}"
      style="--series-color:${e.color}"
      aria-pressed=${!t}
      aria-label="${e.ariaLabel} – ${t ? i.t("seriesHidden") : i.t("seriesShown")}"
      title="${t ? i.t("showSeries") : i.t("hideSeries")}"
      @click=${() => this.toggleSeries(e.key)}
    >
      <span class="reading-number">${a}</span>
    </button>` : p`<span class="reading ${e.className}" style="--series-color:${e.color}">
        <span class="reading-number" role="text" aria-label="${e.ariaLabel}">${a}</span>
      </span>`;
  }
  toggleSeries(e) {
    this._hiddenSeries = this._hiddenSeries.includes(e) ? this._hiddenSeries.filter((t) => t !== e) : [...this._hiddenSeries, e], this.hiddenSeriesKey && Ir(this.hiddenSeriesKey, this._hiddenSeries);
  }
  sensorAria(e, t, i, n) {
    return e.value === null ? n.t("unavailable") : `${me(e.value, t, i)} ${e.unit}`;
  }
  /**
   * Heating row below the readings: colour-coded flame, the current HVAC action
   * and the target temperature. Deliberately one line at one size – no badges to
   * optically centre, nothing to misalign.
   */
  renderClimateRow(e, t) {
    if (!ri(e)) return m;
    const i = Bt(this.hass, e, t), n = e.thermostat.showSetpoint && i.setpoint !== null, a = e.thermostat.showStatus, s = e.thermostat.showMode && !!i.modeLabel;
    if (!n && !a && !s) return m;
    const o = Mr(i, e), l = this.language(), h = i.setpoint !== null ? `${me(i.setpoint, l, e.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="climate-row" role="status" aria-label="${this.thermostatAria(i)}">
      ${a ? p`<span class="flame status-${i.status}" style="color:${o}" aria-hidden="true"
            >${this.heatingIcon(i)}</span
          >` : m}
      <span class="climate-state">${s ? i.modeLabel : i.label}</span>
      ${n ? p`<span class="climate-sep" aria-hidden="true">·</span>
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
  thermostatAria(e) {
    return e.label;
  }
  renderChart(e, t) {
    if (!ii(e)) return m;
    const i = Date.now(), n = i - e.chart.hours * 60 * 60 * 1e3, a = e.chart.showTemperature && e.temperatureEntity ? this.withLiveState(
      this._history[e.temperatureEntity],
      e.temperatureEntity,
      i
    ) : void 0, s = e.chart.showHumidity && e.humidityEntity ? this.withLiveState(this._history[e.humidityEntity], e.humidityEntity, i) : void 0, o = this.language(), l = this.chartClock(), h = e.thermostat.enabled ? Bt(this.hass, e, t) : void 0, c = (e.temperatureEntity ? this.hass?.states?.[e.temperatureEntity]?.attributes?.unit_of_measurement : void 0) ?? "°C", d = h?.setpoint ?? null, f = (d === null || !h ? null : Sr(d, h.unit, c)) ?? (h?.unit === c ? d : null), w = {
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
        .temperature=${a}
        .humidity=${s}
        .accentColor=${e.accentColor}
        .humidityColor=${e.humidity.color}
        .setpoint=${f}
        .setpointUnit=${c}
        .hiddenSeries=${this._hiddenSeries}
        .start=${n}
        .end=${i}
        .showPoints=${e.chart.showPoints}
        .showGrid=${e.chart.showGrid}
        .curve=${e.chart.curve}
        .smoothing=${e.chart.smoothing}
        .gapMode=${e.chart.gapMode}
        .maxGapMinutes=${e.chart.maxGapMinutes}
        .gapStyle=${e.chart.gapStyle}
        .humidityLineStyle=${e.chart.humidityLineStyle}
        .showTemperatureArea=${e.chart.showTemperatureGradient}
        .showHumidityArea=${e.chart.showHumidityGradient}
        .cornerRadius=${e.borderRadius}
        .language=${o}
        .timeZone=${l.timeZone}
        .hour12=${l.hour12}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${w}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Pe`
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
  `%c ROOM-CLIMATE-CARD %c v${Si} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(R) || customElements.define(R, Qr);
customElements.get(re) || customElements.define(re, ai);
const Gt = window.customCards = window.customCards ?? [];
Gt.some((r) => r.type === R) || Gt.push({
  type: R,
  name: vi,
  description: $i,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  R as CARD_TAG,
  Si as CARD_VERSION,
  Qr as RoomClimateCard,
  ai as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
