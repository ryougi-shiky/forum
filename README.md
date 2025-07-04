# Introduction
This is a social website. Please use Chrome to get the full experience.

The weather API key is not configured yet. Please purchase it here: https://rapidapi.com/worldapi/api/open-weather13

## Available Features:
1. Register new users
2. Log in
3. Add posts
4. Like posts
5. Add comments to a posts
6. Weather Forecast of user's location
7. Upload user icon
8. Change user info
9. Follow / Unfollow a user
10. Top bar can show the notifications of new following users
11. Search bar can find users by entering username or partial letters of the username

## Features Showcases:
1. Register, Log in, Log out

![register,login,logout](docs/assets/gif/register_login_logout.gif)

2. Update user icon and info

![update_icon_userinfo](docs/assets/gif/update_icon_userinfo.gif)

3. Write post, Like post, Add comment

![post,like,comment](docs/assets/gif/post_like_comment.gif)

4. Click other user icon, Access their profile page, Follow them, Receive new follower notification

![click_icon,follow,notify](docs/assets/gif/click_icon_follow_notify.gif)

5. Search other username, Access their profile page, Unfollow them

![search_name,unfollow](docs/assets/gif/search_name_unfollow.gif)


# User Guide

## How to run development environment
1. Make sure you have installed [Docker](https://docs.docker.com/compose/install/)
2. Modify the `deploy/docker-compose.*.yml` files to set your own environment variables.
3. Run `./auto/start-dev-environment` to 


# Architecture

Please refer to the [docs/architecture.md](docs/architecture.md) for the architecture overview.
