def say_hello(who="nico"):
  print("hello")

say_hello();
say_hello("sungbin");

def r_plus(a, b): 
  return a + b

def p_plus(a, b):
  print(a + b)

r_result = r_plus(3, 4)
p_result = p_plus(3, 4)

print(r_result)
print(p_result)

def printAB(a, b):
  print(f"a: {a} b: {b}")

printAB(3, 4)
printAB(b=3, a=4)