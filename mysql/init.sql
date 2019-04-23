DROP DATABASE IF EXISTS `LLLyh_BBS`;
CREATE DATABASE `LLLyh_BBS`;
USE `LLLyh_BBS`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- token
-- ----------------------------
DROP TABLE IF EXISTS `bbs_token`;
CREATE TABLE `bbs_token` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL COMMENT '所属用户',
  `bbs_token` VARCHAR(1024) DEFAULT NULL,
  `phone_token` VARCHAR(1024) DEFAULT NULL,
  `admin_token` VARCHAR(1024) DEFAULT NULL,
  `bbs_addr` VARCHAR(48) DEFAULT NULL,
  `phone_addr` VARCHAR(48) DEFAULT NULL,
  `admin_addr` VARCHAR(48) DEFAULT NULL,
  `bbs_device` VARCHAR(48) DEFAULT NULL,
  `phone_device` VARCHAR(48) DEFAULT NULL,
  `admin_device` VARCHAR(48) DEFAULT NULL,
  `bbs_ip` VARCHAR(48) DEFAULT NULL,
  `phone_ip` VARCHAR(48) DEFAULT NULL,
  `admin_ip` VARCHAR(48) DEFAULT NULL,
  `bbs_expire_time` datetime DEFAULT NULL,
  `phone_expire_time` datetime DEFAULT NULL,
  `admin_expire_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='token表';

-- ----------------------------
-- user
-- ----------------------------
DROP TABLE IF EXISTS `bbs_user`;
CREATE TABLE `bbs_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) COMMENT '关联角色',
  `account` VARCHAR(48) NOT NULL COMMENT '用户账号',
  `name` VARCHAR(24) NOT NULL COMMENT '用户昵称',
  `password` VARCHAR(48) NOT NULL COMMENT '用户密码',
  `type` TINYINT(4) NOT NULL COMMENT '用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加',
  `sex` TINYINT(4) DEFAULT NULL COMMENT '性别: 0:男 1:女',
  `avatar` VARCHAR(128) DEFAULT NULL COMMENT '头像',
  `phone` VARCHAR(24) DEFAULT NULL COMMENT '手机号',
  `wechat` VARCHAR(24) DEFAULT NULL COMMENT '微信',
  `qq` VARCHAR(24) DEFAULT NULL COMMENT 'qq',
  `email` VARCHAR(48) DEFAULT NULL COMMENT '邮箱',
  `desc` VARCHAR(48) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------
-- bbs_user_role
-- ----------------------------
DROP TABLE IF EXISTS `bbs_user_role`;
CREATE TABLE `bbs_user_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户关系表';

-- ----------------------------
-- bbs_role
-- ----------------------------
DROP TABLE IF EXISTS `bbs_role`;
CREATE TABLE `bbs_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) NOT NULL,
  `name` VARCHAR(24) NOT NULL COMMENT '角色名称',
  `columns` INT(11) DEFAULT '1' COMMENT '专栏数量, -1为无限',
  `users` INT(11) DEFAULT '10' COMMENT '可创建多少个用户, -1为无限',
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- ----------------------------
-- bbs_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `bbs_role_menu`;
CREATE TABLE `bbs_role_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `menu_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='角色菜单关系表';

-- ----------------------------
-- bbs_role_data_perms
-- ----------------------------
DROP TABLE IF EXISTS `bbs_role_data_perms`;
CREATE TABLE `bbs_role_data_perms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `data_perms_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='角色数据权限关系表';

-- ----------------------------
-- bbs_menu
-- ----------------------------
DROP TABLE IF EXISTS `bbs_menu`;
CREATE TABLE `bbs_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) DEFAULT '0',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '菜单类型: 1. 管理平台菜单 2. BBS菜单 3. 移动端菜单',
  `code` VARCHAR(48) NOT NULL COMMENT '菜单编码',
  `name` VARCHAR(48) NOT NULL COMMENT '菜单名称',
  `component` tinyint(4) NOT NULL COMMENT '对应组件: -1. 根节点 1. 页面组件 2.默认布局 3456...扩展布局',
  `icon` VARCHAR(128) DEFAULT NULL COMMENT '菜单图标',
  `alias` VARCHAR(128) DEFAULT NULL COMMENT '别名',
  `redirect` VARCHAR(128) DEFAULT NULL COMMENT '重定向路径: 配置菜单编码或URL',
  `sort` INT(11) NOT NULL,
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- ----------------------------
-- bbs_data_perms
-- ----------------------------
DROP TABLE IF EXISTS `bbs_data_perms`;
CREATE TABLE `bbs_data_perms` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `menu_id` INT(11) NOT NULL,
  `name` VARCHAR(48) NOT NULL COMMENT '名称',
  `code` VARCHAR(48) NOT NULL COMMENT '编码',
  `type` tinyint(4) NOT NULL COMMENT '按钮或者其他',
  `api` VARCHAR(24) NOT NULL COMMENT '接口',
  `method` tinyint(4) NOT NULL COMMENT '请求方式 1: GET 2: POST 3: PUT 4. DELETE',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='数据权限表';

----------------------------
-- bbs_area
----------------------------
DROP TABLE IF EXISTS `bbs_area`;
CREATE TABLE `bbs_area` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(48) NOT NULL COMMENT '区域名称',
  `pid` INT(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='区域表';

----------------------------
-- bbs_log
----------------------------
DROP TABLE IF EXISTS `bbs_log`;
CREATE TABLE `bbs_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `origin` INT(11) NOT NULL COMMENT '日志来源: 0: 手机 1: 论坛 2: 管理平台',
  `type` INT(11) NOT NULL COMMENT '日志类型: 1.用户登录 2. 用户登出 3. 菜单访问 4.功能操作',
  `title` VARCHAR(48) DEFAULT NULL COMMENT '日志标题',
  `desc` VARCHAR(48) DEFAULT NULL COMMENT '日志描述',
  `ip` VARCHAR(48) DEFAULT NULL COMMENT '访问IP',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='日志表';

