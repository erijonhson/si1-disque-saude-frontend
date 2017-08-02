### Instalação das dependências

Primeiramente, devemos ter o bower, grunt-cli e o karma-cli instalados globalmente. Para isso, execute no terminal de comando a seguinte linha de comando:

```bash
npm install -g bower grunt-cli karma-cli
```
Após isso, devemos instalar as dependências do projeto que estão descritas no arquivo 'package.json'. Para isso, execute no terminal a seguinte linha de comando:

```bash
npm install
```
Dentro do arquivo 'package.json' existe uma requisição de execução automática do `bower install`. Após isso, serão criados automaticamente as duas pastas abaixo:

* `node_modules` - contém o pacotes npm que serão utilizados pela ferramenta;
* `app/bower_components` - contém os arquivos referentes ao AngularJS framework

### Executando a aplicação

Após finalizar as instalações das dependências, teremos um servidor simples no qual iremos executar a aplicação. Para executar esse servidor, deve-se então executar a seguinte linha de comando no terminal:

```bash
npm start
```

Agora para visualizar a aplicação deve-se abrir no navegador a seguinte url: `http://localhost:8000`.


## Estrutura do projeto

```
app/                                --> all of the source files for the application
  assets/                               --> other application files
    css/                                  --> custom styles
    data/                                 --> custom data
    fonts/                                --> custom fonts
    images/                               --> custom images
    js/                                   --> custom JavaScript files
    libs/                                 --> custom libraries
  bower_components/                     --> the angular framework files
  common/                               --> common application files
    constants/                              --> custom angular constants    
    directives/                             --> custom angular directives    
    filters/                                --> custom angular filters
  core/                                 --> main application files
    app.js                                  --> main application module
    app.routes.js                           --> main application routes
  index.html                            --> app layout file (the main html template file of the app)
build/                              --> minified JavaScript files
node_modules/                       --> the npm packages for the tools we need
coverage/                           --> coverage reports
dist/                               --> concatenated JavaScript files
protractor-test-results/            --> e2e tests results
tests/                              --> tests scenarios
  e2e/                                  --> end-to-end tests
  unit/                                 --> unit tests
unit-test-results/                  --> unit tests results
.bowerrc                            --> bower options file
.gitignore                          --> git ignore file
.jscsrc                             --> JSCS options file
.jshintrc                           --> JSHint options file
.travis.yml                         --> Travis CI config file
Gruntfile.js                        --> Grunt config file
Procfile                            --> define command which starts app
app.json                            --> web application details file
bower.json                          --> runtime dependencies of the project
karma.conf.js                       --> Karma config file (for unit tests)
package.json                        --> development dependencies of the project
protractor-conf.js                  --> Protractor config file (for e2e tests)
server.js                           --> server config file
```
