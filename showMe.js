/*
 * ShowMe.js V1 jeromax@gmail.com http://xig.fr/showMe/
 * TODO : zoom on image
 * */
var showMe_log=false;



/* Color Thief v2.0 by Lokesh Dhakar - http://www.lokeshdhakar.com */
var CanvasImage=function(e){this.canvas=document.createElement("canvas");this.context=this.canvas.getContext("2d");document.body.appendChild(this.canvas);this.width=this.canvas.width=e.width;this.height=this.canvas.height=e.height;this.context.drawImage(e,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)};CanvasImage.prototype.update=function(e){this.context.putImageData(e,0,0)};CanvasImage.prototype.getPixelCount=function(){return this.width*this.height};CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)};CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};ColorThief.prototype.getColor=function(e,t){var n=this.getPalette(e,5,t);var r=n[0];return r};ColorThief.prototype.getPalette=function(e,t,n){if(typeof t==="undefined"||t<2||t>256){t=10}if(typeof n==="undefined"||n<1){n=10}var r=new CanvasImage(e);var i=r.getImageData();var s=i.data;var o=r.getPixelCount();var u=[];for(var a=0,f,l,c,h,p;a<o;a=a+n){f=a*4;l=s[f+0];c=s[f+1];h=s[f+2];p=s[f+3];if(p>=125){if(!(l>250&&c>250&&h>250)){u.push([l,c,h])}}}var d=MMCQ.quantize(u,t);var v=d?d.palette():null;r.removeCanvas();return v};ColorThief.prototype.getColorFromUrl=function(e,t,n){sourceImage=document.createElement("img");var r=this;sourceImage.addEventListener("load",function(){var i=r.getPalette(sourceImage,5,n);var s=i[0];t(s,e)});sourceImage.src=e};ColorThief.prototype.getImageData=function(e,t){xhr=new XMLHttpRequest;xhr.open("GET",e,true);xhr.responseType="arraybuffer";xhr.onload=function(e){if(this.status==200){uInt8Array=new Uint8Array(this.response);n=uInt8Array.length;binaryString=new Array(n);for(var n=0;n<uInt8Array.length;n++){binaryString[n]=String.fromCharCode(uInt8Array[n])}data=binaryString.join("");base64=window.btoa(data);t("data:image/png;base64,"+base64)}};xhr.send()};ColorThief.prototype.getColorAsync=function(e,t,n){var r=this;this.getImageData(e,function(e){sourceImage=document.createElement("img");sourceImage.addEventListener("load",function(){var e=r.getPalette(sourceImage,5,n);var i=e[0];t(i,this)});sourceImage.src=e})};if(!pv){var pv={map:function(e,t){var n={};return t?e.map(function(e,r){n.index=r;return t.call(n,e)}):e.slice()},naturalOrder:function(e,t){return e<t?-1:e>t?1:0},sum:function(e,t){var n={};return e.reduce(t?function(e,r,i){n.index=i;return e+t.call(n,r)}:function(e,t){return e+t},0)},max:function(e,t){return Math.max.apply(null,t?pv.map(e,t):e)}}}var MMCQ=function(){function i(t,n,r){return(t<<2*e)+(n<<e)+r}function s(e){function r(){t.sort(e);n=true}var t=[],n=false;return{push:function(e){t.push(e);n=false},peek:function(e){if(!n)r();if(e===undefined)e=t.length-1;return t[e]},pop:function(){if(!n)r();return t.pop()},size:function(){return t.length},map:function(e){return t.map(e)},debug:function(){if(!n)r();return t}}}function o(e,t,n,r,i,s,o){var u=this;u.r1=e;u.r2=t;u.g1=n;u.g2=r;u.b1=i;u.b2=s;u.histo=o}function u(){this.vboxes=new s(function(e,t){return pv.naturalOrder(e.vbox.count()*e.vbox.volume(),t.vbox.count()*t.vbox.volume())})}function a(n){var r=1<<3*e,s=new Array(r),o,u,a,f;n.forEach(function(e){u=e[0]>>t;a=e[1]>>t;f=e[2]>>t;o=i(u,a,f);s[o]=(s[o]||0)+1});return s}function f(e,n){var r=1e6,i=0,s=1e6,u=0,a=1e6,f=0,l,c,h;e.forEach(function(e){l=e[0]>>t;c=e[1]>>t;h=e[2]>>t;if(l<r)r=l;else if(l>i)i=l;if(c<s)s=c;else if(c>u)u=c;if(h<a)a=h;else if(h>f)f=h});return new o(r,i,s,u,a,f,n)}function l(e,t){function v(e){var n=e+"1",r=e+"2",i,s,o,c,h,p=0;for(l=t[n];l<=t[r];l++){if(a[l]>u/2){o=t.copy();c=t.copy();i=l-t[n];s=t[r]-l;if(i<=s)h=Math.min(t[r]-1,~~(l+s/2));else h=Math.max(t[n],~~(l-1-i/2));while(!a[h])h++;p=f[h];while(!p&&a[h-1])p=f[--h];o[r]=h;c[n]=o[r]+1;return[o,c]}}}if(!t.count())return;var n=t.r2-t.r1+1,r=t.g2-t.g1+1,s=t.b2-t.b1+1,o=pv.max([n,r,s]);if(t.count()==1){return[t.copy()]}var u=0,a=[],f=[],l,c,h,p,d;if(o==n){for(l=t.r1;l<=t.r2;l++){p=0;for(c=t.g1;c<=t.g2;c++){for(h=t.b1;h<=t.b2;h++){d=i(l,c,h);p+=e[d]||0}}u+=p;a[l]=u}}else if(o==r){for(l=t.g1;l<=t.g2;l++){p=0;for(c=t.r1;c<=t.r2;c++){for(h=t.b1;h<=t.b2;h++){d=i(c,l,h);p+=e[d]||0}}u+=p;a[l]=u}}else{for(l=t.b1;l<=t.b2;l++){p=0;for(c=t.r1;c<=t.r2;c++){for(h=t.g1;h<=t.g2;h++){d=i(c,h,l);p+=e[d]||0}}u+=p;a[l]=u}}a.forEach(function(e,t){f[t]=u-e});return o==n?v("r"):o==r?v("g"):v("b")}function c(t,i){function v(e,t){var r=1,i=0,s;while(i<n){s=e.pop();if(!s.count()){e.push(s);i++;continue}var u=l(o,s),a=u[0],f=u[1];if(!a){return}e.push(a);if(f){e.push(f);r++}if(r>=t)return;if(i++>n){return}}}if(!t.length||i<2||i>256){return false}var o=a(t),c=1<<3*e;var h=0;o.forEach(function(){h++});if(h<=i){}var p=f(t,o),d=new s(function(e,t){return pv.naturalOrder(e.count(),t.count())});d.push(p);v(d,r*i);var m=new s(function(e,t){return pv.naturalOrder(e.count()*e.volume(),t.count()*t.volume())});while(d.size()){m.push(d.pop())}v(m,i-m.size());var g=new u;while(m.size()){g.push(m.pop())}return g}var e=5,t=8-e,n=1e3,r=.75;o.prototype={volume:function(e){var t=this;if(!t._volume||e){t._volume=(t.r2-t.r1+1)*(t.g2-t.g1+1)*(t.b2-t.b1+1)}return t._volume},count:function(e){var t=this,n=t.histo;if(!t._count_set||e){var r=0,s,o,u,a;for(o=t.r1;o<=t.r2;o++){for(u=t.g1;u<=t.g2;u++){for(a=t.b1;a<=t.b2;a++){s=i(o,u,a);r+=n[s]||0}}}t._count=r;t._count_set=true}return t._count},copy:function(){var e=this;return new o(e.r1,e.r2,e.g1,e.g2,e.b1,e.b2,e.histo)},avg:function(t){var n=this,r=n.histo;if(!n._avg||t){var s=0,o=1<<8-e,u=0,a=0,f=0,l,c,h,p,d;for(c=n.r1;c<=n.r2;c++){for(h=n.g1;h<=n.g2;h++){for(p=n.b1;p<=n.b2;p++){d=i(c,h,p);l=r[d]||0;s+=l;u+=l*(c+.5)*o;a+=l*(h+.5)*o;f+=l*(p+.5)*o}}}if(s){n._avg=[~~(u/s),~~(a/s),~~(f/s)]}else{n._avg=[~~(o*(n.r1+n.r2+1)/2),~~(o*(n.g1+n.g2+1)/2),~~(o*(n.b1+n.b2+1)/2)]}}return n._avg},contains:function(e){var n=this,r=e[0]>>t;gval=e[1]>>t;bval=e[2]>>t;return r>=n.r1&&r<=n.r2&&gval>=n.g1&&gval<=n.g2&&bval>=n.b1&&bval<=n.b2}};u.prototype={push:function(e){this.vboxes.push({vbox:e,color:e.avg()})},palette:function(){return this.vboxes.map(function(e){return e.color})},size:function(){return this.vboxes.size()},map:function(e){var t=this.vboxes;for(var n=0;n<t.size();n++){if(t.peek(n).vbox.contains(e)){return t.peek(n).color}}return this.nearest(e)},nearest:function(e){var t=this.vboxes,n,r,i;for(var s=0;s<t.size();s++){r=Math.sqrt(Math.pow(e[0]-t.peek(s).color[0],2)+Math.pow(e[1]-t.peek(s).color[1],2)+Math.pow(e[2]-t.peek(s).color[2],2));if(r<n||n===undefined){n=r;i=t.peek(s).color}}return i},forcebw:function(){var e=this.vboxes;e.sort(function(e,t){return pv.naturalOrder(pv.sum(e.color),pv.sum(t.color))});var t=e[0].color;if(t[0]<5&&t[1]<5&&t[2]<5)e[0].color=[0,0,0];var n=e.length-1,r=e[n].color;if(r[0]>251&&r[1]>251&&r[2]>251)e[n].color=[255,255,255]}};return{quantize:c}}()

