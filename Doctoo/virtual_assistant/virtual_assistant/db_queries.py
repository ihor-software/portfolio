import psycopg2
from .env import db_db,db_user,db_host,db_password,db_port

def sql_query(query):
    try:
        connection = psycopg2.connect(user=db_user,
                                      password=db_password,
                                      host=db_host,
                                      port=db_port,
                                      database=db_db)

        print("Using Python variable in PostgreSQL select Query")
        print(query)
        cursor = connection.cursor()

        cursor.execute(query)
        connection.commit()
        records = cursor.fetchall()

    except (Exception, psycopg2.Error) as error:
        print("Error fetching data from PostgreSQL table", error)
        raise psycopg2.Error()

    finally:
        # closing database connection
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed \n")

        return records
