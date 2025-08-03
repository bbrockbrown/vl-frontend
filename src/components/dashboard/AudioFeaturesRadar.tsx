export default function AudioFeaturesRadar() {
  // Mock audio features data (0-1 scale)
  const audioFeatures = [
    { name: 'Danceability', value: 0.72, color: '#3B82F6' },
    { name: 'Energy', value: 0.68, color: '#10B981' },
    { name: 'Valence', value: 0.45, color: '#F59E0B' },
    { name: 'Acousticness', value: 0.23, color: '#8B5CF6' },
    { name: 'Instrumentalness', value: 0.15, color: '#EF4444' },
    { name: 'Liveness', value: 0.31, color: '#06B6D4' },
    { name: 'Speechiness', value: 0.08, color: '#84CC16' },
  ];

  const radius = 80;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-card-foreground">Audio Features Profile</h3>
        <p className="text-sm text-muted-foreground">Your music taste characteristics</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Radar chart background */}
          <svg width="192" height="192" className="absolute inset-0">
            {/* Background circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
              <circle
                key={index}
                cx="96"
                cy="96"
                r={radius * scale}
                fill="none"
                stroke="#6B7280"
                strokeWidth="1"
              />
              ))}
            
            {/* Audio features radar */}
            <polygon
              points={audioFeatures.map((feature, index) => {
                const angle = (index * 2 * Math.PI) / audioFeatures.length - Math.PI / 2;
                const x = 96 + radius * feature.value * Math.cos(angle);
                const y = 96 + radius * feature.value * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3B82F6"
              strokeWidth="2"
            />
          </svg>

          {/* Feature labels */}
          {audioFeatures.map((feature, index) => {
            const angle = (index * 2 * Math.PI) / audioFeatures.length - Math.PI / 2;
            const x = 96 + (radius + 20) * Math.cos(angle);
            const y = 96 + (radius + 20) * Math.sin(angle);
            
            return (
              <div
                key={feature.name}
                className="absolute text-xs font-medium text-muted-foreground"
                style={{
                  left: x - 20,
                  top: y - 10,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {feature.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature breakdown */}
      <div className="space-y-3">
        {audioFeatures.map((feature) => (
          <div key={feature.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: feature.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{feature.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${feature.value * 100}%`,
                    backgroundColor: feature.color 
                  }}
                ></div>
              </div>
              <span className="text-sm font-medium text-card-foreground">
                {Math.round(feature.value * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};