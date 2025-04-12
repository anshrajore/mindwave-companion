import { useState, useEffect } from 'react';
import { Mic, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const EMERGENCY_NUMBER = '112'; // You can change this to your local emergency number

export function SOSButton() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check microphone permission on component mount
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
    } catch (err) {
      console.error('Microphone permission denied:', err);
      setHasPermission(false);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
    } catch (err) {
      console.error('Failed to get microphone permission:', err);
      alert('Microphone permission is required for emergency calls');
    }
  };

  const handleEmergencyCall = () => {
    if (!hasPermission) {
      requestMicrophonePermission();
      return;
    }
    window.location.href = `tel:${EMERGENCY_NUMBER}`;
  };

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform"
            onClick={() => setIsOpen(true)}
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
                onClick={handleEmergencyCall}
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
    </div>
  );
} 