export default function split($node, apply = false, className = 'split-char') {
  const text = $node.innerHTML;
  let output = '';
  let tagOpened = false;

  for (let i = 0, l = text.length, char; i < l; i++) {
    char = text[i];
    if (char === ' ' || char === '<' || char === '>' || tagOpened) {
      output += char;
      if (char === '<') {
        tagOpened = true;
      } else if (char === '>') {
        tagOpened = false;
      }
    } else {
      output += `<span class="${className}">${char}</span>`;
    }
  }

  if (apply) {
    $node.innerHTML = output;
  }

  return output;
}
