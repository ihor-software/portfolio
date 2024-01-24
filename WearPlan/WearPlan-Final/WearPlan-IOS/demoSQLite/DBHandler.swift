

import Foundation
import SQLite3

class Databasehandler {
    let databaseName : String = "testDB"
    let databaseExtension : String = "db"
    var db : OpaquePointer! = nil
    
    init() {
         prepareDatafile()
         db = openDatabase()
    }
    
    func executeSelect(email:String , password:String)->loginData{
        
        let data = loginData()
        let query = "select * from Client where email = '"+email+"' and password = '"+password+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if  sqlite3_step(queryStatement) == SQLITE_ROW
            {
                
                let c2 = sqlite3_column_text(queryStatement, 1)
                if c2 != nil{
                    data.email = String(cString: c2!)
                }
                let c3 = sqlite3_column_text(queryStatement, 2)
                if c3 != nil{
                    data.password = String(cString: c3!)
                }
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            
        }
        
        sqlite3_finalize(queryStatement!)
        return data
    }
    
    func executeSelectCustomer(email:String , password:String)->loginData{
        
        let data = loginData()
        let query = "select * from Customer where email = '"+email+"' and password = '"+password+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if  sqlite3_step(queryStatement) == SQLITE_ROW
            {
                
                let c2 = sqlite3_column_text(queryStatement, 1)
                if c2 != nil{
                    data.email = String(cString: c2!)
                }
                let c3 = sqlite3_column_text(queryStatement, 2)
                if c3 != nil{
                    data.password = String(cString: c3!)
                }
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            
        }
        
        sqlite3_finalize(queryStatement!)
        return data
    }
    
    func customerHistory(idCustomer: String) -> [Int] {
        var data:[Int] = []
        var temp = ""
        let query = "select * from Purchase where idCustomer = '"+idCustomer+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
            
                let c1 = sqlite3_column_text(queryStatement, 1)
                if c1 != nil{
                    temp = String(cString: c1!)
                    
                }
                data.append(Int(temp) ?? 0)
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            
        }
        
