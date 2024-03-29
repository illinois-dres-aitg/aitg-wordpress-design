// DisclosureMenu.js

import {
  createMenuSVGNodeToggle,
  createMenuSVGNodeLink,
  createMenuSVGNodeOpen,
  createMenuSVGNodeClose
} from './menuSVGNodes.js';

/*
*   CSS classes and animation names referenced by this script:
*
*   menu                      class         WordPress
*   menu-item-has-children    class         WordPress
*   sub-menu                  class         WordPress
*
*   banner-hamburger          class         AITG stylesheet
*   banner-menu               class         AITG stylesheet
*   banner-name               class         AITG stylesheet
*   hide                      class         AITG stylesheet
*   left-adjust               class         AITG stylesheet
*
*   fade-out                  animation     AITG stylesheet
*
*   Important note: The sub-menus are opened and closed using CSS animations.
*   In order for the menu close animation to work properly (i.e. to actually
*   close the sub-menu), the name of the animation must be 'fade-out', which
*   is referenced in the handler function for the 'animationend' event.
*/

/*
*   MenuContainer: A DisclosureMenu object instantiates MenuContainer objects
*   for use in managing a menu button's link behavior and submenu links.
*/
function MenuContainer (containerNode, index, disclosureMenuObj) {
  var subMenuNodeId, subMenuLinkNodes, i;

  this.hasSubMenu = false;
  this.containerNode = containerNode;

  // We know that the containerNode contains a link, and that it will most
  // often act like a button, so we use the property name buttonNode.
  this.buttonNode = containerNode.querySelector('a');

  // Add event listeners to buttonNode
  this.buttonNode.addEventListener('click', disclosureMenuObj.handleButtonClick.bind(disclosureMenuObj));
  this.buttonNode.addEventListener('keydown', disclosureMenuObj.handleButtonKeydown.bind(disclosureMenuObj));

  // Check to see if buttonNode link has a submenu, presumably with links
  if (containerNode.classList.contains('menu-item-has-children')) {
    this.hasSubMenu = true;
    subMenuNodeId = 'banner-sub-menu-' + index;

    // When menubar link has submenu links:
    //   Change link to use the button role
    //   Set href to '#' so it does not behave like a link
    //   Add aria-expanded and aria-controls for ARIA menu button pattern
    this.buttonNode.setAttribute('role', 'button');
    this.buttonNode.setAttribute('href', '#');
    this.buttonNode.setAttribute('aria-expanded', 'false');
    this.buttonNode.setAttribute('aria-controls', subMenuNodeId);

    // Initialize submenu-related values
    this.subMenuNode = containerNode.querySelector('.sub-menu');
    this.subMenuNode.id = subMenuNodeId;

    // Adjust submenu position if the button is too close right margin
    let space = window.innerWidth - this.buttonNode.getBoundingClientRect().left;
    if (space < 260) {
      this.subMenuNode.classList.add('left-adjust');
    }

    subMenuLinkNodes = containerNode.querySelectorAll('.sub-menu a');

    // Add event handler to submenu links
    for (i = 0; i < subMenuLinkNodes.length; i++) {
      subMenuLinkNodes[i].addEventListener('keydown',
        disclosureMenuObj.handleSubMenuLinkKeydown.bind(disclosureMenuObj));
    }

    // Add submenu information to menu container object
    this.subMenuLinkNodes = subMenuLinkNodes;
    this.firstSubMenuLinkNode = subMenuLinkNodes[0];
    this.lastSubMenuLinkNode = subMenuLinkNodes[subMenuLinkNodes.length - 1];
  }
}

