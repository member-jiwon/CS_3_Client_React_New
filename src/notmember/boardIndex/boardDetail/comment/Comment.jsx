import { useState } from "react";
import styles from "../BoardDetail.module.css";
import { MoreHorizontal, Send } from "lucide-react";
import { UseComment } from "./UseComment";

const Comment = ({ comments, setComments }) => {
    const {
        inputValue,
        setInputValue,
        handleSubmit
    } = UseComment({ setComments });



    return (
        <div className={styles.commentSection}>

            {/* 댓글 목록 */}
            <div className={styles.commentListWrapper}>
                <div className={styles.commentList}>
                    {/* 배열 데이터를 맵핑하여 댓글 렌더링 */}
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>

            {/* 페이지네비 영역 */}
            <div className={styles.paginationWrapper}>
                페이지네비 영역
            </div>

            {/* 댓글 입력 */}
            <div className={styles.commentInputArea}>
                <div className={styles.commentInputBox}>
                    <input
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={styles.inputElement}
                    />
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        <Send size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
};

/* =========================
   댓글 아이템 (재귀)
========================= */
const CommentItem = ({ comment }) => {

    const wrapperClass = comment.isReply
        ? styles.replyCommentWrapper
        : styles.parentCommentWrapper;

    const commentClass = comment.isReply
        ? styles.replyComment
        : styles.parentComment;

    return (
        <div className={wrapperClass}>
            <div className={commentClass}>
                <div className={styles.commentUserHeader}>
                    <div className={styles.userNicknameBold}>{comment.nickname}</div>
                    <MoreHorizontal size={20} className={styles.commentOptionIcon} />
                </div>

                <div className={styles.commentTextWrapper}>
                    <div className={styles.commentText}>{comment.text}</div>
                </div>

                <div className={styles.commentFooter}>
                    <div className={styles.commentDate}>{comment.date}</div>
                    <div className={styles.replyButton}>답글 달기</div>
                </div>
            </div>

            {comment.replies?.map(reply => (
                <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
    );
};

export default Comment;
