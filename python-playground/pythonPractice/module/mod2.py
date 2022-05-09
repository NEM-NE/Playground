
# 전체 다 가져오기
import mod1

print(mod1.add(1, 3));

print(mod1.substract(3, 2));

print(mod1.PI);

# 일부만 가져오기
from mod1 import add, substract

print(add(3, 1));
print(substract(3, 1));


import mod3

student = mod3.Student("sungbin", 3);
print(student.toString());


from mod3 import Student

student = Student("sungbin", 3);
print(student.toString());