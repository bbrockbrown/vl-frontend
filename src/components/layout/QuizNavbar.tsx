import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LightLogo from '@/components/icons/LightLogo';
import { LogOut } from 'lucide-react';
import Button from '@/components/base/Button';

interface QuizNavbarProps {
  onExit?: () => void;
}

export default function QuizNavbar({ onExit }: QuizNavbarProps) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleExitClick = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = () => {
    // Clear quiz state from localStorage
    localStorage.removeItem('vibelog_quiz_state');
    localStorage.removeItem('vibelog_quiz_answers');
    
    // Navigate back to home
    navigate('/');
    
    // Call optional onExit callback
    if (onExit) {
      onExit();
    }
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className='flex flex-row items-center justify-between w-full max-w-[1400px] py-4 px-4 md:px-6'>
        {/* Logo */}
        <div className='relative'>
          <LightLogo width='120' height='40' />
        </div>

        {/* Exit Button */}
        <div className='flex justify-end'>
          <Button
            color='#CB3CFF'
            className='flex flex-row items-center gap-2 border border-white px-3 py-2 text-sm md:text-base'
            onClick={handleExitClick}
          >
            <span>Exit Quiz</span>
            <LogOut size={16} className="mr-2" />
          </Button>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className='absolute inset-1 z-50 flex items-center justify-center bg-black/65'>
          <div className='relative bg-[#14161a] rounded-lg p-6 mx-4 max-w-sm w-full border border-gray-700 bottom-25'>
            <div className='text-center'>
              <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-2'>
                <LogOut className='h-6 w-6 text-red-600' />
              </div>
              
              <h3 className='text-lg font-medium text-white mb-2'>
                Exit Quiz?
              </h3>
              
              <p className='text-gray-300 text-sm !mb-4'>
                Your progress will be lost. Are you sure you want to exit?
              </p>
              
              <div className='flex flex-col sm:flex-row gap-3'>
                <Button
                  color='#CB3CFF'
                  className='border border-red-400 flex-1 hover:bg-red-950 transition-colors'
                  onClick={handleConfirmExit}
                >
                  Yes, Exit
                </Button>
                
                <Button
                  color='#10c3ff'
                  className='border border-white flex-1 hover:bg-gray-950 transition-colors'
                  onClick={handleCancelExit}
                >
                  Continue Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
