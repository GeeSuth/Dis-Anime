from email.mime import image
from flask import Flask, render_template, request
from index import Index
from helper import ReturnData,MsgError
from ApiClient import SearchingByUrl,SearchingByImage
import os.path
import io


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
        # Get extesion of image/url
        file_ext = os.path.splitext(imageUrl)[1]
        print(file_ext)
        if file_ext != ".jpg" and file_ext != ".png":
            return MsgError("Sorry! Current we don't support other extesion. Just jpg,png")


        # Get From API Connect
        result = SearchingByUrl(url=imageUrl)

        return result


@app.route("/searchImage", methods=["POST"])
def searchUpladImage():
      try:
        print(request.files)
        f = request.files['photo']
        return SearchingByImage(f)
        
      except Exception as e:
        return ReturnData(f"Can't Handle this image , {str(e)}", True)




@app.route("/how")
def HowItWork():
    return render_template("/pages/how.html")


@app.route("/about")
def About():
    return render_template("/pages/about.html")
