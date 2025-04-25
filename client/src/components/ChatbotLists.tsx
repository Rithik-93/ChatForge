import { useNavigate } from "react-router-dom";

const ChatbotLists = () => {
  const navigate = useNavigate();
    return (
      <div onClick={() => navigate('/dashboard/bot/a')} className="relative flex w-40 flex-col justify-between overflow-hidden rounded border bg-white shadow-sm hover:shadow-md transition cursor-pointer">
        <img
          src="https://backend.chatbase.co/storage/v1/object/public/chatbase/chatbot-placeholder.png?width=640&quality=50"
          className="h-40 w-40 border-none object-cover"
          alt="Chatbot"
        />
        <div className="flex h-14 items-center justify-center px-1">
          <h1 className="text-center text-xs font-semibold md:text-sm">Rithik</h1>
        </div>
      </div>
    );
  };
  
  export default ChatbotLists;
  