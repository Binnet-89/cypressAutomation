import storeLocatorPage from '../pageObjects/whereToBuy'

function mockLocation(latitude, longitude) {
    return {
        onBeforeLoad(win) {
            cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
                if (latitude && longitude) {
                    return cb({ coords: { latitude, longitude } });
                }
                throw err({ code: 1 });
            });
        }
    };
}

describe('Where to buy page', function () {

    beforeEach(function () {

        cy.fixture('testData').then(function(data){ 
            this.data = data; 
            });

        cy.visit("https://maax.com/where-to-buy", mockLocation(43.641338, -79.380577));
        cy.get('#onetrust-accept-btn-handler').click();
        cy.wait(4000);

    });

    it('Validate default mock location - Toronto', function () {
        const elements = new storeLocatorPage();
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html', this.data.torontoStorePhones);
        elements.dealerCount().should('have.text',  this.data.torontoStoreCount);
        elements.addresses().should('contain.text', this.data.mockDefaultLocation);
        elements.nextPage().should('be.visible');
        elements.prevPage().should('not.exist');
    })

    it('"GET MY LOCATION" should work as expected', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.postalCode);
        elements.locationSubmit().click();
        cy.wait(1000);
        elements.currentLocation().click();
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html',this.data.torontoStorePhones);
        elements.dealerCount().should('have.text', this.data.torontoStoreCount);
        elements.addresses().should('contain.text', this.data.mockDefaultLocation);
        elements.nextPage().should('be.visible');
        elements.prevPage().should('not.exist');
    })

    it('NEXT PAGE button should work as expected', function () {
        const elements = new storeLocatorPage();
        elements.nextPage().click();
        elements.nextPage().should('be.visible');
        elements.prevPage().should('be.visible');
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html', this.data.torontoStorePhones);
        elements.dealerCount().should('have.text', this.data.torontoStoreCount);
        elements.addresses().should('contain.text', this.data.mockDefaultLocation);
    })

    it('PREVIOUS PAGE button should work as expected', function () {
        const elements = new storeLocatorPage();
        elements.nextPage().click();
        elements.prevPage().should('be.visible');
        elements.prevPage().click();
        elements.nextPage().should('be.visible');
        elements.prevPage().should('not.exist');
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html',this.data.torontoStorePhones);
        elements.dealerCount().should('have.text', this.data.torontoStoreCount);
        elements.addresses().should('contain.text',this.data.mockDefaultLocation);
    })

    it('POSTAL CODE search should return valid results', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.postalCode);
        elements.locationSubmit().click();
        cy.wait(1000);
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html', this.data.durhamStorePhones);
        elements.addresses().eq(0).should('contain.text', this.data.postalCodeResult);
    })

    it('AUTO COMPLETE should return valid results', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.searchCity);
        elements.locationSubmit().click();
        elements.locationSuggestions().should('have.length', this.data.locationAutoComplete).and('contain.text', this.data.searchCity);
    })

    it('AUTO COMPLETE selection must update map and results', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.searchCity);
        elements.locationSuggestions().eq(0).click();
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html', this.data.durhamStorePhones);
        elements.addresses().eq(0).should('contain.text', this.data.searchCityResult);
    })

    it('STREET ADDRESS search should return valid results', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.streetAddress);
        elements.locationSubmit().click();
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html',this.data.durhamStorePhones);
        elements.addresses().eq(0).should('contain.text', this.data.searchCityResult);
    })
    it('CITY search should return valid results', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.searchCityProv);
        elements.locationSubmit().click();
        elements.mapPointer().should('have.length', this.data.storesPerPage).and('contain.html',this.data.durhamStorePhones);
        elements.addresses().eq(0).should('contain.text', this.data.searchCityResult);
    })

    it('LOCATIONS must be sorted by proximity', function () {
        const elements = new storeLocatorPage();
        elements.locationSearchBox().type(this.data.searchCityProv);
        elements.locationSubmit().click();
        var distances = [];
        elements.distance().each(($el, index, $list) => {
            distances[index] = $el.text().split(" ")[0];
        }).then(function () {
            expect(Number(distances[0])).to.lessThan(2);
            expect(Number(distances[0])).to.lessThan(Number(distances[1]));
            expect(Number(distances[1])).to.lessThan(Number(distances[2]));
            expect(Number(distances[2])).to.lessThan(Number(distances[3]));
            expect(Number(distances[3])).to.lessThan(Number(distances[4]));
            expect(Number(distances[4])).to.lessThan(Number(distances[5]));
        });
    })
})