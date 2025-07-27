import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { submitQuizAnswers } from '@/api/quiz';
import type { QuizAnswer } from '@/api/quiz';
import Button from '@/components/base/Button';
import { spotifyLogin } from '@/api/spotify';

interface QuizProps {}

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'scale' | 'text';
  options?: string[];
  scaleLabels?: { min: string; max: string };
  category: 'mood' | 'energy' | 'social' | 'lifestyle' | 'creativity';
}

interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  seenQuestions: number[];
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
  isTransitioning: boolean;
}

const questions: Question[] = [
  {
    id: 'mood_general',
    text: 'How would you describe your typical mood throughout the day?',
    type: 'multiple-choice',
    options: [
      'Generally happy and positive',
      'Calm and relaxed',
      'Energetic and excited',
      'Thoughtful and introspective',
      'Varies a lot',
    ],
    category: 'mood',
  },
  {
    id: 'energy_level',
    text: 'How would you rate your energy level on a typical day?',
    type: 'scale',
    scaleLabels: { min: 'Very low energy', max: 'Very high energy' },
    category: 'energy',
  },
  {
    id: 'social_preference',
    text: 'How do you prefer to spend your free time?',
    type: 'multiple-choice',
    options: [
      'Socializing with friends',
      'Quiet time alone',
      'Active outdoor activities',
      'Creative pursuits',
      'Mix of everything',
    ],
    category: 'social',
  },
  {
    id: 'music_purpose',
    text: 'What do you primarily use music for?',
    type: 'multiple-choice',
    options: [
      'To boost my mood',
      'To relax and unwind',
      'To focus while working',
      'To dance and have fun',
      'To explore new sounds',
    ],
    category: 'lifestyle',
  },
  {
    id: 'stress_level',
    text: 'How would you rate your stress level?',
    type: 'scale',
    scaleLabels: { min: 'Very low stress', max: 'Very high stress' },
    category: 'mood',
  },
  {
    id: 'creativity_exploration',
    text: 'How do you feel about trying new things?',
    type: 'multiple-choice',
    options: [
      'I love exploring and discovering',
      'I prefer familiar things',
      'I like some variety but not too much',
      'It depends on my mood',
    ],
    category: 'creativity',
  },
  {
    id: 'dance_enjoyment',
    text: 'How much do you enjoy dancing?',
    type: 'scale',
    scaleLabels: { min: 'Not at all', max: 'Love it' },
    category: 'social',
  },
  {
    id: 'workout_frequency',
    text: 'How often do you exercise or work out?',
    type: 'multiple-choice',
    options: [
      'Daily or almost daily',
      'A few times a week',
      'Once a week',
      'Rarely',
      'Never',
    ],
    category: 'energy',
  },
  {
    id: 'introvert_extrovert',
    text: 'Would you describe yourself as more introverted or extroverted?',
    type: 'scale',
    scaleLabels: { min: 'Very introverted', max: 'Very extroverted' },
    category: 'social',
  },
  {
    id: 'music_discovery',
    text: 'How do you usually discover new music?',
    type: 'multiple-choice',
    options: [
      'Spotify recommendations',
      'Friends and social media',
      'I stick to what I know',
      'Concerts and live events',
      'Radio and playlists',
    ],
    category: 'creativity',
  },
];

// Local storage keys
const QUIZ_STATE_KEY = 'vibelog_quiz_state';
const QUIZ_ANSWERS_KEY = 'vibelog_quiz_answers';

