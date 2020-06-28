using OfficeOpenXml;
using OfficeOpenXml.Table;
using PdfSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Dispatch.Model;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace Dispatch.Common
{
    public static class ReportHelper
    {
        public static async Task GeneratePdf(string html, string filePath)
        {
            await Task.Run(() =>
            {
                using (FileStream file = new FileStream(filePath, FileMode.Create))
                {
                    var pdf = PdfGenerator.GeneratePdf(html, PageSize.A4);
                    pdf.Save(file);
                }
                //try
                //{
                //    using (FileStream ms = new FileStream(filePath, FileMode.Create))
                //    {
                //        var pdf = PdfGenerator.GeneratePdf(html, PageSize.A4);
                //        pdf.Save(filePath);
                //    }
                //}
                //catch (System.Exception e)
                //{
                //    throw e;
                //}
            });
        }

        public static Task GenerateXls<T>(List<T> dataSource, string filePath)
        {
            return Task.Run(() =>
            {
                using (ExcelPackage excelPackage = new ExcelPackage(new FileInfo(filePath)))
                {
                    // create work sheet
                    ExcelWorksheet ws = excelPackage.Workbook.Worksheets.Add(nameof(T));

                    // paint from cells A1
                    ws.Cells[2, 2].LoadFromCollection<T>(dataSource, true, TableStyles.Light1);
                    ws.Cells.AutoFitColumns();
                    excelPackage.Save();
                }
            });
        }

   
        public static Task GenerateXls_1<T>(IEnumerable<T> dataSource, string filePath, string templatePath,string nameWorkSheet)
        {
            return Task.Run(() =>
            {
                using (ExcelPackage pck = new ExcelPackage(new FileInfo(filePath), new FileInfo(templatePath)))
                {
                    ExcelWorksheet ws =pck.Workbook.Worksheets[nameWorkSheet];
                    // paint from cells A1
                    ws.Cells[2,1].LoadFromCollection<T>(dataSource, false, TableStyles.Dark1);
                    ws.Cells.AutoFitColumns();
                    pck.Save();
                }
            });
        }


        private static Object GetObject(Object obj, string prName)
        {
            if (obj == null) return null;
            if (obj.GetType().GetProperty(prName) == null)
            {
                return null;
            }
            else
                return obj.GetType().GetProperty(prName).GetValue(obj); ;
        }

        private static string GetValueByPropertyName(Object obj, string propertyNameTree)
        {
            string[] arr = propertyNameTree.Split('.');
            var ob = new Object();
            var temp = obj;
            for (int i = 0; i < arr.Length; i++)
            {
                ob = GetObject(temp, arr[i]);
                temp = ob;
                if (ob != null)
                {
                    if (ob.GetType().Name.Contains("HashSet"))
                    {
                        dynamic lstValue = ob as dynamic;
                        return GetStringResultByArr(lstValue, arr, i);
                    }
                }
                else
                {
                    return "";
                }
            }
            var typeName = ob.GetType().Name;
            if (typeName == "String" || typeName == "Int32" || typeName == "DateTime")
            {
                if (typeName == "DateTime")
                {
                    return ((DateTime)ob).ToString("dd/M/yyyy");
                }
                return ob.ToString();
            }
            return "";
        }
        private static string GetStringResultByArr(dynamic lstObj, string[] arr, int index)
        {
            string strResult = "";
            foreach (Object obx in lstObj)
            {
                Object ob = new Object();
                Object temp = obx;
                for (int i = index + 1; i < arr.Length; i++)
                {
                    ob = GetObject(temp, arr[i]);
                    temp = ob;
                }
                if (ob.GetType().Name == "String" || ob.GetType().Name == "Int32")
                {
                    strResult += ob.ToString() + Environment.NewLine;
                }
            }
            return strResult;
        }
    }
}