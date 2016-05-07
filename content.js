chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var xhr = new XMLHttpRequest,
			    content,
			    doc,
			    scripts;

			xhr.open( "GET", document.URL, false );
			xhr.send(null);
			content = xhr.responseText;

			doc = document.implementation.createHTMLDocument(""+(document.title || ""));

			doc.open();
			doc.write(content);
			doc.close();


			scripts = doc.getElementsByTagName("script");
			//Modify scripts as you please
			[].forEach.call( scripts, function( script ) {
			    script.removeAttribute("src");
			    script.innerHTML = 'var do = "nothing";';
			});

			//Doing this will activate all the modified scripts and the "old page" will be gone as the document is replaced
			document.replaceChild( document.importNode(doc.documentElement, true), document.documentElement);
    }
  }
);