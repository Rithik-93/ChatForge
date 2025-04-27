import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import ChatbotLists from '@/components/ChatbotLists';
import { fetchProjects } from '@/utils/db';

const Dashboard = () => {
  const [projects, setProjects] = useState<{id: number, name: string, userId: string}[]>([]);

  useEffect(() => {
    const fetchAndRenderProjects = async () => {
      const projects = await fetchProjects();
      setProjects(projects);
    };
  
    fetchAndRenderProjects();
  },[]);
  return (
    <div className='max-w-full flex  items-center justify-center'>
      
      <div className="w-full max-w-4xl">
        <PageTitle title="AI Agents" buttonHide={false} children={"New Agent"} href='/dashboard/create' variant='default'/>

        <div className="flex flex-wrap gap-4 p-4">
          {projects.map((project) => (
            <div key={project.id}>
              <ChatbotLists {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
