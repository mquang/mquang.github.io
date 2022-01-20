var tuan = 85;

!function(t){function e(e,n,i,r){var a=e.text(),c=a.split(n),s="";c.length&&(t(c).each(function(t,e){s+='<span class="'+i+(t+1)+'" aria-hidden="true">'+e+"</span>"+r}),e.attr("aria-label",a).empty().append(s))}var n={init:function(){return this.each(function(){e(t(this),"","char","")})},words:function(){return this.each(function(){e(t(this)," ","word"," ")})},lines:function(){return this.each(function(){var n="eefec303079ad17405c889e092e105b0";e(t(this).children("br").replaceWith(n).end(),n,"line","")})}};t.fn.lettering=function(e){return e&&n[e]?n[e].apply(this,[].slice.call(arguments,1)):"letters"!==e&&e?(t.error("Method "+e+" does not exist on jQuery.lettering"),this):n.init.apply(this,[].slice.call(arguments,0))}}(jQuery);  
  $(document).ready(function() {
  $(".title1").lettering();
});
  
$(document).ready(function() {
  animation();
});

function animation() {
  var title1 = new TimelineMax();
  title1.to(".button", 0, {visibility: 'hidden', opacity: 0})
  title1.staggerFromTo(".title1 span", 0.5, 
  {ease: Back.easeOut.config(1.7), opacity: 0, bottom: -80},
  {ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0}, 0.05);
  title1.to(".button", 0.2, {visibility: 'visible' ,opacity: 1})
}
for(var i=1; i<=15;i++){
  var temp = i - 1;
  
  $('.gallery#second').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>');
  
}
for(var i=16; i<=30;i++){
  var temp = i - 1;
  
  $('.gallery#third').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>'); 
}
for(var i=31; i<=45;i++){
  var temp = i - 1;  
  $('.gallery#fourth').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>');
}
for(var i=46; i<=60;i++){
  var temp = i - 1;  
  $('.gallery#fifth').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>');
}
for(var i=61; i<=75;i++){
  var temp = i - 1;  
  $('.gallery#sixth').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>');
}
for(var i=76; i<=tuan;i++){
  var temp = i - 1;  
  $('.gallery#seventh').append('<div class="thumbnail" id="w'+temp+'"><span class="folder"><span class="file"></span></span><div class="title">Tuần '+i+'</div></div>');
}
  $('.thumbnail').click(function(){
     $('#overlay').css('top', '0');
     var id = $(this).attr('id');
     var thenum = id.replace( /^\D+/g, '');   
     $('.pop-up').addClass('open');
     $('#phone_screen').addClass('ani');
     $('#phone').addClass('ani2');

     for(var j=1; j<=7;j++){
      var mul = 7*thenum+j;
      var week = parseInt(thenum) + 1;
      $('.bao').append('<a href="Tuan'+week+'/day'+mul+'.html"><div class="outer"><div class="document"></div><span>Ngày '+mul+'</span></div></a>');
     }  
       
      if(thenum == (tuan - 1)){
          $('.bao').append('<a href="Tuan'+tuan+'/all-words.html"><div class="outer"><div class="document"></div><span id="review">Tổng kết</span></div></a>');
      } else {
         $('.bao').append('<a href="Tuan'+(week+1)+'/1.REVIEW'+week+'.html"><div class="outer"><div class="document"></div><span id="review">Review tuần '+ week +'</span></div></a>');
      }    
  });

$('.pop-up .close').click(function(){
  $('.pop-up').removeClass('open');
  $('#phone_screen').removeClass('ani');
  $('#phone').removeClass('ani2');
  $('.bao').empty();
  $('#overlay').css('top', '-100%');
});
$(document).keyup(function(e) {
  $('.pop-up').removeClass('open');
  $('#phone_screen').removeClass('ani');
  $('#phone').removeClass('ani2');
  $('.bao').empty();
  $('#overlay').css('top', '-100%');
});
new ScrollHandler("first");
new ScrollHandler("second");
new ScrollHandler("third");
new ScrollHandler("fourth");
new ScrollHandler("fifth");
new ScrollHandler("sixth");
new ScrollHandler("seventh");
function ScrollHandler(pageId) {
  var page = document.getElementById(pageId);
  var pageStart = page.offsetTop;
  var pageJump = false;
  var viewStart;
  var duration = 1000;
  var scrolled = document.getElementById("scroll");

  function scrollToPage() {
    pageJump = true;

    // Calculate how far to scroll
    var startLocation = viewStart;
    var endLocation = pageStart;
    var distance = endLocation - startLocation;

    var runAnimation;

    // Set the animation variables to 0/undefined.
    var timeLapsed = 0;
    var percentage, position;

    var easing = function(progress) {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1; // acceleration until halfway, then deceleration
    };

    function stopAnimationIfRequired(pos) {
      if (pos == endLocation) {
        cancelAnimationFrame(runAnimation);
        setTimeout(function() {
          pageJump = false;
        }, 500);
      }
    }

    var animate = function() {
      timeLapsed += 16;
      percentage = timeLapsed / duration;
      if (percentage > 1) {
        percentage = 1;
        position = endLocation;
      } else {
        position = startLocation + distance * easing(percentage);
      }
      scrolled.scrollTop = position;
      runAnimation = requestAnimationFrame(animate);
      stopAnimationIfRequired(position);
      console.log("position=" + scrolled.scrollTop + "(" + percentage + ")");
    };
    // Loop the animation function
    runAnimation = requestAnimationFrame(animate);
  }

  window.addEventListener("wheel", function(event) {
    viewStart = scrolled.scrollTop;
    if (!pageJump) {
      var pageHeight = page.scrollHeight;
      var pageStopPortion = pageHeight / 2;
      var viewHeight = window.innerHeight;

      var viewEnd = viewStart + viewHeight;
      var pageStartPart = viewEnd - pageStart;
      var pageEndPart = pageStart + pageHeight - viewStart;

      var canJumpDown = pageStartPart >= 0;
      var stopJumpDown = pageStartPart > pageStopPortion;

      var canJumpUp = pageEndPart >= 0;
      var stopJumpUp = pageEndPart > pageStopPortion;

      var scrollingForward = event.deltaY > 0;
      if (
        (scrollingForward && canJumpDown && !stopJumpDown) ||
        (!scrollingForward && canJumpUp && !stopJumpUp)
      ) {
        event.preventDefault();
        scrollToPage();
      }
      false; //
    } else {
      event.preventDefault();
    }
  });
}