import React from 'react';
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography, Paper } from '@mui/material';
import BillTable from './components/BillTable';
import { useLocalFavourites } from './hooks/useLocalFavourites';
import { Bill } from './services/api';

const App: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  const { favourites, setFavourites } = useLocalFavourites();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Oireachtas Bills</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2">
            Click a row to see titles (English/Gaeilge). Use the star to favourite.
          </Typography>
        </Paper>

        <Paper>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="tabs">
            <Tab label="All Bills" />
            <Tab label={`Favourites (${favourites.length})`} />
          </Tabs>
          <Box sx={{ p: 2 }}>
            <BillTable
              showFavourites={tab === 1}
              favourites={favourites}
              setFavourites={setFavourites as React.Dispatch<React.SetStateAction<Bill[]>>}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
export default App;
