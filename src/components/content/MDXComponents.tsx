/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Title, Text, Code, List, Anchor, Image, Box, Flex } from '@mantine/core';

const MDXComponents = {
  h1: (props: any) => <Title order={1} ta="center" my="lg" {...props} />,
  h2: (props: any) => <Title order={2} ta="center" my="md" {...props} />,
  h3: (props: any) => <Title order={3} ta="center" my="sm" {...props} />,
  h4: (props: any) => <Title order={4} ta="center" my="xs" {...props} />,
  p: (props: any) => <Flex w="100%"><Text my="md" ta="left" {...props} /></Flex>,
  /* Checks if the code block is a block or inline code */
  code: (props: any) => {
      /* Check if this is a code block (has className with language) or inline code */
      if (props.className) {
        /* This is a code block (```code```) */
        const language = props.className.replace('language-', '');
        return (
          <Box 
            my="md"
            style={{
              borderRadius: 'var(--mantine-radius-md)',
              padding: 'var(--mantine-spacing-md)',
              overflow: 'auto',
            }}
          >
            <Code block language={language} {...props} />
          </Box>
        );
      }
      
      /* This is inline code (`code`) */
      return <Code {...props} />;
    },
  ul: (props: any) => <List {...props} />,
  ol: (props: any) => <List type="ordered" {...props} />,
  li: (props: any) => <List.Item {...props} />,
  a: (props: any) => <Anchor {...props} />,
  img: (props: any) => <Image {...props} my="md" />,
};

export default MDXComponents;
