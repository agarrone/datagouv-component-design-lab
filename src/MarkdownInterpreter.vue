<script setup>
import '../proposals/shared/foundations.css';
import '../proposals/shared/metadata.css';
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
import { RiArticleLine, RiBracesLine, RiCheckLine, RiDeleteBinLine, RiDownloadLine, RiEyeLine, RiFileCopyLine, RiFileTextLine, RiFullscreenExitLine, RiFullscreenLine, RiPlayLine, RiRestartLine } from '@remixicon/vue';
import { formatMarkdown } from '../vendor/datagouv-components/src/functions/markdown';
import CurrentMarkdownEditor from '../vendor/cdata-components/MarkdownEditor/MarkdownEditor.vue';

const COPY_FEEDBACK_DURATION = 1500;
const ICON_PATHS = {
  check: 'm10 15.172 9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414 4.95 4.95Z',
  clipboard: 'M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z',
  code: 'M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM20 12L16.4645 15.5355L15.0503 14.1213L17.1716 12L15.0503 9.87868L16.4645 8.46447L20 12ZM6.82843 12L8.94975 14.1213L7.53553 15.5355L4 12L7.53553 8.46447L8.94975 9.87868L6.82843 12ZM11.2443 17H9.11597L12.7557 7H14.884L11.2443 17Z',
  download: 'M3 19h18v2H3v-2Zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172Z',
  fullscreen: 'M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z',
  collapse: 'M18 7H22V9H16V3H18V7ZM8 9H2V7H6V3H8V9ZM18 17V21H16V15H22V17H18ZM8 15V21H6V17H2V15H8Z',
  table: 'M4 8H20V5H4V8ZM14 19V10H10V19H14ZM16 19H20V10H16V19ZM8 19V10H4V19H8ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3Z',
};

const examples = {
  complete: { label: 'Référence complète', content: `# Titre de niveau 1 — 28 px

Ce document rassemble les syntaxes prises en charge par l’interpréteur Markdown de data.gouv.fr.

## Titre de niveau 2 — 24 px

### Titre de niveau 3 — 20 px

#### Titre de niveau 4 — 18 px

##### Titre de niveau 5 — 16 px

###### Titre de niveau 6 — 15 px

---

## Texte et emphases

Un paragraphe simple avec du **texte en gras**, du *texte en italique*, du ***gras italique*** et du ~~texte barré~~.

Voici du \`code en ligne\`, un caractère Markdown échappé : \\*astérisque\\*, et une ligne qui se termine par deux espaces  
pour produire un retour à la ligne explicite.

Les liens peuvent être [intégrés au texte](https://www.data.gouv.fr/), écrits sous forme d’URL automatique comme https://www.data.gouv.fr ou utiliser une [référence][documentation].

[documentation]: https://guides.data.gouv.fr/ "Guides data.gouv.fr"

Une image doit comporter un texte alternatif qui décrit son contenu pour les personnes qui ne peuvent pas la voir.

![Capture de l’interface du Design Lab montrant le catalogue de composants data.gouv.fr](/social-preview.png "Aperçu du Design Lab")

## Citations

> Une citation simple peut contenir du **gras** et un [lien](https://www.data.gouv.fr/).
>
> Elle peut s’étendre sur plusieurs paragraphes.
>
> > Une citation peut également être imbriquée.

## Listes

- Élément de liste non ordonnée
- Élément avec sous-liste
  - Sous-élément A
  - Sous-élément B
    1. Niveau ordonné imbriqué
    2. Deuxième niveau ordonné
- Dernier élément

1. Première étape
2. Deuxième étape
3. Troisième étape
   1. Sous-étape
   2. Autre sous-étape

## Liste de tâches

- [x] Élément terminé
- [ ] Élément à faire
- [ ] Élément avec du **texte important**

## Tableau

| Aligné à gauche | Centré | Aligné à droite | Texte long |
| :--- | :---: | ---: | --- |
| Valeur A | 12 | 1 250 € | Une cellule contenant une description plus longue |
| Valeur B | **24** | 980 € | Une cellule avec du *texte mis en valeur* |
| Valeur C | \`CSV\` | 42 € | [Consulter](https://www.data.gouv.fr/) |

## Blocs de code

Bloc avec langage déclaré et coloration syntaxique :

\`\`\`json
{
  "title": "Jeu de données de démonstration",
  "formats": ["CSV", "JSON"],
  "published": true
}
\`\`\`

Bloc sans langage déclaré :

\`\`\`
GET /api/1/datasets/?page_size=20
Accept: application/json
\`\`\`

## HTML nettoyé

Le moteur accepte certains éléments HTML sûrs, par exemple <strong>un texte fort</strong>, <em>une emphase</em> ou un indice H<sub>2</sub>O. Les éléments et attributs dangereux sont supprimés avant affichage.

## Autres caractères

Les entités HTML sont interprétées : &copy; &amp; &rarr;. Les emojis restent du texte : 🇫🇷 📊 ✅.

---

Fin de la référence.` },
  dataset: { label: 'Présentation de données', content: `# Observatoire des mobilités actives

Ce jeu de données rassemble les **comptages vélo** réalisés dans 12 métropoles françaises entre 2019 et 2024.

## À retenir

- plus de **45 millions** de passages observés ;
- des données mises à jour chaque mois ;
- un historique harmonisé et documenté.

> Les valeurs sont consolidées le 5 de chaque mois. Les données les plus récentes peuvent encore évoluer.

| Territoire | Compteurs | Dernière mise à jour |
| --- | ---: | --- |
| Bordeaux Métropole | 18 | 05/11/2026 |
| Métropole de Lyon | 24 | 04/11/2026 |
| Nantes Métropole | 15 | 05/11/2026 |

Consultez la [documentation complète](https://www.data.gouv.fr/) avant toute réutilisation.

\`\`\`json
{
  "frequence": "mensuelle",
  "format": "CSV",
  "licence": "Licence Ouverte 2.0"
}
\`\`\`` },
  guide: { label: 'Guide de contribution', content: `# Contribuer au catalogue

Merci de contribuer à l'amélioration des données publiques.

## Avant de commencer

1. Vérifiez que le jeu de données n'existe pas déjà.
2. Préparez une description claire et réutilisable.
3. Choisissez une licence compatible avec l'ouverture des données.

### Liste de contrôle

- [x] Le producteur est identifié
- [x] Les fichiers sont documentés
- [ ] La fréquence de mise à jour est renseignée
- [ ] Un point de contact est disponible

Pour toute question, écrivez à **support@data.gouv.fr**.` },
  release: { label: 'Notes de version', content: `# Version 2.4.0

Cette version améliore la qualité des métadonnées et la navigation dans le catalogue.

## Nouveautés

- ajout des filtres par couverture géographique ;
- prévisualisation des ressources tabulaires ;
- nouveaux indicateurs de qualité.

## Correction

Le téléchargement des fichiers volumineux fonctionne à nouveau sur Safari.

---

Publié le **17 novembre 2026**.` },
};

