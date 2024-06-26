import { useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
// sections
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  // const { loginUserState } = useSelector((store) => store.user);
  // useEffect(() => {
  //   console.log('loginUserState', loginUserState);
  // }, []);
  return (
    <>
      {/* <Helmet>
        <title> Minimal: The starting point for your next project</title>
      </Helmet> */}

      <HomeView />
    </>
  );
}
