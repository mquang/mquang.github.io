$('body').append('<i class="fa fa-chevron-circle-up" style="font-size:36px" onclick="topFunction()"></i>')
$('.layer2').prepend('<a href="../index.html" class="btn btn-default btn-md home"><i class="fa fa-th"></i> Trang chủ</a>')

$('.container_q').append('<div class="qbo" id="limit"><input type="checkbox" id="lm"><label for="lm">Thêm tính năng "vui chơi có thưởng" dành riêng cho các bạn nam (Cảnh báo 16+)</label></div>');

$(document).ready(function(){
  $("video").each(function(){
    var vidSrc = $(this).find("source").attr("src");
    var newSrc = "";
    if(vidSrc.includes("listeningvideo")){
      newSrc = vidSrc.replace("../listeningvideo", "https://github.com/mquang/static-content/blob/master/listeningvideos");     
      newSrc = newSrc.concat("?raw=true");  
      $(this).find("source").attr('src', newSrc);
    } else if(vidSrc.includes("videos2")){
      newSrc = vidSrc.replace("../videos2", "https://github.com/mquang/static-content/blob/master/videos2");
      newSrc = newSrc.concat("?raw=true");  
      $(this).find("source").attr('src', newSrc);
    } else if(vidSrc.includes("videos")) {  
      newSrc = vidSrc.replace("../videos", "https://github.com/mquang/static-content/blob/master/videos");
      newSrc = newSrc.concat("?raw=true");  
      $(this).find("source").attr('src', newSrc);
    }
    $(this).load();
  });

  function getNextWeek(){
    return parseInt($('h3.text-center').text().match(/\d+/)[0]) + 1;
  }

  function getFirstDayInNextWeek(){
    return getNextWeek()*7 - 6;
  }
if(getNextWeek() <= 60){
  $('.layer4').append('<a href="../Tuan' + getNextWeek() + '/day' + getFirstDayInNextWeek() + '.html" class="btn btn-warning next-week">Tuần kế tiếp <i class="fa fa-arrow-circle-o-right"></i></a>');
}
  
  $(".dropdown-btn").on('click',function(){
  var a = this.id;
  (this.firstClk = !this.firstClk) ? a1(): a2();
   function a1(){
    $('.dropdown-btn#' + a + ' i.fa-caret-right').replaceWith( '<i class="fa fa-caret-down"></i>' );
    $('.dropdown-btn#' + a).addClass('visible');
    $('.dropdown-btn#' + a).on('animationend webkitAnimationEnd oAnimationEnd', function () {
        $('.dropdown-btn#' + a +'.visible .dropdown-container li').each(function(index){
            $(this).css({
              'animation-delay':index*0.1+0.7+'s',
              'visibility':'visible'
            });
        });
    });

 
    
   }
   function a2(){
    $('.dropdown-btn#' + a + ' i.fa-caret-down').replaceWith( '<i class="fa fa-caret-right"></i>' );

    $('.dropdown-btn#' + a).removeClass('visible');
   }
});

$('.butt,.display a').addClass('rainbow');

})


$('#m a, .container2 a, #m td:nth-child(4) a').attr('target','_blank');
if($("dfn.ol").closest('div').length >= 1){
  $('.container_q').append('<div class="qbo" id="diff"><input type="checkbox" id="qbo"><label for="qbo">Tăng độ khó (thêm các họ từ liên quan)</label></div>');
}
$('#diff, #limit').css({
      'position':'absolute',
      'left':$('.entry-main').offset().left
});
$('#m tbody tr td:nth-child(1)').attr('data-label','Từ / Cụm từ');
  $('#m tbody tr td:nth-child(2)').attr('data-label','Phiên âm');
  $('#m tbody tr td:nth-child(3)').attr('data-label','Nghĩa');
  $('#m tbody tr td:nth-child(4)').attr('data-label','Ví dụ:');
  var bonus = [];
$('dfn.ol').each(function(){
  var a = $(this).html();
  bonus.push(a);
})
var link = document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = '../images/favicon.ico';
    document.head.appendChild(link);


