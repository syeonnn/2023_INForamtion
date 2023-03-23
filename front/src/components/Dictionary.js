import axios from 'axios';
import React, { useEffect, useId, useRef, useState } from 'react'

export default function Dictionary() {

    const [Words, setWords] = useState([]);
    const [userInput, setUserInput] = useState('');

    // 입력값을 가져와서 소문자로변경
    const onChangeSearch = (e) => {
         setUserInput(e.target.value)
    };
    const onSearch = (e) => {
        e.preventDefault();

        var searched = Words.filter((item) => {
            return item.mean==userInput;
        })
        var scrollId = document.getElementById(searched[0].id);
        return scrollId.scrollIntoView();
    };

useEffect(() => {
    axios.get("/api/words/getWords")
        .then((response) => {
            if (response.data.success) {
                // console.log(response.data.words);
                setWords(response.data.words);
            } else {
                alert('Failed to get Words');
            }
        })
        .catch((err) => {
            console.error(err);
        })
}, []);

const ExList = example => <li>{example}</li>;

function Card(props) {
    return (
        <div id={props.word.id} className="wordCard">
            <div className='imgBox'>
                <img src={`../../assets/img/dictionary/${props.word.imgName}`} style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
            </div>

            <div className='noteBox'>
                <div className='note1'>
                    <h4 className="mt-1 fw-bold">{props.word.mean}</h4>
                    <h5 className="text-primary mt-3 fw-bold">수형 설명</h5>
                    <p className="mt-1">{props.word.description}</p>
                </div>
                <div className='note2'>
                    <h5 className="text-primary mt-0 fw-bold"><br /><br />예시 문장</h5>
                    <div>
                        {props.word.exList.map(ExList)}
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderWord = Words.map((word, i) => {
    return (
        <Card key={word.id} word={Words[i]} i={i}></Card>
    )
})

return (
    <div className="dic-space">
        <div className="container">
            <div className="searchCard">
                <form onSubmit={e => onSearch(e)}>
                    <input className="searchInput" type="text" placeholder="검색어를 입력하세요." onChange={onChangeSearch} />
                    <button className="searchBtn" type="submit">검색</button>
                </form> 
            </div>

            {renderWord}

        </div>
        <p style={{margin:"10px 0 0 40px",fontWeight:"normal", color:"#6c757d"}}>[출처] 국립 국어원 한국 수어 사전</p>
    </div>
)
                    
}

