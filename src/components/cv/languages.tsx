import React from "react";
import { useTranslation } from "react-i18next";
import type { Language } from "../../store/cv";

interface LanguagesSectionProps {
  languages: Language[];
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
}) => {
  const { t } = useTranslation();

  if (!languages || languages.length === 0) return null;

  return (
    <section className="mb-8 print:mb-6 print:break-inside-avoid">
      <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 print:mb-3 border-b border-gray-300 pb-2 print:pb-1">
        {t("cv.builder.cv.sections.languages", "Idiomas")}
      </h2>

      <div className="space-y-3 print:space-y-2">
        {languages.map((language, index) => (
          <div
            key={index}
            className="bg-gray-50 print:bg-white border border-gray-200 print:border-gray-300 rounded-lg p-4 print:p-3 hover:bg-gray-100 print:hover:bg-white transition-colors print:break-inside-avoid"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 print:gap-2">
              {/* Nombre del idioma */}
              <div className="flex items-center">
                <span className="text-blue-600 print:text-gray-700 mr-2 text-lg print:text-base">
                  🌐
                </span>
                <h3 className="text-lg print:text-base font-semibold text-gray-900">
                  {language.name}
                </h3>
              </div>

              {/* Niveles de competencia en línea */}
              <div className="flex flex-wrap gap-2 print:gap-1 text-sm print:text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600 print:text-gray-700 font-medium">
                    {t("cv.builder.cv.labels.reading", "Lectura")}:
                  </span>
                  <span className="text-gray-800 print:text-gray-900 bg-blue-100 print:bg-gray-100 px-2 py-1 print:px-1 print:py-0.5 rounded-md print:rounded-sm font-medium">
                    {language.reading}
                  </span>
                </div>

                <span className="text-gray-300 print:text-gray-400">|</span>

                <div className="flex items-center gap-1">
                  <span className="text-gray-600 print:text-gray-700 font-medium">
                    {t("cv.builder.cv.labels.writing", "Escritura")}:
                  </span>
                  <span className="text-gray-800 print:text-gray-900 bg-green-100 print:bg-gray-100 px-2 py-1 print:px-1 print:py-0.5 rounded-md print:rounded-sm font-medium">
                    {language.writing}
                  </span>
                </div>

                <span className="text-gray-300 print:text-gray-400">|</span>

                <div className="flex items-center gap-1">
                  <span className="text-gray-600 print:text-gray-700 font-medium">
                    {t("cv.builder.cv.labels.speaking", "Habla")}:
                  </span>
                  <span className="text-gray-800 print:text-gray-900 bg-purple-100 print:bg-gray-100 px-2 py-1 print:px-1 print:py-0.5 rounded-md print:rounded-sm font-medium">
                    {language.speaking}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;
