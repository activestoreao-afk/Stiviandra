# STIVIANDRA MENDONÇA — Um Pequeno Universo

Site estático criado do zero a partir das 6 fotografias reais fornecidas.

## Estrutura

```text
stiviandra_universo/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── fotos/
    ├── foto1.jpg
    ├── foto2.jpg
    ├── foto3.jpg
    ├── foto4.jpg
    ├── foto5.jpg
    └── foto6.jpg
```

## Como abrir

Basta abrir `index.html` num navegador.

O projeto usa apenas HTML, CSS, JavaScript e as seis fotografias. Não há vídeo, áudio ou dependência de biblioteca externa.

## GitHub Pages

1. Cria um repositório no GitHub.
2. Envia todos os ficheiros mantendo a estrutura das pastas.
3. Em Settings → Pages, seleciona a branch principal e a pasta `/root`.
4. Guarda e abre o endereço publicado.

## Notas

- Os caminhos são relativos e compatíveis com GitHub Pages.
- A galeria é responsiva.
- Há suporte para `prefers-reduced-motion`.
- As animações são leves e não dependem de bibliotecas.


### Correção da versão 2
A animação de reveal foi tornada tolerante a falhas: se o JavaScript não carregar, o conteúdo continua visível. Quando o JavaScript carrega, as entradas suaves são ativadas normalmente.
