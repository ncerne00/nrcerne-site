import { Title, Grid, GridCol, Stack, Flex } from '@mantine/core';
import { getAllPosts } from '@/lib/mdx';
import BlogCard from '@/components/content/BlogCard';
export default async function BlogPage() {
  const allPosts = await getAllPosts();
  
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
      </Grid>
    </Flex>
  );
}