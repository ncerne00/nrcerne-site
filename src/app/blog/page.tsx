import { Title, Grid, GridCol, Stack, Flex } from '@mantine/core';

import { getAllPosts } from '@/lib/mdx';
import BlogCard from '@/components/content/BlogCard';
import { EmailSubscriptionCard } from '@/components/email/EmailSubscriptionCard';
export default async function BlogPage() {
  const allPosts = await getAllPosts();
  
  return (
    <Flex direction="column" m="xl">
      <Title order={1} mb="xl">Blog</Title>
      
      <Grid gutter="xl" justify="center">
        {/* Main content - All posts */}
        <GridCol span={10}>
          <Stack gap="xl">
            {allPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </Stack>
        </GridCol>
      </Grid>
      <Flex justify="center" m="lg">
        <EmailSubscriptionCard />
      </Flex>
    </Flex>
  );
}