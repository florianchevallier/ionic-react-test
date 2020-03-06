import React from 'react';
import cx from 'classnames';
import { IonItem } from '@ionic/react';

interface Props {
  name: string,
  color: string,
  to: string
}

function Badge(props: Props) {
  const { name, color, to } = props

  return (
    <IonItem routerLink={to}>
      <div className={cx("badge", color)} >
        <img src="/assets/images/pokeball_white.png" alt="pokeball"/>
        <span>{name}</span>
      </div>
    </IonItem>
  )
}

export default Badge
