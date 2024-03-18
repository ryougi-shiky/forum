package service

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestService(t *testing.T) {
	RegisterFailHandler(Fail) // 注册 Gomega 的失败处理器
	RunSpecs(t, "Repository Suite")
}