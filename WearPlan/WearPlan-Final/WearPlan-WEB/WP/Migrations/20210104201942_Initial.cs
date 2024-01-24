using Microsoft.EntityFrameworkCore.Migrations;

namespace WP.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    idClient = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    email = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.idClient);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    idCustomer = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    email = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.idCustomer);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    idProduct = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    category = table.Column<string>(nullable: true),
                    model = table.Column<string>(nullable: true),
                    size = table.Column<string>(nullable: true),
                    sex = table.Column<string>(nullable: true),
                    image = table.Column<string>(nullable: true),
                    price = table.Column<decimal>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    specs = table.Column<string>(nullable: true),
                    brand = table.Column<string>(nullable: true),
                    client = table.Column<string>(nullable: true),
                    discount = table.Column<decimal>(nullable: false),
                    code = table.Column<string>(nullable: true)

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.idProduct);
                });

            migrationBuilder.CreateTable(
                name: "ProductPurchase",
                columns: table => new
                {
                    idProductPurchase = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    idProduct = table.Column<int>(nullable: false),
                    idPurchase = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPurchase", x => x.idProductPurchase);
                });

            migrationBuilder.CreateTable(
                name: "Purchase",
                columns: table => new
                {
                    idPurchase = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    idProduct = table.Column<int>(nullable: false),
                    idCustomer = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Purchase", x => x.idPurchase);
                });

            migrationBuilder.CreateTable(
                name: "Selection",
                columns: table => new
                {
                    idSelection = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    idProduct = table.Column<int>(nullable: false),
                    idDiscount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Selection", x => x.idSelection);
                });

            migrationBuilder.CreateTable(
                name: "Subscriber",
                columns: table => new
                {
                    idSubscriber = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    idClient = table.Column<int>(nullable: false),
                    status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriber", x => x.idSubscriber);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "ProductPurchase");

            migrationBuilder.DropTable(
                name: "Purchase");

            migrationBuilder.DropTable(
                name: "Selection");

            migrationBuilder.DropTable(
                name: "Subscriber");
        }
    }
}
