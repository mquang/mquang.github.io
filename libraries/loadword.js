var fromWeek = parseInt($(".head").text().match(/\d+/)[0]);

$("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

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
	            trows, i, j, k, end;

	        trows = response.find('#m tbody tr');
	        end = trows.length;
	        var tr = "<tr><th scope='row'>"+day+"</th>";
	        var preT, endT;
	        for (j = 0; j < 12; j++) {
	        	if(trows[ j ] != undefined){
	        		preT = "<td>";
	        		endT = "</td>";
	        		var hasRelatedWord = false, relatedWords = [];
	        		//so luong children trong phan nghia (moi the li, div, image, video la 1 children)
	        		//console.log(trows[ j ].children[3].children.length);
	        		//lap qua cac the cua phan noi dung
	        		for(k = 0; k < trows[ j ].children[3].children.length; k++ ) {
	        			//neu the do dc gan class la "note"
		        		if( trows[ j ].children[3].children[k].className == "note"){
		        			hasRelatedWord = true;
		        			var relatedWord = trows[ j ].children[3].children[k].innerText;
			        		relatedWord = relatedWord.substring(getPosition(relatedWord, ")", 1) + 2, relatedWord.indexOf(":"));
		        			relatedWords.push(relatedWord);
		        		}
	        		}
	        		if(hasRelatedWord){
	        			preT = '<td><u style="text-decoration: none; border-bottom: 3px solid #d61010;" title="'+relatedWords+'">';
	        			endT = '</u></td>';
	        		}
	        		//trows[j] tuong duong 1 line tr new word, moi trows[j] gom 4 children
	        		tr = tr.concat(preT +trows[ j ].children[0].innerText + endT);
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