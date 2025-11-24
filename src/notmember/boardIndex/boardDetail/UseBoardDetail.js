import { useEditor } from "@tiptap/react";
import { caxios } from "config/config";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Blockquote from "@tiptap/extension-blockquote"
import CodeBlock from "@tiptap/extension-code-block"

//json 파싱용
export const extensions = [
    StarterKit.configure({
        codeBlock: false,
        blockquote: false,
    }),

    CodeBlock,
    Blockquote,

    TaskList,
    TaskItem.configure({
        nested: true,
    }),

    Image.configure({
        inline: false,
        allowBase64: true,
    }),

    Highlight,
    Subscript,
    Superscript,
    Typography,

    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
]

export function UseBoardDetail({ initialComments }) {
    //-----------------------상태변수 모음
    //댓글
    const [comments, setComments] = useState(initialComments);
    //게시글 정보
    const [targetBoard, setTargetBoard] = useState({});
    //첨부파일 정보
    const [targetBoardFile, setTargetBoardFile] = useState({});
    //url
    const [searchParams] = useSearchParams();
    const seq = searchParams.get("seq");
    //에디터 파싱 옵션
    const editor = useEditor({
        extensions,
        content: "",
        editable: false
    });

    const navigate = useNavigate();


    //-----------------------버튼 모음
    const handleNavigateBack = () => { //뒤로가기
        navigate(-1);
    }

    //수정, 삭제 버튼 index에서 생성후 list와 detail로 props전달함 : seq번호만 전달하면 됨








    //게시글 정보 가져오기
    useEffect(() => {
        if (!seq) return;

        caxios.get("/board/detail", {
            params: { seq }
        }).then(resp => {

            setTargetBoardFile(resp.data.files);
            setTargetBoard(resp.data.boards);

            console.log(resp.data.files)
            console.log("targetBoardFile :", targetBoardFile);
            console.log("타입 :", typeof targetBoardFile);
        });
    }, [seq]);
    //에디터 내용 복원(json 파싱)
    useEffect(() => {
        if (!editor || !targetBoard?.content) return;

        try {
            const parsed = JSON.parse(targetBoard.content);
            editor.commands.setContent(parsed);
        } catch (e) {
            console.error("에디터 복원 실패", e);
        }
    }, [editor, targetBoard]);

    return {
        comments,
        setComments,
        targetBoard,
        editor,
        targetBoardFile,
        handleNavigateBack
    };
}
