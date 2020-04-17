$(document).ready(function(){
  var currDay = $('.all').find('h1:first').text().match(/\d+/)[0];
  var currWeek = Math.ceil(currDay/7);  

  var reviewLink = '<div class="btn-contain"><div class="btn-gradient-contain"><a href="../Tuan'+currWeek+'/1.REVIEW'+(currWeek-1)+'.html" class="btn-gradient"><span>Review '+(currWeek-1)+'</span></a></div></div>';    
  $('.wrap_menu.layer4').append(reviewLink); 
  var wIndex = 1;
  for(var i = currWeek - 2; i < currWeek; i++){
    var prevWeekContent = '<div class="dropdown-btn" id="w'+wIndex+'"><h3>Tuần '+i+' <i class="fa fa-caret-right"></i></h3><div class="display dropdown-container">';
    for(var j = (i-1)*7 + 1; j <= i*7; j++){
      prevWeekContent = prevWeekContent.concat('</li><li><a href="../Tuan'+i+'/day'+j+'.html">Ngày '+j+'</a></li>')
    }     
      prevWeekContent = prevWeekContent.concat('</div></div>')
      $('.wrap_menu.layer4').append(prevWeekContent); 
      wIndex++;  
  }        

  var currWeekContent = '<div class="current"><h3 class="text-center">Tuần ' + currWeek + '</h3><div class="display">';
  for(var i = (currWeek-1)*7 + 1; i <= currWeek*7; i++){
    if(i != currDay){
      currWeekContent = currWeekContent.concat('<li><a href="day'+i+'.html">Ngày '+i+'</a></li>')
    }  
  }
  currWeekContent = currWeekContent.concat("</div></div>");  
  $('.wrap_menu.layer4').append(currWeekContent);                      
})
