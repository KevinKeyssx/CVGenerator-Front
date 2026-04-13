import type { CVData } from '$lib/types';

export function generateCreativeTemplate(data: CVData): string {
  const { personalInfo, experiences, education, skills, languages, projects } = data;

  const levelLabels: Record<string, string> = {
    native: 'Nativo',
    fluent: 'Fluido',
    advanced: 'Avanzado',
    intermediate: 'Intermedio',
    basic: 'Básico'
  };

  const skillLevelBar = (level: number) => {
    const percentage = (level / 5) * 100;
    return `
      <div style="width: 100%; height: 6px; background: rgba(236,72,153,0.2); border-radius: 3px; overflow: hidden;">
        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); border-radius: 3px;"></div>
      </div>
    `;
  };

  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: white; color: #1f2937;">
      <div style="display: grid; grid-template-columns: 280px 1fr;">
        <!-- Sidebar -->
        <div style="background: linear-gradient(180deg, #EC4899 0%, #F59E0B 100%); color: white; padding: 40px 24px;">
          <!-- Photo -->
          <div style="text-align: center; margin-bottom: 32px;">
            ${personalInfo.photoUrl ? `
              <img src="${personalInfo.photoUrl}" alt="${personalInfo.fullName}" 
                style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.5); object-fit: cover; margin: 0 auto;" />
            ` : `
              <div style="width: 140px; height: 140px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 56px; font-weight: 700; margin: 0 auto;">
                ${personalInfo.fullName.charAt(0)}
              </div>
            `}
          </div>

          <!-- Contact -->
          <div style="margin-bottom: 32px;">
            <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0; opacity: 0.8;">
              Contacto
            </h3>
            <div style="font-size: 13px; line-height: 2;">
              ${personalInfo.email ? `<div>📧 ${personalInfo.email}</div>` : ''}
              ${personalInfo.phone ? `<div>📱 ${personalInfo.phone}</div>` : ''}
              ${personalInfo.location ? `<div>📍 ${personalInfo.location}</div>` : ''}
              ${personalInfo.website ? `<div>🌐 ${personalInfo.website}</div>` : ''}
              ${personalInfo.linkedin ? `<div>💼 ${personalInfo.linkedin}</div>` : ''}
            </div>
          </div>

          <!-- Skills -->
          ${skills.length > 0 ? `
            <div style="margin-bottom: 32px;">
              <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0; opacity: 0.8;">
                Habilidades
              </h3>
              ${skills.map(skill => `
                <div style="margin-bottom: 12px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-size: 13px;">${skill.name}</span>
                  </div>
                  ${skillLevelBar(skill.level)}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Languages -->
          ${languages.length > 0 ? `
            <div>
              <h3 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px 0; opacity: 0.8;">
                Idiomas
              </h3>
              ${languages.map(lang => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px;">
                  <span>${lang.name}</span>
                  <span style="opacity: 0.8;">${levelLabels[lang.level] || lang.level}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Main Content -->
        <div style="padding: 40px;">
          <!-- Header -->
          <div style="margin-bottom: 32px;">
            <h1 style="font-size: 36px; font-weight: 800; margin: 0; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
              ${personalInfo.fullName}
            </h1>
            <p style="font-size: 20px; color: #6b7280; margin: 8px 0 0 0;">${personalInfo.title}</p>
          </div>

          <!-- Summary -->
          ${personalInfo.summary ? `
            <div style="margin-bottom: 32px; padding: 20px; background: linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(245,158,11,0.1) 100%); border-radius: 16px; border-left: 4px solid #EC4899;">
              <p style="font-size: 15px; line-height: 1.7; color: #4b5563; margin: 0;">
                ${personalInfo.summary}
              </p>
            </div>
          ` : ''}

          <!-- Experience -->
          ${experiences.length > 0 ? `
            <div style="margin-bottom: 32px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #EC4899; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px;">
                <span style="width: 24px; height: 3px; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); border-radius: 2px;"></span>
                Experiencia
              </h2>
              ${experiences.map(exp => `
                <div style="margin-bottom: 24px; padding-left: 16px; border-left: 2px solid #e5e7eb;">
                  <div style="margin-bottom: 8px;">
                    <h3 style="font-size: 17px; font-weight: 700; color: #1f2937; margin: 0;">${exp.position}</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                      <span style="font-size: 15px; color: #EC4899; font-weight: 600;">${exp.company}</span>
                      <span style="font-size: 12px; color: white; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); padding: 4px 12px; border-radius: 20px;">
                        ${exp.startDate} - ${exp.current ? 'Presente' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  ${exp.description ? `<p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 8px 0;">${exp.description}</p>` : ''}
                  ${exp.achievements.length > 0 ? `
                    <ul style="margin: 8px 0 0 0; padding-left: 16px;">
                      ${exp.achievements.filter(a => a).map(achievement => `
                        <li style="font-size: 14px; line-height: 1.6; color: #4b5563; margin-bottom: 4px;">
                          ${achievement}
                        </li>
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
              <h2 style="font-size: 18px; font-weight: 700; color: #EC4899; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px;">
                <span style="width: 24px; height: 3px; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); border-radius: 2px;"></span>
                Educación
              </h2>
              ${education.map(edu => `
                <div style="margin-bottom: 20px; padding-left: 16px; border-left: 2px solid #e5e7eb;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h3 style="font-size: 16px; font-weight: 700; color: #1f2937; margin: 0;">${edu.degree}</h3>
                      <p style="font-size: 15px; color: #EC4899; font-weight: 600; margin: 4px 0 0 0;">${edu.institution}</p>
                      ${edu.field ? `<p style="font-size: 14px; color: #6b7280; margin: 4px 0 0 0;">${edu.field}</p>` : ''}
                    </div>
                    <span style="font-size: 12px; color: #6b7280; background: #f3f4f6; padding: 4px 12px; border-radius: 20px;">
                      ${edu.startDate} - ${edu.endDate}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Projects -->
          ${projects.length > 0 ? `
            <div>
              <h2 style="font-size: 18px; font-weight: 700; color: #EC4899; margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px;">
                <span style="width: 24px; height: 3px; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); border-radius: 2px;"></span>
                Proyectos
              </h2>
              <div style="display: grid; gap: 16px;">
                ${projects.map(proj => `
                  <div style="background: #fafafa; border-radius: 12px; padding: 16px; border: 1px solid #e5e7eb;">
                    <h3 style="font-size: 15px; font-weight: 700; color: #1f2937; margin: 0 0 8px 0;">${proj.name}</h3>
                    ${proj.description ? `<p style="font-size: 14px; color: #6b7280; margin: 0 0 12px 0; line-height: 1.5;">${proj.description}</p>` : ''}
                    ${proj.technologies.length > 0 ? `
                      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${proj.technologies.map(tech => `
                          <span style="font-size: 11px; background: linear-gradient(90deg, #EC4899 0%, #F59E0B 100%); color: white; padding: 3px 10px; border-radius: 20px;">
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
    </div>
  `;
}
