using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DevExpress.Xpo;

namespace Example.Controllers {
    public class MainController : Controller {
        public ActionResult Index() {
            return View(GetData());
        }
        public ActionResult GridPartial() {
            return View("GridPartial", GetData());
        }
        public object GetData() {
            Session session = XpoHelper.GetNewSession();

            XPQuery<Customer> qry = new XPQuery<Customer>(session);
            var list = from c in qry
                       select new { c.Name, c.CompanyName };
            return list.ToList();
        }
    }
}
