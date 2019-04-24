SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bbs_menu
-- ----------------------------
DROP TABLE IF EXISTS `bbs_menu`;
CREATE TABLE `bbs_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '菜单类型: 1. 管理平台菜单 2. BBS菜单 3. 移动端菜单',
  `code` varchar(48) NOT NULL COMMENT '菜单编码',
  `name` varchar(48) NOT NULL COMMENT '菜单名称',
  `component` tinyint(4) NOT NULL COMMENT '对应组件: -1. 根节点 1. 页面组件 2.默认布局 3456...扩展布局',
  `icon` varchar(128) DEFAULT NULL COMMENT '菜单图标',
  `alias` varchar(48) DEFAULT NULL COMMENT '别名',
  `redirect` varchar(128) DEFAULT NULL COMMENT '重定向路径: 配置菜单编码或URL',
  `sort` int(11) NOT NULL,
  `desc` varchar(128) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：停用，1：启用(默认为1)',
  `create_user` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_user` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_user` int(11) DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态: 0：删除，1：可用(默认为1)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COMMENT='菜单表';

-- ----------------------------
-- Records of bbs_menu
-- ----------------------------
BEGIN;
INSERT INTO `bbs_menu` VALUES (1, -1, 1, '-1', '平台端', -1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (2, -1, 2, '-1', '论坛端', -1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (3, -1, 3, '-1', '移动端', -1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (4, 1, 1, 'opsCenter', '运维中心', 2, 'el-icon-addressbook', NULL, NULL, 1, NULL, 1, NULL, NULL, 1, '2019-04-11 22:12:38', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (5, 4, 1, 'questionMan', '问答管理', 1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, 1, '2019-04-11 09:49:34', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (6, 4, 1, 'blogMan', '专栏管理', 1, NULL, NULL, NULL, 2, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (7, 4, 1, 'articleMan', '文章管理', 1, NULL, NULL, NULL, 3, NULL, 1, NULL, NULL, 1, '2019-04-11 09:50:27', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (8, 4, 1, 'liveMan', '讲堂管理', 1, NULL, NULL, NULL, 4, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (9, 4, 1, 'activityMan', '活动管理', 1, NULL, NULL, NULL, 5, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (10, 1, 1, 'library', '文件库', 2, 'el-icon-workbench', NULL, NULL, 2, NULL, 1, NULL, NULL, 1, '2019-04-11 22:12:34', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (11, 10, 1, 'imgMan', '图片管理', 1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (12, 10, 1, 'fileMan', '文件管理', 1, NULL, NULL, NULL, 2, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (13, 1, 1, 'bbsConfig', '论坛配置', 2, 'el-icon-label', NULL, NULL, 3, NULL, 1, NULL, NULL, 1, '2019-04-11 22:12:26', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (14, 13, 1, 'carousel', '首页轮播', 1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (15, 13, 1, 'techSquare', '技术频道', 1, NULL, NULL, NULL, 2, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (16, 13, 1, 'notices', '通知', 1, NULL, NULL, NULL, 3, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (17, 4, 1, 'advertisingMan', '广告位管理', 1, NULL, NULL, NULL, 4, NULL, 1, NULL, NULL, 1, '2019-04-19 13:41:03', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (18, 13, 1, 'liveRecommend', '讲座推荐', 1, NULL, NULL, NULL, 5, NULL, 1, NULL, NULL, NULL, NULL, 1, '2019-04-19 13:42:49', 0);
INSERT INTO `bbs_menu` VALUES (19, 13, 1, 'activityRecommend', '活动推荐', 1, NULL, NULL, NULL, 6, NULL, 1, NULL, NULL, NULL, NULL, 1, '2019-04-19 13:42:57', 0);
INSERT INTO `bbs_menu` VALUES (20, 13, 1, 'tagTypeMan', '标签类型管理', 1, NULL, NULL, NULL, 7, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (21, 13, 1, 'tagMan', '标签管理', 1, NULL, NULL, NULL, 8, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (22, 1, 1, 'sysMan', '系统管理', 2, 'el-icon-setup', NULL, NULL, 4, NULL, 1, NULL, NULL, 1, '2019-04-11 22:12:17', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (23, 22, 1, 'userMan', '用户管理', 1, NULL, NULL, NULL, 1, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (24, 22, 1, 'roleMan', '角色管理', 1, NULL, NULL, NULL, 2, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (25, 22, 1, 'menuMan', '菜单管理', 1, NULL, NULL, NULL, 3, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (26, 22, 1, 'areaMan', '区域管理', 1, NULL, NULL, NULL, 4, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (27, 22, 1, 'chartConfig', '图表配置', 1, NULL, NULL, NULL, 5, NULL, 1, NULL, NULL, 1, '2019-04-11 22:15:42', NULL, NULL, 1);
INSERT INTO `bbs_menu` VALUES (28, 22, 1, 'log', '系统日志', 1, NULL, NULL, NULL, 6, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
