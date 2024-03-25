class storeLocatorPage
{

    mapPointer(){

        return cy.get('div[role="button"]');

    }

    dealerCount(){

        return cy.get('.count-dealers .count');
    }

    addresses(){

        return cy.get('.card-text .address');
    }
    
    nextPage(){

        return cy.get('.btn-outline.next-page');
    }
    
    prevPage(){

        return cy.get('.btn-outline.prev-page');
    }
    
    locationSearchBox(){

        return cy.get('.mapboxgl-ctrl-geocoder--input');
    }
    
    locationSubmit(){

        return cy.get('.form-control-wrapper > .btn');
    }
    
    currentLocation(){

        return cy.get('.btn.btn-outline.btn-location');
    }    

    locationSuggestions(){

        return cy.get('.mapboxgl-ctrl-geocoder--suggestion-title');
    } 

    distance(){

        return cy.get('.distance');
    }   

}

export default storeLocatorPage;