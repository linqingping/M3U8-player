import requests

#url="http://www.8080s.net/movie/33740/play-340475"
#url="https://haoa.haozuida.com/share/Mcc9JqdF14z6jAMg"
url="http://haoa.haozuida.com/20191220/o2YdhVQk/index.m3u8?sign=7384dae84671e6cff778dd5e7bda6b721176776d00c3902e958f51d760d6ca9535fdd4657bb19b938febbe28b4a8775f12e9eada44f00f9e32824b967cdfb0b3"
re=requests.get(url)
#print(re.text)
str=re.text
for i in str.split("\n"):
    if ".m3u8" in i:
        print("http://haoa.haozuida.com"+i)
