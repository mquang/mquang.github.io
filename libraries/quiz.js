  var currentTabId = $("ul.nav-tabs > li.active > a").attr("href").replace("#", ""),
      numOfQues = $("#" + currentTabId + " .quiz-question").length;
      
  $("ul.nav-tabs > li > a").click(function() { 
    currentTabId = $(this).attr("href").replace("#", ""); 
    numOfQues = $("#" + currentTabId + " .quiz-question").length;
    quiz.init();
  });
  

  var Quiz = function(){
  var self = this;
  this.init = function(){
    this.correctAnswers = dataAnswers[currentTabId];
    if (this._isComplete() ) {
      $('#' + currentTabId + ' .quiz-answer').off('click');   
    } else {
      this._bindEvents();
    }
  }
  
  this._pickAnswer = function($answer, $answers){
    $answers.find('.quiz-answer').removeClass('active');
    $answer.addClass('active');
  }
  this._calcResult = function(){
    var numberOfCorrectAnswers = 0;
    $('#' + currentTabId + ' ul[data-quiz-question]').each(function(i){
      var $this = $(this),
          chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
          correctAnswer;
      
      for ( var j = 0; j < self.correctAnswers.length; j++ ) {
        var a = self.correctAnswers[j];
        if ( a.question == $this.data('quiz-question') ) {
          correctAnswer = a.answer;
        }
      }
      
      if ( chosenAnswer == correctAnswer ) {
        // highlight this as correct answer
        $this.find('.quiz-answer.active').addClass('correct');
      }
      else {
        $this.find('.quiz-answer[data-quiz-answer="'+correctAnswer+'"]').addClass('correct');
        $this.find('.quiz-answer.active').addClass('incorrect');
      }
    });
  }
  this._isComplete = function(){
    var answersComplete = 0;
    $('#' + currentTabId + ' ul[data-quiz-question]').each(function(){
      if ( $(this).find('.quiz-answer.active').length ) {
        answersComplete++;
      }
    });
    if ( answersComplete >= numOfQues ) {
      return true;
    }
    else {
      return false;
    }
  }
  this._bindEvents = function(){
    $('.quiz-answer').on('click', function(){
      var $this = $(this),
          $answers = $this.closest('#' + currentTabId + ' ul[data-quiz-question]');
      self._pickAnswer($this, $answers);
      if ( self._isComplete() ) {
        self._calcResult();
        $('#' + currentTabId + ' .explaination').show();
        $('#' + currentTabId + ' .quiz-answer').off('click');     
      }
    });
  }
}
var quiz = new Quiz();
quiz.init();