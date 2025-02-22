import yaml from 'js-yaml';

export const matter = (content) => {
  const regex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(regex);
  
  if (!match) {
    return {
      data: {},
      content: content
    };
  }

  try {
    const [, frontMatter, markdownContent] = match;
    const data = yaml.load(frontMatter);
    
    return {
      data,
      content: markdownContent.trim()
    };
  } catch (error) {
    console.error('Errore nel parsing del frontmatter:', error);
    return {
      data: {},
      content: content
    };
  }
}; 