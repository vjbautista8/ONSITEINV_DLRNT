import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// components
import ScrollProgress from 'src/components/scroll-progress';
//

import { useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';
import TourListView from '../home-on-site';

// ----------------------------------------------------------------------

const StyledPolygon = styled('div')(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: theme.palette.grey[900],
  }),
}));

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();
  const { finishedGettingInventoryItems } = useSelector((store) => store.user);
  // useEffect(() => {
  //   if()
  // }, [finishedGettingInventoryItems]);
  // if (!finishedGettingInventoryItems) {
  //   return <LoadingScreen />;
  // }
  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <TourListView />
    </>
  );
}
