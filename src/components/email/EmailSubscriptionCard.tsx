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
  Notification,
  useMantineTheme
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
  const theme = useMantineTheme();

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
        console.log("piss")
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
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
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
                icon={<IconMail size="1rem" />}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                error={error}
                disabled={loading}
                aria-label="Email address"
              />
              
              {error && (
                <Text size="xs" color="red">
                  {error}
                </Text>
              )}
              
              <Group position="right" mt="md" justify="center">
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
