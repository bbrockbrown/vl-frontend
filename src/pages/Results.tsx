import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizResult } from '@/api/quiz';
import TopCards from '@/components/dashboard/TopCards';
import ListeningActivity from '@/components/dashboard/ListeningActivity';
import AudioFeaturesRadar from '@/components/dashboard/AudioFeaturesRadar';
import MoodDistribution from '@/components/dashboard/MoodDistribution';
import ListeningPatterns from '@/components/dashboard/ListeningPatterns';
import AudioFeaturesCorrelation from '@/components/dashboard/AudioFeaturesCorrelation';

export default function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load results from localStorage
    try {
      const savedResults = localStorage.getItem('vibelog_quiz_results');
      if (savedResults) {
        setResults(JSON.parse(savedResults));
      } else {
        // No results found, redirect back to quiz
        navigate('/quiz');
      }
    } catch (error) {
      console.error('Error loading results:', error);
      navigate('/quiz');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  console.log("Stored results", results);

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">No Results Found</h2>
          <p className="text-muted-foreground mb-6">Please complete the quiz to see your results.</p>
          <button
            onClick={() => navigate('/quiz')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-card-foreground mb-8 text-center">
            Your Vibe Profile 🎵
          </h1>
          
          {/* Personality Traits */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Your Personality</h3>
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
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border h-full">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Music Alignment</h3>
              <div className="flex flex-column flex-wrap justify-around h-full">
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

          {/* Insights */}
          {results.insights.length > 0 && (
            <div className="bg-primary/10 rounded-lg p-6 mb-6 border border-primary/20">
              <h3 className="text-xl font-semibold text-primary mb-4">Key Insights</h3>
              <ul className="space-y-2">
                {results.insights.map((insight, index) => (
                  <li key={index} className="text-primary flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="bg-green-500/10 rounded-lg p-6 mb-8 border border-green-500/20">
              <h3 className="text-xl font-semibold text-green-500 mb-4">Personalized Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-green-400 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Music Analytics Dashboard */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Your Music Analytics 📊
            </h2>
            
            {/* Top Cards */}
            <TopCards />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <div className="xl:col-span-2">
                <ListeningActivity />
              </div>
              <div>
                <AudioFeaturesRadar />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <MoodDistribution />
              <ListeningPatterns />
            </div>

            <div>
              <AudioFeaturesCorrelation />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mr-4"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                // TODO: Save results to user profile
                console.log('Save results to user profile');
              }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save to My Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 