var showMe_A=new Array();
var showMe_prev=0;
var showMe_next=0;
var showMe_current=0;
var showMe_nbElement=0;
var showMe_rotation=0;
if(typeof showMe_backgroundColor==="undefined"){var showMe_backgroundColor='rgba(30,30,30,1)';}
if(typeof showMe_backgroundColorGradient==="undefined"){var showMe_backgroundColorGradient=false;}
if(typeof showMe_ambilight==="undefined"){var showMe_ambilight=false;}
if(typeof showMe_typeAmbilight==="undefined"){var showMe_typeAmbilight=1;}
if(typeof showMe_effect==="undefined"){var showMe_effect='slide';}
if(typeof showMe_opacity==="undefined"){var showMe_opacity='1';}
if(typeof showMe_speedEffect==="undefined"){var showMe_speedEffect='200';}//millisecondes
var showMe_visibleFace=1;
var showMe_width;
var showMe_logTexte='';
function showMe(pSelecteur){
	ecrireLog('Initialisation...');
	var i=0;
	$(pSelecteur).each(function(){
		$(this).attr('showMe_id',i);
		showMe_A[i]=new Array();
		showMe_A[i]['title']=(($(this).attr('title')!=undefined) ? $(this).attr('title') : '');
		showMe_A[i]['href']=$(this).attr('href');
		showMe_A[i]['bg']='';
		if(!showMe_ambilight){showMe_A[i]['bg']=showMe_backgroundColor;}
		var href=$(this).attr('href').toLowerCase();
		if(href.endsWith('.mp4')){
			showMe_A[i]['type']='vid';
			showMe_A[i]['html']='<video id="showMe_elem'+i+'" controls preload="metadata" poster="" src="'+showMe_A[i]['href']+'" style="">';
			showMe_A[i]['html']+='Your browser don\'t know how to play this video (ouh le nul!)'
			showMe_A[i]['html']+='</video>';
		}else if(href.endsWith('showme_html')){
			showMe_A[i]['type']='html';
			showMe_A[i]['html']='<div id="showMe_elem'+i+'" class="showMe_html">';
			showMe_A[i]['html']+=$('#'+$(this).attr('data-showMeRel'))[0].outerHTML;
			showMe_A[i]['html']+='</div>';
		}else if(href.endsWith('.pdf')){
			showMe_A[i]['type']='pdf';
			showMe_A[i]['html']='<object id="showMe_elem'+i+'" data="'+showMe_A[i]['href']+'" type="application/pdf" height="100%" width="100%">';
			showMe_A[i]['html']+='<p>This browser does not support PDFs.</p>';
			showMe_A[i]['html']+='</object>';
		}else if((href.endsWith('.jpg'))||(href.endsWith('.jpeg'))||(href.endsWith('.gif'))||(href.endsWith('.png'))||(href.endsWith('.webp'))){// c'est une image
			showMe_A[i]['type']='img';
			showMe_A[i]['html']='<img id="showMe_elem'+i+'" src="'+showMe_A[i]['href']+'">';
		}else{//open in iframe
			showMe_A[i]['type']='iframe';
			showMe_A[i]['html']='<iframe id="showMe_elem'+i+'" style="width:90%;height:90%;" src="'+showMe_A[i]['href']+'">Loading...</iframe>';
		}
		i+=1;
	})
	showMe_nbElement=showMe_A.length;
	ecrireLog(showMe_nbElement+' élément trouvés');

	$('body').append('<div id="showMe_temp" style="display:none;"></div>')
	$(pSelecteur).on("click", function (event){
		event.preventDefault();
		var num=$(event.target).attr('showMe_id');
		if(num==undefined){
			num=$(event.target).parent().attr('showMe_id');
		};
		showMe_current=parseInt(num);
		showMe_afficher();
	    return false;
	});
	$(pSelecteur).on("mouseover", function (event){
		var num=$(event.target).attr('showMe_id');
		if(num==undefined){
			num=$(event.target).parent().attr('showMe_id');
		};
		if((showMe_A[num]['type']=='img')||(showMe_A[num]['type']=='pdf')||(showMe_A[num]['type']=='vid')||(showMe_A[num]['type']=='iframe')){
			$('#showMe_temp').html(showMe_A[num]['html']);
		}
		return false;
	});
	var hash=window.location.hash.substr(1);
	if((hash!='')&&(hash.substring(0,6)=='showMe')){
		hash=parseInt(hash.substring(6));
		if((hash<showMe_nbElement)&&(hash>=0)){
			showMe_current=hash;
			calculPrevNext();
			ecrireLog('Affichage en plein écran...');
			showMe_afficher();//affichage en plein écran d'une photo particulière dès le démarrage
		}
	}else if(showMe_A.length>0){//on charge le premier élément
		ecrireLog('Chargement du 1er élément potentiel...');
		$('#showMe_temp').html(showMe_A[0]['html']);
	}
}
var colorThief = new ColorThief();
function showMe_afficher(){
	if(!$('#showMe_FS').length>0){//première fois que la fonctionnalité est appelée
		ecrireLog('Création de l\'affichage...');
		var html='';
		html+='<style>';
		html+='#showMe_FS {perspective:1200px;z-index:1000;border:0;margin:0;left:0;top:0;top:0;width:100%;height:100%;position:fixed;background-color:#222;opacity:'+showMe_opacity+';text-align:center;}';
		html+='#showMe_FS *{border:0;margin:0;font-family:\'Arial Black\',Gadget,sans-serif;}';
		html+='#showMe_list{width:300%;height:100%;list-style-type:none;padding:0;margin:0;margin-left:-100%;}';
		html+='#showMe_list li{float:left;position:relative;display:flex!important;align-items:center;padding:0;margin:0;text-align:center!important;vertical-align:middle;}';
		html+='#showMe_list li>*{border-radius:7px;margin-left:auto;margin-right:auto;max-width:98%;max-height:98%;box-shadow:4px 4px 20px #000;vertical-align:middle;}';
		html+='#showMe_info{position:fixed;bottom:5px;background-color:transparent;color:#fff;z-index:10001;width:100%;text-shadow:0 1px 2px #000;font-size:1.5em;}';
		html+='.showMe_bgImg{}';

		html+='.showMe_navigation{position:absolute;display:flex;align-items:center;top:0;width:30px;height:100%;z-index:1000;padding:20px;text-shadow:0 0 1px #000000;transition:0.2s all;color:#fff;font-size:3em;cursor:pointer;text-shadow:0 0 2px #000;opacity:0.1;}';
		html+='.showMe_navigation:hover{opacity:1;transition:0.1s all;}';
		html+='.showMe_html>*{display:block!important;}';
		html+='.ms-touch.slider{overflow-x:scroll;overflow-y:hidden;-ms-overflow-style:none;-ms-scroll-chaining: none;-ms-scroll-snap-type: mandatory;-ms-scroll-snap-points-x: snapInterval(0%, 100%);}';
		html+='.animate{transition: transform 0.3s ease-out;}';
		if(showMe_effect=='cube'){
			html+='#showMe_list{position:relative!important;width:100%!important;height:100%!important;margin-left:0!important;;transform-style:preserve-3d!important;transition:all '+(showMe_speedEffect/1000)+'s;}';
			html+='#showMe_list li{clear:both;display:block;position:absolute!important;display:block;width:100%!important;height:100%!important;opacity:1;}';
			html+='#showMe_0{transform: rotateY(-90deg) translateX(-100%);transform-origin: center left;}';
			html+='#showMe_1{}';
			html+='#showMe_2{transform: rotateY(90deg) translateX(100%);transform-origin:top right;}';
			html+='#showMe_3{transform:translateZ(-100%) rotateY(180deg);}';
		}
		html+='</style>';
		html+='<div id="showMe_FS">'
		html+='<div id="showMe_background"></div>';
		html+='<ul id="showMe_list"><li id="showMe_0"></li><li id="showMe_1"></li><li id="showMe_2"></li>';
		if(showMe_effect=='cube'){
			html+='<li id="showMe_3"></li>';
		}
		html+='</ul>';
		html+='<div id="showMe_info"></div>';
		if(showMe_A.length>1){
			html+='<div id="showMe_toLeft" class="showMe_navigation" style="left:0;">&lt;</div>';
			html+='<div id="showMe_toRight" class="showMe_navigation" style="right:0;flex-direction:row-reverse;">&gt;</div>';
		}
		html+='<div id="showMe_close" class="showMe_navigation" style="font-size:2em;right:0;top:0;height:50px;flex-direction:row-reverse;">X</div>';
		html+='</div>'
		$('body').append(html);
		showMe_width=window.innerWidth;
		$('#showMe_FS,#showMe_FS li').css('width',showMe_width);
		$('#showMe_FS,#showMe_FS li').css('height',window.innerHeight);
		$(document).on("click",'#showMe_close',function(event){$('#showMe_FS').hide();actionOnElement(showMe_current,'disabled');showMe_sortirFullScreen();window.location.href='#';});
		$(document).on("keyup",'body',function(event){
			if(showMe_A.length>1){
				if(event.keyCode==37){showMe_effetAfficher(showMe_effect,'left');}
				if(event.keyCode==39){showMe_effetAfficher(showMe_effect,'right');}
			}
			if(event.keyCode==27){$('#showMe_FS').hide();actionOnElement(showMe_current,'disabled');showMe_sortirFullScreen();window.location.href='#';}
		});
		$(document).on("click",'#showMe_toLeft',function(event){showMe_effetAfficher(showMe_effect,'left');});
		$(document).on("click",'#showMe_toRight',function(event){showMe_effetAfficher(showMe_effect,'right');});
		showMe_entrerFullScreen();
		addTouchScroll();		
	}else{
		$("#showMe_list li:nth-child(2)").html('');
		$('#showMe_FS').show();
	}
	$('#showMe_temp').html('');//pour éviter l'impossibilité de l'arrêt de la vidéo lorsqu'on quitte le plein écran
	calculPrevNext();
	$("#showMe_list li:nth-child(2)").html(showMe_A[showMe_current]['html']);
	$("#showMe_list li:first").html(showMe_A[showMe_prev]['html']);
	showMe_effetAfficher('','');//aucun effet
	actionOnElement(showMe_current,'enabled');
	setAmbilightElement(showMe_current,"#showMe_list li:nth-child(2)");
	setAmbilightElement(showMe_prev,"#showMe_list li:first");
	if(showMe_effect=='cube'){
		$('#showMe_3').css('transform','translateZ(-'+$('#showMe_list').width()+'px) rotateY(180deg)');
		$('#showMe_list').css('transform-origin','center center -'+($('#showMe_list').width()/2)+'px');
		$("#showMe_3").html(showMe_A[showMe_next]['html']);
		setAmbilightElement(showMe_next,"#showMe_3");
	}else{
		$("#showMe_list li:last").html(showMe_A[showMe_next]['html']);
		setAmbilightElement(showMe_next,"#showMe_list li:last");
	}
	
	return false;
}
function showMe_effetAfficher(pTypeEffect,pDirection){
	if(pDirection=='left'){
		showMe_current=showMe_prev;
	}else if(pDirection=='right'){
		showMe_current=showMe_next;
	}
	ecrireLog('Affichage de l\'élément '+showMe_A[showMe_current]['title']+'...');
	calculPrevNext();
	window.location.href='#showMe'+showMe_current;
	$('#showMe_info').html(showMe_A[showMe_current]['title']+' <span style="font-size:0.5em;">'+(showMe_current+1)+'/'+showMe_nbElement+'</span>');//+showMe_prev+'/'+showMe_current+'/'+showMe_next
	var newElem=null;
	if(pTypeEffect=='fade'){
		if(pDirection=='left'){//fleche gauche
			$("#showMe_list li:nth-child(2)").fadeOut(showMe_speedEffect,function(){
					$("#showMe_list").find("li:first").before($("#showMe_list").find("li:last"));
					$("#showMe_list li:first").html(showMe_A[showMe_prev]['html']);
					setAmbilightElement(showMe_prev,"#showMe_list li:first");
					$(this).fadeIn(showMe_speedEffect);
				});
		}else{
			$("#showMe_list li:nth-child(2)").fadeOut(showMe_speedEffect,function(){
					$("#showMe_list").find("li:last").after($("#showMe_list").find("li:first"));
					$("#showMe_list li:last").html(showMe_A[showMe_next]['html']);
					setAmbilightElement(showMe_next,"#showMe_list li:last");
					$(this).fadeIn(showMe_speedEffect);
				});
		}
	}else if(pTypeEffect=='nothing'){
		if(pDirection=='left'){//fleche gauche
				$("#showMe_list").find("li:first").before($("#showMe_list").find("li:last"));
				$("#showMe_list li:first").html(showMe_A[showMe_prev]['html']);
				setAmbilightElement(showMe_prev,"#showMe_list li:first");
		}else{//fleche droite
				$("#showMe_list").find("li:last").after($("#showMe_list").find("li:first"));
				$("#showMe_list li:last").html(showMe_A[showMe_next]['html']);
				setAmbilightElement(showMe_next,"#showMe_list li:last");
		}
	}else if(pTypeEffect=='slide'){
		if(pDirection=='left'){//fleche gauche
			$("#showMe_list").animate({marginLeft:"0"},showMe_speedEffect,'linear',function(){
				$(this).css({marginLeft:"-100%"}).find("li:first").before($(this).find("li:last"));
				$("#showMe_list li:first").html(showMe_A[showMe_prev]['html']);
				setAmbilightElement(showMe_prev,"#showMe_list li:first");
				actionOnElement(showMe_current,'enabled');
				actionOnElement(showMe_next,'disabled');
			});
		}else{//fleche droite
			$("#showMe_list").animate({marginLeft:"-200%"},showMe_speedEffect,'linear',function(){
				$(this).css({marginLeft:"-100%"}).find("li:last").after($(this).find("li:first"));
				$("#showMe_list li:last").html(showMe_A[showMe_next]['html']);
				setAmbilightElement(showMe_next,"#showMe_list li:last");
				actionOnElement(showMe_current,'enabled');
				actionOnElement(showMe_prev,'disabled');
			});
		}
	}else if(pTypeEffect=='cube'){
		$("#showMe_list").css('transition','all '+(showMe_speedEffect/1000)+'s');
		if(pDirection=='left'){//fleche gauche
			showMe_rotation+=90;
			$("#showMe_list").css('transform','rotateY('+showMe_rotation+'deg)');
			$("#showMe_"+getOppositeFace()).html(showMe_A[showMe_prev]['html']);
			setAmbilightElement(showMe_prev,"#showMe_"+getOppositeFace());
			showMe_visibleFace--;
			if(showMe_visibleFace<0){showMe_visibleFace=3;}
		}else{//fleche droite
			showMe_rotation-=90;
			$("#showMe_list").css('transform','rotateY('+showMe_rotation+'deg)')
			$("#showMe_"+getOppositeFace()).html(showMe_A[showMe_next]['html']);
			setAmbilightElement(showMe_next,"#showMe_"+getOppositeFace());
			showMe_visibleFace++;
			if(showMe_visibleFace>3){showMe_visibleFace=0;}
		}
	}

}
function actionOnElement(pElem,pAction){
	if(showMe_A[pElem]['type']=='vid'){
		if($("#showMe_elem"+pElem).get(0)!=undefined){
			if(pAction=='enabled'){
				$("#showMe_elem"+pElem).get(0).currentTime = 0;
				$("#showMe_elem"+pElem).get(0).play();
			}else{
				$("#showMe_elem"+pElem).get(0).pause();
			}
		}
	}
}
function calculPrevNext(){
	if(showMe_current==0){
		showMe_prev=showMe_A.length - 1;
		showMe_next=1;
	}else if(showMe_current==showMe_A.length-1){
		showMe_prev=showMe_A.length-2;
		showMe_next=0;
	}else{
		showMe_prev=showMe_current-1;
		showMe_next=showMe_current+1;
	}
	if(showMe_prev<0){showMe_prev=0;}// cas où il y a moins de 3 images
	if(showMe_next>=showMe_A.length){showMe_next=showMe_A.length-1;}// cas où il y a moins de 3 images
}
function ecrireLog(pTexte){
	if(showMe_log){
		showMe_logTexte=pTexte+'<br>'+showMe_logTexte;
		$('#showMe_log').html(showMe_logTexte);
	}
}

