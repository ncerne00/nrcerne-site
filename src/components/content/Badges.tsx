"use client";
import { Paper, Title, Flex, Box, Image, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { useState } from "react";

interface BadgeProps {
  id: string;
  name: string;
  image: string;
  description: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

interface BadgesProps {
  badges: BadgeProps[];
}

export default function Badges({ badges }: BadgesProps) {
  /* Track hover state for each badge */
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <Paper shadow="sm" p="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Certifications
      </Title>
      <Flex
        wrap="wrap"
        gap="xl"
        justify="center"
        align="center"
      >
        {badges.map((badge) => (
          <Tooltip
            key={badge.id}
            label={`${badge.name} - ${badge.description}`}
            position="top"
            withArrow
            multiline
            width={220}
          >
            <UnstyledButton
              component={badge.url ? "a" : "div"}
              href={badge.url || undefined}
              target={badge.url ? "_blank" : undefined}
              rel={badge.url ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredBadge(badge.id)}
              onMouseLeave={() => setHoveredBadge(null)}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box 
                ta="center" 
                maw={180}
                style={{
                  transform: hoveredBadge === badge.id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: hoveredBadge === badge.id ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: badge.url ? 'pointer' : 'default',
                }}
              >
                <Image
                  src={badge.image}
                  alt={badge.name}
                  width={140}
                  height={140}
                  fit="contain"
                  mb="xs"
                />
                <Text fw={600} size="sm">
                  {badge.id.toUpperCase()}
                </Text>
                <Text size="xs" c="dimmed">
                  {badge.issuer} • {badge.issueDate}
                </Text>
              </Box>
            </UnstyledButton>
          </Tooltip>
        ))}
      </Flex>
    </Paper>
  );
}