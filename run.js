var menu = new Vue({
  el: '#menu',
  data: {
    items: [
      { text : 'Info', ico : 'fa-info-circle' },
      { text : 'Tv', ico : 'fa-television' },
      { text : 'Manual', ico : 'fa-file-text-o' }
    ]
  }
});


$(function(){
	$("a.link").click(function(){return false;});
	$(document).on("mousedown",".tab_time > li > a",function(){
		var ele = $(this).parent();
		if (ele.hasClass("on")==false){
			var idx = $(".tab_time").find("li").index(ele);
			ele.parent().find("li").removeClass("on");
			ele.addClass("on");
			$(".direction_time").addClass("none");
			$(".direction_time").eq(idx).removeClass("none");
		}
	});

	$(document).on("mousedown",".menu > .item",function(){
		var idx = $(this).parent().find(".item").index(this);
		$(".smenu > .item").addClass("none");
		$(".smenu > .item").eq(idx).removeClass("none");
		$(".menu").addClass("none");
		$(".smenu").removeClass("none");
	});

	$(document).on("mousedown",".smenu:not(.pos) > .item > .tit > .back",function(){
		var idx = $(this).parent().parent().parent().find(".item").index($(this).parent().parent());
		$(".smenu > .item").addClass("none");
		$(".menu").removeClass("none");
	});

	$(document).on("mousedown",".pos > .active > .tit > .back",function(){
		var idx = $(this).parent().parent().parent().find(".item").index($(this).parent().parent());
		$(".page > .con").html('').addClass("none");
		$(".smenu").removeClass("pos");
		$(".smenu > .item").removeClass("active");
	});

	$(document).on("mousedown",".smenu > .item > .det > .link",function(){
		var ele = $(this);
		var lnk = $(this).attr("href");
		$.get(lnk,function(data){
			ele.parent().parent().parent().addClass("pos");
			ele.parent().parent().addClass("active");
			if (/(\.htm|\.html)/.test(lnk)){
				$(".page > .con").html('').append(data);
			}else {
				con = data.replace(/(\n)/g,'<br />');
				$(".page > .con").html('').append('<div class="txt">'+con+'</div>');
			}
			
			$(".page > .con").removeClass("none");
		});
	});

});