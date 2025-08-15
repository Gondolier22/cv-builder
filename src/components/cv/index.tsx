import React from "react";
import useCVStore from "../../store/cv";
import BasicsSection from "./basics-section.tsx";
import WorkSection from "./work-section.tsx";
import EducationSection from "./education-section.tsx";
import SkillsSection from "./skills-section.tsx";
import ProjectsSection from "./projects-section.tsx";
import "./styles/cv-print-styles.css";

export const CVDisplay: React.FC = () => {
  const { cvData } = useCVStore();

  return (
    <div className="cv-container bg-white text-gray-900 max-w-screen mx-auto p-8 print:p-6 print:max-w-none print:mx-0 print:shadow-none shadow-lg">
      {/* Header/Basics Section */}
      <BasicsSection basics={cvData.basics} />

      {/* Work Experience Section */}
      {cvData.work && cvData.work.length > 0 && (
        <WorkSection workExperience={cvData.work} />
      )}

      {/* Education Section */}
      {cvData.education && cvData.education.length > 0 && (
        <EducationSection education={cvData.education} />
      )}

      {/* Skills Section */}
      {cvData.skills && cvData.skills.length > 0 && (
        <SkillsSection skills={cvData.skills} />
      )}

      {/* Projects Section */}
      {cvData.projects && cvData.projects.length > 0 && (
        <ProjectsSection projects={cvData.projects} />
      )}
    </div>
  );
};

export default CVDisplay;
