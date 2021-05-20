import { Before, Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import faker from 'faker'

let aliasCurrentApiCalled = "nada"

//Before(() => {
//  cy.intercept(
//    '/api/v1/search?query=React&page=0',
//    { fixture: 'initial'}
//  ).as('initial')
//
//  cy.visit('/')
//  cy.wait('@initial')
//})

Given('Acesso à página', () => {
  cy.intercept(
    '/api/v1/search?query=React&page=0',
    { fixture: 'initial' }
  ).as('initial')
  aliasCurrentApiCalled = `initial`

  cy.visit('/')
  cy.wait(`@${aliasCurrentApiCalled}`)
})

Given('São exibidos {int} itens', (itens) => {
  cy.get('.item').should('have.length', itens)
})

When('Clico em {string}', (btnLabel) => {
  cy.intercept(
    '**/search**',
    { fixture: 'more20'}
  ).as('getNextStories')
  aliasCurrentApiCalled = `getNextStories`

  cy.contains(btnLabel)
    .should('be.visible')
    .click()

  cy.wait(`@${aliasCurrentApiCalled}`)
})

Then('Vejo {int} itens', (itens) => {
  cy.get('.item').should('have.length', itens)
})

//////////////////////////////////////
Given('Ultima pesquisa {string}', (term) => {
  cy.intercept(
    `**/search?query=${term}&page=0`,
    { fixture: 'initial'}
  ).as(`pesquisaPor_${term}`)
  aliasCurrentApiCalled = `pesquisaPor_${term}`

  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)

  cy.wait(`@${aliasCurrentApiCalled}`)
})

When('Recarrego a página', () => {
  cy.visit('/')
})

Then('Vejo o campo de pesquisa {string}', (term) => {
  cy.get('#search')
    .should('have.value', term)
})

Then('Vejo o resultado da busca por {string}', (term) => {
  // cy.get(`@pesquisaPor_${term}`).then(req => {
  // expect(req, 'Requisição anterior deve ter sido feita').to.exist
  // })
})
//////////////////////////////////////
Then('Vejo o rodapé', () => {
  cy.get('footer')
    .should('be.visible')
    .and('contain', 'Icons made by Freepik from www.flaticon.com')
})
//////////////////////////////////////
Given('{string} retorna 20 resultados', (term) => {
  cy.intercept(
    `**/search?query=${term}**`,
    { fixture: 'initial'}
  ).as(`pesquisaPor_${term}`)
  aliasCurrentApiCalled = `pesquisaPor_${term}`
})

When('Pesquiso por {string}', (term) => {
  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)
})

Given('API retornou', () => {
  cy.wait(`@${aliasCurrentApiCalled}`)
})

Then('Aguardo API', () => {
  cy.wait(`@${aliasCurrentApiCalled}`)
})
//////////////////////////////////////
Given('Clico em check', () => {
  cy.get('.button-small')
    .first()
    .should('be.visible')
    .click()
})
//////////////////////////////////////
When('Clico em title', () => {
  cy.get('.list-header-button:contains(Title)')
    .should('be.visible')
    .click()
})

Then('Ordeno por título', () => {
  cy.fixture('initial').then(stories => {
    cy.get('.item')
      .first()
      .should('be.visible')
      .and('contain', stories.hits[0].title)
    cy.get(`.item a:contains(${stories.hits[0].title})`)
      .should('have.attr', 'href', stories.hits[0].url)

    cy.get('.item')
      .eq(1)
      .should('be.visible')
      .and('contain', stories.hits[9].title)
    cy.get(`.item a:contains(${stories.hits[9].title})`)
      .should('have.attr', 'href', stories.hits[9].url)
  })
})
//////////////////////////////////////
When('Clico em author', () => {
  cy.get('.list-header-button:contains(Author)')
    .should('be.visible')
    .click()
})

Then('Ordeno por autor', () => {
  cy.fixture('initial').then(stories => {
    cy.get('.item')
      .first()
      .should('be.visible')
      .and('contain', stories.hits[0].author)
    cy.get(`.item a:contains(${stories.hits[0].title})`)
      .should('have.attr', 'href', stories.hits[0].url)

    cy.get('.item')
      .eq(1)
      .should('be.visible')
      .and('contain', stories.hits[9].author)
    cy.get(`.item a:contains(${stories.hits[9].title})`)
      .should('have.attr', 'href', stories.hits[9].url)
  })
})
//////////////////////////////////////
When('Clico em comments', () => {
  cy.get('.list-header-button:contains(Comments)')
    .should('be.visible')
    .click()
})

