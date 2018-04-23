using System;
using DevExpress.Xpo;
using DevExpress.Xpo.DB;
using DevExpress.Xpo.Metadata;
using System.Data.SqlClient;

/// <summary>
/// Summary description for XpoHelper
/// </summary>
public static class XpoHelper {
    public static Session GetNewSession() {
        return new Session(DataLayer);
    }

    public static UnitOfWork GetNewUnitOfWork() {
        return new UnitOfWork(DataLayer);
    }

    private readonly static object lockObject = new object();

    static IDataLayer fDataLayer;
    static IDataLayer DataLayer {
        get {
            if(fDataLayer == null) {
                lock(lockObject) {
                    fDataLayer = GetDataLayer();
                }
            }
            return fDataLayer;
        }
    }

    private static IDataLayer GetDataLayer() {
        // set XpoDefault.Session to null to prevent accidental use of XPO default session
        XpoDefault.Session = null;

        // for SQL Server
        string connStr = @"Data Source=(local);Integrated Security=true;AttachDbFilename=|DataDirectory|\MvcGridView.mdf;";

        SqlConnection conn = new SqlConnection(connStr);
        DevExpress.Xpo.Metadata.XPDictionary dict = new DevExpress.Xpo.Metadata.ReflectionDictionary();
        DevExpress.Xpo.DB.IDataStore store = DevExpress.Xpo.XpoDefault.GetConnectionProvider(conn, AutoCreateOption.SchemaAlreadyExists);
        dict.GetDataStoreSchema(typeof(Order).Assembly);  // <<< initialize the XPO dictionary 
        IDataLayer dl = new ThreadSafeDataLayer(dict, store);
        return dl;
    }
}
