/// <reference types="Cypress" />
import registrationPage from '../pageObjects/registrationPage';
describe('My Fifth Test Suite',function()
{

  before(function(){
    cy.fixture('example').then(function(data){ //fixuture returns a promise that needs to be handled to access the data
      this.data = data; //data here its scope is local, to make it local, we are assigning it to another global variable this.data
    });

  });

    it('My Fifth TestCase',function(){
        cy.visit("https://maax.com/services/contact/newsletter");
        cy.get('#onetrust-accept-btn-handler').click();
        const regPage = new registrationPage();
        regPage.getFirstName().type(this.data.firstname);
        regPage.getLastName().type(this.data.lastname);
        cy.get('input[name="Email"]').type(this.data.email);
        cy.get('select[name="Country"]').select(this.data.country);
        cy.get('select[name="State"]').select(this.data.province);
        cy.get('select[name="Profile"]').select(this.data.profile);
        cy.get('textarea[name="Comments"]').type(this.data.comments);
        cy.get('.ao-form-submit').click();
        //cy.get('#b1614275001797').next().should('be.visible').and('contain','Please enter a value for Confirm E-mail');
        cy.checkError(3,'Please enter a value for Confirm E-mail'); 
        //if we add an array in example.json or even here, we can use forEach and use it up smartly
    });
})