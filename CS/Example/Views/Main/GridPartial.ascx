<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>

<% 
    Html.DevExpress().GridView(
        settings =>
        {
            settings.Name = "gvDataBinding";
            settings.CallbackRouteValues = new { Controller = "Main", Action = "GridPartial" };
            settings.Width = Unit.Percentage(100);

            settings.Settings.ShowTitlePanel = true;
            settings.Settings.ShowStatusBar = GridViewStatusBarMode.Visible;
            settings.SettingsPager.Mode = GridViewPagerMode.ShowAllRecords;
            settings.SettingsPager.AllButton.Text = "All";
            settings.SettingsPager.NextPageButton.Text = "Next &gt;";
            settings.SettingsPager.PrevPageButton.Text = "&lt; Prev";

            settings.SetStatusBarTemplateContent(c =>
            {%>
                <span id="lblLoading">&nbsp;</span>
            <%});             
        })
        .Bind(Model)
        .Render();
%>
