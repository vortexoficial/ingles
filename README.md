# Speak Up Landing Page

Landing page estática e responsiva da Speak Up com quiz de diagnóstico em múltiplas etapas.

## Estrutura criada

- Landing page principal em [index.html](index.html)
- Estilos globais e do quiz em [styles.css](styles.css)
- Interações da landing em [script.js](script.js)
- Página do quiz em [quiz/index.html](quiz/index.html)
- Lógica multi-step com salvamento parcial em [quiz/quiz-script.js](quiz/quiz-script.js)

## Wireframe textual

1. Header com marca, navegação enxuta e CTA fixo para o diagnóstico.
2. Hero com headline principal, subheadline, CTAs e blocos de confiança.
3. Seção de promessa da marca com quatro cards de posicionamento.
4. Seção de metodologia com grade de recursos e diferenciais.
5. Bloco de oferta/rotina com destaque comercial opcional.
6. Seção educativa sobre sinais de progresso no inglês.
7. Seção para quem a experiência faz sentido.
8. Bloco de prova social com depoimentos curtos.
9. Banner de CTA para o quiz.
10. FAQ em accordion.
11. Fechamento com CTA final.
12. Página separada de quiz com cinco etapas, barra de progresso e estado de sucesso.

## Componentização sugerida

- Header
- HeroSection
- PromiseCards
- MethodSection
- OfferBlock
- ProgressCards
- AudienceSection
- TestimonialsSection
- QuizBanner
- FaqAccordion
- FinalCta
- Footer
- QuizShell
- QuizProgress
- QuizStepFields
- QuizSuccessState

## Especificação do quiz

- Formato multi-step com cinco etapas.
- Indicador de progresso visual e textual.
- Salvamento parcial via localStorage.
- Campo condicional de tempo de estudo quando a pessoa não é iniciante absoluta.
- Validação básica de campos obrigatórios e e-mail.
- Estado final de sucesso com opção de reiniciar.

## Observação de tipografia

O layout usa Inter como fonte de corpo e um fallback de display em Fraunces. Se a marca tiver licença e arquivo web da Gliker Regular, basta substituir a família declarada em [styles.css](styles.css).