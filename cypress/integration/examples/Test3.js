/// <reference types="Cypress" />

describe('My Third Test Suite',function()
{
    it('My Third TestCase',function(){
        cy.visit("https://maax.com/");
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.socials a').each(($el, index ,$list) => {
            if($el.attr('title') == 'Youtube'){
                console.log($el.attr('target'));
                cy.wrap($el).invoke('removeAttr','target').click();
              // cy.origin('https://www.youtube.com',() => {
                //    cy.get('#img').click();

              // });
                
            }
        });





    })
})