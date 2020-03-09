import React from 'react'
import './styles.scss';
import { motion } from 'framer-motion';

interface Props {
  value: number,
  max: number,
  color: string,
  custom?: number
}

function Progress({
  value, max, color, custom = 0
}: Props) {

  return (
    <div className="progress-bar" style={{ width: max }} >
      <motion.div
        className="inner-bar"
        style={{ backgroundColor: color}}
        initial={{
          width: 0
        }}
        animate={{
          width: value,
          transition: {
            delay: custom * 0.08
          }
        }}
      />
    </div>
  )
}

export default Progress
