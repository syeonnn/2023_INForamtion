import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

    return (
        <>
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">하나의 언어로서 "수어"</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">모든 의사소통의 첫 번째 단계, 자기 소개.<br />수어로 자기 소개하는 방법을 배움으로써 청각 장애인과 비장애인간의 거리를 좁힐 수 있습니다.<br />간단한 문장과 단어들을 조합해 연습해 봅시다.</p>
                            <a className="btn btn-primary btn-xl" href="#intro">더 알아보기</a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="page-section bg-primary" id="intro">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">간단한 인삿말과 문장을 배우고 나에게 맞는 단어를 넣어 자기소개를 완성해 보세요!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">농인 사회에서는 이름을 표현할 때 지문자를 쓰기보다 '수어 이름'을 만들어 사용합니다. 보통 외관 상에 드러나는 특징에 따라 이름을 짓는 경우가 많아 '얼굴 이름'이라고도 부릅니다. 이는 농인 사회의 대표적인 문화입니다. <br />따라서, 저희는 이름 소개를 위해 지문자를 소개하는 대신 얼굴 이름을 만들어 보길 제안하겠습니다.
                                <br /><br />Tip! 얼굴 이름은 예쁘기 보다 기억하기 좋은 특징적인 이름이 좋다고 합니다.</p>
                            <NavLink to="/learning" className="btn btn-light btn-xl">학습하러 가기</NavLink>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}