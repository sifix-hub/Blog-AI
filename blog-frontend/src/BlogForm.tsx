import React, { useState } from 'react';
import axios from 'axios';

interface BlogFormProps {
  setGeneratedContent: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ setGeneratedContent, isLoading, setIsLoading }) => {
  const title = 'create the title and the body for the post';
  const [prompt, setPrompt] = useState<string>('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post('https://blog-ai.onrender.com/generate-blog', {
        title,
        prompt,
      });

      // Handle the response as needed
      console.log('Response:', response.data);

      // Assuming response.data.generatedContent holds the generated content
      setGeneratedContent(response.data.generatedContent);
       setIsLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 flex flex-col ml-10 flex-justify">
      <h1 className="text-2xl font-semibold">AI Blog Content Generator</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700">What do you want to write about?</label>
          <textarea
            id="prompt"
            className="border rounded p-2 w-full h-32"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        <div>
            {!isLoading  ?
               (<button
                type="submit"
                className="bg-blue-500 text-white rounded p-2"
              >
                Generate
              </button>) : (<p>Loading...</p>)
            }
          
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
