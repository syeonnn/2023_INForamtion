import React, { useEffect, useRef, useState } from 'react'
import data from './data.js'
import { Link } from 'react-scroll';


export default function Dictionary() {

    //서버에서 받아온 단어 정보 저장하는 변수
    const [words, setWords] = useState(data);

    //video정보 불러오듯 '단어 뜻, 수형 그림, 수형설명글, 예시문장' 불러오는 코드

    //해당 부분으로 스크롤 자동 이동하는 hook
    function useMoveScroll() {
        const element = useRef(null);
        const onMoveToElement = () => {
            element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        return { element, onMoveToElement };
    }

    //유사배열로 저장
    // const wordslist = {
    //     0: useMoveScroll(words[0]),
    //     1: useMoveScroll(words[1]),
    //     2: useMoveScroll(words[2]),
    //     3: useMoveScroll(words[3]),
    //     4: useMoveScroll(words[4]),
    //     5: useMoveScroll(words[5]),
    // };


    // 검색 입력받아 저장
    const [userInput, setUserInput] = useState('');
    let searched;
    // 입력값을 가져와서 소문자로변경
    const onChangeSearch = (e) => {
        setUserInput(e.target.value.toLowerCase())
    };
    // 데이터 목록중, name에 사용자 입력값이 있는 데이터만 불러오기
    // 사용자 입력값을 소문자로 변경해주었기 때문에 데이터도 소문자로
    const onSearch = (e) => {
        e.preventDefault();

        const searched = words.filter((item) => {
            return item.mean?.includes(userInput)
            //<Link to={item.mean} spy={true} smooth={true}></Link>
            //item.mean.
        });

    }
    

    return (
        <div className="dic-space">
            <div className="container">
                <div className="searchCard">

                    <form onSubmit={e => onSearch(e)}>
                        <input className="searchInput" type="text" placeholder="검색어를 입력하세요." onChange={onChangeSearch} />
                        <button className="searchBtn" type="submit">검색</button>
                    </form>


{/* {
        Array.from(wordslist).map((w, i) => {
            <div onClick={w.onMoveToElement}>{w.mean}</div>
        });
    } */}
                </div>

                {
                    words.map((a, i) => {
                        return (
                            <Card key={a.id} word={words[i]} i={i}></Card>

                            // <div className="wordCard" id={i} >
                            //     <div className='imgBox'>
                            //          <img src={'../../assets/img/dictionary/word' + (i + 1) + '.jpg'} style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
                            //      </div>

                            //      <div className='noteBox'>
                            //          <div className='note1'>
                            //              <h4 className="mt-1 fw-bold">{a.mean}</h4>
                            //              <h5 className="text-primary mt-3 fw-bold">수형 설명</h5>
                            //              <p className="mt-1">{a.description}</p>
                            //          </div>
                            //          <div className='note2'>
                            //              <h5 className="text-primary mt-0 fw-bold"><br /><br />예시 문장 </h5>
                            //              <p className="mt-1">• {a.example1}<br />• {a.example2}</p>
                            //          </div>
                            //      </div>

                            //  </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className="wordCard" id={props.word.mean}>
            <div className='imgBox'>
                <img src={'../../assets/img/dictionary/word' + (props.i + 1) + '.jpg'} style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
            </div>

            <div className='noteBox'>
                <div className='note1'>
                    <h4 className="mt-1 fw-bold">{props.word.mean}</h4>
                    <h5 className="text-primary mt-3 fw-bold">수형 설명</h5>
                    <p className="mt-1">{props.word.description}</p>
                </div>
                <div className='note2'>
                    <h5 className="text-primary mt-0 fw-bold"><br /><br />예시 문장 </h5>
                    <p className="mt-1">• {props.word.example1}<br />• {props.word.example2}</p>
                </div>
            </div>
        </div>
    )
}

