import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

//* onClickToggleModal과 children을 props로 받는다
const Modal2 = ({
  onClickToggleModal,
  children,
}: PropsWithChildren<ModalDefaultType>) => {
  //* 배경에 postion:fixed를 적용하고 스타일링을 한다
  return (
    <StModalContainer>
      <StDialogBox open>{children}</StDialogBox>
      <StBackdrop
        onClick={(e) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </StModalContainer>
  );
};

export default Modal2;

const StModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StDialogBox = styled.dialog`
  width: 130px;
  height: 80px;
  flex-direction: column;
  align-items: center;

  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const StBackdrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  /* z-index: 9999; */
  /* background-color: rgba(0, 0, 0, 0.2); */
`;
