const {multiply, makeUser, add, throwErr, getName, getAge, connectDB, disconnectDB} = require('./fn');

test('곱하기 테스트 A', () => {
    expect(multiply(2, 3)).toBe(6);
});

test('곱하기 테스트 B', () => {
    expect(multiply(3, 3)).not.toBe(6);
});

/*
    toBe는 기본 타입을 비교할 때 사용하는 matcher이다
    객체를 비교할 때는 toEqual
    보다 엄격하게 객체 비교하는 경우에는 toStrictEqual를 사용한다.
    toBeNull => null이면 통과
    toBeUndefined => undefined면 통과 
    toBeDefined => defined면 통과

    toBeTruthy
    toBeFalsy
*/

test('객체 비교는 이렇게 하는 겁니다.', () => {
    expect(makeUser('sungbin', 23)).toEqual({
        name:'sungbin',
        age:23,
    })
})

test('toBeTruthy 테스트', () => {
    expect(add(3, 'hello')).toBeTruthy();
})

/*
    숫자 비교

    toBeGreaterThan 보다 크다
    toBeGreaterThanOrEqual 보다 크거나 같다
    toBeLessThan 보다 작다
    toBeLessThanOrEqual 보다 작거나 같다

    자바스크립트에서는 0.1 + 0.2 같이 소수점 계산을 정확하게 못함 => 테스트 할 때는 toBeCloseTo 사용

*/

test('숫자 대소 비교 테스트입니다.', () => {
    expect(multiply(4, 3)).toBeGreaterThanOrEqual(12);
})

test('소수점 계산 테스트입니다.', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
})

/*

    문자열 비교

    toMatch와 정규 표현식 사용
*/

test('문자열 테스트입니다.', () => {
    const str = 'hello world'
    expect(str).toMatch(/h/);
})

/*
    배열 테스트
*/

test('명단에 마이크가 있는지 확인', () => {
    const user = 'mike';
    const list = ['sung', 'bin', 'kai']

    expect(list).not.toContain(user);
}) 

/*
    에러 확인 테스트
*/

test('error test', () => {
    expect(() => throwErr()).toThrow();
})


/*

    비동기 메서드 테스트

    test콜백 함수에 done을 매개변수로 넣어준다.
    done은 호출 되기 전까지 테스트를 종료시키지 않는다.

    단 promise인 경우 done을 빼주고 return을 해줘도 된다,

*/

// test('비동기 메서드 테스트', (done) => {
//     const callback = (name) => {
//         expect(name).toBe('Mike');
//         done();
//     }

//     getName(callback);

// })

// test('비동기 메서드 에러 처리 테스트', (done) => {
//     const callback = (name) => {
//         try {
//             expect(name).toBe('Mike');
//             done();   
//         } catch (error) {
//             done();
//         }
//     }

//     getName(callback);

// })


// test('promise 테스트 처리', () => {
//     return getAge().then((age) => {
//         expect(age).toBe(23); 
//     })
// })


/*

    테스트 전후 작업

    beforeEach => 각 테스트 전마다 실행
    afterEach => 각 테스트 이후 실행

    beforeAll => 모든 테스트 전 한번 실행
    afterAll => 모든 테스트 이후 한번 실행

    describe => 관련된 테스트들을 묶기
*/
 
let num = 10;

// beforeEach(() => {
//     num = 0;
// })

afterEach(() =>{
    num = 0;
})

test('before test1', () => {
    num = add(num , 1);
    expect(num).toBe(1);
})

test('before test2', () => {
    num = add(num , 2);
    expect(num).toBe(2);
})

test('before test3', () => {
    num = add(num , 3);
    expect(num).toBe(3);
}) 

// describe('DB 정보 가져오기', () => {
//     let user;
//     beforeAll(() => {
//         connectDB().then((obj) => user = obj);
//     })
//     afterAll(() => {
//         return disconnectDB().then((result) => console.log(result));
//     })

//     test('user 이름가져오기', (done) => {
//         const callback = (name) => {
//             expect(name).toBe('Mike');
//             done();
//         }

//         getName(callback);
//     })

//     test('user 나이가져오기', () => {
//         return getAge().then((age) => {
//             expect(age).toBe(23);
//         })
//     })
// })


/*

    test.only() => 이전 테스트들은 고려 안하고 지정한 테스트만 진행
    test.skip() => 해당 테스트만 넘어감

*/


/*

    mock function => 테스트 하기 위해 흉내만 내는 함수 

    jest.fn().mock.calls => mock함수에 매개변수로 넣어준 걸 순서대로 배열로 가지고 있음
*/

const mockFn = jest.fn();

mockFn();
mockFn(1);

test('mock test', () => {
    console.log(mockFn.mock.calls);
})

const mockFn2 = jest.fn((num) => num + 1);

mockFn2(10);
mockFn2(20);
mockFn2(30);

test('mock test', () => {
    console.log(mockFn2.mock.results);
})

const mockFn3 = jest.fn();

mockFn3
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(20)
    .mockReturnValue(30);

mockFn3();
mockFn3();
mockFn3();

test('mock test', () => {
    console.log(mockFn3.mock.results);
})


//응용

const mockFn4 = jest.fn();

mockFn4
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValue(true)

const result = [1, 2, 3, 4, 5].filter(num => mockFn4(num));

test('mock test', () => { 
    expect(result).toStrictEqual([1, 3, 5])
})

// 비동기 함수는 mockResolvedValue사용 