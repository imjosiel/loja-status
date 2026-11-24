# 08 — Fiscal (Rio Grande do Sul)

> **Este arquivo não é código.** Regras fiscais mudam; confirme sempre com contador antes de agir. Aqui está registrado apenas o estado atual das decisões para o agente não ficar "re-litigando" a mesma escolha a cada sessão.

## 1. Situação atual

| Fato | Valor |
|---|---|
| Local | São Francisco de Assis, **Rio Grande do Sul** |
| Abrangência de vendas | **Envio para todo o Brasil** |
| Situação da loja | **Estabelecida, com CNPJ, há mais de 40 anos** |
| Atividade | Comércio varejista de vestuário e calçados — grandes marcas, produtos originais |

## 2. Enquadramento

O enquadramento tributário **deve ser confirmado com o contador da loja**. O sistema não presume regime, CNAE nem inscrição estadual: ele apenas registra o número da nota emitida fora dele.

| Item | Definição |
|---|---|
| Tributo | **ICMS** (estadual, SEFAZ-RS) para mercadorias. Não é ISS. |
| CFOP | `5.102` (revenda de mercadoria adquirida de terceiros) como padrão — confirmar. |
| Inscrição Estadual | Confirmar com o contador. |

## 3. Emissão de documento fiscal

**Nenhum emissor pago. Nenhuma integração com gateway de nota.**

| Momento | Regra |
|---|---|
| Cliente pede nota | Emitir. CDC obriga. |
| Vendas interestaduais | Observar a regra do estado de destino e a IE da loja. |
| Documento fiscal | Confirmar com o contador qual emissor usar (NFF, emissor próprio ou outro). |

Ferramentas oficiais do RS (gratuitas): NFF (`Nota Fiscal Fácil`, conta gov.br), NFA-e e emissor do Sebrae.

Ferramentas oficiais do RS (todas gratuitas):

- **NFF** — app `Nota Fiscal Fácil`, login com conta gov.br. Emite NF-e (55) e NFC-e (65). **Recomendada.**
- **NFA-e** — emissor web em `sefaz.rs.gov.br/NFE/nfe-nfa-mei.aspx`.
- **Emissor do Sebrae** — alternativa.

### O que o app faz e o que não faz

O app **não calcula imposto** e **não emite nota**. Ele apenas registra o que aconteceu fora dele, para o relatório mensal ao contador:

```prisma
nfNumber  String?  // preenchido manualmente no admin após emitir na NFF
cfop      String   @default("5.102")
```

Na Fase 1 o campo `nfNumber` fica no cartão de cada pedido em `/admin` (salvo ao sair do campo) e entra no CSV exportado — é o relatório entregue ao contador.

CFOP para venda **interna** (dentro do RS):

- `5.101` — produção própria (se ela confeciona as peças)
- `5.102` — revenda de mercadoria adquirida de terceiros

**Confirmar com o contador qual dos dois se aplica** antes de fixar o default. Se for produção própria, trocar o default para `5.101`.

NCM: opcional no cadastro. Só é obrigatório em operação interestadual/exportação — **fora do escopo** (vendemos só no RS).

## 4. Repositórios da Receita (referência, não dependência)

Os três repositórios citados no planejamento:

| Repo | Uso aqui |
|---|---|
| `calculadora-rtc-regime-regular` | **Fora do caminho crítico.** Serviço Java/Spring separado; não roda dentro do Next/Vercel. Consultar só se o regime mudar para normal. |
| `calculadora-rtc-simples-nacional` | **Referência futura.** Regras CBS/IBS para Simples só produzem efeitos em 01/01/2027 (CGSN 191/2026). Revisitar em dezembro/2026. |
| `calculadora-rtc-gerador-danfse` | **Descartado.** Gera PDF de NFS-e (serviço). Nosso caso é ICMS (produto). Nem se aplica. |

Se um dia virar dependência, usar como **oráculo de teste** (comparar implementação própria com a API oficial), nunca no request path. Guardar `taxRulesVersion` em cada pedido. **Hoje: não implementar nada disso.**

## 5. Asaas / Stripe / WhatsApp API

| Item | Decisão | Motivo |
|---|---|---|
| Asaas com emissão de nota | **Não usar na Fase 1** | NFF é gratuita. Além disso, o emissor do Asaas é NFS-e (serviço); NF-e/NFC-e vai pelo Base by Asaas, a R$ 0,49. Sem sentido pagar. |
| Gateway de pagamento | **Não usar na Fase 1** | Pix direto é gratuito. Se um dia entrar, o evento "pago" do gateway é útil — R$ 1,99 por Pix no Asaas pode valer a automação. Reavaliar quando o volume justificar. |
| Stripe | **Não usar** | Foco é Brasil, Pix/boleto. Stripe só se vender para fora. |
| WhatsApp Cloud API | **Não usar** | `wa.me` gratuito atende. Cloud API cobra por mensagem desde 01/10/2026 (1.000 mensagens de serviço grátis/mês), exige número dedicado e webhook. Reavaliar acima de ~1k mensagens/mês. |
| Baileys / Evolution API | **Nunca** | Não oficiais; risco de banir o número da loja. |

## 6. Obrigações da loja (fora do app, mas registrar)

- CDC art. 49 — 7 dias de arrependimento em compra fora do estabelecimento (já modelado em `07`, §4).
- Decreto 7.962/2013 — a página de venda deve mostrar nome empresarial, CNPJ, endereço, despesas de entrega e prazo, e informar como exercer o arrependimento. A rota **`/politicas`** já traz troca/arrependimento, privacidade e identificação; os dados vêm de `NEXT_PUBLIC_STORE_*` (`.env.example`).
- Guardar notas de compra e venda pelo prazo legal.
- Obrigações acessórias conforme o regime confirmado pelo contador.

## 7. Checklist antes de marcar "fiscal pronto"

- [ ] CNPJ e IE da loja confirmados com o contador
- [ ] Contador confirmou CFOP (5.101 vs 5.102)
- [ ] Contador confirmou o emissor de nota adequado
- [ ] Dados do Decreto 7.962/2013 preenchidos em `NEXT_PUBLIC_STORE_*`
- [ ] `nfNumber` sendo preenchido no admin após a emissão
- [ ] Revisão tributária agendada conforme a mudança das regras (CBS/IBS)
