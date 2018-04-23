Imports Microsoft.VisualBasic
Imports System
Imports DevExpress.Xpo
Imports DevExpress.Xpo.DB
Imports DevExpress.Xpo.Metadata
Imports System.Data.SqlClient

''' <summary>
''' Summary description for XpoHelper
''' </summary>
Public NotInheritable Class XpoHelper
	Private Sub New()
	End Sub
	Public Shared Function GetNewSession() As Session
		Return New Session(DataLayer)
	End Function

	Public Shared Function GetNewUnitOfWork() As UnitOfWork
		Return New UnitOfWork(DataLayer)
	End Function

	Private ReadOnly Shared lockObject As Object = New Object()

	Private Shared fDataLayer As IDataLayer
	Private Shared ReadOnly Property DataLayer() As IDataLayer
		Get
			If fDataLayer Is Nothing Then
				SyncLock lockObject
					fDataLayer = GetDataLayer()
				End SyncLock
			End If
			Return fDataLayer
		End Get
	End Property

	Private Shared Function GetDataLayer() As IDataLayer
		' set XpoDefault.Session to null to prevent accidental use of XPO default session
		XpoDefault.Session = Nothing

		' for SQL Server
		Dim connStr As String = "Data Source=(local);Integrated Security=true;AttachDbFilename=|DataDirectory|\MvcGridView.mdf;"

		Dim conn As New SqlConnection(connStr)
		Dim dict As DevExpress.Xpo.Metadata.XPDictionary = New DevExpress.Xpo.Metadata.ReflectionDictionary()
		Dim store As DevExpress.Xpo.DB.IDataStore = DevExpress.Xpo.XpoDefault.GetConnectionProvider(conn, AutoCreateOption.SchemaAlreadyExists)
		dict.GetDataStoreSchema(GetType(Order).Assembly) ' <<< initialize the XPO dictionary
		Dim dl As IDataLayer = New ThreadSafeDataLayer(dict, store)
		Return dl
	End Function
End Class
