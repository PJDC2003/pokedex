# Trilha JS Developer - Pokedex
Inspiração: https://dribbble.com/shots/6540871-Pokedex-App

https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/
--> backgrounds svg gratuitos

INTRODUÇÃO A APIs
API --> servidor que fornece dados

Como funcionam as requisições --> inspecionar - network - reload page
É possível ver request URL, request method (GET p.e.) e status code (200-299 é sucesso)
GET significa que foram pedidas informações ao request URL e foram enviadas com sucesso

Requisição HTTP

URL: https://pokeapi.co/api/v2/pokemon
     ${Endereço}/${path} --> caminho de identificação do recurso

        Endereço IP: https://pokeapi.co é semelhante a http://127.0.0.1:300

        path: /api/v2/pokemon

Path params: https://pokeapi.co/api/v2/pokemon/{id} (id: identificação do recurso)
        
Query String: a seguir a ?, caso tenha, estrutura chave:valor
Ex: https://pokeapi.co/api/v2/pokemon?type=name&name=i

Request Method (o que quero fazer com o recurso): GET (buscar) | POST (inserir) | PUT (atualizar) | DELETE (remover) | PATCH

Response Headers --> servidor
Request Headers --> o que cliente pede, neste caso browser.

Accept (o que aceitamos): image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8

Accept-Language:
en-GB,en;q=0.9,  (q = prioridade)
pt-PT;q=0.8,
pt;q=0.7

O que realmente recebemos: Content-Type: image/svg+xml

==============
Exemplo com post

Request Headers
    content-type: application/json

Body --> corpo da requisição   (com o get não há body no request headers)
{
    "name":"teste"
}
======

Resumindo: Requisição HTTP

- URL
- Request Method
- Request Headers
- Request Body  ---> até aqui compus uma requisição, mandei para o servidor, que vai processar e devolve um status code
- Status Code       (200 - ok)   https://httpstatusdogs.com/
- Response Headers  (como a resposta está configurada)
- Response Body     (resposta em si, não obrigatório)



Requisição HTTP via javaScript --> existem várias formas mas é mais fácil é utilizar a biblioteca Fetch API

**Códigos GIT**
git --help
git clone <url>
git status --> arquivos modificados
git add ./ --> changes to be committed
git commit -m "Adição de modificações" --> modificações salvas no repositório local
git log --oneline  --> ver modificações
git remote -v
git branch --> ver branch atual
git push origin <branch>  --> guardar no repositório global

