/*
 Navicat Premium Data Transfer

 Source Server         : city_walk
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : city_walk

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 07/07/2024 14:34:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cw_user_friend_invite
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_friend_invite`;
CREATE TABLE `cw_user_friend_invite` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户id',
  `invite_id` varchar(255) NOT NULL COMMENT '邀请id',
  `created_at` varchar(255) NOT NULL COMMENT '创建时间',
  `state` varchar(255) NOT NULL COMMENT '邀请状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for cw_user_friend_relationship
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_friend_relationship`;
CREATE TABLE `cw_user_friend_relationship` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户 id',
  `friend_id` varchar(255) NOT NULL COMMENT '好友 id',
  `status` varchar(255) NOT NULL COMMENT '当前状态',
  `created_at` varchar(255) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for cw_user_info
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_info`;
CREATE TABLE `cw_user_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户 id',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '邮箱',
  `mobile` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '手机',
  `signature` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '个签签名',
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '城市',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `birthday` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '生日',
  `gender` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '性别',
  `nick_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '头像',
  `ip_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'ip 归属地',
  `ip_info` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'ip 详细信息',
  `province` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '省份',
  `preference_type` varchar(255) DEFAULT NULL COMMENT '偏好类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_info
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_info` VALUES (1, '', '_1469442737@qq.com', '15211111111', '最怕你一生碌碌无为，还安慰自己平凡可贵。', '杭州市', '2023-09-26 15:31:52', '2001-01-03', '男', '田', '/uploads/avatar/2024-05-15/1715748167980-702831789.jpg', NULL, NULL, '浙江省', NULL);
INSERT INTO `cw_user_info` VALUES (2, '', 'haiyetianguoqiang@126.com', NULL, NULL, NULL, '2023-10-01 21:57:09', NULL, NULL, '强', '/uploads/avatar/2023-10-01/1696168654117-483818004.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (3, '', '1050527857@qq.com', NULL, NULL, NULL, '2023-10-01 21:58:56', NULL, NULL, '欢欢乐乐', '/uploads/avatar/2023-10-01/1696168799735-403821510.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (4, '', '542219987@qq.com', NULL, NULL, NULL, '2023-11-02 10:33:15', NULL, NULL, '2', '/uploads/avatar/2023-11-02/1698892442746-825618819.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (5, '111', '1741342007@qq.com', NULL, NULL, NULL, '2023-11-16 08:27:42', NULL, NULL, '维', '/uploads/avatar/2023-11-16/1700094491342-260377542.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (31, 'U300102695417628064381040124321866117463', '_1469442737@qq.com', NULL, NULL, NULL, '2024-06-27 21:38:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (32, 'U131995175454824711531011225172573302849', '1469442737@qq.com', '15211111111', '等好久啊', NULL, '2024-06-27 22:14:30', NULL, NULL, '等好久啊好激动', NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for cw_user_province_experience
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_province_experience`;
CREATE TABLE `cw_user_province_experience` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份编码',
  `user_id` int NOT NULL COMMENT '用户 id',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `value` int NOT NULL COMMENT '经验值',
  `get_method` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '获取方式',
  `is_collect` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '是否收集 0 -> 未收集 1 -> 已收集',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_province_experience
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_province_experience` VALUES (1, '330000', 1, '2023-11-09 20:07:36', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (2, '330000', 1, '2023-11-09 20:09:06', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (3, '330000', 1, '2023-11-09 20:09:25', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (4, '330000', 1, '2023-11-12 17:59:08', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (5, '330000', 1, '2023-11-12 18:31:42', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (6, '330000', 1, '2023-11-12 18:31:57', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (7, '330000', 1, '2023-11-13 08:48:24', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (8, '330000', 1, '2023-11-13 12:33:28', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (9, '330000', 1, '2023-11-13 12:33:48', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (10, '330000', 1, '2023-11-13 12:46:25', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (11, '330000', 1, '2023-11-13 12:46:31', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (12, '330000', 1, '2023-11-13 12:47:06', 20, 'article', '1');
INSERT INTO `cw_user_province_experience` VALUES (13, '330000', 1, '2023-11-13 12:47:43', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (14, '330000', 1, '2023-11-13 12:51:25', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (15, '330000', 1, '2023-11-13 12:51:36', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (16, '330000', 1, '2023-11-13 12:52:30', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (17, '330000', 5, '2023-11-15 22:30:58', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (18, '330000', 5, '2023-11-16 08:30:16', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (19, '330000', 5, '2023-11-16 08:32:06', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (20, '330000', 5, '2023-11-16 08:38:33', 5, 'clock_location', '0');
INSERT INTO `cw_user_province_experience` VALUES (21, '330000', 5, '2023-11-16 12:08:36', 5, 'clock_location', '0');
INSERT INTO `cw_user_province_experience` VALUES (22, '330000', 5, '2023-11-16 12:12:43', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (23, '330000', 6, '2023-11-16 18:59:33', 5, 'clock_location', '0');
INSERT INTO `cw_user_province_experience` VALUES (24, '330000', 6, '2023-11-16 19:01:27', 5, 'clock_location', '1');
INSERT INTO `cw_user_province_experience` VALUES (25, '330000', 1, '2024-01-12 22:06:59', 20, 'article', '0');
COMMIT;

-- ----------------------------
-- Table structure for cw_user_route
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route`;
CREATE TABLE `cw_user_route` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int NOT NULL COMMENT '用户 id',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '当前城市',
  `province` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '当前省份',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '详细完整地址',
  `latitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '经度',
  `list_id` int NOT NULL COMMENT '列表 id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '地点名称',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for cw_user_route_list
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route_list`;
CREATE TABLE `cw_user_route_list` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int NOT NULL COMMENT '用户 id',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=FIXED;

-- ----------------------------
-- Table structure for cw_user_visited_province
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_visited_province`;
CREATE TABLE `cw_user_visited_province` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份编码',
  `user_id` int NOT NULL COMMENT '用户 id',
  `province_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份名称',
  `experience_value` int NOT NULL COMMENT '当前省份获取到的经验值总和',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_visited_province
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_visited_province` VALUES (1, '330000', 1, '浙江省', 125);
INSERT INTO `cw_user_visited_province` VALUES (2, '130000', 1, '河北省', 0);
INSERT INTO `cw_user_visited_province` VALUES (3, '130000', 2, '河北省', 0);
INSERT INTO `cw_user_visited_province` VALUES (4, '130000', 3, '河北省', 0);
INSERT INTO `cw_user_visited_province` VALUES (5, '330000', 4, '浙江省', 0);
INSERT INTO `cw_user_visited_province` VALUES (7, '330000', 5, '浙江省', 5);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
