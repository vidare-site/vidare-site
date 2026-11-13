import React from 'react';
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Blog from './pages/Blog';
import ServicePage from './pages/ServicePage';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './i18n/LanguageProvider';
import { isServiceSlug } from './content/servicePages.js';
import {
  DEFAULT_LOCALE,
  buildLocalePath,
  isSupportedLocale,
} from './i18n/config';

const LocalizedShell = () => {
  const { locale } = useParams();

  if (!isSupportedLocale(locale)) {
    return <NotFound />;
  }

  return (
    <LanguageProvider locale={locale}>
      <Layout>
        <Outlet />
      </Layout>
    </LanguageProvider>
  );
};

const LocalizedFallback = () => {
  const { locale } = useParams();

  return <NotFound locale={locale} />;
};

const AutoLocaleRedirect = ({ path = '/' }) => {
  const locale = DEFAULT_LOCALE;

  return <Navigate to={buildLocalePath(locale, path)} replace />;
};

const AutoLocaleServiceRedirect = () => {
  const { serviceSlug } = useParams();
  if (!isServiceSlug(serviceSlug)) return <NotFound />;
  return <Navigate to={buildLocalePath(DEFAULT_LOCALE, `/services/${serviceSlug}`)} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LanguageProvider locale={DEFAULT_LOCALE}><Layout><Home /></Layout></LanguageProvider>} />
      <Route path="/blog" element={<AutoLocaleRedirect path="/blog" />} />
      <Route path="/cadastro" element={<AutoLocaleRedirect path="/cadastro" />} />
      <Route path="/services/:serviceSlug" element={<AutoLocaleServiceRedirect />} />

      <Route path="/:locale" element={<LocalizedShell />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="services/:serviceSlug" element={<ServicePage />} />
        <Route path="*" element={<LocalizedFallback />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
