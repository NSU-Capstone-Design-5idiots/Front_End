import React, { useState } from "react";
import axios from "axios";
import '../css/EventPost.css';
import Button from '../component/Button';

const EventPost = ({ onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [requiredDonorLevel, setRequiredDonorLevel] = useState(1); // 등급 설정
    const [startDate, setStartDate] = useState(""); // 시작일 설정
    const [endDate, setEndDate] = useState(""); // 종료일 설정



    const handlePosting = async () => {
        try {
            const eventData = new FormData();
            eventData.append("title", title);
            eventData.append("content", content);
            if (file) {
                eventData.append("event_file", file);
            }
            const response = await axios.post("http://localhost:8080/event/upload", eventData);
            console.log("이벤트 작성 완료", response.data);
            onClose(); // 등록 후 창 닫기
        } catch (error) {
            console.error("이벤트 업로드 오류:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="EventPost">
            <div className="EventPostheader">
                <div className="EventPosting_title">
                    <input
                        className="EventPosting_titleInput"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="게시글 제목을 입력하세요"
                    />
                    <button type="button" className="Posting_closeBtn" onClick={() => onClose()}>
                        닫기
                    </button>
                </div>
            </div>
            <div className="required-donor-level">
                <label htmlFor="donor-level">이벤트 참여 등급 설정:</label>
                <input
                    type="number"
                    id="donor-level"
                    value={requiredDonorLevel}
                    onChange={(e) => setRequiredDonorLevel(parseInt(e.target.value))}
                    min="0"
                />
            </div>

            <div className="date-range">
                <label htmlFor="start-date">게시 시작일:</label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <label htmlFor="end-date">게시 종료일:</label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <div className="content">
                <textarea
                    className="Event_content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="게시글 내용을 입력하세요"
                />
            </div>

            <div className="file-upload">
                <label htmlFor="event-file">이미지 업로드:</label>
                <input
                    type="file"
                    id="event-file"
                    onChange={handleFileChange}
                />
            </div>
            <div className="eventpost-btn">
                <Button size="sm" onClick={handlePosting}>이벤트 게시</Button>
            </div>
        </div>
    );
};

export default EventPost;