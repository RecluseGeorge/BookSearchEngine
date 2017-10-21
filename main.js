$(document).ready(function(){$("#query").on("keypress",function(e){if(e.keyCode == 13){search(this.value);}});});

function search(book_name){
	if(book_name != ""){
		all_links = [];
		book_name = book_name + " pdf";
		$("#res").html("");
		for(var j=0;j<=4;j++){
			$.ajax({type:"GET",url:"https://www.google.com/search?q="+encodeURIComponent(book_name)+"&start="+(j*10),dataType:"html",success:function(result){
				var links = $(result).find("a");
				for(var i=0;i<=links.length-1;i++){
					if(links[i].href != "javascript:;" && links[i].href.indexOf("file:///") < 0 && links[i].href.indexOf("google.co.in") < 0 && links[i].href.indexOf("google.com") < 0 && links[i].href.indexOf("javascript:void(0)") < 0 && links[i].href.indexOf("blogger.com") < 0 && links[i].href.indexOf("youtube.com") < 0 && links[i].href != "" && links[i].href.indexOf("webcache.googleusercontent.com") < 0){
							var name = decodeURIComponent(links[i].href.substring(links[i].href.lastIndexOf('/')+1));
							var link = links[i].href;
							console.log(link.substr(link.length-3));
							if(link.substr(link.length-3) == "pdf"){
								var htmlpanel = '<div class="twPc-div magnet-panel" align="center" style="word-wrap:break-word;"><div><div class="twPc-divUser"><div class="twPc-divName"><a href="'+link+'">'+name+'</a></div></div><div class="twPc-divStats"></div></div></div>';
								$("#res").html($("#res").html()+htmlpanel);
							}
					}
				}
			}});
		}

		for(var j=0;j<=4;j++){
			$.ajax({type:"GET",url:"https://archive.org/search.php?query="+encodeURIComponent(book_name)+"&page="+j,dataType:"html",success:function(result){
				var links = $(result).find("a");
				for(var i=0;i<=links.length-1;i++){
					if(typeof ($(links[i]).attr("data-event-click-tracking")) != 'undefined'){
						if( $(links[i]).attr("data-event-click-tracking").indexOf("ItemTile") >= 0){
							var name = links[i].title;
							var link = links[i].href.replace("file:///D:","https://archive.org");
							$.ajax({type:"GET",url:link,dataType:"html",success:function(result){
								var slinks = $(result).find("a");
								for(var k=0;k<=slinks.length-1;k++){
									console.log(slinks[k].href.replace("file:///D:","https://archive.org").substr(slinks[k].href.replace("file:///D:","https://archive.org").length-3));
									if(slinks[k].href.replace("file:///D:","https://archive.org").substr(slinks[k].href.replace("file:///D:","https://archive.org").length-3) == "pdf"){
										if(all_links.indexOf(slinks[k].href.replace("file:///D:","https://archive.org")) < 0){
											all_links.push(slinks[k].href.replace("file:///D:","https://archive.org"));
											var htmlpanel = '<div class="twPc-div magnet-panel" align="center" style="word-wrap:break-word;"><div><div class="twPc-divUser"><div class="twPc-divName"><a href="'+slinks[k].href.replace("file:///D:","https://archive.org")+'">'+decodeURIComponent(slinks[k].href.replace("file:///D:","https://archive.org").substring(slinks[k].href.replace("file:///D:","https://archive.org").lastIndexOf('/')+1))+'</a></div></div><div class="twPc-divStats"></div></div></div>';
											$("#res").html($("#res").html()+htmlpanel);
										}
									}
								}
							}});
						}
					}
				}
			}});
		}
	}
}