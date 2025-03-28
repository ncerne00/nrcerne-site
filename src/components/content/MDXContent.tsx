'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import MDXComponents from './MDXComponents';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export default function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={MDXComponents} />;
}