import { Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { AppButton, AppLink, AppView } from '../../components';

/**
 * Renders "Welcome" view
 * url: /
 * @page Home
 */
const HomeView = () => {
  return (
    <AppView>
      {/* <Typography variant="h4">This App contains several solutions</Typography> */}

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
                Open Pure React Solution
              </AppButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </AppView>
  );
};

export default HomeView;
