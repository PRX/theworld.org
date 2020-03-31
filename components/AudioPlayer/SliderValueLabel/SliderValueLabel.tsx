/**
 * @file SliderValueLabel.tsx
 * Component for audio player slider value labels.
 * See https://material-ui.com/components/slider/#customized-sliders
 */

import React, { cloneElement } from 'react';
import { ValueLabelProps } from '@material-ui/core';
import classNames from 'classnames/bind';
import { sliderValueLabelStyles } from './SliderValueLabel.styles';

export interface ISliderValueLabelProps extends ValueLabelProps {
  valueLabelDisplay?: 'on' | 'auto' | 'off';
}

export const SliderValueLabel = ({
  children,
  className,
  open,
  value,
  valueLabelDisplay
}: ISliderValueLabelProps) => {
  const classes = sliderValueLabelStyles({ value });
  const cx = classNames.bind(classes);

  return cloneElement(
    children,
    {
      className: cx(children.props.className, classes.thumb, {
        open: open || valueLabelDisplay === 'on'
      })
    },
    <span className={cx(className, classes.offset)}>
      <span className={classes.circle}>
        <span className={classes.label}>{value}</span>
      </span>
    </span>
  );
};
