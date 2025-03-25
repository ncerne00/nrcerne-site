'use client'
import { Box, Group, Text, Flex, Divider, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun, IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

export default function NavBar() {
  const links = [
    { href: '/', label: 'whoami' },
    { href: '/blog', label: 'blog' }
  ];
  
  // Use Mantine's built-in color scheme management
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Toggle theme function
  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };
  
  return (
    <Box>
      {/* Links in center */}
      <Flex display="flex" justify="space-around">
        <Group justify="center" gap="xl" style={{ flexDirection: 'row', margin: '12px' }}>
            {links.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                style={{
                textDecoration: 'none',
                color: 'inherit'
                }}
            >
                <Box
                style={{
                    position: 'relative',
                    padding: '8px 4px'
                }}
                >
                <Text
                    fw={500}
                    size="md"
                    style={{
                    letterSpacing: '0.5px',
                    textTransform: 'capitalize',
                    }}
                >
                    {link.label}
                </Text>
                </Box>
            </Link>
            ))}
        </Group>
        <Group justify="center" style={{ flexDirection: 'row', margin: '12px' }}>
            <ActionIcon
                variant="transparent"
                color={colorScheme === 'dark' ? 'gray' : 'black'}
                onClick={toggleTheme}
                title="Toggle theme"
            >
                {isDark ? <IconSun size={25} /> : <IconMoon size={25} />}
            </ActionIcon>
            <Link href="https://github.com/ncerne00"
            style={{
                textDecoration: 'none',
                color: 'inherit'
                }}
            >
                <IconBrandGithub size={25} />
            </Link>
        </Group>
      </Flex>
      <Divider size="xs" />
    </Box>
  );
}