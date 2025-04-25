import { Button } from './ui/button';

const PageTitle = ({ title, buttonHide }: { title: string, buttonHide: boolean }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <Button className={`text-white ${buttonHide ? 'hidden' : ''} font-bold py-2 px-4 rounded-md hover:cursor-pointer`}>
        New Agent
      </Button>
    </div>
  );
};

export default PageTitle;
