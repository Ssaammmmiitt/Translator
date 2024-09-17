import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophoneFilled } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
  };

  return (
    <div>
      <IconMicrophoneFilled
        size={22}
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={handleVoiceRecording}
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