const markdown = ref(examples.complete.content);
const currentEditorInitialValue = `### Présentation du jeu de données

Ce jeu de données rassemble des **indicateurs territoriaux** publiés sur data.gouv.fr.

- données mises à jour chaque mois ;
- documentation disponible en ligne ;
- formats CSV et JSON.

| Format | Mise à jour |
| --- | --- |
| CSV | Mensuelle |
| JSON | Mensuelle |

Consultez la [documentation](https://guides.data.gouv.fr/) avant toute réutilisation.`;
const currentEditorValue = ref(currentEditorInitialValue);
const currentEditorReady = ref(false);
const githubEditorValue = ref(currentEditorInitialValue);
const githubEditorMode = ref('visual');
const githubEditorExpanded = ref(false);
const githubEditorHost = ref(null);
const githubEditorReady = ref(false);
const activeExample = ref('complete');
const copied = ref(false);
const editor = ref(null);
const activePane = ref('write');
const preview = ref(null);
const previewMarkdown = ref(markdown.value);
const isStreaming = ref(false);
let streamTimer;
const rendered = computed(() => formatMarkdown(previewMarkdown.value, { minDepth: 1, noHeadings: false, followLinks: false }));
const wordCount = computed(() => markdown.value.trim() ? markdown.value.trim().split(/\s+/).length : 0);
const characterCount = computed(() => markdown.value.length);
const lineCount = computed(() => markdown.value ? markdown.value.split('\n').length : 0);

