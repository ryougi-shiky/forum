package repository

import (
	"database/sql"
	"regexp"
	"server/model"
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var _ = Describe("UserRepository", func() {

	var (
		db   *gorm.DB
		mock sqlmock.Sqlmock
		repo *UserRepository // Specify the package name before the UserRepository type
	)

	BeforeEach(func() {
		var sqlDB *sql.DB
		var err error

		// 创建sqlmock
		sqlDB, mock, err = sqlmock.New()
		Expect(err).NotTo(HaveOccurred())

		// Mock GORM初始化时的 "SELECT VERSION()" 查询
		mock.ExpectQuery(regexp.QuoteMeta("SELECT VERSION()")).WillReturnRows(sqlmock.NewRows([]string{"version"}).AddRow("5.7.28"))

		// 配置GORM以使用sqlmock
		db, err = gorm.Open(mysql.New(mysql.Config{Conn: sqlDB}), &gorm.Config{})
		Expect(err).ShouldNot(HaveOccurred())

		repo = NewUserRepository(db)
	})

	Context("Test UserRepository", func() {
		It("should successfully find the user by username", func() {
			username := "testuser"
			mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `users` WHERE username = ?")).
				WithArgs(username).
				WillReturnRows(sqlmock.NewRows([]string{"id", "username"}).AddRow(1, username))

			user, err := repo.FindByUsername(username)
			Expect(err).ShouldNot(HaveOccurred())
			Expect(user.Username).To(Equal(username))
		})
		It("should successfully find the user by email", func() {
			email := "test@example.com"
			mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `users` WHERE email = ?")).
				WithArgs(email).
				WillReturnRows(sqlmock.NewRows([]string{"id", "email"}).AddRow(1, email))

			user, err := repo.FindByEmail(email)
			Expect(err).ShouldNot(HaveOccurred())
			Expect(user.Email).To(Equal(email))
		})
		It("should successfully create a new user", func() {
			newUser := &model.User{
				ID:             "b2cbd29c-9e3d-11ee-8c90-0242ac120002",
				Username:       "testuser",
				Email:          "test@example.com",
				Password:       "testpassword",
				ProfilePicture: []byte("testprofilepicture"),
				IsAdmin:        false,
				CreatedAt:      time.Now(),
				UpdatedAt:      time.Now(),
			}

			mock.ExpectBegin()
			mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `users` (`id`,`username`,`email`,`password`,`profile_picture`,`is_admin`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)")).
				WithArgs(newUser.ID, newUser.Username, newUser.Email, newUser.Password, newUser.ProfilePicture, newUser.IsAdmin, sqlmock.AnyArg(), sqlmock.AnyArg()).
				WillReturnResult(sqlmock.NewResult(1, 1))
			mock.ExpectCommit()

			err := repo.Create(newUser)
			Expect(err).ShouldNot(HaveOccurred())
		})
		It("should successfully delete a user", func() {
			userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"

			mock.ExpectBegin()
			mock.ExpectExec(regexp.QuoteMeta("DELETE FROM `users` WHERE `users`.`id` = ?")).
				WithArgs(userID).
				WillReturnResult(sqlmock.NewResult(0, 1))
			mock.ExpectCommit()

			err := repo.DeleteUser(userID)
			Expect(err).ShouldNot(HaveOccurred())

			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should retrieve followers successfully", func() {
			id := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
			// Mocking the expected query
			rows := sqlmock.NewRows([]string{"follower_id", "follower_name", "profile_picture"}).
				AddRow("follower_id_1", "followerUser", []byte("profilepicture"))
			mock.ExpectQuery(regexp.QuoteMeta(
				"SELECT user_followers.follower_id, users.username as follower_name, users.profile_picture " +
					"FROM `user_followers` join users on users.id = user_followers.follower_id " +
					"WHERE user_followers.user_id = ?")).
				WithArgs(id).
				WillReturnRows(rows)

			// Calling the method
			followers, err := repo.GetFollowers(id)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())
			Expect(followers).ShouldNot(BeEmpty())
			Expect(followers[0].FollowerID).To(Equal("follower_id_1"))
			Expect(followers[0].FollowerName).To(Equal("followerUser"))
			Expect(followers[0].ProfilePicture).To(Equal([]byte("profilepicture")))

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
	})
})

func TestRepository(t *testing.T) {
	RegisterFailHandler(Fail) // 注册 Gomega 的失败处理器
	RunSpecs(t, "UserRepository Suite")
}
