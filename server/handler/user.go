package handler

// import (
// 	"net/http"
// 	"server/service"

// 	"github.com/gin-gonic/gin"
// )

// func RegisterUserHandler(c *gin.Context, userService *service.UserService) {
//     var req struct {
//         Username string
//         Email    string
//         Password string
//     }
//     if err := c.BindJSON(&req); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     user, err := userService.RegisterUser(req.Username, req.Email, req.Password)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, user)
// }

// func AuthenticateUserHandler(c *gin.Context, userService *service.UserService) {
//     // 实现登录逻辑
// }
