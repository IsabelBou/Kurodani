const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM ("", {
    url: "https://gamepress.gg/lostword/list/story-cards-list",
});
const $ = require( "jquery" )( window );

$.get("https://gamepress.gg/lostword/list/story-cards-list", function(html) { 
	console.log(html); 
});
