import { createLocalVue, mount } from '@vue/test-utils' //화면에 부착하기 위해서 mount함수를 가져온다.
import VueRouter from 'vue-router'
import RegisterPage from '@/views/RegisterPage'


// vm.$router가 접근할 수 있도록 테스트에 Vue Router 추가하기
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

// registrationService의 목
jest.mock('@/service/registration')

describe('RegisterPage.vue', () => {
    let wrapper
    let fieldUsername
    let fieldEmailAddress
    let fieldPassword
    let buttonSubmit

    beforeEach(() => { // beforeEach()를 사용해 변수를 초기화한다. 따라서 테스트 명세 파일에 잇는 다른 테스트에 의해 해당 변수들은 영향을 받지 않는다.
        wrapper = mount(RegisterPage, {
            localVue,
            router
        }) //mount 함수는 마운트와 렌더링이 완료된 RegisterPage.vue 컴포넌트를 포함하는 Wrapper 객체를 생성한다.
        fieldUsername = wrapper.find('#username') // wapper.find()는 선택자에 해당하는 html요소를 찾아주는 api이다. 이 api 결과 또한 하나의 Wrapper 객체이며, vm.$el.querySelector를 Wrapper 객체의 api로 대체한다.
        fieldEmailAddress = wrapper.find('#emailAddress')
        fieldPassword = wrapper.find('#password')
        buttonSubmit = wrapper.find(`form button[type="submit"]`)
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('should render correct contents', () => {
        expect(wrapper.find('.logo').attributes().src) // wrapper.attributes()로 DOM 노드의 속성을 가져올 수 있다.
            .toEqual('/static/images/logo.png')
        expect(wrapper.find('.tagline').text()) //wrapper.text()로 래퍼의 텍스트 내용을 가져온다.
            .toEqual('Open source task management tool')
        expect(fieldUsername.element.value).toEqual('')
        expect(fieldEmailAddress.element.value).toEqual('')
        expect(fieldPassword.element.value).toEqual('')
        expect(buttonSubmit.text()).toEqual('Create account')
    })
    // wrapper.vm으로 Vue 인스턴스에 접근하며, vm의 모든 메소드와 프로퍼티에 접근할 수 있다.
    it('should contain data model with initial values', () => { //wraper.vm.form으로 프로퍼티에 접근해서 프로퍼티가 빈 문자열로 초기화됐는지를 검증한다.
        expect(wrapper.vm.form.username).toEqual('')
        expect(wrapper.vm.form.emailAddress).toEqual('')
        expect(wrapper.vm.form.password).toEqual('')
    })

    it('should have form inputs bound with data model', () => { //폼의 입력과 데이터 모델의 바인딩을 검증하는 테스트.
        const username = 'sunny'
        const emailAddress = 'sunny@taskagile.com'
        const password = 'VueJsRocks!'

        wrapper.vm.form.username = username
        wrapper.vm.form.emailAddress = emailAddress
        wrapper.vm.form.password = password

        // M2. setValue를 이용해 값 주입
        fieldUsername.setValue(wrapper.vm.form.username)
        fieldEmailAddress.setValue(wrapper.vm.form.emailAddress)
        fieldPassword.setValue(wrapper.vm.form.password)

        expect(fieldUsername.element.value).toEqual(username)
        expect(fieldEmailAddress.element.value).toEqual(emailAddress)
        expect(fieldPassword.element.value).toEqual(password)
    })


    // 제출 핸들러 존재 여부 확인
    it('should have form submit event handler `submitForm`', () => {
        // stub? 실제로 동작하는 것 처럼 보이는 객체
        const stub = jest.fn()
        wrapper.setMethods({ submitForm: stub })
        buttonSubmit.trigger('submit')
        expect(stub).toBeCalled()
    })

    // 가입 성공
    it('should register when it is a new user', () => {
        const stub = jest.fn()
        wrapper.vm.$router.push = stub
        wrapper.vm.form.username = 'sunny'
        wrapper.vm.form.emailAddress = 'sunny@local'
        wrapper.vm.form.password = 'Jest!'
        wrapper.vm.submitForm()
        wrapper.vm.$nextTick(() => {
            expect(stub).toHaveBeenCalledWith({ name: 'LoginPage' })
        })
    })
    // 가입 실패
    it('should fail it is not a new user', () => {
        // 목에서는 오직 sunny@local 만 새로운 사용자
        wrapper.vm.form.emailAddress = 'ted@local'
        expect(wrapper.find('.failed').isVisible()).toBe(false)
        wrapper.vm.submitForm()
        wrapper.vm.$nextTick(null, () => {
            expect(wrapper.find('.failed').isVisible()).toBe(true)
        })
    })
})