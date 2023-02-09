import React from 'react'
//import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { NavLink, Link } from 'react-router-dom';

export default function Navigation() {
    return (

        <div className="sb-nav-fixed sb-sidenav-toggled"> 
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark navbar-shrink" id="mainNav">
                <a className="navbar-brand ps-3" href="#page-top">생활 수어</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item active"><NavLink to="/" className="nav-link">홈</NavLink></li>
                        <li className="nav-item"><NavLink to="/learning" className="nav-link">학습</NavLink></li>
                        <li className="nav-item"><NavLink to="/quiz" className="nav-link">퀴즈</NavLink></li>
                    </ul>
                </div>

                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item"><NavLink to="/login" className="nav-link">로그인</NavLink></li>
                            <li className="dropdown-item"><NavLink to="/logout" className="nav-link">로그아웃</NavLink></li>
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
                                <a className="nav-link collapsed" data-bs-toggle="collapse" href="#collapseSentence" aria-expanded="false" aria-controls="collapseSentence">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    인삿말
                                    <div className="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseSentence" data-bs-parent="#sidenavAccordion">                                    <nav class="sb-sidenav-menu-nested nav">
                                    <Link to="/learning/hi" className="nav-link">안녕하세요</Link>
                                    <Link to="/learning/good-to-see" className="nav-link">만나서 반갑습니다</Link>
                                </nav>
                                </div>


                                <a className="nav-link collapsed" data-bs-toggle="collapse" href="#collapseIntroduce" aria-expanded="false" aria-controls="collapseIntroduce">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    자기소개
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseIntroduce" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <a className="nav-link collapsed" data-bs-toggle="collapse" href="#introduceCollapseWord" aria-expanded="false" aria-controls="introduceCollapseWord">
                                            핵심 단어
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </a>
                                        <div className="collapse" id="introduceCollapseWord" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="login.html">취미</a>
                                                <a className="nav-link" href="register.html">좋다</a>
                                                <a className="nav-link" href="password.html">싫다</a>
                                            </nav>
                                        </div>
                                        <a className="nav-link collapsed" data-bs-toggle="collapse" href="#introduceCollapseEct" aria-expanded="false" aria-controls="pagesCollapseError">
                                            기타
                                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                        </a>
                                        <div className="collapse" id="introduceCollapseEct" data-bs-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="401.html">영화</a>
                                                <a className="nav-link" href="404.html">보다</a>
                                                <a className="nav-link" href="500.html">책</a>
                                                <a className="nav-link" href="500.html">읽다</a>
                                                <a className="nav-link" href="500.html">달리기</a>
                                                <a className="nav-link" href="500.html">수영</a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>

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