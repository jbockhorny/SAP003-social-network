# Rede Social

* [1. Definição do produto, objetivo e usuários](#1-definição-do-produto-objetivo-e-usuários)
* [2. Processo e decisões](#2-processo-e-decisões)

## 1. Definição do produto, objetivo e usuários

A aplicação é uma Rede Social, denominada "Movement", cujo objetivo é compartilhar informações relacionadas à atividade física de usuários que praticam qualquer tipo de esporte ou exercício físico.

## 2. Processo e decisões

A Rede Social é uma Single-Page Application (SPA), responsiva e desenhada com enfoque mobile first, que permite a persistência de dados, na qual podemos escrever, ler, atualizar e deletar dados.
*
### Layout da tela mobile e desktop
A aplicação foi desenvolvida de acordo com os seguintes layouts:

* Tela mobile

    ![mobile](https://user-images.githubusercontent.com/32286663/56174616-ec9f6100-5fb8-11e9-9edb-d5ef7c251d9c.png)

* Tela Desktop

    ![desktop](https://user-images.githubusercontent.com/32286663/56174626-fcb74080-5fb8-11e9-8854-26e8d9c4e25f.png)


### Mobile first
Foi aplicado o conceito de mobile first, o qual faz referência a um processo de desenho e desenvolvimento que parte de como se vê e como funciona uma aplicação primeiro em um dispositivo móvel e mais adiante se analisa como adaptar a aplicação a telas progressivamente maiores. Esta é uma contraposição ao modelo tradicional, no qual primeiro se desenha os websites (ou webapps) para desktops e depois os adaptam para telas menores.

### Manipulação e persistência de dados
Foi utilizado o `Firestore` do `Firebase`  para desenhar a estrutura dos dados, a forma de consultá-los, atualizá-los, modificá-los e eliminá-los segundo os requerimentos do usuário. O Firebase foi utilizado neste projeto com o objetivo de manipular e persistir dados através de um banco de dados não relacional, em tempo real e que permite implementar operações CRUD (Criação, Leitura, Atualização e Remoção) de dados.

### Múltiplas telas
Neste projeto a interface foi dividida em várias páginas ou telas e oferece uma maneira de navegar entre elas.

### CSS
Utilizamos `flexbox` para posicionar os elementos deste projeto.

### Histórias de Usuário
A aplicação foi desenvolvida de acordo com as seguintes histórias de usuário:
* Como usuário novo, devo poder criar uma conta com email e senha válidos para poder iniciar uma sessão e ingressar na Rede Social.
    #### Critérios de aceitação
    * Se o email ou senha não forem válidos, ao momento de logar, deve aparecer uma mensagem de erro.
    * Deve ser visível se existir alguma mensagem de erro.
    * A página de registro pode ser vista em celulares e desktop (responsive).
    * Não devo necessitar recarregar a página para criar uma conta (SPA).
    
* Como usuário novo, devo poder ter a opção de iniciar sessão com minha conta do Google para ingressar na Rede Social sem necessidade de criar uma conta de email válido.
    #### Critérios de aceitação
    * Deve ser visível se existir alguma mensagem de erro.
    * A página de registro pode ser vista em celulares e desktop (responsive).
         
* Como usuário logado devo poder criar, guardar, modificar no mesmo lugar (in place) e deletar publicações (post).
    #### Critérios de aceitação
    * Usuário pode criar,
    * Usuário pode guardar (persistência de dados),
    * Usuário pode modificar,
    * Usuário pode deletar um post.
    * A página de registro pode ser vista em celulares e desktop (responsive).
    
### Definição de pronto
* As funcionalidades cumprem e satisfazem os critérios de aceitação.
* O layout está de acordo com o protótipo.
* O código das funcionalidades recebeu code review.
* As funcionalidades estão publicadas para serem testadas.
* As funcionalidades foram testadas manualmente.
