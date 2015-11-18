(function($){
  // gathering the select's to transform
  var items = $('select[data-dropdown-options]'),
      options = {},
      containers = {},
      htmlOpts = {};

  // building selects and set up option parsing
  $.each(items, function(index, item){

    var $currentItem = $(item),
        itemName = "dropdown-" + $currentItem.attr("name")
        rawOptions = $currentItem.attr('data-dropdown-options').split(","),
        opts = {};

    $.each(rawOptions, function(index, item){
        var key = item.split("=")[0].trim(),
            val = item.split("=")[1];

        if(key == "keep"){
          if(val.toLowerCase() == "yes" || val.toLowerCase() == "true" || val.toLowerCase() == "keep") {
              opts[key.toLowerCase()] = "true";
          } else {
            opts[key.toLowerCase()] = "false";
          }
        }else{
          opts[key.toLowerCase()] = val;
        }
    });

    options[itemName] = opts;

    containers["dropdown-" + $currentItem.attr("name")] = $currentItem.data("dropdown-container");
  });

  $.each(containers, function(index, item){

    var opts = options[index];

    $("<div class='dropdown " + index + "' data-selected data-state='closed'><div class='control'><span>" + opts.defaultval + "</span></div><div class='opts'></div>").appendTo(opts["container"]);

  });

  $.each(items, function(index, item){

    var $item = $(item),
        choices = $item.children(),
        html = "",
        dropdownName = "dropdown-" + $item.attr("name");

        html += "<ul>";
        $.each(choices, function(i, opt){

          var $opt = $(opt);

          html += "<li data-name='" + $opt.text().toLowerCase().replace(/\s/g, "") + "'><span>" + $opt.text() + "</span></li>";

        });
        html += "</ul>";

    htmlOpts[dropdownName] = html;

    if(options[dropdownName].keep != "true"){
      $item.hide();
    }
  });

  $.each(containers, function(index, item){

    $(htmlOpts[index]).appendTo('.' + index + ' .opts');

  });

  $('.dropdown .control').click(function(e){
    e.preventDefault();

    var $dropdown = $(this).parent(),
        $control = $dropdown.find(".control"),
        $opts = $dropdown.find(".opts");

    // show/hide the options based on their current visibility status
    if($dropdown.attr("data-state") == "closed") {
      $opts.fadeIn("fast");

      $dropdown.attr("data-state", "opened");
    } else {
      $opts.fadeOut("fast");

      $dropdown.attr("data-state", "closed");
    }

    return false;
  });

  $('.dropdown .opts li').click(function(e){
    e.preventDefault();

    var $dropdown = $(this).parent().parent().parent(),
        $opts = $dropdown.find(".opts"),
        $selection = $(this),
        origSelectName = $dropdown.attr("class").split(" ")[1].split("-")[1],
        $origSelect = $('select[name="' + origSelectName + '"]'),
        selectionText = $selection.html().replace(/(<([^>]+)>)/ig,"");

    // remove the class of "selected" from all options in custom select
    $.each($dropdown.find("li"), function(index, item){
      $(item).removeClass("selected");
    });

    // give a class to the selected element to identify it as selected so we can style it like so
    $selection.addClass("selected");

    // hide the options
    $opts.fadeOut("fast");
    $dropdown.attr("data-state", "closed");

    // set value of hidden select to selected item and remove "selected" attribute from all options
    // in original select that don't match the selected value in the custom dropdown
    $.each($origSelect.children(), function(index, option){

      var $option = $(option),
          optionText = $option.html();

      $option.removeAttr("selected");

      if(optionText == selectionText) {
        $option.attr("selected", "selected");
      }
    });

    // set the data-selected attribute of the custom dropdown to the data-name attribute of the selected
    // option for retaining of that same selection on page load
    $dropdown.attr("data-selected", $selection.attr("data-name"));

    // set the shown value of the dropdown to the selected element
    $dropdown.find(".control span").text(selectionText);

    return false;
  });

  // set the option whose identifier has been specified through the original select's data-selected-val attribute
  $.each(items, function(index, item){

    var $item = $(item),
        dropdownName = "dropdown-" + $item.attr("name");

    if($item.attr("data-selected-val") !== undefined &&
        $item.attr("data-selected-val") != ""){

        var selectedItem = $item.attr("data-selected-val"),
            $dropdown = $(" ." + dropdownName),
            $selectedOption = $dropdown.find('li[data-name=' + selectedItem + ']'),
            selectedText = $selectedOption.html().replace(/(<([^>]+)>)/ig,"");

        // set the title of the custom dropdown to the item to be selected
        $dropdown.find('.control span').text(selectedText);

        // remove the "selected" class from all the options in the custom select
        $.each($dropdown.find("li"), function(index, item){
          $(item).removeClass("selected");
        });

        // apply the class of "selected" to selected li
        $selectedOption.addClass("selected");

        // set the original select's value to the selected value in custom dropdown and remove the "selected" attribute from
        // any other option in original selected that doesn't match the selected value in custom dropdown
        $.each($item.children(), function(index, option){

          var $option = $(option),
              optionText = $option.html();

          $option.removeAttr("selected");

          if(optionText == selectedText) {
            $option.attr("selected", "selected");
          }
        });
    }
  });

}(jQuery));
