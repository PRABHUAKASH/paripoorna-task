import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h3" LinkComponent={Link} to="/">
            Task
          </Typography>
          <Box marginRight={'auto'} marginLeft="auto">
            <Button
              LinkComponent={Link}
              to="/screen1"
              variant="contained"
              color="warning"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Screen1
            </Button>
            <Button
              LinkComponent={Link}
              to="/screen2"
              variant="contained"
              color="warning"
              sx={{ margin: 1, borderRadius: 10 }}
            >
              Screen2
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
