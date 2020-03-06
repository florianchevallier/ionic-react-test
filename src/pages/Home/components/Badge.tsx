import React from 'react';
import cx from 'classnames';

interface Props {
  name: string,
  color: string,
}

function Badge(props: Props) {
  const { name, color } = props

  return (
    <div className={cx("badge", color)} >
      <img src="/assets/images/pokeball_white.png" alt="pokeball"/>
      <span>{name}</span>
    </div>
  )
}

export default Badge
