# 📚 Archivio Slides SpaghettETH - Contribuisci con i tuoi contenuti!

Questa cartella contiene l'archivio delle presentazioni della community **SpaghettETH** in formato markdown.

Ogni file `.md` rappresenta una presentazione, convertita per essere visualizzata correttamente sul nostro sito. Contribuire è semplice: segui le linee guida qui sotto per condividere le tue slide con la community.

---

## 🔄 Come convertire le tue presentazioni in Markdown

Prima di contribuire, dovrai convertire le tue slide PowerPoint o PDF in formato Markdown:

1. Visita [ppt.to-markdown.com](https://ppt.to-markdown.com/), [Pandoc](https://pandoc.org/) o altro tool per convertire slides in markdown
2. Carica il tuo file PPT o PPTX 
3. Scarica o copia il risultato in formato Markdown
4. Aggiungi il frontmatter YAML richiesto (vedi sotto)
5. Crea un nuovo file nella cartella `slideposts`

## 🧩 Struttura del file

Ogni slide deve iniziare con un blocco **YAML frontmatter**, seguito dal contenuto in **Markdown**.

### ✅ Frontmatter obbligatorio

```yaml
---
title: Titolo della presentazione
date: YYYY-MM-DD
author: Nome autore/autrice o team
description: Breve descrizione della presentazione
tags: ["Tag1", "Tag2", "Tag3"]
---
```

### 🧾 Convenzioni per il nome dei file

Tutti i file devono avere estensione `.md`

Formato consigliato:

YYYY-MM-DD-titolo-breve.md

Esempio: 2025-02-17-roadmap-spaghetteth.md

### 🖼️ Immagini

Per immagini di copertina o interne, usa la sintassi Markdown standard:

![Alt text](https://url-dell-immagine.com/immagine.jpg)

Le immagini possono essere ospitate pubblicamente oppure draggate direttamente sull'articolo (es. su Imgur o IPFS)

### ✅ Checklist prima del commit

Il file ha il frontmatter corretto e completo

Il titolo è coerente con il contenuto

La data è aggiornata

Il file è codificato in UTF-8

Le immagini si caricano correttamente

Non ci sono link rotti

Il contenuto è coerente con il tono e la missione di SpaghettETH

### Per dubbi, revisioni o suggerimenti, apri una pull request o contatta il team di redazione SpaghettETH - ciao@spaghett-eth.com.

🍝 Buona scrittura!
— Il team SpaghettETH

