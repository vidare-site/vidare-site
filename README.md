# Vidare — correções de leitura, SEO e desempenho

1. **O que foi escolhido**

   O projeto usa React e Vite. Cada página agora é transformada em HTML pronto durante a preparação do site.
   Isso mantém a base e o visual do projeto e evita contratar um servidor novo.
   O JavaScript fica responsável pelas interações; o conteúdo principal já está no arquivo entregue ao visitante.

2. **O que foi corrigido**

   - 36 páginas prontas: início, blog, seis serviços e cadastro, em português, inglês, espanhol e sueco.
   - Um H1 e uma área principal por página, títulos em ordem e respostas das dúvidas presentes no HTML.
   - Links para os serviços existentes, sem criar conteúdo clínico novo.
   - Títulos de até 60 caracteres, descrições de até 155, endereço principal, equivalências entre idiomas e prévias para redes sociais.
   - Dados estruturados de Ricardo Correa, credencial CRP 05/40839, serviço profissional e serviços apresentados.
   - Domínio principal: https://vidare.eu. Regras preparadas para redirecionar www, HTTP e endereços antigos com status 301.
   - Páginas desconhecidas recebem 404 pelo código preparado para Cloudflare Pages. Há também um arquivo 404.html.
   - Sitemap com 32 endereços públicos; cadastro fora do sitemap e marcado para não indexação.
   - robots.txt e llms.txt consistentes com o domínio principal.
   - JavaScript essencial excluído do Rocket Loader; imagens menores, tamanhos declarados e fontes com troca de fonte permitida durante o carregamento.
   - O vídeo inicial usa uma imagem enquanto carrega e baixa apenas a versão adequada à tela. Respeita preferência por menos movimento e economia de dados quando disponível.
   - Escolha de cookies com aceitar, recusar e reabrir preferências. Instagram externo depende de uma escolha própria.
   - Eventos de WhatsApp, e-mail e sucesso do formulário de contato dependem de consentimento. O código não envia os campos preenchidos para o Google Analytics. O cadastro clínico fica sem análise.

3. **Como ver no computador**

   As alterações já estão nesta pasta do projeto. Para abrir uma prévia fora das restrições do ambiente de edição, abra o Terminal do Mac e cole:

   ```sh
   cd '/Users/ricardo/Documents/VIDARE VERSAO BOA 2'
   npm run build
   npm run preview
   ```

   Abra http://127.0.0.1:4173/pt no navegador. Para encerrar a prévia, volte ao Terminal e pressione Control+C.

   Para repetir a verificação automática:

   ```sh
   npm run verify:seo
   ```

4. **O que falta para entrar no ar**

   Este projeto é publicado no Cloudflare Pages a partir do repositório https://github.com/vidare-site/vidare-site. A versão usa as dependências, o visual e os textos atuais do GitHub, com as correções de HTML e SEO. A inspeção de URL e o envio de sitemap no Search Console continuam dependendo da conta proprietária.

   O pacote está preparado para Cloudflare Pages, que atende este site com arquivos prontos. O histórico de publicação do repositório confirma o uso do Pages. O redirecionamento e o status 404 dependem de aplicar as regras no servidor que realmente atende o domínio; apenas trocar o JavaScript da página não resolve essa parte.

   Se o projeto atual estiver em Cloudflare Pages:

   1. Abra https://dash.cloudflare.com e entre na sua conta.
   2. Entre em **Workers & Pages** e abra o projeto que já atende vidare.eu.
   3. Se houver **Create deployment / Criar implantação**, envie o conteúdo da pasta `dist` preparada no pacote, incluindo `_worker.js` e `_routes.json`. O `index.html` deve estar na raiz do envio.
   4. Se a publicação for feita a partir de um repositório, use `npm run build` como comando de preparação e `dist` como pasta de saída. Os arquivos-fonte corrigidos estão no pacote.
   5. Confira em **Custom domains / Domínios personalizados** que os dois nomes, vidare.eu e www.vidare.eu, chegam ao projeto. A regra 301 só pode funcionar se o nome com www chegar ao servidor.
   6. Depois da publicação, repita os testes do passo 6.

   A pasta `dist` inclui um programa pequeno de roteamento para Pages. Em outra hospedagem, a pessoa responsável pela publicação precisa aplicar os mesmos redirecionamentos e servir `404.html` com status 404. O código completo dessas regras está em `deployment/handler.mjs`.

   Se o Cloudflare bloquear rastreadores de IA na conta, permitir acesso no robots.txt não supera esse bloqueio. Essa configuração da conta ainda precisa ser conferida. Também deve ser conferida qualquer ferramenta de análise que o painel injete automaticamente, pois ela não é controlada pelos arquivos do projeto.

