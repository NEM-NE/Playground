try:
    4 / 0
except ZeroDivisionError as e:
    print(e);


f = open('foo.txt', 'w')

try:
    # 무언가를 수행한다.
finally:
    f.close()