import csv
import pymongo


# the function should be changed before used
def saveDic(mydict):
    with open('dict.csv', 'wb') as csv_file:
        writer = csv.writer(csv_file)
        for key, value in mydict.items():
           writer.writerow([key, value])



def connectDB(uri, colName):
    myclient = pymongo.MongoClient(uri)
    mydb = myclient.jukebox
    mycol = mydb[colName]
    return mycol.find()


def createDic(collections):
    # zip the song name to int
    list = []
    for i in collections.find():
        # the song name and key should be changed here
        dic1 = dict.fromkeys(['username', 'songsAdded'])
        dic1.update(username=i['username'], songsAdded=i['songsAdded'])
        list.append(dic1)
    dic = dict(zip(range(len(list)), list))
    return dic


uri = 'mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox'
songs = connectDB(uri, "songs")
mydict = createDic(songs)
saveDic(mydict)
