import os
import sys
os.chdir('/Users/ianademianovskaia/souldance')
from http.server import HTTPServer, SimpleHTTPRequestHandler
HTTPServer(('', 3000), SimpleHTTPRequestHandler).serve_forever()
