var wrapperTest = $('.row'), container;
for (var key in vocab_list){
    container = $('<div class="col-sm-3"></div>');
    container.append(
      $('<div/>', {'class' : 'flip'}).append(
         $('<div/>', {'class' : 'card'}).append(
            $('<div/>', {'class' : 'face front'}).append(
                $('<div/>', {'class' : 'inner'}).append(
                  '<img src="' + vocab_list[key].imgSrc +'"/>'
                )
            )
         ).append(
            $('<div/>', {'class' : 'face back'}).append(
                $('<div/>', {'class' : 'inner text-center'}).append(
                  '<h3>' + key + '</h3>'
                ).append(
                  '<h5>' + vocab_list[key].empl + '</h5>'
                ).append(
                  '<a href="../Tuan'+Math.ceil(vocab_list[key].day/7)+'/day' + vocab_list[key].day + '.html" target="_blank">Ngày '+vocab_list[key].day +'</a>'
                )
            )
         )
      )
    );
    wrapperTest.append(container);
}


$("#exitRV").click(function(){
    $('.wrapTest').hide();
});

$('.flip').hover(function(){
        $(this).find('.card').toggleClass('flipped');
});