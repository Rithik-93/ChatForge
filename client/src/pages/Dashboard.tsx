import PageTitle from '../components/PageTitle';
import ChatbotLists from '@/components/ChatbotLists';

const Dashboard = () => {
  return (
    <div className='max-w-full flex  items-center justify-center'>
      
      <div className="w-full max-w-4xl">
        <PageTitle title="AI Agents" buttonHide={false}/>

        <div className="flex flex-wrap gap-4 p-4">
          <ChatbotLists />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
