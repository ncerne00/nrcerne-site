import { notFound } from 'next/navigation';
import { Title, Text, Group, Badge, Flex, Paper } from '@mantine/core';
import { format } from 'date-fns';

import { getPostBySlug, serializeMDX, getAllPosts } from '@/lib/mdx';
import MDXContent from '@/components/content/MDXContent';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return notFound();
  }
  
  const mdxSource = await serializeMDX(post.content);
  
  return (
    <Flex w="100%" justify="center">
      <Paper 
        shadow="lg" 
        w={{ base: "95%", sm: "90%", md: "80%", lg: "60%" }}
        p="lg"
      >
        <Flex direction="column" align="center">
          <Title ta="center">{post.meta.title}</Title>
          <Text size="sm" c="dimmed" my="md">
            {format(new Date(post.meta.date), 'MMMM dd, yyyy')}
          </Text>
          
          {post.meta.tags && (
            <Group gap="xs" mb="xl">
              {post.meta.tags.map((tag) => (
                <Badge key={tag} variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>
          )}
            <MDXContent source={mdxSource} />
        </Flex>
      </Paper>
    </Flex>
  );
}
