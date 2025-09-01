using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GuideWave.Migrations
{
    /// <inheritdoc />
    public partial class Placeforeignkey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GuideId",
                table: "Places",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Places_GuideId",
                table: "Places",
                column: "GuideId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Guides_GuideId",
                table: "Places",
                column: "GuideId",
                principalTable: "Guides",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_Guides_GuideId",
                table: "Places");

            migrationBuilder.DropIndex(
                name: "IX_Places_GuideId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "GuideId",
                table: "Places");
        }
    }
}
