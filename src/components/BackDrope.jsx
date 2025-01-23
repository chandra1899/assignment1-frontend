import React from 'react'
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
import { updateOn } from '../store/atoms/updateOn';

const Overlay = styled.div`
  background-color: rgba(31, 41, 55, 0.7); /* bg-gray-900 with opacity */
  height: 110vh;
  width: 110vw;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const BackDrope = () => {
    const updateon = useRecoilValue(updateOn)
  return (
    <>
      {updateon && <Overlay />}
    </>
  );
};

export default BackDrope;