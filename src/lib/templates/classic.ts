import type { CVData } from '$lib/types';

export function generateClassicTemplate(data: CVData): string {
  const { personalInfo, experiences, education, skills, languages, projects } = data;

  const levelLabels: Record<string, string> = {
    native: 'Nativo',
    fluent: 'Fluido',
    advanced: 'Avanzado',
    intermediate: 'Intermedio',
    basic: 'Básico'
  };

  const skillLevelDots = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => 
      `<span style="width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin-right: 4px; background: ${i < level ? '#1f2937' : '#d1d5db'};"></span>`
    ).join('');
  };

  return `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; max-width: 800px; margin: 0 auto; background: white; color: #1f2937; padding: 48px;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 3px double #1f2937; padding-bottom: 32px; margin-bottom: 32px;">
        <h1 style="font-size: 36px; font-weight: 400; letter-spacing: 4px; margin: 0 0 8px 0; text-transform: uppercase;">
          ${personalInfo.fullName}
        </h1>
        <p style="font-size: 18px; color: #4b5563; font-style: italic; margin: 0 0 20px 0;">
          ${personalInfo.title}
        </p>
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #6b7280;">
          ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
          ${personalInfo.phone ? `<span>|</span><span>${personalInfo.phone}</span>` : ''}
          ${personalInfo.location ? `<span>|</span><span>${personalInfo.location}</span>` : ''}
        </div>
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 24px; font-size: 14px; color: #6b7280; margin-top: 8px;">
          ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
          ${personalInfo.linkedin ? `<span>|</span><span>${personalInfo.linkedin}</span>` : ''}
        </div>
      </div>

      <!-- Summary -->
      ${personalInfo.summary ? `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
            Resumen Profesional
          </h2>
          <p style="font-size: 15px; line-height: 1.8; color: #4b5563; margin: 0; text-align: justify;">
            ${personalInfo.summary}
          </p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${experiences.length > 0 ? `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
            Experiencia Profesional
          </h2>
          ${experiences.map(exp => `
            <div style="margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <h3 style="font-size: 17px; font-weight: 700; color: #1f2937; margin: 0;">${exp.position}</h3>
                <span style="font-size: 13px; color: #6b7280; font-style: italic;">
                  ${exp.startDate} — ${exp.current ? 'Presente' : exp.endDate}
                </span>
              </div>
              <p style="font-size: 15px; color: #4b5563; font-style: italic; margin: 0 0 8px 0;">${exp.company}</p>
              ${exp.description ? `<p style="font-size: 14px; line-height: 1.7; color: #4b5563; margin: 0 0 8px 0; text-align: justify;">${exp.description}</p>` : ''}
              ${exp.achievements.length > 0 ? `
                <ul style="margin: 8px 0 0 0; padding-left: 20px; list-style-type: disc;">
                  ${exp.achievements.filter(a => a).map(achievement => `
                    <li style="font-size: 14px; line-height: 1.6; color: #4b5563; margin-bottom: 4px;">${achievement}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${education.length > 0 ? `
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
            Formación Académica
          </h2>
          ${education.map(edu => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div>
                  <h3 style="font-size: 16px; font-weight: 700; color: #1f2937; margin: 0;">${edu.degree}</h3>
                  <p style="font-size: 15px; color: #4b5563; font-style: italic; margin: 4px 0 0 0;">${edu.institution}</p>
                  ${edu.field ? `<p style="font-size: 14px; color: #6b7280; margin: 4px 0 0 0;">${edu.field}</p>` : ''}
                </div>
                <span style="font-size: 13px; color: #6b7280; font-style: italic;">
                  ${edu.startDate} — ${edu.endDate}
                </span>
              </div>
              ${edu.description ? `<p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 8px 0 0 0;">${edu.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <!-- Skills -->
        ${skills.length > 0 ? `
          <div>
            <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
              Competencias
            </h2>
            ${skills.map(skill => `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 14px; color: #1f2937;">${skill.name}</span>
                <div>${skillLevelDots(skill.level)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Languages -->
        ${languages.length > 0 ? `
          <div>
            <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
              Idiomas
            </h2>
            ${languages.map(lang => `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 14px; color: #1f2937;">${lang.name}</span>
                <span style="font-size: 13px; color: #6b7280; font-style: italic;">
                  ${levelLabels[lang.level] || lang.level}
                </span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Projects -->
      ${projects.length > 0 ? `
        <div style="margin-top: 32px;">
          <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #1f2937; margin: 0 0 16px 0; border-bottom: 1px solid #1f2937; padding-bottom: 8px;">
            Proyectos
          </h2>
          ${projects.map(proj => `
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #1f2937; margin: 0;">${proj.name}</h3>
              ${proj.url ? `<p style="font-size: 13px; color: #6b7280; margin: 4px 0;">${proj.url}</p>` : ''}
              ${proj.description ? `<p style="font-size: 14px; color: #4b5563; margin: 4px 0; line-height: 1.5;">${proj.description}</p>` : ''}
              ${proj.technologies.length > 0 ? `
                <p style="font-size: 13px; color: #6b7280; margin: 4px 0;">
                  <em>Tecnologías:</em> ${proj.technologies.join(', ')}
                </p>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}
