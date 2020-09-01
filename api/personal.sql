create table  if not exists `user` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `username` varchar(64) not null default ''  COMMENT '登录名',
    `password` varchar(64) not null default '' COMMENT '密码',
    `nick_name` varchar(64) not null default '' COMMENT '昵称',
    `birthday` int(10) unsigned not null default 0 COMMENT '生日',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`),
    unique key(`username`),
    key(`created_at`)
) engine = innodb default charset = utf8 COMMENT '用户表';

create table if not exists `todo`(
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `title` varchar(200) not null default '' COMMENT '标题',
    `project_id` smallint unsigned not null default 0 COMMENT '所属项目，可为空',
    `project_stage` tinyint unsigned not null default 0 COMMENT '项目阶段',
    `content` varchar(5000) not null default '' COMMENT '内容',
    `remark` varchar(1000) not null default '' COMMENT '备注',
    `cancle_reason` varchar(1000) not null default '' COMMENT '取消理由',
    `start_at` int(10) unsigned not null default 0 COMMENT '开始日期',
    `end_at` int(10) unsigned not null default 0 COMMENT '截止日期',
    `status` tinyint unsigned not null default 0 COMMENT '状态，0-未开始，1-进行中，2-已完结，8-暂停，9-已取消',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`)
) engine = innodb default charset = utf8 COMMENT '待办事项表';

create table if not exists `project` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `project_name` varchar(128) not null default '' COMMENT '项目名称',
    `project_desc` varchar(2000) not null default '' COMMENT '项目描述',
    `project_type` tinyint(2) unsigned not null default 0 COMMENT '项目类型',
    `start_at` int(10) unsigned not null default 0 COMMENT '开始日期',
    `end_at` int(10) unsigned not null default 0 COMMENT '截止日期',
    `status` tinyint unsigned not null default 0 COMMENT '状态',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`)
)  engine = innodb default charset = utf8 COMMENT '项目表';

create table if not exists `project_demand` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `project_id` smallint unsigned not null default 0 COMMENT '所属项目，可为空',
    `stage` tinyint unsigned not null default 0 COMMENT '项目阶段',
    `status` tinyint unsigned not null default 0 COMMENT '状态，0-未开始，1-进行中，2-已完结，8-暂停，9-已取消',
    primary key(`id`)
)  engine = innodb default charset = utf8 COMMENT '项目阶段';



create table if not exists `project_type` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `type_name` varchar(32) not null default '' COMMENT '类型名称',
    primary key(`id`)
) engine = innodb default charset = utf8 COMMENT '项目类型表';

create table if not exists `project_status` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `status_name` varchar(32) not null default '' COMMENT '状态名称',
    primary key(`id`)
) engine = innodb default charset = utf8 COMMENT '项目状态表';

create table if not exists `anniversary` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `title` varchar(200) not null default '' COMMENT '项目描述',
    `desc` varchar(2000) not null default '' COMMENT '纪念日描述',
    `date` int(10) unsigned not null default 0 COMMENT '日期',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`)
)  engine = innodb default charset = utf8 COMMENT '纪念日';

create table if not exists `reminder` (
    `id` int(10) unsigned not null AUTO_INCREMENT COMMENT '主键',
    `content` varchar(2000) not null default '' COMMENT '提醒',
    `created_at` int(10) unsigned not null default 0 COMMENT '创建日期',
    primary key(`id`)
)  engine = innodb default charset = utf8 COMMENT '提醒表';

