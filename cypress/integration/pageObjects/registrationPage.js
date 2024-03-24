class registrationPage
{

    getFirstName(){

        return cy.get('input[name="First Name"]');

    }

    getLastName(){

        return cy.get('input[name="Last Name"]');
    }

}

export default registrationPage;