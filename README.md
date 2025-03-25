# Personal Blog

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)

A modern, performant personal blog website built with Next.js, React, and TypeScript. Features MDX for rich content authoring.

## 🚀 Upcoming Features

- **Blog Analytics** - Track post popularity using Supabase
- **Email Newsletter** - Maintain a subscriber mailing list

## 📦 Tech Stack

- **Frontend Framework:** React
- **Meta Framework:** Next.js
- **UI Components:** Mantine
- **Content:** MDX
- **Language:** TypeScript

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ncerne00/nrcerne-site-frontend
cd personal-blog

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your blog in action.

## 📝 Creating Content

Blog posts are written in MDX format and stored in the `content/posts` directory.

```md
---
title: 'My First Blog Post'
date: '2025-03-25'
description: 'This is my very first blog post using MDX'
tags: ['nextjs', 'react', 'beginners']
thumbnail: '/path/to/thumbnail'
---

# Hello World!

This is my first blog post using **MDX**.

## Code Example

```tsx
function Greeting() {
  return <h1>Hello, world!</h1>;
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.