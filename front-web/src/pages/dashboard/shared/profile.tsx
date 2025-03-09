import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, Container } from '@mui/material';

export const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2
            }}
          />
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            {/* Add personal information fields here */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            {/* Add account information fields here */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
