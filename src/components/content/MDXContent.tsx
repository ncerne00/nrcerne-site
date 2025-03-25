'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from './MDXComponents';

export default function MDXContent({ source }: { source: any }) {
  return <MDXRemote {...source} components={MDXComponents} />;
}