function getOppositeFace(){
	if(showMe_visibleFace==0){return 2;}
	else if(showMe_visibleFace==1){return 3;}
	else if(showMe_visibleFace==2){return 0;}
	else if(showMe_visibleFace==3){return 1;}
}

function setAmbilightElement(pNum,pElement){
	ecrireLog('<b>Ajout Ambilight sur '+showMe_A[pNum]['title']+'...1</b>');
	if(showMe_typeAmbilight==1){
		setAmbilightElement1(pNum,pElement);
	}else if(showMe_typeAmbilight==2){
		setAmbilightElement2(pNum,pElement);
	}
}
function setAmbilightElement1(pNum,pElement){
	if(!$(pElement+'>div').length){
		$(pElement).prepend('<div></div>');
		var styles={
				width:'100%',
				height:'100%',
				zIndex:'-1',
				position:'fixed',
				backgroundAttachment:'fixed',
				backgroundPosition:'center center',
				backgroundSize:'cover',
				filter:'blur(200px)'
				};
		$(pElement+'>div').css(styles);
	}
	if(showMe_A[pNum]['type']=='img'){
		var styles={backgroundImage:'url("'+showMe_A[pNum]['href']+'")'};
	}else{
		var styles={backgroundColor:showMe_backgroundColor,backgroundImage:'none'};
	}
	$(pElement+'>div').css(styles);
	
}
function setAmbilightElement2(pNum,pElement){
	if(showMe_A[pNum]['bg']!=''){
		$(pElement).css('background',showMe_A[pNum]['bg']);
	}else{
		ecrireLog('<b>Ajout Ambilight sur '+showMe_A[pNum]['title']+'...1</b>');
		var bg=showMe_backgroundColor;
		if(showMe_ambilight&&(showMe_A[pNum]['type']=='img')){
			try{
				setTimeout(function(){setCSSBackground(pNum,pElement);},1000);
			}catch(err){
				ecrireLog('<b>Ajout Ambilight sur '+showMe_A[pNum]['title']+'...'+bg+'</b>');
				$(pElement).css('background',bg);
				//$(pElement+" img").load(function(){bg=setCSSBackground(pElement);});// ne fonctionne pas si c'est le href qui est remplacé
			}
		}else{
			$(pElement).css('background',showMe_backgroundColor);
			showMe_A[pNum]['bg']=showMe_backgroundColor;
		}
	}
}
function setCSSBackground(pNum,pElement){
	//ecrireLog('Ajout Ambilight sur '+pElement+'...');
	var color=colorThief.getColor($(pElement+" img")[0]);
	if(showMe_backgroundColorGradient){
		var bg='linear-gradient(0deg,'+showMe_backgroundColor+',rgba('+color+',1))'
	}else{
		var bg='rgba('+color+',1)'
	}
	$(pElement).css('background',bg);
	showMe_A[pNum]['bg']=bg;
	return bg;
}
// https://css-tricks.com/the-javascript-behind-touch-friendly-sliders/
// https://github.com/mdn/dom-examples/blob/master/pointerevents/Pinch_zoom_gestures.html
function addTouchScroll(){
	ecrireLog('Ajout du touchScroll...');
	if (navigator.msMaxTouchPoints) {//IE
		$('#showMe_list').addClass('ms-touch');
		$('#showMe_list').on('scroll', function() {
			$('#showMe_list li').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
		});
	}else{
		var slider = {
				el: {
					slider: $("#showMe_FS"),
					holder: $("#showMe_list"),
					imgSlide: $("#showMe_list li")
				},
				slideWidth: $('#showMe_1').width(),
				touchstartx: undefined,
				touchmovex: undefined,
				movex: undefined,
				touchInit:undefined,
				index: 0,
				longTouch: undefined,

				init: function() {
					this.bindUIEvents();
				},

				bindUIEvents: function() {
					this.el.holder.on("touchstart", function(event) {
						slider.start(event);
					});
					this.el.holder.on("touchmove", function(event) {
						slider.move(event);
					});
					this.el.holder.on("touchend", function(event) {
						slider.end(event);
					});
				},

				start: function(event) {
					this.touchInit=this.touchmovex=event.originalEvent.touches[0].pageX;
					this.touchstartx=this.touchInit-parseInt($("#showMe_list").css('marginLeft'));
				},

				move: function(event) {
					// Continuously return touch position.
					this.touchmovex =  event.originalEvent.touches[0].pageX;
					// Calculate distance to translate holder.
					this.movex = (this.touchmovex - this.touchstartx);
					if(showMe_effect=='cube'){
						this.el.holder.css('transition','none');
						var rotation=90*this.movex/showMe_width;
						this.el.holder.css('transform','rotateY('+(showMe_rotation+rotation)+'deg)');
					}else{
						this.el.holder.css('marginLeft',this.movex+'px');
					}
				},

				end: function(event) {
					var decalage=this.touchmovex-this.touchInit;
					if(Math.abs(decalage)>100){// on déplace
						if(decalage>0){// =fleche gauche
							showMe_current=showMe_prev;
							showMe_effetAfficher(showMe_effect,'left')
						}else{// =fleche droite
							showMe_current=showMe_next;
							showMe_effetAfficher(showMe_effect,'right')
						}
					}else{// retour à la position d'origine
						if(showMe_effect=='cube'){
							this.el.holder.css('transition','all '+(showMe_speedEffect/1000)+'s');
							this.el.holder.css('transform','rotateY('+(showMe_rotation)+'deg)');
						}else{
							this.el.holder.animate({marginLeft:"-"+showMe_width+"px"},showMe_speedEffect,'linear');
						}
					}
				}
		};
		slider.init();
	}
}

