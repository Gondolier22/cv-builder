import React from "react";

interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="mb-8 print:mb-6 print:break-inside-avoid">
      <h2 className="text-2xl print:text-xl font-bold text-gray-900 mb-4 print:mb-3 border-b border-gray-300 pb-2 print:pb-1">
        Habilidades Técnicas
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 print:grid-cols-4 gap-2 print:gap-1">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 print:bg-gray-50 text-gray-800 px-3 py-2 print:px-2 print:py-1 rounded-md text-sm print:text-xs font-medium text-center border border-gray-200 print:border-gray-300 hover:bg-gray-200 print:hover:bg-gray-50 transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
