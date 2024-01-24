interface AvatarProps {
  src: string;
  className?: string;
  onError: (...args: any[]) => any;
}

export function Avatar({ src, className, onError }: AvatarProps) {
  return (
    <div className='w-[92px] h-[92px] aspect-square overflow-hidden bg-bg rounded-lg flex items-center justify-center '>
      <img
        className={`${
          src !== process.env.REACT_APP_USER_DEFAULT_AVATAR
            ? 'h-full w-full select-none object-cover'
            : 'select-none'
        } ${className}`}
        onError={onError}
        src={src}
      />
    </div>
  );
}
