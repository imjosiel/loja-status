# DESIGN.md — Loja Status

## 1. Essência & Mundo Visual

A identidade da **Loja Status** nasce do logotipo da marca: a palavra **STATUS** em amarelo-dourado sobre preto, acompanhada de uma pequena etiqueta com `%`. Uma marca direta, de leitura imediata, com quatro décadas de história em São Francisco de Assis.

O verde oliva profundo aparece nos destaques e nas superfícies institucionais; o dourado queimado é o acento de destaque. Sobre essa base, aplicamos a linguagem cinética das referências de movimento:

1. **Hero Showcase Orbital & Cromático:** a peça principal flutua em destaque sobre uma palavra editorial monumental em serifa ao fundo. Ao alternar entre peças, a próxima orbita em diagonal até o centro nítido enquanto a anterior recua com *depth-of-field blur*. Trocar a cor no seletor altera a peça real e tinga toda a atmosfera da tela.
2. **Catálogo Editorial Contínuo:** navegação tipográfica por categoria e alternância contínua entre três modos:
   - **Passarela:** carrossel 3D com peça central em foco e vizinhas desfocadas.
   - **Grade:** visão panorâmica com micro-elevação e troca rápida de cor nos cards.
   - **Detalhe:** transição *shared-element* para inspeção, seletor de cores reais, grade de tamanhos e *accordions* informativos.

---

## 2. Paleta de Cores & Atmosferas Dinâmicas

Nunca usamos cinzas neutros frios nem cores neon saturadas. Toda superfície secundária e texto de apoio são tonalizados a partir do par **Creme Quente** e **Verde Oliva Profundo**.

### Tokens Base

| Token | Hex | Uso |
|---|---|---|
| `--bg-cream` | `#F7F1E6` | Fundo principal editorial |
| `--bg-sand` | `#EFE9DC` | Superfícies sutis e divisórias |
| `--bg-latte` | `#E4DCC8` | Bordas orgânicas e pílulas |
| `--ink-espresso` | `#12100C` | Texto primário e títulos |
| `--ink-mocha` | `#6E6858` | Texto secundário tonalizado |
| `--ink-muted` | `#9A927E` | Metadados e estados inativos |
| `--accent-gold` | `#D2AF46` | Destaques, indicadores ativos e foco |
| `--brand-green` | `#2B4538` | Acento institucional, botões e sucesso |

### Atmosferas Cromáticas do Hero (Por Peça / Variação)

Cada variação define um trio harmônico (`atmosphereBg`, `atmosphereGlow`, `atmosphereText`) derivado da cor da peça, com contraste WCAG AA (≥ 4.5:1). Os pickers automáticos podem ser ajustados um a um.

---

## 3. Tipografia

- **Display & Títulos (`--font-serif` — *Cormorant Garamond*):** serifa clássica de alto contraste. Usada nos títulos principais, na palavra monumental atrás da peça e nas categorias editoriais em *outline/fill*.
- **Interface, Corpo & Preços (`--font-sans` — *Plus Jakarta Sans*):** leitura cristalina em tamanhos pequenos, botões, seletores de numeração e *accordions*, sempre com `font-variant-numeric: tabular-nums` em valores monetários.

---

## 4. Diretrizes de Craft & Motion (Guardrails)

- **Recortes Reais (Alpha Matte):** todas as peças flutuantes usam `.webp` com transparência real, sem halo branco, e sombra elíptica independente no piso (blur suave + deslocamento vertical).
- **Física Orgânica:** animações orbitais e transições `layoutId` usam curvas *spring* amortecidas, combinando `transform`, `opacity` e `filter: blur()` para profundidade óptica. Respeito integral a `prefers-reduced-motion`.
- **Sem Clichês de Template:** sem *eyebrows* genéricos acima de todo título, sem texto com gradiente artificial, sem emojis no lugar de ícones vetoriais consistentes e sem sombras duras chapadas.
- **Superfícies do Navegador:** `::selection` em dourado translúcido, barra de rolagem discreta em tom claro, anéis de `:focus-visible` nítidos em `--accent-gold` e alvos de toque mínimos de `44x44px` no mobile.
