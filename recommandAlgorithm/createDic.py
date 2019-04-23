import csv
import pymongo

"""
@api {Stateless functional Component} <createDic|url/> recommandAlgorithm/createDic.py
@apiName CreateDictionary
@apiGroup Components
@apiParam {String} URL The current url of database.
@apiDescription  This components lets the createDic.py to get current song features to save as a csv file.
"""


def save_dic(my_dic):
    try:
        with open('dict.csv', 'w', newline='') as csv_file:
            writer = csv.DictWriter(csv_file, fieldnames=csv_columns)
            writer.writeheader()
            writer.writerows(my_dic)
    except IOError:
        print("I/O error")


def connect_db(col_name):
    client = pymongo.MongoClient(uri)
    my_db = client.jukebox
    my_col = my_db[col_name]
    return my_col.find()


def create_dic(collections):
    # zip the song name to int
    list_song_dict = []               # store the song as dict into the list
    for i in collections:
        # the song id and feature were stored as a dictionary
        tmp = {"songID": i['songID'], 'acousticness': i['acousticness'], 'danceability': i['danceability'],
               'energy': i['energy'], 'instrumentalness': i['instrumentalness'], 'liveness': i['liveness'],
               'loudness': i['loudness'], 'speechiness': i['speechiness'], 'valence': i['valence'],
               "tempo": i['tempo']}
        if tmp not in list_song_dict:
            list_song_dict.append(tmp)
    return list_song_dict


# uri = 'mongodb://jukebox:password1@ds261253.mlab.com:61253/jukebox'
uri = "mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox"
csv_columns = ["songID", 'acousticness', 'danceability',  'energy', 'instrumentalness', 'liveness',
               'loudness', 'speechiness', 'valence', "tempo"]
songs = connect_db("histories")
my_dicts = create_dic(songs)
save_dic(my_dicts)



