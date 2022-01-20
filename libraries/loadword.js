var fromWeek = parseInt($(".head").text().match(/\d+/)[0]);

$("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table tr").filter(function() {
    	var tr = $(this);
    	tr.hide();
    	var td = $(this).find("td");
    	td.each(function() {
    		var val = $(this).attr('data-search');
            if (val) {
                if (val.toString().toLowerCase().indexOf(value) > -1) {
                    tr.show();
                }
            }
    	})
    });
});

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

var week = fromWeek - 2, endWeek = fromWeek + 1; day = week*7-6, totalDay = 21;
$(".head b").append(" (Ôn lại những từ thuộc tuần " + week + " đến tuần " + fromWeek + ")");
var replacementFlag = true;

$('.tooltip-inner').css({
	"word-wrap" : "break-word",
	"text-align" : "left",
	"white-space" : "pre-line"
});

$('body').tooltip({
    selector: '.describe'
});

$("#loadWords").on("click", function(e){	
	topbar.config({
    autoRun      : false, 
    barThickness : 5,
    barColors    : {
      '0'        : 'rgba(26,  188, 156, .7)',
      '.3'       : 'rgba(41,  128, 185, .7)',
      '1.0'      : 'rgba(231, 76,  60,  .7)'
    },
    shadowBlur   : 5,
    shadowColor  : 'rgba(0, 0, 0, .5)',
    className    : 'topbar',
  })
  topbar.show();
  	
    var button = this;	
    var buttObj = $(this);
    buttObj.attr("disabled", true);
    if(replacementFlag){
    	buttObj.text(buttObj.text().replace('Load', 'Loading...'));
    	replacementFlag = false;
    }    

    while(localStorage.getItem(day) !== null) {
    		var prog = 1/totalDay;
    	
    		$("#table tbody").append(localStorage.getItem(day));
			
		    topbar.progress('+'+prog);

			day++;
			if((day - 1) % 7 == 0){
				week++;
			}   
			if(week == endWeek){
				$("#loadWords").hide();
				topbar.hide();
				return;
			}
    		
	}

	loadData();		
});

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
	        var tr = "<tr><th scope='row'><a href=\"../Tuan" + Math.ceil(day/7) + "/day" + day + ".html\" target=\"_blank\">" + day + "</a></th>";
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
	        			preT = '<td><u class="describe" style="text-decoration: none; border-bottom: 3px solid #d61010;" data-toggle="tooltip" data-placement="bottom" title="'+relatedWords.join(", ")+'">';
	        			endT = '</u></td>';
	        		}
	        		//edit
        			relatedWords.push(trows[ j ].children[0].innerText);
        			preT = preT.replace("<td>", "<td data-search=\""+relatedWords+"\">");
	        		//trows[j] tuong duong 1 line tr new word, moi trows[j] gom 4 children
	        		tr = tr.concat(preT +trows[ j ].children[0].innerText + endT);
	        	} else{
	        		tr = tr.concat("<td></td>");
	        	}
	        }
	        tr = tr.concat("</tr>");
	        localStorage.setItem(day, tr);
	        $("#table tbody").append(tr);
	        var prog = 1/totalDay;
	        topbar.progress('+'+prog);
	        day++;
			if((day - 1) % 7 == 0){
				week++;
			}   			
			if(week == endWeek){
				$("#loadWords").hide();
				topbar.hide();
			} else{
				loadData();
			}		          	
		},
		error: function(request, errorType, errorMsg){
			$("#loadWords").hide();
			topbar.hide();
		}			
	});
}