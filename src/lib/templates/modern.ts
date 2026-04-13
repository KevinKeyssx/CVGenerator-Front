import type { CVData } from '$lib/types';

export function generateModernTemplate(data: CVData): string {
  const { personalInfo, experiences, education, skills, languages, projects } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const levelLabels: Record<string, string> = {
    native: 'Nativo',
    fluent: 'Fluido',
    advanced: 'Avanzado',
    intermediate: 'Intermedio',
    basic: 'Básico'
  };

  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: white; color: #1f2937;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 48px; color: white;">
        <div style="display: flex; align-items: center; gap: 32px;">
          ${personalInfo.photoUrl ? `
            <img src="${personalInfo.photoUrl}" alt="${personalInfo.fullName}" 
              style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.3); object-fit: cover;" />
          ` : `
            <div style="width: 120px; height: 120px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: 700;">
              ${personalInfo.fullName.charAt(0)}
            </div>
          `}
          <div>
            <h1 style="font-size: 36px; font-weight: 700; margin: 0 0 8px 0;">${personalInfo.fullName}</h1>
            <p style="font-size: 20px; opacity: 0.9; margin: 0 0 16px 0;">${personalInfo.title}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; opacity: 0.9;">
              ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
              ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
              ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; opacity: 0.9; margin-top: 8px;">
              ${personalInfo.website ? `<span>🌐 ${personalInfo.website}</span>` : ''}
              ${personalInfo.linkedin ? `<span>💼 ${personalInfo.linkedin}</span>` : ''}
            </div>
          </div>
        </div>
      </div>

      <div style="padding: 40px 48px;">
        <!-- Summary -->
        ${personalInfo.summary ? `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
              Perfil Profesional
            </h2>
            <p style="font-size: 15px; line-height: 1.7; color: #4b5563; margin: 0;">
              ${personalInfo.summary}
            </p>
          </div>
        ` : ''}

        <!-- Experience -->
        ${experiences.length > 0 ? `
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
              Experiencia Laboral
            </h2>
            ${experiences.map(exp => `
              <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h3 style="font-size: 18px; font-weight: 600; color: #1f2937; margin: 0;">${exp.position}</h3>
                    <p style="font-size: 15px; color: #8B5CF6; font-weight: 500; margin: 4px 0 0 0;">${exp.company}</p>
                  </div>
                  <span style="font-size: 13px; color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 20px;">
                    ${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate}
                  </span>
                </div>
                ${exp.description ? `<p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 8px 0;">${exp.description}</p>` : ''}
                ${exp.achievements.length > 0 ? `
                  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
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
            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
              Educación
            </h2>
            ${education.map(edu => `
              <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 17px; font-weight: 600; color: #1f2937; margin: 0;">${edu.degree}</h3>
                    <p style="font-size: 15px; color: #8B5CF6; font-weight: 500; margin: 4px 0 0 0;">${edu.institution}</p>
                    ${edu.field ? `<p style="font-size: 14px; color: #6b7280; margin: 4px 0 0 0;">${edu.field}</p>` : ''}
                  </div>
                  <span style="font-size: 13px; color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 20px;">
                    ${edu.startDate} - ${edu.endDate}
                  </span>
                </div>
                ${edu.description ? `<p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 8px 0 0 0;">${edu.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <!-- Skills -->
          ${skills.length > 0 ? `
            <div>
              <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
                Habilidades
              </h2>
              ${Object.entries(skillsByCategory).map(([category, categorySkills]) => `
                <div style="margin-bottom: 16px;">
                  <h4 style="font-size: 13px; font-weight: 600; color: #6b7280; margin: 0 0 8px 0;">${category}</h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${categorySkills.map(skill => `
                      <span style="font-size: 13px; background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); color: white; padding: 4px 12px; border-radius: 20px;">
                        ${skill.name}
                      </span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Languages -->
          ${languages.length > 0 ? `
            <div>
              <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
                Idiomas
              </h2>
              ${languages.map(lang => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 15px; color: #1f2937;">${lang.name}</span>
                  <span style="font-size: 13px; background: #f3f4f6; color: #4b5563; padding: 4px 12px; border-radius: 20px;">
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
            <h2 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #3B82F6; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #3B82F6;">
              Proyectos Destacados
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              ${projects.map(proj => `
                <div style="background: #f9fafb; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb;">
                  <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0 0 8px 0;">${proj.name}</h3>
                  ${proj.description ? `<p style="font-size: 14px; color: #6b7280; margin: 0 0 12px 0; line-height: 1.5;">${proj.description}</p>` : ''}
                  ${proj.url ? `<p style="font-size: 13px; color: #3B82F6; margin: 0 0 12px 0;">🔗 ${proj.url}</p>` : ''}
                  ${proj.technologies.length > 0 ? `
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      ${proj.technologies.map(tech => `
                        <span style="font-size: 12px; background: white; color: #4b5563; padding: 2px 8px; border-radius: 4px; border: 1px solid #e5e7eb;">
                          ${tech}
                        </span>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
