from flask import Flask, request
from index import Index
from helper import ReturnData,MsgError
from ApiClient import SearchingByUrl


app = Flask(__name__)

@app.route("/")
def IndexPage():
    return Index()




@app.route("/search")
def Search():
    if request.method == "GET":
        if request.args.get("url") is None:
            return MsgError("url is not find!!")
        
        imageUrl = request.args.get("url")

        # Check Extestion 
        if ".jpg" not in imageUrl:
            return MsgError("Sorry! Current we don't support other extesion. Just jpg!")
        

        # Get From API Connect
        result = SearchingByUrl(url=imageUrl)

        return result

