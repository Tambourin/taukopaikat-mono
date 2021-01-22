import placesService from "../../src/services/placesService";

const baseApiUrl = "http://localhost:3001/api/places";
const baseFrontUrl = "http://localhost:3000";

const prepare = (places) => {
  cy.request("GET", `${baseApiUrl}/delete`);
  places.forEach(place => {
    console.log(cy.window().its('store').invoke('getState'));
    //cy.request("POST", baseApiUrl, place);
    placesService.postPlace(place);
  });  
  cy.visit(baseFrontUrl);
}

const addPlaces = (numberOfPlacesToAdd) => {
  for(let i = 0; i < numberOfPlacesToAdd; i++) {
    cy.request("POST", baseApiUrl, {
        name: "testPlace" + i,
        city: "xxx",
        description: "testikxxxuvaus",
        highway: 1,
        services: {
          doesNotBelongToChain: false,
          isOpenTwentyFourHours: true,    
          hasBeenAvarded: false,  
          isAttraction: false,
          isSummerCafe: false,
          isGasStation: true,
          isGrill: false
        }
    });
    cy.visit(baseFrontUrl);
  }
}

export default { prepare, addPlaces };