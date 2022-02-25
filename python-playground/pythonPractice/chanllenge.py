def isInvaild(a, b):
  paramObj = {
    "a": int(a),
    "b": int(b)
  }
  return paramObj

def plus(a, b): 
  paramObj = isInvaild(a, b)
  return paramObj["a"] + paramObj["b"]

def substract(a, b): 
  paramObj = isInvaild(a, b)
  return paramObj["a"] - paramObj["b"]

def multiply(a, b): 
  paramObj = isInvaild(a, b)
  return paramObj["a"] * paramObj["b"]

def divide(a, b): 
  paramObj = isInvaild(a, b)
  return int(paramObj["a"] / paramObj["b"])

a = "4"
b = 2

result = plus(a, b)
print(result)
result = substract(a, b)
print(result)
result = multiply(a, b)
print(result)
result = divide(a, b)
print(result)