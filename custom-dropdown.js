(function($){

  var items = $('select[data-dropdown-container]'),
      containers = {},
      htmlOpts = [];

  $.each(items, function(index, item){

    var $currentItem = $(item);

    containers["dropdown-" + $currentItem.attr("name")] = $currentItem.data("dropdown-container");
  });

  $.each(containers, function(index, item){

    $("<div class='dropdown " + index + "' data-selected data-state='closed'><div class='control'></div><div class='opts'></div>").appendTo(item);

  });

  $.each(items, function(index, item){

    var $item = $(item),
        options = $item.children(),
        html = "";

        html += "<ul>";
        $.each(options, function(i, opt){

          var $opt = $(opt);
          console.log($opt);
          html += "<li data-name='" + $opt.text().toLowerCase().replace(" ", "") + "'>" + $opt.text() + "</li>";

        });
        html += "</ul>";

        htmlOpts.push(html);
  });

}(jQuery));
