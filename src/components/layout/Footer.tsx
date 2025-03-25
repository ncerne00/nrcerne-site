"use client";
import { Box, Text, Container, Flex } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      py="md" 
      mt="xl"
      style={{
        borderTop: '1px solid var(--mantine-color-gray-3)',
      }}
    >
      <Container size="xl">
        <Flex justify="center" align="center">
          <Text size="sm" c="dimmed">
            Nick Cerne © {currentYear}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}