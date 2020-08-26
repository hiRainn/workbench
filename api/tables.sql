create table  if not exists `user` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `username` varchar(64) not null default ''  COMMENT '登录名',
    `password` varchar(64) not null default '' COMMENT '密码',
    `name` varchar(64) not null default '' COMMENT '姓名',
    `gender` tinyint(2) unsigned not null default 0 COMMENT '性别，0-保密，1-男，2-女',
    `birthday` int(10) unsigned not null default 0 COMMENT '生日',
    `phone` varchar(32) not null default '' COMMENT '手机',
    `role_ids` varchar(128) not null default '' COMMENT '角色',
    `status` tinyint unsigned not null default 0 COMMENT '状态',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`),
    unique key(`username`),
    key(`created_at`)
) engine = innodb default charset = utf8 COMMENT '用户表';

create table if not exists `user_status` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `status_name` varchar(32) not null default '' COMMENT '状态名称',
    primary key(`id`)
) engine = innodb default charset = utf8 COMMENT '用户状态表';