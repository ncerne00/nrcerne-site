'use client';
import { useState } from 'react';
import { 
  Paper, 
  Text, 
  TextInput, 
  Button, 
  Group, 
  Stack,
  Title,
  Notification
} from '@mantine/core';
import { IconMail, IconCheck } from '@tabler/icons-react';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT 
  ? process.env.NEXT_PUBLIC_API_ENDPOINT.toString() 
  : undefined;

/* Ensure API endpoint is available */
if (!API_ENDPOINT) {
  console.warn('NEXT_PUBLIC_API_ENDPOINT environment variable is not set. The subscription form will not work correctly.')
}

interface SubscriptionCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<boolean>;
  className?: string;
  apiEndpoint?: string;
}

export function EmailSubscriptionCard({
  title = 'Join My Newsletter',
  description = 'Subscribe to get notified when I publish new blog posts.',
  buttonText = 'Subscribe',
  apiEndpoint = API_ENDPOINT,
  className,
}: SubscriptionCardProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    /* Basic Email Validation */
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      if (!apiEndpoint) {
        console.error('API endpoint is not defined.');
        setError('API endpoint is not defined.');
        return;
      }

      /* Send POST request to the API Gateway */
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      p="xl"
      withBorder
      className={className}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title order={3} size="h3">
            {title}
          </Title>
          
          <Text size="sm" color="dimmed">
            {description}
          </Text>
          
          {success ? (
            <Notification
              icon={<IconCheck size="1.2rem" />}
              color="teal"
              title="Subscribed!"
              onClose={() => setSuccess(false)}
            >
              Thank you for subscribing to my newsletter!
            </Notification>
          ) : (
            <>
              <TextInput
                required
                placeholder="your@email.com"
                leftSection={<IconMail size="1rem" />}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                error={error}
                disabled={loading}
                aria-label="Email address"
              />
              
              <Group mt="md" justify="center">
                <Button
                  type="submit"
                  loading={loading}
                  variant="filled"
                >
                  {buttonText}
                </Button>
              </Group>
            </>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
