const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const clearScreen = async function() {
  window.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 27 }));
  await deferredClick(() =>
    document.body
  );
  removeSyntheticOverlays();
};

const deferredClick = async function(getEl) {
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(requestAnimationFrame);

  const el = typeof getEl === 'function'
    ? getEl()
    : getEl;

  if (el) {
    el.click();
  } else {
    console.log('deferredClick element not found');
  }
};

const waitForEl = (selector, {
  interval = 500,
  timeout = Infinity
} = {}) =>
  new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = () => {
      const el = document.querySelector(selector);
      if (el) {
        return resolve(el);
      }

      if (Date.now() - start >= timeout) {
        return reject(new Error(`waitForEl timeout: ${selector}`));
      }

      setTimeout(tick, interval);
    };

    tick();
  });

async function typewriter(text, {
  minDelay = 40,
  maxDelay = 150
} = {}) {
  const sel = window.getSelection();
  if (!sel.rangeCount) {
    return;
  }

  // eslint-disable-next-line no-unused-vars
  const range = sel.getRangeAt(0);

  // delete current selection
  document.execCommand('delete');

  for (const char of text) {
    // insert character at cursor
    document.execCommand('insertText', false, char);

    // random stutter
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

function selectEditable(containerSelector, childSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return null;
  }

  const editable = container.querySelector(`[contenteditable="true"] ${childSelector}`);
  if (!editable) {
    return null;
  }

  const range = document.createRange();
  range.selectNodeContents(editable);

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  return range;
}

function scrollToTargetAdjusted(selector, index, offset = 45) {
  let element;
  if (index) {
    element = document.querySelectorAll(selector)[index];
  } else {
    element = document.querySelector(selector);
  }
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function createSyntheticOverlay(targetEl, opts = {}) {
  const houseClass = 'tour-synthetic-overlay';
  const {
    className = null,
    styles = {}
  } = opts;

  const rects = [ targetEl, ...targetEl.querySelectorAll('*') ]
    .map(el => el.getBoundingClientRect())
    .filter(r => r.width || r.height);

  const bounds = rects.reduce(
    (acc, r) => ({
      top: Math.min(acc.top, r.top),
      left: Math.min(acc.left, r.left),
      right: Math.max(acc.right, r.right),
      bottom: Math.max(acc.bottom, r.bottom)
    }),
    {
      top: Infinity,
      left: Infinity,
      right: -Infinity,
      bottom: -Infinity
    }
  );

  const overlay = document.createElement('div');
  overlay.className = `${houseClass} ${className || null}`;

  Object.assign(overlay.style, {
    position: 'fixed',
    top: `${bounds.top}px`,
    left: `${bounds.left}px`,
    width: `${bounds.right - bounds.left}px`,
    height: `${bounds.bottom - bounds.top}px`,
    pointerEvents: 'none',
    boxSizing: 'border-box',
    zIndex: '999999',
    ...styles
  });

  document.body.appendChild(overlay);
  return overlay;
}
function removeSyntheticOverlays() {
  document.querySelectorAll('.tour-synthetic-overlay').forEach(element => element.remove());
}

function deferredNextButtonFocus() {
  setTimeout(() => {
    document.querySelector('.introjs-nextbutton')?.focus();
  }, 200);
}

export {
  wait,
  waitForEl,
  typewriter,
  selectEditable,
  scrollToTargetAdjusted,
  deferredClick,
  clearScreen,
  createSyntheticOverlay,
  removeSyntheticOverlays,
  deferredNextButtonFocus
};
