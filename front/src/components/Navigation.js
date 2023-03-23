import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Navigation() {

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [Videos, setVideos] = useState([]);

    const logoutHandler = () => {
        axios.get("/api/users/logout")
            .then(response => {
                if (response.data.success) {
                    alert("로그아웃에 성공했습니다.");
                    navigate("/login");
                } else {
                    alert("Log Out Failed.");
                }
            })
            .catch(err => {
                console.error(err);
            })
    };

    useEffect(() => {
        axios.get("http://localhost:4000/api/video/getVideos")
            .then((response) => {
                if (response.data.success) {
                    setVideos(response.data.videos);
                } else {
                    alert('Failed to get Videos');
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    const renderWordLink = Videos.map((video, index) => {
        const fileName = video.id;
        
        return (
        <nav className="sb-sidenav-menu-nested nav" id="sideNavVideo">
           <NavLink key={index} to={`/learning/${fileName}`} className="nav-link">{video.mean}</NavLink>
        </nav>
        )
    
    });

    // 간혹 user.userData가 없어서 nav bar에 로그아웃만 뜨는 경우 있음
    if (user.userData) {
        console.log("nav bar: user 데이터 존재 O");
    } else {
        console.log("nav bar: user 데이터 존재 X");
    }

    return (
        <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark navbar-shrink" id="mainNav">
            <NavLink to="/" className="navbar-brand ps-3">
                생활 수어
            </NavLink>

            <ul className="navbar-nav me-lg-4">

                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                    { user.userData && !user.userData?.isAuth ? (
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item"><Link to="/login" className="nav-link">로그인</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="dropdown-item"><NavLink to="/register" className="nav-link">회원가입</NavLink></li>
                            

                        </ul>
                    ) : (
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item"><Link to="/my-page" className="nav-link">마이페이지</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li className="dropdown-item"><Link to={()=> false} className="nav-link" onClick={logoutHandler}>로그아웃</Link></li>
                        </ul>
                    )}
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
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-pencil"></i></div>
                                학습
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>

                            <div className="collapse" id="collapseLearning" data-bs-parent="#sidenavAccordion">
                                {renderWordLink}
                            </div>

                            
                            <Link to="/dictionary" className="nav-link">
                                <div className="sb-nav-link-icon"><i className="fa-solid fa-book-open"></i></div>
                                사전
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
