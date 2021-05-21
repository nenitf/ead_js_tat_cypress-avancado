Feature: Hacker Stories

    Background:
        Given Acesso à página

    Scenario: shows 20 stories, then the next 20 after clicking "More"
        Given São exibidos 20 itens
        When Clico em "More"
        Then Vejo 40 itens

    Scenario: searches via the last searched term
        Given Ultima pesquisa "Cypress"
        When Recarrego a página
        Then Vejo o campo de pesquisa "Cypress"
        And Aguardo API sobre "Cypress"

    Scenario: shows the footer
        Then Vejo o rodapé

    Scenario: shows the right data for all rendered stories
        Given "Cypress" retorna 20 resultados
        When Pesquiso por "Cypress"
        Then Aguardo API sobre "Cypress"
        And Vejo 20 itens

    Scenario: shows one story less after dimissing the first one
        Given "Cypress" retorna 20 resultados
        And Foi pesquisado por "Cypress"
        And API retornou
        And Vejo 20 itens
        When Clico em check
        Then Vejo 19 itens

    Scenario: orders by title
        Given "Cypress" retorna 20 resultados
        And Foi pesquisado por "Cypress"
        And API retornou
        And Vejo 20 itens
        When Clico em title
        Then Ordeno por título

    Scenario: orders by author
        Given "Cypress" retorna 20 resultados
        And Foi pesquisado por "Cypress"
        And API retornou
        And Vejo 20 itens
        When Clico em author
        Then Ordeno por autor

    Scenario: orders by comments
        Given "Cypress" retorna 20 resultados
        And Foi pesquisado por "Cypress"
        And API retornou
        And Vejo 20 itens
        When Clico em comments
        Then Ordeno por comentários

    Scenario: orders by points
        Given "Cypress" retorna 20 resultados
        And Foi pesquisado por "Cypress"
        And API retornou
        And Vejo 20 itens
        When Clico em points
        Then Ordeno por pontos

    Scenario: shows no story when none is returned
        Given "Redux" não retorna resultados
        When Pesquiso por "Redux"
        Then Aguardo API sobre "Redux"
        And Vejo 0 itens

    Scenario: types and hits ENTER
        Given "Cypress" retorna 20 resultados
        When Pesquiso por "Cypress" com enter
        Then Aguardo API sobre "Cypress"
        And Vejo 20 itens

    Scenario: types and clicks the submit button
        Given "Cypress" retorna 20 resultados
        When Pesquiso por "Cypress" com botão Submit
        Then Aguardo API sobre "Cypress"
        And Vejo 20 itens

    Scenario: shows a max of 5 buttons for the last searched terms
        Given Foi pesquisado por 6 itens
        Then Vejo 5 botões de histórico

    Scenario: shows "Something went wrong ..." in case of a server error
        Given API retorna erro com "Vuepress"
        When Pesquiso por "Vuepress"
        Then Aguardo API
        And Vejo o erro "Something went wrong ..."

    Scenario: shows "Something went wrong ..." in case of a network error
        Given API não pôde ser acessada
        When Pesquiso por qualquer coisa
        Then Aguardo API
        And Vejo o erro "Something went wrong ..."

    Scenario: shows a "Loading ..." state before showing the results
        Given "Cypress" retorna 20 resultados com delay de 1000ms
        When Pesquiso por "Cypress"
        Then Vejo a mensagem de load
        And Aguardo API
        And Vejo 20 itens

