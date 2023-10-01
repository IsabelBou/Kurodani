# Kurodani (WIP)

This is the project I came up with as an excuse to work on a thoughtful front-end on ReactJS as practice, which I haven't really started yet because I needed the data to do it properly, so, ironically, I'm mainly wowrking on the back-end currently.

This project intends to improve visualization and sorting of mobile game Touhou Lostword's storycard information, which has a dedicated  gamepress page.
The project consists of a back-end program that scrapes the previously mentioned gamepress page with jQuery and uses RegEx to parse its HTML into useful information in a SQLite database, which will be used by the front-end to display or filter this data in a more convenient manner.


## How does it work

The back-end scrapes Touhou Lostword's gamepress story card page in order to get relevant parameters and up-to-date information, which is retrieved using jQuery/JavaScript and saved in arrays for posterior storage in a database.

Specifically, the effect list is retrieved from the page's effect selector options, which pairs its ID and its description, and the cards and their relevant parameters are extracted from each of the table rows whose class matches "story-card-row".

Since this project's goal was originally to create a useful interface with ReactJS, the retrieved data shall be processed using RegEx to split the relevant card effects and parameters into several more specific actions and stats that will enable an easier search of users' needs and improve visualization of desired information. This process is also part of the back-end side.

Each story card's extracted information includes its name, a link to its picture, a link to its own page, its rarity (between 3 and 5), its type identifier (between 4 possible types), two out of six possible stat types along with their assigned value, and between one to three effects from the previously mentioned effect list.

The effect description is analyzed by a regex function, which will divide it into several relevant parameters that the user shall specify to filter based on their needs; these being single or multi-target, attribute subject to effect, effect type (buff, debuff, damage reduction, spirit power obtention, HP/Barrier recovery), character role dependency on activation.

However, the effect list does not include relevant information such as percentages, turn duration, or amount affected, which would be useful for the user to see. This information shall be supplemented, although at the moment it is unknown if it will be manually (at least initially) or by crawling through each story card page.