var timer;

var ar = [
  [],
  [], 
  []
]

// array of all the correct answers
  var QUIZ_ANSWERS = [];
  $('tbody tr td:nth-child(1)', '#m').each(function(i) {
      var a = $(this).text();
      if(a !== ''){
        QUIZ_ANSWERS.push(a);
      }
  });
  ////console.log(QUIZ_ANSWERS);
 var sulist = [];
 function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
 //Bonus:

  $("dfn.ol").closest('div').each(function(){
  var oristr = $(this).html();
  //console.log(oristr);
  var mySubString = oristr.substring(
    oristr.lastIndexOf('ol">') + 4, 
    oristr.indexOf("/dfn>") - 1
  );
  //console.log(mySubString);
  
  var str2 = oristr.replace(mySubString,"");
  var str3 = str2.replace('<dfn class="ol"></dfn>',"");
  var str4 = str3.replace('<li><b>',"");
  var str5 = str4.replace('</b>',"");
  var str6 = str5.replace('</li>',"");
  //console.log(str5);
  $('#qbo').bind('change', function(){        
    if($(this).is(':checked') == true){
      QUIZ_ANSWERS.push(mySubString);
      sulist.push(str6);
    } else {
      removeA(QUIZ_ANSWERS, mySubString);
      removeA(sulist, str6);
    }
    
    $('.items').find('*').not('h2').remove();
    sulist = shuffle(sulist);
for(var id1 = 0; id1 < sulist.length; id1 ++){
 $('.items').prepend('<input id="item'+ id1 +'" type="checkbox" onclick="return false" onkeydown="return false"><label for="item' + id1 +'">' + sulist[id1] + '</label>');
}
    clearInterval(timeInterval);
    reset();
  });
    
});

//END Bonus


$('td:nth-child(3)', '#m').each(function(i) {
      id1 ++;
      var b = $(this).html();
      //console.log(b);
      if(b !== ''){
        sulist.push(b); 
      }
});
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  sulist = shuffle(sulist);
  for(var id1 = 0; id1 < sulist.length; id1 ++){
   $('.items').prepend('<input id="item'+ id1 +'" type="checkbox" onclick="return false" onkeydown="return false"><label for="item' + id1 +'">' + sulist[id1] + '</label>');
  }
  var HAPPY_TIME = 1000; // how long to stay happy, in ms
  var NEUTRAL_TIME = 20000; // how long to stay neutral, in ms

  // timers
  var toastMoodTimeout;
  var timeInterval;

  // other global variables
  var answers;
  var timeRemaining;
  var score;
  var numOfLongVocab = 0;
var rows = QUIZ_ANSWERS.length;   

var QUIZ_TIME_LIMIT;


function roundHalf(num) {
    return Math.round(num*2)/2;
}

