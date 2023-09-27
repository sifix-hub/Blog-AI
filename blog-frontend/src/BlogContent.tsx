import React from 'react';

interface BlogContentProps {
  generatedContent: string;
  isLoading: boolean;
}

const BlogContent: React.FC<BlogContentProps> = ({ generatedContent, isLoading }) => {
  return (
    isLoading ? (
      <p>Wait while we generate the content</p>
    ) : (
      <div className="p-4 bg-blue-200">
        <h1 className="text-3xl font-semibold">Generated Blog Content</h1>
        <p>{generatedContent}</p>
      </div>
    )
  );
};

export default BlogContent;
