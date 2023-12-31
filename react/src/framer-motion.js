!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e(exports, require("react"))
      : "function" == typeof define && define.amd
      ? define(["exports", "react"], e)
      : e(
          ((t =
            "undefined" != typeof globalThis
              ? globalThis
              : t || self).Motion = {}),
          t.React
        );
  })(this, function (t, e) {
    "use strict";
    function n(t) {
      return t && "object" == typeof t && "default" in t ? t : { default: t };
    }
    function s(t) {
      if (t && t.__esModule) return t;
      var e = Object.create(null);
      return (
        t &&
          Object.keys(t).forEach(function (n) {
            if ("default" !== n) {
              var s = Object.getOwnPropertyDescriptor(t, n);
              Object.defineProperty(
                e,
                n,
                s.get
                  ? s
                  : {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      }
                    }
              );
            }
          }),
        (e.default = t),
        Object.freeze(e)
      );
    }
    var i = s(e),
      o = n(e);
    const r = e.createContext({
        transformPagePoint: (t) => t,
        isStatic: !1,
        reducedMotion: "never"
      }),
      a = e.createContext({}),
      l = e.createContext(null),
      u = "undefined" != typeof document,
      c = u ? e.useLayoutEffect : e.useEffect,
      h = e.createContext({ strict: !1 });
    function d(t) {
      return (
        "object" == typeof t && Object.prototype.hasOwnProperty.call(t, "current")
      );
    }
    function m(t) {
      return "string" == typeof t || Array.isArray(t);
    }
    function p(t) {
      return "object" == typeof t && "function" == typeof t.start;
    }
    const f = [
        "animate",
        "whileInView",
        "whileFocus",
        "whileHover",
        "whileTap",
        "whileDrag",
        "exit"
      ],
      g = ["initial", ...f];
    function y(t) {
      return p(t.animate) || g.some((e) => m(t[e]));
    }
    function v(t) {
      return Boolean(y(t) || t.variants);
    }
    function x(t) {
      const { initial: n, animate: s } = (function (t, e) {
        if (y(t)) {
          const { initial: e, animate: n } = t;
          return {
            initial: !1 === e || m(e) ? e : void 0,
            animate: m(n) ? n : void 0
          };
        }
        return !1 !== t.inherit ? e : {};
      })(t, e.useContext(a));
      return e.useMemo(() => ({ initial: n, animate: s }), [P(n), P(s)]);
    }
    function P(t) {
      return Array.isArray(t) ? t.join(" ") : t;
    }
    const w = {
        animation: [
          "animate",
          "variants",
          "whileHover",
          "whileTap",
          "exit",
          "whileInView",
          "whileFocus",
          "whileDrag"
        ],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
      },
      E = {};
    for (const t in w) E[t] = { isEnabled: (e) => w[t].some((t) => !!e[t]) };
    function b(t) {
      for (const e in t) E[e] = { ...E[e], ...t[e] };
    }
    const S = e.createContext({}),
      A = e.createContext({}),
      T = Symbol.for("motionComponentSymbol");
    function C({
      preloadedFeatures: t,
      createVisualElement: n,
      useRender: s,
      useVisualState: o,
      Component: m
    }) {
      t && b(t);
      const p = e.forwardRef(function (p, f) {
        let g;
        const y = { ...e.useContext(r), ...p, layoutId: V(p) },
          { isStatic: v } = y,
          P = x(p),
          w = o(p, v);
        if (!v && u) {
          P.visualElement = (function (t, n, s, i) {
            const { visualElement: o } = e.useContext(a),
              u = e.useContext(h),
              d = e.useContext(l),
              m = e.useContext(r).reducedMotion,
              p = e.useRef();
            (i = i || u.renderer),
              !p.current &&
                i &&
                (p.current = i(t, {
                  visualState: n,
                  parent: o,
                  props: s,
                  presenceContext: d,
                  blockInitialAnimation: !!d && !1 === d.initial,
                  reducedMotionConfig: m
                }));
            const f = p.current;
            e.useInsertionEffect(() => {
              f && f.update(s, d);
            });
            const g = e.useRef(Boolean(window.HandoffAppearAnimations));
            return (
              c(() => {
                f &&
                  (f.render(),
                  g.current &&
                    f.animationState &&
                    f.animationState.animateChanges());
              }),
              e.useEffect(() => {
                f &&
                  (f.updateFeatures(),
                  !g.current &&
                    f.animationState &&
                    f.animationState.animateChanges(),
                  (window.HandoffAppearAnimations = void 0),
                  (g.current = !1));
              }),
              f
            );
          })(m, w, y, n);
          const s = e.useContext(A),
            i = e.useContext(h).strict;
          P.visualElement && (g = P.visualElement.loadFeatures(y, i, t, s));
        }
        return i.createElement(
          a.Provider,
          { value: P },
          g && P.visualElement
            ? i.createElement(g, { visualElement: P.visualElement, ...y })
            : null,
          s(
            m,
            p,
            (function (t, n, s) {
              return e.useCallback(
                (e) => {
                  e && t.mount && t.mount(e),
                    n && (e ? n.mount(e) : n.unmount()),
                    s &&
                      ("function" == typeof s ? s(e) : d(s) && (s.current = e));
                },
                [n]
              );
            })(w, P.visualElement, f),
            w,
            v,
            P.visualElement
          )
        );
      });
      return (p[T] = m), p;
    }
    function V({ layoutId: t }) {
      const n = e.useContext(S).id;
      return n && void 0 !== t ? n + "-" + t : t;
    }
    function M(t) {
      function e(e, n = {}) {
        return C(t(e, n));
      }
      if ("undefined" == typeof Proxy) return e;
      const n = new Map();
      return new Proxy(e, {
        get: (t, s) => (n.has(s) || n.set(s, e(s)), n.get(s))
      });
    }
    const D = [
      "animate",
      "circle",
      "defs",
      "desc",
      "ellipse",
      "g",
      "image",
      "line",
      "filter",
      "marker",
      "mask",
      "metadata",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "rect",
      "stop",
      "switch",
      "symbol",
      "svg",
      "text",
      "tspan",
      "use",
      "view"
    ];
    function L(t) {
      return (
        "string" == typeof t &&
        !t.includes("-") &&
        !!(D.indexOf(t) > -1 || /[A-Z]/.test(t))
      );
    }
    const R = {};
    function k(t) {
      Object.assign(R, t);
    }
    const B = [
        "transformPerspective",
        "x",
        "y",
        "z",
        "translateX",
        "translateY",
        "translateZ",
        "scale",
        "scaleX",
        "scaleY",
        "rotate",
        "rotateX",
        "rotateY",
        "rotateZ",
        "skew",
        "skewX",
        "skewY"
      ],
      j = new Set(B);
    function F(t, { layout: e, layoutId: n }) {
      return (
        j.has(t) ||
        t.startsWith("origin") ||
        ((e || void 0 !== n) && (!!R[t] || "opacity" === t))
      );
    }
    const O = (t) => Boolean(t && t.getVelocity),
      I = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
      },
      U = B.length;
    function W(
      t,
      { enableHardwareAcceleration: e = !0, allowTransformNone: n = !0 },
      s,
      i
    ) {
      let o = "";
      for (let e = 0; e < U; e++) {
        const n = B[e];
        if (void 0 !== t[n]) {
          o += `${I[n] || n}(${t[n]}) `;
        }
      }
      return (
        e && !t.z && (o += "translateZ(0)"),
        (o = o.trim()),
        i ? (o = i(t, s ? "" : o)) : n && s && (o = "none"),
        o
      );
    }
    const N = (t) => (e) => "string" == typeof e && e.startsWith(t),
      z = N("--"),
      H = N("var(--"),
      $ = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
      Y = (t, e, n) => Math.min(Math.max(n, t), e),
      X = {
        test: (t) => "number" == typeof t,
        parse: parseFloat,
        transform: (t) => t
      },
      G = { ...X, transform: (t) => Y(0, 1, t) },
      q = { ...X, default: 1 },
      Z = (t) => Math.round(1e5 * t) / 1e5,
      K = /(-)?([\d]*\.?[\d])+/g,
      _ = /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
      J = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
    function Q(t) {
      return "string" == typeof t;
    }
    const tt = (t) => ({
        test: (e) => Q(e) && e.endsWith(t) && 1 === e.split(" ").length,
        parse: parseFloat,
        transform: (e) => `${e}${t}`
      }),
      et = tt("deg"),
      nt = tt("%"),
      st = tt("px"),
      it = tt("vh"),
      ot = tt("vw"),
      rt = {
        ...nt,
        parse: (t) => nt.parse(t) / 100,
        transform: (t) => nt.transform(100 * t)
      },
      at = { ...X, transform: Math.round },
      lt = {
        borderWidth: st,
        borderTopWidth: st,
        borderRightWidth: st,
        borderBottomWidth: st,
        borderLeftWidth: st,
        borderRadius: st,
        radius: st,
        borderTopLeftRadius: st,
        borderTopRightRadius: st,
        borderBottomRightRadius: st,
        borderBottomLeftRadius: st,
        width: st,
        maxWidth: st,
        height: st,
        maxHeight: st,
        size: st,
        top: st,
        right: st,
        bottom: st,
        left: st,
        padding: st,
        paddingTop: st,
        paddingRight: st,
        paddingBottom: st,
        paddingLeft: st,
        margin: st,
        marginTop: st,
        marginRight: st,
        marginBottom: st,
        marginLeft: st,
        rotate: et,
        rotateX: et,
        rotateY: et,
        rotateZ: et,
        scale: q,
        scaleX: q,
        scaleY: q,
        scaleZ: q,
        skew: et,
        skewX: et,
        skewY: et,
        distance: st,
        translateX: st,
        translateY: st,
        translateZ: st,
        x: st,
        y: st,
        z: st,
        perspective: st,
        transformPerspective: st,
        opacity: G,
        originX: rt,
        originY: rt,
        originZ: st,
        zIndex: at,
        fillOpacity: G,
        strokeOpacity: G,
        numOctaves: at
      };
    function ut(t, e, n, s) {
      const { style: i, vars: o, transform: r, transformOrigin: a } = t;
      let l = !1,
        u = !1,
        c = !0;
      for (const t in e) {
        const n = e[t];
        if (z(t)) {
          o[t] = n;
          continue;
        }
        const s = lt[t],
          h = $(n, s);
        if (j.has(t)) {
          if (((l = !0), (r[t] = h), !c)) continue;
          n !== (s.default || 0) && (c = !1);
        } else t.startsWith("origin") ? ((u = !0), (a[t] = h)) : (i[t] = h);
      }
      if (
        (e.transform ||
          (l || s
            ? (i.transform = W(t.transform, n, c, s))
            : i.transform && (i.transform = "none")),
        u)
      ) {
        const { originX: t = "50%", originY: e = "50%", originZ: n = 0 } = a;
        i.transformOrigin = `${t} ${e} ${n}`;
      }
    }
    const ct = () => ({
      style: {},
      transform: {},
      transformOrigin: {},
      vars: {}
    });
    function ht(t, e, n) {
      for (const s in e) O(e[s]) || F(s, n) || (t[s] = e[s]);
    }
    function dt(t, n, s) {
      const i = {};
      return (
        ht(i, t.style || {}, t),
        Object.assign(
          i,
          (function ({ transformTemplate: t }, n, s) {
            return e.useMemo(() => {
              const e = {
                style: {},
                transform: {},
                transformOrigin: {},
                vars: {}
              };
              return (
                ut(e, n, { enableHardwareAcceleration: !s }, t),
                Object.assign({}, e.vars, e.style)
              );
            }, [n]);
          })(t, n, s)
        ),
        t.transformValues ? t.transformValues(i) : i
      );
    }
    function mt(t, e, n) {
      const s = {},
        i = dt(t, e, n);
      return (
        t.drag &&
          !1 !== t.dragListener &&
          ((s.draggable = !1),
          (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
          (i.touchAction =
            !0 === t.drag ? "none" : "pan-" + ("x" === t.drag ? "y" : "x"))),
        void 0 === t.tabIndex &&
          (t.onTap || t.onTapStart || t.whileTap) &&
          (s.tabIndex = 0),
        (s.style = i),
        s
      );
    }
    const pt = new Set([
      "animate",
      "exit",
      "variants",
      "initial",
      "style",
      "values",
      "variants",
      "transition",
      "transformTemplate",
      "transformValues",
      "custom",
      "inherit",
      "onLayoutAnimationStart",
      "onLayoutAnimationComplete",
      "onLayoutMeasure",
      "onBeforeLayoutMeasure",
      "onAnimationStart",
      "onAnimationComplete",
      "onUpdate",
      "onDragStart",
      "onDrag",
      "onDragEnd",
      "onMeasureDragConstraints",
      "onDirectionLock",
      "onDragTransitionEnd",
      "_dragX",
      "_dragY",
      "onHoverStart",
      "onHoverEnd",
      "onViewportEnter",
      "onViewportLeave",
      "ignoreStrict",
      "viewport"
    ]);
    function ft(t) {
      return (
        t.startsWith("while") ||
        (t.startsWith("drag") && "draggable" !== t) ||
        t.startsWith("layout") ||
        t.startsWith("onTap") ||
        t.startsWith("onPan") ||
        pt.has(t)
      );
    }
    let gt = (t) => !ft(t);
    function yt(t) {
      t && (gt = (e) => (e.startsWith("on") ? !ft(e) : t(e)));
    }
    try {
      yt(require("@emotion/is-prop-valid").default);
    } catch (t) {}
    function vt(t, e, n) {
      const s = {};
      for (const i in t)
        ("values" === i && "object" == typeof t.values) ||
          ((gt(i) ||
            (!0 === n && ft(i)) ||
            (!e && !ft(i)) ||
            (t.draggable && i.startsWith("onDrag"))) &&
            (s[i] = t[i]));
      return s;
    }
    function xt(t, e, n) {
      return "string" == typeof t ? t : st.transform(e + n * t);
    }
    const Pt = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
      wt = { offset: "strokeDashoffset", array: "strokeDasharray" };
    function Et(
      t,
      {
        attrX: e,
        attrY: n,
        attrScale: s,
        originX: i,
        originY: o,
        pathLength: r,
        pathSpacing: a = 1,
        pathOffset: l = 0,
        ...u
      },
      c,
      h,
      d
    ) {
      if ((ut(t, u, c, d), h))
        return void (t.style.viewBox && (t.attrs.viewBox = t.style.viewBox));
      (t.attrs = t.style), (t.style = {});
      const { attrs: m, style: p, dimensions: f } = t;
      m.transform && (f && (p.transform = m.transform), delete m.transform),
        f &&
          (void 0 !== i || void 0 !== o || p.transform) &&
          (p.transformOrigin = (function (t, e, n) {
            return `${xt(e, t.x, t.width)} ${xt(n, t.y, t.height)}`;
          })(f, void 0 !== i ? i : 0.5, void 0 !== o ? o : 0.5)),
        void 0 !== e && (m.x = e),
        void 0 !== n && (m.y = n),
        void 0 !== s && (m.scale = s),
        void 0 !== r &&
          (function (t, e, n = 1, s = 0, i = !0) {
            t.pathLength = 1;
            const o = i ? Pt : wt;
            t[o.offset] = st.transform(-s);
            const r = st.transform(e),
              a = st.transform(n);
            t[o.array] = `${r} ${a}`;
          })(m, r, a, l, !1);
    }
    const bt = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {},
        attrs: {}
      }),
      St = (t) => "string" == typeof t && "svg" === t.toLowerCase();
    function At(t, n, s, i) {
      const o = e.useMemo(() => {
        const e = {
          style: {},
          transform: {},
          transformOrigin: {},
          vars: {},
          attrs: {}
        };
        return (
          Et(
            e,
            n,
            { enableHardwareAcceleration: !1 },
            St(i),
            t.transformTemplate
          ),
          { ...e.attrs, style: { ...e.style } }
        );
      }, [n]);
      if (t.style) {
        const e = {};
        ht(e, t.style, t), (o.style = { ...e, ...o.style });
      }
      return o;
    }
    function Tt(t = !1) {
      return (n, s, i, { latestValues: o }, r) => {
        const a = (L(n) ? At : mt)(s, o, r, n),
          l = { ...vt(s, "string" == typeof n, t), ...a, ref: i },
          { children: u } = s,
          c = e.useMemo(() => (O(u) ? u.get() : u), [u]);
        return e.createElement(n, { ...l, children: c });
      };
    }
    const Ct = (t) => t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    function Vt(t, { style: e, vars: n }, s, i) {
      Object.assign(t.style, e, i && i.getProjectionStyles(s));
      for (const e in n) t.style.setProperty(e, n[e]);
    }
    const Mt = new Set([
      "baseFrequency",
      "diffuseConstant",
      "kernelMatrix",
      "kernelUnitLength",
      "keySplines",
      "keyTimes",
      "limitingConeAngle",
      "markerHeight",
      "markerWidth",
      "numOctaves",
      "targetX",
      "targetY",
      "surfaceScale",
      "specularConstant",
      "specularExponent",
      "stdDeviation",
      "tableValues",
      "viewBox",
      "gradientTransform",
      "pathLength",
      "startOffset",
      "textLength",
      "lengthAdjust"
    ]);
    function Dt(t, e, n, s) {
      Vt(t, e, void 0, s);
      for (const n in e.attrs) t.setAttribute(Mt.has(n) ? n : Ct(n), e.attrs[n]);
    }
    function Lt(t, e) {
      const { style: n } = t,
        s = {};
      for (const i in n)
        (O(n[i]) || (e.style && O(e.style[i])) || F(i, t)) && (s[i] = n[i]);
      return s;
    }
    function Rt(t, e) {
      const n = Lt(t, e);
      for (const s in t)
        if (O(t[s]) || O(e[s])) {
          n[
            -1 !== B.indexOf(s)
              ? "attr" + s.charAt(0).toUpperCase() + s.substring(1)
              : s
          ] = t[s];
        }
      return n;
    }
    function kt(t, e, n, s = {}, i = {}) {
      return (
        "function" == typeof e && (e = e(void 0 !== n ? n : t.custom, s, i)),
        "string" == typeof e && (e = t.variants && t.variants[e]),
        "function" == typeof e && (e = e(void 0 !== n ? n : t.custom, s, i)),
        e
      );
    }
    function Bt(t) {
      const n = e.useRef(null);
      return null === n.current && (n.current = t()), n.current;
    }
    const jt = (t) => Array.isArray(t);
    function Ft(t) {
      const e = O(t) ? t.get() : t;
      return (
        (n = e),
        Boolean(n && "object" == typeof n && n.mix && n.toValue) ? e.toValue() : e
      );
      var n;
    }
    const Ot = (t) => (n, s) => {
      const i = e.useContext(a),
        o = e.useContext(l),
        r = () =>
          (function (
            { scrapeMotionValuesFromProps: t, createRenderState: e, onMount: n },
            s,
            i,
            o
          ) {
            const r = { latestValues: It(s, i, o, t), renderState: e() };
            return n && (r.mount = (t) => n(s, t, r)), r;
          })(t, n, i, o);
      return s ? r() : Bt(r);
    };
    function It(t, e, n, s) {
      const i = {},
        o = s(t, {});
      for (const t in o) i[t] = Ft(o[t]);
      let { initial: r, animate: a } = t;
      const l = y(t),
        u = v(t);
      e &&
        u &&
        !l &&
        !1 !== t.inherit &&
        (void 0 === r && (r = e.initial), void 0 === a && (a = e.animate));
      let c = !!n && !1 === n.initial;
      c = c || !1 === r;
      const h = c ? a : r;
      if (h && "boolean" != typeof h && !p(h)) {
        (Array.isArray(h) ? h : [h]).forEach((e) => {
          const n = kt(t, e);
          if (!n) return;
          const { transitionEnd: s, transition: o, ...r } = n;
          for (const t in r) {
            let e = r[t];
            if (Array.isArray(e)) {
              e = e[c ? e.length - 1 : 0];
            }
            null !== e && (i[t] = e);
          }
          for (const t in s) i[t] = s[t];
        });
      }
      return i;
    }
    const Ut = (t) => t;
    const Wt = ["prepare", "read", "update", "preRender", "render", "postRender"];
    const { schedule: Nt, cancel: zt, state: Ht, steps: $t } = (function (t, e) {
        let n = !1,
          s = !0;
        const i = { delta: 0, timestamp: 0, isProcessing: !1 },
          o = Wt.reduce(
            (t, e) => (
              (t[e] = (function (t) {
                let e = [],
                  n = [],
                  s = 0,
                  i = !1,
                  o = !1;
                const r = new WeakSet(),
                  a = {
                    schedule: (t, o = !1, a = !1) => {
                      const l = a && i,
                        u = l ? e : n;
                      return (
                        o && r.add(t),
                        -1 === u.indexOf(t) &&
                          (u.push(t), l && i && (s = e.length)),
                        t
                      );
                    },
                    cancel: (t) => {
                      const e = n.indexOf(t);
                      -1 !== e && n.splice(e, 1), r.delete(t);
                    },
                    process: (l) => {
                      if (i) o = !0;
                      else {
                        if (
                          ((i = !0),
                          ([e, n] = [n, e]),
                          (n.length = 0),
                          (s = e.length),
                          s)
                        )
                          for (let n = 0; n < s; n++) {
                            const s = e[n];
                            s(l), r.has(s) && (a.schedule(s), t());
                          }
                        (i = !1), o && ((o = !1), a.process(l));
                      }
                    }
                  };
                return a;
              })(() => (n = !0))),
              t
            ),
            {}
          ),
          r = (t) => o[t].process(i),
          a = () => {
            const o = performance.now();
            (n = !1),
              (i.delta = s
                ? 1e3 / 60
                : Math.max(Math.min(o - i.timestamp, 40), 1)),
              (i.timestamp = o),
              (i.isProcessing = !0),
              Wt.forEach(r),
              (i.isProcessing = !1),
              n && e && ((s = !1), t(a));
          };
        return {
          schedule: Wt.reduce((e, r) => {
            const l = o[r];
            return (
              (e[r] = (e, o = !1, r = !1) => (
                n || ((n = !0), (s = !0), i.isProcessing || t(a)),
                l.schedule(e, o, r)
              )),
              e
            );
          }, {}),
          cancel: (t) => Wt.forEach((e) => o[e].cancel(t)),
          state: i,
          steps: o
        };
      })(
        "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : Ut,
        !0
      ),
      Yt = {
        useVisualState: Ot({
          scrapeMotionValuesFromProps: Rt,
          createRenderState: bt,
          onMount: (t, e, { renderState: n, latestValues: s }) => {
            Nt.read(() => {
              try {
                n.dimensions =
                  "function" == typeof e.getBBox
                    ? e.getBBox()
                    : e.getBoundingClientRect();
              } catch (t) {
                n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
              }
            }),
              Nt.render(() => {
                Et(
                  n,
                  s,
                  { enableHardwareAcceleration: !1 },
                  St(e.tagName),
                  t.transformTemplate
                ),
                  Dt(e, n);
              });
          }
        })
      },
      Xt = {
        useVisualState: Ot({
          scrapeMotionValuesFromProps: Lt,
          createRenderState: ct
        })
      };
    function Gt(t, { forwardMotionProps: e = !1 }, n, s) {
      return {
        ...(L(t) ? Yt : Xt),
        preloadedFeatures: n,
        useRender: Tt(e),
        createVisualElement: s,
        Component: t
      };
    }
    function qt(t, e, n, s = { passive: !0 }) {
      return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
    }
    const Zt = (t) =>
      "mouse" === t.pointerType
        ? "number" != typeof t.button || t.button <= 0
        : !1 !== t.isPrimary;
    function Kt(t, e = "page") {
      return { point: { x: t[e + "X"], y: t[e + "Y"] } };
    }
    const _t = (t) => (e) => Zt(e) && t(e, Kt(e));
    function Jt(t, e, n, s) {
      return qt(t, e, _t(n), s);
    }
    const Qt = (t, e) => (n) => e(t(n)),
      te = (...t) => t.reduce(Qt);
    function ee(t) {
      let e = null;
      return () => {
        const n = () => {
          e = null;
        };
        return null === e && ((e = t), n);
      };
    }
    const ne = ee("dragHorizontal"),
      se = ee("dragVertical");
    function ie(t) {
      let e = !1;
      if ("y" === t) e = se();
      else if ("x" === t) e = ne();
      else {
        const t = ne(),
          n = se();
        t && n
          ? (e = () => {
              t(), n();
            })
          : (t && t(), n && n());
      }
      return e;
    }
    function oe() {
      const t = ie(!0);
      return !t || (t(), !1);
    }
    class re {
      constructor(t) {
        (this.isMounted = !1), (this.node = t);
      }
      update() {}
    }
    function ae(t, e) {
      const n = "pointer" + (e ? "enter" : "leave"),
        s = "onHover" + (e ? "Start" : "End");
      return Jt(
        t.current,
        n,
        (n, i) => {
          if ("touch" === n.type || oe()) return;
          const o = t.getProps();
          t.animationState &&
            o.whileHover &&
            t.animationState.setActive("whileHover", e),
            o[s] && Nt.update(() => o[s](n, i));
        },
        { passive: !t.getProps()[s] }
      );
    }
    const le = (t, e) => !!e && (t === e || le(t, e.parentElement));
    function ue(t, e) {
      if (!e) return;
      const n = new PointerEvent("pointer" + t);
      e(n, Kt(n));
    }
    const ce = new WeakMap(),
      he = new WeakMap(),
      de = (t) => {
        const e = ce.get(t.target);
        e && e(t);
      },
      me = (t) => {
        t.forEach(de);
      };
    function pe(t, e, n) {
      const s = (function ({ root: t, ...e }) {
        const n = t || document;
        he.has(n) || he.set(n, {});
        const s = he.get(n),
          i = JSON.stringify(e);
        return (
          s[i] || (s[i] = new IntersectionObserver(me, { root: t, ...e })), s[i]
        );
      })(e);
      return (
        ce.set(t, n),
        s.observe(t),
        () => {
          ce.delete(t), s.unobserve(t);
        }
      );
    }
    const fe = { some: 0, all: 1 };
    const ge = {
      inView: {
        Feature: class extends re {
          constructor() {
            super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
          }
          startObserver() {
            this.unmount();
            const { viewport: t = {} } = this.node.getProps(),
              { root: e, margin: n, amount: s = "some", once: i } = t,
              o = {
                root: e ? e.current : void 0,
                rootMargin: n,
                threshold: "number" == typeof s ? s : fe[s]
              };
            return pe(this.node.current, o, (t) => {
              const { isIntersecting: e } = t;
              if (this.isInView === e) return;
              if (((this.isInView = e), i && !e && this.hasEnteredView)) return;
              e && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive("whileInView", e);
              const {
                  onViewportEnter: n,
                  onViewportLeave: s
                } = this.node.getProps(),
                o = e ? n : s;
              o && o(t);
            });
          }
          mount() {
            this.startObserver();
          }
          update() {
            if ("undefined" == typeof IntersectionObserver) return;
            const { props: t, prevProps: e } = this.node;
            ["amount", "margin", "root"].some(
              (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
                return (n) => t[n] !== e[n];
              })(t, e)
            ) && this.startObserver();
          }
          unmount() {}
        }
      },
      tap: {
        Feature: class extends re {
          constructor() {
            super(...arguments),
              (this.removeStartListeners = Ut),
              (this.removeEndListeners = Ut),
              (this.removeAccessibleListeners = Ut),
              (this.startPointerPress = (t, e) => {
                if ((this.removeEndListeners(), this.isPressing)) return;
                const n = this.node.getProps(),
                  s = Jt(
                    window,
                    "pointerup",
                    (t, e) => {
                      if (!this.checkPressEnd()) return;
                      const { onTap: n, onTapCancel: s } = this.node.getProps();
                      Nt.update(() => {
                        le(this.node.current, t.target)
                          ? n && n(t, e)
                          : s && s(t, e);
                      });
                    },
                    { passive: !(n.onTap || n.onPointerUp) }
                  ),
                  i = Jt(
                    window,
                    "pointercancel",
                    (t, e) => this.cancelPress(t, e),
                    { passive: !(n.onTapCancel || n.onPointerCancel) }
                  );
                (this.removeEndListeners = te(s, i)), this.startPress(t, e);
              }),
              (this.startAccessiblePress = () => {
                const t = qt(this.node.current, "keydown", (t) => {
                    if ("Enter" !== t.key || this.isPressing) return;
                    this.removeEndListeners(),
                      (this.removeEndListeners = qt(
                        this.node.current,
                        "keyup",
                        (t) => {
                          "Enter" === t.key &&
                            this.checkPressEnd() &&
                            ue("up", (t, e) => {
                              const { onTap: n } = this.node.getProps();
                              n && Nt.update(() => n(t, e));
                            });
                        }
                      )),
                      ue("down", (t, e) => {
                        this.startPress(t, e);
                      });
                  }),
                  e = qt(this.node.current, "blur", () => {
                    this.isPressing &&
                      ue("cancel", (t, e) => this.cancelPress(t, e));
                  });
                this.removeAccessibleListeners = te(t, e);
              });
          }
          startPress(t, e) {
            this.isPressing = !0;
            const { onTapStart: n, whileTap: s } = this.node.getProps();
            s &&
              this.node.animationState &&
              this.node.animationState.setActive("whileTap", !0),
              n && Nt.update(() => n(t, e));
          }
          checkPressEnd() {
            this.removeEndListeners(), (this.isPressing = !1);
            return (
              this.node.getProps().whileTap &&
                this.node.animationState &&
                this.node.animationState.setActive("whileTap", !1),
              !oe()
            );
          }
          cancelPress(t, e) {
            if (!this.checkPressEnd()) return;
            const { onTapCancel: n } = this.node.getProps();
            n && Nt.update(() => n(t, e));
          }
          mount() {
            const t = this.node.getProps(),
              e = Jt(this.node.current, "pointerdown", this.startPointerPress, {
                passive: !(t.onTapStart || t.onPointerStart)
              }),
              n = qt(this.node.current, "focus", this.startAccessiblePress);
            this.removeStartListeners = te(e, n);
          }
          unmount() {
            this.removeStartListeners(),
              this.removeEndListeners(),
              this.removeAccessibleListeners();
          }
        }
      },
      focus: {
        Feature: class extends re {
          constructor() {
            super(...arguments), (this.isActive = !1);
          }
          onFocus() {
            let t = !1;
            try {
              t = this.node.current.matches(":focus-visible");
            } catch (e) {
              t = !0;
            }
            t &&
              this.node.animationState &&
              (this.node.animationState.setActive("whileFocus", !0),
              (this.isActive = !0));
          }
          onBlur() {
            this.isActive &&
              this.node.animationState &&
              (this.node.animationState.setActive("whileFocus", !1),
              (this.isActive = !1));
          }
          mount() {
            this.unmount = te(
              qt(this.node.current, "focus", () => this.onFocus()),
              qt(this.node.current, "blur", () => this.onBlur())
            );
          }
          unmount() {}
        }
      },
      hover: {
        Feature: class extends re {
          mount() {
            this.unmount = te(ae(this.node, !0), ae(this.node, !1));
          }
          unmount() {}
        }
      }
    };
    function ye(t, e) {
      if (!Array.isArray(e)) return !1;
      const n = e.length;
      if (n !== t.length) return !1;
      for (let s = 0; s < n; s++) if (e[s] !== t[s]) return !1;
      return !0;
    }
    function ve(t, e, n) {
      const s = t.getProps();
      return kt(
        s,
        e,
        void 0 !== n ? n : s.custom,
        (function (t) {
          const e = {};
          return t.values.forEach((t, n) => (e[n] = t.get())), e;
        })(t),
        (function (t) {
          const e = {};
          return t.values.forEach((t, n) => (e[n] = t.getVelocity())), e;
        })(t)
      );
    }
    const xe = "data-" + Ct("framerAppearId");
    let Pe = Ut,
      we = Ut;
    const Ee = (t) => 1e3 * t,
      be = (t) => t / 1e3,
      Se = { current: !1 },
      Ae = (t) => Array.isArray(t) && "number" == typeof t[0];
    function Te(t) {
      return Boolean(
        !t ||
          ("string" == typeof t && Ve[t]) ||
          Ae(t) ||
          (Array.isArray(t) && t.every(Te))
      );
    }
    const Ce = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`,
      Ve = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: Ce([0, 0.65, 0.55, 1]),
        circOut: Ce([0.55, 0, 1, 0.45]),
        backIn: Ce([0.31, 0.01, 0.66, -0.59]),
        backOut: Ce([0.33, 1.53, 0.69, 0.99])
      };
    function Me(t) {
      if (t) return Ae(t) ? Ce(t) : Array.isArray(t) ? t.map(Me) : Ve[t];
    }
    function De(
      t,
      e,
      n,
      {
        delay: s = 0,
        duration: i,
        repeat: o = 0,
        repeatType: r = "loop",
        ease: a,
        times: l
      } = {}
    ) {
      const u = { [e]: n };
      l && (u.offset = l);
      const c = Me(a);
      return (
        Array.isArray(c) && (u.easing = c),
        t.animate(u, {
          delay: s,
          duration: i,
          easing: Array.isArray(c) ? "linear" : c,
          fill: "both",
          iterations: o + 1,
          direction: "reverse" === r ? "alternate" : "normal"
        })
      );
    }
    const Le = (t, e, n) =>
      (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t;
    function Re(t, e, n, s) {
      if (t === e && n === s) return Ut;
      const i = (e) =>
        (function (t, e, n, s, i) {
          let o,
            r,
            a = 0;
          do {
            (r = e + (n - e) / 2),
              (o = Le(r, s, i) - t),
              o > 0 ? (n = r) : (e = r);
          } while (Math.abs(o) > 1e-7 && ++a < 12);
          return r;
        })(e, 0, 1, t, n);
      return (t) => (0 === t || 1 === t ? t : Le(i(t), e, s));
    }
    const ke = Re(0.42, 0, 1, 1),
      Be = Re(0, 0, 0.58, 1),
      je = Re(0.42, 0, 0.58, 1),
      Fe = (t) => Array.isArray(t) && "number" != typeof t[0],
      Oe = (t) => (e) => (e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2),
      Ie = (t) => (e) => 1 - t(1 - e),
      Ue = (t) => 1 - Math.sin(Math.acos(t)),
      We = Ie(Ue),
      Ne = Oe(We),
      ze = Re(0.33, 1.53, 0.69, 0.99),
      He = Ie(ze),
      $e = Oe(He),
      Ye = (t) =>
        (t *= 2) < 1 ? 0.5 * He(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
      Xe = {
        linear: Ut,
        easeIn: ke,
        easeInOut: je,
        easeOut: Be,
        circIn: Ue,
        circInOut: Ne,
        circOut: We,
        backIn: He,
        backInOut: $e,
        backOut: ze,
        anticipate: Ye
      },
      Ge = (t) => {
        if (Array.isArray(t)) {
          we(4 === t.length);
          const [e, n, s, i] = t;
          return Re(e, n, s, i);
        }
        return "string" == typeof t ? (we(void 0 !== Xe[t]), Xe[t]) : t;
      },
      qe = (t, e) => (n) =>
        Boolean(
          (Q(n) && J.test(n) && n.startsWith(t)) ||
            (e && Object.prototype.hasOwnProperty.call(n, e))
        ),
      Ze = (t, e, n) => (s) => {
        if (!Q(s)) return s;
        const [i, o, r, a] = s.match(K);
        return {
          [t]: parseFloat(i),
          [e]: parseFloat(o),
          [n]: parseFloat(r),
          alpha: void 0 !== a ? parseFloat(a) : 1
        };
      },
      Ke = { ...X, transform: (t) => Math.round(((t) => Y(0, 255, t))(t)) },
      _e = {
        test: qe("rgb", "red"),
        parse: Ze("red", "green", "blue"),
        transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) =>
          "rgba(" +
          Ke.transform(t) +
          ", " +
          Ke.transform(e) +
          ", " +
          Ke.transform(n) +
          ", " +
          Z(G.transform(s)) +
          ")"
      };
    const Je = {
        test: qe("#"),
        parse: function (t) {
          let e = "",
            n = "",
            s = "",
            i = "";
          return (
            t.length > 5
              ? ((e = t.substring(1, 3)),
                (n = t.substring(3, 5)),
                (s = t.substring(5, 7)),
                (i = t.substring(7, 9)))
              : ((e = t.substring(1, 2)),
                (n = t.substring(2, 3)),
                (s = t.substring(3, 4)),
                (i = t.substring(4, 5)),
                (e += e),
                (n += n),
                (s += s),
                (i += i)),
            {
              red: parseInt(e, 16),
              green: parseInt(n, 16),
              blue: parseInt(s, 16),
              alpha: i ? parseInt(i, 16) / 255 : 1
            }
          );
        },
        transform: _e.transform
      },
      Qe = {
        test: qe("hsl", "hue"),
        parse: Ze("hue", "saturation", "lightness"),
        transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) =>
          "hsla(" +
          Math.round(t) +
          ", " +
          nt.transform(Z(e)) +
          ", " +
          nt.transform(Z(n)) +
          ", " +
          Z(G.transform(s)) +
          ")"
      },
      tn = {
        test: (t) => _e.test(t) || Je.test(t) || Qe.test(t),
        parse: (t) =>
          _e.test(t) ? _e.parse(t) : Qe.test(t) ? Qe.parse(t) : Je.parse(t),
        transform: (t) =>
          Q(t) ? t : t.hasOwnProperty("red") ? _e.transform(t) : Qe.transform(t)
      },
      en = (t, e, n) => -n * t + n * e + t;
    function nn(t, e, n) {
      return (
        n < 0 && (n += 1),
        n > 1 && (n -= 1),
        n < 1 / 6
          ? t + 6 * (e - t) * n
          : n < 0.5
          ? e
          : n < 2 / 3
          ? t + (e - t) * (2 / 3 - n) * 6
          : t
      );
    }
    const sn = (t, e, n) => {
        const s = t * t;
        return Math.sqrt(Math.max(0, n * (e * e - s) + s));
      },
      on = [Je, _e, Qe];
    function rn(t) {
      const e = ((n = t), on.find((t) => t.test(n)));
      var n;
      we(Boolean(e));
      let s = e.parse(t);
      return (
        e === Qe &&
          (s = (function ({ hue: t, saturation: e, lightness: n, alpha: s }) {
            (t /= 360), (n /= 100);
            let i = 0,
              o = 0,
              r = 0;
            if ((e /= 100)) {
              const s = n < 0.5 ? n * (1 + e) : n + e - n * e,
                a = 2 * n - s;
              (i = nn(a, s, t + 1 / 3)),
                (o = nn(a, s, t)),
                (r = nn(a, s, t - 1 / 3));
            } else i = o = r = n;
            return {
              red: Math.round(255 * i),
              green: Math.round(255 * o),
              blue: Math.round(255 * r),
              alpha: s
            };
          })(s)),
        s
      );
    }
    const an = (t, e) => {
      const n = rn(t),
        s = rn(e),
        i = { ...n };
      return (t) => (
        (i.red = sn(n.red, s.red, t)),
        (i.green = sn(n.green, s.green, t)),
        (i.blue = sn(n.blue, s.blue, t)),
        (i.alpha = en(n.alpha, s.alpha, t)),
        _e.transform(i)
      );
    };
    const ln = {
        regex: /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,
        countKey: "Vars",
        token: "${v}",
        parse: Ut
      },
      un = { regex: _, countKey: "Colors", token: "${c}", parse: tn.parse },
      cn = { regex: K, countKey: "Numbers", token: "${n}", parse: X.parse };
    function hn(t, { regex: e, countKey: n, token: s, parse: i }) {
      const o = t.tokenised.match(e);
      o &&
        ((t["num" + n] = o.length),
        (t.tokenised = t.tokenised.replace(e, s)),
        t.values.push(...o.map(i)));
    }
    function dn(t) {
      const e = t.toString(),
        n = {
          value: e,
          tokenised: e,
          values: [],
          numVars: 0,
          numColors: 0,
          numNumbers: 0
        };
      return n.value.includes("var(--") && hn(n, ln), hn(n, un), hn(n, cn), n;
    }
    function mn(t) {
      return dn(t).values;
    }
    function pn(t) {
      const { values: e, numColors: n, numVars: s, tokenised: i } = dn(t),
        o = e.length;
      return (t) => {
        let e = i;
        for (let i = 0; i < o; i++)
          e =
            i < s
              ? e.replace(ln.token, t[i])
              : i < s + n
              ? e.replace(un.token, tn.transform(t[i]))
              : e.replace(cn.token, Z(t[i]));
        return e;
      };
    }
    const fn = (t) => ("number" == typeof t ? 0 : t);
    const gn = {
        test: function (t) {
          var e, n;
          return (
            isNaN(t) &&
            Q(t) &&
            ((null === (e = t.match(K)) || void 0 === e ? void 0 : e.length) ||
              0) +
              ((null === (n = t.match(_)) || void 0 === n ? void 0 : n.length) ||
                0) >
              0
          );
        },
        parse: mn,
        createTransformer: pn,
        getAnimatableNone: function (t) {
          const e = mn(t);
          return pn(t)(e.map(fn));
        }
      },
      yn = (t, e) => (n) => "" + (n > 0 ? e : t);
    function vn(t, e) {
      return "number" == typeof t
        ? (n) => en(t, e, n)
        : tn.test(t)
        ? an(t, e)
        : t.startsWith("var(")
        ? yn(t, e)
        : wn(t, e);
    }
    const xn = (t, e) => {
        const n = [...t],
          s = n.length,
          i = t.map((t, n) => vn(t, e[n]));
        return (t) => {
          for (let e = 0; e < s; e++) n[e] = i[e](t);
          return n;
        };
      },
      Pn = (t, e) => {
        const n = { ...t, ...e },
          s = {};
        for (const i in n)
          void 0 !== t[i] && void 0 !== e[i] && (s[i] = vn(t[i], e[i]));
        return (t) => {
          for (const e in s) n[e] = s[e](t);
          return n;
        };
      },
      wn = (t, e) => {
        const n = gn.createTransformer(e),
          s = dn(t),
          i = dn(e);
        return s.numVars === i.numVars &&
          s.numColors === i.numColors &&
          s.numNumbers >= i.numNumbers
          ? te(xn(s.values, i.values), n)
          : (Pe(!0), yn(t, e));
      },
      En = (t, e, n) => {
        const s = e - t;
        return 0 === s ? 1 : (n - t) / s;
      },
      bn = (t, e) => (n) => en(t, e, n);
    function Sn(t, e, n) {
      const s = [],
        i =
          n ||
          ("number" == typeof (o = t[0])
            ? bn
            : "string" == typeof o
            ? tn.test(o)
              ? an
              : wn
            : Array.isArray(o)
            ? xn
            : "object" == typeof o
            ? Pn
            : bn);
      var o;
      const r = t.length - 1;
      for (let n = 0; n < r; n++) {
        let o = i(t[n], t[n + 1]);
        if (e) {
          const t = Array.isArray(e) ? e[n] || Ut : e;
          o = te(t, o);
        }
        s.push(o);
      }
      return s;
    }
    function An(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
      const o = t.length;
      if ((we(o === e.length), 1 === o)) return () => e[0];
      t[0] > t[o - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
      const r = Sn(e, s, i),
        a = r.length,
        l = (e) => {
          let n = 0;
          if (a > 1) for (; n < t.length - 2 && !(e < t[n + 1]); n++);
          const s = En(t[n], t[n + 1], e);
          return r[n](s);
        };
      return n ? (e) => l(Y(t[0], t[o - 1], e)) : l;
    }
    function Tn(t, e) {
      const n = t[t.length - 1];
      for (let s = 1; s <= e; s++) {
        const i = En(0, e, s);
        t.push(en(n, 1, i));
      }
    }
    function Cn(t) {
      const e = [0];
      return Tn(e, t.length - 1), e;
    }
    function Vn({
      duration: t = 300,
      keyframes: e,
      times: n,
      ease: s = "easeInOut"
    }) {
      const i = Fe(s) ? s.map(Ge) : Ge(s),
        o = { done: !1, value: e[0] },
        r = An(
          (function (t, e) {
            return t.map((t) => t * e);
          })(n && n.length === e.length ? n : Cn(e), t),
          e,
          {
            ease: Array.isArray(i)
              ? i
              : ((a = e), (l = i), a.map(() => l || je).splice(0, a.length - 1))
          }
        );
      var a, l;
      return {
        calculatedDuration: t,
        next: (e) => ((o.value = r(e)), (o.done = e >= t), o)
      };
    }
    function Mn(t, e) {
      return e ? t * (1e3 / e) : 0;
    }
    function Dn(t, e, n) {
      const s = Math.max(e - 5, 0);
      return Mn(n - t(s), e - s);
    }
    function Ln({
      duration: t = 800,
      bounce: e = 0.25,
      velocity: n = 0,
      mass: s = 1
    }) {
      let i, o;
      Pe(t <= Ee(10));
      let r = 1 - e;
      (r = Y(0.05, 1, r)),
        (t = Y(0.01, 10, be(t))),
        r < 1
          ? ((i = (e) => {
              const s = e * r,
                i = s * t;
              return 0.001 - ((s - n) / Rn(e, r)) * Math.exp(-i);
            }),
            (o = (e) => {
              const s = e * r * t,
                o = s * n + n,
                a = Math.pow(r, 2) * Math.pow(e, 2) * t,
                l = Math.exp(-s),
                u = Rn(Math.pow(e, 2), r);
              return ((0.001 - i(e) > 0 ? -1 : 1) * ((o - a) * l)) / u;
            }))
          : ((i = (e) => Math.exp(-e * t) * ((e - n) * t + 1) - 0.001),
            (o = (e) => Math.exp(-e * t) * (t * t * (n - e))));
      const a = (function (t, e, n) {
        let s = n;
        for (let n = 1; n < 12; n++) s -= t(s) / e(s);
        return s;
      })(i, o, 5 / t);
      if (((t = Ee(t)), isNaN(a)))
        return { stiffness: 100, damping: 10, duration: t };
      {
        const e = Math.pow(a, 2) * s;
        return { stiffness: e, damping: 2 * r * Math.sqrt(s * e), duration: t };
      }
    }
    function Rn(t, e) {
      return t * Math.sqrt(1 - e * e);
    }
    const kn = ["duration", "bounce"],
      Bn = ["stiffness", "damping", "mass"];
    function jn(t, e) {
      return e.some((e) => void 0 !== t[e]);
    }
    function Fn({ keyframes: t, restDelta: e, restSpeed: n, ...s }) {
      const i = t[0],
        o = t[t.length - 1],
        r = { done: !1, value: i },
        {
          stiffness: a,
          damping: l,
          mass: u,
          velocity: c,
          duration: h,
          isResolvedFromDuration: d
        } = (function (t) {
          let e = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...t
          };
          if (!jn(t, Bn) && jn(t, kn)) {
            const n = Ln(t);
            (e = { ...e, ...n, velocity: 0, mass: 1 }),
              (e.isResolvedFromDuration = !0);
          }
          return e;
        })(s),
        m = c ? -be(c) : 0,
        p = l / (2 * Math.sqrt(a * u)),
        f = o - i,
        g = be(Math.sqrt(a / u)),
        y = Math.abs(f) < 5;
      let v;
      if ((n || (n = y ? 0.01 : 2), e || (e = y ? 0.005 : 0.5), p < 1)) {
        const t = Rn(g, p);
        v = (e) => {
          const n = Math.exp(-p * g * e);
          return (
            o -
            n * (((m + p * g * f) / t) * Math.sin(t * e) + f * Math.cos(t * e))
          );
        };
      } else if (1 === p) v = (t) => o - Math.exp(-g * t) * (f + (m + g * f) * t);
      else {
        const t = g * Math.sqrt(p * p - 1);
        v = (e) => {
          const n = Math.exp(-p * g * e),
            s = Math.min(t * e, 300);
          return (
            o - (n * ((m + p * g * f) * Math.sinh(s) + t * f * Math.cosh(s))) / t
          );
        };
      }
      return {
        calculatedDuration: (d && h) || null,
        next: (t) => {
          const s = v(t);
          if (d) r.done = t >= h;
          else {
            let i = m;
            0 !== t && (i = p < 1 ? Dn(v, t, s) : 0);
            const a = Math.abs(i) <= n,
              l = Math.abs(o - s) <= e;
            r.done = a && l;
          }
          return (r.value = r.done ? o : s), r;
        }
      };
    }
    function On({
      keyframes: t,
      velocity: e = 0,
      power: n = 0.8,
      timeConstant: s = 325,
      bounceDamping: i = 10,
      bounceStiffness: o = 500,
      modifyTarget: r,
      min: a,
      max: l,
      restDelta: u = 0.5,
      restSpeed: c
    }) {
      const h = t[0],
        d = { done: !1, value: h },
        m = (t) =>
          void 0 === a
            ? l
            : void 0 === l || Math.abs(a - t) < Math.abs(l - t)
            ? a
            : l;
      let p = n * e;
      const f = h + p,
        g = void 0 === r ? f : r(f);
      g !== f && (p = g - h);
      const y = (t) => -p * Math.exp(-t / s),
        v = (t) => g + y(t),
        x = (t) => {
          const e = y(t),
            n = v(t);
          (d.done = Math.abs(e) <= u), (d.value = d.done ? g : n);
        };
      let P, w;
      const E = (t) => {
        var e;
        ((e = d.value), (void 0 !== a && e < a) || (void 0 !== l && e > l)) &&
          ((P = t),
          (w = Fn({
            keyframes: [d.value, m(d.value)],
            velocity: Dn(v, t, d.value),
            damping: i,
            stiffness: o,
            restDelta: u,
            restSpeed: c
          })));
      };
      return (
        E(0),
        {
          calculatedDuration: null,
          next: (t) => {
            let e = !1;
            return (
              w || void 0 !== P || ((e = !0), x(t), E(t)),
              void 0 !== P && t > P ? w.next(t - P) : (!e && x(t), d)
            );
          }
        }
      );
    }
    const In = (t) => {
      const e = ({ timestamp: e }) => t(e);
      return {
        start: () => Nt.update(e, !0),
        stop: () => zt(e),
        now: () => (Ht.isProcessing ? Ht.timestamp : performance.now())
      };
    };
    function Un(t) {
      let e = 0;
      let n = t.next(e);
      for (; !n.done && e < 2e4; ) (e += 50), (n = t.next(e));
      return e >= 2e4 ? 1 / 0 : e;
    }
    const Wn = { decay: On, inertia: On, tween: Vn, keyframes: Vn, spring: Fn };
    function Nn({
      autoplay: t = !0,
      delay: e = 0,
      driver: n = In,
      keyframes: s,
      type: i = "keyframes",
      repeat: o = 0,
      repeatDelay: r = 0,
      repeatType: a = "loop",
      onPlay: l,
      onStop: u,
      onComplete: c,
      onUpdate: h,
      ...d
    }) {
      let m,
        p,
        f = 1,
        g = !1;
      const y = () => {
        p = new Promise((t) => {
          m = t;
        });
      };
      let v;
      y();
      const x = Wn[i] || Vn;
      let P;
      x !== Vn &&
        "number" != typeof s[0] &&
        ((P = An([0, 100], s, { clamp: !1 })), (s = [0, 100]));
      const w = x({ ...d, keyframes: s });
      let E;
      "mirror" === a &&
        (E = x({
          ...d,
          keyframes: [...s].reverse(),
          velocity: -(d.velocity || 0)
        }));
      let b = "idle",
        S = null,
        A = null,
        T = null;
      null === w.calculatedDuration && o && (w.calculatedDuration = Un(w));
      const { calculatedDuration: C } = w;
      let V = 1 / 0,
        M = 1 / 0;
      null !== C && ((V = C + r), (M = V * (o + 1) - r));
      let D = 0;
      const L = (t) => {
          if (null === A) return;
          f > 0 && (A = Math.min(A, t)),
            f < 0 && (A = Math.min(t - M / f, A)),
            (D = null !== S ? S : Math.round(t - A) * f);
          const n = D - e * (f >= 0 ? 1 : -1),
            i = f >= 0 ? n < 0 : n > M;
          (D = Math.max(n, 0)), "finished" === b && null === S && (D = M);
          let l = D,
            u = w;
          if (o) {
            const t = D / V;
            let e = Math.floor(t),
              n = t % 1;
            !n && t >= 1 && (n = 1), 1 === n && e--, (e = Math.min(e, o + 1));
            const s = Boolean(e % 2);
            s &&
              ("reverse" === a
                ? ((n = 1 - n), r && (n -= r / V))
                : "mirror" === a && (u = E));
            let i = Y(0, 1, n);
            D > M && (i = "reverse" === a && s ? 1 : 0), (l = i * V);
          }
          const c = i ? { done: !1, value: s[0] } : u.next(l);
          P && (c.value = P(c.value));
          let { done: d } = c;
          i || null === C || (d = f >= 0 ? D >= M : D <= 0);
          const m = null === S && ("finished" === b || ("running" === b && d));
          return h && h(c.value), m && B(), c;
        },
        R = () => {
          v && v.stop(), (v = void 0);
        },
        k = () => {
          (b = "idle"), R(), m(), y(), (A = T = null);
        },
        B = () => {
          (b = "finished"), c && c(), R(), m();
        },
        j = () => {
          if (g) return;
          v || (v = n(L));
          const t = v.now();
          l && l(),
            null !== S ? (A = t - S) : (A && "finished" !== b) || (A = t),
            "finished" === b && y(),
            (T = A),
            (S = null),
            (b = "running"),
            v.start();
        };
      t && j();
      const F = {
        then: (t, e) => p.then(t, e),
        get time() {
          return be(D);
        },
        set time(t) {
          (t = Ee(t)),
            (D = t),
            null === S && v && 0 !== f ? (A = v.now() - t / f) : (S = t);
        },
        get duration() {
          const t = null === w.calculatedDuration ? Un(w) : w.calculatedDuration;
          return be(t);
        },
        get speed() {
          return f;
        },
        set speed(t) {
          t !== f && v && ((f = t), (F.time = be(D)));
        },
        get state() {
          return b;
        },
        play: j,
        pause: () => {
          (b = "paused"), (S = D);
        },
        stop: () => {
          (g = !0), "idle" !== b && ((b = "idle"), u && u(), k());
        },
        cancel: () => {
          null !== T && L(T), k();
        },
        complete: () => {
          b = "finished";
        },
        sample: (t) => ((A = 0), L(t))
      };
      return F;
    }
    function zn(t) {
      let e;
      return () => (void 0 === e && (e = t()), e);
    }
    const Hn = zn(() => Object.hasOwnProperty.call(Element.prototype, "animate")),
      $n = new Set([
        "opacity",
        "clipPath",
        "filter",
        "transform",
        "backgroundColor"
      ]);
    function Yn(t, e, { onUpdate: n, onComplete: s, ...i }) {
      if (
        !(
          Hn() &&
          $n.has(e) &&
          !i.repeatDelay &&
          "mirror" !== i.repeatType &&
          0 !== i.damping &&
          "inertia" !== i.type
        )
      )
        return !1;
      let o,
        r,
        a = !1;
      const l = () => {
        r = new Promise((t) => {
          o = t;
        });
      };
      l();
      let { keyframes: u, duration: c = 300, ease: h, times: d } = i;
      if (
        ((t, e) => "spring" === e.type || "backgroundColor" === t || !Te(e.ease))(
          e,
          i
        )
      ) {
        const t = Nn({ ...i, repeat: 0, delay: 0 });
        let e = { done: !1, value: u[0] };
        const n = [];
        let s = 0;
        for (; !e.done && s < 2e4; )
          (e = t.sample(s)), n.push(e.value), (s += 10);
        (d = void 0), (u = n), (c = s - 10), (h = "linear");
      }
      const m = De(t.owner.current, e, u, {
          ...i,
          duration: c,
          ease: h,
          times: d
        }),
        p = () => m.cancel(),
        f = () => {
          Nt.update(p), o(), l();
        };
      m.onfinish = () => {
        t.set(
          (function (t, { repeat: e, repeatType: n = "loop" }) {
            return t[e && "loop" !== n && e % 2 == 1 ? 0 : t.length - 1];
          })(u, i)
        ),
          s && s(),
          f();
      };
      return {
        then: (t, e) => r.then(t, e),
        attachTimeline: (t) => ((m.timeline = t), (m.onfinish = null), Ut),
        get time() {
          return be(m.currentTime || 0);
        },
        set time(t) {
          m.currentTime = Ee(t);
        },
        get speed() {
          return m.playbackRate;
        },
        set speed(t) {
          m.playbackRate = t;
        },
        get duration() {
          return be(c);
        },
        play: () => {
          a || (m.play(), zt(p));
        },
        pause: () => m.pause(),
        stop: () => {
          if (((a = !0), "idle" === m.playState)) return;
          const { currentTime: e } = m;
          if (e) {
            const n = Nn({ ...i, autoplay: !1 });
            t.setWithVelocity(n.sample(e - 10).value, n.sample(e).value, 10);
          }
          f();
        },
        complete: () => m.finish(),
        cancel: f
      };
    }
    const Xn = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
      Gn = { type: "keyframes", duration: 0.8 },
      qn = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
      Zn = (t, { keyframes: e }) =>
        e.length > 2
          ? Gn
          : j.has(t)
          ? t.startsWith("scale")
            ? {
                type: "spring",
                stiffness: 550,
                damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                restSpeed: 10
              }
            : Xn
          : qn,
      Kn = (t, e) =>
        "zIndex" !== t &&
        (!("number" != typeof e && !Array.isArray(e)) ||
          !(
            "string" != typeof e ||
            (!gn.test(e) && "0" !== e) ||
            e.startsWith("url(")
          )),
      _n = new Set(["brightness", "contrast", "saturate", "opacity"]);
    function Jn(t) {
      const [e, n] = t.slice(0, -1).split("(");
      if ("drop-shadow" === e) return t;
      const [s] = n.match(K) || [];
      if (!s) return t;
      const i = n.replace(s, "");
      let o = _n.has(e) ? 1 : 0;
      return s !== n && (o *= 100), e + "(" + o + i + ")";
    }
    const Qn = /([a-z-]*)\(.*?\)/g,
      ts = {
        ...gn,
        getAnimatableNone: (t) => {
          const e = t.match(Qn);
          return e ? e.map(Jn).join(" ") : t;
        }
      },
      es = {
        ...lt,
        color: tn,
        backgroundColor: tn,
        outlineColor: tn,
        fill: tn,
        stroke: tn,
        borderColor: tn,
        borderTopColor: tn,
        borderRightColor: tn,
        borderBottomColor: tn,
        borderLeftColor: tn,
        filter: ts,
        WebkitFilter: ts
      },
      ns = (t) => es[t];
    function ss(t, e) {
      let n = ns(t);
      return (
        n !== ts && (n = gn),
        n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
      );
    }
    const is = (t) => /^0[^.\s]+$/.test(t);
    function os(t) {
      return "number" == typeof t
        ? 0 === t
        : null !== t
        ? "none" === t || "0" === t || is(t)
        : void 0;
    }
    function rs(t, e) {
      return t[e] || t.default || t;
    }
    const as = (t, e, n, s = {}) => (i) => {
      const o = rs(s, t) || {},
        r = o.delay || s.delay || 0;
      let { elapsed: a = 0 } = s;
      a -= Ee(r);
      const l = (function (t, e, n, s) {
          const i = Kn(e, n);
          let o;
          o = Array.isArray(n) ? [...n] : [null, n];
          const r = void 0 !== s.from ? s.from : t.get();
          let a = void 0;
          const l = [];
          for (let t = 0; t < o.length; t++)
            null === o[t] && (o[t] = 0 === t ? r : o[t - 1]),
              os(o[t]) && l.push(t),
              "string" == typeof o[t] &&
                "none" !== o[t] &&
                "0" !== o[t] &&
                (a = o[t]);
          if (i && l.length && a)
            for (let t = 0; t < l.length; t++) {
              o[l[t]] = ss(e, a);
            }
          return o;
        })(e, t, n, o),
        u = l[0],
        c = l[l.length - 1],
        h = Kn(t, u),
        d = Kn(t, c);
      Pe(h === d);
      let m = {
        keyframes: l,
        velocity: e.getVelocity(),
        ease: "easeOut",
        ...o,
        delay: -a,
        onUpdate: (t) => {
          e.set(t), o.onUpdate && o.onUpdate(t);
        },
        onComplete: () => {
          i(), o.onComplete && o.onComplete();
        }
      };
      if (
        ((function ({
          when: t,
          delay: e,
          delayChildren: n,
          staggerChildren: s,
          staggerDirection: i,
          repeat: o,
          repeatType: r,
          repeatDelay: a,
          from: l,
          elapsed: u,
          ...c
        }) {
          return !!Object.keys(c).length;
        })(o) || (m = { ...m, ...Zn(t, m) }),
        m.duration && (m.duration = Ee(m.duration)),
        m.repeatDelay && (m.repeatDelay = Ee(m.repeatDelay)),
        !h || !d || Se.current || !1 === o.type)
      )
        return (function ({
          keyframes: t,
          delay: e,
          onUpdate: n,
          onComplete: s
        }) {
          const i = () => (
            n && n(t[t.length - 1]),
            s && s(),
            {
              time: 0,
              speed: 1,
              duration: 0,
              play: Ut,
              pause: Ut,
              stop: Ut,
              then: (t) => (t(), Promise.resolve()),
              cancel: Ut,
              complete: Ut
            }
          );
          return e
            ? Nn({ keyframes: [0, 1], duration: 0, delay: e, onComplete: i })
            : i();
        })(Se.current ? { ...m, delay: 0 } : m);
      if (
        e.owner &&
        e.owner.current instanceof HTMLElement &&
        !e.owner.getProps().onUpdate
      ) {
        const n = Yn(e, t, m);
        if (n) return n;
      }
      return Nn(m);
    };
    function ls(t) {
      return Boolean(O(t) && t.add);
    }
    const us = (t) => /^\-?\d*\.?\d+$/.test(t);
    function cs(t, e) {
      -1 === t.indexOf(e) && t.push(e);
    }
    function hs(t, e) {
      const n = t.indexOf(e);
      n > -1 && t.splice(n, 1);
    }
    class ds {
      constructor() {
        this.subscriptions = [];
      }
      add(t) {
        return cs(this.subscriptions, t), () => hs(this.subscriptions, t);
      }
      notify(t, e, n) {
        const s = this.subscriptions.length;
        if (s)
          if (1 === s) this.subscriptions[0](t, e, n);
          else
            for (let i = 0; i < s; i++) {
              const s = this.subscriptions[i];
              s && s(t, e, n);
            }
      }
      getSize() {
        return this.subscriptions.length;
      }
      clear() {
        this.subscriptions.length = 0;
      }
    }
    const ms = { current: void 0 };
    class ps {
      constructor(t, e = {}) {
        var n;
        (this.version = "10.16.1"),
          (this.timeDelta = 0),
          (this.lastUpdated = 0),
          (this.canTrackVelocity = !1),
          (this.events = {}),
          (this.updateAndNotify = (t, e = !0) => {
            (this.prev = this.current), (this.current = t);
            const { delta: n, timestamp: s } = Ht;
            this.lastUpdated !== s &&
              ((this.timeDelta = n),
              (this.lastUpdated = s),
              Nt.postRender(this.scheduleVelocityCheck)),
              this.prev !== this.current &&
                this.events.change &&
                this.events.change.notify(this.current),
              this.events.velocityChange &&
                this.events.velocityChange.notify(this.getVelocity()),
              e &&
                this.events.renderRequest &&
                this.events.renderRequest.notify(this.current);
          }),
          (this.scheduleVelocityCheck = () => Nt.postRender(this.velocityCheck)),
          (this.velocityCheck = ({ timestamp: t }) => {
            t !== this.lastUpdated &&
              ((this.prev = this.current),
              this.events.velocityChange &&
                this.events.velocityChange.notify(this.getVelocity()));
          }),
          (this.hasAnimated = !1),
          (this.prev = this.current = t),
          (this.canTrackVelocity = ((n = this.current), !isNaN(parseFloat(n)))),
          (this.owner = e.owner);
      }
      onChange(t) {
        return this.on("change", t);
      }
      on(t, e) {
        this.events[t] || (this.events[t] = new ds());
        const n = this.events[t].add(e);
        return "change" === t
          ? () => {
              n(),
                Nt.read(() => {
                  this.events.change.getSize() || this.stop();
                });
            }
          : n;
      }
      clearListeners() {
        for (const t in this.events) this.events[t].clear();
      }
      attach(t, e) {
        (this.passiveEffect = t), (this.stopPassiveEffect = e);
      }
      set(t, e = !0) {
        e && this.passiveEffect
          ? this.passiveEffect(t, this.updateAndNotify)
          : this.updateAndNotify(t, e);
      }
      setWithVelocity(t, e, n) {
        this.set(e), (this.prev = t), (this.timeDelta = n);
      }
      jump(t) {
        this.updateAndNotify(t),
          (this.prev = t),
          this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
      get() {
        return ms.current && ms.current.push(this), this.current;
      }
      getPrevious() {
        return this.prev;
      }
      getVelocity() {
        return this.canTrackVelocity
          ? Mn(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
          : 0;
      }
      start(t) {
        return (
          this.stop(),
          new Promise((e) => {
            (this.hasAnimated = !0),
              (this.animation = t(e)),
              this.events.animationStart && this.events.animationStart.notify();
          }).then(() => {
            this.events.animationComplete &&
              this.events.animationComplete.notify(),
              this.clearAnimation();
          })
        );
      }
      stop() {
        this.animation &&
          (this.animation.stop(),
          this.events.animationCancel && this.events.animationCancel.notify()),
          this.clearAnimation();
      }
      isAnimating() {
        return !!this.animation;
      }
      clearAnimation() {
        delete this.animation;
      }
      destroy() {
        this.clearListeners(),
          this.stop(),
          this.stopPassiveEffect && this.stopPassiveEffect();
      }
    }
    function fs(t, e) {
      return new ps(t, e);
    }
    const gs = (t) => (e) => e.test(t),
      ys = [
        X,
        st,
        nt,
        et,
        ot,
        it,
        { test: (t) => "auto" === t, parse: (t) => t }
      ],
      vs = (t) => ys.find(gs(t)),
      xs = [...ys, tn, gn];
    function Ps(t, e, n) {
      t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, fs(n));
    }
    function ws(t, e) {
      const n = ve(t, e);
      let { transitionEnd: s = {}, transition: i = {}, ...o } = n
        ? t.makeTargetAnimatable(n, !1)
        : {};
      o = { ...o, ...s };
      for (const e in o) {
        Ps(t, e, ((r = o[e]), jt(r) ? r[r.length - 1] || 0 : r));
      }
      var r;
    }
    function Es(t, e) {
      [...e].reverse().forEach((n) => {
        const s = t.getVariant(n);
        s && ws(t, s),
          t.variantChildren &&
            t.variantChildren.forEach((t) => {
              Es(t, e);
            });
      });
    }
    function bs(t, e, n) {
      var s, i;
      const o = Object.keys(e).filter((e) => !t.hasValue(e)),
        r = o.length;
      var a;
      if (r)
        for (let l = 0; l < r; l++) {
          const r = o[l],
            u = e[r];
          let c = null;
          Array.isArray(u) && (c = u[0]),
            null === c &&
              (c =
                null !==
                  (i =
                    null !== (s = n[r]) && void 0 !== s ? s : t.readValue(r)) &&
                void 0 !== i
                  ? i
                  : e[r]),
            null != c &&
              ("string" == typeof c && (us(c) || is(c))
                ? (c = parseFloat(c))
                : ((a = c), !xs.find(gs(a)) && gn.test(u) && (c = ss(r, u))),
              t.addValue(r, fs(c, { owner: t })),
              void 0 === n[r] && (n[r] = c),
              null !== c && t.setBaseTarget(r, c));
        }
    }
    function Ss(t, e) {
      if (!e) return;
      return (e[t] || e.default || e).from;
    }
    function As(t, e, n) {
      const s = {};
      for (const i in t) {
        const t = Ss(i, e);
        if (void 0 !== t) s[i] = t;
        else {
          const t = n.getValue(i);
          t && (s[i] = t.get());
        }
      }
      return s;
    }
    function Ts({ protectedKeys: t, needsAnimating: e }, n) {
      const s = t.hasOwnProperty(n) && !0 !== e[n];
      return (e[n] = !1), s;
    }
    function Cs(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
      let {
        transition: o = t.getDefaultTransition(),
        transitionEnd: r,
        ...a
      } = t.makeTargetAnimatable(e);
      const l = t.getValue("willChange");
      s && (o = s);
      const u = [],
        c = i && t.animationState && t.animationState.getState()[i];
      for (const e in a) {
        const s = t.getValue(e),
          i = a[e];
        if (!s || void 0 === i || (c && Ts(c, e))) continue;
        const r = { delay: n, elapsed: 0, ...o };
        if (window.HandoffAppearAnimations && !s.hasAnimated) {
          const n = t.getProps()[xe];
          n && (r.elapsed = window.HandoffAppearAnimations(n, e, s, Nt));
        }
        s.start(as(e, s, i, t.shouldReduceMotion && j.has(e) ? { type: !1 } : r));
        const h = s.animation;
        ls(l) && (l.add(e), h.then(() => l.remove(e))), u.push(h);
      }
      return (
        r &&
          Promise.all(u).then(() => {
            r && ws(t, r);
          }),
        u
      );
    }
    function Vs(t, e, n = {}) {
      const s = ve(t, e, n.custom);
      let { transition: i = t.getDefaultTransition() || {} } = s || {};
      n.transitionOverride && (i = n.transitionOverride);
      const o = s ? () => Promise.all(Cs(t, s, n)) : () => Promise.resolve(),
        r =
          t.variantChildren && t.variantChildren.size
            ? (s = 0) => {
                const {
                  delayChildren: o = 0,
                  staggerChildren: r,
                  staggerDirection: a
                } = i;
                return (function (t, e, n = 0, s = 0, i = 1, o) {
                  const r = [],
                    a = (t.variantChildren.size - 1) * s,
                    l = 1 === i ? (t = 0) => t * s : (t = 0) => a - t * s;
                  return (
                    Array.from(t.variantChildren)
                      .sort(Ms)
                      .forEach((t, s) => {
                        t.notify("AnimationStart", e),
                          r.push(
                            Vs(t, e, { ...o, delay: n + l(s) }).then(() =>
                              t.notify("AnimationComplete", e)
                            )
                          );
                      }),
                    Promise.all(r)
                  );
                })(t, e, o + s, r, a, n);
              }
            : () => Promise.resolve(),
        { when: a } = i;
      if (a) {
        const [t, e] = "beforeChildren" === a ? [o, r] : [r, o];
        return t().then(() => e());
      }
      return Promise.all([o(), r(n.delay)]);
    }
    function Ms(t, e) {
      return t.sortNodePosition(e);
    }
    function Ds(t, e, n = {}) {
      let s;
      if ((t.notify("AnimationStart", e), Array.isArray(e))) {
        const i = e.map((e) => Vs(t, e, n));
        s = Promise.all(i);
      } else if ("string" == typeof e) s = Vs(t, e, n);
      else {
        const i = "function" == typeof e ? ve(t, e, n.custom) : e;
        s = Promise.all(Cs(t, i, n));
      }
      return s.then(() => t.notify("AnimationComplete", e));
    }
    const Ls = [...f].reverse(),
      Rs = f.length;
    function ks(t) {
      let e = (function (t) {
        return (e) =>
          Promise.all(e.map(({ animation: e, options: n }) => Ds(t, e, n)));
      })(t);
      const n = {
        animate: js(!0),
        whileInView: js(),
        whileHover: js(),
        whileTap: js(),
        whileDrag: js(),
        whileFocus: js(),
        exit: js()
      };
      let s = !0;
      const i = (e, n) => {
        const s = ve(t, n);
        if (s) {
          const { transition: t, transitionEnd: n, ...i } = s;
          e = { ...e, ...i, ...n };
        }
        return e;
      };
      function o(o, r) {
        const a = t.getProps(),
          l = t.getVariantContext(!0) || {},
          u = [],
          c = new Set();
        let h = {},
          d = 1 / 0;
        for (let e = 0; e < Rs; e++) {
          const f = Ls[e],
            g = n[f],
            y = void 0 !== a[f] ? a[f] : l[f],
            v = m(y),
            x = f === r ? g.isActive : null;
          !1 === x && (d = e);
          let P = y === l[f] && y !== a[f] && v;
          if (
            (P && s && t.manuallyAnimateOnMount && (P = !1),
            (g.protectedKeys = { ...h }),
            (!g.isActive && null === x) ||
              (!y && !g.prevProp) ||
              p(y) ||
              "boolean" == typeof y)
          )
            continue;
          const w = Bs(g.prevProp, y);
          let E = w || (f === r && g.isActive && !P && v) || (e > d && v);
          const b = Array.isArray(y) ? y : [y];
          let S = b.reduce(i, {});
          !1 === x && (S = {});
          const { prevResolvedValues: A = {} } = g,
            T = { ...A, ...S },
            C = (t) => {
              (E = !0), c.delete(t), (g.needsAnimating[t] = !0);
            };
          for (const t in T) {
            const e = S[t],
              n = A[t];
            h.hasOwnProperty(t) ||
              (e !== n
                ? jt(e) && jt(n)
                  ? !ye(e, n) || w
                    ? C(t)
                    : (g.protectedKeys[t] = !0)
                  : void 0 !== e
                  ? C(t)
                  : c.add(t)
                : void 0 !== e && c.has(t)
                ? C(t)
                : (g.protectedKeys[t] = !0));
          }
          (g.prevProp = y),
            (g.prevResolvedValues = S),
            g.isActive && (h = { ...h, ...S }),
            s && t.blockInitialAnimation && (E = !1),
            E &&
              !P &&
              u.push(
                ...b.map((t) => ({ animation: t, options: { type: f, ...o } }))
              );
        }
        if (c.size) {
          const e = {};
          c.forEach((n) => {
            const s = t.getBaseTarget(n);
            void 0 !== s && (e[n] = s);
          }),
            u.push({ animation: e });
        }
        let f = Boolean(u.length);
        return (
          s && !1 === a.initial && !t.manuallyAnimateOnMount && (f = !1),
          (s = !1),
          f ? e(u) : Promise.resolve()
        );
      }
      return {
        animateChanges: o,
        setActive: function (e, s, i) {
          var r;
          if (n[e].isActive === s) return Promise.resolve();
          null === (r = t.variantChildren) ||
            void 0 === r ||
            r.forEach((t) => {
              var n;
              return null === (n = t.animationState) || void 0 === n
                ? void 0
                : n.setActive(e, s);
            }),
            (n[e].isActive = s);
          const a = o(i, e);
          for (const t in n) n[t].protectedKeys = {};
          return a;
        },
        setAnimateFunction: function (n) {
          e = n(t);
        },
        getState: () => n
      };
    }
    function Bs(t, e) {
      return "string" == typeof e ? e !== t : !!Array.isArray(e) && !ye(e, t);
    }
    function js(t = !1) {
      return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
      };
    }
    let Fs = 0;
    const Os = {
        animation: {
          Feature: class extends re {
            constructor(t) {
              super(t), t.animationState || (t.animationState = ks(t));
            }
            updateAnimationControlsSubscription() {
              const { animate: t } = this.node.getProps();
              this.unmount(), p(t) && (this.unmount = t.subscribe(this.node));
            }
            mount() {
              this.updateAnimationControlsSubscription();
            }
            update() {
              const { animate: t } = this.node.getProps(),
                { animate: e } = this.node.prevProps || {};
              t !== e && this.updateAnimationControlsSubscription();
            }
            unmount() {}
          }
        },
        exit: {
          Feature: class extends re {
            constructor() {
              super(...arguments), (this.id = Fs++);
            }
            update() {
              if (!this.node.presenceContext) return;
              const {
                  isPresent: t,
                  onExitComplete: e,
                  custom: n
                } = this.node.presenceContext,
                { isPresent: s } = this.node.prevPresenceContext || {};
              if (!this.node.animationState || t === s) return;
              const i = this.node.animationState.setActive("exit", !t, {
                custom: null != n ? n : this.node.getProps().custom
              });
              e &&
                !t &&
                i.then(() => {
                  e(this.id);
                });
            }
            mount() {
              const { register: t } = this.node.presenceContext || {};
              t && (this.unmount = t(this.id));
            }
            unmount() {}
          }
        }
      },
      Is = (t, e) => Math.abs(t - e);
    function Us(t, e) {
      const n = Is(t.x, e.x),
        s = Is(t.y, e.y);
      return Math.sqrt(n ** 2 + s ** 2);
    }
    class Ws {
      constructor(t, e, { transformPagePoint: n } = {}) {
        if (
          ((this.startEvent = null),
          (this.lastMoveEvent = null),
          (this.lastMoveEventInfo = null),
          (this.handlers = {}),
          (this.updatePoint = () => {
            if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
            const t = Hs(this.lastMoveEventInfo, this.history),
              e = null !== this.startEvent,
              n = Us(t.offset, { x: 0, y: 0 }) >= 3;
            if (!e && !n) return;
            const { point: s } = t,
              { timestamp: i } = Ht;
            this.history.push({ ...s, timestamp: i });
            const { onStart: o, onMove: r } = this.handlers;
            e ||
              (o && o(this.lastMoveEvent, t),
              (this.startEvent = this.lastMoveEvent)),
              r && r(this.lastMoveEvent, t);
          }),
          (this.handlePointerMove = (t, e) => {
            (this.lastMoveEvent = t),
              (this.lastMoveEventInfo = Ns(e, this.transformPagePoint)),
              Nt.update(this.updatePoint, !0);
          }),
          (this.handlePointerUp = (t, e) => {
            if ((this.end(), !this.lastMoveEvent || !this.lastMoveEventInfo))
              return;
            const { onEnd: n, onSessionEnd: s } = this.handlers,
              i = Hs(
                "pointercancel" === t.type
                  ? this.lastMoveEventInfo
                  : Ns(e, this.transformPagePoint),
                this.history
              );
            this.startEvent && n && n(t, i), s && s(t, i);
          }),
          !Zt(t))
        )
          return;
        (this.handlers = e), (this.transformPagePoint = n);
        const s = Ns(Kt(t), this.transformPagePoint),
          { point: i } = s,
          { timestamp: o } = Ht;
        this.history = [{ ...i, timestamp: o }];
        const { onSessionStart: r } = e;
        r && r(t, Hs(s, this.history)),
          (this.removeListeners = te(
            Jt(window, "pointermove", this.handlePointerMove),
            Jt(window, "pointerup", this.handlePointerUp),
            Jt(window, "pointercancel", this.handlePointerUp)
          ));
      }
      updateHandlers(t) {
        this.handlers = t;
      }
      end() {
        this.removeListeners && this.removeListeners(), zt(this.updatePoint);
      }
    }
    function Ns(t, e) {
      return e ? { point: e(t.point) } : t;
    }
    function zs(t, e) {
      return { x: t.x - e.x, y: t.y - e.y };
    }
    function Hs({ point: t }, e) {
      return {
        point: t,
        delta: zs(t, Ys(e)),
        offset: zs(t, $s(e)),
        velocity: Xs(e, 0.1)
      };
    }
    function $s(t) {
      return t[0];
    }
    function Ys(t) {
      return t[t.length - 1];
    }
    function Xs(t, e) {
      if (t.length < 2) return { x: 0, y: 0 };
      let n = t.length - 1,
        s = null;
      const i = Ys(t);
      for (; n >= 0 && ((s = t[n]), !(i.timestamp - s.timestamp > Ee(e))); ) n--;
      if (!s) return { x: 0, y: 0 };
      const o = be(i.timestamp - s.timestamp);
      if (0 === o) return { x: 0, y: 0 };
      const r = { x: (i.x - s.x) / o, y: (i.y - s.y) / o };
      return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
    }
    function Gs(t) {
      return t.max - t.min;
    }
    function qs(t, e = 0, n = 0.01) {
      return Math.abs(t - e) <= n;
    }
    function Zs(t, e, n, s = 0.5) {
      (t.origin = s),
        (t.originPoint = en(e.min, e.max, t.origin)),
        (t.scale = Gs(n) / Gs(e)),
        (qs(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1),
        (t.translate = en(n.min, n.max, t.origin) - t.originPoint),
        (qs(t.translate) || isNaN(t.translate)) && (t.translate = 0);
    }
    function Ks(t, e, n, s) {
      Zs(t.x, e.x, n.x, s ? s.originX : void 0),
        Zs(t.y, e.y, n.y, s ? s.originY : void 0);
    }
    function _s(t, e, n) {
      (t.min = n.min + e.min), (t.max = t.min + Gs(e));
    }
    function Js(t, e, n) {
      (t.min = e.min - n.min), (t.max = t.min + Gs(e));
    }
    function Qs(t, e, n) {
      Js(t.x, e.x, n.x), Js(t.y, e.y, n.y);
    }
    function ti(t, e, n) {
      return {
        min: void 0 !== e ? t.min + e : void 0,
        max: void 0 !== n ? t.max + n - (t.max - t.min) : void 0
      };
    }
    function ei(t, e) {
      let n = e.min - t.min,
        s = e.max - t.max;
      return (
        e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s }
      );
    }
    const ni = 0.35;
    function si(t, e, n) {
      return { min: ii(t, e), max: ii(t, n) };
    }
    function ii(t, e) {
      return "number" == typeof t ? t : t[e] || 0;
    }
    const oi = () => ({ x: { min: 0, max: 0 }, y: { min: 0, max: 0 } });
    function ri(t) {
      return [t("x"), t("y")];
    }
    function ai({ top: t, left: e, right: n, bottom: s }) {
      return { x: { min: e, max: n }, y: { min: t, max: s } };
    }
    function li(t) {
      return void 0 === t || 1 === t;
    }
    function ui({ scale: t, scaleX: e, scaleY: n }) {
      return !li(t) || !li(e) || !li(n);
    }
    function ci(t) {
      return ui(t) || hi(t) || t.z || t.rotate || t.rotateX || t.rotateY;
    }
    function hi(t) {
      return di(t.x) || di(t.y);
    }
    function di(t) {
      return t && "0%" !== t;
    }
    function mi(t, e, n) {
      return n + e * (t - n);
    }
    function pi(t, e, n, s, i) {
      return void 0 !== i && (t = mi(t, i, s)), mi(t, n, s) + e;
    }
    function fi(t, e = 0, n = 1, s, i) {
      (t.min = pi(t.min, e, n, s, i)), (t.max = pi(t.max, e, n, s, i));
    }
    function gi(t, { x: e, y: n }) {
      fi(t.x, e.translate, e.scale, e.originPoint),
        fi(t.y, n.translate, n.scale, n.originPoint);
    }
    function yi(t) {
      return Number.isInteger(t) || t > 1.0000000000001 || t < 0.999999999999
        ? t
        : 1;
    }
    function vi(t, e) {
      (t.min = t.min + e), (t.max = t.max + e);
    }
    function xi(t, e, [n, s, i]) {
      const o = void 0 !== e[i] ? e[i] : 0.5,
        r = en(t.min, t.max, o);
      fi(t, e[n], e[s], r, e.scale);
    }
    const Pi = ["x", "scaleX", "originX"],
      wi = ["y", "scaleY", "originY"];
    function Ei(t, e) {
      xi(t.x, e, Pi), xi(t.y, e, wi);
    }
    function bi(t, e) {
      return ai(
        (function (t, e) {
          if (!e) return t;
          const n = e({ x: t.left, y: t.top }),
            s = e({ x: t.right, y: t.bottom });
          return { top: n.y, left: n.x, bottom: s.y, right: s.x };
        })(t.getBoundingClientRect(), e)
      );
    }
    const Si = new WeakMap();
    class Ai {
      constructor(t) {
        (this.openGlobalLock = null),
          (this.isDragging = !1),
          (this.currentDirection = null),
          (this.originPoint = { x: 0, y: 0 }),
          (this.constraints = !1),
          (this.hasMutatedConstraints = !1),
          (this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
          (this.visualElement = t);
      }
      start(t, { snapToCursor: e = !1 } = {}) {
        const { presenceContext: n } = this.visualElement;
        if (n && !1 === n.isPresent) return;
        this.panSession = new Ws(
          t,
          {
            onSessionStart: (t) => {
              this.stopAnimation(), e && this.snapToCursor(Kt(t, "page").point);
            },
            onStart: (t, e) => {
              const {
                drag: n,
                dragPropagation: s,
                onDragStart: i
              } = this.getProps();
              if (
                n &&
                !s &&
                (this.openGlobalLock && this.openGlobalLock(),
                (this.openGlobalLock = ie(n)),
                !this.openGlobalLock)
              )
                return;
              (this.isDragging = !0),
                (this.currentDirection = null),
                this.resolveConstraints(),
                this.visualElement.projection &&
                  ((this.visualElement.projection.isAnimationBlocked = !0),
                  (this.visualElement.projection.target = void 0)),
                ri((t) => {
                  let e = this.getAxisMotionValue(t).get() || 0;
                  if (nt.test(e)) {
                    const { projection: n } = this.visualElement;
                    if (n && n.layout) {
                      const s = n.layout.layoutBox[t];
                      if (s) {
                        e = Gs(s) * (parseFloat(e) / 100);
                      }
                    }
                  }
                  this.originPoint[t] = e;
                }),
                i && Nt.update(() => i(t, e), !1, !0);
              const { animationState: o } = this.visualElement;
              o && o.setActive("whileDrag", !0);
            },
            onMove: (t, e) => {
              const {
                dragPropagation: n,
                dragDirectionLock: s,
                onDirectionLock: i,
                onDrag: o
              } = this.getProps();
              if (!n && !this.openGlobalLock) return;
              const { offset: r } = e;
              if (s && null === this.currentDirection)
                return (
                  (this.currentDirection = (function (t, e = 10) {
                    let n = null;
                    Math.abs(t.y) > e
                      ? (n = "y")
                      : Math.abs(t.x) > e && (n = "x");
                    return n;
                  })(r)),
                  void (
                    null !== this.currentDirection &&
                    i &&
                    i(this.currentDirection)
                  )
                );
              this.updateAxis("x", e.point, r),
                this.updateAxis("y", e.point, r),
                this.visualElement.render(),
                o && o(t, e);
            },
            onSessionEnd: (t, e) => this.stop(t, e)
          },
          { transformPagePoint: this.visualElement.getTransformPagePoint() }
        );
      }
      stop(t, e) {
        const n = this.isDragging;
        if ((this.cancel(), !n)) return;
        const { velocity: s } = e;
        this.startAnimation(s);
        const { onDragEnd: i } = this.getProps();
        i && Nt.update(() => i(t, e));
      }
      cancel() {
        this.isDragging = !1;
        const { projection: t, animationState: e } = this.visualElement;
        t && (t.isAnimationBlocked = !1),
          this.panSession && this.panSession.end(),
          (this.panSession = void 0);
        const { dragPropagation: n } = this.getProps();
        !n &&
          this.openGlobalLock &&
          (this.openGlobalLock(), (this.openGlobalLock = null)),
          e && e.setActive("whileDrag", !1);
      }
      updateAxis(t, e, n) {
        const { drag: s } = this.getProps();
        if (!n || !Ti(t, s, this.currentDirection)) return;
        const i = this.getAxisMotionValue(t);
        let o = this.originPoint[t] + n[t];
        this.constraints &&
          this.constraints[t] &&
          (o = (function (t, { min: e, max: n }, s) {
            return (
              void 0 !== e && t < e
                ? (t = s ? en(e, t, s.min) : Math.max(t, e))
                : void 0 !== n &&
                  t > n &&
                  (t = s ? en(n, t, s.max) : Math.min(t, n)),
              t
            );
          })(o, this.constraints[t], this.elastic[t])),
          i.set(o);
      }
      resolveConstraints() {
        const { dragConstraints: t, dragElastic: e } = this.getProps(),
          { layout: n } = this.visualElement.projection || {},
          s = this.constraints;
        t && d(t)
          ? this.constraints || (this.constraints = this.resolveRefConstraints())
          : (this.constraints =
              !(!t || !n) &&
              (function (t, { top: e, left: n, bottom: s, right: i }) {
                return { x: ti(t.x, n, i), y: ti(t.y, e, s) };
              })(n.layoutBox, t)),
          (this.elastic = (function (t = ni) {
            return (
              !1 === t ? (t = 0) : !0 === t && (t = ni),
              { x: si(t, "left", "right"), y: si(t, "top", "bottom") }
            );
          })(e)),
          s !== this.constraints &&
            n &&
            this.constraints &&
            !this.hasMutatedConstraints &&
            ri((t) => {
              this.getAxisMotionValue(t) &&
                (this.constraints[t] = (function (t, e) {
                  const n = {};
                  return (
                    void 0 !== e.min && (n.min = e.min - t.min),
                    void 0 !== e.max && (n.max = e.max - t.min),
                    n
                  );
                })(n.layoutBox[t], this.constraints[t]));
            });
      }
      resolveRefConstraints() {
        const {
          dragConstraints: t,
          onMeasureDragConstraints: e
        } = this.getProps();
        if (!t || !d(t)) return !1;
        const n = t.current;
        we(null !== n);
        const { projection: s } = this.visualElement;
        if (!s || !s.layout) return !1;
        const i = (function (t, e, n) {
          const s = bi(t, n),
            { scroll: i } = e;
          return i && (vi(s.x, i.offset.x), vi(s.y, i.offset.y)), s;
        })(n, s.root, this.visualElement.getTransformPagePoint());
        let o = (function (t, e) {
          return { x: ei(t.x, e.x), y: ei(t.y, e.y) };
        })(s.layout.layoutBox, i);
        if (e) {
          const t = e(
            (function ({ x: t, y: e }) {
              return { top: e.min, right: t.max, bottom: e.max, left: t.min };
            })(o)
          );
          (this.hasMutatedConstraints = !!t), t && (o = ai(t));
        }
        return o;
      }
      startAnimation(t) {
        const {
            drag: e,
            dragMomentum: n,
            dragElastic: s,
            dragTransition: i,
            dragSnapToOrigin: o,
            onDragTransitionEnd: r
          } = this.getProps(),
          a = this.constraints || {},
          l = ri((r) => {
            if (!Ti(r, e, this.currentDirection)) return;
            let l = (a && a[r]) || {};
            o && (l = { min: 0, max: 0 });
            const u = s ? 200 : 1e6,
              c = s ? 40 : 1e7,
              h = {
                type: "inertia",
                velocity: n ? t[r] : 0,
                bounceStiffness: u,
                bounceDamping: c,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...i,
                ...l
              };
            return this.startAxisValueAnimation(r, h);
          });
        return Promise.all(l).then(r);
      }
      startAxisValueAnimation(t, e) {
        const n = this.getAxisMotionValue(t);
        return n.start(as(t, n, 0, e));
      }
      stopAnimation() {
        ri((t) => this.getAxisMotionValue(t).stop());
      }
      getAxisMotionValue(t) {
        const e = "_drag" + t.toUpperCase(),
          n = this.visualElement.getProps(),
          s = n[e];
        return (
          s ||
          this.visualElement.getValue(t, (n.initial ? n.initial[t] : void 0) || 0)
        );
      }
      snapToCursor(t) {
        ri((e) => {
          const { drag: n } = this.getProps();
          if (!Ti(e, n, this.currentDirection)) return;
          const { projection: s } = this.visualElement,
            i = this.getAxisMotionValue(e);
          if (s && s.layout) {
            const { min: n, max: o } = s.layout.layoutBox[e];
            i.set(t[e] - en(n, o, 0.5));
          }
        });
      }
      scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const { drag: t, dragConstraints: e } = this.getProps(),
          { projection: n } = this.visualElement;
        if (!d(e) || !n || !this.constraints) return;
        this.stopAnimation();
        const s = { x: 0, y: 0 };
        ri((t) => {
          const e = this.getAxisMotionValue(t);
          if (e) {
            const n = e.get();
            s[t] = (function (t, e) {
              let n = 0.5;
              const s = Gs(t),
                i = Gs(e);
              return (
                i > s
                  ? (n = En(e.min, e.max - s, t.min))
                  : s > i && (n = En(t.min, t.max - i, e.min)),
                Y(0, 1, n)
              );
            })({ min: n, max: n }, this.constraints[t]);
          }
        });
        const { transformTemplate: i } = this.visualElement.getProps();
        (this.visualElement.current.style.transform = i ? i({}, "") : "none"),
          n.root && n.root.updateScroll(),
          n.updateLayout(),
          this.resolveConstraints(),
          ri((e) => {
            if (!Ti(e, t, null)) return;
            const n = this.getAxisMotionValue(e),
              { min: i, max: o } = this.constraints[e];
            n.set(en(i, o, s[e]));
          });
      }
      addListeners() {
        if (!this.visualElement.current) return;
        Si.set(this.visualElement, this);
        const t = Jt(this.visualElement.current, "pointerdown", (t) => {
            const { drag: e, dragListener: n = !0 } = this.getProps();
            e && n && this.start(t);
          }),
          e = () => {
            const { dragConstraints: t } = this.getProps();
            d(t) && (this.constraints = this.resolveRefConstraints());
          },
          { projection: n } = this.visualElement,
          s = n.addEventListener("measure", e);
        n && !n.layout && (n.root && n.root.updateScroll(), n.updateLayout()),
          e();
        const i = qt(window, "resize", () =>
            this.scalePositionWithinConstraints()
          ),
          o = n.addEventListener(
            "didUpdate",
            ({ delta: t, hasLayoutChanged: e }) => {
              this.isDragging &&
                e &&
                (ri((e) => {
                  const n = this.getAxisMotionValue(e);
                  n &&
                    ((this.originPoint[e] += t[e].translate),
                    n.set(n.get() + t[e].translate));
                }),
                this.visualElement.render());
            }
          );
        return () => {
          i(), t(), s(), o && o();
        };
      }
      getProps() {
        const t = this.visualElement.getProps(),
          {
            drag: e = !1,
            dragDirectionLock: n = !1,
            dragPropagation: s = !1,
            dragConstraints: i = !1,
            dragElastic: o = ni,
            dragMomentum: r = !0
          } = t;
        return {
          ...t,
          drag: e,
          dragDirectionLock: n,
          dragPropagation: s,
          dragConstraints: i,
          dragElastic: o,
          dragMomentum: r
        };
      }
    }
    function Ti(t, e, n) {
      return !((!0 !== e && e !== t) || (null !== n && n !== t));
    }
    const Ci = (t) => (e, n) => {
      t && Nt.update(() => t(e, n));
    };
    const Vi = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
      Mi = Vi.length,
      Di = (t) => ("string" == typeof t ? parseFloat(t) : t),
      Li = (t) => "number" == typeof t || st.test(t);
    function Ri(t, e) {
      return void 0 !== t[e] ? t[e] : t.borderRadius;
    }
    const ki = ji(0, 0.5, We),
      Bi = ji(0.5, 0.95, Ut);
    function ji(t, e, n) {
      return (s) => (s < t ? 0 : s > e ? 1 : n(En(t, e, s)));
    }
    function Fi(t, e) {
      (t.min = e.min), (t.max = e.max);
    }
    function Oi(t, e) {
      Fi(t.x, e.x), Fi(t.y, e.y);
    }
    function Ii(t, e, n, s, i) {
      return (
        (t = mi((t -= e), 1 / n, s)), void 0 !== i && (t = mi(t, 1 / i, s)), t
      );
    }
    function Ui(t, e, [n, s, i], o, r) {
      !(function (t, e = 0, n = 1, s = 0.5, i, o = t, r = t) {
        if (nt.test(e)) {
          e = parseFloat(e);
          e = en(r.min, r.max, e / 100) - r.min;
        }
        if ("number" != typeof e) return;
        let a = en(o.min, o.max, s);
        t === o && (a -= e),
          (t.min = Ii(t.min, e, n, a, i)),
          (t.max = Ii(t.max, e, n, a, i));
      })(t, e[n], e[s], e[i], e.scale, o, r);
    }
    const Wi = ["x", "scaleX", "originX"],
      Ni = ["y", "scaleY", "originY"];
    function zi(t, e, n, s) {
      Ui(t.x, e, Wi, n ? n.x : void 0, s ? s.x : void 0),
        Ui(t.y, e, Ni, n ? n.y : void 0, s ? s.y : void 0);
    }
    function Hi(t) {
      return 0 === t.translate && 1 === t.scale;
    }
    function $i(t) {
      return Hi(t.x) && Hi(t.y);
    }
    function Yi(t, e) {
      return (
        Math.round(t.x.min) === Math.round(e.x.min) &&
        Math.round(t.x.max) === Math.round(e.x.max) &&
        Math.round(t.y.min) === Math.round(e.y.min) &&
        Math.round(t.y.max) === Math.round(e.y.max)
      );
    }
    function Xi(t) {
      return Gs(t.x) / Gs(t.y);
    }
    class Gi {
      constructor() {
        this.members = [];
      }
      add(t) {
        cs(this.members, t), t.scheduleRender();
      }
      remove(t) {
        if (
          (hs(this.members, t),
          t === this.prevLead && (this.prevLead = void 0),
          t === this.lead)
        ) {
          const t = this.members[this.members.length - 1];
          t && this.promote(t);
        }
      }
      relegate(t) {
        const e = this.members.findIndex((e) => t === e);
        if (0 === e) return !1;
        let n;
        for (let t = e; t >= 0; t--) {
          const e = this.members[t];
          if (!1 !== e.isPresent) {
            n = e;
            break;
          }
        }
        return !!n && (this.promote(n), !0);
      }
      promote(t, e) {
        const n = this.lead;
        if (t !== n && ((this.prevLead = n), (this.lead = t), t.show(), n)) {
          n.instance && n.scheduleRender(),
            t.scheduleRender(),
            (t.resumeFrom = n),
            e && (t.resumeFrom.preserveOpacity = !0),
            n.snapshot &&
              ((t.snapshot = n.snapshot),
              (t.snapshot.latestValues = n.animationValues || n.latestValues)),
            t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
          const { crossfade: s } = t.options;
          !1 === s && n.hide();
        }
      }
      exitAnimationComplete() {
        this.members.forEach((t) => {
          const { options: e, resumingFrom: n } = t;
          e.onExitComplete && e.onExitComplete(),
            n && n.options.onExitComplete && n.options.onExitComplete();
        });
      }
      scheduleRender() {
        this.members.forEach((t) => {
          t.instance && t.scheduleRender(!1);
        });
      }
      removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
      }
    }
    function qi(t, e, n) {
      let s = "";
      const i = t.x.translate / e.x,
        o = t.y.translate / e.y;
      if (
        ((i || o) && (s = `translate3d(${i}px, ${o}px, 0) `),
        (1 === e.x && 1 === e.y) || (s += `scale(${1 / e.x}, ${1 / e.y}) `),
        n)
      ) {
        const { rotate: t, rotateX: e, rotateY: i } = n;
        t && (s += `rotate(${t}deg) `),
          e && (s += `rotateX(${e}deg) `),
          i && (s += `rotateY(${i}deg) `);
      }
      const r = t.x.scale * e.x,
        a = t.y.scale * e.y;
      return (1 === r && 1 === a) || (s += `scale(${r}, ${a})`), s || "none";
    }
    const Zi = (t, e) => t.depth - e.depth;
    class Ki {
      constructor() {
        (this.children = []), (this.isDirty = !1);
      }
      add(t) {
        cs(this.children, t), (this.isDirty = !0);
      }
      remove(t) {
        hs(this.children, t), (this.isDirty = !0);
      }
      forEach(t) {
        this.isDirty && this.children.sort(Zi),
          (this.isDirty = !1),
          this.children.forEach(t);
      }
    }
    const _i = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
    function Ji(t, e) {
      const n = performance.now(),
        s = ({ timestamp: i }) => {
          const o = i - n;
          o >= e && (zt(s), t(o - e));
        };
      return Nt.read(s, !0), () => zt(s);
    }
    function Qi(t, e, n) {
      var s;
      if ("string" == typeof t) {
        let i = document;
        e && (we(Boolean(e.current)), (i = e.current)),
          n
            ? ((null !== (s = n[t]) && void 0 !== s) ||
                (n[t] = i.querySelectorAll(t)),
              (t = n[t]))
            : (t = i.querySelectorAll(t));
      } else t instanceof Element && (t = [t]);
      return Array.from(t || []);
    }
    const to = new WeakMap();
    function eo(t, e) {
      let n;
      const s = () => {
        const { currentTime: s } = e,
          i = (null === s ? 0 : s.value) / 100;
        n !== i && t(i), (n = i);
      };
      return Nt.update(s, !0), () => zt(s);
    }
    const no = zn(() => void 0 !== window.ScrollTimeline);
    class so {
      constructor(t) {
        this.animations = t.filter(Boolean);
      }
      then(t, e) {
        return Promise.all(this.animations).then(t).catch(e);
      }
      getAll(t) {
        return this.animations[0][t];
      }
      setAll(t, e) {
        for (let n = 0; n < this.animations.length; n++)
          this.animations[n][t] = e;
      }
      attachTimeline(t) {
        const e = this.animations.map((e) => {
          if (!no() || !e.attachTimeline)
            return (
              e.pause(),
              eo((t) => {
                e.time = e.duration * t;
              }, t)
            );
          e.attachTimeline(t);
        });
        return () => {
          e.forEach((t, e) => {
            t && t(), this.animations[e].stop();
          });
        };
      }
      get time() {
        return this.getAll("time");
      }
      set time(t) {
        this.setAll("time", t);
      }
      get speed() {
        return this.getAll("speed");
      }
      set speed(t) {
        this.setAll("speed", t);
      }
      get duration() {
        let t = 0;
        for (let e = 0; e < this.animations.length; e++)
          t = Math.max(t, this.animations[e].duration);
        return t;
      }
      runAll(t) {
        this.animations.forEach((e) => e[t]());
      }
      play() {
        this.runAll("play");
      }
      pause() {
        this.runAll("pause");
      }
      stop() {
        this.runAll("stop");
      }
      cancel() {
        this.runAll("cancel");
      }
      complete() {
        this.runAll("complete");
      }
    }
    function io(t) {
      return t instanceof SVGElement && "svg" !== t.tagName;
    }
    const oo = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
    function ro(t, e, n = 1) {
      we(n <= 4);
      const [s, i] = (function (t) {
        const e = oo.exec(t);
        if (!e) return [,];
        const [, n, s] = e;
        return [n, s];
      })(t);
      if (!s) return;
      const o = window.getComputedStyle(e).getPropertyValue(s);
      if (o) {
        const t = o.trim();
        return us(t) ? parseFloat(t) : t;
      }
      return H(i) ? ro(i, e, n + 1) : i;
    }
    const ao = new Set([
        "width",
        "height",
        "top",
        "left",
        "right",
        "bottom",
        "x",
        "y",
        "translateX",
        "translateY"
      ]),
      lo = (t) => ao.has(t),
      uo = (t) => t === X || t === st,
      co = (t, e) => parseFloat(t.split(", ")[e]),
      ho = (t, e) => (n, { transform: s }) => {
        if ("none" === s || !s) return 0;
        const i = s.match(/^matrix3d\((.+)\)$/);
        if (i) return co(i[1], e);
        {
          const e = s.match(/^matrix\((.+)\)$/);
          return e ? co(e[1], t) : 0;
        }
      },
      mo = new Set(["x", "y", "z"]),
      po = B.filter((t) => !mo.has(t));
    const fo = {
      width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
        t.max - t.min - parseFloat(e) - parseFloat(n),
      height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
        t.max - t.min - parseFloat(e) - parseFloat(n),
      top: (t, { top: e }) => parseFloat(e),
      left: (t, { left: e }) => parseFloat(e),
      bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
      right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
      x: ho(4, 13),
      y: ho(5, 14)
    };
    (fo.translateX = fo.x), (fo.translateY = fo.y);
    const go = (t, e, n = {}, s = {}) => {
      (e = { ...e }), (s = { ...s });
      const i = Object.keys(e).filter(lo);
      let o = [],
        r = !1;
      const a = [];
      if (
        (i.forEach((i) => {
          const l = t.getValue(i);
          if (!t.hasValue(i)) return;
          let u = n[i],
            c = vs(u);
          const h = e[i];
          let d;
          if (jt(h)) {
            const t = h.length,
              e = null === h[0] ? 1 : 0;
            (u = h[e]), (c = vs(u));
            for (let n = e; n < t && null !== h[n]; n++)
              d
                ? we(vs(h[n]) === d)
                : ((d = vs(h[n])), we(d === c || (uo(c) && uo(d))));
          } else d = vs(h);
          if (c !== d)
            if (uo(c) && uo(d)) {
              const t = l.get();
              "string" == typeof t && l.set(parseFloat(t)),
                "string" == typeof h
                  ? (e[i] = parseFloat(h))
                  : Array.isArray(h) && d === st && (e[i] = h.map(parseFloat));
            } else
              (null == c ? void 0 : c.transform) &&
              (null == d ? void 0 : d.transform) &&
              (0 === u || 0 === h)
                ? 0 === u
                  ? l.set(d.transform(u))
                  : (e[i] = c.transform(h))
                : (r ||
                    ((o = (function (t) {
                      const e = [];
                      return (
                        po.forEach((n) => {
                          const s = t.getValue(n);
                          void 0 !== s &&
                            (e.push([n, s.get()]),
                            s.set(n.startsWith("scale") ? 1 : 0));
                        }),
                        e.length && t.render(),
                        e
                      );
                    })(t)),
                    (r = !0)),
                  a.push(i),
                  (s[i] = void 0 !== s[i] ? s[i] : e[i]),
                  l.jump(h));
        }),
        a.length)
      ) {
        const n = a.indexOf("height") >= 0 ? window.pageYOffset : null,
          i = ((t, e, n) => {
            const s = e.measureViewportBox(),
              i = e.current,
              o = getComputedStyle(i),
              { display: r } = o,
              a = {};
            "none" === r && e.setStaticValue("display", t.display || "block"),
              n.forEach((t) => {
                a[t] = fo[t](s, o);
              }),
              e.render();
            const l = e.measureViewportBox();
            return (
              n.forEach((n) => {
                const s = e.getValue(n);
                s && s.jump(a[n]), (t[n] = fo[n](l, o));
              }),
              t
            );
          })(e, t, a);
        return (
          o.length &&
            o.forEach(([e, n]) => {
              t.getValue(e).set(n);
            }),
          t.render(),
          u && null !== n && window.scrollTo({ top: n }),
          { target: i, transitionEnd: s }
        );
      }
      return { target: e, transitionEnd: s };
    };
    function yo(t, e, n, s) {
      return ((t) => Object.keys(t).some(lo))(e)
        ? go(t, e, n, s)
        : { target: e, transitionEnd: s };
    }
    const vo = (t, e, n, s) => {
        const i = (function (t, { ...e }, n) {
          const s = t.current;
          if (!(s instanceof Element)) return { target: e, transitionEnd: n };
          n && (n = { ...n }),
            t.values.forEach((t) => {
              const e = t.get();
              if (!H(e)) return;
              const n = ro(e, s);
              n && t.set(n);
            });
          for (const t in e) {
            const i = e[t];
            if (!H(i)) continue;
            const o = ro(i, s);
            o && ((e[t] = o), n || (n = {}), void 0 === n[t] && (n[t] = i));
          }
          return { target: e, transitionEnd: n };
        })(t, e, s);
        return yo(t, (e = i.target), n, (s = i.transitionEnd));
      },
      xo = { current: null },
      Po = { current: !1 };
    function wo() {
      if (((Po.current = !0), u))
        if (window.matchMedia) {
          const t = window.matchMedia("(prefers-reduced-motion)"),
            e = () => (xo.current = t.matches);
          t.addListener(e), e();
        } else xo.current = !1;
    }
    const Eo = Object.keys(E),
      bo = Eo.length,
      So = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete"
      ],
      Ao = g.length;
    class To {
      constructor(
        {
          parent: t,
          props: e,
          presenceContext: n,
          reducedMotionConfig: s,
          visualState: i
        },
        o = {}
      ) {
        (this.current = null),
          (this.children = new Set()),
          (this.isVariantNode = !1),
          (this.isControllingVariants = !1),
          (this.shouldReduceMotion = null),
          (this.values = new Map()),
          (this.features = {}),
          (this.valueSubscriptions = new Map()),
          (this.prevMotionValues = {}),
          (this.events = {}),
          (this.propEventSubscriptions = {}),
          (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
          (this.render = () => {
            this.current &&
              (this.triggerBuild(),
              this.renderInstance(
                this.current,
                this.renderState,
                this.props.style,
                this.projection
              ));
          }),
          (this.scheduleRender = () => Nt.render(this.render, !1, !0));
        const { latestValues: r, renderState: a } = i;
        (this.latestValues = r),
          (this.baseTarget = { ...r }),
          (this.initialValues = e.initial ? { ...r } : {}),
          (this.renderState = a),
          (this.parent = t),
          (this.props = e),
          (this.presenceContext = n),
          (this.depth = t ? t.depth + 1 : 0),
          (this.reducedMotionConfig = s),
          (this.options = o),
          (this.isControllingVariants = y(e)),
          (this.isVariantNode = v(e)),
          this.isVariantNode && (this.variantChildren = new Set()),
          (this.manuallyAnimateOnMount = Boolean(t && t.current));
        const { willChange: l, ...u } = this.scrapeMotionValuesFromProps(e, {});
        for (const t in u) {
          const e = u[t];
          void 0 !== r[t] && O(e) && (e.set(r[t], !1), ls(l) && l.add(t));
        }
      }
      scrapeMotionValuesFromProps(t, e) {
        return {};
      }
      mount(t) {
        (this.current = t),
          to.set(t, this),
          this.projection &&
            !this.projection.instance &&
            this.projection.mount(t),
          this.parent &&
            this.isVariantNode &&
            !this.isControllingVariants &&
            (this.removeFromVariantTree = this.parent.addVariantChild(this)),
          this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
          Po.current || wo(),
          (this.shouldReduceMotion =
            "never" !== this.reducedMotionConfig &&
            ("always" === this.reducedMotionConfig || xo.current)),
          this.parent && this.parent.children.add(this),
          this.update(this.props, this.presenceContext);
      }
      unmount() {
        to.delete(this.current),
          this.projection && this.projection.unmount(),
          zt(this.notifyUpdate),
          zt(this.render),
          this.valueSubscriptions.forEach((t) => t()),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          this.parent && this.parent.children.delete(this);
        for (const t in this.events) this.events[t].clear();
        for (const t in this.features) this.features[t].unmount();
        this.current = null;
      }
      bindToMotionValue(t, e) {
        const n = j.has(t),
          s = e.on("change", (e) => {
            (this.latestValues[t] = e),
              this.props.onUpdate && Nt.update(this.notifyUpdate, !1, !0),
              n && this.projection && (this.projection.isTransformDirty = !0);
          }),
          i = e.on("renderRequest", this.scheduleRender);
        this.valueSubscriptions.set(t, () => {
          s(), i();
        });
      }
      sortNodePosition(t) {
        return this.current &&
          this.sortInstanceNodePosition &&
          this.type === t.type
          ? this.sortInstanceNodePosition(this.current, t.current)
          : 0;
      }
      loadFeatures({ children: t, ...e }, n, s, i) {
        let o, r;
        for (let t = 0; t < bo; t++) {
          const n = Eo[t],
            { isEnabled: s, Feature: i, ProjectionNode: a, MeasureLayout: l } = E[
              n
            ];
          a && (o = a),
            s(e) &&
              (!this.features[n] && i && (this.features[n] = new i(this)),
              l && (r = l));
        }
        if (!this.projection && o) {
          this.projection = new o(
            this.latestValues,
            this.parent && this.parent.projection
          );
          const {
            layoutId: t,
            layout: n,
            drag: s,
            dragConstraints: r,
            layoutScroll: a,
            layoutRoot: l
          } = e;
          this.projection.setOptions({
            layoutId: t,
            layout: n,
            alwaysMeasureLayout: Boolean(s) || (r && d(r)),
            visualElement: this,
            scheduleRender: () => this.scheduleRender(),
            animationType: "string" == typeof n ? n : "both",
            initialPromotionConfig: i,
            layoutScroll: a,
            layoutRoot: l
          });
        }
        return r;
      }
      updateFeatures() {
        for (const t in this.features) {
          const e = this.features[t];
          e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
        }
      }
      triggerBuild() {
        this.build(this.renderState, this.latestValues, this.options, this.props);
      }
      measureViewportBox() {
        return this.current
          ? this.measureInstanceViewportBox(this.current, this.props)
          : { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      }
      getStaticValue(t) {
        return this.latestValues[t];
      }
      setStaticValue(t, e) {
        this.latestValues[t] = e;
      }
      makeTargetAnimatable(t, e = !0) {
        return this.makeTargetAnimatableFromInstance(t, this.props, e);
      }
      update(t, e) {
        (t.transformTemplate || this.props.transformTemplate) &&
          this.scheduleRender(),
          (this.prevProps = this.props),
          (this.props = t),
          (this.prevPresenceContext = this.presenceContext),
          (this.presenceContext = e);
        for (let e = 0; e < So.length; e++) {
          const n = So[e];
          this.propEventSubscriptions[n] &&
            (this.propEventSubscriptions[n](),
            delete this.propEventSubscriptions[n]);
          const s = t["on" + n];
          s && (this.propEventSubscriptions[n] = this.on(n, s));
        }
        (this.prevMotionValues = (function (t, e, n) {
          const { willChange: s } = e;
          for (const i in e) {
            const o = e[i],
              r = n[i];
            if (O(o)) t.addValue(i, o), ls(s) && s.add(i);
            else if (O(r))
              t.addValue(i, fs(o, { owner: t })), ls(s) && s.remove(i);
            else if (r !== o)
              if (t.hasValue(i)) {
                const e = t.getValue(i);
                !e.hasAnimated && e.set(o);
              } else {
                const e = t.getStaticValue(i);
                t.addValue(i, fs(void 0 !== e ? e : o, { owner: t }));
              }
          }
          for (const s in n) void 0 === e[s] && t.removeValue(s);
          return e;
        })(
          this,
          this.scrapeMotionValuesFromProps(t, this.prevProps),
          this.prevMotionValues
        )),
          this.handleChildMotionValue && this.handleChildMotionValue();
      }
      getProps() {
        return this.props;
      }
      getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
      }
      getDefaultTransition() {
        return this.props.transition;
      }
      getTransformPagePoint() {
        return this.props.transformPagePoint;
      }
      getClosestVariantNode() {
        return this.isVariantNode
          ? this
          : this.parent
          ? this.parent.getClosestVariantNode()
          : void 0;
      }
      getVariantContext(t = !1) {
        if (t) return this.parent ? this.parent.getVariantContext() : void 0;
        if (!this.isControllingVariants) {
          const t = (this.parent && this.parent.getVariantContext()) || {};
          return (
            void 0 !== this.props.initial && (t.initial = this.props.initial), t
          );
        }
        const e = {};
        for (let t = 0; t < Ao; t++) {
          const n = g[t],
            s = this.props[n];
          (m(s) || !1 === s) && (e[n] = s);
        }
        return e;
      }
      addVariantChild(t) {
        const e = this.getClosestVariantNode();
        if (e)
          return (
            e.variantChildren && e.variantChildren.add(t),
            () => e.variantChildren.delete(t)
          );
      }
      addValue(t, e) {
        e !== this.values.get(t) &&
          (this.removeValue(t), this.bindToMotionValue(t, e)),
          this.values.set(t, e),
          (this.latestValues[t] = e.get());
      }
      removeValue(t) {
        this.values.delete(t);
        const e = this.valueSubscriptions.get(t);
        e && (e(), this.valueSubscriptions.delete(t)),
          delete this.latestValues[t],
          this.removeValueFromRenderState(t, this.renderState);
      }
      hasValue(t) {
        return this.values.has(t);
      }
      getValue(t, e) {
        if (this.props.values && this.props.values[t])
          return this.props.values[t];
        let n = this.values.get(t);
        return (
          void 0 === n &&
            void 0 !== e &&
            ((n = fs(e, { owner: this })), this.addValue(t, n)),
          n
        );
      }
      readValue(t) {
        var e;
        return void 0 === this.latestValues[t] && this.current
          ? null !== (e = this.getBaseTargetFromProps(this.props, t)) &&
            void 0 !== e
            ? e
            : this.readValueFromInstance(this.current, t, this.options)
          : this.latestValues[t];
      }
      setBaseTarget(t, e) {
        this.baseTarget[t] = e;
      }
      getBaseTarget(t) {
        var e;
        const { initial: n } = this.props,
          s =
            "string" == typeof n || "object" == typeof n
              ? null === (e = kt(this.props, n)) || void 0 === e
                ? void 0
                : e[t]
              : void 0;
        if (n && void 0 !== s) return s;
        const i = this.getBaseTargetFromProps(this.props, t);
        return void 0 === i || O(i)
          ? void 0 !== this.initialValues[t] && void 0 === s
            ? void 0
            : this.baseTarget[t]
          : i;
      }
      on(t, e) {
        return (
          this.events[t] || (this.events[t] = new ds()), this.events[t].add(e)
        );
      }
      notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e);
      }
    }
    class Co extends To {
      sortInstanceNodePosition(t, e) {
        return 2 & t.compareDocumentPosition(e) ? 1 : -1;
      }
      getBaseTargetFromProps(t, e) {
        return t.style ? t.style[e] : void 0;
      }
      removeValueFromRenderState(t, { vars: e, style: n }) {
        delete e[t], delete n[t];
      }
      makeTargetAnimatableFromInstance(
        { transition: t, transitionEnd: e, ...n },
        { transformValues: s },
        i
      ) {
        let o = As(n, t || {}, this);
        if ((s && (e && (e = s(e)), n && (n = s(n)), o && (o = s(o))), i)) {
          bs(this, n, o);
          const t = vo(this, n, o, e);
          (e = t.transitionEnd), (n = t.target);
        }
        return { transition: t, transitionEnd: e, ...n };
      }
    }
    class Vo extends Co {
      constructor() {
        super(...arguments), (this.isSVGTag = !1);
      }
      getBaseTargetFromProps(t, e) {
        return t[e];
      }
      readValueFromInstance(t, e) {
        if (j.has(e)) {
          const t = ns(e);
          return (t && t.default) || 0;
        }
        return (e = Mt.has(e) ? e : Ct(e)), t.getAttribute(e);
      }
      measureInstanceViewportBox() {
        return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      }
      scrapeMotionValuesFromProps(t, e) {
        return Rt(t, e);
      }
      build(t, e, n, s) {
        Et(t, e, n, this.isSVGTag, s.transformTemplate);
      }
      renderInstance(t, e, n, s) {
        Dt(t, e, 0, s);
      }
      mount(t) {
        (this.isSVGTag = St(t.tagName)), super.mount(t);
      }
    }
    class Mo extends Co {
      readValueFromInstance(t, e) {
        if (j.has(e)) {
          const t = ns(e);
          return (t && t.default) || 0;
        }
        {
          const s = ((n = t), window.getComputedStyle(n)),
            i = (z(e) ? s.getPropertyValue(e) : s[e]) || 0;
          return "string" == typeof i ? i.trim() : i;
        }
        var n;
      }
      measureInstanceViewportBox(t, { transformPagePoint: e }) {
        return bi(t, e);
      }
      build(t, e, n, s) {
        ut(t, e, n, s.transformTemplate);
      }
      scrapeMotionValuesFromProps(t, e) {
        return Lt(t, e);
      }
      handleChildMotionValue() {
        this.childSubscription &&
          (this.childSubscription(), delete this.childSubscription);
        const { children: t } = this.props;
        O(t) &&
          (this.childSubscription = t.on("change", (t) => {
            this.current && (this.current.textContent = "" + t);
          }));
      }
      renderInstance(t, e, n, s) {
        Vt(t, e, n, s);
      }
    }
    function Do(t) {
      const e = {
          presenceContext: null,
          props: {},
          visualState: {
            renderState: {
              transform: {},
              transformOrigin: {},
              style: {},
              vars: {},
              attrs: {}
            },
            latestValues: {}
          }
        },
        n = io(t)
          ? new Vo(e, { enableHardwareAcceleration: !1 })
          : new Mo(e, { enableHardwareAcceleration: !0 });
      n.mount(t), to.set(t, n);
    }
    function Lo(t, e, n) {
      const s = O(t) ? t : fs(t);
      return s.start(as("", s, e, n)), s.animation;
    }
    function Ro(t, e = 100) {
      const n = Fn({ keyframes: [0, e], ...t }),
        s = Math.min(Un(n), 2e4);
      return {
        type: "keyframes",
        ease: (t) => n.next(s * t).value / e,
        duration: be(s)
      };
    }
    function ko(t, e, n, s) {
      var i;
      return "number" == typeof e
        ? e
        : e.startsWith("-") || e.startsWith("+")
        ? Math.max(0, t + parseFloat(e))
        : "<" === e
        ? n
        : null !== (i = s.get(e)) && void 0 !== i
        ? i
        : t;
    }
    const Bo = (t, e, n) => {
      const s = e - t;
      return ((((n - t) % s) + s) % s) + t;
    };
    function jo(t, e) {
      return Fe(t) ? t[Bo(0, t.length, e)] : t;
    }
    function Fo(t, e, n, s, i, o) {
      !(function (t, e, n) {
        for (let s = 0; s < t.length; s++) {
          const i = t[s];
          i.at > e && i.at < n && (hs(t, i), s--);
        }
      })(t, i, o);
      for (let r = 0; r < e.length; r++)
        t.push({ value: e[r], at: en(i, o, s[r]), easing: jo(n, r) });
    }
    function Oo(t, e) {
      return t.at === e.at
        ? null === t.value
          ? 1
          : null === e.value
          ? -1
          : 0
        : t.at - e.at;
    }
    function Io(t, e) {
      return !e.has(t) && e.set(t, {}), e.get(t);
    }
    function Uo(t, e) {
      return e[t] || (e[t] = []), e[t];
    }
    function Wo(t) {
      return Array.isArray(t) ? t : [t];
    }
    function No(t, e) {
      return t[e] ? { ...t, ...t[e] } : { ...t };
    }
    const zo = (t) => "number" == typeof t,
      Ho = (t) => t.every(zo);
    function $o(t, e, n, s) {
      const i = Qi(t, s),
        o = i.length;
      we(Boolean(o));
      const r = [];
      for (let t = 0; t < o; t++) {
        const s = i[t];
        to.has(s) || Do(s);
        const a = to.get(s),
          l = { ...n };
        "function" == typeof l.delay && (l.delay = l.delay(t, o)),
          r.push(...Cs(a, { ...e, transition: l }, {}));
      }
      return new so(r);
    }
    function Yo(t, e, n) {
      const s = [];
      return (
        (function (t, { defaultTransition: e = {}, ...n } = {}, s) {
          const i = e.duration || 0.3,
            o = new Map(),
            r = new Map(),
            a = {},
            l = new Map();
          let u = 0,
            c = 0,
            h = 0;
          for (let n = 0; n < t.length; n++) {
            const o = t[n];
            if ("string" == typeof o) {
              l.set(o, c);
              continue;
            }
            if (!Array.isArray(o)) {
              l.set(o.name, ko(c, o.at, u, l));
              continue;
            }
            let [d, m, p = {}] = o;
            void 0 !== p.at && (c = ko(c, p.at, u, l));
            let f = 0;
            const g = (t, n, s, o = 0, r = 0) => {
              const a = Wo(t),
                {
                  delay: l = 0,
                  times: u = Cn(a),
                  type: d = "keyframes",
                  ...m
                } = n;
              let { ease: p = e.ease || "easeOut", duration: g } = n;
              const y = "function" == typeof l ? l(o, r) : l,
                v = a.length;
              if (v <= 2 && "spring" === d) {
                let t = 100;
                if (2 === v && Ho(a)) {
                  const e = a[1] - a[0];
                  t = Math.abs(e);
                }
                const e = { ...m };
                void 0 !== g && (e.duration = Ee(g));
                const n = Ro(e, t);
                (p = n.ease), (g = n.duration);
              }
              null != g || (g = i);
              const x = c + y,
                P = x + g;
              1 === u.length && 0 === u[0] && (u[1] = 1);
              const w = u.length - a.length;
              w > 0 && Tn(u, w),
                1 === a.length && a.unshift(null),
                Fo(s, a, p, u, x, P),
                (f = Math.max(y + g, f)),
                (h = Math.max(P, h));
            };
            if (O(d)) {
              g(m, p, Uo("default", Io(d, r)));
            } else {
              const t = Qi(d, s, a),
                e = t.length;
              for (let n = 0; n < e; n++) {
                (m = m), (p = p);
                const s = Io(t[n], r);
                for (const t in m) g(m[t], No(p, t), Uo(t, s), n, e);
              }
              (u = c), (c += f);
            }
          }
          return (
            r.forEach((t, s) => {
              for (const i in t) {
                const r = t[i];
                r.sort(Oo);
                const a = [],
                  l = [],
                  u = [];
                for (let t = 0; t < r.length; t++) {
                  const { at: e, value: n, easing: s } = r[t];
                  a.push(n), l.push(En(0, h, e)), u.push(s || "easeOut");
                }
                0 !== l[0] &&
                  (l.unshift(0), a.unshift(a[0]), u.unshift("easeInOut")),
                  1 !== l[l.length - 1] && (l.push(1), a.push(null)),
                  o.has(s) || o.set(s, { keyframes: {}, transition: {} });
                const c = o.get(s);
                (c.keyframes[i] = a),
                  (c.transition[i] = {
                    ...e,
                    duration: h,
                    ease: u,
                    times: l,
                    ...n
                  });
              }
            }),
            o
          );
        })(t, e, n).forEach(({ keyframes: t, transition: e }, n) => {
          let i;
          (i = O(n) ? Lo(n, t.default, e.default) : $o(n, t, e)), s.push(i);
        }),
        new so(s)
      );
    }
    const Xo = (t) =>
        function (e, n, s) {
          let i;
          var o;
          return (
            (o = e),
            (i =
              Array.isArray(o) && Array.isArray(o[0])
                ? Yo(e, n, t)
                : (function (t) {
                    return "object" == typeof t && !Array.isArray(t);
                  })(n)
                ? $o(e, n, s, t)
                : Lo(e, n, s)),
            t && t.animations.push(i),
            i
          );
        },
      Go = Xo(),
      qo = new WeakMap();
    let Zo;
    function Ko({ target: t, contentRect: e, borderBoxSize: n }) {
      var s;
      null === (s = qo.get(t)) ||
        void 0 === s ||
        s.forEach((s) => {
          s({
            target: t,
            contentSize: e,
            get size() {
              return (function (t, e) {
                if (e) {
                  const { inlineSize: t, blockSize: n } = e[0];
                  return { width: t, height: n };
                }
                return t instanceof SVGElement && "getBBox" in t
                  ? t.getBBox()
                  : { width: t.offsetWidth, height: t.offsetHeight };
              })(t, n);
            }
          });
        });
    }
    function _o(t) {
      t.forEach(Ko);
    }
    function Jo(t, e) {
      Zo ||
        ("undefined" != typeof ResizeObserver && (Zo = new ResizeObserver(_o)));
      const n = Qi(t);
      return (
        n.forEach((t) => {
          let n = qo.get(t);
          n || ((n = new Set()), qo.set(t, n)),
            n.add(e),
            null == Zo || Zo.observe(t);
        }),
        () => {
          n.forEach((t) => {
            const n = qo.get(t);
            null == n || n.delete(e),
              (null == n ? void 0 : n.size) || null == Zo || Zo.unobserve(t);
          });
        }
      );
    }
    const Qo = new Set();
    let tr;
    function er(t) {
      return (
        Qo.add(t),
        tr ||
          ((tr = () => {
            const t = { width: window.innerWidth, height: window.innerHeight },
              e = { target: window, size: t, contentSize: t };
            Qo.forEach((t) => t(e));
          }),
          window.addEventListener("resize", tr)),
        () => {
          Qo.delete(t), !Qo.size && tr && (tr = void 0);
        }
      );
    }
    const nr = {
      x: { length: "Width", position: "Left" },
      y: { length: "Height", position: "Top" }
    };
    function sr(t, e, n, s) {
      const i = n[e],
        { length: o, position: r } = nr[e],
        a = i.current,
        l = n.time;
      (i.current = t["scroll" + r]),
        (i.scrollLength = t["scroll" + o] - t["client" + o]),
        (i.offset.length = 0),
        (i.offset[0] = 0),
        (i.offset[1] = i.scrollLength),
        (i.progress = En(0, i.scrollLength, i.current));
      const u = s - l;
      i.velocity = u > 50 ? 0 : Mn(i.current - a, u);
    }
    const ir = {
        Enter: [
          [0, 1],
          [1, 1]
        ],
        Exit: [
          [0, 0],
          [1, 0]
        ],
        Any: [
          [1, 0],
          [0, 1]
        ],
        All: [
          [0, 0],
          [1, 1]
        ]
      },
      or = { start: 0, center: 0.5, end: 1 };
    function rr(t, e, n = 0) {
      let s = 0;
      if ((void 0 !== or[t] && (t = or[t]), "string" == typeof t)) {
        const e = parseFloat(t);
        t.endsWith("px")
          ? (s = e)
          : t.endsWith("%")
          ? (t = e / 100)
          : t.endsWith("vw")
          ? (s = (e / 100) * document.documentElement.clientWidth)
          : t.endsWith("vh")
          ? (s = (e / 100) * document.documentElement.clientHeight)
          : (t = e);
      }
      return "number" == typeof t && (s = e * t), n + s;
    }
    const ar = [0, 0];
    function lr(t, e, n, s) {
      let i = Array.isArray(t) ? t : ar,
        o = 0,
        r = 0;
      return (
        "number" == typeof t
          ? (i = [t, t])
          : "string" == typeof t &&
            (i = (t = t.trim()).includes(" ")
              ? t.split(" ")
              : [t, or[t] ? t : "0"]),
        (o = rr(i[0], n, s)),
        (r = rr(i[1], e)),
        o - r
      );
    }
    const ur = { x: 0, y: 0 };
    function cr(t, e, n) {
      let { offset: s = ir.All } = n;
      const { target: i = t, axis: o = "y" } = n,
        r = "y" === o ? "height" : "width",
        a =
          i !== t
            ? (function (t, e) {
                let n = { x: 0, y: 0 },
                  s = t;
                for (; s && s !== e; )
                  if (s instanceof HTMLElement)
                    (n.x += s.offsetLeft),
                      (n.y += s.offsetTop),
                      (s = s.offsetParent);
                  else if (s instanceof SVGGraphicsElement && "getBBox" in s) {
                    const { top: t, left: e } = s.getBBox();
                    for (n.x += e, n.y += t; s && "svg" !== s.tagName; )
                      s = s.parentNode;
                  }
                return n;
              })(i, t)
            : ur,
        l =
          i === t
            ? { width: t.scrollWidth, height: t.scrollHeight }
            : { width: i.clientWidth, height: i.clientHeight },
        u = { width: t.clientWidth, height: t.clientHeight };
      e[o].offset.length = 0;
      let c = !e[o].interpolate;
      const h = s.length;
      for (let t = 0; t < h; t++) {
        const n = lr(s[t], u[r], l[r], a[o]);
        c || n === e[o].interpolatorOffsets[t] || (c = !0), (e[o].offset[t] = n);
      }
      c &&
        ((e[o].interpolate = An(e[o].offset, Cn(s))),
        (e[o].interpolatorOffsets = [...e[o].offset])),
        (e[o].progress = e[o].interpolate(e[o].current));
    }
    function hr(t, e, n, s = {}) {
      return {
        measure: () =>
          (function (t, e = t, n) {
            if (((n.x.targetOffset = 0), (n.y.targetOffset = 0), e !== t)) {
              let s = e;
              for (; s && s !== t; )
                (n.x.targetOffset += s.offsetLeft),
                  (n.y.targetOffset += s.offsetTop),
                  (s = s.offsetParent);
            }
            (n.x.targetLength = e === t ? e.scrollWidth : e.clientWidth),
              (n.y.targetLength = e === t ? e.scrollHeight : e.clientHeight),
              (n.x.containerLength = t.clientWidth),
              (n.y.containerLength = t.clientHeight);
          })(t, s.target, n),
        update: (e) => {
          !(function (t, e, n) {
            sr(t, "x", e, n), sr(t, "y", e, n), (e.time = n);
          })(t, n, e),
            (s.offset || s.target) && cr(t, n, s);
        },
        notify: () => e(n)
      };
    }
    const dr = new WeakMap(),
      mr = new WeakMap(),
      pr = new WeakMap(),
      fr = (t) => (t === document.documentElement ? window : t);
    function gr(t, { container: e = document.documentElement, ...n } = {}) {
      let s = pr.get(e);
      s || ((s = new Set()), pr.set(e, s));
      const i = hr(
        e,
        t,
        {
          time: 0,
          x: {
            current: 0,
            offset: [],
            progress: 0,
            scrollLength: 0,
            targetOffset: 0,
            targetLength: 0,
            containerLength: 0,
            velocity: 0
          },
          y: {
            current: 0,
            offset: [],
            progress: 0,
            scrollLength: 0,
            targetOffset: 0,
            targetLength: 0,
            containerLength: 0,
            velocity: 0
          }
        },
        n
      );
      if ((s.add(i), !dr.has(e))) {
        const t = () => {
            for (const t of s) t.measure();
          },
          n = () => {
            for (const t of s) t.update(Ht.timestamp);
          },
          i = () => {
            for (const t of s) t.notify();
          },
          a = () => {
            Nt.read(t, !1, !0), Nt.update(n, !1, !0), Nt.update(i, !1, !0);
          };
        dr.set(e, a);
        const l = fr(e);
        window.addEventListener("resize", a, { passive: !0 }),
          e !== document.documentElement &&
            mr.set(e, ((r = a), "function" == typeof (o = e) ? er(o) : Jo(o, r))),
          l.addEventListener("scroll", a, { passive: !0 });
      }
      var o, r;
      const a = dr.get(e);
      return (
        Nt.read(a, !1, !0),
        () => {
          var t;
          zt(a);
          const n = pr.get(e);
          if (!n) return;
          if ((n.delete(i), n.size)) return;
          const s = dr.get(e);
          dr.delete(e),
            s &&
              (fr(e).removeEventListener("scroll", s),
              null === (t = mr.get(e)) || void 0 === t || t(),
              window.removeEventListener("resize", s));
        }
      );
    }
    const yr = new Map();
    function vr({ source: t = document.documentElement, axis: e = "y" } = {}) {
      yr.has(t) || yr.set(t, {});
      const n = yr.get(t);
      return (
        n[e] ||
          (n[e] = no()
            ? new ScrollTimeline({ source: t, axis: e })
            : (function ({ source: t, axis: e = "y" }) {
                const n = { value: 0 },
                  s = gr(
                    (t) => {
                      n.value = 100 * t[e].progress;
                    },
                    { container: t, axis: e }
                  );
                return { currentTime: n, cancel: s };
              })({ source: t, axis: e })),
        n[e]
      );
    }
    const xr = { some: 0, all: 1 };
    function Pr(t, e, { root: n, margin: s, amount: i = "some" } = {}) {
      const o = Qi(t),
        r = new WeakMap(),
        a = new IntersectionObserver(
          (t) => {
            t.forEach((t) => {
              const n = r.get(t.target);
              if (t.isIntersecting !== Boolean(n))
                if (t.isIntersecting) {
                  const n = e(t);
                  "function" == typeof n
                    ? r.set(t.target, n)
                    : a.unobserve(t.target);
                } else n && (n(t), r.delete(t.target));
            });
          },
          { root: n, rootMargin: s, threshold: "number" == typeof i ? i : xr[i] }
        );
      return o.forEach((t) => a.observe(t)), () => a.disconnect();
    }
    function wr(...t) {
      const e = !Array.isArray(t[0]),
        n = e ? 0 : -1,
        s = t[0 + n],
        i = t[1 + n],
        o = t[2 + n],
        r = t[3 + n],
        a = An(i, o, {
          mixer:
            ((l = o[0]),
            ((t) => "object" == typeof t && t.mix)(l) ? l.mix : void 0),
          ...r
        });
      var l;
      return e ? a(s) : a;
    }
    const Er = Nt,
      br = Wt.reduce((t, e) => ((t[e] = (t) => zt(t)), t), {}),
      Sr = ["", "X", "Y", "Z"];
    let Ar = 0;
    const Tr = {
      type: "projectionFrame",
      totalNodes: 0,
      resolvedTargetDeltas: 0,
      recalculatedProjection: 0
    };
    function Cr({
      attachResizeListener: t,
      defaultParent: e,
      measureScroll: n,
      checkIsScrollRoot: s,
      resetTransform: i
    }) {
      return class {
        constructor(t = {}, n = null == e ? void 0 : e()) {
          (this.id = Ar++),
            (this.animationId = 0),
            (this.children = new Set()),
            (this.options = {}),
            (this.isTreeAnimating = !1),
            (this.isAnimationBlocked = !1),
            (this.isLayoutDirty = !1),
            (this.isProjectionDirty = !1),
            (this.isSharedProjectionDirty = !1),
            (this.isTransformDirty = !1),
            (this.updateManuallyBlocked = !1),
            (this.updateBlockedByResize = !1),
            (this.isUpdating = !1),
            (this.isSVG = !1),
            (this.needsReset = !1),
            (this.shouldResetTransform = !1),
            (this.treeScale = { x: 1, y: 1 }),
            (this.eventHandlers = new Map()),
            (this.hasTreeAnimated = !1),
            (this.updateScheduled = !1),
            (this.checkUpdateFailed = () => {
              this.isUpdating &&
                ((this.isUpdating = !1), this.clearAllSnapshots());
            }),
            (this.updateProjection = () => {
              var t;
              (Tr.totalNodes = Tr.resolvedTargetDeltas = Tr.recalculatedProjection = 0),
                this.nodes.forEach(Dr),
                this.nodes.forEach(Or),
                this.nodes.forEach(Ir),
                this.nodes.forEach(Lr),
                (t = Tr),
                window.MotionDebug && window.MotionDebug.record(t);
            }),
            (this.hasProjected = !1),
            (this.isVisible = !0),
            (this.animationProgress = 0),
            (this.sharedNodes = new Map()),
            (this.latestValues = t),
            (this.root = n ? n.root || n : this),
            (this.path = n ? [...n.path, n] : []),
            (this.parent = n),
            (this.depth = n ? n.depth + 1 : 0);
          for (let t = 0; t < this.path.length; t++)
            this.path[t].shouldResetTransform = !0;
          this.root === this && (this.nodes = new Ki());
        }
        addEventListener(t, e) {
          return (
            this.eventHandlers.has(t) || this.eventHandlers.set(t, new ds()),
            this.eventHandlers.get(t).add(e)
          );
        }
        notifyListeners(t, ...e) {
          const n = this.eventHandlers.get(t);
          n && n.notify(...e);
        }
        hasListeners(t) {
          return this.eventHandlers.has(t);
        }
        mount(e, n = this.root.hasTreeAnimated) {
          if (this.instance) return;
          (this.isSVG = io(e)), (this.instance = e);
          const { layoutId: s, layout: i, visualElement: o } = this.options;
          if (
            (o && !o.current && o.mount(e),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            n && (i || s) && (this.isLayoutDirty = !0),
            t)
          ) {
            let n;
            const s = () => (this.root.updateBlockedByResize = !1);
            t(e, () => {
              (this.root.updateBlockedByResize = !0),
                n && n(),
                (n = Ji(s, 250)),
                _i.hasAnimatedSinceResize &&
                  ((_i.hasAnimatedSinceResize = !1), this.nodes.forEach(Fr));
            });
          }
          s && this.root.registerSharedNode(s, this),
            !1 !== this.options.animate &&
              o &&
              (s || i) &&
              this.addEventListener(
                "didUpdate",
                ({
                  delta: t,
                  hasLayoutChanged: e,
                  hasRelativeTargetChanged: n,
                  layout: s
                }) => {
                  if (this.isTreeAnimationBlocked())
                    return (
                      (this.target = void 0), void (this.relativeTarget = void 0)
                    );
                  const i =
                      this.options.transition || o.getDefaultTransition() || $r,
                    {
                      onLayoutAnimationStart: r,
                      onLayoutAnimationComplete: a
                    } = o.getProps(),
                    l = !this.targetLayout || !Yi(this.targetLayout, s) || n,
                    u = !e && n;
                  if (
                    this.options.layoutRoot ||
                    (this.resumeFrom && this.resumeFrom.instance) ||
                    u ||
                    (e && (l || !this.currentAnimation))
                  ) {
                    this.resumeFrom &&
                      ((this.resumingFrom = this.resumeFrom),
                      (this.resumingFrom.resumingFrom = void 0)),
                      this.setAnimationOrigin(t, u);
                    const e = { ...rs(i, "layout"), onPlay: r, onComplete: a };
                    (o.shouldReduceMotion || this.options.layoutRoot) &&
                      ((e.delay = 0), (e.type = !1)),
                      this.startAnimation(e);
                  } else
                    e || Fr(this),
                      this.isLead() &&
                        this.options.onExitComplete &&
                        this.options.onExitComplete();
                  this.targetLayout = s;
                }
              );
        }
        unmount() {
          this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
          const t = this.getStack();
          t && t.remove(this),
            this.parent && this.parent.children.delete(this),
            (this.instance = void 0),
            zt(this.updateProjection);
        }
        blockUpdate() {
          this.updateManuallyBlocked = !0;
        }
        unblockUpdate() {
          this.updateManuallyBlocked = !1;
        }
        isUpdateBlocked() {
          return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
          return (
            this.isAnimationBlocked ||
            (this.parent && this.parent.isTreeAnimationBlocked()) ||
            !1
          );
        }
        startUpdate() {
          this.isUpdateBlocked() ||
            ((this.isUpdating = !0),
            this.nodes && this.nodes.forEach(Ur),
            this.animationId++);
        }
        getTransformTemplate() {
          const { visualElement: t } = this.options;
          return t && t.getProps().transformTemplate;
        }
        willUpdate(t = !0) {
          if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked()))
            return void (
              this.options.onExitComplete && this.options.onExitComplete()
            );
          if (
            (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
          )
            return;
          this.isLayoutDirty = !0;
          for (let t = 0; t < this.path.length; t++) {
            const e = this.path[t];
            (e.shouldResetTransform = !0),
              e.updateScroll("snapshot"),
              e.options.layoutRoot && e.willUpdate(!1);
          }
          const { layoutId: e, layout: n } = this.options;
          if (void 0 === e && !n) return;
          const s = this.getTransformTemplate();
          (this.prevTransformTemplateValue = s
            ? s(this.latestValues, "")
            : void 0),
            this.updateSnapshot(),
            t && this.notifyListeners("willUpdate");
        }
        update() {
          this.updateScheduled = !1;
          if (this.isUpdateBlocked())
            return (
              this.unblockUpdate(),
              this.clearAllSnapshots(),
              void this.nodes.forEach(kr)
            );
          this.isUpdating || this.nodes.forEach(Br),
            (this.isUpdating = !1),
            this.nodes.forEach(jr),
            this.nodes.forEach(Vr),
            this.nodes.forEach(Mr),
            this.clearAllSnapshots();
          const t = performance.now();
          (Ht.delta = Y(0, 1e3 / 60, t - Ht.timestamp)),
            (Ht.timestamp = t),
            (Ht.isProcessing = !0),
            $t.update.process(Ht),
            $t.preRender.process(Ht),
            $t.render.process(Ht),
            (Ht.isProcessing = !1);
        }
        didUpdate() {
          this.updateScheduled ||
            ((this.updateScheduled = !0), queueMicrotask(() => this.update()));
        }
        clearAllSnapshots() {
          this.nodes.forEach(Rr), this.sharedNodes.forEach(Wr);
        }
        scheduleUpdateProjection() {
          Nt.preRender(this.updateProjection, !1, !0);
        }
        scheduleCheckAfterUnmount() {
          Nt.postRender(() => {
            this.isLayoutDirty
              ? this.root.didUpdate()
              : this.root.checkUpdateFailed();
          });
        }
        updateSnapshot() {
          !this.snapshot && this.instance && (this.snapshot = this.measure());
        }
        updateLayout() {
          if (!this.instance) return;
          if (
            (this.updateScroll(),
            !(
              (this.options.alwaysMeasureLayout && this.isLead()) ||
              this.isLayoutDirty
            ))
          )
            return;
          if (this.resumeFrom && !this.resumeFrom.instance)
            for (let t = 0; t < this.path.length; t++) {
              this.path[t].updateScroll();
            }
          const t = this.layout;
          (this.layout = this.measure(!1)),
            (this.layoutCorrected = {
              x: { min: 0, max: 0 },
              y: { min: 0, max: 0 }
            }),
            (this.isLayoutDirty = !1),
            (this.projectionDelta = void 0),
            this.notifyListeners("measure", this.layout.layoutBox);
          const { visualElement: e } = this.options;
          e &&
            e.notify(
              "LayoutMeasure",
              this.layout.layoutBox,
              t ? t.layoutBox : void 0
            );
        }
        updateScroll(t = "measure") {
          let e = Boolean(this.options.layoutScroll && this.instance);
          this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === t &&
            (e = !1),
            e &&
              (this.scroll = {
                animationId: this.root.animationId,
                phase: t,
                isRoot: s(this.instance),
                offset: n(this.instance)
              });
        }
        resetTransform() {
          if (!i) return;
          const t = this.isLayoutDirty || this.shouldResetTransform,
            e = this.projectionDelta && !$i(this.projectionDelta),
            n = this.getTransformTemplate(),
            s = n ? n(this.latestValues, "") : void 0,
            o = s !== this.prevTransformTemplateValue;
          t &&
            (e || ci(this.latestValues) || o) &&
            (i(this.instance, s),
            (this.shouldResetTransform = !1),
            this.scheduleRender());
        }
        measure(t = !0) {
          const e = this.measurePageBox();
          let n = this.removeElementScroll(e);
          var s;
          return (
            t && (n = this.removeTransform(n)),
            Gr((s = n).x),
            Gr(s.y),
            {
              animationId: this.root.animationId,
              measuredBox: e,
              layoutBox: n,
              latestValues: {},
              source: this.id
            }
          );
        }
        measurePageBox() {
          const { visualElement: t } = this.options;
          if (!t) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          const e = t.measureViewportBox(),
            { scroll: n } = this.root;
          return n && (vi(e.x, n.offset.x), vi(e.y, n.offset.y)), e;
        }
        removeElementScroll(t) {
          const e = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          Oi(e, t);
          for (let n = 0; n < this.path.length; n++) {
            const s = this.path[n],
              { scroll: i, options: o } = s;
            if (s !== this.root && i && o.layoutScroll) {
              if (i.isRoot) {
                Oi(e, t);
                const { scroll: n } = this.root;
                n && (vi(e.x, -n.offset.x), vi(e.y, -n.offset.y));
              }
              vi(e.x, i.offset.x), vi(e.y, i.offset.y);
            }
          }
          return e;
        }
        applyTransform(t, e = !1) {
          const n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          Oi(n, t);
          for (let t = 0; t < this.path.length; t++) {
            const s = this.path[t];
            !e &&
              s.options.layoutScroll &&
              s.scroll &&
              s !== s.root &&
              Ei(n, { x: -s.scroll.offset.x, y: -s.scroll.offset.y }),
              ci(s.latestValues) && Ei(n, s.latestValues);
          }
          return ci(this.latestValues) && Ei(n, this.latestValues), n;
        }
        removeTransform(t) {
          const e = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          Oi(e, t);
          for (let t = 0; t < this.path.length; t++) {
            const n = this.path[t];
            if (!n.instance) continue;
            if (!ci(n.latestValues)) continue;
            ui(n.latestValues) && n.updateSnapshot();
            const s = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
            Oi(s, n.measurePageBox()),
              zi(
                e,
                n.latestValues,
                n.snapshot ? n.snapshot.layoutBox : void 0,
                s
              );
          }
          return ci(this.latestValues) && zi(e, this.latestValues), e;
        }
        setTargetDelta(t) {
          (this.targetDelta = t),
            this.root.scheduleUpdateProjection(),
            (this.isProjectionDirty = !0);
        }
        setOptions(t) {
          this.options = {
            ...this.options,
            ...t,
            crossfade: void 0 === t.crossfade || t.crossfade
          };
        }
        clearMeasurements() {
          (this.scroll = void 0),
            (this.layout = void 0),
            (this.snapshot = void 0),
            (this.prevTransformTemplateValue = void 0),
            (this.targetDelta = void 0),
            (this.target = void 0),
            (this.isLayoutDirty = !1);
        }
        forceRelativeParentToResolveTarget() {
          this.relativeParent &&
            this.relativeParent.resolvedRelativeTargetAt !== Ht.timestamp &&
            this.relativeParent.resolveTargetDelta(!0);
        }
        resolveTargetDelta(t = !1) {
          var e;
          const n = this.getLead();
          this.isProjectionDirty ||
            (this.isProjectionDirty = n.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = n.isTransformDirty),
            this.isSharedProjectionDirty ||
              (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
          const s = Boolean(this.resumingFrom) || this !== n;
          if (
            !(
              t ||
              (s && this.isSharedProjectionDirty) ||
              this.isProjectionDirty ||
              (null === (e = this.parent) || void 0 === e
                ? void 0
                : e.isProjectionDirty) ||
              this.attemptToResolveRelativeTarget
            )
          )
            return;
          const { layout: i, layoutId: o } = this.options;
          if (this.layout && (i || o)) {
            if (
              ((this.resolvedRelativeTargetAt = Ht.timestamp),
              !this.targetDelta && !this.relativeTarget)
            ) {
              const t = this.getClosestProjectingParent();
              t && t.layout && 1 !== this.animationProgress
                ? ((this.relativeParent = t),
                  this.forceRelativeParentToResolveTarget(),
                  (this.relativeTarget = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 }
                  }),
                  (this.relativeTargetOrigin = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 }
                  }),
                  Qs(
                    this.relativeTargetOrigin,
                    this.layout.layoutBox,
                    t.layout.layoutBox
                  ),
                  Oi(this.relativeTarget, this.relativeTargetOrigin))
                : (this.relativeParent = this.relativeTarget = void 0);
            }
            if (this.relativeTarget || this.targetDelta) {
              var r, a, l;
              if (
                (this.target ||
                  ((this.target = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 }
                  }),
                  (this.targetWithTransforms = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 }
                  })),
                this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target
                  ? (this.forceRelativeParentToResolveTarget(),
                    (r = this.target),
                    (a = this.relativeTarget),
                    (l = this.relativeParent.target),
                    _s(r.x, a.x, l.x),
                    _s(r.y, a.y, l.y))
                  : this.targetDelta
                  ? (Boolean(this.resumingFrom)
                      ? (this.target = this.applyTransform(this.layout.layoutBox))
                      : Oi(this.target, this.layout.layoutBox),
                    gi(this.target, this.targetDelta))
                  : Oi(this.target, this.layout.layoutBox),
                this.attemptToResolveRelativeTarget)
              ) {
                this.attemptToResolveRelativeTarget = !1;
                const t = this.getClosestProjectingParent();
                t &&
                Boolean(t.resumingFrom) === Boolean(this.resumingFrom) &&
                !t.options.layoutScroll &&
                t.target &&
                1 !== this.animationProgress
                  ? ((this.relativeParent = t),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 }
                    }),
                    (this.relativeTargetOrigin = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 }
                    }),
                    Qs(this.relativeTargetOrigin, this.target, t.target),
                    Oi(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              Tr.resolvedTargetDeltas++;
            }
          }
        }
        getClosestProjectingParent() {
          if (
            this.parent &&
            !ui(this.parent.latestValues) &&
            !hi(this.parent.latestValues)
          )
            return this.parent.isProjecting()
              ? this.parent
              : this.parent.getClosestProjectingParent();
        }
        isProjecting() {
          return Boolean(
            (this.relativeTarget ||
              this.targetDelta ||
              this.options.layoutRoot) &&
              this.layout
          );
        }
        calcProjection() {
          var t;
          const e = this.getLead(),
            n = Boolean(this.resumingFrom) || this !== e;
          let s = !0;
          if (
            ((this.isProjectionDirty ||
              (null === (t = this.parent) || void 0 === t
                ? void 0
                : t.isProjectionDirty)) &&
              (s = !1),
            n &&
              (this.isSharedProjectionDirty || this.isTransformDirty) &&
              (s = !1),
            this.resolvedRelativeTargetAt === Ht.timestamp && (s = !1),
            s)
          )
            return;
          const { layout: i, layoutId: o } = this.options;
          if (
            ((this.isTreeAnimating = Boolean(
              (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
            )),
            this.isTreeAnimating ||
              (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || (!i && !o))
          )
            return;
          Oi(this.layoutCorrected, this.layout.layoutBox);
          const r = this.treeScale.x,
            a = this.treeScale.y;
          !(function (t, e, n, s = !1) {
            const i = n.length;
            if (!i) return;
            let o, r;
            e.x = e.y = 1;
            for (let a = 0; a < i; a++) {
              (o = n[a]), (r = o.projectionDelta);
              const i = o.instance;
              (i && i.style && "contents" === i.style.display) ||
                (s &&
                  o.options.layoutScroll &&
                  o.scroll &&
                  o !== o.root &&
                  Ei(t, { x: -o.scroll.offset.x, y: -o.scroll.offset.y }),
                r && ((e.x *= r.x.scale), (e.y *= r.y.scale), gi(t, r)),
                s && ci(o.latestValues) && Ei(t, o.latestValues));
            }
            (e.x = yi(e.x)), (e.y = yi(e.y));
          })(this.layoutCorrected, this.treeScale, this.path, n),
            !e.layout ||
              e.target ||
              (1 === this.treeScale.x && 1 === this.treeScale.y) ||
              (e.target = e.layout.layoutBox);
          const { target: l } = e;
          if (!l)
            return void (
              this.projectionTransform &&
              ((this.projectionDelta = {
                x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
              }),
              (this.projectionTransform = "none"),
              this.scheduleRender())
            );
          this.projectionDelta ||
            ((this.projectionDelta = {
              x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
              y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
            }),
            (this.projectionDeltaWithTransform = {
              x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
              y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
            }));
          const u = this.projectionTransform;
          Ks(this.projectionDelta, this.layoutCorrected, l, this.latestValues),
            (this.projectionTransform = qi(this.projectionDelta, this.treeScale)),
            (this.projectionTransform === u &&
              this.treeScale.x === r &&
              this.treeScale.y === a) ||
              ((this.hasProjected = !0),
              this.scheduleRender(),
              this.notifyListeners("projectionUpdate", l)),
            Tr.recalculatedProjection++;
        }
        hide() {
          this.isVisible = !1;
        }
        show() {
          this.isVisible = !0;
        }
        scheduleRender(t = !0) {
          if ((this.options.scheduleRender && this.options.scheduleRender(), t)) {
            const t = this.getStack();
            t && t.scheduleRender();
          }
          this.resumingFrom &&
            !this.resumingFrom.instance &&
            (this.resumingFrom = void 0);
        }
        setAnimationOrigin(t, e = !1) {
          const n = this.snapshot,
            s = n ? n.latestValues : {},
            i = { ...this.latestValues },
            o = {
              x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
              y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
            };
          (this.relativeParent && this.relativeParent.options.layoutRoot) ||
            (this.relativeTarget = this.relativeTargetOrigin = void 0),
            (this.attemptToResolveRelativeTarget = !e);
          const r = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
            a =
              (n ? n.source : void 0) !==
              (this.layout ? this.layout.source : void 0),
            l = this.getStack(),
            u = !l || l.members.length <= 1,
            c = Boolean(
              a && !u && !0 === this.options.crossfade && !this.path.some(Hr)
            );
          let h;
          (this.animationProgress = 0),
            (this.mixTargetDelta = (e) => {
              const n = e / 1e3;
              var l, d, m, p, f, g;
              Nr(o.x, t.x, n),
                Nr(o.y, t.y, n),
                this.setTargetDelta(o),
                this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  this.layout &&
                  this.relativeParent &&
                  this.relativeParent.layout &&
                  (Qs(
                    r,
                    this.layout.layoutBox,
                    this.relativeParent.layout.layoutBox
                  ),
                  (m = this.relativeTarget),
                  (p = this.relativeTargetOrigin),
                  (f = r),
                  (g = n),
                  zr(m.x, p.x, f.x, g),
                  zr(m.y, p.y, f.y, g),
                  h &&
                    ((l = this.relativeTarget),
                    (d = h),
                    l.x.min === d.x.min &&
                      l.x.max === d.x.max &&
                      l.y.min === d.y.min &&
                      l.y.max === d.y.max) &&
                    (this.isProjectionDirty = !1),
                  h || (h = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
                  Oi(h, this.relativeTarget)),
                a &&
                  ((this.animationValues = i),
                  (function (t, e, n, s, i, o) {
                    i
                      ? ((t.opacity = en(
                          0,
                          void 0 !== n.opacity ? n.opacity : 1,
                          ki(s)
                        )),
                        (t.opacityExit = en(
                          void 0 !== e.opacity ? e.opacity : 1,
                          0,
                          Bi(s)
                        )))
                      : o &&
                        (t.opacity = en(
                          void 0 !== e.opacity ? e.opacity : 1,
                          void 0 !== n.opacity ? n.opacity : 1,
                          s
                        ));
                    for (let i = 0; i < Mi; i++) {
                      const o = `border${Vi[i]}Radius`;
                      let r = Ri(e, o),
                        a = Ri(n, o);
                      if (void 0 === r && void 0 === a) continue;
                      r || (r = 0), a || (a = 0);
                      0 === r || 0 === a || Li(r) === Li(a)
                        ? ((t[o] = Math.max(en(Di(r), Di(a), s), 0)),
                          (nt.test(a) || nt.test(r)) && (t[o] += "%"))
                        : (t[o] = a);
                    }
                    (e.rotate || n.rotate) &&
                      (t.rotate = en(e.rotate || 0, n.rotate || 0, s));
                  })(i, s, this.latestValues, n, c, u)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                (this.animationProgress = n);
            }),
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
        }
        startAnimation(t) {
          this.notifyListeners("animationStart"),
            this.currentAnimation && this.currentAnimation.stop(),
            this.resumingFrom &&
              this.resumingFrom.currentAnimation &&
              this.resumingFrom.currentAnimation.stop(),
            this.pendingAnimation &&
              (zt(this.pendingAnimation), (this.pendingAnimation = void 0)),
            (this.pendingAnimation = Nt.update(() => {
              (_i.hasAnimatedSinceResize = !0),
                (this.currentAnimation = Lo(0, 1e3, {
                  ...t,
                  onUpdate: (e) => {
                    this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                  },
                  onComplete: () => {
                    t.onComplete && t.onComplete(), this.completeAnimation();
                  }
                })),
                this.resumingFrom &&
                  (this.resumingFrom.currentAnimation = this.currentAnimation),
                (this.pendingAnimation = void 0);
            }));
        }
        completeAnimation() {
          this.resumingFrom &&
            ((this.resumingFrom.currentAnimation = void 0),
            (this.resumingFrom.preserveOpacity = void 0));
          const t = this.getStack();
          t && t.exitAnimationComplete(),
            (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
          this.currentAnimation &&
            (this.mixTargetDelta && this.mixTargetDelta(1e3),
            this.currentAnimation.stop()),
            this.completeAnimation();
        }
        applyTransformsToTarget() {
          const t = this.getLead();
          let {
            targetWithTransforms: e,
            target: n,
            layout: s,
            latestValues: i
          } = t;
          if (e && n && s) {
            if (
              this !== t &&
              this.layout &&
              s &&
              qr(this.options.animationType, this.layout.layoutBox, s.layoutBox)
            ) {
              n = this.target || { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              const e = Gs(this.layout.layoutBox.x);
              (n.x.min = t.target.x.min), (n.x.max = n.x.min + e);
              const s = Gs(this.layout.layoutBox.y);
              (n.y.min = t.target.y.min), (n.y.max = n.y.min + s);
            }
            Oi(e, n),
              Ei(e, i),
              Ks(this.projectionDeltaWithTransform, this.layoutCorrected, e, i);
          }
        }
        registerSharedNode(t, e) {
          this.sharedNodes.has(t) || this.sharedNodes.set(t, new Gi());
          this.sharedNodes.get(t).add(e);
          const n = e.options.initialPromotionConfig;
          e.promote({
            transition: n ? n.transition : void 0,
            preserveFollowOpacity:
              n && n.shouldPreserveFollowOpacity
                ? n.shouldPreserveFollowOpacity(e)
                : void 0
          });
        }
        isLead() {
          const t = this.getStack();
          return !t || t.lead === this;
        }
        getLead() {
          var t;
          const { layoutId: e } = this.options;
          return (
            (e &&
              (null === (t = this.getStack()) || void 0 === t
                ? void 0
                : t.lead)) ||
            this
          );
        }
        getPrevLead() {
          var t;
          const { layoutId: e } = this.options;
          return e
            ? null === (t = this.getStack()) || void 0 === t
              ? void 0
              : t.prevLead
            : void 0;
        }
        getStack() {
          const { layoutId: t } = this.options;
          if (t) return this.root.sharedNodes.get(t);
        }
        promote({ needsReset: t, transition: e, preserveFollowOpacity: n } = {}) {
          const s = this.getStack();
          s && s.promote(this, n),
            t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
            e && this.setOptions({ transition: e });
        }
        relegate() {
          const t = this.getStack();
          return !!t && t.relegate(this);
        }
        resetRotation() {
          const { visualElement: t } = this.options;
          if (!t) return;
          let e = !1;
          const { latestValues: n } = t;
          if (((n.rotate || n.rotateX || n.rotateY || n.rotateZ) && (e = !0), !e))
            return;
          const s = {};
          for (let e = 0; e < Sr.length; e++) {
            const i = "rotate" + Sr[e];
            n[i] && ((s[i] = n[i]), t.setStaticValue(i, 0));
          }
          t.render();
          for (const e in s) t.setStaticValue(e, s[e]);
          t.scheduleRender();
        }
        getProjectionStyles(t = {}) {
          var e, n;
          const s = {};
          if (!this.instance || this.isSVG) return s;
          if (!this.isVisible) return { visibility: "hidden" };
          s.visibility = "";
          const i = this.getTransformTemplate();
          if (this.needsReset)
            return (
              (this.needsReset = !1),
              (s.opacity = ""),
              (s.pointerEvents = Ft(t.pointerEvents) || ""),
              (s.transform = i ? i(this.latestValues, "") : "none"),
              s
            );
          const o = this.getLead();
          if (!this.projectionDelta || !this.layout || !o.target) {
            const e = {};
            return (
              this.options.layoutId &&
                ((e.opacity =
                  void 0 !== this.latestValues.opacity
                    ? this.latestValues.opacity
                    : 1),
                (e.pointerEvents = Ft(t.pointerEvents) || "")),
              this.hasProjected &&
                !ci(this.latestValues) &&
                ((e.transform = i ? i({}, "") : "none"),
                (this.hasProjected = !1)),
              e
            );
          }
          const r = o.animationValues || o.latestValues;
          this.applyTransformsToTarget(),
            (s.transform = qi(
              this.projectionDeltaWithTransform,
              this.treeScale,
              r
            )),
            i && (s.transform = i(r, s.transform));
          const { x: a, y: l } = this.projectionDelta;
          (s.transformOrigin = `${100 * a.origin}% ${100 * l.origin}% 0`),
            o.animationValues
              ? (s.opacity =
                  o === this
                    ? null !==
                        (n =
                          null !== (e = r.opacity) && void 0 !== e
                            ? e
                            : this.latestValues.opacity) && void 0 !== n
                      ? n
                      : 1
                    : this.preserveOpacity
                    ? this.latestValues.opacity
                    : r.opacityExit)
              : (s.opacity =
                  o === this
                    ? void 0 !== r.opacity
                      ? r.opacity
                      : ""
                    : void 0 !== r.opacityExit
                    ? r.opacityExit
                    : 0);
          for (const t in R) {
            if (void 0 === r[t]) continue;
            const { correct: e, applyTo: n } = R[t],
              i = "none" === s.transform ? r[t] : e(r[t], o);
            if (n) {
              const t = n.length;
              for (let e = 0; e < t; e++) s[n[e]] = i;
            } else s[t] = i;
          }
          return (
            this.options.layoutId &&
              (s.pointerEvents = o === this ? Ft(t.pointerEvents) || "" : "none"),
            s
          );
        }
        clearSnapshot() {
          this.resumeFrom = this.snapshot = void 0;
        }
        resetTree() {
          this.root.nodes.forEach((t) => {
            var e;
            return null === (e = t.currentAnimation) || void 0 === e
              ? void 0
              : e.stop();
          }),
            this.root.nodes.forEach(kr),
            this.root.sharedNodes.clear();
        }
      };
    }
    function Vr(t) {
      t.updateLayout();
    }
    function Mr(t) {
      var e;
      const n =
        (null === (e = t.resumeFrom) || void 0 === e ? void 0 : e.snapshot) ||
        t.snapshot;
      if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
        const { layoutBox: e, measuredBox: s } = t.layout,
          { animationType: i } = t.options,
          o = n.source !== t.layout.source;
        "size" === i
          ? ri((t) => {
              const s = o ? n.measuredBox[t] : n.layoutBox[t],
                i = Gs(s);
              (s.min = e[t].min), (s.max = s.min + i);
            })
          : qr(i, n.layoutBox, e) &&
            ri((s) => {
              const i = o ? n.measuredBox[s] : n.layoutBox[s],
                r = Gs(e[s]);
              (i.max = i.min + r),
                t.relativeTarget &&
                  !t.currentAnimation &&
                  ((t.isProjectionDirty = !0),
                  (t.relativeTarget[s].max = t.relativeTarget[s].min + r));
            });
        const r = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
        };
        Ks(r, e, n.layoutBox);
        const a = {
          x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          y: { translate: 0, scale: 1, origin: 0, originPoint: 0 }
        };
        o ? Ks(a, t.applyTransform(s, !0), n.measuredBox) : Ks(a, e, n.layoutBox);
        const l = !$i(r);
        let u = !1;
        if (!t.resumeFrom) {
          const s = t.getClosestProjectingParent();
          if (s && !s.resumeFrom) {
            const { snapshot: i, layout: o } = s;
            if (i && o) {
              const r = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Qs(r, n.layoutBox, i.layoutBox);
              const a = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Qs(a, e, o.layoutBox),
                Yi(r, a) || (u = !0),
                s.options.layoutRoot &&
                  ((t.relativeTarget = a),
                  (t.relativeTargetOrigin = r),
                  (t.relativeParent = s));
            }
          }
        }
        t.notifyListeners("didUpdate", {
          layout: e,
          snapshot: n,
          delta: a,
          layoutDelta: r,
          hasLayoutChanged: l,
          hasRelativeTargetChanged: u
        });
      } else if (t.isLead()) {
        const { onExitComplete: e } = t.options;
        e && e();
      }
      t.options.transition = void 0;
    }
    function Dr(t) {
      Tr.totalNodes++,
        t.parent &&
          (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty),
          t.isSharedProjectionDirty ||
            (t.isSharedProjectionDirty = Boolean(
              t.isProjectionDirty ||
                t.parent.isProjectionDirty ||
                t.parent.isSharedProjectionDirty
            )),
          t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
    }
    function Lr(t) {
      t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
    }
    function Rr(t) {
      t.clearSnapshot();
    }
    function kr(t) {
      t.clearMeasurements();
    }
    function Br(t) {
      t.isLayoutDirty = !1;
    }
    function jr(t) {
      const { visualElement: e } = t.options;
      e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"),
        t.resetTransform();
    }
    function Fr(t) {
      t.finishAnimation(),
        (t.targetDelta = t.relativeTarget = t.target = void 0),
        (t.isProjectionDirty = !0);
    }
    function Or(t) {
      t.resolveTargetDelta();
    }
    function Ir(t) {
      t.calcProjection();
    }
    function Ur(t) {
      t.resetRotation();
    }
    function Wr(t) {
      t.removeLeadSnapshot();
    }
    function Nr(t, e, n) {
      (t.translate = en(e.translate, 0, n)),
        (t.scale = en(e.scale, 1, n)),
        (t.origin = e.origin),
        (t.originPoint = e.originPoint);
    }
    function zr(t, e, n, s) {
      (t.min = en(e.min, n.min, s)), (t.max = en(e.max, n.max, s));
    }
    function Hr(t) {
      return t.animationValues && void 0 !== t.animationValues.opacityExit;
    }
    const $r = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
      Yr = (t) =>
        "undefined" != typeof navigator &&
        navigator.userAgent.toLowerCase().includes(t),
      Xr = Yr("applewebkit/") && !Yr("chrome/") ? Math.round : Ut;
    function Gr(t) {
      (t.min = Xr(t.min)), (t.max = Xr(t.max));
    }
    function qr(t, e, n) {
      return (
        "position" === t || ("preserve-aspect" === t && !qs(Xi(e), Xi(n), 0.2))
      );
    }
    const Zr = Cr({
        attachResizeListener: (t, e) => qt(t, "resize", e),
        measureScroll: () => ({
          x: document.documentElement.scrollLeft || document.body.scrollLeft,
          y: document.documentElement.scrollTop || document.body.scrollTop
        }),
        checkIsScrollRoot: () => !0
      }),
      Kr = { current: void 0 },
      _r = Cr({
        measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
        defaultParent: () => {
          if (!Kr.current) {
            const t = new Zr({});
            t.mount(window), t.setOptions({ layoutScroll: !0 }), (Kr.current = t);
          }
          return Kr.current;
        },
        resetTransform: (t, e) => {
          t.style.transform = void 0 !== e ? e : "none";
        },
        checkIsScrollRoot: (t) =>
          Boolean("fixed" === window.getComputedStyle(t).position)
      }),
      Jr = (t) => !t.isLayoutDirty && t.willUpdate(!1);
    function Qr() {
      const t = new Set(),
        e = new WeakMap(),
        n = () => t.forEach(Jr);
      return {
        add: (s) => {
          t.add(s), e.set(s, s.addEventListener("willUpdate", n));
        },
        remove: (s) => {
          t.delete(s);
          const i = e.get(s);
          i && (i(), e.delete(s)), n();
        },
        dirty: n
      };
    }
    function ta(t, e) {
      return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
    }
    const ea = {
        correct: (t, e) => {
          if (!e.target) return t;
          if ("string" == typeof t) {
            if (!st.test(t)) return t;
            t = parseFloat(t);
          }
          return `${ta(t, e.target.x)}% ${ta(t, e.target.y)}%`;
        }
      },
      na = {
        correct: (t, { treeScale: e, projectionDelta: n }) => {
          const s = t,
            i = gn.parse(t);
          if (i.length > 5) return s;
          const o = gn.createTransformer(t),
            r = "number" != typeof i[0] ? 1 : 0,
            a = n.x.scale * e.x,
            l = n.y.scale * e.y;
          (i[0 + r] /= a), (i[1 + r] /= l);
          const u = en(a, l, 0.5);
          return (
            "number" == typeof i[2 + r] && (i[2 + r] /= u),
            "number" == typeof i[3 + r] && (i[3 + r] /= u),
            o(i)
          );
        }
      };
    function sa() {
      const t = e.useContext(l);
      if (null === t) return [!0, null];
      const { isPresent: n, onExitComplete: s, register: i } = t,
        o = e.useId();
      e.useEffect(() => i(o), []);
      return !n && s ? [!1, () => s && s(o)] : [!0];
    }
    class ia extends o.default.Component {
      componentDidMount() {
        const {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: n,
            layoutId: s
          } = this.props,
          { projection: i } = t;
        k(ra),
          i &&
            (e.group && e.group.add(i),
            n && n.register && s && n.register(i),
            i.root.didUpdate(),
            i.addEventListener("animationComplete", () => {
              this.safeToRemove();
            }),
            i.setOptions({
              ...i.options,
              onExitComplete: () => this.safeToRemove()
            })),
          (_i.hasEverUpdated = !0);
      }
      getSnapshotBeforeUpdate(t) {
        const {
            layoutDependency: e,
            visualElement: n,
            drag: s,
            isPresent: i
          } = this.props,
          o = n.projection;
        return o
          ? ((o.isPresent = i),
            s || t.layoutDependency !== e || void 0 === e
              ? o.willUpdate()
              : this.safeToRemove(),
            t.isPresent !== i &&
              (i
                ? o.promote()
                : o.relegate() ||
                  Nt.postRender(() => {
                    const t = o.getStack();
                    (t && t.members.length) || this.safeToRemove();
                  })),
            null)
          : null;
      }
      componentDidUpdate() {
        const { projection: t } = this.props.visualElement;
        t &&
          (t.root.didUpdate(),
          queueMicrotask(() => {
            !t.currentAnimation && t.isLead() && this.safeToRemove();
          }));
      }
      componentWillUnmount() {
        const {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: n
          } = this.props,
          { projection: s } = t;
        s &&
          (s.scheduleCheckAfterUnmount(),
          e && e.group && e.group.remove(s),
          n && n.deregister && n.deregister(s));
      }
      safeToRemove() {
        const { safeToRemove: t } = this.props;
        t && t();
      }
      render() {
        return null;
      }
    }
    function oa(t) {
      const [n, s] = sa(),
        i = e.useContext(S);
      return o.default.createElement(ia, {
        ...t,
        layoutGroup: i,
        switchLayoutGroup: e.useContext(A),
        isPresent: n,
        safeToRemove: s
      });
    }
    const ra = {
        borderRadius: {
          ...ea,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
          ]
        },
        borderTopLeftRadius: ea,
        borderTopRightRadius: ea,
        borderBottomLeftRadius: ea,
        borderBottomRightRadius: ea,
        boxShadow: na
      },
      aa = {
        pan: {
          Feature: class extends re {
            constructor() {
              super(...arguments), (this.removePointerDownListener = Ut);
            }
            onPointerDown(t) {
              this.session = new Ws(t, this.createPanHandlers(), {
                transformPagePoint: this.node.getTransformPagePoint()
              });
            }
            createPanHandlers() {
              const {
                onPanSessionStart: t,
                onPanStart: e,
                onPan: n,
                onPanEnd: s
              } = this.node.getProps();
              return {
                onSessionStart: Ci(t),
                onStart: Ci(e),
                onMove: n,
                onEnd: (t, e) => {
                  delete this.session, s && Nt.update(() => s(t, e));
                }
              };
            }
            mount() {
              this.removePointerDownListener = Jt(
                this.node.current,
                "pointerdown",
                (t) => this.onPointerDown(t)
              );
            }
            update() {
              this.session &&
                this.session.updateHandlers(this.createPanHandlers());
            }
            unmount() {
              this.removePointerDownListener(),
                this.session && this.session.end();
            }
          }
        },
        drag: {
          Feature: class extends re {
            constructor(t) {
              super(t),
                (this.removeGroupControls = Ut),
                (this.removeListeners = Ut),
                (this.controls = new Ai(t));
            }
            mount() {
              const { dragControls: t } = this.node.getProps();
              t && (this.removeGroupControls = t.subscribe(this.controls)),
                (this.removeListeners = this.controls.addListeners() || Ut);
            }
            unmount() {
              this.removeGroupControls(), this.removeListeners();
            }
          },
          ProjectionNode: _r,
          MeasureLayout: oa
        }
      },
      la = (t, e) =>
        L(t)
          ? new Vo(e, { enableHardwareAcceleration: !1 })
          : new Mo(e, { enableHardwareAcceleration: !0 }),
      ua = { layout: { ProjectionNode: _r, MeasureLayout: oa } },
      ca = { ...Os, ...ge, ...aa, ...ua },
      ha = M((t, e) => Gt(t, e, ca, la));
    const da = M(Gt);
    function ma() {
      const t = e.useRef(!1);
      return (
        c(
          () => (
            (t.current = !0),
            () => {
              t.current = !1;
            }
          ),
          []
        ),
        t
      );
    }
    function pa() {
      const t = ma(),
        [n, s] = e.useState(0),
        i = e.useCallback(() => {
          t.current && s(n + 1);
        }, [n]);
      return [e.useCallback(() => Nt.postRender(i), [i]), n];
    }
    class fa extends i.Component {
      getSnapshotBeforeUpdate(t) {
        const e = this.props.childRef.current;
        if (e && t.isPresent && !this.props.isPresent) {
          const t = this.props.sizeRef.current;
          (t.height = e.offsetHeight || 0),
            (t.width = e.offsetWidth || 0),
            (t.top = e.offsetTop),
            (t.left = e.offsetLeft);
        }
        return null;
      }
      componentDidUpdate() {}
      render() {
        return this.props.children;
      }
    }
    function ga({ children: t, isPresent: n }) {
      const s = e.useId(),
        o = e.useRef(null),
        r = e.useRef({ width: 0, height: 0, top: 0, left: 0 });
      return (
        e.useInsertionEffect(() => {
          const { width: t, height: e, top: i, left: a } = r.current;
          if (n || !o.current || !t || !e) return;
          o.current.dataset.motionPopId = s;
          const l = document.createElement("style");
          return (
            document.head.appendChild(l),
            l.sheet &&
              l.sheet.insertRule(
                `\n          [data-motion-pop-id="${s}"] {\n            position: absolute !important;\n            width: ${t}px !important;\n            height: ${e}px !important;\n            top: ${i}px !important;\n            left: ${a}px !important;\n          }\n        `
              ),
            () => {
              document.head.removeChild(l);
            }
          );
        }, [n]),
        i.createElement(
          fa,
          { isPresent: n, childRef: o, sizeRef: r },
          i.cloneElement(t, { ref: o })
        )
      );
    }
    const ya = ({
      children: t,
      initial: n,
      isPresent: s,
      onExitComplete: o,
      custom: r,
      presenceAffectsLayout: a,
      mode: u
    }) => {
      const c = Bt(va),
        h = e.useId(),
        d = e.useMemo(
          () => ({
            id: h,
            initial: n,
            isPresent: s,
            custom: r,
            onExitComplete: (t) => {
              c.set(t, !0);
              for (const t of c.values()) if (!t) return;
              o && o();
            },
            register: (t) => (c.set(t, !1), () => c.delete(t))
          }),
          a ? void 0 : [s]
        );
      return (
        e.useMemo(() => {
          c.forEach((t, e) => c.set(e, !1));
        }, [s]),
        i.useEffect(() => {
          !s && !c.size && o && o();
        }, [s]),
        "popLayout" === u && (t = i.createElement(ga, { isPresent: s }, t)),
        i.createElement(l.Provider, { value: d }, t)
      );
    };
    function va() {
      return new Map();
    }
    function xa(t) {
      return e.useEffect(() => () => t(), []);
    }
    const Pa = (t) => t.key || "";
    function wa(t) {
      return "function" == typeof t;
    }
    const Ea = e.createContext(null),
      ba = (t) => !0 === t,
      Sa = ({ children: t, id: n, inherit: s = !0 }) => {
        const o = e.useContext(S),
          r = e.useContext(Ea),
          [a, l] = pa(),
          u = e.useRef(null),
          c = o.id || r;
        null === u.current &&
          (((t) => ba(!0 === t) || "id" === t)(s) &&
            c &&
            (n = n ? c + "-" + n : c),
          (u.current = { id: n, group: (ba(s) && o.group) || Qr() }));
        const h = e.useMemo(() => ({ ...u.current, forceRender: a }), [l]);
        return i.createElement(S.Provider, { value: h }, t);
      },
      Aa = e.createContext(null);
    function Ta(t) {
      return t.value;
    }
    function Ca(t, e) {
      return t.layout.min - e.layout.min;
    }
    function Va(t) {
      const n = Bt(() => fs(t)),
        { isStatic: s } = e.useContext(r);
      if (s) {
        const [, s] = e.useState(t);
        e.useEffect(() => n.on("change", s), []);
      }
      return n;
    }
    function Ma(t, e) {
      const n = Va(e()),
        s = () => n.set(e());
      return (
        s(),
        c(() => {
          const e = () => Nt.update(s, !1, !0),
            n = t.map((t) => t.on("change", e));
          return () => {
            n.forEach((t) => t()), zt(s);
          };
        }),
        n
      );
    }
    function Da(t, e, n, s) {
      if ("function" == typeof t)
        return (function (t) {
          (ms.current = []), t();
          const e = Ma(ms.current, t);
          return (ms.current = void 0), e;
        })(t);
      const i = "function" == typeof e ? e : wr(e, n, s);
      return Array.isArray(t) ? La(t, i) : La([t], ([t]) => i(t));
    }
    function La(t, e) {
      const n = Bt(() => []);
      return Ma(t, () => {
        n.length = 0;
        const s = t.length;
        for (let e = 0; e < s; e++) n[e] = t[e].get();
        return e(n);
      });
    }
    function Ra(t, e = 0) {
      return O(t) ? t : Va(e);
    }
    const ka = {
        Group: e.forwardRef(function (
          {
            children: t,
            as: n = "ul",
            axis: s = "y",
            onReorder: o,
            values: r,
            ...a
          },
          l
        ) {
          const u = Bt(() => ha(n)),
            c = [],
            h = e.useRef(!1);
          we(Boolean(r));
          const d = {
            axis: s,
            registerItem: (t, e) => {
              e &&
                -1 === c.findIndex((e) => t === e.value) &&
                (c.push({ value: t, layout: e[s] }), c.sort(Ca));
            },
            updateOrder: (t, e, n) => {
              if (h.current) return;
              const s = (function (t, e, n, s) {
                if (!s) return t;
                const i = t.findIndex((t) => t.value === e);
                if (-1 === i) return t;
                const o = s > 0 ? 1 : -1,
                  r = t[i + o];
                if (!r) return t;
                const a = t[i],
                  l = r.layout,
                  u = en(l.min, l.max, 0.5);
                return (1 === o && a.layout.max + n > u) ||
                  (-1 === o && a.layout.min + n < u)
                  ? (function ([...t], e, n) {
                      const s = e < 0 ? t.length + e : e;
                      if (s >= 0 && s < t.length) {
                        const s = n < 0 ? t.length + n : n,
                          [i] = t.splice(e, 1);
                        t.splice(s, 0, i);
                      }
                      return t;
                    })(t, i, i + o)
                  : t;
              })(c, t, e, n);
              c !== s &&
                ((h.current = !0),
                o(s.map(Ta).filter((t) => -1 !== r.indexOf(t))));
            }
          };
          return (
            e.useEffect(() => {
              h.current = !1;
            }),
            i.createElement(
              u,
              { ...a, ref: l, ignoreStrict: !0 },
              i.createElement(Aa.Provider, { value: d }, t)
            )
          );
        }),
        Item: e.forwardRef(function (
          {
            children: t,
            style: n = {},
            value: s,
            as: o = "li",
            onDrag: r,
            layout: a = !0,
            ...l
          },
          u
        ) {
          const c = Bt(() => ha(o)),
            h = e.useContext(Aa),
            d = { x: Ra(n.x), y: Ra(n.y) },
            m = Da([d.x, d.y], ([t, e]) => (t || e ? 1 : "unset")),
            p = e.useRef(null);
          we(Boolean(h));
          const { axis: f, registerItem: g, updateOrder: y } = h;
          return (
            e.useEffect(() => {
              g(s, p.current);
            }, [h]),
            i.createElement(
              c,
              {
                drag: f,
                ...l,
                dragSnapToOrigin: !0,
                style: { ...n, x: d.x, y: d.y, zIndex: m },
                layout: a,
                onDrag: (t, e) => {
                  const { velocity: n } = e;
                  n[f] && y(s, d[f].get(), n[f]), r && r(t, e);
                },
                onLayoutMeasure: (t) => {
                  p.current = t;
                },
                ref: u,
                ignoreStrict: !0
              },
              t
            )
          );
        })
      },
      Ba = { renderer: la, ...Os, ...ge },
      ja = { ...Ba, ...aa, ...ua };
    function Fa(t, n, s) {
      e.useInsertionEffect(() => t.on(n, s), [t, n, s]);
    }
    function Oa(t, e) {
      Pe(Boolean(!e || e.current));
    }
    const Ia = () => ({
      scrollX: fs(0),
      scrollY: fs(0),
      scrollXProgress: fs(0),
      scrollYProgress: fs(0)
    });
    function Ua({ container: t, target: n, layoutEffect: s = !0, ...i } = {}) {
      const o = Bt(Ia);
      return (
        (s ? c : e.useEffect)(
          () => (
            Oa(0, n),
            Oa(0, t),
            gr(
              ({ x: t, y: e }) => {
                o.scrollX.set(t.current),
                  o.scrollXProgress.set(t.progress),
                  o.scrollY.set(e.current),
                  o.scrollYProgress.set(e.progress);
              },
              {
                ...i,
                container: (null == t ? void 0 : t.current) || void 0,
                target: (null == n ? void 0 : n.current) || void 0
              }
            )
          ),
          []
        ),
        o
      );
    }
    function Wa(t) {
      const n = e.useRef(0),
        { isStatic: s } = e.useContext(r);
      e.useEffect(() => {
        if (s) return;
        const e = ({ timestamp: e, delta: s }) => {
          n.current || (n.current = e), t(e - n.current, s);
        };
        return Nt.update(e, !0), () => zt(e);
      }, [t]);
    }
    class Na extends ps {
      constructor() {
        super(...arguments), (this.members = []), (this.transforms = new Set());
      }
      add(t) {
        let e;
        j.has(t)
          ? (this.transforms.add(t), (e = "transform"))
          : t.startsWith("origin") || z(t) || "willChange" === t || (e = Ct(t)),
          e && (cs(this.members, e), this.update());
      }
      remove(t) {
        j.has(t)
          ? (this.transforms.delete(t),
            this.transforms.size || hs(this.members, "transform"))
          : hs(this.members, Ct(t)),
          this.update();
      }
      update() {
        this.set(this.members.length ? this.members.join(", ") : "auto");
      }
    }
    function za() {
      !Po.current && wo();
      const [t] = e.useState(xo.current);
      return t;
    }
    function Ha() {
      let t = !1;
      const e = new Set(),
        n = {
          subscribe: (t) => (
            e.add(t),
            () => {
              e.delete(t);
            }
          ),
          start(n, s) {
            we(t);
            const i = [];
            return (
              e.forEach((t) => {
                i.push(Ds(t, n, { transitionOverride: s }));
              }),
              Promise.all(i)
            );
          },
          set: (n) => (
            we(t),
            e.forEach((t) => {
              !(function (t, e) {
                Array.isArray(e)
                  ? Es(t, e)
                  : "string" == typeof e
                  ? Es(t, [e])
                  : ws(t, e);
              })(t, n);
            })
          ),
          stop() {
            e.forEach((t) => {
              !(function (t) {
                t.values.forEach((t) => t.stop());
              })(t);
            });
          },
          mount: () => (
            (t = !0),
            () => {
              (t = !1), n.stop();
            }
          )
        };
      return n;
    }
    function $a() {
      const t = Bt(Ha);
      return c(t.mount, []), t;
    }
    const Ya = $a;
    class Xa {
      constructor() {
        this.componentControls = new Set();
      }
      subscribe(t) {
        return (
          this.componentControls.add(t), () => this.componentControls.delete(t)
        );
      }
      start(t, e) {
        this.componentControls.forEach((n) => {
          n.start(t.nativeEvent || t, e);
        });
      }
    }
    const Ga = () => new Xa();
    function qa(t) {
      return null !== t && "object" == typeof t && T in t;
    }
    function Za() {
      return Ka;
    }
    function Ka(t) {
      Kr.current &&
        ((Kr.current.isUpdating = !1), Kr.current.blockUpdate(), t && t());
    }
    const _a = (t, e) => `${t}: ${e}`,
      Ja = new Map();
    function Qa(t, e, n, s) {
      const i = _a(t, j.has(e) ? "transform" : e),
        o = Ja.get(i);
      if (!o) return 0;
      const { animation: r, startTime: a } = o,
        l = () => {
          Ja.delete(i);
          try {
            r.cancel();
          } catch (t) {}
        };
      return null !== a ? (s.render(l), performance.now() - a || 0) : (l(), 0);
    }
    const tl = () => ({});
    class el extends To {
      build() {}
      measureInstanceViewportBox() {
        return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
      }
      resetTransform() {}
      restoreTransform() {}
      removeValueFromRenderState() {}
      renderInstance() {}
      scrapeMotionValuesFromProps() {
        return {};
      }
      getBaseTargetFromProps() {}
      readValueFromInstance(t, e, n) {
        return n.initialState[e] || 0;
      }
      sortInstanceNodePosition() {
        return 0;
      }
      makeTargetAnimatableFromInstance({
        transition: t,
        transitionEnd: e,
        ...n
      }) {
        return (
          bs(this, n, As(n, t || {}, this)),
          { transition: t, transitionEnd: e, ...n }
        );
      }
    }
    const nl = Ot({ scrapeMotionValuesFromProps: tl, createRenderState: tl });
    const sl = (t) => (t > 0.001 ? 1 / t : 1e5);
    let il = !1;
    let ol = 0;
    (t.AnimatePresence = ({
      children: t,
      custom: n,
      initial: s = !0,
      onExitComplete: o,
      exitBeforeEnter: r,
      presenceAffectsLayout: a = !0,
      mode: l = "sync"
    }) => {
      we(!r);
      const u = e.useContext(S).forceRender || pa()[0],
        h = ma(),
        d = (function (t) {
          const n = [];
          return (
            e.Children.forEach(t, (t) => {
              e.isValidElement(t) && n.push(t);
            }),
            n
          );
        })(t);
      let m = d;
      const p = e.useRef(new Map()).current,
        f = e.useRef(m),
        g = e.useRef(new Map()).current,
        y = e.useRef(!0);
      if (
        (c(() => {
          (y.current = !1),
            (function (t, e) {
              t.forEach((t) => {
                const n = Pa(t);
                e.set(n, t);
              });
            })(d, g),
            (f.current = m);
        }),
        xa(() => {
          (y.current = !0), g.clear(), p.clear();
        }),
        y.current)
      )
        return i.createElement(
          i.Fragment,
          null,
          m.map((t) =>
            i.createElement(
              ya,
              {
                key: Pa(t),
                isPresent: !0,
                initial: !!s && void 0,
                presenceAffectsLayout: a,
                mode: l
              },
              t
            )
          )
        );
      m = [...m];
      const v = f.current.map(Pa),
        x = d.map(Pa),
        P = v.length;
      for (let t = 0; t < P; t++) {
        const e = v[t];
        -1 !== x.indexOf(e) || p.has(e) || p.set(e, void 0);
      }
      return (
        "wait" === l && p.size && (m = []),
        p.forEach((t, e) => {
          if (-1 !== x.indexOf(e)) return;
          const s = g.get(e);
          if (!s) return;
          const r = v.indexOf(e);
          let c = t;
          if (!c) {
            const t = () => {
              p.delete(e);
              const t = Array.from(g.keys()).filter((t) => !x.includes(t));
              if (
                (t.forEach((t) => g.delete(t)),
                (f.current = d.filter((n) => {
                  const s = Pa(n);
                  return s === e || t.includes(s);
                })),
                !p.size)
              ) {
                if (!1 === h.current) return;
                u(), o && o();
              }
            };
            (c = i.createElement(
              ya,
              {
                key: Pa(s),
                isPresent: !1,
                onExitComplete: t,
                custom: n,
                presenceAffectsLayout: a,
                mode: l
              },
              s
            )),
              p.set(e, c);
          }
          m.splice(r, 0, c);
        }),
        (m = m.map((t) => {
          const e = t.key;
          return p.has(e)
            ? t
            : i.createElement(
                ya,
                { key: Pa(t), isPresent: !0, presenceAffectsLayout: a, mode: l },
                t
              );
        })),
        i.createElement(
          i.Fragment,
          null,
          p.size ? m : m.map((t) => e.cloneElement(t))
        )
      );
    }),
      (t.AnimateSharedLayout = ({ children: t }) => (
        i.useEffect(() => {
          we(!1);
        }, []),
        i.createElement(Sa, { id: Bt(() => "asl-" + ol++) }, t)
      )),
      (t.DeprecatedLayoutGroupContext = Ea),
      (t.DragControls = Xa),
      (t.FlatTree = Ki),
      (t.LayoutGroup = Sa),
      (t.LayoutGroupContext = S),
      (t.LazyMotion = function ({ children: t, features: n, strict: s = !1 }) {
        const [, o] = e.useState(!wa(n)),
          r = e.useRef(void 0);
        if (!wa(n)) {
          const { renderer: t, ...e } = n;
          (r.current = t), b(e);
        }
        return (
          e.useEffect(() => {
            wa(n) &&
              n().then(({ renderer: t, ...e }) => {
                b(e), (r.current = t), o(!0);
              });
          }, []),
          i.createElement(
            h.Provider,
            { value: { renderer: r.current, strict: s } },
            t
          )
        );
      }),
      (t.MotionConfig = function ({ children: t, isValidProp: n, ...s }) {
        n && yt(n),
          ((s = { ...e.useContext(r), ...s }).isStatic = Bt(() => s.isStatic));
        const o = e.useMemo(() => s, [
          JSON.stringify(s.transition),
          s.transformPagePoint,
          s.reducedMotion
        ]);
        return i.createElement(r.Provider, { value: o }, t);
      }),
      (t.MotionConfigContext = r),
      (t.MotionContext = a),
      (t.MotionValue = ps),
      (t.PresenceContext = l),
      (t.Reorder = ka),
      (t.SwitchLayoutGroupContext = A),
      (t.VisualElement = To),
      (t.addPointerEvent = Jt),
      (t.addPointerInfo = _t),
      (t.addScaleCorrector = k),
      (t.animate = Go),
      (t.animateValue = Nn),
      (t.animateVisualElement = Ds),
      (t.animationControls = Ha),
      (t.animations = Os),
      (t.anticipate = Ye),
      (t.backIn = He),
      (t.backInOut = $e),
      (t.backOut = ze),
      (t.buildTransform = W),
      (t.calcLength = Gs),
      (t.cancelFrame = zt),
      (t.cancelSync = br),
      (t.checkTargetForNewValues = bs),
      (t.circIn = Ue),
      (t.circInOut = Ne),
      (t.circOut = We),
      (t.clamp = Y),
      (t.color = tn),
      (t.complex = gn),
      (t.createBox = oi),
      (t.createDomMotionComponent = function (t) {
        return C(Gt(t, { forwardMotionProps: !1 }, ca, la));
      }),
      (t.createMotionComponent = C),
      (t.createScopedAnimate = Xo),
      (t.cubicBezier = Re),
      (t.delay = Ji),
      (t.distance = Is),
      (t.distance2D = Us),
      (t.domAnimation = Ba),
      (t.domMax = ja),
      (t.easeIn = ke),
      (t.easeInOut = je),
      (t.easeOut = Be),
      (t.filterProps = vt),
      (t.frame = Nt),
      (t.frameData = Ht),
      (t.inView = Pr),
      (t.interpolate = An),
      (t.invariant = we),
      (t.isBrowser = u),
      (t.isDragActive = oe),
      (t.isMotionComponent = qa),
      (t.isMotionValue = O),
      (t.isValidMotionProp = ft),
      (t.m = da),
      (t.makeUseVisualState = Ot),
      (t.mirrorEasing = Oe),
      (t.mix = en),
      (t.motion = ha),
      (t.motionValue = fs),
      (t.optimizedAppearDataAttribute = xe),
      (t.pipe = te),
      (t.progress = En),
      (t.px = st),
      (t.resolveMotionValue = Ft),
      (t.reverseEasing = Ie),
      (t.scroll = function (t, e) {
        const n = vr(e);
        return "function" == typeof t ? eo(t, n) : t.attachTimeline(n);
      }),
      (t.scrollInfo = gr),
      (t.spring = Fn),
      (t.stagger = function (
        t = 0.1,
        { startDelay: e = 0, from: n = 0, ease: s } = {}
      ) {
        return (i, o) => {
          const r =
              "number" == typeof n
                ? n
                : (function (t, e) {
                    if ("first" === t) return 0;
                    {
                      const n = e - 1;
                      return "last" === t ? n : n / 2;
                    }
                  })(n, o),
            a = Math.abs(r - i);
          let l = t * a;
          if (s) {
            const e = o * t;
            l = Ge(s)(l / e) * e;
          }
          return e + l;
        };
      }),
      (t.startOptimizedAppearAnimation = function (t, e, n, s, i) {
        const o = t.dataset.framerAppearId;
        if (!o) return;
        window.HandoffAppearAnimations = Qa;
        const r = _a(o, e),
          a = De(t, e, [n[0], n[0]], { duration: 1e4, ease: "linear" });
        Ja.set(r, { animation: a, startTime: null });
        const l = () => {
          a.cancel();
          const o = De(t, e, n, s);
          document.timeline && (o.startTime = document.timeline.currentTime),
            Ja.set(r, { animation: o, startTime: performance.now() }),
            i && i(o);
        };
        a.ready ? a.ready.then(l).catch(Ut) : l();
      }),
      (t.steps = $t),
      (t.sync = Er),
      (t.transform = wr),
      (t.unwrapMotionComponent = function (t) {
        if (qa(t)) return t[T];
      }),
      (t.useAnimate = function () {
        const t = Bt(() => ({ current: null, animations: [] })),
          e = Bt(() => Xo(t));
        return (
          xa(() => {
            t.animations.forEach((t) => t.stop());
          }),
          [t, e]
        );
      }),
      (t.useAnimation = Ya),
      (t.useAnimationControls = $a),
      (t.useAnimationFrame = Wa),
      (t.useCycle = function (...t) {
        const n = e.useRef(0),
          [s, i] = e.useState(t[n.current]);
        return [
          s,
          e.useCallback(
            (e) => {
              (n.current =
                "number" != typeof e ? Bo(0, t.length, n.current + 1) : e),
                i(t[n.current]);
            },
            [t.length, ...t]
          )
        ];
      }),
      (t.useDeprecatedAnimatedState = function (t) {
        const [n, s] = e.useState(t),
          i = nl({}, !1),
          o = Bt(
            () =>
              new el(
                { props: {}, visualState: i, presenceContext: null },
                { initialState: t }
              )
          );
        return (
          e.useEffect(() => (o.mount({}), () => o.unmount()), [o]),
          e.useEffect(() => {
            o.update(
              {
                onUpdate: (t) => {
                  s({ ...t });
                }
              },
              null
            );
          }, [s, o]),
          [n, Bt(() => (t) => Ds(o, t))]
        );
      }),
      (t.useDeprecatedInvertedScale = function (t) {
        let n = Va(1),
          s = Va(1);
        const { visualElement: i } = e.useContext(a);
        return (
          we(!(!t && !i)),
          Pe(il),
          (il = !0),
          t
            ? ((n = t.scaleX || n), (s = t.scaleY || s))
            : i && ((n = i.getValue("scaleX", 1)), (s = i.getValue("scaleY", 1))),
          { scaleX: Da(n, sl), scaleY: Da(s, sl) }
        );
      }),
      (t.useDomEvent = function (t, n, s, i) {
        e.useEffect(() => {
          const e = t.current;
          if (s && e) return qt(e, n, s, i);
        }, [t, n, s, i]);
      }),
      (t.useDragControls = function () {
        return Bt(Ga);
      }),
      (t.useElementScroll = function (t) {
        return Ua({ container: t });
      }),
      (t.useForceUpdate = pa),
      (t.useInView = function (
        t,
        { root: n, margin: s, amount: i, once: o = !1 } = {}
      ) {
        const [r, a] = e.useState(!1);
        return (
          e.useEffect(() => {
            if (!t.current || (o && r)) return;
            const e = { root: (n && n.current) || void 0, margin: s, amount: i };
            return Pr(t.current, () => (a(!0), o ? void 0 : () => a(!1)), e);
          }, [n, t, s, o]),
          r
        );
      }),
      (t.useInstantLayoutTransition = Za),
      (t.useInstantTransition = function () {
        const [t, n] = pa(),
          s = Za(),
          i = e.useRef();
        return (
          e.useEffect(() => {
            Nt.postRender(() =>
              Nt.postRender(() => {
                n === i.current && (Se.current = !1);
              })
            );
          }, [n]),
          (e) => {
            s(() => {
              (Se.current = !0), t(), e(), (i.current = n + 1);
            });
          }
        );
      }),
      (t.useIsPresent = function () {
        return null === (t = e.useContext(l)) || t.isPresent;
        var t;
      }),
      (t.useIsomorphicLayoutEffect = c),
      (t.useMotionTemplate = function (t, ...e) {
        const n = t.length;
        return Ma(e.filter(O), function () {
          let s = "";
          for (let i = 0; i < n; i++) {
            s += t[i];
            const n = e[i];
            n && (s += O(n) ? n.get() : n);
          }
          return s;
        });
      }),
      (t.useMotionValue = Va),
      (t.useMotionValueEvent = Fa),
      (t.usePresence = sa),
      (t.useReducedMotion = za),
      (t.useReducedMotionConfig = function () {
        const t = za(),
          { reducedMotion: n } = e.useContext(r);
        return "never" !== n && ("always" === n || t);
      }),
      (t.useResetProjection = function () {
        return i.useCallback(() => {
          const t = Kr.current;
          t && t.resetTree();
        }, []);
      }),
      (t.useScroll = Ua),
      (t.useSpring = function (t, n = {}) {
        const { isStatic: s } = e.useContext(r),
          i = e.useRef(null),
          o = Va(O(t) ? t.get() : t),
          a = () => {
            i.current && i.current.stop();
          };
        return (
          e.useInsertionEffect(
            () =>
              o.attach((t, e) => {
                if (s) return e(t);
                if (
                  (a(),
                  (i.current = Nn({
                    keyframes: [o.get(), t],
                    velocity: o.getVelocity(),
                    type: "spring",
                    restDelta: 0.001,
                    restSpeed: 0.01,
                    ...n,
                    onUpdate: e
                  })),
                  !Ht.isProcessing)
                ) {
                  const t = performance.now() - Ht.timestamp;
                  t < 30 && (i.current.time = be(t));
                }
                return o.get();
              }, a),
            [JSON.stringify(n)]
          ),
          c(() => {
            if (O(t)) return t.on("change", (t) => o.set(parseFloat(t)));
          }, [o]),
          o
        );
      }),
      (t.useTime = function () {
        const t = Va(0);
        return Wa((e) => t.set(e)), t;
      }),
      (t.useTransform = Da),
      (t.useUnmountEffect = xa),
      (t.useVelocity = function (t) {
        const e = Va(t.getVelocity());
        return (
          Fa(t, "velocityChange", (t) => {
            e.set(t);
          }),
          e
        );
      }),
      (t.useViewportScroll = function () {
        return Ua();
      }),
      (t.useWillChange = function () {
        return Bt(() => new Na("auto"));
      }),
      (t.visualElementStore = to),
      (t.warning = Pe),
      (t.wrap = Bo),
      Object.defineProperty(t, "__esModule", { value: !0 });
  });
  