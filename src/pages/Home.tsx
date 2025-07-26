import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { spotifyLogin } from '@/api/spotify';
import Footer from '@/components/layout/Footer';
import GradientButton from '@/components/base/GradientButton';

export default function Home() {
  return (
    <>
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
          {/* <img 
            className="absolute top-0 left-0 w-full h-auto z-[-1]"
            src={require('@/assets/big_clear_blob.png')}
            alt="Background blob"
          /> */}
          <Typography
            variant='h2'
            sx={{
              fontWeight: 700,
              fontFamily: 'Inter',
              fontSize: { xs: 36, md: 56 },
              mb: 2,
              textAlign: 'center',
            }}
          >
            Track Your Mood
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
            Through Music
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
            A beautiful, minimalist mood journal that syncs with your Spotify
            listening and generates personal music + mood trends. Track your
            emotions through music without the chore of traditional journaling.
          </Typography>
          <GradientButton
            onClick={() => spotifyLogin()}
            fromColor='#ca3dfd'
            toColor='#10c3ff'
          >
            CONNECT WITH SPOTIFY
          </GradientButton>
        </Box>
        {/* About Section */}
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 8, mb: 6 }}>
          <Typography
            variant='h4'
            sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            About Vibelog
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: 'rgba(255,255,255,0.85)', mb: 6, textAlign: 'center' }}
          >
            Vibelog combines something Gen Z already does (listen to music) with
            a gentle journaling flow. Generate insights that feel personal,
            aesthetic, and emotional. Perfect for people who want to track
            feelings but don't want to "write a diary".
          </Typography>
          {/* Stats Grid */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Daily Mood
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Track your emotions with emoji + notes
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 2,
                  background:
                    'linear-gradient(90deg, #4F8CFF 0%, #FFD580 100%)',
                  color: '#181A1B',
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 700, color: '#181A1B' }}
                >
                  Spotify Sync
                </Typography>
                <Typography variant='body2' sx={{ color: '#181A1B' }}>
                  Automatic listening data correlation
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Mood Graphs
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Visualize your music + mood patterns
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  AI Insights
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Weekly reports & music recommendations
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {/* Second row of stats */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Free
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Basic mood tracking & Spotify sync
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Premium
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  AI summaries & mood-tagged playlists
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Export
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  PDF reports & Instagram stories
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  Mobile First
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Designed for Gen Z mobile users
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Footer content */}
      <Footer />
    </>
  );
}
