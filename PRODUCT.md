# PRODUCT.md — Loja Status

## Visão do Produto

**Loja Status** é uma loja multimarca com mais de 40 anos em São Francisco de Assis/RS. Grandes marcas, produtos originais e envio para todo o Brasil. Este sistema é a versão digital: uma vitrine editorial que troca a atmosfera cromática conforme a cor da peça, com um ERP mínimo acoplado que cobre cadastro, estoque, pedidos, caixa e PDV.

## Público & Contexto de Uso

- **Quem compra:** clientes que buscam marcas reconhecidas e produtos originais, com atendimento próximo e entrega em todo o Brasil.
- **Como chegam:** Instagram, indicação, WhatsApp e navegação direta, predominantemente pelo celular.
- **O que decidem em segundos:** ver a peça em movimento, conferir cores e numeração disponíveis e finalizar sem fricção — pelo WhatsApp ou, quando ativado, pelo Pix com QR Code.
- **Quem opera:** a equipe da loja e o super administrador, em perfis distintos. Áreas sensíveis são exclusivas do super admin.

## Estado Atual

**Fase 1 — vitrine editorial (entregue).** Next.js (App Router, TypeScript, Tailwind, Motion), catálogo no banco, transições orbitais, seletor de cor que muda a atmosfera da tela, sacola lateral e geração de pedido para WhatsApp.

**Fase 2 — ERP mínimo (entregue).** Neon (PostgreSQL) + Prisma, deploy na Vercel, Auth.js v5 com Google e allowlist dinâmica. Cadastro de peças com várias cores, imagem recortada no navegador, atmosfera automática e alterável, categorias, estoque por cor/tamanho, arquivamento e exclusão de peças. Pedidos com confirmação, envio, entrega, cancelamento com estorno e pós-venda (troca/devolução/defeito). Comissão configurável, relatório financeiro, CSV e notas fiscais manuais.

**Fase 3 — PDV e pagamentos (entregue, desligado em produção).** Venda na loja com grade de peças, carrinho por unidade, desconto por peça ou no pedido em R$ ou %, resumo com itens/desconto/subtotal/taxas/total. Clientes com CPF/CNPJ mascarado e reaproveitamento do cliente no Asaas. Integração com Asaas preparada: cobrança Pix com split em valor fixo, webhook com idempotência e estornos. O gateway está desativado por padrão — a vitrine continua operando só com WhatsApp até as credenciais de produção serem configuradas e o super admin ligar o Pix.

## Identidade Visual

Verde oliva profundo (`#2B4538`), dourado/amarelo queimado (`#D2AF46`), preto (`#0A0A0A`) e creme (`#F7F1E6`). A atmosfera de cada peça é derivada da sua cor, com pickers automáticos e ajustáveis. Detalhes em `DESIGN.md`.

## Decisões de Plataforma (não reabrir sem ADR)

- **Backend:** Next.js (Route Handlers / Server Actions), com regras de negócio puras em `src/domain/`, isoladas de React/Prisma.
- **Banco:** Neon (PostgreSQL) com `DATABASE_URL` poolada e `DIRECT_URL` para migrations. Prisma 6.19.3.
- **Deploy:** Vercel, automático a partir de `main`.
- **Autenticação:** somente área administrativa, via Auth.js v5 + Google. Allowlist no banco; primeira conta vira super admin. Detalhes em `docs/09-AUTH.md`.
- **Fotos:** Cloudflare R2 com cota de 1 GB ajustável pelo super admin; remoção de fundo no navegador.
- **Fechamento:** WhatsApp (`wa.me`, sem API paga) como padrão. Gateway Asaas disponível, desligado até homologação. Nenhum desconto é exibido sem ser aplicado.
- **Fiscal:** sem emissor pago. Detalhes em `docs/08-FISCAL.md`.
- **Comissão:** percentual configurável da margem bruta por peça (preço recebido − custo), com prazo de arrependimento por origem da venda. Ver `docs/07-COMMERCE-AND-MONEY.md`.
- **Textos técnicos:** nunca aparecem na interface — ficam em `docs/`.

## Verificação

`npm run verify` (typecheck, lint, testes unitários/de integração, build) e `npm run test:e2e` antes de publicar. Testes de integração usam o banco com dados temporários e cleanup; testes do gateway usam mocks, sem depender de conta externa.
