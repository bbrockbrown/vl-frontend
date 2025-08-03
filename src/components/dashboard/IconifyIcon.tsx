interface IconifyIconProps {
  icon: string;
  className?: string;
}

export const IconifyIcon = ({ icon, className = "w-6 h-6" }: IconifyIconProps) => {
  // Simple icon mapping - in a real app you'd use a proper icon library
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, string> = {
      'mdi:music-note': '🎵',
      'mdi:clock-outline': '⏰',
      'mdi:calendar-check': '📅',
      'mdi:lightning-bolt': '⚡',
      'mdi:trending-up': '📈',
      'mdi:trending-down': '📉',
      'mdi:chart-line': '📊',
      'mdi:radar': '🎯',
      'mdi:heart': '❤️',
      'mdi:emoticon': '😊',
      'mdi:music-box': '🎼',
      'mdi:playlist-music': '🎧',
    };
    
    return iconMap[iconName] || '📊';
  };

  return (
    <span className={className} role="img" aria-label={icon}>
      {getIcon(icon)}
    </span>
  );
}; 