(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
function showMe_entrerFullScreen(){if(jQuery.browser.mobile){if(!document.fullscreenElement &&!document.mozFullScreenElement && !document.webkitFullscreenElement){if(document.documentElement.requestFullscreen){document.documentElement.requestFullscreen();}else if(document.documentElement.mozRequestFullScreen){document.documentElement.mozRequestFullScreen();}else if(document.documentElement.webkitRequestFullscreen){document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);}}}}
function showMe_sortirFullScreen(){if(document.cancelFullScreen){document.cancelFullScreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen();}}

$(document).ready(function(){
	if(showMe_log){
		$('body').append('<div id="showMe_log" style="position:fixed;top:0;right:0;z-index:1001;width:400px;color:#fff;text-align:left;padding:5px;border:2px #f00 solid;border-radius:5px;margin:5px;background-color:rgba(0,0,0,0.1);"></div>')
	}	showMe('.showMe');
});
$(window).resize(function() {
	showMe_width=window.innerWidth
	$('#showMe_FS,#showMe_FS li').css('width',showMe_width);
	$('#showMe_FS,#showMe_FS li').css('height',window.innerHeight);
	if(showMe_effect=='cube'){
		$('#showMe_FS li:nth-child(4)').css('transform','translateZ(-'+$('.cube').width()+'px) rotateY(180deg)');
		$('.cube').css('transform-origin','center center -'+($('.cube').width()/2)+'px');
	}
});

//window.addEventListener("error", function (e) {
   //alert("Error occured: " + e.error.message);//évite les problème lorsque l'image n'est pas chargée je pense
//   return false;
//})
