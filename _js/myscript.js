/* myscript */

var xmlData; //hold the xml file from the ajax call
var rowID;   //hold the user selection


$(document).on("pagecreate", "#home", function(){
	console.log("in doc on");
	
	$.ajax({
		type: "GET", url: "a2.xml", dataType: "xml", 
		success: function(xml){ 
			xmlData = xml; 
			buildmenu(xml, "a2"); 
		},
		error: function (e){ 
			alert(e.status + "-" + e.statusText);
		}
	});
});

function buildmenu(xml, title){
	
	var n=0;
	
	//title
	$("title").html($(xml).find("title").text());
	
	//header and footer
	$(".ui-title").html($(xml).find("title").text());
	$(".ui-footer").html("Name: " + $(xml).find("student").text() + "<br>" + 
						" Student ID: " + $(xml).find("student").attr("studentNumber") + "<br>" + 
							"Program: " + $(xml).find("student").attr("studentProgram")).css("padding", "5px");

	//navbar
	$(".ui-navbar").html("<ul id='navList'> " +
							"<li li-id='0'><a href='#individual'>" + $(xml).find("bookName").eq(0).text() + "</a></li>" +
								"<li li-id='1'><a href='#individual'>" + $(xml).find("bookName").eq(1).text() + "</a></li>" +
									"<li li-id='2'><a href='#individual'>" + $(xml).find("bookName").eq(2).text() + "</a></li>" +
										"<li li-id='3'><a href='#individual'>" + $(xml).find("bookName").eq(3).text() + "</a></li></ul>");
			
	//loop through <book> nodes
	$(xml).find("book").each(function(){
		//create the content for each book name on main page
		$("#bookLinks").append("<li li-id='" + n + "'><a href='#individual'>" + $(this).find("bookName").text() + "</a></li>");		
	n++;	
	}); //end of book loop	
	
	$("#bookLinks").listview("refresh"); 
	$("#navhome").navbar("destroy");
	$("#navhome").navbar();
} //end of buildmenu

//save user selection from list
$(document).on("click", "#bookLinks >li", function(){
	rowID = $(this).closest("li").attr("li-id");
	parseXML(xmlData, rowID);
});

//save user selection from nav bar
$(document).on("click", "#navList >li", function(){
	rowID = $(this).closest("li").attr("li-id");
	parseXML(xmlData, rowID);
}); 

//build individual page based on selection
function parseXML(xml, choice){
	
	
	$("#bookInfo").html("<div class='ui-grid-a'><div class='ui-block-a'>" +
					"<center><img src='" + $(xml).find("bookName:nth(" + choice + ")").attr("bookImage") + "'></a></center><br>" +
						"</div>" +
							"<div class='ui-block-b'>" +	
								"<div><a href='#home' class='ui-btn ui-corner-all'>Home</a></div>" +
									"<h1>" + $(xml).find("bookName:nth(" + choice + ")").text() + "</h1> " +
										"<p> Book Type: " + $(xml).find("bookPlot:nth(" + choice + ")").attr("bookType") + "<br><br>" +
											$(xml).find("bookPlot:nth(" + choice + ")").text() + "<br><br>" + 
												"Author: " + $(xml).find("bookAuthor:nth(" + choice + ")").text() + "<br>" +
													"Publisher: " + $(xml).find("bookPublisher:nth(" + choice + ")").text() + "<br>" +
														"Price: " + $(xml).find("bookPrice:nth(" + choice + ")").text() +
															"</p></div></div>");
																
	$("#bookInfo").append("<section class='ui-grid-a'><div class='ui-block-a' data-role='button'>" +
					"<a href='https://www.chapters.indigo.ca' class='ui-btn ui-corner-all'>Indigo</a></div>" +
						"<div class='ui-block-b' data-role='button'>" +	
							"<a href='#popup' class='ui-btn ui-corner-all' data-rel='dialog' data-transition='pop'>Rating</a>" +
								"</div></section>");
	//popup rating					
	$("#ratingInfo").html($(xml).find("bookRating:nth(" + choice + ")").text());	
									
}
