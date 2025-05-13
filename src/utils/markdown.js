/**
 * Funzione semplificata per estrarre il frontmatter YAML da un file markdown
 * Non richiede la libreria gray-matter che fa uso di Buffer non disponibile nel browser
 */
export const parseMarkdown = (content) => {
  try {
    // Cerca il frontmatter YAML tra i delimitatori ---
    const frontMatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontMatterPattern);
    
    let frontMatter = {};
    let markdownContent = content;
    
    if (match) {
      // Estrai il contenuto del frontmatter
      const frontMatterText = match[1];
      
      // Estrai il contenuto markdown (tutto ciò che segue il frontmatter)
      markdownContent = content.slice(match[0].length);
      
      // Analizza il frontmatter come linee di testo nel formato "chiave: valore"
      frontMatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();
          
          // Cerca di analizzare i valori tra virgolette o parentesi quadre
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith('[') && value.endsWith(']')) {
            // Analizza gli array
            try {
              value = value
                .slice(1, -1)
                .split(',')
                .map(item => {
                  item = item.trim();
                  if (item.startsWith('"') && item.endsWith('"')) {
                    return item.slice(1, -1);
                  }
                  return item;
                });
            } catch (e) {
              console.warn('Errore nel parsing di un array:', value);
              value = [];
            }
          }
          
          frontMatter[key] = value;
        }
      });
    }
    
    return {
      data: frontMatter,
      content: markdownContent
    };
  } catch (error) {
    console.error('Errore nel parsing del markdown:', error);
    // Ritorna un oggetto predefinito in caso di errore
    return {
      data: {
        title: 'Errore nel parsing',
        date: new Date().toISOString().split('T')[0],
        description: 'Si è verificato un errore nel caricamento di questo contenuto',
        author: 'Sistema',
        tags: ['errore']
      },
      content: 'Contenuto non disponibile a causa di un errore di parsing.'
    };
  }
}; 