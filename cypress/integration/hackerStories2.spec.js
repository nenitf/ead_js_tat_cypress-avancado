import faker from 'faker'

// THANKS: https://talkingabouttesting.com/2021/05/05/como-testar-que-o-chache-funciona-em-um-teste-escrito-com-cypress/
// THANKS: https://github.com/beatrizartimundo/cypress-exercicios
describe('Hacker News Search', () => {
  context('Mocking the API', () => {
    beforeEach(() => {
      cy.intercept(
        '**/search?query=redux**',
        { fixture: 'empty'}
      ).as('initial')

      cy.visit('http://infinite-savannah-93746.herokuapp.com/')
      cy.wait('@initial')
    })

    it('should only the first time of same word', () => {
      const randomWord1 = faker.random.word()
      const randomWord2 = faker.random.word()
      let count = 0

      cy.intercept(`**/search?query=${randomWord1}**`, req => {
        count++
        expect(count, `network calls to fetch with ${randomWord1}`).to.equal(1)
        req.reply({fixture: 'empty'})
      }).as('random1')

      cy.intercept(`**/search?query=${randomWord2}**`, req => {
        req.reply({fixture: 'empty'})
      }).as('random2')

      cy.get('input')
        .should('be.visible')
        .clear()
        .type(`${randomWord1}{enter}`)

      cy.wait('@random1')

      cy.get('input')
        .should('be.visible')
        .clear()
        .type(`${randomWord2}{enter}`)

      cy.wait('@random2')

      cy.get('input')
        .should('be.visible')
        .clear()
        .type(`${randomWord1}{enter}`)
    })
  })

  //it('correctly caches the results', () => {
  //  const randomWord = faker.random.word()
  //  let count = 0

  //  cy.intercept(`**/search?query=${randomWord}**`, req => {
  //    count +=1
  //    req.reply({fixture: 'empty'})
  //  }).as('random')

  //  cy.search(randomWord).then(() => {
  //    expect(count, `network calls to fetch ${randomWord}`).to.equal(1)

  //    cy.wait('@random')

  //    cy.search(term)
  //    cy.wait('@stories')

  //    cy.search(randomWord).then(() => {
  //      expect(count, `network calls to fetch ${randomWord}`).to.equal(1)
  //    })
  //  })
  //})
})
