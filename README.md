# Custom Components
A repo containing many controls commonly used in front-end web development

# Index of Contents
- [Custom Dropdowns](#custom-dropdowns)

# Components
## Custom Dropdowns
A simple, fully customizable custom `select`. Too often I have received designs for web content for clients that include a custom `select` in the design. I got tired of writing the CSS and JS to make it look and function the way the designers expected it to look and function, so I created this plugin. This plugin takes the options used in the original `select` and generates a `ul` of `li`s and appends that div that is added to the portion of your page specified by the `container` option and hides the original `select` (however, there is an option to keep the original `select` if you really want to). When an element in the custom dropdown is selected the plugin adds the `selected` attribute to the appropriate `option` in the original `select` so you can tell from your back-end code which option was selected in your custom dropdown. I think its worth noting that you can uniquely target each one the custom dropdowns generated with CSS or JS. The class added to each dropdown is "dropdown-[value of name attribute of original select]".

### Installation
1. Include the latest version of jQuery in your project
```html
<script src="http://code.jquery.com/jquery.min.js"></script>
```
2. Clone the source for `common-comps` into the directory where you would like CSS and JS files to go in with:
```bash
git clone https://github.com/ekdevdes/common-comps.git
```
3. After moving the downloaded files into their respective places, the last step is to link them in your html file. Link Custom Dropdown's CSS in `head` of your document with:
```html
<link rel="stylesheet" href="/path/to/custom-dropdown.css" />
```
I recommend put the previous code right after your CSS reset and right before you site-wide or page-specific stylesheet, that way you can customize the appearance of the dropdown generated with your site's or page-specific stylesheet.

4. Lastly, link to `custom-dropdown.js` after your jQuery include with:
```html
<script src="/path/to/custom-dropdown.js"></script>
```

### Usage
Say you have just finished writing this code for your select:
```html
<select name="outlyingTerritoryTwo">
  <option value="AS">American Samoa</option>
  <option value="GU">Guam</option>
  <option value="MP">Northern Mariana Islands</option>
  <option value="PR">Puerto Rico</option>
  <option value="UM">United States Minor Outlying Islands</option>
  <option value="VI">Virgin Islands</option>
</select>
```
The way you apply this plugin to that specific select is add a `data-dropdown-options` attribute to the afformentioned `select`. The only necessary option `container` which tells the plugin in which to place the generated dropdown. An example is below:
```html
<select name="outlyingTerritoryTwo" data-dropdown-options="container=.after">
  <option value="AS">American Samoa</option>
  <option value="GU">Guam</option>
  <option value="MP">Northern Mariana Islands</option>
  <option value="PR">Puerto Rico</option>
  <option value="UM">United States Minor Outlying Islands</option>
  <option value="VI">Virgin Islands</option>
</select>
```
This plugin uses the jQuery element selector syntax (e.g. `.after` means any element with the class of "after", `#after` means any element that has an id of "after", etc.) for telling the `container` option where on the page to place the generated dropdown.

It's important to note that there are no quotes used around the selector passed to `container`, they aren't necessary and I'm pretty sure it will break the plugin if quotes are used for any of this plugins options.
### Options

|Option|Description|Possible Values|
|:-----|:----------|:--------------|
|`container` **required** | The element to place the generated custom dropdown in | Any selector that matches jQuery element selector syntax, without quotes
|`defaultval` (optional) | By default, no option in the dropdown is selected. This option determines what text should be on the dropdown as the "selected" value in this case| Any string, without quotes
|`selectedval` (optional) | Set one of the options in the dropdown to be selected automatically when the page loads, useful for pre-loading existing configuration options for a service onto a single page | Any string, without quotes
|`keep` (optional) | By default when this plugin is applied to the desired `select`, it hides the `select` that it just created a custom dropdown for, however you can change this and tell the plugin to not hide the original `select` after creating a custom dropdown for it with this option | "keep","yes","true","false", or "no"
### Styling
This plugin was designed to be completely customizable via CSS. A few styles need be applied by default to get the custom dropdown looking like a dropdown menu but you can override almost all of these pre-defined styles with your own. Additionally, Below is a list of selectors and what they affect

|Selector| What it Affects|
|:-------|:---------------|
|`.dropdown`, `.dropdown .control`| The custom dropdown menu when its closed 
|`.dropdown .control .span` | the `span` within the closed state of the custom dropdown that states what option is currently selected
|`.dropdown .control` | The custom dropdown menu when its closed. However, if you want to remove or change the color of the default black border around the closed-state of the custom dropdown you'll want to apply your `border:none`or other `border`-related CSS to this selector. If you want to remove the border on the left of the arrow of the closed-state custom dropdown then you'll want to apply that `border:none` to `.dropdown .control:after`. It possible to have different hover states for the closed-state custom dropdown and the arrow on the right, just make sure that you apply the `:hover` to `.dropdown .control` instead of `.dropdown`
| `.dropdown .control:after`| the arrow that opens the custom dropdown's full option list. The background color of the box the arrow is in can be changed using `.dropdown .control:hover:after` if you put ":hover" after ":after" it won't work...I already tried. To remove the border on the left of the arrow  or change its color this is the selector that you want to put your `border:none` or other `border`-related CSS in.
|`.dropdown .opts ul li` | The individual options in the option list, this is the best selector to do things apply a custom `background-color` to all the options, change the `font-weight` or remove or change the color of the default black border surrounding each option. Use `.dropdown .opts ul li:hover` to change the styles of each option in the options list on hover. Please note that `transition:all 0.3s ease-out` is applied to this selector by default.
|`.dropdown .opts ul li span` | for layout purposes, the text of each option is wrapped within a `span` tag within its parent `li`. If you prefer you font styles to apply only to the text within each option and not to the whole option itself, this would be a good seleector to apply properties like `font-weight` to.


The custom dropdowns generated by the plugin have been designed to be fully mobile-responsive as well, so there's another advantage of using this plugin, mobile-responsive `select`s. Lastly, you can uniquely target each one the custom dropdowns generated with CSS or JS. The class added to each dropdown is "dropdown-[value of name attribute of original select]".
