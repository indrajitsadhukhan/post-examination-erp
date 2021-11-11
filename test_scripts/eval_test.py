#!/usr/bin/python

def execute():
    data = { 'cgpa': 8 }
    res = -1
    str = 'x = data["cgpa"]; res = (x > 5)'
    exec(str)
    print(res)

execute()
