import csv
import pymongo


'''
def saveDic(mydict):
    with open('dict.csv', 'wb') as csv_file:
        writer = csv.writer(csv_file)
        for key, value in mydict.items():
           writer.writerow([key, value])
'''


def connectDB(uri):
    # the DB name should be change
    myclient = pymongo.MongoClient(uri)
    mydb = myclient["jukebox"]
    mycol = mydb["songs"]
    return mycol.find()


def createDic(wordList):
    # zip the song name to int
    mydict = {}
    count = 0
    for i in range(wordList):
        mydict[i] = count
        count += 1
    return mydict


uri = 'mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox'
songs = connectDB(uri)
mydict = createDic(songs)
# saveDic(mydict)
print(mydict)
