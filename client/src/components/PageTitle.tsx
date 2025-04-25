import { Button } from './ui/button';

const PageTitle = ({ title, buttonHide, children, variant }: { title: string, buttonHide: boolean, children: string, variant: string }) => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <Button variant={variant} className={`text-${variant === 'default' ? 'white' : 'black'} ${buttonHide ? 'hidden' : ''} font-semibold py-2 px-4 rounded-md hover:cursor-pointer`}>
        {children}
      </Button>
    </div>
  );
};

export default PageTitle;
