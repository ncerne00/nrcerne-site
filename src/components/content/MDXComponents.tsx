import React from 'react';
import { Title, Text, Code, List, Anchor, Image } from '@mantine/core';

/* This needs work */
const MDXComponents = {
  h1: (props: any) => <Title order={1} my="lg" {...props} />,
  h2: (props: any) => <Title order={2} my="md" {...props} />,
  h3: (props: any) => <Title order={3} my="sm" {...props} />,
  h4: (props: any) => <Title order={4} my="xs" {...props} />,
  p: (props: any) => <Text my="md" {...props} />,
  code: (props: any) => <Code {...props} />,
  ul: (props: any) => <List {...props} />,
  ol: (props: any) => <List type="ordered" {...props} />,
  li: (props: any) => <List.Item {...props} />,
  a: (props: any) => <Anchor {...props} />,
  img: (props: any) => <Image {...props} my="md" />,
};

export default MDXComponents;
