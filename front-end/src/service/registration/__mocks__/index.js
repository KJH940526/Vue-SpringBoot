export default {
    register (detail) {
      return new Promise((resolve, reject) => {
        /* Promise 객체
           알수 없는 값에대한 대리자로, 비동기 연산이 종료된 후 결과값이나
           실패이유를 처리하기위한 처리기
           => 프로미스를 반환해 미래의 어떤 시점에 결과(resolve:이행 / reject:거절)를 제공한다.
        */
 
        detail.emailAddress === 'sunny@local'
         ? resolve({result: 'success'})
         : reject(new Error('User already exist'))
      })
    }
  }