function selectExample(key) {
  stopStream();
  activeExample.value = key;
  markdown.value = examples[key].content;
  nextTick(() => editor.value?.focus());
}
function reset() { selectExample('complete'); }
function updateCurrentEditor(value) { currentEditorValue.value = value; }
function setGithubEditorMode(mode) {
  if (mode === githubEditorMode.value) return;
  const selector = mode === 'raw' ? '[title="Voir le markdown"]' : '[title="Voir le HTML"]';
  const toggle = githubEditorHost.value?.querySelector(selector);
  if (!toggle) return;
  toggle.click();
  githubEditorMode.value = mode;
}
function clearMarkdown() {
  stopStream();
  activeExample.value = '';
  markdown.value = '';
}
function stopStream() {
  if (streamTimer) window.clearInterval(streamTimer);
  streamTimer = undefined;
  isStreaming.value = false;
  previewMarkdown.value = markdown.value;
}
function simulateStream() {
  if (isStreaming.value) { stopStream(); return; }
  let cursor = 0;
  previewMarkdown.value = '';
  isStreaming.value = true;
  activePane.value = 'preview';
  streamTimer = window.setInterval(() => {
    cursor = Math.min(cursor + 20, markdown.value.length);
    previewMarkdown.value = markdown.value.slice(0, cursor);
    if (cursor >= markdown.value.length) stopStream();
  }, 35);
}
async function copyHtml() {
  try {
    await navigator.clipboard.writeText(rendered.value);
    copied.value = true;
    window.setTimeout(() => { copied.value = false; }, COPY_FEEDBACK_DURATION);
  } catch { copied.value = false; }
}
function downloadMarkdown() {
  const url = URL.createObjectURL(new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'contenu.md';
  link.click();
  URL.revokeObjectURL(url);
}

function blockText(block) {
  const lines = block.querySelectorAll('.code-line > span:last-child');
  if (lines.length) return [...lines].map(line => line.textContent).join('\n');
  return block.querySelector('code')?.textContent || block.querySelector('table')?.innerText || '';
}
function downloadText(text, filename, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
function tableToCsv(table) {
  return [...table.rows].map(row => [...row.cells].map(cell => `"${cell.innerText.replaceAll('"', '""')}"`).join(',')).join('\n');
}
function createIcon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', ICON_PATHS[name]);
  svg.append(path);
  return svg;
}
function setActionContent(button, icon, label) {
  button.replaceChildren(createIcon(icon));
  const text = document.createElement('span');
  text.textContent = label;
  button.append(text);
  button.setAttribute('aria-label', label);
  button.title = label;
}
async function handlePreviewAction(event) {
  const button = event.target.closest('[data-block-action]');
  if (!button) return;
  const block = button.closest('.rich-block');
  const action = button.dataset.blockAction;
  if (action === 'copy') {
    try {
      await navigator.clipboard.writeText(blockText(block));
      button.dataset.copied = 'true';
      setActionContent(button, 'check', 'Copié');
      block.querySelector('[data-copy-status]').textContent = 'Contenu copié dans le presse-papiers';
      window.setTimeout(() => {
        button.dataset.copied = 'false';
        setActionContent(button, 'clipboard', 'Copier');
        block.querySelector('[data-copy-status]').textContent = '';
      }, COPY_FEEDBACK_DURATION);
    } catch {
      block.querySelector('[data-copy-status]').textContent = 'La copie a échoué';
    }
  }
  if (action === 'download-code') {
    const extension = button.dataset.language || 'txt';
    downloadText(blockText(block), `exemple.${extension}`);
  }
  if (action === 'download-table') downloadText(tableToCsv(block.querySelector('table')), 'tableau.csv', 'text/csv');
  if (action === 'expand') {
    const expanded = block.classList.toggle('is-expanded');
    button.setAttribute('aria-expanded', String(expanded));
    setActionContent(button, expanded ? 'collapse' : 'fullscreen', expanded ? 'Réduire' : 'Agrandir');
  }
}
function decoratePreview() {
  nextTick(() => {
    if (!preview.value) return;
    preview.value.querySelectorAll('pre:not(.is-decorated), table:not(.is-decorated)').forEach(element => {
      element.classList.add('is-decorated');
      const wrapper = document.createElement('div');
      wrapper.className = `rich-block rich-block-${element.tagName.toLowerCase()}`;
      const header = document.createElement('div');
      header.className = 'rich-block-header';
      const isCode = element.tagName === 'PRE';
      const language = isCode ? ([...element.querySelector('code')?.classList || []].find(name => name.startsWith('language-'))?.replace('language-', '') || 'texte') : '';
      const metadata = document.createElement('div');
      metadata.className = 'rich-block-metadata';
      metadata.append(createIcon(isCode ? 'code' : 'table'));
      const label = document.createElement('strong');
      label.textContent = isCode ? language : 'Tableau';
      const detail = document.createElement('span');
      if (isCode) {
        const lineTotal = element.querySelector('code')?.textContent.replace(/\n$/, '').split('\n').length || 0;
        detail.textContent = `${lineTotal} ${lineTotal > 1 ? 'lignes' : 'ligne'}`;
      } else {
        const columns = element.rows[0]?.cells.length || 0;
        const rows = Math.max(0, element.rows.length - (element.tHead ? 1 : 0));
        detail.textContent = `${columns} colonnes · ${rows} ${rows > 1 ? 'lignes' : 'ligne'}`;
      }
      metadata.append(label, detail);
      const controls = document.createElement('div');
      controls.className = 'rich-block-actions';
      const addAction = (text, action, icon) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.blockAction = action;
        if (action === 'download-code') button.dataset.language = language;
        setActionContent(button, icon, text);
        controls.append(button);
      };
      addAction('Copier', 'copy', 'clipboard');
      addAction(isCode ? 'Télécharger' : 'Exporter en CSV', isCode ? 'download-code' : 'download-table', 'download');
      if (!isCode) addAction('Agrandir', 'expand', 'fullscreen');
      const status = document.createElement('span');
      status.className = 'sr-only';
      status.dataset.copyStatus = '';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      header.append(metadata, controls, status);
      element.parentNode.insertBefore(wrapper, element);
      wrapper.append(header, element);
      if (isCode) element.querySelectorAll('code').forEach(code => {
        const lines = code.innerHTML.replace(/\n$/, '').split('\n');
        code.innerHTML = lines.map((line, index) => `<span class="code-line"><span class="line-number">${index + 1}</span><span>${line}</span></span>`).join('');
      });
    });
    preview.value.querySelectorAll('img:not(.is-decorated)').forEach(image => {
      image.classList.add('is-decorated');
      const description = image.getAttribute('alt')?.trim();
      if (!description) return;
      const figure = document.createElement('figure');
      figure.className = 'markdown-figure';
      const caption = document.createElement('figcaption');
      caption.textContent = `Description de l’image : ${description}`;
      const paragraph = image.parentElement?.tagName === 'P' && !image.parentElement.textContent.trim() ? image.parentElement : null;
      if (paragraph) paragraph.replaceWith(figure);
      else image.parentNode.insertBefore(figure, image);
      figure.append(image, caption);
    });
  });
}
watch(markdown, value => {
  if (!isStreaming.value) previewMarkdown.value = value;
});
watch(rendered, decoratePreview, { flush: 'post', immediate: true });
onUnmounted(() => { if (streamTimer) window.clearInterval(streamTimer); });
</script>

