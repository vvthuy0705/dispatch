namespace Dispatch.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPostClass : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "CustomerId", "dbo.ApplicationUsers");
            DropForeignKey("dbo.OrderDetails", "OrderID", "dbo.Orders");
            DropForeignKey("dbo.Products", "CategoryID", "dbo.ProductCategories");
            DropForeignKey("dbo.OrderDetails", "ProductID", "dbo.Products");
            DropForeignKey("dbo.Posts", "CategoryID", "dbo.PostCategories");
            DropForeignKey("dbo.PostTags", "PostID", "dbo.Posts");
            DropForeignKey("dbo.PostTags", "TagID", "dbo.Tags");
            DropForeignKey("dbo.ProductTags", "ProductID", "dbo.Products");
            DropForeignKey("dbo.ProductTags", "TagID", "dbo.Tags");
            DropIndex("dbo.OrderDetails", new[] { "OrderID" });
            DropIndex("dbo.OrderDetails", new[] { "ProductID" });
            DropIndex("dbo.Orders", new[] { "CustomerId" });
            DropIndex("dbo.Products", new[] { "CategoryID" });
            DropIndex("dbo.Posts", new[] { "CategoryID" });
            DropIndex("dbo.PostTags", new[] { "PostID" });
            DropIndex("dbo.PostTags", new[] { "TagID" });
            DropIndex("dbo.ProductTags", new[] { "ProductID" });
            DropIndex("dbo.ProductTags", new[] { "TagID" });
            DropTable("dbo.OrderDetails");
            DropTable("dbo.Orders");
            DropTable("dbo.Products");
            DropTable("dbo.ProductCategories");
            DropTable("dbo.Pages");
            DropTable("dbo.PostCategories");
            DropTable("dbo.Posts");
            DropTable("dbo.PostTags");
            DropTable("dbo.Tags");
            DropTable("dbo.ProductTags");
            DropTable("dbo.Slides");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Slides",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Description = c.String(maxLength: 256),
                        Image = c.String(maxLength: 256),
                        Url = c.String(maxLength: 256),
                        DisplayOrder = c.Int(),
                        Status = c.Boolean(nullable: false),
                        Content = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.ProductTags",
                c => new
                    {
                        ProductID = c.Int(nullable: false),
                        TagID = c.String(nullable: false, maxLength: 50, unicode: false),
                    })
                .PrimaryKey(t => new { t.ProductID, t.TagID });
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        ID = c.String(nullable: false, maxLength: 50, unicode: false),
                        Name = c.String(nullable: false, maxLength: 50),
                        Type = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.PostTags",
                c => new
                    {
                        PostID = c.Int(nullable: false),
                        TagID = c.String(nullable: false, maxLength: 50, unicode: false),
                    })
                .PrimaryKey(t => new { t.PostID, t.TagID });
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256, unicode: false),
                        CategoryID = c.Int(nullable: false),
                        Image = c.String(maxLength: 256),
                        Description = c.String(maxLength: 500),
                        Content = c.String(),
                        HomeFlag = c.Boolean(),
                        HotFlag = c.Boolean(),
                        ViewCount = c.Int(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        MetaKeyWord = c.String(maxLength: 256),
                        MetaDescription = c.String(maxLength: 256),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.PostCategories",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256, unicode: false),
                        Description = c.String(maxLength: 500),
                        ParentID = c.Int(),
                        DisplayOrder = c.Int(),
                        Image = c.String(maxLength: 256),
                        HomeFlag = c.Boolean(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        MetaKeyWord = c.String(maxLength: 256),
                        MetaDescription = c.String(maxLength: 256),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Pages",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256, unicode: false),
                        Content = c.String(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        MetaKeyWord = c.String(maxLength: 256),
                        MetaDescription = c.String(maxLength: 256),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.ProductCategories",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256),
                        Description = c.String(maxLength: 500),
                        ParentID = c.Int(),
                        DisplayOrder = c.Int(),
                        Image = c.String(maxLength: 256),
                        HomeFlag = c.Boolean(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        MetaKeyWord = c.String(maxLength: 256),
                        MetaDescription = c.String(maxLength: 256),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Alias = c.String(nullable: false, maxLength: 256),
                        CategoryID = c.Int(nullable: false),
                        Image = c.String(maxLength: 256),
                        MoreImages = c.String(storeType: "xml"),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        PromotionPrice = c.Decimal(precision: 18, scale: 2),
                        Warranty = c.Int(),
                        Description = c.String(maxLength: 500),
                        Content = c.String(),
                        HomeFlag = c.Boolean(),
                        HotFlag = c.Boolean(),
                        ViewCount = c.Int(),
                        Tags = c.String(),
                        Quantity = c.Int(nullable: false),
                        OriginalPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 256),
                        UpdateDate = c.DateTime(),
                        UpdateBy = c.String(maxLength: 256),
                        MetaKeyWord = c.String(maxLength: 256),
                        MetaDescription = c.String(maxLength: 256),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CustomerName = c.String(nullable: false, maxLength: 256),
                        CustomerAddress = c.String(nullable: false, maxLength: 256),
                        CustomerEmail = c.String(nullable: false, maxLength: 256),
                        CustomerMobile = c.String(nullable: false, maxLength: 50),
                        CustomerMessage = c.String(nullable: false, maxLength: 256),
                        PaymentMethod = c.String(maxLength: 256),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(),
                        PaymentStatus = c.String(),
                        Status = c.Boolean(nullable: false),
                        CustomerId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.OrderDetails",
                c => new
                    {
                        OrderID = c.Int(nullable: false),
                        ProductID = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => new { t.OrderID, t.ProductID });
            
            CreateIndex("dbo.ProductTags", "TagID");
            CreateIndex("dbo.ProductTags", "ProductID");
            CreateIndex("dbo.PostTags", "TagID");
            CreateIndex("dbo.PostTags", "PostID");
            CreateIndex("dbo.Posts", "CategoryID");
            CreateIndex("dbo.Products", "CategoryID");
            CreateIndex("dbo.Orders", "CustomerId");
            CreateIndex("dbo.OrderDetails", "ProductID");
            CreateIndex("dbo.OrderDetails", "OrderID");
            AddForeignKey("dbo.ProductTags", "TagID", "dbo.Tags", "ID", cascadeDelete: true);
            AddForeignKey("dbo.ProductTags", "ProductID", "dbo.Products", "ID", cascadeDelete: true);
            AddForeignKey("dbo.PostTags", "TagID", "dbo.Tags", "ID", cascadeDelete: true);
            AddForeignKey("dbo.PostTags", "PostID", "dbo.Posts", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Posts", "CategoryID", "dbo.PostCategories", "ID", cascadeDelete: true);
            AddForeignKey("dbo.OrderDetails", "ProductID", "dbo.Products", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Products", "CategoryID", "dbo.ProductCategories", "ID", cascadeDelete: true);
            AddForeignKey("dbo.OrderDetails", "OrderID", "dbo.Orders", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Orders", "CustomerId", "dbo.ApplicationUsers", "Id");
        }
    }
}
