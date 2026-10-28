const R = "room-climate-card", U = "room-climate-card-editor", Oe = "Room Climate Card", Fe = "Raumklima auf einen Blick: Temperatur, Luftfeuchte, Fenster, Bewegung, Thermostat und echter Verlauf.", De = "1.1.0";
const at = globalThis, St = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = /* @__PURE__ */ Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let pe = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (St && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ze = (r) => new pe(typeof r == "string" ? r : r + "", void 0, At), Et = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[o + 1], r[0]);
  return new pe(e, r, At);
}, Ne = (r, t) => {
  if (St) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), n = at.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  }
}, Vt = St ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ze(e);
})(r) : r;
const { is: Ie, defineProperty: Be, getOwnPropertyDescriptor: Pe, getOwnPropertyNames: Ue, getOwnPropertySymbols: Ve, getPrototypeOf: Ke } = Object, ct = globalThis, Kt = ct.trustedTypes, We = Kt ? Kt.emptyScript : "", je = ct.reactiveElementPolyfillSupport, G = (r, t) => r, _t = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? We : null;
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
} }, fe = (r, t) => !Ie(r, t), Wt = { attribute: !0, type: String, converter: _t, reflect: !1, useDefault: !1, hasChanged: fe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ct.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Wt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Be(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = Pe(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(G("elementProperties"))) return;
    const t = Ke(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(G("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(G("properties"))) {
      const e = this.properties, i = [...Ue(e), ...Ve(e)];
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
      for (const n of i) e.unshift(Vt(n));
    } else t !== void 0 && e.push(Vt(t));
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
    return Ne(t, this.constructor.elementStyles), t;
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
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : _t).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : _t;
      this._$Em = n;
      const l = s.fromAttribute(e, o.type);
      this[n] = l ?? this._$Ej?.get(n) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, o) {
    if (t !== void 0) {
      const s = this.constructor;
      if (n === !1 && (o = this[t]), i ??= s.getPropertyOptions(t), !((i.hasChanged ?? fe)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[G("elementProperties")] = /* @__PURE__ */ new Map(), P[G("finalized")] = /* @__PURE__ */ new Map(), je?.({ ReactiveElement: P }), (ct.reactiveElementVersions ??= []).push("2.1.2");
const kt = globalThis, jt = (r) => r, ht = kt.trustedTypes, Gt = ht ? ht.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ye = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + L, Ge = `<${ge}>`, N = document, Y = () => N.createComment(""), X = (r) => r === null || typeof r != "object" && typeof r != "function", Mt = Array.isArray, qe = (r) => Mt(r) || typeof r?.[Symbol.iterator] == "function", wt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Zt = />/g, O = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Yt = /'/g, Xt = /"/g, we = /^(?:script|style|textarea|title)$/i, be = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = be(1), f = be(2), V = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Jt = /* @__PURE__ */ new WeakMap(), D = N.createTreeWalker(N, 129);
function _e(r, t) {
  if (!Mt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gt !== void 0 ? Gt.createHTML(t) : t;
}
const Ze = (r, t) => {
  const e = r.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = j;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let c, u, h = -1, b = 0;
    for (; b < a.length && (s.lastIndex = b, u = s.exec(a), u !== null); ) b = s.lastIndex, s === j ? u[1] === "!--" ? s = qt : u[1] !== void 0 ? s = Zt : u[2] !== void 0 ? (we.test(u[2]) && (n = RegExp("</" + u[2], "g")), s = O) : u[3] !== void 0 && (s = O) : s === O ? u[0] === ">" ? (s = n ?? j, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? O : u[3] === '"' ? Xt : Yt) : s === Xt || s === Yt ? s = O : s === qt || s === Zt ? s = j : (s = O, n = void 0);
    const y = s === O && r[l + 1].startsWith("/>") ? " " : "";
    o += s === j ? a + Ge : h >= 0 ? (i.push(c), a.slice(0, h) + ye + a.slice(h) + L + y) : a + L + (h === -2 ? l : y);
  }
  return [_e(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class J {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = t.length - 1, a = this.parts, [c, u] = Ze(t, e);
    if (this.el = J.createElement(c, i), D.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = D.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(ye)) {
          const b = u[s++], y = n.getAttribute(h).split(L), v = /([.?@])?(.*)/.exec(b);
          a.push({ type: 1, index: o, name: v[2], strings: y, ctor: v[1] === "." ? Xe : v[1] === "?" ? Je : v[1] === "@" ? Qe : dt }), n.removeAttribute(h);
        } else h.startsWith(L) && (a.push({ type: 6, index: o }), n.removeAttribute(h));
        if (we.test(n.tagName)) {
          const h = n.textContent.split(L), b = h.length - 1;
          if (b > 0) {
            n.textContent = ht ? ht.emptyScript : "";
            for (let y = 0; y < b; y++) n.append(h[y], Y()), D.nextNode(), a.push({ type: 2, index: ++o });
            n.append(h[b], Y());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ge) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(L, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += L.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = N.createElement("template");
    return i.innerHTML = t, i;
  }
}
function K(r, t, e = r, i) {
  if (t === V) return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = X(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(r), n._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = n : e._$Cl = n), n !== void 0 && (t = K(r, n._$AS(r, t.values), n, i)), t;
}
class Ye {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? N).importNode(e, !0);
    D.currentNode = n;
    let o = D.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let c;
        a.type === 2 ? c = new tt(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new ti(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      s !== a?.index && (o = D.nextNode(), s++);
    }
    return D.currentNode = N, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = K(this, t, e), X(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = J.createElement(_e(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Ye(n, this), s = o.u(this.options);
      o.p(e), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Jt.get(t.strings);
    return e === void 0 && Jt.set(t.strings, e = new J(t)), e;
  }
  k(t) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t) n === e.length ? e.push(i = new tt(this.O(Y()), this.O(Y()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = jt(t).nextSibling;
      jt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = K(this, t, e, 0), s = !X(t) || t !== this._$AH && t !== V, s && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = K(this, l[i + a], e, a), c === V && (c = this._$AH[a]), s ||= !X(c) || c !== this._$AH[a], c === m ? t = m : t !== m && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xe extends dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class Je extends dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class Qe extends dt {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = K(this, t, e, 0) ?? m) === V) return;
    const i = this._$AH, n = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ti {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    K(this, t);
  }
}
const ei = kt.litHtmlPolyfillSupport;
ei?.(J, tt), (kt.litHtmlVersions ??= []).push("3.3.3");
const ii = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = n = new tt(t.insertBefore(Y(), o), o, void 0, e ?? {});
  }
  return n._$AI(r), n;
};
const Ht = globalThis;
class z extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ii(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
}
z._$litElement$ = !0, z.finalized = !0, Ht.litElementHydrateSupport?.({ LitElement: z });
const ri = Ht.litElementPolyfillSupport;
ri?.({ LitElement: z });
(Ht.litElementVersions ??= []).push("4.2.2");
const ni = ["on", "open", "opening", "tilted", "gekippt"], si = ["off", "closed", "closing"], w = {
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
}, oi = /^[a-z0-9_]+\.[a-z0-9_]+$/;
function ai(r) {
  return typeof r == "object" && r !== null;
}
function T(r) {
  if (typeof r != "string") return;
  const t = r.trim().toLowerCase();
  return oi.test(t) ? t : void 0;
}
function Q(r) {
  if (typeof r != "string") return;
  const t = r.trim();
  return t.length ? t : void 0;
}
function M(r, t, e, i) {
  const n = typeof r == "number" ? r : Number(r);
  return Number.isFinite(n) ? Math.min(e, Math.max(t, n)) : i;
}
function A(r) {
  if (typeof r == "boolean") return r;
  if (r === "true") return !0;
  if (r === "false") return !1;
}
function H(r, t) {
  const e = Q(r);
  return e && e.length <= 64 ? e : t;
}
function li(r) {
  return Array.isArray(r) ? r.map((t) => typeof t == "string" ? t.trim().toLowerCase() : "").filter((t) => t.length > 0) : typeof r == "string" ? r.split(",").map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0) : [];
}
function hi(r) {
  const t = ai(r) ? r : {}, e = T(t.temperature_entity), i = T(t.humidity_entity), n = T(t.window_entity), o = T(t.motion_entity), s = T(t.climate_entity), l = T(t.name_entity), a = ci(t), c = li(t.window_open_states), u = A(t.show_window) ?? !!n, h = A(t.show_motion) ?? !!o, b = A(t.show_thermostat) ?? !!s, y = A(t.show_temperature_chart) ?? !!e, v = A(t.show_humidity_chart) ?? !!i, E = t.height, g = E === "auto" || E === void 0 || E === null || E === 0 ? null : M(E, 120, 2e3, 0) || null, x = t.theme === "dark" || t.theme === "light" || t.theme === "auto" ? t.theme : "auto", S = t.chart_curve === "linear" ? "linear" : "smooth";
  return {
    raw: t,
    name: Q(t.name),
    nameEntity: l,
    icon: Q(t.icon) ?? "mdi:home-thermometer-outline",
    height: g,
    borderRadius: M(t.border_radius, 0, 40, 18),
    theme: x,
    temperatureEntity: e,
    humidityEntity: i,
    temperatureDecimals: Math.round(M(t.temperature_decimals, 0, 3, 1)),
    humidityDecimals: Math.round(M(t.humidity_decimals, 0, 3, 0)),
    bands: a,
    bandColors: {
      cool: H(t.temperature_cool_color, w.cool),
      comfort: H(t.temperature_comfort_color, w.comfort),
      warm: H(t.temperature_warm_color, w.warm),
      hot: H(t.temperature_hot_color, w.hot)
    },
    humidity: {
      color: H(t.humidity_color, w.humidity),
      lowThreshold: M(t.humidity_low_threshold, 0, 100, 35),
      highThreshold: M(t.humidity_high_threshold, 0, 100, 65),
      lowColor: H(t.humidity_low_color, w.humidityLow),
      highColor: H(t.humidity_high_color, w.humidityHigh)
    },
    window: {
      enabled: u && !!n,
      entity: n,
      openStates: c.length ? c : [...ni]
    },
    motion: {
      enabled: h && !!o,
      entity: o,
      showLastChanged: A(t.motion_show_last_changed) ?? !0
    },
    thermostat: {
      enabled: b && !!s,
      entity: s,
      showSetpoint: A(t.show_setpoint) ?? !0,
      showStatus: A(t.show_hvac_status) ?? !0,
      showMode: A(t.show_hvac_mode) ?? !1,
      heatingColor: H(t.heating_color, w.heating),
      idleColor: H(t.heating_idle_color, w.idle),
      offColor: H(t.heating_off_color, w.off)
    },
    chart: {
      showTemperature: y && !!e,
      showHumidity: v && !!i,
      hours: Math.round(M(t.chart_hours, 1, 168, 6)),
      height: Math.round(M(t.chart_height, 30, 400, 84)),
      curve: S,
      showLegend: A(t.chart_show_legend) ?? !1,
      showPoints: A(t.chart_show_points) ?? !1,
      showGrid: A(t.chart_show_grid) ?? !0
    }
  };
}
function ci(r) {
  const t = [
    M(r.temperature_cool_below, -50, 80, 19),
    M(r.temperature_warm_above, -50, 80, 25),
    M(r.temperature_hot_above, -50, 80, 28)
  ].sort((e, i) => e - i);
  return { cool: t[0], warm: t[1], hot: t[2] };
}
function di(r, t) {
  return r < t.cool ? "cool" : r < t.warm ? "comfort" : r < t.hot ? "warm" : "hot";
}
function ui(r, t) {
  return t.bandColors[di(r, t.bands)];
}
function mi(r, t) {
  const { lowThreshold: e, highThreshold: i } = t.humidity;
  return e > 0 && r < e ? "low" : i > 0 && r > i ? "high" : "normal";
}
function pi(r, t) {
  switch (mi(r, t)) {
    case "low":
      return t.humidity.lowColor;
    case "high":
      return t.humidity.highColor;
    default:
      return t.humidity.color;
  }
}
function fi(r) {
  return [
    r.temperatureEntity,
    r.humidityEntity,
    r.window.entity,
    r.motion.entity,
    r.thermostat.entity,
    r.nameEntity
  ].filter((e) => typeof e == "string" && e.length > 0);
}
function ve(r) {
  return r.chart.showTemperature && !!r.temperatureEntity || r.chart.showHumidity && !!r.humidityEntity;
}
function $e(r) {
  return r.thermostat.enabled;
}
function bt(r) {
  if (r.height) return r.height;
  const t = ve(r) ? r.chart.height + 26 : 0, e = $e(r) ? 26 : 0;
  return 96 + t + e;
}
function Qt(r, t) {
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
const yi = {
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
}, gi = {
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
}, wi = yi;
function vt(r) {
  return (r ?? "en").toLowerCase().startsWith("de") ? "de" : "en";
}
function bi(r) {
  const t = vt(r) === "de" ? wi : gi;
  return {
    language: vt(r),
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
function q(r, t, e) {
  return Math.min(e, Math.max(t, r));
}
const te = /* @__PURE__ */ new Map();
function _i(r, t) {
  const e = `${r}|${t}`;
  let i = te.get(e);
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
    te.set(e, i);
  }
  return i;
}
function F(r, t, e) {
  return Number.isFinite(r) ? _i(t || "en", q(Math.round(e), 0, 3)).format(r) : "–";
}
function Tt(r) {
  if (r == null) return null;
  const t = String(r).trim();
  if (!t) return null;
  const e = t.replace(/\s/g, "").replace(",", ".");
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(e)) return null;
  const i = Number(e);
  return Number.isFinite(i) ? i : null;
}
function vi(r, t, e) {
  const i = Math.max(0, t - r), n = Math.floor(i / 6e4);
  if (n < 1) return e.justNow;
  if (n < 60) return `${n} ${e.minutes}`;
  const o = Math.floor(n / 60);
  return o < 24 ? `${o} ${e.hours}` : `${Math.floor(o / 24)} ${e.days}`;
}
function $i(r) {
  return r && r.trim().length ? r.trim() : "°C";
}
function $t(r) {
  const t = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(r.trim());
  if (!t) return null;
  let e = t[1];
  return e.length === 3 && (e = e.split("").map((i) => i + i).join("")), [
    parseInt(e.slice(0, 2), 16),
    parseInt(e.slice(2, 4), 16),
    parseInt(e.slice(4, 6), 16)
  ];
}
function xi(r) {
  return `#${r.map((t) => q(Math.round(t), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}
function nt(r, t) {
  const e = $t(r);
  if (e) return `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${q(t, 0, 1)})`;
  if (/^rgba?\(/i.test(r.trim())) {
    const i = r.match(/[\d.]+/g);
    if (i && i.length >= 3)
      return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${q(t, 0, 1)})`;
  }
  return `color-mix(in srgb, ${r} ${Math.round(q(t, 0, 1) * 100)}%, transparent)`;
}
function ut(r) {
  return r === "unavailable" || r === "unknown";
}
function st(r, t, e) {
  const i = e === "humidity" ? "%" : "°C";
  if (!t) return { value: null, status: "missing", unit: i };
  const n = r?.states[t];
  if (!n) return { value: null, status: "missing", unit: i };
  const o = n.attributes?.unit_of_measurement ?? i;
  if (ut(n.state))
    return { entity: n, value: null, status: "unavailable", unit: o };
  const s = Tt(n.state);
  return s === null ? { entity: n, value: null, status: "invalid", unit: o } : { entity: n, value: s, status: "ok", unit: o };
}
function Ci(r, t) {
  const e = t.window.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state;
  if (ut(n)) return { status: "unavailable", entity: i, rawState: n };
  const o = n.trim().toLowerCase();
  return t.window.openStates.includes(o) ? { status: "open", entity: i, rawState: n } : si.includes(o) ? { status: "closed", entity: i, rawState: n } : { status: "unknown", entity: i, rawState: n };
}
const Si = ["on", "detected", "motion", "occupied", "active"];
function Ai(r, t) {
  const e = t.motion.entity;
  if (!e) return { status: "missing" };
  const i = r?.states[e];
  if (!i) return { status: "missing" };
  const n = i.state, o = Date.parse(i.last_changed ?? i.last_updated ?? "");
  if (ut(n)) return { status: "unavailable", entity: i, rawState: n };
  const s = n.trim().toLowerCase();
  if (Si.includes(s))
    return { status: "active", entity: i, rawState: n };
  const l = { status: "idle", entity: i, rawState: n };
  return Number.isFinite(o) && (l.sinceMs = o), l;
}
const Ei = ["heating", "idle", "off", "cooling", "fan", "drying", "preheating", "defrosting"];
function ki(r, t, e) {
  const i = t.thermostat.entity, n = $i(
    r?.config?.unit_system?.temperature === "us_customary" ? "°F" : void 0
  );
  if (!i)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const o = r?.states[i];
  if (!o)
    return { status: "missing", label: e.t("unavailable"), colorKey: "unknown", setpoint: null, unit: n };
  const s = o.state?.toLowerCase(), l = o.attributes?.hvac_action, a = typeof l == "string" ? l.toLowerCase() : void 0, c = o.attributes?.temperature, u = typeof c == "number" ? c : typeof c == "string" ? Tt(c) : null, h = {
    entity: o,
    action: a,
    setpoint: u,
    unit: n,
    mode: s,
    modeLabel: s ? e.mode(s) : void 0
  };
  return ut(o.state ?? "") ? { ...h, status: "unavailable", label: e.t("unavailable"), colorKey: "unknown" } : s === "off" ? { ...h, status: "off", label: e.t("off"), colorKey: "off" } : a === "heating" ? { ...h, status: "heating", label: e.t("heating"), colorKey: "heating" } : a === "idle" ? { ...h, status: "idle", label: e.t("idle"), colorKey: "idle" } : a === "off" ? { ...h, status: "off", label: e.t("off"), colorKey: "off" } : a && !Ei.includes(a) ? { ...h, status: "action", label: e.action(a), colorKey: "idle" } : a ? { ...h, status: "action", label: e.action(a), colorKey: "idle" } : { ...h, status: "unknown", label: e.t("statusUnknown"), colorKey: "unknown" };
}
function Mi(r, t) {
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
function Z(r) {
  return typeof r == "object" && r !== null;
}
function Hi(r) {
  if (!Z(r)) return;
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
function Ti(r) {
  if (Z(r)) {
    if (typeof r.s == "string") return r.s;
    if (typeof r.state == "string") return r.state;
    if (typeof r.state == "number") return String(r.state);
  }
}
function ee(r) {
  if (!Array.isArray(r)) return [];
  const t = [];
  for (const i of r) {
    const n = Hi(i);
    if (n === void 0 || !Number.isFinite(n)) continue;
    const o = Ti(i), s = Tt(o);
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
function ie(r, t) {
  const e = {};
  for (const i of t) e[i] = [];
  if (Array.isArray(r)) {
    for (const i of r) {
      if (!Array.isArray(i) || !i.length) continue;
      const n = i[0], o = Z(n) && typeof n.entity_id == "string" ? n.entity_id : void 0;
      if (!o || !(o in e)) continue;
      const s = ee(i);
      e[o] = Ri(e[o], s);
    }
    return e;
  }
  if (Z(r))
    for (const i of t) {
      const n = r[i];
      if (n === void 0) continue;
      const o = Array.isArray(n) ? n : Z(n) && Array.isArray(n.data) ? n.data : n;
      e[i] = ee(o);
    }
  return e;
}
function Ri(r, t) {
  if (!r.length) return t;
  if (!t.length) return r;
  const e = [...r, ...t].sort((n, o) => n.t - o.t), i = [];
  for (const n of e) {
    const o = i[i.length - 1];
    o && o.t === n.t ? i[i.length - 1] = n : i.push(n);
  }
  return i;
}
async function Li(r, t, e) {
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
      }), c = ie(a, t);
      return Object.values(c).some((u) => u.length > 0), c;
    } catch (a) {
      if (!r.callApi) throw a;
    }
  if (typeof r.callApi != "function") return {};
  const s = `history/period/${encodeURIComponent(i)}?filter_entity_id=${t.map((a) => encodeURIComponent(a)).join(",")}&end_time=${encodeURIComponent(n)}&minimal_response&no_attributes`, l = await r.callApi("GET", s);
  return ie(l, t);
}
function Oi(r, t) {
  return `${[...r].sort().join("|")}@${t}`;
}
class Fi {
  constructor() {
    this.cache = /* @__PURE__ */ new Map(), this.inflight = /* @__PURE__ */ new Map();
  }
  async load(t, e, i, n = Date.now()) {
    const o = Oi(e, i), s = this.cache.get(o);
    if (s && n - s.fetchedAt < 12e4)
      return s.data;
    const l = this.inflight.get(o);
    if (l) return l;
    const a = Li(t, e, {
      start: n - i * 60 * 60 * 1e3,
      end: n
    }).then((c) => {
      if (this.cache.set(o, { fetchedAt: Date.now(), data: c }), this.cache.size > 24) {
        const u = this.cache.keys().next();
        u.done || this.cache.delete(u.value);
      }
      return c;
    }).finally(() => {
      this.inflight.delete(o);
    });
    return this.inflight.set(o, a), a;
  }
  clear() {
    this.cache.clear(), this.inflight.clear();
  }
}
const C = (r) => f`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${r}</svg>`, k = {
  thermometer: () => C(f`<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 16.5v-6" />`),
  water: () => C(f`<path d="M12 3.2c2.6 2.9 5.2 5.9 5.2 9.1a5.2 5.2 0 0 1-10.4 0c0-3.2 2.6-6.2 5.2-9.1Z" />`),
  windowClosed: () => C(
    f`<rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M12 4v16M3.5 12h17" />`
  ),
  windowOpen: () => C(
    f`<path d="M4 4.5h11.5V20H4z" /><path d="M15.5 7.5 20.5 4v16l-5-3.5" /><path d="M7.5 8.5h4" />`
  ),
  motion: () => C(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  motionOff: () => C(
    f`<circle cx="13" cy="4.4" r="1.9" /><path d="M10 21l2.6-5.6 3 1.9 2.2-4.6" /><path d="M7.4 13.4l3.4-2.7.9-3.4-3-1-2.8 3.6" />`
  ),
  flame: () => C(
    f`<path d="M12 21a6.3 6.3 0 0 1-6.3-6.3c0-2 .9-3.7 2.2-5.1.8-.9 2-2.1 2.7-3.4.5-.9.9-1.9 1.1-2.7.2-.7 1.1-.9 1.5-.3.8 1.3 1.8 3 2.4 4.6.5 1.2.7 2.3.7 3.2 0 1-.3 2-.8 2.8" /><path d="M12 21a3.4 3.4 0 0 1-3.4-3.4c0-1.4.8-2.5 1.7-3.5.5-.6 1-1.3 1.3-2 .1-.4.7-.4.8 0 .3.7.8 1.4 1.3 2 .9 1 1.7 2.1 1.7 3.5A3.4 3.4 0 0 1 12 21Z" />`
  ),
  radiator: () => C(
    f`<rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />`
  ),
  snowflake: () => C(f`<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />`),
  fan: () => C(
    f`<path d="M12 12a3 3 0 1 0 0 .01" /><path d="M12 9c0-3.5-1.6-6-4-6s-4 2-4 4.5S6 12 9 12" /><path d="M15 12c3.5 0 6-1.6 6-4s-2-4-4.5-4S12 6 12 9" /><path d="M12 15c0 3.5 1.6 6 4 6s4-2 4-4.5S18 12 15 12" /><path d="M9 12c-3.5 0-6 1.6-6 4s2 4 4.5 4S12 18 12 15" />`
  ),
  power: () => C(f`<path d="M12 3v9" /><path d="M7.5 6.3a7 7 0 1 0 9 0" />`),
  info: () => C(f`<circle cx="12" cy="12" r="9" /><path d="M12 11v5.5M12 7.8v.02" />`),
  chart: () => C(f`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" />`),
  home: () => C(
    f`<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1Z" />`
  )
}, $ = (r) => Number.isFinite(r) ? (Math.round(r * 100) / 100).toString() : "0";
function lt(r, t) {
  const [e, i] = r, [n, o] = t, s = i - e;
  if (!Number.isFinite(s) || s === 0) {
    const l = (n + o) / 2;
    return () => l;
  }
  return (l) => n + (l - e) / s * (o - n);
}
function re(r) {
  let t = 1 / 0, e = -1 / 0;
  for (const i of r)
    Number.isFinite(i) && (i < t && (t = i), i > e && (e = i));
  return !Number.isFinite(t) || !Number.isFinite(e) ? null : [t, e];
}
function ne(r, t, e = {}) {
  const { minSpan: i = 0.5, padding: n = 0.12 } = e;
  let o = r, s = t;
  if (s - o < i) {
    const a = (s + o) / 2;
    o = a - i / 2, s = a + i / 2;
  }
  const l = (s - o) * n;
  return [o - l, s + l];
}
function Di(r) {
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
function zi(r, t) {
  const e = Di(r), i = e > 0 ? e * 3 : 0, n = Math.min(180 * 1e3, Math.max(t / 20, 60 * 1e3));
  return Math.max(i, n);
}
function se(r, t) {
  const e = zi(r, t), i = [];
  let n = [], o = null;
  for (const s of r) {
    if (s.v === null || !Number.isFinite(s.v)) {
      n.length && i.push(n), n = [], o = null;
      continue;
    }
    o && s.t - o.t > e && (n.length && i.push(n), n = []), n.push(s), o = s;
  }
  return n.length && i.push(n), { runs: i };
}
function ot(r, t, e) {
  return r.map((i) => ({ x: t(i.t), y: e(i.v) }));
}
function xe(r) {
  if (!r.length) return "";
  let t = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let e = 1; e < r.length; e++)
    t += ` L ${$(r[e].x)} ${$(r[e].y)}`;
  return t;
}
function Ni(r) {
  if (r.length === 0) return "";
  if (r.length === 1) return `M ${$(r[0].x)} ${$(r[0].y)}`;
  if (r.length === 2) return xe(r);
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
    const l = n[s] / i[s], a = n[s + 1] / i[s], c = l * l + a * a;
    if (c > 9) {
      const u = 3 / Math.sqrt(c);
      n[s] = u * l * i[s], n[s + 1] = u * a * i[s];
    }
  }
  let o = `M ${$(r[0].x)} ${$(r[0].y)}`;
  for (let s = 0; s < t - 1; s++) {
    const l = r[s].x + e[s] / 3, a = r[s].y + n[s] * e[s] / 3, c = r[s + 1].x - e[s] / 3, u = r[s + 1].y - n[s + 1] * e[s] / 3;
    o += ` C ${$(l)} ${$(a)}, ${$(c)} ${$(u)}, ${$(
      r[s + 1].x
    )} ${$(r[s + 1].y)}`;
  }
  return o;
}
function xt(r, t) {
  return t ? Ni(r) : xe(r);
}
function oe(r, t, e) {
  if (!r.length) return "";
  const i = xt(r, e), n = r[0], o = r[r.length - 1];
  return `${i} L ${$(o.x)} ${$(t)} L ${$(n.x)} ${$(t)} Z`;
}
function Ct(r, t, e) {
  return r < t.cool ? e.cool : r < t.warm ? e.comfort : r < t.hot ? e.warm : e.hot;
}
function ae(r) {
  const { top: t, bottom: e, domain: i, thresholds: n, colors: o } = r, s = r.opacityTop ?? 1, l = r.opacityBottom ?? s, a = r.blendPx ?? 3, c = Math.max(1, e - t), u = lt(i, [e, t]), h = (g) => Math.min(1, Math.max(0, (g - t) / c)), b = (g) => {
    const x = Math.min(1, Math.max(0, (g - t) / c));
    return s + (l - s) * x;
  }, y = (g) => Ct(g, n, o), v = [
    { offset: 0, color: y(i[1]), opacity: b(t) }
  ];
  let E = y(i[1]);
  for (const g of [n.hot, n.warm, n.cool]) {
    const x = u(g);
    if (!Number.isFinite(x) || x <= t || x >= e) continue;
    const S = y(g - 1e-6);
    S !== E && (v.push({
      offset: h(Math.max(t, x - a / 2)),
      color: E,
      opacity: b(x - a / 2)
    }), v.push({
      offset: h(Math.min(e, x + a / 2)),
      color: S,
      opacity: b(x + a / 2)
    }), E = S);
  }
  v.push({ offset: 1, color: y(i[0]), opacity: b(e) });
  for (let g = 1; g < v.length; g++)
    v[g].offset <= v[g - 1].offset && (v[g].offset = Math.min(1, v[g - 1].offset + 1e-3));
  return v;
}
function Ii(r, t, e) {
  return [
    { offset: 0, color: r, opacity: t },
    { offset: 1, color: r, opacity: e }
  ];
}
function Bi(r, t, e) {
  if (!(t > r) || e < 2) return [];
  const i = [];
  for (let n = 0; n < e; n++)
    i.push(r + (t - r) * n / (e - 1));
  return i;
}
function Pi(r) {
  return r < 180 ? 2 : r < 300 ? 3 : r < 460 ? 4 : 5;
}
function le(r, t) {
  if (r.length <= t || t < 3) return r;
  const e = Math.ceil(r.length / t), i = [];
  for (let o = 0; o < r.length; o += e) i.push(r[o]);
  const n = r[r.length - 1];
  return i[i.length - 1] !== n && i.push(n), i;
}
const Ui = 320, Vi = 84;
let Ki = 0;
class Wi extends z {
  constructor() {
    super(...arguments), this.bandColors = {
      cool: "#38bdf8",
      comfort: "#34d399",
      warm: "#fbbf24",
      hot: "#f43f5e"
    }, this.bands = { cool: 19, warm: 25, hot: 28 }, this.humidityColor = "#34d399", this.start = Date.now() - 6 * 3600 * 1e3, this.end = Date.now(), this.showLegend = !1, this.showPoints = !1, this.showGrid = !0, this.curve = "smooth", this.language = "de", this.loading = !1, this.labels = {
      empty: "Keine Verlaufsdaten",
      emptyHint: "",
      loading: "Verlauf wird geladen …",
      error: "Verlauf konnte nicht geladen werden",
      aria: "Verlaufsdiagramm",
      temperature: "Temperatur",
      humidity: "Luftfeuchte"
    }, this.uid = `rcc-chart-${++Ki}`, this.width = 0, this.height = 0;
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
      language: { attribute: !1 },
      loading: { attribute: !1 },
      error: { attribute: !1 },
      labels: { attribute: !1 }
    };
  }
  static {
    this.styles = Et`
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
    const i = Math.round(t), n = Math.round(e);
    i === this.width && n === this.height || (this.width = i, this.height = n, this.requestUpdate());
  }
  /** Exposed for tests and the editor preview. */
  setSize(t, e) {
    this.applySize(t, e);
  }
  get chartSize() {
    return {
      width: this.width > 20 ? this.width : Ui,
      height: this.height > 20 ? this.height : Vi
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
    const i = f`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>`, n = f`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="M7.5 15.5l3.5-4 3 2.2 4.5-6" /></svg>`;
    return this.error && !this.hasData ? this.stateView(i, this.labels.error) : this.hasData ? p`<div class="wrap">${this.renderLegend(e)}${this.renderChart(t, e)}</div>` : this.loading ? this.stateView(n, this.labels.loading) : this.stateView(n, this.labels.empty, this.labels.emptyHint);
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
    const i = this.showLegend && e >= 96 ? 14 : 0, n = Math.max(20, e - i), o = n >= 62, s = o ? 13 : 2, l = 5, a = n - s, c = Math.max(6, a - l), u = 1, h = t - 1, b = Math.max(1, this.end - this.start), y = lt([this.start, this.end], [u, h]), v = (this.temperature ?? []).map((d) => d.v).filter((d) => d !== null && Number.isFinite(d)), E = (this.humidity ?? []).map((d) => d.v).filter((d) => d !== null && Number.isFinite(d)), g = re(v), x = re(E), S = g ? ne(g[0], g[1], { minSpan: 0.8, padding: 0.14 }) : null, mt = x ? ne(x[0], x[1], { minSpan: 6, padding: 0.16 }) : null, I = S ? lt(S, [a, l]) : null, B = mt ? lt(mt, [a, l]) : null, Rt = this.temperature ?? [], Lt = this.humidity ?? [], Ot = S ? se(Rt, b).runs : [], Ft = mt ? se(Lt, b).runs : [], Dt = Math.max(60, Math.floor(1200 / Math.max(1, Ot.length + Ft.length))), pt = Ot.map((d) => le(d, Dt)), ft = Ft.map((d) => le(d, Dt)), Se = S ? ae({
      top: l,
      bottom: a,
      domain: S,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 1,
      opacityBottom: 1
    }) : [], Ae = S ? ae({
      top: l,
      bottom: a,
      domain: S,
      thresholds: this.bands,
      colors: this.bandColors,
      opacityTop: 0.3,
      opacityBottom: 0.02
    }) : [], Ee = Ii(this.humidityColor, 0.28, 0.02), zt = [];
    if (this.showGrid)
      for (let d = 0; d < 3; d++) {
        const _ = l + c * d / 2;
        zt.push(f`<line class="grid-line" x1=${u} x2=${h} y1=${_} y2=${_} />`);
      }
    const Nt = o ? Bi(this.start, this.end, Pi(t)) : [], ke = Nt.map((d, _) => {
      const W = this.formatTime(d), gt = _ === 0 ? "start" : _ === Nt.length - 1 ? "end" : "middle";
      return f`<text class="axis-label" x=${y(d)} y=${n - 2} text-anchor=${gt}>
        ${W}
      </text>`;
    }), Me = pt.map((d) => {
      const _ = ot(d, y, I);
      return f`<path class="series-line" d=${xt(_, this.curve === "smooth")} style="stroke:${`url(#${this.uid}-temp-stroke)`}" />`;
    }), He = pt.map((d) => {
      const _ = ot(d, y, I);
      return f`<path d=${oe(_, a, this.curve === "smooth")} style="fill:url(#${this.uid}-temp-fill)" />`;
    }), Te = ft.map((d) => {
      const _ = ot(d, y, B);
      return f`<path class="series-line" d=${xt(_, this.curve === "smooth")} style="stroke:${this.humidityColor}" />`;
    }), Re = ft.map((d) => {
      const _ = ot(d, y, B);
      return f`<path d=${oe(_, a, this.curve === "smooth")} style="fill:url(#${this.uid}-humidity-fill)" />`;
    }), It = [];
    if (this.showPoints) {
      const d = (_, W, gt) => {
        const it = _.filter((rt) => rt.v !== null);
        if (!it.length) return;
        const Le = Math.max(1, Math.ceil(it.length / 24));
        it.forEach((rt, Bt) => {
          if (Bt % Le !== 0 && Bt !== it.length - 1) return;
          const Pt = rt.v;
          It.push(
            f`<circle class="point" r="1.9" cx=${y(rt.t)} cy=${W(Pt)} style="stroke:${gt(Pt)}" />`
          );
        });
      };
      I && pt.forEach(
        (_) => d(_, I, (W) => Ct(W, this.bands, this.bandColors))
      ), B && ft.forEach((_) => d(_, B, () => this.humidityColor));
    }
    const et = [...Rt].reverse().find((d) => d.v !== null), yt = [...Lt].reverse().find((d) => d.v !== null);
    return f`<svg
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
          ${Se.map(
      (d) => f`<stop offset=${d.offset} stop-color=${d.color} stop-opacity=${d.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-temp-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Ae.map(
      (d) => f`<stop offset=${d.offset} stop-color=${d.color} stop-opacity=${d.opacity} />`
    )}
        </linearGradient>
        <linearGradient id=${`${this.uid}-humidity-fill`} x1="0" y1=${l} x2="0" y2=${a} gradientUnits="userSpaceOnUse">
          ${Ee.map(
      (d) => f`<stop offset=${d.offset} stop-color=${d.color} stop-opacity=${d.opacity} />`
    )}
        </linearGradient>
      </defs>
      ${zt}
      <line class="baseline" x1=${u} x2=${h} y1=${a} y2=${a} />
      ${Re} ${He} ${Te} ${Me} ${It}
      ${yt && B ? f`<circle class="end-dot" r="2.6" cx=${y(yt.t)} cy=${B(yt.v)} style="fill:${this.humidityColor}" />` : m}
      ${et && I ? f`<circle
            class="end-dot"
            r="2.8"
            cx=${y(et.t)}
            cy=${I(et.v)}
            style="fill:${Ct(et.v, this.bands, this.bandColors)}"
          />` : m}
      ${ke}
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
const he = "room-climate-chart";
typeof customElements < "u" && !customElements.get(he) && customElements.define(he, Wi);
const ji = {
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
    grid: "Grid lines",
    legend: "Legend",
    points: "Data points",
    missingEntity: "Please select an entity.",
    loading: "Loading editor …",
    generalHelper: "Everything is optional – the card also works with a partial configuration."
  }
};
class Ce extends z {
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
    const t = vt(this.hass?.locale?.language ?? this.hass?.language);
    return ji[t];
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
    const i = this._config[t], n = typeof i == "number" ? i : Number(i);
    return Number.isFinite(n) ? n : e;
  }
  stringValue(t, e = "") {
    return Q(this._config[t]) ?? e;
  }
  colorValue(t, e) {
    const i = Q(this._config[t]) ?? e;
    return $t(i) ?? $t(e) ?? [148, 163, 184];
  }
  renderColor(t) {
    return this.renderField({
      key: t.key,
      label: t.label,
      selector: { color_rgb: {} },
      value: this.colorValue(t.key, t.fallback),
      disabled: t.disabled,
      onChange: (e) => {
        Array.isArray(e) && e.length >= 3 && this.patch({ [t.key]: xi(e) });
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
    const n = this.openSections.has(t);
    return p`<details class="section" ?open=${n} @toggle=${(o) => this.onToggle(t, o)}>
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
      ${this.renderColor({ key: "temperature_cool_color", label: t.coolColor, fallback: w.cool })}
      ${this.renderColor({
      key: "temperature_comfort_color",
      label: t.comfortColor,
      fallback: w.comfort
    })}
      ${this.renderColor({ key: "temperature_warm_color", label: t.warmColor, fallback: w.warm })}
      ${this.renderColor({ key: "temperature_hot_color", label: t.hotColor, fallback: w.hot })}
      ${this.renderColor({ key: "humidity_color", label: t.humidityColor, fallback: w.humidity })}
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
      fallback: w.humidityLow
    })}
      ${this.renderColor({
      key: "humidity_high_color",
      label: t.humidityHighColor,
      fallback: w.humidityHigh
    })}`;
  }
  renderWindow(t) {
    const e = this.showFlag("show_window", "window_entity"), i = T(this._config.window_entity);
    return p`${this.renderSwitch({
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
    return p`${this.renderSwitch({
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
      ${this.renderField({
      key: "chart_height",
      label: t.chartHeight,
      selector: { number: { min: 40, max: 240, step: 4, mode: "box", unit_of_measurement: "px" } },
      value: this.numberValue("chart_height", 84),
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
    this.styles = Et`
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
typeof customElements < "u" && !customElements.get(U) && customElements.define(U, Ce);
const ce = "#fbbf24", de = "#34d399", ue = "var(--rcc-neutral)";
class Gi extends z {
  constructor() {
    super(...arguments), this._history = {}, this._historyLoading = !1, this._density = "md", this._now = Date.now(), this._historyWindow = {
      start: Date.now() - 6 * 3600 * 1e3,
      end: Date.now()
    }, this.repository = new Fi(), this.historyKey = "", this.historyFetchedAt = 0, this.lastConnected = !0, this._haIconReady = typeof customElements < "u" && !!customElements.get("ha-icon");
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
    const e = hi(t);
    this._config = e, this.historyKeyFor(e) !== this.historyKey && (this.historyKey = "", this.ensureHistory()), e.height ? this.updateDensity(e.height) : this.updateDensity(0);
  }
  getConfig() {
    return this._config;
  }
  static getConfigElement() {
    return document.createElement(U);
  }
  getConfigElement() {
    return document.createElement(U);
  }
  static getStubConfig(t) {
    const e = t?.states ?? {}, i = Object.values(e), n = (h) => i.find(h)?.entity_id, o = n(
      (h) => h.entity_id.startsWith("sensor.") && h.attributes?.device_class === "temperature"
    ), s = n(
      (h) => h.entity_id.startsWith("sensor.") && h.attributes?.device_class === "humidity"
    ), l = n(
      (h) => h.entity_id.startsWith("binary_sensor.") && ["window", "door", "opening"].includes(String(h.attributes?.device_class))
    ), a = n(
      (h) => h.entity_id.startsWith("binary_sensor.") && h.attributes?.device_class === "motion"
    ), c = n((h) => h.entity_id.startsWith("climate.")), u = { type: `custom:${R}` };
    return o && (u.temperature_entity = o), s && (u.humidity_entity = s), l && (u.window_entity = l), a && (u.motion_entity = a), c && (u.climate_entity = c), u;
  }
  getCardSize() {
    return this._config ? Math.min(12, Math.max(2, Math.round(bt(this._config) / 50))) : 4;
  }
  getGridOptions() {
    const t = this._config ? bt(this._config) : 230;
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
    return bi(t);
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
    const e = t > 0 ? t : this._config ? this._config.height ?? bt(this._config) : 0;
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
      const i = this._config ? fi(this._config) : [];
      return i.length ? i.some((n) => e.states[n] !== this.hass?.states[n]) : !0;
    }
    return !0;
  }
  // ------------------------------------------------------------------- render
  render() {
    const t = this._config, e = this.translator();
    if (!t)
      return p`<div class="card theme-auto"><div class="empty">${e.t("roomClimate")}</div></div>`;
    const i = t.theme === "auto" ? "theme-auto" : `theme-${t.theme}`, n = [
      `--rcc-radius:${t.borderRadius}px`,
      t.height ? `--rcc-height:${t.height}px` : "",
      `--rcc-chart-height:${t.chart.height}px`
    ].filter(Boolean).join(";");
    return p`<div
      class="card ${i} density-${this._density} ${t.height ? "fixed-height" : "auto-height"}"
      style="${n}"
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
    return `${Qt(t, this.hass)} – ${e.t("roomClimate")}`;
  }
  renderEmpty(t) {
    return p`<div class="empty-state" role="status">
      ${k.info()}
      <span class="empty-title">${t.t("noEntities")}</span>
      <span class="empty-hint">${t.t("noEntitiesHint")}</span>
    </div>`;
  }
  renderHeader(t, e) {
    const i = Qt(t, this.hass), n = Ai(this.hass, t), o = Ci(this.hass, t), s = t.motion.enabled && t.motion.showLastChanged && n.status !== "active" && n.sinceMs !== void 0;
    return p`<div class="header">
      <div class="titles">
        <div class="name-row">
          <span class="room-icon" aria-hidden="true">${this.renderRoomIcon(t)}</span>
          <h2 class="name" title="${i}">${i}</h2>
        </div>
        ${s ? p`<div class="subtle">
              ${e.t("quietSince")}
              ${vi(n.sinceMs, this._now, {
      justNow: e.t("justNow"),
      minutes: e.t("minutesShort"),
      hours: e.t("hoursShort"),
      days: e.t("daysShort")
    })}
            </div>` : m}
      </div>
      <div class="badges">
        ${t.motion.enabled ? this.renderMotionBadge(n, e) : m}
        ${t.window.enabled ? this.renderWindowBadge(o, e) : m}
      </div>
    </div>`;
  }
  renderRoomIcon(t) {
    return this._haIconReady ? p`<ha-icon .icon=${t.icon}></ha-icon>` : k.home();
  }
  renderMotionBadge(t, e) {
    const i = t.status === "active", n = i ? de : ue, o = i ? e.t("motionDetected") : t.status === "unavailable" || t.status === "missing" ? e.t("unavailable") : e.t("motionIdle");
    return p`<span
      class="badge motion ${i ? "is-active" : "is-idle"}"
      style="--badge-color:${n};--badge-bg:${nt(i ? de : "#64748b", 0.14)}"
      title="${o}"
      aria-label="${o}"
      role="img"
      >${k.motion()}</span
    >`;
  }
  renderWindowBadge(t, e) {
    const i = t.status === "open", n = t.status === "open" ? e.t("windowOpen") : t.status === "closed" ? e.t("windowClosed") : t.status === "missing" || t.status === "unavailable" ? e.t("unavailable") : e.t("windowUnknown");
    return p`<span
      class="badge window ${i ? "is-open" : ""}"
      style="--badge-color:${i ? ce : ue};--badge-bg:${nt(i ? ce : "#64748b", i ? 0.16 : 0.12)}"
      title="${n}"
      aria-label="${n}"
      role="img"
      >${i ? k.windowOpen() : k.windowClosed()}</span
    >`;
  }
  renderMetrics(t, e) {
    if (!t.temperatureEntity && !t.humidityEntity) return m;
    const i = this.language(), n = st(this.hass, t.temperatureEntity, "temperature"), o = st(this.hass, t.humidityEntity, "humidity");
    return p`<div class="metrics">
      ${t.temperatureEntity ? p`<div
            class="metric temperature"
            role="group"
            aria-label="${e.t("temperature")}: ${this.sensorAria(n, i, t.temperatureDecimals, e)}"
          >
            <span
              class="value"
              style="color:${n.value !== null ? ui(n.value, t) : "var(--rcc-muted)"}"
              >${n.value !== null ? F(n.value, i, t.temperatureDecimals) : "–"}</span
            ><span class="unit">${n.unit}</span>
          </div>` : m}
      ${t.humidityEntity ? p`<div
            class="metric humidity"
            role="group"
            aria-label="${e.t("humidity")}: ${this.sensorAria(o, i, t.humidityDecimals, e)}"
          >
            <span class="drop-icon" aria-hidden="true">${k.water()}</span>
            <span
              class="humidity-value"
              style="color:${o.value !== null ? pi(o.value, t) : "var(--rcc-muted)"}"
              >${o.value !== null ? F(o.value, i, t.humidityDecimals) : "–"}</span
            ><span class="humidity-unit">${o.unit}</span>
          </div>` : m}
    </div>`;
  }
  sensorAria(t, e, i, n) {
    return t.value === null ? n.t("unavailable") : `${F(t.value, e, i)} ${t.unit}`;
  }
  /**
   * Target temperature above the actual temperature. The heating state is
   * conveyed only by the colour of the icon in front of it (red = heating,
   * green = idle, grey = off), never by an extra text label.
   */
  renderSetpointRow(t, e) {
    if (!$e(t)) return m;
    const i = ki(this.hass, t, e), n = t.thermostat.showSetpoint && i.setpoint !== null, o = t.thermostat.showStatus, s = t.thermostat.showMode && !!i.modeLabel;
    if (!n && !o && !s) return m;
    const l = Mi(i, t), a = this.thermostatAria(i), c = this.language(), u = i.setpoint !== null ? `${F(i.setpoint, c, t.temperatureDecimals)} ${i.unit}` : "";
    return p`<div class="setpoint-row">
      ${o ? p`<span
            class="hvac-icon is-${i.colorKey} status-${i.status}"
            style="--hvac-color:${l};--hvac-tint:${nt(l, 0.14)};--hvac-ring:${nt(
      l,
      0.32
    )}"
            role="img"
            aria-label="${a}"
            title="${a}"
            >${this.heatingIcon(i)}</span
          >` : m}
      ${n ? p`<span class="setpoint" title="${e.t("setpoint")} ${u}">
            <span class="setpoint-label">${e.t("setpoint")}</span>
            <span class="setpoint-value"
              >${F(i.setpoint, c, t.temperatureDecimals)}</span
            ><span class="setpoint-unit">${i.unit}</span>
          </span>` : m}
      ${s ? p`<span class="mode-label">${i.modeLabel}</span>` : m}
    </div>`;
  }
  /** Icon for the current HVAC action; the colour carries the state. */
  heatingIcon(t) {
    if (t.status === "action")
      switch (t.action) {
        case "cooling":
          return k.snowflake();
        case "fan":
          return k.fan();
        case "drying":
          return k.water();
        default:
          return k.flame();
      }
    return k.flame();
  }
  /** Accessible name of the HVAC icon: the state only, no duplicated text. */
  thermostatAria(t) {
    return t.label;
  }
  renderChart(t, e) {
    if (!ve(t)) return m;
    const i = t.chart.showTemperature && t.temperatureEntity ? this._history[t.temperatureEntity] : void 0, n = t.chart.showHumidity && t.humidityEntity ? this._history[t.humidityEntity] : void 0, o = this.language(), s = st(this.hass, t.temperatureEntity, "temperature"), l = st(this.hass, t.humidityEntity, "humidity"), a = {
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
        .humidity=${n}
        .temperatureValue=${s.value !== null ? `${F(s.value, o, t.temperatureDecimals)} ${s.unit}` : void 0}
        .humidityValue=${l.value !== null ? `${F(l.value, o, t.humidityDecimals)} ${l.unit}` : void 0}
        .bandColors=${t.bandColors}
        .bands=${t.bands}
        .humidityColor=${t.humidity.color}
        .start=${this._historyWindow.start}
        .end=${this._historyWindow.end}
        .showLegend=${t.chart.showLegend}
        .showPoints=${t.chart.showPoints}
        .showGrid=${t.chart.showGrid}
        .curve=${t.chart.curve}
        .language=${o}
        .loading=${this._historyLoading}
        .error=${this._historyError}
        .labels=${a}
      ></room-climate-chart>
    </div>`;
  }
  static {
    this.styles = Et`
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
      padding: 11px 14px 0;
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
  `%c ROOM-CLIMATE-CARD %c v${De} `,
  "color:#0b1120;background:#38bdf8;font-weight:600;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#38bdf8;background:#0b1120;font-weight:600;border-radius:0 3px 3px 0;padding:2px 4px"
);
customElements.get(R) || customElements.define(R, Gi);
customElements.get(U) || customElements.define(U, Ce);
const me = window.customCards = window.customCards ?? [];
me.some((r) => r.type === R) || me.push({
  type: R,
  name: Oe,
  description: Fe,
  preview: !0,
  documentationURL: "https://github.com/cercytrone/ha-room-climate-card"
});
export {
  R as CARD_TAG,
  De as CARD_VERSION,
  Gi as RoomClimateCard,
  Ce as RoomClimateCardEditor
};
//# sourceMappingURL=ha-room-climate-card.js.map
