import csv
import pymongo


def saveDic():
    with open('dict.csv', 'wb') as csv_file:
        writer = csv.writer(csv_file)
        for key, value in mydict.items():
           writer.writerow([key, value])


def connectDB(DBName):
    # the DB name should be change
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["runoobdb"]
    mycol = mydb["sites"]
    return mycol.find()


def createDic(wordList):
    # zip the song name to int
    for


wordList = connectDB(DBName)