$('#m tr td:nth-child(1)').each(function(){
  var a = $(this).text();
  if(a.length > 12){
      numOfLongVocab++;
  }
}); 
// the time limit, in minutes
 QUIZ_TIME_LIMIT = roundHalf(rows*10/60) + 20/60;  

  function startQuiz() {
    // init some variables
    initAnswers();
    timeRemaining = Math.round(QUIZ_TIME_LIMIT * 60);
    
    if(numOfLongVocab > 0){
    	timeRemaining += numOfLongVocab*15; //bonus 15 sec each long vocab
    }

  	if($('#qbo').is(':checked') == true){
    	timeRemaining = Math.round(roundHalf(QUIZ_ANSWERS.length*10/60) * 60 + 20);
  	}

    score = 0;
    
    // prepare UI
    $('.time-remaining').text(getTimeString());
    $('.score').text(score);
    $('.total').text(QUIZ_ANSWERS.length);
    $('.start').hide();
    $('.started').show();
    $('.input').focus();
    
    // start the clock
          
    timeInterval = setInterval(reduceTime, 1000);
    setToastMood('neutral');
  }




  function initAnswers() {
    answers = {};
    QUIZ_ANSWERS.forEach(function(item) {
      var answer = item.trim().toLowerCase()
      answers[answer] = false;
    });
  }

  function setToastMood(mood, isPermanent) {
    $('.toast')
      .removeClass('neutral-toast happy-toast sad-toast')
      .addClass(mood + '-toast');

    clearTimeout(toastMoodTimeout);
    if (!isPermanent) {
      if (mood === 'happy') {
        // happy toast becomes neutral toast
        toastMoodTimeout = setTimeout(setToastMood.bind(undefined, 'neutral'), HAPPY_TIME);
      } else if (mood === 'neutral') {
        // neutral toast becomes sad toast
        toastMoodTimeout = setTimeout(setToastMood.bind(undefined, 'sad'), NEUTRAL_TIME);
      }
    }
  }

  function reduceTime() {
    timeRemaining--;
    if (timeRemaining === 0) {
      endQuiz();
    } else {
      $('.time-remaining').text(getTimeString());
    }
  }

  var voiceSelect = document.getElementById('voice');
  function loadVoices() { 
   var voices = speechSynthesis.getVoices();

   voices.forEach(function(voice, i) {
    var option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = voice.name;
    voiceSelect.appendChild(option);
   if(option.value == 'Google UK English Male'){
    $('#voice').val('Google UK English Male');
   }
   });

   
  }
  loadVoices();
  
  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };


  function checkInput(event) {
    var input = event.currentTarget.value.trim().toLowerCase();

    $('tr td:nth-child(1)', '#m').each(function(i) {
        var a = $(this).text().toLowerCase();
        if(input == a){                 
           var temp = $(this).parent().find($('td:nth-child(3)')).text();
           
          $('label','.items').each(function(i) {
            var b = $(this).text();
            
            if(temp == b){
             var alm = $(this).attr('for');
             var fini = $(this).parent().find($("input[id='"+alm+"']"));
             fini.prop('checked', true);
            }
          });
        }            
      });

    //Bonus:
    $("dfn.ol").parent().each(function(){
      var oristr = $(this).html();
      var mySubString = oristr.substring(
        oristr.lastIndexOf('ol">') + 4,
        oristr.indexOf("/dfn>") - 1
      );
      //console.log(mySubString);
      if(input == mySubString){
        //console.log(input);
      var temp = $(this).parent().html();
      //console.log(temp);
      var temp1 = temp.replace('<b>',"");
      var temp2 = temp1.replace('</b>',"");
      var temp3 = temp2.replace(mySubString,"");
      var temp4 = temp3.replace('<dfn class="ol"></dfn>',"");
      //console.log(temp4);
          $('label','.items').each(function(i) {
            var b = $(this).html();
            
            if(temp4 == b){
             var alm = $(this).attr('for');
             var fini = $(this).parent().find($("input[id='"+alm+"']"));
             fini.prop('checked', true);
            }
          });
      }     
    });  
    //END Bonus


    if (answers.hasOwnProperty(input) && !answers[input]) {
      answers[input] = true;
   var msg = new SpeechSynthesisUtterance(input);

   

   if (voiceSelect.value) {
    msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
   }
   window.speechSynthesis.speak(msg);
      score++;
      $('.score').text(score);
      $('.scored-answers').prepend(createAnswerItem(input));
      $('.input').val('');
      if (score === QUIZ_ANSWERS.length) {
        endQuiz();
      }
    }
  }

  function endQuiz() {
    // freeze
    clearTimeout(timeInterval);
    $('.input').prop('disabled', true);
    
    // calculate percentage
    var percent = Math.round(score / QUIZ_ANSWERS.length * 100);
    $('.percent').text(percent);

    // change status stuff
    $('.status-timer, .status-current-score').hide();
    $('.status-final-results').show();
    $('.footnote').show();

    // score-dependent stuff
    if (score === QUIZ_ANSWERS.length) {
      // happy
      $('.fa-chevron-circle-up').css('display','block');
      $('.fa-chevron-circle-up').animate({bottom:'90px'});

      $('.end-greeting').text('Kinh đấy, còn hẳn ' + getTimeString() + ' thời gian!');
      setToastMood('happy', true);
      if($('#limit').find('input').is(':checked')) {
        open($('figure'));
      }
      
      var msg = new SpeechSynthesisUtterance('Congratulations');
       if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
       }
   window.speechSynthesis.speak(msg);
    } else if (score > 0) {
      // neutral
      $('.end-greeting').text('Hết giờ!');
      setToastMood('neutral', true);
      renderMissedAnswers();
      $('.status-toggle-answers').show();
    } else {
      // sad
      $('.end-greeting').text('Sao vậy...');
      setToastMood('sad', true);
      renderMissedAnswers();
      $('.scored-answers').hide();
      $('.missed-answers').show();
    }
  }

  function renderMissedAnswers() {
    QUIZ_ANSWERS.forEach(function(item) {
      var answer = item.trim().toLowerCase()
      if (!answers[answer]) {
        $('.missed-answers').append(createAnswerItem(answer));
      }
    });
  }

  function toggleAnswers(event) {
    event.preventDefault();
    
    if ($('.scored-answers').is(':visible')) {
      // switch to missed answers
      $('.toggle').text('Xem những từ bro đã gõ được');
      $('.scored-answers').hide();
      $('.missed-answers').show();
    } else {
      // switch to scored answers
      $('.toggle').text('Xem những từ bro chưa gõ được');
      $('.missed-answers').hide();
      $('.scored-answers').show();
    }
  }

  function createAnswerItem(answer) {
    return $('<li>', { text: answer });
  }

  function getTimeString() {
    if (timeRemaining <= 0) {
      return '0:00';
    } else {
      var minutes = Math.floor(timeRemaining / 60);

      var seconds = timeRemaining % 60;
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }

  function reset() {
    // put everything back the way it was
    $('.started, .status-final-results, .status-toggle-answers, .missed-answers, .footnote').hide();
    $('.start, .status-timer, .status-current-score, .scored-answers').show();
    $('.input').prop('disabled', false).val('');
    $('.answers').empty();

    numbers.shuffle();
    var grand = numbers.pop();
    var giftVids = [];
   
    $('div.gallery').replaceWith('<div class="gallery" style="display:none"><figure><figcaption>'+praise+' <i class="fa fa-heart" style="color: #c90a0a;font-size: 25px;"></i> <small>Stay patient and keep up the good work.</small></figcaption><video id="gift3" controls loop><source src="../gift3/'+grand+'.mp4" type="video/mp4"></video></figure></div>');
    
    $('.toggle').text('Xem những từ bro chưa gõ được');
    setToastMood('neutral', true);
    $('.items input').prop('checked', false);
    return focusr = true;
  }


  const wrapper = document.querySelector(".input-wrapper"),
        textInput = document.querySelector("input[type='text']");
          
  textInput.addEventListener("keyup", event => {
    wrapper.setAttribute("data-text", event.target.value);
  });

  $(function () {
    // fill in the blanks
    
    // bind events
    $('.start').on('click', function(){
      startQuiz();
      
    });
    $('.input').on('input', checkInput);
    $('.toggle').on('click', toggleAnswers);
    $('.reset').on('click', function(){
     $('.items').find('*').not('h2').remove();
     sulist = shuffle(sulist);
     for(var id1 = 0; id1 < sulist.length; id1 ++){
   $('.items').prepend('<input id="item'+ id1 +'" type="checkbox" onclick="return false" onkeydown="return false"><label for="item' + id1 +'">' + sulist[id1] + '</label>');
  }
  
     reset();
    });

  });

$(document).on("keypress", "form", function(event) { 
    return event.keyCode != 13;
});

$('#m tbody tr td:nth-child(1)').each(function(){
  $(this).append('<img src="../images\\speaker.png"/>');
})
$('#m tbody tr td:nth-child(1) img').each(function(){ 
  $(this).click(function(){
     var z = $(this).parent().text();
     var msg = new SpeechSynthesisUtterance(z);
    if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
       }
       window.speechSynthesis.speak(msg);
  });  
});
  document.addEventListener("DOMContentLoaded",function(){
    var butt = document.querySelector('.butt'),      //Only the first element of this class is selected
        wrap_menu = document.querySelector('.wrap_menu'),
        overlay = document.querySelector('.overlay'),
        layer_butt = document.querySelector('.layer2'),
        menu = document.getElementsByClassName('list-group-item');

    butt.onclick = function(){
      overlay.classList.add('show');
      layer_butt.classList.add('rotate3D');
      wrap_menu.classList.remove('moveleft'); 
      $('#relax').css('transform','translateY(100%)');
      $('.fa-chevron-circle-up').css('transform','translateY(140px)');
    }
    
    overlay.onclick = function(){
      overlay.classList.remove('show');
      layer_butt.classList.remove('rotate3D');
      wrap_menu.classList.add('moveleft');
      $('#relax, .fa-chevron-circle-up').css('transform','translateY(0)');
    }
  },false);

