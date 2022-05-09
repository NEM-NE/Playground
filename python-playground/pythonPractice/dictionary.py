# dictionary
nico = {
  "name": "Nico",
  "age": 24,
  "korean": True,
  "fav_food": ["chicken", "pizza"]
}

print(nico)
print(nico["name"])
nico["height"] = 178 # 동적 생성 가능
print(nico)

del nico["height"]
print(nico)

print(nico.keys())
print(nico.values())
print(nico.items())

# a["name"] vs a.get("name") => get을 사용하면 키가 없을 경우 None을 반환

print("name" in nico); # 키 값이 존재하는지 조사 & value는 안됨