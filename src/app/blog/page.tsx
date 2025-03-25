import { Title, Text, Grid, GridCol, Card, Stack, Group, Box, Flex } from '@mantine/core';
import { getAllPosts } from '@/lib/mdx';
import BlogCard from '@/components/content/BlogCard';
import Link from 'next/link';

/* Placeholder function for now, replace once we get supabase working */
const getPopularPosts = (posts) => {
  return [...posts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  /* Get top 5 posts */
  const popularPosts = getPopularPosts(allPosts);
  
  return (
    <Flex direction="column" m="xl">
      <Title order={1} mb="xl">Blog</Title>
      
      <Grid gutter="xl">
        {/* Main content - All posts */}
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack spacing="lg">
            {allPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Stack>
        </GridCol>
        
        {/* Sidebar - Popular posts */}
        <GridCol span={{ base: 12, md: 4 }}>
          <Card withBorder shadow="sm" radius="md" padding="lg" mb="xl" style={{ position: 'sticky', top: '2rem' }}>
            <Title order={3} mb="lg">Popular Posts</Title>
            
            <Stack spacing="md">
              {popularPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.slug}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Group gap="md" wrap="nowrap">
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" fw={500} lineClamp={2}>
                        {post.title}
                      </Text>
                      <Text size="xs" color="dimmed" mt={4}>
                        {post.date}
                      </Text>
                    </Box>
                  </Group>
                </Link>
              ))}
            </Stack>
            
            {popularPosts.length === 0 && (
              <Text size="sm">No popular posts found.</Text>
            )}
          </Card>
        </GridCol>
      </Grid>
    </Flex>
  );
}