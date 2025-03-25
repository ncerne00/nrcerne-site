"use client";
import { Container, Flex, Box, Space, Image, Title, Paper } from "@mantine/core";
import Terminal from "@/components/content/Terminal";
import GitHubCalendar from 'react-github-calendar';

import Badges from "@/components/content/Badges";

  // Define certification badges
  const certificationBadges = [
    {
      id: "oscp",
      name: "Offensive Security Certified Professional (OSCP)",
      image: "/images/oscp-badge.png",
      description: "Advanced penetration testing with a focus on hands-on practical skills",
      issuer: "Offensive Security",
      issueDate: "2022",
      url: "https://images.credential.net/embed/bbutduhv.png"
    },
    {
      id: "oswe",
      name: "Offensive Security Web Expert (OSWE)",
      image: "/images/oswe-badge.png",
      description: "Advanced web application security testing and white box penetration testing",
      issuer: "Offensive Security",
      issueDate: "2023",
      url: "https://www.credential.net/50e33530-6061-4f1b-8cd5-e87266c3c492#acc.FcJArjOV"
    },
  ];

export default function Whoami() {
  const terminalContent = `➜ cat about.txt
 Hello! I'm a hacker passionate about web apps, embedded devices, and red teaming! 😊
 I also commonly work with programming languages like TypeScript, Python, Java, and Rust.
 ➜ ls past_projects
 - Project 1: Reverse Engineering and hacking a Smart Grill
 - Project 2: RustyMalware - A malware development library in Rust
 - Project 3: Reverse Engineering an HP 3830 Printer 🖨️
 ➜ cat learn_more.txt
 If you'd like to read more on my current projects, visit my GitHub (linked above) or read my blog!`;

  return (
    <Container size="xl" py="xl">
      <Space h="xl" />
      {/* Top Section: Terminal and Profile */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap="xl"
        align="start"
        mb="xl"
      >
        {/* Left Column: Terminal */}
        <Box w={{ base: "100%", md: "80%" }}>
          <Terminal
            title="nrcerne.com:~/whoami"
            content={terminalContent}
            height={320}
            width="100%"
            typewriterEffect={true}
            typewriterSpeed={15}
          />
        </Box>
        
        {/* Right Column: Profile Image */}
        <Box w={{ base: "100%", md: "30%" }} ta={{ base: "center", md: "center" }}>
          <Paper shadow="md" radius="lg" p="md" withBorder>
            <Image
              src="/images/dog.jpg"
              alt="Whoami"
              radius="50%"
              maw={220}
              mx="auto"
              mb="md"
            />
            <Title order={4} ta="center" mb="sm">
              Nick &quot;nix&quot; Cerne
            </Title>
          </Paper>
        </Box>
      </Flex>

      {/* GitHub Contributions Section */}
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          GitHub Contributions
        </Title>
        <Box>
          <GitHubCalendar 
            username="ncerne00"
            colorScheme="dark"
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            />
        </Box>
      </Paper>

        {/* Certifications Section */}
        <Flex w="100%" justify="center">
          <Box w={{ base: "100%", lg: "40%" }} p="lg">
            <Badges badges={certificationBadges} />
          </Box>
        </Flex>
    </Container>
  );
}