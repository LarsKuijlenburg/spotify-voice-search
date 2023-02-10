import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Container, ButtonContainer, Button } from "./styles";

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
    <Container>
      <p>Microphone {listening ? "on" : "off"}</p>
      <ButtonContainer>
        <Button onClick={startListening}>Start listening</Button>
        <Button onClick={stopListening}>Stop listening</Button>
        <Button onClick={reset}>Reset transcription</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SpeechRecogniser;
