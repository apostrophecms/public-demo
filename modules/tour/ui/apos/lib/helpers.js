const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

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

export {
  wait,
  typewriter,
  selectEditable,
  scrollToTargetAdjusted
};
