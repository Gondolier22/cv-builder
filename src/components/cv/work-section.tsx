import React from "react";
import { useTranslation } from "react-i18next";
import type { WorkExperience } from "../../store/cv";

interface WorkSectionProps {
  workExperience: WorkExperience[];
}

export const WorkSection: React.FC<WorkSectionProps> = ({ workExperience }) => {
  const { t } = useTranslation();

  if (!workExperience || workExperience.length === 0) return null;

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
        {t("cv.builder.cv.sections.work", "Experiencia Laboral")}
      </h2>

      <div className="space-y-6 print:space-y-4">
        {workExperience.map((work, index) => (
          <div
            key={index}
            className="print:break-inside-avoid border-l-4 border-blue-200 pl-4 print:pl-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg print:text-base font-semibold text-gray-900">
                  {work.position}
                </h3>
                <div className="flex items-center gap-2">
                  {work.url ? (
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 print:text-gray-900 font-medium"
                    >
                      {work.company}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-700">
                      {work.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm print:text-xs text-gray-600 font-medium">
                {formatDate(work.startDate)}
                {" - "}
                {work.endDate
                  ? formatDate(work.endDate)
                  : t("cv.builder.cv.labels.present", "Presente")}
              </div>
            </div>

            {work.summary && (
              <div className="text-gray-700 text-sm print:text-xs leading-relaxed">
                {work.summary.split("\n").map((paragraph, pIndex) => (
                  <p key={pIndex} className={pIndex > 0 ? "mt-2" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
