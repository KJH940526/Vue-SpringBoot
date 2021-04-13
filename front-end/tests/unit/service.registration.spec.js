import moxios from 'moxios'
import registrationService from '@/service/registration'
//4번 라인부터 11번라인까지는 각 테스트를 위한 목을 생성하고 사용한 목을 제거한다.
describe('services/registration',()=>{ 
    beforeEach(()=>{
        moxios.install()
    })

    afterEach(()=>{
        moxios.uninstall()
    })
    //테스트 메소드에서는 서비스가 서비스를 호출한 곳에 서버의 응답을 반환하는지 검증한다.
    it('should pass the response to caller when request succeeded',()=>{
        expect.assertions(2) //이 API는 assertion이 호출되는 횟수를 검증한다. 이것은 테스트하는 메소드가 프로미스를 반환할 떄 유용하다.
        moxios.wait(()=>{ //15번 라인부터 22번 라인은 wait()메소드로 목 요청이 만들어질떄 까지 기다린다.
            let request = moxios.requests.mostRecent() // 대기가 끝나면 16번 라인에서 가장 최근의 요청을 가져온다.
            expect(request).toBeTruthy() // 그리고 제스트의 toBeTruthy() API로 최근 요청이 존재하는지 검증한다.
            request.respondWith({ //18번 라인의 메소드로 요청에 대한 응답을 지정한다. 메소드가 성공적인 응답을 받았는지 확인 가능!
                status: 200,
                response: {result: 'success'}
            })
        })
        //register를 호출하고 호출한 결과로 반환된 값의 result 프로퍼티가 성공인지 확인 가능!
        return registrationService.register().then(data => {
            expect(data.result).toEqual('success')
        })// 여기서는 프로미스를 활용하기 때문에 프로미스가 이행(resolve) 될 때까지 제스트가 기다릴 수 있도록
            // 테스트 메소드의 결과로 프로미스를 반환해야한다. 
    })

    it('should propagate the error to caller when request failed', () => {
        expect.assertions(2)
        moxios.wait(() => {
          let request = moxios.requests.mostRecent()
          expect(request).toBeTruthy()
          request.reject({
            status: 400,
            response: {message: 'Bad request'}
          })
        })
        return registrationService.register().catch(error => {
            expect(error.response.message).toEqual('Bad request')
          })
        })
    
})