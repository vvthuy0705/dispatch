namespace Dispatch.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Product : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Products", "Tags");
            DropColumn("dbo.Products", "Quantity");
            DropColumn("dbo.Products", "OriginalPrice");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "OriginalPrice", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Products", "Quantity", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "Tags", c => c.String());
        }
    }
}
