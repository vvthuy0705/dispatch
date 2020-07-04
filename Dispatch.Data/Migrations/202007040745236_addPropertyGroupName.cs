namespace Dispatch.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPropertyGroupName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "GroupName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "GroupName");
        }
    }
}
