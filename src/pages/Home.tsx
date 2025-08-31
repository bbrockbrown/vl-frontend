import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Footer from '@/components/layout/Footer';
import GradientButton from '@/components/base/GradientButton';
import BigClearBlob from '@/assets/big_clear_blob.png';
import BlueBlob from '@/assets/blue_blob.png';
import PurpleYellowBlob from '@/assets/purple_yellow_blob.png';
import BlueYellowBlob from '@/assets/blue_yellow_blob.png';
import PurpleGlassSpotify from '@/assets/purple_glass_spotify.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <>
      <Box
        sx={{
          background: 'inherit',
          minHeight: '100vh',
          color: '#fff',
          px: { xs: 2, md: 0 },
          position: 'relative',
          overflow: 'hidden',
        }}
        className='!md:pt-8 !pt-5'
      >
        {/* Hero Section with Professional Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: {xs: 'center', md: 'space-between'},
            pt: { xs: 2, md: 8 },
            pb: { xs: 6, md: 12 },
            position: 'relative',
            zIndex: 1,
            gap: { xs: 0, md: 8 },
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, md: 4 },
            marginBottom: { xs: 5, md: 10 }
          }}
        >
          {/* Main Blob for Hero Background */}
          <Box
            component="img"
            src={BigClearBlob}
            sx={{
              position: 'absolute',
              top: { xs: '5%', md: '-5%' },
              left: { xs: '-5%', md: '-8%' },
              width: { xs: '70%', md: '50%' },
              height: 'auto',
              zIndex: -1,
              transform: 'rotate(15deg)',
              filter: 'brightness(1.3)',
            }}
            alt=""
          />

          {/* Left Column - Content */}
          <Box
            sx={{
              flex: { xs: '1', md: '1' },
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', md: '50%' },
            }}
          >
            <Typography
              variant='h1'
              sx={{
                fontWeight: 800,
                fontFamily: 'Inter',
                fontSize: { xs: 42, sm: 56, md: 64 },
                mb: 3,
                textAlign: { xs: 'center', md: 'left' },
                background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              Track Your Mood
            </Typography>
            <Typography
              variant='h1'
              sx={{
                fontWeight: 800,
                fontSize: { xs: 42, sm: 56, md: 64 },
                mb: 4,
                textAlign: { xs: 'center', md: 'left' },
                background: 'linear-gradient(135deg, #ca3dfd 0%, #10c3ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}
            >
              Through Music
            </Typography>
            <Typography
              variant='h6'
              sx={{
                maxWidth: 600,
                mb: 6,
                textAlign: { xs: 'center', md: 'left' },
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: 16, md: 20 },
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Take our personality quiz and discover how your music choices reflect your mood, 
              energy, and lifestyle. Connect with Spotify to get personalized insights about 
              your listening patterns and emotional patterns.
            </Typography>
          </Box>

          {/* Right Column - Spotify Logo with "Lit Up" Effect */}
          <Box
            sx={{
              flex: { xs: '1', md: '1' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            {/* Large background blobs to create "lit up" effect */}
            <Box
              component="img"
              src={PurpleYellowBlob}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-15deg)',
                width: { xs: '300px', md: '400px' },
                height: 'auto',
                opacity: 0.15,
                zIndex: 0,
                filter: 'brightness(1.4) saturate(1.3)',
              }}
              alt=""
            />
            
            <Box
              component="img"
              src={BlueBlob}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(25deg)',
                width: { xs: '250px', md: '350px' },
                height: 'auto',
                opacity: 0.12,
                zIndex: 0,
                filter: 'brightness(1.5) saturate(1.2)',
              }}
              alt=""
            />

            {/* Spotify Logo with glow effect */}
            <Box
              component="img"
              src={PurpleGlassSpotify}
              sx={{
                width: { xs: '120px', md: '160px' },
                height: 'auto',
                zIndex: 2,
                filter: 'drop-shadow(0 0 20px rgba(202, 61, 253, 0.3)) drop-shadow(0 0 40px rgba(16, 195, 255, 0.2))',
                transition: 'all 0.3s ease',
                '&:hover': {
                  filter: 'drop-shadow(0 0 30px rgba(202, 61, 253, 0.5)) drop-shadow(0 0 60px rgba(16, 195, 255, 0.3))',
                  transform: 'scale(1.05)',
                },
              }}
              alt="Spotify Logo"
            />
            <GradientButton
              onClick={handleStartQuiz}
              fromColor='#ca3dfd'
              toColor='#10c3ff'
              className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-3xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              START PERSONALITY QUIZ
            </GradientButton>
          </Box>
        </Box>

        {/* Features Section */}
        <Box 
          sx={{ 
            maxWidth: 1200, 
            mx: 'auto', 
            px: { xs: 2, md: 4 },
            mb: { xs: 8, md: 12 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography
            variant='h3'
            sx={{ 
              fontWeight: 700, 
              mb: 6, 
              textAlign: 'center',
              fontSize: { xs: 32, md: 40 },
            }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(202, 61, 253, 0.3)',
                  },
                }}
              >
                <Typography variant='h5' sx={{ fontWeight: 700, mb: 2 }}>
                  Take the Quiz
                </Typography>
                <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  Answer 10 quick questions about your personality, mood, and 
                  lifestyle to discover your music personality type.
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(16, 195, 255, 0.3)',
                  },
                }}
              >
                <Typography variant='h5' sx={{ fontWeight: 700, mb: 2 }}>
                  Connect Spotify
                </Typography>
                <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  Link your Spotify account to analyze your listening patterns and 
                  correlate them with your personality traits.
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(202, 61, 253, 0.3)',
                  },
                }}
              >
                <Typography variant='h5' sx={{ fontWeight: 700, mb: 2 }}>
                  Get Insights
                </Typography>
                <Typography variant='body1' sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  Receive personalized insights about how your music choices reflect your 
                  personality and emotional patterns.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* About Section with Enhanced Design */}
        <Box 
          sx={{ 
            maxWidth: 1000, 
            mx: 'auto', 
            px: { xs: 2, md: 4 },
            mb: { xs: 8, md: 12 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Background blob for about section */}
          <Box
            component="img"
            src={BlueYellowBlob}
            sx={{
              position: 'absolute',
              top: '20%',
              right: { xs: '-10%', md: '-5%' },
              width: { xs: '40%', md: '25%' },
              height: 'auto',
              opacity: 0.06,
              zIndex: -1,
              transform: 'rotate(30deg)',
              filter: 'brightness(1.3) saturate(1.2)',
            }}
            alt=""
          />

          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography
              variant='h3'
              sx={{ 
                fontWeight: 700, 
                mb: 4, 
                textAlign: 'center',
                fontSize: { xs: 28, md: 36 },
              }}
            >
              About Vibelog
            </Typography>
            <Typography
              variant='h6'
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                mb: 4, 
                textAlign: 'center',
                lineHeight: 1.7,
                fontSize: { xs: 16, md: 18 },
                fontWeight: 400,
              }}
            >
              Vibelog combines personality psychology with music analysis to help you understand 
              how your listening habits reflect your emotional patterns. Perfect for music lovers 
              who want to discover the deeper connection between their personality and their playlists.
            </Typography>
            
            {/* Stats Grid with Enhanced Design */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 4 }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant='h4' 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: '#ca3dfd',
                      fontSize: { xs: 20, sm: 24, md: 28 },
                    }}
                  >
                    Personality Quiz
                  </Typography>
                  <Typography 
                    variant='body2' 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: 14, sm: 16, md: 18 },
                    }}
                  >
                    10 questions about you
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant='h4' 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: '#10c3ff',
                      fontSize: { xs: 20, sm: 24, md: 28 },
                    }}
                  >
                    Spotify Analysis
                  </Typography>
                  <Typography 
                    variant='body2' 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: 14, sm: 16, md: 18 },
                    }}
                  >
                    Your listening patterns
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant='h4' 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: '#ca3dfd',
                      fontSize: { xs: 20, sm: 24, md: 28 },
                    }}
                  >
                    Music Correlation
                  </Typography>
                  <Typography 
                    variant='body2' 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: 14, sm: 16, md: 18 },
                    }}
                  >
                    Personality + music match
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant='h4' 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: '#10c3ff',
                      fontSize: { xs: 20, sm: 24, md: 28 },
                    }}
                  >
                    Personalized Insights
                  </Typography>
                  <Typography 
                    variant='body2' 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: { xs: 14, sm: 16, md: 18 },
                    }}
                  >
                    Your unique music profile
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {/* Footer content */}
      <Footer />
    </>
  );
}
