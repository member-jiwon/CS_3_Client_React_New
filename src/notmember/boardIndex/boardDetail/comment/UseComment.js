import { useState } from "react";

export function UseComment({ setComments }) {
    //-----------------------상태변수 모음
    const [inputValue, setInputValue] = useState("");


    //일반 댓글 작성 함수
    const handleSubmit = () => {
        if (!inputValue.trim()) return;

        const newComment = {
            id: Date.now(),
            nickname: "나",
            date: new Date().toISOString().slice(0, 10),
            text: inputValue,
            isReply: false,
            replies: [],
        };

        setComments(prev => [...prev, newComment]);
        setInputValue("");
    };



    return {
        inputValue,
        setInputValue,
        handleSubmit
    };
}
