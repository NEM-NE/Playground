def plus(a, b):
  if type(b) is str and type(a) is str:
    return None
  else:
    return a + b

def age_check(age):
  if age < 18:
    print("you can't drink")
  elif age == 18:
    print("you can't drinkbb")
  else:
    print("welcome")

age_check(18)
age_check(20)