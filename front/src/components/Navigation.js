import React from 'react'
//import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Navigation() {

    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/api/video/getVideos")
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.videos);
                    setVideos(res.data.videos);

                    /*
                    const data = JSON.stringify(res.data.videos);
                    setVideos(data);
                    */
                } else {
                    alert('Failed to get Videos');
                }
            })
    }, []);

    const renderLink = Videos.map((video, index) => {
        // console.log(video); 
        // var toName = video.fileName.split(".")[0];

        return <NavLink key={index} to={`/learning/${video._id}`} className="nav-link">{video.mean}</NavLink>
    });

    return (

        <div className="sb-nav-fixed">
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark navbar-shrink" id="mainNav">
                <NavLink to="#page-top" className="navbar-brand ps-3">
                    생활 수어
                </NavLink>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">

                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item"><Link to="/login" className="nav-link">로그인</Link></li>
                            <li className="dropdown-item"><NavLink to="/register" className="nav-link">회원가입</NavLink></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="dropdown-item"><NavLink to="/my-history" className="nav-link">학습기록</NavLink></li>

                        </ul>
                    </li>
                </ul>
            </nav>


            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">

                                <Link to="/" className="nav-link">
                                    <div className="sb-nav-link-icon"><i className="fa-solid fa-house"></i></div>
                                    홈
                                </Link>


                                <Link className="nav-link collapsed" data-bs-toggle="collapse" to="#collapseLearning" aria-expanded="false" aria-controls="collapseLearning">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    학습
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </Link>

                                <div className="collapse" id="collapseLearning" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <Link className="nav-link collapsed" data-bs-toggle="collapse" to="#collapseSentence" aria-expanded="false" aria-controls="collapseSentence">
                                            인삿말
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </Link>

                                        <div className="collapse" id="collapseSentence" data-bs-parent="#sidenavAccordionPages">
                                            {renderLink}
                                        </div>

                                        {/* <div className="collapse" id="collapseSentence" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <NavLink to="/learning/hi" className="nav-link">안녕하세요</NavLink>
                                                <NavLink to="/learning/good-to-see" className="nav-link">만나서 반갑습니다</NavLink>
                                            </nav>
                                        </div>

                                        <Link className="nav-link collapsed" data-bs-toggle="collapse" to="#collapseWord" aria-expanded="false" aria-controls="collapseWord">
                                            핵심 단어
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </Link>
                                        <div className="collapse" id="collapseWord" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <NavLink to="/learning/hobby" className="nav-link">취미</NavLink>
                                                <NavLink to="/learning/like" className="nav-link">좋다</NavLink>
                                                <NavLink to="/learning/dislike" className="nav-link">싫다</NavLink>
                                            </nav>
                                        </div>

                                        <Link className="nav-link collapsed" data-bs-toggle="collapse" to="#collapseEtc" aria-expanded="false" aria-controls="collapseEtc">
                                            추가 단어
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </Link>
                                        <div className="collapse" id="collapseEtc" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <NavLink to="/learning/movie" className="nav-link">영화</NavLink>
                                                <NavLink to="/learning/watch" className="nav-link">보다</NavLink>
                                                <NavLink to="/learning/book" className="nav-link">책</NavLink>
                                                <NavLink to="/learning/read" className="nav-link">읽다</NavLink>
                                                <NavLink to="/learning/running" className="nav-link">달리기</NavLink>
                                                <NavLink to="/learning/swimming" className="nav-link">수영</NavLink>
                                            </nav>
                                        </div> */}
                                    </nav>
                                </div>

                                <Link to="/quiz" className="nav-link">
                                    <div className="sb-nav-link-icon"><i className="fa-solid fa-check"></i></div>
                                    퀴즈
                                </Link>

                            </div>
                        </div>

                        <div className="sb-sidenav-footer">
                            <div className="small">Copyright</div>
                            © 2023 INFormation
                        </div>
                    </nav>
                </div>
            </div>


        </div>


    )
}