<template>
  <div class="markdown-page">
    <section class="markdown-hero" aria-labelledby="markdown-title">
      <div>
        <span class="markdown-eyebrow"><RiArticleLine /> Outil éditorial</span>
        <h1 id="markdown-title">Interpréteur Markdown</h1>
        <p>Rédigez du contenu en Markdown et visualisez instantanément son rendu sur data.gouv.fr.</p>
      </div>
      <div class="markdown-actions">
        <button class="md-button secondary" type="button" @click="reset"><RiRestartLine /> Réinitialiser</button>
        <button class="md-button primary" type="button" @click="downloadMarkdown"><RiDownloadLine /> Télécharger le .md</button>
      </div>
    </section>

    <section class="markdown-examples" aria-labelledby="examples-title">
      <div><h2 id="examples-title">Partir d’un exemple</h2><p>Choisissez un modèle ou modifiez directement le contenu ci-dessous.</p></div>
      <div class="example-list" role="list">
        <button v-for="(example, key) in examples" :key="key" type="button" :class="{ active: activeExample === key }" :aria-pressed="activeExample === key" @click="selectExample(key)">
          <RiFileTextLine /><span>{{ example.label }}</span><RiCheckLine v-if="activeExample === key" class="check" />
        </button>
      </div>
    </section>

    <section class="current-editor-section" aria-labelledby="current-editor-title">
      <header class="current-editor-heading">
        <div>
          <span class="current-editor-kicker">Référence actuelle</span>
          <h2 id="current-editor-title">Éditeur Markdown utilisé dans cdata</h2>
          <p>Le composant Milkdown actuellement intégré aux formulaires de contribution, présenté ici sans modification fonctionnelle.</p>
        </div>
        <span class="current-editor-status" :data-ready="currentEditorReady"><span aria-hidden="true"></span>{{ currentEditorReady ? 'Éditeur chargé' : 'Chargement…' }}</span>
      </header>
      <div class="current-editor-field">
        <label id="current-editor-label" for="current-cdata-markdown-editor">Description</label>
        <p id="current-editor-hint">Utilisez la barre d’outils ou basculez vers la source Markdown avec le dernier bouton.</p>
        <CurrentMarkdownEditor
          id="current-cdata-markdown-editor"
          :value="currentEditorInitialValue"
          aria-labelledby="current-editor-label"
          @change="updateCurrentEditor"
          @editor-mounted="currentEditorReady = true"
        />
        <footer><span>Valeur Markdown produite</span><span>{{ currentEditorValue.length }} caractères</span></footer>
      </div>
    </section>

    <section class="github-editor-section" :class="{ 'is-expanded': githubEditorExpanded }" aria-labelledby="github-editor-title">
      <header class="github-editor-heading">
        <div>
          <span>Proposition</span>
          <h2 id="github-editor-title">Éditeur inspiré de GitHub</h2>
          <p>Une édition visuelle par défaut, avec accès à la source Markdown du même contenu.</p>
        </div>
      </header>
      <div ref="githubEditorHost" class="github-editor-shell">
        <div class="github-editor-topbar">
          <div class="github-editor-tabs" role="tablist" aria-label="Mode de l’éditeur proposé">
            <button type="button" role="tab" :aria-selected="githubEditorMode === 'visual'" :disabled="!githubEditorReady" @click="setGithubEditorMode('visual')">Éditeur visuel</button>
            <button type="button" role="tab" :aria-selected="githubEditorMode === 'raw'" :disabled="!githubEditorReady" @click="setGithubEditorMode('raw')">Markdown brut</button>
          </div>
          <button class="github-expand-button" type="button" :title="githubEditorExpanded ? 'Réduire' : 'Agrandir'" :aria-label="githubEditorExpanded ? 'Réduire' : 'Agrandir'" :aria-pressed="githubEditorExpanded" @click="githubEditorExpanded = !githubEditorExpanded"><RiFullscreenExitLine v-if="githubEditorExpanded" /><RiFullscreenLine v-else /></button>
        </div>
        <CurrentMarkdownEditor
          id="github-inspired-markdown-editor"
          class="github-wysiwyg-editor"
          :value="currentEditorInitialValue"
          aria-label="Contenu de l’éditeur Markdown proposé"
          @change="githubEditorValue = $event"
          @editor-mounted="githubEditorReady = true"
        />
        <footer class="github-editor-footer"><span>{{ githubEditorMode === 'visual' ? 'Édition WYSIWYG' : 'Source Markdown' }}</span><span>{{ githubEditorValue.length }} caractères</span></footer>
      </div>
    </section>

    <section class="markdown-workspace" aria-label="Éditeur et aperçu Markdown">
      <header class="playground-toolbar">
        <div><span class="mode-dot" :class="{ active: isStreaming }"></span>{{ isStreaming ? 'Génération en cours' : 'Rendu statique' }}</div>
        <div class="playground-actions">
          <button type="button" @click="simulateStream"><RiPlayLine />{{ isStreaming ? 'Afficher immédiatement' : 'Simuler le flux' }}</button>
          <button type="button" @click="clearMarkdown"><RiDeleteBinLine />Effacer</button>
        </div>
      </header>
      <div class="mobile-tabs" role="tablist" aria-label="Mode d’affichage">
        <button type="button" role="tab" :aria-selected="activePane === 'write'" @click="activePane = 'write'"><RiBracesLine /> Écrire</button>
        <button type="button" role="tab" :aria-selected="activePane === 'preview'" @click="activePane = 'preview'"><RiEyeLine /> Aperçu</button>
      </div>
      <div class="workspace-pane editor-pane" :class="{ 'mobile-hidden': activePane !== 'write' }">
        <header class="pane-header"><div><RiBracesLine /><strong>Markdown</strong></div><span>Édition</span></header>
        <textarea ref="editor" v-model="markdown" aria-label="Contenu Markdown" spellcheck="true" @input="activeExample = ''" />
        <footer class="editor-stats"><span>{{ wordCount }} mots</span><span>{{ characterCount }} caractères</span><span>{{ lineCount }} lignes</span></footer>
      </div>
      <div class="workspace-pane preview-pane" :class="{ 'mobile-hidden': activePane !== 'preview' }">
        <header class="pane-header"><div><RiEyeLine /><strong>Aperçu</strong></div><button type="button" :data-copied="copied" :aria-label="copied ? 'HTML copié' : 'Copier le HTML'" @click="copyHtml"><RiCheckLine v-if="copied" /><RiFileCopyLine v-else />{{ copied ? 'HTML copié' : 'Copier le HTML' }}</button><span class="sr-only" role="status">{{ copied ? 'HTML copié dans le presse-papiers' : '' }}</span></header>
        <article v-if="previewMarkdown.trim()" ref="preview" class="agent-markdown" :class="{ streaming: isStreaming }" @click="handlePreviewAction" v-html="rendered" />
        <div v-else class="preview-empty"><RiFileTextLine /><strong>Votre aperçu apparaîtra ici</strong><p>Commencez à écrire dans la zone Markdown.</p></div>
      </div>
    </section>

    <aside class="markdown-help"><strong>Rendu de l’assistant data.gouv.fr</strong><p>La typographie, les tableaux, le code et les citations suivent la référence du prototype Agent. Le HTML est nettoyé avant affichage.</p></aside>
  </div>
</template>