/*
*   DisclosureMenu: The top-level object used for managing the behavior of
*   menubar widgets and their subcomponents.
*/
function DisclosureMenu (domNode) {
  var containerNodes, containerNode, menuContainer, i;

  // Check for navigation landmark role
  if (domNode.tagName.toLowerCase() !== 'nav') {
   domNode.setAttribute('role', 'navigation');
  }
  // Add an accessible name to main menu
  domNode.setAttribute('aria-label', 'Site Menu');

  this.rootNode = domNode;

  // Add hamburger button
  this.hamburgerButtonNode = document.createElement('button');
  this.hamburgerButtonNode.setAttribute('type', 'button');
  this.hamburgerButtonNode.setAttribute('aria-label', 'Main Menu');
  this.hamburgerButtonNode.classList.add('banner-hamburger');
  this.hamburgerButtonNode.setAttribute('aria-expanded', 'false');
  this.hamburgerButtonNode.addEventListener('click', this.handleHamburgerClick.bind(this));
  this.hamburgerButtonNode.appendChild(createMenuSVGNodeOpen());
  this.hamburgerButtonNode.appendChild(createMenuSVGNodeClose());
  domNode.parentNode.insertBefore(this.hamburgerButtonNode, domNode);

  this.menuNode = domNode.querySelector('.menu');

  // initially hide menu if screen is narrow
  this.menuNode.classList.add('hide');

  // Add event handlers for closing the pulldown menus when focus or mouse
  // event within document is not on a menu item
  document.body.addEventListener('mousedown', this.handleBodyCloseMenus.bind(this));
  document.body.addEventListener('focusin', this.handleBodyCloseMenus.bind(this));

  // Add event handler for closing the pulldown menus on unload
  window.addEventListener('unload', this.closeMenus.bind(this));

  // Add event handler for closing the pulldown menu on animationend by setting
  // display:none on the sub-menu at the end point of the 'fade-out' animation.
  // Note: Before 'fade-out' animation was added to sub-menus, setting display:
  // none to close the sub-menus was handled by the closeMenus method.
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
      e.target.style.display = 'none';
    }
  });

  // WP/ARIA housekeeping
  convertSpansToLinks(this.rootNode);
  setAriaCurrentOnBannerNameLink();

  // Initialize array for storing references to menuContainer objects.
  this.menuContainers = [];

  // Get the DOM nodes for the menubar list items and process each one.
  containerNodes = this.rootNode.querySelectorAll('ul.menu > li');

  for (i = 0; i < containerNodes.length; i++) {
    containerNode = containerNodes[i];
    if (containerNode.classList.contains('menu-item-has-children')) {
      containerNode.querySelector('a').appendChild(createMenuSVGNodeToggle());
    } else {
      containerNode.querySelector('a').appendChild(createMenuSVGNodeLink());
    }

    // When a menu item gets focus, close any other submenus
    containerNode.addEventListener('focusin', this.handleFocusIn.bind(this));

    // If for some reason there is no link in the container, do not create a
    // menuContainer object for this item.
    if (!containerNode.querySelector('a')) {
        continue;
    }

    // Create the object that includes a reference to its menubar button link
    // and any associated submenu links.
    menuContainer = new MenuContainer(containerNode, i, this);
    this.menuContainers.push(menuContainer);
  }

  // Set first and last properties
  this.firstMenuContainer = this.menuContainers[0];
  this.lastMenuContainer = this.menuContainers[this.menuContainers.length - 1];

  this.updateSVGCurrentColorValue();

  // Helper functions for constructor

  // If any span elements are found in the banner menu, it is because WP
  // changes links to  spans when the href value of the link page matches the
  // current page URL. Change each span to an 'a' element, using the current
  // page URL as its href value, and mark the link using aria-current="page".
  function convertSpansToLinks(rootNode) {
    var spanNodes = rootNode.querySelectorAll('span');

    for (var i = 0; i < spanNodes.length; i += 1) {
      var parentNode = spanNodes[i].parentNode;
      var linkNode = document.createElement('a');
      linkNode.textContent = spanNodes[i].textContent;
      linkNode.href = location.href;
      linkNode.setAttribute('aria-current', 'page');
      parentNode.replaceChild(linkNode, spanNodes[i]);
    }
  }

  // If the banner-name link is the current page link, mark it with
  // aria-current="page".
  function setAriaCurrentOnBannerNameLink () {
    var bannerNameLinkNode = document.querySelector('.banner-name a');

    if (bannerNameLinkNode) {
      var url1 = location.href.trim().toLowerCase();
      var url2 = bannerNameLinkNode.href.trim().toLowerCase();
      if (url1 === url2) {
        bannerNameLinkNode.setAttribute('aria-current', 'page');
      }
    }
  }
}

