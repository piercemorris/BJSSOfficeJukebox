import csv
import pymongo
import bpAglorithm


def read_dict(file_name):
    with open(file_name, mode='r') as infile:
        reader = csv.DictReader(infile)
        song_features_list = [row for row in reader]
        infile.close()
    return song_features_list


def connect_db(col_name):
    client = pymongo.MongoClient(uri)
    my_db = client.jukebox
    my_col = my_db[col_name]
    song_id_list = []
    for i in my_col.find():
        song_id_list.append(i["song"]["song"]["id"])
    return song_id_list


def create_song_feature():
    songs_features_list = []
    for song_id in song_ids:
        for dic in my_dict_list:
            if dic["songID"] == song_id:
                tmp = [dic['songID'], float(dic['acousticness']), float(dic['danceability']), float(dic['energy']),
                       float(dic['instrumentalness']), float(dic['liveness']), float(dic['loudness'])/60 + 1.0,
                       float(dic['speechiness']), float(dic['valence']), float(dic['tempo']/250), 1]
            else:
                tmp = [dic['songID'], float(dic['acousticness']), float(dic['danceability']), float(dic['energy']),
                       float(dic['instrumentalness']), float(dic['liveness']), float(dic['loudness'])/60 + 1.0,
                       float(dic['speechiness']), float(dic['valence']), float(dic['tempo']/250), 0]
            songs_features_list.append(tmp)
    print(songs_features_list)
    return songs_features_list


def updateDB():
    return


uri = "mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox"
my_dict_list = read_dict('E:\BJSS\BJSSOfficeJukebox\\recommandAlgorithm\\dict.csv')
song_ids = connect_db("songs")
songs_features = create_song_feature()
n_inputs = len(songs_features[0]) - 2
n_outputs = 2
network = bpAglorithm.initialize_network(n_inputs, 9, n_outputs)

dataset = list()
for song_features in songs_features:
    dataset.append(song_features[1:])
bpAglorithm.train_network(network, dataset, 0.5, 20, n_outputs)

for row in dataset:
    prediction = bpAglorithm.predict(network, row)
    print('Expected=%d, Got=%d' % (row[-1], prediction))
