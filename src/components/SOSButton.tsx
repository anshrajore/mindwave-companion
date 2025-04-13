import { useState, useEffect, useRef } from 'react';
import { Mic, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

const EMERGENCY_NUMBER = '112'; // Change this to your local emergency number

export function SOSButton() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Request microphone permission immediately when the component mounts
    requestMicrophonePermission();
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
    } catch (err) {
      console.error('Failed to get microphone permission:', err);
      setHasPermission(false);
      alert('Microphone permission is required for emergency calls');
    }
  };

  const handleEmergency = async () => {
    if (!hasPermission) {
      await requestMicrophonePermission();
      return;
    }
    try {
      const position = await getCurrentPosition();
      const locationMessage = `Emergency! My current location is: https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      const phoneNumber = '9096946604';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(locationMessage)}`;

      // Open WhatsApp with the message
      window.open(whatsappUrl, '_blank');
      toast.success("Emergency message sent to your contact.");
    } catch (error) {
      console.error("Error getting location:", error);
      toast.error("Could not retrieve location. Please ensure location services are enabled.");
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, (error) => {
        console.error("Geolocation error:", error);
        reject(new Error("Unable to retrieve location. Please check your location settings."));
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  const setupSpeechRecognition = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in your browser");
      return false;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      // Check for suicide keywords
      if (transcript.toLowerCase().includes("suicide")) {
        handleEmergency(); // Trigger emergency if the keyword is detected
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast.error(`Speech recognition error: ${event.error}`);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    return true;
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      toast.info("Stopped listening.");
    } else {
      const isSetup = setupSpeechRecognition();
      if (isSetup && recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        toast.success("Listening... Speak now");
      }
    }
  };

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform"
            onClick={() => {
              handleEmergency(); // Call the emergency function directly
              setIsOpen(false); // Close the dialog
            }}
          >
            <span className="text-xl font-bold">SOS</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Assistance</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-4">
            <p className="text-sm text-gray-600">
              {hasPermission
                ? 'Emergency services will be contacted. Are you sure you want to proceed?'
                : 'Microphone permission is required for emergency calls. Please grant permission to continue.'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleEmergency}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency
              </Button>
              {!hasPermission && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={requestMicrophonePermission}
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Grant Permission
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={toggleRecording} className="mt-4">
        {isRecording ? "Stop Listening" : "Start Listening"}
      </Button>
    </div>
  );
} 