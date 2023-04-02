import React from 'react';
import styled, {keyframes} from 'styled-components';

interface SpinnerProps {
  size?: number,
  borderWidth?: number,
  color?: string,
  margin?: string,
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  border: ${props => props.borderWidth}px solid ${props => props.color};
  border-top-color: transparent;
  animation: ${spin} 1s ease-in-out infinite;
  margin: ${props => props.margin};
`;

const SpinnerWrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

function CircleSpinner(props: SpinnerProps) {
  const {size = 50, borderWidth = 4, color = '#333', margin = '0'} = props;
  return (
    <SpinnerWrapper>
      <Spinner size={size} borderWidth={borderWidth} color={color} margin={margin}/>
    </SpinnerWrapper>
  );
}

export default CircleSpinner;
