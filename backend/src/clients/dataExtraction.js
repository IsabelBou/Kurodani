const { JSDOM } = require("jsdom");
const _ = require("lodash");
const lostWordCardDataURL =
  "https://gamepress.gg/lostword/list/story-cards-list";
const { window } = new JSDOM("", {
  url: lostWordCardDataURL,
});
const { saveCard, saveEffect } = require("../orm/storeData");
const $ = require("jquery")(window);

const basicCardExtraction = () => {
  //Retrieve full HTML
  $.get(lostWordCardDataURL, function (html) {
    //Retrieves all table row elements with "story-cards-row" class, which contain relevant card info
    const cardHTMLElements = $(html).find("tr.story-cards-row");

    cardHTMLElements.each((i, cardHTML) => {
      const card = {
        name: $(cardHTML).attr("data-name"),
        imgsource: $(cardHTML).find("img").attr("src"),
        link: $(cardHTML).find("a").attr("href"),
        type: $(cardHTML).attr("data-cat-2"),
        rarity: $(cardHTML).attr("data-rarity"),
        //These are two stats out of 6 possible types, each described in the HTML with unique names, so every other attribute is omitted in order to save the type, too.
        stats: _.omit($(cardHTML).data(), [
          "effects",
          "rarity",
          "cat-1",
          "cat-2",
          "name",
        ]),
        //Returns up to three (at the time of coding) IDs that match the ones listed in the effects array below.
        effects: _.get($(cardHTML).data(), ["effects"]),
      };
      console.log(card);
      saveCard(card);
    });
  });
};

const basicEffectExtraction = () => {
  //Retrieve full HTML
  $.get(lostWordCardDataURL, function (html) {
    //Retrieves all "option" lines under id "effects-select" (effect list selector)
    const effectsHTMLElements = $(html).find("#effects-select").find("option");

    //Extracts every effect as an object containing effects' ID and description
    effectsHTMLElements.each((i, effectHTML) => {
      const effect = {
        id: $(effectHTML).attr("value"),
        name: $(effectHTML).text(),
      };
      console.log(effect);
      saveEffect(effect);
    });
  });
};

module.exports = {
  basicCardExtraction,
  basicEffectExtraction,
};
