import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { AppButton, AppView } from '../../components';

/**
 * Renders "About" view
 * url: /about
 * @page About
 */
const AboutView = () => {
  const version = '1.1.9'; // process.env.REACT_APP_VERSION || '0.0.1';
  return (
    <AppView>
      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Front-End Interview Task" subheader={`Version ${version}`} />
          <CardContent>
            You are tasked with building a simple React application that includes a search box. The application should
            allow users to enter a query in the search box, fetch data from a mock API based on the query and display
            the results in a table.
          </CardContent>
          <CardActions>
            <AppButton to="/" color="primary">
              OK
            </AppButton>
          </CardActions>
        </Card>
      </Grid>
    </AppView>
  );
};

export default AboutView;
