$(document).ready(function() {
  var jobCount = $('#list .in').length;
  $('.list-count').text(jobCount + ' items');
  $("#search-text").keyup(function() {
    var searchTerm = $("#search-text").val();
    var listItem = $('#list').children('a[data-title]');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
    $.extend($.expr[':'], {
      'containsi': function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
          .indexOf((match[3] || "").toLowerCase()) >= 0;
      }
    });
    $("#list a[data-title]").not(":containsi('" + searchSplit + "')").each(
      function(e) {
        $(this).addClass('hiding out').removeClass('in');
        setTimeout(function() {
          $('.out').addClass('hidden');
        }, 300);
      });
    $("#list a[data-title]:containsi('" + searchSplit + "')").each(
      function(e) {
        $(this).removeClass('hidden out').addClass('in');
        setTimeout(function() {
          $('.in').removeClass('hiding');
        }, 1);
      });
    var jobCount = $('#list .in').length;
    $('.list-count').text(jobCount + ' items');
    if (jobCount == '0') {
      $('#list').addClass('empty');
    } else {
      $('#list').removeClass('empty');
    }
  });

  function searchList() {
    var listArray = [];
    $("#list a[data-title]").each(function() {
      var listText = $(this).text().trim();
      listArray.push(listText);
    });
    $('#search-text').autocomplete({
      source: listArray
    });
  }
  searchList();
});