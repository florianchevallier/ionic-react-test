import React from 'react'
import capitalize from 'lodash/capitalize'
import cx from 'classnames'

interface Props {
  name: string,
  number: number,
  type1: string | undefined,
  type2: string | undefined,
  shortDescription: string | undefined
}

function getAbsoluteNumber(number: number)
: string
{
  if (number < 10) return '#00'+number;
  if (number < 100) return '#0'+number;
  return `#${number}`
}

function Header({
  name,
  number,
  type1,
  type2,
  shortDescription,
}: Props) {

  return (
    <>
      <div className="header">
        <h3>{capitalize(name)}</h3>
        <span className="number">{getAbsoluteNumber(number)}</span>
      </div>
      <div className="subheader">
        <div className="types">
          <div className={cx("type", type1)}>{capitalize(type1)}</div>
          {type2 ? (
            <div className={cx("type", type1)}>{capitalize(type2)}</div>
          ): null}
        </div>
        <span className="short-description">{shortDescription}</span>
      </div>
    </>
  )
}

export default Header
