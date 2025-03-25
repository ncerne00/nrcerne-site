import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, ScrollArea, useMantineTheme } from '@mantine/core';

interface TerminalProps {
  title?: string;
  content?: string;
  prompt?: string;
  initialText?: string;
  height?: number;
  fontSize?: number;
  width?: string;
  backgroundColor?: string;
  textColor?: string;
  promptColor?: string;
  typewriterEffect?: boolean;
  typewriterSpeed?: number;
  fullscreenButton?: boolean;
}
export default function Terminal({
  title = 'Terminal',
  content = '',
  prompt = '➜',
  initialText = '',
  height = 400,
  fontSize = 14,
  width = '75%',
  backgroundColor = '#1e2433',
  textColor = '#abb2bf',
  promptColor = '#98c379',
  typewriterEffect = false,
  typewriterSpeed = 30,
  fullscreenButton = true,
}: TerminalProps) {
  const theme = useMantineTheme();
  const [displayContent, setDisplayContent] = useState(typewriterEffect ? initialText : content);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollAreaRef = useRef(null);
  const viewportRef = useRef(null);

  /* Terminal typewriter effect */
  useEffect(() => {
    if (!typewriterEffect || !content) return;
    
    let currentIndex = initialText.length;
    const interval = setInterval(() => {
      if (currentIndex <= content.length) {
        setDisplayContent(content.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typewriterSpeed);
    
    return () => clearInterval(interval);
  }, [content, initialText, typewriterEffect, typewriterSpeed]);

  /* Scrolls to the bottom when content changes */
  useEffect(() => {
    if (viewportRef.current) {
      const element = viewportRef.current as HTMLDivElement;
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }
  }, [displayContent]);

  /* Handle fullscreen toggle */
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  /* Format the content with proper line breaks and prompts */
  const formatContent = (text: string) => {
    if (!text) return [];
    
    return text.split('\n').map((line, index) => {
      // Check if this line is a command (starts with prompt)
      const isCommand = line.startsWith(prompt);
      
      return (
        <Text key={index} style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          {isCommand ? (
            <>
              <Text component="span" color={promptColor} inherit>
                {prompt}
              </Text>
              <Text component="span" inherit>
                {line.substring(prompt.length)}
              </Text>
            </>
          ) : (
            line
          )}
        </Text>
      );
    });
  };

  return (
    <Box
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        zIndex: isFullscreen ? 1000 : 'auto',
        width: isFullscreen ? '100vw' : width,
        height: isFullscreen ? '100vh' : height,
        backgroundColor,
        borderRadius: isFullscreen ? 0 : theme.radius.sm,
        fontFamily: 'monospace',
        fontSize,
        color: textColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Terminal Header */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          borderTopLeftRadius: isFullscreen ? 0 : theme.radius.sm,
          borderTopRightRadius: isFullscreen ? 0 : theme.radius.sm,
          background: 'linear-gradient(to bottom, #252b3b, #1e2433)'
        }}
      >
        {/* Traffic lights (macOS style) */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 12 }}>
          <Box
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              cursor: 'default',
            }}
          />
          <Box
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#febc2e',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              cursor: 'default',
            }}
          />
          {fullscreenButton ? (
            <div
              onClick={toggleFullscreen}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#28c840',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.innerHTML = isFullscreen ? '-' : '+';
                e.currentTarget.style.fontWeight = 'bold';
                e.currentTarget.style.fontSize = '8px';
                e.currentTarget.style.color = 'rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.innerHTML = '';
              }}
            />
          ) : (
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#28c840',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                cursor: 'default',
              }}
            />
          )}
        </Box>
        
        {/* Terminal title */}
        <Text
          align="center"
          size="xs"
          weight={500}
          style={{
            flex: 1, 
            color: 'rgba(255, 255, 255, 0.7)',
            userSelect: 'none',
          }}
        >
          {title}
        </Text>
      </Box>
      
      {/* Terminal Content */}
      <ScrollArea
        ref={scrollAreaRef}
        viewportRef={viewportRef}
        style={{ 
          flex: 1,
          padding: 16,
          backgroundColor: backgroundColor,
          backgroundImage: 'radial-gradient(ellipse at top, rgba(114, 137, 218, 0.05), transparent 70%)',
        }}
        scrollbarSize={10}
        offsetScrollbars
        scrollHideDelay={500}
      >
        {formatContent(displayContent)}
      </ScrollArea>
    </Box>
  );
};