
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Phone, User, AtSign, Heart, Plus, Trash2, Save, AlertCircle } from 'lucide-react';

type EmergencyContact = {
  id?: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  is_primary: boolean;
};

const EmergencyContactsForm = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserLoggedIn(!!data.session);
      
      if (data.session) {
        fetchContacts();
      }
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserLoggedIn(!!session);
      if (session) {
        fetchContacts();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .order('is_primary', { ascending: false });

      if (error) throw error;

      setContacts(data || []);
      
      if (data && data.length === 0) {
        // Add an empty contact form if no contacts exist
        addContact();
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Could not load emergency contacts');
    } finally {
      setLoading(false);
    }
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        name: '',
        relationship: '',
        phone: '',
        email: '',
        is_primary: contacts.length === 0, // First contact is primary by default
      },
    ]);
  };

  const removeContact = (index: number) => {
    const newContacts = [...contacts];
    const contactToRemove = newContacts[index];
    
    // If removing a contact that exists in the database
    if (contactToRemove.id) {
      deleteContact(contactToRemove.id);
    } else {
      // If removing a contact that doesn't exist in the database yet
      newContacts.splice(index, 1);
      setContacts(newContacts);
    }
  };

  const deleteContact = async (id: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from local state too
      setContacts(contacts.filter(contact => contact.id !== id));
      toast.success('Contact removed');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Could not delete contact');
    } finally {
      setSaving(false);
    }
  };

  const updateContactField = (index: number, field: keyof EmergencyContact, value: string | boolean) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value,
    };
    setContacts(updatedContacts);
  };

  const setPrimaryContact = (index: number) => {
    const updatedContacts = contacts.map((contact, i) => ({
      ...contact,
      is_primary: i === index,
    }));
    setContacts(updatedContacts);
  };

  const saveContacts = async () => {
    if (!userLoggedIn) {
      toast.error('Please log in to save emergency contacts');
      return;
    }

    // Validate contacts
    const invalidContacts = contacts.filter(
      contact => !contact.name || !contact.phone
    );
    
    if (invalidContacts.length > 0) {
      toast.error('All contacts must have at least a name and phone number');
      return;
    }

    setSaving(true);
    try {
      // Handle existing contacts (update)
      const existingContacts = contacts.filter(contact => contact.id);
      for (const contact of existingContacts) {
        const { id, ...contactData } = contact;
        const { error } = await supabase
          .from('emergency_contacts')
          .update(contactData)
          .eq('id', id);
          
        if (error) throw error;
      }
      
      // Handle new contacts (insert)
      const newContacts = contacts.filter(contact => !contact.id);
      if (newContacts.length > 0) {
        const { error } = await supabase
          .from('emergency_contacts')
          .insert(newContacts);
          
        if (error) throw error;
      }
      
      toast.success('Emergency contacts saved');
      fetchContacts(); // Refresh the list to get the new IDs
    } catch (error) {
      console.error('Error saving contacts:', error);
      toast.error('Could not save emergency contacts');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading emergency contacts...</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
      <p className="text-muted-foreground mb-6">
        These contacts will be notified in case of emergency.
      </p>
      
      {!userLoggedIn && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            You need to log in to save emergency contacts.
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <div key={index} className="p-4 border border-border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Contact {index + 1}</h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    contact.is_primary
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setPrimaryContact(index)}
                >
                  {contact.is_primary ? 'Primary Contact' : 'Set as Primary'}
                </button>
                {contacts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeContact(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`name-${index}`}
                    className="pl-10"
                    placeholder="Full name"
                    value={contact.name}
                    onChange={(e) => updateContactField(index, 'name', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`relationship-${index}`}>Relationship</Label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`relationship-${index}`}
                    className="pl-10"
                    placeholder="e.g. Parent, Partner, Friend"
                    value={contact.relationship}
                    onChange={(e) => updateContactField(index, 'relationship', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`phone-${index}`}
                    className="pl-10"
                    placeholder="+1 123 456 7890"
                    value={contact.phone}
                    onChange={(e) => updateContactField(index, 'phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email (Optional)</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`email-${index}`}
                    className="pl-10"
                    placeholder="email@example.com"
                    value={contact.email}
                    onChange={(e) => updateContactField(index, 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={addContact} 
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Another Contact
          </Button>
          
          <Button 
            onClick={saveContacts} 
            disabled={saving || !userLoggedIn}
            className="flex items-center"
          >
            {saving ? (
              <>Saving... <AlertCircle className="ml-2 h-4 w-4 animate-spin" /></>
            ) : (
              <>Save Contacts <Save className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsForm;
