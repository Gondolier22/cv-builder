import { useFormSteps } from "./hooks/use-form-steps";
import { lazy, Suspense, useCallback } from "react";
import { useTranslation } from "react-i18next";

const BasicsStep = lazy(() => import("./components/basics-steps"));
const WorkExperience = lazy(() => import("./components/work"));
const Education = lazy(() => import("./components/education"));
const Skills = lazy(() => import("./components/skills"));
const Courses = lazy(() => import("./components/courses"));
const Projects = lazy(() => import("./components/projects"));

const FormSteps = () => {
  const { t } = useTranslation();
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    prevStep,
    canGoToPrevStep,
  } = useFormSteps();

  const renderCurrentStep = useCallback(() => {
    switch (currentStep) {
      case "basics":
        return <BasicsStep onNext={nextStep} />;
      case "work":
        return <WorkExperience onNext={nextStep} />;
      case "education":
        return <Education onNext={nextStep} />;
      case "skills":
        return <Skills onNext={nextStep} />;
      case "courses":
        return <Courses onNext={nextStep} />;
      case "projects":
        return <Projects onNext={nextStep} />;
      default:
        return null;
    }
  }, [currentStep, nextStep]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Progress bar */}
      <div className="bg-white shadow-sm flex items-center justify-center gap-16 w-full">
        <button
          className="text-sm font-medium text-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100 px-4 py-2 rounded-md"
          onClick={prevStep}
          disabled={!canGoToPrevStep}
        >
          {t("cv.builder.form.navigation.previous")}
        </button>
        <div className="w-full max-w-4xl py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              {t("cv.builder.form.progress.step", {
                current: currentStepIndex + 1,
                total: totalSteps,
              })}
            </span>
            <span className="text-sm text-gray-500">
              {t("cv.builder.form.progress.completed", {
                percentage: Math.round(
                  ((currentStepIndex + 1) / totalSteps) * 100
                ),
              })}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        <div className="py-8">{renderCurrentStep()}</div>
      </Suspense>
    </div>
  );
};

export default FormSteps;
