--------------------------------
-- Migration: asd
--------------------------------

-- UP
create table test (id int);

-- DOWN
drop table test;
