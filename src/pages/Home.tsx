import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Home() {
  return (
    <Box
      sx={{
        background: 'inherit',
        minHeight: '100vh',
        color: '#fff',
        px: { xs: 2, md: 0 },
        pt: 8,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          pb: 10,
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontWeight: 700,
            fontSize: { xs: 36, md: 56 },
            mb: 2,
            textAlign: 'center',
          }}
        >
          Balancing
        </Typography>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 700,
            fontSize: { xs: 36, md: 56 },
            mb: 3,
            textAlign: 'center',
          }}
        >
          Crypto Markets
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            maxWidth: 600,
            mb: 4,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          Our fully automated proprietary quantitative trading software provides
          24/7 liquidity to 170+ crypto assets across 25+ centralized spot and
          derivative crypto exchanges.
        </Typography>
        <Button
          sx={{
            background: 'linear-gradient(90deg, #4F8CFF 0%, #FFD580 100%)',
            color: '#fff',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            fontSize: 18,
            borderRadius: 2,
            boxShadow: '0 2px 8px 0 rgba(79,140,255,0.15)',
            textTransform: 'none',
            mb: 2,
          }}
        >
          GET IN TOUCH
        </Button>
      </Box>
      {/* About Section */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 8, mb: 6 }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
        >
          About Gravity Team
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: 'rgba(255,255,255,0.85)', mb: 6, textAlign: 'center' }}
        >
          At Gravity Team, we are on the mission to balance the supply and
          demand across crypto markets worldwide. We are a crypto native market
          maker founded by traders, developers, and innovators who are strong
          believers and supporters of the future of decentralization and digital
          assets.
        </Typography>
        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                ~$100 billion
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                cumulative trading volume to date
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 2,
                background: 'linear-gradient(90deg, #4F8CFF 0%, #FFD580 100%)',
                color: '#181A1B',
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              <Typography
                variant='h6'
                sx={{ fontWeight: 700, color: '#181A1B' }}
              >
                0.8%
              </Typography>
              <Typography variant='body2' sx={{ color: '#181A1B' }}>
                of the global crypto spot trading volume
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                ~30
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Gravity Teammates (& growing)
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                25+
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                leading global and local crypto exchanges
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/* Second row of stats */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                2017
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                start, crypto-natives
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                1,200+
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                crypto-asset pairs
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                24/7
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                liquidity
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 700 }}>
                5 billion+
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'rgba(255,255,255,0.7)' }}
              >
                trades done to date
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
