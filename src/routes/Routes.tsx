import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

/**
 * Renders routes depending on Authenticated or Anonymous users
 * @component Routes
 */
const Routes = () => {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
};
export default Routes;
