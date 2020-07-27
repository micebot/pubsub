<h1 align='center'>
    M I C E B O T<br>
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/logo-256x256.png' height="80"><br>
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/twitch-256x256.png' height="100"><br>
</h1>
<br>
<div align='center'>
    <a href='https://github.com/airbnb/javascript'>
        <img src='https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb'/>
    </a>
    <a href='https://github.com/prettier/prettier'>
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
    </a>
    <a href='https://github.com/micebot/pubsub/issues'>
        <img src='https://badgen.net/github/open-issues/micebot/pubsub'>
    </a>
    <a href='https://github.com/micebot/pubsub/commits/development'>
        <img src='https://badgen.net/github/last-commit/micebot/pubsub/development'>
    </a>
</div>
<br>

Bem-vindo(a)! Este repositório contém nosso bot que realiza a integração com a Twitch, escutando por comandos enviados pelos moderadores e/ou o streammer para que seja entregue premiações para telespectadores por meio da *feature* de sussuro.

## Contribuindo

Para executar este projeto, você precisa ter o Node 13+ instalado e uma conta na Twitch (o ideal é criar uma nova, somente para o bot). Para utilizar o recurso de sussurro, o seu bot precisa ter uma conta verificada pela Twitch (entenda melhor [nessa issue](https://github.com/micebot/pubsub/issues/1)). É um processo bem simples, basta preencher [esse formulário](https://dev.twitch.tv/limit-increase) com os respectivos dados do seu bot. Depois disso...

1. Clone esse repositório e instale as dependências:
```
git clone https://github.com/micebot/pubsub.git

cd ./pubsub
yarn install
```

2. Depois disso, é necessário especificiar algumas variáveis de ambiente. Você pode vê-las no arquivo [.env.example](.env.example). Uma vez que todas as variáveis estejam definidas, execute o comando de build:

```
yarn build
```

3. E então execute o bot com:

```
yarn start

[XX:XX] info: Connecting to irc-ws.chat.twitch.tv on port 80..
[XX:XX] info: Sending authentication to server..
[XX:XX] info: Connected to server.
[XX:XX] info: Executing command: JOIN #codigofalado
[XX:XX] info: Joined #codigofalado
```

## Comandos

`!book @user` - verifica a disponibilidade de E-books no [servidor][11] e realiza o envio do código automaticamente para o(s) usuário(s) mencionado(s).

<details>
<summary>Visualizar Exemplos de Utilização</summary>
<p>

```
!book @milaxd                   // somente um usuário.
!book @rn4n @milaxd             // múltiplos usuários.
```
<kbd>![](https://raw.githubusercontent.com/micebot/assets/master/pubsub/usage.gif)</kbd>

</p>
</details>

## Development status

| Branch | Pipeline | Coverage |
| ------ | ----- | ----- |
| **Development** | [![pipeline status][1]][2] | ![coverage report][3]] |
| **Master** | [![pipeline status][5]][6] | ![coverage report][7] |

[1]:https://gitlab.com/micebot/pubsub-ci/badges/development/pipeline.svg
[2]:https://gitlab.com/micebot/pubsub-ci/-/pipelines?page=1&scope=all&ref=development
[3]:https://gitlab.com/micebot/pubsub-ci/badges/development/coverage.svg
[5]:https://gitlab.com/micebot/pubsub-ci/badges/master/pipeline.svg
[6]:https://gitlab.com/micebot/pubsub-ci/-/pipelines?page=1&scope=all&ref=master
[7]:https://gitlab.com/micebot/pubsub-ci/badges/master/coverage.svg
[9]:https://github.com/codigofalado/desafio333
[10]:https://www.twitch.tv/codigofalado
[11]:https://github.com/micebot/server
