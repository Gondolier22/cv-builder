import React from "react";
import type { Education } from "../../store/cv";

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
}) => {
  if (!education || education.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mb-8 print:mb-6 print:break-inside-avoid">
      <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 print:mb-3 border-b border-gray-300 pb-2 print:pb-1">
        Educación
      </h2>

      <div className="space-y-6 print:space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="print:break-inside-avoid border-l-4 border-green-200 pl-4 print:pl-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg print:text-base font-semibold text-gray-900">
                  {edu.title}
                </h3>
                <div className="flex items-center gap-2">
                  {edu.url ? (
                    <a
                      href={edu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 print:text-gray-900 font-medium"
                    >
                      {edu.institution}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-700">
                      {edu.institution}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm print:text-xs text-gray-600 font-medium">
                {formatDate(edu.startDate)}
                {edu.endDate ? ` - ${formatDate(edu.endDate)}` : " - Presente"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
