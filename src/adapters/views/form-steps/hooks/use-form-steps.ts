import { useState } from "react";

export type FormStep =
  | "basics"
  | "work"
  | "education"
  | "skills"
  | "courses"
  | "projects";

const STEPS: FormStep[] = [
  "basics",
  "work",
  "projects",
  "education",
  "courses",
  "skills",
];

export const useFormSteps = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("basics");
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(
    new Set()
  );

  const currentStepIndex = STEPS.indexOf(currentStep);
  const totalSteps = STEPS.length;

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < totalSteps) {
      markStepAsCompleted(currentStep);
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const markStepAsCompleted = (step: FormStep) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  };

  const isStepCompleted = (step: FormStep) => {
    return completedSteps.has(step);
  };

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    steps: STEPS,
    goToStep,
    nextStep,
    prevStep,
    isStepCompleted,
    canGoToPrevStep: currentStepIndex > 0,
  };
};
