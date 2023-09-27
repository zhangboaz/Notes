
dict1 = {'name':'Tom', 'telephone':'1234567890', 'sex':{'男','女'}}
dict2 = dict1
dict3 = dict1.copy()
dict1['name'] = 'Jone'
dict1['sex'].remove('女')
print(dict2)
print(dict3)

