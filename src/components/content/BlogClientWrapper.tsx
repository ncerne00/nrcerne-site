'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from './MDXComponents';
import { Title, Text, Group, Badge, Flex } from '@mantine/core';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type BlogPostProps = {
  title: string;
  date: string;
  tags?: string[];
  mdxSource: MDXRemoteSerializeResult;
};

export default function BlogClientWrapper({ title, date, tags, mdxSource }: BlogPostProps) {
  return (
    <Flex direction="column" align="center">
      <Title>{title}</Title>
      <Text size="sm" c="dimmed" my="md">
        {date}
      </Text>
      {tags && (
        <Group gap="xs" mb="xl">
          {tags.map((tag) => (
            <Badge key={tag} variant="light">
              {tag}
            </Badge>
          ))}
        </Group>
      )}
      
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Flex>
  );
}