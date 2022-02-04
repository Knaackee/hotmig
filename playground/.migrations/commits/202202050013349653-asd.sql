--------------------------------
-- Migration: asd
--------------------------------

-- UP
create table test2 (id int);

-- DOWN
drop table test2;
