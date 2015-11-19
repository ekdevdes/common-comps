# Custom Components
A repo containing many controls commonly used in front-end web development

# Index of Contents
- [Custom Dropdowns](#customdropdown)

# Components
## Custom Dropdowns
A simple, fully customizable custom `select`. Too often I have received designs for web content for clients that include a custom `select` in the design. I got tired of writing the CSS and JS to make it look and function the way the designers expected it to look and function, so I created this plugin.

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
This plugin uses the jQuery element querying syntax (e.g. `.after` means any element with the class of "after", `#after` means any element that has an id of "after", etc.) for telling the `container` option where on the page to place the generated dropdown.

It's important to note that there are no quotes used around the selector passed to `container`, they aren't necessary and I'm pretty sure it will break the plugin if quotes are used for any of this plugins options.
### Options

### Styling
