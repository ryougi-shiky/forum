package repository

import (
	"database/sql"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/onsi/ginkgo/v2"
	"github.com/onsi/gomega"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var _ = ginkgo.Describe("UserRepository", func() {

	var (
		db   *gorm.DB
		mock sqlmock.Sqlmock
		repo *UserRepository // Specify the package name before the UserRepository type
	)

	ginkgo.BeforeEach(func() {
		var sqlDB *sql.DB
		var err error

		// 创建sqlmock
		sqlDB, mock, err = sqlmock.New()
		gomega.Expect(err).NotTo(gomega.HaveOccurred())

		// 配置GORM以使用sqlmock
		db, err = gorm.Open(mysql.New(mysql.Config{Conn: sqlDB}), &gorm.Config{})
		gomega.Expect(err).NotTo(gomega.HaveOccurred())

		repo = NewUserRepository(db) // Use the fully qualified function name
	})

	ginkgo.Context("when finding user by username", func() {
		ginkgo.It("should find the user", func() {
			username := "testuser"
			mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `users` WHERE username = ?")).
				WithArgs(username).
				WillReturnRows(sqlmock.NewRows([]string{"id", "username"}).AddRow(1, username))

			user, err := repo.FindByUsername(username)
			gomega.Expect(err).NotTo(gomega.HaveOccurred())
			gomega.Expect(user.Username).To(gomega.Equal(username))
		})
	})
})

func TestRepository(t *testing.T) {
	ginkgo.RunSpecs(t, "UserRepository Suite")
}
