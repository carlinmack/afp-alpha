import os
import sys
import requests

if os.path.isfile("Last-Modified-SHA.txt"):
    with open("Last-Modified-SHA.txt") as file:
        prevLastModifiedSha = file.read()
else:
    prevLastModifiedSha = ""
    
r = requests.head("https://foss.heptapod.net/api/v4/projects/695/repository/files/metadata%2Fmetadata?ref=branch%2Fdefault")
lastModifiedSha = r.headers["X-Gitlab-Content-Sha256"]

if prevLastModifiedSha == lastModifiedSha:
    sys.exit(1)
else:
    with open("Last-Modified-SHA.txt", "w") as file:
        file.write(lastModifiedSha)
