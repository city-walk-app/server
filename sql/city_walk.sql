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

 Date: 29/06/2024 10:14:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_info
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_info` VALUES (1, '', '_1469442737@qq.com', '15211111111', '最怕你一生碌碌无为，还安慰自己平凡可贵。', '杭州市', '2023-09-26 15:31:52', '2001-01-03', '男', '田', '/uploads/avatar/2024-05-15/1715748167980-702831789.jpg', NULL, NULL, '浙江省');
INSERT INTO `cw_user_info` VALUES (2, '', 'haiyetianguoqiang@126.com', NULL, NULL, NULL, '2023-10-01 21:57:09', NULL, NULL, '强', '/uploads/avatar/2023-10-01/1696168654117-483818004.jpg', NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (3, '', '1050527857@qq.com', NULL, NULL, NULL, '2023-10-01 21:58:56', NULL, NULL, '欢欢乐乐', '/uploads/avatar/2023-10-01/1696168799735-403821510.jpg', NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (4, '', '542219987@qq.com', NULL, NULL, NULL, '2023-11-02 10:33:15', NULL, NULL, '哈哈哈', '/uploads/avatar/2023-11-02/1698892442746-825618819.jpg', NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (5, '', '1741342007@qq.com', NULL, NULL, NULL, '2023-11-16 08:27:42', NULL, NULL, '维', '/uploads/avatar/2023-11-16/1700094491342-260377542.jpg', NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (31, 'U300102695417628064381040124321866117463', '_1469442737@qq.com', NULL, NULL, NULL, '2024-06-27 21:38:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `cw_user_info` VALUES (32, 'U131995175454824711531011225172573302849', '1469442737@qq.com', NULL, NULL, NULL, '2024-06-27 22:14:30', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
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
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of cw_user_route
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_route` VALUES (1, 1, '2023-10-20 23:09:26', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路28号', '30.274764', '120.15703', 1, '', '');
INSERT INTO `cw_user_route` VALUES (2, 1, '2023-10-20 23:10:43', '未知城市', '未知省份', '临平区翁梅街131号', '30.366191864013683', '120.3039093017578', 1, '', '');
INSERT INTO `cw_user_route` VALUES (3, 1, '2023-10-20 23:10:51', '杭州市', '浙江省', '浙江省杭州市临平区临乔路38号101室', '30.367374420166023', '120.30427551269533', 1, '', '');
INSERT INTO `cw_user_route` VALUES (4, 1, '2023-10-20 23:11:20', '未知城市', '未知省份', '临平区翁梅街131号', '30.36592102050781', '120.30377960205075', 1, '', '');
INSERT INTO `cw_user_route` VALUES (5, 1, '2023-10-20 23:11:53', '杭州市', '浙江省', '浙江省杭州市临平区乔司', '30.349721908569347', '120.27729797363286', 1, '', '');
INSERT INTO `cw_user_route` VALUES (6, 1, '2023-10-21 20:58:01', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路28号', '30.274764', '120.15703', 2, '', '');
INSERT INTO `cw_user_route` VALUES (7, 1, '2023-10-21 20:58:18', '杭州市', '浙江省', '浙江省杭州市拱墅区', '30.27415', '120.15515', 2, '', '');
INSERT INTO `cw_user_route` VALUES (8, 1, '2023-10-21 20:58:28', '杭州市', '浙江省', '浙江省杭州市西湖区莫干山路77号金汇大厦', '30.274168', '120.153924', 2, '', '');
INSERT INTO `cw_user_route` VALUES (9, 1, '2023-10-21 21:02:52', '未知城市', '未知省份', '临平区杭海路与翁梅街交叉口', '30.366807937622088', '120.29718780517578', 2, '', '');
INSERT INTO `cw_user_route` VALUES (10, 1, '2023-10-21 21:04:30', '未知城市', '未知省份', '临平区翁梅街131号', '30.366191864013683', '120.3039093017578', 2, '', '');
INSERT INTO `cw_user_route` VALUES (11, 1, '2023-10-23 10:28:50', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路28号', '30.274764', '120.15703', 3, '', '');
INSERT INTO `cw_user_route` VALUES (12, 1, '2023-10-23 10:30:16', '杭州市', '浙江省', '浙江省杭州市', '30.18534', '120.26457', 3, '', '');
INSERT INTO `cw_user_route` VALUES (13, 1, '2023-10-23 10:34:46', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路28号', '30.274764', '120.15703', 3, '', '');
INSERT INTO `cw_user_route` VALUES (14, 1, '2023-10-23 10:36:19', '杭州市', '浙江省', '浙江省杭州市', '30.18534', '120.26457', 3, '', '');
INSERT INTO `cw_user_route` VALUES (15, 1, '2023-10-23 19:33:32', '杭州市', '浙江省', '浙江省杭州市拱墅区密渡桥路17号', '30.274796', '120.157775', 3, '', '');
INSERT INTO `cw_user_route` VALUES (25, 1, '2023-10-25 10:00:56', '杭州市', '浙江省', '萧山区晨晖路197号', '30.138036727905284', '120.2470703125', 8, '广仁小区', '');
INSERT INTO `cw_user_route` VALUES (24, 1, '2023-10-25 08:21:15', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路1号', '30.273634', '120.1564', 8, '市民公园', '');
INSERT INTO `cw_user_route` VALUES (23, 1, '2023-10-24 22:42:06', '杭州市', '浙江省', '浙江省杭州市临平区杭乔路与翁梅路交叉口西北角', '30.368476428837237', '120.30278610234843', 7, '翁梅新苑三区', '');
INSERT INTO `cw_user_route` VALUES (22, 1, '2023-10-24 19:19:47', '杭州市', '浙江省', '浙江省杭州市西湖区龙井路1号', '30.221378', '120.121431', 7, '西湖风景名胜区', '');
INSERT INTO `cw_user_route` VALUES (26, 1, '2023-10-27 19:20:39', '杭州市', '浙江省', '浙江省杭州市', '30.27415', '120.15515', 9, '', '');
INSERT INTO `cw_user_route` VALUES (27, 1, '2023-10-27 19:22:26', '杭州市', '浙江省', '浙江省杭州市拱墅区湖墅南路28号', '30.274764', '120.15703', 9, '杭州JW万豪酒店', '');
INSERT INTO `cw_user_route` VALUES (28, 1, '2023-10-27 23:37:15', '杭州市', '浙江省', '浙江省杭州市临平区杭乔路与翁梅路交叉口西北角', '30.36814762595453', '120.30252227561323', 9, '翁梅新苑三区', '');
INSERT INTO `cw_user_route` VALUES (29, 1, '2023-10-27 23:38:02', '杭州市', '浙江省', '临平区杭海路与翁梅街交叉口', '30.366807937622088', '120.29718780517578', 9, '怡丰城', '');
INSERT INTO `cw_user_route` VALUES (30, 1, '2023-10-28 00:05:56', '杭州市', '浙江省', '浙江省杭州市临平区杭乔路与翁梅路交叉口西北角', '30.36814762595453', '120.30252227561323', 10, '翁梅新苑三区', '');
INSERT INTO `cw_user_route` VALUES (31, 1, '2023-10-30 08:49:00', '杭州市', '浙江省', '浙江省杭州市余杭区G104与华兴路交叉口东北1公里', '30.390626', '119.991218', 11, '良渚古城遗址公园', '');
INSERT INTO `cw_user_route` VALUES (32, 4, '2023-11-02 10:36:32', '杭州市', '浙江省', '浙江省杭州市萧山区风情大道2758号', '30.130453', '120.214331', 12, '杭州湘湖景区', '');
INSERT INTO `cw_user_route` VALUES (33, 1, '2023-11-05 19:39:42', '杭州市', '浙江省', '浙江省杭州市', '30.41875', '120.298501', 13, '', '');
INSERT INTO `cw_user_route` VALUES (34, 1, '2023-11-12 17:59:08', '杭州市', '浙江省', '浙江省杭州市', '30.41875', '120.298501', 14, '', '330000');
INSERT INTO `cw_user_route` VALUES (35, 1, '2023-11-12 18:31:42', '杭州市', '浙江省', '浙江省杭州市', '30.41875', '120.298501', 14, '', '330000');
INSERT INTO `cw_user_route` VALUES (36, 1, '2023-11-12 18:31:57', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 14, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (37, 1, '2023-11-13 12:33:48', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 15, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (38, 1, '2023-11-13 12:46:25', '杭州市', '浙江省', '浙江省杭州市', '30.18534', '120.26457', 15, '', '330000');
INSERT INTO `cw_user_route` VALUES (39, 1, '2023-11-13 12:46:31', '杭州市', '浙江省', '浙江省杭州市临平区西大街33号', '30.41875', '120.298501', 15, '杭州市临平区人民政府', '330000');
INSERT INTO `cw_user_route` VALUES (40, 1, '2023-11-13 12:47:43', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路67号', '30.41875', '120.298501', 15, '杭州市临平区人民政府(龙王塘路东)', '330000');
INSERT INTO `cw_user_route` VALUES (41, 1, '2023-11-13 12:51:25', '杭州市', '浙江省', '浙江省杭州市', '30.18534', '120.26457', 15, '', '330000');
INSERT INTO `cw_user_route` VALUES (42, 1, '2023-11-13 12:51:36', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 15, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (43, 1, '2023-11-13 12:52:30', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 15, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (44, 5, '2023-11-15 22:30:58', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路67号', '30.41875', '120.298501', 16, '杭州市临平区人民政府(龙王塘路东)', '330000');
INSERT INTO `cw_user_route` VALUES (45, 5, '2023-11-16 08:30:16', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路67号', '30.41875', '120.298501', 17, '杭州市临平区人民政府(龙王塘路东)', '330000');
INSERT INTO `cw_user_route` VALUES (46, 5, '2023-11-16 08:32:06', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 17, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (47, 5, '2023-11-16 08:38:33', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路67号', '30.41875', '120.298501', 17, '杭州市临平区人民政府(龙王塘路东)', '330000');
INSERT INTO `cw_user_route` VALUES (48, 5, '2023-11-16 12:08:36', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 17, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (49, 5, '2023-11-16 12:12:43', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路87号(邱山大街地铁站D口步行350米)', '30.419215', '120.297858', 17, '利宾饭店(龙王塘路店)', '330000');
INSERT INTO `cw_user_route` VALUES (50, 6, '2023-11-16 18:59:33', '杭州市', '浙江省', '浙江省杭州市临平区龙王塘路67号', '30.41875', '120.298501', 18, '杭州市临平区人民政府(龙王塘路东)', '330000');
INSERT INTO `cw_user_route` VALUES (51, 6, '2023-11-16 19:01:27', '杭州市', '浙江省', '浙江省杭州市', '30.25727', '120.20523', 18, '', '330000');
COMMIT;

-- ----------------------------
-- Table structure for cw_user_route_list
-- ----------------------------
DROP TABLE IF EXISTS `cw_user_route_list`;
CREATE TABLE `cw_user_route_list` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int NOT NULL COMMENT '用户 id',
  `create_at` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_danish_ci ROW_FORMAT=FIXED;

-- ----------------------------
-- Records of cw_user_route_list
-- ----------------------------
BEGIN;
INSERT INTO `cw_user_route_list` VALUES (1, 1, '2023-10-20 23:09:26');
INSERT INTO `cw_user_route_list` VALUES (2, 1, '2023-10-21 20:58:01');
INSERT INTO `cw_user_route_list` VALUES (3, 1, '2023-10-23 10:28:50');
INSERT INTO `cw_user_route_list` VALUES (7, 1, '2023-10-24 19:19:46');
INSERT INTO `cw_user_route_list` VALUES (8, 1, '2023-10-25 08:21:14');
INSERT INTO `cw_user_route_list` VALUES (9, 1, '2023-10-27 19:20:38');
INSERT INTO `cw_user_route_list` VALUES (10, 1, '2023-10-28 00:05:55');
INSERT INTO `cw_user_route_list` VALUES (11, 1, '2023-10-30 08:49:00');
INSERT INTO `cw_user_route_list` VALUES (12, 4, '2023-11-02 10:36:32');
INSERT INTO `cw_user_route_list` VALUES (13, 1, '2023-11-05 19:39:41');
INSERT INTO `cw_user_route_list` VALUES (14, 1, '2023-11-12 17:59:08');
INSERT INTO `cw_user_route_list` VALUES (15, 1, '2023-11-13 12:33:48');
INSERT INTO `cw_user_route_list` VALUES (16, 5, '2023-11-15 22:30:58');
INSERT INTO `cw_user_route_list` VALUES (17, 5, '2023-11-16 08:30:16');
INSERT INTO `cw_user_route_list` VALUES (18, 6, '2023-11-16 18:59:33');
COMMIT;

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
