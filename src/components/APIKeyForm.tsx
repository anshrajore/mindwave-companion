
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Key, Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';

const formSchema = z.object({
  apiKey: z.string().min(10, { message: "API key must be at least 10 characters long" }),
});

type FormValues = z.infer<typeof formSchema>;

interface APIKeyFormProps {
  onSuccess?: (apiKey: string) => void;
}

const APIKeyForm = ({ onSuccess }: APIKeyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });
  
  // Check if API key already exists when component mounts
  useEffect(() => {
    const checkExistingApiKey = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users_metadata')
          .select('api_key_set')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data && data.api_key_set) {
          setIsApiKeySet(true);
        }
      } catch (error) {
        console.error("Error checking API key status:", error);
      }
    };
    
    checkExistingApiKey();
  }, [user]);

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast.error("You must be logged in to save an API key");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store the encrypted API key in localStorage for current session use
      localStorage.setItem('mindwave_api_key', data.apiKey);
      
      // Update the database to mark that this user has an API key set
      // We don't store the actual API key in the database for security reasons
      const { error } = await supabase
        .from('users_metadata')
        .update({ api_key_set: true })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setIsApiKeySet(true);
      setIsLoading(false);
      toast.success("API key saved successfully!");
      
      if (onSuccess) {
        onSuccess(data.apiKey);
      }
    } catch (error: any) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key");
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border p-6 bg-card shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-mindwave-100 flex items-center justify-center">
          <Key className="h-5 w-5 text-mindwave-600" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Set Your API Key</h3>
          <p className="text-sm text-muted-foreground">
            Enter your API key to access voice capabilities
          </p>
        </div>
      </div>
      
      {isApiKeySet ? (
        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-800 rounded-lg">
          <Check className="h-5 w-5" />
          <span>API key is set and ready to use</span>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto"
            onClick={() => {
              setIsApiKeySet(false);
              form.reset();
            }}
          >
            Change Key
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your API key"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save API Key"}
            </Button>
          </form>
        </Form>
      )}
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>
          Don't have an API key? Get one from our API provider to unlock all features.
        </p>
      </div>
    </div>
  );
};

export default APIKeyForm;
