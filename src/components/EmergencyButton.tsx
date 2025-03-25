
import { useState } from 'react';
import { AlertCircle, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EmergencyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const handleEmergency = async () => {
    setIsActivating(true);
    
    try {
      // Get current location
      const position = await getCurrentPosition();
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString(),
      };
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not logged in");
      }
      
      // Get emergency contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('is_primary', { ascending: false });
        
      if (contactsError) throw contactsError;
      
      if (!contacts || contacts.length === 0) {
        throw new Error("No emergency contacts found");
      }
      
      // Record emergency event
      const { data: eventData, error: eventError } = await supabase
        .from('emergency_events')
        .insert([
          {
            user_id: user.id,
            trigger_type: 'manual',
            emotional_state: 'distress',
            location,
            contacts_notified: contacts.map(c => c.id),
          },
        ])
        .select();
        
      if (eventError) throw eventError;
      
      // In a real app, this would trigger notifications to emergency contacts
      // For demo purposes, we'll just show a toast
      toast.success("Emergency contacts notified of your situation");
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Emergency activation error:", error);
      toast.error("Could not activate emergency mode. Please try again or call emergency services directly.");
    } finally {
      setIsActivating(false);
    }
  };
  
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  return (
    <>
      <Button 
        variant="destructive"
        size="sm"
        className="rounded-full px-4 animate-pulse"
        onClick={() => setIsDialogOpen(true)}
      >
        <AlertOctagon className="h-4 w-4 mr-2" />
        SOS
      </Button>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Activate Emergency Mode?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will alert your emergency contacts with your current location and status. 
              Only use this in case of a genuine emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleEmergency}
              disabled={isActivating}
            >
              {isActivating ? "Activating..." : "Activate Emergency Mode"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EmergencyButton;
