import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { AppButton, AppLink, AppView } from '../../components';

/**
 * Renders "Home" view
 * url: /
 * @page Home
 */
const HomeView = () => {
  return (
    <AppView>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="MUI Solution" />
            <CardContent>
              The search form with predefined suggestions using{' '}
              <AppLink href="https://mui.com/material-ui/react-autocomplete/">Autocomplete</AppLink> component. Results
              are shown using <AppLink href="https://mui.com/material-ui/react-table/">Table</AppLink> and{' '}
              <AppLink href="https://mui.com/material-ui/react-alert/">Alert</AppLink> components.
            </CardContent>
            <CardActions>
              <AppButton color="success" to="/mui">
                Open MUI Solution
              </AppButton>
              <AppButton href="https://github.com/karpolan/test-react-search-box/tree/main/src/views/MuiSolution">
                View Code
              </AppButton>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Pure React Solution" />
            <CardContent>
              The search input is styled using CSS modules. The results are shown using a simple HTML table.
            </CardContent>
            <CardActions>
              <AppButton color="info" to="/react">
                Open React Solution
              </AppButton>
              <AppButton href="https://github.com/karpolan/test-react-search-box/tree/main/src/views/ReactSolution">
                View Code
              </AppButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </AppView>
  );
};

export default HomeView;
