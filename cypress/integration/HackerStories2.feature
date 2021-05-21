Feature: Hacker Stories 2

    Background:
        Given Acesso à página

    Scenario: should request only the first time of same word
        Given Pesquisado por "Cypress"
        And Pesquisado por "bdd"
        When Pesquiso por "Cypress"
        #Then Aguardo a requisição de "Cypress" apenas uma vez
        Then Espero que a ultima requisição seja de "bdd"
