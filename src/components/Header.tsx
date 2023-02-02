import { signOut } from "firebase/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { authService } from "../firebase";
import Modal from "./Modal";
import Modal2 from "./Modal2";

export const Header = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  //* isOpenModal 상태값을 토글링하는 함수
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const logOutClick = () => {
    signOut(authService)
      .then(() => {
        // alert("로그아웃");
        onClickToggleModal();
        navigate("/");
      })
      .catch((event) => {
        alert(event);
      });
  };

  const openModal = () => {
    if (authService.currentUser) {
      navigate("/");
    }
    if (!authService.currentUser) {
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={goToMain}>내가 과거에 태어났다면?</HeaderTitle>
      {authService.currentUser ? (
        <LogoutButton onClick={logOutClick}>로그아웃</LogoutButton>
      ) : (
        <LoginButton onClick={openModal}>로그인</LoginButton>
      )}
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}

      {isOpenModal && (
        <Modal2 onClickToggleModal={onClickToggleModal}>
          <StModalBox>로그아웃 성공</StModalBox>
        </Modal2>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    font-size: 1.3rem;
  }
  cursor: pointer;
`;

const LoginButton = styled.button`
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: transparent;
  padding: 1rem;
  &:hover {
    font-size: 1.3rem;
  }
  cursor: pointer;
`;

const LogoutButton = styled.button`
  border: none;
  font-size: 1.2em;
  font-weight: bold;
  background-color: transparent;
  padding: 1rem;
  &:hover {
    font-size: 1.3rem;
  }
  cursor: pointer;
`;

const StModalBox = styled.div`
  text-align: center;
`;
