-- 初始化数据库
DROP DATABASE IF EXISTS `LLLyh_BBS`;
CREATE DATABASE `LLLyh_BBS`;
USE `LLLyh_BBS`;

SET FOREIGN_KEY_CHECKS=0; -- 禁止外键约束

-- ----------------------------
-- token表
-- ----------------------------
DROP TABLE IF EXISTS `bbs_token`;
CREATE TABLE `bbs_token` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL COMMENT '所属用户',
  `bbs_token` VARCHAR(512) DEFAULT NULL,
  `phone_token` VARCHAR(512) DEFAULT NULL,
  `admin_token` VARCHAR(512) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='token表';

-- ----------------------------
-- 用户表
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
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------
-- 角色表
-- ----------------------------
DROP TABLE IF EXISTS `bbs_role`;
CREATE TABLE `bbs_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) DEFAULT '0',
  `name` VARCHAR(24) NOT NULL COMMENT '角色名称',
  `columns` INT(11) DEFAULT '1' COMMENT '专栏数量, 0为无限',
  `users` INT(11) DEFAULT '10' COMMENT '可创建多少个用户, 0为无限',
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- ----------------------------
-- 角色功能关系表
-- ----------------------------
DROP TABLE IF EXISTS `bbs_role_mod`;
CREATE TABLE `bbs_role_mod` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `mod_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='角色功能关系表';

-- ----------------------------
-- 功能模块表
-- ----------------------------
DROP TABLE IF EXISTS `bbs_mod`;
CREATE TABLE `bbs_mod` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) DEFAULT '0',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '模块类型: 1. 管理平台模块 2. BBS模块 3. 移动端模块',
  `code` VARCHAR(48) NOT NULL COMMENT '模块编码',
  `name` VARCHAR(48) NOT NULL COMMENT '模块名称',
  `icon` VARCHAR(128) DEFAULT NULL COMMENT '模块图标',
  `redirect` VARCHAR(128) DEFAULT NULL COMMENT '重定向路径: 配置模块编码或URL',
  `sort` INT(11) NOT NULL,
  `desc` VARCHAR(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='模块表';

-- ----------------------------
-- 数据权限表
-- ----------------------------
DROP TABLE IF EXISTS `bbs_mod_data`;
CREATE TABLE `bbs_mod_data` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mod_id` INT(11) NOT NULL,
  `name` VARCHAR(48) NOT NULL COMMENT '名称',
  `code` VARCHAR(48) NOT NULL COMMENT '编码',
  `type` VARCHAR(48) NOT NULL COMMENT '按钮或者其他',
  `method` VARCHAR(24) NOT NULL COMMENT '请求方式',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='数据权限表';

----------------------------
-- 专栏表
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='专栏表';

----------------------------
-- 文件目录表
----------------------------
DROP TABLE IF EXISTS `bbs_directory`;
CREATE TABLE `bbs_directory` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) NOT NULL,
  `name` VARCHAR(48) NOT NULL COMMENT '目录名称',
  `type` INT(11) NOT NULL COMMENT '目录类型: 1.文件 2.图片 3.音乐 4.视频',
  `desc` VARCHAR(128) DEFAULT NULL COMMENT '目录描述',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文件目录表';

----------------------------
-- 文件表
----------------------------
DROP TABLE IF EXISTS `bbs_file`;
CREATE TABLE `bbs_file` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `pid` INT(11) NOT NULL,
  `name` VARCHAR(48) NOT NULL COMMENT '文件名称',
  `type` INT(11) NOT NULL COMMENT '文件类型: 1.文件 2.图片 3.音乐 4.视频',
  `path` varchar(128) NOT NULL COMMENT '文件路径',
  `suffix` VARCHAR(24) NOT NULL COMMENT '文件后缀',
  `size` INT(11) NOT NULL COMMENT '文件大小',
  `desc` VARCHAR(128) DEFAULT NULL COMMENT '文件描述',
  `sort` INT(11) DEFAULT NULL COMMENT '排序',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` INT(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='文件表';

----------------------------
-- 区域表
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
-- 日志表
----------------------------
DROP TABLE IF EXISTS `bbs_log`;
CREATE TABLE `bbs_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `origin` INT(11) NOT NULL COMMENT '日志来源: 0: 手机 1: 论坛 2: 管理平台',
  `type` INT(11) NOT NULL COMMENT '日志类型: 1.用户登录 2. 用户登出 3. 模块访问 4.功能操作',
  `title` VARCHAR(48) DEFAULT NULL COMMENT '日志标题',
  `desc` VARCHAR(48) DEFAULT NULL COMMENT '日志描述',
  `ip` VARCHAR(48) DEFAULT NULL COMMENT '访问IP',
  `create_user` INT(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='日志表';
