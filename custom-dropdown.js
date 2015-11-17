(function($){

  var items = $('select[data-dropdown-container]'),
      containers = {},
      htmlOpts = {};

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
        $opts = $dropdown.find(".opts");

    // capture clicked on element in a variable

    $opts.fadeOut("fast");
    $dropdown.attr("data-state", "closed");

    // set value of hidden select to selected item
    // set the shown value of the dropdown to the selected element

    return false;
  });

}(jQuery));
