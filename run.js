window.addEventListener("load", function(event) {
	document.body.style.opacity = 1;
	let page = new Vue({
		el: '.page',
		data: {
			menu_none:false,
			smenu_none:true,
			smenu_pos:false,
			con_none:true,
			itm_active:false,
			items: [
				{title:'Info', ico:'fa-info-circle', selected:false, sub:[{title:'Metro', lnk:'./info/metro.htm'}]},
				{title:'Tv', ico:'fa-television', selected:false, sub:[{title:'Btv Content View', lnk:'./tv/Btv.m3u'},{title:'Btv File Download', down:'./tv/Btv.m3u'},{title:'Head end Btv Content View', lnk:'./tv/hdend_Btv.m3u'},{title:'Head end Btv File Download', down:'./tv/hdend_Btv.m3u'}]},
				{title:'Manual', ico:'fa-file-text-o', selected:false, sub:[{title:'Centos', lnk:'./man/centos.txt'},{title:'Apache', lnk:'./man/httpd.txt'},{title:'PHP', lnk:'./man/php.txt'},{title:'Git', lnk:'./man/git.txt'}]}
			]
		},
		methods: {
			smenu: function(idx){
				let obj = this.items;
				this.smenu_none = false;
				obj.forEach(function(val,key){
					obj[key].selected = false;
				});
				obj[idx].selected = true;
				this.menu_none = true;
			},
			back: function(){
				let obj = this.items;
				let con = this.$el.querySelector(".con");
				obj.forEach(function(val,key){
					obj[key].selected = false;
				});
				con.innerHTML = '';
				this.menu_none = false;
				this.smenu_none = true;
				this.smenu_pos = false;
				this.con_none = true;
				this.itm_active = false;
			},
			glnk: function(itm){
				let ret;
				if (typeof itm.lnk === 'undefined'){
					ret = itm.down;
				}else {
					ret = itm.lnk;
				}
				return ret;
			},
			slnk: function(event){
				let req = new XMLHttpRequest();
				let obj = this.$el.querySelector(".con");
				let lnk = event.target.getAttribute("href");
				axios({
					url: lnk,
					method: 'GET',
					responseType: 'TEXT',
				}).then((response) => {
					if (/(\.htm|\.html)/.test(lnk)){
						obj.innerHTML = response.data;

						let ltab = document.querySelectorAll(".link_tab");
						ltab.forEach(function(ele){
							ele.addEventListener('click', evt =>{							  
								let li = ele.closest('li');
								let nodes = Array.from(li.closest('ul').children);
								let index = nodes.indexOf(li);

								nodes.forEach(function(e){
									e.classList.toggle('on',false);
								});
								nodes[index].classList.toggle('on',true);
	
								document.querySelectorAll(".direction_time").forEach(function(e){
									e.classList.toggle('none',true);
								});
								document.querySelectorAll(".direction_time")[index].classList.toggle('none',false);
							});
						});

					}else {
						data = response.data;
						data = data.replace(/(<)/g,'&lt;');
						data = data.replace(/(>)/g,'&gt;');
						data = data.replace(/( )/g,'&nbsp;');
						data = data.replace(/(\t)/,'&nbsp; &nbsp; &nbsp;');
						data = data.replace(/(\n)/g,'<br />');
						obj.innerHTML = '<div class="text">' + data + '</div>';
					}
					this.menu_none = true;
					this.smenu_none = false;
					this.smenu_pos = true;
					this.con_none = false;
					this.itm_active = true;
				});
			},
			sdown: function(event){
				let lnk = event.target.getAttribute("href");
				let fileName = lnk.substring(lnk.lastIndexOf('/')+1,lnk.length);
				console.log(fileName);
				axios({
					url: lnk,
					method: 'GET',
					responseType: 'blob',
				}).then((response) => {
					let url = window.URL.createObjectURL(new Blob([response.data]));
					let link = document.createElement('a');
					link.href = url;
					link.classList.add('down');
					link.setAttribute('download', fileName);
					document.body.appendChild(link);
					link.click();
					document.removeChild('a');
				});
			},
			fhub: function(chk,event){
				console.log(event);
				if (typeof chk == "undefined") {
					this.slnk(event);
				}else {
					this.sdown(event);
				}
			}
		}
	})
});