----------------------------
-- bbs_folder
----------------------------
DROP TABLE IF EXISTS `bbs_folder`;
CREATE TABLE `bbs_folder` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) NOT NULL,
  `name` VARCHAR(48) NOT NULL COMMENT '目录名称',
  `path` varchar(256) NOT NULL COMMENT '目录路径',
  `type` INT(11) NOT NULL COMMENT '目录类型: 1.文件 2.图片 3.音乐 4.视频',
  `desc` VARCHAR(128) DEFAULT NULL COMMENT '目录描述',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文件目录表';

----------------------------
-- bbs_file
----------------------------
DROP TABLE IF EXISTS `bbs_file`;
CREATE TABLE `bbs_file` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `f_id` INT(11) NOT NULL COMMENT '文件目录ID',
  `name` VARCHAR(48) NOT NULL COMMENT '文件名称',
  `type` INT(11) NOT NULL COMMENT '文件类型: 1.文件 2.图片 3.音乐 4.视频',
  `path` varchar(256) NOT NULL COMMENT '文件路径',
  `suffix` VARCHAR(24) NOT NULL COMMENT '文件后缀',
  `size` INT(11) NOT NULL COMMENT '文件大小',
  `desc` VARCHAR(128) DEFAULT NULL COMMENT '文件描述',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文件表';

----------------------------
-- bbs_tag_type
----------------------------
DROP TABLE IF EXISTS `bbs_tag_type`;
CREATE TABLE `bbs_tag_type` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(48) NOT NULL COMMENT '名称',
  `icon` varchar(256) DEFAULT NULL COMMENT '图标地址',
  `desc` VARCHAR(128) DEFAULT NULL COMMENT '描述',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='标签类型表';

----------------------------
-- bbs_tag_type_tag
----------------------------
DROP TABLE IF EXISTS `bbs_tag_type_tag`;
CREATE TABLE `bbs_tag_type_tag` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tag_id` INT(11) NOT NULL,
  `tag_type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='标签关联类型表';

----------------------------
-- bbs_tag
----------------------------
DROP TABLE IF EXISTS `bbs_tag`;
CREATE TABLE `bbs_tag` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(48) NOT NULL COMMENT '名称',
  `icon` varchar(256) DEFAULT NULL COMMENT '图标地址',
  `wikipedia` text DEFAULT NULL COMMENT '标签百科',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='标签表';

----------------------------
-- bbs_column
----------------------------
DROP TABLE IF EXISTS `bbs_column`;
CREATE TABLE `bbs_column` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` INT(11) NOT NULL COMMENT '专栏名称',
  `url` VARCHAR(128) NOT NULL COMMENT '专栏地址',
  `sort` INT(11) NOT NULL,
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：草稿 2: 审核中 3: 通过 4: 未通过 5: 禁止（封禁）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='专栏表';

----------------------------
-- bbs_column_focus
----------------------------
DROP TABLE IF EXISTS `bbs_column_focus`;
CREATE TABLE `bbs_column_focus` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `column_id` INT(11) DEFAULT NULL COMMENT '专栏ID',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：取消关注，1：关注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='专栏关注表';

----------------------------
-- bbs_article
----------------------------
DROP TABLE IF EXISTS `bbs_article`;
CREATE TABLE `bbs_article` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `column_id` INT(11) DEFAULT NULL COMMENT '专栏ID',
  `title` INT(11) NOT NULL COMMENT '文章标题',
  `type` INT(11) NOT NULL COMMENT '类型: 1: 原创 2：转载 3：翻译',
  `url` INT(11) NOT NULL COMMENT '文章内容存放地址',
  `view_count` INT(11) DEFAULT 0 COMMENT '浏览次数',
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` INT(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：草稿 2: 审核中 3: 通过 4: 未通过 5: 禁止（封禁）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

----------------------------
-- bbs_article_comments
----------------------------
DROP TABLE IF EXISTS `bbs_article_comments`;
CREATE TABLE `bbs_article_comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) DEFAULT NULL COMMENT '父节点评论',
  `article_id` INT(11) DEFAULT NULL COMMENT '文章ID',
  `content` VARCHAR(256) NOT NULL COMMENT '评论内容',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文章评论表';

----------------------------
-- bbs_article_tag
----------------------------
DROP TABLE IF EXISTS `bbs_article_tag`;
CREATE TABLE `bbs_article_tag` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `article_id` INT(11) DEFAULT NULL COMMENT '文章ID',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文章标签表';

----------------------------
-- bbs_like
----------------------------
DROP TABLE IF EXISTS `bbs_like`;
CREATE TABLE `bbs_like` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `article_id` INT(11) DEFAULT NULL COMMENT '文章ID',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：取消赞，1：点赞',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='点赞表';

----------------------------
-- bbs_collect
----------------------------
DROP TABLE IF EXISTS `bbs_collect`;
CREATE TABLE `bbs_collect` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `article_id` INT(11) DEFAULT NULL COMMENT '文章ID',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：取消收藏，1：收藏',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='收藏表';
