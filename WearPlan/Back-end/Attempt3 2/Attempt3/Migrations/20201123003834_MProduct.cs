using Microsoft.EntityFrameworkCore.Migrations;

namespace Attempt3.Migrations
{
    public partial class MProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    idBrand = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    brand = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brand", x => x.idBrand);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    idCategory = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.idCategory);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    idClient = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shopName = table.Column<string>(nullable: true),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true),
                    idWardrobe = table.Column<int>(nullable: false),
                    discount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.idCustomer);
                });

            migrationBuilder.CreateTable(
                name: "Discount",
                columns: table => new
                {
                    idDiscount = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProduct = table.Column<int>(nullable: false),
                    discount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discount", x => x.idDiscount);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    idProduct = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCategory = table.Column<int>(nullable: false),
                    model = table.Column<string>(nullable: true),
                    idSize = table.Column<int>(nullable: false),
                    sex = table.Column<string>(nullable: true),
                    image = table.Column<string>(nullable: true),
                    price = table.Column<int>(nullable: false),
                    description = table.Column<string>(nullable: true),
                    specs = table.Column<string>(nullable: true),
                    idBrand = table.Column<int>(nullable: false),
                    idClient = table.Column<int>(nullable: false),
                    idDiscount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.idProduct);
                });

            migrationBuilder.CreateTable(
                name: "ProductBrand",
                columns: table => new
                {
                    idProductBrand = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProduct = table.Column<int>(nullable: false),
                    idBrand = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductBrand", x => x.idProductBrand);
                });

            migrationBuilder.CreateTable(
                name: "ProductCategory",
                columns: table => new
                {
                    idProductCategory = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCategory = table.Column<int>(nullable: false),
                    idProduct = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategory", x => x.idProductCategory);
                });

            migrationBuilder.CreateTable(
                name: "ProductPurchase",
                columns: table => new
                {
                    idProductPurchase = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProduct = table.Column<int>(nullable: false),
                    idPurchase = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPurchase", x => x.idProductPurchase);
                });

            migrationBuilder.CreateTable(
                name: "ProductSize",
                columns: table => new
                {
                    idProductSize = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProduct = table.Column<int>(nullable: false),
                    idSize = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductSize", x => x.idProductSize);
                });

            migrationBuilder.CreateTable(
                name: "Purchase",
                columns: table => new
                {
                    idPurchase = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCustomer = table.Column<int>(nullable: false),
                    idProduct = table.Column<int>(nullable: false),
                    date = table.Column<string>(nullable: true)
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idWardrobe = table.Column<int>(nullable: false),
                    idProduct = table.Column<int>(nullable: false),
                    idDiscount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Selection", x => x.idSelection);
                });

            migrationBuilder.CreateTable(
                name: "Size",
                columns: table => new
                {
                    idSize = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    size = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Size", x => x.idSize);
                });

            migrationBuilder.CreateTable(
                name: "Subscriber",
                columns: table => new
                {
                    idSubscriber = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idClient = table.Column<int>(nullable: false),
                    status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriber", x => x.idSubscriber);
                });

            migrationBuilder.CreateTable(
                name: "Wardrobe",
                columns: table => new
                {
                    idWardrobe = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCustomer = table.Column<int>(nullable: false),
                    idProduct = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wardrobe", x => x.idWardrobe);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Brand");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Discount");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "ProductBrand");

            migrationBuilder.DropTable(
                name: "ProductCategory");

            migrationBuilder.DropTable(
                name: "ProductPurchase");

            migrationBuilder.DropTable(
                name: "ProductSize");

            migrationBuilder.DropTable(
                name: "Purchase");

            migrationBuilder.DropTable(
                name: "Selection");

            migrationBuilder.DropTable(
                name: "Size");

            migrationBuilder.DropTable(
                name: "Subscriber");

            migrationBuilder.DropTable(
                name: "Wardrobe");
        }
    }
}
