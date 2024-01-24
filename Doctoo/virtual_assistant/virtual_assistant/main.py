from .chat_model import chat
from .chat_db_model import db_chat
from .db_queries import sql_query


def get_model_response(message):
    print(chat)
    response = chat.run({"question": message})
    print(response)
    return response


def get_db_model_response(message):
    response = db_chat.run(message)
    if response.startswith("SELECT"):
        response = sql_query(response)
        return response
    else:
        return response
