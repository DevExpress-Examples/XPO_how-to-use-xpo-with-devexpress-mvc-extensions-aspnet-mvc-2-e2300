<%@ Control Language="vb" Inherits="System.Web.Mvc.ViewUserControl" %>

<% 
    Dim InitSettings = Function(settings As Object)
                           settings.Name = "gvDataBinding"
                           settings.CallbackRouteValues = New With {Key .Controller = "Main", Key .Action = "GridPartial"}
                           settings.Width = Unit.Percentage(100)
                           settings.Settings.ShowTitlePanel = True
                           settings.Settings.ShowStatusBar = GridViewStatusBarMode.Visible
                           settings.SettingsPager.Mode = GridViewPagerMode.ShowAllRecords
                           settings.SettingsPager.AllButton.Text = "All"
                           settings.SettingsPager.NextPageButton.Text = "Next &gt;"
                           settings.SettingsPager.PrevPageButton.Text = "&lt; Prev"
                           settings.SetStatusBarTemplateContent("<span id=""lblLoading"">&nbsp;</span>")
                           Return True
                       End Function

    Html.DevExpress().GridView(Function(settings) InitSettings(settings)).Bind(Model).Render()
%>
    
