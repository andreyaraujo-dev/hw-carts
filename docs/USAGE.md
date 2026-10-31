# Guia de uso

## Pré-requisitos

- Node.js 20+
- API `microservice-hw-carts` disponível
- Credenciais do Google se o login OAuth estiver habilitado

## Preparar o ambiente

```bash
npm install
cp .env.example .env.local
```

Configure `NEXT_PUBLIC_API_URL` com a URL da API e os valores de autenticação (`AUTH_URL`, `AUTH_SECRET` e credenciais Google quando aplicável).

## Executar

```bash
npm run dev
```

Abra `http://localhost:3000`, faça login e acesse o dashboard.

## Fluxo de gerenciamento

1. Faça login na tela inicial.
2. Na coleção, consulte os carrinhos carregados pela API.
3. Use a ação de adicionar para criar um carrinho e anexar uma imagem.
4. Pela tabela, edite dados, favorite registros ou exclua um ou vários itens.
5. Atualize a página para confirmar a persistência no backend.

## Produção

```bash
npm run build
npm start
```

Mantenha `NEXT_PUBLIC_API_URL` apontando para a API publicada e nunca versiona segredos no repositório.
