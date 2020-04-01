var bag = [
        ["According to", "in order to", "in place of", "by means of", "In accordance with"],
        ["consult", "compensation", "maintenance", "preservation", "conservation"],
        ["recruit", "employ", "applicant", "candidate", "interviewee"],
        ["hire", "rent", "lease", "leave", "abandon"],
        ["governor", "resident", "citizen", "inspector", "proctor", "supervisor"],
        ["oversee", "colleague", "college", "in charge", "headmaster", "term", "semester"],
        ["brochure", "agenda", "curriculum", "itinerary", "journey", "voyage"]
    ];
var bonus = [
 [],
 ["consultant", "consultancy", "compensate", "maintain", "preserve", "conserve", "conservatory", "conservative"],
 ["recruitment", "recruiter", "employee", "employer", "employment","unemployment", "apply", "application", "candidacy", "interview"],
 ["for rent", "rental", "sublease"],
 ["government", "governance", "residential", "reside", "residence", "citizenship", "inspect", "supervisory", "supervise"],
 ["principal", "headmistress", "in term of"],
 ["curriculum vitae"]
]
var bind = Function.prototype.bind,
    $append = bind.call(Element.prototype.appendChild, document.querySelector("output")),
    $new = bind.call(Document.prototype.createElement, document),
    $text = bind.call(Document.prototype.createTextNode, document),
    $rnd = function() { return (Math.random() * 125 + 0)|0; }, 
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

type("ACCESSING DATA .....")
  .wait(3000)
  .then("Day 22: " + bag[0].join(', '))
  .wait(1000)
  .then("Day 23: " + bag[1].join(', '))
  .wait(1000)  
  .then("Day 24: " + bag[2].join(', '))
  .wait(1000)
  .then("Day 25: " + bag[3].join(', '))
  .wait(1000) 
  .then("Day 26: " + bag[4].join(', '))
  .wait(1000) 
  .then("Day 27: " + bag[5].join(', '))
  .wait(1000) 
  .then("Day 28: " + bag[6].join(', '))
  .wait(1000)
  .then("Show related words? Press y/n")

var flag = true;
$(document).on('keypress', function(e) {
    if ( e.which === 121 && flag == true) {
      type("Day 22: " + bonus[0].join(', '))
      .wait(1000)
      .then("Day 23: " + bonus[1].join(', '))
      .wait(1000)
      .then("Day 24: " + bonus[2].join(', '))
      .wait(1000)
      .then("Day 25: " + bonus[3].join(', '))
      .wait(1000)
      .then("Day 26: " + bonus[4].join(', '))
      .wait(1000)
      .then("Day 27: " + bonus[5].join(', '))
      .wait(1000)
      .then("Day 28: " + bonus[6].join(', '));
      flag = false;
    }else if(e.which === 110 && flag == true){
      type("Keep calm & Have fun with English ^^");
      flag = false;
    }    
});
  
var bag1 = [];
for(var i = 0; i < bag.length; i++)
{
   bag1 = bag1.concat(bag[i]);
}
function call(){
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
  bag1 = shuffle(bag1);
  
  for(var i=0; i<bag1.length; i++){
    $('.words').append('<span>'+bag1[i]+'</span>');
  };

    (function(){
    $.each($('span'), function(i,el) {
      var a = Math.floor(Math.random() * 7),
          b = (Math.floor(Math.random() * 400)/10),
          c = Math.floor(Math.random() * 8);
      $(this).css({
        '-webkit-animation-delay' : b + 's',
        'animation-delay' : b + 's',
      });
      $(this).addClass('p' + c);
    });
  })();
}  
setTimeout(function(){ call(); }, 3000);
$('div.arrow').on('click',function(){  
    $('.words').empty();
    call();
  });