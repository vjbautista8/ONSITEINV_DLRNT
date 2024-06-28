import { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import TransitionsDialogLeft from 'src/sections/home/transitions-dialog-left';
import TransitionsDialogRight from 'src/sections/home/transitions-dialog-right';
import { handleChangeState } from 'src/features/user/userSlice';

export default function useCarousel(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const carouselRef = useRef(null);

  const originalIndex = props?.originalIndex ?? 1; // Use props.originalIndex or default to 1

  const [currentIndex, setCurrentIndex] = useState(props?.initialSlide || originalIndex);
  const [nav, setNav] = useState(undefined);

  const [dialogSwipe, setDialogSwipe] = useState(null);

  const rtl = theme.direction === 'rtl';
  const ltr = theme.direction === 'ltr';

  const handleSwipe = (nameParam, carData) => {
    dispatch(handleChangeState({ name: nameParam, value: true }));
    // swipeData
    dispatch(handleChangeState({ name: 'swipeData', value: carData }));
  };

  const carouselSettings = {
    arrows: false,
    dots: !!props?.customPaging,
    rtl,
    beforeChange: (current, next) => {
      console.log('Swiped to index:', next);
      // setDialogSwipe(null);
      setCurrentIndex(next);
    },
    afterChange: (current) => {
      // console.log('Swiped to index: afterChange : ', current);
      if (current === 0) {
        handleSwipe('swipeLeftState', props?.car_info);
        console.log('swipeLeftState');
        // setDialogSwipe(<TransitionsDialogLeft carData={props} />);
      }
      if (current === 2) {
        handleSwipe('swipeRightState', props?.car_info);
        console.log('swipeRightState');
        // setDialogSwipe(<TransitionsDialogRight carData={props} />);
      }

      if (current !== originalIndex) {
        setTimeout(() => {
          if (carouselRef.current) {
            console.log('Returning to original index:', originalIndex);
            carouselRef.current.slickGoTo(originalIndex);
            setCurrentIndex(originalIndex);
          }
        }, 300); // Adjust the delay as needed
      }
    },
    ...props,
    fade: !!(props?.fade && !rtl),
  };

  const onSetNav = useCallback(() => {
    if (carouselRef.current) {
      // console.log('onSetNav');
      setNav(carouselRef.current);
    }
  }, []);

  const onPrev = useCallback(() => {
    if (carouselRef.current) {
      // console.log('onPrev');
      carouselRef.current.slickPrev();
    }
  }, []);

  const onNext = useCallback(() => {
    if (carouselRef.current) {
      // console.log('onNext');
      carouselRef.current.slickNext();
    }
  }, []);

  const onTogo = useCallback((index) => {
    if (carouselRef.current) {
      console.log('onTogo to index:', index);
      carouselRef.current.slickGoTo(index);
    }
  }, []);

  // Ensure nav is set when component mounts
  useEffect(() => {
    onSetNav();
  }, [onSetNav]);

  return {
    nav,
    carouselRef,
    currentIndex,
    carouselSettings,
    onPrev,
    onNext,
    onTogo,
    onSetNav,
    setNav,
    setCurrentIndex,
    dialogSwipe, // Return dialog component to render
  };
}
