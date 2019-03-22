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


def recommandSongRandom():
    list = []
    songList = []
    while b_length <= 10:
        random_number = random.randint(0, 99)
        if random_number not in b_list:
            list.append(random_number)
            b_length += 1
            songList.append(mydict[random_number])
    return songList

def updateDB():
    # update the recommand song to the DB


mydict = readDict("dict.csv")
newUserSongList = songList2vec()
# if the song list is empty we can recommond the song randomly
if isEmpty(newUserSongList):
    song = recommadSongRandom()
else:
    existedUserSongList = songList2vec()
    recommandSong(newUserSongList, existedUserSongList, mydict)
updateDB()
