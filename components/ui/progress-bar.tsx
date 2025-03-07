import { useProgress } from '../../hooks/use-progress';

interface ProgressBarProps {
  color?: string;
  height?: number;
  showSpinner?: boolean;
}

export function ProgressBar({
  color = '#0070f3',
  height = 3,
  showSpinner = true,
}: ProgressBarProps) {
  const { styles, isVisible } = useProgress({
    color,
    height,
    showSpinner,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div style={styles.bar as React.CSSProperties} />
      {showSpinner && (
        <div style={styles.spinner as React.CSSProperties}>
          <svg
            className="animate-spin"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v2" />
          </svg>
        </div>
      )}
    </>
  );
}

// Usage example:
// <ProgressBar color="#0070f3" height={3} showSpinner={true} /> 