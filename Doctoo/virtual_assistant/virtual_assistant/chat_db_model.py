from google.cloud import aiplatform
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./file_name.json"

from langchain.utilities import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.agents.agent_types import AgentType
from langchain.agents import create_sql_agent
from langchain.llms import VertexAI
from langchain.agents.agent_toolkits import SQLDatabaseToolkit

from .env import db_db, db_port, db_host, db_password, db_user

FORMAT_INSTRUCTIONS = """Use the following format:
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: SQL query ONLY 
If column name is a reserve word add quotes around it"""


custom_table_info = {
    "doctors_view": """CREATE TABLE doctors_view (
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        phone_number VARCHAR(255),
        specialty VARCHAR(255),
        payrate NUMERIC,
        available BOOLEAN,
        hospital VARCHAR(255)
)

/*
3 rows from doctors_view table:
first_name      last_name       email   phone_number    specialty       payrate available       hospital
Fannie  Koepp   Fannie_Koepp@yahoo.com  +380 113 22 20 41       Urology 197.00  False   Regional Medical Center
Angelica        Romaguera       Angelica28@hotmail.com  +380 707 94 88 78       Cardiology      39.00   True    Saint Mary's Hospital
Jessica Hauck   Jessica40@gmail.com     +380 250 81 22 08       Allergy and Immunology  140.00  True    Sunrise Medical Center
*/"""
}


db = SQLDatabase.from_uri(
    f"postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_db}",
    include_tables=["doctors_view"],
    view_support=True,
)
llm = VertexAI(
    project="ai-assistant-397809",
    location="us-central1",
    max_output_tokens=512,
    model_name="text-bison",
)
toolkit = SQLDatabaseToolkit(db=db, llm=llm)
db_chat = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    format_instructions=FORMAT_INSTRUCTIONS,
    prefix="You are an agent designed to interact with PostgreSQL database.\n \
            When someone greet you, response 'Hi, write info abouut doctor which you want to find.'\
            When someone saying goodbye you, response 'Goodbye'\
            Given an input question, create a syntactically correct {dialect} query to run,\
            then look at the results of the query and return the answer.\
            In the query, please enclose table names and column names with double quotation marks.\n \
            Unless the user specifies a specific number of examples they wish to obtain,\
            always limit your query to at most {top_k} results if number of examples greater than {top_k}.\n \
            You can order the results by a relevant column to return the most interesting examples in the database.\n \
            Never query for all the columns from a specific table, only ask for the relevant columns given the question.\n \
            You have access to tools for interacting with the database.\n \
            Only use the below tools. Only use the information returned by the below tools to construct your final answer.\n \
            You MUST double check your query before executing it. \n\
            If you get an error while executing a query, rewrite the query and try again.\n\
            If query produce a number as output then return json object with key 'count' and this number as value \n\
            DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database, just return 'Sorry I can not perform this action' as the answer.\n\n \
            DO NOT execute query which asks for write code or script, instead just return json with key 'text' and value 'I cant do it for you'\n\
            If the question does not seem related to the database, just return 'I don't know' as the answer.\n",
)
