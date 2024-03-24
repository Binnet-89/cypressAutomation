/// <reference types="Cypress" />

describe('My first Test Suite',function()
{
    it('My First TestCase',function(){
        cy.visit("https://maax.com/")
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.search-input').click({force: true}).type('door');
        cy.get('.react-autosuggest__container').find('a.link').should('have.length',4);
        //cy.contains('View More').click();
        //cy.get('.react-autosuggest__container').find('a.link').eq(0).click();
        //cy.get('.react-autosuggest__container').contains('36 x 36').click();
        //cy.get('.react-autosuggest__container').find('a.link').contains('36 x 36').click();
        cy.get('.react-autosuggest__container').find('a.link').each(($el,index,$list ) => {
        const linkText = $el.text();
        if(linkText.includes('36 x 36')){
            console.log($el.attr('href'));
            //cy.wrap($el).click();
        }
        });

        cy.get('.btn-primary').then(function(element){
            console.log('logging');
            console.log(element.text());
        });
        cy.contains('Build your').then(function(element){ //This returns first element only if there is more than one
            console.log('logging2');
            console.log(element.text());
        });

        cy.get('.react-autosuggest__container').find('a.link').eq(3).should('have.text','View More');
       // cy.contains('Build your').click();
       // console.log('Clicked');

       // cy.contains('Build your').click().then(function() {
       //     console.log('Clicked');
       // });

       cy.get('.search-list li a').each(($el,index,$list ) => {
        const linkText = $el.text();
        if(linkText.includes('36 x 36')){
           console.log($el.attr('href'));
            //cy.wrap($el).click();
        }
        });

    })
})