Imports System
Imports System.Linq
Imports System.Web.Mvc
Imports DevExpress.Xpo

<HandleError()> _
Public Class MainController
    Inherits Controller
    Public Function Index() As ActionResult
        Return View(GetData())
    End Function
    Public Function GridPartial() As ActionResult
        Return View("GridPartial", GetData())
    End Function
    Public Function GetData() As Object
        Dim session As Session = XpoHelper.GetNewSession()

        Dim qry As New XPQuery(Of Customer)(session)
        Dim list = _
         From c In qry _
         Select New With {Key c.Name, Key c.CompanyName}
        Return list.ToList()
    End Function
End Class
