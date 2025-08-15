import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LandingPage = lazy(() => import("./views/landing"));
const FormSteps = lazy(() => import("./views/form-steps"));
const Preview = lazy(() => import("./views/preview"));

const Router = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormSteps />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
