import csv
import pymongo
import bpAglorithm
import random


"""
@api {Function} recommand(url) recommand.py
@apiName RecommendAlgorithm
@apiGroup Recommend Algorithm
@apiParam {String} URL The current url of database.
@apiDescription  This components lets the recommandAlgorithm.py to get current song ids for the machine learning
"""


def read_dict(file_name):
    with open(file_name, mode='r') as infile:
        reader = csv.DictReader(infile)
        song_features_list = [row for row in reader]
        infile.close()
    return song_features_list


'''
connected with the database to catch the current song ids
'''
def connect_db(col_name):
    client = pymongo.MongoClient(uri)
    my_db = client.jukebox
    my_col = my_db[col_name]
    song_id_list = list()
    for i in my_col.find():
        # if i["song"]["song"]["id"] not in song_id_list:
        song_id_list.append(i["song"]["song"]["id"])
    print(song_id_list)
    return song_id_list


'''
preprocessing the song list to the data set
'''
def create_song_feature (my_dict_list):
    songs_features_list = []
    for dic in my_dict_list:
        is_in_the_list = 0
        for song_id in song_ids:
            if dic["songID"] == song_id:
                tmp = [dic['songID'], float(dic['acousticness']), float(dic['danceability']), float(dic['energy']),
                       float(dic['instrumentalness']), float(dic['liveness']), float(dic['loudness'])/60 + 1.0,
                       float(dic['speechiness']), float(dic['valence']), float(dic['tempo'])/250, 1]
                songs_features_list.append(tmp)
                is_in_the_list = 1
                break
        if is_in_the_list == 0:
            tmp = [dic['songID'], float(dic['acousticness']), float(dic['danceability']), float(dic['energy']),
                   float(dic['instrumentalness']), float(dic['liveness']), float(dic['loudness']) / 60 + 1.0,
                   float(dic['speechiness']), float(dic['valence']), float(dic['tempo']) / 250, 0]
            songs_features_list.append(tmp)
    # print(songs_features_list)
    return songs_features_list


def updateDB(input_list):
    client = pymongo.MongoClient(uri)
    my_db = client.jukebox
    my_col = my_db["recommendSongs"]
    my_col.delete_many({})

    dic = {"songID": input_list[random.randint(0, len(input_list) - 1)]}
    my_col.insert_one(dic)
    # print(type(input_list[0]))
    return


uri = "mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox"
song_ids = list()


def main():
    my_dict_list = read_dict('E:\BJSS\BJSSOfficeJukebox\\recommandAlgorithm\\dict.csv')
    for i in range(5):
        song_ids.append(my_dict_list[i]['songID'])
    songs_features = create_song_feature(my_dict_list)
    n_inputs = len(songs_features[0]) - 2
    n_outputs = 2

    # the number of nodes in hiden layer could be changed
    # notice: the number of hiden layers could only be one
    hided_nodes_num = 9

    accuracy = 0.0
    iteration = 50

    network = bpAglorithm.initialize_network(n_inputs, hided_nodes_num, n_outputs)

    dataset = list()
    for song_features in songs_features:
        dataset.append(song_features[1:])
    print(len(dataset))
    print(len(song_ids))

    while True:
        bpAglorithm.train_network(network, dataset, 0.5, iteration, n_outputs)

        predict_songs = 0
        recommend_list = list()
        for row in songs_features:
            prediction = bpAglorithm.predict(network, row[1:])
            if prediction == 1 and (row[0] in song_ids):
                predict_songs += 1
            if prediction == 1 and (row[0] not in song_ids):
                    recommend_list.append(row[0])
        accuracy = predict_songs / len(song_ids)

        print(accuracy)
        if accuracy >= 0.8:
            if len(recommend_list) == 0:
                '''for row in songs_features:
                prediction = bpAglorithm.predict(network, row[1:])
                print('Expected=%d, Got=%d' % (row[-1], prediction))'''
                recommend_list.append(song_ids[random.randint(0, 4)])
            break
        else:
            iteration += 0
    updateDB(recommend_list)
    dataset.clear()
    song_ids.clear()
    songs_features.clear()
    recommend_list.clear()
