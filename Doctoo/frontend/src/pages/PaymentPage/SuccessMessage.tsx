import { Link } from 'react-router-dom';

export function SuccessMessage() {
  return (
    <>
      <p className='mb-4 text-2xl font-medium leading-9'>Success!</p>
      <p className='mb-4 mb-8 text-base leading-6 text-black-2'>
        Your appointment have been successfully paid
      </p>
      <Link
        to='/dashboard'
        className='px-6 py-2 text-base leading-6 text-white transition rounded-lg bg-main hover:bg-main-dark active:bg-main-dark '
      >
        Go to Dashboard
      </Link>
    </>
  );
}
