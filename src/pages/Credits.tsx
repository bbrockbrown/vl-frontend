import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Footer from '@/components/layout/Footer';
import SmallClearBlob from '@/assets/small_clear_blob.png';
import BlueBlob from '@/assets/blue_blob.png';
import { Link } from '@mui/material';

export default function Credits() {
  return (
    <>
      <Box
        sx={{
          background: 'inherit',
          minHeight: '100vh',
          color: '#fff',
          px: { xs: 2, md: 0 },
          pt: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Blobs */}
        <Box
          component="img"
          src={SmallClearBlob}
          sx={{
            position: 'absolute',
            top: { xs: '10%', md: '15%' },
            right: { xs: '-10%', md: '-5%' },
            width: { xs: '60%', md: '40%' },
            height: 'auto',
            zIndex: -1,
            transform: 'rotate(-20deg)',
            filter: 'brightness(0.8)',
            opacity: 0.7,
          }}
          alt=""
        />
        
        <Box
          component="img"
          src={BlueBlob}
          sx={{
            position: 'absolute',
            bottom: { xs: '10%', md: '20%' },
            left: { xs: '-15%', md: '-10%' },
            width: { xs: '50%', md: '35%' },
            height: 'auto',
            zIndex: -1,
            transform: 'rotate(45deg)',
            filter: 'brightness(0.6)',
            opacity: 0.5,
          }}
          alt=""
        />

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            position: 'relative',
            zIndex: 1,
            maxWidth: 800,
            mx: 'auto',
            px: { xs: 2, md: 4 },
            textAlign: 'center',
          }}
        >
          {/* Main Title */}
          <Typography
            variant='h1'
            sx={{
              fontWeight: 800,
              fontFamily: 'Inter',
              fontSize: { xs: 48, sm: 64, md: 72 },
              mb: 2,
              background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}
          >
            Credits
          </Typography>

          {/* Subtitle */}
          <Typography
            variant='h6'
            sx={{
              fontSize: { xs: 18, md: 20 },
              mb: 6,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            This project is made possible by these amazing APIs and services
          </Typography>

          {/* Credits Cards */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {/* Spotify API Card */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                p: 4,
                flex: 1,
                maxWidth: { xs: '100%', md: 350 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 24, md: 28 },
                  mb: 2,
                  background: 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                User Profiles
              </Typography>
              
              <Typography
                variant='body1'
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                Music data, user preferences, and listening history powered by
              </Typography>

              <Link
                href="https://developer.spotify.com/documentation/web-api"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  color: '#1DB954',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 18,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#1ed760',
                    textDecoration: 'underline',
                  },
                }}
              >
                Spotify Web API →
              </Link>
            </Box>

            {/* getSongBpm Card */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                p: 4,
                flex: 1,
                maxWidth: { xs: '100%', md: 350 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 24, md: 28 },
                  mb: 2,
                  background: 'linear-gradient(135deg, #ca3dfd 0%, #10c3ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Song Audio Analysis
              </Typography>
              
              <Typography
                variant='body1'
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                Advanced audio feature analysis and BPM detection provided by
              </Typography>

              <Link
                href="https://getsongbpm.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #ca3dfd 0%, #10c3ff 100%)',
                  fontWeight: 600,
                  fontSize: 18,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  webkitTextStroke: '1px black',
                  textDecoration: 'underline',
                  WebkitTextFillColor: 'transparent',
                  textDecorationColor: 'var(--link-underline)',
                }}
              >
                GetSongBPM →
              </Link>
            </Box>
          </Box>

          {/* Thank You Message */}
          <Typography
            variant='body1'
            sx={{
              mt: 8,
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 16,
              fontStyle: 'italic',
            }}
          >
            Thank you to these services for making this project possible ♥
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
}