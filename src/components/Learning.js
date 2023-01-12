import React from 'react'
import { Link } from 'react-router-dom'

export default function Learning() {
  return (
    <header className="learningspace">

      <div id="layoutSidenav">


        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div>
                  <div className="sb-sidenav-menu-heading">핵심 문장</div>
                  <div className="nav__toggle"><i className="fa-solid fa-up-right-from-square"></i></div>
                </div>
                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                  인사
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                </div>
                <div className="collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to="/learning/hi" className="nav-link">안녕하세요</Link>
                    <Link to="/learning/good-to-see-you" className="nav-link">만나서 반갑습니다</Link>
                    <Link to="/learning/thanks" className="nav-link">감사합니다</Link>
                  </nav>
                </div>
                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                  자기소개
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                </div>
                <div className="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to="/learning/year-old" className="nav-link">나이는 *살입니다.</Link>
                    <Link to="/learning/family-members" className="nav-link">가족은 *명입니다.</Link>
                    <Link to="/learning/i-like" className="nav-link">저는 *을 좋아합니다.</Link>
                    <Link to="/learning/i-hate" className="nav-link">저는 *을 싫어합니다.</Link>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">단어</div>
                <div>
                  <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open" /></div>
                    동물
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                  </div>
                  <div className="collapse" id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link to="/learning/lion" className="nav-link">사자</Link>
                      <Link to="/learning/rabbit" className="nav-link">토끼</Link>
                      <Link to="/learning/dog" className="nav-link">개</Link>
                      <Link to="/learning/cat" className="nav-link">고양이</Link>
                    </nav>
                  </div>
                </div>
                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  <div className="sb-nav-link-icon"><i className="fas fa-book-open" /></div>
                  운동
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                </div>
                <div className="collapse" id="collapseFour" aria-labelledby="headingFour" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to="/learning/soccer" className="nav-link">축구</Link>
                    <Link to="/learning/baseball" className="nav-link">야구</Link>
                    <Link to="/learning/swim" className="nav-link">수영</Link>
                    <Link to="/learning/ski" className="nav-link">스키</Link>
                  </nav>
                </div>
                <div className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  <div className="sb-nav-link-icon"><i className="fas fa-book-open" /></div>
                  음식
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                </div>
                <div className="collapse" id="collapseFive" aria-labelledby="headingFive" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link to="/learning/chicken" className="nav-link">치킨</Link>
                    <Link to="/learning/hamburger" className="nav-link">햄버거</Link>
                    <Link to="/learning/tteokbokki" className="nav-link">떡볶이</Link>
                    <Link to="/learning/ramen" className="nav-link">라면</Link>
                  </nav>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="item-wrap">
          <div className="items">
            <div class="item left">
              <div class="inner">
                <span>50%</span>
              </div>
            </div>
            <div class="item right">
              <div class="inner">
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>

      </div>


    </header>
  )
}
