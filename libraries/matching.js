//Execute a JavaScript immediately after a page has been loaded
$(document).ready(function(){
$(".wrapTest .alert").html($(".wrapTest .alert").html().replace("từ ở nửa trái", "nghĩa ở nửa trái"));
$(".wrapTest .alert").html($(".wrapTest .alert").html().replace("nghĩa ở nửa phải", "từ ở nửa phải"));
document.onkeydown = function(e){
  if(e.keyCode == 123){
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
  }
}

$(document).contextmenu(function() {
    return false;
});


var count = 0;
  //Data for terms and definitions. This can be stored in a separate .js file, in a JSON file or here in the main file
  

  var selectedTerm = null, //to make sure none is selected onload
    selectedDef = null,
    termsContainer = document.querySelector("#terms"), //list of terms
    defsContainer = document.querySelector("#defs"); //list of definitions

  //This function takes two arguments, that is one term and one def to compare if they match. It returns True or False after compairing values of the "pairs" object property.     
  function isMatch(termIndex, defIndex) {
    return data.pairs[termIndex] === defIndex;
  }

  //This function adds HTML elements and content to the specified container (UL).
  function createListHTML(list, container) {
    container.innerHTML = ""; //first, clean up any existing LI elements
    for (var i = 0; i < 6; i++) {
      container.innerHTML = container.innerHTML + "<li data-index='" + list[i]["index"] + "'>" + "<span>" + list[i]["text"] + "</span>" + "</li>";
      //OR shorter version: container.innerHTML += "<li data-index='" + list[i]["index"] + "'>" + list[i]["text"] + "</li>";
    }
  }
//window.onload = function() {
  createListHTML(data.terms, termsContainer);
  createListHTML(data.definitions, defsContainer);
//}
  //listen for a "click" event on a list of Terms and store the clicked object in the target object
  termsContainer.addEventListener("click", function(e) {
    var target = e.target.parentNode;
    if (target.className === "score")
      return;
    var termIndex = Number(target.getAttribute("data-index"));
    //warunek na to, że tylko jedno LI może być zaznaczone  
    if (selectedTerm !== null && selectedTerm !== termIndex) {
      termsContainer.querySelector("li[data-index='" + selectedTerm + "']").removeAttribute("data-selected");
    }

    //kasowanie odznaczenia  
    if (target.hasAttribute("data-selected")) {
      target.removeAttribute("data-selected");
      selectedTerm = null;
    }
    //zaznaczanie na klikniecie     
    else {
      target.setAttribute("data-selected", true);
      selectedTerm = termIndex;
    }

    if (selectedTerm !== null && selectedDef !== null) {
      var term = document.querySelector("#terms [data-index='" + selectedTerm + "']");
      var def = document.querySelector("#defs [data-index='" + selectedDef + "']");
      if (isMatch(selectedTerm, selectedDef)) {
        term.className = "score";
        def.className = "score";
        count ++;
        var word = document.querySelector("#terms [data-index='"+selectedTerm+"'] span").textContent.split('(')[0];
        var msg = new SpeechSynthesisUtterance(word);
      
        msg.voice = speechSynthesis.getVoices().filter(function(voice) {
          return voice.name == "Google UK English Male"
        })[0];
   
        window.speechSynthesis.speak(msg);
        if(count == 6){
          document.getElementById("exitRV").style.display = 'block';
        }
      }

      selectedTerm = null;
      selectedDef = null;
      term.removeAttribute("data-selected");
      def.removeAttribute("data-selected");

    }
  })

  defsContainer.addEventListener("click", function(e) {
    var target = e.target.parentNode;
    if (target.className === "score")
      return;
    var defIndex = Number(target.getAttribute("data-index"));

    if (selectedDef !== null && selectedDef !== defIndex) {
      defsContainer.querySelector("li[data-index='" + selectedDef + "']").removeAttribute("data-selected");
    }

    if (target.hasAttribute("data-selected"))
      target.removeAttribute("data-selected");
    else
      target.setAttribute("data-selected", true);
    selectedDef = Number(target.getAttribute("data-index"));
    if (selectedTerm !== null && selectedDef !== null) {
      //var term = document.querySelector("#terms [data-index='"+selectedTerm+"']");
      var term = termsContainer.querySelector("[data-index='" + selectedTerm + "']");
      //var def = document.querySelector("#defs [data-index='"+selectedDef+"']");
      var def = defsContainer.querySelector("[data-index='" + selectedDef + "']");
      if (isMatch(selectedTerm, selectedDef)) {
        count++;
        term.className = "score";
        def.className = "score";
        var word = document.querySelector("#terms [data-index='"+selectedTerm+"'] span").textContent.split('(')[0];
        var msg = new SpeechSynthesisUtterance(word);
      
        msg.voice = speechSynthesis.getVoices().filter(function(voice) {
          return voice.name == "Google UK English Male"
        })[0];
   
        window.speechSynthesis.speak(msg);
        if(count == 6){
          document.getElementById("exitRV").style.display = 'block';
        }
      }
      selectedTerm = null; //odznacz kliknięcie
      selectedDef = null; //odznacz kliknięcie  
      term.removeAttribute("data-selected");
      def.removeAttribute("data-selected");
    }
  })

  function reset() {
    var resetTerms = termsContainer.querySelectorAll("li");
    var resetDefs = defsContainer.querySelectorAll("li");
    for (var i = 0; i < resetTerms.length; i++) {
      resetTerms[i].removeAttribute("class", "score");
      resetTerms[i].removeAttribute("data-selected");
    }
    for (i = 0; i < resetDefs.length; i++) {
      resetDefs[i].removeAttribute("class", "score");
      resetDefs[i].removeAttribute("data-selected");
    }

    selectedTerm = null;
    selectedDef = null;
  }

  function shuffle() {
    randomSort(data.terms)
    randomSort(data.definitions)
    createListHTML(data.terms, termsContainer)
    createListHTML(data.definitions, defsContainer)
  }

  function randomSort(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element. SWAP
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle();
  document.getElementById("resetRV").addEventListener("click", function() {
    reset();
    count = 0;
    termsContainer.setAttribute("class", "fadeOut");
    defsContainer.setAttribute("class", "fadeOut");
    setTimeout(function() {
        shuffle();
        $('#terms li span').each(function(){
    var r = /\d+/;
    var getString = $(this).text();
    var getNumber = $(this).text().match(r);
    var result = getString.replace(getNumber, '<a href="../Tuan'+Math.ceil(getNumber/7)+'/day'+getNumber+'.html" target="_blank">'+getNumber+'</a>');
      $(this).html(result);
    });
    $('.wrapTest ul li span:has(img)').css('padding','0');
    $('.wrapTest ul li span img, .wrapTest ul li span i').css('pointer-events','none');
    $('.wrapTest ul li span i dfn, .wrapTest ul li span i u, .wrapTest ul li span select').css('pointer-events','auto');
        termsContainer.removeAttribute("class", "fadeOut");
        defsContainer.removeAttribute("class", "fadeOut");
      }, 450)
      //shuffle();
  });
  document.getElementById("exitRV").addEventListener("click", function() {
    $('.wrapTest').hide();
  });
  var mang = [];
$('#terms li span').each(function(){
  var r = /\d+/;
  var getString = $(this).text();
  var getNumber = $(this).text().match(r);
  var result = getString.replace(getNumber, '<a href="../Tuan'+Math.ceil(getNumber/7)+'/day'+getNumber+'.html" target="_blank">'+getNumber+'</a>');
  $(this).html(result);
});
$('.wrapTest ul li span:has(img)').css('padding','0');
$('.wrapTest ul li span img, .wrapTest ul li span i').css('pointer-events','none');
$('.wrapTest ul li span i dfn, .wrapTest ul li span i u, .wrapTest ul li span select').css('pointer-events','auto');
});