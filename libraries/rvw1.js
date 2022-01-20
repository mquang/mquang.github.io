$(document).ready(function(){  
   type("ACCESSING DATA ....."); 
   loadData();
}); 

var firstDay = week * 7 - 6, lastDay = week * 7, day = firstDay, words = {}, relatedWords = {};
for(var i = firstDay; i <= lastDay; i++) {
    words[i] = [];
    relatedWords[i] = [];
};

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

function loadData(){
  var url = "https://raw.githubusercontent.com/mquang/mquang.github.io/master/Tuan"+week+"/day"+day+".html";
  $.ajax(url, {
    dataType: "html",
    method: "GET",
    success: function(data){
      var response = $('<html />').html(data),
              trows, i, j, k, end;

          trows = response.find('#m tbody tr');
          end = trows.length;
          for (j = 0; j < 12; j++) {
            if(trows[ j ] != undefined){
              //so luong children trong phan nghia (moi the li, div, image, video la 1 children)
              //console.log(trows[ j ].children[3].children.length);
              //lap qua cac the cua phan noi dung
              for(k = 0; k < trows[ j ].children[3].children.length; k++ ) {
                //neu the do dc gan class la "note"
                if( trows[ j ].children[3].children[k].className == "note"){
                  var relatedWord = trows[ j ].children[3].children[k].innerText;
                  relatedWord = relatedWord.substring(getPosition(relatedWord, ")", 1) + 2, relatedWord.indexOf(":"));
                  relatedWords[day].push(relatedWord);
                }
              }
              words[day].push(trows[ j ].children[0].innerText);
            } 
          }
          day++;        
      if(day <= lastDay){
        loadData();
      } else {
        setTimeout(function(){ writeData(); }, 2000);
      }               
    },
    error: function(request, errorType, errorMsg){
      console.log(errorMsg);
    }     
  });    
}

var bind = Function.prototype.bind,
    $append = bind.call(Element.prototype.appendChild, document.querySelector("output")),
    $new = bind.call(Document.prototype.createElement, document),
    $text = bind.call(Document.prototype.createTextNode, document),
    $rnd = function() { return (Math.random() * 50 + 0)|0; }, //change typing speed here
    $promise = function(thenFn) {
      var args, promise, wait, slice=Array.prototype.slice, isResolved = false;
      var promise = {
        wait: function(ms) {
          wait = ms;
          return promise;
        },
        then: function() {
          args = slice.call(arguments);
          return promise = $promise(thenFn);
        },
        resolve: function() {
          isResolved = true;
          if(args) {
            var next = Function.prototype.bind.apply(thenFn, [undefined].concat(args).concat([promise]));
            wait ? setTimeout(next, wait) : next();
          }

        }
      };
      return promise;
    };

var process = function(target, chars, promise) {
  var first = chars[0], rest = chars.slice(1);
  if(!first) {
    promise.resolve();
    return;
  }
  target.appendChild(first);
  setTimeout(process.bind(undefined, target, rest, promise), $rnd());
}

var type = function(text, promise) {
  var chars = text.split("").map($text);
  promise = promise || $promise(type);
  $append($new("br"));
  process($append($new("q")), chars, promise);
  return promise;
};

function writeData(){
  for(var i = firstDay; i <= lastDay; i++) {
    type("Day " + i + ": " + words[i].join(', '))
  }
  setTimeout(function(){ 
    type("Show related words? Press y/n");
  }, 3000);
};

var flag = true;
$(document).on('keypress', function(e) {
    if ( e.which === 121 && flag == true) {
      for(var i = firstDay; i <= lastDay; i++) {
        if(relatedWords[i].length > 0){
          type("Day " + i + ": " + relatedWords[i].join(', '))
        }
      }
      flag = false;
    }else if(e.which === 110 && flag == true){
      type("Keep calm & Have fun with English ^^");
      flag = false;
    }
});
