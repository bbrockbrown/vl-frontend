import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizResult } from '@/api/quiz';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">Please complete the quiz to see your results.</p>
          <button
            onClick={() => navigate('/quiz')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Your Vibe Profile 🎵
          </h1>
          
          {/* Personality Traits */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Personality</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Mood Profile:</span>
                  <p className="font-medium">{results.personalityTraits.moodProfile}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Energy Level:</span>
                  <p className="font-medium">{results.personalityTraits.energyLevel}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Social Style:</span>
                  <p className="font-medium">{results.personalityTraits.socialStyle}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Creativity Level:</span>
                  <p className="font-medium">{results.personalityTraits.creativityLevel}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lifestyle Pattern:</span>
                  <p className="font-medium">{results.personalityTraits.lifestylePattern}</p>
                </div>
              </div>
            </div>

            {/* Music Correlations */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Music Alignment</h3>
              <div className="space-y-4">
                {Object.entries(results.musicCorrelations).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace('Music Match', '')}
                      </span>
                      <span className="font-medium">{Math.round(value * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Key Insights</h3>
              <ul className="space-y-2">
                {results.insights.map((insight, index) => (
                  <li key={index} className="text-blue-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Personalized Recommendations</h3>
              <ul className="space-y-2">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-green-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4"
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