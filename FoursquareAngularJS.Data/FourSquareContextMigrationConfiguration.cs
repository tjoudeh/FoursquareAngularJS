using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{
    class FourSquareContextMigrationConfiguration : DbMigrationsConfiguration<FourSquareContext>
    {
        public FourSquareContextMigrationConfiguration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;

        }

    }
}
