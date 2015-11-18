(function($){

  // gathering the select's to transform
  var items = $('select[data-dropdown-container]'),
      containers = {},
      htmlOpts = {};

  // building selects
  $.each(items, function(index, item){

    var $currentItem = $(item);

    containers["dropdown-" + $currentItem.attr("name")] = $currentItem.data("dropdown-container");
  });

  $.each(containers, function(index, item){

    var $item = $("select[name=" + index.split("-")[1] + "]");

    $("<div class='dropdown " + index + "' data-selected data-state='closed'><div class='control'><span>" + $item.data("default-val") + "</span></div><div class='opts'></div>").appendTo(item);

  });

  $.each(items, function(index, item){

    var $item = $(item),
        options = $item.children(),
        html = "";

        html += "<ul>";
        $.each(options, function(i, opt){

          var $opt = $(opt);
          html += "<li data-name='" + $opt.text().toLowerCase().replace(/\s/g, "") + "'><span>" + $opt.text() + "</span></li>";

        });
        html += "</ul>";

    htmlOpts["dropdown-" + $item.attr("name")] = html;

    if($item.attr("data-keep") == undefined){
      $(item).hide();
    }
  });

  $.each(containers, function(index, item){

    var html = htmlOpts[index];

    $(html).appendTo(item + " ." + index + " .opts");

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

    // give a class to the selected element to identify it as selected so we can style it like so
    $selection.addClass("selected");

    // hide the options
    $opts.fadeOut("fast");
    $dropdown.attr("data-state", "closed");

    // set value of hidden select to selected item
    $.each($origSelect.children(), function(index, option){

      var $option = $(option),
          optionText = $option.html();

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

}(jQuery));
