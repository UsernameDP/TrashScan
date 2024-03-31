from flask import Flask, Request
import inference

app = Flask(__name__)

@app.route('/inference', methods=['POST'])
def hello_world():
    if not Request.is_json:
        return 'Request must be JSON', 400
    
    image_json = Request.get_json()
    
    # DO INFERENCE
