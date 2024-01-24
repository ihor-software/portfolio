import { useMeeting } from '@videosdk.live/react-sdk';
import { Icon } from 'src/ui/common/Icon/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { useAppSelector } from 'src/hooks/redux';

export type CallControlButtonProps = {
  icon: string;
  alt: string;
  color?: string;
  action: () => void;
};

function CallControlButton({ icon, alt, action, color = 'white' }: CallControlButtonProps) {
  return (
    <button onClick={action} className='flex flex-col items-center gap-1 w-16 h-14 justify-between'>
      <Icon src={icon} alt={alt} iconColor={color} height={25} width={25} />
      <p className='whitespace-nowrap'>{alt}</p>
    </button>
  );
}

export type ControlsProps = {
  toggleChat: () => void;
  toggleNotes: () => void;
};

function Controls({ toggleChat, toggleNotes }: ControlsProps) {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const { localWebcamOn, localMicOn } = useMeeting();

  const user = useAppSelector(state => state.auth.currentUser);

  const mediaControls = [
    {
      icon: localMicOn ? icons.mute : icons.muted,
      alt: localMicOn ? 'Mute' : 'Unmute',
      action: () => toggleMic(),
    },
    {
      icon: localWebcamOn ? icons.video : icons.videoStopped,
      alt: localWebcamOn ? 'Stop video' : 'Start video',
      action: () => toggleWebcam(),
    },
  ];

  const otherControls = [
    {
      icon: icons.chats,
      alt: 'Chat',
      action: () => {
        toggleChat();
      },
    },
    {
      icon: icons.shareScreen,
      alt: 'Share Screen',
      action: () => {},
    },
    {
      icon: icons.record,
      alt: 'Record',
      action: () => {},
    },
    {
      icon: icons.subtitles,
      alt: 'Subtitles',
      action: () => {},
    },
  ];

  const otherDoctorControls = [
    ...otherControls,
    {
      icon: icons.board,
      alt: 'Quick notes',
      action: () => {
        toggleNotes();
      },
    },
  ];

  return (
    <div className='bg-black-1 h-17 w-full overflow-hidden flex justify-between p-5 text-white gap-4'>
      <div className='flex justify-center gap-10'>
        {mediaControls.map(({ icon, alt, action }) => (
          <CallControlButton icon={icon} alt={alt} action={action} key={alt} />
        ))}
      </div>
      <div className='flex gap-10 h-full justify-center gap-10'>
        {user && user.role_cd === 'doctor'
          ? otherDoctorControls.map(({ icon, alt, action }) => (
              <CallControlButton icon={icon} alt={alt} action={action} key={alt} />
            ))
          : otherControls.map(({ icon, alt, action }) => (
              <CallControlButton icon={icon} alt={alt} action={action} key={alt} />
            ))}
      </div>
      <div>
        <button
          onClick={leave}
          className='flex flex-row items-center h-14 justify-around bg-red rounded-lg p-2'
        >
          <Icon src={icons.leaveCall} alt='leave call' iconColor='white' height={25} width={25} />
          <p>Leave</p>
        </button>
      </div>
    </div>
  );
}

export default Controls;
