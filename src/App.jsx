import { BrowserRouter as Router, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Cadastro from './pages/Cadastro';
import LandingSV from './pages/landing/LandingSV';
import { LanguageProvider } from './i18n/LanguageProvider';
import {
  DEFAULT_LOCALE,
  buildLocalePath,
  isSupportedLocale,
  resolvePreferredLocale,
} from './i18n/config';

const LocalizedShell = () => {
  const { locale } = useParams();

  if (!isSupportedLocale(locale)) {
    return <Navigate to={buildLocalePath(DEFAULT_LOCALE)} replace />;
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

  return <Navigate to={buildLocalePath(locale)} replace />;
};

const AutoLocaleRedirect = ({ path = '/' }) => {
  const locale = resolvePreferredLocale();

  return <Navigate to={buildLocalePath(locale, path)} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AutoLocaleRedirect />} />
        <Route path="/blog" element={<AutoLocaleRedirect path="/blog" />} />
        <Route path="/cadastro" element={<AutoLocaleRedirect path="/cadastro" />} />
        <Route path="/sv/landing" element={<LandingSV />} />

        <Route path="/:locale" element={<LocalizedShell />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="*" element={<LocalizedFallback />} />
        </Route>

        <Route path="*" element={<Navigate to={buildLocalePath(DEFAULT_LOCALE)} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
