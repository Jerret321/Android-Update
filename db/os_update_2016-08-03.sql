# ************************************************************
# Sequel Pro SQL dump
# Version 4706
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.13)
# Database: os_update
# Generation Time: 2016-08-03 07:27:35 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table apk
# ------------------------------------------------------------

DROP TABLE IF EXISTS `apk`;

CREATE TABLE `apk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upload_id` int(11) DEFAULT NULL COMMENT 'apk url',
  `version` varchar(45) DEFAULT NULL COMMENT '版本号',
  `log` text,
  `status` tinyint(4) DEFAULT '1' COMMENT '-1 删除\n1 正常',
  `create_time` double NOT NULL,
  `app_id` tinyint(4) NOT NULL,
  `uid` int(11) NOT NULL COMMENT '更新者',
  `update_time` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='apk记录表';



# Dump of table apk_upload
# ------------------------------------------------------------

DROP TABLE IF EXISTS `apk_upload`;

CREATE TABLE `apk_upload` (
  `upload_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL COMMENT '上传的apk url\n',
  `options` text COMMENT '解析上传后的包 生成的数据\n',
  `create_time` double DEFAULT NULL,
  `app_id` int(11) DEFAULT NULL,
  `update_time` double DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`upload_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table app
# ------------------------------------------------------------

DROP TABLE IF EXISTS `app`;

CREATE TABLE `app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '应用名称',
  `description` varchar(400) DEFAULT NULL COMMENT '应用描述',
  `logo` varchar(400) DEFAULT NULL,
  `secret` varchar(100) DEFAULT NULL COMMENT '密码',
  `key` varchar(100) NOT NULL COMMENT '密钥',
  `os` tinyint(4) DEFAULT '1' COMMENT '1 Android\n2 iOS\n',
  `status` tinyint(4) DEFAULT '1' COMMENT '1 正常\n-1 删除',
  `create_time` double NOT NULL,
  `uid` int(11) NOT NULL,
  `update_time` double DEFAULT NULL,
  `is_force_update` tinyint(4) DEFAULT '0' COMMENT '0 不强制\n1 强制',
  PRIMARY KEY (`id`,`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='应用表';



# Dump of table ssh_config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ssh_config`;

CREATE TABLE `ssh_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `options` text,
  `app_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='上传apk配置表';



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role` tinyint(3) unsigned zerofill DEFAULT '001' COMMENT '-1 禁用\n1 开发者\n2 管理者',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '-1 删除\n1 正常',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `mobile` double DEFAULT NULL,
  `create_time` double NOT NULL,
  `update_time` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