export default function Quiz({}: QuizProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check for Spotify callback success
  const success = searchParams.get("success");
  const error = searchParams.get("error");

  // Load saved state from localStorage
  const loadSavedState = (): QuizState => {
    try {
      const savedState = localStorage.getItem(QUIZ_STATE_KEY);
      const savedAnswers = localStorage.getItem(QUIZ_ANSWERS_KEY);
      const savedSeenQuestions = localStorage.getItem(
        'vibelog_quiz_seen_questions'
      );

      if (savedState && savedAnswers) {
        const parsedState = JSON.parse(savedState);
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedSeenQuestions = savedSeenQuestions
          ? JSON.parse(savedSeenQuestions)
          : [];

        return {
          currentQuestion: parsedState.currentQuestion || 0,
          answers: parsedAnswers || [],
          seenQuestions: parsedSeenQuestions || [0], // First question is always seen
          isComplete: parsedState.isComplete || false,
          isLoading: false,
          error: null,
          isTransitioning: false,
        };
      }
    } catch (error) {
      console.error('Error loading saved quiz state:', error);
    }

    return {
      currentQuestion: 0,
      answers: [],
      seenQuestions: [0], // First question is always seen
      isComplete: false,
      isLoading: false,
      error: null,
      isTransitioning: false,
    };
  };

  const [quizState, setQuizState] = useState<QuizState>(loadSavedState);

  // Handle Spotify callback success
  useEffect(() => {
    if (success === 'true') {
      console.log('Spotify authentication successful, submitting quiz answers...');
      
      // Get saved quiz answers from localStorage
      const savedAnswers = localStorage.getItem(QUIZ_ANSWERS_KEY);
      if (savedAnswers) {
        try {
          const answers = JSON.parse(savedAnswers);
          
          // Submit quiz answers automatically
          handleSubmitQuizAnswers(answers);
          
          // Clear the URL parameters
          navigate('/quiz', { replace: true });
        } catch (error) {
          console.error('Error parsing saved quiz answers:', error);
          setQuizState(prev => ({
            ...prev,
            error: 'Failed to load saved quiz answers'
          }));
        }
      } else {
        console.error('No saved quiz answers found');
        setQuizState(prev => ({
          ...prev,
          error: 'No quiz answers found. Please take the quiz again.'
        }));
      }
    } else if (error) {
      console.error('Spotify authentication failed:', error);
      setQuizState(prev => ({
        ...prev,
        error: `Spotify authentication failed: ${error}`
      }));
    }
  }, [success, error, navigate]);

  const handleSubmitQuizAnswers = async (answers: QuizAnswer[]) => {
    setQuizState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Submitting quiz answers:', answers);
      const results = await submitQuizAnswers(answers);

      // Save results to localStorage for the results page
      localStorage.setItem('vibelog_quiz_results', JSON.stringify(results));

      // Clear quiz state from localStorage
      localStorage.removeItem(QUIZ_STATE_KEY);
      localStorage.removeItem(QUIZ_ANSWERS_KEY);
      localStorage.removeItem('vibelog_quiz_seen_questions');

      console.log("SUBMITTED ANSWERSSSSS");
    } catch (error) {
      console.error('Error submitting quiz answers:', error);
      setQuizState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to submit quiz answers',
        isLoading: false,
      }));
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        QUIZ_STATE_KEY,
        JSON.stringify({
          currentQuestion: quizState.currentQuestion,
          isComplete: quizState.isComplete,
        })
      );
      localStorage.setItem(QUIZ_ANSWERS_KEY, JSON.stringify(quizState.answers));
      localStorage.setItem(
        'vibelog_quiz_seen_questions',
        JSON.stringify(quizState.seenQuestions)
      );
    } catch (error) {
      console.error('Error saving quiz state:', error);
    }
  }, [
    quizState.currentQuestion,
    quizState.answers,
    quizState.isComplete,
    quizState.seenQuestions,
  ]);

  const transitionToQuestion = (newQuestion: number) => {
    // Start transition
    setQuizState((prev) => ({ ...prev, isTransitioning: true }));

    // Wait for fade out, then change question
    setTimeout(() => {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: newQuestion,
        isTransitioning: false,
      }));
    }, 150); // Half of the total transition time
  };

  const handleAnswer = (answer: string | number) => {
    const currentQ = questions[quizState.currentQuestion];
    const newAnswer: QuizAnswer = {
      questionId: currentQ.id,
      answer,
      category: currentQ.category,
    };

    // Update existing answer or add new one
    const existingAnswerIndex = quizState.answers.findIndex(
      (a) => a.questionId === currentQ.id
    );
    let newAnswers;

    // Answer state logic
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      newAnswers = [...quizState.answers];
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      // Add new answer
      newAnswers = [...quizState.answers, newAnswer];
    }

    setQuizState((prev) => ({
      ...prev,
      answers: newAnswers,
      seenQuestions: [
        ...new Set([...prev.seenQuestions, prev.currentQuestion + 1]),
      ],
    }));
  };

  const handleBack = () => {
    if (quizState.currentQuestion > 0) {
      transitionToQuestion(quizState.currentQuestion - 1);
    }
  };

  const handleNext = () => {
    console.log('=== handleNext called ===');
    const nextQuestion = quizState.currentQuestion + 1;
    const hasAnsweredCurrent = quizState.answers.some(
      (a) => a.questionId === questions[quizState.currentQuestion].id
    );
    const hasSeenNext = quizState.seenQuestions.includes(nextQuestion);

    console.log('Current question', quizState.currentQuestion);
    console.log('Next question', nextQuestion);
    console.log('answered current question', hasAnsweredCurrent);
    console.log('has seen next', hasSeenNext);
    console.log('isLastQuestion()', isLastQuestion());
    console.log('questions.length', questions.length);

    // Check if we're on the last question and it's answered
    if (isLastQuestion() && hasAnsweredCurrent) {
      console.log('Completing quiz!');
      // Complete the quiz when "Finish" is clicked on the last question
      setQuizState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    } else if (
      (hasAnsweredCurrent || hasSeenNext) &&
      nextQuestion < questions.length
    ) {
      console.log('Navigating to next question');
      // Can go next if current question is answered OR next question has been seen
      setQuizState((prev) => ({
        ...prev,
        seenQuestions: [...new Set([...prev.seenQuestions, nextQuestion])],
      }));

      // Transition to next question
      transitionToQuestion(nextQuestion);
    } else {
      console.log('No action taken - conditions not met');
    }
  };

  const canGoNext = () => {
    const nextQuestion = quizState.currentQuestion + 1;
    console.log('Current question', quizState.currentQuestion);
    console.log('Next question', quizState.currentQuestion + 1);

    const hasAnsweredCurrent = quizState.answers.some(
      (a) => a.questionId === questions[quizState.currentQuestion].id
    );
    const hasSeenNext = quizState.seenQuestions.includes(nextQuestion);

    console.log('answered current question', hasAnsweredCurrent);
    console.log('has seen next', hasSeenNext);

    return (
      (hasAnsweredCurrent || hasSeenNext)
    );
  };

  const isLastQuestion = () => {
    return quizState.currentQuestion === questions.length - 1;
  };

  const handleScaleAnswer = (value: number) => {
    handleAnswer(value);
  };

  const handleTextAnswer = (text: string) => {
    handleAnswer(text);
  };

  const handleSpotifyNavigation = async () => {
    setQuizState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Navigate user to Spotify OAuth
      spotifyLogin();
      // const results = await submitQuizAnswers(quizState.answers);

      // Save results to localStorage for the results page
      // localStorage.setItem('vibelog_quiz_results', JSON.stringify(results));

      // // Clear quiz state from localStorage
      // localStorage.removeItem(QUIZ_STATE_KEY);
      // localStorage.removeItem(QUIZ_ANSWERS_KEY);

      // Navigate to results page
      navigate('/results');
    } catch (error) {
      setQuizState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to generate results',
        isLoading: false,
      }));
    }
  };

  const getCurrentQuestion = () => questions[quizState.currentQuestion];

  const getCurrentAnswer = () => {
    const currentQ = questions[quizState.currentQuestion];
    return quizState.answers.find((a) => a.questionId === currentQ.id);
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    const currentAnswer = getCurrentAnswer();

    return (
      <div
        className={`max-w-2xl mx-auto p-6 transition-opacity duration-300 ${
          quizState.isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-sm text-gray-300'>
              Question {quizState.currentQuestion + 1} of {questions.length}
            </span>
            <div className='w-32 bg-gray-600 rounded-full h-2'>
              <div
                className='bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out'
                style={{
                  width: `${
                    ((quizState.currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <h2 className='text-2xl font-bold text-white mb-6'>
            {question.text}
          </h2>
        </div>

        {question.type === 'multiple-choice' && question.options && (
          <div className='space-y-3'>
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={quizState.isTransitioning}
                className={`w-full p-4 text-left border rounded-lg transition-all duration-200 cursor-pointer ${
                  currentAnswer?.answer === option
                    ? 'border-blue-400 bg-blue-600 text-white'
                    : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700 text-white bg-gray-800'
                } ${quizState.isTransitioning ? 'pointer-events-none' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'scale' && question.scaleLabels && (
          <div className='space-y-4'>
            <div className='flex justify-between text-sm text-gray-300 mb-2'>
              <span>{question.scaleLabels.min}</span>
              <span>{question.scaleLabels.max}</span>
            </div>
            <div className='flex justify-between'>
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  key={value}
                  onClick={() => handleScaleAnswer(value)}
                  disabled={quizState.isTransitioning}
                  className={`w-12 h-12 !rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                    currentAnswer?.answer === value
                      ? 'border-blue-400 bg-blue-600 text-white'
                      : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700 text-white bg-gray-800'
                  } ${quizState.isTransitioning ? 'pointer-events-none' : ''}`}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        )}

        {question.type === 'text' && (
          <div className='space-y-4'>
            <textarea
              className='w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-800'
              rows={4}
              placeholder='Type your answer here...'
              defaultValue={(currentAnswer?.answer as string) || ''}
              disabled={quizState.isTransitioning}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleTextAnswer(e.currentTarget.value);
                }
              }}
            />
            <button
              onClick={() => {
                const textarea = document.querySelector('textarea');
                if (textarea) {
                  handleTextAnswer(textarea.value);
                }
              }}
              disabled={quizState.isTransitioning}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                quizState.isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-8'>
          <button
            onClick={handleBack}
            disabled={
              quizState.currentQuestion === 0 || quizState.isTransitioning
            }
            className={`px-6 py-2 rounded-lg transition-colors cursor-pointer ${
              quizState.currentQuestion === 0 || quizState.isTransitioning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            } ${quizState.currentQuestion === 0 && 'hidden'}`}
          >
            ← Back
          </button>

          <div className='text-sm text-gray-400'>
            {quizState.answers.length} of {questions.length} answered
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext() || quizState.isTransitioning}
            className={`px-6 py-2 rounded-lg transition-colors cursor-pointer ${
              !canGoNext() || quizState.isTransitioning
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLastQuestion() ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!quizState.error) {
      return (
        <div className='max-w-2xl mx-auto p-6'>
          <h2 className='text-2xl font-bold text-white !mb-6'>
            Quiz Complete! :)
          </h2>
          <p className='text-gray-300 !mb-6'>
            Thanks for sharing! We're analyzing your answers alongside your
            Spotify listening data to create your personalized vibe profile.
          </p>

          <div className='bg-blue-900 border border-blue-700 rounded-lg p-4 !mb-6'>
            <h3 className='font-semibold text-blue-200 !mb-2'>
              What happens next?
            </h3>
            <ul className='text-sm text-blue-300 space-y-1'>
              <li>• We'll analyze your listening patterns</li>
              <li>• Compare your answers with your music choices</li>
              <li>• Generate your personalized vibe insights</li>
              <li>• Create your mood-music correlation report</li>
            </ul>
          </div>
          <Button
            onClick={handleSpotifyNavigation}
            className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Connect to Spotify & Generate My Vibe Profile
          </Button>
        </div>
      );
    } else {
      return (
        <div className='max-w-2xl mx-auto p-6'>
          <div className='bg-red-900 border border-red-700 rounded-lg p-4 mb-6'>
            <h3 className='font-semibold text-red-200 mb-2'>
              Oops! Something went wrong
            </h3>
            <p className='text-red-300'>{quizState.error}</p>
          </div>
          <button
            onClick={handleSpotifyNavigation}
            className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Try Again
          </button>
        </div>
      );
    }
  };

  if (quizState.isComplete) {
    return (
      <div
        className='min-h-screen'
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className='container mx-auto py-8'>{renderResults()}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      <div className='container mx-auto py-8'>{renderQuestion()}</div>
    </div>
  );
}
