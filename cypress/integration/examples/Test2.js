/// <reference types="Cypress" />

describe('My Second Test Suite',function()
{
    it('My Second TestCase',function(){
        cy.visit("https://maax.com/services/contact/newsletter");
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.ao-combo-label > input').check();
        cy.get('.ao-combo-label > input').should('be.checked').and('have.value','Yes');
        cy.get('.ao-combo-label > input').uncheck(["Yes"]); //you can give an array of checkbox values, so that multiple checkboxes can checked or unchecked

        cy.get('#b1622556803061').select('Nunavut');
        cy.get('#b1622556803061').should('have.value','Nunavut');




    })
})