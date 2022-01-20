$(document).ready(function() {
  // Converts integer to hex 
const colToHex = (c) => {
  // Hack so colors are bright enough
  let color = (c < 75) ? c + 75 : c
  let hex = color.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

// uses colToHex to concatenate
// a full 6 digit hex code
const rgbToHex = (r,g,b) => {
  return "#" + colToHex(r) + colToHex(g) + colToHex(b);
}

// Returns three random 0-255 integers
const getRandomColor = () => {
  return rgbToHex(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255));
}
  $('.box').each(function(){
  var color = getRandomColor();
  var posx = (Math.random() * ($(window).width() - $('.box').width() - 30)).toFixed();
  var posy = (Math.random() * ($(window).height() - $('.box').height())).toFixed();
  $(this).css({'background-color':color,'left':posx + 'px','top':posy + 'px'});

  var r = /\d+/;
  var getString = $(this).text();
  var getNumber = $(this).text().match(r);
  var result = getString.replace(getNumber, '<a href="../Tuan'+Math.ceil(getNumber/7)+'/day'+getNumber+'.html" target="_blank">'+getNumber+'</a>');
  $(this).html(result);
})

  $(".element").throwable({
    drag: true,
    gravity: {
      x: 0,
      y: 0
    },
    impulse: {
      f: 52,
      p: {
        x: 0,
        y: 0
      }
    },
    autostart: false,
    bounce: 0.5,
    damping: 100
  });
});