$('.layer2').bind('heightChange', function(){
  if(!$('.layer2').hasClass("rotate3D")){                                               
    var height1 = $('.layer2').height();
    $('.overlay,.layer4').css('height',height1);
  }else if($('.layer2').hasClass('rotate3D') == true){
    var height2 = $('.layer2').height();
    $('.overlay,.layer4').css('height',height2);
  }
});
$(".butt").click(function() {
    $(".layer2").trigger('heightChange'); 
});    
function topFunction() {
    //document.body.scrollTop = 0;
    //document.documentElement.scrollTop = 0;
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
    return false;
}


function getRand(bottom, top) {  
  return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
}
var result = getRand(1,17);
var iDiv = document.createElement('div');
iDiv.id = 'relax';
document.getElementsByTagName('body')[0].appendChild(iDiv);
var sound      = document.createElement('audio');
document.getElementById('relax').appendChild(sound);
sound.id       = 'audio-player';
sound.controls = 'controls';
sound.src      = '../music/' + result + '.mp3';
sound.loop = true;
sound.load();


$('#relax').append('<div id="pli"><span><i class="fa fa-caret-right" id="collapse"></i> Nhạc nền:</span><select id="sel1"></select></div><div class="love"><p>Made with <img src="../images/love.png" /> by <a href="https://www.facebook.com/nmquang.hust" target="_blank"> Minh Quang </a></p></div>');

