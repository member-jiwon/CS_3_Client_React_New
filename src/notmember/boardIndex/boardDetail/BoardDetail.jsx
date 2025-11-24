import { useState } from "react";
import styles from "./BoardDetail.module.css";
import {
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Send,
} from "lucide-react";
import Comment from "./comment/Comment";
import { UseBoardDetail } from "./UseBoardDetail";
import { EditorContent } from "@tiptap/react";


/* ✅ 더미 댓글 데이터 */
const initialComments = [
  {
    id: 1,
    nickname: "개발자1",
    date: "2025.11.17",
    text: "여기에 댓글이 들어갑니다.",
    isReply: false,
    replies: [
      {
        id: 11,
        nickname: "기획자A",
        date: "2025.11.18",
        text: "답글입니다.",
        isReply: true,
        replies: [],
      },
    ],
  },
];



// --- 메인 컴포넌트 ---
const BoardDetail = ({ handleDeleteBoard, handleEditBoard }) => {
  const {
    comments,
    setComments,
    targetBoard,
    editor,
    targetBoardFile,
    handleNavigateBack
  } = UseBoardDetail({ initialComments });



  return (
    <div className={styles.parent}>
      {/* 상단 뒤로가기 버튼 영역 */}
      <div className={styles.topBar}>
        <div className={styles.backButtonWrapper}>
          <button className={styles.backButtonText} onClick={handleNavigateBack}>뒤로가기</button>
        </div>
      </div>

      <div className={styles.mainContentWrapper}>
        {/* 게시글 내용 영역 */}
        <div className={styles.postContentArea}>
          {/* 게시글 제목 및 작성자 정보 */}
          <div className={styles.postHeader}>
            <div className={styles.postTitleWrapper}>
              <b className={styles.postTitle}>
                {targetBoard.title}
              </b>
              <MoreHorizontal size={24} color="#696b70" />
            </div>
            <div className={styles.authorNicknameWrapper}>
              <div className={styles.userNickname}>{targetBoard.nickname}</div>
            </div>
          </div>

          {/* 게시글 본문 */}
          <div className={styles.postBodyContainer}>
            <div className={styles.postBodyText}>
              {editor && <EditorContent editor={editor} />}


              {/* 영서씨 여기에 첨부파일용 박스도 하나만 만들어 주세요*/}
              {/*아래 있는 내용은 css만 손봐주세요: 맵으로 불러오는 방식임*/}

              {targetBoardFile?.length > 0 ? (
                targetBoardFile.map(file => (
                  <a
                    key={file.file_seq}
                    href={`http://192.168.0.3/file/download?sysname=${encodeURIComponent(file.sysname)}&file_type=board/file/`}
                    download
                    style={{ display: "block", marginBottom: "6px" }}
                  >
                    {file.oriname}
                  </a>
                ))
              ) : (
                <div>첨부파일 없음</div>
              )}

              <button onClick={() => handleDeleteBoard(targetBoard.board_seq)}>삭제</button>

            </div>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className={styles.commentSection}>
          <Comment comments={comments} setComments={setComments} />
        </div>
      </div>
    </div >
  );
};

export default BoardDetail;
