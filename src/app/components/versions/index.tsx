import React from 'react';
import ReactMarkdown from 'react-markdown';
import versions from '../../data/versions.md';
import 'github-markdown-css/github-markdown.css';

export default function Versions() {
    console.log(versions);
    return <ReactMarkdown>{versions}</ReactMarkdown>;
}
