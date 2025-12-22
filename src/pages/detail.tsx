import { Link } from 'react-router-dom';

const Detail = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>遷移後のページです</h2>
      <Link to="/" className='text-blue-500 underline'>
        戻る
      </Link>
    </div>
  );
};

export default Detail;