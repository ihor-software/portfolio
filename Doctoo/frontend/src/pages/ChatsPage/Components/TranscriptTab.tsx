import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transcriptApi } from 'src/store/services/api/transciptAPI';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { Button, Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import { getUser } from 'src/store/slices/auth';

type TranscriptItemProps = {
  id: string;
  name: string;
  language: string;
  setCurrentFile: (args?: any) => void;
};

const TranscriptTab: FC = () => {
  const allowedTypes = ['video/mp4', 'audio/mp3'];

  const dispatch = useDispatch();
  const userId = useSelector(getUser)?.id;

  const [transcript, setTranscript] = useState<any>(null);
  const [currentFile, setCurrentFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageText, setMessageText] = useState(
    'Your file is being prepared. It may take a few seconds...',
  );
  const [availableTranscript, setAvailableTranscript] = useState<any[]>([]);

  const getAudio = async (file?: File) => {
    if (!file || !userId) return;

    setIsLoading(true);
    if (!allowedTypes.find(el => el === file.type)) {
      dispatch(setMessage({ message: 'Allowed file types are: MP3, MP4 only', status: 'error' }));
      return;
    } else if (file.size > 100000000) {
      dispatch(setMessage({ message: 'Allowed file size is 100mb max', status: 'error' }));
      return;
    }
    try {
      const { data } = await transcriptApi.submitMedia(file.name, file, userId);
      setCurrentFile(data.id);
      await getUserTranscripts();
    } catch (error: any) {
      dispatch(
        setMessage({
          message: error.message || 'There is some error occurred, try again later',
          status: 'error',
        }),
      );
    }

    setIsLoading(false);
  };

  const handleRefresh = async () => {
    if (!currentFile) return;
    setIsLoading(true);
    const { data } = await transcriptApi.getMediaById(currentFile);

    if (data?.status === 'completed') {
      const { data } = await transcriptApi.getTranscript(currentFile);
      setTranscript(data.split('\n'));
    } else {
      setMessageText(`Your file status - ${data.status}`);
    }
    setIsLoading(false);
  };

  const getUserTranscripts = async () => {
    if (!userId) return;
    const { data } = await transcriptApi.userMedia(userId);

    setAvailableTranscript(data.media);
  };

  useEffect(() => {
    getUserTranscripts();

    return () => setAvailableTranscript([]);
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [currentFile]);

  const transcriptList = availableTranscript?.map((el: any, index) => (
    <TranscriptItem
      id={el.id}
      language={el.language}
      name={el.name}
      setCurrentFile={() => setCurrentFile(el.id)}
      key={index}
    />
  ));

  const transcriptText = transcript?.map((el: string, index: number) => {
    if (!el) return;
    const authorAndText = el.split(']');

    return (
      <Message
        key={index}
        message_text={authorAndText[1] || authorAndText[0]}
        sender={authorAndText[1] && `${authorAndText[0]}]`}
      />
    );
  });

  return (
    <div className='rounded-xl w-[81vw] h-[92vh] p-5 bg-white flex gap-2 box-content my-2 mx-auto'>
      <div className='w-1/4 h-fit py-5 px-2'>
        <h3 className='text-lg my-5 flex gap-1 items-center text-main-dark font-semibold'>
          <Icon src={icons.file} alt='list' />
          Your transcripts list:
        </h3>
        <div className='h-[80%] bg-white rounded-bl-lg mt-8'>
          <div className='border-b border-grey-9'>
            {transcriptList.length
              ? transcriptList
              : [
                  <TranscriptItem
                    key={0}
                    name='Upload your first script'
                    id=''
                    language=''
                    setCurrentFile={() => {}}
                  />,
                ]}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-3/4 justify-center gap-4'>
        <div className='overflow-y-auto w-full bg-bg h-[85vh] mb-3'>
          {transcript ? (
            transcriptText
          ) : (
            <div>
              {currentFile ? (
                <div>
                  <div className='animate-pulse'>
                    <Message
                      message_text={messageText}
                      timestamp={new Date().toLocaleTimeString()}
                    />
                  </div>
                </div>
              ) : (
                <Message
                  timestamp={new Date().toLocaleTimeString()}
                  message_text='Upload your video/audio file to get transcription from it!'
                />
              )}
            </div>
          )}
        </div>
        <div className='flex gap-4 w-full justify-center'>
          <div className='flex gap-3 border border-main-1 rounded-md p-2 w-fit bg-main-1 text-white hover:bg-main-dark self-center'>
            <Icon src={icons.attach} alt='file' iconColor='white' />
            <label htmlFor='file'>
              Upload file
              <input
                className='hidden'
                id='file'
                type='file'
                onChange={e => e?.currentTarget?.files && getAudio(e?.currentTarget?.files[0])}
              />
            </label>
          </div>
          {!transcript && currentFile && (
            <Button
              disabled={isLoading}
              onClick={handleRefresh}
              variant='secondary'
              additionalStyle='m-5'
            >
              Refresh
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptTab;

const TranscriptItem: FC<TranscriptItemProps> = ({ language, name, setCurrentFile }) => {
  return (
    <div
      onClick={setCurrentFile}
      className='flex flex-col hover:bg-grey-9 p-3 rounded-md cursor-pointer'
    >
      <p className='text-main-dark font-semibold'>{name.split('.mp')[0]}</p>
      {language && <p className='text-sm  text-grey-1'>Language: {language}</p>}
    </div>
  );
};

interface MessageProps {
  id?: number;
  message_text?: string;
  timestamp?: string;
  sender?: string;
}

const Message: FC<MessageProps> = ({ message_text, timestamp, sender }) => {
  return (
    <div className='flex flex-col m-5'>
      <p className='text-lg text-grey-7'>{sender}</p>
      <div className='flex flex-col bg-main text-white p-5 rounded-md w-3/4'>{message_text}</div>
      <div className='m-2 text-xs text-grey-2'>{timestamp}</div>
    </div>
  );
};