5. **Configuração de privacidade do Google Analytics**

   O identificador já existente, `G-7QMVYD805R`, foi preservado. O código só o carrega após aceitar os cookies e mantém publicidade e personalização desativadas.

   Antes de publicar, abra https://analytics.google.com, selecione a propriedade correspondente e siga **Administrador → Fluxos de dados → fluxo do site → Medição otimizada**. Desative a medição automática nesse fluxo e confira que coleta de dados fornecidos pelo usuário e conversões otimizadas não estão ativadas. Isso evita que opções da sua conta acrescentem eventos além dos três definidos no código.

   Os eventos preparados são `whatsapp_click`, `email_click` e `contact_form_success`. O último só é enviado depois que o Formspree confirma o sucesso. Não representa confirmação de consulta. O cadastro clínico não produz esses eventos.

   As preferências expiram após 180 dias e podem ser alteradas no rodapé. A configuração técnica não substitui a política de privacidade nem a avaliação dos contratos com Google, Formspree e Elfsight. Não foi feita uma certificação jurídica de conformidade com LGPD ou GDPR.

6. **Como verificar depois de publicar**

   1. **HTML pronto:** abra https://vidare.eu/pt. No Chrome, pressione Option+Command+U e procure “Psicoterapia online para adultos”. O H1 e os parágrafos devem aparecer no código-fonte. Faça o mesmo em https://vidare.eu/pt/services/emdr.
   2. **Terminal:** cole `curl -sSL https://vidare.eu/`. A opção `-L` acompanha o redirecionamento da raiz para `/pt`. O resultado deve conter o H1 e o texto principal, sem executar JavaScript.
   3. **Redirecionamento:** cole `curl -I https://www.vidare.eu/pt`. Espere status 301 e `Location: https://vidare.eu/pt`.
   4. **Erro real:** cole `curl -I https://vidare.eu/pt/pagina-inexistente`. Espere status 404.
   5. **Dados estruturados:** abra https://search.google.com/test/rich-results, escolha **URL**, cole https://vidare.eu/pt e clique em **Testar URL**. Repita para a página de EMDR. Use também https://validator.schema.org para conferir os tipos gerais do Schema.org.
   6. **Search Console:** abra https://search.google.com/search-console, selecione a propriedade do domínio, cole https://vidare.eu/pt na inspeção, clique em **Testar URL publicada** e, após aprovação, **Solicitar indexação**. Repita nas páginas principais. Em **Sitemaps**, envie https://vidare.eu/sitemap.xml.
   7. **Desempenho:** abra https://pagespeed.web.dev, cole https://vidare.eu/pt, clique em **Analisar** e escolha **Celular**. Compare com o relatório registrado em `RELATORIO.md`.
   8. **Contatos e cookies:** em uma janela anônima, recuse os cookies e confira o funcionamento do WhatsApp e do e-mail. Depois reabra as preferências e aceite. A confirmação dos eventos na conta do Analytics depende da publicação e do acesso à conta. Não envie informações reais de pacientes para testar.

7. **Sobre o resultado do teste do Google**

   Os arquivos JSON-LD passaram na análise local de sintaxe e consistência. O teste externo de Resultados Avançados não foi concluído porque a sessão do navegador ficou indisponível. Search Console não foi acessado.

   Um `ProfessionalService` exclusivamente online, sem endereço público, pode não preencher os requisitos do Google para a aparência de “negócio local”. Nenhum endereço foi inventado para preencher esse requisito. Dados válidos no Schema.org não garantem um destaque nos resultados, nem inclusão nas respostas de ferramentas de IA.

8. **Arquivos do pacote**

   - `dist/`: versão preparada para publicação no Cloudflare Pages.
   - `src/`, `public/`, `scripts/`, `deployment/`, `tests/`: código editável e testes.
   - `CODIGO_COMPLETO.md`: conteúdo integral de cada arquivo de texto criado ou alterado, em ordem de aplicação.
   - `RELATORIO.md`: resultados observados e verificações ainda pendentes.
   - `seo-validation.json`: títulos, H1 e contagens de caracteres das 32 páginas verificadas.
   - `ALTERACOES.patch`: comparação dos arquivos de texto com a cópia anterior.

9. **Referências técnicas usadas**

   - Google: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
   - Dados estruturados: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
   - Cloudflare Pages: https://developers.cloudflare.com/pages/functions/advanced-mode/
   - Envio de arquivos: https://developers.cloudflare.com/pages/get-started/direct-upload/
   - Rocket Loader: https://developers.cloudflare.com/speed/optimization/content/rocket-loader/ignore-javascripts/
   - Medição automática do Analytics: https://support.google.com/analytics/answer/9216061
