import React from 'react';

interface ChatSidePanelProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const ChatSidePanel: React.FC<ChatSidePanelProps> = ({ isOpen, children }) => {
  return isOpen ? (
    <div className='bg-grey-9 flex flex-col h-full w-full justify-between items-center max-w-xl pt-16 p-2'>
      <div className='flex flex-wrap gap-4 h-full w-full justify-center items-center overflow-y-scroll'>
        {children}
      </div>
    </div>
  ) : null;
};

export default ChatSidePanel;
