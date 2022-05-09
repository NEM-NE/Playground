class Member:
    value = [] # 클래스 속성으로 모든 인스턴스들이 공유가 가능함.
    def __init__(self, name, age, address, sex):
        self.name= name;
        self.age = age;
        self.address = address;
        self.__sex = sex;
    
    def info(self):
        print(f"저의 이름은 {self.name}이고 나이는 {self.age}이며 사는 곳은 {self.address}입니다.")
    
    def getSex(self) -> str:
        return self.__sex;


member = Member("sungbin", 24, "송파구", "male");

member.info();
print(member.address);
# print(member.__sex); 접근 불가능
print(member.getSex());