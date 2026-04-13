import type { CVData } from '$lib/types';

export function generateMinimalTemplate(data: CVData): string {
  const { personalInfo, experiences, education, skills, languages, projects } = data;

  const levelLabels: Record<string, string> = {
    native: 'Nativo',
    fluent: 'Fluido',
    advanced: 'Avanzado',
    intermediate: 'Intermedio',
    basic: 'Básico'
  };

  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: white; color: #0f172a; padding: 64px;">
      <!-- Header -->
      <div style="margin-bottom: 48px;">
        <h1 style="font-size: 42px; font-weight: 300; margin: 0 0 8px 0; letter-spacing: -1px;">
          ${personalInfo.fullName}
        </h1>
        <p style="font-size: 18px; color: #64748b; margin: 0 0 24px 0; font-weight: 400;">
          ${personalInfo.title}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #64748b;">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
          ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
          ${personalInfo.linkedin ? `<span>${personalInfo.linkedin}</span>` : ''}
        </div>
      </div>

      <!-- Summary -->
      ${personalInfo.summary ? `
        <div style="margin-bottom: 48px;">
          <p style="font-size: 16px; line-height: 1.8; color: #475569; margin: 0; max-width: 640px;">
            ${personalInfo.summary}
          </p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${experiences.length > 0 ? `
        <div style="margin-bottom: 48px;">
          <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; margin: 0 0 24px 0;">
            Experiencia
          </h2>
          ${experiences.map(exp => `
            <div style="margin-bottom: 32px; display: grid; grid-template-columns: 160px 1fr; gap: 32px;">
              <div>
                <span style="font-size: 13px; color: #94a3b8;">
                  ${exp.startDate} — ${exp.current ? 'Presente' : exp.endDate}
                </span>
              </div>
              <div>
                <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">${exp.position}</h3>
                <p style="font-size: 14px; color: #64748b; margin: 0 0 12px 0;">${exp.company}</p>
                ${exp.description ? `<p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 12px 0;">${exp.description}</p>` : ''}
                ${exp.achievements.length > 0 ? `
                  <ul style="margin: 0; padding-left: 16px; list-style-type: none;">
                    ${exp.achievements.filter(a => a).map(achievement => `
                      <li style="font-size: 14px; line-height: 1.7; color: #475569; margin-bottom: 4px; position: relative;">
                        <span style="position: absolute; left: -16px; color: #94a3b8;">—</span>
                        ${achievement}
                      </li>
                    `).join('')}
                  </ul>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${education.length > 0 ? `
        <div style="margin-bottom: 48px;">
          <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; margin: 0 0 24px 0;">
            Educación
          </h2>
          ${education.map(edu => `
            <div style="margin-bottom: 24px; display: grid; grid-template-columns: 160px 1fr; gap: 32px;">
              <div>
                <span style="font-size: 13px; color: #94a3b8;">
                  ${edu.startDate} — ${edu.endDate}
                </span>
              </div>
              <div>
                <h3 style="font-size: 16px; font-weight: 600; color: #0f172a; margin: 0 0 4px 0;">${edu.degree}</h3>
                <p style="font-size: 14px; color: #64748b; margin: 0;">${edu.institution}</p>
                ${edu.field ? `<p style="font-size: 13px; color: #94a3b8; margin: 4px 0 0 0;">${edu.field}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
        <!-- Skills -->
        ${skills.length > 0 ? `
          <div>
            <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; margin: 0 0 20px 0;">
              Habilidades
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${skills.map(skill => `
                <span style="font-size: 13px; color: #475569; background: #f8fafc; padding: 6px 14px; border-radius: 4px; border: 1px solid #e2e8f0;">
                  ${skill.name}
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Languages -->
        ${languages.length > 0 ? `
          <div>
            <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; margin: 0 0 20px 0;">
              Idiomas
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
              ${languages.map(lang => `
                <div>
                  <span style="font-size: 14px; color: #0f172a;">${lang.name}</span>
                  <span style="font-size: 13px; color: #94a3b8; margin-left: 8px;">${levelLabels[lang.level] || lang.level}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Projects -->
      ${projects.length > 0 ? `
        <div style="margin-top: 48px;">
          <h2 style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; margin: 0 0 24px 0;">
            Proyectos
          </h2>
          ${projects.map(proj => `
            <div style="margin-bottom: 24px; display: grid; grid-template-columns: 160px 1fr; gap: 32px;">
              <div>
                ${proj.url ? `<span style="font-size: 13px; color: #94a3b8;">${proj.url}</span>` : ''}
              </div>
              <div>
                <h3 style="font-size: 15px; font-weight: 600; color: #0f172a; margin: 0 0 8px 0;">${proj.name}</h3>
                ${proj.description ? `<p style="font-size: 14px; color: #475569; margin: 0 0 12px 0; line-height: 1.6;">${proj.description}</p>` : ''}
                ${proj.technologies.length > 0 ? `
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${proj.technologies.map(tech => `
                      <span style="font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 3px;">
                        ${tech}
                      </span>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}
