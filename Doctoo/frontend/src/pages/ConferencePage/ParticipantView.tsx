import { useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import icons from 'src/ui/common/Icon/iconPaths';
import { Icon } from 'src/ui/common';

function ParticipantView({ participantId }: { participantId: string }) {
  const micRef = useRef<HTMLAudioElement>(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch(error => console.error('videoElem.current.play() failed', error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div
      key={participantId}
      className='bg-main h-1/2 w-max overflow-hidden border-white p-1 rounded-lg m-1 relative min-w-100'
    >
      <div className='absolute top-0 left-0 z-10 bg-main text-white p-2 rounded-lg min-w-100'>
        <p>
          {isLocal ? 'You' : displayName}{' '}
          {micOn ? (
            <Icon src={icons.mute} alt='video on' iconColor='white' height={25} width={25} />
          ) : (
            <Icon src={icons.muted} alt='video on' iconColor='white' height={25} width={25} />
          )}
        </p>
      </div>
      <div className='flex flex-col h-full w-full items-center justify-between rounded-lg overflow-hidden min-w-100'>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn ? (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={'100%'}
            width={'100%'}
            onError={err => {
              console.log(err, 'participant video error');
            }}
          />
        ) : (
          <div className='bg-black flex flex-col w-[450px] h-full justify-center items-center'>
            <Icon
              src={icons.videoStopped}
              alt='video off'
              iconColor='white'
              height={50}
              width={50}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ParticipantView;
