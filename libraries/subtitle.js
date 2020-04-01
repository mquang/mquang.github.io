var countau = 0;
    $('#myVideo video').on('ended',function(){
        countau = 1;
    });
  $('.box button').on('click', function(){
    if(countau == 1){
      $('#myVideo').addClass('fixed-video');   
      $('.all').css('perspective','none');
      $('.panel-primary p').show();
      $('#myVideo .close').css('display','block');
   }else{
    alert('Bạn còn chưa thử nghe hết một lần mà! Nghe đi xem sức mình hiện tại nghe hiểu được bao nhiêu. Sau khi nghe xong lần 1, bạn sẽ có thể mở được phụ đề.');
  }

});
  $('#myVideo .close').on('click', function(){
    $('#myVideo').removeClass('fixed-video');
    document.getElementsByClassName("all")[0].style.perspective = "3000px";
    $(this).css('display','none');
  });