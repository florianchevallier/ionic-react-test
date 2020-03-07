import React from 'react';
import { useTabState } from "@bumaga/tabs";
import cx from 'classnames';

interface Props {
  children: string | JSX.Element[] | JSX.Element
}

export default ({
  children
}: Props) => {
  const { isActive, onClick } = useTabState();

  function onTabClick(event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
    event.stopPropagation();
    event.preventDefault();
    onClick(event);
  }
  return (
    <h3 className={cx('tab', isActive && 'active')} onClick={onTabClick}>
      {children}
    </h3>
  );
};
