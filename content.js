var some = function(list, callback){
	list.forEach(function(item){
		if(callback(item)) return true;
	});
	return false;
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var xhr = new XMLHttpRequest,
			    content,
			    doc,
			    scripts,
			    whitelist;

			xhr.open( "GET", document.URL, false );
			xhr.send(null);
			content = xhr.responseText;

			doc = document.implementation.createHTMLDocument(""+(document.title || ""));

			doc.open();
			doc.write(content);
			doc.close();

			whitelist = [
				/dojo/i,
				/jquery/i,
				/midori/i,
				/mootools/i,
				/prototype/i,
				/react/i,
				/meteor/i,
				/yui/i,
				/bitsycode/i,
				/anychart/i,
				/d3/i,
				/highcharts/i,
				/easlejs/i,
				/moment/i,
				/createjs/i,
				/jit/i,
				/pixi/i,
				/plotly/i,
				/processing/i,
				/raphael/i,
				/snap/i,
				/swfobject/i,
				/three/i,
				/velocity/i,
				/whitestorm/i,
				/angular/i,
				/underscore/i,
				/forbes_welcome/i
			];


			scripts = doc.getElementsByTagName("script");
			//Modify scripts as you please
			[].forEach.call( scripts, function( script ) {
				var src = script.getAttribute("src");
				if(!some(whitelist, function(item){ return item.test(src);})){
			    script.removeAttribute("src");
			    script.innerHTML = '';
			  } else {
			  	console.log("whitelisted: ", src);
			  }
			});

			//Doing this will activate all the modified scripts and the "old page" will be gone as the document is replaced
			document.replaceChild( document.importNode(doc.documentElement, true), document.documentElement);
    }
  }
);