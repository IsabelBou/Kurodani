const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM ("", {
    url: "https://gamepress.gg/lostword/list/story-cards-list",
});
const $ = require( "jquery" )( window );

//Retrieve full HTML
$.get("https://gamepress.gg/lostword/list/story-cards-list", function(html) { 

//Retrieves all table row elements with "story-cards-row" class, which contain relevant card info
    const cardHTMLElements = $(html).find("tr.story-cards-row");


    const cards =  []

    cardHTMLElements.each((i,cardHTML) => {
        const card = {
            name: $(cardHTML).attr("data-name"),
            imgsource: $(cardHTML).find("img").attr("src"),
            //TODO: Get ID from card image link since it's nowhere else
            //TODO: Double parameter definition function
        }
        console.log(card);
        cards.push(card);
    });


    // Retrieves all "option" lines under id "effects-select" (effect list selector)
    const effectsHTMLElements = $(html).find("#effects-select").find("option");

    //Populates an array with effect objects containing all effects' ID and description
    const effects = []
    effectsHTMLElements.each((i,effectHTML) => {
        const effect = {
            id: ($(effectHTML).attr("value")),
            name: ($(effectHTML).text()),
        }
        effects.push(effect);
    });

});