<style scoped>
.markdown-page { --blue:var(--lab-ds-brand); --stroke:var(--lab-ds-border); --surface:var(--lab-ds-surface-subtle); --ink:var(--lab-ds-text); max-width:1480px; padding:48px 56px 72px; color:var(--ink); font-family:var(--lab-ds-font-sans); }
.markdown-hero { display:flex; align-items:flex-end; justify-content:space-between; gap:32px; margin-bottom:40px; }
.markdown-eyebrow { display:inline-flex; align-items:center; gap:8px; margin-bottom:14px; color:var(--blue); font-size:.82rem; font-weight:700; letter-spacing:.055em; text-transform:uppercase; }
.markdown-eyebrow svg { width:18px; }
.markdown-hero h1 { margin:0; font-size:clamp(2rem,4vw,3.25rem); line-height:1.05; letter-spacing:-.035em; }
.markdown-hero p { max-width:680px; margin:16px 0 0; color:var(--lab-ds-text-secondary); font-size:16px; line-height:24px; }
.markdown-actions { display:flex; flex:none; gap:10px; }
.md-button { display:inline-flex; min-height:44px; align-items:center; justify-content:center; gap:9px; border:1px solid var(--blue); padding:0 17px; font:inherit; font-size:.9rem; font-weight:700; cursor:pointer; }
.md-button svg { width:18px; }.md-button.primary { background:var(--blue); color:white; }.md-button.secondary { background:white; color:var(--blue); }.md-button:hover { filter:brightness(1.08); }
.markdown-examples { display:grid; grid-template-columns:minmax(190px,.75fr) 2fr; gap:32px; align-items:end; margin-bottom:20px; }
.markdown-examples h2 { margin:0 0 5px; font-size:var(--lab-ds-text-title); line-height:var(--lab-ds-leading-title); }.markdown-examples p { margin:0; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-body); }
.example-list { display:grid; grid-template-columns:repeat(auto-fit,minmax(175px,1fr)); gap:10px; }
.example-list button { display:flex; min-height:54px; align-items:center; gap:10px; border:1px solid #dddde7; background:#fff; padding:0 14px; color:#555; font:inherit; font-size:.88rem; font-weight:600; text-align:left; cursor:pointer; }
.example-list button.active { border-color:var(--blue); background:#f5f5fe; color:var(--blue); box-shadow:inset 0 0 0 1px var(--blue); }.example-list svg { width:18px; flex:none; }.check { margin-left:auto; }
.current-editor-section { margin:32px 0; border:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface); }
.current-editor-heading { display:flex; align-items:flex-start; justify-content:space-between; gap:32px; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); padding:20px 24px; }
.current-editor-heading h2 { margin:3px 0 4px; font-size:var(--lab-ds-text-title); line-height:var(--lab-ds-leading-title); }.current-editor-heading p { max-width:760px; margin:0; color:var(--lab-ds-text-secondary); font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-body); }
.current-editor-kicker { color:var(--lab-ds-brand); font-size:var(--lab-ds-text-caption); font-weight:var(--lab-ds-weight-semibold); line-height:var(--lab-ds-leading-caption); text-transform:uppercase; letter-spacing:.04em; }
.current-editor-status { display:inline-flex; flex:none; align-items:center; gap:var(--lab-ds-space-8); color:var(--lab-ds-text-secondary); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); }.current-editor-status span { width:7px; height:7px; border-radius:50%; background:var(--lab-ds-text-muted); }.current-editor-status[data-ready='true'] span { background:var(--lab-ds-success-text); box-shadow:0 0 0 4px var(--lab-ds-success-bg); }
.current-editor-field { padding:24px; }.current-editor-field > label { display:block; margin-bottom:2px; color:var(--lab-ds-text); font-size:var(--lab-ds-text-body); font-weight:var(--lab-ds-weight-semibold); line-height:var(--lab-ds-leading-body); }.current-editor-field > p { margin:0 0 12px; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); }.current-editor-field > footer { display:flex; justify-content:space-between; gap:16px; margin-top:10px; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); font-variant-numeric:tabular-nums; }
.current-editor-field :deep(.editor__container) { margin:0; }
.github-editor-section { margin:32px 0; }.github-editor-heading { margin-bottom:12px; }.github-editor-heading span { color:var(--lab-ds-brand); font-size:var(--lab-ds-text-caption); font-weight:var(--lab-ds-weight-semibold); line-height:var(--lab-ds-leading-caption); text-transform:uppercase; letter-spacing:.04em; }.github-editor-heading h2 { margin:3px 0 4px; font-size:var(--lab-ds-text-title); line-height:var(--lab-ds-leading-title); }.github-editor-heading p { margin:0; color:var(--lab-ds-text-secondary); font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-body); }
.github-editor-shell { overflow:hidden; border:var(--lab-ds-stroke) solid var(--lab-ds-border-strong); border-radius:var(--lab-ds-radius); background:var(--lab-ds-surface); box-shadow:0 1px 2px #1616160d; }
.github-editor-topbar { display:flex; min-height:44px; align-items:flex-end; justify-content:space-between; gap:12px; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); padding:0 8px; }
.github-editor-tabs { display:flex; align-self:stretch; align-items:flex-end; }.github-editor-tabs button { min-height:38px; margin-bottom:-1px; border:var(--lab-ds-stroke) solid transparent; border-bottom-color:var(--lab-ds-border); border-radius:var(--lab-ds-radius) var(--lab-ds-radius) 0 0; background:transparent; padding:0 16px; color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); cursor:pointer; }.github-editor-tabs button[aria-selected='true'] { border-color:var(--lab-ds-border-strong); border-bottom-color:var(--lab-ds-surface); background:var(--lab-ds-surface); color:var(--lab-ds-text); }.github-editor-tabs button:disabled { cursor:wait; opacity:var(--lab-ds-opacity-disabled); }
.github-expand-button { display:inline-flex; width:32px; height:32px; align-items:center; justify-content:center; align-self:center; border:0; border-radius:var(--lab-ds-radius); background:transparent; color:var(--lab-ds-text-secondary); cursor:pointer; }.github-expand-button:hover { background:var(--lab-ds-surface-active); color:var(--lab-ds-text); }.github-expand-button svg { width:var(--lab-ds-icon); height:var(--lab-ds-icon); }
.github-editor-tabs button:focus-visible,.github-expand-button:focus-visible { z-index:1; outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }
.github-editor-shell :deep(.github-wysiwyg-editor.editor__container) { margin:0; border-radius:0; background:#fff!important; box-shadow:none; padding:8px; }.github-editor-shell :deep(.github-wysiwyg-editor [role='menubar']) { min-height:40px; margin:-8px -8px 8px; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:#fff!important; padding:4px 8px; }.github-editor-shell :deep(.github-wysiwyg-editor [title='Voir le markdown']),.github-editor-shell :deep(.github-wysiwyg-editor [title='Voir le HTML']) { display:none!important; }
.github-editor-shell :deep(.github-wysiwyg-editor [role='menubar']:has([title='Voir le HTML'])) { display:none; }
.github-editor-shell :deep(.github-wysiwyg-editor [role='menubar'] button) { border-radius:var(--lab-ds-radius); color:var(--lab-ds-text-secondary); }.github-editor-shell :deep(.github-wysiwyg-editor [role='menubar'] button:hover) { background:var(--lab-ds-surface-active); color:var(--lab-ds-text); }.github-editor-shell :deep(.github-wysiwyg-editor [role='menubar'] svg) { width:var(--lab-ds-icon); height:var(--lab-ds-icon); }
.github-editor-shell :deep(.github-wysiwyg-editor > div:last-child) { background:#fff!important; padding:0!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror),.github-editor-shell :deep(.github-wysiwyg-editor textarea) { box-sizing:border-box; width:100%; min-height:320px; border:0!important; border-radius:0; outline:0; background:#fff!important; padding:20px!important; color:var(--lab-ds-text)!important; font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans)!important; }.github-editor-shell :deep(.github-wysiwyg-editor textarea) { resize:vertical; font-family:'Geist Mono',monospace!important; font-size:14px!important; font-weight:400!important; line-height:22px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror:focus),.github-editor-shell :deep(.github-wysiwyg-editor textarea:focus) { box-shadow:inset 3px 0 0 var(--lab-ds-focus); }
.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h1) { margin:0 0 18px!important; font-size:28px!important; line-height:36px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h2) { margin:32px 0 12px!important; font-size:24px!important; line-height:32px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h3) { margin:28px 0 10px!important; font-size:20px!important; line-height:28px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h4) { margin:24px 0 8px!important; font-size:18px!important; line-height:26px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h5) { margin:22px 0 8px!important; font-size:16px!important; line-height:24px!important; text-transform:none!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror h6) { margin:20px 0 8px!important; font-size:15px!important; line-height:22px!important; text-transform:none!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror p) { margin:0 0 14px!important; font-size:14px!important; line-height:22px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror ul),.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror ol) { margin:0 0 16px!important; padding-left:22px!important; font-size:14px!important; line-height:22px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror li) { margin:4px 0!important; font-size:14px!important; line-height:22px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror blockquote) { margin:18px 0!important; border-left:3px solid var(--lab-ds-text)!important; background:transparent!important; padding:2px 0 2px 16px!important; color:var(--lab-ds-text-secondary)!important; }
.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror table) { width:100%; margin:20px 0!important; border-collapse:collapse; background:#fff!important; color:var(--lab-ds-text)!important; font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror tr) { background:#fff!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror th),.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror td) { border:var(--lab-ds-stroke) solid var(--lab-ds-border)!important; padding-block:var(--lab-ds-space-8)!important; padding-inline:var(--lab-ds-space-12)!important; text-align:left; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror th) { background:var(--lab-ds-surface-subtle)!important; font-weight:var(--lab-ds-weight-semibold)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror tbody tr:hover) { background:var(--lab-ds-surface-subtle)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror pre) { overflow:auto; background:var(--lab-ds-surface-subtle)!important; padding:var(--lab-ds-space-12)!important; color:var(--lab-ds-text-secondary)!important; font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-control) var(--lab-ds-font-mono)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror code) { font-family:var(--lab-ds-font-mono)!important; }
@layer base { .github-editor-shell :deep(.github-wysiwyg-editor [role='menubar']:has([title='Voir le HTML'])) { display:none!important; }.github-editor-shell :deep(.github-wysiwyg-editor textarea) { line-height:22px!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror tr) { border:0!important; background:#fff!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror th),.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror td) { padding-block:var(--lab-ds-space-8)!important; padding-inline:var(--lab-ds-space-12)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror th) { background:var(--lab-ds-surface-subtle)!important; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror tbody tr:hover) { background:var(--lab-ds-surface-subtle)!important; } }
.github-editor-footer { display:flex; min-height:36px; align-items:center; justify-content:space-between; gap:16px; border-top:var(--lab-ds-stroke) solid var(--lab-ds-border); padding:0 12px; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); font-variant-numeric:tabular-nums; }
.github-editor-section.is-expanded { position:fixed; z-index:2100; inset:20px; overflow:auto; margin:0; padding:20px; background:var(--lab-ds-surface); box-shadow:var(--lab-ds-shadow-overlay); }.github-editor-section.is-expanded .github-editor-shell { min-height:calc(100vh - 110px); }.github-editor-section.is-expanded .github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror),.github-editor-section.is-expanded .github-editor-shell :deep(.github-wysiwyg-editor textarea) { min-height:calc(100vh - 250px); }
.markdown-workspace { display:grid; min-height:650px; grid-template-columns:minmax(0,1fr) minmax(0,1fr); border:1px solid #dddde7; background:white; box-shadow:0 14px 44px rgba(0,0,18,.07); }
.playground-toolbar { display:flex; min-height:48px; grid-column:1/-1; align-items:center; justify-content:space-between; gap:16px; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); padding:0 14px; color:var(--lab-ds-text-secondary); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); }
.playground-toolbar > div { display:flex; align-items:center; gap:8px; }.mode-dot { width:7px; height:7px; border-radius:50%; background:#929292; }.mode-dot.active { background:#18753c; box-shadow:0 0 0 4px #e3fdeb; }
.playground-actions { display:flex; gap:var(--lab-ds-space-4); }.playground-actions button { display:inline-flex; min-height:var(--lab-ds-control-compact); align-items:center; gap:var(--lab-ds-space-6); border:0; border-radius:var(--lab-ds-radius); background:transparent; padding:0 var(--lab-ds-space-8); color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); cursor:pointer; }.playground-actions button:hover { background:var(--lab-ds-surface); color:var(--lab-ds-brand); }.playground-actions svg { width:var(--lab-ds-icon-compact); height:var(--lab-ds-icon-compact); }
.workspace-pane { display:flex; min-width:0; flex-direction:column; }.editor-pane { border-right:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); }
.pane-header { display:flex; min-height:56px; align-items:center; justify-content:space-between; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface); padding:0 18px; font-size:var(--lab-ds-text-body); line-height:var(--lab-ds-leading-control); }
.pane-header div,.pane-header button { display:flex; align-items:center; gap:8px; }.pane-header svg { width:var(--lab-ds-icon-major); height:var(--lab-ds-icon-major); color:var(--blue); }.pane-header > span:not(.sr-only) { color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); }.pane-header button { min-height:var(--lab-ds-control-compact); border:0; border-radius:var(--lab-ds-radius); background:none; padding:var(--lab-ds-space-6) var(--lab-ds-space-8); color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-medium) var(--lab-ds-text-body)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); cursor:pointer; }.pane-header button:hover { background:var(--lab-ds-surface-active); color:var(--lab-ds-text); }.pane-header button[data-copied='true'] { color:var(--lab-ds-success-text); }
.editor-pane textarea { width:100%; min-height:550px; flex:1; resize:none; border:0; outline:0; background:var(--lab-ds-surface-subtle); padding:28px 30px; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-mono); }.editor-pane textarea:focus { box-shadow:inset 3px 0 0 var(--blue); }
.editor-stats { display:flex; gap:20px; border-top:var(--lab-ds-stroke) solid var(--lab-ds-border); padding:11px 18px; color:var(--lab-ds-text-muted); font-size:var(--lab-ds-text-caption); line-height:var(--lab-ds-leading-caption); font-variant-numeric:tabular-nums; }

