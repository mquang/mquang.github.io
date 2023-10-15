$(document).ready(function(){
  const theLastWeek = 87;
  var currDay = $('.all').find('h1:first').text().match(/\d+/)[0];
  var currWeek = Math.ceil(currDay/7);  

  var allWordsLink = '<div class="btn-contain"><div class="btn-gradient-contain"><a href="../all-words.html" class="btn-gradient"><h3 class="glyphicon glyphicon-circle-arrow-right" style="vertical-align:sub"></h3> <span>Xem toàn bộ từ</span></a></div></div>';    
  $('.wrap_menu.layer4').append(allWordsLink);
  var nextWeekLink = '<a href="../Tuan' + (currWeek + 1) + '/day' + ((currWeek + 1)*7 - 6) + '.html" class="btn btn-warning next-week">Tuần kế tiếp <span class="glyphicon glyphicon-log-in"></span></a>';
  if(currWeek < theLastWeek)
    $('.wrap_menu.layer4').append(nextWeekLink);
  var wIndex = 1;
  for(var i = currWeek; i > 0; i--){
    if(wIndex > 3)
      break;
    var weekContent = '';
    if(i == currWeek)
      weekContent = '<div class="current" id="w'+wIndex+'"><h3 class="text-center">Tuần '+i+'</h3><div class="display">';
    else
      weekContent = '<div class="dropdown-btn" id="w'+wIndex+'"><h3 >Tuần '+i+'</h3><div class="display dropdown-container">';
    for(var j = (i-1)*7 + 1; j <= i*7; j++){
      if(j != currDay)
        weekContent = weekContent.concat('</li><li><a href="../Tuan'+i+'/day'+j+'.html">Ngày '+j+'</a></li>')
    }     
      weekContent = weekContent.concat('</div></div>')
      $('.wrap_menu.layer4').append(weekContent); 
      wIndex++;  
  }                     
});