$(document).on('click','#collapse',function(){
  $('#relax').css({'left':'calc(100% - 50px)'});
  $(this).replaceWith('<i class="fa fa-caret-left" id="expand"></i>');
  
});
$(document).on('click','#expand',function(){
     $('#relax').css('left','0');
     $(this).replaceWith('<i class="fa fa-caret-right" id="collapse"></i>');
  });
$(document).on('click','#collapse2',function(){
  $('.cover').css({'left':'calc(100% - 50px)'});
  $(this).replaceWith('<i class="fa fa-caret-left" id="expand2"></i>');
  
});
$(document).on('click','#expand2',function(){
     $('.cover').css('left','0');
     $(this).replaceWith('<i class="fa fa-caret-right" id="collapse2"></i>');
  });
for(var i = 1; i<=17; i++){
    $('#relax select').append('<option value="' + i +'">' + i + '.mp3</option>')
}
$('#relax select').val(result);
$('#relax select').on('change', function (e) {
    var optionSelected = $("#relax option:selected", this);
    var valueSelected = this.value;
    $('#relax audio').attr('src','../music/' + valueSelected + '.mp3');
});
$('#pli,.love').css('top',$('#relax').height()/2);
function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}
$('tr td:nth-child(4)', '#m').each(function(i) {
  if($(this).parent().find($('td:nth-child(1)')).text() != 'pubes'){
      var b = $(this).html();
      var cc = [];
      $('div.note', '#m').each(function(){
         var c = $(this).html();
         cc.push(c);
      });

      for(var i = 0; i < cc.length; i ++){
        b = b.replace(cc[i],'');
      }
      var a = $(this).parent().find($('tr td:nth-child(1)')).text();
      var result = boldString(b, a);  
      $(this).html(result);
      var divs = $('div.note');

for(var i = 0; i < divs.length; i++){
    $(divs[i]).html(cc[i]); 
}
      
  }  
});

