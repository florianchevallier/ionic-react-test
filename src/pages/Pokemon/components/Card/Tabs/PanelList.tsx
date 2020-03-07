/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, cloneElement } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue } from 'framer-motion';

export interface PanelList {
  activeIndex: number;
  children: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default ({
  activeIndex,
  children,
  setActiveIndex
}: PanelList) => {
  const panelRef = useRef<HTMLLIElement>(null);
  const [height, setHeight] = useState(0);
  const x = useMotionValue(0)

  useEffect(() => {
    panelRef.current && setHeight(panelRef.current.offsetHeight);
  }, [activeIndex]);

  function onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      if (activeIndex < 3) setActiveIndex(activeIndex + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    }
    x.stop()
    x.set(0);
  }

  return (
    <motion.div
      drag="x"
      onDragEnd={onDragEnd}
      dragConstraints={{
        right: activeIndex === 0 ? 0 : 300
      }}
      dragTransition={{
        min: 300,
        power: 1
      }}
      style={{
        x
      }}
    >
      <motion.ul
        className='panel-list'
        animate={{ height }}
      >
        <AnimatePresence initial={false}>
          <motion.li
            ref={panelRef}
            className='panel'
            key={activeIndex}
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.1, ease: 'easeInOut', duration: 0.2 } }}
            exit={{ opacity: 0, x: 32, transition: { ease: 'easeInOut', duration: 0.2 } }}
          >
            {cloneElement(children[activeIndex], { active: true })}
          </motion.li>
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};
