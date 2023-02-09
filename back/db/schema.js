/*
생성할 테이블 스키마
- Users : 사용자 테이블
    email : 이메일
    name : 사용자 이름
    password : 비밀번호
    provider : (구글 로그인 시 "google", "local")
    level : 학습 진행 상황 (int) 
    salt : 암호화를 위한 값
*/

var Schema = {
    users : {
        // id : { type: 'increments', nullable: false, primary: true },
        // user_id : { type: 'string', maxlength: 150, nullable: false, unique: true },
        name : { type: 'string', maxlength: 150, nullable: false },
        email : { type: 'string', primary: true, maxlength: 254, nullable: false, unique: true },
        password : { type: 'string', maxlength: 254, nullable: false },
        salt: { type: 'string', nullable: false },
        provider : { type: 'string', maxlength: 150, nullable: true },
        level: { type: 'integer', nullable: false, defaultTo: 99 }
    }
};

module.exports = Schema;