x = 100
y = 100
if(x is y): # 用is判断x和y是否引用同一个对象
    print("1-变量x与y具有相同的标识")
else:
    print("1-变量x与y没有相同的标识")
if(id(x) == id(y)): # 用==判断x和y是否引用同一个对象
    print("2-变量x与y具有相同的标识")
else:
    print("2-变量x与y没有相同的标识")
if(x == y): # 用==判断x和y是否具有相同的值
    print("3-变量x与y具有相同的值")
else:
    print("3-变量x与y没有相同的标识")
if(x is not y): # 用is not判断x和y是否引用同一个对象
    print("4-变量x与y没有相同的标识")
else:
    print("4-变量x与y具有相同的标识")