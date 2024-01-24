import serial
import sqlite3
import time

emailParam = ""
codeParam = ""
counter = 0

def add_db(email, code):
    print("email: "+email)
    print("code: "+code)
    conn=sqlite3.connect('IOT.db')
    c=conn.cursor()
    # c.execute("""CREATE TABLE IF NOT EXISTS Purchase
    # (idPurchase Int,idProduct Int,code Int)""")
    sql = "SELECT idProduct from Product where code = myCode"
    parameter = sql.replace("myCode", str(code))
    print(parameter)
    c.execute(parameter)
    records = c.fetchall()
    for row in records:
        id = row[0]
        print("id: "+str(id))
    c.execute(""" INSERT INTO Purchase
     (idProduct, idCustomer)
     VALUES (?, ?)""", (id, email ))

    c.execute(""" INSERT INTO ProductPurchase
         (idProduct, idPurchase)
         VALUES (?, ?)""", (id, 1 ))
    conn.commit()
    c.close()
    conn.close()


def read_data():
    arduinodata = serial.Serial('/dev/cu.usbserial-1420', 9600, timeout=0.1)
    while arduinodata.inWaiting:
        val = arduinodata.readline().decode('ascii')
        if len(val) > 4:
            return val


while 1:

    cod = read_data()
    if cod != "":
        if counter % 2 == 0:
            emailParam = cod
        if counter % 2 == 1:
            codeParam = cod
            add_db(emailParam,codeParam)
        counter += 1
    #print(cod)
    #add_db(cod)