var flag = true;
  $('dfn').mouseover(function(){
    var a = $(this).text();
    timer = setTimeout(function(){
      if(flag){
        var msg = new SpeechSynthesisUtterance(a);
      if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
       }     
        window.speechSynthesis.speak(msg); 
      }    
      flag = false;     
    },1000);  
  }).mouseleave(function() {
    clearTimeout(timer);
    flag = true;
  });

$('div.note li').addClass('exc');
$('#m tbody tr td:nth-child(4) li:not(.exc)').each(function(){
  $(this).prepend('<i class="fa fa-volume-up" style="margin-right:15px;cursor:pointer;"></i>');
});
$('#m tbody tr td:nth-child(4) li:not(.exc) i').each(function(){ 
  $(this).click(function(){
     var z = $(this).parent().text();
     var msg = new SpeechSynthesisUtterance(z);
    if (voiceSelect.value) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
       }
       window.speechSynthesis.speak(msg);
  });  
});




function arrayShuffle () {
       var i = this.length, j, temp;
       if ( i === 0 ) return false;
       while ( --i ) {
          j = Math.floor( Math.random() * ( i + 1 ) );
          temp = this[i];
          this[i] = this[j]; 
          this[j] = temp;
       }
    }

Array.prototype.shuffle =arrayShuffle;
    
var start = 1;
var end = 67;
var numbers = new Array(); 
for (var i = start; i <= end; i++) {
    numbers.push(i);
}
numbers.shuffle();
var grand = numbers.pop();
var grand2 = grand + '.jpg';
var myAudio = document.getElementById('audio-player');
var praise = "I'm impressed"; 
$('body').append('<div class="gallery" style="display:none"><figure><figcaption>'+praise+' <i class="fa fa-heart" style="color: #c90a0a;font-size: 25px;"></i> <small>Stay patient and keep up the good work.</small></figcaption><video id="gift3" controls loop><source src="../gift3/'+grand+'.mp4" type="video/mp4"></video></figure></div>');


    $(document).on('click', '.popup img', function(){
      return false;
    }).on('click', '.popup', function(){
      close();
    })
    $(document).keyup(function(e) {
      if (e.keyCode === 27) close();   // esc
    });
  function open($figure) {
    $('.gallery').addClass('pop');
    
    $popup = $('<div class="popup" />').appendTo($('body'));
    $fig = $figure.clone().appendTo($('.popup'));
    $bg = $('<div class="bg" />').appendTo($('.popup'));
    $close = $('<div class="close1"><i class="fa fa-times-circle" style="font-size:30px"></i></div>').appendTo($fig);
 
    $shadow = $('<div class="shadow" />').appendTo($fig);
    src = $('img', $fig).attr('src');
    $shadow.css({backgroundImage: 'url(' + src + ')'});
    $bg.css({backgroundImage: 'url(' + src + ')'});
    $('.gallery').find("*").removeAttr("id");
    var vid = document.getElementById("gift3");

    if(vid != null){
      
      vid.onloadedmetadata = function() {
        var mVid = (600 - vid.offsetWidth)/2;
        var tVid = (450 - vid.clientHeight)/2; 
        $('.popup figure').css({'margin-left':mVid,'margin-top':tVid});
      }; 

      vid.autoplay = true;
      vid.load();
        if (myAudio.duration > 0 && !myAudio.paused) {
          myAudio.pause();
       }
    }
    setTimeout(function(){
      $('.popup').addClass('pop');
    }, 10);
  }
  function close(){
    $('.gallery, .popup').removeClass('pop');
    setTimeout(function(){
      $('.popup').remove();
    }, 100);
    var vid = document.getElementById("gift3");
    if(vid != null){
      vid.autoplay = false;
      vid.load();
    }
  }
  var fl = false;
  $('.btn-primary').on('click',function(){
    if(fl == false){
      $('.btn-primary').text("Ẩn nội dung (luyện nghe)");
      fl = true;
    }else{
      $('.btn-primary').text("Hiển thị nội dung");
      fl = false;
    }
      
    $('.panel-body p, .panel-body hr').toggle();
  });
