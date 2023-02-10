import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface Props {
  onSpeechEnd: (spokenText: string) => void;
}

const SpeechRecogniser = ({ onSpeechEnd }: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    onSpeechEnd(transcript);
  };

  const reset = () => {
    resetTranscript();
    onSpeechEnd("");
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition</span>;
  }

  return (
    <div>
      <p>{listening ? "on" : "off"}</p>
      <button onClick={startListening}>Start listening</button>
      <button onClick={stopListening}>Stop listening</button>
      <button onClick={reset}>Reset transcription</button>
    </div>
  );
};

export default SpeechRecogniser;
