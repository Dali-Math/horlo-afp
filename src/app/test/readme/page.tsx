'use client'

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownStyles = `
  .markdown-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
    color: hsl(var(--foreground));
  }
  .markdown-body h1, .markdown-body h2, .markdown-body h3 {
    color: hsl(var(--primary));
    margin-top: 2rem;
  }
  .markdown-body pre {
    background: rgba(0,0,0,0.1);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  .markdown-body code {
    background: rgba(0,0,0,0.05);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
  .markdown-body ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  .markdown-body a {
    color: hsl(var(--primary));
    text-decoration: underline;
  }
`

export default function TestReadmePage() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/README.md') // 🔹 Ce fichier doit être dans /public/
      .then((res) => res.text())
      .then(setContent)
  }, [])

  return (
    <div className="markdown-body">
      <style>{markdownStyles}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
