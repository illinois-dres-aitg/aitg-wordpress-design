# CHANGELOG.md

This file contains a list of changes made to the repository, organized by
date.

Under each date is a list of changes that were made to entities such as
CSS class names, file names, variable names, etc., which need to be
communicated to keep the WordPress theme, and its PHP files, synchronized
with the CSS, JavaScript and image files.

## Sep. 22, 2020 (Nick)

* Renamed the CSS class banner-aitg to banner-name.
* Moved the Outreach menu button to follow the Universal Design button.
* Removed image files no longer needed.

## Sep. 21, 2020 (Jon)

* Updated the skipTo styling to match Nick's design for menu button for the
  initial rendering, hover and focus styling.
* Changed border style on button to be 1px when button does not have focus and
  3 pixels when button does have focus.
* Fixed the issue of the SkipTo button positioning not following the
  responsive changes.
* Restored the Lorem Ipsum main content.
* Removed WordPress comments from styles.css.
* Removed the styles.map.css file from the pull request.
* Moved the role="search" to the form element.
* Updated the indenting in the Javascript files to use 2 spaces, instead of 4
  spaces.
* Added a feature to skip to for search landmarks to move focus to the first
  input when a search landmark is selected from the menu.

## Nov. 16, 2020 (Nick)

* Deleted font files and the `fonts` folder: now accessing fonts via CDN.
* Deleted image file no longer used: `images/search-icon-inv.svg`.
* Deleted `js/banner-menu.js`, now superceded by `js/DisclosureMenu.js`.

## Dec. 2, 2020 (Nick)

### `banner-menu` and `header`

* Updated `banner-menu.scss` such that phone-width menu displays properly:
  top-level menu buttons display at full width and hover borders display on
  all four sides.
* Replaced `js/DisclosureMenu.js` with Jon's updated version.
* Integrated all CSS properties in Jon's `hamburger.scss` file into existing
  files `header.scss` and `banner-menu.scss`.
* Need to check whether `display: block` and `display: inline-block` properties
  are needed on `ul > li > a` elements.

### `skip-to` and `events`

* Moved skip-to code in `header.scss` to its own file: `skip-to.scss`; added
  `@forward skip-to;` in `styles.scss`.
* Integrated all CSS properties in Jon's `presentations.scss` into
  `events.scss`: there are now two classes: `upcoming-events`, and
  `presentations`.
* To use the classes in `events.scss`, in the HTML you would specify on the
  `ul` element: `class="upcoming-events"` or
  `class="upcoming-events presentations"`.

### Issues

* There was a problem with the menu system when the phone-width menu was
  visible: because the menu container is part of the header element, and the
  header element was `position: sticky`, some of the expanded submenus filled
  the screen and there was no way to scroll to the bottom of the menu or to
  the next top-level menu button. This was fixed by making the `header`
  element `position: sticky` only when the screen width is desktop-width, and
  `position: relative` for all other widths.
* There seems to be a focus problem in `DisclosureMenu.js`: once a menu
  element has focus, it will not release focus, even when you click the mouse
  elsewhere in the page. (Fixed)

## Dec. 8, 2020 (Nick)

### `banner-menu` and `header`

* Fixed text layout inconsistencies of menu items (left and right padding) and
  submenus within submenus (top and bottom padding).
* Added `min-width` property to `sub-menu` box and `white-space: normal` for
  more consistent layout and to avoid clipping of lengthy menu item text.
* Added toggle of `chevron-down.svg` image to `chevron-up.svg` when
  `aria-expanded=true`, to indicate button can be used to close `sub-menu`.
* Added `$medium-gray` borders to top-level menu buttons to indicate state of
  `focus-within` to better indicate menu context.
* Added `$medium-gray` border around entire `sub-menu` when menu buttons are
  vertically aligned (phone screen width) to better indicate menu context.
* Added class `left-adjust` for right-most `sub-menu` to prevent clipping in
  `$desktop-width` and `$tablet-width` layouts.

### `search-widget`

* Created new search widget icon (magnifying glass) with better proportioning.
* Fixed layout problems with search icon: reset button `padding: 0`; specified
  `grid column` dimensions, in particular the `button` column width; used
  `position: relative` offsets that work in Chrome, Firefox and Safari.

### `skip-to`

* Added media queries to incrementally left-adjust the menu box to avoid
  clipping.

### AITG description text

* Updated home page introductory text to make it less abstract.

## Dec. 8, 2020 (Jon)

### Changes to DisclosureMenu.js

* Changed the initialization of the hamburger menu button.
* Include a property `hamburgerButtonNode` to reference the hamburger menu.
* Updated the `click` event handler to use `hamburgerButtonNode` instead of
  event target.
* Dynamically add `left-adjust` class to submenu node if the menu button is a
  certain distance from the right edge of the window.
