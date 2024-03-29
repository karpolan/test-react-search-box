import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from '../layout';
import { NotFoundView } from '../views';
import AboutView from '../views/About';
import DevView from '../views/Dev';
import HomeView from '../views/Home';
import MuiSolutionView from '../views/MuiSolution';

/**
 * List of routes available for anonymous users
 * Also renders the "Public Layout" composition
 * @routes PublicRoutes
 */
const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="mui" element={<MuiSolutionView />} />
        <Route path="about" element={<AboutView />} />
        {process.env.REACT_APP_DEBUG === 'true' && <Route path="dev" element={<DevView />} />}
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
