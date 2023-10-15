const niceColorScheme = [
  {background: '#FFD154', foreground: '#002795'},
  {background: '#D9D9D9', foreground: '#C20000'},
  {background: '#D4B5FF', foreground: '#002795'},
  {background: '#3D3D3D', foreground: '#FFD154'},
  {background: '#68D69D', foreground: '#401D83'},
  {background: '#F7C8B6', foreground: '#0B3266'},
  {background: '#FBE8BD', foreground: 'rgb(44 113 197)'}
];
var randomColorScheme = niceColorScheme[Math.floor(Math.random() * niceColorScheme.length)];

var wrapperTest = $('.wrapTest .row'), container, content, days;
for (var key in vocab_list){
  if(vocab_list[key] && vocab_list[key].imgSrc && vocab_list[key].day) {
    container = $('<div class="col-sm-3"></div>');
    if(vocab_list[key].imgSrc.includes("images")) {
      content = '<img src="' + vocab_list[key].imgSrc +'"/>';
    } else {
      content = '<h3>' + vocab_list[key].imgSrc + '</h3>';
    }
    days = vocab_list[key].day.split(',');

    var contentBack = $('<div/>', {'class' : 'flip'}).append(
       $('<div/>', {'class' : 'card'}).append(
          $('<div/>', {'class' : 'face front'}).append(
              $('<div/>', {'class' : 'inner'}).append(
                content
              )
          )
       ).append(
          $('<div/>', {'class' : 'face back'}).append(
              $('<div/>', {'class' : 'inner text-center'}).append(
                '<h3>' + key + '</h3>'
              ).append(
                '<h5 style="text-align:left">' + vocab_list[key].empl + '</h5>'
              )
          )
       )
    );
    var dayStr = "";
    for(var i = 0; i < days.length; i++){
      dayStr += '<a href="../Tuan'+Math.ceil(days[i]/7)+'/day' + days[i] + '.html" target="_blank">Ngày '+days[i] +'</a>/';
    }

    contentBack.find('.face.back').append(dayStr.slice(0, -1));

    if(vocab_list[key].audiospeak) {
      contentBack.append('<input type="hidden" value="' + vocab_list[key].audiospeak + '" />')
    }
    container.append(contentBack);

    wrapperTest.append(container);
    if(!vocab_list[key].imgSrc.includes("images")) {
      $(".flip .card .front .inner").css({
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'height':'178px',
        'background': randomColorScheme.background
      });
      $(".flip .card .front .inner h3").css({
        'font-family': 'Open Sans',
        'font-weight': 'bold',
        'color': randomColorScheme.foreground
      });
    }
    }
}

if(Object.keys(vocab_list).length > 8) {
    $(".flip .card .front .inner, .flip .card, .flip .card .front").css({
          'height':'89px'
    });
    $(".row .col-sm-3").css("margin-bottom", "1%");
}



$("#exitRV").click(function(){
    $('.wrapTest').hide();
});

$('.flip').hover(function(){
    $(this).find('.card').addClass('flipped'); 
}, function(){
  if(!$(this).hasClass('hasOpenedContextMenu')) {
    $(this).find('.card').removeClass('flipped');
  }
});

$('.flip').on('click', function (e) {
    if($(this).find('.card').hasClass('flipped') && e.target.nodeName != 'SELECT' && e.target.nodeName != 'A') {
    var val = $(this).find('input').val();
    if(val) {
        var msg = new SpeechSynthesisUtterance(val);
        if (voiceSelect.value) {
            msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
        }
        window.speechSynthesis.speak(msg);
      }
   }
});