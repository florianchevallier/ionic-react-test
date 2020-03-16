import React from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router';

interface Props {
  name: string,
  color: string,
  to: string
}

function Badge(props: Props) {
  const { name, color, to } = props
  const history = useHistory();

  return (
    <div className={cx("badge", color)} onClick={() => history.push(to)} >
      <img src="/assets/images/pokeball_white.png" alt="pokeball" />
      <span>{name}</span>
    </div>
  )
}

export default Badge
