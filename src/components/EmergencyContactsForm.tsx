
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface EmergencyContactsFormProps {
  isLoggedIn: boolean;
  onSave: (contacts: EmergencyContact[]) => void;
}

const EmergencyContactsForm: React.FC<EmergencyContactsFormProps> = ({ isLoggedIn, onSave }) => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: '', relationship: '', phone: '' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const addContact = () => {
    setContacts([...contacts, { name: '', relationship: '', phone: '' }]);
  };

  const updateContact = (index: number, field: string, value: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field as keyof EmergencyContact] = value;
    setContacts(updatedContacts);
  };

  const removeContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!isLoggedIn || !user) {
      toast.error("Please log in to save emergency contacts");
      return;
    }

    setIsLoading(true);
    try {
      // First delete existing contacts
      const { error: deleteError } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('user_id', user.id);
        
      if (deleteError) {
        throw deleteError;
      }
      
      // Add new contacts
      const contactsWithUserId = contacts.map(contact => ({
        ...contact,
        user_id: user.id,
        is_primary: false
      }));
      
      // Set the first contact as primary
      if (contactsWithUserId.length > 0) {
        contactsWithUserId[0].is_primary = true;
      }
      
      const { error: insertError } = await supabase
        .from('emergency_contacts')
        .insert(contactsWithUserId);
        
      if (insertError) {
        throw insertError;
      }

      onSave(contacts);
      toast.success("Emergency contacts saved successfully!");
    } catch (error) {
      console.error("Error saving contacts:", error);
      toast.error("Failed to save emergency contacts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {contacts.map((contact, index) => (
        <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`name-${index}`}>Contact Name</Label>
            <Input
              type="text"
              id={`name-${index}`}
              placeholder="John Doe"
              value={contact.name}
              onChange={(e) => updateContact(index, 'name', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor={`relationship-${index}`}>Relationship</Label>
            <Input
              type="text"
              id={`relationship-${index}`}
              placeholder="Spouse, Parent, Friend"
              value={contact.relationship}
              onChange={(e) => updateContact(index, 'relationship', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor={`phone-${index}`}>Phone Number</Label>
            <Input
              type="tel"
              id={`phone-${index}`}
              placeholder="+1 555-123-4567"
              value={contact.phone}
              onChange={(e) => updateContact(index, 'phone', e.target.value)}
              required
            />
          </div>
          {contacts.length > 1 && (
            <Button type="button" variant="destructive" onClick={() => removeContact(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <div className="flex flex-col lg:flex-row gap-4">
        {contacts.length < 3 && (
          <Button type="button" variant="secondary" onClick={addContact}>
            Add Contact
          </Button>
        )}
        <Button 
          type="submit" 
          className="w-full lg:w-auto" 
          disabled={isLoading || !isLoggedIn}
        >
          {isLoading ? "Saving..." : "Save Contacts"}
        </Button>
      </div>
    </form>
  );
};

export default EmergencyContactsForm;
