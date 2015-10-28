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
          html += "<li data-name='" + $opt.text().toLowerCase().replace(/\s/g, "") + "'>" + $opt.text() + "</li>";

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

    var $dropdown = $(this).parent();

    return false;
  });

}(jQuery));
