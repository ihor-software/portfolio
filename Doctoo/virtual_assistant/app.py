# save this as app.py
from flask import Flask, jsonify, request
from virtual_assistant.main import get_model_response,get_db_model_response
from marshmallow import Schema, fields, ValidationError

app = Flask(__name__)


class VirtualAssistantBodySchema(Schema):
    message = fields.String(required=True)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/chat", methods=["POST"])
def chat_virtual_assistant():
    request_body = request.json
    schema = VirtualAssistantBodySchema()
    try:
        result = schema.load(request_body)
    except ValidationError as err:
        return jsonify(err.messages), 400

    response_message = get_model_response(request_body["message"])
    return {"message": response_message}

@app.route("/chat-db", methods=["POST"])
def chat_db_virtual_assistant():
    request_body = request.json
    schema = VirtualAssistantBodySchema()
    try:
        result = schema.load(request_body)
    except ValidationError as err:
        return jsonify(err.messages), 400

    response_message = get_db_model_response(request_body["message"])
    return {"message": response_message}



if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)
