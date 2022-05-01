days = ["mon", "tue", "wed", "thur", "fri"]

for day in days:
  if day == "wed":
    break
  else:
    print(day)


# 만약 배열 없이 for문을 쓰고 싶을 경우 range이용

for i in range(0, 10):
  print(i);