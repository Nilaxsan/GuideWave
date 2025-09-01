using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GuideWave.Migrations
{
    /// <inheritdoc />
    public partial class review : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "timestamp",
                table: "Reviews",
                newName: "Timestamp");

            migrationBuilder.AddColumn<int>(
                name: "GuideId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TouristId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_GuideId",
                table: "Reviews",
                column: "GuideId");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_TouristId",
                table: "Reviews",
                column: "TouristId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Guides_GuideId",
                table: "Reviews",
                column: "GuideId",
                principalTable: "Guides",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Tourists_TouristId",
                table: "Reviews",
                column: "TouristId",
                principalTable: "Tourists",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Guides_GuideId",
                table: "Reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Tourists_TouristId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_GuideId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_TouristId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "GuideId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "TouristId",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Reviews",
                newName: "timestamp");
        }
    }
}
