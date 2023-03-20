import React, { useEffect, useState } from 'react'
import data from './data.js'

export default function Dictionary() {


    const [words, setWords] = useState(data);

    //video정보 불러오듯 '단어 뜻, 수형 그림, 수형설명글, 예시문장' 불러오는 코드


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
            return item.engMean?.includes(userInput)

        
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

                    
                    {searched && searched.map((item) => (
                        <Card key={item.engMean} {...item} />
                    ))}
                </div>

                {
                    words.map((a, i) => {
                        return (
                            <Card key={a.id} word={words[i]} i={i}></Card>

                            // <div className="wordCard">
                            //     <div className='imgBox'>
                            //         <img src={'../../assets/img/dictionary/word' + (i + 1) + '.jpg'} style={{ width: "100%", height: "100%", objectFit: "cover" }}></img>
                            //     </div>

                            //     <div className='noteBox'>
                            //         <div className='note1'>
                            //             <h4 className="mt-1 fw-bold">{a.mean}</h4>
                            //             <h5 className="text-primary mt-3 fw-bold">수형 설명</h5>
                            //             <p className="mt-1">{a.description}</p>
                            //         </div>
                            //         <div className='note2'>
                            //             <h5 className="text-primary mt-0 fw-bold"><br /><br />예시 문장 </h5>
                            //             <p className="mt-1">• {a.example1}<br />• {a.example2}</p>
                            //         </div>
                            //     </div>

                            // </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

function Card(props) {
    return (
        <div className="wordCard">
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