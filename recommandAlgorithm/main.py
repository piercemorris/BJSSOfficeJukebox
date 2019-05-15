import pymongo
import recommand
import createDic
import time


def db_length(col_name):
    client = pymongo.MongoClient(uri)
    my_db = client.jukebox
    my_col = my_db[col_name]
    return my_col.find().count()


uri = "mongodb://public:bjssjukeboxgroup14@ds261253.mlab.com:61253/jukebox"

his_len = 0
while True:
    print(db_length("histories"))
    print(db_length("songs"))
    if his_len != db_length("histories"):
        createDic.main()
        his_len = db_length("histories")
    if db_length("songs") == 1:
        print("recommend")
        recommand.main()
        time.sleep(5)
