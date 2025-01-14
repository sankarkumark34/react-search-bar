interface Window {
  webkitSpeechRecognition: any;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onend: () => void;
  onresult: (event: any) => void;
  start: () => void;
  stop: () => void;
}