var fromWeek = parseInt($(".head").text().match(/\d+/)[0]);

$("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

var week = fromWeek - 2, endWeek = fromWeek + 1; day = week*7-6;
$(".head b").append(" (Ôn lại những từ thuộc tuần " + week + " đến tuần " + fromWeek + ")");
$("#loadWords").on("click", function(e){		
    var button = this;	
    var buttObj = $(this);
    buttObj.attr("disabled", true);
	var url = "https://raw.githubusercontent.com/mquang/mquang.github.io/master/Tuan"+week+"/day"+day+".html";
	$.ajax(url, {
		dataType: "html",
		method: "GET",
		success: function(data){
			var response = $('<html />').html(data),
	            trows, i, j, end;

	        trows = response.find('#m tbody tr');

	        end = trows.length;
	        var tr = "<tr><th scope='row'>"+day+"</th>"
	        for (j = 0; j < 12; j++) {
	        	if(trows[ j ] != undefined){
	        		tr = tr.concat("<td>"+trows[ j ].children[0].innerText + "</td>");
	        	} else{
	        		tr = tr.concat("<td></td>");
	        	}
	        }
	        tr = tr.concat("</tr>");
	        $("#table tbody").append(tr);
	        day++;
			if((day - 1) % 7 == 0){
				week++;
			}   			
			if(week == endWeek){
				$("#loadWords").hide();
			} else{
				buttObj.attr("disabled", false);
				button.click(); 
			}
			$('th').each(function(){
              if($(this).attr('scope') == 'row'){
                    $(this).html('<a href="../Tuan' + Math.ceil($(this).text()/7) + '/day' + $(this).text() + '.html" target="_blank">' + $(this).text() + '</a>');
                    } 
          	});		          	
		},
		error: function(request, errorType, errorMsg){
			$("#loadWords").hide();
		}			
	})		
})