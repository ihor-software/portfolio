This is virtual assistant mirciservice. It has 2 endpoints:

/chat - use for recognizing symptoms
/chat-db - for find doctors in db (not fully tested, may produce unexpected results)


This virtual assistant uses VertexAI from google.
This llm has been choosen bacause it has big free-tier limits.
For running this you need service account key which is simple json file. Put this file in a root of this project. 
Then you need replace file_name in 
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./file_name.json"
to name of your service account key json file. How to get service account key you can read here:
https://cloud.google.com/iam/docs/keys-create-delete#creating
