from unittest import result
import requests
import urllib.parse
from helper import ReturnData,MsgError


def SearchingByUrl(url):
    
    result = []

    try:
        result = requests.get("https://api.trace.moe/search?anilistInfo&url={}"
                        .format(urllib.parse.quote_plus(url))).json()
    except (KeyError, TypeError, ValueError):
        return MsgError(f"API disconnected!")

    
    # API return error
    if result["error"] != "":
        return MsgError(f"Sorry! there a error, {result['error']}")
    

    data = []
    #print(result["result"])
    for row in result["result"]:
        # We Don't need to get Adult content whatever 
        if row['anilist']['isAdult'] == True:
           continue

        datarow = {
            "filename" :row["filename"],
            "video" :row["video"],
            "title" :row["anilist"]["title"]["english"],
            "img" :row["image"]
        } 
        data.append(datarow)
    

    return ReturnData(data)