var iWidth = $('#m td:nth-child(4) iframe').width();
$('#m td:nth-child(4) iframe').css({'margin-bottom':'20px','height':iWidth*9/16});

if($('.box button').hasClass("btn2")){
  $('.tab-pane#tab1 p').wrapAll("<div id='test-text2'></div>");
  var editBlock =  '<div class="wrapPen"><div id="editpen"><span class="tooltiptext">Tích vào ô để bật tính năng chỉnh sửa:<br>- Chuột trái bôi đen những chỗ có nối âm, flap T (âm T đọc là Đ), âm cuối... để luyện nói:<br>+ Bôi đen 1 lần để highlight.<br>+ Bôi đen lần 2 vào phần đã bôi để bỏ highlight phần đó.</span><input id="editcheck" type="checkbox" /><span>Editable</span><img id="editpen" src="../images1/editpen.png"></div></div>';
  $('.tab-pane#tab1 .box').append(editBlock);
  $('.tab-pane#tab2 p').wrapAll("<div id='test-text3'></div>");
  var editBlock2 =  '<div class="wrapPen"><div id="editpen2"><span class="tooltiptext">Tích vào ô để bật tính năng chỉnh sửa:<br>- Chuột trái bôi đen những chỗ có nối âm, flap T (âm T đọc là Đ), âm cuối... để luyện nói:<br>+ Bôi đen 1 lần để highlight.<br>+ Bôi đen lần 2 vào phần đã bôi để bỏ highlight phần đó.</span><input id="editcheck2" type="checkbox" /><span>Editable</span><img id="editpen" src="../images1/editpen.png"></div></div>';
  $('.tab-pane#tab2 .box').append(editBlock2);
} else{
  $(".panel-body p, .panel-body hr").wrapAll("<div id='test-text2'></div>");
  var editBlock =  '<div class="wrapPen"><div id="editpen"><span class="tooltiptext">Tích vào ô để bật tính năng chỉnh sửa:<br>- Chuột trái bôi đen những chỗ có nối âm, flap T (âm T đọc là Đ), âm cuối... để luyện nói:<br>+ Bôi đen 1 lần để highlight.<br>+ Bôi đen lần 2 vào phần đã bôi để bỏ highlight phần đó.</span><input id="editcheck" type="checkbox" /><span>Editable</span><img id="editpen" src="../images1/editpen.png"></div></div>';
  if($(".panel-body video").length > 0){
    $('.box').append(editBlock);
  }else{
    if(!$('.panel-body').hasClass("noEdit")){
    $('.panel-body').prepend(editBlock);
    }    
  }
}

  
  