        sqlite3_finalize(queryStatement!)
        return data
    }
    
    func executeSelectProductById(id: Int )->Product{
        
        var data = Product()
        let query = "select * from Product where idProduct = "+String(id)+""
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if  sqlite3_step(queryStatement) == SQLITE_ROW
            {
                let c1 = sqlite3_column_text(queryStatement, 2)
                if c1 != nil{
                    data.Model = String(cString: c1!)
                }
                let c2 = sqlite3_column_text(queryStatement, 7)
                if c2 != nil{
                    data.Description = String(cString: c2!)
                }
                let c3 = sqlite3_column_text(queryStatement, 5)
                if c3 != nil{
                    data.Image = String(cString: c3!)
                }
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            
        }
        
        sqlite3_finalize(queryStatement!)
        return data
    }
    
    func executeSelectProduct()-> [Product]{
        //var data =  Product()
        var dataArray = [Product]()
        let query = "select * from Product"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
                var product = Product()
                let c1 = sqlite3_column_text(queryStatement, 2)
                if c1 != nil{
                    product.Model = String(cString: c1!)
                }
                let c2 = sqlite3_column_text(queryStatement, 7)
                if c2 != nil{
                    product.Description = String(cString: c2!)
                }
                let c3 = sqlite3_column_text(queryStatement, 5)
                if c3 != nil{
                    product.Image = String(cString: c3!)
                }
                dataArray.append(product)
            }
        sqlite3_finalize(queryStatement!)
        
    }
        return dataArray
    }
    
    func executeSelectProductManage(email: String)-> [Product]{
        //var data =  Product()
        var dataArray = [Product]()
        let query = "select * from Product where client = '"+email+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
                var product = Product()
                let c1 = sqlite3_column_text(queryStatement, 2)
                if c1 != nil{
                    product.Model = String(cString: c1!)
                }
                let c2 = sqlite3_column_text(queryStatement, 7)
                if c2 != nil{
                    product.Description = String(cString: c2!)
                }
                let c3 = sqlite3_column_text(queryStatement, 5)
                if c3 != nil{
                    product.Image = String(cString: c3!)
                }
                dataArray.append(product)
            }
        sqlite3_finalize(queryStatement!)
        
    }
        return dataArray
    }
    
    func executeSelectProductTop()-> [Int]{
        //var data =  Product()
        //var dataArray = [Product]()
        var arr = [Int]()
        let query = "SELECT idProductPurchase,TOP3.idProduct,idPurchase FROM TOP3,ProductPurchase WHERE TOP3.idProduct = ProductPurchase.idProduct ORDER BY Count DESC"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            while sqlite3_step(queryStatement) == SQLITE_ROW {
                var product = ""
                let c1 = sqlite3_column_text(queryStatement, 1)
                if c1 != nil{
                    product = String(cString: c1!)
                }
                
                arr.append(Int(product) ?? 0)
            }
        sqlite3_finalize(queryStatement!)
        
    }
        
        return arr
    }
    
    func loginAuthentication(email:String , password:String)->Bool{
        
        let query = "select * from Client where email = '"+email+"' and password = '"+password+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if  sqlite3_step(queryStatement) == SQLITE_ROW
            {
                sqlite3_finalize(queryStatement)
                return true
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            print("'insert into ':: could not be prepared::\(errmsg)")
        }
        sqlite3_finalize(queryStatement)
        return false
    }
    
    func loginAuthenticationCustomer(email:String , password:String)->Bool{
        
        let query = "select * from Customer where email = '"+email+"' and password = '"+password+"'"
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if  sqlite3_step(queryStatement) == SQLITE_ROW
            {
                sqlite3_finalize(queryStatement)
                return true
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            print("'insert into ':: could not be prepared::\(errmsg)")
        }
        sqlite3_finalize(queryStatement)
        return false
    }
    
    func executeQuery(query: String)->Bool{
        
        var queryStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &queryStatement, nil) == SQLITE_OK {
            if sqlite3_step(queryStatement) != SQLITE_DONE {
                let errmsg = String(cString: sqlite3_errmsg(db)!)
                print("failure inserting hero: \(errmsg)")
            }
            else{
                return true
            }
            
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            print("'insert into ':: could not be prepared::\(errmsg)")
        }
        sqlite3_finalize(queryStatement)
        return false
    }
    
    //++++++++++++++++++++++ Deleting from database++++++++++++++++++
    
    func deleteQuery(query: String)->Bool{
        
        var deleteStatement: OpaquePointer? = nil
        if sqlite3_prepare_v2(db, query, -1, &deleteStatement, nil) == SQLITE_OK {
    
            if sqlite3_step(deleteStatement) != SQLITE_DONE {
                let errmsg = String(cString: sqlite3_errmsg(db)!)
                print("failure inserting hero: \(errmsg)")
                
            } else {
               return true
                
                
            }
        } else {
            let errmsg = String(cString: sqlite3_errmsg(db)!)
            print("'insert into ':: could not be prepared::\(errmsg)")

        }
    
    
    
    
        sqlite3_finalize(deleteStatement)
    
    
        print("delete")
        return false
    
    
    }
    
    /////////////////////////////
    //Copy database for first time
    /////////////////////////////
    func prepareDatafile()
    {
        let docUrl=NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        print(docUrl)
        let fdoc_url=URL(fileURLWithPath: docUrl).appendingPathComponent("\(databaseName).\(databaseExtension)")
        
        let filemanager=FileManager.default
        
        if !FileManager.default.fileExists(atPath: fdoc_url.path){
            do{
                let localUrl=Bundle.main.url(forResource: databaseName, withExtension: databaseExtension)
                print(localUrl?.path ?? "")
                
                try filemanager.copyItem(atPath: (localUrl?.path)!, toPath: fdoc_url.path)
                
                print("Database copied to simulator-device")
            }catch
            {
                print("error while copying")
            }
        }
        else{
            print("Database alreayd exists in similator-device")
        }
    }
    
    
    
    /////////////////////////////////////
    /////Open Connection to Database
    ////////////////////////////////////
    func openDatabase() -> OpaquePointer? {
        
        let docUrl=NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]
        print(docUrl)
        let fdoc_url=URL(fileURLWithPath: docUrl).appendingPathComponent("\(databaseName).\(databaseExtension)")
        
        var db: OpaquePointer? = nil
        
        if sqlite3_open(fdoc_url.path, &db) == SQLITE_OK {
            print("DB Connection Opened, Path is :: \(fdoc_url.path)")
            return db
        } else {
            print("Unable to open database. Verify that you created the directory described " +
                "in the Getting Started section.")
            return nil
        }
        
    }

}
