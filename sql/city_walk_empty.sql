/*
 Navicat Premium Data Transfer

 Source Server         : tyh2001
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : city_walk

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 12/08/2024 14:17:32
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for cw_user_info
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_info`;
CREATE TABLE `cw_user_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` varchar(255) NOT NULL COMMENT '用户 id',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '邮箱',
  `mobile` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '手机',
  `wx_open_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '微信 open id',
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
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for cw_user_route
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route`;
CREATE TABLE `cw_user_route` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `list_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '列表 id',
  `route_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '步行 id',
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '用户 id',
  `province_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '省份编码',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  `city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '当前城市',
  `province` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '当前省份',
  `latitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NOT NULL DEFAULT '0' COMMENT '经度',
  `experience_value` int NOT NULL COMMENT '所获得的经验值\n',
  `content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '发布的内容',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '详细完整地址',
  `picture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '照片',
  `travel_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '出行方式',
  `mood_color` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci DEFAULT NULL COMMENT '心情颜色',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=FIXED;

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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
