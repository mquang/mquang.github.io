function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

var week = 1, endWeek = 85; day = week*7-6, totalDay = endWeek * 7;
$(".head b").append("Tổng hợp toàn bộ danh sách các từ vựng từ tuần " + week + " đến tuần " + endWeek);
var replacementFlag = true;
var oTable = $("#table").DataTable({
	// 'l' - Length changing
	// 'f' - Filtering input
	// 't' - The table!    
	// 'i' - Information //showing x to y of z entries
	// 'p' - Pagination
    // 'r' - pRocessing
	dom: 'tp',   //just want to show 't', 'p' (discard 'f' which is showed by default)
	"language": {
		"emptyTable": "Chưa có dữ liệu - <button id=\"loadWords\" class=\"btn btn-info btn-sm\">Tải dữ liệu</button>",
		"zeroRecords": "Không có kết quả nào khớp với từ tìm kiếm",
	    "paginate": {
	      "previous": "Trang trước",
	      "next": "Trang sau"
	    }
	},
	"ordering": true,
    columnDefs: [{
      orderable: false,
      targets: "no-sort"
    }]
});

var oSettings = oTable.settings();
var myTable = $("#table").dataTable().api();

var relatedTdTexts = [];

$("#custom-search").on("keyup", function() {
    relatedTdTexts = [];
    var valueSearch = $(this).val().toLowerCase();   
    if(valueSearch == "") {
        oTable.search("", true, false).draw();
        $("#btn-exp-more").show();
        $('#explainSearch').hide();
        return;
    }
    var searchableTexts = [];
    var explainSearch = [];
    
    oTable.rows().every(function(){  
        var row = this; 	
        $(this.node()).find('td').each(function(){
            var dataSearch = $(this).attr('data-search');   
            if (dataSearch) {
                if (dataSearch.toString().toLowerCase().indexOf(valueSearch) > -1) {
                    var tdText = $(this).context.innerText;
                    searchableTexts.push(tdText);

                    //explain search
                    var title =  "";
                    var titArr = dataSearch.split(",");
                    for(var i = 0; i < titArr.length; i++) {
                        if(titArr[i].indexOf(valueSearch) > -1) {
                            title = titArr[i];
                            break;
                        }
                    }

                    if(title != "" && tdText.indexOf(title) <= - 1 && tdText.indexOf(valueSearch) <= - 1) { 
                        title = title.replace(valueSearch, "<u>" + valueSearch + "</u>");
                        //explainSearch.push("Dòng chứa <b>" + tdText + "</b> do tìm kiếm theo <b>" + title + "</b>");
                        explainSearch.push({'tdText': tdText, 'valueSearch': title});
                    }	
                }
            }
        });
    });

    var explainText = "";
    for(var i = 0; i < explainSearch.length; i++) {
        //explainText += "<li>" + explainSearch[i] + "</li>";
        explainText += "<li>Dòng chứa <b>" + explainSearch[i].tdText + "</b> do tìm kiếm theo <b>" + explainSearch[i].valueSearch + "</b></li>";
        if (i == 5) {
            explainText += '<span id="dots">...</span><span id="exp-more">';
            
        } else if (i == explainSearch.length - 1) {
            explainText += '</span>';
        }
         
    }
    if(explainSearch.length > 0){
        relatedTdTexts = explainSearch;
        $('#explainSearch').show();
        $('#explainSearch .panel-body .content').html(explainText);
    } else {
        $('#explainSearch').hide();
    }
    if(explainSearch.length <= 5){
        $("#btn-exp-more").hide();
    } else {
        $("#btn-exp-more").show();
    }

    //search(dataSearch, treatAsRegex, useSmartSearch)
    //smart search matches words in any position and in any order in the table
    /*  dataSearch: mon
        col1     col2
        ..m..    ..on..  (matched)
    */
    oTable.search(valueSearch + (searchableTexts.join("|").length > 0 ? "|" + searchableTexts.join("|") : ""), true, false).draw();    
});

oTable.on('draw', function () {
    var body = $(oTable.table().body());
    body.unhighlight();
    body.highlight($("#custom-search").val().trim().toLowerCase());  
    for(let i = 0; i < relatedTdTexts.length; i++) {
        body.highlight(relatedTdTexts[i].tdText); 
    }  
});

function showMoreExp() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("exp-more");
    var btnText = document.getElementById("btn-exp-more");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Hiển thị thêm";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Ẩn bớt";
      moreText.style.display = "contents";
    }
}

$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
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

    var ver = localStorage.getItem("version");
    if(ver != version) {
    	localStorage.clear();
    	localStorage.setItem("version", version);
    }

    while(localStorage.getItem(day)) {
    		var prog = 1/totalDay;
    	
    		rowElem = document.createElement("tr");
			rowElem.innerHTML = localStorage.getItem(day);
			myTable.row.add(rowElem);
			myTable.draw();
			
		    topbar.progress('+'+prog);

			day++;
			if((day - 1) % 7 == 0){
				week++;
			}   
			if(week == (endWeek + 1)){
				$("#loadWords").hide();
				topbar.hide();
				return;
			}   		
	}

    var map = {};	
    var requests = [];
    for(let i = day; i <= totalDay; i++) {
    	if(i > day && (i - 1) % 7 == 0){
			week++;
		}  
    	var url = "https://raw.githubusercontent.com/mquang/mquang.github.io/master/Tuan"+week+"/day"+i+".html";
    	requests.push($.ajax({
		      url: url,
		      dataType: "html",
			  method: "GET",
		      success: function(data) {
		      	var response = $('<html />').html(data),
	            trows, j, k, end;

		        trows = response.find('#m tbody tr');
		        end = trows.length;
		        var tr = "<tr><th scope='row'><a href=\"../Tuan" + Math.ceil(i/7) + "/day" + i + ".html\" target=\"_blank\">" + i + "</a></th>";
		        var preT, endT;
		        for (j = 0; j < 12; j++) {
		        	//trows[j] tuong duong 1 line tr new word, moi trows[j] gom 4 cot (4 children)
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

	        			relatedWords.push(trows[ j ].children[0].innerText);
	        			preT = preT.replace("<td>", "<td data-search=\""+relatedWords+"\">");
		        		
		        		tr = tr.concat(preT +trows[ j ].children[0].innerText + endT);
		        	} else{
		        		tr = tr.concat("<td data-search='0'></td>");
		        	}
		        }
		        tr = tr.concat("</tr>");
		        localStorage.setItem(i, tr);
		        rowElem = document.createElement("tr");
	    		rowElem.innerHTML = tr;
		        myTable.row.add(rowElem).draw(false).node();
		        myTable.page('last').draw(false);
		        var prog = 1/totalDay;
		        topbar.progress('+'+prog);
		        if(i == totalDay){
					$("#loadWords").hide();
					topbar.hide();
				}
			},
			error: function(request, errorType, errorMsg){
				$("#loadWords").hide();
				topbar.hide();
			}	
		}));
    }
});
