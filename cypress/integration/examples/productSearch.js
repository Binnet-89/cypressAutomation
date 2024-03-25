/// <reference types="Cypress" />

describe('Product search results', function () {
    beforeEach(function () {

        cy.fixture('testData').then(function (data) {
            this.data = data;
        });

        cy.visit("https://maax.com/")
        cy.get('#onetrust-accept-btn-handler').click();

    });

    it('Search box and search icon must be present', function () {
        cy.get('.search-input').should('be.visible').and('have.attr', 'placeholder').and('include', 'Search');
        cy.get('.icon-search').should('be.visible').and('have.attr', 'href').and('include', '/search?query=');
    })

    it('Autocomplete must have maximum 4 results', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').should('have.length', 4);
        });
    })

    it('Last entry of autocomplete results must be "View More"', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').last().should('have.text', 'View More');
        });

    })

    it('Clicking on "View More" should take to products listing page', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').last().click().then(function () {
                cy.url().should('include', 'https://maax.com/search?query=' + this.data.searchProduct)
            });

        });

    })

    it('Clicking on Search glass icon should take to products listing page', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct);
        cy.get('a.icon-search').click().then(function () {
            cy.url().should('include', 'https://maax.com/search?query=' + this.data.searchProduct)
        });
    })

    it('Search results must be relevant and have searched term', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct);
        cy.get('a.icon-search').click().then(function () {
            cy.get('a.card-title .name').should('have.length.above', 10).and('contain.text', this.data.searchProductResult);
        });
    })

    it('Search results should display no results if no match found', function () {
        cy.get('.search-input').click({ force: true }).type('COMPLETELYINCORRECTSTRING');
        cy.get('a.icon-search').click().then(function () {
            cy.url().should('include', 'https://maax.com/search/no-results')
        });
    })

    it('All autocomplete results must must be a clickable link', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').each(($el, index, $list) => {
                cy.get('.react-autosuggest__container').find('a.link').eq(index).should('have.attr', 'href').and('include', '/');
            });
        });

    })

    it('Product ID search must return exactly one result', function () {
        cy.get('.search-input').click({ force: true }).type('102788').then(function () {
            cy.get('.react-autosuggest__container').find('a.link').should('have.length', 2);
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('have.attr', 'href').and('include', '/product/');
            cy.get('.react-autosuggest__container').find('a.link').eq(1).should('have.attr', 'href').and('include', '/search?query=');
        });

    })

    it('Search by model number should work', function () {
        cy.get('.search-input').click({ force: true }).type('107519-000-002-000').then(function () {
            cy.get('.react-autosuggest__container').find('a.link').should('have.length.at.least', 2);
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('have.attr', 'href').and('include', '/product/');
        });

    })

    it('Search by dimension should work', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.dimension).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('contain.text', this.data.dimension);
        });
    })

    it('Auto complete search results should have searched term', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('contain.text', this.data.searchProductResult);
            cy.get('.react-autosuggest__container').find('a.link').eq(1).should('contain.text', this.data.searchProductResult);
            cy.get('.react-autosuggest__container').find('a.link').eq(2).should('contain.text', this.data.searchProductResult);
        });

    })

    it('Auto complete search results must have matched term highlighted', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.highlightSearch).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('contain.html', this.data.highlightSearchResult);
        });

    })

    it('Clicking on auto complete search result must redirect to product details page', function () {
        cy.get('.search-input').click({ force: true }).type(this.data.searchProduct).then(function () {
            cy.get('.react-autosuggest__container').find('a.link').eq(0).click().then(function () {
                cy.url().should('include', 'https://maax.com/product/')
            });
        });

    })

    it('Search by product attribute should work', function () {
        cy.get('.search-input').click({ force: true }).type('Comfortable Backrest');
        cy.get('div a.icon-search').click().then(function () {
            cy.get('.product-card div.card-block').should('have.length.above', 5).and('contain.text', 'Comfortable Backrest');

        });
    })

    it('Invalid search must return "NO RESULTS"', function () {
        cy.get('.search-input').click({ force: true }).type('COMPLETELYINCORRECTSTRING').then(function () {
            cy.get('.react-autosuggest__container').find('a.link').should('have.length', 0);
            cy.get('#react-autowhatever-1--item-0').should('have.text', this.data.noResultResponse);
        });

    })

    it('Search in french language should  work', function () {

        cy.visit("https://maax.ca/fr-CA")
        cy.origin('https://maax.ca', () => {
            cy.get('#onetrust-accept-btn-handler').click();
            cy.get('.search-input').click({ force: true }).type('baignoire').then(function () {
            cy.get('.react-autosuggest__container').find('a.link').eq(0).should('contain.text', 'baignoire');
        });

        });
    })

    it('Search in french with accents should work', function () {
        cy.visit("https://maax.ca/fr-CA")
        cy.origin('https://maax.ca', () => {
        cy.get('#onetrust-accept-btn-handler').click();
        cy.get('.search-input').click({ force: true }).type('alcôve').then(function () {
            cy.get('a.icon-search').click().then(function () {
                cy.get('a.card-title .name').should('have.length.above', 10).and('contain.text', 'alcôve');
            });
        });
    });

    })

})