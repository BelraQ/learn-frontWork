import React, {memo} from 'react';
import styled from 'styled-components';

const BorderBall = styled.div`
    width: 50px;
    height: 50px;
    display: inline-block;
    border: 1px solid;
    text-align: center;
    border-radius: 50%;
    margin-right: 10px;
    ${(color) => color};
    line-height: 50px;
`;



const Ball = memo(({number}) => {
    console.log('Ball element');
    let color;
    if (number <= 10) {
        color = 'red';
      } else if (number <= 20) {
        color = 'orange';
      } else if (number <= 30) {
        color = 'yellow';
      } else if (number <= 40) {
        color = 'blue';
      } else {
        color = 'green';
      }
    return (
        
        <BorderBall className="ball" background={color}> 
            {number}
        </BorderBall>
    );
});

export default Ball;