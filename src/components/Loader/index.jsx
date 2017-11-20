import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

export default function DotScale({
  color,
  duration,
  size,
  dotSize,
}) {
  const dots = keyframes`
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  `;

  const Spinner = styled.div`
    position: relative;
    width: ${props => (props.size ? props.size : '30px')};
    text-align: center;
  `;

  const DefaultDot = styled.div`
    width: ${props => (props.dotSize ? props.dotSize : '10px')};
    height: ${props => (props.dotSize ? props.dotSize : '10px')};
    border-radius: 100%;
    display: inline-block;
    background-color: ${props => (props.color ? props.color : '#333')};
    animation: ${dots} 1.4s infinite ease-in-out both;
    animation-duration: ${props => (props.duration ? props.duration : '1.4s')};
  `;

  const Dot1 = DefaultDot.extend`animation-delay: -0.32s;`;

  const Dot2 = DefaultDot.extend`animation-delay: -0.16s;`;

  return (
    <Spinner size={size}>
      <Dot1 color={color} duration={duration} dotSize={dotSize} />
      <Dot2 color={color} duration={duration} dotSize={dotSize} />
    </Spinner>
  );
}

DotScale.propTypes = {
  color: PropTypes.string,
  duration: PropTypes.string,
  size: PropTypes.string,
  dotSize: PropTypes.string,
};

DotScale.defaultProps = {
  color: '#333',
  duration: '1.4s',
  size: '30px',
  dotSize: '10px',
};
