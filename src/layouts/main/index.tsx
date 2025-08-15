import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const MainLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{t("cv.builder.title")}</title>
        <meta name="description" content={t("cv.builder.description")} />
      </Helmet>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
