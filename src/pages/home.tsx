import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/detail">
        <h1 className='text-3xl font-bold underline cursor-pointer hover:text-blue-500'>
          Hello World
        </h1>
      </Link>
      <p>↑ クリックすると遷移します</p>
    </div>
  );
};

export default Home;