import useCVStore from "@/store/cv";
import { useCallback } from "react";
import downloadAsJson from "../utils/download-as-json";
import { useNavigate } from "react-router-dom";

const usePreviewController = () => {
  const { cvData } = useCVStore();
  const navigate = useNavigate();

  const downloadAsJsonHandler = useCallback(() => {
    return downloadAsJson(cvData as Record<string, never>);
  }, [cvData]);

  const printAsPDFHandler = () => {
    window.print();
  };

  const goBackHandler = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return {
    downloadAsJsonHandler,
    printAsPDFHandler,
    goBackHandler,
  };
};

export default usePreviewController;