/* Prototype Methods */

DisclosureMenu.prototype.updateSVGCurrentColorValue = function () {
  var svgNodes, svgNode, pNode, color;

  svgNodes = document.querySelectorAll('svg');
  if (svgNodes.length && svgNodes[0].parentNode) {
    pNode = svgNodes[0].parentNode;
    color = window.getComputedStyle(pNode).getPropertyValue('color');

    // set the color used by the currentColor value in the SVG
    for (let i = 0; i < svgNodes.length; i++) {
      svgNodes[i].setAttribute('color', color);
    }
  }
}

DisclosureMenu.prototype.getMenuContainer = function (node) {
  for (var i = 0; i < this.menuContainers.length; i++) {
    var c = this.menuContainers[i];

    if (c.containerNode.contains(node)) {
      return c;
    }
  }
  return false;
};

DisclosureMenu.prototype.openMenu = function (menuNode) {
  menuNode.style.display = 'block';
};

DisclosureMenu.prototype.closeMenus = function (subMenuNode) {
  if (typeof subMenuNode !== 'object') {
    subMenuNode = null;
  }

  for (var i = 0; i < this.menuContainers.length; i++) {
    var mc = this.menuContainers[i];
    // Do not close sub-menu if it is nested within another sub-menu
    if (mc.hasSubMenu && (mc.subMenuNode !== subMenuNode)) {
      // Setting display:none on sub-menu when it is closed is now handled by
      // event handler triggered by the 'animationend' event of CSS animation
      /* mc.subMenuNode.style.display = 'none'; */
      mc.buttonNode.setAttribute('aria-expanded', 'false');
    }
  }
};

DisclosureMenu.prototype.toggleExpand = function (menuContainer) {
  if (menuContainer.hasSubMenu) {
    var isOpen = menuContainer.buttonNode.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      this.closeMenus();
    }
    else {
      this.closeMenus(menuContainer.subMenuNode);
      menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
      this.openMenu(menuContainer.subMenuNode);
    }
  }
};

DisclosureMenu.prototype.expand = function (menuContainer) {
  this.closeMenus(menuContainer.subMenuNode);
  menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
  this.openMenu(menuContainer.subMenuNode);
};

DisclosureMenu.prototype.getLinkIndex = function (menuContainer, link) {
  for (var i = 0; i < menuContainer.subMenuLinkNodes.length; i++) {
    if (link === menuContainer.subMenuLinkNodes[i]) {
      return i;
    }
  }
  return 0;
};

