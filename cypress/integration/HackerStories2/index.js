import { Before, Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given('Acesso à página', () => {
  cy.intercept(
    '**/search?query=redux**',
    { fixture: 'empty'}
  ).as('apiRequest')

  cy.visit('http://infinite-savannah-93746.herokuapp.com/')
  cy.wait(`@apiRequest`)
})

Given('Pesquisado por {string}', (term) => {
  cy.intercept(
    `**/search?query=${term}**`,
    { fixture: 'initial'}
  ).as('apiRequest')

  cy.get('input')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)

  cy.wait('@apiRequest')
})

When('Pesquiso por {string}', (term) => {
  cy.get('input')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)
})

//Then('Aguardo a requisição de {string} apenas uma vez', function(term) {
//  console.log(this.apiRequest)
//})

// Testa se o alias "apiRequest" seja da ultima requisição esperada
// é um flakiness test?
Then('Espero que a ultima requisição seja de {string}', function(term) {
  cy.get('@apiRequest').then(api => {
    cy.wrap(api).its('request.url').should('contain', `query=${term}`)
  })
})