mouseXPosition = 0;
mouseXPositionPen2 = 0;
  $(document).ready(function () {
    

      $('#editpen').on('click',function(){
        if($('#editcheck').is(':checked') == true){
          $('.exa').addClass('highlight');
          $('.exa').removeClass('exa');
          
          $('#test-text2 mark, #test-text2 p u').contents().unwrap();
          
          $("#test-text2").mousedown(function (e1) {
              mouseXPosition = e1.pageX;//register the mouse down position
          });
          $("#test-text2").mouseup(function(e2){
            releaseMouse(e2, mouseXPosition);
          });

        }
        else{return false;}

        });   

      $('#editpen2').on('click',function(){
        if($('#editcheck2').is(':checked') == true){
          $('.exa').addClass('highlight');
          $('.exa').removeClass('exa');
          
          $('#test-text3 mark, #test-text3 p u').contents().unwrap();
          
          $("#test-text3").mousedown(function (e1) {
              mouseXPositionPen2 = e1.pageX;//register the mouse down position
          });
          $("#test-text3").mouseup(function(e2){
            releaseMouse(e2, mouseXPositionPen2);
          });

        }
        else{return false;}

        });   
    
  });
  
  function releaseMouse(e2, mouseXPosition){
    var highlighted = false;
    var selection = window.getSelection();
    var selectedText = selection.toString();
    var startPoint = window.getSelection().getRangeAt(0).startOffset;
    var endPoint = window.getSelection().getRangeAt(0).endOffset;
    var anchorTag = selection.anchorNode.parentNode;
    var focusTag = selection.focusNode.parentNode;
    if ((e2.pageX - mouseXPosition) < 0) {
        focusTag = selection.anchorNode.parentNode;
        anchorTag = selection.focusNode.parentNode;
    }
    if (selectedText.length === (endPoint - startPoint)) {
        highlighted = true;

        if (anchorTag.className !== "highlight") {
            highlightSelection();
        } else {
            var afterText = selectedText + "<span class = 'highlight'>" + anchorTag.innerHTML.substr(endPoint) + "</span>";
            anchorTag.innerHTML = anchorTag.innerHTML.substr(0, startPoint);
            anchorTag.insertAdjacentHTML('afterend', afterText);
        }

    } else{
        if(anchorTag.className !== "highlight" && focusTag.className !== "highlight"){
            highlightSelection();  
            highlighted = true;
        }
        
    }


    if (anchorTag.className === "highlight" && focusTag.className === 'highlight' && !highlighted) {
        highlighted = true;

        var afterHtml = anchorTag.innerHTML.substr(startPoint);
        var outerHtml = selectedText.substr(afterHtml.length, selectedText.length - endPoint - afterHtml.length);
        var anchorInnerhtml = anchorTag.innerHTML.substr(0, startPoint);
        var focusInnerHtml = focusTag.innerHTML.substr(endPoint);
        var focusBeforeHtml = focusTag.innerHTML.substr(0, endPoint);
        selection.deleteFromDocument();
        anchorTag.innerHTML = anchorInnerhtml;
        focusTag.innerHTml = focusInnerHtml;
        var anchorafterHtml = afterHtml + outerHtml + focusBeforeHtml;
        anchorTag.insertAdjacentHTML('afterend', anchorafterHtml);


    }

    if (anchorTag.className === "highlight" && !highlighted) {
        highlighted = true;
        var Innerhtml = anchorTag.innerHTML.substr(0, startPoint);
        var afterHtml = anchorTag.innerHTML.substr(startPoint);
        var outerHtml = selectedText.substr(afterHtml.length, selectedText.length);
        selection.deleteFromDocument();
        anchorTag.innerHTML = Innerhtml;
        anchorTag.insertAdjacentHTML('afterend', afterHtml + outerHtml);
     }
    
    if (focusTag.className === 'highlight' && !highlighted) {
        highlighted = true;
        var beforeHtml = focusTag.innerHTML.substr(0, endPoint);
        var outerHtml = selectedText.substr(0, selectedText.length - beforeHtml.length);
        selection.deleteFromDocument();
        focusTag.innerHTml = focusTag.innerHTML.substr(endPoint);
        outerHtml += beforeHtml;
        focusTag.insertAdjacentHTML('beforebegin', outerHtml );


    }
    if (!highlighted) {
        highlightSelection();
    }
    $('.highlight').each(function(){
        if($(this).html() == ''){
            $(this).remove();
        }
    });
    selection.removeAllRanges();
  };


  function highlightSelection() {
      var selection;

      //Get the selected stuff
      if (window.getSelection)
          selection = window.getSelection();
      else if (typeof document.selection != "undefined")
          selection = document.selection;

      //Get a the selected content, in a range object
      var range = selection.getRangeAt(0);

      //If the range spans some text, and inside a tag, set its css class.
      if (range && !selection.isCollapsed) {
          if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
              var span = document.createElement('span');
              span.className = 'highlight';
              span.textContent = selection.toString();
              selection.deleteFromDocument();
              range.insertNode(span);
//                        range.surroundContents(span);
          }
      }
  }





