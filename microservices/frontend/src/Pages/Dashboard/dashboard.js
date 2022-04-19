/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { ProgrammeCard } from '../../Components/Cards/Cards';
import { Tabs1, Tabs2 } from './constants';
import store from '../../Store/store';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { dashboard } = store.getState();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (tab) => {

  };

  const programmesMockData = [
    {
      name: 'Btech Ug 2018',
      currentSem: 6,
      totalSem: 8,
      cgpa: 9.6,
      startDate: '21/06/2018',
    },
    {
      name: 'Mtech Pg 2018',
      currentSem: 1,
      totalSem: 4,
      cgpa: 6.7,
      startDate: '21/06/2018',

    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ mx: 'auto', fontWeight: 800 }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {Object.keys(Tabs1).map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {Tabs1[text].icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {Object.keys(Tabs2).map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {Tabs2[text].icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container spacing={2}>
          {programmesMockData.map((item) => (
            <Grid item xs={12} sm={6} key={item.name}>
              <ProgrammeCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
  // eslint-disable-next-line react/require-default-props
  window: PropTypes.func,
};

export default Dashboard;
