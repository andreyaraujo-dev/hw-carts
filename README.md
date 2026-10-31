# HW Carts

Frontend web para visualização e gerenciamento de carrinhos, desenvolvido com Next.js e integrado à API `microservice-hw-carts`.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## Visão geral

O sistema oferece uma interface autenticada para consultar a coleção, adicionar carrinhos, editar registros, marcar favoritos e remover itens. A autenticação usa NextAuth e o backend é configurado por `NEXT_PUBLIC_API_URL`.

## Stack

- Next.js e React
- TypeScript
- NextAuth
- Tailwind CSS e componentes Radix/shadcn
- Integração HTTP com a API de carrinhos

## Configuração local

Pré-requisitos: Node.js 20+, a API de carrinhos em execução e credenciais OAuth do Google se esse provedor for utilizado.

```bash
npm install
cp .env.example .env.local
```

Revise `AUTH_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`.

## Executando

```bash
npm run dev
```

Acesse `http://localhost:3000`. Para uma versão de produção:

```bash
npm run build
npm start
```

## Fluxo principal

1. Acesse a tela inicial e faça login.
2. Abra o dashboard para consultar os carrinhos.
3. Use a tela de inclusão para cadastrar um carrinho, incluindo imagem quando necessário.
4. Edite, favorite ou exclua registros pela tabela da coleção.

O guia detalhado está em [`docs/USAGE.md`](docs/USAGE.md). A API correspondente está no projeto [`microservice-hw-carts`](../microservice-hw-carts).

## Screenshots

Coloque os prints do frontend em [`assets/screenshots/`](assets/screenshots/). Exemplo:

```md
<!-- ![Dashboard de carrinhos](assets/screenshots/dashboard.png) -->
```

## Desenvolvimento

```bash
npm run lint:fix
npm run format
```
