import type { CVData } from '$lib/types';
import { generateModernTemplate } from './modern';
import { generateClassicTemplate } from './classic';
import { generateCreativeTemplate } from './creative';
import { generateMinimalTemplate } from './minimal';

export function generateTemplate(templateId: string, data: CVData): string {
  switch (templateId) {
    case 'modern':
      return generateModernTemplate(data);
    case 'classic':
      return generateClassicTemplate(data);
    case 'creative':
      return generateCreativeTemplate(data);
    case 'minimal':
      return generateMinimalTemplate(data);
    default:
      return generateModernTemplate(data);
  }
}

export { generateModernTemplate, generateClassicTemplate, generateCreativeTemplate, generateMinimalTemplate };