DisclosureMenu.prototype.setFocusToNextMenu = function (menuContainer) {
  if (menuContainer != this.lastMenuContainer) {
    var index = this.menuContainers.indexOf(menuContainer);
    this.closeMenus();
    this.menuContainers[index+1].buttonNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToPreviousMenu = function (menuContainer) {
  if (menuContainer != this.firstMenuContainer) {
    var index = this.menuContainers.indexOf(menuContainer);
    this.closeMenus();
    this.menuContainers[index-1].buttonNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToFirstLink = function (menuContainer, currentLink) {
  if (menuContainer.hasSubMenu) {
    menuContainer.firstSubMenuLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToLastLink = function (menuContainer, currentLink) {
  if (menuContainer.hasSubMenu) {
    menuContainer.lastSubMenuLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToNextLink = function (menuContainer, currentLink) {
  if (currentLink === menuContainer.lastSubMenuLinkNode) {
    menuContainer.firstSubMenuLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.subMenuLinkNodes[index+1].focus();
  }
};

DisclosureMenu.prototype.setFocusToPreviousLink = function (menuContainer, currentLink) {
  if (currentLink === menuContainer.firstSubMenuLinkNode) {
    menuContainer.lastSubMenuLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.subMenuLinkNodes[index-1].focus();
  }
};

/* Event Handlers */

DisclosureMenu.prototype.handleButtonClick = function (event) {
  var mc = this.getMenuContainer(event.target);
  if (mc.hasSubMenu) {
    this.toggleExpand(mc);
    mc.buttonNode.focus();
    event.stopPropagation();
    event.preventDefault();
  }
};

DisclosureMenu.prototype.handleButtonKeydown = function (event) {
  var mc = this.getMenuContainer(event.target);
  var tgt = event.currentTarget,
    key = event.key,
    flag = false;

  switch (key) {
    case ' ':
      var mc = this.getMenuContainer(event.target);
      if (mc.hasSubMenu) {
        this.toggleExpand(mc);
        mc.buttonNode.focus();
      }
      flag = true;
      break;

    case 'Esc':
    case 'Escape':
      this.closeMenus();
      flag = true;
      break;

    case 'Up':
    case 'ArrowUp':
      this.expand(mc);
      this.setFocusToLastLink(mc, tgt);
      flag = true;
      break;

    case 'Down':
    case 'ArrowDown':
      this.expand(mc);
      this.setFocusToFirstLink(mc, tgt);
      flag = true;
      break;

    case 'Left':
    case 'ArrowLeft':
      this.setFocusToPreviousMenu(mc);
      flag = true;
      break;

    case 'Right':
    case 'ArrowRight':
      this.setFocusToNextMenu(mc);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DisclosureMenu.prototype.handleSubMenuLinkKeydown = function (event) {
  var mc = this.getMenuContainer(event.target);
  var tgt = event.currentTarget,
    key = event.key,
    flag = false;

  switch (key) {
    case 'Esc':
    case 'Escape':
      this.closeMenus();
      mc.buttonNode.focus();
      flag = true;
      break;

    case 'Up':
    case 'ArrowUp':
      this.setFocusToPreviousLink(mc, tgt);
      flag = true;
      break;

    case 'Down':
    case 'ArrowDown':
      this.setFocusToNextLink(mc, tgt);
      flag = true;
      break;

    case 'Left':
    case 'ArrowLeft':
      this.setFocusToPreviousMenu(mc);
      flag = true;
      break;

    case 'Right':
    case 'ArrowRight':
      this.setFocusToNextMenu(mc);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DisclosureMenu.prototype.handleFocusIn = function (event) {
  var mc = this.getMenuContainer(event.target);
  this.closeMenus(mc.subMenuNode);
};

DisclosureMenu.prototype.handleBodyCloseMenus = function (event) {
  if (!this.rootNode.contains(event.target)) {
    this.closeMenus();
  }
  else {
    event.stopPropagation();
    event.preventDefault();
  }
};

DisclosureMenu.prototype.handleHamburgerClick = function (event) {
  if (this.hamburgerButtonNode.getAttribute('aria-expanded') === 'true') {
    this.hamburgerButtonNode.setAttribute('aria-expanded', 'false');
    this.menuNode.classList.add('hide');
  }
  else {
    this.hamburgerButtonNode.setAttribute('aria-expanded', 'true');
    this.menuNode.classList.remove('hide');
  }

  // support moving focus to button on macOS
  this.hamburgerButtonNode.focus();
  event.stopPropagation();
  event.preventDefault();
};

/*
*   IIFE that initializes DisclosureMenu object
*/
(function () {
  new DisclosureMenu(document.querySelector('.banner-menu'));
})();
