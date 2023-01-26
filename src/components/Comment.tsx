import React, { useState, useRef } from "react";
import { CommentType } from "./CommentsList";
import { useMutation } from "react-query";
import { editComment, EditParameterType } from "../api";
import editImg from "../assets/images/edit.png";
import deleteImg from "../assets/images/delete.png";
import styled from "styled-components";
import { authService } from "../firebase";
import ConfirmModal from "./ConfirmModal";
import AlertModal from "./AlertModal";

const Comment = ({ item }: { item: CommentType }) => {
  // 댓글 수정 인풋창 관리 state
  const [openInput, setOpenInput] = useState(false);
  // 수정, 변경할 내용을 담는 state
  const [inputEditComment, setInputEditComment] = useState("");
  // confirm 또는 alert 창을 열고 닫는 state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  // 수정 또는 삭제 confirm 모달에서 텍스트를 다르게 보여줄 용도로 사용할 state
  const [deleteCommentState, setDeleteCommentState] = useState(false);
  const [editCommentState, setEditCommentState] = useState(false);
  const editCommentRef = useRef<HTMLInputElement | null>(null);

  const { isLoading: isLoadingEdit, mutate: reviseComment } = useMutation(
    ["editComment", item.id],
    (body: EditParameterType) => editComment(body),
    {
      onSuccess: () => {
        console.log("수정성공");
      },
      onError: (err) => {
        console.log("err in edit:", err);
      },
    }
  );

  const onChangeEditComment = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setInputEditComment(value);
  };

  const openDeleteConfirmModal = () => {
    setDeleteCommentState(!deleteCommentState);
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  // Comment 수정 인풋창, 확인 버튼 활성화
  const openInputClick = () => {
    setOpenInput(!openInput);
    // const answer = window.confirm("수정하시겠습니까?");
    // if (answer) {
    //   setOpenInput(!openInput);
    // }
    // editCommentRef.current?.focus();
  };

  // Comment edit
  const onEditComment = async () => {
    if (inputEditComment === "") {
      // alert("수정할 내용이 없습니다.");
      setIsAlertModalOpen(!isAlertModalOpen);
      setOpenInput(!openInput);
      return;
    }

    let editObj = {};

    Object.assign(editObj, { comment: inputEditComment });

    try {
      await reviseComment({ commentId: item.id, editObj });
      setInputEditComment("");
      setOpenInput(!openInput);
      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.log("에러입니다.", error);
    }
  };

  return (
    <CommentContainer key={item.id}>
      <UserIdContianer>
        <p>{item.userId ? item.userId : "익명사용자"}</p>

        <ImgStyled src={deleteImg} onClick={openDeleteConfirmModal} />

        {/* 처음에 수정 이미지를 클릭하면 openInput의 불린 값을 변경하여 comment가 있던 자리에 input창이 생성되고, 이미지의 onClick에 onEditComment 함수를 실행하도록 바꿔준다. */}
        {openInput ? (
          <ImgStyled src={editImg} onClick={onEditComment} />
        ) : (
          <ImgStyled src={editImg} onClick={openInputClick} />
        )}
      </UserIdContianer>

      {openInput ? (
        <input
          onChange={onChangeEditComment}
          defaultValue="야호"
          value={inputEditComment}
          // placeholder={item.comment}
          ref={editCommentRef}
        />
      ) : (
        <span>{item.comment}</span>
        /* <div>{new Date(item.creatAt).toLocaleDateString("kr")}</div> */
      )}
      {/* Confirm에 관련된 모달 */}
      {isConfirmModalOpen ? (
        <ConfirmModal
          deleteCommentState={deleteCommentState}
          editCommentState={editCommentState}
          isConfirmModalOpen={isConfirmModalOpen}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          setDeleteCommentState={setDeleteCommentState}
          setEditCommentState={setEditCommentState}
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
          item={item}
        />
      ) : null}
      {isAlertModalOpen ? (
        <AlertModal
          isAlertModalOpen={isAlertModalOpen}
          setIsAlertModalOpen={setIsAlertModalOpen}
        />
      ) : null}
    </CommentContainer>
  );
};

export default Comment;

const ImgStyled = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  margin-bottom: 1rem;
`;

const UserIdContianer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;
