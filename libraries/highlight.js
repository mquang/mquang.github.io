$(document).ready(function(){
  function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b style="color:#337ab7">'+find+'</b>');
}
$('.panel-body p, .modal-body p').each(function(i) {
        var a = $(this).html();
        if(a.includes(":")){
          var b = a.split(':')[0];
          var result1 = boldString(a.split(':')[0], b); 
          $(this).html(result1.concat(":" + a.split(':')[1]));  
          $(this).css('text-indent','0');  
        }
        
 });
});
