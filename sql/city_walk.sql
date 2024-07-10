/*
 Navicat Premium Data Transfer

 Source Server         : city_walk
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : city_walk

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 10/07/2024 14:23:27
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cw_user_friend_invite
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_friend_invite` (`id`, `user_id`, `invite_id`, `created_at`, `state`) VALUES (1, 'U131995175454824711531011225172573302849', 'IN229937362204761823663034603774649036424', '2024-07-10 10:48:02.966', 'applying');
COMMIT;

-- ----------------------------
-- Table structure for cw_user_friend_relation
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_friend_relation`;
CREATE TABLE `cw_user_friend_relation` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户 id',
  `friend_id` varchar(255) NOT NULL COMMENT '好友 id',
  `state` varchar(255) NOT NULL COMMENT '当前状态',
  `created_at` varchar(255) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cw_user_friend_relation
-- ----------------------------
BEGIN;
COMMIT;

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
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_info
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (1, '', '_1469442737@qq.com', '15211111111', '最怕你一生碌碌无为，还安慰自己平凡可贵。', '杭州市', '2023-09-26 15:31:52', '2001-01-03', '男', '田', '/uploads/avatar/2024-05-15/1715748167980-702831789.jpg', NULL, NULL, '浙江省', NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (2, '', 'haiyetianguoqiang@126.com', NULL, NULL, NULL, '2023-10-01 21:57:09', NULL, NULL, '强', '/uploads/avatar/2023-10-01/1696168654117-483818004.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (3, '', '1050527857@qq.com', NULL, NULL, NULL, '2023-10-01 21:58:56', NULL, NULL, '欢欢乐乐', '/uploads/avatar/2023-10-01/1696168799735-403821510.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (4, '', '542219987@qq.com', NULL, NULL, NULL, '2023-11-02 10:33:15', NULL, NULL, '2', '/uploads/avatar/2023-11-02/1698892442746-825618819.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (5, '111', '1741342007@qq.com', NULL, NULL, NULL, '2023-11-16 08:27:42', NULL, NULL, '维', '/uploads/avatar/2023-11-16/1700094491342-260377542.jpg', NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (31, 'U300102695417628064381040124321866117463', '_1469442737@qq.com', NULL, NULL, NULL, '2024-06-27 21:38:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (32, 'U131995175454824711531011225172573302849', '1469442737@qq.com', '15211111111', '等好久啊', NULL, '2024-06-27 22:14:30', NULL, NULL, '等好久啊好激动', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` (`id`, `user_id`, `email`, `mobile`, `signature`, `city`, `created_at`, `birthday`, `gender`, `nick_name`, `avatar`, `ip_address`, `ip_info`, `province`, `preference_type`) VALUES (33, 'U295968060973022087457575540143943214943', '1469442702@qq.com', NULL, NULL, NULL, '2024-07-09 22:24:12', NULL, NULL, '消耗品', NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for cw_user_route
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route`;
CREATE TABLE `cw_user_route` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `list_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '列表 id',
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '用户 id',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份编码',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '当前城市',
  `province` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '当前省份',
  `latitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL DEFAULT '0' COMMENT '经度',
  `experience_value` int NOT NULL COMMENT '所获得的经验值\n',
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '发布的内容',
  `location_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '地点名称',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '详细完整地址',
  `picture` varchar(255) COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '照片',
  `travel_type` varchar(255) COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '出行方式',
  `mood_color` varchar(255) COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '心情颜色',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_route
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (1, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '330000', '2024-07-08 16:02:24', '舟山市', '浙江省', '30.709778', '122.455646', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (2, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '330000', '2024-07-08 16:03:48', '湖州市', '浙江省', '30.709778', '120.455646', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (3, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '330000', '2024-07-08 16:04:58', '湖州市', '浙江省', '30.709778', '120.1', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (4, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '310000', '2024-07-08 16:07:51', '未知城市', '上海市', '30.709778', '121.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (5, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '310000', '2024-07-08 16:08:19', '未知城市', '上海市', '30.709778', '121.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (6, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '310000', '2024-07-08 16:09:04', '未知城市', '上海市', '30.709778', '121.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (7, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '310000', '2024-07-08 16:10:20', '未知城市', '上海市', '30.709778', '121.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (8, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '540000', '2024-07-08 16:10:29', '拉萨市', '西藏自治区', '30.709778', '91.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (9, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '540000', '2024-07-08 17:08:06', '拉萨市', '西藏自治区', '30.709778', '91.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (10, 'RO231856961144380610669955067372390220743', 'U131995175454824711531011225172573302849', '540000', '2024-07-10 14:17:24', '拉萨市', '西藏自治区', '30.709778', '91.3333', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (11, 'RO231856961144380610669955067372390220743', 'U131995175454824711531011225172573302849', '330000', '2024-07-10 14:17:44', '杭州市', '浙江省', '30.18534', '120.26457', 20, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_route` (`id`, `list_id`, `user_id`, `province_code`, `create_at`, `city`, `province`, `latitude`, `longitude`, `experience_value`, `content`, `location_name`, `address`, `picture`, `travel_type`, `mood_color`) VALUES (12, 'RO231856961144380610669955067372390220743', 'U131995175454824711531011225172573302849', '330000', '2024-07-10 14:17:50', '杭州市', '浙江省', '30.186253', '120.263447', 20, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for cw_user_route_list
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route_list`;
CREATE TABLE `cw_user_route_list` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `list_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '列表 id',
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '用户 id',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of cw_user_route_list
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_route_list` (`id`, `list_id`, `user_id`, `create_at`) VALUES (2, 'RO220454790246139943250231328418604080958', 'U131995175454824711531011225172573302849', '2024-07-08 15:54:22');
INSERT INTO `cw_user_route_list` (`id`, `list_id`, `user_id`, `create_at`) VALUES (3, 'RO231856961144380610669955067372390220743', 'U131995175454824711531011225172573302849', '2024-07-10 14:05:51');
COMMIT;

-- ----------------------------
-- Table structure for cw_user_visited_province
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_visited_province`;
CREATE TABLE `cw_user_visited_province` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `vis_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '用户 id',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份编码',
  `province_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '省份名称',
  `experience_value` int NOT NULL COMMENT '当前省份获取到的经验值总和',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_visited_province
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_visited_province` (`id`, `vis_id`, `user_id`, `province_code`, `province_name`, `experience_value`) VALUES (2, 'VIS165577110277401578717087648494990815791', 'U131995175454824711531011225172573302849', '330000', '浙江省', 680);
INSERT INTO `cw_user_visited_province` (`id`, `vis_id`, `user_id`, `province_code`, `province_name`, `experience_value`) VALUES (3, 'VIS31641110319140132264666038695908363882', 'U131995175454824711531011225172573302849', '510000', '四川省', 40);
INSERT INTO `cw_user_visited_province` (`id`, `vis_id`, `user_id`, `province_code`, `province_name`, `experience_value`) VALUES (4, 'VIS169369425513711531359349849739489571299', 'U131995175454824711531011225172573302849', '420000', '湖北省', 360);
INSERT INTO `cw_user_visited_province` (`id`, `vis_id`, `user_id`, `province_code`, `province_name`, `experience_value`) VALUES (5, 'VIS164511652947648828322693781494491035658', 'U131995175454824711531011225172573302849', '310000', '上海市', 140);
INSERT INTO `cw_user_visited_province` (`id`, `vis_id`, `user_id`, `province_code`, `province_name`, `experience_value`) VALUES (6, 'VIS156624802457223725839386130664692004012', 'U131995175454824711531011225172573302849', '540000', '西藏自治区', 100);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
