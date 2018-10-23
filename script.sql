create database if not exists check_ai;
use check_ai

create table if not exists vasts (
	id int unsigned autoincrement primary key,
	vast_url varchar(600),
	position varchar(100) default 'bottom_right', -- it is possible to create an ENUM field but it's hard to maintain. MySQL doesn't support CHECK constraints but it can be simulated with BEFORE INSERT and BEFORE UPDATE triggers.
	hide_ui tinyint unsigned default 0
);

truncate table vasts;

insert into vasts (vast_url, position, hide_ui)
values (
	'https://video.combotag.com/17.xml', 'bottom_right', 1
), (
	'https://video.combotag.com/18.xml', DEFAULT, DEFAULT
);

select * from vasts;
