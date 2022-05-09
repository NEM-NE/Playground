days = ["mon", "tue", "wed", "thur", "fri", "thur"]

print(days[0])
print("mon" in days)
print(max(days))
print(len(days))
print(days.index('wed'))
print(days.count('thur'))
print(days * 3);

days[0:3] = 'hahaha' # 요 부분이 조금 신기
print(days)
days[0] = 'hellop'
print(days)
del days[0:3]
print(days)
days.insert(1, 33)
print(days)

list = [1, 2, 3, "mon", "tue"]
print(list + days);

list.append("wed");
print(list);

list = [4, 2, 1, 5, 3, 7, 6];
list.sort();
print(list);

list.reverse();
print(list);

list = [1, 2, 3, "mon", "tue"]
print(list.index("mon"));

list.remove("mon");
print(list);

print(list.pop());
print(list.count(1));

# 리스트 얕은 복사
a = [1, 2, 3];
b = a;
a[1] = 4;
print(b);

# 깊은 복사 아니면 copy라이브러리를 사용할 수도 있다.
a = [1, 2, 3];
b = a[:];
a[1] = 4;
print(b);