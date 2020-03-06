import React from 'react'
import capitalize from 'lodash/capitalize'
import cx from 'classnames'

interface Props {
  name: string,
  number: number,
  type1: string | null | undefined,
  type2: string | null | undefined,
  shortDescription: string | undefined
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
        <span className="number">#{number}</span>
      </div>
      <div className="subheader">
        <div className="types">
          <div className={cx("type", type1)}>{type1}</div>
          {type2 ? (
            <div className={cx("type", type1)}>{type2}</div>
          ): null}
        </div>
        <span>{shortDescription}</span>
      </div>
    </>
  )
}

export default Header
