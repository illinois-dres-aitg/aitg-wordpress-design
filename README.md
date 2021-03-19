# aitg-wordpress-design

This repository contains the files used in the illinois-dres-aitg WordPress
theme for the CSS styling and JavaScript scripting of the page template,
including the skip-to menu and the AITG menu bar.

## Developer Notes

* The command for running Sass such that it does not produce a `source-map`
  file is:

  `sass --no-source-map main.scss style.css`

## Disclosure Menu Features

* Fully keyboard-navigable using tab, arrow keys, spacebar and enter
* Menus do not open on hover or focus: the menu button must be activated
* Menus can have submenus; however, submenus are not hidden -- indicated by indentation
* Menu button borders indicate where in the top-level hierarchy the current page is located
* Menu item background color indicates that current page corresponds to the menu item (aria-current)
* SVG images and high contrast mode: chevron (arrow) icons
* Use of animation: chevron icons change direction; fade-in and fade-out of menus
