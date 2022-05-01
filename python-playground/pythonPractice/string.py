# 따옴표 넣기
temp = "he's police officer"
print(temp);

temp = 'he said "I will be back"'
print(temp);

temp = 'he said "I\'ll be back"'
print(temp);

# 줄바꿈 인식하기
temp = """

hi~~;

"""
print(temp);

# 문자열 곱하기

a = "python";
a *= 2;
print(a);

# 문자열 길이 구하기
temp = "get Length!";
print(len(temp));

# 문자열 인덱싱
print(temp[2]);
print(temp[-1]); # 맨마지막 글자
print(temp[-2]); # 맨마지막에서 2번째 글자

# 문자열 슬라이싱
print(temp[0:3]); # 0 ~ 2까지
print(temp[4:]); # 4~ 끝까지
print(temp[0:-1]);

# 동적할당

def sayHello(name):
    print(f"hi {name}!");
    
sayHello("sungbin");

# 문자열 관련 함수들

a = "hobby";
print(a.count("b"));

a = "Python is the best choice"
print(a.find("b"));
print(a.find("is the best")); # a.index도 비슷한 기능을 하는데 대신 발견을 못하면 에러가 발생한다.

a = "abcd";
a = ", ".join(a);
print(a);

a = "abcd";
a = a.upper(); # lower()도 있음
print(a);

a = "    abcd";
a = a.lstrip(); # rstrip()도 있음, 양쪽 공백을 지우는 strip()도 존재
print(a);

a = "Life is too short"
a = a.replace("short", "long");
print(a);

list = a.split();
for item in list:
    print(item);