var countau = 0, countau2 = 0;
    $('#myVideo video').on('ended',function(){
        countau = 1;
    });
    $('#myVideo2 video').on('ended',function(){
        countau2 = 1;
    });
    
  $('.box button').on('click', function(){

    if (!$(this).hasClass("btn2")) {
      if(countau == 1){
        $('#myVideo').addClass('fixed-video');   
        $('.all').css('perspective','none');
        if($('.tab-pane').hasClass("active")){
          $('.tab-pane#tab1 p').show();
        } else{
          $('.panel-primary p').show();
        }
        
        $('#myVideo .close').css('display','block');
       }else{
          alert('Bạn còn chưa thử nghe hết một lần mà! Nghe đi xem sức mình hiện tại nghe hiểu được bao nhiêu. Sau khi nghe xong lần 1, bạn sẽ có thể mở được phụ đề.');
      }
    } else {
      if(countau2 == 1){
        $('#myVideo2').addClass('fixed-video');   
        $('.all').css('perspective','none');
        
        $('.tab-pane#tab2 p').show();
        
        $('#myVideo2 .close').css('display','block');
      }else{
        alert('Bạn còn chưa thử nghe hết một lần mà! Nghe đi xem sức mình hiện tại nghe hiểu được bao nhiêu. Sau khi nghe xong lần 1, bạn sẽ có thể mở được phụ đề.');
      }
    }
  });

  $('#myVideo .close').on('click', function(){
    $('#myVideo').removeClass('fixed-video');
    document.getElementsByClassName("all")[0].style.perspective = "3000px";
    if($('#myVideo2').hasClass('fixed-video')){
      document.getElementsByClassName("all")[0].style.perspective = "none";
    }
    $(this).css('display','none');
  });

  $('#myVideo2 .close').on('click', function(){
    $('#myVideo2').removeClass('fixed-video');
    document.getElementsByClassName("all")[0].style.perspective = "3000px";
    if($('#myVideo').hasClass('fixed-video')){
      document.getElementsByClassName("all")[0].style.perspective = "none";
    }
    $(this).css('display','none');
  });