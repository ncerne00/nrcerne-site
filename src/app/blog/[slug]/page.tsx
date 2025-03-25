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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return notFound();
  }
  
  const mdxSource = await serializeMDX(post.content);
  
  return (
    <Flex w="100%" justify="center">
      <Paper shadow="lg" w="60%" p="lg">
        <Flex direction="column" align="center">
          <Title>{post.meta.title}</Title>
          <Text size="sm" color="dimmed" my="md">
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