Then('Ordeno por comentários', () => {
  cy.fixture('initial').then(stories => {
    cy.get('.item')
      .first()
      .should('be.visible')
      .and('contain', stories.hits[19].num_comments)
    cy.get(`.item a:contains(${stories.hits[19].title})`)
      .should('have.attr', 'href', stories.hits[19].url)

    cy.get('.item')
      .eq(1)
      .should('be.visible')
      .and('contain', stories.hits[18].num_comments)
    cy.get(`.item a:contains(${stories.hits[18].title})`)
      .should('have.attr', 'href', stories.hits[18].url)
  })
})
//////////////////////////////////////
When('Clico em points', () => {
  cy.get('.list-header-button:contains(Points)')
    .should('be.visible')
    .click()
})

Then('Ordeno por pontos', () => {
  cy.fixture('initial').then(stories => {
    cy.get('.item')
      .first()
      .should('be.visible')
      .and('contain', stories.hits[19].points)
    cy.get(`.item a:contains(${stories.hits[19].title})`)
      .should('have.attr', 'href', stories.hits[19].url)

    cy.get('.item')
      .eq(1)
      .should('be.visible')
      .and('contain', stories.hits[18].points)
    cy.get(`.item a:contains(${stories.hits[18].title})`)
      .should('have.attr', 'href', stories.hits[18].url)
  })
})
//////////////////////////////////////
Given('{string} não retorna resultados', (term) => {
  cy.intercept(
    `**/search?query=${term}**`,
    { fixture: 'empty'}
  ).as(`pesquisaPor_${term}`)
  aliasCurrentApiCalled = `pesquisaPor_${term}`
})
//////////////////////////////////////
When('Pesquiso por {string} com enter', (term) => {
  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)
})
//////////////////////////////////////
When('Pesquiso por {string} com botão Submit', (term) => {
  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${term}`)

  cy.get('button:contains(Submit)')
    .should('be.visible')
    .click()
})
//////////////////////////////////////
Given('Foi pesquisado por {int} itens', (repeat) => {
  cy.intercept(
    'GET',
    '**/search**',
    { fixture: 'empty' }
  ).as('getRandomStories')
  aliasCurrentApiCalled = `getRandomStories`

  Cypress._.times(6, () => {
    const randomWord = faker.random.word()

    cy.get('#search')
      .clear()
      .type(`${randomWord}{enter}`)

    cy.wait(`@${aliasCurrentApiCalled}`)

    cy.getLocalStorage('search')
      .should('be.equal', randomWord)
  })
})

Then('Vejo {int} botões de histórico', (qtd) => {
  cy.get('.last-searches')
    .within(() => {
      cy.get('button')
        .should('have.length', qtd)
    })
})
//////////////////////////////////////
Given('API retorna erro com {string}', (term) => {
  cy.intercept(
    'GET',
    `**/search?query=${term}**`,
    { statusCode: 500 }
  ).as(`pesquisaPor_${term}`)
  aliasCurrentApiCalled = `pesquisaPor_${term}`
})

When('Pesquiso por qualquer coisa', () => {
  const randomWord = faker.random.word()

  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${randomWord}{enter}`)

  cy.wait(`@${aliasCurrentApiCalled}`)
})

Then('Vejo o erro {string}', (erro) => {
  cy.get(`p:contains(${erro})`)
    .should('be.visible')
})
//////////////////////////////////////
Given('API não pôde ser acessada', () => {
  cy.intercept(
    'GET',
    `**/search**`,
    { forceNetworkError: true }
  ).as(`pesquisaUnica`)
  aliasCurrentApiCalled = `pesquisaUnica`
})

Then('Vejo o erro {string}', (erro) => {
  cy.get(`p:contains(${erro})`)
    .should('be.visible')
})
//////////////////////////////////////
Given('{string} retorna 20 resultados com delay de {int}ms', (term, delay) => {
  cy.intercept(
    `**/search?query=${term}**`,
    { delay, fixture: 'initial' }
  ).as(`pesquisaPor_${term}`)
  aliasCurrentApiCalled = `pesquisaPor_${term}`
})

Then('Vejo a mensagem de load', () => {
  cy.assertLoadingIsShownAndHidden()
})
//////////////////////////////////////
Given('Foi pesquisado por {string}', (term) => {
  cy.get('#search')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)
})
