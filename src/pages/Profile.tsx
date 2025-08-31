import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnalyticsProvider } from '@/context/AnalyticsContext';
import type { QuizResult } from '@/api/quiz';
import { useUser } from '@/hooks/users';
import TopCards from '@/components/dashboard/TopCards';
import AudioFeaturesRadar from '@/components/dashboard/AudioFeaturesRadar';
import AudioFeaturesCorrelation from '@/components/dashboard/AudioFeaturesCorrelation';
import ListeningActivityChart from '@/components/dashboard/ListeningActivityChart';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<QuizResult | null>(null);
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    // Load results from localStorage
    try {
      const savedResults = localStorage.getItem('vibelog_quiz_results');
      if (savedResults) {
        setResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="!text-3xl font-bold text-card-foreground !mb-8 text-center">
            Your Music Profile 🎵
          </h1>

          {/* Spotify Username */}
          {user && (
            <div className="mb-8 text-center">
              <p className="text-lg text-muted-foreground">
                Welcome back, <span className="font-semibold text-primary">{user.display_name || user.id}</span>!
              </p>
            </div>
          )}

          {/* Personality Traits and Music Correlations */}
          {results && (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold text-card-foreground !mb-4">Your Personality</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Mood Profile:</span>
                    <p className="font-medium text-card-foreground">{results.personalityTraits.moodProfile}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Energy Level:</span>
                    <p className="font-medium text-card-foreground">{results.personalityTraits.energyLevel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Social Style:</span>
                    <p className="font-medium text-card-foreground">{results.personalityTraits.socialStyle}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Creativity Level:</span>
                    <p className="font-medium text-card-foreground">{results.personalityTraits.creativityLevel}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Lifestyle Pattern:</span>
                    <p className="font-medium text-card-foreground">{results.personalityTraits.lifestylePattern}</p>
                  </div>
                </div>
              </div>

              {/* Music Correlations */}
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold text-card-foreground !mb-4">Music Alignment</h3>
                <div className="flex flex-column flex-wrap justify-around gap-5 md:h-[75%] md:mt-5">
                  {Object.entries(results.musicCorrelations).map(([key, value]) => (
                    <div key={key} className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').replace('Music Match', '')}
                        </span>
                        <span className="font-medium text-card-foreground">{Math.round(value * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Music Analytics Dashboard */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-card-foreground !mb-6 text-center">
              Your Music Analytics 📊
            </h2>
            
            <AnalyticsProvider timeRange="30d">
              {/* Top Cards */}
              <TopCards />
              <AudioFeaturesRadar />

              <ListeningActivityChart />

              <div>
                <AudioFeaturesCorrelation />
              </div>
            </AnalyticsProvider>
          </div>

          <div className="flex md:flex-row flex-col text-center md:gap-0 gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 w-full bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mr-4"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                // TODO: Add export functionality
                console.log('Export profile data');
              }}
              className="px-8 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export My Data (coming soon!)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}