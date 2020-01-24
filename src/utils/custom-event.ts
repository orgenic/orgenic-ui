function preventDefault() {
  // needed for IE compatibility
  Object.defineProperty(this, "defaultPrevented", {
    get: () => true
  });
}

// eslint-disable-next-line @typescript-eslint/promise-function-async
export default function ogCustomEvent(el: Element, eventName: string, payload = {}, relatedTarget = {}) {
  const myPayload = Object.assign({}, { sentAtTime: new Date().getTime() }, payload);
  let event;

  if (typeof (window as any).CustomEvent === "function") {
    event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: myPayload
    });
  } else {
    const bubbles = true;
    const cancelable = true;
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, bubbles, cancelable, {
      detail: myPayload
    });
  }

  Object.defineProperties(event, {
    preventDefault: {
      value: preventDefault,
      writable: true
    }
  });

  if (relatedTarget instanceof Element) {
    Object.defineProperties(event, {
      relatedTarget: {
        value: relatedTarget,
        writable: true
      }
    });
  }

  el.dispatchEvent(event);
  return event;
}
