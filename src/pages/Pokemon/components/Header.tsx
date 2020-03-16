import React, { useState, useEffect } from 'react'
import capitalize from 'lodash/capitalize'
import cx from 'classnames'
import { motion } from 'framer-motion';

interface Props {
  name: string,
  number: number,
  type1?: string,
  type2?: string,
  shortDescription?: string,
  isCardOpen: boolean
}

function getAbsoluteNumber(number: number)
  : string {
  if (number < 10) return '#00' + number;
  if (number < 100) return '#0' + number;
  return `#${number}`
}

function Header({
  name,
  number,
  type1,
  type2,
  shortDescription,
  isCardOpen
}: Props) {

  return (
    <>
      <div
        className="header"
      >
        <motion.h3
          id="title"
          initial={false}
          animate={{
            x: isCardOpen ? '100%' : 0,
            y: isCardOpen ? -60 : 0,
          }}
          transition={{ type: "tween", duration: .3 }}
        >{capitalize(name)}
        </motion.h3>
        <span className="number">{getAbsoluteNumber(number)}</span>
      </div>
      <div className="subheader">
        <div className="types">
          <div className={cx("type", type1)}>{capitalize(type1)}</div>
          {type2 ? (
            <div className={cx("type", type1)}>{capitalize(type2)}</div>
          ) : null}
        </div>
        <span className="short-description">{shortDescription}</span>
      </div>
    </>
  )
}

export default Header
