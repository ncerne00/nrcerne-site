// src/components/content/BlogCard.tsx
import React from 'react';
import { Paper, Image, Text, Group, Badge, Title, Box, Flex } from '@mantine/core';
import Link from 'next/link';
import { format } from 'date-fns';
import { PostMeta } from '@/lib/mdx';

interface BlogCardProps {
  post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const thumbnailPath = post.thumbnail;

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Flex gap="md" align="flex-start">
        {/* Thumbnail on the left */}
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={thumbnailPath}
            width={100}
            height={100}
            radius="md"
            alt={post.title}
          />
        </Link>

        {/* Content on the right */}
        <Box style={{ flex: 1 }}>
          <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={3} mb="xs">{post.title}</Title>
          </Link>
          
          <Text size="sm" color="dimmed" mb="xs">
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </Text>
          
          <Text lineClamp={2} mb="md">
            {post.description}
          </Text>
          
          {post.tags && (
            <Group gap="xs" mt="md">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
          )}
        </Box>
      </Flex>
    </Paper>
  );
}