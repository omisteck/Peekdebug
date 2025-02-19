
const formatTime = (date:Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (milliseconds: number): string => {
    const seconds = milliseconds / 1000;
    return `${seconds.toFixed(2)}s`;
  };
  
  export { formatTime, formatDuration };