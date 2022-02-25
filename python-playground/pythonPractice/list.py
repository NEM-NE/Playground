days = ["mon", "tue", "wed", "thur", "fri", "thur"]

print(days[0])
print("mon" in days)
print(max(days))
print(len(days))
print(days.index('wed'))
print(days.count('thur'))
print(days * 3);

days[0:3] = 'hahaha'
print(days)
days[0] = 'hellop'
print(days)
del days[0:3]
print(days)
days.insert(1, 33)
print(days)