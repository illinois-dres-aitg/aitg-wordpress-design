// menuSVGNodes.js

/*
*   createSVGNodeMenuToggle: Return an SVG image of a chevron pointing downward
*   that can be rotated 180 degrees to a chevron pointing upward. Its intended
*   use is as a menu button icon that indicates what the resulting action will
*   be when the button is activated: it will open the submenu when pointing
*   downward, or close the submenu when pointing upward.
*/
export function createSVGNodeMenuToggle () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'width', '11px');
  svg1.setAttributeNS(null, 'height', '11px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 133 79');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('menu open/close icon');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let g2 = document.createElementNS(xmlns, 'g');
  g2.setAttributeNS(null, 'transform', 'translate(-50.000000, -122.000000)');
  g2.setAttributeNS(null, 'fill', 'currentColor');
  g1.appendChild(g2);

  let g3 = document.createElementNS(xmlns, 'g');
  g3.setAttributeNS(null, 'transform', 'translate(45.000000, 64.000000)');
  g2.appendChild(g3);

  let path1 = document.createElementNS(xmlns, 'path');
  path1.setAttributeNS(null, 'd', 'M33.5,21 C40.4035594,21 46,26.5964406 46,33.5 L46,96.5 L109,96.5 C115.903559,96.5 121.5,102.096441 121.5,109 C121.5,115.903559 115.903559,121.5 109,121.5 L34,121.5 C30.4210403,121.5 27.1933842,119.995891 24.9146718,117.585313 C22.5041093,115.306616 21,112.07896 21,108.5 L21,33.5 C21,26.5964406 26.5964406,21 33.5,21 Z');
  path1.setAttributeNS(null, 'transform', 'translate(71.250000, 71.250000) rotate(-45.000000) translate(-71.250000, -71.250000) ');
  g3.appendChild(path1);

  return svg1;
}

/*
*   createSVGNodeMenuLink: Return an SVG image of a chevron pointing rightward.
*   Its intended use is as a menu button icon that indicates what the
*   resulting action will be when the button is activated: it serves as a
*   direct link to another page within the website.
*/
export function createSVGNodeMenuLink () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'width', '6px');
  svg1.setAttributeNS(null, 'height', '11px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 79 133');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('menu link icon');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let g2 = document.createElementNS(xmlns, 'g');
  g2.setAttributeNS(null, 'transform', 'translate(-293.000000, -69.000000)');
  g2.setAttributeNS(null, 'fill', 'currentColor');
  g1.appendChild(g2);

  let g3 = document.createElementNS(xmlns, 'g');
  g3.setAttributeNS(null, 'transform', 'translate(235.000000, 64.000000)');
  g2.appendChild(g3);

  let path1 = document.createElementNS(xmlns, 'path');
  path1.setAttributeNS(null, 'd', 'M33.5,21 C40.4035594,21 46,26.5964406 46,33.5 L46,96.5 L109,96.5 C115.903559,96.5 121.5,102.096441 121.5,109 C121.5,115.903559 115.903559,121.5 109,121.5 L34,121.5 C30.4210403,121.5 27.1933842,119.995891 24.9146718,117.585313 C22.5041093,115.306616 21,112.07896 21,108.5 L21,33.5 C21,26.5964406 26.5964406,21 33.5,21 Z');
  path1.setAttributeNS(null, 'transform', 'translate(71.250000, 71.250000) rotate(-135.000000) translate(-71.250000, -71.250000) ');
  g3.appendChild(path1);

  return svg1;
}

/*
*   createSVGNodeMenuOpen:
*/
export function createSVGNodeMenuOpen () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'class', 'menu-open');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
  svg1.setAttributeNS(null, 'width', '34px');
  svg1.setAttributeNS(null, 'height', '32px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 32 32');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('Open Menu');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let rect1 = document.createElementNS(xmlns, 'rect');
  rect1.setAttributeNS(null, 'fill', '#FFFFFF');
  rect1.setAttributeNS(null, 'x', '0');
  rect1.setAttributeNS(null, 'y', '0');
  rect1.setAttributeNS(null, 'width', '32');
  rect1.setAttributeNS(null, 'height', '32');
  g1.appendChild(rect1);

  let g2 = document.createElementNS(xmlns, 'g');
  g2.setAttributeNS(null, 'transform', 'translate(4.000000, 6.000000)');
  g2.setAttributeNS(null, 'fill', '#13294b');
  g1.appendChild(g2);

  let rect2 = document.createElementNS(xmlns, 'rect');
  rect2.setAttributeNS(null, 'x', '0');
  rect2.setAttributeNS(null, 'y', '0');
  rect2.setAttributeNS(null, 'width', '24');
  rect2.setAttributeNS(null, 'height', '4');
  rect2.setAttributeNS(null, 'rx', '2');
  g2.appendChild(rect2);

  let rect3 = document.createElementNS(xmlns, 'rect');
  rect3.setAttributeNS(null, 'x', '0');
  rect3.setAttributeNS(null, 'y', '8');
  rect3.setAttributeNS(null, 'width', '24');
  rect3.setAttributeNS(null, 'height', '4');
  rect3.setAttributeNS(null, 'rx', '2');
  g2.appendChild(rect3);

  let rect4 = document.createElementNS(xmlns, 'rect');
  rect4.setAttributeNS(null, 'x', '0');
  rect4.setAttributeNS(null, 'y', '16');
  rect4.setAttributeNS(null, 'width', '24');
  rect4.setAttributeNS(null, 'height', '4');
  rect4.setAttributeNS(null, 'rx', '2');
  g2.appendChild(rect4);

  return svg1;
}

/*
*   createSVGNodeMenuClose:
*/
export function createSVGNodeMenuClose () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'class', 'menu-close');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMid meet');
  svg1.setAttributeNS(null, 'width', '34px');
  svg1.setAttributeNS(null, 'height', '32px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 32 32');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('Close Menu');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let rect1 = document.createElementNS(xmlns, 'rect');
  rect1.setAttributeNS(null, 'fill', '#FFFFFF');
  rect1.setAttributeNS(null, 'x', '0');
  rect1.setAttributeNS(null, 'y', '0');
  rect1.setAttributeNS(null, 'width', '32');
  rect1.setAttributeNS(null, 'height', '32');
  g1.appendChild(rect1);

  let path1 = document.createElementNS(xmlns, 'path');
  path1.setAttributeNS(null, 'd', 'M6.10050506,23.0710678 L23.0710678,6.10050506 C23.8521164,5.31945648 25.1184464,5.31945648 25.8994949,6.10050506 C26.6805435,6.88155365 26.6805435,8.1478836 25.8994949,8.92893219 L8.92893219,25.8994949 C8.1478836,26.6805435 6.88155365,26.6805435 6.10050506,25.8994949 C5.31945648,25.1184464 5.31945648,23.8521164 6.10050506,23.0710678 Z');
  path1.setAttributeNS(null, 'fill', '#13294b');
  g1.appendChild(path1);

  let path2 = document.createElementNS(xmlns, 'path');
  path2.setAttributeNS(null, 'd', 'M8.93264069,6.10421356 L25.9032034,23.0747763 C26.684252,23.8558249 26.684252,25.1221549 25.9032034,25.9032034 C25.1221549,26.684252 23.8558249,26.684252 23.0747763,25.9032034 L6.10421356,8.93264069 C5.32316498,8.1515921 5.32316498,6.88526215 6.10421356,6.10421356 C6.88526215,5.32316498 8.1515921,5.32316498 8.93264069,6.10421356 Z');
  path2.setAttributeNS(null, 'fill', '#13294b');
  g1.appendChild(path2);

  return svg1;
}
