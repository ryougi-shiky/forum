CREATE DATABASE IF NOT EXISTS ani;
USE ani;
CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture MEDIUMBLOB,
    is_admin BOOLEAN DEFAULT false,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);
CREATE TABLE user_followers (
    user_id CHAR(36) PRIMARY KEY NOT NULL,
    follower_id CHAR(36) PRIMARY KEY NOT NULL,
    PRIMARY KEY (user_id, follower_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_follower_id (follower_id)
);
CREATE TABLE user_profiles (
    user_id CHAR(36) PRIMARY KEY NOT NULL,
    age INT,
    location VARCHAR(40),
    PRIMARY KEY (user_id)
);
CREATE TABLE posts (
    post_id CHAR(36) PRIMARY KEY,
    uid VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_uid (uid),
    INDEX idx_created_at (created_at)
);
CREATE TABLE post_likes (
    post_id CHAR(36),
    user_id CHAR(36),
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_post_id (user_id)
);
CREATE TABLE comments (
    comment_id CHAR(36) AUTO_INCREMENT PRIMARY KEY,
    post_id CHAR(36),
    user_id CHAR(36),
    comment_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

