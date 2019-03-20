import csv
import math


# calculate the similarity of list1 and list2
def calSim(list1, list2):
    distance = 0               # use the distance to calculate the distance between two list
    for i in range(len(list1)):
        distance += pow((list1[i] - list2[i]),2)
    return math.sqrt(distance)


def songList2vec( songList ):
    # to access the DB
    vector = [0] * len(mydict)
    for i in range(songList):
        vector[(mydict[i])] = 1
    return  vector


def readDict(fileName):
    with open(fileName, 'rb') as csv_file:
        reader = csv.reader(csv_file)
        mydict1 = dict(reader)
    return mydict1


def recommandSong(list, listArray, mydict):
    distanceList = []
    songList = []
    for i in listArray:
        distanceList.append(calSim(list, i))

    for i in range(10):
        songList.append(mydict[distanceList.index(min(distanceList))])
        distanceList[distanceList.index(min(distanceList))] = max(distanceList)
    return songList


def recommandSongRandom( songNum ):
    list = []
    songList = []
   randomList = random.sample(range(1, 10), songNum)
    while length <= 10
        songList.append(mydict[randomList[length]])
    return songList


# update the recommand song to the DB
def updateDB():
    myclient = pymongo.MongoClient('mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox')
    mydb = myclient.jukebox
    mycol = mydb['recommandSongList']   # to add the songs to the song list
    x = mycol.insert_one(mydict)


mydict = readDict("dict.csv")
newUserSongList = songList2vec()
# if the song list is empty we can recommond the song randomly
if isEmpty(newUserSongList):
    song = recommadSongRandom()
else:
    existedUserSongList = songList2vec()
    recommandSong(newUserSongList, existedUserSongList, mydict)
updateDB()
