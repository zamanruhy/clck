import { c as createSignal, a as createEffect, b as createComponent, D as Dynamic, m as mergeProps, S as Show, d as createContext, u as useContext, e as delegateEvents, s as splitProps, f as createMemo, o as onMount, g as onCleanup, h as spread, i as insert, j as createRenderEffect, k as classList, t as template, l as setAttribute, n as style, F as For, p as memo, r as render, I as IMask } from "./vendor.js";
const main = "";
const About = "";
const Ava = "";
const TransitionRootContext = createContext();
function useTransitionRootContext(componentName) {
  const context = useContext(TransitionRootContext);
  if (context) {
    return context;
  }
  throw new Error(`<${componentName}> must be used inside a <Transition>`);
}
function addClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.add(...filtered);
  }
}
function removeClassList(ref, classes) {
  const filtered = classes.filter((value) => value);
  if (filtered.length) {
    ref.classList.remove(...filtered);
  }
}
function TransitionChild(props) {
  const values = useTransitionRootContext("TransitionChild");
  const [visible, setVisible] = createSignal(values.show);
  const [ref, setRef] = createSignal();
  let initial = true;
  function transition(element, shouldEnter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    if (shouldEnter) {
      if (initial) {
        const enter = (_b = (_a = props.enter) == null ? void 0 : _a.split(" ")) != null ? _b : [];
        const enterFrom = (_d = (_c = props.enterFrom) == null ? void 0 : _c.split(" ")) != null ? _d : [];
        const enterTo = (_f = (_e = props.enterTo) == null ? void 0 : _e.split(" ")) != null ? _f : [];
        const entered = (_h = (_g = props.entered) == null ? void 0 : _g.split(" ")) != null ? _h : [];
        const endTransition = () => {
          var _a2;
          removeClassList(element, enter);
          removeClassList(element, enterTo);
          addClassList(element, entered);
          (_a2 = props.afterEnter) == null ? void 0 : _a2.call(props);
        };
        (_i = props.beforeEnter) == null ? void 0 : _i.call(props);
        addClassList(element, enter);
        addClassList(element, enterFrom);
        requestAnimationFrame(() => {
          removeClassList(element, enterFrom);
          addClassList(element, enterTo);
          element.addEventListener("transitionend", endTransition, {
            once: true
          });
          element.addEventListener("animationend", endTransition, {
            once: true
          });
        });
      }
    } else {
      const leave = (_k = (_j = props.leave) == null ? void 0 : _j.split(" ")) != null ? _k : [];
      const leaveFrom = (_m = (_l = props.leaveFrom) == null ? void 0 : _l.split(" ")) != null ? _m : [];
      const leaveTo = (_o = (_n = props.leaveTo) == null ? void 0 : _n.split(" ")) != null ? _o : [];
      const entered = (_q = (_p = props.entered) == null ? void 0 : _p.split(" ")) != null ? _q : [];
      (_r = props.beforeLeave) == null ? void 0 : _r.call(props);
      removeClassList(element, entered);
      addClassList(element, leave);
      addClassList(element, leaveFrom);
      requestAnimationFrame(() => {
        removeClassList(element, leaveFrom);
        addClassList(element, leaveTo);
      });
      const endTransition = () => {
        var _a2;
        removeClassList(element, leave);
        removeClassList(element, leaveTo);
        setVisible(false);
        (_a2 = props.afterLeave) == null ? void 0 : _a2.call(props);
      };
      element.addEventListener("transitionend", endTransition, {
        once: true
      });
      element.addEventListener("animationend", endTransition, {
        once: true
      });
    }
  }
  createEffect(() => {
    const shouldShow = values.show;
    if (shouldShow) {
      setVisible(true);
    }
    const internalRef = ref();
    if (internalRef instanceof HTMLElement) {
      transition(internalRef, shouldShow);
    } else {
      initial = true;
    }
  });
  return createComponent(Show, {
    get when() {
      var _a;
      return (_a = props.unmount) != null ? _a : true;
    },
    get fallback() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          var _a;
          return (_a = props.as) != null ? _a : "div";
        }
      }, () => omitProps(props, ["as", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo", "unmount", "afterEnter", "afterLeave", "appear", "beforeEnter", "beforeLeave", "entered", "ref"]), {
        ref(r$) {
          const _ref$2 = createRef(props, (e) => {
            setRef(() => e);
          });
          typeof _ref$2 === "function" && _ref$2(r$);
        },
        get children() {
          return props.children;
        }
      }));
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return visible();
        },
        get children() {
          return createComponent(Dynamic, mergeProps({
            get component() {
              var _a;
              return (_a = props.as) != null ? _a : "div";
            }
          }, () => omitProps(props, ["as", "enter", "enterFrom", "enterTo", "leave", "leaveFrom", "leaveTo", "unmount", "afterEnter", "afterLeave", "appear", "beforeEnter", "beforeLeave", "entered", "ref"]), {
            ref(r$) {
              const _ref$ = createRef(props, (e) => {
                setRef(() => e);
              });
              typeof _ref$ === "function" && _ref$(r$);
            },
            get children() {
              return props.children;
            }
          }));
        }
      });
    }
  });
}
function Transition(props) {
  const excludedProps = omitProps(props, ["show"]);
  return createComponent(TransitionRootContext.Provider, {
    value: {
      get show() {
        return props.show;
      }
    },
    get children() {
      return createComponent(TransitionChild, excludedProps);
    }
  });
}
function isRefFunction(callback) {
  return typeof callback === "function";
}
function createRef(props, callback) {
  return (e) => {
    if ("ref" in props && isRefFunction(props.ref)) {
      props.ref(e);
    }
    callback(e);
  };
}
function omitProps(value, keys) {
  const newObject = {};
  const currentKeys = Object.keys(value);
  for (let i = 0, len = currentKeys.length; i < len; i += 1) {
    const key = currentKeys[i];
    if (!keys.includes(key)) {
      Object.defineProperty(newObject, key, {
        get() {
          return value[key];
        },
        configurable: true,
        enumerable: true
      });
    }
  }
  return newObject;
}
const modals = /* @__PURE__ */ new Set();
let offsetElements = null;
let scrollbarWidth = null;
function useModal() {
  return { registerModal, unregisterModal, trapFocus };
}
function registerModal(modal) {
  if (modals.has(modal)) {
    return;
  }
  modals.add(modal);
  if (modals.size === 1) {
    setScrollbar();
    document.body.style.overflow = "hidden";
  }
}
function unregisterModal(modal) {
  if (!modals.has(modal)) {
    return;
  }
  modals.delete(modal);
  if (modals.size === 0) {
    resetScrollbar();
    document.body.style.overflow = "";
  }
}
function checkBodyOverflow() {
  return window.innerWidth > document.documentElement.clientWidth;
}
function setScrollbar() {
  if (!checkBodyOverflow()) {
    return;
  }
  offsetElements = [
    document.body,
    ...Array.from(document.querySelectorAll("[data-fixed]"))
  ];
  offsetElements.forEach((el) => {
    const offset = el.getAttribute("data-fixed") || "padding";
    const actual = el.style[`${offset}Right`];
    const computed = getComputedStyle(el)[`${offset}Right`];
    el.setAttribute(`data-${offset}-right`, actual);
    el.style[`${offset}Right`] = `${parseFloat(computed) + getScrollbarWidth()}px`;
  });
}
function resetScrollbar() {
  if (offsetElements === null)
    return;
  offsetElements.forEach((el) => {
    const offset = el.getAttribute("data-fixed") || "padding";
    el.style[`${offset}Right`] = el.getAttribute(`data-${offset}-right`);
    el.removeAttribute(`data-${offset}-right`);
  });
  offsetElements = null;
}
function getScrollbarWidth() {
  if (scrollbarWidth === null) {
    const div = document.createElement("div");
    div.style.cssText = `
      width: 100px;
      height: 100px;
      position: absolute;
      overflow: scroll;
      top: -9999px`;
    document.body.appendChild(div);
    scrollbarWidth = div.getBoundingClientRect().width - div.clientWidth;
    document.body.removeChild(div);
  }
  return scrollbarWidth;
}
function getFocusable(node) {
  const selector = [
    "a[href]",
    "area[href]",
    'input:not([type="hidden"]):not([type="radio"]):not([disabled])',
    'input[type="radio"]:not([disabled]):checked',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "audio[controls]",
    "video[controls]",
    "[contenteditable]",
    "[tabindex]"
  ].map((s) => `${s}:not([tabindex^="-"])`).join(", ");
  return Array.from(node.querySelectorAll(selector)).filter(
    (el) => el.offsetWidth || el.offsetHeight || el.getClientRects().length
  );
}
function trapFocus(e) {
  if (e.key !== "Tab")
    return;
  const focusable = getFocusable(e.currentTarget);
  if (focusable.length === 0) {
    e.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || active === e.currentTarget) {
      last.focus();
      e.preventDefault();
    }
  } else {
    if (active === last) {
      first.focus();
      e.preventDefault();
    }
  }
}
const Dialog$1 = "";
const _tmpl$$7 = /* @__PURE__ */ template(`<div class="dialog__content"></div>`), _tmpl$2$2 = /* @__PURE__ */ template(`<div class="dialog" role="dialog" aria-modal="true" tabindex="-1"></div>`);
function Dialog(props) {
  props = mergeProps({
    open: false,
    closeOnBackdrop: true,
    closeOnEscape: true
  }, props);
  const [, rest] = splitProps(props, ["class", "classList", "open", "closeOnBackdrop", "closeOnEscape", "children", "variant", "onOpen", "onOpened", "onClose", "onClosed", "onRequestClose"]);
  const [mounted, setMounted] = createSignal(false);
  const open = createMemo(() => props.open && mounted());
  const {
    registerModal: registerModal2,
    unregisterModal: unregisterModal2,
    trapFocus: trapFocus2
  } = useModal();
  let el;
  let contentEl;
  let returnFocusEl = null;
  const dialog = {};
  async function onBeforeEnter() {
    var _a;
    (_a = props.onOpen) == null ? void 0 : _a.call(props);
    queueMicrotask(() => {
      returnFocusEl = returnFocusEl || document.activeElement;
      registerModal2(dialog);
    });
  }
  function onAfterEnter() {
    var _a;
    (_a = props.onOpened) == null ? void 0 : _a.call(props);
    setFocus();
  }
  function onBeforeLeave() {
    var _a;
    (_a = props.onClose) == null ? void 0 : _a.call(props);
  }
  async function onAfterLeave() {
    var _a, _b;
    (_a = props.onClosed) == null ? void 0 : _a.call(props);
    (_b = returnFocusEl.focus) == null ? void 0 : _b.call(returnFocusEl, {
      preventScroll: true
    });
    returnFocusEl = null;
    unregisterModal2(dialog);
  }
  function onClickOut(e) {
    var _a;
    if (props.closeOnBackdrop && !contentEl.contains(e.target)) {
      (_a = props.onRequestClose) == null ? void 0 : _a.call(props);
    }
  }
  function onEscape(e) {
    var _a;
    if (props.closeOnEscape && e.key === "Escape") {
      (_a = props.onRequestClose) == null ? void 0 : _a.call(props);
    }
  }
  function setFocus() {
    if (!el.contains(document.activeElement)) {
      el.focus();
    }
  }
  onMount(() => {
    setMounted(true);
    onCleanup(() => {
      unregisterModal2(dialog);
    });
  });
  return createComponent(Transition, {
    get show() {
      return open();
    },
    as: "span",
    get children() {
      return [createComponent(TransitionChild, {
        "class": "dialog-backdrop",
        get classList() {
          return {
            [`dialog-backdrop_${props.variant}`]: Boolean(props.variant)
          };
        },
        enter: "dialog-backdrop_enter",
        enterFrom: "dialog-backdrop_out",
        enterTo: "dialog-backdrop_in",
        leave: "dialog-backdrop_leave",
        leaveFrom: "dialog-backdrop_in",
        leaveTo: "dialog-backdrop_out"
      }), (() => {
        const _el$ = _tmpl$2$2.cloneNode(true);
        _el$.$$keydown = (e) => {
          onEscape(e);
          trapFocus2(e);
        };
        _el$.$$click = onClickOut;
        const _ref$ = el;
        typeof _ref$ === "function" ? _ref$(_el$) : el = _el$;
        spread(_el$, rest, false, true);
        insert(_el$, createComponent(TransitionChild, {
          "class": "dialog__wrapper",
          enter: "dialog__wrapper_enter",
          enterFrom: "dialog__wrapper_out",
          enterTo: "dialog__wrapper_in",
          leave: "dialog__wrapper_leave",
          leaveFrom: "dialog__wrapper_in",
          leaveTo: "dialog__wrapper_out",
          beforeEnter: onBeforeEnter,
          afterEnter: onAfterEnter,
          beforeLeave: onBeforeLeave,
          afterLeave: onAfterLeave,
          get children() {
            const _el$2 = _tmpl$$7.cloneNode(true);
            const _ref$2 = contentEl;
            typeof _ref$2 === "function" ? _ref$2(_el$2) : contentEl = _el$2;
            insert(_el$2, () => props.children);
            return _el$2;
          }
        }));
        createRenderEffect((_$p) => classList(_el$, {
          [`dialog_${props.variant}`]: Boolean(props.variant),
          [props.class]: Boolean(props.class),
          ...props.classList
        }, _$p));
        return _el$;
      })()];
    }
  });
}
delegateEvents(["click", "keydown"]);
const Stories$1 = "";
const _tmpl$$6 = /* @__PURE__ */ template(`<svg viewBox="0 0 22 22" fill="currentColor"><path d="m17.42 5.88-1.3-1.3L11 9.71 5.88 4.58l-1.3 1.3L9.71 11l-5.13 5.12 1.3 1.3L11 12.29l5.12 5.13 1.3-1.3L12.29 11l5.13-5.12Z"></path></svg>`);
const CloseIcon = (props = {}) => (() => {
  const _el$ = _tmpl$$6.cloneNode(true);
  spread(_el$, props, true, true);
  return _el$;
})();
function useProgress(animate, duration) {
  const [progress, setProgress] = createSignal(0);
  const getAnimate = () => typeof animate === "function" ? animate() : animate;
  const getDuration = () => typeof duration === "function" ? duration() : duration;
  let prevElapsed = 0;
  createEffect(() => {
    if (getAnimate()) {
      let step = function(timestamp) {
        if (!start)
          start = timestamp;
        elapsed = timestamp - start;
        setProgress(Math.min((elapsed + prevElapsed) / dur, 1));
        if (elapsed + prevElapsed < dur) {
          rafId = requestAnimationFrame(step);
        }
      };
      const dur = getDuration();
      let rafId = null;
      let start = null;
      let elapsed = 0;
      rafId = requestAnimationFrame(step);
      onCleanup(() => {
        cancelAnimationFrame(rafId);
        prevElapsed += elapsed;
      });
    }
  });
  return progress;
}
const _tmpl$$5 = /* @__PURE__ */ template(`<img alt="#">`);
function Image(props) {
  const [loaded, setLoaded] = createSignal(false);
  const animate = createMemo(() => props.playing && loaded());
  const progress = useProgress(animate, 5e3);
  createEffect(() => {
    var _a;
    return (_a = props.onProgress) == null ? void 0 : _a.call(props, progress());
  });
  return (() => {
    const _el$ = _tmpl$$5.cloneNode(true);
    _el$.addEventListener("load", () => {
      var _a;
      (_a = props.onLoad) == null ? void 0 : _a.call(props);
      setLoaded(true);
    });
    createRenderEffect(() => setAttribute(_el$, "src", props.src));
    return _el$;
  })();
}
const _tmpl$$4 = /* @__PURE__ */ template(`<video muted playsinline disablepictureinpicture></video>`);
function Video(props) {
  let el;
  const [loaded, setLoaded] = createSignal(false);
  const [progress, setProgress] = createSignal(0);
  createEffect(() => {
    var _a;
    return (_a = props.onProgress) == null ? void 0 : _a.call(props, progress());
  });
  createEffect(() => props.playing && loaded() ? el.play() : el.pause());
  return (() => {
    const _el$ = _tmpl$$4.cloneNode(true);
    const _ref$ = el;
    typeof _ref$ === "function" ? _ref$(_el$) : el = _el$;
    _el$.addEventListener("canplaythrough", (e) => {
      var _a;
      (_a = props.onLoad) == null ? void 0 : _a.call(props);
      setLoaded(true);
    });
    _el$.addEventListener("timeupdate", (e) => {
      if (el.duration) {
        setProgress(el.currentTime / el.duration);
      }
    });
    createRenderEffect(() => setAttribute(_el$, "src", props.src));
    return _el$;
  })();
}
const Spinner$1 = "";
const _tmpl$$3 = /* @__PURE__ */ template(`<div class="spinner" role="progressbar"><svg class="spinner__svg" fill="transparent"><circle class="spinner__circle" cx="50%" cy="50%" stroke="currentColor"></circle><circle class="spinner__circle " cx="50%" cy="50%" stroke="currentColor" pathLength="1" stroke-dasharray="0.4 0.6"></circle></svg></div>`);
function Spinner(props) {
  props = mergeProps({
    size: 40,
    thickness: 4
  }, props);
  const [, rest] = splitProps(props, ["size", "thickness", "class", "classList", "style"]);
  return (() => {
    const _el$ = _tmpl$$3.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
    spread(_el$, rest, false, true);
    createRenderEffect((_p$) => {
      const _v$ = {
        [props.class]: Boolean(props.class),
        ...props.classList
      }, _v$2 = {
        ...props.style,
        width: `${props.size}px`,
        height: `${props.size}px`
      }, _v$3 = `${(props.size - props.thickness) / 2}px`, _v$4 = `${props.thickness}px`, _v$5 = `${(props.size - props.thickness) / 2}px`, _v$6 = `${props.thickness}px`;
      _p$._v$ = classList(_el$, _v$, _p$._v$);
      _p$._v$2 = style(_el$, _v$2, _p$._v$2);
      _v$3 !== _p$._v$3 && setAttribute(_el$3, "r", _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$3, "stroke-width", _p$._v$4 = _v$4);
      _v$5 !== _p$._v$5 && setAttribute(_el$4, "r", _p$._v$5 = _v$5);
      _v$6 !== _p$._v$6 && setAttribute(_el$4, "stroke-width", _p$._v$6 = _v$6);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0,
      _v$6: void 0
    });
    return _el$;
  })();
}
const _tmpl$$2 = /* @__PURE__ */ template(`<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.5 16.67 18.07 10 2.5 3.33v5.19L13.61 10 2.5 11.48v5.19Z"></path></svg>`);
const SendIcon = (props = {}) => (() => {
  const _el$ = _tmpl$$2.cloneNode(true);
  spread(_el$, props, true, true);
  return _el$;
})();
const Story$1 = "";
const _tmpl$$1 = /* @__PURE__ */ template(`<button type="button" class="story__button">\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 </button>`), _tmpl$2$1 = /* @__PURE__ */ template(`<div class="story"></div>`);
function Story(props) {
  const [loaded, setLoaded] = createSignal(false);
  return (() => {
    const _el$ = _tmpl$2$1.cloneNode(true);
    insert(_el$, createComponent(Dynamic, mergeProps({
      get component() {
        return props.type === "image" ? Image : Video;
      }
    }, props, {
      onLoad: () => setLoaded(true)
    })), null);
    insert(_el$, createComponent(Show, {
      get when() {
        return loaded();
      },
      get fallback() {
        return createComponent(Spinner, {
          "class": "story__spinner",
          size: 40,
          thickness: 2
        });
      },
      get children() {
        const _el$2 = _tmpl$$1.cloneNode(true);
        _el$2.firstChild;
        insert(_el$2, createComponent(SendIcon, {}), null);
        return _el$2;
      }
    }), null);
    return _el$;
  })();
}
function useSwipe(options = {}) {
  const [ref, setRef] = createSignal(null);
  createEffect(() => {
    if (!ref())
      return;
    var el = ref(), startX, startY, startTime, threshold = 50, allowedTime = 250;
    function onPointerDown(e) {
      if (e.pointerType !== "touch")
        return;
      el.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (e.pointerType !== "touch")
        return;
      e.preventDefault();
    }
    function onPointerUp(e) {
      var _a, _b, _c, _d, _e;
      if (e.pointerType !== "touch")
        return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const elapsedTime = Date.now() - startTime;
      let dir = "none";
      if (elapsedTime <= allowedTime) {
        if (Math.abs(deltaX) >= threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
          dir = deltaX < 0 ? "left" : "right";
        } else if (Math.abs(deltaY) >= threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
          dir = deltaY < 0 ? "up" : "down";
        }
      }
      if (dir === "left")
        (_a = options.onSwipedLeft) == null ? void 0 : _a.call(options);
      else if (dir === "right")
        (_b = options.onSwipedRight) == null ? void 0 : _b.call(options);
      else if (dir === "up")
        (_c = options.onSwipedUp) == null ? void 0 : _c.call(options);
      else if (dir === "down")
        (_d = options.onSwipedDown) == null ? void 0 : _d.call(options);
      if (dir !== "none")
        (_e = options.onSwiped) == null ? void 0 : _e.call(options, { dir });
      e.preventDefault();
    }
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    onCleanup(() => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    });
  });
  return setRef;
}
const _tmpl$ = /* @__PURE__ */ template(`<div class="stories"><div class="stories__header"><div class="stories__bars"></div><div class="stories__row"><div class="stories__user"><img alt="" class="stories__ava"><h3 class="stories__username"></h3><time class="stories__time"></time></div><button type="button" class="stories__close" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u043E\u0440\u0438\u0441"></button></div></div><div class="stories__overlay"></div></div>`), _tmpl$2 = /* @__PURE__ */ template(`<div class="stories__bar"></div>`);
function Stories(props) {
  const [, rest] = splitProps(props, ["ava", "username", "time", "stories", "onOpen", "onOpened", "onClose", "onClosed"]);
  const [index, setIndex] = createSignal(0);
  const [playing, setPlaying] = createSignal(true);
  const [progress, setProgress] = createSignal(0);
  const [opened, setOpened] = createSignal(false);
  let timer = null;
  const setRef = useSwipe({
    onSwiped({
      dir
    }) {
    },
    onSwipedRight: prev,
    onSwipedLeft: next,
    onSwipedDown() {
      var _a;
      (_a = props.onRequestClose) == null ? void 0 : _a.call(props);
    }
  });
  function next() {
    setIndex((index() + 1) % props.stories.length);
  }
  function prev() {
    setIndex((index() - 1 + props.stories.length) % props.stories.length);
  }
  function onStoryProgress(value) {
    setProgress(value);
    if (value === 1) {
      setTimeout(next, 50);
    }
  }
  function onPointerDown(e) {
    if (e.pointerType === "touch" || e.button !== 0)
      return;
    e.target.setPointerCapture(e.pointerId);
    if (playing()) {
      timer = setTimeout(() => {
        setPlaying(false);
        timer = null;
      }, 150);
    }
    e.preventDefault();
  }
  function onPointerUp(e) {
    if (e.pointerType === "touch" || e.button !== 0)
      return;
    if (timer) {
      clearTimeout(timer);
      timer = null;
      onClick(e);
    }
    setPlaying(true);
    e.preventDefault();
  }
  function onClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) {
      prev();
    } else {
      next();
    }
  }
  function onTouchClick(e) {
    if (e.pointerType !== "touch")
      return;
    onClick(e);
  }
  return createComponent(Dialog, mergeProps(rest, {
    variant: "stories",
    closeOnBackdrop: false,
    onOpen: () => {
      var _a;
      (_a = props.onOpen) == null ? void 0 : _a.call(props);
    },
    onOpened: () => {
      var _a;
      setOpened(true);
      (_a = props.onOpened) == null ? void 0 : _a.call(props);
    },
    onClose: () => {
      var _a;
      setPlaying(false);
      (_a = props.onClose) == null ? void 0 : _a.call(props);
    },
    onClosed: () => {
      var _a;
      setIndex(0);
      setOpened(false);
      setProgress(0);
      setPlaying(true);
      (_a = props.onClosed) == null ? void 0 : _a.call(props);
    },
    get children() {
      const _el$ = _tmpl$.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.nextSibling, _el$8 = _el$7.nextSibling, _el$9 = _el$5.nextSibling, _el$10 = _el$2.nextSibling;
      insert(_el$3, createComponent(For, {
        get each() {
          return props.stories;
        },
        children: (_, i) => (() => {
          const _el$11 = _tmpl$2.cloneNode(true);
          createRenderEffect(() => _el$11.style.setProperty("--progress", i() < index() ? 1 : i() === index() ? progress() : 0));
          return _el$11;
        })()
      }));
      insert(_el$7, () => props.username);
      insert(_el$8, () => props.time);
      _el$9.$$click = () => {
        var _a;
        return (_a = props.onRequestClose) == null ? void 0 : _a.call(props);
      };
      insert(_el$9, createComponent(CloseIcon, {
        "aria-hidden": "true"
      }));
      setRef(_el$10);
      _el$10.$$click = onTouchClick;
      _el$10.$$pointerup = onPointerUp;
      _el$10.$$pointerdown = onPointerDown;
      insert(_el$, createComponent(Show, {
        get when() {
          return memo(() => !!opened(), true)() && props.stories[index()];
        },
        keyed: true,
        children: (story) => createComponent(Story, mergeProps(story, {
          get playing() {
            return playing();
          },
          onProgress: onStoryProgress
        }))
      }), null);
      createRenderEffect(() => setAttribute(_el$6, "src", props.ava));
      return _el$;
    }
  }));
}
delegateEvents(["click", "pointerdown", "pointerup"]);
async function script$1() {
  var _a;
  const el = document.querySelector(".ava");
  if (!el)
    return;
  const stories = ((_a = window.data) == null ? void 0 : _a.stories) || [];
  if (!stories.length) {
    el.classList.add("ava_empty");
  }
  const videoEl = el.querySelector("video.ava__media");
  const firstVideo = stories.find((v) => v.type === "video");
  if (videoEl && firstVideo) {
    videoEl.src = firstVideo.src;
    videoEl.addEventListener("canplaythrough", () => {
      el.classList.add("ava_loaded");
    });
  }
  const [open, setOpen] = createSignal(false);
  const storiesEl = el.querySelector(".ava__stories");
  const pictureEl = el.querySelector(".ava__picture");
  pictureEl.addEventListener("click", (e) => {
    setOpen(true);
    e.preventDefault();
  });
  {
    render(() => createComponent(Stories, mergeProps(() => {
      var _a2;
      return (_a2 = window.data) == null ? void 0 : _a2.meta;
    }, {
      stories,
      get open() {
        return open();
      },
      onRequestClose: () => setOpen(false),
      onOpen: () => videoEl == null ? void 0 : videoEl.pause(),
      onClose: () => videoEl == null ? void 0 : videoEl.play()
    })), storiesEl);
  }
}
{
  script$1();
}
const Request = "";
function script() {
  const el = document.querySelector(".request");
  if (!el)
    return;
  el.querySelector(".request__form");
  const inputEl = el.querySelector(".request__input");
  if (inputEl.type === "tel") {
    IMask(inputEl, {
      mask: "+{7} 000 000 00-00"
    });
  }
}
{
  script();
}
const Social = "";
