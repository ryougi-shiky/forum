package service_test

import (
	"database/sql"
	"server/model"
	. "server/repository"
	. "server/service"

	"github.com/DATA-DOG/go-sqlmock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var _ = Describe("UserService", func() {
	var (
		db          *gorm.DB
		userRepo    *UserRepository
		userService *UserService
	)

	BeforeEach(func() {
		var dbConn *sql.DB
		var err error
		var mockDB sqlmock.Sqlmock
		dbConn, mockDB, err = sqlmock.New() // 创建模拟的 SQL 数据库连接
		Expect(err).ShouldNot(HaveOccurred())

		dialector := mysql.New(mysql.Config{
			Conn:                      dbConn,
			SkipInitializeWithVersion: true,
		})
		db, err = gorm.Open(dialector, &gorm.Config{}) // 使用模拟的数据库连接创建 GORM DB
		Expect(err).ShouldNot(HaveOccurred())

		userRepo = NewUserRepository(db)
		userService = NewUserService(userRepo)
	})

	AfterEach(func() {
		// 测试后的清理工作
		// 例如：删除测试中创建的数据，回滚事务等
	})

	Describe("Registering a user", func() {
		Context("when the email is not already in use", func() {
			It("should successfully register a user", func() {
				_, err := userService.RegisterUser("testuser", "test@example.com", "password")
				Expect(err).ToNot(HaveOccurred())

				var user model.User
				result := db.Where("email = ?", "test@example.com").First(&user)
				Expect(result.Error).To(BeNil())
				Expect(user.Username).To(Equal("testuser"))
			})
		})

	})
})