/* Règles de rendu Markdown du prototype data.gouv Agent. */
.agent-markdown { max-width:760px; padding:32px 40px 64px; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-body)/var(--lab-ds-leading-body) var(--lab-ds-font-sans); }
.agent-markdown :deep(h1) { margin:0 0 18px; font-size:28px; line-height:36px; letter-spacing:-.02em; }
.agent-markdown :deep(h2) { margin:32px 0 12px; font-size:24px; line-height:32px; }
.agent-markdown :deep(h3) { margin:28px 0 10px; font-size:20px; line-height:28px; }
.agent-markdown :deep(h4) { margin:24px 0 8px; font-size:18px; line-height:26px; }
.agent-markdown :deep(h5) { margin:22px 0 8px; font-size:16px; line-height:24px; }
.agent-markdown :deep(h6) { margin:20px 0 8px; font-size:15px; line-height:22px; }
.agent-markdown :deep(p) { margin:0 0 14px; font-size:inherit; line-height:inherit; }.agent-markdown :deep(strong) { color:var(--lab-ds-text); }.agent-markdown :deep(a) { color:var(--lab-ds-brand); text-decoration-thickness:1px; text-underline-offset:3px; }.agent-markdown :deep(del) { background:linear-gradient(currentColor,currentColor) no-repeat 0 58%/100% 1px; text-decoration:none; }
.agent-markdown :deep(ul),.agent-markdown :deep(ol) { margin:0 0 16px; padding-left:22px; font-size:inherit; line-height:inherit; }.agent-markdown :deep(li) { margin:4px 0; font-size:inherit; line-height:inherit; }
.agent-markdown :deep(blockquote) { margin:18px 0; border-left:3px solid var(--lab-ds-text); background:transparent; padding:2px 0 2px 16px; color:var(--lab-ds-text-secondary); }.agent-markdown :deep(blockquote p) { margin:0; }
.agent-markdown :deep(.markdown-figure) { margin:24px 0; }.agent-markdown :deep(.markdown-figure img) { display:block; max-width:100%; height:auto; }.agent-markdown :deep(.markdown-figure figcaption) { margin-top:var(--lab-ds-space-8); color:var(--lab-ds-text-muted); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans); }
.agent-markdown :deep(table) { display:block; width:100%; overflow-x:auto; margin:20px 0; border-collapse:collapse; background:var(--lab-ds-surface); color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans); font-variant-numeric:tabular-nums; white-space:nowrap; }.agent-markdown :deep(thead) { background:var(--lab-ds-surface-subtle); }.agent-markdown :deep(th) { border-right:var(--lab-ds-stroke) solid var(--lab-ds-border); border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); padding:var(--lab-ds-space-8) var(--lab-ds-space-12); font-weight:var(--lab-ds-weight-semibold); text-align:left; }.agent-markdown :deep(td) { border-right:var(--lab-ds-stroke) solid var(--lab-ds-border); border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); padding:var(--lab-ds-space-8) var(--lab-ds-space-12); }.agent-markdown :deep(tr > :last-child) { border-right:0; }.agent-markdown :deep(tbody tr:hover) { background:var(--lab-ds-surface-subtle); }
.agent-markdown :deep(pre) { overflow-x:auto; margin:18px 0; border-radius:var(--lab-ds-radius-technical); background:var(--lab-ds-surface-subtle); padding:var(--lab-ds-space-12); color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-control) var(--lab-ds-font-mono); }.agent-markdown :deep(code) { border-radius:var(--lab-ds-radius-technical); background:var(--lab-ds-surface-active); padding:2px 4px; color:var(--lab-ds-text); font:var(--lab-ds-weight-regular) .92em/1.45 var(--lab-ds-font-mono); }.agent-markdown :deep(pre code) { background:none; padding:0; color:inherit; font:inherit; }.agent-markdown :deep(hr) { margin:24px 0; border:0; border-top:var(--lab-ds-stroke) solid var(--lab-ds-border); }.agent-markdown :deep(input[type='checkbox']) { margin-right:7px; accent-color:var(--lab-ds-brand); }
.agent-markdown :deep(.rich-block) { overflow:hidden; margin:20px 0; border:1px solid #e5e5e5; border-radius:6px; background:#fff; }
.agent-markdown :deep(.rich-block-header) { display:flex; min-height:var(--lab-ds-control); align-items:center; justify-content:space-between; gap:12px; border-bottom:var(--lab-ds-stroke) solid var(--lab-ds-border); background:var(--lab-ds-surface-subtle); padding:0 var(--lab-ds-space-8) 0 var(--lab-ds-space-12); color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-regular) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-sans); }
.agent-markdown :deep(.rich-block-metadata) { display:flex; min-width:0; align-items:center; gap:var(--lab-ds-space-8); }.agent-markdown :deep(.rich-block-metadata svg) { width:var(--lab-ds-icon); height:var(--lab-ds-icon); flex:none; }.agent-markdown :deep(.rich-block-metadata strong) { color:var(--lab-ds-text); font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-caption) var(--lab-ds-font-mono); text-transform:uppercase; }.agent-markdown :deep(.rich-block-table .rich-block-metadata strong) { font-family:var(--lab-ds-font-sans); text-transform:none; }.agent-markdown :deep(.rich-block-metadata span) { color:var(--lab-ds-text-muted); white-space:nowrap; }
.agent-markdown :deep(.rich-block-actions) { display:flex; gap:var(--lab-ds-space-2); }.agent-markdown :deep(.rich-block-header button) { display:inline-flex; min-height:var(--lab-ds-control-compact); align-items:center; gap:var(--lab-ds-space-6); border:0; border-radius:var(--lab-ds-radius); background:transparent; padding:var(--lab-ds-space-6) var(--lab-ds-space-8); color:var(--lab-ds-text-secondary); font:var(--lab-ds-weight-medium) var(--lab-ds-text-caption)/var(--lab-ds-leading-control) var(--lab-ds-font-sans); cursor:pointer; }.agent-markdown :deep(.rich-block-header button svg) { width:var(--lab-ds-icon-compact); height:var(--lab-ds-icon-compact); flex:none; }.agent-markdown :deep(.rich-block-header button:hover) { background:var(--lab-ds-surface-active); color:var(--lab-ds-text); }.agent-markdown :deep(.rich-block-header button:focus-visible) { outline:var(--lab-ds-focus-width) solid var(--lab-ds-focus); outline-offset:var(--lab-ds-focus-offset); }.agent-markdown :deep(.rich-block-header button[data-copied='true']) { color:var(--lab-ds-success-text); }
.agent-markdown :deep(.rich-block pre),.agent-markdown :deep(.rich-block table) { margin:0; border-radius:0; }
.agent-markdown :deep(.rich-block-table table) { display:table; width:100%; }.agent-markdown :deep(.rich-block-table) { overflow-x:auto; }
.agent-markdown :deep(.code-line) { display:grid; grid-template-columns:32px minmax(0,1fr); min-height:1.55em; }.agent-markdown :deep(.line-number) { margin-right:12px; color:#858591; text-align:right; user-select:none; }
.agent-markdown :deep(.rich-block.is-expanded) { position:fixed; z-index:2000; inset:24px; overflow:auto; margin:0; border-color:#c7c7c7; box-shadow:0 24px 80px rgba(0,0,0,.22); }.agent-markdown :deep(.rich-block.is-expanded .rich-block-header) { position:sticky; z-index:1; top:0; }
.agent-markdown.streaming::after { display:inline-block; width:2px; height:1.15em; margin-left:3px; background:#000091; content:''; vertical-align:text-bottom; animation:stream-caret .8s step-end infinite; }
@keyframes stream-caret { 50% { opacity:0; } }
.preview-empty { display:grid; flex:1; place-content:center; justify-items:center; padding:32px; color:#777; text-align:center; }.preview-empty svg { width:38px; margin-bottom:14px; }.preview-empty p { margin:6px 0 0; font-size:.88rem; }
.mobile-tabs { display:none; }.markdown-help { display:grid; grid-template-columns:auto 1fr; gap:18px; align-items:center; margin-top:24px; border-left:4px solid var(--blue); background:#f5f5fe; padding:18px 22px; font-size:.84rem; }.markdown-help p { margin:0; color:#5f5f6f; line-height:1.5; }
@media (max-width:1000px) {
  .markdown-page { padding:36px 30px 60px; }.markdown-hero { align-items:flex-start; flex-direction:column; }.markdown-examples { grid-template-columns:1fr; gap:14px; }.markdown-workspace { grid-template-columns:1fr; }
  .mobile-tabs { display:grid; grid-column:1; grid-template-columns:1fr 1fr; border-bottom:1px solid #dddde7; }.mobile-tabs button { display:flex; min-height:48px; align-items:center; justify-content:center; gap:8px; border:0; background:white; color:#666; font:inherit; font-weight:700; }.mobile-tabs button[aria-selected='true'] { border-bottom:3px solid var(--blue); color:var(--blue); }.mobile-tabs svg { width:18px; }.mobile-hidden { display:none; }.editor-pane { border-right:0; }.playground-toolbar { grid-column:1; }
}
@media (max-width:640px) { .markdown-page { padding:28px 16px 48px; }.markdown-actions { width:100%; flex-wrap:wrap; }.md-button { flex:1; }.example-list { grid-template-columns:1fr; }.current-editor-heading { flex-direction:column; gap:12px; padding:18px 16px; }.current-editor-field { padding:18px 16px; }.github-editor-topbar { padding:0 6px; }.github-editor-tabs button { padding:0 10px; font-size:var(--lab-ds-text-caption); }.github-editor-section.is-expanded { inset:0; padding:12px; }.github-editor-shell :deep(.github-wysiwyg-editor .ProseMirror),.github-editor-shell :deep(.github-wysiwyg-editor textarea) { min-height:280px; padding:16px!important; }.editor-pane textarea { min-height:470px; padding:22px 18px; }.agent-markdown { padding:26px 22px 50px; }.markdown-help { grid-template-columns:1fr; gap:5px; }.playground-toolbar { align-items:flex-start; flex-direction:column; padding:10px 12px; }.playground-actions { width:100%; justify-content:space-between; } }
@media (prefers-reduced-motion:reduce) { .agent-markdown.streaming::after { animation:none; } }
</style>
