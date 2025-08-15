import type { FormStep } from "@/store/cv";
import useCVStore from "@/store/cv";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STEPS: FormStep[] = [
  "basics",
  "work",
  "projects",
  "education",
  "courses",
  "skills",
];

export const useFormSteps = () => {
  const {
    currentStep,
    setCurrentStep,
    markStepAsCompleted,
    completedSteps,
    setTotalSteps,
  } = useCVStore();

  const navigate = useNavigate();

  useEffect(() => {
    setTotalSteps(STEPS.length);
  }, [setTotalSteps]);

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

  const isStepCompleted = (step: FormStep) => {
    return completedSteps.has(step);
  };

  const goToPreview = () => {
    navigate("/preview");
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
    goToPreview,
    canGoToPrevStep: currentStepIndex > 0,
  };
};
