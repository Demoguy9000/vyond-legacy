var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function(e,g){var b=20,h=45,j=0.09,c={PAUSED:"paused",PLAYING:"playing",ENDED:"ended"},d=/Safari/,i=/Apple Computer/,a=200,k=10000,f=GT.gettext("Sorry, your video is taking longer than usual to load. <br> Please wait a moment.");var m;var n=function(o){this.viewportElem=o;this.videoPlayerWrapper=o.find(".video-player-wrapper");this.infoOverlayElem=o.find(".video-info");this.loadingOverlay=o.find("#video-loading");this.videoElem=o.find("#h5-player");this.controlElem=o.find("#player-control");this.videoDom=this.videoElem.get(0);this.videoLoaded=false;this.videoPlayStarted=false;this.isEditingVideoInfo=false;this.encryptedVideoId=this.infoOverlayElem.data("videoId");this.isVideoOwner=this.infoOverlayElem.data("isOwner");this.ownerId=this.infoOverlayElem.data("owner");this.videoDuration=this.infoOverlayElem.data("duration");this.initElements();this.initEventListeners()};n.prototype.initElements=function(){this.contextMenuElem=e("#context-menu");this.playbackButton=this.controlElem.find(".playback-button");this.seekBar=this.controlElem.find(".seek-bar");this.playedBar=this.seekBar.find(".played-bar");this.bufferedBar=this.seekBar.find(".buffered-bar");this.seekBarTooltip=this.seekBar.find(".time-tooltip");this.durationTooltip=this.seekBar.find(".duration-tooltip");this.volumeControlElem=this.controlElem.find(".volume-control");this.volumeIcon=this.volumeControlElem.find(".volume-icon");this.volumeSlider=this.volumeControlElem.find(".volume-slider");this.volumeSliderThumb=this.volumeSlider.find(".slider-thumb");this.volumeSliderValueBar=this.volumeSlider.find(".slider-track .track-value-bar");this.fullScreenButton=this.controlElem.find(".fullscreen-button");this.volumeSliderWidth=this.volumeSlider.width();this.unmuteVolume=1;this.mouseDownOnSeekBar=false;this.mouseDownOnVolumeSlider=false;this.pausedBeforeMouseDownOnSeekBar=true;this.durationTooltip.text(this.formatTime(this.videoDuration))};n.prototype.initEventListeners=function(){var o=this;this.contextMenuElem.on("contextmenu",function(p){p.preventDefault();o.closeContextMenu()});this.contextMenuElem.find(".click-disabler").on("mousedown click contextmenu",function(p){p.preventDefault();o.closeContextMenu()});this.contextMenuElem.find("[data-player-action]").on("click",function(p){o.closeContextMenu();switch(e(this).data("playerAction")){case"play":o.playbackHandler();break;case"copyUrl":o.copyToClipboard(videoCopyableUrl,p);break;case"copyEmbedCode":o.copyToClipboard(e("#embed_code_field").val(),p);break}});this.viewportElem.on("contextmenu",function(p){if(o.isEditingVideoInfo){return}o.contextMenuHandler(p)});e(document).on("scroll",function(p){if(o.contextMenuOpening===true){p.preventDefault();o.closeContextMenu()}});this.viewportElem.on("mouseenter",function(){if(o.videoPlayStarted&&!o.isEditingVideoInfo){o.showControls()}}).on("mouseleave",function(){if(o.videoPlayStarted&&!o.isEditingVideoInfo){o.hideControls()}}).on("webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenchange",function(){if(!(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement)){o.exitFullScreenHandler()}});this.videoPlayerWrapper.on("click",function(){if(!isUsingLegacyPlayer()){o.playbackHandler()}});this.videoElem.on("loadeddata",function(){o.videoLoaded=true}).on("ended",function(){o.setPlaybackButtonState(c.ENDED);o.videoPlayStarted=false;o.hideLoading();o.showControls()}).on("pause",function(){o.setPlaybackButtonState(c.PAUSED);o.infoOverlayElem.fadeIn(a)}).on("play",function(){o.setPlaybackButtonState(c.PLAYING);o.infoOverlayElem.hide();if(!o.videoPlayStarted){o.videoPlayStarted=true;o.videoElem.removeClass("hidden");o.durationTooltip.addClass("hidden")}}).on("playing",function(){o.hideLoading()}).on("waiting",function(){o.showLoading()});h5PlayerElem=this.videoElem;this.volumeSlider.on("mousedown",function(){o.mouseDownOnVolumeSlider=true});e(document).on("mouseup",function(){if(o.mouseDownOnSeekBar&&!o.pausedBeforeMouseDownOnSeekBar){o.videoDom.play();amplitudeTrackEvent(AMPLITUDE_EVENT.PLAYS_VIDEO,{movie:o.encryptedVideoId,Referral:document.referrer,Owner:o.isVideoOwner,OwnerID:o.ownerId})}o.mouseDownOnSeekBar=false;o.mouseDownOnVolumeSlider=false});this.volumeIcon.on("click",function(q){if(o.videoDom.volume===0){o.videoDom.volume=o.unmuteVolume;o.volumeControlElem.removeClass("muted")}else{o.unmuteVolume=o.videoDom.volume;o.videoDom.volume=0;o.volumeControlElem.addClass("muted")}var p=(o.videoDom.volume*100)+"%";o.volumeSliderThumb.css("left",p);o.volumeSliderValueBar.css("width",p)});this.volumeSlider.on("click mousemove",function(s){if((s.type==="click")||o.mouseDownOnVolumeSlider){var p=e(this).offset();var q=s.pageX-p.left;if(q<=0){q=0;o.volumeControlElem.addClass("muted")}else{if(q>o.volumeSliderWidth){q=o.volumeSliderWidth;o.volumeControlElem.removeClass("muted")}else{o.volumeControlElem.removeClass("muted")}}o.volumeSliderThumb.css("left",q);o.volumeSliderValueBar.css("width",q);var r=q/o.volumeSliderWidth;o.videoDom.volume=r}});setInterval(function(){if(o.videoDom.buffered.length!==0){o.bufferedBar.width(o.videoDom.buffered.end(o.videoDom.buffered.length-1)/o.videoDom.duration*o.seekBar.width())}if(!o.videoLoaded){return}o.playedBar.width(o.videoDom.currentTime/o.videoDom.duration*o.seekBar.width())},b);setInterval(function(){if(!o.videoDom.paused&&(o.videoDom.currentTime<j)&&(o.videoDom.duration>j)){setTimeout(function(){if(!o.videoDom.paused&&(o.videoDom.currentTime<j)){try{o.videoDom.currentTime=j}catch(p){}}},j*1000)}},h);this.seekBar.on("mousedown mouseover mousemove",function(t){if(t.type==="mousedown"){o.pausedBeforeMouseDownOnSeekBar=o.videoDom.paused;o.videoDom.pause();o.mouseDownOnSeekBar=true}var q=e(this).offset();var s=t.pageX-q.left;var p=o.seekBar.width();o.seekBarTooltip.css("left",s);var r=s/p*o.videoDom.duration;if(r<0){r=0}else{if(r>o.videoDom.duration){r=o.videoDom.duration}}o.seekBarTooltip.text(o.formatTime(r)+" / "+o.formatTime(o.videoDom.duration));if(o.mouseDownOnSeekBar){o.playedBar.width(s);o.videoDom.currentTime=s/o.seekBar.width()*o.videoDom.duration}});this.playbackButton.on("click",function(){o.playbackHandler()});this.fullScreenButton.on("click",function(){o.fullScreenHandler()});e(document).keydown(function(q){if(isUsingLegacyPlayer()){return}var p=q.target.tagName.toLowerCase();if((p==="input")||(p==="textarea")){return}if(o.isFullScreen()||!o.videoDom.paused){switch(q.keyCode){case 27:q.preventDefault();o.exitFullScreenHandler();break;case 32:case 75:q.preventDefault();o.playbackHandler();break;case 37:q.preventDefault();o.backwardHandler();break;case 39:q.preventDefault();o.forwardHandler();break;case 70:q.preventDefault();o.fullScreenHandler();break}}else{if(q.keyCode===70){q.preventDefault();o.fullScreenHandler()}else{if(q.keyCode===75){q.preventDefault();o.playbackHandler()}}}})};n.prototype.isFullScreen=function(){return(document.fullscreenElement&&(document.fullscreenElement!==null))||document.mozFullScreen||document.webkitIsFullScreen};n.prototype.playbackHandler=function(){if(this.videoDom.paused){this.videoDom.play();amplitudeTrackEvent(AMPLITUDE_EVENT.PLAYS_VIDEO,{movie:this.encryptedVideoId,Referral:document.referrer,Owner:this.isVideoOwner,OwnerID:this.ownerId})}else{this.videoDom.pause()}};n.prototype.pause=function(){if(this.videoDom&&!this.videoDom.paused){this.videoDom.pause()}};n.prototype.exitFullScreenHandler=function(){if(document.exitFullScreen){document.exitFullScreen()}else{if(document.msExitFullscreen){document.msExitFullscreen()}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else{if(document.webkitExitFullscreen){document.webkitExitFullscreen()}}}}};n.prototype.fullScreenHandler=function(){if(this.isFullScreen()){this.exitFullScreenHandler()}else{var o=this.viewportElem.get(0);if(o.requestFullscreen){o.requestFullscreen()}else{if(o.msRequestFullscreen){o.msRequestFullscreen()}else{if(o.mozRequestFullScreen){o.mozRequestFullScreen()}else{if(o.webkitRequestFullscreen){o.webkitRequestFullscreen()}}}}amplitudeTrackEvent(AMPLITUDE_EVENT.TOGGLE_FULLSCREEN,{movie:this.encryptedVideoId})}};n.prototype.backwardHandler=function(){this.videoDom.currentTime=Math.max(0,this.videoDom.currentTime-5)};n.prototype.forwardHandler=function(){this.videoDom.currentTime=Math.min(this.videoDom.currentTime+5,this.videoDom.duration)};n.prototype.contextMenuHandler=function(r){var o=r.target.tagName.toLowerCase();if((o==="input")||(o==="textarea")){return}r.preventDefault();this.contextMenuOpening=true;var q=r.clientX,p=r.clientY;if((d.test(navigator.userAgent))&&(i.test(navigator.vendor))){this.contextMenuElem.find('[data-player-action="copyUrl"], [data-player-action="copyEmbedCode"]').addClass("hidden")}this.contextMenuElem.css("top",p).css("left",q).removeClass("hidden")};n.prototype.closeContextMenu=function(){this.contextMenuElem.addClass("hidden");this.contextMenuOpening=false};n.prototype.copyToClipboard=function(s,r){var q=document.createElement("textarea");q.style.position="absolute";q.style.left="-9999px";if(r!==undefined){q.style.top=r.pageY+"px"}else{q.style.top="0"}document.body.appendChild(q);q.textContent=s;var t=document.activeElement;q.focus();q.setSelectionRange(0,q.value.length);var p;try{p=document.execCommand("copy")}catch(o){p=false}if(t&&(typeof t.focus==="function")){t.focus()}return p};n.prototype.formatTime=function(q){if(isNaN(q)){return"00:00"}var o=Math.floor(q/60),p=Math.floor(q%60);if(o<10){o="0"+o}if(p<10){p="0"+p}return o+":"+p};n.prototype.showControls=function(){if(this.videoDom.paused){this.infoOverlayElem.fadeIn(a)}this.controlElem.not(":visible").fadeIn(a)};n.prototype.hideControls=function(){this.infoOverlayElem.hide();this.controlElem.hide()};n.prototype.showLoading=function(p){var o=this;if(typeof p==="string"){this.loadingOverlay.find(".video-loading-message").text(p)}this.loadingOverlay.show();if(!m){m=setTimeout(function(){o.loadingOverlay.find(".video-loading-message").html(f)},k)}};n.prototype.hideLoading=function(){if(m){clearTimeout(m);m=null}this.loadingOverlay.find(".video-loading-message").empty();this.loadingOverlay.hide()};n.prototype.setPlaybackButtonState=function(o){this.playbackButton.removeClass(c.PAUSED);this.playbackButton.removeClass(c.PLAYING);this.playbackButton.removeClass(c.ENDED);this.playbackButton.addClass(o)};n.prototype.reset=function(){if(!this.videoDom.paused){this.videoDom.pause()}this.videoDom.currentTime=0;this.videoPlayStarted=false;this.isEditingVideoInfo=false;this.hideLoading();this.infoOverlayElem.show();this.controlElem.show();this.setPlaybackButtonState(c.PAUSED);this.videoElem.addClass("hidden")};var l=new n(e(".video-player-viewport"));e(".video-player-viewport").data("h5VideoControl",l)})(jQuery,window);

}
/*
     FILE ARCHIVED ON 23:12:31 Apr 11, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:27:13 Feb 27, 2022.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 147.875
  exclusion.robots: 0.175
  exclusion.robots.policy: 0.161
  RedisCDXSource: 7.48
  esindex: 0.017
  LoadShardBlock: 109.337 (3)
  PetaboxLoader3.datanode: 88.815 (4)
  CDXLines.iter: 26.444 (3)
  PetaboxLoader3.resolve: 74.281 (2)
  load_resource: 63.219
*/