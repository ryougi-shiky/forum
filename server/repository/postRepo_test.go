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

var _ = Describe("PostRepository", func() {
	var (
		db   *gorm.DB
		mock sqlmock.Sqlmock
		repo *PostRepository
	)

	BeforeEach(func() {
		var sqlDB *sql.DB
		var err error

		sqlDB, mock, err = sqlmock.New()
		Expect(err).NotTo(HaveOccurred())

		mock.ExpectQuery(regexp.QuoteMeta("SELECT VERSION()")).WillReturnRows(sqlmock.NewRows([]string{"version"}).AddRow("5.7.28"))

		db, err = gorm.Open(mysql.New(mysql.Config{
			Conn: sqlDB,
		}), &gorm.Config{})
		Expect(err).ShouldNot(HaveOccurred())

		repo = &PostRepository{Db: db}
	})

	It("should successfully create a post", func() {
		post := &model.Post{
			PostID:      "post_id_1",
			UID:         "user_id_1",
			Username:    "testuser",
			Description: "Test Description",
		}

		mock.ExpectBegin()
		mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `posts` (`post_id`,`uid`,`username`,`description`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?)")).
			WithArgs(post.PostID, post.UID, post.Username, post.Description, sqlmock.AnyArg(), sqlmock.AnyArg()).
			WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectCommit()

		err := repo.CreatePost(post)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should successfully update a post", func() {
		postID := "post_id_1"
		updatedData := map[string]interface{}{
			"username":    "updatedUser",
			"description": "Updated Description",
		}

		mock.ExpectBegin()
		mock.ExpectExec(regexp.QuoteMeta("UPDATE `posts` SET `description`=?,`username`=?,`updated_at`=? WHERE post_id = ?")).
			WithArgs(updatedData["description"], updatedData["username"], sqlmock.AnyArg(), postID).
			WillReturnResult(sqlmock.NewResult(0, 1))
		mock.ExpectCommit()

		err := repo.UpdatePost(postID, updatedData)

		Expect(err).ShouldNot(HaveOccurred())

		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should successfully delete a post", func() {
		postID := "post_id_1"

		mock.ExpectBegin()
		mock.ExpectExec(regexp.QuoteMeta("DELETE FROM `posts` WHERE post_id = ?")).
			WithArgs(postID).
			WillReturnResult(sqlmock.NewResult(0, 1))
		mock.ExpectCommit()

		err := repo.DeletePost(postID)

		Expect(err).ShouldNot(HaveOccurred())

		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should successfully retrieve a post", func() {
		postID := "post_id_1"
		mockPost := model.Post{
			PostID:      postID,
			UID:         "user_id_1",
			Username:    "testuser",
			Description: "Test Description",
		}

		// set up mock data
		rows := sqlmock.NewRows([]string{"post_id", "uid", "username", "description"}).
			AddRow(mockPost.PostID, mockPost.UID, mockPost.Username, mockPost.Description)
		mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `posts` WHERE post_id = ? ORDER BY `posts`.`post_id` LIMIT 1")).
			WithArgs(postID).
			WillReturnRows(rows)

		post, err := repo.GetPost(postID)

		Expect(err).ShouldNot(HaveOccurred())
		Expect(post).ShouldNot(BeNil())
		Expect(post.PostID).To(Equal(postID))
		Expect(post.UID).To(Equal(mockPost.UID))
		Expect(post.Username).To(Equal(mockPost.Username))
		Expect(post.Description).To(Equal(mockPost.Description))

		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should successfully retrieve a user's all posts", func() {
		userID := "user_id_1"
		mockPosts := []model.Post{
			{PostID: "post_id_1", UID: userID, Username: "testuser1", Description: "Test Description 1"},
			{PostID: "post_id_2", UID: userID, Username: "testuser1", Description: "Test Description 2"},
		}

		rows := sqlmock.NewRows([]string{"post_id", "uid", "username", "description"})
		for _, p := range mockPosts {
			rows.AddRow(p.PostID, p.UID, p.Username, p.Description)
		}

		mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `posts` WHERE uid = ?")).
			WithArgs(userID).
			WillReturnRows(rows)

		posts, err := repo.GetUserPosts(userID)

		Expect(err).ShouldNot(HaveOccurred())
		Expect(posts).Should(HaveLen(2))
		for i, p := range posts {
			Expect(p.PostID).To(Equal(mockPosts[i].PostID))
			Expect(p.UID).To(Equal(userID))
			Expect(p.Username).To(Equal(mockPosts[i].Username))
			Expect(p.Description).To(Equal(mockPosts[i].Description))
		}

		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should like a post if not already liked", func() {
		postID := "post_id_1"
		userID := "user_id_1"

		mock.ExpectBegin()
		mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `post_likes` WHERE post_id = ? AND user_id = ?")).
			WithArgs(postID, userID).
			WillReturnError(gorm.ErrRecordNotFound)

		mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `post_likes` (`post_id`,`user_id`) VALUES (?,?)")).
			WithArgs(postID, userID).
			WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectCommit()

		err := repo.ToggleLike(postID, userID)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should remove like if already liked", func() {
		postID := "b2cbd29c-9e3d-11ee-8c90-0242ac120002"
		userID := "b2cbd29c-9e3d-11ee-8c90-0242ac120001"

		// Expect a database transaction to begin
		mock.ExpectBegin()

		// Expect the query to check if the like already exists
		rows := sqlmock.NewRows([]string{"post_id", "user_id"}).AddRow(postID, userID)
		mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `post_likes` WHERE post_id = ? AND user_id = ?")).
			WithArgs(postID, userID).
			WillReturnRows(rows)

		// Expect the delete operation for the existing like
		mock.ExpectExec(regexp.QuoteMeta("DELETE FROM `post_likes` WHERE")).
			WithArgs(postID, userID).
			WillReturnResult(sqlmock.NewResult(0, 1))

		// Expect the database transaction to commit
		mock.ExpectCommit()

		err := repo.ToggleLike(postID, userID)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should successfully add a comment to a post", func() {
		comment := &model.Comment{
			CommentID:   "comment_id_1",
			PostID:      "post_id_1",
			UserID:      "user_id_1",
			CommentText: "Test comment",
		}

		// Expect a database transaction to begin
		mock.ExpectBegin()

		// Expect the insert operation for the new comment
		mock.ExpectExec(regexp.QuoteMeta("INSERT INTO `comments` (`comment_id`,`post_id`,`user_id`,`comment_text`,`created_at`) VALUES (?,?,?,?,?)")).
			WithArgs(comment.CommentID, comment.PostID, comment.UserID, comment.CommentText, sqlmock.AnyArg()).
			WillReturnResult(sqlmock.NewResult(1, 1))

		// Expect the database transaction to commit
		mock.ExpectCommit()

		err := repo.AddComment(comment)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
	It("should retrieve all comments for a post", func() {
		postID := "post_id_1"

		rows := sqlmock.NewRows([]string{"comment_id", "post_id", "user_id", "comment_text", "created_at"}).
			AddRow("comment_id_1", postID, "user_id_1", "Test comment 1", time.Now()).
			AddRow("comment_id_2", postID, "user_id_2", "Test comment 2", time.Now())

		mock.ExpectQuery(regexp.QuoteMeta("SELECT * FROM `comments` WHERE post_id = ?")).
			WithArgs(postID).
			WillReturnRows(rows)

		comments, err := repo.GetPostComments(postID)
		Expect(err).ShouldNot(HaveOccurred())
		Expect(comments).Should(HaveLen(2))
		Expect(comments[0].CommentID).To(Equal("comment_id_1"))
		Expect(comments[1].CommentID).To(Equal("comment_id_2"))
		Expect(mock.ExpectationsWereMet()).ShouldNot(HaveOccurred())
	})
})
