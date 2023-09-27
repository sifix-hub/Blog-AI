import { useState } from "react";
import BlogContent from "./BlogContent";
import BlogForm from "./BlogForm";


const App: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="p-4 bg-blue-200 flex flex-col">
        <BlogForm setGeneratedContent={setGeneratedContent} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <BlogContent generatedContent={generatedContent} isLoading={isLoading}/>
    </div>
  );
};



export default App;



