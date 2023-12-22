package repository

import (
	"database/sql"
	"regexp"
	"server/model"
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
				WillReturnRows(sqlmock.NewRows([]string{"user_id", "username"}).AddRow(1, username))

			user, err := repo.FindByUsername(username)
			Expect(err).ShouldNot(HaveOccurred())
			Expect(user.Username).To(Equal(username))
		})
		It("should successfully find the user by email", func() {
			email := "test@example.com"
			mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `users` WHERE email = ?")).
				WithArgs(email).
				WillReturnRows(sqlmock.NewRows([]string{"user_id", "email"}).AddRow(1, email))

			user, err := repo.FindByEmail(email)
			Expect(err).ShouldNot(HaveOccurred())
			Expect(user.Email).To(Equal(email))
		})
		It("should successfully create a new user", func() {
			newUser := &model.User{
				UserID:         "b2cbd29c-9e3d-11ee-8c90-0242ac120002",
				Username:       "testuser",
				Email:          "test@example.com",
				Password:       "testpassword",
				ProfilePicture: []byte("testprofilepicture"),
				IsAdmin:        false,
				CreatedAt:      time.Now(),
				UpdatedAt:      time.Now(),
			}

			mock.ExpectBegin()
			mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `users` (`user_id`,`username`,`email`,`password`,`profile_picture`,`is_admin`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?)")).
				WithArgs(newUser.UserID, newUser.Username, newUser.Email, newUser.Password, newUser.ProfilePicture, newUser.IsAdmin, sqlmock.AnyArg(), sqlmock.AnyArg()).
				WillReturnResult(sqlmock.NewResult(1, 1))
			mock.ExpectCommit()

			err := repo.Create(newUser)
			Expect(err).ShouldNot(HaveOccurred())
		})
		It("should successfully delete a user", func() {
			userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"

			mock.ExpectBegin()
			mock.ExpectExec(regexp.QuoteMeta("DELETE FROM `users` WHERE `users`.`user_id` = ?")).
				WithArgs(userID).
				WillReturnResult(sqlmock.NewResult(0, 1))
			mock.ExpectCommit()

			err := repo.DeleteUser(userID)
			Expect(err).ShouldNot(HaveOccurred())

			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should retrieve followers successfully", func() {
			user_id := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
			// Mocking the expected query
			rows := sqlmock.NewRows([]string{"follower_id", "follower_name", "profile_picture"}).
				AddRow("follower_id_1", "followerUser", []byte("profilepicture"))
			mock.ExpectQuery(regexp.QuoteMeta(
				"SELECT user_followers.follower_id, users.username as follower_name, users.profile_picture " +
					"FROM `user_followers` join users on users.user_id = user_followers.follower_id " +
					"WHERE user_followers.user_id = ?")).
				WithArgs(user_id).
				WillReturnRows(rows)

			// Calling the method
			followers, err := repo.GetFollowers(user_id)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())
			Expect(followers).ShouldNot(BeEmpty())
			Expect(followers[0].FollowerID).To(Equal("follower_id_1"))
			Expect(followers[0].FollowerName).To(Equal("followerUser"))
			Expect(followers[0].ProfilePicture).To(Equal([]byte("profilepicture")))

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should successfully create a follow relationship", func() {
			userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
			followerID := "b2cbd29c-9e3d-11ee-8c90-0242ac120003"

			// Expect a BEGIN transaction
			// mock.ExpectBegin()

			// Expect the insert query
			mock.ExpectExec(regexp.QuoteMeta("INSERT INTO user_followers (user_id, follower_id) VALUES (?, ?)")).
				WithArgs(userID, followerID).
				WillReturnResult(sqlmock.NewResult(1, 1)) // Assuming 1 row is affected

			// Expect a COMMIT transaction
			// mock.ExpectCommit()

			// Call the method
			err := repo.Follow(userID, followerID)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should successfully unfollow a user", func() {
			userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
			followerID := "b2cbd29c-9e3d-11ee-8c90-0242ac120003"

			// Expect the delete query
			mock.ExpectExec(regexp.QuoteMeta("DELETE FROM user_followers WHERE user_id = ? AND follower_id = ?")).
				WithArgs(userID, followerID).
				WillReturnResult(sqlmock.NewResult(0, 1)) // Assuming 1 row is affected

			// Call the method
			err := repo.Unfollow(userID, followerID)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should successfully update a user's profile picture with transactions", func() {
			userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
			newProfilePicture := []byte("new_picture")

			// Mocking the transaction begin
			mock.ExpectBegin()

			// Mocking the expected database operation
			mock.ExpectExec(regexp.QuoteMeta("UPDATE `users` SET `profile_picture`=?,`updated_at`=? WHERE user_id = ?")).
				WithArgs(newProfilePicture, sqlmock.AnyArg(), userID).
				WillReturnResult(sqlmock.NewResult(0, 1)) // Assuming 1 row is affected

			// Mocking the transaction commit
			mock.ExpectCommit()

			// Calling the method
			err := repo.UpdateProfilePicture(userID, newProfilePicture)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})
		It("should successfully update a user's profile", func() {
			userProfile := &model.UserProfile{
				UserID:   "b2cbd29c-9e3d-11ee-8c90-0242ac120002",
				Age:      30,
				Location: "New York",
			}

			// Mocking the transaction begin
			mock.ExpectBegin()

			// Adjust the expected SQL query to match GORM's generated query
			mock.ExpectExec(regexp.QuoteMeta("UPDATE `user_profiles` SET `age`=?,`location`=? WHERE user_id = ? AND `user_id` = ?")).
				WithArgs(userProfile.Age, userProfile.Location, userProfile.UserID, userProfile.UserID).
				WillReturnResult(sqlmock.NewResult(0, 1)) // Assuming 1 row is affected

			// Mocking the transaction commit
			mock.ExpectCommit()

			// Calling the method
			err := repo.UpdateUserProfile(userProfile)

			// Assertions
			Expect(err).ShouldNot(HaveOccurred())

			// Verify that all expectations were met
			Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
		})

	})
})
