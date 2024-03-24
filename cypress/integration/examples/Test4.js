/// <reference types="Cypress" />

describe('My Third Test Suite',function()
{
    it('My Third TestCase',function(){
        cy.visit("https://geographyfieldwork.com/WorldCapitalCities.htm");

        cy.get(".sortable tr td:nth-child(1)").each(($el, index, $list) => {
          if($el.text() == 'Canada'){
            cy.get('.sortable tr td:nth-child(1)').eq(index).next().then(function(element) {
              console.log(element.text());
              expect(element.text()).to.equal('Ottawa');
            });
          }
        });





    })
})